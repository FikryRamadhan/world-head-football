export const drawGround = (ctx: CanvasRenderingContext2D, width: number) => {
  ctx.fillStyle = '#4ade80';
  ctx.fillRect(0, 350, width, 50);
};

export const drawCenterLine = (ctx: CanvasRenderingContext2D, width: number) => {
  ctx.strokeStyle = '#ffffff';
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(width / 2, 0);
  ctx.lineTo(width / 2, 350);
  ctx.stroke();
  ctx.setLineDash([]);
};

export const drawBall = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number
) => {
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(x + width / 2, y + width / 2, width / 2, 0, Math.PI * 2);
  ctx.fill();

  // Add some details to make it look more like a soccer ball
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x + width / 2, y + width / 2, width / 2, 0, Math.PI * 2);
  ctx.stroke();

  // Add a simple pattern
  ctx.beginPath();
  ctx.moveTo(x + width / 2, y);
  ctx.lineTo(x + width / 2, y + width);
  ctx.moveTo(x, y + width / 2);
  ctx.lineTo(x + width, y + width / 2);
  ctx.stroke();
};

export const drawGoal = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) => {
  // Draw the goal post
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x, y, width, height);
  
  // Draw the net pattern
  ctx.strokeStyle = '#cccccc';
  ctx.lineWidth = 1;
  
  // Vertical lines
  for (let i = 0; i <= width; i += 5) {
    ctx.beginPath();
    ctx.moveTo(x + i, y);
    ctx.lineTo(x + i, y + height);
    ctx.stroke();
  }
  
  // Horizontal lines
  for (let i = 0; i <= height; i += 5) {
    ctx.beginPath();
    ctx.moveTo(x, y + i);
    ctx.lineTo(x + width, y + i);
    ctx.stroke();
  }
};