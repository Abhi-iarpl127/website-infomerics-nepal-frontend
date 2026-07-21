import React from "react";
import ArchivePolicyUI from "./ArchivePolicyUI";

interface PageProps {
  params: Promise<{
      slug: string;
      slug1: string;
  }>;
}


export default async function ArchivePolicyDetail({ params }: PageProps) {
  const resolvedParams = await params;
    return <ArchivePolicyUI slug={resolvedParams.slug} slug1={resolvedParams.slug1} />
}