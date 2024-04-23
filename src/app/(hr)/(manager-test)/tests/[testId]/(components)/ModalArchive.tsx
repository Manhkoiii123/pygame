import { Modal } from "antd";
import React from "react";
interface TProps {
  openArchive: boolean;
  setOpenArchive: React.Dispatch<React.SetStateAction<boolean>>;
}
const ModalArchive = (props: TProps) => {
  const { openArchive, setOpenArchive } = props;
  return (
    <Modal
      width={480}
      centered
      footer={() => (
        <div className="flex gap-4 justify-end mt-8">
          <button
            onClick={() => setOpenArchive(false)}
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
          Are you sure you want to archive this project
        </span>
      }
      open={openArchive}
      onCancel={() => {
        setOpenArchive(false);
      }}
    >
      <span className="text-[16px] leading-[24px] font-normal text-primary mt-8 block">
        If you archie this project, all participants will lose access to it. We
        will safely keep it for you in case you want to restore
      </span>
    </Modal>
  );
};

export default ModalArchive;
