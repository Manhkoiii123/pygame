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
  const parts = res.split(";");
  const accessTokenHr = parts[0].trim().split("=")[1];
  const accessTokenUser = parts[1].trim().split("=")[1];
  return {
    accessTokenHr,
    accessTokenUser,
  };
};

const setupInterceptors = (instanceAxios: AxiosInstance) => {
  let sessionToken;
  instanceAxios.interceptors.request.use(async (config) => {
    sessionToken = await fetchCookie();
    if (config.url?.includes("candidate")) {
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
      sessionToken = "";
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
