"use client";
import { getContactPageData } from "@/services/APIServices";
import { ContactPageData } from "@/types/common";
import { useEffect, useState, useRef, useCallback } from "react";
import ContactUI from "@/components/sections/ContactUI";
import Link from "next/link";

// Google Maps type declarations
declare global {
  interface Window {
    google: typeof google;
  }
  namespace google {
    namespace maps {
      class Map {
        constructor(mapDiv: HTMLElement, opts?: MapOptions);
        setCenter(latLng: LatLngLiteral): void;
      }
      class Marker {
        constructor(opts?: MarkerOptions);
        setMap(map: Map | null): void;
        addListener(eventName: string, handler: (event?: unknown) => void): void;
      }
      class InfoWindow {
        constructor(opts?: InfoWindowOptions);
        open(opts?: InfoWindowOpenOptions): void;
        close(): void;
        content?: string | HTMLElement;
      }
      namespace event {
        function trigger(instance: Map | Marker | InfoWindow, eventName: string, ...args: unknown[]): void;
      }
      interface MapOptions {
        center?: LatLngLiteral;
        zoom?: number;
        mapTypeId?: MapTypeId;
      }
      interface MarkerOptions {
        position?: LatLngLiteral;
        map?: Map;
        title?: string;
      }
      interface InfoWindowOptions {
        content?: string | HTMLElement;
      }
      interface InfoWindowOpenOptions {
        anchor?: Marker;
        map?: Map;
        shouldFocus?: boolean;
      }
      interface LatLngLiteral {
        lat: number;
        lng: number;
      }
      enum MapTypeId {
        ROADMAP = 'roadmap',
        SATELLITE = 'satellite',
        HYBRID = 'hybrid',
        TERRAIN = 'terrain'
      }
    }
  }
}

export default function ContactUsUI() {
  const [contactData, setContactData] = useState<ContactPageData | null>(null);
  const [activeLocation, setActiveLocation] = useState<number>(0);

  // Store map/markers refs for Google Maps
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const infoWindowsRef = useRef<google.maps.InfoWindow[]>([]);

  // function to render Google Maps
  const renderGoogleMap = () => {
    if (
      typeof window !== "undefined" &&
      window.google &&
      contactData &&
      mapRef.current &&
      contactData.blocks &&
      contactData.blocks[0] &&
      contactData.blocks[0].locations &&
      contactData.blocks[0].locations.length > 0
    ) {
      // Check if map container is visible and has dimensions
      const rect = mapRef.current.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        // Container not ready, retry after a short delay
        setTimeout(() => renderGoogleMap(), 100);
        return;
      }

      // Clear previous map if exists
      mapRef.current.innerHTML = "";
      // Get active location and all pins
      const locations = contactData.blocks[0].locations;
      const activeLocationObj =
        locations.find((loc) => loc.id === activeLocation) || locations[0];

      // Use Google Maps to set up
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: {
          lat: Number(activeLocationObj.LocationData.Latitude),
          lng: Number(activeLocationObj.LocationData.Longitude),
        },
        zoom: 13,
      });

      // Trigger resize to ensure map renders correctly (especially after scroll/visibility changes)
      setTimeout(() => {
        if (mapInstance.current) {
          window.google.maps.event.trigger(mapInstance.current, 'resize');
        }
      }, 100);

      // Remove previous markers and info windows
      markersRef.current.forEach((m) => m.setMap(null));
      infoWindowsRef.current.forEach((iw) => iw.close());
      markersRef.current = [];
      infoWindowsRef.current = [];

      // Add all location markers, one for each
      locations.forEach((block) => {
        const lat = Number(block.LocationData.Latitude);
        const lng = Number(block.LocationData.Longitude);

        const marker = new window.google.maps.Marker({
          position: { lat, lng },
          map: mapInstance.current!,
          title: block.LocationData.Title,
        });

        // InfoWindow Content
        const infoWindowContent = `
          <div style="
            min-width: 250px;
            max-width: 310px;
            max-height: 200px;
            font-family: 'Arial', sans-serif;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.10);
            overflow: hidden;
            padding: 0;
          ">
            <!-- Header -->
            <div style="
              background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
              color: white;
              padding: 10px 16px;
              margin: 0;
            ">
              <h4 style="
                margin: 0;
                font-size: 15px;
                font-weight: 600;
                line-height: 1.3;
                color: white;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              ">${block.LocationData.Title}</h4>
            </div>
            
            <!-- Content -->
            <div style="padding: 10px;">
              <!-- Address -->
              <div style="
                margin-bottom: 8px;
                padding: 6px;
                background: #f8fafc;
                border-radius: 4px;
                border-left: 3px solid #3b82f6;
              ">
                <div style="
                  display: flex;
                  align-items: flex-start;
                  gap: 6px;
                ">
                  <i class="fa-solid fa-map-marker-alt" style="
                    color: #3b82f6;
                    font-size: 13px;
                    margin-top: 2px;
                    flex-shrink: 0;
                  "></i>
                  <p style="
                    margin: 0;
                    font-size: 11px;
                    line-height: 1.3;
                    color: #374151;
                    max-height: 32px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  ">${block.LocationData.Address}</p>
                </div>
              </div>
              
              <!-- Contact Info -->
              <div style="display: flex; flex-direction: column; gap: 6px;">
                <!-- Email -->
                ${block.LocationData.Emails && block.LocationData.Emails.length > 0 ? `
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <i class="fa-regular fa-envelope" style="
                      color: #3b82f6;
                      font-size: 12px;
                      width: 12px;
                      text-align: center;
                    "></i>
                    <div style="display: flex; flex-wrap: wrap; gap: 3px;">
                      ${block.LocationData.Emails.map(
                        (email: { Email: string }) => `
                          <a href="mailto:${email.Email}" style="
                            color: #3b82f6;
                            text-decoration: none;
                            font-size: 11.5px;
                            padding: 1.5px 5px;
                            background: #eff6ff;
                            border-radius: 3px;
                            transition: all 0.2s ease;
                            max-width: 115px;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: inline-block;
                          " onmouseover="this.style.background='#dbeafe'; this.style.color='#1d4ed8';" 
                             onmouseout="this.style.background='#eff6ff'; this.style.color='#3b82f6';" title="${email.Email}">
                            ${email.Email}
                          </a>
                        `
                      ).join("")}
                    </div>
                  </div>
                ` : ''}
                
                <!-- Phone -->
                ${block.LocationData.PhoneNumbers && block.LocationData.PhoneNumbers.length > 0 ? `
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <i class="fa-solid fa-phone" style="
                      color: #3b82f6;
                      font-size: 12px;
                      width: 12px;
                      text-align: center;
                    "></i>
                    <div style="display: flex; flex-wrap: wrap; gap: 3px;">
                      ${block.LocationData.PhoneNumbers.map(
                        (phone: { PhoneNumber: string }) => `
                          <a href="tel:${phone.PhoneNumber}" style="
                            color: #3b82f6;
                            text-decoration: none;
                            font-size: 11.5px;
                            padding: 1.5px 5px;
                            background: #eff6ff;
                            border-radius: 3px;
                            transition: all 0.2s ease;
                            max-width: 95px;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: inline-block;
                          " onmouseover="this.style.background='#dbeafe'; this.style.color='#1d4ed8';" 
                             onmouseout="this.style.background='#eff6ff'; this.style.color='#3b82f6';" title="${phone.PhoneNumber}">
                            ${phone.PhoneNumber}
                          </a>
                        `
                      ).join("")}
                    </div>
                  </div>
                ` : ''}
                
                <!-- WhatsApp -->
                ${block.LocationData.WhatsAppLink ? `
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <i class="fa-brands fa-whatsapp" style="
                      color: #25d366;
                      font-size: 12px;
                      width: 12px;
                      text-align: center;
                    "></i>
                    <a href="${block.LocationData.WhatsAppLink}" 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       style="
                         color: #25d366;
                         text-decoration: none;
                         font-size: 11.5px;
                         padding: 1.5px 5px;
                         background: #dcfce7;
                         border-radius: 3px;
                         transition: all 0.2s ease;
                         max-width: 120px;
                         white-space: nowrap;
                         overflow: hidden;
                         text-overflow: ellipsis;
                         display: inline-block;
                       " 
                       onmouseover="this.style.background='#bbf7d0'; this.style.color='#16a34a';" 
                       onmouseout="this.style.background='#dcfce7'; this.style.color='#25d366';" title="Chat on WhatsApp">
                      Chat on WhatsApp
                    </a>
                  </div>
                ` : ''}
              </div>
            </div>
          </div>
        `;

        const infoWindow = new window.google.maps.InfoWindow({
          content: infoWindowContent,
        });
        // If this is the active one, open bubble by default
        if (block.id === activeLocation) {
          infoWindow.open({
            anchor: marker,
            map: mapInstance.current!,
            shouldFocus: false,
          });
        }

        marker.addListener("click", () => {
          // Close others
          infoWindowsRef.current.forEach((iw) => iw.close());
          infoWindow.open({
            anchor: marker,
            map: mapInstance.current!,
            shouldFocus: false,
          });
          setActiveLocation(block.id);
        });

        markersRef.current.push(marker);
        infoWindowsRef.current.push(infoWindow);
      });

      // Pan to active marker if changed
      const activeBlock = locations.find(l => l.id === activeLocation);
      if (activeBlock) {
        mapInstance.current.setCenter({
          lat: Number(activeBlock.LocationData.Latitude),
          lng: Number(activeBlock.LocationData.Longitude),
        });
      }
    }
  };

  // Initial Data + activeLocation state handling
  useEffect(() => {
    const fetchData = async () => {
      const data = await getContactPageData();
      setContactData(data?.data);

      if (
        activeLocation === 0 &&
        data?.data?.blocks &&
        data?.data?.blocks[0]?.locations &&
        data?.data?.blocks[0].locations.length
      ) {
        setActiveLocation(data?.data?.blocks[0].locations[0].id);
      }
    };
    fetchData();
    // Only run once on mount for data load
    // eslint-disable-next-line
  }, []);

  // Extract location from URL param (on first render)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const activeParam = urlParams.get("active");
      if (activeParam) {
        setActiveLocation(Number(activeParam));
      }
    }
  }, []);

  // Helper function to scroll to #reach-out with retry logic
  const scrollToReachOut = useCallback((retries = 10, delay = 200, onComplete?: () => void) => {
    const elem = document.getElementById("reach-out");
    
    if (elem) {
      // Check if element is actually rendered and has dimensions
      const rect = elem.getBoundingClientRect();
      if (rect.height > 0 || rect.width > 0) {
        // Element is rendered, scroll to it
        const yOffset = -100; // Offset for fixed header if needed
        const yPosition = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: Math.max(0, yPosition), behavior: "smooth" });
        
        // After scroll completes, trigger map resize
        setTimeout(() => {
          if (mapInstance.current && window.google && window.google.maps) {
            window.google.maps.event.trigger(mapInstance.current, 'resize');
          }
          if (onComplete) onComplete();
        }, 500);
        
        return true;
      }
    }
    
    // Element not ready, retry if attempts remaining
    if (retries > 0) {
      setTimeout(() => scrollToReachOut(retries - 1, delay, onComplete), delay);
    }
    
    return false;
  }, []);

  // Handle smooth scroll for #reach-out anchor links - wait for content to load
  useEffect(() => {
    if (typeof window === "undefined" || !contactData) return;

    const handleHashChange = () => {
      if (window.location.hash === "#reach-out") {
        // Wait for scroll-to-top to complete (if navigating from another page)
        // Then wait for content to render, then scroll to anchor
        const checkAndScroll = () => {
          // Check if we're at the top (scroll-to-top completed) or already scrolled
          const scrollY = window.pageYOffset || document.documentElement.scrollTop;
          if (scrollY <= 10) {
            // At top, now wait for content and scroll
            setTimeout(() => {
              scrollToReachOut(15, 100); // Retry up to 15 times with 100ms delay
            }, 200);
          } else {
            // Still scrolling to top, wait a bit more
            setTimeout(checkAndScroll, 100);
          }
        };
        
        // Start checking after initial delay
        setTimeout(checkAndScroll, 300);
      }
    };

    // Handle initial hash after content loads
    if (window.location.hash === "#reach-out") {
      // Wait for content to render, then scroll
      // Account for scroll-to-top if navigating from another page
      const checkAndScroll = () => {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollY <= 10) {
          // At top, now wait for content and scroll
          setTimeout(() => {
            scrollToReachOut(15, 100);
          }, 300);
        } else {
          // Still scrolling to top, wait a bit more
          setTimeout(checkAndScroll, 100);
        }
      };
      
      // Start checking after initial delay to allow scroll-to-top
      setTimeout(checkAndScroll, 500);
    }

    // Handle hash changes
    window.addEventListener("hashchange", handleHashChange);

    // Handle anchor link clicks
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href="#reach-out"], a[href*="#reach-out"]');
      
      if (anchor) {
        e.preventDefault();
        // Update URL hash
        window.history.pushState(null, "", "#reach-out");
        // Wait a bit for any scroll-to-top, then scroll to anchor
        const checkAndScroll = () => {
          const scrollY = window.pageYOffset || document.documentElement.scrollTop;
          if (scrollY <= 10) {
            // At top, now wait for content and scroll
            setTimeout(() => {
              scrollToReachOut(15, 100);
            }, 200);
          } else {
            // Still scrolling to top, wait a bit more
            setTimeout(checkAndScroll, 100);
          }
        };
        
        setTimeout(checkAndScroll, 300);
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      document.removeEventListener("click", handleAnchorClick);
    };
  }, [contactData, scrollToReachOut]); // Re-run when contactData loads

  // Every time contactData or activeLocation changes, re-render map
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // If navigating with hash, wait a bit longer for layout to stabilize
    const hasHash = window.location.hash === "#reach-out";
    const delay = hasHash ? 300 : 0;
    
    const initializeMap = () => {
      // Wait until Google Maps is loaded
      if (window.google && window.google.maps) {
        renderGoogleMap();
      } else {
        // load Google Map API if not loaded
        if (!window.document.getElementById("google-maps-script")) {
          const script = document.createElement("script");
          script.id = "google-maps-script";
          script.src =
            `https://maps.googleapis.com/maps/api/js?key=AIzaSyAWwo8RtD9ntJ2s-N40ke4SVBxQPZt6VoQ&libraries=places`;
          script.async = true;
          script.onload = () => {
            // Additional delay when hash is present to ensure layout is stable
            setTimeout(() => {
              renderGoogleMap();
            }, hasHash ? 200 : 0);
          };
          window.document.body.appendChild(script);
        } else {
          // Already loading, will update after load
          window.addEventListener("google-maps-loaded", () => {
            setTimeout(() => {
              renderGoogleMap();
            }, hasHash ? 200 : 0);
          });
        }
      }
    };
    
    if (delay > 0) {
      setTimeout(initializeMap, delay);
    } else {
      initializeMap();
    }
    // eslint-disable-next-line
  }, [contactData, activeLocation]);

  // Re-render map when it becomes visible (for hash navigation)
  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current || !contactData) return;

    // Use IntersectionObserver to detect when map container becomes visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && mapInstance.current && window.google && window.google.maps) {
            // Map container is visible, trigger resize
            setTimeout(() => {
              if (mapInstance.current) {
                window.google.maps.event.trigger(mapInstance.current, 'resize');
              }
            }, 100);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(mapRef.current);

    // Also listen for window resize
    const handleResize = () => {
      if (mapInstance.current && window.google && window.google.maps) {
        window.google.maps.event.trigger(mapInstance.current, 'resize');
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [contactData]);

  if (!contactData) return <div></div>;

  return (
    <div className="ir-wrapper">
      {/* <!-- Home --> */}
      <div className="home-inner">
        <div className="banner-content">
          <div className="ir-container">
            <h1>{contactData.PageTitle}</h1>
          </div>
          {/* <!-- Breadcrumb --> */}
          <div className="ir-breadcrumb">
            <div className="ir-container">
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {contactData.PageTitle}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Contact Us --> */}
      <div className="section-ptb contact-us">
        <div className="container">
          <div className="contact-us-wrapper tabAccordion">
            <div className="row">
              <div className="col-xl">
                <div className="contact-right">
                  <div style={{ height: "580px", width: "100%", borderRadius: 8, overflow: "hidden", border: "1px solid #eee" }}>
                    <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
                  </div>
                  <div className="tab-content accordion" id="addressTabContent" >
                    {contactData.blocks[0].locations.map((block, index) => (
                      <div
                        className={`tab-pane fade${activeLocation === block.id ? " show active" : ""} accordion-item`}
                        id={`block${block.id}`}
                        role="tabpanel"
                        tabIndex={0}
                        key={block.id}
                      >
                        <div className="accordion-header d-lg-none">
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#acc${block.id}`}
                            onClick={() => {
                              setActiveLocation(block.id);
                              const element = document.getElementById(`block${block.id}`);
                              if (element) {
                                setTimeout(() => {
                                  const yOffset = -160;
                                  const yPosition = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                  window.scrollTo({ top: yPosition, behavior: "smooth" });
                                }, 400);
                              }
                            }}
                          >{block.Title}</button>
                        </div>
                        <div
                          id={`acc${block.id}`}
                          className={`accordion-collapse collapse${index === 0 ? " show" : ""} d-lg-block`}
                          data-bs-parent="#addressTabContent"
                        >
                          <div className="accordion-body">
                            <div className="contact-gmap">
                              {/* Map is above now; this can be removed or used as fallback */}
                              <div className="location-info">
                                <div className="contact-card">
                                  <h5>{block.LocationData.Title}</h5>
                                  <p dangerouslySetInnerHTML={{ __html: block.LocationData.Address }} />
                                  <div className="contact-info mb-2">
                                    <i className="fa-regular fa-envelope"></i>
                                    {block.LocationData.Emails.map((email, idx) => (
                                      <a
                                        key={idx}
                                        href={`mailto:${email.Email}`}
                                        style={{ marginRight: idx < block.LocationData.Emails.length - 1 ? 5 : 0 }}
                                      >
                                        {email.Email}
                                      </a>
                                    ))}
                                  </div>
                                  <div className="contact-info mb-2">
                                    <i className="fa-solid fa-phone"></i>
                                    {block.LocationData.PhoneNumbers.map((phone, idx) => (
                                      <span key={phone.PhoneNumber + "-" + idx}>
                                        {idx > 0 && " / "}
                                        <a href={`tel:${phone.PhoneNumber}`}>{phone.PhoneNumber}</a>
                                      </span>
                                    ))}
                                  </div>
                                  <div className="contact-info mb-2">
                                    <i className="fa-brands fa-whatsapp"></i>
                                    {block.LocationData.WhatsAppLink ? (
                                      <a href={block.LocationData.WhatsAppLink} target="_blank" rel="noopener noreferrer">
                                        {block.LocationData.WhatsAppLink}
                                      </a>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-xl-auto tabAccordion-nav">
                <div className="contact-nav-left">
                  <div className="ir-heading">
                    <h2>Infomerics Nepal</h2>
                  </div>
                  <ul className="nav nav-pills flex-column">
                    {contactData.blocks[0].locations.map((block) => (
                      <li className="nav-item" key={block.id}>
                        <div
                          className={`nav-link${activeLocation === block.id ? " active" : ""}`}
                          data-bs-toggle="pill"
                          data-bs-target={`#block${block.id}`}
                          onClick={() => setActiveLocation(block.id)}
                          role="tab"
                        >
                          {block.Title}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Connect with us --> */}
      {/* #reach-out anchor added for direct navigation */}
      <div id="reach-out"></div>
      <ContactUI
        title={contactData.blocks[1].FormTitle}
        image={contactData.blocks[1].BackgroundImage.url}
      />
    </div>
  );
}
