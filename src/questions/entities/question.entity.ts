import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Answer } from '../../answers';
import { User } from '../../users';
import { IQuestionData } from '../interfaces';

export class QuestionBaseData {
  @ApiProperty({
    description: 'Text of a question',
    maxLength: 150,
    minLength: 1,
    type: String,
  })
  @Column({
    length: 150,
  })
  text: string;

  @ApiProperty({
    type: String,
    description: 'Bound author id',
  })
  @Column()
  authorId: string;

  @ManyToOne(() => User, (user) => user.questions)
  @JoinColumn({ name: 'authorId', referencedColumnName: 'id' })
  author: User;
}

@Entity()
export class QuestionData extends QuestionBaseData implements IQuestionData {
  @ApiProperty({
    description: 'Likes count',
    default: '0',
    type: String,
  })
  @Column({
    default: '0',
  })
  likes: string;

  @ApiProperty({
    description: 'Dislikes count',
    default: '0',
    type: String,
  })
  @Column({
    default: '0',
  })
  dislikes: string;

  @ApiProperty({
    description: 'The answers',
    type: Answer,
    isArray: true,
  })
  @OneToMany(() => Answer, (answer) => answer.question, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  answers: Answer[];
}

@Entity()
export class Question extends QuestionData {
  @ApiProperty({
    description: 'Ordered ID',
  })
  @PrimaryGeneratedColumn()
  id: number;
}
