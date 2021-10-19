import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { CreateQuestionBaseDataDto } from '../questions/dto';
import { Roles } from '../users/decorators';
import { Role, RolesGuard } from '../users';
import { QuestionProposalsService } from './question-proposals.service';
import { QuestionProposal } from './entities';
import { QuestionProposalWithUserDto } from './dto';

@ApiTags('question-proposals')
@Controller('proposals/questions')
export class QuestionProposalsController {
  constructor(private readonly proposalsService: QuestionProposalsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: QuestionProposalWithUserDto,
    isArray: true,
    description: 'Find all questions proposals',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.SuperAdmin, Role.Admin, Role.Moderator)
  @UseGuards(RolesGuard)
  getAllProposals() {
    return this.proposalsService.findAllQuestionProposals();
  }

  @Put('/propose')
  @ApiResponse({
    status: 200,
    type: QuestionProposalWithUserDto,
    description: 'point to propose a question',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  proposeQuestion(
    @Body() createQuestionBaseDataDto: CreateQuestionBaseDataDto,
  ) {
    return this.proposalsService.offerQuestion(createQuestionBaseDataDto);
  }

  @Put('/:id/accept')
  @ApiParam({
    name: 'id',
  })
  @ApiResponse({
    status: 200,
    type: QuestionProposalWithUserDto,
    description: 'Point to accept a question',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.SuperAdmin, Role.Admin, Role.Moderator)
  @UseGuards(RolesGuard)
  acceptProposal(@Param('id') id: QuestionProposal['id']) {
    return this.proposalsService.acceptQuestionProposal(id);
  }

  @Put('/:id/decline')
  @ApiParam({
    name: 'id',
  })
  @ApiResponse({
    status: 200,
    type: QuestionProposalWithUserDto,
    description: 'Point to decline a question',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.SuperAdmin, Role.Admin, Role.Moderator)
  @UseGuards(RolesGuard)
  declineProposal(@Param('id') id: QuestionProposal['id']) {
    return this.proposalsService.declineQuestionProposal(id);
  }
}
