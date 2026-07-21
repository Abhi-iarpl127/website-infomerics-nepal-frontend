"use client";
import React,{ useEffect, useState }  from "react";
import Link from "next/link";
import { getCorporateGovernanceDetailData } from "@/services/APIServices";
import { CorporateGovernanceData } from "@/types/common";

const CorporateGovernanceUI = ({
  title,
  description,
  image,
  s_image,
  slug = "",
}: {
  title: string;
  description: string;
  image: string;
  s_image: string;
  slug?: string;
}) => {
 
  const [pageTitle, setPageTitle] = useState<string>(title);
  const [pageDescription] = useState<string>(description);
  const [data, setData] = useState<CorporateGovernanceData | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCorporateGovernanceDetailData(slug);
        console.log(response);
        setData(response.data);
        console.log("response.data",response.data);
        setPageTitle(response.data.Title);
        // setPageDescription(response.data.Description);
      } catch (error) {
        console.error("Failed to fetch home page data:", error);
        setData(null); // or handle the error as appropriate
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return <div></div>;
  }

  return (
    <div className="ir-wrapper">
      {/* <!-- Home --> */}
      <div className="home-inner">
        <div className="banner-content">
          <div className="ir-container">
            <h1>{pageTitle}</h1>
            <p dangerouslySetInnerHTML={{ __html: pageDescription }} />
          </div>
            <div className="ir-breadcrumb">
        <div className="ir-container">
          <nav>
            <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item"><Link href="/corporate-governance">{title}</Link></li>  
              <li className="breadcrumb-item active" aria-current="page">
                  {pageTitle}
                </li>
                
            </ol>
          </nav>
        </div>
      </div>
        </div>
        {/* <picture>
          <source media="(max-width:640px)" srcSet={s_image} />
          <img src={image} alt={pageTitle} />
        </picture> */}
      </div>
      {/* <!-- Breadcrumb --> */}
    
      <div className="section-ptb section-start master-circular services-content">
        <div className="ir-container">
          <div dangerouslySetInnerHTML={{ __html: data?.Description }} />
          <div className="regulatory-link-wrapper">
              <div className="row gx-xl-5">
                {data?.Documents.map((item,index) => (
                <div className="col-lg-6 col-regulatory-link" key={index}>
                  <a href={item?.DocumentFile?.url || "#"} className="regulatory-link pdf" target="_blank">
                    {item?.DocumentTitle}
                    <div className="btn-ir-cta"><i className="fa-solid fa-arrow-right"></i></div>
                  </a>
                </div>
                ))}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CorporateGovernanceUI;
