"use client";
import React, { useEffect, useState } from "react";
import { checkArrow } from "@/common/functions";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";
import { Accordion } from "react-bootstrap";
import { getCareersPageData } from "@/services/APIServices";
import { careersData, CareersPageData } from "@/types/common";
import TextCaptchaForm from "@/components/TextCaptchaForm";


export default function CareerUI() {

  const [userInput, setUserInput] = useState("");
  const [refreshId, setRefreshId] = useState("");
  const [message, setMessage] = useState("");
  const [verifyCaptcha, setVerifyCaptcha] = useState(false);
  const [selectedJob, setSelectedJob] = useState<careersData | null>(null);



  const [resume, setResume] = useState<File | null>(null);
  const [resumeID, setResumeID] = useState<string | null>(null);

  useEffect(() => {
    if (resume) {
      const uploadUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/upload/";

      const formData = new FormData();
      formData.append("files", resume);

      const uploadResume = async () => {
        try {
          const response = await fetch(uploadUrl, {
            method: "POST",
            body: formData,
          });

          if (response.ok) {
            const data = await response.json();
            console.log("Resume uploaded successfully:", data[0]?.id);

            setResumeID(data[0]?.id);
          } else {
            console.error("Failed to upload resume:", response.statusText);
          }
        } catch (error) {
          console.error("Error uploading resume:", error);
        }
      };

      uploadResume();
    }
  }, [resume]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/verify-text-captcha", {
      method: "POST",
      body: JSON.stringify({ userInput, refreshId }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    setVerifyCaptcha(data.success);
    setMessage(data.message);

    if (verifyCaptcha || data.success) {
      console.log("Captcha verified");
      // Validate all required fields
      if (!jobRole || !email || !phone || !name) {
        setMessage("Please fill in all required fields");
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setMessage("Please enter a valid email address");
        return;
      }

      // Validate phone number (basic validation)
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(phone)) {
        setMessage("Please enter a valid 10-digit phone number");
        return;
      }

      if (!resumeID) {
        setMessage("Please upload your resume");
        return;
      }

      const jsonData = {
        data: {
          JobRole: jobRole,
          Email: email,
          PhoneNumber: phone,
          TotalExperience: experience,
          CandidateName: name,
          LocationPreference: location,
          Resume: resumeID
        }
      };

      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/api/resume-submissions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(jsonData),
        });

        if (response.ok) {
          setMessage("Application submitted successfully!");
          // Reset form fields
          setJobRole("");
          setEmail("");
          setPhone("");
          setExperience("");
          setName("");
          setLocation("");
          setResume(null);
          setUserInput("");
        } else {
          setMessage("Failed to submit application. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting application:", error);
        setMessage("An error occurred. Please try again later.");
      }
    } else {
      console.log("Captcha not verified");
    }
  };

  const movetoDiv = (id: string) => {
    const applicationForm = document.getElementById(id);
    if (applicationForm) {
      applicationForm.scrollIntoView({ behavior: 'smooth' });
    }
  }


  const [jobRole, setJobRole] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  // const [resume, setResume] = useState<File | null>(null);
  // const [captcha, setCaptcha] = useState<string>("");


  useEffect(() => {
    careerData?.blocks[3].careers.forEach((career: careersData) => {
      if (career.JobTitle === jobRole) {
        setSelectedJob(career);
      }
    });
  }, [jobRole]);

  useEffect(() => {
    console.log(selectedJob, "selectedJob");
    setJobRole(selectedJob?.JobTitle || "");

    // Scroll to application form smoothly when a job is selected
    if (selectedJob) {
      const applicationForm = document.getElementById('application-form');
      if (applicationForm) {
        applicationForm.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [selectedJob]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCareersPageData();
      console.log(data);
      setCareerData(data?.data);
    }
    fetchData();
  }, [jobRole]);

  const [careerData, setCareerData] = useState<CareersPageData | null>(null);
  const [jobLocation, setJobLocation] = useState<string[]>([]);
  const [jobCategory, setJobCategory] = useState<string[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCareersPageData();
      console.log(data);
      setCareerData(data?.data);

      const allJobLocations: string[] = [];
      const allJobCategories: string[] = [];

      data?.data?.blocks[3].careers.forEach((career: careersData) => {
        career.job_locations.forEach((location: { Location: string }) => {
          allJobLocations.push(location.Location);
        });
      });

      data?.data?.blocks[3].careers.forEach((career: careersData) => {
        allJobCategories.push(career?.job_category?.Title);
      });

      console.log(allJobLocations);
      setJobLocation(allJobLocations);
      setJobCategory(allJobCategories);
    };
    fetchData();
  }, []);

  if (!careerData) {
    return <div></div>;
  }


  return (
    <div className="ir-wrapper">
      {/* <!-- Breadcrumb --> */}
      {/* <div className="ir-breadcrumb">
        <div className="ir-container">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Careers
              </li>
            </ol>
          </nav>
        </div>
      </div> */}
      {/* <!-- Careers BG --> */}
      <div className="careers-intro-wrapper">
        {/* <!-- Careers Intro --> */}
        <div className="section-pt section-overview careers-overview">
          <div className="ir-container">
            <div className="row align-items-end">
              <div className="col">
                <div className="ir-heading">
                  <h2>
                    {careerData?.blocks[0].Title}
                  </h2>
                  <p>{careerData?.blocks[0].Subtitle}</p>
                </div>
              </div>
              <div className="col-auto view-opening-cta">
                <div className="read-more-cta">
                  <Link href="/careers/listing">View Openings</Link>
                </div>
              </div>
            </div>
            <div className="intro-img">
              <img src={careerData?.blocks[0].Banner?.url || ""} alt={careerData?.PageTitle} />
            </div>
            <div className="careers-features brInfRating">
              <div className="row align-items-center justify-content-between">
                {careerData?.blocks[0].Features.map((feature) => (
                  <div className="col-auto col-cf" key={feature.id}>
                    <div className="cf-list">
                      <div className="icon">
                        <img src={feature.Image?.url || ""} alt={feature.FeatureTitle} />
                      </div>
                      <h3>{feature.FeatureTitle}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Why Work With Us? --> */}
        <div className="section-pt work-with-us">
          <div className="ir-container">
            <div className="ir-heading center">
              <h2>{careerData?.blocks[1].Title}</h2>
            </div>
          </div>
          <div className="swiper-container">
            <Swiper
              modules={[Pagination, Navigation]}
              className="ir-controls bottom slWorkWithUs"
              spaceBetween={24}
              centeredSlides={false}
              speed={800}
              loop={false}
              autoplay={{
                delay: 4000,
              }}
              resistanceRatio={0}
              breakpoints={{
                0: {
                  slidesPerView: 1.125,
                  spaceBetween: 20,
                },
                576: {
                  slidesPerView: 1.5,
                  spaceBetween: 20,
                },
                767: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                991: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1199: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                1499: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },
                1799: {
                  slidesPerView: 6,
                  spaceBetween: 20,
                },
              }}
              onInit={(swiper) => {
                checkArrow(swiper);
              }}
              onResize={(swiper) => {
                checkArrow(swiper);
              }}
            >
              {careerData?.blocks[1].Data.TitleDescCard.map((infoSlider) => (
                <SwiperSlide key={infoSlider.id}>
                  <div className="wwu-card">
                    <h3>{infoSlider.Title}</h3>
                  </div>
                </SwiperSlide>
              ))}

            </Swiper>
            <div className="swiper-nav bottom">
              <div className="swiper-pagination wwu-pagination bottom"></div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Benefits at Infomerics --> */}
      <div className="section-pb benefits-infomarics bg-grey pattern-top">
        <div className="ir-container">
          <div className="ir-heading center blue">
            <h2 dangerouslySetInnerHTML={{ __html: careerData?.blocks[2].Title || "Benefits at Infomerics" }} />
          </div>
          <div className="benefits-wrapper">
            <div className="row align-items-center gx-5">
              <div className="col-lg-7">
                <Swiper
                  className="ir-controls bottom slBenefitsIR"
                  modules={[Pagination, Autoplay]}
                  spaceBetween={0}
                  centeredSlides={true}
                  speed={1000}
                  loop={true}
                  autoHeight={true}
                  autoplay={{
                    delay: 3000,
                  }}
                  direction={"vertical"}
                  resistanceRatio={0}
                  pagination={{
                    el: ".benefits-pagination.bottom", // Move pagination exclusively to bottom
                    clickable: true,
                  }}
                  breakpoints={{
                    0: {
                      slidesPerView: 3,
                    },
                    576: {
                      slidesPerView: 3,
                    },
                    767: {
                      slidesPerView: 3,
                    },
                    991: {
                      slidesPerView: 3,
                    },
                    1199: {
                      slidesPerView: 3,
                    },
                  }}
                  onInit={(swiper) => {
                    checkArrow(swiper);
                  }}
                  onResize={(swiper) => {
                    checkArrow(swiper);
                  }}
                >
                  {careerData?.blocks[2].InfoSlider.map((infoSlider) => (
                    <SwiperSlide key={infoSlider.id}>
                      <div className="irbf-list">
                        <div className="row align-items-center">
                          <div className="col-auto">
                            <div className="icon">
                              <img src={infoSlider.Icon?.url || ""} alt={infoSlider.Title} />
                            </div>
                          </div>
                          <div className="col">
                            <h3>{infoSlider.Title}</h3>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                {/* Moved swiper-nav beneath Swiper for proper bottom placement */}
                <div className="swiper-nav bottom">
                  <div className="swiper-pagination benefits-pagination bottom"></div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="benefits-img brInfRating">
                  <img src={careerData?.blocks[2].Image?.url || ""} alt={careerData?.PageTitle} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Fun @work --> */}
      <div className="section-pt fun-at-work bg-grey">
        <div className="ir-container">
          <div className="ir-heading center">
            <h2 dangerouslySetInnerHTML={{ __html: careerData?.blocks[4].Title || "Fun @work" }} />
          </div>
          <Swiper
            className="ir-controls bottom slFunAtWork"
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={0}
            centeredSlides={false}
            speed={1000}
            loop={true}
            autoplay={{
              delay: 6000,
            }}
            resistanceRatio={0}
            pagination={{
              el: ".wc-pagination",
              clickable: true,
            }}
            navigation={{
              nextEl: ".wc-next",
              prevEl: ".wc-prev",
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
              },
              576: {
                slidesPerView: 2,
                slidesPerGroup: 2,
              },
              767: {
                slidesPerView: 2,
                slidesPerGroup: 2,
              },
              991: {
                slidesPerView: 3,
                slidesPerGroup: 3,
              },
              1199: {
                slidesPerView: 4,
                slidesPerGroup: 4,
              }
            }}
            onInit={(swiper) => {
              checkArrow(swiper);
            }}
            onResize={(swiper) => {
              checkArrow(swiper);
            }}
          >
            {careerData?.blocks[4].SliderImage.Image.map((image, index) => (
              <SwiperSlide key={`image-${index}`}>
                <div className="wc-card">
                  <img src={image?.url || ""} alt={""} />
                </div>
              </SwiperSlide>
            ))}

            <div className="swiper-nav bottom">
              <div className="swiper-pagination wc-pagination bottom"></div>
            </div>
            <div className="swiper-nav-wrapper">
              <div className="swiper-button-prev wc-prev">
                <i className="fa-solid fa-chevron-left"></i>
              </div>
              <div className="swiper-button-next wc-next">
                <i className="fa-solid fa-chevron-right"></i>
              </div>
            </div>
          </Swiper>
        </div>
      </div>
      {/* <!-- Employee Speak --> */}
      <div className="section-pt employee-speak">
        <div className="ir-container">
          <div className="ir-heading center">
            <h2 dangerouslySetInnerHTML={{ __html: careerData?.blocks[5].Title || "Employee Speak" }} />
          </div>
          <Swiper
            className="ir-controls bottom slTestimonials"
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            centeredSlides={false}
            speed={800}
            loop={false}
            autoplay={{
              delay: 4000,
            }}
            resistanceRatio={0}
            pagination={{
              el: ".testimonials-pagination",
              clickable: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              576: {
                slidesPerView: 2,
                spaceBetween: 24,
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
              }
            }}
            onInit={(swiper) => {
              checkArrow(swiper);
            }}
            onResize={(swiper) => {
              checkArrow(swiper);
            }}
          >
            {careerData?.blocks[5].SliderData.map((testimonial, index) => (
              <SwiperSlide key={`testimonial-${index}`}>
                <div className="testimonial-card">
                  <p dangerouslySetInnerHTML={{ __html: testimonial.Description }} />

                  <div className="author">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <img
                          src={testimonial.Image?.url || ""}
                          alt=""
                        />
                      </div>
                      <div className="col">
                        <h3>{testimonial.Name}</h3>
                        <p>{testimonial.Position}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-nav bottom">
              <div className="swiper-pagination testimonials-pagination bottom"></div>
            </div>
          </Swiper>
        </div>
      </div>

      {/* Get Insights */}
      <div className="section-pb get-insights">
        <div className="ir-container">
          <div className="get-insights-box">
            <div className="row align-items-center">
              {/* Left Content */}
              <div className="col-md-8">
                <div className="insights-content">
                  <h2>
                    Get expert financial insights, market trends, and actionable strategies.
                  </h2>
                </div>
              </div>

              {/* Right Side (Only Button) */}
              <div className="col-md-4 text-md-end text-center">
                <div className="insights-action">
                  <Link href="/careers/listing" className="read-more-cta">View Openings</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
