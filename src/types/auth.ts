export type TLogin = {
  email: string;
  password: string;
};
export type User = {
  access_token: string;
  email: string;
};
export type AuthResponse = {
  success: boolean;
  code: number;
  message: string;
  data: User;
};
