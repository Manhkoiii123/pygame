// 1 là còn hạn
// 0 là hết hạn
// -1 disable
export interface TAssessment {
  id: number;
  user_id: number;
  job_function: string;
  job_position: string;
  name: string;
  status: number;
  start_date: string;
  end_date: string;
  token: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  candidates_count: number;
}
export interface TAssessmentData {
  name: string;
  job_function: string;
  job_position: string;
  start_date: string;
  end_date: string;
  user_id: number;
  token: string;
  updated_at: string;
  created_at: string;
  id: number;
}
export type game = {
  game_id: number[];
  option?: string[];
};
export type TDataCreateassessment = {
  name: string;
  job_function: string;
  job_position: string;
  start_date: string;
  end_date: string;
  game: game[];
};
