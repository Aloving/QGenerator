import { Test, TestingModule } from '@nestjs/testing';
import { QuestionProposalsController } from './question-proposals.controller';

describe('QuestionProposalsController', () => {
  let controller: QuestionProposalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionProposalsController],
    }).compile();

    controller = module.get<QuestionProposalsController>(QuestionProposalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
