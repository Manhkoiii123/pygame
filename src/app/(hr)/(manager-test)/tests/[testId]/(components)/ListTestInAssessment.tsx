import React from "react";
const mockData = [
  {
    name: "Verbal test",
    time: 100,
  },
  {
    name: "Numberical test",
    time: 200,
  },
  {
    name: "Logical test",
    time: 300,
  },
  {
    name: "Visual test",
    time: 400,
  },
  {
    name: "Memory test",
    time: 500,
  },
  {
    name: "Personality test",
    time: 600,
  },
];
const ListTestInAssessment = () => {
  return (
    <div
      className={`flex items-center gap-3 ${
        mockData.length > 3 ? "justify-between " : ""
      }`}
    >
      {mockData.map((item, index) => {
        return (
          <div
            key={index}
            className={`border border-1 border-gray-200 flex flex-col justify-between p-3 h-[84px]  rounded-lg ${
              mockData.length > 3 ? " flex-1" : "w-[294px]"
            } `}
          >
            <span>{item.name}</span>
            <span>{item.time}s</span>
          </div>
        );
      })}
    </div>
  );
};

export default ListTestInAssessment;
