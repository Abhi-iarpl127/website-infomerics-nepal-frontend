
import CorporateGovernanceDetailUI from "./CorporateGovernanceDetailUI";
import { getPageData } from "@/services/APIServices";
import { ResponseData } from "@/types/common";

interface PageProps {
  params: Promise<{
      slug: string;
  }>;
}


export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const responseData = await getPageData('corporate-governance');
  const data: ResponseData = responseData.data;
  console.log("data",data);

  if (!data) {
    return <div></div>;
  }

  return <CorporateGovernanceDetailUI slug={resolvedParams.slug || ""} title={data.PageTitle} description={data.Subtitle} image={data.PageBanner?.url} s_image={data.PageMobileBanner?.url} />;
}

export async function generateMetadata() {
  return {
    title: "Publication",
    description: "Publication",
  };
}
