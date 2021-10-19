import { ICrudService } from '../../interfaces';
import { Answer } from '../entities';
import { CreateAnswerDto } from '../dto';

export interface ICrudAnswersService
  extends ICrudService<Answer, CreateAnswerDto> {}
