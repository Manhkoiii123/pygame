"use client";
import LogicalGame from "@/app/user/tests/home/[userTestId]/question/(component)/ContentQuestion/LogicalGame";
import MemoryGameRemember from "@/app/user/tests/home/[userTestId]/question/(component)/ContentQuestion/MemoryGameRemember";
import NumericalChallenge from "@/app/user/tests/home/[userTestId]/question/(component)/ContentQuestion/NumericalChallenge";
import Verbal from "@/app/user/tests/home/[userTestId]/question/(component)/ContentQuestion/Verbal";
import { AppContext } from "@/lib/context.wrapper";
import Image from "next/image";
import React, { useContext } from "react";

const Question = () => {
  const { generateQuestion } = useContext(AppContext);
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 w-[800px]">
        <Image
          src="/banner_question.png"
          alt="home banner"
          width={500}
          height={124}
        />
        <div className="w-[700px]">
          {generateQuestion?.question?.content?.question.word_1 &&
            generateQuestion?.question?.content?.question.word_2 && <Verbal />}
          {generateQuestion?.question?.content?.question?.expression && (
            <NumericalChallenge />
          )}
          {generateQuestion?.question?.content?.question?.conclusion && (
            <LogicalGame />
          )}
          {generateQuestion?.question?.content?.question?.list_arrows && (
            <MemoryGameRemember />
          )}
        </div>
      </div>
    </>
  );
};

export default Question;
