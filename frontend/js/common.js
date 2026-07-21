// Get window dimensions
let winWidth = window.innerWidth;
let winHeight = window.innerHeight;

// Get header and footer height
let headerHeight = document.querySelector('.ir-header').offsetHeight;
let footerHeight = document.querySelector(".ir-footer").offsetHeight;

// Disable smooth scroll behavior
document.documentElement.style.scrollBehavior = 'auto';

// Toggle the 'nav-up' class on header when scrolled down more than 50px
window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
        document.querySelector('header').classList.add('nav-up');
    } else {
        document.querySelector('header').classList.remove('nav-up');
    }
});

// Set --vh custom property based on the viewport height
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

// Update --vh custom property on window resize
window.addEventListener('resize', function () {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

document.addEventListener("DOMContentLoaded", function () {
    if (winWidth >= 991) {
        // Show or hide scrollToTop button based on scroll position
        window.addEventListener('scroll', function () {
            if (window.scrollY > 100) {
                document.querySelector(".scrollToTop").style.display = "inline-flex";
            } else {
                document.querySelector(".scrollToTop").style.display = "none";
            }
        });
        // Smooth scroll to top when scrollToTop button is clicked
        document.querySelector(".scrollToTop").addEventListener("click", function (event) {
            event.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    } else {
        document.querySelector(".scrollToTop").style.display = "none";
    }
});

// Top Nav Toggle
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const topNav = document.querySelector(".top-nav");
    const navLinks = document.querySelectorAll(".top-nav-inner a");

    // Toggle menu when clicking the menu button
    menuToggle.addEventListener("click", function () {
        topNav.classList.toggle("active");
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            topNav.classList.remove("active"); // Hide menu
        });
    });
});

// Dropdown on Hover
document.addEventListener('DOMContentLoaded', function () {
    // Check screen size
    function isMobile() {
        return window.innerWidth < 1198; // Bootstrap xl breakpoint
    }

    // Handle hover for desktop
    const dropdowns = document.querySelectorAll('.nav-item.dropdown');

    dropdowns.forEach(function (dropdown) {
        if (!isMobile()) {
            dropdown.addEventListener('mouseenter', function () {
                dropdown.classList.add('show');
                dropdown.querySelector('.dropdown-toggle').classList.add('show');
                dropdown.querySelector('.dropdown-menu').classList.add('show');
            });

            dropdown.addEventListener('mouseleave', function () {
                dropdown.classList.remove('show');
                dropdown.querySelector('.dropdown-toggle').classList.remove('show');
                dropdown.querySelector('.dropdown-menu').classList.remove('show');
            });
        }
        // Handle click for mobile
        /*dropdown.querySelector('.dropdown-toggle').addEventListener('click', function (e) {
            if (isMobile()) {
                e.preventDefault();
                dropdown.classList.toggle('show');
                this.classList.toggle('show');
                dropdown.querySelector('.dropdown-menu').classList.toggle('show');
            }
        });*/
    });
});

// ----- Check Swiper Arrow Enable ----- //
function checkArrow(swiperObj) {
    const ele = swiperObj.el;
    const swiperPrev = ele.querySelector('.swiper-button-prev');
    const swiperNext = ele.querySelector('.swiper-button-next');
    const swiperNav = ele.querySelector('.swiper-nav');
    const slides = ele.querySelectorAll('.swiper-slide');
    const totalSlides = slides.length;

    // Check if the total number of slides is less than slidesPerView and add a class if true
    if (totalSlides < swiperObj.params.slidesPerView) {
        ele.classList.add('justify-center');
    } else {
        ele.classList.remove('justify-center');
    }

    if (!swiperPrev || !swiperNext || !swiperNav) {
        //console.warn("Swiper navigation elements not found.");
        return;
    }

    // Check if both buttons have the 'swiper-button-disabled' class
    if (swiperPrev.classList.contains("swiper-button-disabled") && swiperNext.classList.contains("swiper-button-disabled")) {
        swiperNav.classList.add("hide");
    } else {
        swiperNav.classList.remove("hide");
    }
}

// Opening the menu
document.querySelectorAll('.menu-open').forEach(function (element) {
    element.addEventListener('click', function (e) {
        e.preventDefault(); // Optional: prevents default behavior if needed
        menuOpen();
    });
});

// Closing the menu
document.querySelectorAll('.menu-close').forEach(function (element) {
    element.addEventListener('click', function (e) {
        e.preventDefault(); // Optional: prevents default behavior if needed
        menuClose();
    });
});

function menuOpen() {
    const navbarCollapse = document.getElementById('irCollapsibleNav');

    // Show the menu
    navbarCollapse.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function menuClose() {
    const navbarCollapse = document.getElementById('irCollapsibleNav');

    // Hide the menu
    navbarCollapse.classList.remove('open');
    document.body.style.overflow = 'auto'; // Enable scrolling
}

// Function to fade in an element
function fadeIn(element) {
    element.style.opacity = 0;
    element.style.display = 'block';

    let opacity = 0;
    const fadeInterval = setInterval(function () {
        if (opacity < 1) {
            opacity += 0.1;
            element.style.opacity = opacity;
        } else {
            clearInterval(fadeInterval);
        }
    }, 30);
}

// Function to fade out an element
function fadeOut(element) {
    let opacity = 1;
    const fadeInterval = setInterval(function () {
        if (opacity > 0) {
            opacity -= 0.1;
            element.style.opacity = opacity;
        } else {
            clearInterval(fadeInterval);
            element.style.display = 'none';
        }
    }, 30);
}

// Search Functionality
document.addEventListener("DOMContentLoaded", function () {
    const searchButtons = document.querySelectorAll(".btnGlobalSearch");
    const searchWrapper = document.querySelector(".search-wrapper");
    const closeSearchBtn = document.querySelector(".btn-closeSearch");
    const searchContent = document.querySelector(".search-content");

    searchButtons.forEach((btn) => {
        btn.addEventListener("click", function (event) {
            event.stopPropagation(); // Prevent click from bubbling to document
            const isVisible = searchWrapper.classList.toggle("show");

            // Toggle 'disable' class on search buttons
            searchButtons.forEach((button) => {
                button.classList.toggle("disabled", isVisible);
            });
        });
    });

    // Remove 'show' when clicking outside
    document.addEventListener("click", function (event) {
        if (!searchWrapper.contains(event.target) && !event.target.classList.contains("btnGlobalSearch")) {
            closeSearch();
        }
    });

    // Remove 'show' when clicking the close button
    if (closeSearchBtn) {
        closeSearchBtn.addEventListener("click", function () {
            closeSearch();
        });
    }

    function closeSearch() {
        searchWrapper.classList.remove("show");
        searchButtons.forEach((button) => button.classList.remove("disabled"));

        // Hide search-content
        searchContent.style.display = "none";
    }
});

// ----- Tabs Scroll Inview ----- //
// Select all scrollable containers with the class 'scrollable-tabs'
let tabContainers = document.querySelectorAll('.scrollable-tabs');

if (tabContainers.length > 0) {
    // Iterate over each container
    tabContainers.forEach(function (navscroll) {
        let navLinks = navscroll.querySelectorAll('.nav-link');  // Select all nav links within the container
        let activeLink = navscroll.querySelector('.nav-link.active');  // Select active link within the container

        // Scroll the container to the active link on load
        if (activeLink) {
            scrollToActive(navscroll, activeLink);
        }

        // Add click event to each nav link
        navLinks.forEach(function (link) {
            link.addEventListener("click", function (event) {
                event.preventDefault();  // Prevent the default action of the link

                // Remove 'active' class from all links within this container
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                });

                // Add 'active' class to the clicked link
                link.classList.add('active');

                // Scroll the container to the clicked link
                scrollToActive(navscroll, link);

                // Smooth scroll to the target div (specified by data-target attribute)
                const targetId = link.getAttribute('href'); // Assuming href contains the ID of the target div
                const targetElement = document.querySelector(targetId); // Select the target element

                if (targetElement) {
                    smoothScrollTo(targetElement);
                }
            });
        });
    });
}

// Function to scroll the container to the active link
function scrollToActive(container, activeElement) {
    let containerRect = container.getBoundingClientRect();
    let activeRect = activeElement.getBoundingClientRect();

    // Calculate the difference between the active element's position and the container's visible area
    let offset = activeRect.left - containerRect.left;

    // Adjust the scroll position of the container smoothly
    container.scrollBy({
        left: offset - (containerRect.width / 2) + (activeRect.width / 2),
        behavior: 'smooth'
    });
}

// Function for smooth scrolling to a target element
function smoothScrollTo(target) {
    // Get the target element's position relative to the document
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;

    // Smoothly scroll to the target position
    window.scrollTo({
        top: targetPosition - scrollTillSectionTabs,
        behavior: 'smooth'
    });
}
