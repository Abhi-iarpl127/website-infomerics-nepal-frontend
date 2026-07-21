"use client";
import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCorporateGovernanceData } from "@/services/APIServices";
import { CorporateGovernanceData } from "@/types/common";

const CorporateGovernanceUI = ({
  title,
  // description,
  // image,
  // s_image,
  slug = "",
}: {
  title: string;
  description: string;
  image: string;
  s_image: string;
  slug?: string;
}) => {
  console.log("sbslug", slug);

  const [data, setData] = useState<CorporateGovernanceData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCorporateGovernanceData();
        console.log(response);
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch home page data:", error);
        setData([]); // or handle the error as appropriate
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
            <h1>{title}</h1>
            {/* <p dangerouslySetInnerHTML={{ __html: description }} /> */}
          </div>
             {/* <!-- Breadcrumb --> */}
      <div className="ir-breadcrumb">
        <div className="ir-container">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item active">Corporate Governance</li>
            </ol>
          </nav>
        </div>
      </div>

        </div>
        {/* <picture>
          <source media="(max-width:640px)" srcSet={s_image} />
          <img src={image} alt={title} />
        </picture> */}
      </div>
   
      <div className="section-ptb">
        <div className="ir-container">
          <div className="articles-row">
          <div className="row">
            {data.map((item) => (
              <div className="col-xl-4 col-md-6 col-articles" key={item.id}>
                {" "}
                <Link
                  className="article-card"
                  href={`/corporate-governance/${item.slug}`}
                >
                  <h3>{item.Title}</h3>
                  <div className="btn-ir-cta">
                    <svg width="10" height="10" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.7501 1V10.75C13.7501 10.9489 13.671 11.1397 13.5304 11.2803C13.3897 11.421 13.199 11.5 13.0001 11.5C12.8011 11.5 12.6104 11.421 12.4697 11.2803C12.3291 11.1397 12.2501 10.9489 12.2501 10.75V2.81031L1.53068 13.5306C1.38995 13.6714 1.19907 13.7504 1.00005 13.7504C0.801028 13.7504 0.610156 13.6714 0.469426 13.5306C0.328695 13.3899 0.249634 13.199 0.249634 13C0.249634 12.801 0.328695 12.6101 0.469426 12.4694L11.1897 1.75H3.25005C3.05114 1.75 2.86037 1.67098 2.71972 1.53033C2.57907 1.38968 2.50005 1.19891 2.50005 1C2.50005 0.801088 2.57907 0.610322 2.71972 0.46967C2.86037 0.329018 3.05114 0.25 3.25005 0.25H13.0001C13.199 0.25 13.3897 0.329018 13.5304 0.46967C13.671 0.610322 13.7501 0.801088 13.7501 1Z" fill="#231F20"/>
                    </svg>
                  </div>
                </Link>
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
