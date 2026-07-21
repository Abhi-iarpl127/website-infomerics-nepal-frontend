"use client";
import DateComponent from "@/components/Date";
import { PressReleaseData } from "@/types/common";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function PressRealeaseUI({ slug }: { slug: string }) {

  // const [showRationale, setShowRationale] = useState(false);

  // const [pastRationales, setPastRationales] = useState<PressReleaseData | null>(
  //   null
  // );

  const [pressRelease, setPressRelease] = useState<PressReleaseData | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/company-instruments/past-instruments/${slug}`
      );
      const data = await response.json();

      setPressRelease(data as PressReleaseData);
      // setPastRationales(data as PressReleaseData);
      console.log(data);
    };
    fetchData();
  }, [slug]);

  return (
    <div className="ir-wrapper">
      {/* <!-- Home --> */}
      <div className="home-inner">
        <div className="banner-content">
          <div className="ir-container">
            <h1>{pressRelease?.company?.CompanyName}</h1>
          </div>
        </div>
        <picture>
          <source
            media="(max-width:640px)"
            srcSet="/images/banner-corporate-sector-sm.jpg"
          />
          <img src="/images/banner-corporate-sector.jpg" alt="" />
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
              <li className="breadcrumb-item active" aria-current="page">
                {pressRelease?.company?.CompanyName}
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* <!-- The Cotton Corporation of India Limited --> */}
      <div className="section-ptb company-info">
        <div className="ir-container">
          <div className="ir-heading">
            <h2>{pressRelease?.company?.CompanyName}</h2>
          </div>
          <div className="ci-wrapper">
            {pressRelease?.companyInstrument.map((item, index) => ( 
              <div className="ci-card" key={index}>
                <div className="row">
                  <div className="ci-heading">
                    <p className="date">
                      <DateComponent date={item.Date} />
                    </p>
                    <h5>{item.Title}</h5>
                  </div>
                  <div className="ci-details">
                    <div className="row gx-5">
                      <div className="col-auto">
                        <p>
                          <strong>Instrument Category :</strong>{" "}
                          <span>{item?.instrument?.Title}</span>
                        </p>
                      </div>
                      <div className="col-auto">
                        <p>
                          <strong>Ratings :</strong> <span>{item?.Rating}</span>
                        </p>
                      </div>
                      <div className="col-auto">
                        <p>
                          <strong>Outlook :</strong>{" "}
                          <span>{item?.outlook?.Title || "Nil"}</span>
                        </p>
                      </div>
                      <div className="col-12">
                        <p>
                          <strong>Instrument Amount :</strong>{" "}
                          <span>{item?.InstrumentAmount}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  {item.showInstrumentDetails && (
                    <div className="instrument-details">
                      <h5>Instrument Details</h5>
                      <div className="row">
                        {item.InstrumentDetails &&
                          item.InstrumentDetails.map((detail, detailIndex) => (
                            <div className="col-lg-4 col-det-value" key={detailIndex}>
                              <div className="detail-card">
                                {/* <h5 className="detail-title fs-6 fw-bold">{`Detail ${detailIndex + 1}`}</h5> */}
                                <p className="detail-value mb-0">
                                  {detail.Detail}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="ci-cta">
                  {item.InstrumentDetails &&
                    item.InstrumentDetails.length > 0 && (
                      <div
                        className="btn-ir-bordered"
                        onClick={() => {
                          const updatedInstruments =
                            pressRelease?.companyInstrument.map(
                              (instrument, idx) => {
                                if (idx === index) {
                                  return {
                                    ...instrument,
                                    showInstrumentDetails:
                                      !instrument.showInstrumentDetails,
                                  };
                                }
                                return instrument;
                              }
                            );
                          if (pressRelease) {
                            const updatedPressRelease = {
                              ...pressRelease,
                              companyInstrument: updatedInstruments,
                            };
                            setPressRelease(updatedPressRelease);
                          }
                        }}
                      >
                        View Instruments
                      </div>
                    )}
                  {item.LenderDetail && item.LenderDetail.Document && (
                    <Link  href={
                      item.LenderDetail?.Document?.DocumentFile
                        ?.url || ""
                    } 
                    target="_blank"
                    className="btn-ir-primary">Bank Lenders Details</Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    
      {pressRelease?.company?.LenderDetail?.Document && (
        <div className="section-ptb lender-details">
          <div className="ir-container row">
            <div className="brochure-cta col-md-4">
              <div className="ir-heading">
                <h2>Bank Lenders Details</h2>
              </div>
              <ul>
                {/* {pressRelease?.company?.LenderDetail.Document.map((item, index) => ( */}
                <li>
                  <Link
                    target="_blank"
                    href={
                      pressRelease?.company?.LenderDetail?.Document?.DocumentFile
                        ?.url || ""
                    }
                  >
                    {pressRelease?.company?.LenderDetail?.Document?.DocumentTitle}
                  </Link>
                </li>
                {/* ))} */}
              </ul>
            </div>
          </div>
        </div>
      )}
      {/* <!-- Lender Details Rated --> */}
      {pressRelease?.company?.LenderDetail &&
        pressRelease?.company?.LenderDetail.LenderDetailsRated &&
        pressRelease?.company?.LenderDetail.LenderDetailsRated.length > 0 && (
          <div className="section-ptb lender-details bg-grey">
            <div className="ir-container">
              <div className="ir-heading">
                <h2>{pressRelease?.company.LenderDetail.Title}</h2>
              </div>
              <div className="ir-table table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Type of Facility</th>
                      <th scope="col">Instrument</th>
                      <th scope="col">Bank Name</th>
                      <th scope="col">Rated Amount (Rs. Cr.)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pressRelease?.company.LenderDetail.LenderDetailsRated.map(
                      (item, index) => (
                        <tr key={index}>
                          <td>{item.TypeofFacility}</td>
                          <td>{item.Instrument}</td>
                          <td>{item.BankName}</td>
                          <td>{item.RatedAmount}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
