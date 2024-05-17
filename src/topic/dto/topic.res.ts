export class TopicRes {
  constructor(
    id: number,
    name: string,
    img: string,
    onBoard: boolean,
    onBoardDate: string,
  ) {
    this.topicId = id;
    this.topicName = name;
    this.topicImg = img;
    this.onBoard = onBoard;
    this.onBoardDate = onBoardDate;
  }

  topicId: number;
  topicName: string;
  topicImg: string;
  onBoard: boolean;
  onBoardDate: string;
}
