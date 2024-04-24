/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import MyLink from "@/app/user/tests/home/(component)/MyLink";
import { AppContext } from "@/lib/context.wrapper";
import { TUserTest } from "@/types/user";
import { covertStatus } from "@/utils/user/user";
import { Tag } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { toast } from "react-toastify";

interface Tprops {
  data: TUserTest;
}
const Test = (props: Tprops) => {
  const { data } = props;
  const { setTestUser, setGenerateQuestion, generateQuestion } =
    useContext(AppContext);
  const { bgColor, text } = covertStatus(data.status_text);
  const handleClick = (status: number) => {
    if (status === 2) {
      toast.success(
        <div className="flex items-center justify-center gap-2 text-white">
          <Image src={"/chamthan.png"} alt="Chamthan" width={20} height={20} />
          <span>You have completed this test</span>
        </div>,
        {
          style: {
            padding: 0,
            backgroundColor: "#02BD3A",
          },
          icon: false,
          closeButton: false,
          autoClose: 2000,
          pauseOnHover: false,
        }
      );
    } else if (status !== 2) {
      setTestUser(data);
      localStorage.setItem("testUser", JSON.stringify(data));
    }
  };
  return (
    <div
      onClick={() => handleClick(data.status)}
      className="cursor-pointer border-2 border-[#ccc] w-[190px] p-3 flex gap-2 rounded-lg flex-col"
    >
      <div className="w-[100px] h-[100px]">
        <Image
          alt="imageTest"
          width={100}
          height={100}
          src={data.image_cover}
          className="w-full h-full object-cover"
        />
      </div>
      {data.status !== 2 ? (
        <Link href={`/user/tests/home/${data.id}`}>
          <div className="flex flex-col gap-2">
            <span
              className="text-sm font-medium"
              style={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {data.name}
            </span>
            {(data.time > 0 || data.score > 0) && (
              <div className="flex justify-between text-sm font-normal text-primary">
                {data.time > 0 ? (
                  <div className="flex items-center gap-2 ">
                    <Image
                      alt="clock"
                      width={16}
                      height={16}
                      className="w-4 h-4 object-cover"
                      src={"/light.png"}
                    />
                    <span>{data.time}s</span>
                  </div>
                ) : (
                  <div></div>
                )}
                {data.score > 0 ? (
                  <div className="flex items-center justify-center gap-2">
                    <Image
                      alt="clock"
                      width={16}
                      height={16}
                      className="w-4 h-4 object-cover"
                      src={"/cup.png"}
                    />
                    <span>{data.score}</span>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            )}
            {data.time <= 0 && data.score <= 0 && <div>&nbsp;</div>}
            <div>
              <Tag
                className="rounded-2xl py-1 px-3"
                color={`${bgColor}`}
                bordered={false}
              >
                <span className={`text-[#272B30] text-xs font-medium`}>
                  {text}
                </span>
              </Tag>
            </div>
          </div>
        </Link>
      ) : (
        <div className="flex flex-col gap-2">
          <span
            className="text-sm font-medium"
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {data.name}
          </span>
          {(data.time > 0 || data.score > 0) && (
            <div className="flex justify-between text-sm font-normal text-primary">
              {data.time > 0 ? (
                <div className="flex items-center gap-2 ">
                  <Image
                    alt="clock"
                    width={16}
                    height={16}
                    className="w-4 h-4 object-cover"
                    src={"/light.png"}
                  />
                  <span>{data.time}s</span>
                </div>
              ) : (
                <div></div>
              )}
              {data.score > 0 ? (
                <div className="flex items-center justify-center gap-2">
                  <Image
                    alt="clock"
                    width={16}
                    height={16}
                    className="w-4 h-4 object-cover"
                    src={"/cup.png"}
                  />
                  <span>{data.score}</span>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          )}
          {data.time <= 0 && data.score <= 0 && <div>&nbsp;</div>}
          <div>
            <Tag
              className="rounded-2xl py-1 px-3"
              color={`${bgColor}`}
              bordered={false}
            >
              <span className={`text-[#272B30] text-xs font-medium`}>
                {text}
              </span>
            </Tag>
          </div>
        </div>
      )}
    </div>
  );
};

export default Test;
