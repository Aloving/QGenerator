import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { QuestionsService } from './questions.service';
import {
  CreateQuestionDto,
  GetRandomQuestionDto,
  GetRandomQuestionResponseDto,
  UpdateQuestionDto,
} from './dto';
import { Question } from './entities';
import { Roles } from '../users/decorators';
import { Role, RolesGuard } from '../users';

@ApiTags('questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post('/create')
  @ApiResponse({
    status: 200,
    type: Question,
    description: 'A point to create question',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.Admin, Role.Moderator)
  @UseGuards(RolesGuard)
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

  @Post('/randomize')
  @ApiResponse({
    status: 200,
    type: GetRandomQuestionResponseDto,
    description: 'Path to get random question, it supports id excluding',
  })
  randomizeQuestion(@Body() { excludeIds }: GetRandomQuestionDto) {
    return this.questionsService.randomize(excludeIds);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: Question,
    description: 'Endpoint to get certain question by id',
  })
  getQuestion(@Param('id') id: string) {
    return this.questionsService.findOne(+id);
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: Question,
    isArray: true,
    description: 'Point to get all questions',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.Admin, Role.Moderator)
  @UseGuards(RolesGuard)
  findAll() {
    return this.questionsService.findAll();
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    type: Question,
    description: 'Point to update an existing question',
  })
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.Admin, Role.Moderator)
  @UseGuards(RolesGuard)
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(+id, updateQuestionDto);
  }

  @Delete('/:id')
  @ApiParam({ name: 'id' })
  @ApiResponse({
    status: 200,
    type: Boolean,
    description: 'A point to delete question out of the app',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.Admin, Role.Moderator)
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.questionsService.remove(+id);
  }

  @Put('/:id/increaseLikes')
  @ApiParam({ name: 'id' })
  @ApiResponse({
    status: 200,
    type: Question,
    description: 'Point to increase likes of a question',
  })
  increaseLikes(@Param('id') id: number | string) {
    return this.questionsService.increaseLikes(+id);
  }

  @Put('/:id/decreaseLikes')
  @ApiParam({ name: 'id' })
  @ApiResponse({
    status: 200,
    type: Question,
    description: 'Point to decrease likes of a question',
  })
  decreaseLikes(@Param('id') id: number | string) {
    return this.questionsService.decreaseLikes(+id);
  }

  @Put('/:id/increaseDislikes')
  @ApiParam({ name: 'id' })
  @ApiResponse({
    status: 200,
    type: Question,
    description: 'Point to increase likes of a question',
  })
  increaseDislikes(@Param('id') id: number | string) {
    return this.questionsService.increaseDislikes(+id);
  }

  @Put('/:id/decreaseDislikes')
  @ApiParam({ name: 'id' })
  @ApiResponse({
    status: 200,
    type: Question,
    description: 'Point to decrease likes of a question',
  })
  decreaseDislikes(@Param('id') id: number | string) {
    return this.questionsService.decreaseDislikes(+id);
  }
}
