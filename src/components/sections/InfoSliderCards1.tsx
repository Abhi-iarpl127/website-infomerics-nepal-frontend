"use client";
import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { checkArrow } from "@/common/functions";
import { Block, Report } from "@/types/common";
// import Link from "next/link";
import { getData } from "@/services/APIServices";
import DateComponent from "../Date";
import Link from "next/link";

const InfoSliderCards = ({ data }: { data: Block }) => {
  const [swiperData, setSwiperData] = useState<Report[]>([]);
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    if (data.companies && data.companies.length > 0) {
      setSwiperData(data.companies as unknown as Report[]);
    } else {
      async function fetchData() {
        const response = await getData(data.category?.slug || "", 1, data.Limit);
        setSwiperData(response.data as Report[]);
      }
      fetchData();
    }
  }, [data]);

  useEffect(() => {
    // Only run on client
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setShowDebug(params.get("debug") === "1");
    }
  }, []);

  return (
    <div className="section-ptb section-ratings">
      <div className="ir-container container">
        <div className="ir-heading lg-center">
          <h2>{data.Title}</h2>
          <p dangerouslySetInnerHTML={{ __html: data.Subtitle || "" }} />
        </div>

        {/* <!-- Swiper --> */}
        <div className="swiper recentRatings">
          <div className="swiper-wrapper">
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
                  {/* {showDebug && <div>{JSON.stringify(report)}</div>} */}

                  <div className="d-flex flex-column">
                    <div className="date">
                      <DateComponent date={report.Date} />
                    </div>
                    <h5>
                      {report.CompanyName} <br />
                      {report.SubTitle}
                      {showDebug && <div>{JSON.stringify(report.PressRelease?.Document?.DocumentFile)}</div>}
                    </h5>
                    <div className="circular-button">
                      <Link
                        href={
                          report.PressRelease?.Document?.DocumentFile?.url ||
                          report.PressRelease?.Link ||
                          "#"
                        }
                        target="_blank"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M7 17l9-9M16 16V8h-8"></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              <div className="swiper-nav bottom">
                <div className="swiper-pagination-rating articles-pagination mt-4"></div>
              </div>
            </Swiper>
          </div>

          {/* <!-- Pagination --> */}
        </div>
      </div>
    </div>
  );
};

export default InfoSliderCards;