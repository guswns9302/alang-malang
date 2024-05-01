import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTopicDataDto } from './dto/create-topic-data.dto';
import { UpdateTopicDataDto } from './dto/update-topic-data.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TopicData } from './entities/topic-data.entity';
import { Repository } from 'typeorm';
import { TopicDataRes } from './dto/topic-data.res';
import { Topic } from '../topic/entities/topic.entity';

@Injectable()
export class TopicDataService {
  constructor(
    @InjectRepository(TopicData)
    private topicDataRepository: Repository<TopicData>,
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,
  ) {}

  async create(
    createTopicDataDto: CreateTopicDataDto,
  ): Promise<TopicDataRes[]> {
    const { topicId, topicDataName, topicDataLevel } = createTopicDataDto;

    if (topicDataLevel !== 'easy' && topicDataLevel !== 'hard') {
      throw new NotFoundException('Level not found');
    }

    const topic = await this.topicRepository.findOneBy({ id: topicId });
    if (!topic) {
      throw new NotFoundException('Topic not found');
    }

    const topicData = this.topicDataRepository.create({
      name: topicDataName,
      level: topicDataLevel,
      topic,
    });

    await this.topicDataRepository.save(topicData);
    return this.find(topicId);
  }

  async update(
    updateTopicDataDto: UpdateTopicDataDto,
  ): Promise<TopicDataRes[]> {
    const { topicId, topicDataId, topicDataName, topicDataLevel } =
      updateTopicDataDto;

    if (topicDataLevel !== 'easy' && topicDataLevel !== 'hard') {
      throw new NotFoundException('Level not found');
    }

    const topicData = await this.topicDataRepository.findOneBy({
      id: topicDataId,
    });
    topicData.name = topicDataName;
    topicData.level = topicDataLevel;
    await this.topicDataRepository.save(topicData);
    return this.find(topicId);
  }

  async remove(topicId: number, topicDataId: number): Promise<TopicDataRes[]> {
    const topic = await this.topicRepository.findOneBy({ id: topicId });
    await this.topicDataRepository.delete({ id: topicDataId, topic: topic });
    return this.find(topicId);
  }

  async find(topicId: number): Promise<TopicDataRes[]> {
    const topic = await this.topicRepository.findOneBy({ id: topicId });
    const results = await topic.topicDatas;
    const responses = [];
    for (const result of results) {
      const response = new TopicDataRes(result.id, result.name, result.level);
      responses.push(response);
    }
    return responses;
  }
}
