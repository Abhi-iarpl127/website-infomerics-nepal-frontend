import React from "react";
  // import RegulatoryDisclosersDetailUI from "../../RegulatoryDisclosersDetailUI";
import { getPageData } from "@/services/APIServices";
import { notFound } from "next/navigation";
import { ResponseData } from "@/types/common";


  interface PageProps {
    params: Promise<{
        slug: string;
        cat: string;
    }>;
  }
  
  
  export default async function RegulatoryDisclosureDetail({ params }: PageProps) {
    const resolvedParams = await params;

    const responseData = await getPageData("regulatory-disclosure");
    console.log("responseData",responseData,resolvedParams);
  
    if(!responseData){
      notFound();
      return;
    }
    
    const data: ResponseData = responseData.data;
    
  
    if (!data) {
      return <div></div>;
    }
  
    return <div> {JSON.stringify(data)} </div>
  // return <RegulatoryDisclosersDetailUI archive={false} slug={resolvedParams.slug} image={data.PageBanner?.url} s_image={data.PageMobileBanner?.url}  /> ;
}
