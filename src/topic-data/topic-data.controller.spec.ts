import { Test, TestingModule } from '@nestjs/testing';
import { TopicDataController } from './topic-data.controller';
import { TopicDataService } from './topic-data.service';

describe('TopicDataController', () => {
  let controller: TopicDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopicDataController],
      providers: [TopicDataService],
    }).compile();

    controller = module.get<TopicDataController>(TopicDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
