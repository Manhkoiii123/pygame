import { listTestRequest } from "@/apiRequest/test";
import { TData } from "@/app/(hr)/(manager-test)/tests/[testId]/(components)/UpdateNote";
import Loading from "@/components/views/Loading";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InputNumber, InputNumberProps } from "antd";
import React, { LegacyRef, MutableRefObject, useRef } from "react";
import { toast } from "react-toastify";

const InputHiring = ({
  text,
  record,
  editHiringId,
  setEditHiringId,
}: {
  text: any;
  record: any;
  editHiringId: string;
  setEditHiringId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const inputRef = useRef<any>();

  const updateFeedbackReq = async (data: TData) => {
    const res = await listTestRequest.updateFeedback(data);
    return res;
  };
  const queryClient = useQueryClient();
  const updateHiring = useMutation({
    mutationFn: (data: TData) => updateFeedbackReq(data),
  });
  const handleUpdateHiring = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      const hiring = (inputRef?.current)!.value;
      const data = {
        assessment_candidate_id: record.id,
        hiring_stage: hiring,
      };
      updateHiring.mutate(data, {
        onSuccess: (res) => {
          queryClient.invalidateQueries({
            queryKey: ["listCandicate"],
          });
          setEditHiringId("");
          toast.success(res.data.message);
          inputRef.current!.value = "";
        },
      });
    }
  };

  return (
    <div className="flex items-center justify-center">
      {updateHiring.isPending ? (
        <Loading />
      ) : (
        <>
          {(editHiringId === "" || record.id !== editHiringId) && (
            <span
              onClick={() => setEditHiringId(record.id)}
              className="flex justify-center text-base font-medium text-primary"
            >
              {record.hiring_stage}
            </span>
          )}

          {editHiringId && record.id === editHiringId && (
            <InputNumber
              ref={inputRef}
              min={0}
              max={8}
              defaultValue={record.hiring_stage}
              onKeyDown={(event) => handleUpdateHiring(event)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default InputHiring;
