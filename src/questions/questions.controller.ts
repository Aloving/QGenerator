import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiResponse, ApiTags, ApiParam } from "@nestjs/swagger";

import { QuestionsService } from "./questions.service";
import {
  UpdateQuestionDto,
  CreateQuestionDto,
  GetRandomQuestionDto,
  GetRandomQuestionResponseDto,
  CreateQuestionBaseDataDto,
} from "./dto";
import { Question, QuestionProposal } from "./entities";

@ApiTags("questions")
@Controller("questions")
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Put("/proposal")
  @ApiResponse({
    status: 200,
    type: QuestionProposal,
    description: "point to propose a question",
  })
  proposeQuestion(
    @Body() createQuestionBaseDataDto: CreateQuestionBaseDataDto
  ) {
    return this.questionsService.offerQuestion(createQuestionBaseDataDto);
  }

  @Put("/proposal/:id/accept")
  @ApiParam({
    name: "id",
  })
  @ApiResponse({
    status: 200,
    type: Question,
    description: "point to propose a question",
  })
  acceptProposal(@Param("id") id: QuestionProposal["id"]) {
    return this.questionsService.acceptQuestionProposal(id);
  }

  @Get("/proposals")
  @ApiResponse({
    status: 200,
    type: QuestionProposal,
    isArray: true,
    description: "Find all questions proposals",
  })
  getAllProposes() {
    return this.questionsService.findAllQuestionProposals();
  }

  @Post("/create")
  @ApiResponse({
    status: 200,
    type: Question,
    description: "A point to create question",
  })
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

  @Post("/randomize")
  @ApiResponse({
    status: 200,
    type: GetRandomQuestionResponseDto,
    description: "Path to get random question, it supports id excluding",
  })
  randomizeQuestion(@Body() { excludeIds }: GetRandomQuestionDto) {
    return this.questionsService.randomize(excludeIds);
  }

  @Get(":id")
  @ApiResponse({
    status: 200,
    type: Question,
    description: "Endpoint to get certain question by id",
  })
  getQuestion(@Param("id") id: string) {
    return this.questionsService.findOne(+id);
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: Question,
    isArray: true,
    description: "Point to get all questions",
  })
  findAll() {
    return this.questionsService.findAll();
  }

  @Put(":id")
  @ApiResponse({
    status: 200,
    type: Question,
    description: "Point to update an existing question",
  })
  update(
    @Param("id") id: string,
    @Body() updateQuestionDto: UpdateQuestionDto
  ) {
    return this.questionsService.update(+id, updateQuestionDto);
  }

  @Delete("/:id")
  @ApiParam({ name: "id" })
  @ApiResponse({
    status: 200,
    type: Boolean,
    description: "A point to delete question out of the app",
  })
  remove(@Param("id") id: string) {
    return this.questionsService.remove(+id);
  }

  @Put("/:id/increaseLikes")
  @ApiParam({ name: "id" })
  @ApiResponse({
    status: 200,
    type: Question,
    description: "Point to increase likes of a question",
  })
  increaseLikes(@Param("id") id: number | string) {
    return this.questionsService.increaseLikes(+id);
  }

  @Put("/:id/decreaseLikes")
  @ApiParam({ name: "id" })
  @ApiResponse({
    status: 200,
    type: Question,
    description: "Point to decrease likes of a question",
  })
  decreaseLikes(@Param("id") id: number | string) {
    return this.questionsService.decreaseLikes(+id);
  }

  @Put("/:id/increaseDislikes")
  @ApiParam({ name: "id" })
  @ApiResponse({
    status: 200,
    type: Question,
    description: "Point to increase likes of a question",
  })
  increaseDislikes(@Param("id") id: number | string) {
    return this.questionsService.increaseDislikes(+id);
  }

  @Put("/:id/decreaseDislikes")
  @ApiParam({ name: "id" })
  @ApiResponse({
    status: 200,
    type: Question,
    description: "Point to decrease likes of a question",
  })
  decreaseDislikes(@Param("id") id: number | string) {
    return this.questionsService.decreaseDislikes(+id);
  }
}
