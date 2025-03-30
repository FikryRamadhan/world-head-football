// Konstanta untuk pengaturan fisika permainan
export const GRAVITY = 0.5; // Gaya gravitasi yang diterapkan pada objek dalam permainan
export const JUMP_FORCE = -12; // Kekuatan lompatan pemain (negatif karena koordinat Y berkurang ke atas)
export const BALL_SPEED = 8; // Kecepatan awal bola saat terkena pemain
export const MOVEMENT_SPEED = 5; // Kecepatan gerak pemain ke kiri dan kanan
export const BALL_DAMPENING = 0.8; // Koefisien redaman bola untuk mengurangi kecepatan setelah memantul

// Konstanta untuk pengaturan ukuran dan batas arena permainan
export const CANVAS_WIDTH = 800; // Lebar arena permainan
export const CANVAS_HEIGHT = 400; // Tinggi arena permainan
export const GROUND_Y = 350; // Posisi Y tanah di mana pemain dan bola akan berhenti jatuh

// Konstanta untuk pengaturan ukuran gawang
export const GOAL_WIDTH = 20; // Lebar gawang
export const GOAL_HEIGHT = 100; // Tinggi gawang

// Objek yang mendefinisikan status awal permainan
export const INITIAL_GAME_STATE = {
  player1: {
    x: 100, // Posisi awal X pemain 1
    y: GROUND_Y, // Posisi awal Y pemain 1
    width: 50, // Lebar pemain 1
    height: 50, // Tinggi pemain 1
    speedY: 0 // Kecepatan awal vertikal pemain 1 (diam)
  },
  player2: {
    x: 650, // Posisi awal X pemain 2
    y: GROUND_Y, // Posisi awal Y pemain 2
    width: 50, // Lebar pemain 2
    height: 50, // Tinggi pemain 2
    speedY: 0 // Kecepatan awal vertikal pemain 2 (diam)
  },
  ball: {
    x: CANVAS_WIDTH / 2 - 15, // Posisi awal X bola (tengah lapangan)
    y: 200, // Posisi awal Y bola (di udara)
    width: 30, // Lebar bola
    height: 30, // Tinggi bola
    speedX: 0, // Kecepatan awal bola secara horizontal (diam)
    speedY: 0 // Kecepatan awal bola secara vertikal (diam)
  },
  goals: {
    left: {
      x: 0, // Posisi X gawang kiri (ujung kiri lapangan)
      y: GROUND_Y - GOAL_HEIGHT, // Posisi Y gawang kiri (menyesuaikan tinggi tanah)
      width: GOAL_WIDTH, // Lebar gawang kiri
      height: GOAL_HEIGHT // Tinggi gawang kiri
    },
    right: {
      x: CANVAS_WIDTH - GOAL_WIDTH, // Posisi X gawang kanan (ujung kanan lapangan)
      y: GROUND_Y - GOAL_HEIGHT, // Posisi Y gawang kanan (menyesuaikan tinggi tanah)
      width: GOAL_WIDTH, // Lebar gawang kanan
      height: GOAL_HEIGHT // Tinggi gawang kanan
    }
  }
};
