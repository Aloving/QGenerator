import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
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
  constructor(private readonly questionsService: UsersService) {}

  @Post('/create')
  @ApiResponse({
    status: 200,
    type: User,
    description: 'A point to create a new user',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() createUser: CreateUserDto) {
    return this.questionsService.create(createUser);
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
    return this.questionsService.findAllUsers();
  }
}
