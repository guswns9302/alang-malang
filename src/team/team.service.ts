import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamRes } from './dto/team.res';
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

  async create(createTeamDto: CreateTeamDto): Promise<TeamRes[]> {
    const { userId, teamName } = createTeamDto;
    const team = new Team();
    team.user = await this.userRepository.findOneBy({ id: userId });
    team.name = teamName;
    await this.teamRepository.save(team);
    return this.findAll();
  }

  async update(updateTeamDto: UpdateTeamDto): Promise<TeamRes[]> {
    const { teamId, teamName } = updateTeamDto;
    const team = await this.teamRepository.findOneBy({ id: teamId });
    team.name = teamName;
    await this.teamRepository.save(team);
    return this.findAll();
  }

  async remove(id: number): Promise<TeamRes[]> {
    const team = await this.teamRepository.findOneBy({ id });
    await this.teamRepository.remove(team);
    return this.findAll();
  }

  async findAll(): Promise<TeamRes[]> {
    const results = await this.teamRepository.find({});
    const responses = [];
    for (const result of results) {
      const response = new TeamRes();
      response.teamId = result.id;
      response.teamName = result.name;
      responses.push(response);
    }
    return responses;
  }
}
