import React from "react";

const Index = ({ params }: { params: { testId: string } }) => {
  return <h1>{params.testId}</h1>;
};

export default Index;
