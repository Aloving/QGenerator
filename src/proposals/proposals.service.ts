import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { IQuestion } from '../questions/interfaces';
import { IAnswer } from '../answers/interfaces';
import { RepositoryEnum } from '../enums';
import { Proposal, QuestionProposal } from './entities';
import { CreateQuestionDto } from '../questions/dto';

import { IProposalsService, IQuestionProposal } from './interfaces';
import { CreateAnswerDto } from '../answers/dto';

@Injectable()
export class ProposalsService implements IProposalsService {
  constructor(
    @Inject(RepositoryEnum.QuestionRepository)
    private questionProposalRepository: Repository<QuestionProposal>,
  ) {}

  offerQuestion(createQuestionData: CreateQuestionDto) {
    const questionProposal = this.questionProposalRepository.create({
      data: createQuestionData,
    });

    return this.questionProposalRepository.save(questionProposal);
  }

  findAllQuestionProposals() {
    return this.questionProposalRepository.find();
  }

  // acceptQuestionOffer(
  //   questionProposalId: IQuestionProposal['id'],
  // ): Promise<boolean>;
  // findAllQuestionProposals(): Promise<IQuestionProposal[]>;
  //
  // offerAnswer(question: CreateAnswerDto) {
  //
  // };
  // acceptAnswerOffer(answerProposalId: IAnswerProposal['id']): Promise<boolean>;
  // findAllAnswersProposals(): Promise<IAnswerProposal[]>;
}
