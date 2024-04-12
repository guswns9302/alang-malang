import { PartialType } from '@nestjs/mapped-types';
import { CreateTopicDataDto } from './create-topic-data.dto';

export class UpdateTopicDataDto extends PartialType(CreateTopicDataDto) {}
