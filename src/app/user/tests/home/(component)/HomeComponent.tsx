/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { userRequest } from "@/apiRequest/user";
import Info from "@/app/user/tests/home/(component)/Info";
import ListTest from "@/app/user/tests/home/(component)/ListTest";
import { AppContext, testUserInit } from "@/lib/context.wrapper";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect } from "react";

const HomeComponent = () => {
  const { setTestUser, setNumberQuestion } = useContext(AppContext);
  // useEffect(() => {
  //   setTestUser(testUserInit);
  //   setNumberQuestion(0);
  // }, []);
  const handleFetchListTestUser = async () => {
    const res = await userRequest.userListTest();
    return res.data.data.games;
  };
  const { data: listTest } = useQuery({
    queryKey: ["listTestUser"],
    queryFn: handleFetchListTestUser,
    staleTime: 0,
  });

  return (
    <div className="flex  items-center justify-center">
      <div className="w-[1200px] pb-4">
        <div className="w-full flex flex-col gap-1">
          <span className="font-semibold text-xl block">
            Welcome to our assessment,
          </span>
          <span className="text-base font-normal mt-4 block">
            These are not traditional assessment tests but fun & engaging
            gamified challenges for you to discover yourself and explore if you
            are the most SUITABLE for the applying position.
          </span>
          <span className="text-base font-normal mt-4 block">
            Are you up for the challenge?
          </span>
          <div className="py-2 px-5 flex flex-col gap-2">
            <Info listTest={listTest} />
          </div>
          <span className="text-base font-normal  block">
            Have fun and good luck.
          </span>
        </div>
        <div className="mt-3">
          <h4 className="font-semibold text-primary text-4xl">Choose a test</h4>
          <ListTest listTest={listTest} />
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
