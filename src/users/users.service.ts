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
import { Role } from "./enums";

@Injectable()
export class UsersService implements IUserService {
  private DEFAULT_USER_ROLE = Role.User;

  constructor(
    private cryptService: CryptService,
    @Inject(RepositoryEnum.UserRepository)
    private userRepository: Repository<User>
  ) {}

  async createUser({
    password,
    role,
    ...createUserDto
  }: CreateUserDto & { role: Role }): Promise<User> {
    const cryptedPassword = await this.cryptService.hashPassword(password);

    return this.userRepository.create({
      password: cryptedPassword,
      role,
      ...createUserDto,
    });
  }

  async create(createUserDto: CreateUserDto) {
    const users = await this.findAllUsers();

    if (users && !users.length) {
      const user = await this.createUser({
        role: Role.Admin,
        ...createUserDto,
      });
      return this.userRepository.save(user);
    }

    const user = await this.createUser({
      role: this.DEFAULT_USER_ROLE,
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
