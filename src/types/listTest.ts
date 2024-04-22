export type TTest = {
  created_at: null;
  description: string;
  id: number;
  image_cover: string;
  name: string;
  option: null;
  time: number;
  updated_at: null;
};
export interface Status {
  bgColor: string;
  text: string;
}
export type TTestAssessment = {
  id: number;
  name: string;
  description: string;
  time: number;
  option: string[] | null;
  image_cover: string;
  created_at: null;
  updated_at: null;
  pivot: {
    assessment_id: number;
    game_id: number;
  };
};
