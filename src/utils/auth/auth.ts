"use client";
import { User } from "@/types/auth";

export const localStorageEventTarget = new EventTarget();

export const setAccessTokenFromLs = (accessToken: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("access_token", accessToken);
  }
};

export const clearLocalStorage = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
    localStorage.removeItem("profile");
    const clearLocalStorageEvent = new Event("clearLocalStorage");
    localStorageEventTarget.dispatchEvent(clearLocalStorageEvent);
  }
};

export const getAccessTokenFromLS = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token") || "";
  }
  return "";
};

export const getProfileFromLS = () => {
  if (typeof window !== "undefined") {
    const result = localStorage.getItem("profile");
    return result ? JSON.parse(result) : null;
  }
  return null;
};

export const setProfileFromLS = (profile: User) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("profile", JSON.stringify(profile));
  }
};
