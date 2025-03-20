export const GRAVITY = 0.5;
export const JUMP_FORCE = -12;
export const BALL_SPEED = 8;
export const MOVEMENT_SPEED = 5;
export const BALL_DAMPENING = 0.8;

export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 400;
export const GROUND_Y = 350;

export const GOAL_WIDTH = 20;
export const GOAL_HEIGHT = 100;

export const INITIAL_GAME_STATE = {
  player1: { x: 100, y: GROUND_Y, width: 50, height: 50, speedY: 0 },
  player2: { x: 650, y: GROUND_Y, width: 50, height: 50, speedY: 0 },
  ball: { x: CANVAS_WIDTH / 2 - 15, y: 200, width: 30, height: 30, speedX: 0, speedY: 0 },
  goals: {
    left: { x: 0, y: GROUND_Y - GOAL_HEIGHT, width: GOAL_WIDTH, height: GOAL_HEIGHT },
    right: { x: CANVAS_WIDTH - GOAL_WIDTH, y: GROUND_Y - GOAL_HEIGHT, width: GOAL_WIDTH, height: GOAL_HEIGHT }
  }
};