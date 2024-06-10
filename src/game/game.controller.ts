import { Body, Controller, Get, Patch, Post, UploadedFile, UseInterceptors, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { GameRes } from './dto/game.res';
import { UpdateGameDto } from './dto/update-game.dto';
import { multerConfig } from '../config/multer.config';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  @UseInterceptors(FileInterceptor('imgFile', multerConfig))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createGameDto: CreateGameDto
  ): Promise<GameRes[]> {
    if(file){
      createGameDto.gameImg = file.filename;
    }else{
      createGameDto.gameImg = 'test.png'
    }
    return this.gameService.create(createGameDto);
  }

  @Patch()
  update(@Body() updateGameDto: UpdateGameDto): Promise<GameRes[]> {
    return this.gameService.update(updateGameDto);
  }

  @Get()
  getList(): Promise<GameRes[]> {
    return this.gameService.find();
  }
}
