import { Test, TestingModule } from '@nestjs/testing';
import { FirstStartService } from './first-start.service';

describe('FirstStartService', () => {
  let service: FirstStartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FirstStartService],
    }).compile();

    service = module.get<FirstStartService>(FirstStartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
