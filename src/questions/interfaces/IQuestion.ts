import { IAnswer } from '../../answers';

export interface IQuestion extends IQuestionData {
  id: number;
}

export interface IQuestionData {
  text: string;
  likes: string;
  dislikes: string;
  answers: IAnswer[];
}
