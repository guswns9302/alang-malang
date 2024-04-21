import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  gameName: string;

  @IsString()
  @IsNotEmpty()
  gameComment: string;

  @IsString()
  gameImg: string;
}
