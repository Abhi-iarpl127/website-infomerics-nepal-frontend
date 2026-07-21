"use client";
import React,{useEffect,useState} from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import {Autoplay, Navigation, Pagination } from "swiper/modules";
import { checkArrow } from "@/common/functions";
import Fancybox from "@/components/FancyBox";
import { Block, Report } from "@/types/common";
import { getData } from "@/services/APIServices";
import Link from "next/link";
const Seminars = ({ data }: { data: Block }) => {


  const [swiperData, setSwiperData] = useState<Report[]>([]);

  useEffect(() => {
    // setSwiperData(data.services);
    async function fetchData() {
      const response = await getData(data.category?.slug || "",1,data.Limit);
      setSwiperData(response.data as Report[]);
    }
    fetchData();
  }, [data]);


  return (
    <div className="section-ptb home-seminars dual-cta pattern-bottom" style={{backgroundColor:data.BackgroundColor}}>
      <div className="ir-container">
        <div className="ir-heading lg-center">
          <h2>{data.Title}</h2>
          <p dangerouslySetInnerHTML={{ __html: data.Subtitle || "" }} />
        </div>
        <Swiper
          className="ir-controls bottom slArticles"
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={24}
          centeredSlides={false}
          loop={true}
          speed={800}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          resistanceRatio={0}
          pagination={{
            el: ".articles-pagination",
            clickable: true,
          }}          
          breakpoints={{
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
          }}
          onInit={(swiper) => checkArrow(swiper)}
          onResize={(swiper) => checkArrow(swiper)}
        >
          {swiperData.map((seminar) => (
            <SwiperSlide key={seminar.id}>
                   <Fancybox>

              <a href={seminar.video.YouTubeLink} className="seminar-card" data-fancybox="video-gallery">
                <div className="seminar-thumb">
                  <img src={seminar.video?.YouTubeLink ? 
                          `https://img.youtube.com/vi/${
                            (seminar.video.YouTubeLink.includes('v=') 
                              ? seminar.video.YouTubeLink.split('v=')[1]?.split('&')[0].split('#')[0] 
                              : seminar.video.YouTubeLink.split('/').pop()?.split('?')[0].split('#')[0]) || ''
                          }/maxresdefault.jpg` 
                          : seminar.ListingImage?.url
                            ? seminar.ListingImage.url
                              : "/images/media/latest-media-01.jpg"
                      } className="thumb" alt="" />
                      
                  <img src="/images/default-16-9.jpg" className="default" alt="" />
                </div>
                <div className="caption">
                  <p>{seminar.Title}</p>
                  <div className="btn-ir-cta blue">
                    <svg width="14" height="18" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M-2.93255e-05 0.60791L18 11.0002L-2.87959e-05 21.3925L-2.93255e-05 0.60791Z" fill="#231F20"/>
                    </svg>
                  </div>
                </div>
              </a>
              </Fancybox>


            </SwiperSlide>
          ))}
          <div className="swiper-nav bottom">
            <div className="swiper-pagination articles-pagination bottom"></div>
          </div>
        </Swiper>
        <div className="know-more-cta">
        {data.Button && (<Link href={data.Button?.ButtonLink || data.Button?.page?.slug || ""} className="btn-know-more">{data.Button?.ButtonText || ""} <i className={`fa-solid ${data.Button.faclass}`}></i></Link>)}
        </div>
      </div>
    </div>
  );
};

export default Seminars;