import React from "react";

interface PlayerProps {
  position: { x: number; y: number };
  name: string;
}

const Player: React.FC<PlayerProps> = ({ position, name }) => {
  return (
    <div
      className="player"
      style={{ left: position.x, top: position.y }}
    >
      <img src={`/images/${name}.png`} alt={name} width="50" />
    </div>
  );
};

export default Player;
