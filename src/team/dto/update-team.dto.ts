import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamDto } from './create-team.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateTeamDto extends PartialType(CreateTeamDto) {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @IsNotEmpty()
  teamId: number;

  @IsString()
  @IsNotEmpty()
  teamName: string;
}
