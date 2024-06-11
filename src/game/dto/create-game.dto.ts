import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  gameName: string;

  @IsString()
  @IsNotEmpty()
  gameComment: string;

  @IsString()
  @IsOptional()
  gameImg?: string;
}
