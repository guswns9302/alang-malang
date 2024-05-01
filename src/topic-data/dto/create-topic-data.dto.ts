import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTopicDataDto {
  @IsNumber()
  @IsNotEmpty()
  topicId: number;

  @IsString()
  @IsNotEmpty()
  topicDataName: string;

  @IsString()
  @IsNotEmpty()
  topicDataLevel: string;
}
