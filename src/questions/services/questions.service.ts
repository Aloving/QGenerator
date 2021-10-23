import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { RepositoryEnum } from '../../enums';
import { QuestionsCrudService } from './questions-crud.service';
import { IQuestionService } from '../interfaces';
import { Question } from '../entities';
import { GetRandomQuestionDto } from '../dto';

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

  async randomize({ excludeIds }: GetRandomQuestionDto) {
    const question = await this.randomizeOne(excludeIds);

    if (question) {
      return {
        excludeIds: this.getUpdatedExcludeIds(excludeIds, question.id),
        question,
      };
    }

    const firstQuestion = await this.randomizeOne([]);

    return {
      excludeIds: [firstQuestion.id],
      question: firstQuestion,
    };
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
      likes: questionToUpdate.likes - 1,
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
      dislikes: +questionToUpdate.dislikes - 1,
    });
  }

  private getUpdatedExcludeIds(
    excludeIds: Question['id'][],
    questionId: Question['id'],
  ) {
    return excludeIds.includes(questionId)
      ? excludeIds
      : [...excludeIds, questionId];
  }
}
