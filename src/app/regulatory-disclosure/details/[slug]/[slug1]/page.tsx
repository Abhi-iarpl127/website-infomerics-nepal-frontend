import React from "react";
// import RegulatoryDisclosersDescriptionUI from "../../../RegulatoryDisclosersDescriptionUI";
import { getPageData, getRegulatoryDisclosersListingDescriptionData } from "@/services/APIServices";
import { notFound } from "next/navigation";
import { DescriptionData, ResponseData } from "@/types/common";
import RegulatoryDisclosersDescriptionUI from "../../../RegulatoryDisclosersDescriptionUI";


  interface PageProps {
    params: Promise<{
        slug: string;
        slug1: string;
        slug2: string;
    }>;
  }
  
  
  export default async function RegulatoryDisclosureDetail({ params }: PageProps) {
    const resolvedParams = await params;
    // const resolvedParams = await params;
  const responseData = await getPageData("regulatory-disclosure");

  const innerData:DescriptionData = await getRegulatoryDisclosersListingDescriptionData(resolvedParams.slug,resolvedParams.slug1);

  if(!responseData){
    notFound();
    return;
  }
  
  const data: ResponseData = responseData.data;
  

  if (!data) {
    return <div></div>;
  }


  return <RegulatoryDisclosersDescriptionUI PageTitle={data.PageTitle} Subtitle={data.Subtitle} Banner={data.PageBanner} MobileBanner={data.PageMobileBanner} innerData={innerData} mainID={resolvedParams.slug} /> ;
}
