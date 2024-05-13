"use client";
import { listTestRequest } from "@/apiRequest/test";
import OnePerPoint from "@/app/(hr)/(manager-test)/tests/[testId]/(components)/OnePerPoint";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Personal = ({ id }: { id: string }) => {
  const getPerReq = async () => {
    const res = await listTestRequest.getPersionalAnswer(id);
    return res.data.data.result;
  };
  const { data } = useQuery({
    queryKey: ["persional", id],
    queryFn: getPerReq,
  });
  return (
    <div className="absolute  top-[100%] -right-[100%] w-[400px] z-50 border border-red-200 p-4 shadow-md bg-white rounded-lg">
      <span className="text-primary font-medium text-base">
        Personality Trait
      </span>
      <div className="flex flex-col gap-4 mt-4">
        {data?.map((item) => {
          return (
            <div key={item.name}>
              <OnePerPoint item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Personal;
