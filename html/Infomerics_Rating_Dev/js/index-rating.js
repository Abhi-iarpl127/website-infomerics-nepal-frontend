
// ==============================
// Swiper Sliders Initialization
// ==============================
const initSliders = () => {

    // ------------------------------
    // Home Slider
    // ------------------------------
    const initHomeSlider = () => {
        const homeSliderEl = document.querySelector(".homeSlider");
        if (!homeSliderEl) return;

        new Swiper(homeSliderEl, {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".home-pagination",
                clickable: true,
            },
            navigation: false,
            effect: "slide",
        });
    };

    // ------------------------------
    // Recent Ratings Slider
    // ------------------------------
    const initRecentRatingsSlider = () => {
        const ratingsEl = document.querySelector(".recentRatings");
        if (!ratingsEl) return;

        new Swiper(ratingsEl, {
            slidesPerView: 1,
            spaceBetween: 20,
            pagination: {
                el: ".swiper-pagination-rating",
                clickable: true,
            },
            breakpoints: {
                768: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
                1200: { slidesPerView: 4 },
            },
        });
    };

    // ------------------------------
    // Initialize all sliders
    // ------------------------------
    initHomeSlider();
    initRecentRatingsSlider();
};

// ==============================
// Initialize on DOM ready
// ==============================
document.addEventListener("DOMContentLoaded", () => {
    initSliders();
});

