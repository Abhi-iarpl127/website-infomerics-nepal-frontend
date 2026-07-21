"use client";
import React, { useEffect, useState } from "react";
import { RegulatoryDisclosersUnacceptedRatingsData } from "@/types/common";
// import DateComponent from "@/components/Date";

import { getRegulatoryDisclosersUnacceptedRatings } from "@/services/APIServices";
import Link from "next/link";

interface PageProps {
  title: string;
  description: string;
  image: string;
  s_image: string;
}
const UnacceptedRatingsUI = ({
  title,
  description,
  image,
  s_image,
}: PageProps) => {
  //https://ratingcms.cwyde.com/api/unaccepted-ratings

  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("");
  const [security, setSecurity] = useState("");

  const [data, setData] =
    useState<RegulatoryDisclosersUnacceptedRatingsData | null>(null);
  const [fdata, setfData] =
    useState<RegulatoryDisclosersUnacceptedRatingsData | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRegulatoryDisclosersUnacceptedRatings();

        setData(response as RegulatoryDisclosersUnacceptedRatingsData);
        console.log(response, "responseSB");
        setfData(response as RegulatoryDisclosersUnacceptedRatingsData);
      } catch (error) {
        console.error("Failed to fetch home page data:", error);
        setData(null); // or handle the error as appropriate
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data && fdata) {
      let filterData = data.data;
      if (search != "") {
        filterData = data.data.filter((item) => {
          return item?.IssuerName?.toLowerCase().includes(search.toLowerCase()); // Return true to keep the item
        });
      }

      console.log(search, filterData);
      if (sector != "") {
        filterData = filterData.filter((item) => {
          return item?.Sector?.toLowerCase() == sector.toLowerCase();
        });
      }
      console.log("sector", sector, filterData);
      if (security != "") {
        filterData = filterData.filter((item) => {
          return item?.SecurityType?.toLowerCase() == security.toLowerCase();
        });
      }
      // console.log(security,filterData);
      setfData({ ...fdata, data: filterData });
    }
  }, [search, sector, security]);

  return (
    <div className="ir-wrapper">
      {/* <!-- Home --> */}
      <div className="home-inner">
        <div className="banner-content">
          <div className="ir-container">
            <h1>{title}</h1>
            {description && <p>{description}</p>}
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link href="/regulatory-disclosure">
                    Regulatory Disclosures
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {title}
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <picture>
          <source media="(max-width:640px)" srcSet={s_image} />
          <img src={image} alt="" />
        </picture>
      </div>
      {/* <!-- Breadcrumb --> */}

      {/* <!-- Unaccepted Ratings --> */}
      <div className="section-ptb section-start unaccepted-ratings">
        <div className="ir-container">
          <div className="heading-filters">
            <div className="row align-items-center">
              <div className="ir-filters ir-form">
                <div className="row">
                  <div className="col-xl-5 col-lg-4">
                    <div className="form-group">
                      <div className="search-field">
                        <button className="btn-search">
                          <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                        <input
                          type="text"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="form-control"
                          id="searchReport"
                          placeholder="Search"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-7 col-lg-8">
                    <div className="filter-right">
                      <div className="row gx-2">
                        <div className="col-md-auto">
                          <div className="form-group">
                            <select
                              defaultValue=""
                              onChange={(e) => setSector(e.target.value)}
                              className="form-select"
                            >
                              <option value="">Sector Type</option>
                              {data?.sectors.map((item, index) => (
                                <option key={index} value={item}>
                                  {item}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-auto">
                          <div className="form-group">
                            <select
                              defaultValue=""
                              onChange={(e) => setSecurity(e.target.value)}
                              className="form-select"
                            >
                              <option value="">Security Type</option>
                              {data?.securityTypes.map((item, index) => (
                                <option key={index} value={item}>
                                  {item}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ir-table-secondary table-responsive unaccepted-ratings-table">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Sr No.</th>
                  <th scope="col">Name of Issuer</th>
                  <th scope="col">Sector</th>
                  <th scope="col">Security Type</th>
                  <th scope="col">
                    Issue Size
                    <br />
                    (INR Millions)
                  </th>
                  <th scope="col">
                    Date of
                    <br /> NON Acceptance
                  </th>
                  <th scope="col">
                    Listing Status
                    <br /> (Listed/Proposed to be Listed)
                  </th>
                  <th scope="col">Rating Assigned</th>
                  <th scope="col">
                    Whether The Rating was Accepted by The Issuer,
                    <br /> Subsequent to The Non-Accepted Ratings Disclosure?
                    <br /> (Yes/No)
                  </th>
                  <th scope="col">
                    Date of Subsequent Acceptance
                    <br /> of Final Rating Assigned
                  </th>
                  <th scope="col">
                    Final Rating Accepted
                    <br /> by The Issuer
                  </th>
                  <th scope="col">
                    Whether The Issuer Requested for A Review/Appeal
                    <br /> Subsequent to Disclosure of Unaccepted Rating?
                  </th>
                  <th scope="col">
                    Whether The Review/Appeal of The Disclosed
                    <br /> Unaccepted Rating was Granted by CRA.
                  </th>
                </tr>
              </thead>
              <tbody>
                {fdata?.data.map((item, index) => (
                  <tr key={index}>
                    <td>{fdata.data.length-index}</td>
                    <td>{item.IssuerName}</td>
                    <td>{item.Sector}</td>
                    <td>{item.SecurityType}</td>
                    <td>{item.IssueSize}</td>
                    <td>
                      {/* <DateComponent date={item.NonAcceptanceDate} />
                       */}
                       {item.NonAcceptanceDate}
                    </td>
                    <td>{item.ListingStatus}</td>
                    <td>{item.RatingAssigned}</td>
                    <td>{item.IssuerAcceptedRating}</td>
                    <td>
                      {/* <DateComponent date={item.SubsequentAcceptanceDate} /> */}
                      {item.SubsequentAcceptanceDate}
                    </td>
                    <td>{item.IssuerAccerptedFinalRating}</td>
                    <td>{item.IssuerReviewRequest}</td>
                    <td>{item.CRAGrantReview}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnacceptedRatingsUI;
