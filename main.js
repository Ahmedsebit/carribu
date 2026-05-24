// ============================
// NAVBAR SCROLL EFFECT
// ============================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ============================
// MOBILE MENU
// ============================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ============================
// FEATURE TABS
// ============================
const tabs = document.querySelectorAll('.feature-tab');
const panels = document.querySelectorAll('.feature-panel');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('panel-' + tab.dataset.tab).classList.add('active');
    });
});

// ============================
// SCROLL REVEAL ANIMATIONS
// ============================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ============================
// ANIMATED COUNTERS
// (Uncomment when stats section is enabled)
// ============================
// function animateCounter(el, target, suffix = '', duration = 2000) {
//     const startTime = performance.now();
//     function update(now) {
//         const progress = Math.min((now - startTime) / duration, 1);
//         const ease = 1 - Math.pow(1 - progress, 3);
//         const current = Math.floor(target * ease);
//         el.textContent = (target % 1 !== 0 ? (target * ease).toFixed(1) : current.toLocaleString()) + suffix;
//         if (progress < 1) requestAnimationFrame(update);
//     }
//     requestAnimationFrame(update);
// }
//
// const statsObserver = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             animateCounter(document.getElementById('statSchools'), 50, '+');
//             animateCounter(document.getElementById('statStudents'), 12000, '+');
//             animateCounter(document.getElementById('statTrips'), 85000, '+');
//             animateCounter(document.getElementById('statUptime'), 99.9, '%');
//             statsObserver.unobserve(entry.target);
//         }
//     });
// }, { threshold: 0.5 });
// statsObserver.observe(document.querySelector('.stats-bar'));

// ============================
// SMOOTH SCROLL
// ============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
        }
    });
});
