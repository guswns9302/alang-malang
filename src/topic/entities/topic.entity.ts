import { Common } from '../../common.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Game } from '../../game/entities/game.entity';
import { TopicData } from '../../topic-data/entities/topic-data.entity';
import { Rank } from '../../rank/entities/rank.entity';

@Entity()
export class Topic extends Common {
  @Column()
  name: string;

  @Column()
  img: string;

  @Column()
  onBoard: Date;

  @ManyToOne(() => Game, (game) => game.topics, { lazy: true })
  game: Game;

  @OneToMany(() => Rank, (rank) => rank.topic, { lazy: true })
  ranks: Rank[];

  @OneToMany(() => TopicData, (topicData) => topicData.topic, { lazy: true })
  topicDatas: TopicData[];
}
