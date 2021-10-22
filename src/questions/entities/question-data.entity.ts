import { ApiProperty } from '@nestjs/swagger';
import {
  Column, CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { User } from '../../users';
import { IQuestionData } from '../interfaces';
import { Answer } from '../../answers';
import { Question } from './question.entity';

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
}

@Entity()
export class QuestionData extends QuestionBaseData implements IQuestionData {
  @ApiProperty({
    description: 'Likes count',
    default: 0,
    type: Number,
  })
  @Column({
    default: 0,
  })
  likes: number;

  @ApiProperty({
    type: Date,
    description: 'Created date',
  })
  @CreateDateColumn()
  created: string;

  @ApiProperty({
    description: 'Dislikes count',
    default: 0,
    type: Number,
  })
  @Column({
    default: 0,
  })
  dislikes: number;

  @ApiProperty({
    description: 'The answers',
    type: Answer,
    isArray: true,
  })
  @OneToMany(() => Answer, (answer) => answer.question, {
    cascade: true,
    eager: true,
  })
  answers: Answer[];

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
