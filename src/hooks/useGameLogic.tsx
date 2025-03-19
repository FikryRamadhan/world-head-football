import { useState, useEffect } from "react";

export const useGameLogic = () => {
  const fieldWidth = 400;
  const fieldHeight = 250;
  const goalWidth = 80; // Lebar gawang
  const goalY = 50; // Ketinggian gawang dari atas lapangan

  const [player1Pos, setPlayer1Pos] = useState({ x: 50, y: 200 });
  const [player2Pos, setPlayer2Pos] = useState({ x: 350, y: 200 });
  const [ballPos, setBallPos] = useState({ x: 200, y: 150 });
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [ballHolder, setBallHolder] = useState<"player1" | "player2" | null>(null);

  // Mengecek apakah pemain menyentuh bola
  const isTouchingBall = (playerX: number, playerY: number) => {
    const distance = Math.sqrt((playerX - ballPos.x) ** 2 + (playerY - ballPos.y) ** 2);
    return distance < 30; // Jika jarak < 30px, dianggap menyentuh bola
  };

  const movePlayer = (player: "player1" | "player2", direction: string) => {
    setPlayer1Pos((prev) => {
      if (player === "player1") {
        const newX = direction === "left" ? prev.x - 10 : prev.x + 10;
        const newY = prev.y;
        if (newX >= 0 && newX <= fieldWidth) {
          if (isTouchingBall(newX, newY)) setBallHolder("player1"); // Jika menyentuh bola, pegang bola
          return { x: newX, y: newY };
        }
      }
      return prev;
    });

    setPlayer2Pos((prev) => {
      if (player === "player2") {
        const newX = direction === "left" ? prev.x - 10 : prev.x + 10;
        const newY = prev.y;
        if (newX >= 0 && newX <= fieldWidth) {
          if (isTouchingBall(newX, newY)) setBallHolder("player2"); // Jika menyentuh bola, pegang bola
          return { x: newX, y: newY };
        }
      }
      return prev;
    });
  };

  const moveBall = (direction: string) => {
    if (ballHolder) {
      setBallPos((prev) => {
        const newX = direction === "left" ? prev.x - 10 : prev.x + 10;
        return { x: newX, y: prev.y };
      });
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "A") movePlayer("player1", "left");
      if (e.key === "D") movePlayer("player1", "right");
      if (e.key === "ArrowLeft") movePlayer("player2", "left");
      if (e.key === "ArrowRight") movePlayer("player2", "right");

      if (e.key === "W" || e.key === "S") moveBall("left"); // Player 1 menendang bola
      if (e.key === "ArrowUp" || e.key === "ArrowDown") moveBall("right"); // Player 2 menendang bola
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [ballHolder]);

  // Cek apakah bola masuk ke gawang
  useEffect(() => {
    if (ballPos.x <= 0 && ballPos.y >= goalY && ballPos.y <= goalY + goalWidth) {
      setScore((prev) => ({ ...prev, player2: prev.player2 + 1 })); // Player 2 dapat skor
      resetBall();
    }
    if (ballPos.x >= fieldWidth && ballPos.y >= goalY && ballPos.y <= goalY + goalWidth) {
      setScore((prev) => ({ ...prev, player1: prev.player1 + 1 })); // Player 1 dapat skor
      resetBall();
    }
  }, [ballPos]);

  const resetBall = () => {
    setBallPos({ x: 200, y: 150 });
    setBallHolder(null);
  };

  return { player1Pos, player2Pos, ballPos, score };
};
