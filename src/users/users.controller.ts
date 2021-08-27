import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateUserDto } from "./dto";
import { UsersService } from "./users.service";
import { User } from "./entities";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly questionsService: UsersService) {}

  @Post("/create")
  @ApiResponse({
    status: 200,
    type: User,
    description: "A point to create a new user",
  })
  async create(@Body() createUser: CreateUserDto) {
    return this.questionsService.create(createUser);
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: User,
    isArray: true,
    description: "A point to get all accounts",
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll() {
    return this.questionsService.findAllUsers();
  }
}
