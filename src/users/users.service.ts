import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { RepositoryEnum } from '../enums';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities';

@Injectable()
export class UsersService {
  constructor(
    @Inject(RepositoryEnum.UserRepository)
    private userRepository: Repository<User>,
  ) {}

  create(createAuthorDto: CreateUserDto) {
    const user = this.userRepository.create(createAuthorDto);

    return this.userRepository.save(user);
  }

  findAll() {
    return `This action returns all author`;
  }

  findOne(id: number) {
    return `This action returns a #${id} author`;
  }

  update(id: number, updateAuthorDto: UpdateUserDto) {
    return `This action updates a #${id} author`;
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }
}
