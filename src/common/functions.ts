import type { Swiper } from "swiper";

export function checkArrow(swiperObj: Swiper) {
  // console.log("sb checkArrow");
  const ele = swiperObj.el;
  const swiperPrev = ele.querySelector(".swiper-button-prev");
  const swiperNext = ele.querySelector(".swiper-button-next");
  const swiperNav = ele.querySelector(".swiper-nav");
  const slides = ele.querySelectorAll(".swiper-slide");
  const totalSlides = slides.length;



   // Check if the total number of slides is less than slidesPerView and add a class if true
   if (totalSlides < Number(swiperObj.params.slidesPerView)) {
    ele.classList.add("justify-center");
  } else {
    ele.classList.remove("justify-center");
  }

  if (!swiperPrev || !swiperNext || !swiperNav) {
    console.warn("Swiper navigation elements not found.");
    return; 
  }

  // Check if both buttons have the 'swiper-button-disabled' class
  console.log(
    swiperPrev.classList.contains("swiper-button-disabled"),
    "sb--",
    swiperNext.classList.contains("swiper-button-disabled")
  );
  if (
    swiperPrev.classList.contains("swiper-button-disabled") &&
    swiperNext.classList.contains("swiper-button-disabled")
  ) {
    swiperNav.classList.add("hide");
  } else {
    swiperNav.classList.remove("hide");
  }

 
}

export function fadeIn(element: HTMLElement) {
  element.style.opacity = "0";
  element.style.display = "block";

  let opacity = 0;
  const fadeInterval = setInterval(function () {
    if (opacity < 1) {
      opacity += 0.1;
      element.style.opacity = opacity.toString();
    } else {
      clearInterval(fadeInterval);
    }
  }, 30);
}

// Function to fade out an element
export function fadeOut(element: HTMLElement) {
  let opacity = 1;
  const fadeInterval = setInterval(function () {
    if (opacity > 0) {
      opacity -= 0.1;
      element.style.opacity = opacity.toString();
    } else {
      clearInterval(fadeInterval);
      element.style.display = "none";
    }
  }, 30);
}


