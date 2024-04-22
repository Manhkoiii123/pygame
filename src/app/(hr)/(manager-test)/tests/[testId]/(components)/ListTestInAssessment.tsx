import { TTestAssessment } from "@/types/listTest";
import React from "react";

const ListTestInAssessment = ({
  listTest,
}: {
  listTest: TTestAssessment[] | undefined;
}) => {
  return (
    <>
      {listTest && (
        <div
          className={`flex items-center gap-3 ${
            listTest.length > 3 ? "justify-between " : ""
          }`}
        >
          {listTest.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className={`border border-1 border-gray-200 flex flex-col justify-between p-3 h-[84px]  rounded-lg ${
                  listTest.length > 3 ? " flex-1" : "w-[294px]"
                } `}
              >
                <span
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.name}
                </span>
                <span>{item.time}s</span>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ListTestInAssessment;
