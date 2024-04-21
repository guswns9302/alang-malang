export class GameRes {
  constructor(id: number, name: string, comment: string, img: string) {
    this.gameId = id;
    this.gameName = name;
    this.gameComment = comment;
    this.gameImg = img;
  }

  gameId: number;
  gameName: string;
  gameComment: string;
  gameImg: string;
}
