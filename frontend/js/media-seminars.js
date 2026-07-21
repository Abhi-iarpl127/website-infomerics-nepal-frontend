
// ----- Media Seminars Slider ----- //
var slMediaSeminars = new Swiper(".slMediaSeminars", {
    spaceBetween: 24,
    centeredSlides: false,
    speed: 800,
    loop: false,
    resistanceRatio: 0,
    pagination: {
        el: ".ms-pagination",
        clickable: true,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 24,
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
// ----- Media / Seminars Videos ----- //
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
        loop: false, // Enable looping through the gallery
        infinite: false,
        Hash: false,
    });
});

