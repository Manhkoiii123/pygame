"use client";
import { Tooltip } from "antd";
import Image from "next/image";
import React from "react";
interface TProps {
  status: number;
}
const listAction = [
  {
    id: 1,
    name: "View assessment",
    icon: "/eye.png",
  },
  {
    id: 2,
    name: "Duplicate assessment",
    icon: "/copy.png",
  },
  {
    id: 3,
    name: "Archive assessment",
    icon: "/down.png",
  },
  {
    id: 4,
    name: "Delete assessment",
    icon: "/trash.png",
  },
];
const AssessmentItem = (props: TProps) => {
  const { status } = props;
  const handleTitleTooltip = (title: string) => {
    return <span className="text-primary font-medium text-base">{title}</span>;
  };
  return (
    <div
      className={`w-[285px] h-[285px] rounded-2xl border-[1px] p-4 border-[#DEDDDD] flex hover:bg-gradient-hover hover:border-primary transition-background-color duration-500 ease-in-out flex-col  ${
        status === -1
          ? "cursor-default opacity-70 mt-auto justify-end"
          : "cursor-pointer justify-between"
      }`}
    >
      {status !== -1 && (
        <div className="flex gap-2 ml-auto">
          {listAction.map((item) => {
            return (
              <Tooltip
                key={item.id}
                placement="rightBottom"
                title={() => handleTitleTooltip(item.name)}
                color="#fff"
              >
                <Image
                  src={item.icon}
                  alt="icon"
                  width={24}
                  height={24}
                  onClick={() => {
                    console.log("onClick");
                  }}
                />
              </Tooltip>
            );
          })}
        </div>
      )}

      <div className="flex flex-col gap-2">
        {status === 0 && (
          <div className="px-2 max-w-max rounded-2xl py-1 bg-[#FFAC9F] text-primary font-normal text-sm">
            End Test
          </div>
        )}
        <span className="font-medium text-xl text-primary">
          Assessment name
        </span>
        <div className="h-[2px] w-full bg-gradient-to-r from-primary to-transparent"></div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-ink100 font-normal">
            Number of participants :{" "}
            <span className="text-primary font-semibold">8</span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-ink100 font-normal">
            Last activity :{" "}
            <span className="text-primary font-semibold">6 days ago</span>
          </span>
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
  );
};

export default AssessmentItem;
//
