import { User } from '../../users';

export interface IAnswer {
  id: string;
  text: string;
  author: User;
}
