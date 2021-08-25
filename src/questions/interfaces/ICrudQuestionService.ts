import { CreateQuestionDto, UpdateQuestionDto } from "../dto";
import { Question } from "../entities";

export interface ICrudQuestionService {
  create(createDto: CreateQuestionDto): Promise<Question>;
  findAll(): Promise<Question[]>;
  update(id: Question["id"], data: UpdateQuestionDto): Promise<Question>;
  remove(id: Question["id"]): Promise<boolean>;
  findOne(id: Question["id"]): Promise<Question>;
  randomizeOne(): Promise<Question>;
}
