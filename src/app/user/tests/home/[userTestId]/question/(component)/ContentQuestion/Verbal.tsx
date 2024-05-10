"use client";
import Footer from "@/app/user/tests/home/[userTestId]/question/(component)/Footer";
import { AppContext } from "@/lib/context.wrapper";
import Image from "next/image";
import { useContext, useState } from "react";

const Verbal = () => {
  const [isCorrect, setIsCorrect] = useState(0);
  const { generateQuestion } = useContext(AppContext);
  return (
    <>
      <div className="flex flex-col  gap-3 relative">
        <div className="border border-1 border-gray-200 rounded-lg py-3 flex items-center justify-center ">
          <span className="font-semibold text-3xl text-primary">
            {generateQuestion.question.content.question.word_1}
          </span>
        </div>
        <div className="border border-1 border-gray-200 rounded-lg py-3 flex items-center justify-center ">
          <span className="font-semibold text-3xl text-primary">
            {generateQuestion.question.content.question.word_2}
          </span>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
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
      <Footer
        setIsCorrect={setIsCorrect}
        skip={true}
        numbers={["Same", "Opposite"]}
      />
    </>
  );
};

export default Verbal;
