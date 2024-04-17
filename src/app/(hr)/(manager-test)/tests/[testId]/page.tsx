import DropdownInvite from "@/app/(hr)/(manager-test)/tests/[testId]/(components)/DropdownInvite";
import DropdownMore from "@/app/(hr)/(manager-test)/tests/[testId]/(components)/DropdownMore";
import ListTestInAssessment from "@/app/(hr)/(manager-test)/tests/[testId]/(components)/ListTestInAssessment";
import MenuDropdown from "@/app/(hr)/(manager-test)/tests/[testId]/(components)/MenuDropdown";
import { dropdownMore } from "@/constants/dropdownInvite";

import { Divider } from "antd";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
export const metadata: Metadata = {
  title: "Manager test detail page",
  description: "Generated by create next app",
};

const Index = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href={"/tests"}
            className="p-2 rounded-full border-gray-100 cursor-pointer border-2"
          >
            <Image src="/left.png" alt="logo" width={24} height={24} />
          </Link>
          <div className="flex flex-col gap-1">
            <span className="text-xl font-medium text-primary">
              Assessment for UX Designer
            </span>
            <div>
              <span className="text-xs font-normal text-ink100">Date : </span>
              <span className="text-xs font-normal text-primary">
                From 03 March 2022 to 20 March 2022 • 18 days
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <DropdownInvite></DropdownInvite>
          <DropdownMore></DropdownMore>
        </div>
      </div>
      <Divider />
      <div>
        <ListTestInAssessment />
      </div>
    </>
  );
};

export default Index;
