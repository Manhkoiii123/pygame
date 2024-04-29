"use client";
import { authRequest } from "@/apiRequest/hrAuth";
import { clearLocalStorage } from "@/utils/auth/auth";
import axios from "axios";
import { useEffect, useState } from "react";
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
  var accessTokenHr = "";
  var accessTokenUser = "";
  if (res.includes(";")) {
    const parts = res.split(";");
    for (let i = 0; i < parts.length; i++) {
      if (parts[i].includes("candicate_access_token")) {
        accessTokenUser = parts[i].trim().split("=")[1];
      }
      if (parts[i].includes("hr_access_token")) {
        accessTokenHr = parts[i].trim().split("=")[1];
      }
    }
    return {
      accessTokenHr,
      accessTokenUser,
    };
  } else {
    const parts = res.split("=");
    if (parts[0] === "candicate_access_token") {
      accessTokenUser = parts[1];
      accessTokenHr = "";
    }
    if (parts[0] === "hr_access_token") {
      accessTokenHr = parts[1];
      accessTokenUser = "";
    }
    return {
      accessTokenHr,
      accessTokenUser,
    };
  }
};

const AxiosInterceptor = ({ children }: TAxiosInterceptor) => {
  const [sessionToken, setSessionToken] = useState({
    accessTokenHr: "",
    accessTokenUser: "",
  });
  useEffect(() => {
    const handleSetSessionToken = async () => {
      const sess = await fetchCookie();
      setSessionToken(sess);
    };
    handleSetSessionToken();
  }, []);
  if (!sessionToken.accessTokenHr && !sessionToken.accessTokenUser) return null;
  instanceAxios.interceptors.request.use(async (config) => {
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

  return <>{children}</>;
};
export default instanceAxios;
export { AxiosInterceptor };
