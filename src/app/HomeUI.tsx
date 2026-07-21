"use client";

import MainSlider from "@/components/sections/MainSlider";
import BlockRenderer from "@/components/BlockRenderer";
// import { HomePageData } from "@/types/common";


// import HomePage from "@/components/pages/Home";
// import { getPageData } from "@/services/APIServices";
import { HomePageData } from "@/types/common";
// import { useEffect, useState } from "react";

export default function HomeUI({ data }: { data: HomePageData | null }) {

  if (!data) {
    return <div></div>;
  }

  return (
    <div className="ir-wrapper">
    {data.Banners && data.Banners.length > 0 && <MainSlider data={data.Banners} />}
    {data.blocks && data.blocks.length > 0 && <BlockRenderer blocks={data.blocks} />}
  </div>
  );
}
