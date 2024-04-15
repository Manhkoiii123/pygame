import { Modal } from "antd";
import { Span } from "next/dist/trace";
import React from "react";
interface TProps {
  openDelete: boolean;
  setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>;
}
const ModalDelete = (props: TProps) => {
  const { openDelete, setOpenDelete } = props;
  return (
    <Modal
      centered
      width={480}
      footer={() => (
        <div className="flex gap-4 justify-end mt-8">
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
          >
            <span className="text-base font-medium text-[#E90C31]">
              Yes,Delete it
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
