import { Repository, Not, In } from 'typeorm';
import { sample } from 'lodash';

import { UpdateQuestionDto, CreateQuestionDto } from '../dto';
import { ICrudQuestionsService } from '../interfaces';
import { Question } from '../entities';

export class QuestionsCrudService implements ICrudQuestionsService {
  constructor(public readonly questionRepository: Repository<Question>) {}

  async create(createQuestionDto: CreateQuestionDto) {
    const question = this.questionRepository.create(createQuestionDto);

    return this.questionRepository.save(question);
  }

  async randomizeOne(excludeIds: Question['id'][]) {
    const answers = await this.questionRepository.find({
      where: { id: Not(In(excludeIds)) },
    });

    return sample(answers);
  }

  async findAll() {
    return await this.questionRepository.find();
  }

  async findOne(id: Question['id']): Promise<Question> {
    return await this.questionRepository.findOne(id);
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return await this.questionRepository.save({ id, ...updateQuestionDto });
  }

  async remove(id: number) {
    await this.questionRepository.delete(id);

    return true;
  }
}
