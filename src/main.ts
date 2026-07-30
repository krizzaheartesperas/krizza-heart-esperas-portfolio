import './style.css';
import { ProjectCategory } from './types';
import {
  renderExperience,
  renderProjects,
  renderSkills,
  renderCredentials,
  renderCertificates,
  renderProjectModal
} from './components/render';

function initApp(): void {
  // Theme Setup
  setupThemeToggle();

  // Render Dynamic Sections
  renderExperience('experienceContainer');
  renderProjects('timeline', 'all');
  showInitialProjectTimeline();
  initCarousels();
  setupFolderTabs();
  renderSkills('skillsContainer');
  renderCredentials('credentialsContainer');
  renderCertificates('certificatesContainer');

  // Interactive Setup
  setupMobileNav();
  setupNavScroll();
  setupScrollSpy();
  setupRevealObservers();
  setupProjectFilters();
  setupContactForm();
  setupDirectEmailBtn();
  setupLightbox();
  setupProjectModals();
}

function setupNavScroll(): void {
  const nav = document.getElementById('mainNav');
  if (!nav) return;

  const onScroll = (): void => {
    nav.classList.toggle('scrolled', window.scrollY > 24);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function setupMobileNav(): void {
  const navToggle = document.getElementById('navToggle') as HTMLButtonElement | null;
  const navLinks = document.getElementById('navLinks') as HTMLDivElement | null;
  const navOverlay = document.getElementById('navOverlay') as HTMLDivElement | null;

  if (!navToggle || !navLinks) return;

  const closeMenu = (): void => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navOverlay?.classList.remove('visible');
    navOverlay?.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  };

  const openMenu = (): void => {
    navLinks.classList.add('open');
    navToggle.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    navOverlay?.classList.add('visible');
    navOverlay?.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
  };

  navToggle.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navOverlay?.addEventListener('click', closeMenu);

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
}

function setupThemeToggle(): void {
  const themeToggles = document.querySelectorAll<HTMLButtonElement>('.theme-toggle');
  const storedTheme = localStorage.getItem('portfolio_theme');
  const initialTheme = storedTheme || 'dark';

  const applyTheme = (theme: string): void => {
    document.documentElement.setAttribute('data-theme', theme);
    const label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
    themeToggles.forEach(toggle => {
      toggle.setAttribute('aria-label', label);
      toggle.setAttribute('title', label);
    });
  };

  applyTheme(initialTheme);

  themeToggles.forEach(themeToggle => {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

      applyTheme(nextTheme);
      localStorage.setItem('portfolio_theme', nextTheme);
    });
  });
}

function setupScrollSpy(): void {
  const sections = document.querySelectorAll<HTMLElement>('section[id]');
  const links = document.querySelectorAll<HTMLAnchorElement>('.nav-links a[href^="#"], .mobile-dock a[href^="#"]');

  const spyObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(l => l.classList.remove('active'));
          document.querySelectorAll<HTMLAnchorElement>(
            `.nav-links a[href="#${entry.target.id}"], .mobile-dock a[href="#${entry.target.id}"]`
          ).forEach(active => active.classList.add('active'));
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
      setupFolderTabs();

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

function showInitialProjectTimeline(): void {
  const timeline = document.getElementById('timeline');
  if (!timeline) return;

  requestAnimationFrame(() => {
    timeline.classList.add('in');
  });
}

function setupFolderTabs(): void {
  const tabContainers = document.querySelectorAll<HTMLElement>('.folder-tabs');
  
  tabContainers.forEach(container => {
    const tabs = container.querySelectorAll<HTMLButtonElement>('.folder-tab');
    const contentArea = container.nextElementSibling as HTMLElement;
    if (!contentArea || !contentArea.classList.contains('folder-content')) return;
    const panes = contentArea.querySelectorAll<HTMLElement>('.tab-pane');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs and panes in this project
        tabs.forEach(t => t.classList.remove('active'));
        panes.forEach(p => p.classList.remove('active'));

        // Add active class to clicked tab and its target pane
        tab.classList.add('active');
        const targetId = tab.getAttribute('data-target');
        if (targetId) {
          const targetPane = document.getElementById(targetId);
          if (targetPane) {
            targetPane.classList.add('active');
            requestAnimationFrame(() => {
              window.dispatchEvent(new Event('resize'));
            });
          }
        }
      });
    });
  });
}

function openProjectView(projectId: string): void {
  const pv = document.getElementById('projectModal');
  if (!pv) return;

  pv.innerHTML = renderProjectModal(projectId);
  pv.scrollTop = 0;

  // Hide main page content and show project view
  document.body.classList.add('project-view-open');
  document.body.style.overflow = 'hidden';

  requestAnimationFrame(() => {
    pv.classList.add('active');
  });

  // Initialize interactivity after render
  initCarousels();
  setupFolderTabs();

  // Wire up back button
  const backBtn = pv.querySelector('#pvBackBtn');
  if (backBtn) {
    backBtn.addEventListener('click', closeProjectView);
  }
}

function closeProjectView(): void {
  const pv = document.getElementById('projectModal');
  if (!pv) return;
  pv.classList.remove('active');
  document.body.classList.remove('project-view-open');
  document.body.style.overflow = '';
  setTimeout(() => {
    pv.innerHTML = '';
  }, 450);
}

function setupProjectModals(): void {
  // Event delegation — listen for View Details button clicks anywhere in body
  document.body.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLElement;
    const btn = target.closest('.view-details-btn') as HTMLElement | null;
    if (btn) {
      const projectId = btn.getAttribute('data-project-id');
      if (projectId) openProjectView(projectId);
    }
  });

  // Close on Escape key (unless lightbox is open)
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key !== 'Escape') return;
    const lightbox = document.getElementById('lightboxModal');
    if (lightbox?.classList.contains('active')) return;
    closeProjectView();
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

let suppressLightboxClick = false;
let openProjectLightbox: ((images: LightboxImage[], startIndex: number) => void) | null = null;

interface LightboxImage {
  src: string;
  alt: string;
}

function getCarouselImages(carousel: HTMLElement): LightboxImage[] {
  return Array.from(carousel.querySelectorAll<HTMLImageElement>('.carousel-slide img')).map(img => ({
    src: img.src,
    alt: img.alt
  }));
}

function setupLightbox(): void {
  const modal = document.createElement('div');
  modal.id = 'lightboxModal';
  modal.className = 'lightbox-modal';
  modal.innerHTML = `
    <button class="lightbox-close" type="button" aria-label="Close">&times;</button>
    <button class="lightbox-nav prev" type="button" aria-label="Previous image">&#8249;</button>
    <div class="lightbox-viewport">
      <div class="lightbox-track" id="lightboxTrack"></div>
    </div>
    <button class="lightbox-nav next" type="button" aria-label="Next image">&#8250;</button>
    <div class="lightbox-footer">
      <span class="lightbox-counter mono" id="lightboxCounter"></span>
      <span class="lightbox-swipe-hint mono">Swipe to browse</span>
    </div>
  `;
  document.body.appendChild(modal);

  const track = modal.querySelector('#lightboxTrack') as HTMLElement;
  const counter = modal.querySelector('#lightboxCounter') as HTMLElement;
  const prevBtn = modal.querySelector('.lightbox-nav.prev') as HTMLButtonElement;
  const nextBtn = modal.querySelector('.lightbox-nav.next') as HTMLButtonElement;
  const viewport = modal.querySelector('.lightbox-viewport') as HTMLElement;
  const swipeHint = modal.querySelector('.lightbox-swipe-hint') as HTMLElement;

  let images: LightboxImage[] = [];
  let currentIndex = 0;
  let isDragging = false;
  let pointerStartX = 0;
  let pointerStartY = 0;
  let pointerId: number | null = null;
  const SWIPE_THRESHOLD = 48;

  function getSlideWidth(): number {
    return viewport.offsetWidth;
  }

  function updateLightbox(index: number, animate = true, offset = 0): void {
    if (images.length === 0) return;

    currentIndex = (index + images.length) % images.length;
    track.style.transition = animate
      ? 'transform 0.42s cubic-bezier(0.25, 1, 0.35, 1)'
      : 'none';

    const slideW = getSlideWidth();
    track.style.transform = `translateX(${-(currentIndex * slideW) + offset}px)`;
    counter.textContent = `${currentIndex + 1} / ${images.length}`;

    const hasMultiple = images.length > 1;
    prevBtn.hidden = !hasMultiple;
    nextBtn.hidden = !hasMultiple;
    counter.hidden = !hasMultiple;
    swipeHint.hidden = !hasMultiple;
  }

  function openLightbox(nextImages: LightboxImage[], startIndex: number): void {
    images = nextImages;
    currentIndex = Math.min(Math.max(startIndex, 0), Math.max(images.length - 1, 0));

    track.innerHTML = images.map(image => `
      <div class="lightbox-slide">
        <img src="${image.src}" alt="${image.alt}">
      </div>
    `).join('');

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    updateLightbox(currentIndex, false);
    requestAnimationFrame(() => updateLightbox(currentIndex, false));
  }

  function closeLightbox(): void {
    modal.classList.remove('active');
    document.body.style.overflow = document.body.classList.contains('project-view-open')
      ? 'hidden'
      : '';
    images = [];
    track.innerHTML = '';
  }

  function finishDrag(deltaX: number): void {
    isDragging = false;
    pointerId = null;

    if (images.length > 1 && Math.abs(deltaX) > SWIPE_THRESHOLD) {
      updateLightbox(deltaX > 0 ? currentIndex - 1 : currentIndex + 1);
    } else {
      updateLightbox(currentIndex);
    }
  }

  openProjectLightbox = openLightbox;

  document.body.addEventListener('click', (e: Event) => {
    if (suppressLightboxClick) return;

    const target = e.target as HTMLElement;
    const imgWrap = target.closest('.proj-img-wrap') || target.closest('.cert-img-wrap');
    if (!imgWrap) return;

    const img = imgWrap.querySelector('img') as HTMLImageElement | null;
    if (!img) return;

    const carousel = imgWrap.closest('.proj-carousel') as HTMLElement | null;
    if (carousel) {
      const gallery = getCarouselImages(carousel);
      const startIndex = gallery.findIndex(item => item.src === img.src);
      openLightbox(gallery, startIndex >= 0 ? startIndex : 0);
      return;
    }

    openLightbox([{ src: img.src, alt: img.alt }], 0);
  });

  modal.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLElement;
    if (target.id === 'lightboxModal' || target.classList.contains('lightbox-close')) {
      closeLightbox();
    }
  });

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    updateLightbox(currentIndex - 1);
  });

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    updateLightbox(currentIndex + 1);
  });

  viewport.addEventListener('pointerdown', (e: PointerEvent) => {
    if (images.length <= 1) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    isDragging = true;
    pointerStartX = e.clientX;
    pointerStartY = e.clientY;
    pointerId = e.pointerId;
    track.style.transition = 'none';
    viewport.setPointerCapture(e.pointerId);
  });

  viewport.addEventListener('pointermove', (e: PointerEvent) => {
    if (!isDragging || pointerId !== e.pointerId) return;

    const deltaX = e.clientX - pointerStartX;
    const deltaY = e.clientY - pointerStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      e.preventDefault();
      updateLightbox(currentIndex, false, deltaX);
    }
  });

  viewport.addEventListener('pointerup', (e: PointerEvent) => {
    if (!isDragging || pointerId !== e.pointerId) return;
    viewport.releasePointerCapture(e.pointerId);
    finishDrag(e.clientX - pointerStartX);
  });

  viewport.addEventListener('pointercancel', (e: PointerEvent) => {
    if (!isDragging || pointerId !== e.pointerId) return;
    finishDrag(0);
  });

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (!modal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      updateLightbox(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      updateLightbox(currentIndex + 1);
    }
  });

  window.addEventListener('resize', () => {
    if (modal.classList.contains('active')) {
      updateLightbox(currentIndex, false);
    }
  });
}

function initCarousels(): void {
  const carousels = document.querySelectorAll<HTMLElement>('.proj-carousel');

  carousels.forEach(carousel => {
    if (carousel.dataset.carouselInit === 'true') return;
    carousel.dataset.carouselInit = 'true';

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
    let dragOffset = 0;
    let isDragging = false;
    let pointerStartX = 0;
    let pointerStartY = 0;
    let pointerId: number | null = null;
    const SWIPE_THRESHOLD = 48;

    function getSlideWidth(): number {
      return container!.offsetWidth;
    }

    function updateCarousel(index: number, animate = true, offset = 0) {
      currentIndex = (index + slides.length) % slides.length;

      if (!animate) {
        track!.style.transition = 'none';
      } else {
        track!.style.transition = 'transform 0.42s cubic-bezier(0.25, 1, 0.35, 1)';
      }

      const slideW = getSlideWidth();
      const translateX = -(currentIndex * slideW) + offset;
      track!.style.transform = `translateX(${translateX}px)`;

      slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === currentIndex);
      });

      indicators.forEach((indicator, idx) => {
        indicator.classList.toggle('active', idx === currentIndex);
      });
    }

    function startAutoplay() {
      if (slides.length <= 1) return;
      stopAutoplay();
      autoplayTimer = window.setInterval(() => {
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
      }, 3200);
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

    function finishDrag(deltaX: number) {
      isDragging = false;
      dragOffset = 0;
      pointerId = null;

      if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
        updateCarousel(deltaX > 0 ? currentIndex - 1 : currentIndex + 1);
      } else {
        updateCarousel(currentIndex);
      }
      resetAutoplay();
    }

    function onPointerDown(e: PointerEvent) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;

      isDragging = true;
      pointerStartX = e.clientX;
      pointerStartY = e.clientY;
      pointerId = e.pointerId;
      dragOffset = 0;
      stopAutoplay();

      if (slides.length > 1) {
        track!.style.transition = 'none';
        container!.setPointerCapture(e.pointerId);
      }
    }

    function onPointerMove(e: PointerEvent) {
      if (!isDragging || pointerId !== e.pointerId) return;

      const deltaX = e.clientX - pointerStartX;
      const deltaY = e.clientY - pointerStartY;

      if (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8) {
        suppressLightboxClick = true;
      }

      if (slides.length > 1 && Math.abs(deltaX) > Math.abs(deltaY)) {
        e.preventDefault();
        dragOffset = deltaX;
        updateCarousel(currentIndex, false, dragOffset);
      }
    }

    function onPointerUp(e: PointerEvent) {
      if (!isDragging || pointerId !== e.pointerId) return;

      const deltaX = e.clientX - pointerStartX;
      const deltaY = e.clientY - pointerStartY;

      if (slides.length > 1) {
        container!.releasePointerCapture(e.pointerId);
      }

      if (
        Math.abs(deltaX) <= SWIPE_THRESHOLD &&
        Math.abs(deltaX) < 10 &&
        Math.abs(deltaY) < 10
      ) {
        isDragging = false;
        dragOffset = 0;
        pointerId = null;
        updateCarousel(currentIndex);
        resetAutoplay();

        const img = slides[currentIndex]?.querySelector('img') as HTMLImageElement | undefined;
        if (img && openProjectLightbox) {
          suppressLightboxClick = true;
          openProjectLightbox(getCarouselImages(carousel), currentIndex);
          window.setTimeout(() => {
            suppressLightboxClick = false;
          }, 100);
        }
        return;
      }

      if (slides.length > 1) {
        finishDrag(deltaX);
      } else {
        isDragging = false;
        pointerId = null;
      }

      window.setTimeout(() => {
        suppressLightboxClick = false;
      }, 100);
    }

    function onPointerCancel(e: PointerEvent) {
      if (!isDragging || pointerId !== e.pointerId) return;
      finishDrag(0);
    }

    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerup', onPointerUp);
    container.addEventListener('pointercancel', onPointerCancel);

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

    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    const onResize = (): void => {
      if (!carousel.isConnected) {
        window.removeEventListener('resize', onResize);
        return;
      }
      updateCarousel(currentIndex, false);
    };
    window.addEventListener('resize', onResize);

    updateCarousel(0, false);
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
