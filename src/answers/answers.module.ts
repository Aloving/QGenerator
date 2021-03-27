import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';

@Module({
  exports: [AnswersService],
  providers: [AnswersService],
})
export class AnswersModule {}
