// 1 là còn hạn
// 0 là hết hạn
// -1 disable
export type TAssessment = {
  id: number;
  name: string;
  numberConditions: number;
  lastActive: number;
  status: number;
};
