import React from "react";
type TProps = {
  params: {
    testId: string;
  };
};
const page = (props: TProps) => {
  const { params } = props;
  const testId = params.testId;
  return (
    <>
      <span>{testId}</span>
    </>
  );
};

export default page;
