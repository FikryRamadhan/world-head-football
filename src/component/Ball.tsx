import React from "react";

interface BallProps {
  position: { x: number; y: number };
}

const Ball: React.FC<BallProps> = ({ position }) => {
  return (
    <div
      className="ball"
      style={{ left: position.x, top: position.y }}
    >
      <img src="/images/1.png" alt="Ball" width="30" />
    </div>
  );
};

export default Ball;
