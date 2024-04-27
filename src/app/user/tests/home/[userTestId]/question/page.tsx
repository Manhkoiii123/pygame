"use client";
import { AppContext } from "@/lib/context.wrapper";
import React, { useContext } from "react";

const Page = () => {
  const { generateQuestion } = useContext(AppContext);
  console.log("🚀 ~ Page ~ generateQuestion:", generateQuestion);
  return (
    <div>
      <span>aaaaaa</span>
    </div>
  );
};

export default Page;
