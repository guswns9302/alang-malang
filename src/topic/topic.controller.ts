import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TopicService } from './topic.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { TopicRes } from './dto/topic.res';
import { TopicDataRes } from '../topic-data/dto/topic-data.res';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';

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

  @Post('/image')
  @UseInterceptors(FileInterceptor('file'))
  imageUpload(@UploadedFile() file: Express.Multer.File) {
    return this.topicService.imageUpload(file);
  }

  @Get('/image/:file')
  imageDownload(@Param('file') file: string): string {
    return path.join(process.cwd(), '/image/topic', file);
  }
}
