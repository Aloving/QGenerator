import { Test, TestingModule } from '@nestjs/testing';
import { QuestionProposalsService } from './question-proposals.service';

describe('QuestionProposalsService', () => {
  let service: QuestionProposalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionProposalsService],
    }).compile();

    service = module.get<QuestionProposalsService>(QuestionProposalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
