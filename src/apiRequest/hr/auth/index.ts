import { AuthResponse, TLogin, User } from "@/types/auth";
import { instanceAxios } from "@/utils/axios/customize";

export const authHrRequest = {
  login: (data: TLogin) => instanceAxios.post<AuthResponse>(`/login`, data),
  logout: () => instanceAxios.post(`/logout`),
};
