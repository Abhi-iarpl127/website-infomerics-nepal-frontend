
// import PoliciesProceduresUIDetailUI from "./PoliciesProceduresUIDetailUI";
import { getPageData } from "@/services/APIServices";
import { ResponseData } from "@/types/common";
import { notFound } from "next/navigation";
import GenericUI from "./GenericUI";
interface PageProps {
  params: Promise<{
      slug: string;
  }>;
}


export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const responseData = await getPageData(resolvedParams.slug);
  if(!responseData){
    notFound();
    return;
  }
  
  const data: ResponseData = responseData?.data;
  console.log("data",data);

  if (!data) {
    return <div></div>;
  }

  return <GenericUI slug={resolvedParams.slug} title={data.PageTitle} description={data.Subtitle} image={data.PageBanner?.url} s_image={data.PageMobileBanner?.url} blocks={data.blocks} />;
}

export async function generateMetadata() {
  return {
    title: "Publication",
    description: "Publication",
  };
}
