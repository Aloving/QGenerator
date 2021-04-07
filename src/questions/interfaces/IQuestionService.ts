import { Question } from '../entities';
import { CreateQuestionDto, UpdateQuestionDto } from '../dto';

export interface IQuestionService {
  create(createDto: CreateQuestionDto): Promise<Question>;
  findAll(): Promise<Question[]>;
  update(id: Question['id'], data: UpdateQuestionDto): Promise<Question>;
  remove(id: Question['id']): Promise<boolean>;
  generate(
    excludeIds: Question['id'][],
  ): Promise<{
    excludeIds: Question['id'][];
    question: Question;
  }>;
  like(id: Question['id']): Promise<Question>;
  dislike(id: Question['id']): Promise<Question>;
}
