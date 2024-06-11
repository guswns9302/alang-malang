import { PartialType } from '@nestjs/mapped-types';
import { CreateGameDto } from './create-game.dto';
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateGameDto extends PartialType(CreateGameDto) {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  gameId: number;
}
