"use client";
import AssetsListing from "@/app/components/assets-listing";
import ServicesListing from "@/app/components/services-listing";
import React from "react";

const page = () => {
  return (
    <div className="container mx-auto px-4 py-12 h-screen">
      <ServicesListing />
      <AssetsListing />
    </div>
  );
};

export default page;