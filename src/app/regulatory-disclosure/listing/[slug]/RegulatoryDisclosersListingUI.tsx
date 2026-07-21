"use client";

import { ListingData1, ImageData } from "@/types/common";
import Link from "next/link";
import ListingData from "../../ListingData";

// import { Accordion } from "react-bootstrap";
interface PageProps {
  PageTitle: string;
  Subtitle: string;
  Banner: ImageData;
  MobileBanner: ImageData;
  innerData: ListingData1;
  mainID: string;
}

const RegulatoryDisclosersListingUI = ({
  PageTitle,
  Subtitle,
  Banner,
  MobileBanner,
  innerData,
}: PageProps) => {
  return (
    <div className="ir-wrapper">
      {/* <!-- Home --> */}
      <div className="home-inner">
        <div className="banner-content">
          <div className="ir-container">
            <h1>{PageTitle}</h1>
            {Subtitle && <p>{Subtitle}</p>}
          </div>
        </div>
        <picture>
          <source media="(max-width:640px)" srcSet={MobileBanner?.url || ""} />
          <img src={Banner?.url || ""} alt="" />
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
                {innerData?.Title} {innerData?.isArchive ? "(Archived)" : ""}
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* <!-- SEBI Master Circular --> */}
      {/* {JSON.stringify(innerData)} */}
      <div className="section-ptb regulatory-disclosers">
        <div className="ir-container">
          <ListingData
            parTitle={innerData.Title}
            data={innerData.blocks}
            title={innerData.Title}
            hasArchive={innerData.hasArchive}
            id={innerData.id}
          />
        </div>
      </div>
    </div>
  );
};

export default RegulatoryDisclosersListingUI;
