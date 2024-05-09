"use client";
import { listTestRequest } from "@/apiRequest/test";
import Loading from "@/components/views/Loading";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
export type TData = {
  assessment_candidate_id: number;
  grading?: number;
  hiring_stage?: number;
  note?: string;
};
const UpdateNote = ({
  id,
  setOpenNote,
  oldNote,
}: {
  id: number;
  setOpenNote: React.Dispatch<React.SetStateAction<boolean>>;
  oldNote: string;
}) => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    textRef.current!.value = oldNote;
  }, []);
  const updateFeedbackReq = async (data: TData) => {
    const res = await listTestRequest.updateFeedback(data);
    return res;
  };
  const queryClient = useQueryClient();
  const updateFeedbackMutation = useMutation({
    mutationFn: (data: TData) => updateFeedbackReq(data),
  });
  const saveNote = () => {
    const note = (textRef?.current)!.value;
    const data = {
      assessment_candidate_id: id,
      note: note,
    };
    updateFeedbackMutation.mutate(data, {
      onSuccess: (res) => {
        setOpenNote(false);
        toast.success(res.data.message);
        textRef.current!.value = "";
        queryClient.invalidateQueries({
          queryKey: ["listCandicate"],
        });
      },
    });
  };
  const handleCancel = () => {
    setOpenNote(false);
    (textRef?.current)!.value = oldNote;
  };
  return (
    <div className="absolute cursor-default top-[100%] -right-[50%] z-50 flex flex-col gap-3 bg-white rounded-lg w-[524px] h-[200px] p-3 shadow-[0px_0px_14px_-4px_#0000000D]">
      <div className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-primary"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
          />
        </svg>

        <span className="font-medium text-base text-primary">Leave a note</span>
      </div>
      <div className="h-[200px]">
        <textarea
          ref={textRef}
          placeholder="Write your note here"
          className="w-full text-primary border border-slate-200 rounded-lg py-3 px-5 outline-none bg-transparent h-full resize-none"
        />
      </div>
      <div className="flex gap-2 items-center justify-between">
        <div
          onClick={handleCancel}
          className=" bg-[#CCEBF2] rounded-lg flex-1 flex items-center justify-center py-2 text-secondary cursor-pointer"
        >
          Cancel
        </div>
        <div
          onClick={saveNote}
          className="bg-primary text-white rounded-lg flex-1 flex items-center justify-center py-2 cursor-pointer "
        >
          {updateFeedbackMutation.isPending ? <Loading /> : <>Save</>}
        </div>
      </div>
    </div>
  );
};

export default UpdateNote;
