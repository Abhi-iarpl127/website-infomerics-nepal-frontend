import { NextResponse } from 'next/server';
// import { redirect } from 'next/navigation';

export async function GET() {
  return NextResponse.redirect(new URL('/services/corporate-sector', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'));
}
