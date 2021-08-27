import { Connection } from "typeorm";

import { RepositoryEnum, ProviderEnum } from "../enums";
import { User } from "./entities";

export const usersProviders = [
  {
    provide: RepositoryEnum.UserRepository,
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: [ProviderEnum.DatabaseConnection],
  },
];
