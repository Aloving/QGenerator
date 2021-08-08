import { QuestionProposal } from "../entities/question-proposals.entity";
import { CreateQuestionDto } from "../dto";

export interface IQuestionProposalsService {
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
