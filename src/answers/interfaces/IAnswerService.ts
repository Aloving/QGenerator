import { CreateAnswerDto, UpdateAnswerDto } from '../dto';
import { Answer } from '../entities';

export interface IAnswerService {
  create(createDto: CreateAnswerDto): Promise<Answer>;
  update(id: Answer['id'], data: UpdateAnswerDto): Promise<Answer>;
  remove(id: Answer['id']): Promise<boolean>;
  like(id: Answer['id']): Promise<Answer>;
  dislike(id: Answer['id']): Promise<Answer>;
}
