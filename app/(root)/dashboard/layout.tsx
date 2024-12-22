"use client";
import FooterNew from "@/app/components/footer";
import React from "react";
import InnerHeader from "@/app/components/inner-header";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col h-screen">
      <InnerHeader />
      <div className="flex-1 overflow-y-auto min-h-screen">{children}</div>
      <FooterNew />
    </div>
  );
};

export default Layout;
