import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Team } from '../team/entities/team.entity';
import { Game } from '../game/entities/game.entity';
import { Topic } from '../topic/entities/topic.entity';
import { TopicData } from '../topic-data/entities/topic-data.entity';
import { ConfigService } from '@nestjs/config';
import { Rank } from '../rank/entities/rank.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_DATABASE'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: configService.get<boolean>('DATABASE_SYNCHRONIZE'),
      }),
    }),
    TypeOrmModule.forFeature([User, Team, Game, Topic, TopicData, Rank]),
  ],
})
export class DatabaseModule {}
