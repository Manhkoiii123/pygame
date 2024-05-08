import { listTestRequest } from "@/apiRequest/test";
import Loading from "@/components/views/Loading";
import { TAssessment } from "@/types/listAssessment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal } from "antd";
import { Span } from "next/dist/trace";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
interface TProps {
  openDelete: boolean;
  setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>;
  data?: TAssessment;
}
const ModalDelete = (props: TProps) => {
  const { openDelete, setOpenDelete, data } = props;
  const queryClient = useQueryClient();
  const handleDelete = async (id: number | undefined) => {
    if (!id) return;
    const formData = new FormData();
    formData.append("assessment_id", String(id));
    const res = await listTestRequest.deleteAssessment(formData);
    return res.data.data.item;
  };
  const deleteAssessmentMutation = useMutation({
    mutationFn: () => handleDelete(data?.id),
    onSuccess: () => {
      toast.success("Xóa thành công", { autoClose: 2000 });
      setOpenDelete(false);
      queryClient.invalidateQueries({
        queryKey: ["listAssessment"],
      });
    },
  });
  return (
    <Modal
      centered
      width={480}
      footer={() => (
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={() => setOpenDelete(false)}
            style={{
              backgroundColor: "#DEDDDD",
              borderColor: "#DEDDDD",
              padding: "4px 16px 4px 16px",
              borderRadius: "8px",
            }}
          >
            <span className="text-base font-medium text-[##22313F]">
              No,go back
            </span>
          </button>
          <button
            style={{
              backgroundColor: "#FFE7E1",
              borderColor: "#FFE7E1",
              padding: "4px 16px 4px 16px",
              borderRadius: "8px",
            }}
            onClick={() => deleteAssessmentMutation.mutate()}
          >
            <span className="text-base font-medium text-[#E90C31]">
              {deleteAssessmentMutation.isPending ? (
                <Loading></Loading>
              ) : (
                "Yes,Delete it"
              )}
            </span>
          </button>
        </div>
      )}
      title={
        <span className="text-[20px] leading-[28px] font-medium text-primary">
          You are about to delete an assessment
        </span>
      }
      open={openDelete}
      onCancel={() => {
        setOpenDelete(false);
      }}
    >
      <span className="text-[16px] leading-[24px] font-normal text-primary mt-8 block">
        Deleting a project permanently removes all result
      </span>
    </Modal>
  );
};

export default ModalDelete;
