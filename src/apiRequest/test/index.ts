import instanceAxios from "@/lib/axios/axios.wrapper";
import { AuthResponse } from "@/types/auth";
import { TTest } from "@/types/listTest";

export const listTestRequest = {
  fetchListTest: async () =>
    await instanceAxios.get<AuthResponse<{ games: TTest[] }>>("list-game"),
  fetchListAssessment: async (status: number) =>
    await instanceAxios.get<AuthResponse<{ games: TTest[] }>>(
      `/list-assessment?status=${status}`
    ),
};
