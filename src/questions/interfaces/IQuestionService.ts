import { Question, QuestionProposal } from '../entities';
import { ICrudQuestionService } from './ICrudQuestionService';
import { CreateQuestionDto } from '../dto';

export interface IQuestionService extends ICrudQuestionService {
  randomize(excludeIds: Question['id'][]): Promise<{
    excludeIds: Question['id'][];
    question: Question;
  }>;
  increaseLikes(id: Question['id']): Promise<Question>;
  decreaseLikes(id: Question['id']): Promise<Question>;
  increaseDislikes(id: Question['id']): Promise<Question>;
  decreaseDislikes(id: Question['id']): Promise<Question>;

  offerQuestion(question: CreateQuestionDto): Promise<QuestionProposal>;
  acceptQuestionProposal(
    questionProposalId: QuestionProposal['id'],
  ): Promise<Question>;
  findAllQuestionProposals(): Promise<QuestionProposal[]>;
  findQuestionProposal(
    proposalId: QuestionProposal['id'],
  ): Promise<QuestionProposal>;
}
