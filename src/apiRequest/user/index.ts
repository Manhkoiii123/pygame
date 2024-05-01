import instanceAxios, { BASE_URL } from "@/lib/axios/axios.wrapper";
import { AuthResponse } from "@/types/auth";
import { TAnswerResponse, TQuestion, TUserTest } from "@/types/user";
import axios from "axios";
type userResponse = {
  access_token: string;
};
export const userRequest = {
  userLogin: ({ data, token }: { data: FormData; token: string }) => {
    return axios.post<AuthResponse<userResponse>>(
      `${BASE_URL}/candidate-login?token=${token}`,
      data
    );
  },
  userListTest: () => {
    return instanceAxios.get<AuthResponse<{ games: TUserTest[] }>>(
      "/candidate/list-game"
    );
  },
  generateQuestion: (data: FormData) => {
    return instanceAxios.post<AuthResponse<TQuestion>>(
      "/candidate/generate-question",
      data
    );
  },
  answerQuestion: (data: any) => {
    return instanceAxios.post<AuthResponse<TAnswerResponse>>(
      "/candidate/answer-question",
      data
    );
  },
};
