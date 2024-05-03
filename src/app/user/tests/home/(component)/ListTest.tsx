/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Test from "@/app/user/tests/home/(component)/Test";
import { TUserTest } from "@/types/user";

import React from "react";

const ListTest = ({ listTest }: { listTest: TUserTest[] | undefined }) => {
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-4 mt-3">
      {listTest &&
        listTest.map((item) => <Test key={item.id} data={item}></Test>)}
    </div>
  );
};

export default ListTest;
