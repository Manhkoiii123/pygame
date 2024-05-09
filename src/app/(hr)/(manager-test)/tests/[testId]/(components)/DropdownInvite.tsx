"use client";
import MenuDropdown from "@/app/(hr)/(manager-test)/tests/[testId]/(components)/MenuDropdown";
import ModalInvite from "@/app/(hr)/(manager-test)/tests/[testId]/(components)/ModalInvite";
import { TDropdown } from "@/types/dropdown";
import { Button } from "antd";
import Image from "next/image";
import React, { useMemo, useState } from "react";

const DropdownInvite = ({
  id,
  token,
}: {
  id: string;
  token: string | undefined;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [open2, setOpen2] = useState<boolean>(false);
  const dropdownInvite: TDropdown[] = useMemo(() => {
    return [
      {
        key: "1",
        label: "Invite applications",
        onClick: () => {
          setOpen(true);
        },
      },
      {
        key: "2",
        label: "Invite employees",
        onClick: () => {
          setOpen2(true);
        },
      },
    ];
  }, []);
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
        keyOpen={"1"}
        token={token}
        id={id}
        open={open}
        setOpen={setOpen}
      />
      <ModalInvite
        keyOpen={"2"}
        token={token}
        id={id}
        open={open2}
        setOpen={setOpen2}
      />
    </>
  );
};

export default DropdownInvite;
