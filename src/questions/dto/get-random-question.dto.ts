import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Question } from '../entities';

export class GetRandomQuestionDto {
  @ApiProperty({
    description: 'Ids to exclude',
  })
  @IsArray()
  excludeQuestionIds: string[];
}

export class GetRandomQuestionResponseDto extends GetRandomQuestionDto {
  @ApiProperty({})
  question: Question;
}
