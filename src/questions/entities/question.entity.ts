import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  Column,
  JoinColumn,
} from 'typeorm';

import { QuestionData } from './question-data.entity';
import { QuestionProposal } from '../../question-proposals/entities';

@Entity()
export class Question extends QuestionData {
  @ApiProperty({
    description: 'Ordered ID',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
    description: 'Bound proposal id',
  })
  @Column({
    nullable: true,
  })
  proposalId?: QuestionProposal['id'];

  @OneToOne(() => QuestionProposal, (proposal) => proposal.questionId, {
    cascade: true,
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'nullify',
  })
  @JoinColumn({ name: 'proposalId', referencedColumnName: 'id' })
  proposal: QuestionProposal;
}
