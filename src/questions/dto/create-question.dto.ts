import { Length, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Answer } from '../../answers';
import { User } from '../../users';

export class CreateQuestionBaseDataDto {
  @ApiProperty({
    description: 'Text of a question',
    maxLength: 150,
    minLength: 1,
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @Length(1, 150)
  readonly text: string;

  @ApiProperty({
    description: 'Bound user id',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly authorId: User['id'];
}

export class CreateQuestionDto extends CreateQuestionBaseDataDto {
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
