"use client";
import { userRequest } from "@/apiRequest/user";
import { AppContext } from "@/lib/context.wrapper";
import { useMutation } from "@tanstack/react-query";
import { Modal } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

const CloseButton = () => {
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const { testUser } = useContext(AppContext);
  const router = useRouter();
  const gameId = testUser.id as number;
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
        router.push(`/user/tests/home`);
      },
    });
  };
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
              onClick={() => handleFinishTest(gameId)}
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
              onClick={() => setOpenDelete(false)}
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
