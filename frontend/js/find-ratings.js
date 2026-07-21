// ----- Articles Slider ----- //
var slArticles = new Swiper(".slArticles", {
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
            slidesPerView: 1,
            spaceBetween: 20,
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