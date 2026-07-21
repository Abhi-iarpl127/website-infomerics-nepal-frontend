"use client";
import { getContactPageData } from "@/services/APIServices";
import { ContactPageData, LocationData1 } from "@/types/common";
import { useEffect, useState } from "react";
import ContactUI from "@/components/sections/ContactUI";
import Link from "next/link";
export default function ContactUsUI() {
  const [contactData, setContactData] = useState<ContactPageData | null>(null);
  // interface LocationData {
  //   Title: string;
  //   Address: string;
  //   Emails: { Email: string }[];
  //   PhoneNumbers: { PhoneNumber: string }[];
  //   WhatsAppLink: string;
  //   Latitude: string;
  //   Longitude: string;
  // }

  const [locationData, setLocationData] = useState<LocationData1 | null>(null);

  const [whatsappShareUrl, setWhatsappShareUrl] = useState<string>("");
  const [twitterShareUrl, setTwitterShareUrl] = useState<string>("");
  const [gmailShareUrl, setGmailShareUrl] = useState<string>("");


  
  const moreShare = ( locationData:LocationData1 | null) => {
    if(locationData){
    const plainAddress = locationData.Address.replace(/<[^>]+>/g, '');
    if (navigator.share) {
        navigator
        .share({
          title: locationData.Title,
          text: `Check out ${locationData.Title} at ${plainAddress}`,
          url: `https://www.google.com/maps?q=${locationData.Latitude},${locationData.Longitude}`,
          //url: `https://www.google.com/maps?q=${28.5992619},${77.2285563}`,
        })
        .then(() => console.log("Shared successfully"))
        .catch((err) => console.error("Error sharing:", err));
    }
  }
  }

  const shareClick = ( locationData:LocationData1) => {
      const plainAddress = locationData.Address.replace(/<[^>]+>/g, '');
      setLocationData(locationData);
      const text = `Check out ${locationData.Title} \n${plainAddress} \nhttps://www.google.com/maps?q=${locationData.Latitude},${locationData.Longitude}`;
      //const text = `Check out ${locationData.Title} \n${plainAddress} \nhttps://www.google.com/maps?q=${28.5991389},${77.2288333}`;
      const encodedText = encodeURIComponent(text);
      console.log(encodedText, "encodedText");
      setWhatsappShareUrl(
        `https://wa.me/?text=${encodedText}`
      );
      setTwitterShareUrl(
        `https://twitter.com/intent/tweet?text=${encodedText}`
      );
      setGmailShareUrl(
        `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${encodeURIComponent(
          locationData.Title
        )}&body=${encodedText}`
      );

      // if (navigator.share) {
      //   document.querySelector(".moreShareBtn")?.addEventListener("click", () => {
      //     navigator
      //       .share({
      //         title: locationData.Title,
      //         text: `Check out ${locationData.Title} at ${plainAddress}`,
      //         url: `https://www.google.com/maps?q=${locationData.Latitude},${locationData.Longitude}`,
      //         //url: `https://www.google.com/maps?q=${28.5992619},${77.2285563}`,
      //       })
      //       .then(() => console.log("Shared successfully"))
      //       .catch((err) => console.error("Error sharing:", err));
      //   });
      // }
      // } else {
      //   document.querySelector(".moreShareBtn")?.setAttribute("style", "display: none;");
      //   console.log("Web Share API not supported, showing fallback links");
      // }
      // console.log(locationData);
  };
  


  useEffect(() => {
    const fetchData = async () => {
      const data = await getContactPageData();
      console.log(data);
      setContactData(data?.data);

      if (activeLocation === 0) {
        setActiveLocation(data?.data?.blocks[0].locations[0].id);
      } 

      // Get active location from query params
    };
    fetchData();
  }, []);

  const [activeLocation, setActiveLocation] = useState<number>(0);

  useEffect(() => {
    // Extract the 'active' query parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const activeParam = urlParams.get("active");
    console.log(activeParam, "activeParam", urlParams);

    if (activeParam) {
      setActiveLocation(parseInt(activeParam));
      console.log(parseInt(activeParam), "activeLocation");
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const activeParam = urlParams.get("active");
      // console.log(activeParam, "activeParam", urlParams);
      if (activeParam) {
        setActiveLocation(parseInt(activeParam));
        // console.log(parseInt(activeParam), "activeLocation");
      }
    }, 100);
    
    // Clean up the interval when component unmounts or when activeLocation changes
    return () => {
      clearInterval(intervalId);
    };
  }, [activeLocation,setActiveLocation]);

  if (!contactData) return <div></div>;

  return (
    <div className="ir-wrapper">
      {/* <div>Currently active tab: {activeLocation}</div> */}
      {/* <!-- Home --> */}
      <div className="home-inner">
        <div className="banner-content">
          <div className="ir-container">
            <h1>{contactData.PageTitle}</h1>
            {/* <p>{contactData.Subtitle}</p> */}
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
        {/* <picture>
          <source
            media="(max-width:640px)"
            srcSet={contactData?.PageMobileBanner?.url}
          />
          <img src={contactData?.PageBanner?.url} alt="" />
        </picture> */}
      </div>
    
      {/* <!-- Contact Us --> */}
      <div className="section-ptb contact-us">
        <div className="container">
          <div className="contact-us-wrapper tabAccordion">
            <div className="row">
              <div className="col-xl">
                <div className="contact-right">
                  <div className="tab-content accordion" id="addressTabContent">
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
                              <div className="gmap-frame">
                                <iframe
                                  loading="lazy"
                                  src={`https://www.google.com/maps?q=${block.LocationData.Latitude},${block.LocationData.Longitude}&z=15&output=embed`}
                                  frameBorder="0"
                                  style={{ border: 0 }}
                                  allowFullScreen={true}
                                ></iframe>
                              </div>
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
                                      <>
                                        {idx > 0 && " / "}
                                        <a href={`tel:${phone.PhoneNumber}`}>{phone.PhoneNumber}</a>
                                      </>
                                    ))}
                                  </div>
                                  <div className="contact-info mb-2">
                                    <i className="fa-brands fa-whatsapp"></i>
                                    <a href={block.LocationData.WhatsAppLink} target="_blank" rel="noopener noreferrer">{block.LocationData.WhatsAppLink}</a>
                                  </div>
                                  <a
                                    href="#"
                                    className="share-btn"
                                    data-bs-toggle="modal"
                                    data-bs-target="#shareLocation"
                                    onClick={() => shareClick(block.LocationData)}
                                  >
                                    Share Location <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                  </a>
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
                    <h2>Infomerics Group</h2>
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
          {/* Modal */}
          <div className="modal fade modal-share" id="shareLocation" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title">Share</h3>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className="address-row">
                    <h5>{locationData && locationData.Title}</h5>
                    {locationData && (
                      <p
                        dangerouslySetInnerHTML={{
                          __html: locationData.Address,
                        }}
                      />
                    )}
                  </div>
                  <div className="social-share">
                    <a href={whatsappShareUrl} target="_blank" rel="noopener noreferrer" className="wa"><i className="fa-brands fa-whatsapp"></i></a>
                    <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" className="tx"><i className="fa-brands fa-x-twitter"></i></a>
                    <a href={gmailShareUrl} target="_blank" rel="noopener noreferrer" className="mail"><i className="fa-solid fa-envelope"></i></a>
                    <a onClick={() => moreShare(locationData || null)} className="more"><i className="fa-solid fa-ellipsis"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Connect with us --> */}

      <ContactUI
        title={contactData.blocks[1].FormTitle}
        image={contactData.blocks[1].BackgroundImage.url}
      />
    </div>
  );
}
