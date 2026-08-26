/* Haven — Real Estate Platform JavaScript */
(function(){
    'use strict';

    // Property Data
    const properties = [
        {id:1,name:"Modern Downtown Loft",type:"apartment",location:"Manhattan, NY",price:850000,beds:2,baths:2,sqft:1200,tag:"New",color:"#6b7280",desc:"Stunning loft apartment with floor-to-ceiling windows, exposed brick, and modern finishes in the heart of Manhattan."},
        {id:2,name:"Coastal Villa Retreat",type:"villa",location:"Malibu, CA",price:2450000,beds:5,baths:4,sqft:4200,tag:"Premium",color:"#1e40af",desc:"Breathtaking oceanfront villa with private beach access, infinity pool, and panoramic coastal views."},
        {id:3,name:"Victorian Family Home",type:"house",location:"San Francisco, CA",price:1250000,beds:4,baths:3,sqft:2800,tag:"Featured",color:"#7c3aed",desc:"Beautifully restored Victorian with original details, modern updates, and a lush garden in Pacific Heights."},
        {id:4,name:"Urban Studio Condo",type:"condo",location:"Chicago, IL",price:320000,beds:1,baths:1,sqft:650,tag:"New",color:"#059669",desc:"Sleek studio condo in a luxury high-rise with gym, rooftop deck, and stunning city views."},
        {id:5,name:"Hillside Modern Home",type:"house",location:"Austin, TX",price:780000,beds:3,baths:2,sqft:2100,tag:"Open House",color:"#d97706",desc:"Contemporary hillside home with open floor plan, smart home features, and panoramic hill country views."},
        {id:6,name:"Luxury Penthouse Suite",type:"condo",location:"Miami, FL",price:1800000,beds:3,baths:3,sqft:3000,tag:"Premium",color:"#be123c",desc:"Exclusive penthouse with private terrace, marble finishes, chef's kitchen, and Biscayne Bay views."},
        {id:7,name:"Riverside Apartment",type:"apartment",location:"Portland, OR",price:420000,beds:2,baths:2,sqft:950,tag:"",color:"#0891b2",desc:"Light-filled riverside apartment with exposed beams, modern kitchen, and walking trails nearby."},
        {id:8,name:"Country Estate Villa",type:"villa",location:"Napa Valley, CA",price:3200000,beds:6,baths:5,sqft:5500,tag:"Premium",color:"#65a30d",desc:"Sprawling estate on 5 acres with vineyard views, pool house, wine cellar, and entertainment pavilion."},
        {id:9,name:"Midtown Apartment",type:"apartment",location:"Atlanta, GA",price:295000,beds:1,baths:1,sqft:720,tag:"New",color:"#e11d48",desc:"Stylish midtown apartment with modern amenities, rooftop pool, and walking distance to dining and nightlife."},
    ];

    // Render Properties
    const grid = document.getElementById('propertiesGrid');
    const favorites = new Set();

    function renderProperties(filter = 'all') {
        const filtered = filter === 'all' ? properties : properties.filter(p => p.type === filter);
        grid.innerHTML = filtered.map(p => `
            <div class="property-card" data-type="${p.type}">
                <div class="property-img">
                    <div class="property-img-bg" style="background:linear-gradient(135deg,${p.color}33,${p.color}11)">
                        <div class="house-shape" style="background:${p.color}44"></div>
                    </div>
                    ${p.tag ? `<span class="property-tag">${p.tag}</span>` : ''}
                    <button class="fav-btn ${favorites.has(p.id)?'active':''}" onclick="toggleFav(${p.id})" aria-label="Add to favorites">♡</button>
                </div>
                <div class="property-info">
                    <div class="property-price">$${p.price.toLocaleString()}</div>
                    <h3 class="property-name">${p.name}</h3>
                    <span class="property-location">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        ${p.location}
                    </span>
                    <div class="property-features">
                        <span class="property-feature">🛏 ${p.beds} Beds</span>
                        <span class="property-feature">🚿 ${p.baths} Baths</span>
                        <span class="property-feature">📐 ${p.sqft.toLocaleString()} sqft</span>
                    </div>
                    <div class="property-actions">
                        <button class="property-btn" onclick="openPropertyDetail(${p.id})">Details</button>
                        <button class="property-btn primary" onclick="alert('Contact agent for ${p.name}! This is a demo.')">Contact Agent</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    renderProperties();

    // Filter
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProperties(btn.dataset.filter);
        });
    });

    // Search
    document.getElementById('searchBtn').addEventListener('click', () => {
        const type = document.getElementById('searchType').value;
        const maxPrice = parseInt(document.getElementById('searchPrice').value) || Infinity;
        const location = document.getElementById('searchLocation').value.toLowerCase();

        let filtered = properties;
        if (type) filtered = filtered.filter(p => p.type === type);
        if (maxPrice < Infinity) filtered = filtered.filter(p => p.price <= maxPrice);
        if (location) filtered = filtered.filter(p => p.location.toLowerCase().includes(location));

        grid.innerHTML = '';
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
        
        if (filtered.length === 0) {
            grid.innerHTML = '<p style="text-align:center;color:var(--muted);grid-column:1/-1;padding:40px">No properties match your search criteria. Try adjusting your filters.</p>';
        } else {
            grid.innerHTML = filtered.map(p => `
                <div class="property-card" data-type="${p.type}">
                    <div class="property-img">
                        <div class="property-img-bg" style="background:linear-gradient(135deg,${p.color}33,${p.color}11)">
                            <div class="house-shape" style="background:${p.color}44"></div>
                        </div>
                        ${p.tag ? `<span class="property-tag">${p.tag}</span>` : ''}
                        <button class="fav-btn ${favorites.has(p.id)?'active':''}" onclick="toggleFav(${p.id})" aria-label="Add to favorites">♡</button>
                    </div>
                    <div class="property-info">
                        <div class="property-price">$${p.price.toLocaleString()}</div>
                        <h3 class="property-name">${p.name}</h3>
                        <span class="property-location">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            ${p.location}
                        </span>
                        <div class="property-features">
                            <span class="property-feature">🛏 ${p.beds} Beds</span>
                            <span class="property-feature">🚿 ${p.baths} Baths</span>
                            <span class="property-feature">📐 ${p.sqft.toLocaleString()} sqft</span>
                        </div>
                        <div class="property-actions">
                            <button class="property-btn" onclick="openPropertyDetail(${p.id})">Details</button>
                            <button class="property-btn primary">Contact Agent</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    });

    // Favorites
    window.toggleFav = function(id) {
        if (favorites.has(id)) favorites.delete(id); else favorites.add(id);
        renderProperties(document.querySelector('.filter-btn.active')?.dataset.filter || 'all');
    };

    // Property Detail Modal
    const modal = document.getElementById('propertyModal');
    const modalBody = document.getElementById('modalBody');
    window.openPropertyDetail = function(id) {
        const p = properties.find(x => x.id === id);
        if (!p) return;
        modalBody.innerHTML = `
            <h3>${p.name}</h3>
            <div class="modal-price">$${p.price.toLocaleString()}</div>
            <span class="property-location" style="margin-bottom:12px;display:inline-flex">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                ${p.location}
            </span>
            <p>${p.desc}</p>
            <div class="modal-features">
                <div class="modal-feature"><strong>${p.beds}</strong>Bedrooms</div>
                <div class="modal-feature"><strong>${p.baths}</strong>Bathrooms</div>
                <div class="modal-feature"><strong>${p.sqft.toLocaleString()}</strong>Square Feet</div>
                <div class="modal-feature"><strong>${p.type.charAt(0).toUpperCase()+p.type.slice(1)}</strong>Property Type</div>
            </div>
            <p style="font-size:.85rem;color:var(--muted);margin-top:16px"><em>This is a demo listing. In a real application, this would connect to a property management system.</em></p>
        `;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    document.getElementById('modalClose').addEventListener('click', closeModal);
    modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);
    function closeModal() { modal.classList.remove('active'); document.body.style.overflow = ''; }

    // Nav
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    hamburger.addEventListener('click', () => { hamburger.classList.toggle('active'); mobileMenu.classList.toggle('active'); document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : ''; });
    document.getElementById('mobileOverlay').addEventListener('click', () => { hamburger.classList.remove('active'); mobileMenu.classList.remove('active'); document.body.style.overflow = ''; });
    mobileMenu.querySelectorAll('.mobile-panel a').forEach(a => a.addEventListener('click', () => { hamburger.classList.remove('active'); mobileMenu.classList.remove('active'); document.body.style.overflow = ''; }));

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e) { e.preventDefault(); const t = document.querySelector(this.getAttribute('href')); if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' }); });
    });

    // Counter Animation
    const counters = document.querySelectorAll('.stat-num[data-target]');
    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const el = e.target;
                const target = parseInt(el.dataset.target);
                const dur = 2000;
                const start = performance.now();
                function update(now) {
                    const p = Math.min((now - start) / dur, 1);
                    const eased = 1 - Math.pow(1 - p, 3);
                    el.textContent = Math.floor(target * eased).toLocaleString();
                    if (p < 1) requestAnimationFrame(update);
                }
                requestAnimationFrame(update);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));

    // Reveal
    const reveals = document.querySelectorAll('.property-card,.agent-card,.testimonial-card,.about-card');
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; revealObserver.unobserve(e.target); } });
    }, { threshold: 0.1 });
    reveals.forEach((el, i) => {
        el.style.opacity = '0'; el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity .6s ${i * 0.05}s cubic-bezier(.4,0,.2,1),transform .6s ${i * 0.05}s cubic-bezier(.4,0,.2,1)`;
        revealObserver.observe(el);
    });

    // Form
    const form = document.getElementById('contactForm');
    if (form) form.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = this.querySelector('button[type="submit"]');
        btn.textContent = 'Message Sent! ✓';
        btn.style.background = '#22c55e';
        setTimeout(() => { btn.textContent = 'Send Message'; btn.style.background = ''; this.reset(); }, 3000);
    });
})();
