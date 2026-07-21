"use client";
import { checkArrow } from "@/common/functions";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay , EffectFade, Navigation, Pagination, Parallax } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Banner } from "@/types/common";

const MainSlider = ({ data }: { data: Banner[] }) => {
  return (
    <div className="home-section">
      {/* {JSON.stringify(data)} */}
      <div className="scroll-down">
        <div className="ir-container">
          <p>
            Scroll to
            <br /> Explore
          </p>
        </div>
      </div>
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination, Parallax]}
        className="rh-controls homeSlider"
        spaceBetween={0}
        loop={true}
        effect="fade"
        parallax={true}
        //centeredSlides: true,
        speed={800}
        autoplay={{
          delay: 18000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        resistanceRatio={0}
        navigation={{
          prevEl: ".home-prev",
          nextEl: ".home-next",
        }}
        pagination={{
          el: ".home-pagination",
          clickable: true,
        }}
        onInit={(swiper) => checkArrow(swiper)}
        onResize={(swiper) => checkArrow(swiper)}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            {/* {JSON.stringify(item)} */}
            {item?.Image?.url && item?.Image?.url?.includes("mp4") ? (
              <div className="swiper-slidevideo-wrapper">
                {/* <video className="video-item homeVideo" loop muted playsInline autoPlay>
                  <source src={item?.MobileImage?.url} media="(max-width:640px)" />
                  <source src={item?.Image?.url} />
                  <track kind="captions" src="" />
                </video> */}
                <video className="video-item homeVideo" autoPlay muted loop playsInline>
								<source src={item?.Image?.url} media="(min-width:641px)" type="video/mp4" />
								<source src={item?.MobileImage?.url} media="(max-width:640px)" type="video/mp4" />
								Your browser does not support the video tag.
							</video>
              </div>
            ) : (
              <div className="swiper-slide">
                <div
                  className="banner-content banner-text"
                  data-swiper-parallax="-300"
                >
                  <div className="ir-container">
                    <div className="banner-text">
                      <h1
                        dangerouslySetInnerHTML={{ __html: item.Title || "" }}
                      />
                      <p
                        dangerouslySetInnerHTML={{
                          __html: item.Subtitle || "",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <picture>
                  <source
                    media="(max-width:640px)"
                    srcSet={item?.MobileImage?.url}
                  />
                  <img src={item?.Image?.url} alt="" />
                </picture>
              </div>
            )}
          </SwiperSlide>
        ))}
        <div className="swiper-pagination home-pagination"></div>
      </Swiper>
    </div>
  );
};

export default MainSlider;
