import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TopicDataService } from './topic-data.service';
import { CreateTopicDataDto } from './dto/create-topic-data.dto';
import { UpdateTopicDataDto } from './dto/update-topic-data.dto';

@Controller('topic-data')
export class TopicDataController {
  constructor(private readonly topicDataService: TopicDataService) {}

  @Post()
  create(@Body() createTopicDatumDto: CreateTopicDataDto) {
    return this.topicDataService.create(createTopicDatumDto);
  }

  @Get()
  findAll() {
    return this.topicDataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicDataService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTopicDatumDto: UpdateTopicDataDto,
  ) {
    return this.topicDataService.update(+id, updateTopicDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topicDataService.remove(+id);
  }
}
