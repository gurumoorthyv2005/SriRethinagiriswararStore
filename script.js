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
      'https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80', // T-shirts
      'https://images.unsplash.com/photo-1603252109360-70495248a825?w=800&q=80', // Jeans
      'https://images.unsplash.com/photo-1585487005169-5c354efe72a3?w=800&q=80', // Sarees
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80', // Men's shirts
      'https://images.unsplash.com/photo-1622979213584-a121783b88a2?w=800&q=80', // Kids' wear
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab6d69a?w=800&q=80'  // General apparel
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
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80', // Men's shoes
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80', // Women's heels
      'https://images.unsplash.com/photo-1603487742131-411a791ecf2f?w=800&q=80', // Kids' shoes
      'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&q=80', // Sandals
      'https://images.unsplash.com/photo-1608231387042-66d1673070a5?w=800&q=80', // Slippers
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'  // Sports shoes
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
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80', // Packaged goods aisle
      'https://images.unsplash.com/photo-1606859191214-a8a24b8f5aa6?w=800&q=80', // Spices
      'https://images.unsplash.com/photo-1526423428206-30b1a13a2b68?w=800&q=80', // Rice and grains
      'https://images.unsplash.com/photo-1584306670957-acf935f5033c?w=800&q=80', // Fresh produce
      'https://images.unsplash.com/photo-1587049352851-d8a8353242ef?w=800&q=80', // Cooking oils
      'https://images.unsplash.com/photo-1583255113925-520a899443b0?w=800&q=80'  // Snacks and biscuits
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
      'https://images.unsplash.com/photo-1456735190827-d1262f71b8f3?w=800&q=80', // Notebooks
      'https://images.unsplash.com/photo-1520412099554-642d85a1b319?w=800&q=80', // Pens
      'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&q=80', // Art supplies
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&q=80', // Craft paper
      'https://images.unsplash.com/photo-1516962126624-3e97e7071a82?w=800&q=80', // Office supplies
      'https://images.unsplash.com/photo-1629909822946-5472b3626639?w=800&q=80'  // Files and folders
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
      'https://images.unsplash.com/photo-1612831455749-a6d351ad1f1f?w=800&q=80', // Printer in action
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80', // Stack of printed documents
      'https://images.unsplash.com/photo-1521993981534-c8c36069104a?w=800&q=80', // Lamination machine
      'https://images.unsplash.com/photo-1580992734409-4130a73a3188?w=800&q=80', // Spiral bound book
      'https://images.unsplash.com/photo-1629909822946-5472b3626639?w=800&q=80', // Office copier
      'https://images.unsplash.com/photo-1604782339320-53c57c3372d2?w=800&q=80'  // Passport photo setup
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
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80', // Cosmetics set
      'https://images.unsplash.com/photo-1599948124513-d19a78718a12?w=800&q=80', // Bangles
      'https://images.unsplash.com/photo-1588796124469-275a2a5042a9?w=800&q=80', // Handbags
      'https://images.unsplash.com/photo-1615951418528-616de35a2394?w=800&q=80', // Earrings
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80', // Hair clips
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80'  // Skincare products
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
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80', // Wrapped presents
      'https://images.unsplash.com/photo-1513207565459-d7f36bfa7d23?w=800&q=80', // Gift wrapping supplies
      'https://images.unsplash.com/photo-1572095689026-f6385433c2a9?w=800&q=80', // Greeting cards
      'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=800&q=80', // Gift boxes
      'https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?w=800&q=80', // Toys for gifts
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd98?w=800&q=80'  // Ribbons and bows
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
      'https://images.unsplash.com/photo-1581006852262-4307d6283b9a?w=800&q=80', // Refrigerator with drinks
      'https://images.unsplash.com/photo-1551029506-0807df4e2031?w=800&q=80', // Milkshakes
      'https://images.unsplash.com/photo-1553531889-56cc480ac5cb?w=800&q=80', // Fruit juices
      'https://images.unsplash.com/photo-1575596511241-b021b80a4933?w=800&q=80', // Cans of soda
      'https://images.unsplash.com/photo-1543253687-c931c8e01820?w=800&q=80', // Bottled water
      'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&q=80'  // Ice cream cones
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
      'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=800&q=80', // Cleaning sprays
      'https://images.unsplash.com/photo-1584776710758-a7654078a963?w=800&q=80', // Bar soaps
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80', // Toothbrushes and toothpaste
      'https://images.unsplash.com/photo-1598611138623-02e2a858915a?w=800&q=80', // Light bulbs
      'https://images.unsplash.com/photo-1627906232539-4153582a1b94?w=800&q=80', // Laundry detergent
      'https://images.unsplash.com/photo-1563299796-1750ed7b0074?w=800&q=80'  // Candles
    ]
  }
];

// ===== PAGE-SPECIFIC INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  const isMainPage = document.getElementById('tag-board');
  const isDeptPage = document.getElementById('slideshow-container');

  if (isMainPage) {
    // Main page specific scripts
    if (typewriterLine) typewriterEffect();
    if (counters.length) initCounters();
  }

  if (isDeptPage) {
    // Department page specific scripts
    const departmentId = document.body.dataset.departmentId;
    const department = departmentData.find(d => d.id === departmentId);
    if (department) {
      initSlideshow(department.images);
      initRelatedDepartments(department.id, department.category);
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

function initSlideshow(images) {
  const track = document.getElementById('slideshow-track');
  const slides = track ? track.querySelectorAll('.slideshow-slide') : [];
  if (!slides.length) return;

  // Since the HTML is pre-rendered, we just need to build the dots and thumbnails
  const dotsContainer = document.getElementById('slideshow-dots');
  const thumbsContainer = document.getElementById('slideshow-thumbnails');
  const counter = document.getElementById('slideshow-counter');

  if (dotsContainer) {
    dotsContainer.innerHTML = images.map((_, i) => 
      `<button class="slideshow-dot ${i === 0 ? 'is-active' : ''}" data-slide="${i}" aria-label="Go to image ${i + 1}"></button>`
    ).join('');
  }

  if (thumbsContainer) {
    thumbsContainer.innerHTML = images.map((imgSrc, i) => `
      <div class="slideshow-thumb ${i === 0 ? 'is-active' : ''}" data-thumb-index="${i}">
        <img src="${imgSrc}" alt="" loading="lazy" onerror="this.style.display='none'">
      </div>
    `).join('');
  }

  if(counter) {
    counter.textContent = `1 / ${images.length}`;
  }

  slideshowState.currentIndex = 0;
  slideshowState.totalSlides = slides.length;
  slideshowState.images = images;

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

// These listeners are set up once on page load for department pages
if (document.getElementById('slideshow-container')) {
  const prevBtn = document.getElementById('slideshow-prev');
  const nextBtn = document.getElementById('slideshow-next');
  const container = document.getElementById('slideshow-container');
  const slides = document.querySelectorAll('.slideshow-slide');

  // ===== SWIPE SUPPORT =====
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

  // Set up navigation buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      goToSlide(slideshowState.currentIndex - 1);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      goToSlide(slideshowState.currentIndex + 1);
    });
  }
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
