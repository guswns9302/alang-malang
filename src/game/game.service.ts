import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { GameRes } from './dto/game.res';
import { Game } from './entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  async create(createGameDto: CreateGameDto): Promise<GameRes[]> {
    const { gameName, gameComment, gameImg } = createGameDto;

    const game = this.gameRepository.create({
      name: gameName,
      comment: gameComment,
      img: gameImg,
    });
    await this.gameRepository.save(game);
    return this.find();
  }

  async find(): Promise<GameRes[]> {
    const games = await this.gameRepository.find({});
    return games.map(
      (game) => new GameRes(game.id, game.name, game.comment, game.img),
    );
  }

  async update(updateGameDto: UpdateGameDto): Promise<GameRes[]> {
    const game = await this.gameRepository.findOneBy({
      id: updateGameDto.gameId,
    });

    if (game == null) {
      throw new NotFoundException('Game not found');
    }

    game.name = updateGameDto.gameName;
    game.comment = updateGameDto.gameComment;
    game.img = updateGameDto.gameImg;
    await this.gameRepository.save(game);
    return this.find();
  }
}
