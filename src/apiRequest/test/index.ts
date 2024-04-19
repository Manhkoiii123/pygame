import instanceAxios from "@/lib/axios/axios.wrapper";

export const listTestRequest = {
  fetchListTest: () => instanceAxios.get("list-game"),
};
