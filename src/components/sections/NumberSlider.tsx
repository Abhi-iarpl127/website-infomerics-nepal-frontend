import React from "react";
import { checkArrow } from "@/common/functions";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { CardData } from "@/types/common";

// const slides = [
//   {
//     icon: "/images/icons/financial-sector.png",
//     title: "Corporate sector",
//     description: "Gorem ipsum dolor sit amet, gorem ipsum dconsectetur adipiscing elit."
//   },
//   {
//     icon: "/images/icons/financial-sector.png", 
//     title: "Structure Finance",
//     description: "Gorem ipsum dolor sit amet, gorem ipsum dconsectetur adipiscing elit."
//   },
//   {
//     icon: "/images/icons/financial-sector.png",
//     title: "Infrastructure Sector", 
//     description: "Gorem ipsum dolor sit amet, gorem ipsum dconsectetur adipiscing elit."
//   },
//   {
//     icon: "/images/icons/financial-sector.png",
//     title: "Corporate sector",
//     description: "Gorem ipsum dolor sit amet, gorem ipsum dconsectetur adipiscing elit."
//   }
// ];

const NumberSlider = ({ data }: { data: CardData[] }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      className="ir-controls bottom slGroupsFeatures"
      spaceBetween={24}
      centeredSlides={false}
      speed={800}
      loop={false}
      resistanceRatio={0}
      pagination={{
        el: ".grp-pagination",
        clickable: true,
      }}
      breakpoints={{
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
      }}
      onInit={(swiper) => checkArrow(swiper)}
      onResize={(swiper) => checkArrow(swiper)}
    >
      
      {data.map((slide, index) => (
        <SwiperSlide key={index}>
          <a href="#" className="grp-card">
            <div className="icon">
              {/* <img src={slide.icon} alt="" /> */}
              <Image src={slide?.Icon?.url} alt={slide?.Icon?.alternativeText || ""} width={slide?.Icon?.width} height={slide?.Icon?.height} style={{width: "revert-layer", height: "auto"}}  />
            </div>
            <h4>{slide.Title}</h4>
            <p dangerouslySetInnerHTML={{ __html: slide.Description }} />
            <span className="btn-ir-cta">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.7501 1V10.75C13.7501 10.9489 13.671 11.1397 13.5304 11.2803C13.3897 11.421 13.199 11.5 13.0001 11.5C12.8011 11.5 12.6104 11.421 12.4697 11.2803C12.3291 11.1397 12.2501 10.9489 12.2501 10.75V2.81031L1.53068 13.5306C1.38995 13.6714 1.19907 13.7504 1.00005 13.7504C0.801028 13.7504 0.610156 13.6714 0.469426 13.5306C0.328695 13.3899 0.249634 13.199 0.249634 13C0.249634 12.801 0.328695 12.6101 0.469426 12.4694L11.1897 1.75H3.25005C3.05114 1.75 2.86037 1.67098 2.71972 1.53033C2.57907 1.38968 2.50005 1.19891 2.50005 1C2.50005 0.801088 2.57907 0.610322 2.71972 0.46967C2.86037 0.329018 3.05114 0.25 3.25005 0.25H13.0001C13.199 0.25 13.3897 0.329018 13.5304 0.46967C13.671 0.610322 13.7501 0.801088 13.7501 1Z" fill="#231F20"></path></svg>
            </span>
          </a>
        </SwiperSlide>
      ))}
      <div className="swiper-nav bottom">
        <div className="swiper-pagination grp-pagination bottom"></div>
      </div>
    </Swiper>
  );
};

export default NumberSlider;
