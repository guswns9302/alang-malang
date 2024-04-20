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
    team.name = teamName;
    team.user = await this.userRepository.findOneBy({ id: userId });
    await this.teamRepository.save(team);
    return this.find(userId);
  }

  async update(updateTeamDto: UpdateTeamDto): Promise<TeamRes[]> {
    const { userId, teamId, teamName } = updateTeamDto;
    const team = await this.teamRepository.findOneBy({ id: teamId });
    team.name = teamName;
    await this.teamRepository.save(team);
    return this.find(userId);
  }

  async remove(userId: string, teamId: number): Promise<TeamRes[]> {
    const user = await this.userRepository.findOneBy({ id: userId });
    await this.teamRepository.delete({ id: teamId, user: user });
    return this.find(userId);
  }

  async find(userId: string): Promise<TeamRes[]> {
    const user = await this.userRepository.findOneBy({ id: userId });
    const results = await user.teams;
    const responses = [];
    for (const result of results) {
      const response = new TeamRes(result.id, result.name);
      responses.push(response);
    }
    return responses;
  }
}
