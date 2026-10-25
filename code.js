const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

const TOTAL = 6000;   
let pts = [];         
let drawn = 0;        
let ox, oy;           
let running = false;

function layout() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const s = Math.min(innerWidth / 34, innerHeight / 32);
  ox = innerWidth / 2;
  oy = innerHeight / 2 - 2.5 * s;
  pts = [];
  for (let k = 0; k < TOTAL; k++) {
    const x = 15 * Math.pow(Math.sin(k), 3);
    const y = 12 * Math.cos(k) - 5 * Math.cos(2 * k) - 2 * Math.cos(3 * k) - Math.cos(4 * k);
    pts.push([ox + x * s, oy - y * s]);
  }
}

function drawRange(from, to) {
  ctx.strokeStyle = "#ff0000";
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i = from; i < to; i++) {
    ctx.moveTo(ox, oy);
    ctx.lineTo(pts[i][0], pts[i][1]);
  }
  ctx.stroke();
}

function clear() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, innerWidth, innerHeight);
}

function tick() {
  const batch = Math.max(1, Math.ceil(drawn / 40));
  const next = Math.min(TOTAL, drawn + batch);
  drawRange(drawn, next);
  drawn = next;
  if (drawn < TOTAL) requestAnimationFrame(tick);
  else running = false;
}

function start() {
  if (running) return;
  running = true;
  drawn = 0;
  clear();
  tick();
}

addEventListener("resize", () => {
  layout();
  clear();
  drawRange(0, drawn);
});
canvas.addEventListener("click", start);

layout();
start();