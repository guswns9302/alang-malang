import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { Game } from '../game/entities/game.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Topic]),
    TypeOrmModule.forFeature([Game]),
  ],
  controllers: [TopicController],
  providers: [TopicService],
})
export class TopicModule {}
