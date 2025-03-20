import React from 'react';
import { Trophy } from 'lucide-react';
import { Score } from '../types/game';

interface ScoreBoardProps {
  score: Score;
}

export default function ScoreBoard({ score }: ScoreBoardProps) {
  return (
    <div className="mb-4 flex items-center gap-8">
      <div className="text-blue-500 text-2xl font-bold">Player 1: {score.player1}</div>
      <Trophy className="w-8 h-8 text-yellow-400" />
      <div className="text-red-500 text-2xl font-bold">Player 2: {score.player2}</div>
    </div>
  );
}