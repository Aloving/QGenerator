import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateAnswerDto, UpdateAnswerDto } from './dto';
import { AnswersService } from './services/answers.service';
import { Answer } from './entities';
import { DefaultUserInterceptor } from '../author/interceptors';

@ApiTags('answers')
@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post('/addAnswer')
  @ApiResponse({
    status: 200,
    type: Answer,
    description: 'A point to add answer',
  })
  @UseInterceptors(DefaultUserInterceptor)
  addAnswer(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answersService.create(createAnswerDto);
  }

  @Delete('/:id/delete')
  @ApiResponse({
    status: 200,
    type: Answer,
    description: 'A point to add answer',
  })
  deleteAnswer(@Param('id') id: string) {
    return this.answersService.remove(id);
  }

  @Put('/:id/edit')
  @ApiResponse({
    status: 200,
    type: Answer,
    description: 'Point to udate an existing answer',
  })
  editAnswer(
    @Param('id') id: string,
    @Body() updateAnswerDto: UpdateAnswerDto,
  ) {
    return this.answersService.update(id, updateAnswerDto);
  }

  @Put('/:id/like')
  @ApiResponse({
    status: 200,
    type: Answer,
    description: 'Point to like an answer',
  })
  like(@Param('id') id: string) {
    return this.answersService.like(id);
  }

  @Put('/:id/dislike')
  @ApiResponse({
    status: 200,
    type: Answer,
    description: 'Point to dislike an answer',
  })
  dislike(@Param('id') id: string) {
    return this.answersService.dislike(id);
  }
}
