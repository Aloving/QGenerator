import { User } from '../entities';
import {
  FindUserByLoginDto,
  FindUserByRefreshTokenDto,
  FindUserByIdDto,
  AddRefreshTokenDto,
  CreateUserDto,
  FindUsersById,
} from '../dto';

export interface IUserService {
  create(payload: CreateUserDto): Promise<User>;
  findUserByLogin(payload: FindUserByLoginDto): Promise<User>;
  findAllUsers(): Promise<User[]>;
  findUserByRefreshToken(payload: FindUserByRefreshTokenDto): Promise<User>;
  findUserById(payload: FindUserByIdDto): Promise<User>;
  findByIds(payload: FindUsersById): Promise<User[]>;
  addRefreshToken(payload: AddRefreshTokenDto): Promise<void>;
  deleteRefreshToken(userId: User['id']): Promise<void>;
}
