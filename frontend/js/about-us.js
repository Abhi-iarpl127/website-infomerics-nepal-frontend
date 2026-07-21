// ----- Infomerics Groups ----- //
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
            spaceBetween: 20,
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
// ----- Management Team ----- //
var slTeams = new Swiper(".slTeams", {
    spaceBetween: 24,
    centeredSlides: false,
    speed: 800,
    loop: false,
    resistanceRatio: 0,
    pagination: {
        el: ".articles-pagination",
        clickable: true,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        576: {
            slidesPerView: 2,
            spaceBetween: 24,
        },
        767: {
            slidesPerView: 2,
            spaceBetween: 24,
        },
        991: {
            slidesPerView: 3,
            spaceBetween: 24,
        },
        1199: {
            slidesPerView: 3,
            spaceBetween: 24,
        },
        1299: {
            slidesPerView: 4,
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
// ----- Accreditations Image Gallery ----- // 
document.addEventListener("DOMContentLoaded", function () {
    Fancybox.bind("[data-fancybox='accreditation']", {
        Thumbs: false,
        Toolbar: {
            display: ["zoom", "close"],
        },
        captions: {
            type: "outside", // Show captions outside the image
        },
        loop: false, // Enable looping through the gallery
        infinite: false,
        transitionEffect: "slide",
        Hash: false,
    });
});
// ----- Mask Vision Image ----- //
/* JavaScript */
const image = document.querySelector('.masked-image');
let lastX = 0, lastY = 0;

function updateMask(x, y) {
    image.style.clipPath = `circle(150px at ${x}px ${y}px)`;
}

// Show mask in center on page load
window.addEventListener('load', () => {
    const rect = image.getBoundingClientRect();
    updateMask(rect.width / 2, rect.height / 2);
});

// Smooth real-time mouse tracking
function handleMouseMove(e) {
    const rect = image.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    updateMask(x, y);
}

document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const rect = image.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    updateMask(x, y);
});