import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TopicDataService } from './topic-data.service';
import { CreateTopicDataDto } from './dto/create-topic-data.dto';
import { UpdateTopicDataDto } from './dto/update-topic-data.dto';
import { TopicDataRes } from './dto/topic-data.res';

@Controller('topic-data')
export class TopicDataController {
  constructor(private readonly topicDataService: TopicDataService) {}

  @Get(':topicId')
  select(@Param('topicId') topicId: number): Promise<TopicDataRes[]> {
    return this.topicDataService.find(+topicId);
  }

  @Post()
  create(
    @Body() createTopicDatumDto: CreateTopicDataDto,
  ): Promise<TopicDataRes[]> {
    return this.topicDataService.create(createTopicDatumDto);
  }

  @Post('/excel/:topicId')
  createExcel(
    @Param('topicId') topicId: number,
    @Body() createTopicDatumDtoList: CreateTopicDataDto[],
  ): Promise<TopicDataRes[]> {
    return this.topicDataService.createExcel(+topicId, createTopicDatumDtoList);
  }

  @Patch()
  update(
    @Body() updateTopicDatumDto: UpdateTopicDataDto,
  ): Promise<TopicDataRes[]> {
    return this.topicDataService.update(updateTopicDatumDto);
  }

  @Delete(':topicId/:topicDataId')
  remove(
    @Param('topicId') topicId: number,
    @Param('topicDataId') topicDataId: number,
  ): Promise<TopicDataRes[]> {
    return this.topicDataService.remove(+topicId, +topicDataId);
  }
}
