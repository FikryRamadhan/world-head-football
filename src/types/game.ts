export interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  speedY?: number;
  speedX?: number;
}

export interface GameState {
  player1: GameObject;
  player2: GameObject;
  ball: GameObject;
}

export interface Score {
  player1: number;
  player2: number;
}