import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

import { RepositoryEnum } from "../enums";
import { QuestionProposal } from "./entities";
import { CreateQuestionBaseDataDto } from "./dto";

import { IQuestionProposalsService } from "./interfaces";

@Injectable()
export class QuestionProposalsService implements IQuestionProposalsService {
  constructor(
    @Inject(RepositoryEnum.QuestionsProposalsRepository)
    private questionProposalRepository: Repository<QuestionProposal>
  ) {}

  async offerQuestion(createQuestionBaseDataDto: CreateQuestionBaseDataDto) {
    const questionProposal = this.questionProposalRepository.create(
      createQuestionBaseDataDto
    );

    return this.questionProposalRepository.save(questionProposal);
  }

  async findAllQuestionProposals() {
    return this.questionProposalRepository.find();
  }
}
