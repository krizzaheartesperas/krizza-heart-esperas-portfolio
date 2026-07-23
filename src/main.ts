import './style.css';
import { ProjectCategory } from './types';
import {
  renderExperience,
  renderProjects,
  renderSkills,
  renderCredentials,
  renderCertificates
} from './components/render';

function initApp(): void {
  // Theme Setup
  setupThemeToggle();

  // Render Dynamic Sections
  renderExperience('experienceContainer');
  renderProjects('timeline', 'all');
  initCarousels();
  renderSkills('skillsContainer');
  renderCredentials('credentialsContainer');
  renderCertificates('certificatesContainer');

  // Interactive Setup
  setupMobileNav();
  setupScrollSpy();
  setupRevealObservers();
  setupProjectFilters();
  setupContactForm();
  setupDirectEmailBtn();
  setupLightbox();
}

function setupThemeToggle(): void {
  const themeToggle = document.getElementById('themeToggle') as HTMLButtonElement | null;
  const storedTheme = localStorage.getItem('portfolio_theme');
  const initialTheme = storedTheme || 'dark';

  document.documentElement.setAttribute('data-theme', initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('portfolio_theme', nextTheme);
    });
  }
}

function setupMobileNav(): void {
  const navToggle = document.getElementById('navToggle') as HTMLButtonElement | null;
  const navLinks = document.getElementById('navLinks') as HTMLDivElement | null;

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }
}

function setupScrollSpy(): void {
  const sections = document.querySelectorAll<HTMLElement>('section[id]');
  const links = document.querySelectorAll<HTMLAnchorElement>('.nav-links a[href^="#"]');

  const spyObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(l => l.classList.remove('active'));
          const active = document.querySelector<HTMLAnchorElement>(
            `.nav-links a[href="#${entry.target.id}"]`
          );
          if (active) active.classList.add('active');
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach(s => spyObserver.observe(s));
}

function setupRevealObservers(): void {
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  const timeline = document.getElementById('timeline');
  if (timeline) {
    const timelineObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            timeline.classList.add('in');
          }
        });
      },
      { threshold: 0.2 }
    );
    timelineObserver.observe(timeline);
  }
}

function setupProjectFilters(): void {
  const filterBtns = document.querySelectorAll<HTMLButtonElement>('.filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = (btn.getAttribute('data-filter') as ProjectCategory) || 'all';

      // Update button active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Re-render project timeline
      renderProjects('timeline', category);
      initCarousels();

      // Re-trigger timeline animation
      const timeline = document.getElementById('timeline');
      if (timeline) {
        timeline.classList.remove('in');
        requestAnimationFrame(() => {
          timeline.classList.add('in');
        });
      }
    });
  });
}

function setupContactForm(): void {
  const form = document.getElementById('contactForm') as HTMLFormElement | null;
  const feedback = document.getElementById('formFeedback') as HTMLDivElement | null;

  if (form && feedback) {
    form.addEventListener('submit', async (e: Event) => {
      e.preventDefault();

      const nameInput = document.getElementById('contactName') as HTMLInputElement | null;
      const emailInput = document.getElementById('contactEmail') as HTMLInputElement | null;
      const messageInput = document.getElementById('contactMessage') as HTMLTextAreaElement | null;
      const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement | null;

      if (!nameInput?.value || !emailInput?.value || !messageInput?.value) {
        feedback.className = 'form-feedback error';
        feedback.textContent = 'Please fill out all fields before sending your message.';
        return;
      }

      // Show loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }
      feedback.className = 'form-feedback';
      feedback.textContent = '';

      try {
        const apiKey = import.meta.env.VITE_WEB3FORMS_KEY as string;

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: apiKey,
            name: nameInput.value,
            email: emailInput.value,
            message: messageInput.value,
            subject: `Portfolio Inquiry from ${nameInput.value}`,
          }),
        });

        const result = await response.json();

        if (result.success) {
          feedback.className = 'form-feedback success';
          feedback.textContent = `Thank you, ${nameInput.value}! Your message has been sent successfully. I'll get back to you soon.`;
          form.reset();
        } else {
          throw new Error(result.message || 'Submission failed');
        }
      } catch (err) {
        feedback.className = 'form-feedback error';
        feedback.textContent = 'Oops! Something went wrong. Please try again or reach out directly via email.';
        console.error('Web3Forms error:', err);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
        }
      }
    });
  }
}

function setupLightbox(): void {
  const modal = document.createElement('div');
  modal.id = 'lightboxModal';
  modal.className = 'lightbox-modal';
  modal.innerHTML = `
    <span class="lightbox-close">&times;</span>
    <img class="lightbox-content" id="lightboxImg" alt="Enlarged project view">
  `;
  document.body.appendChild(modal);

  const lightboxImg = modal.querySelector('#lightboxImg') as HTMLImageElement;

  document.body.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLElement;
    const imgWrap = target.closest('.proj-img-wrap') || target.closest('.cert-img-wrap');
    if (imgWrap) {
      const img = imgWrap.querySelector('img');
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        modal.classList.add('active');
      }
    }
  });

  modal.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLElement;
    if (target.id === 'lightboxModal' || target.classList.contains('lightbox-close')) {
      modal.classList.remove('active');
    }
  });
}

function initCarousels(): void {
  const carousels = document.querySelectorAll<HTMLElement>('.proj-carousel');

  carousels.forEach(carousel => {
    const track = carousel.querySelector<HTMLElement>('.carousel-track');
    const slides = Array.from(carousel.querySelectorAll<HTMLElement>('.carousel-slide'));
    const indicators = Array.from(carousel.querySelectorAll<HTMLButtonElement>('.carousel-indicator'));
    const prevBtn = carousel.querySelector<HTMLButtonElement>('.carousel-btn.prev');
    const nextBtn = carousel.querySelector<HTMLButtonElement>('.carousel-btn.next');
    const container = carousel.querySelector<HTMLElement>('.carousel-track-container');

    if (!track || slides.length === 0 || !container) return;

    let currentIndex = 0;
    let autoplayTimer: number | undefined;
    let goingForward = true;

    function getSlideWidth(): number {
      const slide = slides[0];
      const gap = 16;
      return slide.offsetWidth + gap;
    }

    function updateCarousel(index: number, animate = true) {
      currentIndex = (index + slides.length) % slides.length;

      if (!animate) {
        track!.style.transition = 'none';
      } else {
        track!.style.transition = 'transform 0.52s cubic-bezier(0.25, 1, 0.5, 1)';
      }

      // Center the active slide in the container
      const slideW = getSlideWidth();
      const containerW = container!.offsetWidth;
      // Offset = move track so currentIndex slide sits in center
      const offset = (containerW / 2) - (currentIndex * slideW) - (slides[0].offsetWidth / 2);
      track!.style.transform = `translateX(${offset}px)`;

      // Update classes — only active gets zoom, others none
      slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === currentIndex);
      });

      // Update indicators
      indicators.forEach((indicator, idx) => {
        indicator.classList.toggle('active', idx === currentIndex);
      });
    }

    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = window.setInterval(() => {
        if (slides.length <= 1) return;
        if (goingForward) {
          if (currentIndex === slides.length - 1) {
            goingForward = false;
            updateCarousel(currentIndex - 1);
          } else {
            updateCarousel(currentIndex + 1);
          }
        } else {
          if (currentIndex === 0) {
            goingForward = true;
            updateCarousel(currentIndex + 1);
          } else {
            updateCarousel(currentIndex - 1);
          }
        }
      }, 2800);
    }

    function stopAutoplay() {
      if (autoplayTimer !== undefined) {
        clearInterval(autoplayTimer);
        autoplayTimer = undefined;
      }
    }

    function resetAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        updateCarousel(currentIndex - 1);
        resetAutoplay();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        updateCarousel(currentIndex + 1);
        resetAutoplay();
      });
    }

    indicators.forEach((indicator, idx) => {
      indicator.addEventListener('click', (e) => {
        e.stopPropagation();
        updateCarousel(idx);
        resetAutoplay();
      });
    });

    slides.forEach((slide, idx) => {
      slide.addEventListener('click', (e) => {
        if (!slide.classList.contains('active')) {
          e.stopPropagation();
          updateCarousel(idx);
          resetAutoplay();
        }
      });
    });

    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    // Initial render — no animation
    updateCarousel(0, false);
    // Re-apply with correct offsets after layout settles
    requestAnimationFrame(() => updateCarousel(0, false));

    startAutoplay();
  });
}

function setupDirectEmailBtn(): void {
  const btn = document.getElementById('directEmailBtn') as HTMLButtonElement | null;
  if (!btn) return;

  const EMAIL = 'krizzaheart.esperas@gmail.com';
  const SUBJECT = encodeURIComponent('Portfolio Inquiry');

  btn.addEventListener('click', () => {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${SUBJECT}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
