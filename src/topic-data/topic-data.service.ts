import { Injectable } from '@nestjs/common';
import { CreateTopicDataDto } from './dto/create-topic-data.dto';
import { UpdateTopicDataDto } from './dto/update-topic-data.dto';

@Injectable()
export class TopicDataService {
  create(createTopicDatumDto: CreateTopicDataDto) {
    return 'This action adds a new topicDatum';
  }

  findAll() {
    return `This action returns all topicData`;
  }

  findOne(id: number) {
    return `This action returns a #${id} topicDatum`;
  }

  update(id: number, updateTopicDatumDto: UpdateTopicDataDto) {
    return `This action updates a #${id} topicDatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} topicDatum`;
  }
}
