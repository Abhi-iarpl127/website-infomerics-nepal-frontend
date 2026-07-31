
// import PoliciesProceduresUIDetailUI from "./PoliciesProceduresUIDetailUI";
// import { getPageData } from "@/services/APIServices";
// import { ResponseData } from "@/types/common";
// import { notFound } from "next/navigation";
import PressRealeaseUI from "./PressRealeaseUI";
import { PressReleaseData } from "@/types/common";
interface PageProps {
  params: Promise<{
      slug: string;
  }>;
}


export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  // const responseData = await getPageData(resolvedParams.slug);
  // if(!responseData){
  //   notFound();
  //   return;
  // }

  // const data: ResponseData = responseData.data;
  // console.log("data",data);

  // if (!data) {
  //   return <div></div>;
  // }

  return <PressRealeaseUI slug={resolvedParams.slug}/>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/companies/${slug}`);
  const data = response.ok ? ((await response.json()) as PressReleaseData) : null;
  const companyName = data?.company?.CompanyName;

  if (!companyName) {
    return {
      title: "Publication",
      description: "Publication",
    };
  }

  const description = data?.company?.SubTitle?.replace(/<[^>]*>/g, "").trim() || `Rating rationale for ${companyName}`;

  return {
    title: companyName,
    description,
    openGraph: {
      title: companyName,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: companyName,
      description,
    },
  };
}
