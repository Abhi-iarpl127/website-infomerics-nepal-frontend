"use client";
import { Block, Report } from "@/types/common";
import React,{useEffect,useState} from "react";
import { getData } from "@/services/APIServices";
import Link from "next/link";
import DateComponent from "../Date";

const MediaCoverage = ( {data}: {data: Block}) => {

  const [swiperData, setSwiperData] = useState<Report[]>([]);

  useEffect(() => {
    // setSwiperData(data.services);
    async function fetchData() {
      const response = await getData(data.category?.slug || "",1,data.Limit);
      setSwiperData(response.data as Report[]);
    }
    fetchData();
  }, [data]);

  if(swiperData.length === 0) return null;
  
  return (
    <div className={`section-ptb media-coverage dual-cta `} style={{backgroundColor:data.BackgroundColor}}>
    <div className="ir-container">
      <div className="ir-heading lg-center">
        <h2>{data.Title}</h2>
        <p dangerouslySetInnerHTML={{ __html: data.Subtitle || "" }} />
      </div>
      <div className="row gx-xl-5">
        <div className="col-lg-6 col-latest-media">
          <div className="latest-media-card">
            <Link href={swiperData[0].slug || swiperData[0].Link}  target={swiperData[0].Target} className="lm-thumb">
              <div className="btn-ir-cta">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.7501 1V10.75C13.7501 10.9489 13.671 11.1397 13.5304 11.2803C13.3897 11.421 13.199 11.5 13.0001 11.5C12.8011 11.5 12.6104 11.421 12.4697 11.2803C12.3291 11.1397 12.2501 10.9489 12.2501 10.75V2.81031L1.53068 13.5306C1.38995 13.6714 1.19907 13.7504 1.00005 13.7504C0.801028 13.7504 0.610156 13.6714 0.469426 13.5306C0.328695 13.3899 0.249634 13.199 0.249634 13C0.249634 12.801 0.328695 12.6101 0.469426 12.4694L11.1897 1.75H3.25005C3.05114 1.75 2.86037 1.67098 2.71972 1.53033C2.57907 1.38968 2.50005 1.19891 2.50005 1C2.50005 0.801088 2.57907 0.610322 2.71972 0.46967C2.86037 0.329018 3.05114 0.25 3.25005 0.25H13.0001C13.199 0.25 13.3897 0.329018 13.5304 0.46967C13.671 0.610322 13.7501 0.801088 13.7501 1Z" fill="#231F20"/>
                </svg>
              </div>
              <img src={swiperData[0].ListingImage?.url
                      } className="thumb" alt=""/>
              <img src="images/default-16-9.jpg" className="default" alt="" />
            </Link>
            <div className="caption">
              <p className="date"><DateComponent date={swiperData[0].Date} /></p>
              <h3>{swiperData[0].Title}</h3>
              <p dangerouslySetInnerHTML={{ __html: swiperData[0].Subtitle || "" }} />
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-recent-media">
          <Link href={swiperData[1].Link  || swiperData[1].ListingPageButton?.DocumentFile?.url  ||swiperData[1].slug ||  "#"}  target={swiperData[1].Target =="New"?"_blank":"_self"} className="sm-media-card">
            <div className="row align-items-center">
              <div className="col-auto">
                <div className="lm-thumb">
                  <img src={swiperData[1].ListingImage?.url
                      } alt=""/>
                </div>
              </div>
              <div className="col">
                <div className="caption">
                  <p className="date"><DateComponent date={swiperData[1].Date} /></p>
                  <h3>{swiperData[1].Title}</h3>
                  <div className="btn-ir-cta blue">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.7501 1V10.75C13.7501 10.9489 13.671 11.1397 13.5304 11.2803C13.3897 11.421 13.199 11.5 13.0001 11.5C12.8011 11.5 12.6104 11.421 12.4697 11.2803C12.3291 11.1397 12.2501 10.9489 12.2501 10.75V2.81031L1.53068 13.5306C1.38995 13.6714 1.19907 13.7504 1.00005 13.7504C0.801028 13.7504 0.610156 13.6714 0.469426 13.5306C0.328695 13.3899 0.249634 13.199 0.249634 13C0.249634 12.801 0.328695 12.6101 0.469426 12.4694L11.1897 1.75H3.25005C3.05114 1.75 2.86037 1.67098 2.71972 1.53033C2.57907 1.38968 2.50005 1.19891 2.50005 1C2.50005 0.801088 2.57907 0.610322 2.71972 0.46967C2.86037 0.329018 3.05114 0.25 3.25005 0.25H13.0001C13.199 0.25 13.3897 0.329018 13.5304 0.46967C13.671 0.610322 13.7501 0.801088 13.7501 1Z" fill="#231F20"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          {/* {JSON.stringify(swiperData[2])} */}
          <Link href={swiperData[2].Link  || swiperData[2].ListingPageButton?.DocumentFile?.url ||swiperData[2].slug ||  "#"}  target={swiperData[2].Target} className="sm-media-card">
            <div className="row align-items-center">
              <div className="col-auto">
                <div className="lm-thumb">
                  <img src={swiperData[2].ListingImage?.url
                      } alt=""/>
                </div>
              </div>
              <div className="col">
                <div className="caption">
                  <p className="date"><DateComponent date={swiperData[2].Date} /></p>
                  <h3>{swiperData[2].Title}</h3>
                  <div className="btn-ir-cta blue">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.7501 1V10.75C13.7501 10.9489 13.671 11.1397 13.5304 11.2803C13.3897 11.421 13.199 11.5 13.0001 11.5C12.8011 11.5 12.6104 11.421 12.4697 11.2803C12.3291 11.1397 12.2501 10.9489 12.2501 10.75V2.81031L1.53068 13.5306C1.38995 13.6714 1.19907 13.7504 1.00005 13.7504C0.801028 13.7504 0.610156 13.6714 0.469426 13.5306C0.328695 13.3899 0.249634 13.199 0.249634 13C0.249634 12.801 0.328695 12.6101 0.469426 12.4694L11.1897 1.75H3.25005C3.05114 1.75 2.86037 1.67098 2.71972 1.53033C2.57907 1.38968 2.50005 1.19891 2.50005 1C2.50005 0.801088 2.57907 0.610322 2.71972 0.46967C2.86037 0.329018 3.05114 0.25 3.25005 0.25H13.0001C13.199 0.25 13.3897 0.329018 13.5304 0.46967C13.671 0.610322 13.7501 0.801088 13.7501 1Z" fill="#231F20"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link href={swiperData[3].Link   || swiperData[3].ListingPageButton?.DocumentFile?.url ||swiperData[3].slug ||  "#"}  target={swiperData[3].Target}    className="sm-media-card">
            <div className="row align-items-center">
              <div className="col-auto">
                <div className="lm-thumb">
                  <img src={swiperData[3].ListingImage?.url
                      } alt=""/>
                </div>
              </div>
              <div className="col">
                <div className="caption">
                  <p className="date"><DateComponent date={swiperData[3].Date} /></p>   
                  <h3>{swiperData[3].Title}</h3>
                  <div className="btn-ir-cta blue">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.7501 1V10.75C13.7501 10.9489 13.671 11.1397 13.5304 11.2803C13.3897 11.421 13.199 11.5 13.0001 11.5C12.8011 11.5 12.6104 11.421 12.4697 11.2803C12.3291 11.1397 12.2501 10.9489 12.2501 10.75V2.81031L1.53068 13.5306C1.38995 13.6714 1.19907 13.7504 1.00005 13.7504C0.801028 13.7504 0.610156 13.6714 0.469426 13.5306C0.328695 13.3899 0.249634 13.199 0.249634 13C0.249634 12.801 0.328695 12.6101 0.469426 12.4694L11.1897 1.75H3.25005C3.05114 1.75 2.86037 1.67098 2.71972 1.53033C2.57907 1.38968 2.50005 1.19891 2.50005 1C2.50005 0.801088 2.57907 0.610322 2.71972 0.46967C2.86037 0.329018 3.05114 0.25 3.25005 0.25H13.0001C13.199 0.25 13.3897 0.329018 13.5304 0.46967C13.671 0.610322 13.7501 0.801088 13.7501 1Z" fill="#231F20"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="know-more-cta">
      {data.Button && (<Link href={data.Button?.ButtonLink || data.Button?.page?.slug || ""} className="btn-know-more">{data.Button?.ButtonText || ""} <i className={`fa-solid ${data.Button.faclass}`}></i></Link>)}
      </div>
    </div>
  </div>
  );
};

export default MediaCoverage;