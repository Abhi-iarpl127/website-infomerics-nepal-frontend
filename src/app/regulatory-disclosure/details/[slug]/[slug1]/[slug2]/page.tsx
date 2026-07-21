import React from "react";
// import RegulatoryDisclosersDescriptionUI from "../../../RegulatoryDisclosersDescriptionUI";
import { getPageData, getRegulatoryDisclosersListingDetailData1 } from "@/services/APIServices";
import { notFound } from "next/navigation";
import { ResponseData } from "@/types/common";


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

  const innerData = await getRegulatoryDisclosersListingDetailData1("regulatory-disclosure",resolvedParams.slug1,resolvedParams.slug2);

  console.log("innerData",innerData);


  if(!responseData){
    notFound();
    return;
  }
  
  const data: ResponseData = responseData?.data;
  

  if (!data) {
    return <div></div>;
  }


  return <>
  sss
  {JSON.stringify(data)}
  </>

  // return <RegulatoryDisclosersDescriptionUI data={innerData} pageData={data} /> ;
}
