"use client";
import { User } from "@/types/auth";
import { TGame, TQuestion, TUserTest } from "@/types/user";
import {
  getAccessTokenFromLS,
  getProfileFromLS,
  getQuestionFromLS,
  getUserTestFromLS,
} from "@/utils/auth/auth";

import { createContext, useState } from "react";
interface AppContextType {
  isAuthenticate: boolean;
  setIsAuthenticate: React.Dispatch<React.SetStateAction<boolean>>;
  profile: User | null;
  setProfile: React.Dispatch<React.SetStateAction<User | null>>;
  reset: () => void;
  numberQuestion: number;
  setNumberQuestion: React.Dispatch<React.SetStateAction<number>>;
  testUser: TUserTest;
  setTestUser: React.Dispatch<React.SetStateAction<TUserTest>>;
  generateQuestion: TQuestion;
  setGenerateQuestion: React.Dispatch<React.SetStateAction<TQuestion>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}
export const testUserInit = {
  description: "",
  id: 0,
  image_cover: "",
  name: "",
  score: 0,
  status: 0,
  status_text: "",
  time: 0,
  used_time: 0,
};
export const generateQuestionInit = {
  question: {
    id: 0,
    game_id: 0,
    content: {
      question: {},
    },
    score: 0,
    level: "",
  },
  game_ended: false,
  time: 0,
  used_time: 0,
  total_score: 0,
  total_question: 0,
  answered_question_num: 0,
  option: null,
};
const initialAppContext: AppContextType = {
  isAuthenticate: Boolean(getAccessTokenFromLS()),
  setIsAuthenticate: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  reset: () => null,
  numberQuestion: 0,
  setNumberQuestion: () => null,
  testUser: getUserTestFromLS(),
  setTestUser: () => null,
  generateQuestion: getQuestionFromLS(),
  setGenerateQuestion: () => null,
  score: 0,
  setScore: () => null,
};
export const AppContext = createContext<AppContextType>(initialAppContext);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticate, setIsAuthenticate] = useState<boolean>(
    initialAppContext.isAuthenticate
  );
  const [profile, setProfile] = useState<User | null>(
    initialAppContext.profile
  );
  const [numberQuestion, setNumberQuestion] = useState<number>(
    initialAppContext.numberQuestion
  );
  const [testUser, setTestUser] = useState<TUserTest>(
    initialAppContext.testUser
  );
  const [generateQuestion, setGenerateQuestion] = useState<TQuestion>(
    initialAppContext.generateQuestion
  );
  const [score, setScore] = useState(initialAppContext.score);
  const reset = () => {
    setIsAuthenticate(false);
    setProfile(null);
  };

  return (
    <AppContext.Provider
      value={{
        reset,
        isAuthenticate,
        setIsAuthenticate,
        profile,
        setProfile,
        numberQuestion,
        setNumberQuestion,
        testUser,
        setTestUser,
        generateQuestion,
        setGenerateQuestion,
        score,
        setScore,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
