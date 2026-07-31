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
` const rail = document.querySelector('.rail');

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
      'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=800&q=80',
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&q=80',
      'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80',
      'https://images.unsplash.com/photo-1608236415050-1b73c4c0a8ec?w=800&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80'
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
      'https://images.unsplash.com/photo-1608236415050-1b73c4c0a8ec?w=800&q=80',
      'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&q=80',
      'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'
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
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80',
      'https://images.unsplash.com/photo-1590779033100-9f8a5991e858?w=800&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80',
      'https://images.unsplash.com/photo-1615485290382-441e4b0497b5?w=800&q=80',
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80',
      'https://images.unsplash.com/photo-1511317559916-56d5ddb62563?w=800&q=80'
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
      'https://images.unsplash.com/photo-1456735190827-d1262f71b8f3?w=800&q=80',
      'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=800&q=80',
      'https://images.unsplash.com/photo-1596003906949-67221c37965c?w=800&q=80',
      'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&q=80',
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&q=80',
      'https://images.unsplash.com/photo-1491975474562-1f4e30bc9468?w=800&q=80'
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
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
      'https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=800&q=80',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80',
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80',
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80'
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
      'https://images.unsplash.com/photo-1601121141255-51e0b0b1c4c1?w=800&q=80',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80',
      'https://images.unsplash.com/photo-1604772659841-a1612db7008f?w=800&q=80',
      'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&q=80',
      'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=80'
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
      'https://images.unsplash.com/photo-1513207565459-d7f36bfa7d23?w=800&q=80',
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd98?w=800&q=80',
      'https://images.unsplash.com/photo-1558370781-d6196949e317?w=800&q=80',
      'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&q=80',
      'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=800&q=80',
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80'
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
      'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=800&q=80',
      'https://images.unsplash.com/photo-1581006852262-4307d6283b9a?w=800&q=80',
      'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800&q=80',
      'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80',
      'https://images.unsplash.com/photo-1551029506-0807df4e2031?w=800&q=80',
      'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&q=80'
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
      'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=800&q=80',
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80',
      'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80',
      'https://images.unsplash.com/photo-1563299796-1750ed7b0074?w=800&q=80',
      'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80'
    ]
  }
];

const categoriesSection = document.getElementById('categories');
const departmentDetailSection = document.getElementById('department-detail');
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


function showDepartmentDetail(departmentId) {
  const department = departmentData.find(d => d.id === departmentId);
  if (!department) {
    console.error('Department data not found for ID:', departmentId);
    return;
  }

  let html = `
    <button id="back-to-categories" class="btn btn-ghost department-back-btn">&larr; Back to Categories</button>
    <div class="department-detail-grid">
      <div class="department-detail-left">
        <div class="department-detail-header">
          <p class="eyebrow">Department</p>
          <h2>${department.name}</h2>
          <p class="department-description">${department.description}</p>
        </div>
  `;

  // Subcategories
  if (department.subcategories && department.subcategories.length > 0) {
    html += `<div class="department-detail-content-grid">`;
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

  html += `</div>`; // Close department-detail-left

  // === SLIDESHOW GALLERY ===
  if (department.images && department.images.length > 0) {
    html += `
      <div class="department-detail-right">
        <div class="department-images">
          <h3>Gallery</h3>
          <div class="slideshow-container" id="slideshow-container">
            <div class="slideshow-track" id="slideshow-track">
              ${department.images.map((imgSrc, i) => `
                <div class="slideshow-slide ${i === 0 ? 'is-active' : ''}" data-index="${i}">
                  <img src="${imgSrc}" alt="${department.name} — image ${i + 1}" loading="${i === 0 ? 'eager' : 'lazy'}" class="slideshow-img">
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
          </div>
        </div>
      </div>
    `;
  }

  html += `</div>`; // Close department-detail-grid
  departmentDetailContent.innerHTML = html;

  // Hide categories, show detail
  categoriesSection.classList.add('is-hidden');
  departmentDetailSection.classList.add('is-active');

  // Add event listener to the dynamically created back button
  document.getElementById('back-to-categories').addEventListener('click', hideDepartmentDetail);

  // Initialize slideshow
  initSlideshow(department.images);

  // Scroll to top of the detail section
  setTimeout(() => {
    departmentDetailSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

function hideDepartmentDetail() {
  // Stop any running slideshow intervals
  if (window._slideshowInterval) {
    clearInterval(window._slideshowInterval);
    window._slideshowInterval = null;
  }
  departmentDetailSection.classList.remove('is-active');
  categoriesSection.classList.remove('is-hidden');
  setTimeout(() => {
    categoriesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
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

  // Click on image to open lightbox
  const currentImg = slides[0].querySelector('.slideshow-img');
  if (currentImg) {
    slides.forEach((slide, i) => {
      const img = slide.querySelector('.slideshow-img');
      if (img) {
        img.addEventListener('click', () => {
          openLightbox(i);
        });
        img.style.cursor = 'pointer';
      }
    });
  }

  // Hover pause / resume autoplay
  const container = document.getElementById('slideshow-container');
  if (container) {
    container.addEventListener('mouseenter', () => {
      if (window._slideshowInterval) {
        clearInterval(window._slideshowInterval);
        window._slideshowInterval = null;
      }
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

  // Update counter
  const counter = document.getElementById('slideshow-counter');
  if (counter) {
    counter.textContent = `${index + 1} / ${total}`;
  }

  slideshowState.currentIndex = index;
}

function startAutoplay() {
  if (window._slideshowInterval) {
    clearInterval(window._slideshowInterval);
  }
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
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
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
