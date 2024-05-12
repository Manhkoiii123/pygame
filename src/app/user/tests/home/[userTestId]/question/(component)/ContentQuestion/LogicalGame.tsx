"use client";

import Footer from "@/app/user/tests/home/[userTestId]/question/(component)/Footer";
import { AppContext } from "@/lib/context.wrapper";
import Image from "next/image";
import { useContext, useState } from "react";

const LogicalGame = () => {
  const [isCorrect, setIsCorrect] = useState(0);
  const { generateQuestion } = useContext(AppContext);
  return (
    <>
      <div className="flex flex-col gap-4 items-center justify-center">
        <span className="font-medium sm:text-xl text-base text-center text-ink100">
          Does the conclusion logically follow the statements?
        </span>
        <div className="sm:w-[700px] w-[300px] flex flex-col gap-4 relative">
          <div className="flex sm:items-center flex-col gap-3 sm:justify-center border-2 border-gray-200 rounded-lg p-4">
            <span className="font-medium sm:text-xl text-base text-primary flex sm:block">
              <span> A.</span>{" "}
              <span>
                {generateQuestion.question.content.question.statement_1}
              </span>
            </span>
            <span className="font-medium sm:text-xl text-base text-primary flex sm:block">
              <span> B.</span>{" "}
              <span>
                {generateQuestion.question.content.question.statement_2}
              </span>
            </span>
          </div>
          <div className="flex sm:items-center gap-3 sm:justify-center border-2 border-gray-200 rounded-lg p-4">
            <div className="bg-[#CCEBF2] sm:px-4 sm:py-2 px-2  rounded-lg text-primary">
              <span className="sm:text-xl text-xs">Conclusion</span>
              <span className="sm:text-xl text-xs">:</span>
            </div>
            <span className="font-medium sm:text-xl text-base text-primary">
              {generateQuestion.question.content.question.conclusion}
            </span>
          </div>
          <div className="!absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
            {isCorrect === 1 && (
              <div>
                <Image
                  src={"/uploadSuccess.png"}
                  alt="home banner"
                  width={60}
                  height={60}
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
                ></Image>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer setIsCorrect={setIsCorrect} skip={true} numbers={["Yes", "No"]} />
    </>
  );
};

export default LogicalGame;
