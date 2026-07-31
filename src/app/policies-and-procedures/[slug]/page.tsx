
import PoliciesProceduresUIDetailUI from "./PoliciesProceduresUIDetailUI";
import { getPageData, getPoliciesAndProceduresDetailData } from "@/services/APIServices";
import { ResponseData, CorporateGovernanceData } from "@/types/common";

interface PageProps {
  params: Promise<{
      slug: string;
  }>;
}


export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const responseData = await getPageData('policies-and-procedures');
  const data: ResponseData = responseData?.data;
  console.log("data",data);

  if (!data) {
    return <div></div>;
  }

  return <PoliciesProceduresUIDetailUI slug={resolvedParams.slug || ""} title={data.PageTitle} description={data.Subtitle} image={data.PageBanner?.url} s_image={data.PageMobileBanner?.url} />;
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const response = await getPoliciesAndProceduresDetailData(resolvedParams.slug || "");
  const data = response?.data as CorporateGovernanceData | undefined;

  if (!data) {
    return {
      title: "Publication",
      description: "Publication",
    };
  }

  const description = data.Description?.replace(/<[^>]*>/g, "").trim() || data.Title;

  return {
    title: data.Title,
    description,
    openGraph: {
      title: data.Title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: data.Title,
      description,
    },
  };
}
