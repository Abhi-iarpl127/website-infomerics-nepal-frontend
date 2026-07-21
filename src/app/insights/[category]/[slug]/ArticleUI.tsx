"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getArticleDetail } from "@/services/APIServices";
import { ArticleData } from "@/types/common";
import DateComponent from "@/components/Date";
interface ArticleUIProps {
  slug: string;
  category: string;
}

const ArticleUI = ({ slug }: ArticleUIProps) => {
  // const articleData = getArticleDetail(slug);
  const [articleData, setArticleData] = useState<ArticleData | null>(null);
  useEffect(() => {
    async function fetchData() {
      const response = await getArticleDetail(slug || "");
      setArticleData(response.data as ArticleData);
    }
    console.log("slug",slug);
    fetchData();
  }, []);

  return (
    <div className="ir-wrapper">
      {/* {JSON.stringify(articleData)} */}
      {/* <!-- Home --> */}
      <div className="home-inner">
        <div className="banner-content">
          <div className="ir-container">
            <h1>{articleData?.Title}</h1>
            <p dangerouslySetInnerHTML={{ __html: articleData?.Subtitle || "" }} />
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
                <Link href="/publication">Publication</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href={`/publication/${articleData?.category.slug}`}>{articleData?.category.name}</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {articleData?.Title}
              </li>
            </ol>
          </nav>
        </div>
      </div>
        </div>
        {/* <picture>
          <source
            media="(max-width:640px)"
            srcSet={articleData?.InnerPageBannerMobile?.url}
          />
          <img src={articleData?.InnerPageBanner?.url} alt="" />
        </picture> */}
      </div>

      {/* <!-- SEBI Master Circular --> */}
      <div className="section-ptb section-overview">
        <div className="ir-container">
          <div className="row gx-xl-5">
            <div className="col-lg-5 col-overview-img">
              <div className="overview-img">
                <img className="thumb" src={articleData?.ListingImage?.url} />
                <img className="default" src="/images/default-overview.jpg" />
              </div>
            </div>
            <div className="col-lg-7">
              <div className="overview-content">
                <div className="ir-heading">
                  <h2>{articleData?.Title}</h2>
                  <p><DateComponent date={articleData?.Date || ""} /></p>
                </div>
                <div dangerouslySetInnerHTML={{ __html: articleData?.Description || "" }}></div>
                {articleData?.Documents.map((document) => (
                  <div className="read-more-cta" key={document.DocumentFile.url}>
                    <Link href={document.DocumentFile.url} target="_blank" className="btn-know-more">
                      {document.DocumentTitle} <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 12.3521C18 12.551 17.921 12.7417 17.7803 12.8824C17.6397 13.023 17.4489 13.1021 17.25 13.1021H15V14.6021H16.5C16.6989 14.6021 16.8897 14.6811 17.0303 14.8217C17.171 14.9624 17.25 15.1531 17.25 15.3521C17.25 15.551 17.171 15.7417 17.0303 15.8824C16.8897 16.023 16.6989 16.1021 16.5 16.1021H15V17.6021C15 17.801 14.921 17.9917 14.7803 18.1324C14.6397 18.273 14.4489 18.3521 14.25 18.3521C14.0511 18.3521 13.8603 18.273 13.7197 18.1324C13.579 17.9917 13.5 17.801 13.5 17.6021V12.3521C13.5 12.1531 13.579 11.9624 13.7197 11.8217C13.8603 11.6811 14.0511 11.6021 14.25 11.6021H17.25C17.4489 11.6021 17.6397 11.6811 17.7803 11.8217C17.921 11.9624 18 12.1531 18 12.3521ZM5.625 14.2271C5.625 14.9232 5.34844 15.5909 4.85616 16.0832C4.36387 16.5755 3.69619 16.8521 3 16.8521H2.25V17.6021C2.25 17.801 2.17098 17.9917 2.03033 18.1324C1.88968 18.273 1.69891 18.3521 1.5 18.3521C1.30109 18.3521 1.11032 18.273 0.96967 18.1324C0.829018 17.9917 0.75 17.801 0.75 17.6021V12.3521C0.75 12.1531 0.829018 11.9624 0.96967 11.8217C1.11032 11.6811 1.30109 11.6021 1.5 11.6021H3C3.69619 11.6021 4.36387 11.8786 4.85616 12.3709C5.34844 12.8632 5.625 13.5309 5.625 14.2271ZM4.125 14.2271C4.125 13.9287 4.00647 13.6425 3.7955 13.4316C3.58452 13.2206 3.29837 13.1021 3 13.1021H2.25V15.3521H3C3.29837 15.3521 3.58452 15.2335 3.7955 15.0225C4.00647 14.8116 4.125 14.5254 4.125 14.2271ZM12.375 14.9771C12.375 15.8722 12.0194 16.7306 11.3865 17.3635C10.7535 17.9965 9.89511 18.3521 9 18.3521H7.5C7.30109 18.3521 7.11032 18.273 6.96967 18.1324C6.82902 17.9917 6.75 17.801 6.75 17.6021V12.3521C6.75 12.1531 6.82902 11.9624 6.96967 11.8217C7.11032 11.6811 7.30109 11.6021 7.5 11.6021H9C9.89511 11.6021 10.7535 11.9576 11.3865 12.5906C12.0194 13.2235 12.375 14.0819 12.375 14.9771ZM10.875 14.9771C10.875 14.4798 10.6775 14.0029 10.3258 13.6512C9.97419 13.2996 9.49728 13.1021 9 13.1021H8.25V16.8521H9C9.49728 16.8521 9.97419 16.6545 10.3258 16.3029C10.6775 15.9512 10.875 15.4743 10.875 14.9771ZM0.75 8.60205V1.85205C0.75 1.45423 0.908035 1.0727 1.18934 0.791391C1.47064 0.510086 1.85218 0.352051 2.25 0.352051H11.25C11.3485 0.351974 11.4461 0.371308 11.5371 0.408949C11.6282 0.44659 11.7109 0.5018 11.7806 0.571426L17.0306 5.82143C17.1003 5.89113 17.1555 5.97387 17.1931 6.06491C17.2307 6.15596 17.2501 6.25353 17.25 6.35205V8.60205C17.25 8.80096 17.171 8.99173 17.0303 9.13238C16.8897 9.27303 16.6989 9.35205 16.5 9.35205C16.3011 9.35205 16.1103 9.27303 15.9697 9.13238C15.829 8.99173 15.75 8.80096 15.75 8.60205V7.10205H11.25C11.0511 7.10205 10.8603 7.02303 10.7197 6.88238C10.579 6.74173 10.5 6.55096 10.5 6.35205V1.85205H2.25V8.60205C2.25 8.80096 2.17098 8.99173 2.03033 9.13238C1.88968 9.27303 1.69891 9.35205 1.5 9.35205C1.30109 9.35205 1.11032 9.27303 0.96967 9.13238C0.829018 8.99173 0.75 8.80096 0.75 8.60205ZM12 5.60205H14.6897L12 2.91236V5.60205Z" fill="#fff"/></svg>
                  </Link>
                </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleUI;
