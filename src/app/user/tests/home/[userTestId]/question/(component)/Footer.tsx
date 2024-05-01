"use client";
import { userRequest } from "@/apiRequest/user";
import { AppContext } from "@/lib/context.wrapper";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect, useRef, useContext } from "react";

function Footer({
  numbers,
  skip,
  setIsCorrect,
}: {
  numbers: [string, string];
  skip: boolean;
  setIsCorrect: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { testUser, generateQuestion, setGenerateQuestion } =
    useContext(AppContext);
  const handleAnswerQuestion = async (data: {
    question_id: string;
    game_id: string;
    answer: string | undefined;
    is_skip: number;
  }) => {
    const res = await userRequest.answerQuestion(data);
    return res.data.data;
  };
  const handleGenerateQuestion = async (data: FormData) => {
    const res = await userRequest.generateQuestion(data);
    return res.data.data;
  };
  const generateQuestionMutation = useMutation({
    mutationFn: handleGenerateQuestion,
  });
  const handleFetchQuestion = () => {
    const id = new FormData();
    id.append("game_id", testUser.id.toString());
    generateQuestionMutation.mutate(id, {
      onSuccess: (res) => {
        if (res) {
          setGenerateQuestion(res);
        }
      },
    });
  };

  const answerQuestionMutation = useMutation({
    mutationFn: handleAnswerQuestion,
  });
  const buttonRefs = useRef<(HTMLDivElement | null)[]>([null, null]);

  useEffect(() => {
    if (buttonRefs.current.length > 0 && buttonRefs.current[0]) {
      buttonRefs.current[0]?.focus();
    }
  }, []);
  const handleAnswerQuestionMutation = ({
    message,
    isSkip,
  }: {
    message?: string;
    isSkip: boolean;
  }) => {
    const data = {
      question_id: String(generateQuestion?.question.id),
      game_id: String(generateQuestion?.question.game_id),
      answer: message,
      is_skip: isSkip ? 1 : 0,
    };
    answerQuestionMutation.mutate(data, {
      onSuccess: (res) => {
        if (res.result === 1) {
          setIsCorrect(1);
        } else if (res.result === 0) {
          setIsCorrect(-1);
        }
        setTimeout(() => {
          setIsCorrect(0);
          handleFetchQuestion();
        }, 2000);
      },
    });
  };
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    number: [string, string]
  ) => {
    if (event.key === "ArrowLeft") {
      handleAnswerQuestionMutation({ message: number[0], isSkip: false });
    } else if (event.key === "ArrowRight") {
      handleAnswerQuestionMutation({ message: number[1], isSkip: false });
    } else if (event.key === "ArrowUp") {
      handleAnswerQuestionMutation({ isSkip: true });
    }
  };

  const handleClick = (index: number, number: string) => {
    if (index === 0) {
      handleAnswerQuestionMutation({ message: number, isSkip: false });
    } else if (index === 1) {
      handleAnswerQuestionMutation({ message: number, isSkip: false });
    } else {
      handleAnswerQuestionMutation({ isSkip: true });
    }
  };

  return (
    <div className="mt-6 flex flex-col">
      {skip && (
        <div className=" inline-block">
          <div
            className="flex items-center justify-center gap-2 flex-col cursor-pointer"
            onClick={() => handleClick(2, "skip")}
            onKeyDown={(event) => handleKeyDown(event, numbers)}
          >
            <span className="text-primary font-medium text-xl">Skip</span>
            <Image
              src={"/buttonSkip.png"}
              alt="button left"
              width={60}
              height={60}
            />
          </div>
        </div>
      )}
      <div className="flex gap-40 items-center justify-center ">
        {numbers.map((number, index) => (
          <div
            key={index}
            ref={(element) => {
              buttonRefs.current[index] = element;
            }}
            tabIndex={0}
            data-value={number}
            onClick={() => handleClick(index, number)}
            onKeyDown={(event) => handleKeyDown(event, numbers)}
            className="outline-none"
          >
            {index === 0 ? (
              <>
                <div className="flex gap-4 items-center cursor-pointer">
                  <span className="text-primary font-medium text-xl">
                    {number}
                  </span>
                  <Image
                    src={"/buttonLeft.png"}
                    alt="button left"
                    width={80}
                    height={80}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex gap-4 items-center cursor-pointer">
                  <Image
                    src={"/buttonRight.png"}
                    alt="button left"
                    width={80}
                    height={80}
                  />
                  <span className="text-primary font-medium text-xl">
                    {number}
                  </span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Footer;
