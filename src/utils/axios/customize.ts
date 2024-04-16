import axios from "axios";
export const BASE_URL = process.env.NEXT_PUBLIC_API_HOST;
export const instanceAxios = axios.create({
  baseURL: BASE_URL,
});
