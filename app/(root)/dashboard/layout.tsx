"use client";
import React from "react";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-y-auto">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
