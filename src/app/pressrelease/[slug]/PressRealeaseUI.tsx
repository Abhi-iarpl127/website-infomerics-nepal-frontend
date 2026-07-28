"use client";
import DateComponent from "@/components/Date";
import { PastRationalesData, PressReleaseData, PressReleaseListData } from "@/types/common";
// import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getData } from "@/services/APIServices";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Navigation } from "swiper/modules";
// import { checkArrow } from "@/common/functions";
import ContactUI from "@/components/sections/ContactUI";
import Link from "next/link";

interface PastInstruments {
  id: number;
  InstrumentTitle: string;
  Title:string;
  Rating: string;
  InstrumentAmount: string;
  Date: string;
  isPast: boolean;
  PressRelease:{
    id:number;
    Title: string;
    Document:{
      id: number;
      DocumentFile:{
        id: number;
        url: string;
      }
    }
  };
  LenderDetail:{
    id: number;
    Title: string;
    Document:{
      id: number;
      DocumentFile:{
        id: number;
        url: string;
      }
    }
  }
}

export default function PressRealeaseUI({ slug }: { slug: string }) {
  const [pressRelease, setPressRelease] = useState<PressReleaseData | null>(
    null
  );
  const [pressReleaseList, setPressReleaseList] = useState<PressReleaseListData[]>(
    []
  );
  const [pastRationales, setPastRationales] = useState<PressReleaseData | null>(
    null
  );
  // const [selectedYear, setSelectedYear] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);


  const [industryReports, setIndustryReports] = useState<any[]>([]);

  const [services, setServices] = useState<any[]>([]);

  const [pastInstruments, setPastInstruments] = useState<PastInstruments[]>([]);


  const [years, setYears] = useState<string[]>([]);
  const [year, setYear] = useState<string>("");
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/companies/${slug}`
      );
      const data = await response.json();
      setPressRelease(data as PressReleaseData);
      console.log(data);

      if(data.pastInstruments){
        setPastInstruments(data.pastInstruments as PastInstruments[]);
      }
      const response1 = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/press-releases/${slug}`
      );
      const data1 = await response1.json();
      setPressReleaseList((data1?.data as PressReleaseListData[]) || []);
      setYears((data1?.meta?.years as string[]) || []);
      setYear((data1?.meta?.selectedYear as string) || "");
      // console.log(data1,"PressReleaseListData");
    };
    fetchData();
  }, [slug]);

  useEffect(() => {
    async function fetchData() {
      // const fslug = slug === "media-events" ? "media" : slug;

      const response = await getData(
        "industry-reports",
        1,
        6,
        "",
        "",
        ""
      );
      setIndustryReports(response.data as Report[]);
      // console.log(response, "industryReports");
    }
    fetchData();
  }, []);
  useEffect(() => {
    const fetchPressReleases = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/press-releases/${slug}?year=${year}`
      );
      const data = await response.json();
      setPressReleaseList((data?.data as PressReleaseListData[]) || []);
    };
    fetchPressReleases();
  }, [year, slug]);

  useEffect(() => {
    const fetchServices = async () => {
    const services = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/services`
    );
    const data = await services.json();
      setServices(data as any[]);
    }
    fetchServices();
  }, []);



  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/company-instruments/past-instruments/${slug}`
  //     );
  //     const data = await response.json();

  //     setPastRationales(data as PastRationalesData);
  //     console.log(data);
  //   };
  //   fetchData();
  // }, [slug]);

  return (
    <div className="ir-wrapper">
      <div className="inner-banner">
        <div className="container main-container-pr">
          <div className="col-md-6 mb-4 mb-md-0 left-panel">
            <h1>{pressRelease?.company.CompanyName}</h1>
            {/* {JSON.stringify(pressReleaseList[0])} companyInstrument.PressRelease[0].Document.DocumentFile.url */}
            <p><DateComponent date={pressRelease?.company?.Date || pressRelease?.companyInstrument[0]?.Date || ""} /></p>
            <div className="button-group">
              <div className="read-more-cta">
                <a href={pressRelease?.companyInstrument[0]?.PressRelease?.Document?.DocumentFile?.url || "#"} target="_blank">View Rating Rationale</a>
              </div>
              {/* {JSON.stringify(pressRelease?.companyInstrument[0]?.LenderDetail?.Document)} */}
              <div className="read-more-cta-white">
              {pressRelease?.companyInstrument[0]?.LenderDetail?.Document  && pressRelease?.companyInstrument[0]?.LenderDetail?.Document?.DocumentFile &&  ( <a href={pressRelease?.companyInstrument[0]?.LenderDetail?.Document?.DocumentFile?.url || "#"} target="_blank">Bank Lender Details</a> )}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card-rating">
              <div className="table-scroll">
                <table className="table table-borderless mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Instruments</th>
                      <th scope="col">Size</th>
                      <th scope="col">Current Ratings</th>
                      <th scope="col">Outlook</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pressRelease?.companyInstrument && pressRelease?.companyInstrument?.length > 0 && pressRelease?.companyInstrument?.map((instrument, idx) => (

                    <tr key={idx}>
                      <td>{instrument.Title}</td>
                      <td>{instrument.InstrumentAmount || "-"}</td>
                      <td>{instrument.Rating || "-"}</td>
                      <td>{instrument?.outlook?.Title || "N/A"}</td>
                    </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="section-ptb Rating-Rationale">
        <div className="ir-container">
          <div className="ir-heading">
            <h2>Past Ratings Rationale</h2>
          </div>
          {pastInstruments && pastInstruments.length > 0 ? (
            <div>
          {/* Parent Card */}
          <div className="parent-card" id="card-list">
            {/* Repeatable mockup cards - replace with mapped data in production */}
            <div className="ir-table-secondary table-responsive table-prp">
              <table className="table mb-0">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Instruments</th>
                    <th scope="col">Size</th>
                    <th scope="col">Ratings</th>
                    <th scope="col" colSpan={2 as const}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pastInstruments?.slice((currentPage - 1) * 6, currentPage * 6).map((instrument, idx) => (
                    <tr key={instrument.id} className={`${idx % 2 === 0 ? 'bg1_press' : 'bg2_press'}`}>
                      <td>
                        <DateComponent date={instrument.Date} />
                      </td>
                      <td>
                        <p className="title mb-0">{instrument.Title}</p>
                      </td>
                      <td>
                        <p className="title mb-0">{instrument.InstrumentAmount || "-"}</p>
                      </td>
                      <td>
                        <p className="title mb-0">{instrument.Rating || "-"}</p>
                      </td>
                      <td>
                        <div className="row flex-nowrap align-items-center gx-3">
                          <div className="col-auto">
                            <a  href={instrument.PressRelease?.Document?.DocumentFile?.url || "#"} target="_blank" className="btn-download-press-relese for-download-subscription btn btn-sm d-flex align-items-center justify-content-center"><img src="../images/download-icon.png" alt="Download" /></a>
                          </div>
                          {instrument.LenderDetail && instrument.LenderDetail.Document.DocumentFile?.url && (
                            <div className="col-auto">
                                <a href={instrument.LenderDetail?.Document?.DocumentFile?.url || "#"} target="_blank">
                                  <button className="btn-Lenders-press-relese btn btn-sm d-flex align-items-center gap-1">
                                    Bank Lenders
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M7 17l9-9M16 16V8h-8"></path>
                                    </svg>
                                  </button>
                                </a>
                            </div>
                            )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Pagination */}
          { Math.ceil(pastInstruments.length / 6)>1 && 
          <div className="pagination-custom">
            <button
              id="prev-btn"
              className="btn btn-page"
              disabled={currentPage === 1}
              onClick={() => {
                if (currentPage > 1) setCurrentPage(currentPage - 1);
              }}
            >
              <img src="../images/prev-icon.png" alt="Previous" className="pagination-icon" />
            </button>
            {(() => {
              // Prepare for pagination based on pastRationales?.companyInstrument
              const itemsPerPage = 6;
              // const instruments = pastRationales?.companyInstrument || [];
              const pageCount = Math.ceil(pastInstruments.length / itemsPerPage);

              return Array.from({ length: pageCount }, (_, i) => (
                <button
                  key={i + 1}
                  className={`btn btn-page${currentPage === i + 1 ? " active" : ""}`}
                  data-page={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ));
            })()}
            <button
              id="next-btn"
              className="btn btn-page"
              disabled={
                (() => {
                  const itemsPerPage = 4;
                  // const instruments = pastRationales?.companyInstrument || [];
                  const pageCount = Math.ceil(pastInstruments.length / itemsPerPage);
                  return currentPage === pageCount || pageCount === 0;
                })()
              }
              onClick={() => {
                const itemsPerPage = 4;
                // const instruments = pastRationales?.companyInstrument || [];
                const pageCount = Math.ceil(pastInstruments.length / itemsPerPage);
                if (currentPage < pageCount) setCurrentPage(currentPage + 1);
              }}
            >
              <img src="../images/next-icon.png" alt="Next" className="pagination-icon" />
            </button>
          </div>
            }
            </div>
          ) : (
            <div className="text-center">
              <p>No Past Ratings Rationale.</p>
            </div>
          )}
        </div>
      </div>

      <div className="section-ptb Press-Releases">
        <div className="ir-container">
          <div className="ir-heading d-flex flex-wrap align-items-center justify-content-between gap-3">
            <h2>Press Releases</h2>
            {years.length > 0 && (
              <select
                className="form-select w-auto"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                aria-label="Filter press releases by year"
              >
                <option value="">All years</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            )}
          </div>
          {pressReleaseList && pressReleaseList.length > 0 ? (
            <div className="ir-table-secondary table-responsive table-prp">
              <table className="table mb-0">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Title</th>
                    <th scope="col">Rationale</th>
                  </tr>
                </thead>
                <tbody>
                  {pressReleaseList.map((item, idx) => (
                    <tr key={item.id ?? idx} className={`${idx % 2 === 0 ? 'bg1_press' : 'bg2_press'}`}>
                      <td>
                        <DateComponent date={item.Date} />
                      </td>
                      <td>
                        <p className="title mb-0">{item.Title}</p>
                      </td>
                      <td>
                        {item.Document?.DocumentFile?.url || item.Link ? (
                          <a
                            href={item.Document?.DocumentFile?.url || item.Link}
                            target={item.Target || "_blank"}
                            className="btn-download-press-relese for-download-subscription btn btn-sm d-flex align-items-center justify-content-center"
                          >
                            <img src="../images/download-icon.png" alt="Download" />
                          </a>
                        ) : (
                          <span>-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center">
              <p>No Press Releases{year ? ` for ${year}` : ""}.</p>
            </div>
          )}
        </div>
      </div>

      {/* Subscription Modal, adapt to React: use state for show/hide */}
      {/* For demonstration, let's just render modal and hide with CSS for now */}
      <div id="subscriptionModal" className="modal-custom-subscription" style={{display: "none"}}>
        <div className="modal-content-custom">
          <span className="close-button-custom">&times;</span>
          <div className="form-container-custom">
            <h3 className="form-title">Subscribe to Receive Regular Updates</h3>
            <form id="subscriptionForm">
              {/* Full Name */}
              <div className="input-group-custom">
                <i className="fas fa-user input-icon"></i>
                <input type="text" id="fullName" placeholder="Full name" required />
              </div>
              {/* Email */}
              <div className="input-group-custom">
                <i className="fas fa-envelope input-icon"></i>
                <input type="email" id="emailId" placeholder="Email id" required />
              </div>
              {/* Phone Number */}
              <div className="input-group-custom">
                <i className="fas fa-phone input-icon"></i>
                <input type="tel" id="phoneNumber" placeholder="Phone Number" />
              </div>
              {/* Company Name */}
              <div className="input-group-custom">
                <i className="fas fa-building input-icon"></i>
                <input type="text" id="companyName" placeholder="Company Name" />
              </div>
              <div className="form-actions-custom">
                <button type="button" id="cancelSubscription" className="btn-cancel-custom">Cancel</button>
                <button type="submit" className="btn-submit-custom">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <div className="section-ptb Industry-Reports pattern-bottom">
        <div className="ir-container">
          <div className="ir-heading">
            <h2>Industry Reports</h2>
          </div>
          <div className="parent-card-Industry-Reports">
            <div className="cards-scroll-wrapper">
              {industryReports?.map((report: any, idx: number) => (  
                <div key={idx} className="card-custom-Industry-Reports">
                  <div className="card-info-Industry-Reports d-flex align-items-center flex-grow-1 me-3">
                    <span><DateComponent date={report.Date} /></span>
                    <p className="title mb-0">{report.Title}</p>
                  </div>
                  <div className="card-actions-Industry-Reports d-flex gap-2">
                    <a href={report.Documents[0]?.DocumentFile?.url || "#"} target="_blank" className="btn-download-press-relese btn btn-sm d-flex align-items-center justify-content-center">
                      <img src="../images/download-icon.png" alt="Download" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="read-more-cta-2">
          <Link href="/insights/industry-reports">View All Industry Reports</Link>
        </div>
        </div>
      </div>
     
      <div className="section-ptb home-our-services bg-grey pattern-bottom">
        <div className="ir-container container">
          <div className="ir-heading">
            <h2>Our Offerings</h2>
          </div>
          <div className="row g-4 justify-content-center">
            {/* {JSON.stringify(services)} */}
            {services.map((item: any, idx: number) => (
              <div key={idx} className="col-lg-4 col-md-6">
                <a href={`/services/${item.slug}`} className="os-list brInfRating">
                  <div className="caption">
                    <h3>{item.Title}</h3>
                  </div>
                  <div className="circular-button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17l9-9M16 16V8h-8"></path>
                    </svg>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ContactUI
        title={"Contact Us"}
        image="/images/bg_connect_with_us_011998b9d5.jpg"
      />
      {/* <ContactUsUI /> */}
    </div>
  );
}
