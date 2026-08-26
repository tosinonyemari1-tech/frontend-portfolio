/* ============================================
   TOSIN NDIDI — PORTFOLIO JAVASCRIPT
   Animations, Interactions & UI Logic
   ============================================ */

(function () {
    'use strict';

    // === LOADER ===
    const loader = document.getElementById('loader');
    function hideLoader() {
        if (loader && !loader.classList.contains('hidden')) {
            loader.classList.add('hidden');
            document.body.style.overflow = '';
            initRevealAnimations();
        }
    }
    // Hide after 1.8s, but also use DOMContentLoaded as safety net
    window.addEventListener('load', () => setTimeout(hideLoader, 1800));
    // Fallback: if load event never fires (e.g. file:// protocol), force hide after 3s
    setTimeout(hideLoader, 3000);

    // === CUSTOM CURSOR ===
    const cursor = document.getElementById('cursor');
    if (cursor && window.matchMedia('(pointer: fine)').matches) {
        const dot = cursor.querySelector('.cursor-dot');
        const ring = cursor.querySelector('.cursor-ring');
        let mx = 0, my = 0, cx = 0, cy = 0;

        document.addEventListener('mousemove', (e) => {
            mx = e.clientX;
            my = e.clientY;
            dot.style.left = mx + 'px';
            dot.style.top = my + 'px';
        });

        function animateCursor() {
            cx += (mx - cx) * 0.12;
            cy += (my - cy) * 0.12;
            ring.style.left = cx + 'px';
            ring.style.top = cy + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        const hoverTargets = document.querySelectorAll('a, button, .skill-card, .project-card, .service-card, .nav-toggle');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
        });
    }

    // === NAVIGATION ===
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const navLinksAll = document.querySelectorAll('.nav-link');

    // Scroll state
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        nav.classList.toggle('scrolled', currentScroll > 50);
        lastScroll = currentScroll;
    });

    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    function updateActiveNav() {
        const scrollY = window.pageYOffset + 100;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollY >= top && scrollY < top + height) {
                navLinksAll.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                });
            }
        });
    }
    window.addEventListener('scroll', updateActiveNav);

    // Mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    mobileLinks.forEach((link, i) => {
        link.style.setProperty('--index', i);
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // === HERO PARTICLES ===
    const particlesContainer = document.getElementById('heroParticles');
    if (particlesContainer) {
        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div');
            p.className = 'hero-particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDuration = (6 + Math.random() * 8) + 's';
            p.style.animationDelay = Math.random() * 6 + 's';
            p.style.width = (2 + Math.random() * 3) + 'px';
            p.style.height = p.style.width;
            particlesContainer.appendChild(p);
        }
    }

    // === REVEAL ANIMATIONS ===
    function initRevealAnimations() {
        const reveals = document.querySelectorAll('.reveal-up');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, parseInt(delay));
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        reveals.forEach(el => observer.observe(el));
    }

    // === COUNTER ANIMATION ===
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    if (statNumbers.length) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-target'));
                    const duration = 2000;
                    const start = performance.now();

                    function updateCounter(now) {
                        const progress = Math.min((now - start) / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        el.textContent = Math.floor(target * eased);
                        if (progress < 1) requestAnimationFrame(updateCounter);
                    }
                    requestAnimationFrame(updateCounter);
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(el => counterObserver.observe(el));
    }

    // === CONTACT FORM ===
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span>Message Sent! ✓</span>';
            btn.style.background = '#22c55e';
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                this.reset();
            }, 3000);
        });
    }

    // === CASE STUDY MODAL ===
    const caseStudies = {
        'nexa-finance': {
            title: 'Nexa Finance — Case Study',
            challenge: 'A modern fintech startup needed a premium digital banking interface that could compete with established financial institutions while maintaining trust and security perception.',
            approach: 'Designed a dark, sophisticated UI with glass morphism effects, data visualization components, and an intuitive navigation system focused on key banking actions.',
            solution: 'Built a complete frontend prototype featuring account dashboards, payment interfaces, card management, financial analytics, and a comprehensive responsive layout.',
            features: ['Interactive dashboard with data visualizations', 'Glass morphism card components', 'Animated statistics and charts', 'Dark premium color scheme', 'Mobile-first responsive design'],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'CSS Grid', 'Custom Properties'],
            results: 'Designed to improve financial data comprehension and streamline the digital banking experience for modern users.',
            link: './projects/nexa-finance/index.html'
        },
        'velora': {
            title: 'Velora — Case Study',
            challenge: 'A premium fashion brand needed an e-commerce platform that matched their luxury positioning, with smooth browsing, product discovery, and a refined shopping experience.',
            approach: 'Created an elegant, typography-driven design with large product imagery, sophisticated filtering, and micro-interactions that reinforce the brand\'s premium identity.',
            solution: 'Developed a full e-commerce frontend with product catalogs, filtering, cart functionality, size selectors, quick view, wishlist, and Instagram-style galleries.',
            features: ['Product filtering and search', 'Shopping cart with animations', 'Size selector and quick view', 'Newsletter integration', 'Instagram-style gallery'],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'CSS Animations', 'Responsive Grid'],
            results: 'Designed to elevate brand perception and provide a seamless luxury shopping experience across all devices.',
            link: './projects/velora/index.html'
        },
        'taskflow': {
            title: 'TaskFlow — Case Study',
            challenge: 'An enterprise SaaS platform needed a marketing website that could effectively communicate complex product features while driving signups and demo requests.',
            approach: 'Built an interactive, animation-rich website with live product previews, pricing configurators, and social proof sections that build confidence in the platform.',
            solution: 'Created a comprehensive SaaS website with animated dashboard previews, interactive pricing toggle, FAQ accordion, testimonials, and workflow demonstrations.',
            features: ['Animated dashboard preview', 'Interactive pricing toggle', 'FAQ accordion component', 'Scroll-triggered animations', 'Integration showcase'],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Intersection Observer', 'CSS Animations'],
            results: 'Designed to increase conversion rates and clearly communicate the platform\'s value proposition to potential customers.',
            link: './projects/taskflow/index.html'
        },
        'haven': {
            title: 'Haven — Case Study',
            challenge: 'A real estate platform needed to help users efficiently discover properties with advanced filtering while maintaining an engaging, premium browsing experience.',
            approach: 'Designed property-focused layouts with powerful search/filter systems, detailed property views, and interactive cards that showcase listings beautifully.',
            solution: 'Built a property discovery platform with search filters, property cards, detail views, agent profiles, favorites system, and comprehensive mobile experience.',
            features: ['Advanced property search and filters', 'Interactive property cards', 'Property detail pages', 'Agent profiles and contact', 'Favorites functionality'],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'DOM Manipulation', 'CSS Grid'],
            results: 'Designed to simplify property discovery and provide a modern, intuitive real estate browsing experience.',
            link: './projects/haven/index.html'
        },
        'noir-digital': {
            title: 'Noir Digital — Case Study',
            challenge: 'A creative digital agency needed a portfolio website that would serve as their ultimate calling card — visually stunning, technically impressive, and unforgettable.',
            approach: 'Pushed the boundaries of CSS and JavaScript animations with bold typography, horizontal scroll sections, magnetic buttons, parallax effects, and creative transitions.',
            solution: 'Developed an award-worthy creative agency website with advanced animations, horizontal scrolling, image reveals, custom cursor interactions, and dynamic content transitions.',
            features: ['Advanced scroll animations', 'Horizontal scrolling sections', 'Magnetic button interactions', 'Image reveal effects', 'Parallax backgrounds'],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP-style Animations', 'SVG'],
            results: 'Designed to establish the agency as a top-tier creative studio and leave a lasting impression on potential clients.',
            link: './projects/noir-digital/index.html'
        },
        'essence-by-gem': {
            title: 'Essence By Gem — Case Study',
            challenge: 'A premium artisan perfume brand needed an e-commerce platform that conveyed luxury, craftsmanship, and the sensory experience of their fragrances through a digital interface.',
            approach: 'Designed an opulent, dark-themed aesthetic with plum and gold accents, elegant typography, floating bottle visuals, and fragrance note displays that evoke the luxury of the product.',
            solution: 'Built a complete luxury e-commerce experience with product collections, detailed fragrance notes (top/heart/base), quick view modals, ingredient showcases, and a refined shopping flow.',
            features: ['Fragrance note breakdown (top/heart/base)', 'Animated perfume bottle hero', 'Product quick view with details', 'Ingredient origin showcase', 'Luxury packaging animations'],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'CSS Animations', 'Gradient Design'],
            results: 'Designed to elevate the brand\'s digital presence and create an immersive, luxurious shopping experience that matches the quality of the fragrances.',
            link: './projects/essence-by-gem/index.html'
        }
    };

    const modal = document.getElementById('caseStudyModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');
    const modalBackdrop = modal ? modal.querySelector('.modal-backdrop') : null;

    document.querySelectorAll('.case-study-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-project');
            const data = caseStudies[key];
            if (!data || !modalBody) return;

            modalBody.innerHTML = `
                <h3>${data.title}</h3>
                <h3>The Challenge</h3>
                <p>${data.challenge}</p>
                <h3>The Approach</h3>
                <p>${data.approach}</p>
                <h3>The Solution</h3>
                <p>${data.solution}</p>
                <h3>Key Features</h3>
                <p>${data.features.map(f => '• ' + f).join('<br>')}</p>
                <h3>Technologies</h3>
                <div class="modal-tags">${data.technologies.map(t => '<span>' + t + '</span>').join('')}</div>
                <h3>Results</h3>
                <p>${data.results}</p>
                <a href="${data.link}" class="modal-link">View Live Project →</a>
            `;

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // === MAGNETIC BUTTON EFFECT ===
    document.querySelectorAll('.btn, .nav-cta, .project-btn').forEach(btn => {
        btn.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            this.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });
        btn.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });

})();
