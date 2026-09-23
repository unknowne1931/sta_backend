// boxDamagePuzzle.js
// Node.js version — premium UI, base64 image output
// Card panel border + corner accents REMOVED. Only broken rectangles remain.
// Run: node boxDamagePuzzle.js

import { createCanvas } from "canvas";

// -----------------------------------
// Helpers
// -----------------------------------

function shuffle(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function rand(min, max) {
  if (min > max) [min, max] = [max, min];
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// -----------------------------------
// Configuration (UNCHANGED)
// -----------------------------------

const QUESTION_RATIO_POOL = [
  { a: 3, b: 4 },
  { a: 2, b: 4 },
  { a: 2, b: 3 },
  { a: 1, b: 2 },
  { a: 3, b: 5 },
  { a: 1, b: 3 },
  { a: 2, b: 5 },
  { a: 1, b: 4 },
];

const ABSOLUTE_MAX_BREAK = 5;

const BOX_COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#FFD93D",
  "#6BCB77",
  "#A78BFA",
  "#F97316",
  "#38BDF8",
  "#EC4899",
  "#FACC15",
  "#34D399",
  "#FB7185",
  "#818CF8",
  "#FBBF24",
  "#2DD4BF",
  "#C084FC",
];

const MIN_PIECE_PX = 3;
const GAP_PX = 4;
const LINE_WIDTH = 4;
const CORNER_PX = 6;

const DEFAULT_WATERMARK_TEXT = "powered by AVI";
const DEFAULT_WATERMARK_COLOR = "rgba(226, 232, 240, 0.85)";
const WATERMARK_BAR_HEIGHT = 26;
const WATERMARK_RIGHT_PADDING = 14;

const NONE_CORRECT_PROBABILITY = 0.2;

const NUMERIC_OPTION_COUNT = 4;
const OPTION_RADIUS = 3;

// -----------------------------------
// Puzzle logic (UNCHANGED)
// -----------------------------------

function buildBreakCountPool(questionRatio) {
  const higher = Math.max(questionRatio.a, questionRatio.b);
  const maxAllowed = Math.min(higher + 2, ABSOLUTE_MAX_BREAK);
  const pool = [];
  for (let v = 1; v <= maxAllowed; v++) pool.push(v);
  return pool;
}

function pickQuestionRatio() {
  return QUESTION_RATIO_POOL[rand(0, QUESTION_RATIO_POOL.length - 1)];
}

function ratiosMatch(x, y) {
  return (x.a === y.a && x.b === y.b) || (x.a === y.b && x.b === y.a);
}

function boxMatchesRatio(sideCounts, questionRatio) {
  const { a, b } = questionRatio;
  if (a === b) return false;
  const hasA = sideCounts.some((c) => c === a);
  const hasB = sideCounts.some((c) => c === b);
  return hasA && hasB;
}

function computeBoxRatioLabel(sideCounts) {
  const [t, r, b, l] = sideCounts;
  const uniq = Array.from(new Set(sideCounts));

  if (uniq.length === 2) {
    const sorted = [...uniq].sort((p, q) => p - q);
    return `${sorted[0]}:${sorted[1]}`;
  }

  return `${t}·${r}·${b}·${l}`;
}

function generateBoxes(boxCount, questionRatio) {
  const totalBoxes = boxCount || rand(10, 18);
  const boxes = [];

  const breakPool = buildBreakCountPool(questionRatio);

  const minTargets = 2;
  const maxTargets = Math.max(minTargets, totalBoxes - 1);
  const targetCount = rand(minTargets, maxTargets);

  const allIndices = [];
  for (let i = 0; i < totalBoxes; i++) allIndices.push(i);
  shuffle(allIndices);
  const targetIndices = new Set(allIndices.slice(0, targetCount));

  const { a, b } = questionRatio;

  for (let i = 0; i < totalBoxes; i++) {
    let sideCounts;

    if (targetIndices.has(i)) {
      const positions = [0, 1, 2, 3];
      shuffle(positions);
      const posA = positions[0];
      const posB = positions[1];
      const posC = positions[2];
      const posD = positions[3];

      sideCounts = [0, 0, 0, 0];
      if (Math.random() < 0.5) {
        sideCounts[posA] = a;
        sideCounts[posB] = b;
      } else {
        sideCounts[posA] = b;
        sideCounts[posB] = a;
      }
      sideCounts[posC] = getRandom(breakPool);
      sideCounts[posD] = getRandom(breakPool);
    } else {
      let safety = 0;
      do {
        sideCounts = [
          getRandom(breakPool),
          getRandom(breakPool),
          getRandom(breakPool),
          getRandom(breakPool),
        ];
        safety++;
      } while (boxMatchesRatio(sideCounts, questionRatio) && safety < 100);

      if (boxMatchesRatio(sideCounts, questionRatio)) {
        const safeValues = breakPool.filter((v) => v !== a && v !== b);
        for (let s = 0; s < sideCounts.length; s++) {
          if (sideCounts[s] === a) {
            sideCounts[s] = safeValues.length > 0 ? getRandom(safeValues) : 1;
            break;
          }
        }
        if (boxMatchesRatio(sideCounts, questionRatio)) {
          for (let s = 0; s < sideCounts.length; s++) {
            if (sideCounts[s] === b) {
              sideCounts[s] = safeValues.length > 0 ? getRandom(safeValues) : 1;
              break;
            }
          }
        }
      }
    }

    const [topCount, rightCount, bottomCount, leftCount] = sideCounts;

    function makeGaps(count, edgeLenPx) {
      if (count === 0) return [];

      let gapPx = GAP_PX;
      const availableForGapsAndPieces = edgeLenPx - 2 * CORNER_PX;
      const neededForPieces = (count + 1) * MIN_PIECE_PX;

      while (
        count * gapPx + neededForPieces > availableForGapsAndPieces &&
        gapPx > MIN_PIECE_PX
      ) {
        gapPx -= 1;
      }

      const usable = Math.max(availableForGapsAndPieces - neededForPieces, 0);
      const actualGapPx = Math.min(
        gapPx,
        Math.floor(usable / Math.max(count, 1)) || MIN_PIECE_PX
      );

      const start = CORNER_PX;
      const end = edgeLenPx - CORNER_PX;
      const span = end - start;

      const positions = [];
      if (count === 1) {
        positions.push(start + span / 2);
      } else {
        for (let g = 0; g < count; g++) {
          const t = (g + 0.5) / count;
          let px = start + t * span;
          px = Math.max(
            start + actualGapPx / 2,
            Math.min(end - actualGapPx / 2, px)
          );
          positions.push(px);
        }
      }

      return positions.map((px) => px / edgeLenPx);
    }

    const APPROX_W = 90;
    const APPROX_H = 65;

    const topGaps = makeGaps(topCount, APPROX_W);
    const bottomGaps = makeGaps(bottomCount, APPROX_W);
    const leftGaps = makeGaps(leftCount, APPROX_H);
    const rightGaps = makeGaps(rightCount, APPROX_H);

    const isTarget = boxMatchesRatio(sideCounts, questionRatio);
    const ratioLabel = computeBoxRatioLabel(sideCounts);

    boxes.push({
      id: i + 1,
      topCount,
      rightCount,
      bottomCount,
      leftCount,
      sideCounts,
      topGaps,
      bottomGaps,
      leftGaps,
      rightGaps,
      isTarget,
      color: BOX_COLORS[i % BOX_COLORS.length],
      signature: `${topCount}${rightCount}${bottomCount}${leftCount}`,
      ratioLabel,
    });
  }

  return boxes;
}

function computeAnswer(boxes, questionRatio) {
  const targets = boxes.filter((b) => b.isTarget);
  return {
    count: targets.length,
    targetBoxes: targets,
    ratio: questionRatio,
    breakdown: boxes.reduce((acc, b) => {
      acc[b.signature] = (acc[b.signature] || 0) + 1;
      return acc;
    }, {}),
  };
}

function generateOptions(correctAnswer, totalBoxes, questionRatio) {
  const noneIsCorrect = Math.random() < NONE_CORRECT_PROBABILITY;

  const candidateNumbers = [];
  for (let offset = -OPTION_RADIUS; offset <= OPTION_RADIUS; offset++) {
    const num = correctAnswer + offset;
    if (num >= 0 && num <= totalBoxes) {
      candidateNumbers.push(num);
    }
  }

  if (!candidateNumbers.includes(correctAnswer)) {
    candidateNumbers.push(correctAnswer);
  }

  const uniqueCandidates = [...new Set(candidateNumbers)].sort((a, b) => a - b);

  let selectedNumbers = [];

  if (noneIsCorrect) {
    selectedNumbers = uniqueCandidates.slice(0, NUMERIC_OPTION_COUNT);
  } else {
    selectedNumbers = [correctAnswer];
    const others = uniqueCandidates.filter((n) => n !== correctAnswer);
    shuffle(others);

    for (const num of others) {
      if (selectedNumbers.length >= NUMERIC_OPTION_COUNT) break;
      selectedNumbers.push(num);
    }
  }

  if (selectedNumbers.length < NUMERIC_OPTION_COUNT) {
    const allPossible = [];
    for (let v = 0; v <= totalBoxes; v++) {
      if (!selectedNumbers.includes(v)) allPossible.push(v);
    }
    shuffle(allPossible);
    while (
      selectedNumbers.length < NUMERIC_OPTION_COUNT &&
      allPossible.length > 0
    ) {
      selectedNumbers.push(allPossible.pop());
    }
  }

  selectedNumbers = [...new Set(selectedNumbers)].sort((a, b) => a - b);

  const optionStrings = selectedNumbers.map(String);
  optionStrings.push("None of the above");

  shuffle(optionStrings);

  const noneStr = "None of the above";
  const correctAnswerStr = noneIsCorrect ? noneStr : correctAnswer.toString();
  const correctLetter = String.fromCharCode(
    65 + optionStrings.indexOf(correctAnswerStr)
  );

  return {
    options: optionStrings,
    correctLetter,
    correctAnswer: correctAnswerStr,
    isNoneCorrect: noneIsCorrect,
    numericCorrect: correctAnswer,
    numericOptions: selectedNumbers,
  };
}

// -----------------------------------
// Drawing primitives (UNCHANGED)
// -----------------------------------

function drawRectangleWithBreaks(ctx, x, y, w, h, box, gapPx) {
  const halfGap = gapPx / 2;

  const edges = [
    { x1: x, y1: y, x2: x + w, y2: y, len: w, gaps: box.topGaps },
    { x1: x + w, y1: y, x2: x + w, y2: y + h, len: h, gaps: box.rightGaps },
    { x1: x + w, y1: y + h, x2: x, y2: y + h, len: w, gaps: box.bottomGaps },
    { x1: x, y1: y + h, x2: x, y2: y, len: h, gaps: box.leftGaps },
  ];

  for (const edge of edges) {
    const { x1, y1, x2, y2, len, gaps } = edge;
    const dx = (x2 - x1) / len;
    const dy = (y2 - y1) / len;

    let intervals = gaps
      .map((p) => {
        const center = p * len;
        let s = center - halfGap;
        let e = center + halfGap;
        if (s < CORNER_PX) s = CORNER_PX;
        if (e > len - CORNER_PX) e = len - CORNER_PX;
        return [s, e];
      })
      .filter(([s, e]) => e - s > 0.5);

    intervals.sort((p, q) => p[0] - q[0]);
    const merged = [];
    for (const iv of intervals) {
      if (merged.length === 0) merged.push([...iv]);
      else {
        const last = merged[merged.length - 1];
        if (iv[0] <= last[1]) last[1] = Math.max(last[1], iv[1]);
        else merged.push([...iv]);
      }
    }

    const enforce = (list, totalLen) => {
      for (let i = 0; i < list.length; i++) {
        const prevEnd = i === 0 ? 0 : list[i - 1][1];
        const leftPiece = list[i][0] - prevEnd;
        if (leftPiece < MIN_PIECE_PX) {
          const deficit = MIN_PIECE_PX - leftPiece;
          list[i][0] = Math.min(list[i][0] + deficit, list[i][1] - 0.5);
        }
      }
      for (let i = 0; i < list.length; i++) {
        const nextStart = i === list.length - 1 ? totalLen : list[i + 1][0];
        const rightPiece = nextStart - list[i][1];
        if (rightPiece < MIN_PIECE_PX) {
          const deficit = MIN_PIECE_PX - rightPiece;
          list[i][1] = Math.max(list[i][1] - deficit, list[i][0] + 0.5);
        }
      }
      for (const iv of list) {
        if (iv[1] - iv[0] < MIN_PIECE_PX) {
          const center = (iv[0] + iv[1]) / 2;
          iv[0] = center - MIN_PIECE_PX / 2;
          iv[1] = center + MIN_PIECE_PX / 2;
        }
      }
      return list;
    };

    const finalIntervals = enforce(merged, len);

    let cursor = 0;
    for (const [s, e] of finalIntervals) {
      if (s > cursor) {
        ctx.beginPath();
        ctx.moveTo(x1 + dx * cursor, y1 + dy * cursor);
        ctx.lineTo(x1 + dx * s, y1 + dy * s);
        ctx.stroke();
      }
      cursor = Math.max(cursor, e);
    }
    if (cursor < len) {
      ctx.beginPath();
      ctx.moveTo(x1 + dx * cursor, y1 + dy * cursor);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  }
}

// -----------------------------------
// Helper: rounded rectangle path
// -----------------------------------

function roundRect(ctx, x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// -----------------------------------
// Watermark — clean footer text
// -----------------------------------

function drawBottomRightWatermark(ctx, width, height, text, color) {
  ctx.save();
  ctx.font = "bold 12px Arial";
  ctx.fillStyle = color || DEFAULT_WATERMARK_COLOR;
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";

  const barTop = height - WATERMARK_BAR_HEIGHT;
  const centerY = barTop + WATERMARK_BAR_HEIGHT / 2;

  ctx.fillText(text, width - WATERMARK_RIGHT_PADDING, centerY);
  ctx.restore();
}

// -----------------------------------
// Generate Box Image — PREMIUM UI
// ✅ Card panel border + corner accents REMOVED
// Only the broken rectangle is visible in each cell
// -----------------------------------

function generateBoxImage(boxes, cols = 4, watermarkOptions = {}) {
  const totalBoxes = boxes.length;
  const rows = Math.ceil(totalBoxes / cols);

  const rectW = 90;
  const rectH = 65;

  const cellW = 110;
  const cellH = 85;
  const padding = 20;

  const {
    enabled = true,
    text = DEFAULT_WATERMARK_TEXT,
    color = DEFAULT_WATERMARK_COLOR,
  } = watermarkOptions;

  const bottomBar = enabled ? WATERMARK_BAR_HEIGHT : 0;

  const width = cols * cellW + padding * 2;
  const height = rows * cellH + padding * 2 + bottomBar;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // ============ PREMIUM BACKGROUND ============
  const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
  bgGradient.addColorStop(0, "#0b1220");
  bgGradient.addColorStop(0.5, "#111c33");
  bgGradient.addColorStop(1, "#0b1220");
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, width, height);

  // Ambient glow blobs for depth
  ctx.save();
  ctx.globalAlpha = 0.08;
  const blobs = [
    { x: width * 0.15, y: height * 0.15, r: 90, c: "#3b82f6" },
    { x: width * 0.85, y: height * 0.35, r: 110, c: "#a855f7" },
    { x: width * 0.5, y: height * 0.9, r: 120, c: "#22d3ee" },
  ];
  for (const b of blobs) {
    const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
    g.addColorStop(0, b.c);
    g.addColorStop(1, "transparent");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // ============ HEADER STRIP ============
  const headerH = 32;
  const headerGradient = ctx.createLinearGradient(0, 0, width, 0);
  headerGradient.addColorStop(0, "#1d4ed8");
  headerGradient.addColorStop(0.5, "#7c3aed");
  headerGradient.addColorStop(1, "#1d4ed8");

  ctx.save();
  roundRect(ctx, 4, 4, width - 8, headerH, 12);
  ctx.clip();
  ctx.fillStyle = headerGradient;
  ctx.fillRect(4, 4, width - 8, headerH);

  const shine = ctx.createLinearGradient(0, 4, width, 4 + headerH);
  shine.addColorStop(0, "rgba(255,255,255,0.15)");
  shine.addColorStop(0.5, "rgba(255,255,255,0.02)");
  shine.addColorStop(1, "rgba(255,255,255,0.12)");
  ctx.fillStyle = shine;
  ctx.fillRect(4, 4, width - 8, headerH);
  ctx.restore();

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 12px Arial";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText("BROKEN RECTANGLE PUZZLE", 16, 4 + headerH / 2);

  ctx.save();
  const dotY = 4 + headerH / 2;
  const dotColors = ["#fde047", "#4ade80", "#60a5fa"];
  dotColors.forEach((c, i) => {
    ctx.beginPath();
    ctx.arc(width - 20 - i * 12, dotY, 3.2, 0, Math.PI * 2);
    ctx.fillStyle = c;
    ctx.fill();
  });
  ctx.restore();

  // Grid area starts below the header
  const offsetX = padding;
  const offsetY = padding + headerH - 10;

  ctx.lineWidth = LINE_WIDTH;
  ctx.lineCap = "butt";

  // ============ DRAW EACH BOX ============
  for (let i = 0; i < totalBoxes; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;
    const cellX = offsetX + col * cellW;
    const cellY = offsetY + row * cellH;

    const box = boxes[i];

    const rectX = cellX + (cellW - rectW) / 2;
    const rectY = cellY + (cellH - rectH) / 2;

    // ❌ REMOVED: card panel (rounded rect fill + border)
    // ❌ REMOVED: card corner accents

    // ---- Drawn rectangle with per-side breaks (the puzzle) ----
    ctx.save();
    ctx.shadowColor = box.color + "55";
    ctx.shadowBlur = 10;
    ctx.strokeStyle = box.color;
    drawRectangleWithBreaks(ctx, rectX, rectY, rectW, rectH, box, GAP_PX);
    ctx.restore();
  }

  // ============ FOOTER BAR (watermark zone) ============
  if (enabled) {
    const footerY = height - bottomBar;

    ctx.save();
    ctx.strokeStyle = "rgba(148, 163, 184, 0.18)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(10, footerY);
    ctx.lineTo(width - 10, footerY);
    ctx.stroke();
    ctx.restore();

    drawBottomRightWatermark(ctx, width, height, text, color);
  }

  return canvas.toDataURL().split(",")[1];
}

// -----------------------------------
// Main Function (UNCHANGED logic)
// -----------------------------------

export function generatePuzzle_boxDamage(options = {}) {
  try {
    const { boxCount = null, watermark = {} } = options;

    const questionRatio = pickQuestionRatio();

    const boxes = generateBoxes(boxCount, questionRatio);
    const totalBoxes = boxes.length;

    const answerData = computeAnswer(boxes, questionRatio);
    const correctAnswer = answerData.count;

    const mcq = generateOptions(correctAnswer, totalBoxes, questionRatio);
    const imageData = generateBoxImage(boxes, 4, watermark);

    const questionText = `How many boxes are ${questionRatio.a}:${questionRatio.b}?`;

    const debugAnswer = mcq.isNoneCorrect
      ? `None of the above (numeric count is ${correctAnswer})`
      : `${correctAnswer} (numeric count)`;

    const breakPool = buildBreakCountPool(questionRatio);

    const imageBase64 = imageData;
    const imageDataUri = `data:image/png;base64,${imageBase64}`;

    return {
      title: "Broken Rectangle Ratio Puzzle",
      question: questionText,
      questionRatio: `${questionRatio.a}:${questionRatio.b}`,
      breakPool,
      maxBreak: Math.max(...breakPool),
      boxes,
      totalBoxes,
      correctAnswer,
      options: mcq.options,
      correctLetter: mcq.correctLetter,
      correctAnswerText: mcq.correctAnswer,

      image: imageBase64,
      imageDataUri: imageDataUri,

      hasNoneOfTheAbove: true,
      isNoneCorrect: mcq.isNoneCorrect,
      watermark: watermark.enabled !== false,

      debugAnswer,
      debugNumericCount: correctAnswer,
      debugIsNoneCorrect: mcq.isNoneCorrect,
      debugCorrectLetter: mcq.correctLetter,

      detailedData: {
        boxes,
        totalBoxes,
        correctCount: correctAnswer,
        targetBoxes: answerData.targetBoxes,
        ratioBreakdown: answerData.breakdown,
        options: mcq.options,
        correctLetter: mcq.correctLetter,
        correctAnswerText: mcq.correctAnswer,
        isNoneCorrect: mcq.isNoneCorrect,
        numericCorrect: mcq.numericCorrect,
        questionRatio: `${questionRatio.a}:${questionRatio.b}`,
        breakPool,
        maxBreak: Math.max(...breakPool),
        statistics: {
          totalBoxes,
          targetCount: correctAnswer,
          percentage: Math.round((correctAnswer / totalBoxes) * 100),
          ratioBreakdown: answerData.breakdown,
        },
        movementSummary: boxes
          .map(
            (b) =>
              `Box #${b.id}: ${b.ratioLabel} (T${b.topCount} R${b.rightCount} B${b.bottomCount} L${b.leftCount})${
                b.isTarget ? " ✅ (target)" : ""
              }`
          )
          .join("\n"),
      },
    };
  } catch (error) {
    console.error("Error generating puzzle:", error);
    return { error: true, message: "Failed to generate puzzle" };
  }
}

// -----------------------------------
// Exports (UNCHANGED)
// -----------------------------------

export {
  shuffle,
  getRandom,
  rand,
  pickQuestionRatio,
  ratiosMatch,
  boxMatchesRatio,
  computeBoxRatioLabel,
  buildBreakCountPool,
  generateBoxes,
  computeAnswer,
  generateOptions,
  generateBoxImage,
  drawRectangleWithBreaks,
  drawBottomRightWatermark,
  BOX_COLORS,
  DEFAULT_WATERMARK_TEXT,
  NONE_CORRECT_PROBABILITY,
  ABSOLUTE_MAX_BREAK,
  NUMERIC_OPTION_COUNT,
  OPTION_RADIUS,
};

export default {
  generatePuzzle_boxDamage,
  shuffle,
  getRandom,
  rand,
  pickQuestionRatio,
  ratiosMatch,
  boxMatchesRatio,
  computeBoxRatioLabel,
  buildBreakCountPool,
  generateBoxes,
  computeAnswer,
  generateOptions,
  generateBoxImage,
  drawRectangleWithBreaks,
  drawBottomRightWatermark,
  BOX_COLORS,
  DEFAULT_WATERMARK_TEXT,
  NONE_CORRECT_PROBABILITY,
  ABSOLUTE_MAX_BREAK,
  NUMERIC_OPTION_COUNT,
  OPTION_RADIUS,
};

// -----------------------------------
// CLI usage
// -----------------------------------

if (import.meta.url === `file://${process.argv[1]}`) {
  const puzzle = generatePuzzle_boxDamage({
    boxCount: 12,
    watermark: { enabled: true, text: "powered by AVI" },
  });

  console.log("\n🧩 Broken Rectangle Ratio Puzzle");
  console.log("Question:", puzzle.question);
  console.log("Options:", puzzle.options);
  console.log("Correct:", puzzle.correctLetter, "-", puzzle.correctAnswerText);
  console.log("Total boxes:", puzzle.totalBoxes);
  console.log("Numeric count:", puzzle.correctAnswer);
  console.log("\n🖼️  Base64 image length:", puzzle.image.length, "chars");
  console.log("🔗 Data URI prefix:", puzzle.imageDataUri.slice(0, 60) + "...");
}