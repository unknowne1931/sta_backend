// countMissingBetween.js
// Node.js version — premium smart UI, base64 image output
// Canvas: 400 x 250 — number chips with "?" between pairs + reserved footer
// All puzzle logic UNCHANGED.
// Run: node countMissingBetween.js

import { createCanvas } from "canvas";

// -----------------------------------
// Helpers (UNCHANGED)
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

const IMG_WIDTH = 400;
const IMG_HEIGHT = 250;

const NUMBER_FONT_SIZE = 26;
const NUMBER_FONT_FAMILY = '"Courier New", Consolas, monospace';

const MIN_NUMBER_COUNT = 2;
const MAX_NUMBER_COUNT = 10;
const DEFAULT_NUMBER_COUNT = 6;

const MIN_DIGIT = 1;
const MAX_DIGIT = 9;

const DEFAULT_WATERMARK_TEXT = "powered by AVI";
const DEFAULT_WATERMARK_COLOR = "rgba(226, 232, 240, 0.9)";

const NONE_CORRECT_PROBABILITY = 0.2;
const OPTION_COUNT = 4;

// -----------------------------------
// 🎨 COLOR PALETTES (kept for compat)
// -----------------------------------

const NUMBER_COLORS = [
  "#e63946", "#1d3557", "#2a9d8f", "#f4a261", "#9d4edd",
  "#06a77d", "#d62828", "#023e8a", "#ff6b35", "#7209b7",
  "#0077b6", "#bc6c25", "#118ab2", "#ef476f", "#06d6a0",
  "#ffd166", "#8338ec", "#fb5607", "#3a86ff", "#ff006e",
];

// Modern glowing palette for the dark background
const NEON_COLORS = [
  "#f472b6", "#60a5fa", "#34d399", "#fbbf24", "#a78bfa",
  "#22d3ee", "#fb7185", "#4ade80", "#facc15", "#c084fc",
];

const BACKGROUND_COLORS = [
  "#f4f6fb", "#fefae0", "#f1faee", "#fff5f5", "#f0f4ff", "#fdf6e3",
];

// -----------------------------------
// Puzzle logic (UNCHANGED)
// -----------------------------------

function generateNumbers(count) {
  const nums = [];
  for (let i = 0; i < count; i++) {
    nums.push(rand(MIN_DIGIT, MAX_DIGIT));
  }
  return nums;
}

function computeMissingBetween(numbers) {
  const gaps = [];
  const pairs = [];

  for (let i = 0; i < numbers.length - 1; i++) {
    const a = numbers[i];
    const b = numbers[i + 1];

    const gap = a === b ? 0 : Math.abs(a - b) - 1;

    gaps.push(gap);
    pairs.push({ left: a, right: b, gap });
  }

  return { gaps, pairs };
}

function computeTotals(gaps) {
  return {
    sum: gaps.reduce((s, g) => s + g, 0),
    max: Math.max(...gaps),
    min: Math.min(...gaps),
    count: gaps.length,
  };
}

function mutateGapArray(correctGaps) {
  const variant = [...correctGaps];
  const strategy = rand(0, 3);

  switch (strategy) {
    case 0: {
      if (variant.length < 2) break;
      const i = rand(0, variant.length - 2);
      [variant[i], variant[i + 1]] = [variant[i + 1], variant[i]];
      break;
    }
    case 1: {
      const i = rand(0, variant.length - 1);
      variant[i] = variant[i] + 1;
      break;
    }
    case 2: {
      const i = rand(0, variant.length - 1);
      variant[i] = Math.max(0, variant[i] - 1);
      break;
    }
    case 3: {
      const i = rand(0, variant.length - 1);
      variant[i] = rand(0, 5);
      break;
    }
  }

  return variant;
}

function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function generateArrayOptions(correctGaps) {
  const noneIsCorrect = Math.random() < NONE_CORRECT_PROBABILITY;

  const correctStr = correctGaps.join(",");

  const variants = new Set();
  let attempts = 0;
  while (variants.size < OPTION_COUNT + 3 && attempts < 200) {
    attempts++;
    const mutated = mutateGapArray(correctGaps);
    const key = mutated.join(",");
    if (key === correctStr) continue;
    if (variants.has(key)) continue;
    variants.add(key);
  }

  let numericOptions = [...variants];

  if (noneIsCorrect) {
    numericOptions = numericOptions.filter((v) => v !== correctStr);
  } else {
    if (!numericOptions.includes(correctStr)) {
      numericOptions.unshift(correctStr);
    }
  }

  numericOptions = numericOptions.slice(0, OPTION_COUNT);

  if (!noneIsCorrect && !numericOptions.includes(correctStr)) {
    numericOptions[0] = correctStr;
  }

  let padAttempts = 0;
  while (numericOptions.length < OPTION_COUNT && padAttempts < 100) {
    padAttempts++;
    const mutated = mutateGapArray(correctGaps);
    const key = mutated.join(",");
    if (key === correctStr) continue;
    if (numericOptions.includes(key)) continue;
    numericOptions.push(key);
  }

  const optionStrings = numericOptions.map((s) => s.split(",").join(", "));
  optionStrings.push("None of the above");

  shuffle(optionStrings);

  const NONE_STR = "None of the above";
  const correctDisplay = correctGaps.join(", ");
  const correctStrDisplay = noneIsCorrect ? NONE_STR : correctDisplay;
  const correctLetter = String.fromCharCode(
    65 + optionStrings.indexOf(correctStrDisplay)
  );

  return {
    options: optionStrings,
    correctLetter,
    correctAnswer: correctStrDisplay,
    isNoneCorrect: noneIsCorrect,
    correctGaps,
  };
}

function verifyPuzzle({
  numbers,
  gaps,
  pairs,
  correctGaps,
  options,
  correctLetter,
  correctAnswerText,
  isNoneCorrect,
  question,
}) {
  const errors = [];

  if (!Array.isArray(numbers) || numbers.length < MIN_NUMBER_COUNT) {
    errors.push(`numbers length too small: ${numbers?.length}`);
  }

  for (const n of numbers || []) {
    if (typeof n !== "number" || n < MIN_DIGIT || n > MAX_DIGIT) {
      errors.push(`invalid number: ${n}`);
    }
  }

  const recomputed = computeMissingBetween(numbers);

  if (recomputed.gaps.length !== gaps.length) {
    errors.push(`gaps length mismatch`);
  } else {
    for (let i = 0; i < gaps.length; i++) {
      if (gaps[i] !== recomputed.gaps[i]) {
        errors.push(`gap[${i}] mismatch`);
        break;
      }
    }
  }

  if (!arraysEqual(gaps, correctGaps)) {
    errors.push(`correctGaps mismatch`);
  }

  if (pairs.length !== numbers.length - 1) {
    errors.push(`pairs length mismatch`);
  }

  if (!question.toLowerCase().includes("missing")) {
    errors.push(`question missing "missing"`);
  }

  const NONE_STR = "None of the above";
  if (!Array.isArray(options)) {
    errors.push(`options not an array`);
  } else {
    if (new Set(options).size !== options.length)
      errors.push(`duplicate options`);
    if (!options.includes(NONE_STR)) errors.push(`"None of the above" missing`);
  }

  const correctDisplay = correctGaps.join(", ");

  if (typeof correctLetter !== "string" || correctLetter.length !== 1) {
    errors.push(`correctLetter invalid`);
  } else {
    const idx = correctLetter.charCodeAt(0) - 65;
    if (idx < 0 || idx >= (options?.length || 0)) {
      errors.push(`correctLetter out of range`);
    } else {
      const expected = isNoneCorrect ? NONE_STR : correctDisplay;
      if (options[idx] !== expected) errors.push(`correctLetter points wrong`);
    }
  }

  const expectedText = isNoneCorrect ? NONE_STR : correctDisplay;
  if (correctAnswerText !== expectedText) {
    errors.push(`correctAnswerText mismatch`);
  }

  if (isNoneCorrect) {
    const numeric = options.filter((o) => o !== NONE_STR);
    if (numeric.includes(correctDisplay)) {
      errors.push(
        `isNoneCorrect=true but correct array present in numeric options`
      );
    }
  } else {
    if (!options.includes(correctDisplay)) {
      errors.push(`correct array not in options`);
    }
  }

  return { ok: errors.length === 0, errors };
}

// -----------------------------------
// Helper: rounded rectangle
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
// 🎨 Draw numbers as glowing chips with "?" between them
// -----------------------------------

function drawNumbersOnly(ctx, numbers) {
  const safeLeft = 16;
  const safeRight = IMG_WIDTH - 16;
  const safeWidth = safeRight - safeLeft;

  // Chip geometry
  const chipH = 44;
  const chipPadX = 12;    // left + right padding inside chip
  const chipGapX = 10;    // gap between chips (in a row)
  const rowGap = 12;      // vertical gap between rows (if wrapping)

  // ✅ NEW: "?" separator between pairs
  const questionMarkGap = 8;       // horizontal gap on both sides of "?"
  const questionMarkFontScale = 0.9; // "?" font size relative to number font

  // Font size — start big, shrink only if needed
  let fontSize = 28;
  const fontOf = (s) => `bold ${s}px ${NUMBER_FONT_FAMILY}`;
  const fontOfQuestion = (s) => `bold ${Math.floor(s * questionMarkFontScale)}px ${NUMBER_FONT_FAMILY}`;

  // Measure chips with current font (including "?" between pairs)
  const measureAll = () => {
    ctx.font = fontOf(fontSize);
    const numberWidths = numbers.map((n) => {
      const w = ctx.measureText(String(n)).width;
      return Math.ceil(w + chipPadX * 2);
    });

    // "?" width
    const qmFontSize = Math.floor(fontSize * questionMarkFontScale);
    ctx.font = fontOfQuestion(fontSize);
    const qmWidth = ctx.measureText("?").width;

    return { numberWidths, qmWidth };
  };

  // Wrap chips + "?" into rows — greedy
  const wrapRows = (numberWidths, qmWidth) => {
    const rows = [];
    let current = [];
    let currentW = 0;

    for (let i = 0; i < numberWidths.length; i++) {
      const w = numberWidths[i];
      // The element to add: just the chip (i === 0), or "?" + chip (i > 0)
      const extra =
        current.length === 0
          ? w
          : questionMarkGap + qmWidth + questionMarkGap + w + chipGapX - chipGapX; // simpler: gap + qm + gap + chip

      // Recompute more simply:
      const elementWidth =
        current.length === 0
          ? w
          : chipGapX + questionMarkGap + qmWidth + questionMarkGap + w;

      if (currentW + elementWidth > safeWidth && current.length > 0) {
        rows.push(current);
        current = [i];
        currentW = w;
      } else {
        if (current.length === 0) {
          current.push(i);
          currentW = w;
        } else {
          current.push(i);
          currentW += chipGapX + questionMarkGap + qmWidth + questionMarkGap + w;
        }
      }
    }
    if (current.length) rows.push(current);
    return rows;
  };

  let { numberWidths, qmWidth } = measureAll();
  let rows = wrapRows(numberWidths, qmWidth);

  // Vertical space available for the whole stack
  const safeTop = 22;
  const safeBottom = IMG_HEIGHT - 28;
  const safeHeight = safeBottom - safeTop;

  // Shrink font until the stack fits vertically
  let guard = 0;
  while (
    rows.length * chipH + (rows.length - 1) * rowGap > safeHeight &&
    fontSize > 12 &&
    guard < 25
  ) {
    guard++;
    fontSize -= 1;
    const m = measureAll();
    numberWidths = m.numberWidths;
    qmWidth = m.qmWidth;
    rows = wrapRows(numberWidths, qmWidth);
  }

  const totalStackH = rows.length * chipH + (rows.length - 1) * rowGap;
  const startY = safeTop + (safeHeight - totalStackH) / 2;

  const neon = shuffle(NEON_COLORS);
  ctx.textBaseline = "middle";

  rows.forEach((rowIndices, rowIdx) => {
    // Compute row total width including "?" separators
    let rowTotalW = 0;
    rowIndices.forEach((idx, k) => {
      rowTotalW += numberWidths[idx];
      if (k < rowIndices.length - 1) {
        rowTotalW += chipGapX + questionMarkGap + qmWidth + questionMarkGap;
      }
    });

    let cursorX = safeLeft + (safeWidth - rowTotalW) / 2;
    const chipY = startY + rowIdx * (chipH + rowGap);

    rowIndices.forEach((numIdx, k) => {
      const n = numbers[numIdx];
      const chipW = numberWidths[numIdx];
      const chipX = cursorX;
      const chipColor = neon[numIdx % neon.length];

      // ---- Chip background ----
      ctx.save();
      const chipGrad = ctx.createLinearGradient(
        chipX,
        chipY,
        chipX,
        chipY + chipH
      );
      chipGrad.addColorStop(0, "#182338");
      chipGrad.addColorStop(1, "#0b1220");

      ctx.shadowColor = "rgba(0, 0, 0, 0.55)";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 3;

      ctx.fillStyle = chipGrad;
      roundRect(ctx, chipX, chipY, chipW, chipH, 10);
      ctx.fill();
      ctx.restore();

      // ---- Chip border (color-matched) ----
      ctx.save();
      ctx.strokeStyle = chipColor + "cc";
      ctx.lineWidth = 1.6;
      roundRect(ctx, chipX, chipY, chipW, chipH, 10);
      ctx.stroke();
      ctx.restore();

      // ---- Top glossy highlight ----
      ctx.save();
      ctx.globalAlpha = 0.12;
      ctx.fillStyle = "#ffffff";
      roundRect(
        ctx,
        chipX + 3,
        chipY + 2,
        chipW - 6,
        chipH * 0.38,
        7
      );
      ctx.fill();
      ctx.restore();

      // ---- Number text ----
      ctx.save();
      ctx.font = fontOf(fontSize);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = chipColor;
      ctx.shadowColor = chipColor + "aa";
      ctx.shadowBlur = 8;
      ctx.fillText(
        String(n),
        chipX + chipW / 2,
        chipY + chipH / 2 + 1
      );
      ctx.restore();

      cursorX += chipW;

      // ✅ Draw "?" between this chip and the next one in the SAME row
      if (k < rowIndices.length - 1) {
        cursorX += chipGapX + questionMarkGap;

        // "?" — subtle bright gold, centered vertically
        ctx.save();
        ctx.font = fontOfQuestion(fontSize);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "rgba(253, 224, 71, 0.85)";
        ctx.shadowColor = "rgba(253, 224, 71, 0.7)";
        ctx.shadowBlur = 6;
        ctx.fillText("?", cursorX + qmWidth / 2, chipY + chipH / 2 + 1);
        ctx.restore();

        cursorX += qmWidth + questionMarkGap;
      }
    });
  });
}

function drawBottomRightWatermark(ctx, width, height, text, color) {
  ctx.save();
  ctx.font = "bold 12px Arial";
  ctx.fillStyle = color;
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  ctx.fillText(text, width - 14, height - 11);
  ctx.restore();
}

// -----------------------------------
// Generate image — PREMIUM SMART UI
// -----------------------------------

function generateImage(numbers, watermarkOptions = {}) {
  const canvas = createCanvas(IMG_WIDTH, IMG_HEIGHT);
  const ctx = canvas.getContext("2d");

  // ============ PREMIUM BACKGROUND ============
  const bgGradient = ctx.createLinearGradient(0, 0, 0, IMG_HEIGHT);
  bgGradient.addColorStop(0, "#050b18");
  bgGradient.addColorStop(0.5, "#0b1530");
  bgGradient.addColorStop(1, "#050b18");
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, IMG_WIDTH, IMG_HEIGHT);

  // Ambient glow blobs for depth
  ctx.save();
  ctx.globalAlpha = 0.09;
  const blobs = [
    { x: IMG_WIDTH * 0.15, y: IMG_HEIGHT * 0.2, r: 90, c: "#3b82f6" },
    { x: IMG_WIDTH * 0.85, y: IMG_HEIGHT * 0.4, r: 110, c: "#a855f7" },
    { x: IMG_WIDTH * 0.5, y: IMG_HEIGHT * 0.95, r: 120, c: "#22d3ee" },
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

  // Top gradient accent bar
  const topBar = ctx.createLinearGradient(0, 0, IMG_WIDTH, 0);
  topBar.addColorStop(0, "#1d4ed8");
  topBar.addColorStop(0.5, "#7c3aed");
  topBar.addColorStop(1, "#1d4ed8");
  ctx.fillStyle = topBar;
  roundRect(ctx, 8, 6, IMG_WIDTH - 16, 4, 2);
  ctx.fill();

  // ---- Draw numbers as glowing chips with "?" between ----
  drawNumbersOnly(ctx, numbers);

  // ---- Watermark ----
  if (watermarkOptions.enabled !== false) {
    const text = watermarkOptions.text || DEFAULT_WATERMARK_TEXT;
    const color = watermarkOptions.color || DEFAULT_WATERMARK_COLOR;

    ctx.save();
    ctx.strokeStyle = "rgba(148, 163, 184, 0.22)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(12, IMG_HEIGHT - 22);
    ctx.lineTo(IMG_WIDTH - 12, IMG_HEIGHT - 22);
    ctx.stroke();
    ctx.restore();

    drawBottomRightWatermark(ctx, IMG_WIDTH, IMG_HEIGHT, text, color);
  }

  return canvas.toDataURL().split(",")[1];
}

// -----------------------------------
// Main Function (UNCHANGED logic)
// -----------------------------------

export function generatePuzzle_countMissingBetween(options = {}) {
  try {
    const {
      numberCount = DEFAULT_NUMBER_COUNT,
      watermark = {},
      maxRetries = 30,
    } = options;

    let count = parseInt(numberCount, 10);
    if (isNaN(count)) count = DEFAULT_NUMBER_COUNT;
    if (count < MIN_NUMBER_COUNT) count = MIN_NUMBER_COUNT;
    if (count > MAX_NUMBER_COUNT) count = MAX_NUMBER_COUNT;

    let lastErrors = [];
    let finalPuzzle = null;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      const numbers = generateNumbers(count);

      const { gaps, pairs } = computeMissingBetween(numbers);

      const totalMissing = gaps.reduce((s, g) => s + g, 0);
      if (totalMissing === 0) {
        lastErrors = ["All gaps are 0 — retrying"];
        continue;
      }

      const totals = computeTotals(gaps);
      const correctGaps = [...gaps];

      const mcq = generateArrayOptions(correctGaps);

      const questionText =
        "Find how many numbers are missing between each pair";

      const verification = verifyPuzzle({
        numbers,
        gaps,
        pairs,
        correctGaps,
        options: mcq.options,
        correctLetter: mcq.correctLetter,
        correctAnswerText: mcq.correctAnswer,
        isNoneCorrect: mcq.isNoneCorrect,
        question: questionText,
      });

      if (!verification.ok) {
        lastErrors = verification.errors;
        continue;
      }

      const imageData = generateImage(numbers, watermark);

      const debugAnswer = mcq.isNoneCorrect
        ? `None of the above (actual: ${correctGaps.join(", ")})`
        : correctGaps.join(", ");

      const imageBase64 = imageData;
      const imageDataUri = `data:image/png;base64,${imageBase64}`;

      finalPuzzle = {
        title: "Missing Between Puzzle",
        question: questionText,
        numbers,
        pairs,
        gaps,
        correctGaps,
        totals,
        correctAnswer: mcq.correctAnswer,
        correctAnswerText: mcq.correctAnswer,
        options: mcq.options,
        correctLetter: mcq.correctLetter,

        image: imageBase64,
        imageDataUri: imageDataUri,

        hasNoneOfTheAbove: true,
        isNoneCorrect: mcq.isNoneCorrect,

        verified: true,
        verifyErrors: [],

        debugAnswer,
        debugCorrectGaps: correctGaps,
        debugIsNoneCorrect: mcq.isNoneCorrect,
        debugCorrectLetter: mcq.correctLetter,

        detailedData: {
          numbers,
          pairs,
          gaps,
          totals,
          correctGaps,
          correctAnswer: mcq.correctAnswer,
          options: mcq.options,
          correctLetter: mcq.correctLetter,
          correctAnswerText: mcq.correctAnswer,
          isNoneCorrect: mcq.isNoneCorrect,
          pairSummary: pairs.map((p, i) => `${p.left}→${p.right}: ${p.gap}`).join(", "),
          gapsSummary: `[${gaps.join(", ")}]`,
        },
      };

      break;
    }

    if (!finalPuzzle) {
      return {
        error: true,
        message: "Verification failed after retries",
        verifyErrors: lastErrors,
      };
    }

    return finalPuzzle;
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
  generateNumbers,
  computeMissingBetween,
  computeTotals,
  mutateGapArray,
  generateArrayOptions,
  verifyPuzzle,
  drawNumbersOnly,
  drawBottomRightWatermark,
  generateImage,
  IMG_WIDTH,
  IMG_HEIGHT,
  NUMBER_FONT_SIZE,
  MIN_NUMBER_COUNT,
  MAX_NUMBER_COUNT,
  DEFAULT_NUMBER_COUNT,
  MIN_DIGIT,
  MAX_DIGIT,
  NONE_CORRECT_PROBABILITY,
  OPTION_COUNT,
  NUMBER_COLORS,
  BACKGROUND_COLORS,
};

export default {
  generatePuzzle_countMissingBetween,
  shuffle,
  getRandom,
  rand,
  generateNumbers,
  computeMissingBetween,
  computeTotals,
  mutateGapArray,
  generateArrayOptions,
  verifyPuzzle,
  drawNumbersOnly,
  drawBottomRightWatermark,
  generateImage,
  IMG_WIDTH,
  IMG_HEIGHT,
  NUMBER_FONT_SIZE,
  MIN_NUMBER_COUNT,
  MAX_NUMBER_COUNT,
  DEFAULT_NUMBER_COUNT,
  MIN_DIGIT,
  MAX_DIGIT,
  NONE_CORRECT_PROBABILITY,
  OPTION_COUNT,
  NUMBER_COLORS,
  BACKGROUND_COLORS,
};

// -----------------------------------
// CLI usage
// -----------------------------------

if (import.meta.url === `file://${process.argv[1]}`) {
  const puzzle = generatePuzzle_countMissingBetween({
    numberCount: 6,
    watermark: { enabled: true, text: "powered by AVI" },
  });

  console.log("\n🧩 Missing Between Puzzle");
  console.log("Question:", puzzle.question);
  console.log("Numbers:", puzzle.numbers.join(", "));
  console.log("Gaps:", puzzle.correctGaps.join(", "));
  console.log("Options:", puzzle.options);
  console.log("Correct:", puzzle.correctLetter, "-", puzzle.correctAnswer);
  console.log("\n🖼️  Base64 image length:", puzzle.image.length, "chars");
  console.log("🔗 Data URI prefix:", puzzle.imageDataUri.slice(0, 60) + "...");
}