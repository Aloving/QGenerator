import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { QuestionBaseData } from "./question.entity";

@Entity()
export class QuestionProposal extends QuestionBaseData {
  @ApiProperty({
    description: "Unique id for a proposal",
  })
  @PrimaryGeneratedColumn("uuid")
  id: string;
}
