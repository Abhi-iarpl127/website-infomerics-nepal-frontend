"use client";
import React, { useEffect, useState } from "react";
import { RegulatoryDisclosersUnacceptedRatingsData } from "@/types/common";
import DateComponent from "@/components/Date";

import { getRegulatoryDisclosersDelayInReviews } from "@/services/APIServices";
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
  // const [sector, setSector] = useState("");
  // const [security, setSecurity] = useState("");

  const [data, setData] =
    useState<RegulatoryDisclosersUnacceptedRatingsData | null>(null);
  const [fdata, setfData] =
    useState<RegulatoryDisclosersUnacceptedRatingsData | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRegulatoryDisclosersDelayInReviews();

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
          return item.IssuerName.toLowerCase().includes(search.toLowerCase()); // Return true to keep the item
        });
      }

      setfData({ ...fdata, data: filterData });
    }
  }, [search]);

  return (
    <div className="ir-wrapper">
      {/* <!-- Home --> */}
      <div className="home-inner">
        <div className="banner-content">
          <div className="ir-container">
            <h1>{title}</h1>
            {description && <p>{description}</p>}
          </div>
        </div>
        <picture>
          <source media="(max-width:640px)" srcSet={s_image} />
          <img src={image} alt="" />
        </picture>
      </div>
      {/* <!-- Breadcrumb --> */}
      <div className="ir-breadcrumb">
        <div className="ir-container">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/regulatory-disclosure">Regulatory Disclosures</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {title}
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* <!-- Unaccepted Ratings --> */}
      <div className="section-ptb section-start unaccepted-ratings">
        <div className="ir-container">
          <div className="heading-filters">
            <div className="row align-items-center">
              <div className="ir-filters ir-form">
                <div className="row">
                  <div className="col-lg-4">
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
                  <div className="col-lg-8"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="ir-table table-responsive delay-in-review">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Sr No.</th>
                  <th scope="col">Name of Issuer</th>
                  <th scope="col">Name / Type of Instrument</th>
                  <th scope="col">Size of the issue (Rs. in Crores)</th>
                  <th scope="col">Date of last review/ Rating</th>
                  <th scope="col">Reasons for delay in periodic review</th>
                  <th scope="col">Hyperlink to the last Press Release</th>
                </tr>
              </thead>
              <tbody>
                {fdata?.data.map((item, index1) => {
                  return item.InstrumentName?.map((instrument, index2) => (
                    <tr key={`${index1}-${index2}`}>
                      {index2==0 && <td rowSpan={item?.InstrumentName?.length || 0}>{item.srNo}</td>}
                      {index2==0 && <td rowSpan={item?.InstrumentName?.length || 0}>{item.IssuerName}</td>}
                      <td>{instrument.Title}</td>
                      <td>{instrument.IssueSize}</td>
                      {index2==0 && <td rowSpan={item?.InstrumentName?.length || 0}> <DateComponent date={item.LastReviewDate || ""} /></td>}
                      {index2==0 && <td rowSpan={item?.InstrumentName?.length || 0}>{item.DelayReasons}</td>}
                      {index2==0 && <td rowSpan={item?.InstrumentName?.length || 0}> 
                        {item.PressRelease && (
                          <Link href={item.PressRelease.url} target="_blank" rel="noopener noreferrer">
                            {item.PressRelease.Title || "View Press Release"}
                          </Link>
                        )}
                      </td>}
                    </tr>
                  ));
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnacceptedRatingsUI;
