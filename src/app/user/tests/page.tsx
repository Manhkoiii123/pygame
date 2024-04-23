import Welcome from "@/app/user/tests/(component)/Welcome";
import React from "react";
type TProps = {};
const page = (props: TProps) => {
  return (
    <div className="flex items-center justify-center">
      <Welcome />
    </div>
  );
};

export default page;
