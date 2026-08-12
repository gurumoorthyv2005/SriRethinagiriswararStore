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

function typewriterEffect() {
  if (!typewriterLine || !typewriterCursor) return;
  const fullText = typewriterLine.textContent.trim(); // Capture content when effect starts
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

// Only run the typewriter on the main page (where #typewriter-line exists).
// On department pages this element is absent, so running it would throw a
// TypeError and halt the rest of the script (breaking the slideshow init).
if (typewriterLine) {
  typewriterEffect();
}

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
// ===== NEW: LIVE SEARCH FOR DEPARTMENTS =====
// ================================================================
const searchInput = document.getElementById('search-input');
const searchClear = document.getElementById('search-clear');

if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    // Activate the "All" filter button
    document.querySelector('.filter-btn[data-filter="all"]').click();

    tags.forEach(tag => {
      const deptName = tag.querySelector('h3').textContent.toLowerCase();
      const deptLine = tag.querySelector('.tag-line').textContent.toLowerCase();
      const listItems = Array.from(tag.querySelectorAll('li')).map(li => li.textContent.toLowerCase()).join(' ');
      const fullText = `${deptName} ${deptLine} ${listItems}`;

      const isMatch = fullText.includes(query);
      tag.classList.toggle('tag-hidden', !isMatch);
    });
  });

  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input'));
    searchInput.focus();
  });
}

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
    category: 'apparel',
    images: [
      'https://images.pexels.com/photos/7679895/pexels-photo-7679895.jpeg?auto=compress&cs=tinysrgb&w=800', // Clothing rack
      'https://images.pexels.com/photos/974911/pexels-photo-974911.jpeg?auto=compress&cs=tinysrgb&w=800', // Woman in dress
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800', // Jeans
      'https://images.pexels.com/photos/5868710/pexels-photo-5868710.jpeg?auto=compress&cs=tinysrgb&w=800', // Kids clothes
      'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=800', // Men's fashion
      'https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg?auto=compress&cs=tinysrgb&w=800'  // Woman in traditional wear
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
    category: 'apparel',
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800', // Nike shoe
      'https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg?auto=compress&cs=tinysrgb&w=800', // Shoe store
      'https://images.pexels.com/photos/2759793/pexels-photo-2759793.jpeg?auto=compress&cs=tinysrgb&w=800', // Sandals
      'https://images.pexels.com/photos/19090/pexels-photo-19090.jpeg?auto=compress&cs=tinysrgb&w=800', // Converse shoes
      'https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg?auto=compress&cs=tinysrgb&w=800', // Brown leather shoes
      'https://images.pexels.com/photos/5214413/pexels-photo-5214413.jpeg?auto=compress&cs=tinysrgb&w=800'  // Kids shoes
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
    category: 'food',
    images: [
      'https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg?auto=compress&cs=tinysrgb&w=800', // Grocery cart
      'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=800', // Spices
      'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=800', // Fruits and vegetables
      'https://images.pexels.com/photos/375889/pexels-photo-375889.jpeg?auto=compress&cs=tinysrgb&w=800', // Bread
      'https://images.pexels.com/photos/5946723/pexels-photo-5946723.jpeg?auto=compress&cs=tinysrgb&w=800', // Grains in bags
      'https://images.pexels.com/photos/5624983/pexels-photo-5624983.jpeg?auto=compress&cs=tinysrgb&w=800'  // Packaged goods
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
    category: 'services',
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=800', // Colorful pens
      'https://images.pexels.com/photos/211536/pexels-photo-211536.jpeg?auto=compress&cs=tinysrgb&w=800', // Notebooks
      'https://images.pexels.com/photos/6046188/pexels-photo-6046188.jpeg?auto=compress&cs=tinysrgb&w=800', // Art supplies
      'https://images.pexels.com/photos/159775/library-book-books-research-159775.jpeg?auto=compress&cs=tinysrgb&w=800', // Books
      'https://images.pexels.com/photos/5797991/pexels-photo-5797991.jpeg?auto=compress&cs=tinysrgb&w=800', // Desk setup
      'https.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&cs=tinysrgb&w=800'  // School supplies
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
    category: 'services',
    images: [
      'https://images.pexels.com/photos/1845548/pexels-photo-1845548.jpeg?auto=compress&cs=tinysrgb&w=800', // Printer
      'https://images.pexels.com/photos/3856027/pexels-photo-3856027.jpeg?auto=compress&cs=tinysrgb&w=800', // Person using copier
      'https://images.pexels.com/photos/596133/pexels-photo-596133.jpeg?auto=compress&cs=tinysrgb&w=800', // Stack of paper
      'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=800', // Office desk
      'https://images.pexels.com/photos/7097/people-office-group-team.jpg?auto=compress&cs=tinysrgb&w=800', // Office work
      'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800'  // Documents
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
    category: 'apparel',
    images: [
      'https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&w=800', // Jewelry
      'https://images.pexels.com/photos/264726/pexels-photo-264726.jpeg?auto=compress&cs=tinysrgb&w=800', // Cosmetics
      'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800', // Handbags
      'https://images.pexels.com/photos/3755680/pexels-photo-3755680.jpeg?auto=compress&cs=tinysrgb&w=800', // Skincare
      'https://images.pexels.com/photos/1453005/pexels-photo-1453005.jpeg?auto=compress&cs=tinysrgb&w=800', // Perfume
      'https://images.pexels.com/photos/965981/pexels-photo-965981.jpeg?auto=compress&cs=tinysrgb&w=800'  // Bangles
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
    category: 'home',
    images: [
      'https://images.pexels.com/photos/41004/albert-einstein-statue-portrait-famous-41004.jpeg?auto=compress&cs=tinysrgb&w=800', // Gift boxes
      'https://images.pexels.com/photos/168866/pexels-photo-168866.jpeg?auto=compress&cs=tinysrgb&w=800', // Gift wrapping
      'https://images.pexels.com/photos/1250462/pexels-photo-1250462.jpeg?auto=compress&cs=tinysrgb&w=800', // Person giving gift
      'https://images.pexels.com/photos/461060/pexels-photo-461060.jpeg?auto=compress&cs=tinysrgb&w=800', // Greeting card
      'https://images.pexels.com/photos/931007/pexels-photo-931007.jpeg?auto=compress&cs=tinysrgb&w=800', // Toys
      'https://images.pexels.com/photos/3840441/pexels-photo-3840441.jpeg?auto=compress&cs=tinysrgb&w=800'  // Festive items
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
    category: 'food',
    images: [
      'https://images.pexels.com/photos/3028500/pexels-photo-3028500.jpeg?auto=compress&cs=tinysrgb&w=800', // Drink fridge
      'https://images.pexels.com/photos/1304508/pexels-photo-1304508.jpeg?auto=compress&cs=tinysrgb&w=800', // Soda cans
      'https://images.pexels.com/photos/1187766/pexels-photo-1187766.jpeg?auto=compress&cs=tinysrgb&w=800', // Juices
      'https://images.pexels.com/photos/3727196/pexels-photo-3727196.jpeg?auto=compress&cs=tinysrgb&w=800', // Milkshakes
      'https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg?auto=compress&cs=tinysrgb&w=800', // Ice cream
      'https://images.pexels.com/photos/1200348/pexels-photo-1200348.jpeg?auto=compress&cs=tinysrgb&w=800'  // Bottled drinks
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
    category: 'home',
    images: [
      'https://images.pexels.com/photos/4239031/pexels-photo-4239031.jpeg?auto=compress&cs=tinysrgb&w=800', // Cleaning supplies
      'https://images.pexels.com/photos/4210315/pexels-photo-4210315.jpeg?auto=compress&cs=tinysrgb&w=800', // Toiletries
      'https://images.pexels.com/photos/459978/pexels-photo-459978.jpeg?auto=compress&cs=tinysrgb&w=800', // Laundry
      'https://images.pexels.com/photos/6781256/pexels-photo-6781256.jpeg?auto=compress&cs=tinysrgb&w=800', // Dishwashing
      'https://images.pexels.com/photos/1118427/pexels-photo-1118427.jpeg?auto=compress&cs=tinysrgb&w=800', // Light bulbs
      'https://images.pexels.com/photos/3683056/pexels-photo-3683056.jpeg?auto=compress&cs=tinysrgb&w=800'  // Batteries
    ]
  }
];

// ===== PAGE-SPECIFIC INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Check if we are on the main page by looking for a unique element, like the hero section.
  const isMainPage = document.getElementById('hero');

  if (isMainPage) {
    // These functions should only run on the main page (index.html)
    if (typewriterLine) typewriterEffect();
    if (counters.length) initCounters();

    // ===== DEPARTMENT DETAIL VIEW (Simulated Pages) =====
    function showDepartmentDetail(departmentId) {
      const department = departmentData.find(d => d.id === departmentId);
      if (!department) return;

      const detailSection = document.getElementById('department-detail');
      const detailInner = document.getElementById('department-detail-inner');
      const closeBtn = document.getElementById('close-detail-view');

      const colorMap = {
        'apparel': 'marigold', 'food': 'sage', 'services': 'plum', 'home': 'teal'
      };
      const bannerColor = colorMap[department.category] || 'marigold';

      detailInner.innerHTML = `
        <div class="department-breadcrumb"><a href="#" id="breadcrumb-back">Departments</a><span>/</span><span class="breadcrumb-current">${department.name}</span></div>
        <div class="department-banner banner--${bannerColor}"><p class="eyebrow">Department</p><h2>${department.name}</h2><p>${department.description}</p></div>
        <a href="#" id="detail-back-btn" class="btn btn-ghost department-back-btn">&larr; Back to All Categories</a>
        <div class="department-detail-grid">
          <div class="department-images">
            <div class="slideshow-container" id="slideshow-container">
              <div class="slideshow-track" id="slideshow-track"></div>
              <button class="slideshow-nav slideshow-nav--prev" id="slideshow-prev" aria-label="Previous image">&lsaquo;</button>
              <button class="slideshow-nav slideshow-nav--next" id="slideshow-next" aria-label="Next image">&rsaquo;</button>
              <div class="slideshow-dots" id="slideshow-dots"></div>
              <div class="slideshow-counter" id="slideshow-counter"></div>
              <div class="slideshow-progress"><div class="slideshow-progress-bar" id="slideshow-progress-bar"></div></div>
              <div class="swipe-indicator" id="swipe-indicator">&#8592; &#8594;</div>
            </div>
            <div class="slideshow-thumbnails" id="slideshow-thumbnails"></div>
          </div>
          <div class="department-detail-content-grid">
            ${department.subcategories.map(sub => `<div class="department-subcategory"><h3>${sub.name}</h3><ul>${sub.items.map(item => `<li>${item}</li>`).join('')}</ul></div>`).join('')}
          </div>
        </div>
        <div class="related-departments" id="related-departments"></div>
      `;

      detailSection.classList.add('is-active');
      closeBtn.style.display = 'flex';
      document.body.style.overflow = 'hidden';

      initSlideshow(department.images);
      initRelatedDepartments(department.id, department.category);
    }

    function hideDepartmentDetail() {
      const detailSection = document.getElementById('department-detail');
      const closeBtn = document.getElementById('close-detail-view');
      detailSection.classList.remove('is-active');
      closeBtn.style.display = 'none';
      document.body.style.overflow = '';
    }

    tags.forEach(tag => {
      tag.addEventListener('click', (e) => {
        e.preventDefault();
        const departmentId = tag.getAttribute('href').replace('.html', '');
        showDepartmentDetail(departmentId);
      });
    });

    document.getElementById('close-detail-view').addEventListener('click', hideDepartmentDetail);
    document.getElementById('department-detail').addEventListener('click', function(e) {
      if (e.target.matches('#breadcrumb-back, #detail-back-btn')) {
        e.preventDefault();
        hideDepartmentDetail();
      }
    });

  } else {
    // This is a department page, so just initialize the slideshow.
    const departmentId = document.body.dataset.departmentId;
    if (departmentId) {
      const department = departmentData.find(d => d.id === departmentId);
      if (department) {
        initSlideshow(department.images);
        initRelatedDepartments(department.id, department.category);
      }
    }
  }
});

// ================================================================
// ===== NEW: RELATED DEPARTMENTS =====
// ================================================================
function initRelatedDepartments(currentId, currentCategory) {
  const container = document.getElementById('related-departments');
  if (!container) return;

  // Find other departments in the same category, excluding the current one
  const related = departmentData.filter(dept => dept.category === currentCategory && dept.id !== currentId);
  
  // If not enough, fill with random departments from other categories
  while (related.length < 3) {
    const randomDept = departmentData[Math.floor(Math.random() * departmentData.length)];
    if (randomDept.id !== currentId && !related.some(d => d.id === randomDept.id)) {
      related.push(randomDept);
    }
  }

  const relatedToShow = related.slice(0, 3);

  const colorMap = {
    'clothing': 'var(--marigold)', 'fancy-items': 'var(--marigold)',
    'footwear': 'var(--signal-red)', 'gifts': 'var(--signal-red)',
    'grocery': 'var(--sage)', 'cool-drinks': 'var(--sage)',
    'stationery': 'var(--teal)', 'daily-home-needs': 'var(--teal)',
    'xerox-printing': 'var(--plum)'
  };

  const iconMap = {
    'clothing': '<path d="M16 8l8 6 8-6 6 6-6 6v22H10V20l-6-6z"/>',
    'footwear': '<path d="M8 34c0-8 4-14 10-16M8 34h14M30 34c2-10 8-16 14-16-2 6-2 12 0 16H30z"/>',
    'grocery': '<path d="M14 18h20l-2 20H16z"/><path d="M18 18a6 6 0 0112 0"/>',
    'stationery': '<path d="M12 8h18l6 6v26H12z"/><path d="M30 8v6h6"/><line x1="18" y1="22" x2="30" y2="22"/><line x1="18" y1="28" x2="30" y2="28"/><line x1="18" y1="34" x2="26" y2="34"/>',
    'xerox-printing': '<rect x="10" y="12" width="28" height="24" rx="2"/><line x1="10" y1="20" x2="38" y2="20"/><line x1="16" y1="12" x2="16" y2="36"/>',
    'fancy-items': '<circle cx="24" cy="24" r="6"/><circle cx="12" cy="30" r="5"/><circle cx="36" cy="30" r="5"/>',
    'gifts': '<rect x="12" y="18" width="24" height="18" rx="2"/><path d="M12 18l4-6h16l4 6"/><line x1="24" y1="18" x2="24" y2="36"/>',
    'cool-drinks': '<path d="M18 10h12l2 8-3 3v15a2 2 0 01-2 2H21a2 2 0 01-2-2V21l-3-3z"/><line x1="17" y1="26" x2="31" y2="26"/>',
    'daily-home-needs': '<path d="M10 38V16l14-8 14 8v22z"/><line x1="24" y1="38" x2="24" y2="24"/><line x1="10" y1="24" x2="38" y2="24"/>'
  };

  let html = `<h3>You might also like...</h3><div class="related-grid">`;
  relatedToShow.forEach(dept => {
    html += `
      <a href="${dept.id}.html" class="related-card">
        <div class="tag-icon" style="color: ${colorMap[dept.id] || 'var(--marigold)'}">
          <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2">${iconMap[dept.id] || ''}</svg>
        </div>
        <div class="related-card-info">
          <h4>${dept.name}</h4>
          <p>${dept.description.split('.')[0]}.</p>
        </div>
      </a>
    `;
  });
  html += `</div>`;

  container.innerHTML = html;
}

// ================================================================
// ===== SLIDESHOW ENGINE =====
// ================================================================
let slideshowState = {
  currentIndex: 0,
  totalSlides: 0,
  images: []
};

// Inline SVG placeholder shown when an image fails to load.
const PLACEHOLDER_IMG = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">' +
    '<rect width="800" height="600" fill="#EDF2F7"/>' +
    '<text x="400" y="290" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" fill="#4A5568">Image unavailable</text>' +
    '<text x="400" y="330" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#A0AEC0">Sri Rethinagiriswarar Stores</text>' +
  '</svg>'
);

function initSlideshow(images) {
  const track = document.getElementById('slideshow-track');
  if (!track) return;

  // Dynamically build slides from the data object
  track.innerHTML = (images || []).map((imgSrc, i) => `
    <div class="slideshow-slide ${i === 0 ? 'is-active' : ''}" data-index="${i}">
      <img src="${imgSrc}" alt="Department image ${i + 1}" loading="${i === 0 ? 'eager' : 'lazy'}" class="slideshow-img">
      <div class="slideshow-caption">Image ${i + 1} of ${images.length}</div>
    </div>
  `).join('');

  const slides = track.querySelectorAll('.slideshow-slide');
  if (!slides.length) return;

// Graceful error fallback: never hide an entire slide if an image fails.
  slides.forEach(slide => {
    const img = slide.querySelector('.slideshow-img');
    if (img && !img.hasAttribute('data-fallback-bound')) {
      img.setAttribute('data-fallback-bound', 'true');
      img.addEventListener('error', () => {
        if (!img.dataset.fallbackApplied) {
          img.dataset.fallbackApplied = 'true';
          img.src = PLACEHOLDER_IMG;
        }
      });
    }
  });

  const dotsContainer = document.getElementById('slideshow-dots');
  const thumbsContainer = document.getElementById('slideshow-thumbnails');
  const counter = document.getElementById('slideshow-counter');

  // Build dots, thumbnails, and state from the ACTUAL slides in the DOM
  // (which carry the working, department-relevant Unsplash images).
  const slideImages = Array.from(slides).map(slide => {
    const img = slide.querySelector('.slideshow-img');
    return img ? img.getAttribute('src') : '';
  });

  if (dotsContainer) {
    dotsContainer.innerHTML = slideImages.map((_, i) => 
      `<button class="slideshow-dot ${i === 0 ? 'is-active' : ''}" data-slide="${i}" aria-label="Go to image ${i + 1}"></button>`
    ).join('');
  }

  if (thumbsContainer) {
    thumbsContainer.innerHTML = slideImages.map((imgSrc, i) => `
      <div class="slideshow-thumb ${i === 0 ? 'is-active' : ''}" data-thumb-index="${i}">
        <img src="${imgSrc}" alt="" loading="lazy">
      </div>
    `).join('');
  }

  if(counter) {
    counter.textContent = `1 / ${slides.length}`;
  }

  slideshowState.currentIndex = 0;
  slideshowState.totalSlides = slides.length;
  slideshowState.images = slideImages;

  // Explicitly set the first slide as active to ensure visibility on page load
  goToSlide(0, slides);

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

  // Start autoplay
  startAutoplay();

  // Show swipe indicator briefly on first visit
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
}

document.getElementById('department-detail').addEventListener('touchstart', (e) => {
  if (e.target.closest('#slideshow-container')) {
    startX = e.changedTouches[0].screenX;
    isSwiping = true;
  }
}, { passive: true });

document.getElementById('department-detail').addEventListener('touchmove', (e) => {
  if (!isSwiping) return;
  const diff = Math.abs(e.changedTouches[0].screenX - startX);
  if (diff > 10) {
    e.preventDefault();
  }
}, { passive: false });

document.getElementById('department-detail').addEventListener('touchend', (e) => {
  if (!isSwiping) return;
  isSwiping = false;
  const endX = e.changedTouches[0].screenX;
  const diff = startX - endX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      goToSlide(slideshowState.currentIndex + 1);
    } else {
      goToSlide(slideshowState.currentIndex - 1);
    }
  }
}, { passive: true });

document.getElementById('department-detail').addEventListener('mouseover', e => {
  if (e.target.closest('#slideshow-container')) {
    pauseAutoplay();
  }
});

document.getElementById('department-detail').addEventListener('mouseout', e => {
  if (e.target.closest('#slideshow-container')) {
    startAutoplay();
  }
});

// Use event delegation on the detail section for swipe/nav events
let startX = 0;
let isSwiping = false;

document.getElementById('department-detail').addEventListener('click', function(e) {
  if (e.target.matches('#slideshow-prev')) {
    e.stopPropagation();
    goToSlide(slideshowState.currentIndex - 1);
  }
  if (e.target.matches('#slideshow-next')) {
    e.stopPropagation();
    goToSlide(slideshowState.currentIndex + 1);
  }
});

function goToSlide(index, slides) {
  // Auto-fetch slides from the DOM if not provided (fixes prev/next buttons).
  if (!slides || !slides.length) {
    const track = document.getElementById('slideshow-track');
    slides = track ? track.querySelectorAll('.slideshow-slide') : [];
  }
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

  slideshowState.currentIndex = index;
  // Restart autoplay cycle from this new slide
  startAutoplay();
}

let _progressInterval = null;
let _slideshowInterval = null;

// Progress bar animation
function startProgressBar() {
  const bar = document.getElementById('slideshow-progress-bar');
  if (!bar) return;
  bar.style.width = '0%';
  let startTime = null;
  const duration = 5000; // 5 seconds

  if (_progressInterval) {
    cancelAnimationFrame(_progressInterval);
  }

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1) * 100;
    if (bar) bar.style.width = progress + '%';
    if (progress < 100) {
      _progressInterval = requestAnimationFrame(step);
    }
  }

  _progressInterval = requestAnimationFrame(step);
}

function pauseAutoplay() {
  if (_slideshowInterval) {
    clearInterval(_slideshowInterval);
    _slideshowInterval = null;
  }
  // Pause progress bar
  if (_progressInterval) {
    cancelAnimationFrame(_progressInterval);
    _progressInterval = null;
  }
}

function startAutoplay() {
  pauseAutoplay();
  startProgressBar();
  // Start interval for slide change
  _slideshowInterval = setInterval(() => {
    const track = document.getElementById('slideshow-track');
    const slides = track ? track.querySelectorAll('.slideshow-slide') : [];
    if (slides.length) {
      goToSlide(slideshowState.currentIndex + 1, slides); // This will call startAutoplay again
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

function initCounters() {
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
