
import { getPageData } from "@/services/APIServices";
import { ResponseData } from "@/types/common";
import GenericUI from "./GenericUI";

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function Publication({ params }: PageProps) {
  const resolvedParams = await params;
  const { category } = resolvedParams; // Access `slug` here after awaiting params
  console.log("category",category);
  const responseData = await getPageData(category);
  const data: ResponseData = responseData?.data;
  console.log("data",data);

  if (!data) {
    return <div></div>;
  }

  
  return <GenericUI slug={category} title={data.PageTitle} description={data.Subtitle} image={data.PageBanner?.url} s_image={data.PageMobileBanner?.url} blocks={data.blocks} />;
}

export async function generateMetadata() {
  return {
    title: "Publication",
    description: "Publication",
  };
}
