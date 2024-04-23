"use client";
import { userRequest } from "@/apiRequest/user";
import Test from "@/app/user/tests/home/(component)/Test";

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
    retry: 0,
  });
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-4 mt-3">
      {listTest &&
        listTest.map((item, index) => <Test key={index} data={item} />)}
    </div>
  );
};

export default ListTest;
