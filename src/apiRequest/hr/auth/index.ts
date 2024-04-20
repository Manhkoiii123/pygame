import instanceAxios, { BASE_URL } from "@/lib/axios/axios.wrapper";
import { AuthResponse, TLogin, User } from "@/types/auth";
import axios from "axios";

export const authHrRequest = {
  login: (data: TLogin) =>
    axios.post<AuthResponse<User>>(`${BASE_URL}/login`, data),
  logout: () => instanceAxios.post(`/logout`),
};
