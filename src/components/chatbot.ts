import '../chatbot.css';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  isError?: boolean;
}

interface NavAction {
  label: string;
  href?: string;
  external?: boolean;
  copyValue?: string;
}

const GREETING =
  "Hi! I'm Krizza's AI Portfolio Assistant. I can tell you about my background, education, skills, projects, experience, and technical background. What would you like to know?";

const QUICK_QUESTIONS = [
  'Tell me about yourself',
  'My projects',
  'My technical skills',
  'My internship experience',
  'My AI experience',
  'My QA experience',
  'My education',
  'Contact me',
  'My GitHub',
];

const RECRUITER_QUESTIONS = [
  "What are Krizza's strongest technical skills?",
  'What full-stack experience does she have?',
  'What projects demonstrate her technical ability?',
  'What AI experience does she have?',
  'What database technologies has she used?',
  'What did she do during her internship?',
  'Where can I find her resume?',
  'How can I contact her?',
];

const EMAIL_ADDRESS = 'krizzaheart.esperas@gmail.com';

const CHATBOT_ICON_SRC = '/chatbot-icon.jpg';

const NAV_RULES: { pattern: RegExp; action: NavAction }[] = [
  { pattern: /\bproject/i, action: { label: 'View My Projects', href: '#projects' } },
  { pattern: /internship|hris|highly succeed/i, action: { label: 'View My Experience', href: '#experience' } },
  { pattern: /skill|technolog|stack/i, action: { label: 'View My Skills', href: '#skills' } },
  { pattern: /resume|cv\b/i, action: { label: 'View My Resume', href: '/resume.pdf', external: true } },
  { pattern: /\bemail\b/i, action: { label: 'Email Me', copyValue: EMAIL_ADDRESS } },
  { pattern: /contact|reach|hire|get in touch/i, action: { label: 'Contact Me', href: '#contact' } },
  { pattern: /award|credential|certificat/i, action: { label: 'View My Credentials', href: '#credentials' } },
  { pattern: /education|degree|university|graduat|gwa/i, action: { label: 'About Me', href: '#about' } },
  { pattern: /github/i, action: { label: 'View My GitHub', href: 'https://github.com/krizzaheartesperas', external: true } },
  { pattern: /linkedin/i, action: { label: 'View My LinkedIn', href: 'https://www.linkedin.com/in/krizza-heart-esperas-550ab9368', external: true } },
];

const MAX_MESSAGE_LENGTH = 600;
const MAX_HISTORY_SENT = 10;

const messages: ChatMessage[] = [];
let isSending = false;
let hasOpenedBefore = false;
let recruiterMode = false;
let activeProjectId: string | undefined;
let activeProjectName: string | undefined;

let toggleBtn: HTMLButtonElement;
let closeBtn: HTMLButtonElement;
let panel: HTMLDivElement;
let messagesEl: HTMLDivElement;
let quickQuestionsEl: HTMLDivElement;
let contextBannerEl: HTMLDivElement;
let recruiterBtn: HTMLButtonElement;
let form: HTMLFormElement;
let input: HTMLTextAreaElement;
let sendBtn: HTMLButtonElement;

export function initChatbot(): void {
  const root = document.createElement('div');
  root.className = 'chatbot-root';
  root.innerHTML = `
    <button type="button" class="chatbot-toggle" id="chatbotToggle" aria-haspopup="dialog" aria-expanded="false" aria-controls="chatbotPanel" aria-label="Open AI Portfolio Assistant">
      <img class="chatbot-icon-chat" src="${CHATBOT_ICON_SRC}" alt="" aria-hidden="true" />
      <svg class="chatbot-icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>

    <div class="chatbot-panel" id="chatbotPanel" role="dialog" aria-modal="false" aria-labelledby="chatbotTitle" hidden>
      <div class="chatbot-header">
        <div class="chatbot-header-info">
          <span class="chatbot-avatar">
            <img src="${CHATBOT_ICON_SRC}" alt="" />
            <span class="chatbot-status-dot" aria-hidden="true"></span>
          </span>
          <div class="chatbot-header-text">
            <h2 id="chatbotTitle">AI Portfolio Assistant</h2>
            <span>Online &middot; Ask me anything</span>
          </div>
        </div>
        <div class="chatbot-header-actions">
          <button type="button" class="chatbot-icon-btn" id="chatbotRecruiter" aria-label="Toggle recruiter mode" aria-pressed="false" title="Recruiter mode">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
          </button>
          <button type="button" class="chatbot-icon-btn" id="chatbotReset" aria-label="Start new conversation" title="New conversation">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-8.14L1 10"/></svg>
          </button>
          <button type="button" class="chatbot-icon-btn" id="chatbotClose" aria-label="Close AI Portfolio Assistant">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </div>

      <div class="chatbot-context-banner" id="chatbotContextBanner" hidden></div>

      <div class="chatbot-messages" id="chatbotMessages" role="log" aria-live="polite"></div>

      <div class="chatbot-quick-questions" id="chatbotQuickQuestions"></div>

      <form class="chatbot-input-row" id="chatbotForm">
        <textarea
          class="chatbot-input"
          id="chatbotInput"
          rows="1"
          maxlength="${MAX_MESSAGE_LENGTH}"
          placeholder="Ask me anything..."
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
  contextBannerEl = root.querySelector('#chatbotContextBanner') as HTMLDivElement;
  recruiterBtn = root.querySelector('#chatbotRecruiter') as HTMLButtonElement;
  form = root.querySelector('#chatbotForm') as HTMLFormElement;
  input = root.querySelector('#chatbotInput') as HTMLTextAreaElement;
  sendBtn = root.querySelector('#chatbotSend') as HTMLButtonElement;
  closeBtn = root.querySelector('#chatbotClose') as HTMLButtonElement;
  const resetBtn = root.querySelector('#chatbotReset') as HTMLButtonElement;

  toggleBtn.addEventListener('click', () => {
    panel.classList.contains('open') ? closeChat() : openChat();
  });
  closeBtn.addEventListener('click', closeChat);
  resetBtn.addEventListener('click', () => resetConversation());
  recruiterBtn.addEventListener('click', toggleRecruiterMode);

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

  window.addEventListener('resize', applyViewportMode);

  renderEmptyState();
}

/**
 * Mobile and desktop share one panel; this decides which mode applies right
 * now so it can be re-checked on resize/orientation change while the chat is
 * open, since a rotated phone can cross the 768px breakpoint mid-session.
 */
function isMobileViewport(): boolean {
  return window.matchMedia('(max-width: 768px)').matches;
}

function lockBodyScroll(): void {
  document.body.classList.add('chatbot-mobile-open');
  document.body.style.overflow = 'hidden';
}

function unlockBodyScroll(): void {
  document.body.classList.remove('chatbot-mobile-open');
  if (!document.body.classList.contains('project-view-open')) {
    document.body.style.overflow = '';
  }
}

function applyViewportMode(): void {
  if (!panel.classList.contains('open')) return;
  const mobile = isMobileViewport();
  panel.setAttribute('aria-modal', String(mobile));
  if (mobile) {
    lockBodyScroll();
  } else {
    unlockBodyScroll();
  }
}

/**
 * Entry point for a project's "Ask AI about this project" button (wired up
 * in main.ts). Opens the assistant scoped to that project: fresh
 * conversation, a project-specific greeting, and every message tagged with
 * `projectContext` so the backend prioritizes that project's knowledge.
 */
export function openChatWithProject(projectId: string, projectName: string): void {
  activeProjectId = projectId;
  activeProjectName = projectName;
  recruiterMode = false;
  recruiterBtn.classList.remove('active');
  recruiterBtn.setAttribute('aria-pressed', 'false');
  messages.length = 0;
  messagesEl.innerHTML = '';
  updateContextBanner();
  renderEmptyState();
  openChat();
}

function openChat(): void {
  panel.hidden = false;
  requestAnimationFrame(() => panel.classList.add('open'));
  toggleBtn.classList.add('open');
  toggleBtn.setAttribute('aria-expanded', 'true');
  toggleBtn.setAttribute('aria-label', 'Close AI Portfolio Assistant');

  const mobile = isMobileViewport();
  panel.setAttribute('aria-modal', String(mobile));
  if (mobile) lockBodyScroll();

  if (!hasOpenedBefore) {
    hasOpenedBefore = true;
  }

  // On mobile the panel becomes a full-screen dialog, so focus goes to the
  // close button instead of the textarea to avoid yanking up the keyboard
  // the instant it opens.
  window.setTimeout(() => (mobile ? closeBtn : input).focus(), 260);
}

function closeChat(): void {
  panel.classList.remove('open');
  toggleBtn.classList.remove('open');
  toggleBtn.setAttribute('aria-expanded', 'false');
  toggleBtn.setAttribute('aria-label', 'Open AI Portfolio Assistant');
  unlockBodyScroll();
  window.setTimeout(() => {
    if (!panel.classList.contains('open')) panel.hidden = true;
  }, 300);
  toggleBtn.focus();
}

function resetConversation(): void {
  activeProjectId = undefined;
  activeProjectName = undefined;
  updateContextBanner();
  messages.length = 0;
  messagesEl.innerHTML = '';
  renderEmptyState();
  input.value = '';
  autoResizeInput();
  sendBtn.disabled = true;
  input.focus();
}

function toggleRecruiterMode(): void {
  recruiterMode = !recruiterMode;
  recruiterBtn.classList.toggle('active', recruiterMode);
  recruiterBtn.setAttribute('aria-pressed', String(recruiterMode));
  recruiterBtn.title = recruiterMode ? 'Recruiter mode: on' : 'Recruiter mode';

  const subtitle = panel.querySelector('.chatbot-header-text span');
  if (subtitle) {
    subtitle.textContent = recruiterMode ? 'Recruiter mode · quick answers' : 'Online · Ask me anything';
  }

  if (!quickQuestionsEl.hidden && !activeProjectId) {
    renderQuickQuestions();
  }
}

function updateContextBanner(): void {
  if (!activeProjectName) {
    contextBannerEl.hidden = true;
    contextBannerEl.innerHTML = '';
    return;
  }

  contextBannerEl.hidden = false;
  contextBannerEl.innerHTML = `
    <span>Discussing: <strong>${escapeHtml(activeProjectName)}</strong></span>
    <button type="button" class="chatbot-context-clear" aria-label="Stop discussing this project">&times;</button>
  `;
  contextBannerEl.querySelector('.chatbot-context-clear')?.addEventListener('click', () => {
    activeProjectId = undefined;
    activeProjectName = undefined;
    updateContextBanner();
  });
}

function createAvatarEl(): HTMLSpanElement {
  const avatar = document.createElement('span');
  avatar.className = 'chatbot-avatar chatbot-avatar-msg';
  avatar.innerHTML = `<img src="${CHATBOT_ICON_SRC}" alt="" />`;
  return avatar;
}

function renderEmptyState(): void {
  const row = document.createElement('div');
  row.className = 'chatbot-msg-row';
  row.appendChild(createAvatarEl());

  const greetingEl = document.createElement('div');
  greetingEl.className = 'chatbot-greeting';
  greetingEl.textContent = activeProjectName
    ? `What would you like to know about the ${activeProjectName}?`
    : GREETING;
  row.appendChild(greetingEl);

  messagesEl.appendChild(row);
  renderQuickQuestions();
}

function renderQuickQuestions(): void {
  quickQuestionsEl.innerHTML = '';
  quickQuestionsEl.hidden = false;

  const list = activeProjectId
    ? ['Give me an overview', 'What technologies were used?', 'What was your role in this project?']
    : recruiterMode
      ? RECRUITER_QUESTIONS
      : QUICK_QUESTIONS;

  list.forEach(question => {
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
      body: JSON.stringify({
        message: trimmed,
        history,
        ...(activeProjectId ? { projectContext: activeProjectId } : {}),
      }),
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
        "Sorry, I'm having trouble responding right now. Please try again or use the Contact section to reach me directly.",
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

  if (message.role === 'assistant') {
    const row = document.createElement('div');
    row.className = 'chatbot-msg-row';
    row.appendChild(createAvatarEl());
    row.appendChild(el);
    messagesEl.appendChild(row);
  } else {
    messagesEl.appendChild(el);
  }
  scrollToBottom();
}

function renderTypingIndicator(): HTMLDivElement {
  const row = document.createElement('div');
  row.className = 'chatbot-msg-row';
  row.appendChild(createAvatarEl());

  const el = document.createElement('div');
  el.className = 'chatbot-typing';
  el.setAttribute('aria-label', 'Assistant is typing');
  el.innerHTML = '<span></span><span></span><span></span>';
  row.appendChild(el);

  messagesEl.appendChild(row);
  scrollToBottom();
  return row;
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
    if (action.copyValue) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chatbot-action-btn';
      btn.textContent = action.label;
      btn.addEventListener('click', () => copyToClipboard(action.copyValue!, btn, action.label));
      wrap.appendChild(btn);
      return;
    }

    const link = document.createElement('a');
    link.className = 'chatbot-action-btn';
    link.href = action.href!;
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

async function copyToClipboard(value: string, btn: HTMLButtonElement, originalLabel: string): Promise<void> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = value;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }
    btn.textContent = '✓ Email copied';
    btn.classList.add('copied');
  } catch {
    btn.textContent = 'Copy failed — try again';
  } finally {
    window.setTimeout(() => {
      btn.textContent = originalLabel;
      btn.classList.remove('copied');
    }, 2000);
  }
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
