/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { userRequest } from "@/apiRequest/user";
import Header from "@/app/user/tests/home/[userTestId]/question/(component)/Header";
import Question from "@/app/user/tests/home/[userTestId]/question/(component)/Question";
import { AppContext } from "@/lib/context.wrapper";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";

const MainContentQuestion = () => {
  const { testUser, generateQuestion, setGenerateQuestion } =
    useContext(AppContext);
  const [endGame, setEndGame] = useState(false);
  const [score, setScore] = useState(0);
  const router = useRouter();
  useEffect(() => {
    if (
      generateQuestion?.answered_question_num + 1 ===
      generateQuestion.total_question
    ) {
      setScore(generateQuestion.total_score);
    }
    if (generateQuestion.game_ended) {
      setEndGame(true);
    }
  }, [generateQuestion.answered_question_num]);

  return (
    <div className="p-5 border border-1 border-[#009DBE] rounded-2xl flex flex-col gap-4">
      {endGame && (
        <div className="font-medium bg-white px-12 py-6 border-[1px] border-[#009DBE] rounded-[16px] w-[700px]  mx-auto h-[500px] flex items-center justify-center ">
          <div className="mt-[30px] font-bold text-3xl text-blue-500">
            Your Score: {score}
          </div>
        </div>
      )}
      {!endGame && (
        <>
          <Header />
          <div className="w-[800px] h-[1px] bg-gradient-divider"></div>
          <Question></Question>
        </>
      )}
    </div>
  );
};

export default MainContentQuestion;
