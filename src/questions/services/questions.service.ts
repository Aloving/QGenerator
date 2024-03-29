import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { RepositoryEnum } from '../../enums';
import { QuestionsCrudService } from './questions-crud.service';
import { IQuestionService } from '../interfaces';
import { Question } from '../entities';

@Injectable()
export class QuestionsService
  extends QuestionsCrudService
  implements IQuestionService {
  constructor(
    @Inject(RepositoryEnum.QuestionRepository)
    public readonly questionRepository: Repository<Question>,
  ) {
    super(questionRepository);
  }

  async randomize(excludeIds: number[]) {
    const question = await this.randomizeOne();

    return Promise.resolve({
      excludeIds,
      question,
    });
  }

  async increaseLikes(id: number) {
    const { id: _id, ...questionToUpdate } = await this.findOne(id);

    return this.update(id, {
      ...questionToUpdate,
      likes: questionToUpdate.likes + 1,
    });
  }

  async decreaseLikes(id: number) {
    const { id: _id, ...questionToUpdate } = await this.findOne(id);

    return this.update(id, {
      ...questionToUpdate,
      likes: String(+questionToUpdate.likes - 1),
    });
  }

  async increaseDislikes(id: number) {
    const { id: _id, ...questionToUpdate } = await this.findOne(id);

    return this.update(id, {
      ...questionToUpdate,
      dislikes: questionToUpdate.dislikes + 1,
    });
  }

  async decreaseDislikes(id: number) {
    const { id: _id, ...questionToUpdate } = await this.findOne(id);

    return this.update(id, {
      ...questionToUpdate,
      dislikes: String(+questionToUpdate.dislikes - 1),
    });
  }
}
