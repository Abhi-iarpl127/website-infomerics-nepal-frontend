"use client";

import { getAboutPageData } from "@/services/APIServices";
import { AboutPageData, TeamData } from "@/types/common";
import { useState, useEffect, useCallback, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination,Autoplay } from "swiper/modules";
import { checkArrow } from "@/common/functions";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";

// List of valid anchor IDs for about-us page
const VALID_ANCHORS = ['overview', 'journey', 'ourLeadership', 'ourCapabilities'];

export default function AboutUI() {
  const [aboutData, setAboutData] = useState<AboutPageData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAboutPageData();
      console.log(data.data, "getAboutPageData");
      setAboutData(data?.data);
    };
    fetchData();

    // Image masking functionality
    const updateMask = (x: number, y: number) => {
      const image = document.querySelector(".masked-image") as HTMLImageElement;
      if (image) {
        image.style.clipPath = `circle(150px at ${x}px ${y}px)`;
      }
    };

    // Show mask in center on page load
    const handleLoad = () => {
      const image = document.querySelector(".masked-image") as HTMLImageElement;
      if (image) {
        const rect = image.getBoundingClientRect();
        updateMask(rect.width / 2, rect.height / 2);
      }
    };

    // Smooth real-time mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const image = document.querySelector(".masked-image") as HTMLImageElement;
      if (image) {
        const rect = image.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        updateMask(x, y);
      }
    };

    // Handle touch events
    const handleTouchMove = (e: TouchEvent) => {
      const image = document.querySelector(".masked-image") as HTMLImageElement;
      if (image) {
        const touch = e.touches[0];
        const rect = image.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        updateMask(x, y);
      }
    };

    window.addEventListener("load", handleLoad);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleTouchMove);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("load", handleLoad);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const [activeTab, setActiveTab] = useState<number>(0);
  const [teamModal, setTeamModal] = useState<TeamData | undefined>(undefined);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (teamModal) {
      // Prevent background scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Restore default scroll
      document.body.style.overflow = "";
    }
    // Clean up in case component is unmounted
    return () => {
      document.body.style.overflow = "";
    };
  }, [teamModal]);

  // Extract URL params (on first render) - similar to contact-us
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Any URL param extraction can go here if needed
    }
  }, []);

  // Generic helper function to scroll to any anchor with retry logic
  const scrollToAnchor = useCallback((anchorId: string, retries = 20, delay = 100) => {
    const elem = document.getElementById(anchorId);
    
    if (elem) {
      // Check if element is actually rendered and has dimensions
      const rect = elem.getBoundingClientRect();
      // More lenient check - just verify element exists and is in DOM
      if (rect.height >= 0 || rect.width >= 0 || elem.offsetHeight > 0) {
        // Element is rendered, scroll to it
        const yOffset = -100; // Offset for fixed header if needed
        const yPosition = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: Math.max(0, yPosition), behavior: "smooth" });
        return true;
      }
    }
    
    // Element not ready, retry if attempts remaining
    if (retries > 0) {
      setTimeout(() => scrollToAnchor(anchorId, retries - 1, delay), delay);
    }
    
    return false;
  }, []);

  // Track if we're handling a click to avoid double-triggering
  const isHandlingClick = useRef(false);
  const isInitialLoad = useRef(true);

  // Handle smooth scroll for all anchor links - wait for content to load
  useEffect(() => {
    if (typeof window === "undefined" || !aboutData) return;

    // Mark that initial load is complete after a delay
    const initialLoadTimeout = setTimeout(() => {
      isInitialLoad.current = false;
    }, 2000);

    const handleHashChange = (hash: string, skipScrollToTopCheck = false) => {
      if (VALID_ANCHORS.includes(hash)) {
        // If already on the page (not initial load) or from click, scroll immediately
        if (!isInitialLoad.current || skipScrollToTopCheck) {
          // Already on page, scroll directly with shorter delay
          setTimeout(() => {
            scrollToAnchor(hash, 20, 100);
          }, 100);
        } else {
          // Initial load - wait for scroll-to-top to complete
          const checkAndScroll = () => {
            const scrollY = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollY <= 10) {
              // At top, now wait for content (including Swiper) and scroll
              setTimeout(() => {
                scrollToAnchor(hash, 20, 100);
              }, 500);
            } else {
              // Still scrolling to top, wait a bit more
              setTimeout(checkAndScroll, 100);
            }
          };
          setTimeout(checkAndScroll, 500);
        }
      }
    };

    // Handle hashchange event (browser navigation, back/forward, or programmatic changes)
    const handleHashChangeEvent = () => {
      // Skip if we're already handling a click (to avoid double scroll)
      if (isHandlingClick.current) {
        isHandlingClick.current = false; // Reset flag
        return;
      }
      const hash = window.location.hash.replace('#', '');
      // If hashchange fires, we're likely already on the page (not initial load)
      // So skip scroll-to-top check
      handleHashChange(hash, true);
    };

    // Handle initial hash after content loads
    const initialHash = window.location.hash.replace('#', '');
    if (VALID_ANCHORS.includes(initialHash)) {
      // Wait for content to render, then scroll
      // Account for scroll-to-top if navigating from another page
      const checkAndScroll = () => {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollY <= 10) {
          // At top, now wait for content (including Swiper) and scroll
          setTimeout(() => {
            scrollToAnchor(initialHash, 20, 100);
          }, 500);
        } else {
          // Still scrolling to top, wait a bit more
          setTimeout(checkAndScroll, 100);
        }
      };
      setTimeout(checkAndScroll, 800);
    }

    // Handle hash changes
    window.addEventListener("hashchange", handleHashChangeEvent);

    // Handle anchor link clicks for all valid anchors
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for any valid anchor link
      for (const anchorId of VALID_ANCHORS) {
        const anchor = target.closest(`a[href="#${anchorId}"], a[href*="#${anchorId}"]`);
        
        if (anchor) {
          e.preventDefault();
          // Set flag to prevent hashchange event from also triggering scroll
          isHandlingClick.current = true;
          // Update URL hash - this will trigger hashchange event, but we'll skip it
          window.location.hash = `#${anchorId}`;
          // Handle scroll directly (already on page, no need to wait for scroll-to-top)
          handleHashChange(anchorId, true);
          break; // Found matching anchor, exit loop
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      clearTimeout(initialLoadTimeout);
      window.removeEventListener("hashchange", handleHashChangeEvent);
      document.removeEventListener("click", handleAnchorClick);
    };
  }, [aboutData, scrollToAnchor]); // Re-run when aboutData loads

  if (!aboutData) return <div></div>;

  return (
    <div className="ir-wrapper">
      <section className="home-inner">
        <div className="banner-content">
          <div className="ir-breadcrumb">
            <div className="ir-container">
              <h1 className="inner-heading mb-4">{aboutData.PageTitle}</h1>
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    <a href="#">{aboutData.PageTitle}</a>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <section className="overview-section" id="overview">
        <div className="container">
          <div className="row align-items-center">
            {/*<!-- Text Column -->*/}
            <div className="col-lg-6 col-md-12">
              <div className="ir-heading">
                <h2>{aboutData.blocks[0].Title}</h2>
              </div>
              <p
                dangerouslySetInnerHTML={{
                  __html: aboutData.blocks[0].Description,
                }}
              />
            </div>
            {/*<!-- Image Column -->*/}
            <div className="col-lg-6 col-md-12 text-center mt-4 mt-lg-0">
              <img
                src={aboutData.blocks[0]?.Image?.url}
                alt="Overview Image"
                className="overview-img"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="journey-section" id="journey">
        <div className="container">
          <h2 className="journey-title">{aboutData.blocks[1].Title}</h2>
          <div className="row">
            <div className="col-lg-3 d-none">
              <h2 className="journey-title">{aboutData.blocks[1].Title}</h2>
              <p
                className="journey-text"
                dangerouslySetInnerHTML={{
                  __html: aboutData.blocks[0].Description,
                }}
              />
            </div>
            <div className="col-lg-12">
              <div className="timeline-section row text-center">
                <Swiper
                  modules={[Navigation, Pagination]}
                  className="ir-controls bottom slJourney"
                  navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }}
                  spaceBetween={20}
                  centeredSlides={false}
                  speed={800}
                  loop={false}
                  resistanceRatio={0}
                  pagination={{
                    el: ".journey-pagination",
                    clickable: true,
                  }}
                  //onInit={(swiper) => checkArrow(swiper)}
                  //onResize={(swiper) => checkArrow(swiper)}
                  breakpoints={{
                    0: { slidesPerView: 1, spaceBetween: 20 },
                    576: { slidesPerView: 2, spaceBetween: 20 },
                    767: { slidesPerView: 3, spaceBetween: 20 },
                    991: { slidesPerView: 4, spaceBetween: 20 },
                    1199: { slidesPerView: 4, spaceBetween: 20 },
                    1299: { slidesPerView: 6, spaceBetween: 20 },
                  }}
                >
                  {aboutData.blocks[1].AnnualGraph.map((infoSlider) => (
                    <SwiperSlide key={infoSlider.id}>
                      <div className="timeline-card">
                        <div className="bar-container">
                          <div
                            className="bar bar-2019"
                            style={{
                               background:`linear-gradient(to bottom, #c8ecff 0% ${infoSlider.BarData[0].Percentage}%, #00b4db 0%, #0083b0)`,
                            }}
                          ></div>
                          {/* {infoSlider.BarData.map((infoSlider1) => (
                            <div
                              className="bar-label label-1"
                              key={infoSlider.id}
                            >
                              {infoSlider1.Title}{" "}
                              <small>{infoSlider1.Subtitle}</small>
                            </div>
                          ))} */}
                        </div>
                        <div className="year-box">
                          <h3>{infoSlider.Year}</h3>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: infoSlider.Description,
                            }}
                          />
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}

                  <div className="swiper-nav bottom">
                    <div className="swiper-pagination journey-pagination bottom"></div>
                  </div>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*<!-- Our Leadership -->*/}
      <div className="section-ptb meet-team"  id="ourLeadership">
        <div className="container">
          <div className="ir-heading">
            <h2>{aboutData.blocks[2].Title}</h2>
          </div>
          <div className="ir-tabs">
            <div className="ir-tabs-inner scrollable-tabs">
              <ul className="nav nav-pills justify-content-end" role="tablist">
                {aboutData.blocks[2].TabTitle.map((tab, tabIdx) => (
                  <li className="nav-item" role="presentation" key={`tab-${tab.id}-${tabIdx}`}>
                    <button
                      className={`nav-link${activeTab === tabIdx ? " active" : ""}`}
                      data-bs-toggle="pill"
                      data-bs-target="#boardOfDirectors"
                      type="button"
                      role="tab"
                      aria-selected={activeTab === tabIdx ? "true" : "false"}
                      onClick={() => setActiveTab(tabIdx)}
                    >
                      {tab.TabTitle}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="tab-content">
            <div
              className="tab-pane fade show active"
              id="boardOfDirectors"
              role="tabpanel"
            >
              <Swiper
                modules={[Navigation, Pagination,Autoplay]}
                className="ir-controls bottom slTeams"
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                spaceBetween={24}
                centeredSlides={false}
                speed={800}
                loop={false}
                resistanceRatio={0}
                pagination={{
                  el: ".articles-pagination",
                  clickable: true,
                }}
                  autoplay={{
                  delay: 3000, 
                  disableOnInteraction: false, 
                }}
                onInit={(swiper) => checkArrow(swiper)}
                onResize={(swiper) => checkArrow(swiper)}
                breakpoints={{
                  0: { slidesPerView: 1, spaceBetween: 20 },
                  576: { slidesPerView: 2, spaceBetween: 24 },
                  767: { slidesPerView: 2, spaceBetween: 24 },
                  991: { slidesPerView: 3, spaceBetween: 24 },
                  1199: { slidesPerView: 3, spaceBetween: 24 },
                  1299: { slidesPerView: 4, spaceBetween: 24 },
                }}
              >
                {aboutData.blocks[2].TabTitle[activeTab].Cards.map((card, cardIdx) => (
                  <SwiperSlide key={`card-${card.id}-${cardIdx}`}>
                    <div
                      className="team-card"
                      data-bs-toggle="modal"
                      data-bs-target="#viewProfile"
                      onClick={() => setTeamModal(card)}
                    >
                      <div className="caption">
                        <h4>{card.Title}</h4>
                        {card.Subtitle && <h5>{card.Subtitle}</h5>}
                        <div className="btn-ir-cta">
                          <i className="fa-solid fa-plus"></i>
                        </div>
                      </div>
                      <div className="team-thumb">
                        <img src={card.Image?.url} className="thumb" alt="" />
                        <img src={card.Image?.url} className="default" alt="" />
                      </div>
                    </div>
                  </SwiperSlide>
                  
                ))}
                <div className="swiper-nav bottom">
                  	<div className="swiper-button-prev"><i className="fa-solid fa-chevron-left"></i></div>
									<div className="swiper-button-next"><i className="fa-solid fa-chevron-right"></i></div>
                </div>
              </Swiper>
            </div>
          </div>
        </div>
      </div>

      {/*<!-- View Profile -->*/}
      {teamModal && (
        <>
          {/* Black overlay */}
          <div
            className="modal-backdrop"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1040,
              background: "rgba(0, 0, 0, 0.7)",
              display: "block",
            }}
            onClick={() => setTeamModal(undefined)}
          />
          <div
            style={{
              display: "block",
              position: "fixed",
              inset: 0,
              zIndex: 1050,
              overflowY: "auto",
            }}
            className="modal-view-profile modal"
            id="viewProfile"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            data-bs-databackdrop="static"
          >
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="row">
                    <div className="col-auto col-profile-img">
                      <div className="profile-img">
                        <img src={teamModal?.Image?.url} alt="" />
                      </div>
                    </div>
                    <div className="col">
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={() => setTeamModal(undefined)}
                      ></button>
                      <div className="profile-name">
                        <h3>{teamModal?.Title}</h3>
                        <p>{teamModal?.Subtitle}</p>
                      </div>
                      <div className="profile-info"
                        dangerouslySetInnerHTML={{
                          __html: teamModal?.Description || "",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <section className="our-Capabilities" id="ourCapabilities">
        <div className="container">
          <div className="ir-heading">
            <h2>{aboutData.blocks[3].Title}</h2>
          </div>
          <p
            className="shortInfo"
            dangerouslySetInnerHTML={{
              __html: aboutData.blocks[3].Description,
            }}
          />

          <div className="row">
            {aboutData.blocks[3].CardData.map((card) => (
              <div className="col-xl-3 col-md-6 card-container" key={card.id}>
                <div className="custom-card communication-card">
                  <div className="card-body">
                    <div className="card-icon">
                      <img src={card.Icon?.url} />
                    </div>
                    <p
                      className="card-text"
                      dangerouslySetInnerHTML={{ __html: card.Description }}
                    />
                    <h3 className="card-title">{card.Title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
