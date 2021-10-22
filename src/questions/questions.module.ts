import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database';
import { QuestionsService } from './services';
import { QuestionsController } from './questions.controller';
import { questionsProviders } from './questions.providers';
import { UsersModule } from '../users';
import { CryptModule } from '../crypt';
import { EnvModule } from '../env';

@Module({
  imports: [EnvModule, DatabaseModule, UsersModule, CryptModule],
  controllers: [QuestionsController],
  providers: [...questionsProviders, QuestionsService],
  exports: [QuestionsService],
})
export class QuestionsModule {}
