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
// Header Scroll Behavior
// ==============================
const initHeaderScroll = () => {
    const header = qs('.ig-header');
    const toggleNavUp = () => header.classList.toggle('nav-up', window.scrollY > 50);
    on(window, 'scroll', debounce(toggleNavUp, 20));
    toggleNavUp();
};

// ==============================
// Mobile Menu Toggle
// ==============================
const initMobileMenu = () => {
    const navbar = qs('#igCollapsibleNav');
    const openMenu = () => {
        navbar.classList.add('open');
        document.body.style.overflow = 'hidden';
    };
    const closeMenu = () => {
        navbar.classList.remove('open');
        document.body.style.overflow = 'auto';
        // Close dropdowns inside menu
        qsa('.nav-item.dropdown', navbar).forEach(dropdown => {
            dropdown.classList.remove('show');
            qs('.dropdown-toggle', dropdown)?.classList.remove('show');
            qs('.dropdown-menu', dropdown)?.classList.remove('show');
        });
    };

    qsa('.menu-open').forEach(btn => on(btn, 'click', openMenu));
    qsa('.menu-close').forEach(btn => on(btn, 'click', closeMenu));

    // Click outside closes menu on mobile
    on(document, 'click', e => {
        if (window.innerWidth < 1200 && navbar.classList.contains('open') &&
            !navbar.contains(e.target) && !qsa('.menu-open').some(b => b.contains(e.target))) {
            closeMenu();
        }
    });
};

// ==============================
// Dropdowns (Hover Desktop / Click Mobile)
// ==============================
const initDropdowns = () => {
    const isMobile = () => window.innerWidth < 1200;

    qsa('.nav-item.dropdown').forEach(dropdown => {
        const toggle = qs('.dropdown-toggle', dropdown);
        const menu = qs('.dropdown-menu', dropdown);

        // Desktop hover
        ['mouseenter', 'mouseleave'].forEach(evt => {
            on(dropdown, evt, () => {
                if (!isMobile()) {
                    const show = evt === 'mouseenter';
                    dropdown.classList.toggle('show', show);
                    toggle.classList.toggle('show', show);
                    menu.classList.toggle('show', show);
                }
            });
        });

        // Mobile click toggle (accordion style)
        on(toggle, 'click', e => {
            if (isMobile()) {
                e.preventDefault();

                const isOpen = dropdown.classList.contains('show');

                // Toggle clicked dropdown only
                dropdown.classList.toggle('show', !isOpen);
                toggle.classList.toggle('show', !isOpen);
                menu.classList.toggle('show', !isOpen);
            }
        });
    });

    // Click outside closes only open dropdowns on mobile
    on(document, 'click', e => {
        if (!isMobile()) return;

        qsa('.nav-item.dropdown').forEach(dropdown => {
            const toggle = qs('.dropdown-toggle', dropdown);
            const menu = qs('.dropdown-menu', dropdown);

            if (!dropdown.contains(e.target) && dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
                toggle?.classList.remove('show');
                menu?.classList.remove('show');
            }
        });
    });
};

// ==============================
// Phone Icon & Helpdesk Button
// ==============================
const initPhoneIcon = () => {
    const phoneIcon = qs('#phoneIcon');
    const helpdeskBtn = qs('#helpdeskBtn');

    if (!phoneIcon || !helpdeskBtn) return;

    on(phoneIcon, 'click', () => helpdeskBtn.classList.toggle('show'));
    on(window, 'scroll', () => helpdeskBtn.classList.remove('show'));
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
                const isOpen = toggle.classList.contains('active'); // check current state

                // Close all
                qsa('.footer-links').forEach(f => f.style.maxHeight = null);
                toggles.forEach(t => t.classList.remove('active'));

                // Toggle current
                if (!isOpen) {
                    list.style.maxHeight = list.scrollHeight + "px";
                    toggle.classList.add('active');
                }
            }
        });
    });
};

// ==============================
// Initialize Everything
// ==============================
document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initMobileMenu();
    initDropdowns();
    initPhoneIcon();
    initFooterAccordion();
});
