import { NextRequest, NextResponse } from 'next/server';
interface PageProps {
  params: Promise<{
      slug: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: PageProps
) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const redirectUrl = `/policies-and-procedures/${slug}`;
  return NextResponse.redirect(new URL(redirectUrl, request.url));
}
