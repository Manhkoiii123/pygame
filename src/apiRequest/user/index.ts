import instanceAxios from "@/lib/axios/axios.wrapper";
import { AuthResponse } from "@/types/auth";
type userResponse = {
  access_token: string;
};
export const userRequest = {
  userLogin: ({ data, token }: { data: FormData; token: string }) => {
    return instanceAxios.post<AuthResponse<userResponse>>(
      `/candidate-login?token=${token}`,
      data
    );
  },
};
