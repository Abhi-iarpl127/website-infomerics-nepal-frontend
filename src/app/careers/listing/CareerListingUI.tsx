"use client";
import React, { useEffect, useState, useMemo } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { getCareersPageData } from "@/services/APIServices";
import { careersData, CareersPageData } from "@/types/common";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CareerListingUI() {
  const [selectedJob, setSelectedJob] = useState<careersData | null>(null);

  const [careerData, setCareerData] = useState<CareersPageData | null>(null);

  // Filter states
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  // Options for dropdowns, deduped
  const [jobLocation, setJobLocation] = useState<string[]>([]);
  const [jobCategory, setJobCategory] = useState<string[]>([]);

  const router = useRouter();

  // Fetch and set data once for dropdowns and jobs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCareersPageData();
        setCareerData(data?.data);

        const allJobLocations: Set<string> = new Set();
        const allJobCategories: Set<string> = new Set();

        data?.data?.blocks[3].careers.forEach((career: careersData) => {
          career.job_locations.forEach((location: { Location: string }) => {
            if (location.Location && location.Location.trim())
              allJobLocations.add(location.Location.trim());
          });
          if (career?.job_category?.Title && career.job_category.Title.trim()) {
            allJobCategories.add(career.job_category.Title.trim());
          }
        });

        setJobLocation(Array.from(allJobLocations));
        setJobCategory(Array.from(allJobCategories));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Filtering logic using useMemo for perf
  const filteredCareers = useMemo(() => {
    if (!careerData?.blocks[3]?.careers) return [];

    return careerData.blocks[3].careers.filter((career) => {
      // Filter by category
      const matchCategory =
        !selectedCategory ||
        (career.job_category &&
          career.job_category.Title &&
          career.job_category.Title === selectedCategory);

      // Filter by location
      const matchLocation =
        !selectedLocation ||
        (career.job_locations &&
          career.job_locations.some(
            (loc) => loc.Location === selectedLocation
          ));

      // Filter by search
      const search = searchValue.trim().toLowerCase();
      const matchSearch =
        !search ||
        (career.JobTitle && career.JobTitle.toLowerCase().includes(search)) ||
        (career.job_locations &&
          career.job_locations.some((loc) =>
            loc.Location.toLowerCase().includes(search)
          ));

      return matchCategory && matchLocation && matchSearch;
    });
  }, [careerData, selectedCategory, selectedLocation, searchValue]);

  if (!careerData) {
    return <div></div>;
  }

  return (
    <div className="ir-wrapper">
      <section className="inner-banner contact-us">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12 text-left">
              <h1 className="inner-heading mb-4">Careers</h1>
            </div>
            <div className="bredcrum">
              <a href="#">Home</a>
              <a href="#">Careers</a>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Benefits at Infomerics --> */}

      {/* <!-- Find your Perfect Job. --> */}
      <section className="career-listing-section">
        <div className="ir-container">
          {/* Top-right button */}
          <div className="d-flex justify-content-end mb-4">
            <div className="read-more-cta-2 mt-0">
              <Link href="/careers">Life at Infomerics</Link>
            </div>
          </div>

          {/* Heading left + Filters right */}
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap filter-top-career">
            {/* Left: Heading */}
            <h2
              className="career-heading mb-0"
              dangerouslySetInnerHTML={{
                __html:
                  careerData?.blocks[3].Title ||
                  "Shape the Future of Financial Intelligence with us",
              }}
            />

            {/* Right: Filters */}
            <div className="career-filters d-flex flex-wrap align-items-center">
              <div className="search-box me-2 mb-2 position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search keywords or location"
                  id="jobSearch"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <i className="fas fa-search search-icon"></i>
              </div>
              <div className="dropdown me-2 mb-2">
                <select
                  className="form-select"
                  id="categoryFilter"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Category</option>
                  {jobCategory
                    .filter(
                      (category) => category !== "" && category != null
                    )
                    .map((category, index) => (
                      <option key={`cat-${index}`} value={category}>
                        {category}
                      </option>
                    ))}
                </select>
              </div>
              <div className="dropdown mb-2">
                <select
                  className="form-select"
                  id="locationFilter"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="">Location</option>
                  {jobLocation
                    .filter((location) => location !== "" && location != null)
                    .map((location, index) => (
                      <option key={`loc-${index}`} value={location}>
                        {location}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          {/* Jobs table */}
          <div className="table-responsive">
            <table className="table career-table">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Experience</th>
                  <th>Type</th>
                  <th></th>
                </tr>
              </thead>
              <tbody id="jobList">
                {filteredCareers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center">
                      No jobs found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredCareers.map((career) => (
                    <tr key={`career-row-${career.id}`}>
                      <td>{career.JobTitle}</td>
                      <td>{career.Experience}</td>
                      <td>{career.JobType}</td>
                      <td>
                        <a
                          href="#"
                          className="apply-btn-career"
                          onClick={() => router.push(`/careers/${career.id}`)}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M7 17l9-9M16 16V8h-8"></path>
                          </svg>
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Explore button */}
          <div className="text-center mt-4">
            {/* <div className="read-more-cta-2">
              <a href="#">Explore More Opportunities</a>
            </div> */}
          </div>

          {/* Expanded job details modal/section (optional: based on your application's pattern) */}
          {/* Example: Render expanded details if a job is selected */}
          {selectedJob && (
            <div className="modal show d-block" tabIndex={-1}>
              <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">
                      {selectedJob.JobTitle} - Details
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setSelectedJob(null)}
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="row gx-lg-5">
                      <div className="col-lg-5">
                        <div className="jd-row">
                          <h5>Job Description</h5>
                          <p>{selectedJob.JobDescription}</p>
                        </div>
                        <div className="jd-row">
                          <h5>Salary</h5>
                          <p>{selectedJob.Salary}</p>
                        </div>
                        <div className="jd-row">
                          <h5>Location</h5>
                          <p>
                            {selectedJob.job_locations
                              .map((location) => location.Location)
                              .join(", ")}
                          </p>
                        </div>
                        <div className="jd-row">
                          <h5>Educational Qualification</h5>
                          <p>{selectedJob.Qualfication}</p>
                        </div>
                        <div
                          onClick={() => {
                            /* here you may trigger an application process */
                          }}
                          className="btn-ir-primary"
                          style={{ cursor: "pointer" }}
                        >
                          APPLY NOW
                        </div>
                      </div>
                      <div className="col-lg-7">
                        <div className="jd-row">
                          <h5>Roles and Responsibilities</h5>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: selectedJob.RolesReponsibilities,
                            }}
                          />
                        </div>
                        <div className="jd-row">
                          <h5>For any query feel free to connect @</h5>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: selectedJob.AboutCompany,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setSelectedJob(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
