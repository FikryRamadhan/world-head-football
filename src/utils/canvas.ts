// Menggambar tanah (ground) permainan di bagian bawah kanvas
export const drawGround = (ctx: CanvasRenderingContext2D, width: number) => {
  ctx.fillStyle = '#4ade80'; // Warna hijau untuk tanah
  ctx.fillRect(0, 350, width, 50); // Mengisi area tanah dengan lebar sesuai ukuran kanvas
};

// Menggambar garis tengah sebagai pemisah area permainan
export const drawCenterLine = (ctx: CanvasRenderingContext2D, width: number) => {
  ctx.strokeStyle = '#ffffff'; // Warna putih untuk garis tengah
  ctx.setLineDash([5, 5]); // Membuat garis putus-putus
  ctx.beginPath();
  ctx.moveTo(width / 2, 0); // Memulai garis dari atas tengah
  ctx.lineTo(width / 2, 350); // Mengakhiri garis di bawah tengah
  ctx.stroke();
  ctx.setLineDash([]); // Mengembalikan garis ke mode normal (tidak putus-putus)
};

// Menggambar bola dalam permainan
export const drawBall = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number
) => {
  ctx.fillStyle = '#ffffff'; // Warna putih untuk bola
  ctx.beginPath();
  ctx.arc(x + width / 2, y + width / 2, width / 2, 0, Math.PI * 2); // Menggambar lingkaran
  ctx.fill();

  // Tambahkan detail agar bola lebih menyerupai bola sepak
  ctx.strokeStyle = '#000000'; // Warna hitam untuk garis luar bola
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x + width / 2, y + width / 2, width / 2, 0, Math.PI * 2);
  ctx.stroke();

  // Tambahkan pola sederhana berupa garis silang pada bola
  ctx.beginPath();
  ctx.moveTo(x + width / 2, y);
  ctx.lineTo(x + width / 2, y + width);
  ctx.moveTo(x, y + width / 2);
  ctx.lineTo(x + width, y + width / 2);
  ctx.stroke();
};

// Menggambar gawang di posisi yang ditentukan
export const drawGoal = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) => {
  // Menggambar tiang gawang
  ctx.fillStyle = '#ffffff'; // Warna putih untuk gawang
  ctx.fillRect(x, y, width, height); 
  
  // Menambahkan pola jaring gawang
  ctx.strokeStyle = '#cccccc'; // Warna abu-abu muda untuk jaring
  ctx.lineWidth = 1;
  
  // Garis vertikal jaring gawang
  for (let i = 0; i <= width; i += 5) {
    ctx.beginPath();
    ctx.moveTo(x + i, y);
    ctx.lineTo(x + i, y + height);
    ctx.stroke();
  }
  
  // Garis horizontal jaring gawang
  for (let i = 0; i <= height; i += 5) {
    ctx.beginPath();
    ctx.moveTo(x, y + i);
    ctx.lineTo(x + width, y + i);
    ctx.stroke();
  }
};
