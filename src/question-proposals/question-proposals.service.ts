import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { flatten } from 'lodash';

import { RepositoryEnum } from '../enums';
import { QuestionProposal } from './entities';
import { CreateQuestionBaseDataDto } from '../questions/dto';

import { IQuestionProposalsService } from './interfaces';
import { QuestionProposalStatusEnum } from './enums';

@Injectable()
export class QuestionProposalsService implements IQuestionProposalsService {
  private questionDefaults = {
    likes: '0',
    dislikes: '0',
    answers: [],
    text: '',
  };

  constructor(
    @Inject(RepositoryEnum.QuestionsProposalsRepository)
    private questionProposalRepository: Repository<QuestionProposal>,
  ) {}

  async acceptQuestionProposal(id: QuestionProposal['id']) {
    await this.questionProposalRepository.update(id, {
      status: QuestionProposalStatusEnum.Accepted,
    });

    return await this.questionProposalRepository.findOne(id);
  }

  async declineQuestionProposal(id: QuestionProposal['id']) {
    await this.questionProposalRepository.update(id, {
      status: QuestionProposalStatusEnum.Declined,
    });

    return await this.questionProposalRepository.findOne(id);
  }

  async offerQuestion(createQuestionBaseDataDto: CreateQuestionBaseDataDto) {
    const questionProposal = this.questionProposalRepository.create(
      createQuestionBaseDataDto,
    );

    return this.questionProposalRepository.save(questionProposal);
  }

  async findAllQuestionProposals() {
    const proposals = await this.questionProposalRepository.find();
    const sorted = proposals.reduce(
      (acc, cur) => {
        if (cur.status === QuestionProposalStatusEnum.Declined) {
          return {
            ...acc,
            [QuestionProposalStatusEnum.Declined]: [
              ...acc[QuestionProposalStatusEnum.Declined],
              cur,
            ],
          };
        }

        if (cur.status === QuestionProposalStatusEnum.Accepted) {
          return {
            ...acc,
            [QuestionProposalStatusEnum.Accepted]: [
              ...acc[QuestionProposalStatusEnum.Accepted],
              cur,
            ],
          };
        }

        return {
          ...acc,
          [QuestionProposalStatusEnum.Active]: [
            ...acc[QuestionProposalStatusEnum.Active],
            cur,
          ],
        };
      },
      {
        [QuestionProposalStatusEnum.Accepted]: [],
        [QuestionProposalStatusEnum.Declined]: [],
        [QuestionProposalStatusEnum.Active]: [],
      },
    );

    return flatten(Object.values(sorted)) as QuestionProposal[];
  }

  async findQuestionProposal(id: QuestionProposal['id']) {
    return this.questionProposalRepository.findOne(id);
  }
}
