import { Length, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Answer } from '../../answers/entities';

export class CreateQuestionDto {
  @ApiProperty({
    description: 'Text of a question',
    maxLength: 150,
    minLength: 1,
    type: String,
  })
  @IsNotEmpty()
  @Length(1, 150)
  readonly text: string;

  @ApiProperty({
    description: 'Start number of likes',
    type: Number,
    default: 0,
  })
  readonly likes: number;

  @ApiProperty({
    description: 'Start number of dislikes',
    type: Number,
    default: 0,
  })
  readonly dislikes: number;

  @ApiProperty({
    description: 'Ready questions',
    type: Answer,
    isArray: true,
  })
  readonly answers: Answer[];
}
