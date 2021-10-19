import { Repository } from 'typeorm';

import { ICrudAnswersService } from '../interfaces';
import { CreateAnswerDto, UpdateAnswerDto } from '../dto';
import { Answer } from '../entities';

export class CrudAnswersService implements ICrudAnswersService {
  constructor(public answersRepository: Repository<Answer>) {}

  async create(createAnswerDto: CreateAnswerDto) {
    const answer = this.answersRepository.create(createAnswerDto);

    return this.answersRepository.save(answer);
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
}
