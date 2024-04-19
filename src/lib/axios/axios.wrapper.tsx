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
  const parts = res.split("=");
  return parts[1];
};
const setupInterceptors = (instanceAxios: AxiosInstance) => {
  let sessionToken;
  instanceAxios.interceptors.request.use(async (config) => {
    sessionToken = await fetchCookie();
    if (sessionToken) {
      config.headers.authorization = `Bearer ${sessionToken}`;
    }
    return config;
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
const AxiosInterceptor: FC<TAxiosInterceptor> = ({
  children,
  // sessionToken,
}) => {
  useEffect(() => {
    setupInterceptors(instanceAxios);
  }, []);

  return <>{children}</>;
};
export default instanceAxios;
export { AxiosInterceptor };
