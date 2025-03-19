import React from "react";

interface ScoreboardProps {
  score: { player1: number; player2: number };
}

const Scoreboard: React.FC<ScoreboardProps> = ({ score }) => {
  return (
    <div className="scoreboard">
      <h2>Score</h2>
      <p>Player 1: {score.player1} - Player 2: {score.player2}</p>
    </div>
  );
};

export default Scoreboard;
