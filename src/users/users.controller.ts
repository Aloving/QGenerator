import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto';
import { UsersService } from './users.service';
import { User } from './entities';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from './decorators';
import { Role } from './enums';
import { RolesGuard } from './guards';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
  @Roles(Role.Admin, Role.Moderator)
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
