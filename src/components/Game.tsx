import React, { useEffect, useRef, useState } from 'react';
import { GameState, Score } from '../types/game';
import { checkCollision } from '../utils/collision';
import { drawGround, drawCenterLine, drawBall, drawGoal } from '../utils/canvas';
import ScoreBoard from './ScoreBoard';
import GameInstructions from './GameInstructions';
import {
  GRAVITY,
  JUMP_FORCE,
  BALL_SPEED,
  MOVEMENT_SPEED,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  GROUND_Y,
  INITIAL_GAME_STATE,
  BALL_DAMPENING,
} from '../constants/game';

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState<Score>({ player1: 0, player2: 0 });
  const [gameStarted, setGameStarted] = useState(false);
  const player1ImageRef = useRef<HTMLImageElement | null>(null);
  const player2ImageRef = useRef<HTMLImageElement | null>(null);

  const gameStateRef = useRef<GameState>(INITIAL_GAME_STATE);
  const keysPressed = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Load player images
    player1ImageRef.current = new Image();
    player1ImageRef.current.src = 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&q=80&w=50&h=50';
    
    player2ImageRef.current = new Image();
    player2ImageRef.current.src = 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=50&h=50';

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key.toLowerCase());
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key.toLowerCase());
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let animationFrameId: number;

    const calculateBallDirection = (playerX: number, playerWidth: number, ballX: number) => {
      // Calculate where the ball hit the player (0 = left edge, 1 = right edge)
      const hitPosition = (ballX - playerX) / playerWidth;
      // Convert to an angle between -45 and 45 degrees (in radians)
      return (hitPosition - 0.5) * Math.PI / 2;
    };

    const update = () => {
      const state = gameStateRef.current;

      // Player 1 controls (WASD)
      if (keysPressed.current.has('w') && state.player1.y >= GROUND_Y) {
        state.player1.speedY = JUMP_FORCE;
      }
      if (keysPressed.current.has('a')) {
        state.player1.x = Math.max(0, state.player1.x - MOVEMENT_SPEED);
      }
      if (keysPressed.current.has('d')) {
        state.player1.x = Math.min(CANVAS_WIDTH / 2 - state.player1.width, state.player1.x + MOVEMENT_SPEED);
      }

      // Player 2 controls (Arrow keys)
      if (keysPressed.current.has('arrowup') && state.player2.y >= GROUND_Y) {
        state.player2.speedY = JUMP_FORCE;
      }
      if (keysPressed.current.has('arrowleft')) {
        state.player2.x = Math.max(CANVAS_WIDTH / 2, state.player2.x - MOVEMENT_SPEED);
      }
      if (keysPressed.current.has('arrowright')) {
        state.player2.x = Math.min(CANVAS_WIDTH - state.player2.width, state.player2.x + MOVEMENT_SPEED);
      }

      // Apply gravity
      state.player1.speedY += GRAVITY;
      state.player2.speedY += GRAVITY;
      state.ball.speedY += GRAVITY;

      // Update positions
      state.player1.y += state.player1.speedY;
      state.player2.y += state.player2.speedY;
      state.ball.x += state.ball.speedX;
      state.ball.y += state.ball.speedY;

      // Ground collision
      if (state.player1.y > GROUND_Y) {
        state.player1.y = GROUND_Y;
        state.player1.speedY = 0;
      }
      if (state.player2.y > GROUND_Y) {
        state.player2.y = GROUND_Y;
        state.player2.speedY = 0;
      }
      if (state.ball.y > GROUND_Y + 20) {
        state.ball.y = GROUND_Y + 20;
        state.ball.speedY = -state.ball.speedY * BALL_DAMPENING;
        state.ball.speedX *= BALL_DAMPENING; // Reduce horizontal speed on ground hit
      }

      // Ball collision with walls
      if (state.ball.x < 0 || state.ball.x > CANVAS_WIDTH - state.ball.width) {
        state.ball.speedX = -state.ball.speedX * BALL_DAMPENING;
        state.ball.x = Math.max(0, Math.min(CANVAS_WIDTH - state.ball.width, state.ball.x));
      }

      // Ball collision with players
      if (checkCollision(state.ball, state.player1)) {
        const angle = calculateBallDirection(state.player1.x, state.player1.width, state.ball.x);
        state.ball.speedX = BALL_SPEED * Math.cos(angle);
        state.ball.speedY = -BALL_SPEED * Math.abs(Math.sin(angle));
        state.ball.x = state.player1.x + state.player1.width;
      } else if (checkCollision(state.ball, state.player2)) {
        const angle = calculateBallDirection(state.player2.x, state.player2.width, state.ball.x);
        state.ball.speedX = -BALL_SPEED * Math.cos(angle);
        state.ball.speedY = -BALL_SPEED * Math.abs(Math.sin(angle));
        state.ball.x = state.player2.x - state.ball.width;
      }

      // Check for goals
      if (checkCollision(state.ball, state.goals.left)) {
        setScore(prev => ({ ...prev, player2: prev.player2 + 1 }));
        resetBall();
      } else if (checkCollision(state.ball, state.goals.right)) {
        setScore(prev => ({ ...prev, player1: prev.player1 + 1 }));
        resetBall();
      }

      // Draw
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      drawGround(ctx, CANVAS_WIDTH);
      drawCenterLine(ctx, CANVAS_WIDTH);

      // Draw goals
      drawGoal(ctx, state.goals.left.x, state.goals.left.y, state.goals.left.width, state.goals.left.height);
      drawGoal(ctx, state.goals.right.x, state.goals.right.y, state.goals.right.width, state.goals.right.height);

      // Draw players using images
      if (player1ImageRef.current) {
        ctx.drawImage(player1ImageRef.current, state.player1.x, state.player1.y, state.player1.width, state.player1.height);
      }
      if (player2ImageRef.current) {
        ctx.drawImage(player2ImageRef.current, state.player2.x, state.player2.y, state.player2.width, state.player2.height);
      }

      drawBall(ctx, state.ball.x, state.ball.y, state.ball.width);

      animationFrameId = requestAnimationFrame(update);
    };

    const resetBall = () => {
      gameStateRef.current.ball = {
        x: CANVAS_WIDTH / 2 - 15,
        y: 200,
        width: 30,
        height: 30,
        speedX: 0,
        speedY: 0,
      };
    };

    if (gameStarted) {
      animationFrameId = requestAnimationFrame(update);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameStarted]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <ScoreBoard score={score} />
      
      {!gameStarted ? (
        <GameInstructions onStartGame={() => setGameStarted(true)} />
      ) : (
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="bg-gray-800 rounded-lg shadow-lg"
        />
      )}
    </div>
  );
}