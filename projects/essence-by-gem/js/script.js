/* Essence By Gem — Premium Fragrance Store JavaScript */
(function(){
    'use strict';

    // Product Data
    const products = [
        {id:1,name:"Velvet Noir",category:"Oriental",price:125,size:"50ml",rating:"4.9",badge:"Bestseller",desc:"A deep, intoxicating blend of black oud, vanilla absolute, and smoky amber. Designed for evening wear and unforgettable moments.",notes:{top:["Bergamot","Pink Pepper"],heart:["Oud","Incense"],base:["Vanilla","Amber"]},capColor:"#3a1528",bodyColor:"#2a1020"},
        {id:2,name:"Rose Absolue",category:"Floral",price:145,size:"50ml",rating:"4.9",badge:"New",desc:"The finest Isparta rose absolute paired with peony, sandalwood, and a whisper of white musk. Romantic, timeless, and utterly feminine.",notes:{top:["Lychee","Peony"],heart:["Rose Absolute","Jasmine"],base:["Sandalwood","Musk"]},capColor:"#4a2035",bodyColor:"#3a1528"},
        {id:3,name:"Citrus Bloom",category:"Citrus",price:95,size:"50ml",rating:"4.8",badge:"",desc:"Sparkling Calabrian bergamot, neroli, and white tea. An energizing, uplifting scent that captures the essence of Mediterranean mornings.",notes:{top:["Bergamot","Lemon"],heart:["Neroli","White Tea"],base:["Cedarwood","White Musk"]},capColor:"#3a3520",bodyColor:"#2a2818"},
        {id:4,name:"Sandalwood Dreams",category:"Woody",price:135,size:"50ml",rating:"4.9",badge:"",desc:"Creamy Mysore sandalwood meets vetiver and tonka bean. Warm, meditative, and deeply comforting. A scent that feels like a cashmere blanket.",notes:{top:["Cardamom","Bergamot"],heart:["Sandalwood","Vetiver"],base:["Tonka Bean","Cedar"]},capColor:"#2a2520",bodyColor:"#1a1815"},
        {id:5,name:"Golden Hour",category:"Oriental",price:155,size:"75ml",rating:"5.0",badge:"Premium",desc:"A luxurious composition of saffron, Turkish rose, and aged oud. Inspired by the magical light of sunset. Our most opulent creation.",notes:{top:["Saffron","Bitter Almond"],heart:["Turkish Rose","Oud"],base:["Leather","Sandalwood"]},capColor:"#4a3520",bodyColor:"#3a2818"},
        {id:6,name:"Midnight Jasmine",category:"Floral",price:115,size:"50ml",rating:"4.8",badge:"",desc:"Night-blooming jasmine, tuberose, and cashmere wood. A heady, seductive fragrance that blooms on the skin as the evening unfolds.",notes:{top:["Green Apple","Bergamot"],heart:["Jasmine","Tuberose"],base:["Cashmere Wood","Musk"]},capColor:"#202a20",bodyColor:"#151a15"},
    ];

    // Render Products
    const grid = document.getElementById('productsGrid');
    function renderProducts() {
        grid.innerHTML = products.map(p => `
            <div class="product-card" data-category="${p.category}">
                ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
                <div class="product-img" style="background:linear-gradient(135deg,${p.bodyColor},var(--bg))">
                    <div class="product-bottle">
                        <div class="pb-cap" style="background:linear-gradient(135deg,${p.capColor},${p.capColor}cc)"></div>
                        <div class="pb-neck" style="background:${p.bodyColor}"></div>
                        <div class="pb-body" style="background:linear-gradient(135deg,${p.bodyColor}cc,${p.bodyColor}88)" data-label="${p.name.split(' ').map(w=>w[0]).join('')}"></div>
                    </div>
                    <div class="product-actions">
                        <button class="product-action-btn" onclick="openQuickView(${p.id})">Quick View</button>
                        <button class="product-action-btn wishlist" onclick="toggleWishlist(${p.id})" aria-label="Add to wishlist">♡</button>
                    </div>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${p.name}</h3>
                    <span class="product-size">${p.size} · ${p.category}</span>
                    <div class="product-bottom">
                        <span class="product-price">$${p.price}</span>
                        <span class="product-rating">★ ${p.rating}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
    renderProducts();

    // Cart
    let cart = [];
    const cartCount = document.getElementById('cartCount');
    document.getElementById('cartBtn').addEventListener('click', () => {
        alert(`Cart has ${cart.length} item${cart.length !== 1 ? 's' : ''}. This is a demo — in a real store, this would open a cart drawer.`);
    });

    // Wishlist
    let wishlist = [];
    window.toggleWishlist = function(id) {
        const idx = wishlist.indexOf(id);
        if (idx > -1) wishlist.splice(idx, 1); else wishlist.push(id);
    };

    // Quick View Modal
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');
    window.openQuickView = function(id) {
        const p = products.find(x => x.id === id);
        if (!p) return;
        modalBody.innerHTML = `
            <div class="modal-grid">
                <div class="modal-image" style="background:linear-gradient(135deg,${p.bodyColor},var(--bg))">
                    <div class="product-bottle" style="transform:scale(1.5)">
                        <div class="pb-cap" style="background:linear-gradient(135deg,${p.capColor},${p.capColor}cc);width:20px;height:10px"></div>
                        <div class="pb-neck" style="background:${p.bodyColor};width:14px;height:16px"></div>
                        <div class="pb-body" style="background:linear-gradient(135deg,${p.bodyColor}cc,${p.bodyColor}88);width:50px;height:100px" data-label="${p.name.split(' ').map(w=>w[0]).join('')}"></div>
                    </div>
                </div>
                <div class="modal-details">
                    <span class="modal-category">${p.category}</span>
                    <h3>${p.name}</h3>
                    <div class="modal-price">$${p.price} · ${p.size}</div>
                    <p>${p.desc}</p>
                    <div class="modal-notes">
                        <h4>Fragrance Notes</h4>
                        <div class="modal-note"><span class="note-dot note-top"></span><strong>Top:</strong>&nbsp;${p.notes.top.join(', ')}</div>
                        <div class="modal-note"><span class="note-dot note-heart"></span><strong>Heart:</strong>&nbsp;${p.notes.heart.join(', ')}</div>
                        <div class="modal-note"><span class="note-dot note-base"></span><strong>Base:</strong>&nbsp;${p.notes.base.join(', ')}</div>
                    </div>
                    <button class="btn-primary modal-add-btn" onclick="addToCart(${p.id})">Add to Cart — $${p.price}</button>
                </div>
            </div>
        `;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.addToCart = function(id) {
        cart.push(id);
        cartCount.textContent = cart.length;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    document.getElementById('modalClose').addEventListener('click', closeModal);
    modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
    function closeModal() { modal.classList.remove('active'); document.body.style.overflow = ''; }

    // Mobile Menu
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const closeMenu = document.getElementById('closeMenu');
    menuBtn.addEventListener('click', () => { mobileMenu.classList.add('active'); document.body.style.overflow = 'hidden'; });
    [menuOverlay, closeMenu].forEach(el => el.addEventListener('click', () => { mobileMenu.classList.remove('active'); document.body.style.overflow = ''; }));
    mobileMenu.querySelectorAll('.mobile-nav a').forEach(a => a.addEventListener('click', () => { mobileMenu.classList.remove('active'); document.body.style.overflow = ''; }));

    // Search
    const searchBtn = document.getElementById('searchBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput');
    searchBtn.addEventListener('click', () => { searchOverlay.classList.add('active'); searchInput.focus(); });
    searchClose.addEventListener('click', () => { searchOverlay.classList.remove('active'); });

    // Hero Particles
    const particlesContainer = document.getElementById('heroParticles');
    if (particlesContainer) {
        for (let i = 0; i < 15; i++) {
            const p = document.createElement('div');
            p.className = 'hero-particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDuration = (7 + Math.random() * 8) + 's';
            p.style.animationDelay = Math.random() * 6 + 's';
            particlesContainer.appendChild(p);
        }
    }

    // Scroll reveal
    const reveals = document.querySelectorAll('.collection-card,.product-card,.ingredient-card,.review-card,.story-value');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; observer.unobserve(e.target); } });
    }, { threshold: 0.1 });
    reveals.forEach((el, i) => {
        el.style.opacity = '0'; el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity .6s ${i * 0.05}s cubic-bezier(.4,0,.2,1),transform .6s ${i * 0.05}s cubic-bezier(.4,0,.2,1)`;
        observer.observe(el);
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e) { e.preventDefault(); const t = document.querySelector(this.getAttribute('href')); if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' }); });
    });

    // Forms
    document.getElementById('newsletterForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = this.querySelector('button');
        btn.textContent = 'Subscribed! ✓'; btn.style.background = '#22c55e';
        setTimeout(() => { btn.textContent = 'Subscribe'; btn.style.background = ''; this.reset(); }, 3000);
    });
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = this.querySelector('button[type="submit"]');
        btn.textContent = 'Sent! ✓'; btn.style.background = '#22c55e';
        setTimeout(() => { btn.textContent = 'Send Message'; btn.style.background = ''; this.reset(); }, 3000);
    });
})();
