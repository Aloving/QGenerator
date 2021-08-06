import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { questionsProviders } from './questions.providers';
import { QuestionsCrudService } from './questionsCrud.service';

@Module({
  imports: [DatabaseModule],
  controllers: [QuestionsController],
  providers: [...questionsProviders, QuestionsService],
})
export class QuestionsModule {}
