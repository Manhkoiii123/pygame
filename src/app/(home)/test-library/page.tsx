import TestCard from "@/app/(home)/test-library/_components/TestCard";
import { listTest } from "@/constants/listTest";
import { TTest } from "@/types/listTest";
import React from "react";

const TestLibrary = () => {
  return (
    <div className="bg-gradient-to-b from-[#CCEBF2]  to-[#fff] w-full h-full flex items-center justify-center flex-col p-10">
      <span className="text-[32px] leading-[44px] font-semibold">
        Assess your candidates with aptitude and personality tests
      </span>
      <div className="grid grid-cols-3 gap-4 mt-6">
        {listTest.map((item: TTest, index: number) => {
          return <TestCard key={index} item={item} />;
        })}
      </div>
    </div>
  );
};

export default TestLibrary;
