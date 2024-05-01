import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRankDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @IsNotEmpty()
  teamId: number;

  @IsNumber()
  @IsNotEmpty()
  gameId: number;

  @IsNumber()
  @IsNotEmpty()
  topicId: number;

  @IsString()
  @IsNotEmpty()
  level: string;

  @IsNumber()
  @IsNotEmpty()
  playTime: number;

  @IsNumber()
  @IsNotEmpty()
  setPass: number;

  @IsNumber()
  @IsNotEmpty()
  usePass: number;

  @IsNumber()
  @IsNotEmpty()
  score: number;
}
