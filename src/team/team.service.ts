import { Injectable, NotFoundException } from '@nestjs/common';
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
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const team = this.teamRepository.create({ name: teamName, user });
    await this.teamRepository.save(team);
    return this.find(createTeamDto.userId);
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
    return await user.teams.map((team) => new TeamRes(team.id, team.name));
  }
}
