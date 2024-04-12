import { Module } from '@nestjs/common';
import { TopicDataService } from './topic-data.service';
import { TopicDataController } from './topic-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicData } from './entities/topic-data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TopicData])],
  controllers: [TopicDataController],
  providers: [TopicDataService],
})
export class TopicDataModule {}
