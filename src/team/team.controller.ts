import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { CreateTeamRes } from './dto/create-team.res';
import { UpdateTeamRes } from './dto/update-team.res';
import { DeleteTeamRes } from './dto/delete-team.res';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto): Promise<CreateTeamRes> {
    return this.teamService.create(createTeamDto);
  }

  @Patch()
  update(@Body() updateTeamDto: UpdateTeamDto): Promise<UpdateTeamRes> {
    return this.teamService.update(updateTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<DeleteTeamRes> {
    return this.teamService.remove(+id);
  }
}
