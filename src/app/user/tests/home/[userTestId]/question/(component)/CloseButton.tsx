"use client";
import { Modal } from "antd";
import Image from "next/image";
import { useState } from "react";

const CloseButton = () => {
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  return (
    <>
      <div
        className="p-3 rounded-full bg-[#EFEFEF] inline-block cursor-pointer"
        onClick={() => setOpenDelete(true)}
      >
        <Image src={"/close.png"} alt="close" width={20} height={20} />
      </div>
      <Modal
        maskStyle={{ backdropFilter: "blur(10px)", backgroundColor: "none" }}
        title={
          <span className="font-medium text-xl text-primary">
            Are you sure you want to leave this test?
          </span>
        }
        centered
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
                Dismiss
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
                Leave Test
              </span>
            </button>
          </div>
        )}
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
      >
        <span className="font-normal text-base text-primary">
          If you leave the test, your current score will be recorded and you
          cannot continue or redo the test.
        </span>
      </Modal>
    </>
  );
};

export default CloseButton;
