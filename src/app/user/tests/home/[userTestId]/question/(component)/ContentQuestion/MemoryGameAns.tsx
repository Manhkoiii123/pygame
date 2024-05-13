/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { userRequest } from "@/apiRequest/user";
import { AppContext } from "@/lib/context.wrapper";
import { TQuestionRe } from "@/types/user";

import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const MemoryGameAns = ({
  time,
  setTime,
  setQuestionOrAnswer,
  setQuestion,
  question,
  questionOrAnswer,
}: {
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
  setQuestionOrAnswer: Dispatch<SetStateAction<number>>;
  setQuestion: React.Dispatch<React.SetStateAction<TQuestionRe>>;
  question: TQuestionRe;
  questionOrAnswer: number;
}) => {
  const [isCorrect, setIsCorrect] = useState(0);
  const { setGenerateQuestion } = useContext(AppContext);
  const [ans, setAns] = useState("");
  const buttonRefs = useRef<(HTMLDivElement | null)[]>([null, null]);
  useEffect(() => {
    if (buttonRefs.current.length > 0 && buttonRefs.current[0]) {
      buttonRefs.current[0]?.focus();
    }
  }, []);
  const handleClick = (number: string) => {
    if (ans.length === 0) {
      setAns((prev) => {
        return (prev += number === "Left" ? "l" : "r");
      });
    } else {
      setAns((prev) => {
        return (prev += number === "Left" ? ",l" : ",r");
      });
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      if (ans.length === 0) {
        setAns((prev) => {
          return prev + "l";
        });
      } else {
        setAns((prev) => {
          return prev + ",l";
        });
      }
    } else if (event.key === "ArrowRight") {
      if (ans.length === 0) {
        setAns((prev) => {
          return prev + "r";
        });
      } else {
        setAns((prev) => {
          return prev + ",r";
        });
      }
    }
  };

  const handleAnswerQuestion = async (data: {
    question_id: string;
    game_id: string;
    answer: string | undefined;
    is_skip: number;
  }) => {
    const res = await userRequest.answerQuestion(data);
    return res.data.data;
  };

  const answerQuestionMutation = useMutation({
    mutationFn: handleAnswerQuestion,
  });
  const handleAnswerQuestionMutation = ({ message }: { message: string }) => {
    const data = {
      question_id: String(question?.id),
      game_id: String(question.game_id),
      answer: message,
      is_skip: 0,
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
          setGenerateQuestion(res);
          setQuestion(res.question);
          setQuestionOrAnswer(0);
        }, 1000);
      },
    });
  };
  useEffect(() => {
    if (
      ans.length === question.content.question.list_arrows?.length &&
      questionOrAnswer === 1
    ) {
      handleAnswerQuestionMutation({ message: ans });
      // setTime(0);
    }
  }, [ans.length]);
  useEffect(() => {
    if (time === 0 && questionOrAnswer === 1) {
      handleAnswerQuestionMutation({ message: ans });
    }
  }, [time]);
  return (
    <>
      <div className="w-full p-4 sm:h-[800px] bg-gradient-back-question flex items-center justify-center shadow-[0px_4px_10px_0px_#33B1CB_inset] border-t-4 border-l-4 border-r-4 border-b-1 border-[#33B1CB] rounded-2xl !relative">
        <span className="px-5 py-3 text-xl font-medium text-center flex items-center gap-2">
          {ans &&
            ans.split(",").map((item, index) => {
              if (item === "l") {
                return (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="sm:w-6 sm:h-6 w-3 h-3 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                );
              } else {
                return (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="sm:w-6 sm:h-6 w-3 h-3 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                );
              }
            })}
        </span>
        <div className="!absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
          {isCorrect === 1 && (
            <div>
              <Image
                src={"/uploadSuccess.png"}
                alt="home banner"
                width={60}
                height={60}
                className="sm:w-[60px] sm:h-[60px] w-[30px] h-[30px]"
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
                className="sm:w-[60px] sm:h-[60px] w-[30px] h-[30px]"
              ></Image>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center gap-40 ">
        {["Left", "Right"].map((number, index) => (
          <div
            key={index}
            ref={(element) => {
              buttonRefs.current[index] = element;
            }}
            tabIndex={0}
            data-value={number}
            onClick={() => handleClick(number)}
            onKeyDown={(event) => handleKeyDown(event)}
            className="outline-none"
          >
            {index === 0 ? (
              <>
                <div className={`flex items-center gap-4 cursor-pointer `}>
                  <span className=" sm:text-xl text-base font-medium text-primary">
                    {number}
                  </span>
                  <Image
                    src={"/buttonLeft.png"}
                    alt="button left"
                    width={80}
                    height={80}
                    className="sm:w-[80px] sm:h-[80px] w-[40px] h-[40px]"
                  />
                </div>
              </>
            ) : (
              <>
                <div className={`flex items-center gap-4 cursor-pointer `}>
                  <Image
                    src={"/buttonRight.png"}
                    alt="button left"
                    width={80}
                    height={80}
                    className="sm:w-[80px] sm:h-[80px] w-[40px] h-[40px]"
                  />
                  <span className="sm:text-xl text-base font-medium text-primary">
                    {number}
                  </span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default MemoryGameAns;
