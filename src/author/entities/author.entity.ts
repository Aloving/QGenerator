import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Answer } from '../../answers';

@Entity()
export class Author {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  userName: string;

  @OneToMany(() => Answer, (answer) => answer, {
    cascade: true,
    eager: true,
  })
  answers: Answer[];
}
