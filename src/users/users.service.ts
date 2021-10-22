import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { Repository } from 'typeorm';

import { ProviderEnum, RepositoryEnum } from '../enums';
import {
  AddRefreshTokenDto,
  ChangeUserRoleDto,
  CreateUserDto,
  FindUserByIdDto,
  FindUserByLoginDto,
  FindUserByRefreshTokenDto,
  FindUsersById,
} from './dto';
import { User } from './entities';
import { IUsersService } from './interfaces';
import { CryptService } from '../crypt';
import { Role } from './enums';
import { IEnv } from '../env';

@Injectable()
export class UsersService implements IUsersService, OnApplicationBootstrap {
  private DEFAULT_USER_ROLE = Role.User;

  constructor(
    private cryptService: CryptService,
    @Inject(RepositoryEnum.UserRepository)
    private userRepository: Repository<User>,
    @Inject(ProviderEnum.Env) private env: IEnv,
  ) {}

  async onApplicationBootstrap() {
    // create default user
    const user = await this.userRepository.findOne({
      login: this.env.DEFAULT_USER_LOGIN,
    });

    if (!user) {
      return await this.create({
        login: this.env.DEFAULT_USER_LOGIN,
        email: this.env.DEFAULT_USER_EMAIL,
        password: this.env.DEFAULT_USER_PASSWORD,
      });
    }
  }

  async changeUserRole({ userId, role }: ChangeUserRoleDto): Promise<User> {
    await this.userRepository.update(userId, { role });

    return this.findUserById({ id: userId });
  }

  async createUser({
    password,
    role,
    ...createUserDto
  }: CreateUserDto & { role: Role }) {
    const cryptedPassword = await this.cryptService.hashPassword(password);

    try {
      const user = await this.userRepository.findOne({
        login: createUserDto.login,
      });

      if (user) {
        throw new HttpException(
          'User is already exists',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      return this.userRepository.create({
        password: cryptedPassword,
        role,
        ...createUserDto,
      });
    } catch (e) {
      throw new HttpException(
        'User is already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async create(createUserDto: CreateUserDto) {
    const users = await this.findAllUsers();

    if (
      users &&
      users.length < 1 &&
      createUserDto.login !== this.env.DEFAULT_USER_LOGIN
    ) {
      const user = await this.createUser({
        role: Role.SuperAdmin,
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

  findByIds({ ids }: FindUsersById): Promise<User[]> {
    return this.userRepository.findByIds(ids);
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

  async deleteRefreshToken(userId: User['id']): Promise<void> {
    await this.userRepository.update(userId, { refreshToken: null });
  }
}
