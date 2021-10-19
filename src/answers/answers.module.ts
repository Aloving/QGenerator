import { Module, forwardRef } from '@nestjs/common';

import { AnswersService } from './services/answers.service';
import { AnswersController } from './answers.controller';
import { answersProviders } from './answers.providers';
import { DatabaseModule } from '../database';

@Module({
  imports: [forwardRef(() => DatabaseModule)],
  exports: [AnswersService],
  providers: [AnswersService, ...answersProviders],
  controllers: [AnswersController],
})
export class AnswersModule {}
