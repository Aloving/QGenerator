import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Answer } from '../entities';
import { CrudAnswersService } from './crud-answers.service';

import { RepositoryEnum } from '../../enums';
import { IAnswersService } from '../interfaces';

@Injectable()
export class AnswersService
  extends CrudAnswersService
  implements IAnswersService {
  constructor(
    @Inject(RepositoryEnum.AnswersRepository)
    public answersRepository: Repository<Answer>,
  ) {
    super(answersRepository);
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
