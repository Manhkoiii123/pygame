import { Button, Modal, Select } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const ModalInvite = (props: TProps) => {
  const { open, setOpen } = props;
  const [email, setEmail] = useState<string[]>([]);

  const isEmailValid = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const handleChange = (value: string[]) => {
    const emailInput = String(value[value.length - 1]);
    if (emailInput.length === 0) {
      console.log("Vui định nghĩa email");
    }
    if (isEmailValid(emailInput)) {
      setEmail((prev) => [...prev, emailInput]);
    } else {
      console.log("Vui định nghĩa email");
    }
  };

  const handleDeselect = (value: string) => {
    const newEmail = email.filter((item) => item !== value);
    setEmail(newEmail);
  };
  return (
    <Modal
      width={600}
      centered
      title={
        <span className="font-semibold text-3xl">Invite participants</span>
      }
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
    >
      <div className="flex items-center justify-between gap-2 my-4">
        <Select
          mode="tags"
          style={{ width: "100%", padding: "4px 0" }}
          onChange={handleChange}
          tokenSeparators={[","]}
          open={false}
          suffixIcon={null}
          value={email}
          placeholder="Please enter email"
          onDeselect={handleDeselect}
        />
        <Button type="primary" className="w-[100px]" htmlType="button">
          Invite
        </Button>
      </div>
      <span className="text-base text-primary font-medium ">
        Share your assessment link
      </span>
      <div className="mt-4 flex gap-0 border-2 border-red-200 rounded-lg px-[10px] items-center cursor-pointer">
        <input type="text" className="p-2 w-full rounded-lg" />
        <div className="rounded-lg">
          <div
            className="flex items-center gap-1"
            style={{
              width: "max-content",
            }}
          >
            <span className="text-secondary font-medium text-base">
              Copy link
            </span>
            <Image
              src={"/duplicate.png"}
              alt="copy"
              width={24}
              height={24}
            ></Image>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalInvite;
