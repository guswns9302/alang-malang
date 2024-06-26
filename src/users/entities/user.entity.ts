import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Team } from '../../team/entities/team.entity';
import { Rank } from '../../rank/entities/rank.entity';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  lastLoginAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Team, (team) => team.user, { eager: true })
  teams: Team[];

  @OneToMany(() => Rank, (rank) => rank.user, { lazy: true })
  ranks: Rank[];
}
