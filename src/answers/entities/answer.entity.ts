import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

import { User } from '../../users';
import { Question } from '../../questions/entities';
import { IAnswer } from '../interfaces';

@Entity()
export class AnswerData {
  @ApiProperty({
    description: 'Text of an answer',
    minLength: 1,
  })
  @Column()
  @Length(1)
  text: string;

  @ApiProperty({
    description: 'Count of likes',
    type: Number,
  })
  @Column()
  likes: number;

  @ApiProperty({
    description: 'Count of dislikes',
    type: Number,
  })
  @Column()
  dislikes: number;

  @ApiProperty({
    type: Number,
    description: 'Bound group id',
  })
  @Column()
  questionId: number;

  @ApiProperty({
    type: String,
    description: 'Bound author id',
  })
  @Column()
  authorId: string;

  @ApiProperty({
    type: Date,
    description: 'Created date',
  })
  @CreateDateColumn()
  created: string;

  @ManyToOne(() => User, (user) => user.answers)
  @JoinColumn({ name: 'authorId', referencedColumnName: 'id' })
  author: User;

  @ManyToOne(() => Question, (question) => question.answers, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'questionId', referencedColumnName: 'id' })
  question: Question;
}

@Entity()
export class Answer extends AnswerData implements IAnswer {
  @ApiProperty({
    type: String,
    description: 'Unique ID',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
