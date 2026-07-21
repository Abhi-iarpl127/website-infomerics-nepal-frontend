import ArticleUI from "./ArticleUI";

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

export async function generateMetadata() {
  return {
    title: "Publication",
    description: "Publication",
  };
}
