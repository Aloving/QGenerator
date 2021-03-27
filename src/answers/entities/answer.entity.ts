import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Author } from '../../author';
import { Question } from '../../questions';
import { Length } from 'class-validator';

@Entity()
export class Answer {
  @ApiProperty({
    type: String,
    description: 'Unique ID',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Text of an answer',
    minLength: 1,
  })
  @Column()
  @Length(1)
  text: string;

  @ApiProperty({
    type: String,
    description: 'Bound group id',
  })
  @Column()
  questionId: string;

  @ApiProperty({
    type: Author,
    description: 'Author of an answer',
  })
  @ManyToOne(() => Author, (author) => author.answers)
  author: Author;

  @ManyToOne(() => Question, (question) => question.answers, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'questionId', referencedColumnName: 'id' })
  question: Question;
}
