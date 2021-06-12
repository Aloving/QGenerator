import { Question } from '../entities';
import { ApiProperty } from '@nestjs/swagger';

export class GetQuestionDto {
  @ApiProperty({
    description: 'Question id to get',
  })
  questionId: Question['id'];
}
