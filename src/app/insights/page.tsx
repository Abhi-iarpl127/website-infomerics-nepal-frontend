
import PublicationUI from "./PublicationUI";
import { getPageData } from "@/services/APIServices";
import { ResponseData } from "@/types/common";

export default async function Publication() {
  const responseData = await getPageData('publication');
  const data: ResponseData = responseData.data;
  console.log("data",data);

  if (!data) {
    return <div></div>;
  }

  return <PublicationUI title={data.PageTitle} description={data.Subtitle} image={data.PageBanner?.url} s_image={data.PageMobileBanner?.url} />;
}

export async function generateMetadata() {
  return {
    title: "Publication",
    description: "Publication",
  };
}
