"use client";
import { userRequest } from "@/apiRequest/user";
import Loading from "@/components/views/Loading";
import { AppContext } from "@/lib/context.wrapper";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

const EndGame = ({ id }: { id: number }) => {
  const { score, setScore } = useContext(AppContext);
  const router = useRouter();
  const callRequestFinishTest = async (id: number) => {
    const res = await userRequest.finishTest({ game_id: id });
    return res.data.data;
  };
  const finishTestMutation = useMutation({
    mutationFn: callRequestFinishTest,
  });
  const handleFinishTest = (id: number) => {
    finishTestMutation.mutate(id, {
      onSuccess: (res) => {
        setScore(res.score);
        setTimeout(() => {
          router.push(`/user/tests/home`);
        }, 3000);
      },
    });
  };
  useEffect(() => {
    handleFinishTest(id);
  }, []);
  return (
    <div className="font-medium bg-white px-12 py-6 border-[1px] border-[#009DBE] rounded-[16px] w-[700px]  mx-auto h-[500px] flex items-center justify-center ">
      <div className="mt-[30px] font-bold text-3xl text-blue-500">
        {finishTestMutation.isPending ? <Loading /> : <>Your Score: {score}</>}
      </div>
    </div>
  );
};

export default EndGame;
