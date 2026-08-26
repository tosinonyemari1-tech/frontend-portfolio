/* Nexa Finance — JavaScript */
(function(){
    'use strict';

    // Nav scroll
    const nav=document.querySelector('.nav');
    window.addEventListener('scroll',()=>{nav.classList.toggle('scrolled',window.pageYOffset>50)});

    // Hamburger
    const hamburger=document.getElementById('hamburger');
    const navLinks=document.getElementById('navLinks');
    if(hamburger){
        hamburger.addEventListener('click',()=>{hamburger.classList.toggle('active');navLinks.classList.toggle('open');document.body.style.overflow=navLinks.classList.contains('open')?'hidden':''});
        navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{hamburger.classList.remove('active');navLinks.classList.remove('open');document.body.style.overflow=''}));
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',function(e){e.preventDefault();const t=document.querySelector(this.getAttribute('href'));if(t){window.scrollTo({top:t.getBoundingClientRect().top+window.pageYOffset-80,behavior:'smooth'})}})});

    // FAQ accordion
    document.querySelectorAll('.faq-q').forEach(q=>{q.addEventListener('click',()=>{const item=q.parentElement;const wasActive=item.classList.contains('active');document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('active'));if(!wasActive)item.classList.add('active')})});

    // Pricing toggle
    const toggleBtns=document.querySelectorAll('.toggle-btn');
    const amounts=document.querySelectorAll('.amount');
    toggleBtns.forEach(btn=>{btn.addEventListener('click',()=>{toggleBtns.forEach(b=>b.classList.remove('active'));btn.classList.add('active');const period=btn.dataset.period;amounts.forEach(a=>{a.textContent=a.dataset[period]})})});

    // Reveal animations
    const reveals=document.querySelectorAll('.feature-card,.security-card,.price-card,.testimonial-card,.faq-item,.cta-box,.contact-form-wrap');
    const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.style.opacity='1';e.target.style.transform='translateY(0)';observer.unobserve(e.target)}})},{threshold:.1});
    reveals.forEach(el=>{el.style.opacity='0';el.style.transform='translateY(30px)';el.style.transition='opacity .7s cubic-bezier(.4,0,.2,1),transform .7s cubic-bezier(.4,0,.2,1)';observer.observe(el)});

    // Form
    const form=document.getElementById('contactForm');
    if(form){form.addEventListener('submit',function(e){e.preventDefault();const btn=this.querySelector('button[type="submit"]');btn.textContent='Message Sent! ✓';btn.style.background='#22c55e';setTimeout(()=>{btn.textContent='Send Message';btn.style.background='';this.reset()},3000)})}

    // Chart animation
    setTimeout(()=>{document.querySelectorAll('.chart-bar').forEach((bar,i)=>{bar.style.height=bar.style.height})},500);
})();
