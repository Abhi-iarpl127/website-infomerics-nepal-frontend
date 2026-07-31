import ArticleUI from "./ArticleUI";
import { getArticleDetail } from "@/services/APIServices";
import { ArticleData } from "@/types/common";

interface PageProps {
  params: Promise<{
    slug: string;
    category: string;
  }>;
}

export default async function Publication({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug, category } = resolvedParams; // Access `slug` here after awaiting params

  console.log("category",slug);


  return <ArticleUI slug={slug} category={category} />
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const response = await getArticleDetail(slug || "");
  const articleData = response?.data as ArticleData | undefined;

  if (!articleData) {
    return {
      title: "Publication",
      description: "Publication",
    };
  }

  const description = articleData.Subtitle?.replace(/<[^>]*>/g, "").trim() || articleData.Title;
  const imageUrl = articleData.InnerPageBanner?.url || articleData.ListingImage?.url;

  return {
    title: articleData.Title,
    description,
    openGraph: {
      title: articleData.Title,
      description,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: articleData.Title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}
