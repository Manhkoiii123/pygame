"use client";

import { authRequest } from "@/apiRequest/auth";
import Image from "next/image";
import React, { useEffect } from "react";
interface TValues {
  email: string;
}
interface TProps {
  cookie: string | undefined;
  token: string;
}
const EndTestWelcome = (props: TProps) => {
  const { cookie } = props;
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
        <div className="sm:w-[500px] w-[400px] text-primary mt-3 flex flex-col gap-2">
          <div className="text-center flex flex-col gap-2">
            <span className="sm:text-5xl text-3xl font-semibold">
              Shopee assessment has ended.
            </span>
            <span className="text-base mt-3 font-normal ">
              Thank you for participating.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndTestWelcome;
