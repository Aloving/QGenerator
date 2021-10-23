import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Question } from '../entities';

export class GetRandomQuestionDto {
  @ApiProperty({
    description: 'Ids to exclude',
  })
  @IsArray()
  excludeIds: Question['id'][];
}

export class GetRandomQuestionResponseDto extends GetRandomQuestionDto {
  @ApiProperty({
    description: 'Question generated randomly',
    type: Question,
  })
  question: Question;

  @ApiProperty({
    type: String,
    isArray: true,
    description: 'Updated excluded ids',
  })
  excludeIds: Question['id'][];
}
