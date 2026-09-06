import '../chatbot.css';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  isError?: boolean;
}

interface NavAction {
  label: string;
  href: string;
  external?: boolean;
}

const GREETING =
  "Hi! I'm Krizza's AI Portfolio Assistant. I can tell you about Krizza's skills, projects, experience, education, and technical background. What would you like to know?";

const QUICK_QUESTIONS = [
  'Tell me about Krizza',
  'View projects',
  'Technical skills',
  'Internship experience',
  'AI & automation experience',
  'QA experience',
  'Contact information',
];

const NAV_RULES: { pattern: RegExp; action: NavAction }[] = [
  { pattern: /\bproject/i, action: { label: 'View Projects', href: '#projects' } },
  { pattern: /internship|hris|highly succeed/i, action: { label: 'View Experience', href: '#experience' } },
  { pattern: /skill|technolog|stack/i, action: { label: 'View Skills', href: '#skills' } },
  { pattern: /resume|cv\b/i, action: { label: 'View Resume', href: '/resume.pdf', external: true } },
  { pattern: /contact|reach|hire|email address|get in touch/i, action: { label: 'Contact Krizza', href: '#contact' } },
  { pattern: /award|credential|certificat/i, action: { label: 'View Credentials', href: '#credentials' } },
  { pattern: /education|degree|university|graduat/i, action: { label: 'View About', href: '#about' } },
  { pattern: /github/i, action: { label: 'View GitHub', href: 'https://github.com/krizzaheartesperas', external: true } },
  { pattern: /linkedin/i, action: { label: 'View LinkedIn', href: 'https://www.linkedin.com/in/krizza-heart-esperas-550ab9368', external: true } },
];

const MAX_MESSAGE_LENGTH = 600;
const MAX_HISTORY_SENT = 10;

const messages: ChatMessage[] = [];
let isSending = false;
let hasOpenedBefore = false;

let toggleBtn: HTMLButtonElement;
let panel: HTMLDivElement;
let messagesEl: HTMLDivElement;
let quickQuestionsEl: HTMLDivElement;
let form: HTMLFormElement;
let input: HTMLTextAreaElement;
let sendBtn: HTMLButtonElement;

export function initChatbot(): void {
  const root = document.createElement('div');
  root.className = 'chatbot-root';
  root.innerHTML = `
    <button type="button" class="chatbot-toggle" id="chatbotToggle" aria-haspopup="dialog" aria-expanded="false" aria-controls="chatbotPanel" aria-label="Open AI Portfolio Assistant">
      <svg class="chatbot-icon-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
      <svg class="chatbot-icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>

    <div class="chatbot-panel" id="chatbotPanel" role="dialog" aria-modal="false" aria-labelledby="chatbotTitle" hidden>
      <div class="chatbot-header">
        <div class="chatbot-header-info">
          <span class="chatbot-status-dot" aria-hidden="true"></span>
          <div class="chatbot-header-text">
            <h2 id="chatbotTitle">AI Portfolio Assistant</h2>
            <span>Online &middot; Ask me about Krizza</span>
          </div>
        </div>
        <div class="chatbot-header-actions">
          <button type="button" class="chatbot-icon-btn" id="chatbotReset" aria-label="Start new conversation" title="New conversation">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-8.14L1 10"/></svg>
          </button>
          <button type="button" class="chatbot-icon-btn" id="chatbotClose" aria-label="Close chat">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </div>

      <div class="chatbot-messages" id="chatbotMessages" role="log" aria-live="polite"></div>

      <div class="chatbot-quick-questions" id="chatbotQuickQuestions"></div>

      <form class="chatbot-input-row" id="chatbotForm">
        <textarea
          class="chatbot-input"
          id="chatbotInput"
          rows="1"
          maxlength="${MAX_MESSAGE_LENGTH}"
          placeholder="Ask me about Krizza..."
          aria-label="Message the AI Portfolio Assistant"
        ></textarea>
        <button type="submit" class="chatbot-send-btn" id="chatbotSend" aria-label="Send message" disabled>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </form>
    </div>
  `;
  document.body.appendChild(root);

  toggleBtn = root.querySelector('#chatbotToggle') as HTMLButtonElement;
  panel = root.querySelector('#chatbotPanel') as HTMLDivElement;
  messagesEl = root.querySelector('#chatbotMessages') as HTMLDivElement;
  quickQuestionsEl = root.querySelector('#chatbotQuickQuestions') as HTMLDivElement;
  form = root.querySelector('#chatbotForm') as HTMLFormElement;
  input = root.querySelector('#chatbotInput') as HTMLTextAreaElement;
  sendBtn = root.querySelector('#chatbotSend') as HTMLButtonElement;
  const closeBtn = root.querySelector('#chatbotClose') as HTMLButtonElement;
  const resetBtn = root.querySelector('#chatbotReset') as HTMLButtonElement;

  toggleBtn.addEventListener('click', () => {
    panel.classList.contains('open') ? closeChat() : openChat();
  });
  closeBtn.addEventListener('click', closeChat);
  resetBtn.addEventListener('click', resetConversation);

  form.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    submitMessage();
  });

  input.addEventListener('input', () => {
    sendBtn.disabled = input.value.trim().length === 0 || isSending;
    autoResizeInput();
  });

  input.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submitMessage();
    }
  });

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape' && panel.classList.contains('open')) {
      closeChat();
    }
  });

  renderEmptyState();
}

function openChat(): void {
  panel.hidden = false;
  requestAnimationFrame(() => panel.classList.add('open'));
  toggleBtn.classList.add('open');
  toggleBtn.setAttribute('aria-expanded', 'true');
  toggleBtn.setAttribute('aria-label', 'Close AI Portfolio Assistant');

  if (!hasOpenedBefore) {
    hasOpenedBefore = true;
  }

  window.setTimeout(() => input.focus(), 260);
}

function closeChat(): void {
  panel.classList.remove('open');
  toggleBtn.classList.remove('open');
  toggleBtn.setAttribute('aria-expanded', 'false');
  toggleBtn.setAttribute('aria-label', 'Open AI Portfolio Assistant');
  window.setTimeout(() => {
    if (!panel.classList.contains('open')) panel.hidden = true;
  }, 300);
  toggleBtn.focus();
}

function resetConversation(): void {
  messages.length = 0;
  messagesEl.innerHTML = '';
  renderEmptyState();
  input.value = '';
  autoResizeInput();
  sendBtn.disabled = true;
  input.focus();
}

function renderEmptyState(): void {
  const greetingEl = document.createElement('div');
  greetingEl.className = 'chatbot-greeting';
  greetingEl.textContent = GREETING;
  messagesEl.appendChild(greetingEl);
  renderQuickQuestions();
}

function renderQuickQuestions(): void {
  quickQuestionsEl.innerHTML = '';
  quickQuestionsEl.hidden = false;
  QUICK_QUESTIONS.forEach(question => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'chatbot-quick-btn';
    btn.textContent = question;
    btn.addEventListener('click', () => {
      if (isSending) return;
      sendMessage(question);
    });
    quickQuestionsEl.appendChild(btn);
  });
}

function hideQuickQuestions(): void {
  quickQuestionsEl.hidden = true;
  quickQuestionsEl.innerHTML = '';
}

function autoResizeInput(): void {
  input.style.height = 'auto';
  input.style.height = `${Math.min(input.scrollHeight, 96)}px`;
}

function submitMessage(): void {
  const text = input.value.trim();
  if (!text || isSending) return;
  input.value = '';
  autoResizeInput();
  sendBtn.disabled = true;
  sendMessage(text);
}

async function sendMessage(text: string): Promise<void> {
  if (isSending) return;
  const trimmed = text.trim().slice(0, MAX_MESSAGE_LENGTH);
  if (!trimmed) return;

  hideQuickQuestions();
  addMessage({ role: 'user', content: trimmed });

  isSending = true;
  sendBtn.disabled = true;
  input.disabled = true;
  const typingEl = renderTypingIndicator();

  try {
    const history = messages
      .slice(0, -1)
      .slice(-MAX_HISTORY_SENT)
      .map(m => ({ role: m.role, content: m.content }));

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: trimmed, history }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.reply) {
      throw new Error(data?.error || 'Request failed');
    }

    typingEl.remove();
    addMessage({ role: 'assistant', content: data.reply });
    renderNavActions(trimmed, data.reply);
  } catch (err) {
    console.error('Chatbot error:', err);
    typingEl.remove();
    addMessage({
      role: 'assistant',
      content:
        "Sorry, I'm having trouble responding right now. Please try again or use the Contact section to reach Krizza directly.",
      isError: true,
    });
  } finally {
    isSending = false;
    input.disabled = false;
    sendBtn.disabled = input.value.trim().length === 0;
    input.focus();
  }
}

function addMessage(message: ChatMessage): void {
  messages.push(message);

  const el = document.createElement('div');
  el.className = `chatbot-msg ${message.role}${message.isError ? ' error' : ''}`;

  if (message.role === 'assistant') {
    el.innerHTML = renderMarkdown(message.content);
  } else {
    el.textContent = message.content;
  }

  messagesEl.appendChild(el);
  scrollToBottom();
}

function renderTypingIndicator(): HTMLDivElement {
  const el = document.createElement('div');
  el.className = 'chatbot-typing';
  el.setAttribute('aria-label', 'Assistant is typing');
  el.innerHTML = '<span></span><span></span><span></span>';
  messagesEl.appendChild(el);
  scrollToBottom();
  return el;
}

function renderNavActions(userText: string, replyText: string): void {
  const combined = `${userText} ${replyText}`;
  const seen = new Set<string>();
  const actions: NavAction[] = [];

  for (const rule of NAV_RULES) {
    if (actions.length >= 2) break;
    if (rule.pattern.test(combined) && !seen.has(rule.action.label)) {
      seen.add(rule.action.label);
      actions.push(rule.action);
    }
  }

  if (actions.length === 0) return;

  const wrap = document.createElement('div');
  wrap.className = 'chatbot-actions';

  actions.forEach(action => {
    const link = document.createElement('a');
    link.className = 'chatbot-action-btn';
    link.href = action.href;
    link.textContent = action.label;
    if (action.external) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    } else {
      link.addEventListener('click', () => closeChat());
    }
    wrap.appendChild(link);
  });

  messagesEl.appendChild(wrap);
  scrollToBottom();
}

function scrollToBottom(): void {
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Minimal, safe Markdown renderer scoped to what the assistant is instructed
 * to produce: bold, bullet lists, and http(s)/mailto links. Input is HTML-escaped
 * first, so only our own controlled tags ever reach the DOM — no raw HTML passes through.
 */
function renderMarkdown(raw: string): string {
  let text = escapeHtml(raw.trim());

  text = text.replace(
    /\[([^[\]]+)\]\((https?:\/\/[^\s()]+|mailto:[^\s()]+)\)/g,
    (_m, label, url) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`
  );

  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  const lines = text.split('\n');
  let html = '';
  let inList = false;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    const isBullet = /^[-*]\s+/.test(line);

    if (isBullet) {
      if (!inList) {
        html += '<ul>';
        inList = true;
      }
      html += `<li>${line.replace(/^[-*]\s+/, '')}</li>`;
      continue;
    }

    if (inList) {
      html += '</ul>';
      inList = false;
    }

    if (line) {
      html += `<p>${line}</p>`;
    }
  }

  if (inList) html += '</ul>';

  return html;
}
