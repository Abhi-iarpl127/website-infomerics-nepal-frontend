
// ----- Home Banner ----- //
var homeSlider = new Swiper(".homeSlider", {
    spaceBetween: 0,
    loop: true,
    effect: 'fade',
    parallax: true,
    //centeredSlides: true,
    speed: 1000,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    resistanceRatio: 0,
    pagination: {
        el: ".home-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".home-next",
        prevEl: ".home-prev",
    },
    on: {
        init: function () {
            checkArrow(this);
        },
        resize: function () {
            checkArrow(this);
        }
    },
});

// ----- Infomerics Ratings ----- //
var slGroupsFeatures = new Swiper(".slGroupsFeatures", {
    spaceBetween: 24,
    centeredSlides: false,
    speed: 800,
    loop: false,
    resistanceRatio: 0,
    pagination: {
        el: ".grp-pagination",
        clickable: true,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        576: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        767: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        991: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        1199: {
            slidesPerView: 3,
            spaceBetween: 20,
        }
    },
    on: {
        init: function () {
            checkArrow(this);
        },
        resize: function () {
            checkArrow(this);
        }
    },
});

document.addEventListener("DOMContentLoaded", function () {
    Fancybox.bind('[data-fancybox="video-gallery"]', {
        Thumbs: {
            autoStart: false, // Open thumbnails by default
            axis: "y" // Move thumbnails to the right (vertical alignment)
        },
        Video: {
            youtube: {
                controls: 1, // Show player controls
                modestbranding: 1, // Minimal YouTube branding
                rel: 0, // Disable related videos
            },
            vimeo: {
                color: "ff0000", // Change Vimeo player color
                portrait: 0, // Hide portrait
            },
        },
    });
});

