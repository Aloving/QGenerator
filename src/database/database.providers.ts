import { createConnection } from 'typeorm';

import { ProviderEnum } from '../enums';

import { IEnv } from '../env';
import { User } from '../users';
import { Answer } from '../answers';
import { Question } from '../questions';

export const databaseProviders = [
  {
    provide: ProviderEnum.DatabaseConnection,
    useFactory: async (env: IEnv) => {
      return await createConnection({
        type: 'mysql',
        host: env.DB_HOST,
        port: env.DB_PORT,
        username: env.DB_USERNAME,
        password: env.DB_PASSWORD,
        database: env.DB_DATABASE,
        entities: [User, Answer, Question],
        synchronize: true,
      });
    },
    inject: [ProviderEnum.Env],
  },
];
