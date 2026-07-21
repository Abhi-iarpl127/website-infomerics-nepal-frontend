"use client";
import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { checkArrow } from "@/common/functions";
import { Block, Report } from "@/types/common";
import Link from "next/link";
import { getData } from "@/services/APIServices";
import DateComponent from "../Date";

const InfoSliderCards = ({
  data,
}: {
  data: Block;
}) => {
  

  const [swiperData, setSwiperData] = useState<Report[]>([]);

  useEffect(() => {
    // setSwiperData(data.services);
    async function fetchData() {
        const response = await getData(data.category?.slug || "",1,data.Limit);
      setSwiperData(response.data as Report[]);
    }
    fetchData();
  }, [data]);

  // return <div>{JSON.stringify(swiperData)}</div>
  return (
    <div className={`section-ptb industry-reports dual-cta pattern-bottom`} style={{backgroundColor:data.BackgroundColor}}>
      <div className="ir-container">
        <div className="ir-heading lg-center">
          <h2>{data.Title}</h2>
          <p dangerouslySetInnerHTML={{ __html: data.Subtitle || "" }} />
        </div>
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          className="ir-controls bottom slArticles"
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
            },
          }}
          onInit={(swiper) => checkArrow(swiper)}
          onResize={(swiper) => checkArrow(swiper)}
        >
          {swiperData.map((report) => (
            <SwiperSlide key={report.id}>
              <div className="article-card-img">
                <div className="caption">
                  <p className="date"><DateComponent date={report.Date} /></p>
                  <h3>{report.Title}</h3>
                  <Link href={report.slug} className="btn-ir-cta">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.7501 1V10.75C13.7501 10.9489 13.671 11.1397 13.5304 11.2803C13.3897 11.421 13.199 11.5 13.0001 11.5C12.8011 11.5 12.6104 11.421 12.4697 11.2803C12.3291 11.1397 12.2501 10.9489 12.2501 10.75V2.81031L1.53068 13.5306C1.38995 13.6714 1.19907 13.7504 1.00005 13.7504C0.801028 13.7504 0.610156 13.6714 0.469426 13.5306C0.328695 13.3899 0.249634 13.199 0.249634 13C0.249634 12.801 0.328695 12.6101 0.469426 12.4694L11.1897 1.75H3.25005C3.05114 1.75 2.86037 1.67098 2.71972 1.53033C2.57907 1.38968 2.50005 1.19891 2.50005 1C2.50005 0.801088 2.57907 0.610322 2.71972 0.46967C2.86037 0.329018 3.05114 0.25 3.25005 0.25H13.0001C13.199 0.25 13.3897 0.329018 13.5304 0.46967C13.671 0.610322 13.7501 0.801088 13.7501 1Z" fill="#231F20"/>
                    </svg>
                  </Link>
                </div>
                <div className="article-thumb">
                   <img src={
                        report?.ListingImage?.url || "/images/default-article.jpg"
                      } className="thumb" alt={report?.ListingImage?.alternativeText || "default"} /> 
                  <img
                     src="/images/default-article.jpg"
                    className="default"
                    alt={report?.ListingImage?.alternativeText || "default"}
                  /> 
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-nav bottom">
            <div className="swiper-pagination articles-pagination bottom"></div>
          </div>
        </Swiper>
        <div className="know-more-cta">
          {data.Button && (<Link href={data.Button?.ButtonLink || data.Button?.page?.slug || ""} className="btn-know-more">{data.Button?.ButtonText || ""}<i className={`fa-solid ${data.Button.faclass}`}></i></Link>)}
        </div>
      </div>
    </div>
  );
};

export default InfoSliderCards;
