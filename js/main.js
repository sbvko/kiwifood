/**
 * KIWI Fast Food — Main Application Logic
 * Handles sticky navbar, mobile drawer, scroll spy, IntersectionObserver reveals,
 * back-to-top button, interactive order cart & Uzbek form validation.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMenuSection();
  initCarousels();
  initNavigation();
  initScrollEffects();
  initOrderSystem();
});

/* ==========================================================================
   1. Navigation, Mobile Drawer & Active Link Highlighting
   ========================================================================== */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeTriggers = document.querySelectorAll('[data-close-menu]');
  const navLinks = document.querySelectorAll('.nav__link, .mobile-menu__link');
  const sections = document.querySelectorAll('main section[id], footer[id]');

  function openMobileMenu() {
    if (!mobileMenu || !hamburgerBtn) return;
    mobileMenu.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    hamburgerBtn.classList.add('is-active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!mobileMenu || !hamburgerBtn) return;
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburgerBtn.classList.remove('is-active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('is-open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  closeTriggers.forEach((el) => {
    el.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('is-open')) {
      closeMobileMenu();
    }
  });

  // Sticky navbar & active section scroll spy
  function updateNavbarAndScrollSpy() {
    const scrollY = window.scrollY;

    if (navbar) {
      navbar.classList.toggle('is-scrolled', scrollY > 40);
    }

    let currentId = 'bosh-sahifa';
    const offset = 160;

    sections.forEach((section) => {
      const top = section.offsetTop - offset;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentId = section.id;
      }
    });

    // Highlight Aloqa when near page bottom
    if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 40) {
      currentId = 'aloqa';
    }

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `#${currentId}`);
    });
  }

  window.addEventListener('scroll', updateNavbarAndScrollSpy, { passive: true });
  updateNavbarAndScrollSpy();
}

/* ==========================================================================
   2. Scroll Progress, Back-to-Top & IntersectionObserver Reveal Animations
   ========================================================================== */
function initScrollEffects() {
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');

  function handleScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scrollProgress) {
      scrollProgress.style.width = `${progress}%`;
    }

    if (backToTop) {
      backToTop.classList.toggle('is-visible', scrollTop > 480);
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Reveal animations via IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal-up');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || '0';
            entry.target.style.transitionDelay = `${delay}ms`;
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-revealed'));
  }
}

/* ==========================================================================
   3. Interactive Order Cart, Quick-Add & Uzbek Form Validation
   ========================================================================== */
function initOrderSystem() {
  const orderModal = document.getElementById('orderModal');
  const cartTrigger = document.getElementById('cartTrigger');
  const cartCount = document.getElementById('cartCount');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartTotalPrice = document.getElementById('cartTotalPrice');
  const clearCartBtn = document.getElementById('clearCartBtn');
  const orderForm = document.getElementById('orderForm');
  const formAlert = document.getElementById('formAlert');
  const toast = document.getElementById('toast');

  // Pre-seed with 1 signature item so modal is immediately actionable if opened directly
  let cart = [
    { name: 'KIWI Burger', price: 32000, qty: 1 }
  ];

  let toastTimer;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 2600);
  }

  function renderCart() {
    if (!cartItemsList || !cartTotalPrice || !cartCount) return;

    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalSum = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    cartCount.textContent = String(totalItems);
    cartTotalPrice.textContent = `${formatUZS(totalSum)} so'm`;

    if (cart.length === 0) {
      cartItemsList.innerHTML = `<p class="cart-empty">Savatchangiz hozircha bo'sh. Menyudan taom tanlang.</p>`;
      return;
    }

    cartItemsList.innerHTML = cart
      .map(
        (item, index) => `
        <div class="cart-item">
          <div class="cart-item__info">
            <strong>${item.name}</strong>
            <span>${formatUZS(item.price * item.qty)} so'm</span>
          </div>
          <div class="cart-item__qty">
            <button type="button" class="qty-btn" data-qty-action="dec" data-index="${index}" aria-label="Kamaytirish">−</button>
            <span>${item.qty}</span>
            <button type="button" class="qty-btn" data-qty-action="inc" data-index="${index}" aria-label="Ko'paytirish">+</button>
          </div>
        </div>
      `
      )
      .join('');
  }

  function addItemToCart(name, price) {
    const existing = cart.find((item) => item.name === name);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name, price: Number(price), qty: 1 });
    }
    renderCart();
    showToast(`"${name}" savatga qo'shildi!`);
  }

  function openOrderModal() {
    if (!orderModal) return;
    renderCart();
    orderModal.classList.add('is-open');
    orderModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeOrderModal() {
    if (!orderModal) return;
    orderModal.classList.remove('is-open');
    orderModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (cartTrigger) {
    cartTrigger.addEventListener('click', openOrderModal);
  }

  document.querySelectorAll('[data-open-order]').forEach((btn) => {
    btn.addEventListener('click', openOrderModal);
  });

  document.querySelectorAll('[data-close-order]').forEach((btn) => {
    btn.addEventListener('click', closeOrderModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && orderModal && orderModal.classList.contains('is-open')) {
      closeOrderModal();
    }
  });

  // Delegated click for all "Buyurtma berish" / "+" buttons across static & dynamic cards
  document.addEventListener('click', (e) => {
    const quickBtn = e.target.closest('[data-quick-add]');
    if (quickBtn) {
      const name = quickBtn.dataset.quickAdd;
      const price = quickBtn.dataset.quickPrice;
      addItemToCart(name, price);
      return;
    }

    const qtyBtn = e.target.closest('[data-qty-action]');
    if (qtyBtn) {
      const index = Number(qtyBtn.dataset.index);
      const action = qtyBtn.dataset.qtyAction;
      if (!cart[index]) return;

      if (action === 'inc') {
        cart[index].qty += 1;
      } else if (action === 'dec') {
        cart[index].qty -= 1;
        if (cart[index].qty <= 0) {
          cart.splice(index, 1);
        }
      }
      renderCart();
    }
  });

  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      cart = [];
      renderCart();
      showToast('Savat tozalandi');
    });
  }

  // Form Validation & Submission
  if (orderForm) {
    const nameInput = document.getElementById('customerName');
    const phoneInput = document.getElementById('customerPhone');
    const addressInput = document.getElementById('customerAddress');

    const nameError = document.getElementById('nameError');
    const phoneError = document.getElementById('phoneError');
    const addressError = document.getElementById('addressError');

    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Reset errors
      [nameInput, phoneInput, addressInput].forEach((inp) => inp.classList.remove('is-invalid'));
      [nameError, phoneError, addressError].forEach((err) => (err.textContent = ''));
      formAlert.className = 'form-alert';
      formAlert.textContent = '';

      if (cart.length === 0) {
        formAlert.classList.add('is-error');
        formAlert.textContent = 'Iltimos, avval menyudan kamida bitta taom tanlang.';
        return;
      }

      if (nameInput.value.trim().length < 2) {
        nameInput.classList.add('is-invalid');
        nameError.textContent = 'Iltimos, ismingizni to'liq kiriting.';
        isValid = false;
      }

      const cleanPhone = phoneInput.value.replace(/\D/g, '');
      if (cleanPhone.length < 9) {
        phoneInput.classList.add('is-invalid');
        phoneError.textContent = 'To'g'ri telefon raqamini kiriting (kamida 9 ta raqam).';
        isValid = false;
      }

      if (addressInput.value.trim().length < 5) {
        addressInput.classList.add('is-invalid');
        addressError.textContent = 'Yetkazib berish manzilini aniqroq kiriting.';
        isValid = false;
      }

      if (!isValid) return;

      const customer = nameInput.value.trim();
      formAlert.classList.add('is-success');
      formAlert.textContent = `Rahmat, ${customer}! Buyurtmangiz qabul qilindi. Operatorimiz tez orada siz bilan bog'lanadi.`;

      cart = [];
      renderCart();
      orderForm.reset();
      showToast('Buyurtmangiz muvaffaqiyatli yuborildi!');
    });
  }

  renderCart();
}
