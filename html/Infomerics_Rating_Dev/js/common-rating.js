// ==============================
// Utilities
// ==============================
const qs = (selector, scope = document) => scope.querySelector(selector);
const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
const on = (el, event, handler) => el.addEventListener(event, handler);

const debounce = (fn, wait = 50) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), wait);
    };
};

// ==============================
// Scroll to Top
// ==============================
const initScrollToTop = () => {
    const scrollBtn = qs(".scrollToTop");
    if (!scrollBtn) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            scrollBtn.style.display = "inline-flex";
        } else {
            scrollBtn.style.display = "none";
        }
    });

    on(scrollBtn, "click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
};

// ==============================
// Mobile Search
// ==============================
const initMobileSearch = () => {
    const searchBtn = qs('.btn-mobile-search');
    const searchBar = qs('.header-search');
    const closeBtn = qs('.header-search .search-close');

    if (!searchBtn || !searchBar || !closeBtn) return;

    const toggleSearch = (e) => {
        e.stopPropagation();
        searchBar.classList.toggle('active');
    };

    const closeSearch = () => searchBar.classList.remove('active');

    on(searchBtn, 'click', toggleSearch);
    on(closeBtn, 'click', closeSearch);

    on(document, 'click', e => {
        if (window.innerWidth < 1200 && searchBar.classList.contains('active') &&
            !searchBar.contains(e.target) && !searchBtn.contains(e.target)) {
            closeSearch();
        }
    });
};

// ==============================
// Mobile Menu
// ==============================
const initMobileMenu = () => {
    const menuBtn = qs('.menu-open');
    const menu = qs('.header-right');
    const closeBtn = qs('.header-right .menu-close');

    if (!menuBtn || !menu || !closeBtn) return;

    const openMenu = () => menu.classList.add('active');
    const closeMenu = () => menu.classList.remove('active');

    on(menuBtn, 'click', openMenu);
    on(closeBtn, 'click', closeMenu);

    on(document, 'click', e => {
        if (window.innerWidth < 1200 && menu.classList.contains('active') &&
            !menu.contains(e.target) && !menuBtn.contains(e.target)) {
            closeMenu();
        }
    });
};

// ==============================
// Bottom Nav & Dropdowns
// ==============================
const initBottomNav = () => {
    const toggleBtn = qs('.bottom-nav .menu-toggle');
    const navInner = qs('.bottom-nav .bottom-nav-inner');
    const closeBtn = qs('.bottom-nav .bottom-nav-close');
    const dropdownToggles = qsa('.bottom-nav .dropdown-toggle');

    if (!toggleBtn || !navInner || !closeBtn) return;

    const openNav = (e) => {
        e.stopPropagation();
        navInner.classList.add('open');
    };

    const closeNav = (e) => {
        e.stopPropagation();
        navInner.classList.remove('open');
        qsa('.bottom-nav .dropdown').forEach(d => d.classList.remove('open'));
    };

    const toggleDropdown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const parent = e.currentTarget.parentElement;

        qsa('.bottom-nav .dropdown').forEach(d => {
            if (d !== parent) d.classList.remove('open');
        });

        parent.classList.toggle('open');
    };

    on(toggleBtn, 'click', openNav);
    on(closeBtn, 'click', closeNav);
    dropdownToggles.forEach(toggle => on(toggle, 'click', toggleDropdown));

    on(document, 'click', e => {
        if (navInner.classList.contains('open') &&
            !navInner.contains(e.target) && !toggleBtn.contains(e.target)) {
            closeNav(e);
        }
    });
};

// ==============================
// Phone Icon & Helpdesk Button
// ==============================
const initPhoneIcon = () => {
    const phoneIcon = qs('#phoneIcon');
    const helpdeskBtn = qs('#helpdeskBtn');

    if (!phoneIcon || !helpdeskBtn) return;

    on(phoneIcon, 'click', () => {
        helpdeskBtn.classList.toggle('show');
    });

    on(window, 'scroll', () => {
        helpdeskBtn.classList.remove('show');
    });
};

// ==============================
// Footer Accordion (Mobile)
// ==============================
const initFooterAccordion = () => {
    const toggles = qsa('.accordion-toggle');
    toggles.forEach(toggle => {
        on(toggle, 'click', () => {
            if (window.innerWidth <= 767) {
                const list = toggle.nextElementSibling;
                const isOpen = list.style.maxHeight && list.style.maxHeight !== "0px";

                qsa('.footer-links').forEach(f => f.style.maxHeight = null);
                toggles.forEach(t => t.classList.remove('active'));

                if (!isOpen) {
                    list.style.maxHeight = list.scrollHeight + "px";
                    toggle.classList.add('active');
                }
            }
        });
    });
};

// ==============================
// Initialize All
// ==============================
document.addEventListener('DOMContentLoaded', () => {
    initScrollToTop();
    initMobileSearch();
    initMobileMenu();
    initBottomNav();
    initPhoneIcon();
    initFooterAccordion();
});
