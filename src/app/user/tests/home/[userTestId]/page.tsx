"use client";
import { AppContext } from "@/lib/context.wrapper";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

const Page = () => {
  const { testUser } = useContext(AppContext);
  return (
    <div>
      <Link href={"/user/tests/home"} className="flex gap-4 items-center">
        <div className="p-2 rounded-full border-gray-100 cursor-pointer border-2">
          <Image src="/left.png" alt="logo" width={24} height={24} />
        </div>
        <span className="font-medium text-base text-primary">
          Back to assessment
        </span>
      </Link>
      <div className="flex flex-col gap-4 items-center justify-center">
        <div className="w-[400px] h-[400px] border border-1 border-gray-200 rounded-lg">
          <Image
            src={testUser.image_cover}
            alt="image"
            width={400}
            height={400}
          ></Image>
        </div>
        <span>1</span>
        <span>1</span>
      </div>
    </div>
  );
};

export default Page;
