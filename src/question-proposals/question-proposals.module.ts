import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database';
import { CryptModule } from '../crypt';
import { QuestionProposalsController } from './question-proposals.controller';
import { QuestionProposalsService } from './question-proposals.service';
import { questionProposalsProviders } from './question-proposals.providers';
import { QuestionsModule } from '../questions';
import { UsersModule } from '../users';

@Module({
  imports: [DatabaseModule, CryptModule, QuestionsModule, UsersModule],
  controllers: [QuestionProposalsController],
  providers: [...questionProposalsProviders, QuestionProposalsService],
})
export class QuestionProposalsModule {}
