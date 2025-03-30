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
  // Referensi untuk elemen canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // State untuk menyimpan skor
  const [score, setScore] = useState<Score>({ player1: 0, player2: 0 });
  // State untuk menentukan apakah game sudah dimulai
  const [gameStarted, setGameStarted] = useState(false);
  // Referensi untuk menyimpan gambar pemain
  const player1ImageRef = useRef<HTMLImageElement | null>(null);
  const player2ImageRef = useRef<HTMLImageElement | null>(null);
  // Referensi untuk menyimpan state permainan
  const gameStateRef = useRef<GameState>(INITIAL_GAME_STATE);
  // Menyimpan tombol yang sedang ditekan
  const keysPressed = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Memuat gambar pemain
    player1ImageRef.current = new Image();
    player1ImageRef.current.src = '/images/player1.png';
    
    player2ImageRef.current = new Image();
    player2ImageRef.current.src = '/images/player2.png';

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Event listener untuk mendeteksi input keyboard
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key.toLowerCase());
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key.toLowerCase());
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let animationFrameId: number;

    // Fungsi untuk menghitung arah bola berdasarkan titik tumbukan
    const calculateBallDirection = (playerX: number, playerWidth: number, ballX: number) => {
      const hitPosition = (ballX - playerX) / playerWidth;
      return (hitPosition - 0.5) * Math.PI / 2;
    };

    const update = () => {
      const state = gameStateRef.current;

      // Kontrol pemain 1 (WASD)
      if (keysPressed.current.has('w') && state.player1.y >= GROUND_Y) {
        state.player1.speedY = JUMP_FORCE;
      }
      if (keysPressed.current.has('a')) {
        state.player1.x = Math.max(0, state.player1.x - MOVEMENT_SPEED);
      }
      if (keysPressed.current.has('d')) {
        state.player1.x = Math.min(CANVAS_WIDTH / 2 - state.player1.width, state.player1.x + MOVEMENT_SPEED);
      }

      // Kontrol pemain 2 (Arrow keys)
      if (keysPressed.current.has('arrowup') && state.player2.y >= GROUND_Y) {
        state.player2.speedY = JUMP_FORCE;
      }
      if (keysPressed.current.has('arrowleft')) {
        state.player2.x = Math.max(CANVAS_WIDTH / 2, state.player2.x - MOVEMENT_SPEED);
      }
      if (keysPressed.current.has('arrowright')) {
        state.player2.x = Math.min(CANVAS_WIDTH - state.player2.width, state.player2.x + MOVEMENT_SPEED);
      }

      // Menambahkan efek gravitasi
      state.player1.speedY += GRAVITY;
      state.player2.speedY += GRAVITY;
      state.ball.speedY += GRAVITY;

      // Memperbarui posisi pemain dan bola
      state.player1.y += state.player1.speedY;
      state.player2.y += state.player2.speedY;
      state.ball.x += state.ball.speedX;
      state.ball.y += state.ball.speedY;

      // Deteksi tabrakan dengan tanah
      if (state.player1.y > GROUND_Y) {
        state.player1.y = GROUND_Y;
        state.player1.speedY = 0;
      }
      if (state.player2.y > GROUND_Y) {
        state.player2.y = GROUND_Y;
        state.player2.speedY = 0;
      }

      // Deteksi tabrakan bola dengan dinding
      if (state.ball.x < 0 || state.ball.x > CANVAS_WIDTH - state.ball.width) {
        state.ball.speedX = -state.ball.speedX * BALL_DAMPENING;
        state.ball.x = Math.max(0, Math.min(CANVAS_WIDTH - state.ball.width, state.ball.x));
      }

      // Deteksi tabrakan bola dengan pemain
      if (checkCollision(state.ball, state.player1)) {
        const angle = calculateBallDirection(state.player1.x, state.player1.width, state.ball.x);
        state.ball.speedX = BALL_SPEED * Math.cos(angle);
        state.ball.speedY = -BALL_SPEED * Math.abs(Math.sin(angle));
      } else if (checkCollision(state.ball, state.player2)) {
        const angle = calculateBallDirection(state.player2.x, state.player2.width, state.ball.x);
        state.ball.speedX = -BALL_SPEED * Math.cos(angle);
        state.ball.speedY = -BALL_SPEED * Math.abs(Math.sin(angle));
      }

      // Mengecek apakah ada gol
      if (checkCollision(state.ball, state.goals.left)) {
        setScore(prev => ({ ...prev, player2: prev.player2 + 1 }));
        resetBall();
      } else if (checkCollision(state.ball, state.goals.right)) {
        setScore(prev => ({ ...prev, player1: prev.player1 + 1 }));
        resetBall();
      }

      // Menggambar ulang permainan
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      drawGround(ctx, CANVAS_WIDTH);
      drawCenterLine(ctx, CANVAS_WIDTH);
      drawGoal(ctx, state.goals.left.x, state.goals.left.y, state.goals.left.width, state.goals.left.height);
      drawGoal(ctx, state.goals.right.x, state.goals.right.y, state.goals.right.width, state.goals.right.height);
      drawBall(ctx, state.ball.x, state.ball.y, state.ball.width);

      animationFrameId = requestAnimationFrame(update);
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
        <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} className="bg-gray-800 rounded-lg shadow-lg" />
      )}
    </div>
  );
}
