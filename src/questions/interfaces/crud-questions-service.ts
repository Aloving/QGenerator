import { ICrudService } from '../../interfaces';
import { CreateQuestionDto } from '../dto';
import { Question } from '../entities';
import { IQuestion } from './IQuestion';

export interface ICrudQuestionsService
  extends ICrudService<Question, CreateQuestionDto> {
  randomizeOne(excludeIds: IQuestion['id'][]): Promise<Question | undefined>;
}
