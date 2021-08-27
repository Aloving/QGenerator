import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

import { RepositoryEnum } from "../enums";
import {
  AddRefreshTokenDto,
  CreateUserDto,
  FindUserByIdDto,
  FindUserByLoginDto,
  FindUserByRefreshTokenDto,
} from "./dto";
import { User } from "./entities";
import { IUserService } from "./interfaces";
import { CryptService } from "../crypt";

@Injectable()
export class UsersService implements IUserService {
  constructor(
    private cryptService: CryptService,
    @Inject(RepositoryEnum.UserRepository)
    private userRepository: Repository<User>
  ) {}

  async create({ password, ...createUserDto }: CreateUserDto) {
    const cryptedPassword = await this.cryptService.hashPassword(password);
    const user = this.userRepository.create({
      password: cryptedPassword,
      ...createUserDto,
    });

    return this.userRepository.save(user);
  }

  findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  findUserById({ id }: FindUserByIdDto): Promise<User> {
    return this.userRepository.findOne({ id });
  }

  findUserByLogin({ login }: FindUserByLoginDto): Promise<User> {
    return this.userRepository.findOne({ login });
  }

  findUserByRefreshToken({
    refreshToken,
  }: FindUserByRefreshTokenDto): Promise<User> {
    return this.userRepository.findOne({
      refreshToken,
    });
  }

  async addRefreshToken({
    refreshToken,
    userId,
  }: AddRefreshTokenDto): Promise<void> {
    await this.userRepository.update(userId, { refreshToken });
  }

  async deleteRefreshToken(userId: User["id"]): Promise<void> {
    await this.userRepository.update(userId, { refreshToken: null });
  }
}
