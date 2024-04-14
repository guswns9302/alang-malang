import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { CreateTeamRes } from './dto/create-team.res';
import { UpdateTeamRes } from './dto/update-team.res';
import { DeleteTeamRes } from './dto/delete-team.res';
import { Team } from './entities/team.entity';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createTeamDto: CreateTeamDto): Promise<CreateTeamRes> {
    const { userId, teamName } = createTeamDto;
    const team = new Team();
    team.user = await this.userRepository.findOneBy({ id: userId });
    team.name = teamName;
    const result = await this.teamRepository.save(team);
    const teamRes = new CreateTeamRes();
    teamRes.teamId = result.id;
    teamRes.teamName = result.name;
    return teamRes;
  }

  async update(updateTeamDto: UpdateTeamDto): Promise<UpdateTeamRes> {
    const { teamId, teamName } = updateTeamDto;
    const team = await this.teamRepository.findOneBy({ id: teamId });
    team.name = teamName;
    const result = await this.teamRepository.save(team);
    const teamRes = new UpdateTeamRes();
    teamRes.teamId = result.id;
    teamRes.teamName = result.name;
    return teamRes;
  }

  async remove(id: number): Promise<DeleteTeamRes> {
    const team = await this.teamRepository.findOneBy({ id });
    const result = await this.teamRepository.remove(team);
    const teamRes = new DeleteTeamRes();
    teamRes.teamId = id;
    teamRes.teamName = result.name;
    return teamRes;
  }
}
