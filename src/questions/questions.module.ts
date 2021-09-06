import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { questionsProviders } from './questions.providers';
import { UsersModule } from '../users';
import { CryptModule } from '../crypt';

@Module({
  imports: [DatabaseModule, UsersModule, CryptModule],
  controllers: [QuestionsController],
  providers: [...questionsProviders, QuestionsService],
  exports: [QuestionsService],
})
export class QuestionsModule {}
