import { flatten, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { uniq } from 'lodash';

import { RepositoryEnum } from '../enums';
import { QuestionProposal } from './entities';
import { CreateQuestionBaseDataDto } from '../questions/dto';
import { QuestionProposalWithUserDto } from './dto';

import { IQuestionProposalsService } from './interfaces';
import { QuestionProposalStatusEnum } from './enums';
import { User, UsersService } from '../users';
import { QuestionsService } from '../questions';

@Injectable()
export class QuestionProposalsService implements IQuestionProposalsService {
  constructor(
    @Inject(RepositoryEnum.QuestionsProposalsRepository)
    private questionProposalRepository: Repository<QuestionProposal>,
    private questionService: QuestionsService,
    private usersService: UsersService,
  ) {}

  async acceptQuestionProposal(id: QuestionProposal['id']) {
    const proposal = await this.findQuestionProposal(id);
    const newQuestion = await this.questionService.create({
      text: proposal.text,
      authorId: proposal.authorId,
      proposalId: proposal.id,
      likes: '0',
      dislikes: '0',
      answers: [],
    });

    await this.questionProposalRepository.update(id, {
      questionId: newQuestion.id,
      status: QuestionProposalStatusEnum.Accepted,
    });

    return await this.findQuestionProposal(id);
  }

  async declineQuestionProposal(id: QuestionProposal['id']) {
    await this.questionProposalRepository.update(id, {
      status: QuestionProposalStatusEnum.Declined,
    });
    const proposal = await this.findQuestionProposal(id);

    if (proposal.questionId) {
      await this.questionService.remove(proposal.questionId);
    }

    return await this.findQuestionProposal(id);
  }

  async offerQuestion(createQuestionBaseDataDto: CreateQuestionBaseDataDto) {
    const questionProposal = this.questionProposalRepository.create(
      createQuestionBaseDataDto,
    );
    const savedProposal = await this.questionProposalRepository.save(
      questionProposal,
    );

    return this.findQuestionProposal(savedProposal.id);
  }

  async findAllQuestionProposals() {
    const proposals = await this.questionProposalRepository.find();
    const authorIds = uniq(proposals.map((proposal) => proposal.authorId));
    const authors = await this.usersService.findByIds({ ids: authorIds });
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
    const questionProposals = flatten(Object.values(sorted));
    const withAuthors: QuestionProposalWithUserDto[] = questionProposals.map(
      (proposal) => {
        const user = authors.find((author) => author.id === proposal.authorId);

        return this.mergeProposalAndUserData(user, proposal);
      },
    );

    return withAuthors;
  }

  async findQuestionProposal(id: QuestionProposal['id']) {
    const proposal = await this.questionProposalRepository.findOne(id);
    const user = await this.usersService.findUserById({
      id: proposal.authorId,
    });

    return this.mergeProposalAndUserData(user, proposal);
  }

  private mergeProposalAndUserData(
    user: User,
    proposal: QuestionProposal,
  ): QuestionProposalWithUserDto {
    return {
      ...proposal,
      login: user.login,
      role: user.role,
    };
  }
}
