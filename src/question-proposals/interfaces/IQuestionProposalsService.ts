import { CreateQuestionDto } from '../../questions/dto';
import { QuestionProposal } from '../entities';

export interface IQuestionProposalsService {
  offerQuestion(question: CreateQuestionDto): Promise<QuestionProposal>;
  acceptQuestionProposal(
    questionProposalId: QuestionProposal['id'],
  ): Promise<QuestionProposal>;
  declineQuestionProposal(
    questionProposalId: QuestionProposal['id'],
  ): Promise<QuestionProposal>;
  findAllQuestionProposals(): Promise<QuestionProposal[]>;
  findQuestionProposal(
    proposalId: QuestionProposal['id'],
  ): Promise<QuestionProposal>;
}
