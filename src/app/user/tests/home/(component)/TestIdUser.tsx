"use client";
import { userRequest } from "@/apiRequest/user";
import Loading from "@/components/views/Loading";
import { AppContext } from "@/lib/context.wrapper";
import { TQuestion } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

const TestIdUser = ({ userTestId }: { userTestId: string }) => {
  const { testUser } = useContext(AppContext);
  const [genQuestion, setGenQuestion] = useState<TQuestion>();

  const handleGenerateQuestion = async (data: FormData) => {
    const res = await userRequest.generateQuestion(data);
    return res.data.data;
  };
  const generateQuestionMutation = useMutation({
    mutationFn: handleGenerateQuestion,
  });
  const handleFetchQuestion = () => {
    const id = new FormData();
    id.append("game_id", userTestId.toString());
    generateQuestionMutation.mutate(id, {
      onSuccess: (res) => {
        setGenQuestion(res);
      },
    });
  };
  useEffect(() => {
    handleFetchQuestion();
  }, [userTestId]);
  return (
    <>
      {generateQuestionMutation.isPending ? (
        <Loading></Loading>
      ) : (
        <div className=" w-[600px] flex justify-center">
          <div className="flex flex-col gap-4 items-center justify-center">
            <div className="w-[400px] h-[400px] border border-1 border-gray-200 rounded-lg">
              <Image
                src={"/test1.png"}
                alt="image"
                width={300}
                height={300}
                className="w-full h-full object-cover"
              ></Image>
            </div>
            <span className="font-semibold text-[32px] leading-[44px] text-primary">
              {testUser.name}
            </span>
            <div className="flex flex-col mr-auto gap-2 w-[600px]">
              <div className="flex items-center gap-2">
                <div className="w-[8px] h-[8px] bg-[#333] rounded-full"></div>
                <span>
                  {genQuestion?.total_question} questions are given in{" "}
                  {genQuestion?.time} seconds.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-[8px] h-[8px] bg-[#333] rounded-full flex self-start mt-[8px]"></div>
                <span>{testUser.description}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-[11px] h-[8px] bg-[#333] rounded-full flex self-start mt-[8px]"></div>
                <span>
                  Use the keyboard’s Left (&lt;) or Right (&gt;) arrow to answer
                  the question and the Up (^) arrow to skip the question.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TestIdUser;
