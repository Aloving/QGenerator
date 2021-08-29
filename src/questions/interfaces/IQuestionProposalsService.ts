import { CreateQuestionDto } from '../dto';
import { Question, QuestionProposal } from '../entities';

export interface IQuestionProposalsService {
  offerQuestion(question: CreateQuestionDto): Promise<QuestionProposal>;
  acceptQuestionProposal(
    questionProposalId: QuestionProposal['id'],
  ): Promise<boolean>;
  findAllQuestionProposals(): Promise<QuestionProposal[]>;
  findQuestionProposal(
    proposalId: QuestionProposal['id'],
  ): Promise<QuestionProposal>;
  // acceptAnswerOffer(answerProposalId: IAnswerProposal['id']): Promise<boolean>;
  // findAllAnswersProposals(): Promise<IAnswerProposal[]>;
}
