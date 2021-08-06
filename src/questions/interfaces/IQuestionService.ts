import { Question } from '../entities';
import { CreateQuestionDto, UpdateQuestionDto } from '../dto';

export interface IQuestionService {
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
