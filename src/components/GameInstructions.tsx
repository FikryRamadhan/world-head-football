import React from 'react';

interface GameInstructionsProps {
  onStartGame: () => void;
}

export default function GameInstructions({ onStartGame }: GameInstructionsProps) {
  return (
    <div className="text-center mb-4">
      <h1 className="text-4xl font-bold text-white mb-4">Head Football</h1>
      <p className="text-gray-300 mb-4">
        Player 1 Controls:<br />
        - 'W' to jump<br />
        - 'A' to move left<br />
        - 'D' to move right<br />
        <br />
        Player 2 Controls:<br />
        - '↑' to jump<br />
        - '←' to move left<br />
        - '→' to move right
      </p>
      <button
        onClick={onStartGame}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Start Game
      </button>
    </div>
  );
}