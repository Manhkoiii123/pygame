import React from "react";
type TProps = {
  item: {
    name: string;
    value: number;
  };
};
const OnePerPoint = (props: TProps) => {
  const { item } = props;
  return (
    <div className="flex flex-col gap-2">
      <span className="text-primary font-medium text-base">{item.name}</span>
      <div className="flex items-center justify-between">
        <span className="text-sm text-ink100 font-normal">Task</span>
        <div className="w-[200px] h-[2px] bg-gray-300 rounded-lg">
          <div
            className={`bg-primary h-[2px] rounded-lg relative `}
            style={{ width: `${item.value}%` }}
          >
            <div className="w-3 h-3 rounded-full bg-primary absolute -top-[200%] left-[100%] "></div>
          </div>
        </div>
        <span className="text-sm text-ink100 font-normal">People</span>
      </div>
    </div>
  );
};

export default OnePerPoint;
