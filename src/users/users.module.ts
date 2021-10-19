import { Module, forwardRef } from '@nestjs/common';

import { DatabaseModule } from '../database';
import { usersProviders } from './users.providers';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CryptModule } from '../crypt';
import { RolesGuard } from './guards';
import { EnvModule } from '../env';

@Module({
  imports: [EnvModule, CryptModule, forwardRef(() => DatabaseModule)],
  exports: [UsersService, RolesGuard],
  providers: [UsersService, RolesGuard, ...usersProviders],
  controllers: [UsersController],
})
export class UsersModule {}
