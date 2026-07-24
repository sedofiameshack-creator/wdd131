// ============================================
// Filtered Temple Album — filtered-temples.js
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

// --- Temple data ---
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    // --- Additional temples (required: at least three more) ---
    {
        templeName: "St. George Utah",
        location: "St. George, Utah, United States",
        dedicated: "1877, April, 6",
        area: 143969,
        imageUrl:
            "https://commons.wikimedia.org/wiki/Special:FilePath/St._George_Temple.jpg"
    },
    {
        templeName: "Logan Utah",
        location: "Logan, Utah, United States",
        dedicated: "1884, May, 17",
        area: 119619,
        imageUrl:
            "https://commons.wikimedia.org/wiki/Special:FilePath/Logan_Utah_Temple.jpg"
    },
    {
        templeName: "Draper Utah",
        location: "Draper, Utah, United States",
        dedicated: "2009, March, 20",
        area: 58300,
        imageUrl:
            "https://commons.wikimedia.org/wiki/Special:FilePath/Draper_LDS_Temple.jpg"
    },
    {
        templeName: "Hong Kong China",
        location: "Hong Kong, China",
        dedicated: "1996, May, 26",
        area: 21744,
        imageUrl:
            "https://commons.wikimedia.org/wiki/Special:FilePath/Hong_Kong_China_Temple.jpg"
    },
    {
        templeName: "Cardston Alberta",
        location: "Cardston, Alberta, Canada",
        dedicated: "1923, August, 26",
        area: 88562,
        imageUrl:
            "https://commons.wikimedia.org/wiki/Special:FilePath/Cardston_Alberta_Canada_Temple.jpg"
    }
];

// --- Helpers ---

// Pull just the year out of a "YYYY, Month, D" dedicated string
function dedicatedYear(dedicated) {
    return parseInt(dedicated.split(',')[0], 10);
}

// Figure out which filter categories a temple belongs to
function getCategories(temple) {
    const categories = [];
    const year = dedicatedYear(temple.dedicated);

    if (year < 1900) categories.push('old');
    if (year > 2000) categories.push('new');
    if (temple.area > 90000) categories.push('large');
    if (temple.area < 10000) categories.push('small');

    return categories;
}

// Format area with thousands separators, e.g. 116642 -> "116,642"
function formatArea(area) {
    return area.toLocaleString('en-US');
}

// --- Build the temple cards ---
const templeGrid = document.getElementById('temple-grid');

temples.forEach((temple) => {
    const categories = getCategories(temple);

    const figure = document.createElement('figure');
    figure.className = 'temple-card';
    figure.dataset.category = categories.join(' ');

    figure.innerHTML = `
        <img src="${temple.imageUrl}" alt="${temple.templeName}" width="400" height="300" loading="lazy">
        <figcaption>
            <h2>${temple.templeName}</h2>
            <p class="temple-location">${temple.location}</p>
            <p class="temple-meta"><span class="label">Dedicated:</span> ${temple.dedicated}</p>
            <p class="temple-meta"><span class="label">Area:</span> ${formatArea(temple.area)} sq ft</p>
        </figcaption>
    `;

    templeGrid.appendChild(figure);
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