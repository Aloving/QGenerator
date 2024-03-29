import { Length, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Answer } from '../../answers';
import { User } from '../../users';
import { QuestionProposal } from '../../question-proposals';

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
    type: String,
    default: '0',
  })
  readonly likes: string;

  @ApiProperty({
    description: 'Start number of dislikes',
    type: String,
    default: '0',
  })
  readonly dislikes: string;

  @ApiProperty({
    description: 'Ready questions',
    type: Answer,
    isArray: true,
  })
  readonly answers: Answer[];

  @ApiProperty({
    description: 'Bound proposal ID',
    type: String,
  })
  readonly proposalId?: QuestionProposal['id'];
}
