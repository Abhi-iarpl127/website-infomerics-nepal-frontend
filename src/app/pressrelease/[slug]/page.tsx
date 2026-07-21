
// import PoliciesProceduresUIDetailUI from "./PoliciesProceduresUIDetailUI";
// import { getPageData } from "@/services/APIServices";
// import { ResponseData } from "@/types/common";
// import { notFound } from "next/navigation";
import PressRealeaseUI from "./PressRealeaseUI";
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

export async function generateMetadata() {
  return {
    title: "Publication",
    description: "Publication",
  };
}
