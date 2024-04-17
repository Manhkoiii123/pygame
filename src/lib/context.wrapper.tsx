"use client";
import { User } from "@/types/auth";
import { getAccessTokenFromLS, getProfileFromLS } from "@/utils/auth/auth";
import { createContext, useState } from "react";

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

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticate, setIsAuthenticate] = useState<boolean>(
    initialAppContext.isAuthenticate
  );
  const [profile, setProfile] = useState<User | null>(
    initialAppContext.profile
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
