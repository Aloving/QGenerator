import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty, Length } from "class-validator";

import { Answer } from "../../answers";
import { Question } from "../../questions";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
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

  @Exclude()
  @Column({
    nullable: true,
  })
  public refreshToken?: string;

  @Length(6, 30, {
    message:
      "The password must be at least 6 but not longer than 30 characters",
  })
  @IsNotEmpty({ message: "The password is required" })
  @Exclude()
  @Column({ select: true })
  public password: string;

  @Column()
  @IsEmail({}, { message: "Incorrect email" })
  public email: string;
}
