import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTopicDto {
  @IsNumber()
  @IsNotEmpty()
  gameId: number;

  @IsString()
  @IsNotEmpty()
  topicName: string;

  topicImg: string;

  @IsString()
  @IsNotEmpty()
  onBoard: string;
}
