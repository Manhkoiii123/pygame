import instanceAxios from "@/lib/axios/axios.wrapper";
import { AuthResponse } from "@/types/auth";
import {
  TAssessment,
  TAssessmentData,
  TAssessmentDetail,
  TDataCreateassessment,
} from "@/types/listAssessment";
import { TTest } from "@/types/listTest";

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
};
