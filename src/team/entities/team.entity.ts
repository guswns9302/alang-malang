import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Common } from '../../common.entity';
import { User } from '../../users/entities/user.entity';
import { Rank } from '../../rank/entities/rank.entity';

@Entity()
export class Team extends Common {
  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.teams)
  user: User;

  @OneToMany(() => Rank, (rank) => rank.team)
  ranks: Rank[];
}
