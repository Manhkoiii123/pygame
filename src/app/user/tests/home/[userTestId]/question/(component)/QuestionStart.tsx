"use client";
import CloseButton from "@/app/user/tests/home/[userTestId]/question/(component)/CloseButton";
import CountDownStartGame from "@/app/user/tests/home/[userTestId]/question/(component)/CountDownStartGame";
import MainContentQuestion from "@/app/user/tests/home/[userTestId]/question/(component)/MainContentQuestion";
import React, { useEffect, useState } from "react";

const QuestionStart = () => {
  const [countDown, setCountDown] = useState(false);
  useEffect(() => {
    setCountDown(true);
    let countdownTimeout = setTimeout(() => {
      setCountDown(false);
    }, 3000);

    return () => {
      clearTimeout(countdownTimeout);
    };
  }, []);
  return (
    <>
      {countDown === true ? (
        <CountDownStartGame />
      ) : (
        <>
          <CloseButton />
          <div className="flex items-center justify-center pt-4">
            <MainContentQuestion />
          </div>
        </>
      )}
    </>
  );
};

export default QuestionStart;
