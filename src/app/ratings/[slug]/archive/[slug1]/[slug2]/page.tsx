import React from "react";
import RatingsUI from "./RatingsUI";
import { getPageData } from "@/services/APIServices";
import { notFound } from "next/navigation";
import { ResponseData } from "@/types/common";


  interface PageProps {
    params: Promise<{
        slug: string;
        slug1: string;
        slug2: string;
    }>;
  }
  
  
  export default async function RatingsUIDetails({ params }: PageProps) {
    const resolvedParams = await params;     
  const responseData = await getPageData("ratings");
  // console.log("responseData",responseData);

  if(!responseData){
    notFound();
    return;
  }
  
  const data: ResponseData = responseData.data;
  

  if (!data) {
    return <div></div>;
  }

  //return <div className="ir-wrapper">Archive</div>;
   return <RatingsUI archive={true} image={data.PageBanner?.url} s_image={data.PageMobileBanner?.url} slug={resolvedParams.slug} slug1={resolvedParams.slug1} slug2={resolvedParams.slug2} /> ;
}
