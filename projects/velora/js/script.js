/* Velora — Premium Fashion E-Commerce JavaScript */
(function(){
    'use strict';

    // Product Data
    const products = [
        {id:1,name:"Silk Blend Blouse",category:"tops",price:89,oldPrice:120,shape:"shape-top",color1:"#c9a87c",color2:"#8b6f4e",desc:"Elegant silk blend blouse with a relaxed fit. Perfect for both casual and formal occasions."},
        {id:2,name:"Tailored Wool Trousers",category:"bottoms",price:145,color1:"#7c9cc9",color2:"#4e6f8b",shape:"shape-pants",desc:"Premium wool trousers with a modern slim fit. Crafted from sustainably sourced materials."},
        {id:3,name:"Midi Wrap Dress",category:"dresses",price:189,oldPrice:240,shape:"shape-dress",color1:"#c97c9c",color2:"#8b4e6f",desc:"A timeless wrap dress in a flattering midi length. Features a subtle texture pattern."},
        {id:4,name:"Leather Crossbody Bag",category:"accessories",price:220,color1:"#c9a87c",color2:"#a08060",shape:"shape-bag",desc:"Handcrafted leather crossbody bag with adjustable strap. Fits essentials beautifully."},
        {id:5,name:"Cashmere Crew Neck",category:"tops",price:195,shape:"shape-top",color1:"#9cc9a8",color2:"#6f8b4e",desc:"Luxuriously soft cashmere sweater. A wardrobe essential for cooler months."},
        {id:6,name:"Pleated Maxi Skirt",category:"bottoms",price:128,color1:"#c9c97c",color2:"#8b8b4e",shape:"shape-pants",desc:"Flowing pleated maxi skirt with an elasticated waist. Elegant movement with every step."},
        {id:7,name:"Linen Shift Dress",category:"dresses",price:165,shape:"shape-dress",color1:"#c9b87c",color2:"#8b744e",desc:"Breathable linen dress with a clean silhouette. Ideal for warm-weather elegance."},
        {id:8,name:"Gold Chain Necklace",category:"accessories",price:95,oldPrice:130,color1:"#e8d5b5",color2:"#c9a87c",shape:"shape-bag",desc:"Delicate gold-plated chain necklace. Minimalist design for everyday luxury."},
    ];

    // Render Products
    const grid = document.getElementById('productsGrid');
    function renderProducts(filter = 'all') {
        const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
        grid.innerHTML = filtered.map(p => `
            <div class="product-card" data-category="${p.category}">
                <div class="product-img">
                    <div class="product-shape ${p.shape}" style="background:linear-gradient(135deg,${p.color1},${p.color2})"></div>
                    <div class="product-actions">
                        <button class="product-action-btn" onclick="openQuickView(${p.id})">Quick View</button>
                        <button class="product-action-btn wishlist-btn" onclick="toggleWishlist(${p.id})" aria-label="Add to wishlist">♡</button>
                    </div>
                </div>
                <div class="product-info">
                    <span class="product-category">${p.category}</span>
                    <h3 class="product-name">${p.name}</h3>
                    <span class="product-price">$${p.price}${p.oldPrice ? `<span class="old">$${p.oldPrice}</span>` : ''}</span>
                </div>
            </div>
        `).join('');
    }
    renderProducts();

    // Filter
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProducts(btn.dataset.filter);
        });
    });

    // Cart
    let cart = [];
    const cartCount = document.getElementById('cartCount');
    window.addToCart = function(id) {
        cart.push(id);
        cartCount.textContent = cart.length;
    };

    // Wishlist
    let wishlist = [];
    const wishlistCount = document.getElementById('wishlistCount');
    window.toggleWishlist = function(id) {
        const idx = wishlist.indexOf(id);
        if (idx > -1) { wishlist.splice(idx, 1); } else { wishlist.push(id); }
        wishlistCount.textContent = wishlist.length;
    };

    // Quick View
    const qvModal = document.getElementById('quickViewModal');
    window.openQuickView = function(id) {
        const p = products.find(x => x.id === id);
        if (!p) return;
        document.getElementById('qvName').textContent = p.name;
        document.getElementById('qvPrice').textContent = `$${p.price}`;
        document.getElementById('qvDesc').textContent = p.desc;
        const qvImage = document.getElementById('qvImage');
        qvImage.innerHTML = `<div class="product-shape ${p.shape}" style="background:linear-gradient(135deg,${p.color1},${p.color2});width:50%;height:50%"></div>`;
        qvModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    document.getElementById('qvClose').addEventListener('click', closeQV);
    qvModal.querySelector('.qv-backdrop').addEventListener('click', closeQV);
    function closeQV() { qvModal.classList.remove('active'); document.body.style.overflow = ''; }

    // Size selector
    document.querySelectorAll('.size-opt').forEach(s => {
        s.addEventListener('click', () => {
            document.querySelectorAll('.size-opt').forEach(x => x.classList.remove('active'));
            s.classList.add('active');
        });
    });

    // QV Add to cart
    document.querySelector('.qv-add-btn').addEventListener('click', () => {
        const name = document.getElementById('qvName').textContent;
        const product = products.find(p => p.name === name);
        if (product) { addToCart(product.id); closeQV(); }
    });

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

    // Cart button
    document.getElementById('cartBtn').addEventListener('click', () => {
        alert(`Cart has ${cart.length} item${cart.length !== 1 ? 's' : ''}. This is a demo — in a real store, this would open a cart drawer.`);
    });

    // Newsletter
    const nlForm = document.getElementById('newsletterForm');
    nlForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = this.querySelector('button');
        btn.textContent = 'Subscribed! ✓';
        btn.style.background = '#22c55e';
        setTimeout(() => { btn.textContent = 'Subscribe'; btn.style.background = ''; this.reset(); }, 3000);
    });

    // Scroll reveal
    const reveals = document.querySelectorAll('.collection-card,.product-card,.review-card,.gallery-item,.newsletter');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; observer.unobserve(e.target); }
        });
    }, { threshold: 0.1 });
    reveals.forEach((el, i) => {
        el.style.opacity = '0'; el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity .6s ${i * 0.05}s cubic-bezier(.4,0,.2,1),transform .6s ${i * 0.05}s cubic-bezier(.4,0,.2,1)`;
        observer.observe(el);
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e) {
            e.preventDefault();
            const t = document.querySelector(this.getAttribute('href'));
            if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
        });
    });
})();
