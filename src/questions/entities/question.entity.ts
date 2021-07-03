import { ApiProperty } from '@nestjs/swagger';
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
import { User } from '../../users/entities';

@Entity()
export class QuestionData {
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
    description: 'Likes count',
    default: 0,
    type: Number,
  })
  @Column({
    default: 0,
  })
  likes: number;

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
    type: String,
    description: 'Bound author id',
  })
  @Column()
  authorId: string;

  @ManyToOne(() => User, (user) => user.answers)
  @JoinColumn({ name: 'authorId', referencedColumnName: 'id' })
  author: User;

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
