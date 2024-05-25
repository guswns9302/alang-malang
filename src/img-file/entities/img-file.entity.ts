import { Common } from '../../common.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class ImgFile extends Common {
  @Column()
  filename: string;

  @Column()
  path: string;
}
