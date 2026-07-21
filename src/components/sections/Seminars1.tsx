"use client";
import React, { useEffect,useState } from "react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation, Pagination } from "swiper/modules";
// import { checkArrow } from "@/common/functions";
// import Fancybox from "@/components/FancyBox";
import DateComponent from "@/components/Date";
import { Block, SeminarData1,SeminarData } from "@/types/common";
import { getSeminarsData } from "@/services/APIServices";
import Link from "next/link";
// import Link from "next/link";
const Seminars1 = ({ data }: { data: Block }) => {
  const [seminarData, setSeminarData] = useState<SeminarData1 | null>(null);
  const [seminarDataArr, setSeminarDataArr] = useState<SeminarData [] | null  >(null);
  const [thumbnailSrc, setThumbnailSrc] = useState<string>("");
  const [timeRemaining, setTimeRemaining] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Calculate time remaining until seminar starts
  const calculateTimeRemaining = (seminarDate: string, seminarTime: string) => {
    try {
      // Combine date and time to create a datetime string
      const seminarDateTime = new Date(`${seminarDate} ${seminarTime}`);
      const now = new Date();
      const timeDiff = seminarDateTime.getTime() - now.getTime();

      if (timeDiff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    } catch (error) {
      console.error('Error calculating time remaining:', error);
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  };

  // Update countdown every second
  useEffect(() => {
    if (!seminarData?.ActiveSeminar?.Date || !seminarData?.ActiveSeminar?.Time) return;

    const updateCountdown = () => {
      const remaining = calculateTimeRemaining(
        seminarData.ActiveSeminar.Date,
        seminarData.ActiveSeminar.Time
      );
      setTimeRemaining(remaining);
    };

    // Update immediately
    updateCountdown();

    // Update every second
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [seminarData]);

  useEffect(() => {
    // setSwiperData(data.services);
    async function fetchData() {
      const response = await getSeminarsData();
      // Extract the YouTube video ID from different YouTube URL formats to create the thumbnail link
      const youtubeUrl = response.data.ActiveSeminar?.video?.YouTubeLink || "";
      const tempSeminarDataArr = response.data.SeminarCard as SeminarData[];
      console.log(response.data.SeminarCard ,"SeminarCard");
      for(let i = 0; i < tempSeminarDataArr.length; i++) {
        const youtubeUrl = tempSeminarDataArr[i].video.YouTubeLink || "";
        let videoId = "";
        if (youtubeUrl.includes("youtube.com")) {
          const match = youtubeUrl.match(/(?:\/embed\/|v=)([^?&]+)/) || youtubeUrl.match(/v=([^&]+)/);
          videoId = match ? match[1] : "";
        }
        console.log(videoId,"videoId",tempSeminarDataArr[i]);
        tempSeminarDataArr[i].video.VideoThumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "";
      }
      setSeminarDataArr(tempSeminarDataArr);
      // console.log(youtubeUrl,"videoId youtubeUrl");
      let videoId = "";
      if (youtubeUrl.includes("youtube.com")) {
        // for URLs like https://www.youtube.com/watch?v=VIDEO_ID or https://www.youtube.com/embed/VIDEO_ID
        const match =
          youtubeUrl.match(/(?:\/embed\/|v=)([^?&]+)/) || youtubeUrl.match(/v=([^&]+)/);
        videoId = match ? match[1] : "";
      } else if (youtubeUrl.includes("youtu.be")) {
        // for URLs like https://youtu.be/VIDEO_ID
        const match = youtubeUrl.match(/youtu\.be\/([^?&]+)/);
        videoId = match ? match[1] : "";
      }
    console.log(videoId,"videoId");

      const tempSrc = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "";
      if (tempSrc) {
        setThumbnailSrc(tempSrc);
      }
      else {
        setThumbnailSrc("/images/default-16-9.jpg");
      }
      setSeminarData(response.data as SeminarData1);
    }
    fetchData();
  }, [data]);

  return (
    <div className="section-ptb home-seminars dual-cta">
      <div className="ir-container">
        <div className="ir-heading lg-center">
          <h2>{data.Title}</h2>
        </div>
        {seminarData?.ActiveSeminar?.Date && seminarData?.ActiveSeminar?.Time && (
        <div className="featured-seminar">
          <div className="featured-thumbnail">
            <img
              src={thumbnailSrc}
              alt={seminarData?.ActiveSeminar.Title || ""}
            />
          </div>
          <div className="featured-info">
            <div className="featured-content">
              <span className="seminar-date">
                <DateComponent date={seminarData?.ActiveSeminar.Date || ""} />
              </span>
              <h2
                className="seminar-title"
                dangerouslySetInnerHTML={{
                  __html: seminarData?.ActiveSeminar.Title || "",
                }}
              />
            </div>
            <div className="vertical-line"></div>
            <div className="featured-actions">
              <div className="countdown">
                {!seminarData?.ActiveSeminar?.Date || !seminarData?.ActiveSeminar?.Time ? (
                  <span>Seminar time not available</span>
                ) : timeRemaining.days === 0 && timeRemaining.hours === 0 && timeRemaining.minutes === 0 && timeRemaining.seconds === 0 ? (
                  <span>Seminar has started or completed</span>
                ) : (
                  <>
                    Seminar starts in <strong>
                      {timeRemaining.days > 0 && `${timeRemaining.days}d `}
                      {String(timeRemaining.hours).padStart(2, '0')}:
                      {String(timeRemaining.minutes).padStart(2, '0')}:
                      {String(timeRemaining.seconds).padStart(2, '0')}
                    </strong>
                  </>
                )}
              </div>
              <div className="read-more-cta">
                <a
                  href={seminarData?.ActiveSeminar.video.YouTubeLink || ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Join Now
                </a>
              </div>
            </div>
          </div>
        </div>
        )}
        <div className="seminars-grid-home">
          {/* {JSON.stringify(seminarDataArr)} */}
        
          {seminarDataArr?.map((item1) => (
          <div className="seminar-card-home" key={item1.id}>
              {/* {JSON.stringify(item1.video)} */}
            <div className="seminar-thumb-home">
              <img
                src={item1.video.VideoThumbnailUrl || ""}
                className="thumb"
                alt="US Presidential Election Results"
              />
            </div>
            <div className="seminar-content-home">
              <div className="seminar-date">
                <DateComponent date={item1.Date || ""} />
              </div>
              <h4 className="seminar-title-grid">
                {item1.Title}
                
              </h4>
              <div className="read-more-cta">
                <a   href={item1.video.YouTubeLink || ""}>View Now</a> 
              </div>
            </div>
          </div>
          ))}
        </div>
        <div className="read-more-cta-2">
          <Link href="/media/seminar">View All Seminars</Link>
        </div>
      </div>
    </div>
  );
};

export default Seminars1;
