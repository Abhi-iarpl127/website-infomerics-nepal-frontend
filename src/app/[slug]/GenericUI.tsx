"use client";
import Link from "next/link";
// import { useEffect, useState } from "react";
import {  Block } from "@/types/common";
// import { getData } from "@/services/APIServices";
import EventNSeminar from "@/components/sections/EventNSeminar";
import ContactUI from "@/components/sections/ContactUI";
// import Fancybox from "@/components/FancyBox";
const GenericUI = ({
  title,
  description,
  // image,
  // s_image,
  blocks,
}: {
  title: string;
  description: string;
  image: string;
  s_image: string;
  slug: string;
  blocks?: Block[];
}) => {




  return (
    <div className="ir-wrapper">
      {/* <!-- Home --> */}
      <div className="home-inner">
        <div className="banner-content">
          <div className="ir-container">
            <h1>{title}</h1>
            <p dangerouslySetInnerHTML={{ __html: description }} />
          </div>
            {/* <!-- Breadcrumb --> */}
      <div className="ir-breadcrumb">
        <div className="ir-container">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link href="/">Home</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{title}</li>
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
    
      {/* <!-- Overview --> */}
      <div className="section-ptb section-start section-overview">
        <div className="ir-container">
          {blocks?.map((block, index) => (
          <div className="row gx-lg-5" key={index}>
            {block["__component"] === "shared.title-description" &&(
            <div className="col-lg-12">
              <div className="ir-heading">
                <h2>{block.Title}</h2>
              </div>
              <div dangerouslySetInnerHTML={{ __html: block.Description || "" }} />
            </div>
)}
          </div>
          ))}
        </div>
      </div>
      {/* <!-- Industry Reports --> */}
      {/* <div className="section-ptb industry-reports bg-grey">
        <div className="ir-container">
          
        </div>
      </div> */}
      {/* <EventNSeminar /> */}
      <ContactUI title={"Contact Us"} image="/images/bg_connect_with_us_011998b9d5.jpg" />
    </div>
  );
};
export default GenericUI;