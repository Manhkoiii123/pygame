import instanceAxios from "@/lib/axios/axios.wrapper";
import { AuthResponse } from "@/types/auth";
import { TAnswerResponse, TQuestion, TUserTest } from "@/types/user";
import axios from "axios";
type userResponse = {
  access_token: string;
};
type userAssRes = {
  company: {
    logo: null;
    company_name: string;
    start_date: string;
    end_date: string;
    setting: {
      show_point_net: boolean;
      show_filter_employee: boolean;
      show_success_only: boolean;
      email_invite_type: number;
      welcome_screen_type: number;
      introduction_screen_type: number;
      finish_assessment_screen_type: number;
    };
  };
};
export const BASE_URL = process.env.NEXT_PUBLIC_API_HOST;
export const userRequest = {
  userLogin: ({ data, token }: { data: FormData; token: string }) => {
    return axios.post<AuthResponse<userResponse>>(
      `${BASE_URL}/candidate-login?token=${token}`,
      data
    );
  },
  userFetchDetailAss: (data: { token: string }) => {
    return axios.post<AuthResponse<userAssRes>>(
      `${BASE_URL}/get-info-assessment`,
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
  answerQuestion: (data: {
    question_id: string;
    game_id: string;
    answer: string | undefined;
    is_skip: number;
  }) => {
    return instanceAxios.post<AuthResponse<TAnswerResponse>>(
      "/candidate/answer-question",
      data
    );
  },
  finishTest: (data: { game_id: number }) => {
    return instanceAxios.post<
      AuthResponse<{ score: number; status: number; used_time: number }>
    >("/candidate/finish-game", data);
  },
};
