export class TopicRes {
  constructor(id: number, name: string, img: string, onBoard: boolean) {
    this.topicId = id;
    this.topicName = name;
    this.topicImg = img;
    this.onBoard = onBoard;
  }

  topicId: number;
  topicName: string;
  topicImg: string;
  onBoard: boolean;
}
