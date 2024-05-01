import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TopicService } from './topic.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { TopicRes } from './dto/topic.res';
import { TopicDataRes } from '../topic-data/dto/topic-data.res';

@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get()
  startGame(
    @Query('topicId') topicId: number,
    @Query('level') level: string,
  ): Promise<TopicDataRes[]> {
    return this.topicService.startGame(+topicId, level);
  }

  @Get(':gameId')
  find(@Param('gameId') gameId: number): Promise<TopicRes[]> {
    return this.topicService.find(+gameId);
  }

  @Post()
  create(@Body() createTopicDto: CreateTopicDto): Promise<TopicRes[]> {
    return this.topicService.create(createTopicDto);
  }

  @Patch()
  update(@Body() updateTopicDto: UpdateTopicDto): Promise<TopicRes[]> {
    return this.topicService.update(updateTopicDto);
  }

  @Delete(':gameId/:topicId')
  remove(
    @Param('gameId') gameId: number,
    @Param('topicId') topicId: number,
  ): Promise<TopicRes[]> {
    return this.topicService.remove(+gameId, +topicId);
  }
}
