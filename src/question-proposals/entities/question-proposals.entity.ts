import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Question } from '../../questions/entities';
import { QuestionBaseData } from '../../questions/entities/question-data.entity';
import { QuestionProposalStatusEnum } from '../enums';
import { User } from '../../users';

@Entity()
export class QuestionProposal extends QuestionBaseData {
  @ApiProperty({
    description: 'Unique id for a proposal',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    enum: [
      QuestionProposalStatusEnum.Active,
      QuestionProposalStatusEnum.Accepted,
      QuestionProposalStatusEnum.Declined,
    ],
    description: 'Status of proposal',
  })
  @Column({
    type: 'enum',
    enum: QuestionProposalStatusEnum,
    default: QuestionProposalStatusEnum.Active,
  })
  status: QuestionProposalStatusEnum;

  @ApiProperty({
    type: String,
    description: 'Bound author id',
  })
  @Column()
  authorId: string;

  @ManyToOne(() => User, (user) => user.questionProposals)
  @JoinColumn({ name: 'authorId', referencedColumnName: 'id' })
  author: User;

  @ApiProperty({
    type: String,
    description: 'Bound question id',
    nullable: true,
  })
  @Column({
    nullable: true,
  })
  questionId?: Question['id'];

  @OneToOne(() => Question, (question) => question.proposalId, {
    cascade: true,
    nullable: true,
    onDelete: 'SET NULL',
    orphanedRowAction: 'nullify',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'questionId', referencedColumnName: 'id' })
  question: Question;
}
