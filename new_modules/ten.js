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
  const minBroken = rand(1, Math.floor(per * 0.3));
  const maxBroken = rand(minBroken + 1, Math.floor(per * 0.7));

  return {
    boxes: per,
    size: [30, 30],
    broken: [minBroken, maxBroken]
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
// generate boxes (single shape)
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
// ✅ COUNT BROKEN CIRCLE + TRIANGLE BOXES
// ----------------------------------------------
export function countBrokenCirclesAndTriangles(boxes) {
  const brokenCircles = boxes.filter(
    b => !b.complete && b.shape === "circle"
  ).length;

  const brokenTriangles = boxes.filter(
    b => !b.complete && b.shape === "triangle"
  ).length;

  return brokenCircles + brokenTriangles;
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
  const gapSize = broken ? Math.floor(size * 0.12) : 0;
  const gapPos = broken ? rand(6, size - gapSize - 6) : 0;

  ctx.lineWidth = 2;

  const edges = [
    () => { ctx.moveTo(x, y); ctx.lineTo(x + size, y); },
    () => { ctx.moveTo(x + size, y); ctx.lineTo(x + size, y + size); },
    () => { ctx.moveTo(x, y + size); ctx.lineTo(x + size, y + size); },
    () => { ctx.moveTo(x, y); ctx.lineTo(x, y + size); }
  ];

  edges.forEach((draw, i) => {
    ctx.beginPath();
    if (i === gapEdge) {
      if (i % 2 === 0) {
        const yy = y + (i === 2 ? size : 0);
        ctx.moveTo(x, yy);
        ctx.lineTo(x + gapPos, yy);
        ctx.moveTo(x + gapPos + gapSize, yy);
        ctx.lineTo(x + size, yy);
      } else {
        const xx = x + (i === 1 ? size : 0);
        ctx.moveTo(xx, y);
        ctx.lineTo(xx, y + gapPos);
        ctx.moveTo(xx, y + gapPos + gapSize);
        ctx.lineTo(xx, y + size);
      }
    } else {
      draw();
    }
    ctx.stroke();
  });
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
export function generatePuzzle_broken_ten(per) {
  const difficulty = getDifficultiesByPer(per);
  const boxes = generateBoxesData(difficulty);

  const correct = countBrokenCirclesAndTriangles(boxes);

  return {
    question:
      "How many broken boxes contain circles and triangles?",
    image: drawImage(boxes).toString("base64"),
    correct,
    options: generateOptions(correct)
  };
}
