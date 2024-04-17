"use client";
import { User } from "@/types/auth";
import { getAccessTokenFromLS, getProfileFromLS } from "@/utils/auth/auth";
import { sessionToken } from "@/utils/axios/customSession";

import { createContext, useEffect, useState } from "react";
interface AppContextType {
  isAuthenticate: boolean;
  setIsAuthenticate: React.Dispatch<React.SetStateAction<boolean>>;
  profile: User | null;
  setProfile: React.Dispatch<React.SetStateAction<User | null>>;
  reset: () => void;
}

const initialAppContext: AppContextType = {
  isAuthenticate: Boolean(getAccessTokenFromLS()),
  setIsAuthenticate: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  reset: () => null,
};
export const AppContext = createContext<AppContextType>(initialAppContext);

export const AppProvider = ({
  children,
  initSession = "",
}: {
  children: React.ReactNode;
  initSession?: string;
}) => {
  const [isAuthenticate, setIsAuthenticate] = useState<boolean>(
    initialAppContext.isAuthenticate
  );
  const [profile, setProfile] = useState<User | null>(
    initialAppContext.profile
  );
  useState(() => {
    if (typeof window !== "undefined") {
      sessionToken.value = initSession;
    }
  });
  const reset = () => {
    setIsAuthenticate(false);
    setProfile(null);
    sessionToken.value = "";
  };

  return (
    <AppContext.Provider
      value={{
        reset,
        isAuthenticate,
        setIsAuthenticate,
        profile,
        setProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
