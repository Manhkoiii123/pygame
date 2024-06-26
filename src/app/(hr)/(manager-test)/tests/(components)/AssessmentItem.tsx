/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { listTestRequest } from "@/apiRequest/test";
import ModalDelete from "@/app/(hr)/(manager-test)/tests/[testId]/(components)/ModalDelete";
import { TAssessment } from "@/types/listAssessment";
import { convertDate } from "@/utils/user/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tooltip } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
interface TProps {
  status: number;
  data: TAssessment;
}

const AssessmentItem = (props: TProps) => {
  const queryClient = useQueryClient();
  const { status, data } = props;
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const reqUnActive = async (id: number) => {
    const data = {
      assessment_id: id,
    };
    const res = await listTestRequest.unActiveAss(data);
    return res;
  };
  const unActiveMutation = useMutation({
    mutationFn: reqUnActive,
  });
  const reqActive = async (id: number) => {
    const data = {
      assessment_id: id,
    };
    const res = await listTestRequest.activeAss(data);
    return res;
  };
  const ActiveMutation = useMutation({
    mutationFn: reqActive,
  });
  const listAction = useMemo(
    () => [
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
        onClick: () => {
          unActiveMutation.mutate(data.id, {
            onSuccess: (res) => {
              queryClient.invalidateQueries({
                queryKey: ["listAssessment"],
              });
              queryClient.invalidateQueries({
                queryKey: ["listAssessmentUnActive"],
              });
            },
          });
        },
      },
      {
        id: 4,
        name: "Delete assessment",
        icon: "/trash.png",
        onClick: () => {
          setOpenModalDelete(true);
        },
      },
    ],
    []
  );
  const handleTitleTooltip = (title: string) => {
    return <span className="text-primary font-medium text-base">{title}</span>;
  };

  return (
    <div
      className={`w-[285px] h-[285px] rounded-2xl border-[1px] p-4 border-[#DEDDDD] flex   transition-background-color flex-col bg-custom-vector bg-cover bg-center hover:bg-hover-zoom  transition-background-image duration-1000 ease-linear ${
        status === -1
          ? "cursor-default opacity-70 mt-auto justify-end"
          : "cursor-pointer justify-between hover:bg-gradient-hover hover:border-primary"
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
                  onClick={item.onClick && item.onClick}
                />
              </Tooltip>
            );
          })}
        </div>
      )}
      {status === -1 && (
        <div className="mb-auto cursor-pointer ml-auto">
          <Tooltip
            placement="rightBottom"
            title={() => handleTitleTooltip("Archive assessment")}
            color="#fff"
          >
            <Image
              src={"/down.png"}
              alt="icon"
              width={24}
              height={24}
              onClick={() => {
                ActiveMutation.mutate(data.id, {
                  onSuccess: (res) => {
                    queryClient.invalidateQueries({
                      queryKey: ["listAssessment"],
                    });
                    queryClient.invalidateQueries({
                      queryKey: ["listAssessmentUnActive"],
                    });
                  },
                });
              }}
            />
          </Tooltip>
        </div>
      )}
      {status === -1 ? (
        <>
          <div className="flex flex-col gap-2">
            <span className="font-medium text-xl text-primary">
              {data.name}
            </span>
            <div className="h-[2px] w-full bg-gradient-to-r from-primary to-transparent"></div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-ink100 font-normal">
                Number of participants :
                <span className="text-primary font-semibold">
                  {data.candidates_count}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-ink100 font-normal">
                Last activity :{" "}
                <span className="text-primary font-semibold">
                  {dayjs(new Date().toLocaleDateString()).diff(
                    dayjs(convertDate(data.updated_at)),
                    "day"
                  )}{" "}
                  days ago
                </span>
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
        </>
      ) : (
        <>
          <Link href={`/tests/${data.id}`}>
            <div className="flex flex-col gap-2">
              {status === 0 && (
                <div className="px-2 max-w-max rounded-2xl py-1 bg-[#FFAC9F] text-primary font-normal text-sm">
                  End Test
                </div>
              )}
              <span className="font-medium text-xl text-primary">
                {data.name}
              </span>
              <div className="h-[2px] w-full bg-gradient-to-r from-primary to-transparent"></div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-ink100 font-normal">
                  Number of participants :
                  <span className="text-primary font-semibold">
                    {data.candidates_count}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-ink100 font-normal">
                  Last activity :{" "}
                  <span className="text-primary font-semibold">
                    {dayjs(new Date().toLocaleDateString()).diff(
                      dayjs(convertDate(data.updated_at)),
                      "day"
                    )}{" "}
                    days ago
                  </span>
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
          </Link>
        </>
      )}
      <ModalDelete
        data={data}
        openDelete={openModalDelete}
        setOpenDelete={setOpenModalDelete}
      />
    </div>
  );
};

export default AssessmentItem;
