import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

import { RepositoryEnum } from "../enums";
import { QuestionsCrudService } from "./questionsCrud.service";
import { IQuestionService } from "./interfaces";
import { Question, QuestionProposal } from "./entities";
import { CreateQuestionBaseDataDto, AcceptQuestionProposal } from "./dto";
import { QuestionProposalsService } from "./questions-proposals.service";

@Injectable()
export class QuestionsService
  extends QuestionsCrudService
  implements IQuestionService {
  constructor(
    @Inject(RepositoryEnum.QuestionRepository)
    public readonly questionRepository: Repository<Question>,
    private readonly proposalsService: QuestionProposalsService
  ) {
    super(questionRepository);
  }

  async acceptQuestionProposal(proposalId: QuestionProposal["id"]) {
    const {
      id: _id,
      ...proposal
    } = await this.proposalsService.findQuestionProposal(proposalId);

    this.proposalsService.acceptQuestionProposal(proposalId);

    return this.create({ ...proposal, likes: 0, dislikes: 0, answers: [] });
  }

  async findQuestionProposal(proposalId: QuestionProposal["id"]) {
    return this.proposalsService.findQuestionProposal(proposalId);
  }

  async offerQuestion(data: CreateQuestionBaseDataDto) {
    return this.proposalsService.offerQuestion({
      ...data,
    });
  }

  async findAllQuestionProposals() {
    return this.proposalsService.findAllQuestionProposals();
  }

  async randomize(excludeIds: number[]) {
    const question = await this.randomizeOne();

    return Promise.resolve({
      excludeIds,
      question,
    });
  }

  async increaseLikes(id: number) {
    const { id: _id, ...questionToUpdate } = await this.findOne(id);

    return this.update(id, {
      ...questionToUpdate,
      likes: questionToUpdate.likes + 1,
    });
  }

  async decreaseLikes(id: number) {
    const { id: _id, ...questionToUpdate } = await this.findOne(id);

    return this.update(id, {
      ...questionToUpdate,
      likes: questionToUpdate.likes - 1,
    });
  }

  async increaseDislikes(id: number) {
    const { id: _id, ...questionToUpdate } = await this.findOne(id);

    return this.update(id, {
      ...questionToUpdate,
      dislikes: questionToUpdate.dislikes + 1,
    });
  }

  async decreaseDislikes(id: number) {
    const { id: _id, ...questionToUpdate } = await this.findOne(id);

    return this.update(id, {
      ...questionToUpdate,
      dislikes: questionToUpdate.dislikes - 1,
    });
  }
}
