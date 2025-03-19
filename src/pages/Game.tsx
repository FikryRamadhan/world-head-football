import React from "react";

import { useGameLogic } from "../hooks/useGameLogic";
import Scoreboard from "../component/ScoreBoard";
import Player from "../component/Player";
import Ball from "../component/Ball";
import "../App.css"
const Game: React.FC = () => {
  const { player1Pos, player2Pos, ballPos, score } = useGameLogic();

  return (
    <div className="game-container">
      <Scoreboard score={score} />
      <Player position={player1Pos} name="player1" />
      <Ball position={ballPos} />
      <Player position={player2Pos} name="player2" />
    </div>
  );
};

export default Game;
