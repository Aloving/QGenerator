import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserDto } from './dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly questionsService: UsersService) {}

  @Post('/create')
  async create(@Body() createUser: CreateUserDto) {
    return this.questionsService.create(createUser);
  }
}
