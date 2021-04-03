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
} from './dto';
import { Question } from './entities';

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

  @Post('/generate')
  @ApiResponse({
    status: 200,
    type: GetRandomQuestionResponseDto,
    description: 'Path to get random question, it supports id excluding',
  })
  generateAnswer(@Body() getRandomQuestionDto: GetRandomQuestionDto) {
    return this.questionsService.generate(getRandomQuestionDto);
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
}
