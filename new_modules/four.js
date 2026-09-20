import { createCanvas } from "canvas";

// ---------------- HELPERS ----------------
function rand(max) {
  return Math.floor(Math.random() * max);
}

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = rand(i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// ---------------- EDGE BUMP ----------------
function edgeBump(ctx, x1, y1, x2, y2, ox, oy, type, size) {
  if (type === 0) {
    ctx.lineTo(x2, y2);
    return;
  }
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  const amt = size * type;

  const q1x = x1 + ux * len * 0.35, q1y = y1 + uy * len * 0.35;
  const q2x = x1 + ux * len * 0.5 + ox * amt, q2y = y1 + uy * len * 0.5 + oy * amt;
  const q3x = x1 + ux * len * 0.65, q3y = y1 + uy * len * 0.65;

  const c1x = q1x + ox * amt * 1.4, c1y = q1y + oy * amt * 1.4;
  const c2x = q3x + ox * amt * 1.4, c2y = q3y + oy * amt * 1.4;

  ctx.lineTo(q1x, q1y);
  ctx.quadraticCurveTo(c1x, c1y, q2x, q2y);
  ctx.quadraticCurveTo(c2x, c2y, q3x, q3y);
  ctx.lineTo(x2, y2);
}

function piecePath(ctx, x, y, w, h, edges, size) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  edgeBump(ctx, x, y, x + w, y, 0, -1, edges.top, size);
  edgeBump(ctx, x + w, y, x + w, y + h, 1, 0, edges.right, size);
  edgeBump(ctx, x + w, y + h, x, y + h, 0, 1, edges.bottom, size);
  edgeBump(ctx, x, y + h, x, y, -1, 0, edges.left, size);
  ctx.closePath();
}

// ---------------- GRID GENERATION ----------------
function buildPieceGrid(rows, cols) {
  const horizontal = Array.from({ length: rows }, () => new Array(cols).fill(0));
  const vertical = Array.from({ length: rows }, () => new Array(cols).fill(0));

  for (let r = 1; r < rows; r++)
    for (let c = 0; c < cols; c++) horizontal[r][c] = Math.random() < 0.5 ? 1 : -1;
  for (let r = 0; r < rows; r++)
    for (let c = 1; c < cols; c++) vertical[r][c] = Math.random() < 0.5 ? 1 : -1;

  const grid = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      row.push({
        top:    r === 0      ? 0 : -horizontal[r][c],
        bottom: r === rows-1 ? 0 : horizontal[r+1][c],
        left:   c === 0      ? 0 : -vertical[r][c],
        right:  c === cols-1 ? 0 : vertical[r][c+1]
      });
    }
    grid.push(row);
  }
  return grid;
}

function countMaleConnectors(edges) {
  let n = 0;
  if (edges.top === 1) n++;
  if (edges.right === 1) n++;
  if (edges.bottom === 1) n++;
  if (edges.left === 1) n++;
  return n;
}

// ---------------- LUXURY PIECE TEXTURE ----------------
function generateLuxuryTexture(width, height, hue) {
  const cvs = createCanvas(Math.max(2, width), Math.max(2, height));
  const ctx = cvs.getContext("2d");
  const w = cvs.width, h = cvs.height;

  const h2 = (hue + 40 + rand(40)) % 360;
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0,    `hsl(${hue}, 65%, 82%)`);
  g.addColorStop(0.45, `hsl(${(hue + h2) / 2}, 70%, 74%)`);
  g.addColorStop(1,    `hsl(${h2}, 60%, 78%)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  const radial = ctx.createRadialGradient(
    w * (0.25 + Math.random() * 0.5), h * (0.25 + Math.random() * 0.5), 0,
    w * 0.5, h * 0.5, Math.max(w, h) * 0.8
  );
  radial.addColorStop(0, "rgba(255,255,255,0.55)");
  radial.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, w, h);

  ctx.globalAlpha = 0.05;
  for (let i = 0; i < w * h * 0.02; i++) {
    ctx.fillStyle = Math.random() < 0.5 ? "#000" : "#fff";
    ctx.fillRect(rand(w), rand(h), 1, 1);
  }
  ctx.globalAlpha = 1;

  return cvs;
}

// ---------------- OPTIONS GENERATION ----------------
function buildOptions(answer, maxPossible) {
  const optionSet = new Set([answer]);
  let attempts = 0;

  while (optionSet.size < 4 && attempts < 100) {
    attempts++;
    let offset;
    if (attempts < 20) offset = 1;
    else if (attempts < 40) offset = 2;
    else offset = Math.floor(Math.random() * 3) + 1;

    const sign = Math.random() < 0.5 ? -1 : 1;
    let val = answer + sign * offset;
    val = Math.max(0, Math.min(maxPossible, val));

    if (val !== answer && Math.abs(val - answer) <= 3) optionSet.add(val);
  }

  const fallback = [
    Math.max(0, answer - 1),
    Math.min(maxPossible, answer + 1),
    Math.max(0, answer - 2),
    Math.min(maxPossible, answer + 2)
  ];
  for (const v of fallback) {
    if (optionSet.size >= 4) break;
    if (v !== answer && !optionSet.has(v)) optionSet.add(v);
  }
  while (optionSet.size < 4) {
    const offset = Math.floor(Math.random() * 3) + 1;
    const v = Math.max(0, Math.min(maxPossible, answer + offset));
    if (v !== answer && !optionSet.has(v)) optionSet.add(v);
  }

  return shuffle(Array.from(optionSet)).map(String);
}

// ---------------- MAIN ----------------
export function generatePuzzle_maleConnectorCount(rows = 3, cols = 4) {
  const grid = buildPieceGrid(rows, cols);

  let answer = 0;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (countMaleConnectors(grid[r][c]) >= 2) answer++;

  // Build answer options
  const maxPossible = rows * cols;
  const options = buildOptions(answer, maxPossible);

  // ---- Layout: 4px padding only + watermark footer ----
  const padding = 4;
  const footerHeight = 22;
  const cellSize = 120;

  const boardW = cols * cellSize;
  const boardH = rows * cellSize;
  const W = boardW + padding * 2;
  const H = boardH + padding * 2 + footerHeight;

  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // ---- Background gradient ----
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0,   "#0f1729");
  bg.addColorStop(0.5, "#1a2a45");
  bg.addColorStop(1,   "#0b1320");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Accent glows
  const blob1 = ctx.createRadialGradient(W * 0.15, H * 0.15, 0, W * 0.15, H * 0.15, W * 0.6);
  blob1.addColorStop(0, "rgba(96,165,250,0.28)");
  blob1.addColorStop(1, "rgba(96,165,250,0)");
  ctx.fillStyle = blob1;
  ctx.fillRect(0, 0, W, H);

  const blob2 = ctx.createRadialGradient(W * 0.85, H * 0.85, 0, W * 0.85, H * 0.85, W * 0.6);
  blob2.addColorStop(0, "rgba(167,139,250,0.22)");
  blob2.addColorStop(1, "rgba(167,139,250,0)");
  ctx.fillStyle = blob2;
  ctx.fillRect(0, 0, W, H);

  // ---- Board ----
  const boardX = padding;
  const boardY = padding;
  const cellW = boardW / cols;
  const cellH = boardH / rows;

  const baseHue = rand(360);
  const textures = [];
  for (let i = 0; i < rows * cols; i++) {
    const hue = (baseHue + i * (300 / (rows * cols))) % 360;
    textures.push(generateLuxuryTexture(Math.ceil(cellW), Math.ceil(cellH), hue));
  }

  const bumpSize = Math.min(cellW, cellH) * 0.22;
  const borderW = Math.max(1.8, Math.min(2.4, 30 / Math.max(rows, cols)));

  // Pass 1: shadows
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = boardX + c * cellW;
      const y = boardY + r * cellH;
      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,0.45)";
      ctx.shadowBlur = 14;
      ctx.shadowOffsetY = 6;
      piecePath(ctx, x, y, cellW, cellH, grid[r][c], bumpSize);
      ctx.fillStyle = "#000";
      ctx.fill();
      ctx.restore();
    }
  }

  // Pass 2: textures
  let idx = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = boardX + c * cellW;
      const y = boardY + r * cellH;
      const edges = grid[r][c];

      ctx.save();
      piecePath(ctx, x, y, cellW, cellH, edges, bumpSize);
      ctx.clip();
      ctx.drawImage(textures[idx % textures.length], x, y, cellW, cellH);

      const gloss = ctx.createLinearGradient(x, y, x, y + cellH * 0.6);
      gloss.addColorStop(0, "rgba(255,255,255,0.45)");
      gloss.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = gloss;
      ctx.fillRect(x, y, cellW, cellH);
      ctx.restore();
      idx++;
    }
  }

  // Pass 3: borders
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = boardX + c * cellW;
      const y = boardY + r * cellH;
      const edges = grid[r][c];

      ctx.save();
      piecePath(ctx, x, y, cellW, cellH, edges, bumpSize);
      ctx.lineWidth = borderW + 2;
      ctx.strokeStyle = "rgba(255,255,255,0.55)";
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.stroke();
      ctx.restore();

      ctx.save();
      piecePath(ctx, x, y, cellW, cellH, edges, bumpSize);
      ctx.lineWidth = borderW;
      ctx.strokeStyle = "#0f172a";
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.stroke();
      ctx.restore();
    }
  }

  // ---------------- WATERMARK ----------------
  ctx.save();
  ctx.font = "bold 12px 'Segoe UI', Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const wmY = H - footerHeight / 2;

  ctx.shadowColor = "rgba(96,165,250,0.6)";
  ctx.shadowBlur = 10;
  ctx.fillStyle = "rgba(226, 232, 240, 0.85)";
  ctx.fillText("Powered by AVI", W / 2, wmY);

  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(241, 245, 249, 0.95)";
  ctx.fillText("Powered by AVI", W / 2, wmY);
  ctx.restore();

  return {
    question: "How many puzzle pieces contain 2 or more MALE connectors (outward tabs)?",
    options,
    answer: String(answer),
    image: canvas.toDataURL("image/png").split(",")[1]
  };
}

// ---------------- USAGE ----------------
// import fs from "fs";
// const { question, options, answer, image } = generatePuzzle_maleConnectorCount(3, 4);
// console.log(question);
// console.log("Options:", options);
// console.log("Answer:", answer);
// fs.writeFileSync("puzzle.png", Buffer.from(image, "base64"));