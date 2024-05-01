"use client";
import { authRequest } from "@/apiRequest/hrAuth";
import { sessionTokenHr, sessionTokenUser } from "@/lib/axios/customSession";
import { clearLocalStorage } from "@/utils/auth/auth";
import axios from "axios";
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
  // const [sessionToken, setSessionToken] = useState({
  //   accessTokenHr: "",
  //   accessTokenUser: "",
  // });

  // const handleSetSessionToken = async () => {
  //   const sess = await fetchCookie();
  //   setSessionToken(sess);
  // };
  // useEffect(() => {
  //   handleSetSessionToken();
  // }, []);
  instanceAxios.interceptors.request.use(async (config) => {
    if (config.url?.includes("/candidate")) {
      if (sessionTokenUser.value) {
        config.headers.authorization = `Bearer ${sessionTokenUser.value}`;
      } else {
        const sess = await fetchCookie();
        sessionTokenUser.value = sess.accessTokenUser;
        config.headers.authorization = `Bearer ${sessionTokenUser.value}`;
      }
    } else {
      if (sessionTokenHr.value) {
        config.headers.authorization = `Bearer ${sessionTokenHr.value}`;
      } else {
        const sess = await fetchCookie();
        sessionTokenHr.value = sess.accessTokenHr;
        config.headers.authorization = `Bearer ${sessionTokenHr.value}`;
      }
    }
    return config;
  });
  instanceAxios.interceptors.response.use(async (response) => {
    let accessToken;
    const { url } = response.config;
    const data = response.data.data;
    if (url === "/login") {
      // accessToken = data.access_token;
    } else if (url === "/logout") {
      accessToken = "";
      clearLocalStorage();
    }
    return response;
  });
  return <>{children}</>;
};
export default instanceAxios;
export { AxiosInterceptor };
