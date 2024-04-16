import { TLogin } from "@/types/auth";
import { instanceAxios } from "@/utils/axios/customize";

export const authHrRequest = {
  login: (data: TLogin) => instanceAxios.post(`/api/v1/login`, data),
};
