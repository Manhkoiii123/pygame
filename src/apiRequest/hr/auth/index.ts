import instanceAxios, { BASE_URL } from "@/lib/axios/axios.wrapper";
import { AuthResponse, TLogin } from "@/types/auth";
import axios from "axios";

export const authHrRequest = {
  login: (data: TLogin) => axios.post<AuthResponse>(`${BASE_URL}/login`, data),
  logout: () => instanceAxios.post(`/logout`),
};
