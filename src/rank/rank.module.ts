import { Module } from '@nestjs/common';
import { RankService } from './rank.service';
import { RankController } from './rank.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rank } from './entities/rank.entity';
import { User } from '../users/entities/user.entity';
import { Game } from '../game/entities/game.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rank]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Game]),
  ],
  controllers: [RankController],
  providers: [RankService],
})
export class RankModule {}
