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
        <span className="font-medium text-xl text-ink100">
          Does the conclusion logically follow the statements?
        </span>
        <div className="w-[700px] flex flex-col gap-4 relative">
          <div className="flex items-center flex-col gap-3 justify-center border-2 border-gray-200 rounded-lg p-4">
            <span className="font-medium text-xl text-primary">
              A. {generateQuestion.question.content.question.statement_1}
            </span>
            <span className="font-medium text-xl text-primary">
              B. {generateQuestion.question.content.question.statement_2}
            </span>
          </div>
          <div className="flex items-center gap-3 justify-center border-2 border-gray-200 rounded-lg p-4">
            <div className="bg-[#CCEBF2] px-4 py-2 rounded-lg text-primary">
              <span>Conclusion :</span>
            </div>
            <span className="font-medium text-xl text-primary">
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
