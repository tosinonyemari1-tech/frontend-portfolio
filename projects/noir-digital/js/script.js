/* Noir Digital — Creative Agency JavaScript */
(function(){
    'use strict';

    // Custom Cursor
    const cursor=document.getElementById('cursor');
    if(cursor&&window.matchMedia('(pointer:fine)').matches){
        const dot=cursor.querySelector('.cursor-dot');
        const ring=cursor.querySelector('.cursor-ring');
        let mx=0,my=0,cx=0,cy=0;
        document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px'});
        function animate(){cx+=(mx-cx)*.12;cy+=(my-cy)*.12;ring.style.left=cx+'px';ring.style.top=cy+'px';requestAnimationFrame(animate)}
        animate();
        document.querySelectorAll('a,button,.service-card,.team-card,.work-item').forEach(el=>{
            el.addEventListener('mouseenter',()=>cursor.classList.add('hovering'));
            el.addEventListener('mouseleave',()=>cursor.classList.remove('hovering'));
        });
    }

    // Nav
    const nav=document.querySelector('.nav');
    window.addEventListener('scroll',()=>{nav.classList.toggle('scrolled',window.pageYOffset>50)});

    // Hamburger
    const hamburger=document.getElementById('hamburger');
    const mobileMenu=document.getElementById('mobileMenu');
    hamburger.addEventListener('click',()=>{hamburger.classList.toggle('active');mobileMenu.classList.toggle('active');document.body.style.overflow=mobileMenu.classList.contains('active')?'hidden':''});
    document.getElementById('mobileOverlay').addEventListener('click',()=>{hamburger.classList.remove('active');mobileMenu.classList.remove('active');document.body.style.overflow=''});
    mobileMenu.querySelectorAll('.mobile-panel a').forEach(a=>a.addEventListener('click',()=>{hamburger.classList.remove('active');mobileMenu.classList.remove('active');document.body.style.overflow=''}));

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',function(e){e.preventDefault();const t=document.querySelector(this.getAttribute('href'));if(t)window.scrollTo({top:t.getBoundingClientRect().top+window.pageYOffset-80,behavior:'smooth'})})});

    // Reveal text animations
    const reveals=document.querySelectorAll('.reveal-text,.reveal-up');
    const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');observer.unobserve(e.target)}})},{threshold:.15});
    reveals.forEach(el=>observer.observe(el));

    // Reveal cards
    const cards=document.querySelectorAll('.service-card,.team-card,.testimonial-card,.work-item,.process-card,.award-item');
    const cardObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.style.opacity='1';e.target.style.transform='translateY(0)';cardObserver.unobserve(e.target)}})},{threshold:.1});
    cards.forEach((el,i)=>{
        el.style.opacity='0';el.style.transform='translateY(24px)';
        el.style.transition=`opacity .7s ${i*.05}s cubic-bezier(.4,0,.2,1),transform .7s ${i*.05}s cubic-bezier(.4,0,.2,1)`;
        cardObserver.observe(el);
    });

    // Counter animation
    const counters=document.querySelectorAll('.about-stat-num[data-target]');
    const counterObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){const el=e.target;const target=parseInt(el.dataset.target);const dur=2000;const start=performance.now();function update(now){const p=Math.min((now-start)/dur,1);const eased=1-Math.pow(1-p,3);el.textContent=Math.floor(target*eased);if(p<1)requestAnimationFrame(update)}requestAnimationFrame(update);counterObserver.unobserve(el)}})},{threshold:.5});
    counters.forEach(c=>counterObserver.observe(c));

    // Magnetic buttons
    document.querySelectorAll('.btn-primary,.btn-nav').forEach(btn=>{
        btn.addEventListener('mousemove',function(e){const rect=this.getBoundingClientRect();const x=e.clientX-rect.left-rect.width/2;const y=e.clientY-rect.top-rect.height/2;this.style.transform=`translate(${x*.15}px,${y*.15}px)`});
        btn.addEventListener('mouseleave',function(){this.style.transform=''});
    });

    // Form
    const form=document.getElementById('contactForm');
    if(form){form.addEventListener('submit',function(e){e.preventDefault();const btn=this.querySelector('button[type="submit"]');btn.textContent='Message Sent! ✓';btn.style.background='#22c55e';setTimeout(()=>{btn.textContent='Send Message';btn.style.background='';this.reset()},3000)})}
})();
