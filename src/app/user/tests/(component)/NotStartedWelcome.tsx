"use client";

import { authRequest } from "@/apiRequest/auth";
import { addZero, getDate } from "@/utils/user/user";
import dayjs from "dayjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
interface TValues {
  email: string;
}
interface TProps {
  cookie: string | undefined;
  token: string;
  startDate: string;
}
const NotStartedWelcome = (props: TProps) => {
  const { cookie, token, startDate } = props;
  const [time, setTime] = useState("");
  useEffect(() => {
    const date = addZero(String(dayjs(startDate).get("D")));
    const month = addZero(String(dayjs(startDate).get("month") + 1));
    const year = addZero(String(dayjs(startDate).get("year")));
    const hour = addZero(String(dayjs(startDate).get("hour")));
    const min = addZero(String(dayjs(startDate).get("minute")));
    const second = addZero(String(dayjs(startDate).get("second")));
    setTime(getDate(date, month, year, hour, min, second));
  }, [startDate]);
  useEffect(() => {
    const handleDeleteCookie = async () => {
      try {
        await authRequest.logoutUser();
      } catch (error) {
        console.error("Error setting email:", error);
      }
    };
    if (cookie) {
      handleDeleteCookie();
    }
  }, [cookie]);

  return (
    <div>
      <div className="flex items-center justify-center flex-col">
        <div className="shadow-[0px_0px_48px_-8px_#0000001A] sm:w-[500px] w-[300px] flex items-center justify-center rounded-lg">
          <Image
            src={"/banner.png"}
            alt="image_banner"
            width={400}
            height={250}
            className="w-[90%] sm:w-[400px] object-cover"
          />
        </div>
        <div className="sm:w-[500px] w-[300px] text-primary mt-3 flex flex-col gap-2">
          <div className="text-center flex flex-col gap-2 items-center">
            <span className="sm:text-5xl text-2xl font-semibold">
              Shopee Assessment is coming soon
            </span>
            <span className="text-base mt-3 font-normal ">
              Thanks for your interest in this position! Assessment would
              officially start at the time below
            </span>
            <div className="flex items-center gap-2 p-3 bg-[#CCEBF2] rounded-lg w-fit">
              <Image
                src="/clock.png"
                alt="clock"
                width={24}
                height={24}
                className="w-[18px] h-[18px] sm:w-[24px] sm:h-[24px]"
              />
              <span className="text-base">{time}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotStartedWelcome;
