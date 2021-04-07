import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { QuestionsController } from '../questions.controller';
import { QuestionsService } from '../questions.service';
import { RepositoryEnum } from '../../enums';
import { Question } from '../entities';

export const compileTestQuestionModule = async () => {
  const moduleRef = await Test.createTestingModule({
    controllers: [QuestionsController],
    imports: [],
    providers: [
      {
        provide: RepositoryEnum.QuestionRepository,
        useValue: {
          create: jest.fn(),
          save: jest.fn(),
          find: jest.fn(),
          findOne: jest.fn(),
          update: jest.fn(),
          delete: jest.fn(),
          createQueryBuilder: jest.fn().mockImplementation(() => ({
            leftJoinAndSelect: jest.fn(),
            orderBy: jest.fn(),
            getOne: jest.fn().mockResolvedValue({}),
          })),
        },
      },
      QuestionsService,
    ],
  }).compile();
  const questionController = moduleRef.get<QuestionsController>(
    QuestionsController,
  );
  const questionService = moduleRef.get<QuestionsService>(QuestionsService);
  const questionRepository = moduleRef.get<Repository<Question>>(
    RepositoryEnum.QuestionRepository,
  );

  return {
    questionController,
    questionService,
    questionRepository,
  };
};
