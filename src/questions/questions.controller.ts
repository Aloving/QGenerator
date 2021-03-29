import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import {
  UpdateQuestionDto,
  CreateQuestionDto,
  GetRandomQuestionDto,
} from './dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post('/create')
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

  @Post('/generate')
  generateAnswer(@Body() getRandomQuestionDto: GetRandomQuestionDto) {
    return this.questionsService.generate(getRandomQuestionDto);
  }

  @Get()
  findAll() {
    return this.questionsService.findAll();
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(+id, updateQuestionDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(+id);
  }
}
