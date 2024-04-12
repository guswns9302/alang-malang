import { Test, TestingModule } from '@nestjs/testing';
import { TopicDataService } from './topic-data.service';

describe('TopicDataService', () => {
  let service: TopicDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopicDataService],
    }).compile();

    service = module.get<TopicDataService>(TopicDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
