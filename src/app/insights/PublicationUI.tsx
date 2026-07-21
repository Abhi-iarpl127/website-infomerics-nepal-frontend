"use client";

import Link from "next/link";

import MainSlider from "@/components/sections/MainSlider";
import BlockRenderer from "@/components/BlockRenderer";
// import { HomePageData } from "@/types/common";

// import HomePage from "@/components/pages/Home";
import { getPageData } from "@/services/APIServices";
import { HomePageData } from "@/types/common";
import { useEffect, useState } from "react";

const PublicationUI = ({
  title,
  description,
  image,
  s_image,
}: {
  title: string;
  description: string;
  image: string;
  s_image: string;
}) => {
  const [data, setData] = useState<HomePageData | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPageData("publication");
        console.log(response);
        setData(response.data);
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
            <h1>{title}</h1>
            <p dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        </div>
        <picture>
          <source media="(max-width:640px)" srcSet={s_image} />
          <img src={image} alt={title} />
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
                {title}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {data.Banners && data.Banners.length > 0 && (
        <MainSlider data={data.Banners} />
      )}
      {data.blocks && data.blocks.length > 0 && (
        <BlockRenderer blocks={data.blocks} />
      )}
    </div>
  );
};

export default PublicationUI;
