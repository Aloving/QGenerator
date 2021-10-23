import { Question } from '../entities';
import { ICrudQuestionsService } from './crud-questions-service';
import { GetRandomQuestionDto, GetRandomQuestionResponseDto } from '../dto';

export interface IQuestionService extends ICrudQuestionsService {
  randomize(
    payload: GetRandomQuestionDto,
  ): Promise<GetRandomQuestionResponseDto>;
  increaseLikes(id: Question['id']): Promise<Question>;
  decreaseLikes(id: Question['id']): Promise<Question>;
  increaseDislikes(id: Question['id']): Promise<Question>;
  decreaseDislikes(id: Question['id']): Promise<Question>;
}
