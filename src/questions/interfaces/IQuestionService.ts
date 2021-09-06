import { Question } from '../entities';
import { ICrudQuestionService } from './ICrudQuestionService';

export interface IQuestionService extends ICrudQuestionService {
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
