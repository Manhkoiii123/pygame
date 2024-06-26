import { listTestRequest } from "@/apiRequest/test";
import ListTest from "@/app/(home)/test-library/_components/ListTest";
import TestCard from "@/app/(home)/test-library/_components/TestCard";
import { TTest } from "@/types/listTest";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Test library App",
  description: "Generated by create next app",
};

const TestLibrary = async () => {
  return (
    <div className="bg-gradient-to-b from-[#CCEBF2]  to-[#fff] w-full h-full flex items-center justify-center flex-col p-10">
      <span className="text-[32px] leading-[44px] font-semibold">
        Assess your candidates with aptitude and personality tests
      </span>
      <div className="grid grid-cols-3 gap-4 mt-6">
        <ListTest />
      </div>
    </div>
  );
};

export default TestLibrary;
