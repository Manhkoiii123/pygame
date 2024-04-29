"use client";
import Footer from "@/app/user/tests/home/[userTestId]/question/(component)/Footer";
import { AppContext } from "@/lib/context.wrapper";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const Verbal = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const { generateQuestion } = useContext(AppContext);
  return (
    <>
      <div className="flex flex-col w-[600px] gap-3">
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
