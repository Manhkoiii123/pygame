import Welcome from "@/app/user/tests/[testId]/(component)/Welcome";
import React from "react";
type TProps = {
  params: {
    testId: string;
  };
};
const page = (props: TProps) => {
  const { params } = props;
  const testId = params.testId;
  return <Welcome id={testId} />;
};

export default page;
