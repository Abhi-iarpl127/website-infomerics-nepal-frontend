"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { useLayout } from "@/context/LayoutContext";
import { GlobalData } from "@/types/common";
import { getMenuItems } from "@/services/APIServices";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { showHeader, showFooter } = useLayout();
  const [data, setData] = useState<GlobalData | null>(null);
  const pathname = usePathname();
  useEffect(() => {
    getMenuItems().then((data) => {
      setData(data[0])
    });
  }, []);


  if (!data) {
    return <div></div>;
  }

  return (
    <div className={`${pathname === '/' ? '' : 'inner-page'}`}>
      {showHeader && <Header logo={data?.SubHeader?.Logo} data={data} submenu={data?.SubHeader?.MenuItem} />}
      {children}
      {showFooter && <Footer logo={data?.SubHeader?.Logo} data={data} /> }
      <ScrollToTop />
    </div>
  );
}
