import { CreateQuestionDto } from '../../questions/dto';
import { QuestionProposal } from '../entities';
import { QuestionProposalWithUserDto } from '../dto';

export interface IQuestionProposalsService {
  offerQuestion(
    question: CreateQuestionDto,
  ): Promise<QuestionProposalWithUserDto>;
  acceptQuestionProposal(
    questionProposalId: QuestionProposal['id'],
  ): Promise<QuestionProposalWithUserDto>;
  declineQuestionProposal(
    questionProposalId: QuestionProposal['id'],
  ): Promise<QuestionProposalWithUserDto>;
  findAllQuestionProposals(): Promise<QuestionProposalWithUserDto[]>;
  findQuestionProposal(
    proposalId: QuestionProposal['id'],
  ): Promise<QuestionProposalWithUserDto>;
}
