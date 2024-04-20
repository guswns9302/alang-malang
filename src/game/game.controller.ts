import { Controller, Post, Body } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { GameRes } from './dto/game.res';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  create(@Body() createGameDto: CreateGameDto): Promise<GameRes[]> {
    return this.gameService.create(createGameDto);
  }
}
