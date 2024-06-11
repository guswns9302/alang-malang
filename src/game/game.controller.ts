import { Body, Controller, Get, Patch, Post, UploadedFile, UseInterceptors, Param, Res,} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { GameRes } from './dto/game.res';
import { UpdateGameDto } from './dto/update-game.dto';
import { multerConfig } from '../config/multer.config';
import { join } from 'path';
import { Response } from 'express';
import * as os from 'os';

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

  // @Patch()
  // update(@Body() updateGameDto: UpdateGameDto): Promise<GameRes[]> {
  //   return this.gameService.update(updateGameDto);
  // }


  @Patch()
  @UseInterceptors(FileInterceptor('imgFile', multerConfig))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Body() updateGameDto: UpdateGameDto
  ): Promise<GameRes[]> {
    if(file){
      updateGameDto.gameImg = file.filename;
    }
    return this.gameService.update(updateGameDto);
  }


  
  @Get()
  getList(): Promise<GameRes[]> {
    return this.gameService.find();
  }

  @Get('download/:filename')
  async downloadFile(
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    const filePath = this.gameService.getFilePath(filename);
    res.sendFile(filePath);
  }
}
