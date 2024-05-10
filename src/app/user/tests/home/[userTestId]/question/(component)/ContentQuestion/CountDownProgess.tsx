import React, { useState, useEffect, Dispatch, SetStateAction } from "react";

const CountDownProgess = ({
  durationInSeconds,
  time,
  setTime,
  setQuestionOrAnswer,
  setProgress,
  progress,
}: {
  durationInSeconds: number;
  setProgress: Dispatch<SetStateAction<number>>;
  progress: number;
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
  setQuestionOrAnswer: Dispatch<SetStateAction<number>>;
}) => {
  useEffect(() => {
    const interval = setInterval(() => {
      if (time <= 0) {
        setQuestionOrAnswer(1);
      }
      setTime((prev) => {
        if (prev < 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
      setProgress((prevProgress) => {
        if (prevProgress < 0) {
          clearInterval(interval);
          return 0;
        }
        return ((time - 1) * 100) / durationInSeconds;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [time, durationInSeconds]);

  return (
    <div className="w-[50%] bg-gray-300 h-2 rounded">
      <div
        className={`bg-primary h-2 rounded `}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default CountDownProgess;
