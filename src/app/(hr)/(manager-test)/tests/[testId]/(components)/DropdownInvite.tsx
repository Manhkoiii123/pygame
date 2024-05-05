"use client";
import MenuDropdown from "@/app/(hr)/(manager-test)/tests/[testId]/(components)/MenuDropdown";
import ModalInvite from "@/app/(hr)/(manager-test)/tests/[testId]/(components)/ModalInvite";
import { TDropdown } from "@/types/dropdown";
import { Button } from "antd";
import Image from "next/image";
import React, { useState } from "react";

const DropdownInvite = ({
  id,
  token,
}: {
  id: string;
  token: string | undefined;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [key, setKey] = useState("");
  const dropdownInvite: TDropdown[] = [
    {
      key: "1",
      label: "Invite applications",
      onClick: () => {
        setKey("1");
        setOpen(true);
      },
    },
    {
      key: "2",
      label: "Invite employees",
      onClick: () => {
        setKey("2");
        setOpen(true);
      },
    },
  ];
  return (
    <>
      <MenuDropdown items={dropdownInvite}>
        <Button type="primary" size="large">
          <div className="flex gap-1">
            <Image src="/plus.png" alt="add" width={24} height={24}></Image>
            <span className="text-white">Invite participants</span>
          </div>
        </Button>
      </MenuDropdown>
      <ModalInvite
        key={key}
        token={token}
        id={id}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default DropdownInvite;
