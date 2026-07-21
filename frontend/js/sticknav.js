window.addEventListener("load", (event) => {
    const stickyEl = document.querySelector('.sticky-element');
    const container = stickyEl.closest('.ir-scroll-container');
    const header = document.querySelector('header');
    const breakpoint = 992.98;

    let stickyEnabled = window.innerWidth >= breakpoint;

    function updateSticky() {
        if (!stickyEnabled) {
            stickyEl.style.position = 'static';
            stickyEl.style.top = 'auto';
            stickyEl.style.paddingBottom = '0';  // Remove extra padding on smaller screens
            return;
        }

        const headerHeight = header.offsetHeight + 10;
        const extraPadding = 80;  // Additional 100px padding at the bottom of sticky element

        // Apply padding only for larger screens
        if (window.innerWidth >= breakpoint) {
            stickyEl.style.paddingBottom = `${extraPadding}px`; // Add extra padding for larger screens
        } else {
            stickyEl.style.paddingBottom = '0'; // Remove extra padding for smaller screens
        }

        const stickyHeight = stickyEl.offsetHeight;
        const containerTop = container.offsetTop;
        const containerHeight = container.offsetHeight;
        const scrollY = window.scrollY;

        // Start and stop points for sticky behavior
        const startSticky = containerTop - headerHeight;
        const stopSticky = containerTop + containerHeight - stickyHeight - headerHeight - (window.innerWidth >= breakpoint ? extraPadding : 0);

        // Apply sticky positioning based on scroll position
        if (scrollY >= startSticky && scrollY < stopSticky) {
            stickyEl.style.position = 'fixed';
            stickyEl.style.top = `${headerHeight}px`;  // Stick below header
        } else if (scrollY >= stopSticky) {
            stickyEl.style.position = 'absolute';
            stickyEl.style.top = `${containerHeight - stickyHeight - (window.innerWidth >= breakpoint ? extraPadding : 0)}px`; // Stop at the container bottom
        } else {
            stickyEl.style.position = 'static'; // Default position when not sticky
            stickyEl.style.top = 'auto';
        }
    }

    // Debounce function for resize event
    function debounce(func, wait) {
        let timeout;
        return () => {
            clearTimeout(timeout);
            timeout = setTimeout(func, wait);
        };
    }

    function handleResize() {
        const newStickyEnabled = window.innerWidth >= breakpoint;
        if (newStickyEnabled !== stickyEnabled) {
            stickyEnabled = newStickyEnabled;
            updateSticky();
        }
    }

    // Attach events
    window.addEventListener('scroll', updateSticky);
    window.addEventListener('resize', debounce(() => {
        handleResize();
        updateSticky(); // Recalculate sticky state on resize
    }, 100));

    // Initial run on page load
    updateSticky();
});
