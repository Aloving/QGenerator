import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Answer } from '../../answers';
import { Question } from '../../questions';
import { Role } from '../enums';
import { QuestionProposal } from '../../question-proposals/entities';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  login: string;

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

  @OneToMany(() => QuestionProposal, (proposal) => proposal.author, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  questionProposals: QuestionProposal[];

  @Exclude()
  @Column({
    nullable: true,
  })
  public refreshToken?: string;

  @Length(6, 30, {
    message:
      'The password must be at least 6 but not longer than 30 characters',
  })
  @IsNotEmpty({ message: 'The password is required' })
  @Exclude()
  @Column()
  public password: string;

  @ApiProperty({
    enum: [Role.User, Role.Admin, Role.Moderator],
    description: 'User role',
  })
  @IsNotEmpty()
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  public role: Role;

  @Column()
  @IsEmail({}, { message: 'Incorrect email' })
  public email: string;
}
