"use client";
import { AppContext } from "@/lib/context.wrapper";
import { TQuestion } from "@/types/user";
import Image from "next/image";
import { useContext } from "react";
interface HeaderProps {
  questionGen: TQuestion | undefined;
}
const Header = ({ questionGen }: HeaderProps) => {
  const { testUser } = useContext(AppContext);
  return (
    <div className="flex items-center justify-between w-[800px]">
      <div className="flex items-center gap-3">
        <div className="w-[12px] h-[40px] bg-[#009DBE] rounded-lg"></div>
        <span className="font-semibold text-[32px] leading-[44px] text-primary">
          {testUser?.name}
        </span>
      </div>
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2">
          <div className="p-3 border border-1 border-gray-300 rounded-full">
            <Image
              src={"/clock.png"}
              alt="home banner"
              width={24}
              height={24}
              className=" object-cover"
            />
          </div>
          <span className="font-semibold text-xl text-primary">
            {questionGen?.time}s
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="p-3 border border-1 border-gray-300 rounded-full">
            <Image
              src={"/answered.png"}
              alt="home banner"
              width={24}
              height={24}
              className=" object-cover"
            />
          </div>
          <span className="font-semibold text-xl text-primary">
            {questionGen?.answered_question_num}/{questionGen?.total_question}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="p-3 border border-1 border-gray-300 rounded-full">
            <Image
              src={"/Union.png"}
              alt="home banner"
              width={24}
              height={24}
              className=" object-cover"
            />
          </div>
          <span className="font-semibold text-xl text-primary">
            {questionGen?.total_score}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
