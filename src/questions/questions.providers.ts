import { Connection } from 'typeorm';

import { RepositoryEnum, ProviderEnum } from '../enums';
import { Question } from './entities';

export const questionsProviders = [
  {
    provide: RepositoryEnum.QuestionRepository,
    useFactory: (connection: Connection) => connection.getRepository(Question),
    inject: [ProviderEnum.DatabaseConnection],
  },
];
