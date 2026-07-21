
  // ==============================
  // Swiper Initializations
  // ==============================

  const initBenefitsSlider = () => {
    const el = document.querySelector('.slBenefitsIR');
    if (!el) return;

    new Swiper(el, {
      direction: 'vertical',
      loop: true,
      centeredSlides: true,
      autoHeight: true,
      speed: 1000,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".benefits-pagination",
        clickable: true,
      },
      breakpoints: {
        0: { slidesPerView: 3 },
        576: { slidesPerView: 3 },
        767: { slidesPerView: 3 },
        991: { slidesPerView: 3 },
        1199: { slidesPerView: 3 },
      }
    });
  };

  const initFunAtWorkSlider = () => {
    const el = document.querySelector('.slFunAtWork');
    if (!el) return;

    new Swiper(el, {
      spaceBetween: 0,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        576: { slidesPerView: 2 },
        768: { slidesPerView: 2 },
        991: { slidesPerView: 3 },
        1200: { slidesPerView: 4 },
      },
    });
  };

  const initTestimonialsSlider = () => {
    const el = document.querySelector('.slTestimonials');
    if (!el) return;

    new Swiper(el, {
      spaceBetween: 24,
      speed: 800,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".testimonials-pagination",
        clickable: true,
      },
      breakpoints: {
        0: { slidesPerView: 1, spaceBetween: 20 },
        576: { slidesPerView: 2, spaceBetween: 24 },
        991: { slidesPerView: 3, spaceBetween: 24 },
      }
    });
  };

  const initWorkWithUsSlider = () => {
    const el = document.querySelector('.slWorkWithUs');
    if (!el) return;

    new Swiper(el, {
      spaceBetween: 24,
      centeredSlides: false,
      speed: 800,
      loop: true,
      autoplay: {
        delay: 4000,
      },
      resistanceRatio: 0,
      breakpoints: {
        0: { slidesPerView: 1.125, spaceBetween: 20 },
        576: { slidesPerView: 1.25, spaceBetween: 20 },
        767: { slidesPerView: 3, spaceBetween: 24 },
        991: { slidesPerView: 4, spaceBetween: 24 },
        1199: { slidesPerView: 6, spaceBetween: 24 },
      },
      on: {
        init: function () { if (typeof checkArrow === "function") checkArrow(this); },
        resize: function () { if (typeof checkArrow === "function") checkArrow(this); }
      },
    });
  };

  // ==============================
  // Modal Initialization
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

  // ==============================
  // Initialize everything on DOMContentLoaded
  // ==============================
  document.addEventListener('DOMContentLoaded', () => {
    initBenefitsSlider();
    initFunAtWorkSlider();
    initTestimonialsSlider();
    initWorkWithUsSlider();
    initCareerModal();
  });

