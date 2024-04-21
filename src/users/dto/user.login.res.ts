import { TeamRes } from '../../team/dto/team.res';
import { GameRes } from '../../game/dto/game.res';

export class UserLoginRes {
  id: string;
  team: TeamRes[];
  game: GameRes[];
}
