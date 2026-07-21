"use client";

import { useEffect, useState } from "react";
import { getRatingsData, getRatingsDetailsData } from "@/services/APIServices";
import {
  // AccordionData,
  DocumentData,
  RatingData,
  RatingListData,
  // SectionData,
  SubmenuitemData,
} from "@/types/common";
// import Link from "next/link";
// import ContactUI from "@/components/sections/ContactUI";
// import EventNSeminar from "@/components/sections/EventNSeminar";
import ContactUI from "@/components/sections/ContactUI";
import Link from "next/link";
import { Accordion } from "react-bootstrap";

// interface BrochureData {
//   url: string;
//   title: string;
// }
export default function RatingUI({
  slug,
  title,
  // image,
  // s_image,
}: {
  slug?: string;
  title?: string;
  image?: string;
  s_image?: string;
}) {
  // console.log(slug);

  // const [data,setData]=useState<SectionData[] >([])
  const [activeData, setActiveData] = useState<RatingData | null>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(slug || null);

  const [data, setData] = useState<RatingData[]>([]);

  useEffect(() => {
    console.log(slug);
    if (slug) {
      getRatingsDetailsData(activeSlug || "").then((response) => {
        const data: RatingData = response.data;
        console.log(data, "getRatingsDetailsData");
        // setData(data);
        setActiveData(data);
      });
    }
    if (data.length === 0) {
      getRatingsData().then((response) => {
        const data: RatingData[] = response.data;
        setData(data);
      });
    }
  }, [activeSlug]);

  // const [brochure,setBrochure]=useState<BrochureData[]>([])

  return (
    
    <div className="ir-wrapper">
      <style>{`.ir-wrapper,.services-overview,.services-overview .ir-container,.services-overview .row{overflow:visible!important}`}</style>
      {/* <!-- Home --> */}
      <div className="home-inner">
        <div className="banner-content">
          <div className="ir-container">
            <h1>{activeData?.Title || title}</h1>
          </div>
            {/* <!-- Breadcrumb --> */}
      <div className="ir-breadcrumb">
        <div className="ir-container">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link> 
              </li>
              <li className="breadcrumb-item">Ratings</li>
              <li className="breadcrumb-item active" aria-current="page">
                {activeData?.Title}
              </li>
            </ol>
          </nav>
        </div>
      </div>
        </div>
        {/* <picture>
          <source
            media="(max-width:640px)"
            srcSet={activeData?.MobileBanner?.url || s_image}
          />
          <img src={activeData?.Banner?.url || image} alt="" />
        </picture> */}
      </div>
    
      {/* <!-- Corporate Sector --> */}
      <div className="section-ptb services-overview">
        <div className="ir-container">
          <div className="row gx-xl-5">
            <div className="col-lg-auto col-content-left">
              <div className="content-left">
                <div className="ir-nav-left">
                  <div className="ir-heading">
                    <h2>Our Ratings</h2>
                  </div>
                  <ul>
                    {data?.map((item: RatingData, index: number) => (
                      <li
                        key={index}
                        className={item.slug === activeSlug ? "active" : ""}
                      >
                        
                        <div
                          className="sblink"
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveSlug(item.slug);
                            window.history.pushState(
                              {},
                              "",
                              `/ratings/${item.slug}`
                            );
                          }}
                        >
                          {item.Title}
                        </div>
                        
                      </li>
                    ))}
                  </ul>
                </div>
                {activeData?.Document && activeData?.Document.length > 0 && (
                  <div className="brochure-cta">
                    <ul>
                      {activeData?.Document.map(
                        (item: DocumentData, index: number) => (
                          <li key={index}>
                            <Link href={item?.DocumentFile?.url || "#"}>  
                              <span className="icon-pdf"><svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 12.3521C18 12.551 17.921 12.7417 17.7803 12.8824C17.6397 13.023 17.4489 13.1021 17.25 13.1021H15V14.6021H16.5C16.6989 14.6021 16.8897 14.6811 17.0303 14.8217C17.171 14.9624 17.25 15.1531 17.25 15.3521C17.25 15.551 17.171 15.7417 17.0303 15.8824C16.8897 16.023 16.6989 16.1021 16.5 16.1021H15V17.6021C15 17.801 14.921 17.9917 14.7803 18.1324C14.6397 18.273 14.4489 18.3521 14.25 18.3521C14.0511 18.3521 13.8603 18.273 13.7197 18.1324C13.579 17.9917 13.5 17.801 13.5 17.6021V12.3521C13.5 12.1531 13.579 11.9624 13.7197 11.8217C13.8603 11.6811 14.0511 11.6021 14.25 11.6021H17.25C17.4489 11.6021 17.6397 11.6811 17.7803 11.8217C17.921 11.9624 18 12.1531 18 12.3521ZM5.625 14.2271C5.625 14.9232 5.34844 15.5909 4.85616 16.0832C4.36387 16.5755 3.69619 16.8521 3 16.8521H2.25V17.6021C2.25 17.801 2.17098 17.9917 2.03033 18.1324C1.88968 18.273 1.69891 18.3521 1.5 18.3521C1.30109 18.3521 1.11032 18.273 0.96967 18.1324C0.829018 17.9917 0.75 17.801 0.75 17.6021V12.3521C0.75 12.1531 0.829018 11.9624 0.96967 11.8217C1.11032 11.6811 1.30109 11.6021 1.5 11.6021H3C3.69619 11.6021 4.36387 11.8786 4.85616 12.3709C5.34844 12.8632 5.625 13.5309 5.625 14.2271ZM4.125 14.2271C4.125 13.9287 4.00647 13.6425 3.7955 13.4316C3.58452 13.2206 3.29837 13.1021 3 13.1021H2.25V15.3521H3C3.29837 15.3521 3.58452 15.2335 3.7955 15.0225C4.00647 14.8116 4.125 14.5254 4.125 14.2271ZM12.375 14.9771C12.375 15.8722 12.0194 16.7306 11.3865 17.3635C10.7535 17.9965 9.89511 18.3521 9 18.3521H7.5C7.30109 18.3521 7.11032 18.273 6.96967 18.1324C6.82902 17.9917 6.75 17.801 6.75 17.6021V12.3521C6.75 12.1531 6.82902 11.9624 6.96967 11.8217C7.11032 11.6811 7.30109 11.6021 7.5 11.6021H9C9.89511 11.6021 10.7535 11.9576 11.3865 12.5906C12.0194 13.2235 12.375 14.0819 12.375 14.9771ZM10.875 14.9771C10.875 14.4798 10.6775 14.0029 10.3258 13.6512C9.97419 13.2996 9.49728 13.1021 9 13.1021H8.25V16.8521H9C9.49728 16.8521 9.97419 16.6545 10.3258 16.3029C10.6775 15.9512 10.875 15.4743 10.875 14.9771ZM0.75 8.60205V1.85205C0.75 1.45423 0.908035 1.0727 1.18934 0.791391C1.47064 0.510086 1.85218 0.352051 2.25 0.352051H11.25C11.3485 0.351974 11.4461 0.371308 11.5371 0.408949C11.6282 0.44659 11.7109 0.5018 11.7806 0.571426L17.0306 5.82143C17.1003 5.89113 17.1555 5.97387 17.1931 6.06491C17.2307 6.15596 17.2501 6.25353 17.25 6.35205V8.60205C17.25 8.80096 17.171 8.99173 17.0303 9.13238C16.8897 9.27303 16.6989 9.35205 16.5 9.35205C16.3011 9.35205 16.1103 9.27303 15.9697 9.13238C15.829 8.99173 15.75 8.80096 15.75 8.60205V7.10205H11.25C11.0511 7.10205 10.8603 7.02303 10.7197 6.88238C10.579 6.74173 10.5 6.55096 10.5 6.35205V1.85205H2.25V8.60205C2.25 8.80096 2.17098 8.99173 2.03033 9.13238C1.88968 9.27303 1.69891 9.35205 1.5 9.35205C1.30109 9.35205 1.11032 9.27303 0.96967 9.13238C0.829018 8.99173 0.75 8.80096 0.75 8.60205ZM12 5.60205H14.6897L12 2.91236V5.60205Z" fill="#231F20"/></svg></span>                            
                              {item?.DocumentTitle}
                              <span className="icon-download"><svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 11.5V17.5C18 17.6989 17.921 17.8897 17.7803 18.0303C17.6397 18.171 17.4489 18.25 17.25 18.25H0.75C0.551088 18.25 0.360322 18.171 0.21967 18.0303C0.0790178 17.8897 0 17.6989 0 17.5V11.5C0 11.3011 0.0790178 11.1103 0.21967 10.9697C0.360322 10.829 0.551088 10.75 0.75 10.75C0.948912 10.75 1.13968 10.829 1.28033 10.9697C1.42098 11.1103 1.5 11.3011 1.5 11.5V16.75H16.5V11.5C16.5 11.3011 16.579 11.1103 16.7197 10.9697C16.8603 10.829 17.0511 10.75 17.25 10.75C17.4489 10.75 17.6397 10.829 17.7803 10.9697C17.921 11.1103 18 11.3011 18 11.5ZM8.46937 12.0306C8.53903 12.1004 8.62175 12.1557 8.71279 12.1934C8.80384 12.2312 8.90144 12.2506 9 12.2506C9.09856 12.2506 9.19616 12.2312 9.28721 12.1934C9.37825 12.1557 9.46097 12.1004 9.53063 12.0306L13.2806 8.28063C13.3503 8.21094 13.4056 8.12822 13.4433 8.03717C13.481 7.94613 13.5004 7.84855 13.5004 7.75C13.5004 7.65145 13.481 7.55387 13.4433 7.46283C13.4056 7.37178 13.3503 7.28906 13.2806 7.21937C13.2109 7.14969 13.1282 7.09442 13.0372 7.0567C12.9461 7.01899 12.8485 6.99958 12.75 6.99958C12.6515 6.99958 12.5539 7.01899 12.4628 7.0567C12.3718 7.09442 12.2891 7.14969 12.2194 7.21937L9.75 9.68969V1C9.75 0.801088 9.67098 0.610322 9.53033 0.46967C9.38968 0.329018 9.19891 0.25 9 0.25C8.80109 0.25 8.61032 0.329018 8.46967 0.46967C8.32902 0.610322 8.25 0.801088 8.25 1V9.68969L5.78063 7.21937C5.63989 7.07864 5.44902 6.99958 5.25 6.99958C5.05098 6.99958 4.86011 7.07864 4.71937 7.21937C4.57864 7.36011 4.49958 7.55098 4.49958 7.75C4.49958 7.94902 4.57864 8.13989 4.71937 8.28063L8.46937 12.0306Z" fill="#231F20"/></svg></span>
                            </Link>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
                <div className="card-get-rated">
                  <div className="caption">
                    <h2>
                      Want to
                      <br />
                      get rated
                    </h2>
                    <Link href="/contact-us" className="btn-know-more">
                      CONNECT US <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.7501 1V10.75C13.7501 10.9489 13.671 11.1397 13.5304 11.2803C13.3897 11.421 13.199 11.5 13.0001 11.5C12.8011 11.5 12.6104 11.421 12.4697 11.2803C12.3291 11.1397 12.2501 10.9489 12.2501 10.75V2.81031L1.53068 13.5306C1.38995 13.6714 1.19907 13.7504 1.00005 13.7504C0.801028 13.7504 0.610156 13.6714 0.469426 13.5306C0.328695 13.3899 0.249634 13.199 0.249634 13C0.249634 12.801 0.328695 12.6101 0.469426 12.4694L11.1897 1.75H3.25005C3.05114 1.75 2.86037 1.67098 2.71972 1.53033C2.57907 1.38968 2.50005 1.19891 2.50005 1C2.50005 0.801088 2.57907 0.610322 2.71972 0.46967C2.86037 0.329018 3.05114 0.25 3.25005 0.25H13.0001C13.199 0.25 13.3897 0.329018 13.5304 0.46967C13.671 0.610322 13.7501 0.801088 13.7501 1Z" fill="#231F20"/>
                    </svg>
                    </Link>
                  </div>
                  <img src="/images/bg-get-rated.jpg" alt="" />
                </div>
              </div>
            </div>
            <div className="col-lg col-content-right master-circular services-content">
              <div className="content-right">
                <div className="pd-intro">
                  <div className="ir-heading">
                    <h2>{activeData?.Title}</h2>
                  </div>
                  {activeData?.MenuItem?.Description && (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: activeData?.MenuItem?.Description,
                      }}
                    />
                  )}
                </div>
                <div className="services-accordion">
                  <Accordion
                    id="accProductDetail"
                    className="accordion ir-accordion acc-secondary"
                    alwaysOpen
                  >
                    {activeData?.MenuItem?.Submenuitem.map(
                      (item: SubmenuitemData, index: number) => (
                        <Accordion.Item eventKey={index.toString()} key={index}>
                          {item.Link ? (
                            <Link
                              className="accordion-link"
                              href={`${item.Link}`}
                            >
                              {" "}
                              <span>{item.Title}</span>
                            </Link>
                          ) : item?.page?.slug ? (
                            <Link
                              className="accordion-link"
                              href={`${item.page.slug}`}
                            >
                              <span>{item.Title}</span>
                            </Link>
                          ) : item?.service?.slug ? (
                            <Link
                              className="accordion-link"
                              href={`${item.service.slug}`}
                            >
                              <span>{item.Title}</span>
                            </Link>
                          ) : null}
                        </Accordion.Item>
                      )
                    )}

                    {activeData?.MenuItem?.rating_lists.map(
                      (item: RatingListData, index: number) => (
                        <Accordion.Item
                          eventKey={(
                            activeData?.MenuItem?.Submenuitem.length + index
                          ).toString()}
                          key={index}
                        >
                          <Accordion.Header>{item.Title}</Accordion.Header>
                          <Accordion.Body>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.Description,
                              }}
                            />

                            {/* {JSON.stringify(item.ArchiveRatings)} */}

                            {item.ArchiveRatings &&
                              item.ArchiveRatings.length > 0 && (
                                <>
                                  {/* <h5>Archives</h5> */}

                                  {item.ArchiveRatings.map((item1) => (
                                    <div
                                      className="regulatory-footer-link"
                                      key={item1.id}
                                    >
                                      <div className="row gx-xl-5">
                                        <div className="col-lg-6">
                                          <Link
                                            href={`/ratings/${slug}/archive/${item.slug}/${item1.id}`}
                                            className="regulatory-link"
                                            target="_blank"
                                          >
                                            {item1.Title} {item1.ArchiveDate}
                                            <div className="btn-ir-cta">
                                              <i className="fa-solid fa-arrow-right"></i>
                                            </div>
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </>
                              )}
                          </Accordion.Body>
                        </Accordion.Item>
                      )
                    )}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <EventNSeminar bgColor="#F1F1F1" /> */}
      <ContactUI
        title={"Contact Us"}
        image="/images/bg_connect_with_us_011998b9d5.jpg"
      />
    </div>
  );
}
