import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

  @Delete(':id')
  remove(@Param('id') id: number): Promise<TeamRes[]> {
    return this.teamService.remove(+id);
  }
}
