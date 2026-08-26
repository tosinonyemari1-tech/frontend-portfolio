/* TaskFlow — SaaS JavaScript */
(function(){
    'use strict';

    // Nav
    const nav=document.querySelector('.nav');
    window.addEventListener('scroll',()=>{nav.classList.toggle('scrolled',window.pageYOffset>50)});

    // Hamburger
    const hamburger=document.getElementById('hamburger');
    const mobileMenu=document.getElementById('mobileMenu');
    const mobileOverlay=document.getElementById('mobileOverlay');
    hamburger.addEventListener('click',()=>{hamburger.classList.toggle('active');mobileMenu.classList.toggle('active');document.body.style.overflow=mobileMenu.classList.contains('active')?'hidden':''});
    mobileOverlay.addEventListener('click',()=>{hamburger.classList.remove('active');mobileMenu.classList.remove('active');document.body.style.overflow=''});
    mobileMenu.querySelectorAll('.mobile-panel a').forEach(a=>a.addEventListener('click',()=>{hamburger.classList.remove('active');mobileMenu.classList.remove('active');document.body.style.overflow=''}));

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',function(e){e.preventDefault();const t=document.querySelector(this.getAttribute('href'));if(t)window.scrollTo({top:t.getBoundingClientRect().top+window.pageYOffset-80,behavior:'smooth'})})});

    // Product Tabs
    document.querySelectorAll('.ptab').forEach(tab=>{
        tab.addEventListener('click',()=>{
            document.querySelectorAll('.ptab').forEach(t=>t.classList.remove('active'));
            document.querySelectorAll('.ppanel').forEach(p=>p.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById('tab-'+tab.dataset.tab).classList.add('active');
        });
    });

    // FAQ
    document.querySelectorAll('.faq-q').forEach(q=>{q.addEventListener('click',()=>{const item=q.parentElement;const wasActive=item.classList.contains('active');document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('active'));if(!wasActive)item.classList.add('active')})});

    // Pricing Toggle
    const toggleBtns=document.querySelectorAll('.toggle-btn');
    const amounts=document.querySelectorAll('.amount');
    toggleBtns.forEach(btn=>{btn.addEventListener('click',()=>{toggleBtns.forEach(b=>b.classList.remove('active'));btn.classList.add('active');amounts.forEach(a=>{a.textContent=a.dataset[btn.dataset.period]})})});

    // Reveal
    const reveals=document.querySelectorAll('.feature-card,.testimonial-card,.int-card,.price-card,.faq-item');
    const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.style.opacity='1';e.target.style.transform='translateY(0)';observer.unobserve(e.target)}})},{threshold:.1});
    reveals.forEach((el,i)=>{el.style.opacity='0';el.style.transform='translateY(24px)';el.style.transition=`opacity .6s ${i*.04}s cubic-bezier(.4,0,.2,1),transform .6s ${i*.04}s cubic-bezier(.4,0,.2,1)`;observer.observe(el)});

    // Form
    const form=document.getElementById('contactForm');
    if(form){form.addEventListener('submit',function(e){e.preventDefault();const btn=this.querySelector('button[type="submit"]');btn.textContent='Message Sent! ✓';btn.style.background='#22c55e';setTimeout(()=>{btn.textContent='Send Message';btn.style.background='';this.reset()},3000)})}
})();
