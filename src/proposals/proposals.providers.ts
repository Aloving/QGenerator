import { Connection } from 'typeorm';

import { RepositoryEnum, ProviderEnum } from '../enums';
import { QuestionProposal, Proposal } from './entities';

export const proposalsProviders = [
  // {
  //   provide: RepositoryEnum.ProposalsRepository,
  //   useFactory: (connection: Connection) => connection.getRepository(Proposal),
  //   inject: [ProviderEnum.DatabaseConnection],
  // },
  {
    provide: RepositoryEnum.QuestionRepository,
    useFactory: (connection: Connection) =>
      connection.getRepository(QuestionProposal),
    inject: [ProviderEnum.DatabaseConnection],
  },
];
