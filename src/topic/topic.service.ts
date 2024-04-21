import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { Repository } from 'typeorm';
import { TopicRes } from './dto/topic.res';
import { Game } from '../game/entities/game.entity';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  async create(createTopicDto: CreateTopicDto): Promise<TopicRes[]> {
    const { gameId, topicName, topicImg, onBoard } = createTopicDto;
    const game = await this.gameRepository.findOneBy({ id: gameId });
    if (!game) {
      throw new NotFoundException('Game not found');
    }

    const topic = this.topicRepository.create({
      name: topicName,
      img: topicImg,
      onBoard: new Date(onBoard),
      game,
    });

    await this.topicRepository.save(topic);
    return this.find(gameId);
  }

  async update(updateTopicDto: UpdateTopicDto): Promise<TopicRes[]> {
    const { gameId, topicId, topicName, topicImg, onBoard } = updateTopicDto;
    const topic = await this.topicRepository.findOneBy({ id: topicId });
    topic.name = topicName;
    topic.img = topicImg;
    topic.onBoard = new Date(onBoard);
    await this.topicRepository.save(topic);
    return this.find(gameId);
  }

  async remove(gameId: number, topicId: number): Promise<TopicRes[]> {
    const game = await this.gameRepository.findOneBy({ id: gameId });
    await this.topicRepository.delete({ id: topicId, game: game });
    return this.find(gameId);
  }

  async find(gameId: number): Promise<TopicRes[]> {
    const game = await this.gameRepository.findOneBy({ id: gameId });
    if (!game) {
      throw new NotFoundException('Game not found');
    }
    const topics = await game.topics;

    return topics.map(
      (topic) =>
        new TopicRes(
          topic.id,
          topic.name,
          topic.img,
          topic.onBoard >= new Date(),
        ),
    );
  }
}
