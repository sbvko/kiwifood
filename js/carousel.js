/**
 * KIWI Fast Food — Reusable Responsive Carousel Engine
 * Supports prev/next controls, dynamic pagination dots, keyboard arrows, and mobile touch swipe.
 */

class KiwiCarousel {
  constructor({ rootId, trackId, prevId, nextId, dotsId }) {
    this.root = document.getElementById(rootId);
    this.track = document.getElementById(trackId);
    this.prevBtn = document.getElementById(prevId);
    this.nextBtn = document.getElementById(nextId);
    this.dotsContainer = document.getElementById(dotsId);

    if (!this.root || !this.track) return;

    this.slides = Array.from(this.track.children);
    this.currentIndex = 0;
    this.slidesPerView = 1;
    this.maxIndex = 0;

    // Touch swipe tracking
    this.touchStartX = 0;
    this.touchEndX = 0;

    this.init();
  }

  init() {
    this.calculateMetrics();
    this.renderDots();
    this.update();
    this.bindEvents();
  }

  calculateMetrics() {
    const width = window.innerWidth;
    if (width >= 1024) {
      this.slidesPerView = 3;
    } else if (width >= 768) {
      this.slidesPerView = 2;
    } else {
      this.slidesPerView = 1;
    }

    this.maxIndex = Math.max(0, this.slides.length - this.slidesPerView);
    if (this.currentIndex > this.maxIndex) {
      this.currentIndex = this.maxIndex;
    }
  }

  renderDots() {
    if (!this.dotsContainer) return;
    const totalPages = this.maxIndex + 1;
    this.dotsContainer.innerHTML = '';

    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel__dot' + (i === this.currentIndex ? ' active' : '');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `${i + 1}-sahifa`);
      dot.setAttribute('aria-selected', String(i === this.currentIndex));
      dot.addEventListener('click', () => this.goTo(i));
      this.dotsContainer.appendChild(dot);
    }
  }

  update() {
    if (!this.slides.length) return;

    const slideWidth = this.slides[0].getBoundingClientRect().width;
    const trackStyle = window.getComputedStyle(this.track);
    const gap = parseFloat(trackStyle.columnGap || trackStyle.gap || '24') || 24;
    const offset = this.currentIndex * (slideWidth + gap);

    this.track.style.transform = `translate3d(-${offset}px, 0, 0)`;

    if (this.prevBtn) {
      this.prevBtn.disabled = this.currentIndex <= 0;
    }
    if (this.nextBtn) {
      this.nextBtn.disabled = this.currentIndex >= this.maxIndex;
    }

    if (this.dotsContainer) {
      const dots = Array.from(this.dotsContainer.children);
      dots.forEach((dot, idx) => {
        const isActive = idx === this.currentIndex;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-selected', String(isActive));
      });
    }
  }

  goTo(index) {
    this.currentIndex = Math.max(0, Math.min(index, this.maxIndex));
    this.update();
  }

  prev() {
    this.goTo(this.currentIndex - 1);
  }

  next() {
    this.goTo(this.currentIndex + 1);
  }

  bindEvents() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prev());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.next());
    }

    // Keyboard navigation when focused
    this.root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.prev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.next();
      }
    });

    // Touch swipe gestures
    this.track.addEventListener(
      'touchstart',
      (e) => {
        this.touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    this.track.addEventListener(
      'touchend',
      (e) => {
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
      },
      { passive: true }
    );

    // Responsive recalculation
    let resizeTimer;
    window.addEventListener('resize', () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const prevPages = this.maxIndex + 1;
        this.calculateMetrics();
        if (prevPages !== this.maxIndex + 1) {
          this.renderDots();
        }
        this.update();
      }, 120);
    });
  }

  handleSwipe() {
    const threshold = 42;
    const diff = this.touchStartX - this.touchEndX;
    if (Math.abs(diff) < threshold) return;

    if (diff > 0) {
      this.next();
    } else {
      this.prev();
    }
  }
}

function initCarousels() {
  new KiwiCarousel({
    rootId: 'featuredCarousel',
    trackId: 'featuredTrack',
    prevId: 'featuredPrev',
    nextId: 'featuredNext',
    dotsId: 'featuredDots'
  });

  new KiwiCarousel({
    rootId: 'reviewsCarousel',
    trackId: 'reviewsTrack',
    prevId: 'reviewsPrev',
    nextId: 'reviewsNext',
    dotsId: 'reviewsDots'
  });
}
