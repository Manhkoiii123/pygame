import { TLogin, User } from "@/types/auth";
import { SuccessResponse } from "@/types/utils.type";
import { instanceAxios } from "@/utils/axios/customize";

export const authHrRequest = {
  login: (data: TLogin) =>
    instanceAxios.post<SuccessResponse<User>>(`/login`, data),
};
