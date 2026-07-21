// ==============================
// Swiper Helpers
// ==============================
function checkArrow(swiperObj) {
    const ele = swiperObj.el;
    const swiperPrev = ele.querySelector('.swiper-button-prev');
    const swiperNext = ele.querySelector('.swiper-button-next');
    const swiperNav = ele.querySelector('.swiper-nav');
    const slides = ele.querySelectorAll('.swiper-slide');
    const totalSlides = slides.length;

    // If slides < slidesPerView, center them
    if (totalSlides < swiperObj.params.slidesPerView) {
        ele.classList.add('justify-center');
    } else {
        ele.classList.remove('justify-center');
    }

    if (!swiperPrev || !swiperNext || !swiperNav) return;

    // Hide nav if both buttons are disabled
    if (swiperPrev.classList.contains("swiper-button-disabled") &&
        swiperNext.classList.contains("swiper-button-disabled")) {
        swiperNav.classList.add("hide");
    } else {
        swiperNav.classList.remove("hide");
    }
}

// ==============================
// Journey Slider
// ==============================
const initJourneySlider = () => {
    new Swiper(".slJourney", {
        spaceBetween: 0,
        centeredSlides: false,
        speed: 800,
        loop: false,
        resistanceRatio: 0,
        pagination: {
            el: ".journey-pagination",
            clickable: true,
        },
        breakpoints: {
            0: { slidesPerView: 1, spaceBetween: 20 },
            576: { slidesPerView: 2 },
            767: { slidesPerView: 2 },
            991: { slidesPerView: 3 },
            1199: { slidesPerView: 3 },
            1299: { slidesPerView: 4 },
        },
        on: {
            init: function () { checkArrow(this); },
            resize: function () { checkArrow(this); }
        },
    });
};

// ==============================
// Teams Slider
// ==============================
const initTeamsSlider = () => {
  new Swiper(".slTeams", {
    spaceBetween: 24,
    centeredSlides: false,
    speed: 800,
    loop: false,
    resistanceRatio: 0,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: { slidesPerView: 1, spaceBetween: 20 },
      576: { slidesPerView: 2, spaceBetween: 24 },
      767: { slidesPerView: 2, spaceBetween: 24 },
      991: { slidesPerView: 3, spaceBetween: 24 },
      1199: { slidesPerView: 3, spaceBetween: 24 },
      1299: { slidesPerView: 4, spaceBetween: 24 },
    },
  });
};


// ==============================
// Fancybox Accreditation Gallery
// ==============================
const initAccreditationGallery = () => {
    Fancybox.bind("[data-fancybox='accreditation']", {
        Thumbs: false,
        Toolbar: { display: ["zoom", "close"] },
        captions: { type: "outside" }, // Show captions outside
        loop: false,
        infinite: false,
        transitionEffect: "slide",
        Hash: false,
    });
};

// ==============================
// Mask Vision Image
// ==============================
const initMaskedImage = () => {
    const image = document.querySelector('.masked-image');
    if (!image) return;

    const updateMask = (x, y) => {
        image.style.clipPath = `circle(150px at ${x}px ${y}px)`;
    };

    // Center mask on load
    window.addEventListener('load', () => {
        const rect = image.getBoundingClientRect();
        updateMask(rect.width / 2, rect.height / 2);
    });

    // Mouse move
    document.addEventListener('mousemove', (e) => {
        const rect = image.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        updateMask(x, y);
    });

    // Touch move
    document.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        const rect = image.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        updateMask(x, y);
    });
};

// ==============================
// Init All
// ==============================
document.addEventListener("DOMContentLoaded", () => {
    initJourneySlider();
    initTeamsSlider();
    initAccreditationGallery();
    initMaskedImage();
});
