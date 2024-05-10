import { userRequest } from "@/apiRequest/user";
import { AppContext } from "@/lib/context.wrapper";
import { TQuestion } from "@/types/user";
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
  generateQuestion,
  setTime,
  setQuestionOrAnswer,
}: {
  time: number;
  generateQuestion: TQuestion;
  setTime: Dispatch<SetStateAction<number>>;
  setQuestionOrAnswer: Dispatch<SetStateAction<number>>;
}) => {
  const { setGenerateQuestion } = useContext(AppContext);
  console.log(generateQuestion.question.content.question.list_arrows?.length);
  const [isCorrect, setIsCorrect] = useState(0);
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
      setAns((prev) => {
        return prev + "l";
      });
    } else if (event.key === "ArrowRight") {
      setAns((prev) => {
        return prev + "r";
      });
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
  const handleGenerateQuestion = async (data: FormData) => {
    const res = await userRequest.generateQuestion(data);
    return res.data.data;
  };
  const generateQuestionMutation = useMutation({
    mutationFn: handleGenerateQuestion,
  });
  const handleFetchQuestion = () => {
    const id = new FormData();
    id.append("game_id", generateQuestion.question.game_id.toString());
    generateQuestionMutation.mutate(id, {
      onSuccess: (res) => {
        if (res) {
          setGenerateQuestion(res);
          localStorage.setItem("generateQuestion", JSON.stringify(res));
          //
        }
      },
    });
  };
  const answerQuestionMutation = useMutation({
    mutationFn: handleAnswerQuestion,
  });
  const handleAnswerQuestionMutation = ({ message }: { message: string }) => {
    const data = {
      question_id: String(generateQuestion?.question.id),
      game_id: String(generateQuestion?.question.game_id),
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
          handleFetchQuestion();
          setQuestionOrAnswer(0);
        }, 1000);
      },
    });
  };
  useEffect(() => {
    if (
      ans.length ===
      generateQuestion.question.content.question.list_arrows?.length
    ) {
      handleAnswerQuestionMutation({ message: ans });
      setTime(-1);
    }
    if (time === 0) {
      setTime(-1);
      handleAnswerQuestionMutation({ message: ans });
    }
  }, [ans.length]);
  return (
    <>
      <div className="w-full p-4 bg-gradient-back-question flex items-center justify-center shadow-[0px_4px_10px_0px_#33B1CB_inset] border-t-4 border-l-4 border-r-4 border-b-1 border-[#33B1CB] rounded-2xl !relative">
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
                    className="w-6 h-6 text-primary"
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
                    className="w-6 h-6 text-primary"
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
                <div className="flex items-center gap-4 cursor-pointer">
                  <span className="text-xl font-medium text-primary">
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
                <div className="flex items-center gap-4 cursor-pointer">
                  <Image
                    src={"/buttonRight.png"}
                    alt="button left"
                    width={80}
                    height={80}
                  />
                  <span className="text-xl font-medium text-primary">
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