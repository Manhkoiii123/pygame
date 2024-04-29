"use client";
import { authRequest } from "@/apiRequest/hrAuth";
import { clearLocalStorage } from "@/utils/auth/auth";
import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
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
  let sessionToken = {
    accessTokenHr: "",
    accessTokenUser: "",
  };
  const res = (await authRequest.getCookieFromNextServer()) as string;
  if (res.includes(";")) {
    const parts = res.split(";");
    for (let i = 0; i < parts.length; i++) {
      if (parts[i].includes("candicate_access_token")) {
        sessionToken.accessTokenUser = parts[i].trim().split("=")[1];
      }
      if (parts[i].includes("hr_access_token")) {
        sessionToken.accessTokenHr = parts[i].trim().split("=")[1];
      }
    }
    return sessionToken;
  } else {
    const parts = res.split("=");
    if (parts[0] === "candicate_access_token") {
      sessionToken.accessTokenUser = parts[1];
      sessionToken.accessTokenHr = "";
    }
    if (parts[0] === "hr_access_token") {
      sessionToken.accessTokenHr = parts[1];
      sessionToken.accessTokenUser = "";
    }
    return sessionToken;
  }
};

const AxiosInterceptor = ({ children }: TAxiosInterceptor) => {
  const [sessionToken, setSessionToken] = useState({
    accessTokenHr: "",
    accessTokenUser: "",
  });
  const handleSetSessionToken = async () => {
    const sess = await fetchCookie();
    setSessionToken(sess);
  };
  instanceAxios.interceptors.request.use(async (config) => {
    if (
      sessionToken.accessTokenHr === "" ||
      sessionToken.accessTokenUser === ""
    ) {
      handleSetSessionToken();
    }
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
  // if (!sessionToken.accessTokenHr && !sessionToken.accessTokenUser) return null;
  return <>{children}</>;
};
export default instanceAxios;
export { AxiosInterceptor };
