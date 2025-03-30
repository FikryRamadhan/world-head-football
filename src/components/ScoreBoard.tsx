import React from 'react';
import { Trophy } from 'lucide-react'; // Mengimpor ikon Trophy dari lucide-react
import { Score } from '../types/game'; // Mengimpor tipe data Score dari folder types/game

// Mendefinisikan tipe props untuk komponen ScoreBoard
interface ScoreBoardProps {
  score: Score; // Properti score yang berisi skor Player 1 dan Player 2
}

// Komponen ScoreBoard yang menampilkan skor kedua pemain
export default function ScoreBoard({ score }: ScoreBoardProps) {
  return (
    <div className="mb-4 flex items-center gap-8">
      {/* Menampilkan skor Player 1 dengan warna biru */}
      <div className="text-blue-500 text-2xl font-bold">Player 1: {score.player1}</div>
      
      {/* Ikon piala di tengah scoreboard */}
      <Trophy className="w-8 h-8 text-yellow-400" />
      
      {/* Menampilkan skor Player 2 dengan warna merah */}
      <div className="text-red-500 text-2xl font-bold">Player 2: {score.player2}</div>
    </div>
  );
}
