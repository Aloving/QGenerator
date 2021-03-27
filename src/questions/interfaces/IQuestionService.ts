import { Question } from '../entities';
import { CreateQuestionDto, UpdateQuestionDto } from '../dto';

export interface IQuestionService {
  create(createDto: CreateQuestionDto): Promise<Question>;
  findAll(): Promise<Question[]>;
  update(id: Question['id'], data: UpdateQuestionDto): Promise<Question>;
  remove(id: Question['id']): Promise<boolean>;
}
