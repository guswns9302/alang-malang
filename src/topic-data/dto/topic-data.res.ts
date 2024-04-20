export class TopicDataRes {
  constructor(id: number, name: string, level: string) {
    this.topicDataId = id;
    this.topicDataName = name;
    this.topicDataLevel = level;
  }

  topicDataId: number;
  topicDataName: string;
  topicDataLevel: string;
}
