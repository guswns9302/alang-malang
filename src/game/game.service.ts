import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { GameRes } from './dto/game.res';
import { Game } from './entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  async create(createGameDto: CreateGameDto): Promise<GameRes[]> {
    const { gameName, gameComment, gameImg } = createGameDto;
    const game = new Game();
    game.name = gameName;
    game.comment = gameComment;
    game.img = gameImg;
    await this.gameRepository.save(game);
    return this.find();
  }

  async find(): Promise<GameRes[]> {
    const results = await this.gameRepository.find({});
    const responses = [];
    for (const result of results) {
      const response = new GameRes(
        result.id,
        result.name,
        result.comment,
        result.img,
      );
      responses.push(response);
    }
    return responses;
  }
}
