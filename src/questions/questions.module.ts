import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { questionsProviders } from './questions.providers';
import { QuestionProposalsService } from './questions-proposals.service';
import { UsersModule } from '../users';
import { CryptModule } from '../crypt';

@Module({
  imports: [DatabaseModule, UsersModule, CryptModule],
  controllers: [QuestionsController],
  providers: [
    ...questionsProviders,
    QuestionsService,
    QuestionProposalsService,
  ],
  exports: [QuestionsService, QuestionProposalsService],
})
export class QuestionsModule {}
