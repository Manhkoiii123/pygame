"use client";
import CountDown from "@/app/user/tests/home/[userTestId]/question/(component)/CountDown";
import { AppContext } from "@/lib/context.wrapper";
import Image from "next/image";
import { useContext } from "react";

const Header = ({
  endGame,
  setEndGame,
}: {
  endGame: boolean;
  setEndGame: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { testUser } = useContext(AppContext);
  const { generateQuestion } = useContext(AppContext);
  return (
    <div className="flex sm:flex-row flex-col gap-3 sm:gap-0 items-center justify-between sm:w-[800px] w-[400px]">
      <div className="flex items-center gap-3">
        <div className="sm:w-[12px] sm:h-[40px]  bg-[#009DBE] sm:rounded-lg"></div>
        <span className="font-semibold sm:text-[32px] sm:leading-[44px] text-xl text-primary">
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
              className="sm:w-[24px] sm:h-[24px] w-[12px] h-[12px]"
            />
          </div>
          <CountDown
            endGame={endGame}
            setEndGame={setEndGame}
            time={generateQuestion?.time}
            userTime={generateQuestion?.used_time}
          ></CountDown>
        </div>
        <div className="flex items-center gap-2">
          <div className="p-3 border border-1 border-gray-300 rounded-full">
            <Image
              src={"/answered.png"}
              alt="home banner"
              width={24}
              height={24}
              className="sm:w-[24px] sm:h-[24px] w-[12px] h-[12px]"
            />
          </div>
          <span className="font-semibold sm:text-xl text-base text-primary">
            {generateQuestion?.answered_question_num + 1}/
            {generateQuestion?.total_question}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="p-3 border border-1 border-gray-300 rounded-full">
            <Image
              src={"/Union.png"}
              alt="home banner"
              width={24}
              height={24}
              className="sm:w-[24px] sm:h-[24px] w-[12px] h-[12px]"
            />
          </div>
          <span className="font-semibold sm:text-xl text-base text-primary">
            {generateQuestion?.total_score}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
