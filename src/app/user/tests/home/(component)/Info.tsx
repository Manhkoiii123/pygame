"use client";
import { TUserTest } from "@/types/user";
import { QueryCache, QueryKey } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const Info = ({ listTest }: { listTest: TUserTest[] | undefined }) => {
  const [time, setTime] = useState<number>(0);
  useEffect(() => {
    let timeTmp = 0;
    if (listTest) {
      listTest.map((item) => {
        timeTmp += item.time;
      });
    }
    let mins = Math.ceil(timeTmp / 60);
    setTime(mins);
  }, [listTest]);
  const info = [
    {
      content: `This assessment includes ${
        listTest?.length || 0
      } tests, which will take approximately [${time} minutes] to accomplish.`,
    },
    {
      content: "Read all the instructions carefully in each challenge.",
    },
    {
      content: "You can turn the audio on to enter the gamified world.",
    },
    {
      content:
        "Make sure you are not distracted by any other factors, stay focused and relaxed.",
    },
    {
      content: "Do not refresh the page or close the window while playing.",
    },
  ];
  return (
    <>
      {info.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className="w-[10px] h-[10px] bg-[#333] rounded-full "></div>
          <span>{item.content}</span>
        </div>
      ))}
    </>
  );
};

export default Info;
