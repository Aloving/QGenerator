import { Question } from '../entities';
import { CreateQuestionDto, UpdateQuestionDto } from '../dto';

export interface IQuestionService {
  create(createDto: CreateQuestionDto): Promise<Question>;
  findAll(): Promise<Question[]>;
  update(id: Question['id'], data: UpdateQuestionDto): Promise<Question>;
  remove(id: Question['id']): Promise<boolean>;
  randomize(
    excludeIds: Question['id'][],
  ): Promise<{
    excludeIds: Question['id'][];
    question: Question;
  }>;
  findOne(id: Question['id']): Promise<Question>;
  increaseLikes(id: Question['id']): Promise<Question>;
  decreaseLikes(id: Question['id']): Promise<Question>;
  increaseDislikes(id: Question['id']): Promise<Question>;
  decreaseDislikes(id: Question['id']): Promise<Question>;
}
