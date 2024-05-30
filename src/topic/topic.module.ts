import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { Game } from '../game/entities/game.entity';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';

@Module({
  imports: [
    TypeOrmModule.forFeature([Topic]),
    TypeOrmModule.forFeature([Game]),
    MulterModule.register({
      storage: multer.diskStorage({
        destination: function (req, file, callback) {
          const dest = path.join(process.cwd(), '/image/topic');
          try {
            fs.readdirSync(dest);
          } catch (err) {
            fs.mkdirSync(dest, { recursive: true });
          }
          callback(null, dest);
        },
        filename: function (req, file, callback) {
          const ext = path.extname(file.originalname);
          const name = path.basename(file.originalname, ext);
          callback(null, `${name}_${Date.now()}${ext}`);
        },
      }),
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  ],
  controllers: [TopicController],
  providers: [TopicService],
})
export class TopicModule {}
