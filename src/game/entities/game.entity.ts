import { Common } from '../../common.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Topic } from '../../topic/entities/topic.entity';
import { Rank } from '../../rank/entities/rank.entity';

@Entity()
export class Game extends Common {
  @Column()
  name: string;

  @Column()
  comment: string;

  @Column()
  img: string;

  @OneToMany(() => Topic, (topic) => topic.game, { lazy: true })
  topics: Topic[];

  @OneToMany(() => Rank, (rank) => rank.game, { lazy: true })
  ranks: Rank[];
}
