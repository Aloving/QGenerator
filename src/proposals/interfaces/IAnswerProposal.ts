import { IAnswer } from '../../answers/interfaces';

export interface IAnswerProposal {
  id: string;
  questionData: Omit<IAnswer, 'id'>;
}
