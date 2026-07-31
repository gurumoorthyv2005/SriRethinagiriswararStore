// ===== Mobile nav toggle =====
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== Scroll reveal for category tags and sections =====
const revealEls = document.querySelectorAll('[data-reveal]');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('is-visible'), i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}

// ===== Back to top button =====
const toTopBtn = document.getElementById('to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    toTopBtn.classList.add('is-visible');
  } else {
    toTopBtn.classList.remove('is-visible');
  }
});

toTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Open / Closed status chip =====
const OPEN_HOUR = 8;
const OPEN_MINUTE = 0;
const CLOSE_HOUR = 21;
const CLOSE_MINUTE = 30;

function updateStoreStatus() {
  const chip = document.getElementById('status-chip');
  const text = document.getElementById('status-text');

  const now = new Date();
  const minutesNow = now.getHours() * 60 + now.getMinutes();
  const openMinutes = OPEN_HOUR * 60 + OPEN_MINUTE;
  const closeMinutes = CLOSE_HOUR * 60 + CLOSE_MINUTE;

  const isOpen = minutesNow >= openMinutes && minutesNow < closeMinutes;

  if (isOpen) {
    chip.classList.remove('closed');
    text.textContent = 'Open now';
  } else {
    chip.classList.add('closed');
    text.textContent = 'Closed now';
  }
}

updateStoreStatus();
setInterval(updateStoreStatus, 60 * 1000);

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ================================================================
// ===== 1. SCROLL PROGRESS BAR =====
// ================================================================
const progressBar = document.getElementById('scroll-progress');
const rail = document.querySelector('.rail');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = scrollPercent + '%';
  // Animate the top rail for a creative touch
  rail.style.backgroundPositionX = -scrollTop / 10 + 'px';
});

// ================================================================
// ===== 2. THEME TOGGLE with localStorage =====
// ================================================================
const themeToggle = document.getElementById('theme-toggle');
const toggleIcon = document.getElementById('toggle-icon');
const html = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
toggleIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  toggleIcon.textContent = next === 'dark' ? '☀️' : '🌙';
});

// ================================================================
// ===== 3. LIVE CLOCK =====
// ================================================================
const clockEl = document.getElementById('live-clock');

function updateClock() {
  const now = new Date();
  let h = now.getHours();
  const m = String(now.getMinutes()).padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  clockEl.textContent = `${h}:${m} ${ampm}`;
}

updateClock();
setInterval(updateClock, 30 * 1000);

// ================================================================
// ===== 5. TYPEWRITER EFFECT =====
// ================================================================
const typewriterLine = document.getElementById('typewriter-line');
const typewriterCursor = document.getElementById('typewriter-cursor');
const fullText = typewriterLine.textContent.trim();

function typewriterEffect() {
  let index = 0;
  typewriterLine.textContent = '';
  typewriterCursor.style.display = 'inline-block';

  function type() {
    if (index < fullText.length) {
      typewriterLine.textContent += fullText[index];
      index++;
      setTimeout(type, 25 + Math.random() * 30);
    } else {
      typewriterCursor.style.animation = 'blink 0.8s step-end infinite';
      document.querySelector('.hero-inner').classList.add('typing-done');
    }
  }

  // Delay start slightly for page load
  setTimeout(type, 400);
}

typewriterEffect();

// ================================================================
// ===== 6. CATEGORY FILTER =====
// ================================================================
const filterBtns = document.querySelectorAll('.filter-btn');
const tagBoard = document.getElementById('tag-board');
const tags = document.querySelectorAll('.tag[data-category]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');

    const filter = btn.dataset.filter;

    tags.forEach((tag, i) => {
      const cat = tag.dataset.category;
      const match = filter === 'all' || cat === filter;

      if (match) {
        tag.classList.remove('tag-hidden');
        tag.style.position = '';
        tag.style.visibility = '';
        // Re-trigger reveal
        if (!tag.classList.contains('is-visible')) {
          setTimeout(() => tag.classList.add('is-visible'), i * 40);
        }
      } else {
        tag.classList.add('tag-hidden');
        tag.style.position = 'absolute';
        tag.style.visibility = 'hidden';
      }
    });
  });
});

// ================================================================
// ===== 11. DEPARTMENT DETAIL VIEW (Simulated Pages) =====
// ================================================================
const departmentData = [
  {
    id: 'clothing',
    name: 'Clothing',
    description: 'Everyday wear for every age, from traditional to modern styles. Discover our wide range of apparel for men, women, and children, featuring the latest trends and comfortable classics.',
    subcategories: [
      { name: "Men's Wear", items: ["Shirts", "Trousers", "Kurtas", "Jeans"] },
      { name: "Women's Wear", items: ["Sarees", "Salwar Sets", "Lehengas", "Dresses"] },
      { name: "Kids' Wear", items: ["T-shirts", "Shorts", "Frocks", "School Uniforms"] },
      { name: "Innerwear & Nightwear", items: ["Vests", "Briefs", "Pyjamas", "Nighties"] }
    ],
    images: [
      'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80', // General clothing rack
      'https://images.unsplash.com/photo-1610189334133-1b5890328487?w=800&q=80', // Sarees
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80', // Men's shirts
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80', // Kids' clothing
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80', // Men's traditional wear
      'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=800&q=80'  // Folded jeans
    ]
  },
  {
    id: 'footwear',
    name: 'Footwear',
    description: 'Step out in style and comfort with our diverse footwear collection. We offer options for every member of the family and every occasion.',
    subcategories: [
      { name: "Sandals & Slippers", items: ["Flip-flops", "Sliders", "Comfort Sandals", "Ethnic Sandals"] },
      { name: "School Shoes", items: ["Black Leather Shoes", "White Canvas Shoes", "Sports Shoes"] },
      { name: "Sports Shoes", items: ["Running Shoes", "Training Shoes", "Casual Sneakers"] },
      { name: "Formal Footwear", items: ["Dress Shoes", "Loafers", "Heels"] }
    ],
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80', // Women's heels
      'https://images.unsplash.com/photo-1605346533142-71b3b3d73c52?w=800&q=80', // Men's formal shoes
      'https://images.unsplash.com/photo-1562183241-b937e95585b6?w=800&q=80', // Sandals
      'https://images.unsplash.com/photo-1525966222134-fcfa99b83775?w=800&q=80', // Casual sneakers
      'https://images.unsplash.com/photo-1604275982132-629154a05953?w=800&q=80', // Slippers/Flip-flops
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'  // Sports shoe
    ]
  },
  {
    id: 'grocery',
    name: 'Grocery',
    description: 'Your daily essentials and kitchen staples, fresh and readily available. Rice, dhals, millets, spices, snacks — we\'ve got your pantry covered.',
    subcategories: [
      { name: "Grains & Pulses", items: ["Rice", "Dhals", "Millets", "Flours"] },
      { name: "Spices & Condiments", items: ["Whole Spices", "Powdered Spices", "Pickles", "Sauces"] },
      { name: "Snacks & Packaged Foods", items: ["Biscuits", "Noodles", "Chips", "Ready-to-Eat"] },
      { name: "Cooking Essentials", items: ["Cooking Oil", "Ghee", "Salt", "Sugar", "Jaggery"] }
    ],
    images: [
      'https://images.unsplash.com/photo-1606859191214-a8a24b8f5aa6?w=800&q=80', // Spices
      'https://images.unsplash.com/photo-1584306670957-acf935f5033c?w=800&q=80', // Vegetables/Produce
      'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&q=80', // Grocery aisle
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80', // Packaged goods
      'https://images.unsplash.com/photo-1550258987-3a65b63ba533?w=800&q=80', // Grains/Rice
      'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=800&q=80'  // Fruits
    ]
  },
  {
    id: 'stationery',
    name: 'Stationery',
    description: 'All your school, office, and creative needs in one place. High-quality supplies for students and professionals alike.',
    subcategories: [
      { name: "Writing Instruments", items: ["Pens", "Pencils", "Markers", "Highlighters"] },
      { name: "Notebooks & Paper", items: ["Registers", "Spiral Notebooks", "A4 Sheets", "Drawing Books"] },
      { name: "Art & Craft Supplies", items: ["Color Pencils", "Crayons", "Paints", "Craft Paper"] },
      { name: "Office Supplies", items: ["Files", "Folders", "Staplers", "Calculators"] }
    ],
    images: [
      'https://images.unsplash.com/photo-1520412099554-642d85a1b319?w=800&q=80', // Pens and pencils
      'https://images.unsplash.com/photo-1456735190827-d1262f71b8f3?w=800&q=80', // Notebooks
      'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&q=80', // Art supplies
      'https://images.unsplash.com/photo-1516962126624-3e97e7071a82?w=800&q=80', // Office supplies
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&q=80', // Craft paper
      'https://images.unsplash.com/photo-1491975474562-1f4e30bc9468?w=800&q=80'  // Desk setup
    ]
  },
  {
    id: 'xerox-printing',
    name: 'Xerox & Printing',
    description: 'Fast and reliable printing and copying services. We handle all your document needs with precision and speed.',
    subcategories: [
      { name: "Copying", items: ["B/W Xerox", "Colour Xerox", "Bulk Copying"] },
      { name: "Printing", items: ["Document Printing", "Photo Printing", "Resume Printing"] },
      { name: "Binding & Lamination", items: ["Spiral Binding", "Hard Binding", "Lamination Services"] },
      { name: "Passport Photos", items: ["Instant Passport Photos", "Visa Photos"] }
    ],
    images: [
      'https://images.unsplash.com/photo-1555991405-94f78398c277?w=800&q=80', // Printer
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80', // Person using printer
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80', // Office documents
      'https://images.unsplash.com/photo-1521993981534-c8c36069104a?w=800&q=80', // Lamination machine
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80'  // Stack of papers
    ]
  },
  {
    id: 'fancy-items',
    name: 'Fancy Items',
    description: 'Add a touch of elegance and personality with our selection of fancy items and accessories. Perfect for personal use or as thoughtful gifts.',
    subcategories: [
      { name: "Jewellery & Accessories", items: ["Bangles", "Earrings", "Necklaces", "Hair Clips"] },
      { name: "Bags & Pouches", items: ["Handbags", "Clutches", "Wallets", "Travel Pouches"] },
      { name: "Cosmetics & Personal Care", items: ["Lipsticks", "Nail Polish", "Perfumes", "Skincare"] },
      { name: "Decorative Items", items: ["Keychains", "Small Figurines", "Photo Frames"] }
    ],
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80', // Cosmetics
      'https://images.unsplash.com/photo-1599948124513-d19a78718a12?w=800&q=80', // Bangles/Jewellery
      'https://images.unsplash.com/photo-1588796124469-275a2a5042a9?w=800&q=80', // Handbags
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80', // Perfumes
      'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=80', // Accessories display
      'https://images.unsplash.com/photo-1601121141255-51e0b0b1c4c1?w=800&q=80'  // Nail polish
    ]
  },
  {
    id: 'gifts',
    name: 'Gifts',
    description: 'Find the perfect present for every celebration. Our gift section offers a variety of options to make every occasion special.',
    subcategories: [
      { name: "Gift Wraps & Boxes", items: ["Wrapping Paper", "Gift Bags", "Decorative Boxes"] },
      { name: "Greeting Cards", items: ["Birthday Cards", "Anniversary Cards", "Festival Cards"] },
      { name: "Return Gifts", items: ["Small Toys", "Stationery Sets", "Chocolates"] },
      { name: "Festive Hampers", items: ["Diwali Hampers", "Christmas Baskets", "Custom Hampers"] }
    ],
    images: [
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80', // Wrapped gifts
      'https://images.unsplash.com/photo-1513207565459-d7f36bfa7d23?w=800&q=80', // Gift wrapping station
      'https://images.unsplash.com/photo-1572095689026-f6385433c2a9?w=800&q=80', // Greeting cards
      'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=800&q=80', // Gift boxes
      'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&q=80', // Person holding gift
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd98?w=800&q=80'  // Bows and ribbons
    ]
  },
  {
    id: 'cool-drinks',
    name: 'Cool Drinks',
    description: 'Quench your thirst with our selection of chilled beverages. Soft drinks, juices, milkshakes and bottled water — grab one on the go.',
    subcategories: [
      { name: "Soft Drinks", items: ["Cola", "Lemonade", "Soda", "Energy Drinks"] },
      { name: "Fruit Juices", items: ["Orange Juice", "Apple Juice", "Mango Juice", "Mixed Fruit"] },
      { name: "Milkshakes & Smoothies", items: ["Chocolate Shake", "Strawberry Shake", "Banana Shake"] },
      { name: "Bottled Water", items: ["Mineral Water", "Sparkling Water", "Flavoured Water"] }
    ],
    images: [
      'https://images.unsplash.com/photo-1581006852262-4307d6283b9a?w=800&q=80', // Fridge with drinks
      'https://images.unsplash.com/photo-1551029506-0807df4e2031?w=800&q=80', // Milkshakes
      'https://images.unsplash.com/photo-1553531889-56cc480ac5cb?w=800&q=80', // Juices
      'https://images.unsplash.com/photo-1575596511241-b021b80a4933?w=800&q=80', // Soft drink cans
      'https://images.unsplash.com/photo-1543253687-c931c8e01820?w=800&q=80', // Water bottles
      'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&q=80'  // Ice cream
    ]
  },
  {
    id: 'daily-home-needs',
    name: 'Daily Home Needs',
    description: 'Everything you need to keep your home running smoothly. From cleaning supplies to personal care, we stock essential household items.',
    subcategories: [
      { name: "Cleaning Supplies", items: ["Detergents", "Dishwashers", "Floor Cleaners", "Brooms"] },
      { name: "Toiletries", items: ["Soaps", "Shampoos", "Toothpaste", "Brushes"] },
      { name: "Household Essentials", items: ["Candles", "Matches", "Insecticides", "Air Fresheners"] },
      { name: "Batteries & Bulbs", items: ["AA/AAA Batteries", "LED Bulbs", "Tube Lights"] }
    ],
    images: [
      'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=800&q=80', // Cleaning supplies
      'https://images.unsplash.com/photo-1584776710758-a7654078a963?w=800&q=80', // Soaps
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80', // Toiletries
      'https://images.unsplash.com/photo-1598611138623-02e2a858915a?w=800&q=80', // Light bulbs
      'https://images.unsplash.com/photo-1627906232539-4153582a1b94?w=800&q=80', // Detergent
      'https://images.unsplash.com/photo-1563299796-1750ed7b0074?w=800&q=80'  // Candles
    ]
  }
];

const categoriesSection = document.getElementById('categories');
const departmentDetailSection = document.getElementById('department-detail');
const emptyStateWrapper = document.getElementById('department-empty-state-wrapper');
const departmentDetailContent = document.getElementById('department-detail-content');

document.querySelectorAll('.tag[data-department-id]').forEach(tag => {
  tag.addEventListener('click', () => {
    const departmentId = tag.dataset.departmentId;
    showDepartmentDetail(departmentId);
  });
  // Also allow activation with Enter key for accessibility
  tag.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const departmentId = tag.dataset.departmentId;
      showDepartmentDetail(departmentId);
    }
  });
});


// Helper to get banner color class based on department tag color
function getDepartmentBannerClass(departmentId) {
  // Map department ids to their tag color
  const colorMap = {
    'clothing': 'banner--marigold',
    'footwear': 'banner--red',
    'grocery': 'banner--sage',
    'stationery': 'banner--teal',
    'xerox-printing': 'banner--plum',
    'fancy-items': 'banner--marigold',
    'gifts': 'banner--red',
    'cool-drinks': 'banner--sage',
    'daily-home-needs': 'banner--teal'
  };
  return colorMap[departmentId] || 'banner--marigold';
}

function showDepartmentDetail(departmentId) {
  const department = departmentData.find(d => d.id === departmentId);
  if (!department) {
    console.error('Department data not found for ID:', departmentId);
    return;
  }

  const bannerClass = getDepartmentBannerClass(departmentId);

  let html = `
    <div class="department-breadcrumb">
      <span>Departments</span>
      <span>/</span>
      <span class="breadcrumb-current">${department.name}</span>
    </div>

    <!-- Themed Banner -->
    <div class="department-banner ${bannerClass}">
      <p class="eyebrow">Department</p>
      <h2>${department.name}</h2>
      <p>${department.description}</p>
    </div>

    <button id="back-to-categories" class="btn btn-ghost department-back-btn">&larr; Back to Categories</button>
  `;

  // New: Create a grid to hold the gallery and subcategories
  html += `<div class="department-detail-grid">`;

  // Column 1: Slideshow Gallery
  if (department.images && department.images.length > 0) {
    const captions = [
      'Our wide selection', 'Quality you can trust', 'Fresh & ready for you',
      'Browse in comfort', 'Always well-stocked', 'Come explore today'
    ];

    html += `
      <div class="department-images">
        <div class="slideshow-container" id="slideshow-container">
          <div class="slideshow-track" id="slideshow-track">
            ${department.images.map((imgSrc, i) => `
              <div class="slideshow-slide ${i === 0 ? 'is-active' : ''}" data-index="${i}">
                <img src="${imgSrc}" alt="${department.name} — image ${i + 1}" loading="${i === 0 ? 'eager' : 'lazy'}" class="slideshow-img" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22600%22%3E%3Crect fill=%22%23EDF2F7%22 width=%22800%22 height=%22600%22/%3E%3Ctext x=%22400%22 y=%22310%22 text-anchor=%22middle%22 fill=%22%234A5568%22 font-family=%22sans-serif%22 font-size=%2220%22%3E${department.name}%3C/text%3E%3Ctext x=%22400%22 y=%22340%22 text-anchor=%22middle%22 fill=%22%234A5568%22 font-family=%22sans-serif%22 font-size=%2214%22%3EImage ${i + 1}%3C/text%3E%3C/svg%3E';">
                <div class="slideshow-caption">${captions[i % captions.length]}</div>
              </div>
            `).join('')}
          </div>
          <button class="slideshow-nav slideshow-nav--prev" id="slideshow-prev" aria-label="Previous image">&lsaquo;</button>
          <button class="slideshow-nav slideshow-nav--next" id="slideshow-next" aria-label="Next image">&rsaquo;</button>

          <div class="slideshow-dots" id="slideshow-dots">
            ${department.images.map((_, i) => `
              <button class="slideshow-dot ${i === 0 ? 'is-active' : ''}" data-slide="${i}" aria-label="Go to image ${i + 1}"></button>
            `).join('')}
          </div>
          <div class="slideshow-counter" id="slideshow-counter">1 / ${department.images.length}</div>
          <div class="slideshow-progress">
            <div class="slideshow-progress-bar" id="slideshow-progress-bar"></div>
          </div>
          <div class="swipe-indicator" id="swipe-indicator">&#8592; &#8594;</div>
        </div>
        <div class="slideshow-thumbnails" id="slideshow-thumbnails">
          ${department.images.map((imgSrc, i) => `
            <div class="slideshow-thumb ${i === 0 ? 'is-active' : ''}" data-thumb-index="${i}">
              <img src="${imgSrc}" alt="" loading="lazy" onerror="this.style.display='none'">
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Column 2: Subcategories
  if (department.subcategories && department.subcategories.length > 0) {
    html += `<div class="department-detail-content-grid">`; // This is now a wrapper for the lists
    department.subcategories.forEach(subcat => {
      html += `
        <div class="department-subcategory">
          <h3>${subcat.name}</h3>
          <ul>
            ${subcat.items.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
      `;
    });
    html += `</div>`; // Close department-detail-content-grid
  }

  html += `</div>`; // Close department-detail-grid

  departmentDetailContent.innerHTML = html;

  // Hide categories, show detail
  categoriesSection.style.opacity = '0';
  categoriesSection.style.visibility = 'hidden';
  emptyStateWrapper.style.display = 'none'; // Hide the empty state wrapper
  departmentDetailSection.classList.add('is-active');

  // After the transition, set display to none to remove it from the layout
  setTimeout(() => {
    categoriesSection.style.display = 'none';

  }, 400); // Match the transition duration in CSS

  // Add event listener to the dynamically created back button
  document.getElementById('back-to-categories').addEventListener('click', hideDepartmentDetail);

  // Initialize slideshow
  initSlideshow(department.images);

  // Show swipe indicator briefly on first visit (only if never shown before)
  if (!sessionStorage.getItem('swipeHintShown')) {
    const swipeEl = document.getElementById('swipe-indicator');
    if (swipeEl) {
      swipeEl.classList.add('is-visible');
      setTimeout(() => {
        swipeEl.classList.remove('is-visible');
      }, 2500);
      sessionStorage.setItem('swipeHintShown', 'true');
    }
  }

  // Scroll to top of the detail section
  setTimeout(() => {
    window.scrollTo({ top: departmentDetailSection.offsetTop - 80, behavior: 'smooth' });
  }, 100);
}

function hideDepartmentDetail() {
  // Stop any running slideshow intervals
  if (window._slideshowInterval) {
    clearInterval(window._slideshowInterval);
    window._slideshowInterval = null;
  }
  // Stop featured department interval
  if (window._featuredDeptInterval) {
    clearInterval(window._featuredDeptInterval);
    window._featuredDeptInterval = null;
  }

  // Stop progress bar animation if it's running
  if (window._progressInterval) {
    cancelAnimationFrame(window._progressInterval);
    window._progressInterval = null;
  }

  // Clear dynamic content
  departmentDetailContent.innerHTML = '';

  // Show categories section, hide department detail section
  categoriesSection.style.display = ''; // Reset display property for categories
  emptyStateWrapper.style.display = ''; // And for the empty state
  // Use a timeout to allow the display property to apply before fading in
  setTimeout(() => {
    categoriesSection.style.opacity = '';
    categoriesSection.style.visibility = '';
  }, 20);
  departmentDetailSection.classList.remove('is-active');
  
  // Re-initialize the featured department card after a short delay
  setTimeout(() => {
    initFeaturedDepartment();
    categoriesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

// Bind click events to empty state icons to open departments
function bindEmptyStateIcons() {
  document.querySelectorAll('.empty-icon').forEach(icon => {
    // Remove existing listener to avoid duplicates
    const deptId = icon.dataset.dept;
    icon.removeEventListener('click', icon._clickHandler);
    icon._clickHandler = () => {
      showDepartmentDetail(deptId);
    };
    icon.addEventListener('click', icon._clickHandler);
    icon.style.cursor = 'pointer';
  });
}

// Initialize empty state icon clicks on page load
document.addEventListener('DOMContentLoaded', () => {
  bindEmptyStateIcons();
  initFeaturedDepartment(); // Initialize the new featured card
});

// ================================================================
// ===== NEW: FEATURED DEPARTMENT CARD =====
// ================================================================
let featuredDeptState = {
  currentIndex: 0,
  interval: null
};

function initFeaturedDepartment() {
  const card = document.getElementById('featured-department-card');
  if (!card) return;

  const prevBtn = document.getElementById('featured-card-prev');
  const nextBtn = document.getElementById('featured-card-next');

  // Function to go to a specific department
  const goToFeaturedDept = (index) => {
    const total = departmentData.length;
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    featuredDeptState.currentIndex = index;
    updateFeaturedCard(departmentData[index]);
  };

  // Set up navigation
  prevBtn.addEventListener('click', () => goToFeaturedDept(featuredDeptState.currentIndex - 1));
  nextBtn.addEventListener('click', () => goToFeaturedDept(featuredDeptState.currentIndex + 1));

  // Pause on hover
  card.addEventListener('mouseenter', () => clearInterval(featuredDeptState.interval));
  card.addEventListener('mouseleave', startFeaturedDeptCycle);

  // Start the cycle
  goToFeaturedDept(0); // Show the first one immediately
  startFeaturedDeptCycle();
}

function startFeaturedDeptCycle() {
  clearInterval(featuredDeptState.interval); // Clear any existing interval
  featuredDeptState.interval = setInterval(() => {
    featuredDeptState.currentIndex = (featuredDeptState.currentIndex + 1) % departmentData.length;
    updateFeaturedCard(departmentData[featuredDeptState.currentIndex]);
  }, 4000); // Cycle every 4 seconds
}

function updateFeaturedCard(dept) {
  const card = document.getElementById('featured-department-card');
  const img = document.getElementById('featured-card-image');
  const title = document.getElementById('featured-card-title');
  const button = document.getElementById('featured-card-button');

  if (!card || !dept) return;

  // Map department IDs to colors
  const colorMap = {
    'clothing': 'var(--marigold)', 'fancy-items': 'var(--marigold)',
    'footwear': 'var(--signal-red)', 'gifts': 'var(--signal-red)',
    'grocery': 'var(--sage)', 'cool-drinks': 'var(--sage)',
    'stationery': 'var(--teal)', 'daily-home-needs': 'var(--teal)',
    'xerox-printing': 'var(--plum)'
  };
  const color = colorMap[dept.id] || 'var(--marigold)';

  // Update styles
  card.style.borderColor = color;
  button.style.backgroundColor = color;

  // Update content
  title.textContent = dept.name;
  button.onclick = () => showDepartmentDetail(dept.id);

  // Fade image transition
  img.classList.remove('is-visible');
  setTimeout(() => {
    img.src = dept.images[0] || ''; // Use first image
    img.alt = `Featured: ${dept.name}`;
    img.onload = () => img.classList.add('is-visible');
  }, 300); // Half of the transition duration
}



// ================================================================
// ===== SLIDESHOW ENGINE =====
// ================================================================
let slideshowState = {
  currentIndex: 0,
  totalSlides: 0,
  images: []
};

function initSlideshow(images) {
  const track = document.getElementById('slideshow-track');
  const slides = track ? track.querySelectorAll('.slideshow-slide') : [];
  if (!slides.length) return;

  slideshowState.currentIndex = 0;
  slideshowState.totalSlides = slides.length;
  slideshowState.images = images;

  // Clear any existing interval
  if (window._slideshowInterval) {
    clearInterval(window._slideshowInterval);
    window._slideshowInterval = null;
  }
  // Reset progress bar
  if (window._progressInterval) {
    clearInterval(window._progressInterval);
    window._progressInterval = null;
  }

  // Set up navigation
  const prevBtn = document.getElementById('slideshow-prev');
  const nextBtn = document.getElementById('slideshow-next');

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      goToSlide(slideshowState.currentIndex - 1, slides);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      goToSlide(slideshowState.currentIndex + 1, slides);
    });
  }

  // Set up dot navigation
  const dots = document.querySelectorAll('.slideshow-dot');
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(dot.dataset.slide);
      goToSlide(idx, slides);
    });
  });

  // Set up thumbnail navigation
  const thumbs = document.querySelectorAll('.slideshow-thumb');
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(thumb.dataset.thumbIndex);
      goToSlide(idx, slides);
    });
  });

  // Click on image to open lightbox
  slides.forEach((slide, i) => {
    const img = slide.querySelector('.slideshow-img');
    if (img) {
      img.addEventListener('click', () => {
        openLightbox(i);
      });
      img.style.cursor = 'pointer';
    }
  });

  // ===== SWIPE SUPPORT =====
  const container = document.getElementById('slideshow-container');
  if (container) {
    let startX = 0;
    let isSwiping = false;

    container.addEventListener('touchstart', (e) => {
      startX = e.changedTouches[0].screenX;
      isSwiping = true;
    }, { passive: true });

    container.addEventListener('touchmove', (e) => {
      if (!isSwiping) return;
      // Prevent default to avoid page scroll while swiping
      // but only if horizontal movement is significant
      const diff = Math.abs(e.changedTouches[0].screenX - startX);
      if (diff > 10) {
        e.preventDefault();
      }
    }, { passive: false });

    container.addEventListener('touchend', (e) => {
      if (!isSwiping) return;
      isSwiping = false;
      const endX = e.changedTouches[0].screenX;
      const diff = startX - endX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          goToSlide(slideshowState.currentIndex + 1, slides);
        } else {
          goToSlide(slideshowState.currentIndex - 1, slides);
        }
      }
    }, { passive: true });

    // Hover pause / resume autoplay
    container.addEventListener('mouseenter', () => {
      pauseAutoplay();
    });
    container.addEventListener('mouseleave', () => {
      startAutoplay();
    });
  }

  // Start autoplay
  startAutoplay();
}

function goToSlide(index, slides) {
  const total = slides.length;
  // Wrap around
  if (index < 0) index = total - 1;
  if (index >= total) index = 0;

  // Update slides
  slides.forEach((slide, i) => {
    slide.classList.toggle('is-active', i === index);
  });

  // Update dots
  const dots = document.querySelectorAll('.slideshow-dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('is-active', i === index);
  });

  // Update thumbnails
  const thumbs = document.querySelectorAll('.slideshow-thumb');
  thumbs.forEach((thumb, i) => {
    thumb.classList.toggle('is-active', i === index);
    // Scroll active thumb into view
    if (i === index) {
      thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  });

  // Update counter
  const counter = document.getElementById('slideshow-counter');
  if (counter) {
    counter.textContent = `${index + 1} / ${total}`;
  }

  // Reset progress bar
  const progressBar = document.getElementById('slideshow-progress-bar');
  if (progressBar) {
    progressBar.style.width = '0%';
  }

  slideshowState.currentIndex = index;
}

// Progress bar animation
function startProgressBar() {
  const bar = document.getElementById('slideshow-progress-bar');
  if (!bar) return;
  bar.style.width = '0%';
  let startTime = null;
  const duration = 5000; // 5 seconds

  if (window._progressInterval) {
    cancelAnimationFrame(window._progressInterval);
  }

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1) * 100;
    bar.style.width = progress + '%';
    if (progress < 100) {
      window._progressInterval = requestAnimationFrame(step);
    }
  }

  window._progressInterval = requestAnimationFrame(step);
}

function pauseAutoplay() {
  if (window._slideshowInterval) {
    clearInterval(window._slideshowInterval);
    window._slideshowInterval = null;
  }
  // Pause progress bar
  if (window._progressInterval) {
    cancelAnimationFrame(window._progressInterval);
    window._progressInterval = null;
  }
}

function startAutoplay() {
  pauseAutoplay();
  // Start progress bar
  startProgressBar();
  // Start interval for slide change
  window._slideshowInterval = setInterval(() => {
    const track = document.getElementById('slideshow-track');
    const slides = track ? track.querySelectorAll('.slideshow-slide') : [];
    if (slides.length) {
      goToSlide(slideshowState.currentIndex + 1, slides);
    }
  }, 5000);
}

// ================================================================
// ===== LIGHTBOX MODAL =====
// ================================================================
function openLightbox(index) {
  const images = slideshowState.images;
  if (!images || !images.length) return;

  // Create lightbox if not exists
  let lightbox = document.getElementById('lightbox-modal');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'lightbox-modal';
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <button class="lightbox-close" id="lightbox-close" aria-label="Close lightbox">&times;</button>
      <button class="lightbox-nav lightbox-nav--prev" id="lightbox-prev" aria-label="Previous image">&lsaquo;</button>
      <button class="lightbox-nav lightbox-nav--next" id="lightbox-next" aria-label="Next image">&rsaquo;</button>
      <div class="lightbox-content">
        <img src="" alt="" class="lightbox-img" id="lightbox-img">
        <div class="lightbox-counter" id="lightbox-counter"></div>
      </div>
    `;
    document.body.appendChild(lightbox);

    // Close button
    lightbox.querySelector('#lightbox-close').addEventListener('click', closeLightbox);
    // Click outside image to close
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    });
    // Nav buttons
    lightbox.querySelector('#lightbox-prev').addEventListener('click', (e) => {
      e.stopPropagation();
      navigateLightbox(-1);
    });
    lightbox.querySelector('#lightbox-next').addEventListener('click', (e) => {
      e.stopPropagation();
      navigateLightbox(1);
    });
  }

  lightbox._images = images;
  lightbox._currentIndex = index;
  updateLightboxImage(lightbox, index);
  lightbox.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox-modal');
  if (lightbox) {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }
}

function navigateLightbox(direction) {
  const lightbox = document.getElementById('lightbox-modal');
  if (!lightbox || !lightbox._images) return;
  const total = lightbox._images.length;
  let idx = lightbox._currentIndex + direction;
  if (idx < 0) idx = total - 1;
  if (idx >= total) idx = 0;
  lightbox._currentIndex = idx;
  updateLightboxImage(lightbox, idx);
}

function updateLightboxImage(lightbox, index) {
  const img = lightbox.querySelector('#lightbox-img');
  const counter = lightbox.querySelector('#lightbox-counter');
  const images = lightbox._images;
  img.src = images[index];
  img.alt = `Image ${index + 1}`;
  counter.textContent = `${index + 1} / ${images.length}`;
}

// ================================================================
// ===== 7. 3D TILT CARD EFFECT =====
// ================================================================
document.querySelectorAll('.tag, .btn').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;
    el.style.setProperty('--mouse-x', px + '%');
    el.style.setProperty('--mouse-y', py + '%');
  });
});

// ================================================================
// ===== 8. ANIMATED COUNTERS =====
// ================================================================
const counters = document.querySelectorAll('[data-count]');

if ('IntersectionObserver' in window) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const duration = 1200;
        const start = performance.now();

        function animateCounter(time) {
          const elapsed = time - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(eased * target);
          el.textContent = current + (target > 10 ? '+' : '');
          if (progress < 1) {
            requestAnimationFrame(animateCounter);
          } else {
            el.textContent = target + (target > 10 ? '+' : '');
          }
        }

        requestAnimationFrame(animateCounter);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));
} else {
  counters.forEach(c => {
    c.textContent = c.dataset.count + (parseInt(c.dataset.count) > 10 ? '+' : '');
  });
}

// ================================================================
// ===== 9. COPY TO CLIPBOARD WITH TOAST =====
// ================================================================
const toast = document.getElementById('toast');
let toastTimeout;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 2500);
}

const phoneLink = document.getElementById('phone-link');
const addressText = document.getElementById('address-text');

if (phoneLink) {
  phoneLink.addEventListener('click', (e) => {
    e.preventDefault();
    const phone = phoneLink.textContent.trim();
    navigator.clipboard.writeText(phone).then(() => {
      showToast('📋 Phone number copied!');
    }).catch(() => {
      // Fallback
      window.location.href = phoneLink.getAttribute('href');
    });
  });
}

if (addressText) {
  addressText.addEventListener('click', () => {
    const addr = addressText.textContent.trim();
    navigator.clipboard.writeText(addr).then(() => {
      showToast('📍 Address copied to clipboard!');
    }).catch(() => {});
  });
  addressText.style.cursor = 'pointer';
  addressText.title = 'Click to copy address';
}

// ================================================================
// ===== 10. ACTIVE NAV HIGHLIGHT ON SCROLL =====
// ================================================================
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  let current = '';
  const headerOffset = 120;
  sections.forEach(section => {
    const sectionTop = section.offsetTop - headerOffset;
    const sectionHeight = section.offsetHeight;
    // Check if section is in view
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('is-active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('is-active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// Handle main navigation "Categories" link to exit department detail view
const mainNavCategoriesLink = document.querySelector('.main-nav a[href="#categories"]');
if (mainNavCategoriesLink) {
  mainNavCategoriesLink.addEventListener('click', (e) => {
    // If department detail is active, hide it when clicking main nav categories link
    if (departmentDetailSection.classList.contains('is-active')) {
      hideDepartmentDetail();
    }
  });
}
