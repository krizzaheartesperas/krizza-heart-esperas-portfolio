import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';
import { getSystemPrompt, PROJECT_CONTEXT_MAP } from './lib/knowledge.js';
import { isRateLimited } from './lib/rateLimit.js';

export const config = {
  maxDuration: 30,
};

const MAX_MESSAGE_LENGTH = 800;
const MAX_HISTORY_MESSAGES = 8;
const MAX_HISTORY_MESSAGE_LENGTH = 500;
const REQUEST_TIMEOUT_MS = 12_000;
const MAX_ATTEMPTS = 2;

const FALLBACK_MESSAGE =
  "Sorry, I'm having trouble responding right now. Please try again or use the Contact section to reach Krizza directly.";

interface ChatTurn {
  role: 'user' | 'assistant';
  content: string;
}

// A narrow, conservative pre-filter for obvious secret-extraction attempts.
// The system prompt is the primary defense; this just saves a wasted API call.
const SECRET_EXTRACTION_PATTERN =
  /\b(reveal|show|give|leak|expose|print|display|what('?s| is)| your\b.*)\b.{0,30}\b(api key|apikey|env(ironment)? variables?|secret token|system prompt|internal instructions)\b/i;

function getClientKey(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0].trim();
  return ip || 'unknown';
}

function sanitizeMessage(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > MAX_MESSAGE_LENGTH) return null;
  return trimmed;
}

function sanitizeProjectContext(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  return Object.prototype.hasOwnProperty.call(PROJECT_CONTEXT_MAP, value) ? value : undefined;
}

function isAbortError(error: unknown): boolean {
  return (
    error instanceof Error &&
    (error.name === 'APIUserAbortError' || (error as { cause?: { name?: string } }).cause?.name === 'AbortError')
  );
}

/**
 * Groq's shared free-tier capacity occasionally queues a request long enough
 * to blow past a single timeout even though the model itself responds in
 * under a second most of the time. One retry with a fresh short timeout
 * recovers from that transient case without making a slow user wait twice
 * as long for a real failure.
 */
async function callGroqWithRetry(
  groq: OpenAI,
  params: OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming
): Promise<string> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const completion = await groq.chat.completions.create(params, { signal: controller.signal });
      const reply = completion.choices[0]?.message?.content?.trim();
      if (!reply) throw new Error('Empty response from model');
      return reply;
    } catch (error) {
      lastError = error;
      if (!isAbortError(error) || attempt === MAX_ATTEMPTS) throw error;
    } finally {
      clearTimeout(timeout);
    }
  }

  throw lastError;
}

function sanitizeHistory(value: unknown): ChatTurn[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter(
      (item): item is ChatTurn =>
        item &&
        typeof item === 'object' &&
        (item.role === 'user' || item.role === 'assistant') &&
        typeof item.content === 'string' &&
        item.content.trim().length > 0
    )
    .slice(-MAX_HISTORY_MESSAGES)
    .map(item => ({
      role: item.role,
      content: item.content.trim().slice(0, MAX_HISTORY_MESSAGE_LENGTH),
    }));
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const clientKey = getClientKey(req);
  if (isRateLimited(clientKey)) {
    res.status(429).json({ error: 'Too many requests. Please wait a moment and try again.' });
    return;
  }

  const message = sanitizeMessage(req.body?.message);
  if (!message) {
    res.status(400).json({ error: 'Please provide a message (up to 800 characters).' });
    return;
  }

  if (SECRET_EXTRACTION_PATTERN.test(message)) {
    res.status(200).json({
      reply:
        "I can't share internal implementation details or credentials. I'm happy to tell you about Krizza's background, skills, or projects instead.",
    });
    return;
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error('GROQ_API_KEY is not configured.');
    res.status(500).json({ error: FALLBACK_MESSAGE });
    return;
  }

  const history = sanitizeHistory(req.body?.history);
  const projectContext = sanitizeProjectContext(req.body?.projectContext);
  // Groq exposes an OpenAI-compatible Chat Completions API, so the official
  // openai SDK works unmodified — just point it at Groq's base URL.
  const groq = new OpenAI({ apiKey, baseURL: 'https://api.groq.com/openai/v1' });

  try {
    const reply = await callGroqWithRetry(groq, {
      model: process.env.GROQ_MODEL || 'openai/gpt-oss-20b',
      messages: [
        { role: 'system', content: getSystemPrompt(projectContext) },
        ...history.map(turn => ({ role: turn.role, content: turn.content })),
        { role: 'user', content: message },
      ],
      temperature: 0.4,
      max_tokens: 500,
      // gpt-oss models reason before answering; this is simple grounded Q&A,
      // so keep reasoning effort low to cut latency without hurting quality.
      reasoning_effort: 'low',
    });

    res.status(200).json({ reply });
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(502).json({ error: FALLBACK_MESSAGE });
  }
}
