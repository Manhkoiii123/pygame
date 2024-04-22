"use client";
import { listTestRequest } from "@/apiRequest/test";
import DropdownInvite from "@/app/(hr)/(manager-test)/tests/[testId]/(components)/DropdownInvite";
import DropdownMore from "@/app/(hr)/(manager-test)/tests/[testId]/(components)/DropdownMore";
import ListTestInAssessment from "@/app/(hr)/(manager-test)/tests/[testId]/(components)/ListTestInAssessment";
import Loading from "@/components/views/Loading";
import { TTestAssessment } from "@/types/listTest";
import { useQuery } from "@tanstack/react-query";
import { Divider } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const DetailAssessment = ({ testId }: { testId: string }) => {
  const handleFetchDetail = async (id: string) => {
    const res = await listTestRequest.detailAssessment(id);
    return res.data.data;
  };
  const { data: detailAssessment, isLoading } = useQuery({
    queryKey: ["detailAssessment", testId],
    queryFn: () => handleFetchDetail(testId),
  });
  useEffect(() => {
    handleFetchDetail(testId);
  }, [testId]);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href={"/tests"}
                className="p-2 rounded-full border-gray-100 cursor-pointer border-2"
              >
                <Image src="/left.png" alt="logo" width={24} height={24} />
              </Link>
              <div className="flex flex-col gap-1">
                <span className="text-xl font-medium text-primary">
                  Assessment for {detailAssessment?.assessment.job_function} -{" "}
                  {detailAssessment?.assessment.job_position}
                </span>
                <div>
                  <span className="text-xs font-normal text-ink100">
                    Date :{" "}
                  </span>
                  <span className="text-xs font-normal text-primary">
                    From {detailAssessment?.assessment.start_date} to{" "}
                    {detailAssessment?.assessment.end_date}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <DropdownInvite></DropdownInvite>
              <DropdownMore></DropdownMore>
            </div>
          </div>
          <Divider />
          <div>
            <ListTestInAssessment
              listTest={detailAssessment?.assessment.games}
            />
          </div>
        </>
      )}
    </>
  );
};

export default DetailAssessment;
