import ListTest from "@/app/user/tests/home/(component)/ListTest";
import React from "react";

const info = [
  {
    content:
      "This assessment includes [6] tests, which will take approximately [20 minutes] to accomplish.",
  },
  {
    content: "Read all the instructions carefully in each challenge.",
  },
  {
    content: "You can turn the audio on to enter the gamified world.",
  },
  {
    content:
      "Make sure you are not distracted by any other factors, stay focused and relaxed.",
  },
  {
    content: "Do not refresh the page or close the window while playing.",
  },
];
const HomePage = () => {
  return (
    <div className="w-[1200px] ">
      <div className="w-full flex flex-col gap-1">
        <span className="font-semibold text-xl block">
          Welcome to our assessment,
        </span>
        <span className="text-base font-normal mt-4 block">
          These are not traditional assessment tests but fun & engaging gamified
          challenges for you to discover yourself and explore if you are the
          most SUITABLE for the applying position.
        </span>
        <span className="text-base font-normal mt-4 block">
          Are you up for the challenge?
        </span>
        <div className="py-2 px-5 flex flex-col gap-2">
          {info.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-[10px] h-[10px] bg-[#333] rounded-full "></div>
              <span>{item.content}</span>
            </div>
          ))}
        </div>
        <span className="text-base font-normal  block">
          Have fun and good luck.
        </span>
      </div>
      <div className="mt-3">
        <h4 className="font-semibold text-primary text-4xl">Choose a test</h4>
        <ListTest />
      </div>
    </div>
  );
};

export default HomePage;
