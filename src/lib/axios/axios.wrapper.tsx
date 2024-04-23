"use client";
import { authRequest } from "@/apiRequest/hrAuth";
import { clearLocalStorage } from "@/utils/auth/auth";
import axios, { AxiosInstance } from "axios";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
export const BASE_URL = process.env.NEXT_PUBLIC_API_HOST;

const instanceAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
type TAxiosInterceptor = {
  children: React.ReactNode;
};
const fetchCookie = async () => {
  const res = (await authRequest.getCookieFromNextServer()) as string;
  if (res.includes(";")) {
    const parts = res.split(";");
    const accessTokenHr = parts[0].trim().split("=")[1];
    const accessTokenUser = parts[1].trim().split("=")[1];
    return {
      accessTokenHr,
      accessTokenUser,
    };
  } else {
    const parts = res.split("=");
    return {
      accessTokenHr: parts[1],
      accessTokenUser: "",
    };
  }
};

const setupInterceptors = async (instanceAxios: AxiosInstance) => {
  let sessionToken: {
    accessTokenHr: string;
    accessTokenUser: string;
  };
  instanceAxios.interceptors.request.use(async (config) => {
    sessionToken = await fetchCookie();
    if (config.url?.includes("/candidate")) {
      if (sessionToken.accessTokenUser) {
        config.headers.authorization = `Bearer ${sessionToken.accessTokenUser}`;
      }
      return config;
    } else {
      if (sessionToken.accessTokenHr) {
        config.headers.authorization = `Bearer ${sessionToken.accessTokenHr}`;
      }
      return config;
    }
  });
  instanceAxios.interceptors.response.use(async (response) => {
    let accessToken;
    const { url } = response.config;
    const data = response.data.data;
    if (url === "/login") {
      accessToken = data.access_token;
    } else if (url === "/logout") {
      accessToken = "";
      clearLocalStorage();
      sessionToken.accessTokenHr = "";
    }
    return response;
  });
};
const AxiosInterceptor: FC<TAxiosInterceptor> = ({ children }) => {
  useEffect(() => {
    setupInterceptors(instanceAxios);
  }, []);

  return <>{children}</>;
};
export default instanceAxios;
export { AxiosInterceptor };
