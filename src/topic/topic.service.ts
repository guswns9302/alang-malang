import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { Repository } from 'typeorm';
import { TopicRes } from './dto/topic.res';
import { Game } from '../game/entities/game.entity';
import { TopicDataRes } from '../topic-data/dto/topic-data.res';

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
          [
            topic.onBoard.getFullYear(),
            topic.onBoard.getMonth() + 1 > 9
              ? topic.onBoard.getMonth() + 1
              : '0' + (topic.onBoard.getMonth() + 1),
            topic.onBoard.getDate() > 9
              ? topic.onBoard.getDate()
              : '0' + topic.onBoard.getDate(),
          ].join('-'),
        ),
    );
  }

  async startGame(topicId: number, level: string): Promise<TopicDataRes[]> {
    const topic = await this.topicRepository.findOneBy({ id: topicId });
    if (!topic) {
      throw new NotFoundException('Topic not found');
    }

    const topicDatas = await topic.topicDatas;
    const dataSize = topicDatas.length;
    const easyMode = topicDatas
      .filter((x) => x.level == 'easy')
      .map(
        (topicData) =>
          new TopicDataRes(topicData.id, topicData.name, topicData.level),
      );

    const hardMode = topicDatas
      .filter((x) => x.level == 'hard')
      .map(
        (topicData) =>
          new TopicDataRes(topicData.id, topicData.name, topicData.level),
      );

    if (level == 'easy') {
      return this.fyShuffle(easyMode);
    }

    const resultList: TopicDataRes[] = [];
    let easyCnt = 0;
    let hardCnt = 0;
    const easyDummy: TopicDataRes[] = this.fyShuffle(easyMode);
    const hardDummy: TopicDataRes[] = this.fyShuffle(hardMode);
    if (level == 'normal') {
      // 쉬움 -> 70% / 보통 -> 30%
      easyCnt = Math.round((dataSize * 70) / 100);
      hardCnt = Math.round((dataSize * 30) / 100);
    }

    if (level == 'hard') {
      // 쉬움 -> 40% / 보통 -> 60%
      easyCnt = Math.round((dataSize * 40) / 100);
      hardCnt = Math.round((dataSize * 60) / 100);
    }

    for (let i = 0; i < easyCnt; i++) {
      const idx = Math.floor(Math.random() * easyDummy.length);
      console.log('쉬움 더미 : ' + easyDummy.length);
      console.log('쉬움 : ' + idx);
      console.log('쉬움 데이터 : ' + easyDummy[idx]);
      resultList.push(easyDummy[idx]);
    }
    for (let i = 0; i < hardCnt; i++) {
      const idx = Math.floor(Math.random() * hardDummy.length);
      console.log('하드 더미 : ' + hardDummy.length);
      console.log('하드 : ' + idx);
      console.log('하드 데이터 : ' + hardDummy[idx]);
      resultList.push(hardDummy[idx]);
    }

    return this.fyShuffle(resultList);
  }

  fyShuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor((i + 1) * Math.random());
      [arr[i], arr[j]] = [arr[j], arr[i]]; // 배열 값 교환
    }
    return arr;
  };
}
