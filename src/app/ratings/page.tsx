import { getPageData } from "@/services/APIServices";
import RatingUI from "./RatingUI";
import { notFound } from "next/navigation";
import { ResponseData } from "@/types/common";


export default async function Page() {

    // const resolvedParams = await params;
  
  // const resolvedParams = await params;
  const responseData = await getPageData("ratings");
  console.log("responseData",responseData);

  if(!responseData){
    notFound();
    return;
  }
  
  const data: ResponseData = responseData.data;
  

  if (!data) {
    return <div></div>;
  }


  return(
    <RatingUI slug={"rating"} title={data.PageTitle} image={data.PageBanner?.url} s_image={data.PageMobileBanner?.url} />
  )
}