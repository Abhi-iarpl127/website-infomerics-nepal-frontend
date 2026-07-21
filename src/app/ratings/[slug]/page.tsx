import RatingUI from "../RatingUI";
// Define the type for the page props to include `params`
interface PageProps {
  params: Promise<{
      slug: string;
  }>;
}


export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return(
    <RatingUI slug={resolvedParams.slug || ""} />
  )
}