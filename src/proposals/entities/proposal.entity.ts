import {
  Column,
  ChildEntity,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { QuestionData } from '../../questions/entities';
import { AnswerData } from '../../answers/entities';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Proposal {
  @ApiProperty({
    description: 'Ordered ID',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;
}

@ChildEntity()
export class QuestionProposal extends Proposal {
  @Column()
  data: QuestionData;
}

@ChildEntity()
export class AnswerProposal extends Proposal {
  // @Column()
  // data: AnswerData;
}
