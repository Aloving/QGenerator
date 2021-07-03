import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ProposalsService } from './proposals.service';
import { OfferQuestionDto } from './dto/offer-question.dto';
import { OfferAnswerDto } from './dto/offer-answer.dto';
import { CreateQuestionDto } from '../questions/dto';

@Controller('proposals')
export class ProposalsController {
  constructor(private readonly proposalsService: ProposalsService) {}

  // @Get('/questions')
  // getAllQuestionsProposals() {
  //   return this.proposalsService.offerQuestion()
  // }

  @Post('/questions/offer')
  offerQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return this.proposalsService.offerQuestion(createQuestionDto);
  }

  // @Get('/answers')
  // getAllAnswersProposals() {}
  //
  // @Post('/answers/offer')
  // offerAnswer() {}
}
