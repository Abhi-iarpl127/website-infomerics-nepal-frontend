"use client";
import {
  RatingArchiveDetailData1
} from "@/services/APIServices";
import { RegulatoryDisclosersData } from "@/types/common";
import Link from "next/link";
import { useEffect, useState } from "react";
interface PageProps {
  archive?: boolean;
  slug: string;
  slug1?: string;
  slug2?: string;
  image?: string | null;
  s_image?: string | null;
}

const RatingsUI = ({
  archive = true,
  slug,
  slug1="",
  slug2 = "",
  image = null,
  s_image = null,
}: PageProps) => {
  const [data, setData] = useState<RegulatoryDisclosersData | null>(null);
  console.log(slug1, "slug1");
  useEffect(() => {
    const fetchData = async () => {
      
        let response = null;
        
          response = await RatingArchiveDetailData1(
            slug,
            slug1,
            slug2
          );
       
        console.log(response, "getRegulatoryDisclosersListingDetailData");
        setData(response);
      
    };
    fetchData();
  }, []);

  if (!data) {
    return <div></div>;
  }
  // const {title, description, image, s_image, isSEBI} = props;

  return (
    <div className="ir-wrapper">
      {/* <!-- Home --> */}
      <div className="home-inner">
        <div className="banner-content">
          <div className="ir-container">
            <h1>{data.Title}</h1>
            {data.Subtitle && <p>{data.Subtitle}</p>}
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
                {data.Title} {slug1 && `${archive ? "(Archive)" : ""}`}
              </li>
            </ol>
          </nav>
        </div>
      </div>
        </div>
        {/* <picture>
          <source
            media="(max-width:640px)"
            srcSet={data.MobileBanner?.url || s_image || ""}
          />
          <img src={data.Banner?.url || image || ""} alt="" />
        </picture> */}
      </div>
   
      {/* <!-- SEBI Master Circular --> */}
      <div className="section-ptb master-circular">
        {/* {JSON.stringify(data)} */}
        <div className="ir-container">
          <div dangerouslySetInnerHTML={{ __html: data.Description }} />

          {data.Listing &&
            data.Listing.length > 0 &&
            data.Listing.map((item, index) => (
              <ul key={index}>
                <li>
                  {item.slug && item?.Document?.length == 0 ? (
                    <Link
                      href={`/regulatory-disclosure/${slug}${
                        archive ? "/archive" : ""
                      }${slug1 && slug1 != "" ? `/${slug1}` : ""}${slug2 && slug2 != "" ? `/${slug2}` : ""}/${
                        item.id
                      }`}
                      className="regulatory-link"
                    >
                      {item.Title}
                    </Link>
                  ) :  item?.Document?.length == 0 ? (
                    <h5>{item.Title}</h5>
                  ) : (
                    <></>
                  )}

                  {item?.Document?.map((document, index) => (
                    <div className="regulatory-footer-link" key={index}>
                      <div className="row gx-xl-5">
                        <div className="col-lg-6">
                          <Link
                            href={`${document?.DocumentFile?.url}`}
                            className="regulatory-link"
                            target="_blank"
                          >
                            {document.DocumentTitle}
                            <div className="btn-ir-cta">
                              <i className="fa-solid fa-file-pdf"></i>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </li>
              </ul>
            ))}
          {data.ArchiveRegulatoryListing &&
            data.ArchiveRegulatoryListing.length > 0 && (
              <>
                <h5>Archives</h5>

                {data.ArchiveRegulatoryListing.map((document) => (
                  <div className="regulatory-footer-link" key={document.id}>
                    <div className="row gx-xl-5">
                      <div className="col-lg-6">
                        <Link
                          href={`/regulatory-disclosure/${slug}/archive/${document.id}`}
                          className="regulatory-link"
                          target="_blank"
                        >
                          {document.Title} {document.ArchiveDate}
                          <div className="btn-ir-cta">
                            <i className="fa-solid fa-arrow-right"></i>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
        </div>
      </div>
    </div>
  );
};

export default RatingsUI;
