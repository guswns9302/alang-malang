import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserLoginRes } from './dto/user.login.res';
import { Game } from '../game/entities/game.entity';
import { TeamRes } from '../team/dto/team.res';
import { GameRes } from '../game/dto/game.res';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserLoginRes> {
    let isUser: User = await this.userRepository.findOneBy({
      id: createUserDto.id,
    });

    if (isUser == null) {
      isUser = this.userRepository.create(createUserDto);
    }

    isUser.lastLoginAt = new Date();

    await this.userRepository.save(isUser);

    const teams: TeamRes[] = await isUser.teams.map(
      (team) => new TeamRes(team.id, team.name),
    );

    const gameData = await this.gameRepository.find();
    const games: GameRes[] = gameData.map(
      (game) => new GameRes(game.id, game.name, game.comment, game.img),
    );

    return {
      id: isUser.id,
      team: teams,
      game: games,
    };
  }
}
