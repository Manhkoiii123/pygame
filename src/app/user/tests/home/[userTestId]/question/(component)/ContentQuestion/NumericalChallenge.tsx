"use client";
import Footer from "@/app/user/tests/home/[userTestId]/question/(component)/Footer";
import { AppContext } from "@/lib/context.wrapper";
import Image from "next/image";
import React, { useContext, useState } from "react";

const NumericalChallenge = () => {
  const [isCorrect, setIsCorrect] = useState(0);
  const { generateQuestion } = useContext(AppContext);
  return (
    <>
      <div className="flex flex-col gap-4">
        <span className="font-medium sm:text-xl text-sm text-primary text-center flex items-center justify-center">
          Choose the number that is closer to the right answer.
        </span>
        <div className="p-4 bg-gradient-back-question flex items-center justify-center shadow-[0px_4px_10px_0px_#33B1CB_inset] border-t-4 border-l-4 border-r-4 border-b-1 border-[#33B1CB] rounded-2xl !relative">
          <span className="font-semibold sm:text-[30px] sm:leading-[56px] text-base text-primary ">
            {generateQuestion?.question.content.question.expression}
          </span>
          <div className="!absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
            {isCorrect === 1 && (
              <div>
                <Image
                  src={"/uploadSuccess.png"}
                  alt="home banner"
                  width={60}
                  height={60}
                  className="sm:w-[60px] sm:h-[60px] w-[30px] h-[30px]"
                ></Image>
              </div>
            )}
            {isCorrect === -1 && (
              <div>
                <Image
                  src={"/uploadFail.png"}
                  alt="home banner"
                  width={60}
                  height={60}
                  className="sm:w-[60px] sm:h-[60px] w-[30px] h-[30px]"
                ></Image>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer
        setIsCorrect={setIsCorrect}
        skip={true}
        numbers={[
          String(generateQuestion.question.content.question.result_1),
          String(generateQuestion.question.content.question.result_2),
        ]}
      />
    </>
  );
};

export default NumericalChallenge;
