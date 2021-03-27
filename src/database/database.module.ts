import { Module } from '@nestjs/common';

import { EnvModule } from '../env';
import { databaseProviders } from './database.providers';

@Module({
  imports: [EnvModule],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
