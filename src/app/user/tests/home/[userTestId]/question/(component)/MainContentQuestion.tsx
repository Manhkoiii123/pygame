/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { userRequest } from "@/apiRequest/user";
import Header from "@/app/user/tests/home/[userTestId]/question/(component)/Header";
import Question from "@/app/user/tests/home/[userTestId]/question/(component)/Question";
import { AppContext } from "@/lib/context.wrapper";
import { TQuestion } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";

const MainContentQuestion = () => {
  const { testUser, setGenerateQuestion } = useContext(AppContext);
  const [questionGen, setQuestionGen] = useState<TQuestion>();
  const handleGenerateQuestion = async (data: FormData) => {
    const res = await userRequest.generateQuestion(data);
    return res.data.data;
  };
  const generateQuestionMutation = useMutation({
    mutationFn: handleGenerateQuestion,
  });
  const handleFetchQuestion = () => {
    const id = new FormData();
    id.append("game_id", testUser.id.toString());
    generateQuestionMutation.mutate(id, {
      onSuccess: (res) => {
        if (res) {
          setQuestionGen(res);
        }
      },
    });
  };
  useEffect(() => {
    handleFetchQuestion();
  }, []);
  return (
    <div className="p-5 border border-1 border-[#009DBE] rounded-2xl flex flex-col gap-4">
      <Header questionGen={questionGen} />
      <div className="w-[800px] h-[1px] bg-gradient-divider"></div>
      <Question questionGen={questionGen}></Question>
    </div>
  );
};

export default MainContentQuestion;
