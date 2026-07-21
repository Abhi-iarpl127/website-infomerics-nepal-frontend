// ----- Why Work With Us? ----- //
var slWorkWithUs = new Swiper(".slWorkWithUs", {
    spaceBetween: 24,
    centeredSlides: false,
    speed: 800,
    loop: true,
    autoplay: {
        delay: 4000,
    },
    resistanceRatio: 0,
    /*pagination: {
        el: ".wwu-pagination",
        clickable: true,
    },*/
    breakpoints: {
        0: {
            slidesPerView: 1.125,
            spaceBetween: 20
        },
        576: {
            slidesPerView: 1.25,
            spaceBetween: 20
        },
        767: {
            slidesPerView: 3,
            spaceBetween: 24
        },
        991: {
            slidesPerView: 4,
            spaceBetween: 24
        },
        1199: {
            slidesPerView: 6,
            spaceBetween: 24
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
// ----- Benefits of Infomarics ----- //
var slBenefitsIR = new Swiper(".slBenefitsIR", {
    spaceBetween: 0,
    centeredSlides: true,
    speed: 1000,
    loop: true,
    autoHeight: true,
    autoplay: {
        delay: 6000,
    },
    direction: 'vertical',
    resistanceRatio: 0,
    pagination: {
        el: ".benefits-pagination",
        clickable: true,
    },
    breakpoints: {
        0: {
            slidesPerView: 3
        },
        576: {
            slidesPerView: 3
        },
        767: {
            slidesPerView: 3
        },
        991: {
            slidesPerView: 3
        },
        1199: {
            slidesPerView: 3
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
// ----- Fun @work ----- //
var slFunAtWork = new Swiper(".slFunAtWork", {
    spaceBetween: 0,
    centeredSlides: false,
    speed: 1000,
    loop: true,
    autoplay: {
        delay: 6000,
    },
    resistanceRatio: 0,
    pagination: {
        el: ".wc-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".wc-next",
        prevEl: ".wc-prev",
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
            slidesPerGroup: 1,
        },
        576: {
            slidesPerView: 2,
            slidesPerGroup: 2,
        },
        767: {
            slidesPerView: 2,
            slidesPerGroup: 2,
        },
        991: {
            slidesPerView: 3,
            slidesPerGroup: 3,
        },
        1199: {
            slidesPerView: 4,
            slidesPerGroup: 4,
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
// ----- Testimonials ----- //
var slTestimonials = new Swiper(".slTestimonials", {
    spaceBetween: 24,
    centeredSlides: false,
    speed: 800,
    loop: false,
    autoplay: {
        delay: 4000,
    },
    resistanceRatio: 0,
    pagination: {
        el: ".testimonials-pagination",
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