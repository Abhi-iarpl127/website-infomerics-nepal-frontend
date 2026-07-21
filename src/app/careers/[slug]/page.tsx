import React from "react";
import CareerDetails from "./CareerDetails";

interface PageProps {
  params: Promise<{
      slug: string;
  }>;
}

export default async function Careers({ params }: PageProps) {

    const resolvedParams = await params;
    // const responseData = await getPageData(resolvedParams.slug);
  return (
    
      <CareerDetails slug={resolvedParams.slug} />
    
  );
}
