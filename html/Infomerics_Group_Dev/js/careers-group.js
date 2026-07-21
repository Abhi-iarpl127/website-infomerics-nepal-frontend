// ------------------------ Helper Function ------------------------
function handleSwiperArrows(swiperInstance) {
    if (typeof checkArrow === "function") {
        checkArrow(swiperInstance);
    }
}

// ------------------------ Work With Us Slider ------------------------
const slWorkWithUs = new Swiper(".slWorkWithUs", {
    spaceBetween: 24,
    centeredSlides: false,
    speed: 800,
    loop: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false
    },
    resistanceRatio: 0,
    breakpoints: {
        0: { slidesPerView: 1.125, spaceBetween: 20 },
        576: { slidesPerView: 1.25, spaceBetween: 20 },
        767: { slidesPerView: 3, spaceBetween: 24 },
        991: { slidesPerView: 4, spaceBetween: 24 },
        1199: { slidesPerView: 6, spaceBetween: 24 }
    },
    on: {
        init: function () { handleSwiperArrows(this); },
        resize: function () { handleSwiperArrows(this); }
    }
});

// ------------------------ Benefits Slider ------------------------
const slBenefitsIR = new Swiper(".slBenefitsIR", {
    spaceBetween: 0,
    centeredSlides: true,
    speed: 1000,
    loop: true,
    autoHeight: true,
    direction: 'vertical',
    resistanceRatio: 0,
    autoplay: {
        delay: 6000,
        disableOnInteraction: false
    },
    pagination: {
        el: ".benefits-pagination",
        clickable: true
    },
    slidesPerView: 3, // same for all breakpoints
    on: {
        init: function () { handleSwiperArrows(this); },
        resize: function () { handleSwiperArrows(this); }
    }
});

// ------------------------ Fun At Work Slider ------------------------
const slFunAtWork = new Swiper(".slFunAtWork", {
    spaceBetween: 0,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    breakpoints: {
        0: { slidesPerView: 1 },
        576: { slidesPerView: 2 },
        768: { slidesPerView: 2 },
        991: { slidesPerView: 3 },
        1200: { slidesPerView: 4 }
    }
});

// ------------------------ Testimonials Slider ------------------------
const slTestimonials = new Swiper(".slTestimonials", {
    spaceBetween: 24,
    speed: 800,
    loop: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false
    },
    pagination: {
        el: ".testimonials-pagination",
        clickable: true
    },
    breakpoints: {
        0: { slidesPerView: 1, spaceBetween: 20 },
        576: { slidesPerView: 2, spaceBetween: 24 },
        991: { slidesPerView: 3, spaceBetween: 24 }
    }
});

// ==============================
// Career Modal Initialization
// ==============================
const initCareerModal = () => {
    const modalcareer = document.getElementById('jobApplicationModal');
    const btn = document.getElementById('openModalBtnCareer');
    const span = document.getElementsByClassName('close-btn')[0];

    if (!modalcareer || !btn || !span) return;

    // Open modal
    btn.onclick = function (e) {
        e.preventDefault();
        modalcareer.style.display = 'block';
    }

    // Close modal via X
    span.onclick = function () {
        modalcareer.style.display = 'none';
    }

    // Close modal when clicking outside
    window.onclick = function (event) {
        if (event.target == modalcareer) {
            modalcareer.style.display = 'none';
        }
    }
};

// Initialize modal
initCareerModal();
