import { Common } from '../../common.entity';
import { Column, Entity, PrimaryGeneratedColumn  } from 'typeorm';

@Entity()
export class ImgFile extends Common {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  path: string;
  
}
