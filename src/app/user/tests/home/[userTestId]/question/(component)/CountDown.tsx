"use client";
import { useEffect, useState } from "react";

const CountDown = ({ time }: { time: number }) => {
  const [second, setSecond] = useState(time);
  useEffect(() => {
    let idInterval = setInterval(() => {
      if (second > 0) setSecond((prev) => prev - 1);
    }, 1000);
    return () => {
      clearInterval(idInterval);
    };
  }, [second]);
  return <span className="font-semibold text-xl text-primary">{second}s</span>;
};

export default CountDown;
