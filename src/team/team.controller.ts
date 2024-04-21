import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamRes } from './dto/team.res';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto): Promise<TeamRes[]> {
    return this.teamService.create(createTeamDto);
  }

  @Patch()
  update(@Body() updateTeamDto: UpdateTeamDto): Promise<TeamRes[]> {
    return this.teamService.update(updateTeamDto);
  }

  @Delete(':userId/:teamId')
  remove(
    @Param('userId') userId: string,
    @Param('teamId') teamId: number,
  ): Promise<TeamRes[]> {
    return this.teamService.remove(userId, +teamId);
  }

  @Get(':userId')
  getTeam(@Param('userId') userId: string): Promise<TeamRes[]> {
    return this.teamService.find(userId);
  }
}
