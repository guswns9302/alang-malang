import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  teamName: string;
}
