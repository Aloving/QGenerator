import { Module, forwardRef } from '@nestjs/common';

import { DatabaseModule } from '../database';
import { usersProviders } from './users.providers';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CryptModule } from '../crypt';
import { RolesGuard } from './guards';
import { EnvModule } from '../env';
import { ServiceEnum } from '../enums';

@Module({
  imports: [EnvModule, CryptModule, forwardRef(() => DatabaseModule)],
  exports: [ServiceEnum.USERS_SERVICE, RolesGuard],
  providers: [
    { provide: ServiceEnum.USERS_SERVICE, useClass: UsersService },
    RolesGuard,
    ...usersProviders,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
