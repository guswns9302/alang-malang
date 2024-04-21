import { PartialType } from '@nestjs/mapped-types';
import { CreateGameDto } from './create-game.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateGameDto extends PartialType(CreateGameDto) {
  @IsNumber()
  @IsNotEmpty()
  gameId: number;

  @IsString()
  @IsNotEmpty()
  gameName: string;

  @IsString()
  @IsNotEmpty()
  gameComment: string;

  gameImg: string;
}
