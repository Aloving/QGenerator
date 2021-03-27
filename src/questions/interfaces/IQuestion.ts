import { IAnswer } from '../../answers';

export interface IQuestion {
  id: number;
  text: string;
  likes: number;
  dislikes: number;
  answers: IAnswer[];
}
