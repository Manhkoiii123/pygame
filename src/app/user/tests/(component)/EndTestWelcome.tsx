"use client";

import { authRequest } from "@/apiRequest/auth";
import { userRequest } from "@/apiRequest/user";
import Loading from "@/components/views/Loading";
import { sessionTokenUser } from "@/lib/axios/customSession";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
interface TValues {
  email: string;
}
interface TProps {
  cookie: string | undefined;
  token: string;
}
const EndTestWelcome = (props: TProps) => {
  const { cookie, token } = props;
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
        <div className="shadow-[0px_0px_48px_-8px_#0000001A] w-[500px] flex items-center justify-center rounded-lg">
          <Image
            src={"/banner.png"}
            alt="image_banner"
            width={400}
            height={250}
          />
        </div>
        <div className="w-[500px] text-primary mt-3 flex flex-col gap-2">
          <div className="text-center flex flex-col gap-2">
            <span className="text-5xl font-semibold">
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
