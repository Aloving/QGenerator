import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { RepositoryEnum } from '../enums';
import { CreateAnswerDto, UpdateAnswerDto } from './dto';
import { IAnswerService } from './interfaces';
import { Answer } from './entities';

@Injectable()
export class AnswersService implements IAnswerService {
  constructor(
    @Inject(RepositoryEnum.AnswersRepository)
    private answersRepository: Repository<Answer>,
  ) {}

  async create(createAnswerDto: CreateAnswerDto) {
    const answer = this.answersRepository.create(createAnswerDto);

    return this.answersRepository.save(answer);
  }

  async update(id: string, updateAnswerDto: UpdateAnswerDto) {
    return this.answersRepository.save({ id, ...updateAnswerDto });
  }

  async remove(id: string) {
    await this.answersRepository.delete(id);

    return true;
  }

  async like(id: string) {
    const { id: _id, ...answerToUpdate } = await this.answersRepository.findOne(
      id,
    );

    return this.update(id, {
      ...answerToUpdate,
      likes: answerToUpdate.likes + 1,
    });
  }

  async dislike(id: string) {
    const { id: _id, ...answerToUpdate } = await this.answersRepository.findOne(
      id,
    );

    return this.update(id, {
      ...answerToUpdate,
      dislikes: answerToUpdate.dislikes + 1,
    });
  }
}
