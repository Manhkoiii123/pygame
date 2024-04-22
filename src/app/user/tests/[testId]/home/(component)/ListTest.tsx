"use client";
import { userRequest } from "@/apiRequest/user";
import Test from "@/app/user/tests/[testId]/home/(component)/Test";

import { useQuery } from "@tanstack/react-query";

import React from "react";

const ListTest = () => {
  const handleFetchListTestUser = async () => {
    const res = await userRequest.userListTest();
    return res.data.data.games;
  };
  const { data: listTest } = useQuery({
    queryKey: ["listTestUser"],
    queryFn: handleFetchListTestUser,
  });
  console.log("🚀 ~ ListTest ~ listTest:", listTest);
  return (
    <div className="flex gap-2 mt-3">
      {listTest &&
        listTest.map((item, index) => <Test key={index} data={item} />)}
    </div>
  );
};

export default ListTest;
