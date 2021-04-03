import { Connection } from 'typeorm';

import { RepositoryEnum, ProviderEnum } from '../enums';
import { Answer } from './entities';

export const answersProviders = [
  {
    provide: RepositoryEnum.AnswersRepository,
    useFactory: (connection: Connection) => connection.getRepository(Answer),
    inject: [ProviderEnum.DatabaseConnection],
  },
];
