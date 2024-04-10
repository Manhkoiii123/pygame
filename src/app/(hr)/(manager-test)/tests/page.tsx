import AssessmentItem from "@/app/(hr)/(manager-test)/tests/(components)/AssessmentItem";
import ButtonAddAssessment from "@/app/(hr)/(manager-test)/tests/(components)/ButtonAddAssessment";
import React from "react";

const Index = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-[32px] leading-[44px] font-semibold text-primary">
        <div className="flex justify-between items-center">
          <span>Active assessments</span>
          <ButtonAddAssessment />
        </div>
        <div className="mt-4 flex gap-3 flex-wrap">
          <AssessmentItem status={1} />
          <AssessmentItem status={0} />
        </div>
      </div>
      <div className="text-[32px] leading-[44px] font-semibold text-primary">
        <div className="flex justify-between items-center">
          <span>Archived assessments</span>
        </div>
        <div className="mt-4 flex gap-3 flex-wrap">
          <AssessmentItem status={-1} />
          <AssessmentItem status={-1} />
        </div>
      </div>
    </div>
  );
};

export default Index;
