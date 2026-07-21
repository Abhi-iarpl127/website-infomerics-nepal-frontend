"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Report, Block, FilterData } from "@/types/common";
import { getData, getfilterData } from "@/services/APIServices";
// import EventNSeminar from "@/components/sections/EventNSeminar";
// import ContactUI from "@/components/sections/ContactUI";
import Fancybox from "@/components/FancyBox";
import DateComponent from "@/components/Date";
const GenericUI = ({
  title,
  description,
  // image,
  // s_image,
  slug,
  blocks,
}: {
  title: string;
  description: string;
  image: string;
  s_image: string;
  slug: string;
  blocks: Block[];
}) => {
  const [swiperData, setSwiperData] = useState<Report[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(6);
  const [filterData, setFilterData] = useState<FilterData | null>(null);
  const [industry, setIndustry] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  // const [search, setSearch] = useState<string>("");
  const [call, setCall] = useState<number>(1);
  const [hasMoreData, setHasMoreData] = useState<boolean>(false);
  useEffect(() => {
    async function fetchData() {
      // const fslug = slug === "media-events" ? "media" : slug;

      const response = await getData(
        slug || "",
        page,
        limit,
        industry,
        year,
        month
      );
      if (page > 1) {
        setSwiperData((prev) => [...prev, ...(response.data as Report[])]);
      } else {
        setSwiperData(response.data as Report[]);
      }
      console.log(response, "hasmoredata");
      setHasMoreData(response.meta.hasmoredata || false);

      if (filterData === null) {
        const response1 = await getfilterData(slug || "");
        setFilterData(response1 as FilterData);

        console.log(response1, "filterData");
      }
    }
    fetchData();
  }, [page, limit, call]);

  useEffect(() => {
    // async function fetchData() {
    // const fslug = slug === "media-events" ? "media" : slug;
    // const response = await getData(fslug || "", 1, limit,industry,year,month,search);
    // setSwiperData(response.data as Report[]);
    setPage(1);
    setCall(call + 1);
    // }
    // fetchData();
  }, [industry, year, month, setPage, setCall]);

  const loadMore = () => {
    setPage(page + 1);
  };

  // return <div>{JSON.stringify(swiperData)}</div>

  return (
    <div className="ir-wrapper">
      {/* {JSON.stringify(swiperData)} */}
      {/* <!-- Home --> */}
      <div className="home-inner">
        <div className="banner-content">
          <div className="ir-container">
            <h1>{title}</h1>
            {/* <p dangerouslySetInnerHTML={{ __html: description }} /> */}
          </div>
          {/* <!-- Breadcrumb --> */}
          <div className="ir-breadcrumb">
            <div className="ir-container">
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link href="/media">Media</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {title}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Industry Reports --> */}
      <div className="section-ptb industry-reports">
        <div className="ir-container">
          <div className="heading-filters">
            <div className="row align-items-center">
              <div className="col-xl-6">
                <div className="ir-heading lg-center">
                  {/* <h2>{title}</h2> */}
                  <h2 dangerouslySetInnerHTML={{ __html: description }} />
                </div>
              </div>
              <div className="col-xl-6">
                {/* {JSON.stringify(filterData)} */}
                <div className="ir-filters ir-form">
                  <div className="row gx-2">
                    {/* Industry Dropdown (Dummy Options) */}
                    {filterData?.industry &&
                      filterData?.industry?.length > 0 && (
                        <div className="col-sm-auto">
                          <div className="form-group">
                            <select
                              className="form-select"
                              value={industry}
                              onChange={(e) => setIndustry(e.target.value)}
                            >
                              <option value="">Select Industry</option>
                              {filterData?.industry?.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.IndustryTitle}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}

                    {/* Month Dropdown */}
                    {filterData?.months && filterData?.months?.length > 0 && (
                      <div className="col-sm-auto">
                        <div className="form-group">
                          <select
                            className="form-select"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                          >
                            <option value="">Select Month</option>
                            {filterData?.months?.map((item) => (
                              <option
                                key={item.monthNumber}
                                value={item.monthNumber}
                              >
                                {item.monthName}
                              </option>
                            ))}
                            {/*   <option value="">Month</option>
                          <option value="1">January</option>
                          <option value="2">February</option>
                          <option value="3">March</option> */}
                          </select>
                        </div>
                      </div>
                    )}
                    {/* Year Dropdown */}
                    {filterData?.years && filterData?.years?.length > 0 && (
                      <div className="col-sm-auto">
                        <div className="form-group">
                          <select
                            className="form-select"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                          >
                            <option value="">Select Year</option>
                            {filterData?.years?.map((item) => (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            ))}
                            {/*   <option value="">Year</option>
                          <option value="2023">2023</option>
                          <option value="2024">2024</option>
                          <option value="2025">2025</option> */}
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="reports-wrapper">
            <div className="row">
              {swiperData.map((item, index) => (
                <div key={index} className="col-lg-4 col-sm-6 col-news-card">
                  {!item?.video?.YouTubeLink &&
                    item?.ListingPageButton?.DocumentFile?.url && (
                      <Link
                        href={
                          item?.ListingPageButton?.DocumentFile?.url
                            ? item?.ListingPageButton?.DocumentFile?.url
                            : item.slug == ""
                            ? `#`
                            : item.slug
                        }
                        // href={`#1`}
                        target="_self"
                        className="news-card"
                      >
                        {/* {JSON.stringify(item)} */}

                        <div className="news-thumb" style={{ height: "215px" }}>
                          <img
                            src={item?.ListingImage?.url}
                            className="thumb"
                            alt={item?.ListingImage?.alternativeText}
                          />

                          <img src="/images/default-16-9.jpg" alt="" />
                        </div>

                        <div className="caption">
                          <p className="date">
                            <DateComponent date={item.Date} />
                          </p>

                          <div className="title-btn-wrapper">
                            <h4>{item.Title}</h4>

                            <span
                              className="btn-know-more btn-sm"
                              style={{ userSelect: "auto" }}
                            >
                              <svg
                                width="10"
                                height="10"
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
                          </div>
                        </div>
                        <span
                          className="btn-know-more btn-sm"
                          style={{ userSelect: "auto" }}
                        >
                          <svg
                            width="10"
                            height="10"
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
                      </Link>
                    )}
                  {!item?.video?.YouTubeLink &&
                    !item?.ListingPageButton?.DocumentFile?.url && (
                      <Link
                        href={
                          item.Link
                            ? item.Link
                            : item.slug == ""
                            ? `#`
                            : item.slug
                        }
                        // href={`#2`}
                        target="_self"
                        className="news-card"
                      >
                        {/* {JSON.stringify(item)} */}

                        <div className="news-thumb" style={{ height: "215px" }}>
                          <img
                            src={item?.ListingImage?.url}
                            className="thumb"
                            alt={item?.ListingImage?.alternativeText}
                          />

                          <img src="/images/default-16-9.jpg" alt="" />
                        </div>

                        <div className="caption">
                          <p className="date">
                            <DateComponent date={item.Date} />
                          </p>

                          <div className="title-btn-wrapper">
                            <h4>{item.Title}</h4>

                            <span
                              className="btn-know-more btn-sm"
                              style={{ userSelect: "auto" }}
                            >
                              <svg
                                width="10"
                                height="10"
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
                          </div>
                        </div>
                      </Link>
                    )}
                  {item?.video?.YouTubeLink &&
                    !item?.ListingPageButton?.DocumentFile?.url && (
                      <Fancybox>
                        <Link
                          href={`${item.video.YouTubeLink}`}
                          // href={`#3`}
                          className="news-card video"
                          data-fancybox="video-gallery"
                        >
                          <div
                            className="news-thumb"
                            style={{ height: "215px" }}
                          >
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
                                  : item?.ListingImage?.url
                                  ? item?.ListingImage?.url
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
                          </div>

                          <div className="caption">
                            <p className="date">
                              <DateComponent date={item.Date} />
                            </p>
                            <h4>{item.Title}</h4>
                            <p>{item.Subtitle}</p>
                          </div>
                          <div className="btn-know-more btn-sm">
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 14 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.7501 1V10.75C13.7501 10.9489 13.671 11.1397 13.5304 11.2803C13.3897 11.421 13.199 11.5 13.0001 11.5C12.8011 11.5 12.6104 11.421 12.4697 11.2803C12.3291 11.1397 12.2501 10.9489 12.2501 10.75V2.81031L1.53068 13.5306C1.38995 13.6714 1.19907 13.7504 1.00005 13.7504C0.801028 13.7504 0.610156 13.6714 0.469426 13.5306C0.328695 13.3899 0.249634 13.199 0.249634 13C0.249634 12.801 0.328695 12.6101 0.469426 12.4694L11.1897 1.75H3.25005C3.05114 1.75 2.86037 1.67098 2.71972 1.53033C2.57907 1.38968 2.50005 1.19891 2.50005 1C2.50005 0.801088 2.57907 0.610322 2.71972 0.46967C2.86037 0.329018 3.05114 0.25 3.25005 0.25H13.0001C13.199 0.25 13.3897 0.329018 13.5304 0.46967C13.671 0.610322 13.7501 0.801088 13.7501 1Z"
                                fill="#231F20"
                              />
                            </svg>
                          </div>
                        </Link>
                      </Fancybox>
                    )}
                </div>
              ))}
            </div>
          </div>
          <div className="show-more-cta">
            {hasMoreData && (
              <div className="btn-know-more" onClick={loadMore}>
                SHOW MORE
              </div>
            )}
          </div>
        </div>
      </div>
      {/* get expert section */}
      {/* {JSON.stringify(blocks[1])} */}
      {blocks[1]?.description && (
      <div className="section-pb get-expert">
        <div className="ir-container">
          <div className="get-expert-box">
            <div className="row align-items-center">
              <div className="col-12">
                <div className="expert-content text-center">
                  <h2 dangerouslySetInnerHTML={{ __html: blocks[1]?.description || "" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
      {/* <EventNSeminar />
      <ContactUI
        title={"Contact Us"}
        image="/images/bg_connect_with_us_011998b9d5.jpg"
      /> */}
    </div>
  );
};
export default GenericUI;
