import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Game } from '../game/entities/game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Game])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
