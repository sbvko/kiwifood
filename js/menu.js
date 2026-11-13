/**
 * KIWI Fast Food — Menu Data & Dynamic Category Filtering
 * All content strictly in natural, modern Uzbek.
 */

const MENU_ITEMS = [
  // Burgerlar
  {
    id: 'b-1',
    name: 'KIWI Burger',
    category: 'Burgerlar',
    weight: '310 g',
    price: 32000,
    tag: 'XIT',
    image: 'assets/images/kiwi-burger.png',
    description: "Shirin bulochka, 100% mol go'shti kotleti, eritilgan cheddar pishlog'i, yangi aysberg salati va mualliflik KIWI sousi."
  },
  {
    id: 'b-2',
    name: 'Double Burger',
    category: 'Burgerlar',
    weight: '430 g',
    price: 44000,
    tag: '2X GO'SHT',
    image: 'assets/images/double-burger.png',
    description: "Ikki qavat olovda qovurilgan shirali mol go'shti, qo'sh cheddar, tuzlangan bodring va tutunli gril sousi."
  },
  {
    id: 'b-3',
    name: 'Chicken Burger',
    category: 'Burgerlar',
    weight: '290 g',
    price: 28000,
    tag: 'QARSILDOQ',
    image: 'assets/images/chicken-burger.png',
    description: "Maxsus ziravorlarda pishirilgan qarsildoq tovuq filesi, yangi pomidor va qaymoqli sarimsoq sousi."
  },
  {
    id: 'b-4',
    name: 'Cheese Burger',
    category: 'Burgerlar',
    weight: '270 g',
    price: 29000,
    tag: 'KLASSIKA',
    image: 'assets/images/cheese-burger.png',
    description: "Klassik mol go'shti kotleti, ikki bo'lak erigan cheddar pishlog'i, qizil piyoz halqalari va maxsus sous."
  },
  {
    id: 'b-5',
    name: 'BBQ Steak Burger',
    category: 'Burgerlar',
    weight: '360 g',
    price: 39000,
    tag: 'YANGI',
    image: 'assets/images/hero-burger.png',
    description: "Qovurilgan piyoz halqalari, mol go'shti kotleti, cheddar pishlog'i va xushbo'y barbekyu sousi."
  },
  {
    id: 'b-6',
    name: 'Spicy Chili Burger',
    category: 'Burgerlar',
    weight: '320 g',
    price: 34000,
    tag: 'ACHCHIQ',
    image: 'assets/images/double-burger.png',
    description: "Xalapenyo qalampiri, mol go'shti, eritilgan pishloq va olovli achchiq sous bilan tayyorlangan burger."
  },

  // Lavash
  {
    id: 'l-1',
    name: 'KIWI Klassik Lavash',
    category: 'Lavash',
    weight: '350 g',
    price: 31000,
    tag: 'XIT',
    image: 'assets/images/promotional-banner.png',
    description: "Yupqa xamir ichida shirali mol go'shti, yangi bodring, pomidor, qarsildoq chips va maxsus oq sous."
  },
  {
    id: 'l-2',
    name: 'Tandir Pishloqli Lavash',
    category: 'Lavash',
    weight: '390 g',
    price: 36000,
    tag: 'TANDIR',
    image: 'assets/images/promotional-banner.png',
    description: "Tandir pechida qizartirilgan, ichi cho'ziluvchan motsarella va cheddar pishlog'iga boy maxsus lavash."
  },
  {
    id: 'l-3',
    name: 'Tovuqli Qarsildoq Lavash',
    category: 'Lavash',
    weight: '340 g',
    price: 29000,
    tag: 'MAZZALI',
    image: 'assets/images/chicken-burger.png',
    description: "Qovurilgan tovuq bo'laklari, aysberg bargi, pomidor va nozik sarimsoqli sous bilan o'ralgan lavash."
  },

  // Hot-dog
  {
    id: 'h-1',
    name: 'KIWI Qirollik Hot-dog',
    category: 'Hot-dog',
    weight: '260 g',
    price: 22000,
    tag: 'XIT',
    image: 'assets/images/kiwi-burger.png',
    description: "Yumshoq bulochka, dudlangan mol go'shti sosiskasi, pishloq sousi, karam salati va qovurilgan piyoz."
  },
  {
    id: 'h-2',
    name: 'Double Hot-dog',
    category: 'Hot-dog',
    weight: '320 g',
    price: 26000,
    tag: '2X SOSISKA',
    image: 'assets/images/double-burger.png',
    description: "Ikki dona shirali sosiska, eritilgan cheddar pishlog'i, xantal va pomidor sousi uyg'unligi."
  },
  {
    id: 'h-3',
    name: 'Chili Cheese Hot-dog',
    category: 'Hot-dog',
    weight: '275 g',
    price: 24000,
    tag: 'ACHCHIQ',
    image: 'assets/images/cheese-burger.png',
    description: "Issiq pishloqli sous va xalapenyo bo'laklari bilan boyitilgan o'tkir ta'mli hot-dog."
  },

  // Fri va gazaklar
  {
    id: 'f-1',
    name: 'French Fries',
    category: 'Fri va gazaklar',
    weight: '150 g',
    price: 16000,
    tag: 'ISSIQ',
    image: 'assets/images/fries.png',
    description: "Oltinrang va qarsildoq kartoshka fri dengiz tuzi bilan — har bir taomga mukammal qo'shimcha."
  },
  {
    id: 'f-2',
    name: 'Crispy Nuggets (9 dona)',
    category: 'Fri va gazaklar',
    weight: '210 g',
    price: 22000,
    tag: 'XIT',
    image: 'assets/images/nuggets.png',
    description: "Tashqi tomoni qarsildoq, ichi yumshoq saralangan tovuq filesidan tayyorlangan 9 dona naggets."
  },
  {
    id: 'f-3',
    name: 'Pishloqli Fri',
    category: 'Fri va gazaklar',
    weight: '220 g',
    price: 23000,
    tag: 'PISHLOQLI',
    image: 'assets/images/fries.png',
    description: "Issiq kartoshka fri ustiga quyilgan quyuq cheddar sousi va ko'katlar."
  },

  // Ichimliklar
  {
    id: 'd-1',
    name: 'Muzdek Kola (0.5 L)',
    category: 'Ichimliklar',
    weight: '500 ml',
    price: 10000,
    tag: 'SALQIN',
    image: 'assets/images/promotional-banner.png',
    description: "Burger va setlar bilan ideal uyg'unlashuvchi tetiklantiruvchi salqin ichimlik."
  },
  {
    id: 'd-2',
    name: 'KIWI Moxito Limonat',
    category: 'Ichimliklar',
    weight: '400 ml',
    price: 15000,
    tag: 'YANGI',
    image: 'assets/images/about-kiwi.png',
    description: "Yangi yalpiz barglari, laym sharbati va muz bo'laklari bilan tayyorlangan tetiklantiruvchi limonad."
  },
  {
    id: 'd-3',
    name: 'Tabiiy Apelsin Sharbati',
    category: 'Ichimliklar',
    weight: '330 ml',
    price: 14000,
    tag: '100% TABIIY',
    image: 'assets/images/promotional-banner.png',
    description: "Yangi siqilgan shirin apelsin sharbati — vitaminlarga boy salqin tanlov."
  },

  // Setlar
  {
    id: 's-1',
    name: 'KIWI Solo Set',
    category: 'Setlar',
    weight: '620 g',
    price: 49000,
    tag: 'TEJAMKOR',
    image: 'assets/images/hero-burger.png',
    description: "KIWI Burger, o'rta kartoshka fri, maxsus sous va 0.5 L salqin ichimlik bir to'plamda."
  },
  {
    id: 's-2',
    name: 'KIWI Duo Set (Aksiya)',
    category: 'Setlar',
    weight: '1150 g',
    price: 69000,
    tag: '-25% AKSIYA',
    image: 'assets/images/promotional-banner.png',
    description: "2 ta KIWI Burger, 2 ta kartoshka fri, 6 dona naggets va 2 ta salqin ichimlik — ikki kishilik mega to'plam."
  },
  {
    id: 's-3',
    name: 'KIWI Family Box',
    category: 'Setlar',
    weight: '1850 g',
    price: 119000,
    tag: 'OILAVIY',
    image: 'assets/images/promotional-banner.png',
    description: "2 ta Double Burger, 2 ta Chicken Burger, 3 ta kartoshka fri, 9 dona naggets va 1.5 L ichimlik."
  }
];

function formatUZS(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function createMenuCardHTML(item, index) {
  return `
    <article class="product-card menu-card-animate" style="animation-delay: ${index * 60}ms">
      <div class="product-card__media">
        <span class="product-card__tag">${item.tag}</span>
        <div class="img-slot img-slot--product">
          <img
            src="${item.image}"
            alt="${item.name}"
            loading="lazy"
            class="img-slot__img"
            onerror="this.parentElement.classList.add('is-missing')"
          >
          <div class="img-slot__fallback" aria-hidden="true">
            <span class="img-slot__path">${item.image}</span>
          </div>
        </div>
      </div>
      <div class="product-card__body">
        <div class="product-card__meta">
          <span class="product-card__cat">${item.category}</span>
          <span class="product-card__weight">${item.weight}</span>
        </div>
        <h3 class="product-card__title">${item.name}</h3>
        <p class="product-card__desc">${item.description}</p>
        <div class="product-card__footer">
          <div class="product-card__price">${formatUZS(item.price)} <span>so'm</span></div>
          <button
            type="button"
            class="btn btn--primary btn--sm"
            data-quick-add="${item.name}"
            data-quick-price="${item.price}"
          >
            Buyurtma berish
          </button>
        </div>
      </div>
    </article>
  `;
}

function initMenuSection() {
  const menuGrid = document.getElementById('menuGrid');
  const filterContainer = document.getElementById('menuFilters');
  if (!menuGrid || !filterContainer) return;

  const filterButtons = Array.from(filterContainer.querySelectorAll('.filter-btn'));

  function renderCategory(category, animate = true) {
    const filtered = MENU_ITEMS.filter((item) => item.category === category);

    filterButtons.forEach((btn) => {
      const isSelected = btn.dataset.category === category;
      btn.classList.toggle('active', isSelected);
      btn.setAttribute('aria-selected', String(isSelected));
    });

    if (!animate) {
      menuGrid.innerHTML = filtered.map((item, idx) => createMenuCardHTML(item, idx)).join('');
      return;
    }

    menuGrid.classList.add('is-filtering');
    window.setTimeout(() => {
      menuGrid.innerHTML = filtered.map((item, idx) => createMenuCardHTML(item, idx)).join('');
      menuGrid.classList.remove('is-filtering');
    }, 180);
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('active')) return;
      renderCategory(btn.dataset.category, true);
    });
  });

  // External category triggers (e.g., Promotional Banner CTA)
  document.querySelectorAll('[data-select-category]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const targetCat = trigger.dataset.selectCategory;
      if (targetCat) {
        renderCategory(targetCat, true);
      }
    });
  });

  // Initial default category render
  renderCategory('Burgerlar', false);
}
