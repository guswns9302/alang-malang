import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { Game } from '../game/entities/game.entity';
import { MulterConfigService } from '../utils/multer.config';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Topic]),
    TypeOrmModule.forFeature([Game]),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  controllers: [TopicController],
  providers: [TopicService],
})
export class TopicModule {}
