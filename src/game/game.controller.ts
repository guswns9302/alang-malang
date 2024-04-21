import { Body, Controller, Patch, Post } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { GameRes } from './dto/game.res';
import { UpdateGameDto } from './dto/update-game.dto';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  create(@Body() createGameDto: CreateGameDto): Promise<GameRes[]> {
    return this.gameService.create(createGameDto);
  }

  @Patch()
  update(@Body() updateGameDto: UpdateGameDto): Promise<GameRes[]> {
    return this.gameService.update(updateGameDto);
  }
}
