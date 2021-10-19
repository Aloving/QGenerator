import { User } from '../entities';
import {
  FindUserByLoginDto,
  FindUserByRefreshTokenDto,
  FindUserByIdDto,
  AddRefreshTokenDto,
  CreateUserDto,
  FindUsersById,
  ChangeUserRoleDto,
} from '../dto';

export interface IUserService {
  addRefreshToken(payload: AddRefreshTokenDto): Promise<void>;
  changeUserRole(payload: ChangeUserRoleDto): Promise<User>;
  create(payload: CreateUserDto): Promise<User>;
  deleteRefreshToken(userId: User['id']): Promise<void>;
  findAllUsers(): Promise<User[]>;
  findByIds(payload: FindUsersById): Promise<User[]>;
  findUserById(payload: FindUserByIdDto): Promise<User>;
  findUserByLogin(payload: FindUserByLoginDto): Promise<User>;
  findUserByRefreshToken(payload: FindUserByRefreshTokenDto): Promise<User>;
}
