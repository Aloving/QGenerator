import { Connection } from 'typeorm';

import { RepositoryEnum, ProviderEnum } from '../enums';
import { Question, QuestionProposal } from './entities';

export const questionsProviders = [
  {
    provide: RepositoryEnum.QuestionRepository,
    useFactory: (connection: Connection) => connection.getRepository(Question),
    inject: [ProviderEnum.DatabaseConnection],
  },
  {
    provide: RepositoryEnum.QuestionsProposalsRepository,
    useFactory: (connection: Connection) => connection.getRepository(QuestionProposal),
    inject: [ProviderEnum.DatabaseConnection],
  },
];
