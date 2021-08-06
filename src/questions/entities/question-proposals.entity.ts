import { Entity, PrimaryGeneratedColumn } from 'typeorm';

import { QuestionData } from './question.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class QuestionProposal extends QuestionData {
  @ApiProperty({
    description: 'Unique id for a proposal',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
