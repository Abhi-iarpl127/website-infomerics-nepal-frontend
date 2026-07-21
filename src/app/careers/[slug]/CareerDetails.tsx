"use client";
import React, { useEffect, useState } from "react";
// import { checkArrow } from "@/common/functions";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Navigation, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import Link from "next/link";
// import { Accordion } from "react-bootstrap";
import { getCareersPageData } from "@/services/APIServices";
import { careersData, CareersPageData } from "@/types/common";
import TextCaptchaForm from "@/components/TextCaptchaForm";

export default function CareerUI({ slug }: { slug: string }) {
  // const inputRef = useRef<HTMLInputElement>(null);
  const [userInput, setUserInput] = useState("");
  const [refreshId, setRefreshId] = useState("");
  const [message, setMessage] = useState("");
  // const [verifyCaptcha, setVerifyCaptcha] = useState(false);
  const [selectedJob, setSelectedJob] = useState<careersData | null>(null);

  const [resume, setResume] = useState<File | null>(null);
  const [resumeID, setResumeID] = useState<string | null>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  // Form fields
  const [jobRole, setJobRole] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");

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

  // Submit handler for the application form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all required fields before captcha
    if (!jobRole || !email || !phone || !name) {
      setMessage("Please fill in all required fields");
      return;
    }
    if (!location) {
      setMessage("Please select a location");
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

    // Captcha verification
    const res = await fetch("/api/verify-text-captcha", {
      method: "POST",
      body: JSON.stringify({ userInput, refreshId }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    // setVerifyCaptcha(data.success);
    setMessage(data.message);

    if (data.success) {
      // Prepare data to send
      const jsonData = {
        data: {
          JobRole: jobRole,
          Email: email,
          PhoneNumber: phone,
          TotalExperience: experience,
          CandidateName: name,
          LocationPreference: location,
          Resume: resumeID,
        },
      };

      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_BASE_URL + "/api/resume-submissions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonData),
          }
        );

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
          setResumeID(null);
          setUserInput("");
          // setVerifyCaptcha(false);
          setShowApplicationModal(false);
          document.body.style.overflow = "";
        } else {
          setMessage("Failed to submit application. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting application:", error);
        setMessage("An error occurred. Please try again later.");
      }
    } else {
      setMessage("Captcha verification failed.");
    }
  };

  // const movetoDiv = (id: string) => {
  //   const applicationForm = document.getElementById(id);
  //   if (applicationForm) {
  //     applicationForm.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  // On job selected, populate jobRole and scroll to form
  useEffect(() => {
    setJobRole(selectedJob?.JobTitle || "");
    if (selectedJob) {
      const applicationForm = document.getElementById("application-form");
      if (applicationForm) {
        applicationForm.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [selectedJob]);

  // Fetch career data and job info
  const [careerData, setCareerData] = useState<CareersPageData | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCareersPageData();
      setCareerData(data?.data);

      data.data?.blocks[3].careers.forEach((career: careersData) => {
        if (career.id === Number(slug)) {
          setSelectedJob(career);
        }
      });
    };
    fetchData();
  }, [jobRole, slug]);

  // For job location/category arrays (if needed elsewhere)
  // const [jobLocation, setJobLocation] = useState<string[]>([]);
  // const [jobCategory, setJobCategory] = useState<string[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCareersPageData();
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

      // setJobLocation(allJobLocations);
      // setJobCategory(allJobCategories);
    };
    fetchData();
  }, []);

  // Modal handlers
  const openModal = () => {
    setShowApplicationModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowApplicationModal(false);
    document.body.style.overflow = "";
  };

  if (!careerData) {
    return <div></div>;
  }

  return (
    <div className="ir-wrapper">
      <section className="inner-banner Careers">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12 text-left">
              <h1 className="inner-heading mb-4">{selectedJob?.JobTitle}</h1>
            </div>
            <div className="bredcrum">
              <a href="#">Home</a>
              <a href="#">Careers</a>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Find your Perfect Job. --> */}
      <section className="career-product-section">
        <div className="ir-container container-career">
          <div className="row">
            {/* Left Column - Job Details */}
            <div className="col-lg-3 col-md-5">
              <div className="job-details">
                <div className="mb-4">
                  <div className="section-title-ir">Location:</div>
                  <div className="section-content-ir">{selectedJob?.job_locations.map((location: { Location: string }, index: number) => (
                      <span key={`location-${index}`}>{location.Location}{index < (selectedJob?.job_locations.length || 0) - 1 ? "/ " : ""}</span>
                  ))}</div>
                </div>
                <div className="mb-4">
                  <div className="section-title-ir">Experience:</div>
                  <div className="section-content-ir">{selectedJob?.Experience}</div>
                </div>
                <div className="mb-4">
                  <div className="section-title-ir">Qualification:</div>
                  <div className="section-content-ir">{selectedJob?.Qualfication}</div>
                </div>
                <div className="mb-4">
                  <div className="section-title-ir">Contract:</div>
                  <div className="section-content-ir">{selectedJob?.JobType}</div>
                </div>
                <div className="read-more-cta pop_up_cta">
                  <a
                    href="#"
                    id="openModalBtnCareer"
                    onClick={e => {
                      e.preventDefault();
                      openModal();
                    }}
                  >
                    Apply Now
                  </a>
                </div>
                {/* Modal for Application Form */}
                {typeof window !== "undefined" && (
                  <div
                    id="application-form"
                    className="modalcareer"
                    style={{
                      display: showApplicationModal ? "block" : "none",
                    }}
                    onClick={e => {
                      if (e.target === e.currentTarget) {
                        closeModal();
                      }
                    }}
                  >
                    <div className="modal-content">
                      <span
                        className="close-btn"
                        onClick={closeModal}
                        role="button"
                        tabIndex={0}
                        aria-label="Close"
                      >
                        &times;
                      </span>
                      <div className="application-form-container">
                        <h2 className="form-title">
                          Application Form for {selectedJob?.JobTitle}
                        </h2>
                        <form
                          className="form-wrapper ir-form brInfRating"
                          onSubmit={handleSubmit}
                          autoComplete="off"
                        >
                          <div className="row gx-lg-5">
                            <div className="col-md-6">
                              <div className="form-group">
                                <select className="form-select" value={jobRole} disabled>
                                  {careerData?.blocks[3].careers.map((career: careersData, index: number) => (
                                    <option key={`job-${index}`} value={career.JobTitle}>
                                      {career.JobTitle}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="form-group">
                                <input
                                  type="email"
                                  className="form-control"
                                  id="txtEmail"
                                  placeholder="Email ID*"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  required
                                  autoComplete="off"
                                />
                                <small className="ir-error">*Enter valid Email ID</small>
                              </div>
                              <div className="form-group">
                                <input
                                  type="number"
                                  className="form-control"
                                  id="txtPhone"
                                  placeholder="Phone Number*"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  required
                                  autoComplete="off"
                                />
                                <small className="ir-error">*Enter valid Phone Number</small>
                              </div>
                              <div className="form-group">
                                <input
                                  type="text"
                                  value={experience}
                                  onChange={(e) => setExperience(e.target.value)}
                                  className="form-control"
                                  id="txtExperience"
                                  placeholder="Total Experience"
                                  autoComplete="off"
                                />
                                <small className="ir-error">*Enter valid Total Experience</small>
                              </div>
                              <div className="form-group">
                                <input
                                  type="text"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  className="form-control"
                                  id="txtName"
                                  placeholder="Candidate Name"
                                  required
                                  autoComplete="off"
                                />
                                <small className="ir-error">*Enter valid Candidate Name</small>
                              </div>
                              <div className="form-group">
                                <select
                                  className="form-select"
                                  value={location}
                                  onChange={e => setLocation(e.target.value)}
                                  required
                                >
                                  <option value="">Preferred Location</option>
                                  {selectedJob?.job_locations.map((locationObj: { Location: string }) => (
                                    <option
                                      key={`location-${locationObj.Location}`}
                                      value={locationObj.Location}
                                    >
                                      {locationObj.Location}
                                    </option>
                                  ))}
                                </select>
                                <small className="ir-error">*Select valid Location</small>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="upload-cv">
                                <h6>Upload your Resume / CV</h6>
                                <div className="fileUpload">
                                  <input
                                    className="form-control"
                                    type="file"
                                    id="formFile"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) => setResume(e.target.files?.[0] || null)}
                                    required
                                  />
                                  <div className="cv-upload-wrapper">
                                    <div className="cv-upload-icon">
                                      <img src="../images/icon_upload.svg" alt="" />
                                    </div>
                                    <p>Drop your resume / CV here or browse</p>
                                    {resume && (
                                      <p className="selected-file">
                                        Selected file: {resume.name}
                                      </p>
                                    )}
                                    <small className="ir-error">*Upload valid Resume</small>
                                  </div>
                                </div>
                              </div>
                              <TextCaptchaForm
                                message={message}
                                setUserInput={setUserInput}
                                userInput={userInput}
                                setRefreshId={setRefreshId}
                              />
                              <button
                                type="submit"
                                className="btn-ir-primary btn-block"
                              >
                                SUBMIT YOUR APPLICATION
                              </button>
                              {message && (
                                <div style={{ marginTop: "16px" }}>
                                  <p className={`application-message ${/success/i.test(message) ? 'success' : 'error'}`}>
                                    {message}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Right Column - Job Content */}
            <div className="col-lg-9 col-md-7">
              <div className="content-section">
                {/* Job Description */}
                <div className="mb-5">
                  <h2 className="content-title-ir">Job Description</h2>
                  <p className="content-text">
                    {selectedJob?.JobDescription}
                  </p>
                </div>
                {/* Role & Responsibility */}
                <div className="mb-5">
                  <h2 className="content-title-ir">Role & Responsibility:</h2>
                  <div className="content-text">
                    <div dangerouslySetInnerHTML={{ __html: selectedJob?.RolesReponsibilities || "" }} /> 
                  </div>
                </div>
                {/* Skills */}
                <div className="mb-5">
                  <h2 className="content-title-ir">Skills:</h2>
                  <div className="content-text">
                    <ul className="skills-list">
                      <p dangerouslySetInnerHTML={{ __html: selectedJob?.Skills || "" }} />
                    </ul>
                  </div>
                </div>
                {/* Share with friends */}
                {/* <div className="mb-4">
                  <h3 className="content-title-ir">Share with your friends</h3>
                  <div className="d-flex">
                    <a href="#" className="social-btn-ir"><i className="fa-brands fa-facebook-f"></i></a>
                    <a href="#" className="social-btn-ir"><i className="fa-brands fa-twitter"></i></a>
                    <a href="#" className="social-btn-ir"><i className="fa-brands fa-linkedin-in"></i></a>
                    <a href="#" className="social-btn-ir"><i className="fa-brands fa-whatsapp"></i></a>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
