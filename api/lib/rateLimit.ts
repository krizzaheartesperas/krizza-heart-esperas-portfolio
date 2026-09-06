/**
 * Best-effort in-memory rate limiter. Serverless instances are short-lived
 * and can be recycled at any time, so this is a pragmatic abuse deterrent,
 * not a strict guarantee — sufficient for a low-traffic portfolio chatbot.
 */

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 12;

const hits = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter(t => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    hits.set(key, timestamps);
    return true;
  }

  timestamps.push(now);
  hits.set(key, timestamps);

  // Prevent unbounded growth across many distinct IPs.
  if (hits.size > 5000) {
    const [oldestKey] = hits.keys();
    if (oldestKey) hits.delete(oldestKey);
  }

  return false;
}
