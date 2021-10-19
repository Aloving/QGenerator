import { Question } from '../entities';
import { ICrudQuestionsService } from './crud-questions-service';

export interface IQuestionService extends ICrudQuestionsService {
  randomize(
    excludeIds: Question['id'][],
  ): Promise<{
    excludeIds: Question['id'][];
    question: Question;
  }>;
  increaseLikes(id: Question['id']): Promise<Question>;
  decreaseLikes(id: Question['id']): Promise<Question>;
  increaseDislikes(id: Question['id']): Promise<Question>;
  decreaseDislikes(id: Question['id']): Promise<Question>;
}
