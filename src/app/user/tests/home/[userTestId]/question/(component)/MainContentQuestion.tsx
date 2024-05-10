/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import EndGame from "@/app/user/tests/home/[userTestId]/question/(component)/EndGame";
import Header from "@/app/user/tests/home/[userTestId]/question/(component)/Header";
import Question from "@/app/user/tests/home/[userTestId]/question/(component)/Question";
import { AppContext } from "@/lib/context.wrapper";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";

const MainContentQuestion = () => {
  const { testUser, generateQuestion, setGenerateQuestion, score } =
    useContext(AppContext);
  const [endGame, setEndGame] = useState(false);
  useEffect(() => {
    if (generateQuestion.game_ended) {
      setEndGame(true);
    }
  }, [generateQuestion?.game_ended]);

  return (
    <div className="p-5 border border-1 border-[#009DBE] rounded-2xl flex flex-col gap-4">
      {endGame && <EndGame id={testUser.id}></EndGame>}
      {!endGame && (
        <>
          <Header endGame={endGame} setEndGame={setEndGame} />
          <div className="w-[800px] h-[1px] bg-gradient-divider"></div>
          <Question></Question>
        </>
      )}
    </div>
  );
};

export default MainContentQuestion;
