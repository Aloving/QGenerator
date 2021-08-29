import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { QuestionProposal } from '../entities';

export class AcceptQuestionProposal {
  @ApiProperty({
    description: 'An proposal id',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  id: QuestionProposal['id'];
}
