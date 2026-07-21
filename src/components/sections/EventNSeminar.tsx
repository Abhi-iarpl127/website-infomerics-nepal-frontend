import { Report } from "@/types/common";

import Fancybox from "@/components/FancyBox";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { getData } from "@/services/APIServices";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { checkArrow } from "@/common/functions";
import DateComponent from "../Date";

const EventNSeminar = ({ bgColor = "white" }: { bgColor?: string }) => {
  const [data, setData] = useState<{
    MediaCoverage: Report[];
    Seminar: Report[];
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // console.log("EventNSeminar api/posts");
      const seminarData = await getData("seminar", 1, 4);
      const mediaCoverageData = await getData("media-coverage", 1, 4);
      setData({
        MediaCoverage: mediaCoverageData.data,
        Seminar: seminarData.data,
      });
    };
    fetchData();
  }, []);

  //
  if (!data?.MediaCoverage || !data?.Seminar) {
    return <div></div>;
  }
  //  return <div>{JSON.stringify(data)}</div>;
  return (
    <div
      className="section-ptb media-seminars dual-cta"
      style={{ backgroundColor: bgColor }}
    >
      <div className="ir-container">
        <div className="row gx-xl-5">
          <div className="col-lg-6 col-media">
            <div className="home-media">
              <div className="ir-heading lg-center">
                <h2>Media Coverage</h2>
                <p>
                  Catch all our latest news, updates, events, and announcements
                  right here.
                </p>
              </div>

              <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                className="ir-controls bottom slMediaSeminars"
                loop={true}
                speed={800}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: false,
                }}
                pagination={{
                  clickable: true,
                  el: ".swiper-pagination",
                  bulletClass: "swiper-pagination-bullet",
                  bulletActiveClass: "swiper-pagination-bullet-active",
                }}
                spaceBetween={24}
                slidesPerView={1}
                onInit={(swiper) => checkArrow(swiper)}
                onResize={(swiper) => checkArrow(swiper)}
              >
                {data?.MediaCoverage.map((item: Report) => (
                  <SwiperSlide key={item.id}>
                    <div className="latest-media-card">
                      <Link href={item?.ListingPageButton?.DocumentFile?.url || item.Link || "#"} className="lm-thumb">
                        <span className="btn-ir-cta">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.7501 1V10.75C13.7501 10.9489 13.671 11.1397 13.5304 11.2803C13.3897 11.421 13.199 11.5 13.0001 11.5C12.8011 11.5 12.6104 11.421 12.4697 11.2803C12.3291 11.1397 12.2501 10.9489 12.2501 10.75V2.81031L1.53068 13.5306C1.38995 13.6714 1.19907 13.7504 1.00005 13.7504C0.801028 13.7504 0.610156 13.6714 0.469426 13.5306C0.328695 13.3899 0.249634 13.199 0.249634 13C0.249634 12.801 0.328695 12.6101 0.469426 12.4694L11.1897 1.75H3.25005C3.05114 1.75 2.86037 1.67098 2.71972 1.53033C2.57907 1.38968 2.50005 1.19891 2.50005 1C2.50005 0.801088 2.57907 0.610322 2.71972 0.46967C2.86037 0.329018 3.05114 0.25 3.25005 0.25H13.0001C13.199 0.25 13.3897 0.329018 13.5304 0.46967C13.671 0.610322 13.7501 0.801088 13.7501 1Z"
                              fill="#231F20"
                            />
                          </svg>
                        </span>
                        {/* <img src="/images/media/latest-media-01.jpg" alt="" /> */}

                        <img
                          src={
                            item.ListingImage?.url
                              ? item.ListingImage.url
                              : "/images/media/latest-media-01.jpg"
                          }
                          className="thumb"
                          alt=""
                        />
                        <img
                          src="/images/default-16-9.jpg"
                          className="default"
                          alt=""
                        />
                      </Link>
                      <div className="caption">
                        <p className="date">
                          <DateComponent date={item.Date} />
                        </p>
                        <h3>{item.Title}</h3>
                        <p>{item.Subtitle}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
                <div className="swiper-nav bottom">
                  <div className="swiper-pagination ms-pagination bottom"></div>
                </div>
              </Swiper>

              <div className="know-more-cta">
                <Link
                  href="/media/media-coverage"
                  target="_blank"
                  className="btn-know-more"
                >
                  KNOW MORE <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-seminars">
            <div className="home-seminar">
              <div className="ir-heading lg-center">
                <h2>Seminars</h2>
                <p>Explore expert-led seminars crafted for you.</p>
              </div>

              <Swiper
                slidesPerView={1}
                spaceBetween={24}
                modules={[Autoplay, Navigation, Pagination]}
                loop={true}
                speed={800}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: false,
                }}
                pagination={{
                  clickable: true,
                  el: ".swiper-pagination",
                }}
                className="ir-controls bottom slMediaSeminars"
                onInit={(swiper) => checkArrow(swiper)}
                onResize={(swiper) => checkArrow(swiper)}
              >
                {data?.Seminar.map((item: Report) => (
                  <SwiperSlide key={item.id}>
                    <Fancybox>
                      <a
                        href={item.video?.YouTubeLink}
                        className="seminar-card"
                        data-fancybox="video-gallery"
                      >
                        <div className="seminar-thumb">
                          <img
                            src={
                              item.video?.YouTubeLink
                                ? `https://img.youtube.com/vi/${
                                    (item.video.YouTubeLink.includes("v=")
                                      ? item.video.YouTubeLink.split("v=")[1]
                                          ?.split("&")[0]
                                          .split("#")[0]
                                      : item.video.YouTubeLink.split("/")
                                          .pop()
                                          ?.split("?")[0]
                                          .split("#")[0]) || ""
                                  }/maxresdefault.jpg`
                                : item.ListingImage?.url
                                ? item.ListingImage.url
                                : "/images/media/latest-media-01.jpg"
                            }
                            className="thumb"
                            alt=""
                          />
                          <img
                            src={`${
                              item.video?.YouTubeLink
                                ? "/images/default-16-9.jpg"
                                : "/images/default-16-9.jpg"
                            }`}
                            className="default"
                            alt=""
                          />
                        </div>
                        <div className="caption">
                          <p>{item.Title}</p>
                          <span className="btn-ir-cta blue">
                            <svg
                              width="14"
                              height="18"
                              viewBox="0 0 18 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M-2.93255e-05 0.60791L18 11.0002L-2.87959e-05 21.3925L-2.93255e-05 0.60791Z"
                                fill="#231F20"
                              />
                            </svg>
                          </span>
                        </div>
                      </a>
                    </Fancybox>
                  </SwiperSlide>
                ))}
                <div className="swiper-nav bottom">
                  <div className="swiper-pagination ms-pagination bottom"></div>
                </div>
              </Swiper>

              <div className="know-more-cta">
                <Link
                  href="/media/seminar"
                  target="_blank"
                  className="btn-know-more"
                >
                  KNOW MORE <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.7501 1V10.75C13.7501 10.9489 13.671 11.1397 13.5304 11.2803C13.3897 11.421 13.199 11.5 13.0001 11.5C12.8011 11.5 12.6104 11.421 12.4697 11.2803C12.3291 11.1397 12.2501 10.9489 12.2501 10.75V2.81031L1.53068 13.5306C1.38995 13.6714 1.19907 13.7504 1.00005 13.7504C0.801028 13.7504 0.610156 13.6714 0.469426 13.5306C0.328695 13.3899 0.249634 13.199 0.249634 13C0.249634 12.801 0.328695 12.6101 0.469426 12.4694L11.1897 1.75H3.25005C3.05114 1.75 2.86037 1.67098 2.71972 1.53033C2.57907 1.38968 2.50005 1.19891 2.50005 1C2.50005 0.801088 2.57907 0.610322 2.71972 0.46967C2.86037 0.329018 3.05114 0.25 3.25005 0.25H13.0001C13.199 0.25 13.3897 0.329018 13.5304 0.46967C13.671 0.610322 13.7501 0.801088 13.7501 1Z" fill="#231F20"></path></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventNSeminar;
