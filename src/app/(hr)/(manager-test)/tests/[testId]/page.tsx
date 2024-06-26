import DetailAssessment from "@/app/(hr)/(manager-test)/tests/[testId]/(components)/DetailAssessment";

import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Manager test detail page",
  description: "Generated by create next app",
};

const Index = ({ params }: { params: { testId: string } }) => {
  const { testId } = params;
  return (
    <>
      <DetailAssessment testId={testId}></DetailAssessment>
    </>
  );
};

export default Index;
