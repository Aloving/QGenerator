import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { QuestionBaseData } from '../../questions/entities';
import { QuestionProposalStatusEnum } from '../enums';

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
}
