import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { TeamModule } from './team/team.module';
import { GameModule } from './game/game.module';
import { TopicModule } from './topic/topic.module';
import { TopicDataModule } from './topic-data/topic-data.module';
import { RankModule } from './rank/rank.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.env.NODE_ENV || ''}.env`,
    }),
    UsersModule,
    DatabaseModule,
    TeamModule,
    GameModule,
    TopicModule,
    TopicDataModule,
    RankModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
