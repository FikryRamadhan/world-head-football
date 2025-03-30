// Interface yang merepresentasikan objek dalam permainan (pemain, bola, dan gawang)
export interface GameObject {
  x: number; // Posisi X objek di kanvas
  y: number; // Posisi Y objek di kanvas
  width: number; // Lebar objek
  height: number; // Tinggi objek
  speedY?: number; // Kecepatan vertikal objek (opsional, digunakan untuk pemain dan bola)
  speedX?: number; // Kecepatan horizontal objek (opsional, digunakan untuk bola)
}

// Interface yang mendefinisikan keadaan permainan
export interface GameState {
  player1: GameObject; // Status pemain 1
  player2: GameObject; // Status pemain 2
  ball: GameObject; // Status bola
}

// Interface untuk menyimpan skor pemain
export interface Score {
  player1: number; // Skor pemain 1
  player2: number; // Skor pemain 2
}
