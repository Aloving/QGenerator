import { IQuestion } from '../../questions/interfaces';

export interface IQuestionProposal {
  id: string;
  questionData: Omit<IQuestion, 'id'>;
}
