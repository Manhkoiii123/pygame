"use client";
import { listTestRequest } from "@/apiRequest/test";
import TestCard from "@/app/(home)/test-library/_components/TestCard";
import { TTest } from "@/types/listTest";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const ListTest = () => {
  const { data: listTest } = useQuery({
    queryKey: ["listTest"],
    queryFn: async () => {
      const res = await listTestRequest.fetchListTest();
      return res.data.data.games;
    },
  });

  return (
    <>
      {listTest &&
        listTest.map((item: TTest, index: number) => {
          return <TestCard key={index} item={item} />;
        })}
    </>
  );
};

export default ListTest;
