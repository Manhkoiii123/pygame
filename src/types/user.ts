export interface TUserTest {
  id: number;
  name: string;
  description: string;
  time: number;
  image_cover: string;
  status: number;
  used_time: number;
  score: number;
  status_text: string;
}
export interface TQuestion {
  question: {
    id: number;
    game_id: number;
    content: {
      question: TGame;
    };
    score: number;
    level: string;
  };
  game_ended: boolean;
  time: number;
  used_time: number;
  total_score: number;
  total_question: number;
  answered_question_num: number;
  option: null;
}
export interface TGame {
  //kết quả trả về của cái question lúc mà lấy ra các gene-quétion
  // id 1
  word_1?: string;
  word_2?: string;
  // id 2
  result_1?: number;
  result_2?: number;
  expression?: string;
  //id 3
  conclusion?: string;
  statement_1?: string;
  statement_2?: string;
  //id 4
}
