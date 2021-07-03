import { Module } from '@nestjs/common';

import { ProposalsService } from './proposals.service';
import { ProposalsController } from './proposals.controller';
import { proposalsProviders } from './proposals.providers';
import { QuestionsModule } from '../questions';
import { AnswersModule } from '../answers';
import { DatabaseModule } from '../database';

@Module({
  // imports: [DatabaseModule, QuestionsModule, AnswersModule],
  imports: [DatabaseModule],
  controllers: [ProposalsController],
  providers: [...proposalsProviders, ProposalsService],
})
export class ProposalsModule {}
