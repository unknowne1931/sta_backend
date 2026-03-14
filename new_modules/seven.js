import { createCanvas } from "canvas";

// ----------------------------------------------
// constants
// ----------------------------------------------
const WIDTH = 400;
const HEIGHT = 250;

const SHAPES = ["circle", "star", "triangle"];

const COLORS = [
  "#e74c3c", "#3498db", "#2ecc71",
  "#f1c40f", "#9b59b6", "#e67e22",
  "#1abc9c", "#34495e"
];

const rand = (a, b) =>
  Math.floor(Math.random() * (b - a + 1)) + a;

const randomColor = () => COLORS[rand(0, COLORS.length - 1)];

// ----------------------------------------------
// difficulty
// ----------------------------------------------
export function getDifficultiesByPer(per) {
  const boxCount = per;

  const minBroken = rand(1, Math.floor(boxCount * 0.3));
  const maxBroken = rand(minBroken + 1, Math.floor(boxCount * 0.7));

  return {
    boxes: boxCount,
    size: [25, 25],
    broken: [30, 45]
  };
}

// ----------------------------------------------
// overlap check
// ----------------------------------------------
function overlap(a, b) {
  return !(
    a.x + a.w < b.x ||
    a.x > b.x + b.w ||
    a.y + a.h < b.y ||
    a.y > b.y + b.h
  );
}

// ----------------------------------------------
// options generator
// ----------------------------------------------
export function generateOptions(correct) {
  const set = new Set([correct]);
  let i = 1;

  while (set.size < 4) {
    set.add(correct + i);
    if (correct - i >= 0) set.add(correct - i);
    i++;
  }

  return [...set].sort(() => Math.random() - 0.5);
}

// ----------------------------------------------
// generate boxes
// ----------------------------------------------
export function generateBoxesData(difficulty) {
  const boxes = [];
  let tries = 0;

  while (boxes.length < difficulty.boxes && tries < 5000) {
    const size = rand(...difficulty.size);
    const x = rand(4, WIDTH - size - 4);
    const y = rand(4, HEIGHT - size - 4);

    const test = { x, y, w: size, h: size };

    if (!boxes.some(b => overlap(test, b))) {
      boxes.push({
        ...test,
        shape: SHAPES[rand(0, SHAPES.length - 1)],
        color: randomColor(),
        complete: true
      });
    }
    tries++;
  }

  // mark broken boxes
  const brokenCount = rand(...difficulty.broken);
  const shuffled = [...boxes].sort(() => Math.random() - 0.5);

  shuffled.slice(0, brokenCount).forEach(b => {
    b.complete = false;
  });

  return boxes;
}

// ----------------------------------------------
// COUNT ONLY UNBROKEN CIRCLE BOXES ⚪
// ----------------------------------------------
export function countUnbrokenCircles(boxes) {
  return boxes.filter(
    b => b.complete && b.shape === "circle"
  ).length;
}

// ----------------------------------------------
// drawing helpers
// ----------------------------------------------
function drawStar(ctx, x, y, size) {
  const spikes = 5;
  const outer = size / 2;
  const inner = outer / 2.5;
  let rot = Math.PI / 2 * 3;
  const step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(x, y - outer);

  for (let i = 0; i < spikes; i++) {
    ctx.lineTo(x + Math.cos(rot) * outer, y + Math.sin(rot) * outer);
    rot += step;
    ctx.lineTo(x + Math.cos(rot) * inner, y + Math.sin(rot) * inner);
    rot += step;
  }

  ctx.closePath();
  ctx.stroke();
}

function drawBoxBorderWithGap(ctx, x, y, size, broken) {
  const gapEdge = broken ? rand(0, 3) : -1;
  const gapSize = broken ? Math.floor(size * 0.1) : 0;
  const gapPos = broken ? rand(5, size - gapSize - 5) : 0;

  ctx.lineWidth = 2;

  // top
  ctx.beginPath();
  if (gapEdge === 0) {
    ctx.moveTo(x, y);
    ctx.lineTo(x + gapPos, y);
    ctx.moveTo(x + gapPos + gapSize, y);
    ctx.lineTo(x + size, y);
  } else ctx.strokeRect(x, y, size, 0);
  ctx.stroke();

  // right
  ctx.beginPath();
  if (gapEdge === 1) {
    ctx.moveTo(x + size, y);
    ctx.lineTo(x + size, y + gapPos);
    ctx.moveTo(x + size, y + gapPos + gapSize);
    ctx.lineTo(x + size, y + size);
  } else ctx.strokeRect(x + size, y, 0, size);
  ctx.stroke();

  // bottom
  ctx.beginPath();
  if (gapEdge === 2) {
    ctx.moveTo(x, y + size);
    ctx.lineTo(x + gapPos, y + size);
    ctx.moveTo(x + gapPos + gapSize, y + size);
    ctx.lineTo(x + size, y + size);
  } else ctx.strokeRect(x, y + size, size, 0);
  ctx.stroke();

  // left
  ctx.beginPath();
  if (gapEdge === 3) {
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + gapPos);
    ctx.moveTo(x, y + gapPos + gapSize);
    ctx.lineTo(x, y + size);
  } else ctx.strokeRect(x, y, 0, size);
  ctx.stroke();
}

// ----------------------------------------------
// draw image
// ----------------------------------------------
export function drawImage(boxes) {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  boxes.forEach(b => {
    ctx.strokeStyle = b.complete ? b.color : "#555";
    drawBoxBorderWithGap(ctx, b.x, b.y, b.w, !b.complete);

    if (b.shape === "circle") {
      ctx.beginPath();
      ctx.arc(
        b.x + b.w / 2,
        b.y + b.h / 2,
        b.w * 0.25,
        0,
        Math.PI * 2
      );
      ctx.stroke();
    }

    if (b.shape === "triangle") {
      ctx.beginPath();
      ctx.moveTo(b.x + b.w / 2, b.y + b.h * 0.25);
      ctx.lineTo(b.x + b.w * 0.75, b.y + b.h * 0.75);
      ctx.lineTo(b.x + b.w * 0.25, b.y + b.h * 0.75);
      ctx.closePath();
      ctx.stroke();
    }

    if (b.shape === "star") {
      drawStar(
        ctx,
        b.x + b.w / 2,
        b.y + b.h / 2,
        b.w * 0.7
      );
    }
  });

  return canvas.toBuffer("image/png");
}

// ----------------------------------------------
// FINAL PUZZLE GENERATOR
// ----------------------------------------------
export function generatePuzzle_seven(per) {
  const difficulty = getDifficultiesByPer(per);
  const boxes = generateBoxesData(difficulty);

  const correct = countUnbrokenCircles(boxes);
  const options = generateOptions(correct);
  const image = drawImage(boxes);

  return {
    image: image.toString("base64"),
    correct,
    options
  };
}
