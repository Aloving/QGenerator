import { ICrudService } from '../../interfaces';
import { CreateQuestionDto } from '../dto';
import { Question } from '../entities';

export interface ICrudQuestionsService
  extends ICrudService<Question, CreateQuestionDto> {
  randomizeOne(): Promise<Question>;
}
