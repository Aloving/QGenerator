import { IAuthor } from './IAuthor';

export interface IAnswer {
  id: string;
  text: string;
  author: IAuthor;
}
