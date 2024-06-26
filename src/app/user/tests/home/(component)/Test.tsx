"use client";
import { AppContext } from "@/lib/context.wrapper";
import { TUserTest } from "@/types/user";
import { Tag } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Tprops {
  data: TUserTest;
}
const Test = (props: Tprops) => {
  const { data } = props;
  const { setTestUser } = useContext(AppContext);
  const [bgColor, setBgColor] = useState("");
  const [text, setText] = useState("");
  useEffect(() => {
    if (data.status_text === "Completed") {
      setBgColor("#A9F5AB");
      setText("Completed");
    } else if (data.status_text === "In progress") {
      setBgColor("#FFAC9F");
      setText("In progress");
    } else if (data.status_text === "Not started") {
      setBgColor("#FFD0A5");
      setText("Not Started");
    }
  }, [data.status_text]);
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
      className=" cursor-pointer border-2 border-[#ccc] sm:w-[190px] w-full p-3 flex gap-4 rounded-lg sm:flex-col flex-row"
    >
      <div className="sm:w-full w-[100px] flex items-center justify-center">
        <Image
          alt="i"
          width={100}
          height={100}
          src={"/test1.png"}
          className="sm:w-[100px] sm:h-[100px] w-[80px] h-[80px] object-cover"
        />
      </div>
      {data.status !== 2 ? (
        <Link href={`/user/tests/home/${data.id}`}>
          <div className="flex flex-col gap-2 ">
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
            <div>
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
              <Tag
                className="rounded-2xl py-1 px-3 mt-3"
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
