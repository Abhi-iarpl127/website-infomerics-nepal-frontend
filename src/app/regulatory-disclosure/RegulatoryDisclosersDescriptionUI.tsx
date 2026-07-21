"use client";

import { DescriptionData, ImageData } from "@/types/common";
import Link from "next/link";

// import { Accordion } from "react-bootstrap";
interface PageProps {
  PageTitle: string;
  Subtitle: string;
  Banner: ImageData;
  MobileBanner: ImageData;
  innerData: DescriptionData;
  mainID: string;
}

const RegulatoryDisclosersDescriptionUI = ({
  PageTitle,
  Subtitle,
  Banner,
  MobileBanner,
  innerData,
  mainID
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
          <source
            media="(max-width:640px)"
            srcSet={MobileBanner?.url || ""}
          />
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
                {innerData?.active?.Title} {innerData?.active.isArchive?"(Archived)":""}
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* <!-- SEBI Master Circular --> */}
      {/* {JSON.stringify(innerData)} */}
      {innerData.active.__component == "shared.description-data"&& (
      <div className="section-ptb section-start master-circular">
        <div className="ir-container">
          <div dangerouslySetInnerHTML={{ __html: innerData.active.Description }} />
          {innerData.archived &&
            innerData.archived.length > 0 && (
              <>
              <div className="archive-policy">
                <h3>Archives</h3>
                {innerData.archived.map((archive) => (
                  <div key={archive.id}>
                    <Link href={`/regulatory-disclosure/details/${mainID}/${archive.id}`}>
                      {archive.Title} {archive.ArchiveDate}
                    </Link>
                  </div>
                ))}
                </div>
              </>
            )}
        </div>
      </div>
      )}
    </div>
  );
};

export default RegulatoryDisclosersDescriptionUI;
