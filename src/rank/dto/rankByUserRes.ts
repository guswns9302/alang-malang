import { RankByGameRes } from './rankByGameRes';

export class RankByUserRes {
  constructor(
    teamName: string,
    playCount: number,
    totalScore: number,
    detail: RankByGameRes[],
  ) {
    this.teamName = teamName;
    this.playCount = playCount;
    this.totalScore = totalScore;
    this.detail = detail;
  }

  teamName: string;
  playCount: number;
  totalScore: number;
  totalRank: number;
  detail: RankByGameRes[];
}
