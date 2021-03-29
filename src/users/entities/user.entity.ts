import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Answer } from '../../answers';
import { Question } from '../../questions/entities';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Answer, (answer) => answer.author, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  answers: Answer[];

  @OneToMany(() => Question, (question) => question.author, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  questions: Question[];
}
