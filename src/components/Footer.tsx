"use client";

import {
  FooterColumnData,
  FooterLeftData,
  FooterRowData,
  GlobalData,
  GlobalMenuItem,
  ImageData,
  SocialMediaData,
} from "@/types/common";
import React, { useState } from "react";
// import Image from "next/image";
// import Script from "next/script";
// import Link from "next/link";
import { SubscriptionsData } from "@/services/APIServices";
import Link from "next/link";
// import Accordion from 'react-bootstrap/Accordion';
// import Link from "next/link";
const MainFooter = ({ data, logo }: { data: GlobalData; logo: ImageData }) => {
  console.log(data, logo);
  // Client-side code for handling UI interactions
  React.useEffect(() => {
    // Only run on client-side
    if (typeof window !== "undefined") {
      // Get window dimensions
      const getWindowDimensions = () => {
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        return { winWidth, winHeight };
      };

      const { winWidth } = getWindowDimensions();

      // Set --vh custom property based on the viewport height
      const setVhProperty = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      };

      // Disable smooth scroll behavior
      if (document.documentElement) {
        document.documentElement.style.scrollBehavior = "auto";
      }

      // Initial setup
      setVhProperty();

      // Handle scroll to top button
      const handleScrollToTop = () => {
        if (winWidth >= 991) {
          const scrollToTopBtn = document.querySelector(".scrollToTop");
          if (scrollToTopBtn) {
            if (window.scrollY > 100) {
              (scrollToTopBtn as HTMLElement).style.display = "inline-flex";
            } else {
              (scrollToTopBtn as HTMLElement).style.display = "none";
            }
          }
        }
      };

      // Add event listeners
      window.addEventListener("resize", setVhProperty);
      window.addEventListener("scroll", handleScrollToTop);

      // Setup scroll to top button click handler
      const scrollToTopBtn = document.querySelector(".scrollToTop");
      if (scrollToTopBtn) {
        if (winWidth >= 991) {
          scrollToTopBtn.addEventListener("click", (event) => {
            event.preventDefault();
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          });
        } else {
          (scrollToTopBtn as HTMLElement).style.display = "none";
        }
      }

      // Toggle header class on scroll
      const handleHeaderScroll = () => {
        const header = document.querySelector("header");
        if (header) {
          if (window.scrollY > 50) {
            header.classList.add("nav-up");
          } else {
            header.classList.remove("nav-up");
          }
        }
      };

      window.addEventListener("scroll", handleHeaderScroll);

      // Cleanup event listeners on component unmount
      return () => {
        window.removeEventListener("resize", setVhProperty);
        window.removeEventListener("scroll", handleScrollToTop);
        window.removeEventListener("scroll", handleHeaderScroll);
        if (scrollToTopBtn) {
          scrollToTopBtn.removeEventListener("click", () => {});
        }
      };
    }
  }, []);
  const [subscribe, setSubscribe] = useState("");
  const [message, setMessage] = useState("");
  const handleSubscribe = async () => {
    if (subscribe.length > 0 && !subscribe.includes("@")) {
      setMessage("*Enter Valid Email ID");
      return;
    }
    const response = await SubscriptionsData(subscribe);
    if (response.status === 200) {
      setSubscribe("");
      setMessage("Email Subscribed Successfully");
    } else {
      setMessage("Email Already Subscribed");
    }
    console.log(response);
  };
  const [dropdownStates,setDropdownStates] = useState<{ [key: number]: boolean }>({});
  const handleDropdownToggle = (itemId: number) => {
    console.log("handleDropdownToggle", itemId);
    setDropdownStates(prev => {
      const newStates: { [key: number]: boolean } = {};
      Object.keys(prev).forEach(key => {
        newStates[Number(key)] = false;
      });
      newStates[itemId] = !prev[itemId];
      return newStates;
    });
  };

  
  return (
    <footer className="ir-footer">
      <div className="ir-container">
        {/* <!-- Top Row: Logo + Helpdesk --> */}
        <div className="row align-items-center first-row mb-4">
          <div className="col-6">
            <div className="logo-footer">
              <img
                src={data?.footer?.FooterTop?.Logo?.url}
                alt={data?.footer?.FooterTop?.Logo?.alternativeText || ""}
              />
            </div>
          </div>
          <div className="col-6 text-end d-none d-md-block">
            <a
              href={`tel:${data?.footer?.FooterTop?.HelpdeskText}`}
              className="btn-helpdesk"
            >
              Helpdesk: {data?.footer?.FooterTop?.HelpdeskText}
            </a>
          </div>
        </div>

        {/* <!-- Footer Columns 1st Row --> */}

        {/* <!-- Footer Columns 2nd Row --> */}
        {data?.footer?.FooterRow?.map((item: FooterRowData, index: number) => (
          <div
            key={`footer-row-${index}`}
            className="row g-4 mb-4 ir-footer-accordion second-row-columns"
          >
            {item?.FooterColumn?.map(
              (item1: FooterColumnData, index1: number) => (
                <div
                  key={`footer-column-${index1}`}
                  className="col-6 col-md-2 footer-column"
                >
                  <h6 
                    className={`accordion-toggle ${dropdownStates[item1.id] ? "active" : ""}`} 
                    onClick={() => handleDropdownToggle(item1.id)}
                    data-item-id={item1.id}
                  >
                    {item1?.MenuItem[0]?.Title}
                  </h6>
                  <ul
                    className="footer-links"
                    style={{
                      ...(dropdownStates[item1.id]
                        ? { maxHeight: '180px', overflow: 'auto' }
                        : { overflow: 'hidden' }),
                      transition: 'max-height 0.3s ease-in-out'
                    }}
                  >
                    {item1?.MenuItem[0]?.SubMenuItem?.map(
                      (item2: GlobalMenuItem, index2: number) => (
                        <li key={`footer-menu-item-${index2}`}>
                          <a
                            href={
                              item2?.Link
                                ? item2.Link
                                : item2.page?.slug
                                ? `/${item2.page.slug}`
                                : item2.service?.slug
                                ? `/${item2.service.slug}`
                                : item2.rating?.slug
                                ? `/${item2.rating.slug}`
                                : "#"
                            }
                          >
                            {item2?.Title}
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )
            )}

            {/* <!-- Placeholder column for vertical alignment --> */}
          
            {index == 0 && (
              <div className="col-12 col-md-4 footer-column">
                <h6>{data?.footer?.Address?.Title}</h6>
                <p dangerouslySetInnerHTML={{ __html: data?.footer?.Address?.AddressText }}>
                  
                </p>
                <div className="subscribe">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                    value={subscribe}
                    onChange={(e) => setSubscribe(e.target.value)}
                  />
                  <button className="btn-subscribe" onClick={handleSubscribe} disabled={subscribe.length === 0 || !subscribe.includes("@")}>
                    <i className="fa-solid fa-paper-plane"></i>
                  </button>
                </div>
                <small
                  className={`${message.includes("Successfully") ? "ir-success" : "ir-error"}`}
                  style={{display: message.length > 0 ? "block" : "none"}}
                >
                  {message}
                </small>
              </div>
            )}
            {index > 1 && <div className="col-12 col-md-4 placeholder"></div>}
          </div>
        ))}

        {/* <!-- Bottom Row --> */}
        <div className="footer-bottom pt-3">
          <div className="d-flex justify-content-between flex-wrap align-items-center">
            <div className="footer-policy-links">
              {data?.footer?.FooterBottom?.FooterLeft?.map(
                (item: FooterLeftData, index: number) => (
                  <Link
                    key={`footer-policy-link-${index}`}
                    id={`footer-policy-link-${index}`}
                    href={
                      item?.Link ||
                      (item?.page?.slug
                        ? "/" + item.page.slug
                        : item?.service?.slug
                        ? "/" + item.service.slug
                        : item?.rating?.slug
                        ? "/" + item.rating.slug
                        : "#")
                    }
                    target={item?.Target === "Self" ? "_self" : "_blank"}
                  >
                    {item?.Title}
                  </Link>
                )
              )}
            </div>
            <div className="footer-social">
              {data?.footer?.FooterBottom?.FooterSocial?.map(
                (item: SocialMediaData, index: number) => (
                  <Link
                    key={`footer-social-link-${index}`}
                    id={`footer-social-link-${index}`}
                    href={
                      item?.Link ||"#"
                    }
                    target={item?.Target === "Self" ? "_self" : "_blank"}
                  >
                    <i className={`fa-brands ${item?.fontawesomeclass}`}></i>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

  // return (
  //   <>
  //     {/* <!-- Infomerics Group Footer --> */}
  //     <div className="ir-footer">
  //       <div className="ir-container">
  //         <div className="row gx-0">
  //           <div className="col-lg-auto">
  //             <div className="footer-left">
  //               <div className="logo-footer">
  //                 {/* <img src={logo.url} alt={logo.alternativeText || ""} /> */}
  //                 <Image
  //                   src={logo.url}
  //                   alt={logo.alternativeText || ""}
  //                   width={196}
  //                   height={76}
  //                 />
  //               </div>
  //               <div className="address-row" dangerouslySetInnerHTML={{ __html: data.FooterLeft.ContactDetails }}>

  //               </div>
  //               <div className="address-row" dangerouslySetInnerHTML={{ __html: data.FooterLeft.Address }}>

  //               </div>
  //               <div className="subscribe">
  //                 <input type="email" className="form-control" id="emailSubscribe" value={subscribe} placeholder="Email Address" onChange={(e)=>setSubscribe(e.target.value)} />
  //                 <button className="btn-subscribe" onClick={handleSubscribe}><i className="fa-regular fa-paper-plane"></i></button>
  //                 <small
  //                   className={`${message.includes("Successfully") ? "ir-success" : "ir-error"}`}
  //                   style={{display: message.length > 0 ? "block" : "none"}}
  //                 >
  //                   {message}
  //                 </small>
  //               </div>
  //               <div className="footer-social">

  //                 {data.FooterLeft.footersocial.map((item, index) => (
  //                   <Link key={index} href={item?.Link || "#"} target={item?.Target === "Self" ? "_self" : "_blank"}><i className={`${item?.fontawesomeclass} fa-brands`}></i></Link>
  //                 ))}
  //               </div>
  //             </div>
  //           </div>
  //           <div className="col-lg">
  //             <div className="footer-right">
  //               <div className="row gx-lg-5 justify-content-lg-between">
  //                 {data.FooterRight.FooterRow1.FooterColumn.map((item, index) => (
  //                   <div className="col-xl-auto" key={index}>
  //                     <div className="ft-col">

  //                         <div className="accordion footer-accordion">
  //                         {item.AccordionMenu.map((data,index1)=>(
  //                           <div key={index1}>

  //                             {/* {JSON.stringify(data)} */}

  //                           {data.SubMenuItem.length > 0 && data.SubMenuItem[0].Title  !== data.MenuItem ? (
  //                           <div className="accordion-item" key={index1} >
  //                             <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#accFooter_${index1}_${index}`} aria-expanded="false">{data.MenuItem}</button>
  //                             <ul id={`accFooter_${index1}_${index}`} className="accordion-collapse collapse">

  //                               {data.SubMenuItem.map((item,index)=>(
  //                               <li key={index}><Link key={index} href={item?.Link || "#"} target={item?.Target === "Self" ? "_self" : "_blank"}>{item?.Title ||  (item.page.slug?"/"+item.page.slug:"#") || ""}</Link></li>
  //                               ))}
  //                             </ul>
  //                           </div>
  //                           ):(
  //                             <ul className="footer-links">

  //                               {data.SubMenuItem.map((item,index)=>(
  //                               <li key={index}><Link key={index} href={item?.Link  ||  (item.page.slug?"/"+item.page.slug:"#")|| "#"} target={item?.Target === "Self" ? "_self" : "_blank"}>{item?.Title || ""}</Link></li>
  //                               ))}
  //                             </ul>
  //                           )}
  //                           </div>
  //                         ))}
  //                       </div>

  //                     </div>
  //                   </div>

  //                 ))}

  //               </div>
  //               <div className="our-locations">
  //                 <h6>{data.FooterRight.FooterRow2.Title}</h6>
  //                 <div className="footer-locations">
  //                   <div className="row gx-lg-5 justify-content-lg-between">
  //                     {/* {JSON.stringify(data.FooterRight.FooterRow2.FooterRow2Columns)} */}
  //                     {data.FooterRight.FooterRow2.FooterRow2Columns.map((item, index) => (
  //                       <div className="col-xl-auto col-links" key={index}>
  //                         <ul className="footer-links">
  //                           {item.MenuItemFooterColumn.map((item, index) => (
  //                             <li key={index}><Link key={index} href={`/${item.page?item.page?.slug+"?active="+item?.location?.id:"#"}`} target={item?.Target === "Self" ? "_self" : "_blank"}>{item?.Title ||  (item.page.slug?"/"+item.page.slug:"#") || ""}</Link></li>
  //                           ))}
  //                         </ul>
  //                       </div>
  //                     ))}
  //                   </div>
  //                 </div>
  //               </div>
  //               <div className="footer-copy">
  //                 <div className="row">
  //                   <div className="col-lg">
  //                     <p>{data.FooterRight.FooterRow3.Copyright}</p>
  //                   </div>
  //                   <div className="col-lg-auto" dangerouslySetInnerHTML={{ __html: data.FooterRight.FooterRow3.DevelopmentDetails }}>

  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //     {/* <!-- Scroll to Top --> */}
  //     <div className="scrollToTop">
  //       <svg width="14" height="16" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  //         <path d="M15.2806 8.03073C15.2109 8.10046 15.1282 8.15578 15.0371 8.19352C14.9461 8.23127 14.8485 8.25069 14.7499 8.25069C14.6514 8.25069 14.5538 8.23127 14.4627 8.19352C14.3717 8.15578 14.289 8.10046 14.2193 8.03073L8.74993 2.56041V17.2501C8.74993 17.449 8.67091 17.6398 8.53026 17.7804C8.38961 17.9211 8.19884 18.0001 7.99993 18.0001C7.80102 18.0001 7.61025 17.9211 7.4696 17.7804C7.32895 17.6398 7.24993 17.449 7.24993 17.2501V2.56041L1.78055 8.03073C1.63982 8.17146 1.44895 8.25052 1.24993 8.25052C1.05091 8.25052 0.860034 8.17146 0.719304 8.03073C0.578573 7.89 0.499512 7.69912 0.499512 7.5001C0.499512 7.30108 0.578573 7.11021 0.719304 6.96948L7.4693 0.219477C7.53896 0.149744 7.62168 0.0944251 7.71272 0.0566819C7.80377 0.0189387 7.90137 -0.000488281 7.99993 -0.000488281C8.09849 -0.000488281 8.19609 0.0189387 8.28713 0.0566819C8.37818 0.0944251 8.4609 0.149744 8.53055 0.219477L15.2806 6.96948C15.3503 7.03913 15.4056 7.12185 15.4433 7.2129C15.4811 7.30395 15.5005 7.40154 15.5005 7.5001C15.5005 7.59866 15.4811 7.69626 15.4433 7.78731C15.4056 7.87836 15.3503 7.96107 15.2806 8.03073Z" fill="white"/>
  //       </svg>
  //     </div>
  //     {/* <!-- Orientation Lock Landscape --> */}
  //     <div className="orientation">
  //       <div className="portrait-only">
  //         <Image
  //           src="/images/rotate.png"
  //           alt="rotate"
  //           width={150}
  //           height={150}
  //         />

  //         <p className="bold">View in portrait mode</p>
  //       </div>
  //     </div>
  //     <Script src="/js/lib.min.js"></Script>
  //     {/* <Script src="/js/sticknav.js"></Script> */}
  //   </>
  // );
};

export default MainFooter;
