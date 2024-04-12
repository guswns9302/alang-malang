import { Common } from '../../common.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Topic } from '../../topic/entities/topic.entity';

@Entity()
export class TopicData extends Common {
  @Column()
  level: string;

  @Column()
  name: string;

  @ManyToOne(() => Topic, (topic) => topic.topicDatas)
  topic: Topic;
}
