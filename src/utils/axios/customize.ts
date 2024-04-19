import { authHrRequest } from "@/apiRequest/hr/auth";
import { authRequest } from "@/apiRequest/hrAuth";
import {
  clearLocalStorage,
  setAccessTokenFromLs,
  setProfileFromLS,
} from "@/utils/auth/auth";
import axios from "axios";
export const BASE_URL = process.env.NEXT_PUBLIC_API_HOST;

export const instanceAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instanceAxios.interceptors.request.use((config) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    config.headers.authorization = `Bearer ${access_token}`;
  }
  return config;
});
instanceAxios.interceptors.response.use(async (response) => {
  let accessToken;
  const { url } = response.config;
  const data = response.data.data;
  if (url === "/login") {
    accessToken = data.access_token;
    setProfileFromLS(data);
    setAccessTokenFromLs(accessToken);
    await authRequest.setAccessToken(accessToken as string);
  } else if (url === "/logout") {
    accessToken = "";
    clearLocalStorage();
    await authRequest.logoutDeleteCookie();
  }
  return response;
});
