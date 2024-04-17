import { SuccessResponse } from "@/types/utils.type";

export type TLogin = {
  email: string;
  password: string;
};
export type User = SuccessResponse<{
  access_token: string;
  email: string;
}>;
