export class RankByGameRes {
  constructor(
    teamName: string,
    topicName: string,
    level: string,
    playTime: number,
    score: number,
  ) {
    this.teamName = teamName;
    this.topicName = topicName;
    this.level = level;
    this.playTime = playTime;
    this.score = score;
  }

  teamName: string;
  topicName: string;
  level: string;
  playTime: number;
  score: number;
  rank: number;
}
