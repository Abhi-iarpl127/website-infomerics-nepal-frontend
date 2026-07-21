import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/lib-min.css";
import { LayoutProvider } from "@/context/LayoutContext";
import Layout from "@/components/Layout";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

export const metadata = {
  title: "Credit Rating Agency in India | Infomerics Ratings",
  description: "Infomerics Group",
  keywords: "Infomerics Group",
  authors: [{ name: "Infomerics Group", url: "https://infomericsgroup.com" }],
  creator: "Infomerics Group",
  themeColor: "#000000",
  icons: {
    icon: "/images/favicon.png",
  },
  openGraph: {
    title: "Credit Rating Agency in India | Infomerics Ratings",
    description: "Infomerics Group",
    url: "https://infomericsgroup.com",
    siteName: "Infomerics Group",
    images: "/images/apple-touch-icon-57x57.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Credit Rating Agency in India | Infomerics Ratings",
    description: "Infomerics Group",
    images: "/images/apple-touch-icon-57x57.png",
  },
  // applicationName: "Infomerics Group",
  // referrer: "strict-origin-when-cross-origin",
  // robots: {
  //   index: false,
  //   follow: false,
  // },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <GoogleTagManager gtmId="G-EDM7K4GF7Z" />
        <GoogleAnalytics gaId="G-EDM7K4GF7Z" />
        {/* G-F51X9Q96TL, G-EDM7K4GF7Z */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/infomerics-rating-style.css" />
        {/* AllAccessible widget script */}

        <script
          src="https://cdn.ux4g.gov.in/tools/accessibility-widget.js"
          async
        ></script>
      </head>
      <body>
        <LayoutProvider>
          <Layout>{children}</Layout>
        </LayoutProvider>
      </body>
    </html>
  );
}
