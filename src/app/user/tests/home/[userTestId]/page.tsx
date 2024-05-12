import TestIdUser from "@/app/user/tests/home/(component)/TestIdUser";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = ({ params }: { params: { userTestId: string } }) => {
  const { userTestId } = params;

  return (
    <div className="flex flex-col justify-center items-center">
      <Link
        href={"/user/tests/home"}
        className="flex gap-4 items-center self-start"
      >
        <div className="p-2 rounded-full border-gray-100 cursor-pointer border-2">
          <Image
            src="/left.png"
            alt="logo"
            width={24}
            height={24}
            className="w-[16px] h-[16px] sm:w-[24px] sm:h-[24px]"
          />
        </div>
        <span className="font-medium sm:text-base text-sm text-primary">
          Back to assessment
        </span>
      </Link>
      <TestIdUser userTestId={userTestId}></TestIdUser>
    </div>
  );
};

export default Page;
