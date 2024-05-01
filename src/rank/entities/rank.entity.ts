import { Common } from '../../common.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Team } from '../../team/entities/team.entity';
import { Game } from '../../game/entities/game.entity';
import { Topic } from '../../topic/entities/topic.entity';

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

  @ManyToOne(() => User, (user) => user.ranks, { lazy: true })
  user: User;

  @ManyToOne(() => Team, (team) => team.ranks, { eager: true })
  team: Team;

  @ManyToOne(() => Game, (game) => game.ranks, { eager: true })
  game: Game;

  @ManyToOne(() => Topic, (topic) => topic.ranks, { eager: true })
  topic: Topic;
}
