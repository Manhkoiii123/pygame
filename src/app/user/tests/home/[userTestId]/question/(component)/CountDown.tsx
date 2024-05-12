"use client";
import { useEffect, useState } from "react";

const CountDown = ({
  time,
  userTime,
  endGame,
  setEndGame,
}: {
  time: number;
  userTime: number;
  endGame: boolean;
  setEndGame: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [second, setSecond] = useState(time - userTime);
  useEffect(() => {
    let idInterval = setInterval(() => {
      if (second > 0) setSecond((prev) => prev - 1);
    }, 1000);
    if (second === 0) setEndGame(true);
    return () => {
      clearInterval(idInterval);
    };
  }, [second]);
  return (
    <span className="font-semibold sm:text-xl text-base text-primary">
      {second}s
    </span>
  );
};

export default CountDown;
