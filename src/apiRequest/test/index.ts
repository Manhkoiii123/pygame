import instanceAxios from "@/lib/axios/axios.wrapper";
import { AuthResponse } from "@/types/auth";
import {
  TAssessment,
  TAssessmentData,
  TAssessmentDetail,
  TDataCreateassessment,
} from "@/types/listAssessment";
import { TTest } from "@/types/listTest";

type TListCandicate = {
  id: number;
  email: string;
  note: string;
  grading: number;
  hiring_stage: number;
  verbal_game: string;
  count_change_tab_verbal_game: string;
  verbal_game_used_time: string;
  rank_verbal_game: number;
  numerical_game: string;
  count_change_tab_numerical_game: string;
  numerical_game_used_time: string;
  rank_numerical_game: number;
  logical_game: string;
  count_change_tab_logical_game: string;
  logical_game_used_time: string;
  rank_logical_game: number;
  visual_game: string;
  count_change_tab_visual_game: string;
  visual_game_used_time: string;
  rank_visual_game: number;
  memory_game: string;
  count_change_tab_memory_game: string;
  memory_game_used_time: string;
  rank_memory_game: number;
  personality_game: string;
  count_change_tab_personality_game: string;
  personality_game_used_time: string;
  rank_personality_game: number;
  it_php_game: string;
  count_change_tab_it_php_game: string;
  it_php_game_used_time: string;
  rank_it_php_game: number;
  it_python_game: string;
  count_change_tab_it_python_game: string;
  it_python_game_used_time: string;
  rank_it_python_game: number;
  it_csharp_game: string;
  count_change_tab_it_csharp_game: string;
  it_csharp_game_used_time: string;
  rank_it_csharp_game: number;
  it_java_game: string;
  count_change_tab_it_java_game: string;
  it_java_game_used_time: string;
  rank_it_java_game: number;
  numerical_math_game: string;
  count_change_tab_numerical_math_game: string;
  numerical_math_game_used_time: string;
  rank_numerical_math_game: number;
  logical_reasoning_game: string;
  count_change_tab_logical_reasoning_game: string;
  logical_reasoning_game_used_time: string;
  rank_logical_reasoning_game: number;
};
export const listTestRequest = {
  fetchListTest: async () =>
    await instanceAxios.get<AuthResponse<{ games: TTest[] }>>("list-game"),
  fetchListAssessment: async (status: number) =>
    await instanceAxios.get<AuthResponse<{ assessments: TAssessment[] }>>(
      `/list-assessment?status=${status}`
    ),
  createAssessment: async (data: FormData) =>
    await instanceAxios.post<AuthResponse<{ item: TAssessmentData }>>(
      "/create-assessment",
      data
    ),
  deleteAssessment: async (data: FormData) =>
    await instanceAxios.post<AuthResponse<{ item: string }>>(
      "/delete-assessment",
      data
    ),
  detailAssessment: async (id: string) => {
    return await instanceAxios.get<AuthResponse<TAssessmentDetail>>(
      `/detail-assessment?assessment_id=${id}`
    );
  },
  inviteCandicate: async (data: FormData) => {
    return await instanceAxios.post<AuthResponse<any>>(
      "/invite-candidate",
      data
    );
  },
  unActiveAss: async (data: { assessment_id: number }) => {
    return await instanceAxios.post<AuthResponse<any>>(
      "/archive-assessment",
      data
    );
  },
  activeAss: async (data: { assessment_id: number }) => {
    return await instanceAxios.post<AuthResponse<any>>(
      "/unarchive-assessment",
      data
    );
  },
  getCandicateInvateTest: async (data: {
    type: number;
    option: number;
    sort_field?: string;
    sort_type?: string;
    hiring_stage?: number;
    assessment_id: number;
  }) => {
    let url = "";
    if (data.sort_field) {
      url += `&sort_field=${data.sort_field}`;
    }
    if (data.sort_type) {
      url += `&sort_type=${data.sort_type}`;
    }
    if (data.hiring_stage) {
      url += `&hiring_stage=${data.hiring_stage}`;
    }
    return await instanceAxios.get<AuthResponse<{ result: TListCandicate[] }>>(
      `/list-candidate?type=${data.type}&option=${data.option}&assessment_id=${data.assessment_id}${url}`
    );
  },
};
