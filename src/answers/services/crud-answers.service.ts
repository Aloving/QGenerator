import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';

import { ICrudAnswersService } from '../interfaces';
import { CreateAnswerDto, UpdateAnswerDto } from '../dto';
import { Answer } from '../entities';
import { User } from '../../users';

import { IEnv } from '../../env/intefaces';
import { IUsersService } from '../../users/interfaces';

const initialAnswerData: Partial<CreateAnswerDto> = {
  text: '',
  likes: 0,
  dislikes: 0,
};

export class CrudAnswersService implements ICrudAnswersService {
  constructor(
    public answersRepository: Repository<Answer>,
    public usersService: IUsersService,
    public env: IEnv,
  ) {}

  async create(createAnswerDto: CreateAnswerDto) {
    const author = await this.getAuthor();

    if (!author) {
      throw new UnauthorizedException();
    }

    return this.createAnswer(createAnswerDto);
  }

  findAll(): Promise<Answer[]> {
    return this.answersRepository.find();
  }

  findOne(id: Answer['id']) {
    return this.answersRepository.findOne({ id });
  }

  async update(id: string, updateAnswerDto: UpdateAnswerDto) {
    return this.answersRepository.save({ id, ...updateAnswerDto });
  }

  async remove(id: string) {
    await this.answersRepository.delete(id);

    return true;
  }

  private async createAnswer(createAnswerDto: CreateAnswerDto) {
    const author = await this.getAuthor(createAnswerDto.authorId);
    const answer = this.answersRepository.create({
      ...initialAnswerData,
      ...createAnswerDto,
      authorName: author.login,
    });

    return this.answersRepository.save(answer);
  }

  private async getAuthor(authorId?: User['id']) {
    if (authorId) {
      return this.usersService.findUserById({ id: authorId });
    }

    const defaultUser = await this.usersService.findUserByLogin({
      login: this.env.DEFAULT_USER_LOGIN,
    });

    return defaultUser;
  }
}
