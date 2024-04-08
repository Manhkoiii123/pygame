import { TTest } from "@/types/listTest";
import Image from "next/image";
import React from "react";
type Tprops = {
  item: TTest;
};
const TestCard = (props: Tprops) => {
  const { item } = props;
  return (
    <div className="border-2 rounded-2xl border-[#DEDDDD] p-4 bg-white w-[387px] h-[355px]">
      <div className="w-[340px] h-[160px]">
        <Image
          src={item.image}
          alt="image"
          width={200}
          height={100}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <span className="text-xl font-medium mt-1 text-primary">
          {item.title}
        </span>
        <span className="text-xs font-normal text-ink300">
          {item.question} questions in {item.time} seconds assess candidate’s
          verbal communication skills. Good communicator will connect people
          together to yield the best result with minimal misunderstanding.
        </span>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 ">
            <Image
              alt="clock"
              width={16}
              height={16}
              className="w-4 h-4 object-cover"
              src={"/light.png"}
            />
            <span>{item.time} seconds</span>
          </div>
          <div className="flex cursor-pointer items-center gap-1 text-secondary font-medium text-base group">
            <span>Detail</span>
            <span className=" group-hover:translate-x-1 ease-in-out duration-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCard;
