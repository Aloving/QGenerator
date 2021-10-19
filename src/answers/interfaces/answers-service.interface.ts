import { Answer } from '../entities';
import { ICrudAnswersService } from './crud-answers-service.interface';

export interface IAnswersService extends ICrudAnswersService {
  like(id: Answer['id']): Promise<Answer>;
  dislike(id: Answer['id']): Promise<Answer>;
}
