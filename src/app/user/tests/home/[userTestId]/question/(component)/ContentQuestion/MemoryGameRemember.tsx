"use client";

import CountDownProgess from "@/app/user/tests/home/[userTestId]/question/(component)/ContentQuestion/CountDownProgess";
import MemoryGameAns from "@/app/user/tests/home/[userTestId]/question/(component)/ContentQuestion/MemoryGameAns";
import { AppContext } from "@/lib/context.wrapper";
import { useContext, useEffect, useState } from "react";

const MemoryGameRemember = () => {
  const { generateQuestion } = useContext(AppContext);
  const [time, setTime] = useState(
    generateQuestion.question.content.question.time!
  );
  const [progress, setProgress] = useState(100);
  const [questionOrAnswer, setQuestionOrAnswer] = useState(0); // true là question còn false là ans
  useEffect(() => {
    setTime(generateQuestion.question.content.question.time!);
    setProgress(100);
  }, [generateQuestion.question.content.question.time, questionOrAnswer]);
  return (
    <div className="flex flex-col items-center justify-center w-full gap-8">
      <span className="text-xl font-medium">
        {questionOrAnswer === 0 ? (
          <span>Memorize the pattern in </span>
        ) : (
          <span>Rewrite the pattern in </span>
        )}
        {generateQuestion.question.content.question.time} seconds{" "}
      </span>
      <CountDownProgess
        progress={progress}
        setProgress={setProgress}
        time={time}
        setQuestionOrAnswer={setQuestionOrAnswer}
        setTime={setTime}
        durationInSeconds={generateQuestion.question.content.question.time!}
      />
      {questionOrAnswer === 0 ? (
        <>
          <div className="w-full p-4 bg-gradient-back-question flex items-center justify-center shadow-[0px_4px_10px_0px_#33B1CB_inset] border-t-4 border-l-4 border-r-4 border-b-1 border-[#33B1CB] rounded-2xl">
            <span className="font-semibold text-[30px] leading-[56px] text-primary flex items-center gap-2">
              {generateQuestion?.question.content.question.list_arrows
                ?.split(",")
                .map((item) =>
                  item === "r" ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="currentColor"
                        className="w-[40px] h-[40px]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="currentColor"
                        className="w-[40px] h-[40px]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                        />
                      </svg>
                    </>
                  )
                )}
            </span>
          </div>
        </>
      ) : (
        <MemoryGameAns
          generateQuestion={generateQuestion}
          time={time}
          setTime={setTime}
          setQuestionOrAnswer={setQuestionOrAnswer}
        />
      )}
    </div>
  );
};

export default MemoryGameRemember;
