"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { getNonReceiptOfNonDefaultStatementUI } from "@/services/APIServices";
import { RegulatoryDisclosersUnacceptedRatingsData } from "@/types/common";
// import DateComponent from "@/components/Date";
interface PageProps {
  title: string;
  description: string;
  image: string;
  s_image: string;
}
const NonReceiptOfNonDefaultStatementUI = ({
  title,
  description,
  image,
  s_image,
}: PageProps) => {
  const [search, setSearch] = useState("");
  const [data, setData] =
    useState<RegulatoryDisclosersUnacceptedRatingsData | null>(null);
  const [fdata, setfData] =
    useState<RegulatoryDisclosersUnacceptedRatingsData | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getNonReceiptOfNonDefaultStatementUI();
        console.log("response", response);

        setData(response as RegulatoryDisclosersUnacceptedRatingsData);
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
          return item.CompanyName?.toLowerCase().includes(search.toLowerCase()); // Return true to keep the item
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
      {/* <!-- Unaccepted Ratings --> */}
      <div className="section-ptb section-start unaccepted-ratings">
        <div className="ir-container">
          <div className="heading-filters">
            <div className="row align-items-center">
              <div className="ir-filters ir-form">
                <div className="row">
                  <div className="col-lg-6">
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
                  <div className="col-lg-6 faqs-nds-cta">
                    {fdata?.meta?.PageData?.blocks &&
                      fdata.meta.PageData.blocks.length > 0 && (
                        <div className="">
                          {fdata.meta.PageData.blocks.map((block) => (
                            <Link
                              key={block.id}
                              href={block.DocumentFile?.url || "#"}
                              className="btn-ir-secondary"
                              target="_blank"
                            >
                              {block.DocumentTitle}
                            </Link>
                          ))}
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h2 className="mb-3">{fdata?.meta?.MasterData?.Title}</h2>
          <div className="ir-table-secondary table-responsive non-receipt-of-non-default-statement">
            <div className="row">
              <div
                className={`${
                  fdata?.meta?.PageData?.blocks &&
                  fdata.meta.PageData.blocks.length > 0
                    ? "col-12"
                    : "col-12"
                }`}              >
                
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Sr No.</th>
                      <th scope="col">COMPANY NAME</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fdata?.data.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.CompanyName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <h3 className="update-note">
            Updated on{" "}
            {/* <DateComponent date={fdata?.meta?.MasterData?.uploadDate || ""} /> */}
            {fdata?.meta?.MasterData?.uploadDate}
          </h3>
          {fdata?.meta?.hasArchivedData && (
            <div className="regulatory-link-wrapper">
              <div className="row gx-xl-5">
                <div className="col-lg-4 col-regulatory-link">
                  <Link
                    href="/regulatory-disclosure/non-receipt-of-non-default-statement/archive"
                    className="regulatory-link"
                  >
                    Archive
                    <div className="btn-ir-cta">
                      <i className="fa-solid fa-arrow-right"></i>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NonReceiptOfNonDefaultStatementUI;
