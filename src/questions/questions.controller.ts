import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { QuestionsService } from './questions.service';
import {
  UpdateQuestionDto,
  CreateQuestionDto,
  GetRandomQuestionDto,
  GetRandomQuestionResponseDto,
  GetQuestionDto,
} from './dto';
import { Question, QuestionProposal } from './entities';

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
  findAll() {
    return this.questionsService.findAll();
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    type: Question,
    description: 'Point to update an existing question',
  })
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(+id, updateQuestionDto);
  }

  @Delete('/:id')
  @ApiResponse({
    status: 200,
    type: Boolean,
    description: 'A point to delete question out of the app',
  })
  remove(@Param('id') id: string) {
    return this.questionsService.remove(+id);
  }

  @Put('/:id/increaseLikes')
  @ApiResponse({
    status: 200,
    type: Question,
    description: 'Point to increase likes of a question',
  })
  increaseLikes(@Param('id') id: number | string) {
    return this.questionsService.increaseLikes(+id);
  }

  @Put('/:id/decreaseLikes')
  @ApiResponse({
    status: 200,
    type: Question,
    description: 'Point to decrease likes of a question',
  })
  decreaseLikes(@Param('id') id: number | string) {
    return this.questionsService.decreaseLikes(+id);
  }

  @Put('/:id/increaseDislikes')
  @ApiResponse({
    status: 200,
    type: Question,
    description: 'Point to increase likes of a question',
  })
  increaseDislikes(@Param('id') id: number | string) {
    return this.questionsService.increaseDislikes(+id);
  }

  @Put('/:id/decreaseDislikes')
  @ApiResponse({
    status: 200,
    type: Question,
    description: 'Point to decrease likes of a question',
  })
  decreaseDislikes(@Param('id') id: number | string) {
    return this.questionsService.decreaseDislikes(+id);
  }

  @Put('/proposal')
  @ApiResponse({
    status: 200,
    type: QuestionProposal,
    description: 'point to propose a question',
  })
  proposeQuestion(@Body() createQuestionDto: CreateQuestionDto) {

  }
}
