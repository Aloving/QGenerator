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

  async randomizeOne() {
    return await this.questionRepository
      .createQueryBuilder('question')
      .leftJoinAndSelect('question.answers', 'answer')
      .orderBy('RAND()')
      .getOne();
  }

  async randomize(excludeIds: number[]) {
    const question = await this.randomizeOne();

    return Promise.resolve({
      excludeIds,
      question,
    });
  }

  async increaseLikes(id: number) {
    const {
      id: _id,
      ...questionToUpdate
    } = await this.questionRepository.findOne(id);

    return this.update(id, {
      ...questionToUpdate,
      likes: questionToUpdate.likes + 1,
    });
  }

  async decreaseLikes(id: number) {
    const {
      id: _id,
      ...questionToUpdate
    } = await this.questionRepository.findOne(id);

    return this.update(id, {
      ...questionToUpdate,
      likes: questionToUpdate.likes - 1,
    });
  }

  async increaseDislikes(id: number) {
    const {
      id: _id,
      ...questionToUpdate
    } = await this.questionRepository.findOne(id);

    return this.update(id, {
      ...questionToUpdate,
      dislikes: questionToUpdate.dislikes + 1,
    });
  }

  async decreaseDislikes(id: number) {
    const {
      id: _id,
      ...questionToUpdate
    } = await this.questionRepository.findOne(id);

    return this.update(id, {
      ...questionToUpdate,
      dislikes: questionToUpdate.dislikes - 1,
    });
  }
}
