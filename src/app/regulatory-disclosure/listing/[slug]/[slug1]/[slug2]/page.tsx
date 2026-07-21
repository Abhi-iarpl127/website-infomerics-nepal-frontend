import React from "react";
  // import RegulatoryDisclosersDetailUI from "../../RegulatoryDisclosersDetailUI";
import { getPageData, getRegulatoryDisclosersListingListingDescriptionData } from "@/services/APIServices";
import { notFound } from "next/navigation";
import { ListingData1, ResponseData } from "@/types/common";
import RegulatoryDisclosersListingDescriptionUI from "./RegulatoryDisclosersListingDescriptionUI";


  interface PageProps {
    params: Promise<{
        slug: string;
        slug1: string;
        slug2: string;
    }>;
  }
  
  
  export default async function RegulatoryDisclosureDetail({ params }: PageProps) {
    const resolvedParams = await params;

    const responseData = await getPageData("regulatory-disclosure");
    console.log("responseData",responseData,resolvedParams.slug,resolvedParams.slug1,resolvedParams.slug2);

    const innerData:ListingData1 = await getRegulatoryDisclosersListingListingDescriptionData(resolvedParams.slug,resolvedParams.slug1,resolvedParams.slug2);
  
    if(!responseData){
      notFound();
      return;
    }
    
    const data: ResponseData = responseData.data;
    
  
    if (!data) {
      return <div></div>;
    }
  
    return <RegulatoryDisclosersListingDescriptionUI PageTitle={data.PageTitle} Subtitle={data.Subtitle} Banner={data.PageBanner} MobileBanner={data.PageMobileBanner} innerData={innerData} mainID={resolvedParams.slug} /> ;
}
