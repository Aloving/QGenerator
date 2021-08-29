import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { RepositoryEnum } from '../enums';
import { QuestionProposal } from './entities';
import { CreateQuestionBaseDataDto } from './dto';

import { IQuestionProposalsService } from './interfaces';

@Injectable()
export class QuestionProposalsService implements IQuestionProposalsService {
  constructor(
    @Inject(RepositoryEnum.QuestionsProposalsRepository)
    private questionProposalRepository: Repository<QuestionProposal>,
  ) {}

  async acceptQuestionProposal(id: QuestionProposal['id']) {
    this.questionProposalRepository.delete(id);

    return true;
  }

  async offerQuestion(createQuestionBaseDataDto: CreateQuestionBaseDataDto) {
    const questionProposal = this.questionProposalRepository.create(
      createQuestionBaseDataDto,
    );

    return this.questionProposalRepository.save(questionProposal);
  }

  async findAllQuestionProposals() {
    return this.questionProposalRepository.find();
  }

  async findQuestionProposal(id: QuestionProposal['id']) {
    return this.questionProposalRepository.findOne(id);
  }
}
