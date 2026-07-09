// ============================================
// Temple Album — temples.js
// ============================================

// --- Footer: dynamic copyright year + last modified date ---
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent =
    `Last modification: ${document.lastModified}`;

// --- Hamburger menu (mobile only) ---
const navToggle = document.getElementById('nav-toggle');
const primaryNav = document.getElementById('primary-nav');

navToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen);
});

// Close the mobile menu after a link is chosen, so the menu
// doesn't stay open covering the page.
primaryNav.addEventListener('click', (event) => {
    if (event.target.matches('.nav-link') && primaryNav.classList.contains('is-open')) {
        primaryNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
    }
});

// --- Category filtering (Home / Old / New / Large / Small) ---
const navLinks = document.querySelectorAll('.nav-link');
const cards = document.querySelectorAll('.temple-card');

navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();

        navLinks.forEach((l) => l.classList.remove('is-active'));
        link.classList.add('is-active');

        const filter = link.dataset.filter;

        cards.forEach((card) => {
            const categories = card.dataset.category.split(' ');
            const matches = filter === 'all' || categories.includes(filter);
            card.classList.toggle('is-hidden', !matches);
        });
    });
});