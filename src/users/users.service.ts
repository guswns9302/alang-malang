import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserLoginRes } from './dto/user.login.res';
import { Game } from '../game/entities/game.entity';
import { TeamRes } from '../team/dto/team.res';
import { GameRes } from '../game/dto/game.res';
import { Team } from '../team/entities/team.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserLoginRes> {
    const { id } = createUserDto;
    let isUser: User = await this.userRepository.findOneBy({
      id: id,
    });

    let flag = false;
    if (isUser == null) {
      isUser = this.userRepository.create(createUserDto);
      flag = true;
    }

    isUser.lastLoginAt = new Date();

    const saveUser = await this.userRepository.save(isUser);

    if (flag) {
      const teamName = ['심연의 그린', '우아한 코랄', '진중한 블루'];
      for (let i = 0; i < 3; i++) {
        const team = this.teamRepository.create({
          name: teamName[i],
          user: saveUser,
        });
        await this.teamRepository.save(team);
      }
    }

    const resultUser = await this.userRepository.findOneBy({
      id: id,
    });
    const teams: TeamRes[] = await resultUser.teams.map(
      (team) => new TeamRes(team.id, team.name),
    );

    const gameData = await this.gameRepository.find();
    const games: GameRes[] = gameData.map(
      (game) => new GameRes(game.id, game.name, game.comment, game.img),
    );

    return {
      id: resultUser.id,
      team: teams,
      game: games,
    };
  }
}
