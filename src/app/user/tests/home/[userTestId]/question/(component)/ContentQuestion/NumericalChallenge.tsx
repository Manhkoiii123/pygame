"use client";
import { AppContext } from "@/lib/context.wrapper";
import React, { useContext } from "react";

const NumericalChallenge = () => {
  const { generateQuestion } = useContext(AppContext);
  return (
    <div>
      <div className="flex flex-col gap-4">
        <span className="font-medium text-xl text-primary">
          Choose the number that is closer to the right answer.
        </span>
        <div className="p-4 bg-gradient-back-question flex items-center justify-center shadow-[0px_4px_10px_0px_#33B1CB_inset] border-t-4 border-l-4 border-r-4 border-b-1 border-[#33B1CB] rounded-2xl">
          <span className="font-semibold text-[30px] leading-[56px] text-primary">
            {generateQuestion?.question.content.question.expression}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NumericalChallenge;
