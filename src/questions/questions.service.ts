import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { RepositoryEnum } from '../enums';
import { UpdateQuestionDto, CreateQuestionDto } from './dto';
import { IQuestionService } from './interfaces';
import { Question } from './entities';

@Injectable()
export class QuestionsService implements IQuestionService {
  constructor(
    @Inject(RepositoryEnum.QuestionRepository)
    private questionRepository: Repository<Question>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    const question = this.questionRepository.create(createQuestionDto);

    return this.questionRepository.save(question);
  }

  async findAll() {
    return await this.questionRepository.find();
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return await this.questionRepository.save({ id, ...updateQuestionDto });
  }

  async remove(id: number) {
    await this.questionRepository.delete(id);

    return true;
  }

  async findOne() {
    return await this.questionRepository.findOne();
  }

  async generate(excludeIds) {
    const question = await this.findOne();

    return Promise.resolve({
      excludeIds,
      question,
    });
  }
}
