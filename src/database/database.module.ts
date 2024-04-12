import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Team } from '../team/entities/team.entity';
import { Game } from '../game/entities/game.entity';
import { Topic } from '../topic/entities/topic.entity';
import { TopicData } from '../topic-data/entities/topic-data.entity';
import { Rank } from '../rank/entities/rank.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'alang-malang',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Team, Game, Topic, TopicData, Rank]),
  ],
})
export class DatabaseModule {}
