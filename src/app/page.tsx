import { getPageData, getPageSEOData } from "@/services/APIServices";
import HomeUI from "./HomeUI";
import { HomePageData } from "@/types/common";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  
  const data = await getPageSEOData("home");

  if (!data) {
    return {
      title: "Not Found",
      description: "Page not found1",
    };
  }

  return {
    title: data?.seo?.metaTitle || "Credit Rating Agency in India | Infomerics Ratings",
    description: data?.seo?.metaDescription || "Credit Rating Agencies in India | Credit Rating Company in India",
    keywords: data?.seo?.metaKeywords || "Credit Rating Agency",
    openGraph: {
      title: data?.seo?.ogTitle || data?.seo?.metaTitle || "Credit Rating Agency in India | Infomerics Ratings",
      description: data?.seo?.ogDescription || data?.seo?.metaDescription || "Credit Rating Agencies in India | Credit Rating Company in India",
      url: data?.seo?.canonicalURL || null,
      siteName: "Infomerics", // hardcoded as data.seo.siteName does not exist in provided structure
      type: "website",
      images: data?.seo?.ogImage
        ? [
            {
              url: data.seo.ogImage,
            },
          ]
        : [],
    },
    alternates: {
      canonical: data?.seo?.canonicalURL || undefined,
    },
    // robots: {
    //   index: data?.seo?.noIndex === null ? true : !data.seo.noIndex,
    //   follow: data?.seo?.noFollow === null ? true : !data.seo.noFollow,
    // },
  };
}

export default async function Home() {
 
    const response = await getPageData('home');

    if(!response || !response.data){
      notFound();
      return;
    }

    return <HomeUI data={response.data as unknown as HomePageData} />;
 
}
