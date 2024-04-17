"use client";
import { AppContext } from "@/lib/context.wrapper";
import Image from "next/image";
import React, { useContext } from "react";

const ProfileHeader = () => {
  const { profile } = useContext(AppContext);
  console.log("🚀 ~ ProfileHeader ~ profile:", profile);
  return (
    <div className="flex items-center justify-center gap-2">
      <span className="text-[20px] leading-[28px] font-medium  text-secondary">
        {profile?.email}
      </span>
      <Image
        src={"/avatar.png"}
        width={50}
        height={50}
        alt="avatar"
        className="rounded-full"
      />
    </div>
  );
};

export default ProfileHeader;
