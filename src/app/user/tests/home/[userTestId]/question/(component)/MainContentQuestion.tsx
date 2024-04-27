"use client";
import { userRequest } from "@/apiRequest/user";
import { AppContext } from "@/lib/context.wrapper";
import { useMutation } from "@tanstack/react-query";
import React, { useContext, useEffect } from "react";

const MainContentQuestion = () => {
  const { testUser, setGenerateQuestion } = useContext(AppContext);
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
        setGenerateQuestion(res);
      },
    });
  };
  useEffect(() => {
    handleFetchQuestion();
  }, []);
  return (
    <div className="border border-1 border-blue-50">MainContentQuestion</div>
  );
};

export default MainContentQuestion;
