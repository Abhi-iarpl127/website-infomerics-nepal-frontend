
import RegulatoryDisclosersUI from "./RegulatoryDisclosersUI";
import { getPageData } from "@/services/APIServices";
import { ResponseData } from "@/types/common";
import { notFound } from "next/navigation";


export default async function RegulatoryDisclosureDetail() {
  // const resolvedParams = await params;
  
  // const resolvedParams = await params;
  const responseData = await getPageData("regulatory-disclosure");
  console.log("responseData",responseData);

  if(!responseData){
    notFound();
    return;
  }
  
  const data: ResponseData = responseData.data;
  

  if (!data) {
    return <div></div>;
  }


  return <RegulatoryDisclosersUI title={data.PageTitle} description={data.Subtitle} image={data.PageBanner?.url} s_image={data.PageMobileBanner?.url} />;
}

export async function generateMetadata() {
  return {
    title: "Publication",
    description: "Publication",
  };
}
