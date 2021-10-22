import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Answer } from '../entities';
import { CrudAnswersService } from './crud-answers.service';
import { ProviderEnum, RepositoryEnum, ServiceEnum } from '../../enums';

import { IEnv } from '../../env/intefaces';
import { IAnswersService } from '../interfaces';
import { IUsersService } from '../../users/interfaces';

@Injectable()
export class AnswersService
  extends CrudAnswersService
  implements IAnswersService {
  constructor(
    @Inject(ServiceEnum.USERS_SERVICE) public usersService: IUsersService,
    @Inject(RepositoryEnum.AnswersRepository)
    public answersRepository: Repository<Answer>,
    @Inject(ProviderEnum.Env) env: IEnv,
  ) {
    super(answersRepository, usersService, env);
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
