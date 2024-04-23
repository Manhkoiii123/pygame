"use client";
import { User } from "@/types/auth";
import { TUserTest } from "@/types/user";
import { getAccessTokenFromLS, getProfileFromLS } from "@/utils/auth/auth";

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
const initialAppContext: AppContextType = {
  isAuthenticate: Boolean(getAccessTokenFromLS()),
  setIsAuthenticate: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  reset: () => null,
  numberQuestion: 0,
  setNumberQuestion: () => null,
  testUser: testUserInit,
  setTestUser: () => null,
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
