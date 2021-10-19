import { Repository } from 'typeorm';

import { UpdateQuestionDto, CreateQuestionDto } from '../dto';
import { ICrudQuestionsService } from '../interfaces';
import { Question } from '../entities';

export class QuestionsCrudService implements ICrudQuestionsService {
  constructor(public readonly questionRepository: Repository<Question>) {}

  async create(createQuestionDto: CreateQuestionDto) {
    const question = this.questionRepository.create(createQuestionDto);

    return this.questionRepository.save(question);
  }

  async randomizeOne() {
    return await this.questionRepository
      .createQueryBuilder('question')
      .leftJoinAndSelect('question.answers', 'answer')
      .orderBy('RAND()')
      .getOne();
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
