import { Connection } from 'typeorm';

import { ProviderEnum, RepositoryEnum } from '../enums';
import { QuestionProposal } from './entities';

export const questionProposalsProviders = [
  {
    provide: RepositoryEnum.QuestionsProposalsRepository,
    useFactory: (connection: Connection) =>
      connection.getRepository(QuestionProposal),
    inject: [ProviderEnum.DatabaseConnection],
  },
];
