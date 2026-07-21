import React from "react";
  // import RegulatoryDisclosersDetailUI from "../../RegulatoryDisclosersDetailUI";
import { getPageData, getRegulatoryDisclosersListingListingData } from "@/services/APIServices";
import { notFound } from "next/navigation";
import { ListingData1, ResponseData } from "@/types/common";
import RegulatoryDisclosersListingUI from "../RegulatoryDisclosersListingUI";


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

    const innerData:ListingData1 = await getRegulatoryDisclosersListingListingData(resolvedParams.slug);
  
    if(!responseData){
      notFound();
      return;
    }
    
    const data: ResponseData = responseData.data;
    
  
    if (!data) {
      return <div></div>;
    }
  
    return <RegulatoryDisclosersListingUI PageTitle={data.PageTitle} Subtitle={data.Subtitle} Banner={data.PageBanner} MobileBanner={data.PageMobileBanner} innerData={innerData} mainID={resolvedParams.slug} /> ;
}
