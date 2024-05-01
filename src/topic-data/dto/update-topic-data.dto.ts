import { PartialType } from '@nestjs/mapped-types';
import { CreateTopicDataDto } from './create-topic-data.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateTopicDataDto extends PartialType(CreateTopicDataDto) {
  @IsNumber()
  @IsNotEmpty()
  topicId: number;
  @IsNumber()
  @IsNotEmpty()
  topicDataId: number;
  @IsString()
  @IsNotEmpty()
  topicDataName: string;
  @IsString()
  @IsNotEmpty()
  topicDataLevel: string;
}
