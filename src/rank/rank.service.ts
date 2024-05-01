import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRankDto } from './dto/create-rank.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rank } from './entities/rank.entity';
import { Repository } from 'typeorm';
import { RankByGameRes } from './dto/rankByGameRes';
import { User } from '../users/entities/user.entity';
import { Game } from '../game/entities/game.entity';
import { RankByUserRes } from './dto/rankByUserRes';

@Injectable()
export class RankService {
  constructor(
    @InjectRepository(Rank)
    private rankRepository: Repository<Rank>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  async create(createRankDto: CreateRankDto): Promise<RankByGameRes[]> {
    const {
      userId,
      teamId,
      gameId,
      topicId,
      level,
      playTime,
      setPass,
      usePass,
      score,
    } = createRankDto;
    const user = await this.userRepository.findOneBy({
      id: userId,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const team = user.teams.filter((x) => x.id == teamId)[0];
    const game = await this.gameRepository.findOneBy({
      id: gameId,
    });
    const topics = await game.topics;
    const topic = topics.filter((x) => x.id == topicId)[0];

    const rank = this.rankRepository.create(createRankDto);
    rank.user = user;
    rank.team = team;
    rank.game = game;
    rank.topic = topic;

    await this.rankRepository.save(rank);

    const ranks = await user.ranks;
    const ranksRes = await ranks.map(
      (rank) =>
        new RankByGameRes(
          rank.team.name,
          rank.topic.name,
          rank.level,
          rank.playTime,
          rank.score,
        ),
    );

    ranksRes.sort((a, b) => b.score - a.score);
    ranksRes.forEach((rank, idx) => {
      rank.rank = idx + 1;
    });
    return ranksRes;
  }

  async getRankByUser(userId: string): Promise<RankByUserRes[]> {
    const user = await this.userRepository.findOneBy({ id: userId });
    const teams = await user.teams;

    const result: RankByUserRes[] = [];
    for (const i in teams) {
      const ranks = await teams[i].ranks;
      const ranksRes = await ranks.map(
        (rank) =>
          new RankByGameRes(
            rank.team.name,
            rank.topic.name,
            rank.level,
            rank.playTime,
            rank.score,
          ),
      );

      ranksRes.sort((a, b) => b.score - a.score);

      let totalScore = 0;

      ranksRes.forEach((rank, idx) => {
        rank.rank = idx + 1;
        totalScore += rank.score;
      });

      const rankByUserTeams: RankByUserRes = new RankByUserRes(
        teams[i].name,
        ranksRes.length,
        totalScore,
        ranksRes,
      );
      result.push(rankByUserTeams);
    }

    result.sort((a, b) => b.totalScore - a.totalScore);
    result.forEach((rank, idx) => {
      rank.totalRank = idx + 1;
    });

    return result;
  }

  async refresh(userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    const ranks = await user.ranks;
    console.log(ranks);
    for (const i in ranks) {
      await this.rankRepository.delete({ id: ranks[i].id });
    }
  }
}
