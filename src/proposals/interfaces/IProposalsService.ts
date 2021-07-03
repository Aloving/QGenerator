import { IAnswer } from '../../answers/interfaces';
import { IQuestionProposal } from './IQuestionProposal';
import { IAnswerProposal } from './IAnswerProposal';
import { CreateQuestionDto } from '../../questions/dto';
import { QuestionProposal } from '../entities';

export interface IProposalsService {
  offerQuestion(question: CreateQuestionDto): Promise<QuestionProposal>;
  // acceptQuestionOffer(
  //   questionProposalId: QuestionProposal['id'],
  // ): Promise<boolean>;
  findAllQuestionProposals(): Promise<QuestionProposal[]>;
  //
  // offerAnswer(question: Omit<IAnswer, 'id'>): Promise<IAnswerProposal>;
  // acceptAnswerOffer(answerProposalId: IAnswerProposal['id']): Promise<boolean>;
  // findAllAnswersProposals(): Promise<IAnswerProposal[]>;
}
