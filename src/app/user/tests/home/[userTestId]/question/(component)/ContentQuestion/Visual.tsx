"use client";

import Footer from "@/app/user/tests/home/[userTestId]/question/(component)/Footer";
import Loading from "@/components/views/Loading";
import { AppContext } from "@/lib/context.wrapper";
import Image from "next/image";
import { useContext, useState } from "react";

const Visual = () => {
  const [isCorrect, setIsCorrect] = useState(0);
  const { generateQuestion } = useContext(AppContext);
  return (
    <>
      <div className="flex items-center gap-2 relative">
        {generateQuestion.question.content.question.image_1 &&
        generateQuestion.question.content.question.image_2 ? (
          <>
            <div className="p-2 flex-1 border border-gray-100 rounded-lg ">
              <Image
                src={generateQuestion.question.content.question.image_1!}
                width={200}
                height={300}
                alt="image1"
                className="object-cover rounded-lg sm:w-[200px] sm:h-[300px] w-[40%] h-[200px]"
              ></Image>
            </div>
            <div className="p-2 flex-1 border border-gray-100 rounded-lg">
              <Image
                src={generateQuestion.question.content.question.image_2!}
                width={200}
                height={300}
                alt="image1"
                className="object-cover rounded-lg sm:w-[200px] sm:h-[300px] w-[40%] h-[200px]"
              ></Image>
            </div>
          </>
        ) : (
          <>
            <div className="p-2 flex-1 border border-gray-100 rounded-lg ">
              <Loading />
            </div>
            <div className="p-2 flex-1 border border-gray-100 rounded-lg">
              <Loading />
            </div>
          </>
        )}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
          {isCorrect === 1 && (
            <div>
              <Image
                src={"/uploadSuccess.png"}
                alt="home banner"
                width={60}
                height={60}
              ></Image>
            </div>
          )}
          {isCorrect === -1 && (
            <div>
              <Image
                src={"/uploadFail.png"}
                alt="home banner"
                width={60}
                height={60}
              ></Image>
            </div>
          )}
        </div>
      </div>
      <Footer
        setIsCorrect={setIsCorrect}
        skip={true}
        numbers={["Same", "Different"]}
      />
    </>
  );
};

export default Visual;
