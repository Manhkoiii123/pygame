import MenuDropdown from "@/app/(hr)/(manager-test)/tests/[testId]/(components)/MenuDropdown";
import { TDropdown } from "@/types/dropdown";
import React, { useMemo, useState } from "react";

const TitleHiring = ({
  setHiring,
}: {
  setHiring: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const dropdownInvite: TDropdown[] = useMemo(() => {
    const tmp = Array(9)
      .fill(0)
      .map((item, index) => {
        return {
          key: String(index),
          label: index,
          onClick: () => {
            setHiring(String(index));
          },
        };
      });
    return tmp;
  }, []);
  return (
    <>
      <MenuDropdown items={dropdownInvite}>
        <div className="flex justify-center items-center gap-2 cursor-pointer">
          <span className="text-primary"> Hiring stage</span>{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 text-ink100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </MenuDropdown>
    </>
  );
};

export default TitleHiring;
