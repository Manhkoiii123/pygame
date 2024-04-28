import NumericalChallenge from "@/app/user/tests/home/[userTestId]/question/(component)/ContentQuestion/NumericalChallenge";
import Verbal from "@/app/user/tests/home/[userTestId]/question/(component)/ContentQuestion/Verbal";
import { TQuestion } from "@/types/user";
import Image from "next/image";
import React from "react";
interface HeaderProps {
  questionGen: TQuestion | undefined;
}
const Question = ({ questionGen }: HeaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Image
        src="/banner_question.png"
        alt="home banner"
        width={500}
        height={124}
      />
      <div>
        {questionGen?.question.content.question.word_1 &&
          questionGen?.question.content.question.word_2 && (
            <Verbal questionGen={questionGen} />
          )}
        {questionGen?.question.content.question.expression && (
          <NumericalChallenge questionGen={questionGen} />
        )}
      </div>
    </div>
  );
};

export default Question;
