import Footer from "@/components/Footer";
import HeaderShopkeeper from "@/components/HeaderShopkeeper";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <div className="mx-12">
        <HeaderShopkeeper />
        <div className=" pb-10">{children}</div>
      </div>
      <Footer />
    </main>
  );
};

export default Layout;
