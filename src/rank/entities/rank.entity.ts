import { Common } from '../../common.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Team } from '../../team/entities/team.entity';
import { Game } from '../../game/entities/game.entity';

@Entity()
export class Rank extends Common {
  @Column()
  level: string;

  @Column()
  playTime: number;

  @Column()
  setPass: number;

  @Column()
  usePass: number;

  @Column()
  score: number;

  @Column()
  topicDatas: string;

  @ManyToOne(() => User, (user) => user.ranks)
  user: User;

  @ManyToOne(() => Team, (team) => team.ranks)
  team: Team;

  @ManyToOne(() => Game, (game) => game.ranks)
  game: Game;
}
