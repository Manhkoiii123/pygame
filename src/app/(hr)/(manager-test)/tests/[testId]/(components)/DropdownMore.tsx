"use client";
import MenuDropdown from "@/app/(hr)/(manager-test)/tests/[testId]/(components)/MenuDropdown";
import ModalArchive from "@/app/(hr)/(manager-test)/tests/[testId]/(components)/ModalArchive";
import ModalDelete from "@/app/(hr)/(manager-test)/tests/[testId]/(components)/ModalDelete";
import { TDropdown } from "@/types/dropdown";
import Image from "next/image";
import React, { useState } from "react";

const DropdownMore = () => {
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openArchive, setOpenArchive] = useState<boolean>(false);
  const dropdownMore: TDropdown[] = [
    {
      key: "1",
      label: "Edit assessment",
      onClick: () => {
        setOpenArchive(true);
      },
    },
    {
      key: "2",
      label: "Delete assessment",
      onClick: () => {
        setOpenDelete(true);
      },
    },
    {
      key: "3",
      label: "Archive assessment",
      onClick: () => {
        setOpenArchive(true);
      },
    },
  ];

  return (
    <>
      <MenuDropdown items={dropdownMore}>
        <div className="p-2 rounded-full border-gray-100 cursor-pointer border-2">
          <div className="flex gap-1">
            <Image src="/more.png" alt="add" width={24} height={24} />
          </div>
        </div>
      </MenuDropdown>
      <ModalDelete openDelete={openDelete} setOpenDelete={setOpenDelete} />
      <ModalArchive openArchive={openArchive} setOpenArchive={setOpenArchive} />
    </>
  );
};

export default DropdownMore;
