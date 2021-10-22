import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { User } from './entities';
import { RolesGuard } from './guards';
import { Role } from './enums';
import { ServiceEnum } from '../enums';

import { ChangeUserRoleDto, CreateUserDto } from './dto';
import { Roles } from './decorators';
import { IUsersService } from './interfaces';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    @Inject(ServiceEnum.USERS_SERVICE)
    private readonly usersService: IUsersService,
  ) {}

  @Post('/create')
  @ApiResponse({
    status: 200,
    type: User,
    description: 'A point to create a new user',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() createUser: CreateUserDto) {
    return this.usersService.create(createUser);
  }

  @Put('/changeRole')
  @ApiResponse({
    status: 200,
    type: User,
    description: 'Point to change user role',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.SuperAdmin, Role.Admin)
  @UseGuards(RolesGuard)
  async changeUserRole(@Body() changeRolePayload: ChangeUserRoleDto) {
    return this.usersService.changeUserRole(changeRolePayload);
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: User,
    isArray: true,
    description: 'A point to get all accounts',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.SuperAdmin, Role.Admin)
  @UseGuards(RolesGuard)
  async findAll() {
    return this.usersService.findAllUsers();
  }

  @Get('/:login')
  @ApiResponse({
    status: 200,
    type: User,
    description: 'A point to get account by login',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async findByLogin(@Param('login') login: string) {
    return this.usersService.findUserByLogin({ login });
  }
}
