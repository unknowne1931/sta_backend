// finalCodePuzzle.js
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
// Configuration
// -----------------------------------

const DEFAULT_CODE_LENGTH = 4;
const GRID_ROWS = 9;

const MIN_CODE_LENGTH = 1;
const MAX_CODE_LENGTH = 10;

const BORDER_COLOR_POOL = [
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
  "#0EA5E9",
  "#10B981",
  "#EF4444",
  "#8B5CF6",
  "#F59E0B"
];

const DEFAULT_WATERMARK_TEXT = "powered by AVI";
const DEFAULT_WATERMARK_COLOR = "rgba(255, 255, 255, 0.55)";
const WATERMARK_BAR_HEIGHT = 26;
const WATERMARK_RIGHT_PADDING = 14;

const NONE_CORRECT_PROBABILITY = 0.2;

// -----------------------------------
// Generate a random code with N digits (1-9 only, no 0)
// -----------------------------------

function generateCode(codeLength) {
  let code = "";
  for (let i = 0; i < codeLength; i++) {
    code += rand(1, 9).toString();  // Changed from rand(0, 9) to rand(1, 9)
  }
  return code;
}

// -----------------------------------
// Build a set of unique codes.
// -----------------------------------

function generateCodes(count, codeLength) {
  const codes = new Set();
  let safety = 0;
  const maxAttempts = Math.max(5000, count * 50);
  while (codes.size < count && safety < maxAttempts) {
    codes.add(generateCode(codeLength));
    safety++;
  }
  return Array.from(codes);
}

// -----------------------------------
// Solve the puzzle given a start row index.
// -----------------------------------

function canBeStart(codes, startIndex) {
  const startCode = codes[startIndex];
  if (!startCode) return false;
  const firstDigit = parseInt(startCode[0], 10);
  return firstDigit >= 1 && firstDigit <= codes.length;
}

function solvePuzzle(codes, startIndex, codeLength) {
  if (!codes || codes.length < 9) return null;
  if (startIndex < 0 || startIndex >= codes.length) return null;
  if (!canBeStart(codes, startIndex)) return null;

  const startCode = codes[startIndex];
  const final = [startCode[0]];
  let currentRow = parseInt(startCode[0], 10);

  for (let i = 1; i < codeLength; i++) {
    if (currentRow < 1 || currentRow > codes.length) return null;
    const rowCode = codes[currentRow - 1];
    if (!rowCode || i >= rowCode.length) return null;
    const digit = rowCode[i];
    final.push(digit);
    currentRow = parseInt(digit, 10);
  }

  return final.join("");
}

function pickRandomStartIndex(codes, codeLength) {
  const validIndices = [];
  for (let i = 0; i < codes.length; i++) {
    if (solvePuzzle(codes, i, codeLength)) validIndices.push(i);
  }
  if (validIndices.length === 0) return -1;
  return getRandom(validIndices);
}

// -----------------------------------
// Trace for debugging (returned in JSON only)
// -----------------------------------

function computeTrace(codes, startIndex, codeLength) {
  if (!codes || codes.length < 9) return [];
  if (!canBeStart(codes, startIndex)) return [];

  const startCode = codes[startIndex];
  const trace = [];
  trace.push({
    step: 0,
    description: `Start: row ${startIndex + 1} code = ${startCode}`,
    digit: startCode[0],
    source: `row ${startIndex + 1} [0]`,
    currentRow: parseInt(startCode[0], 10)
  });

  let currentRow = parseInt(startCode[0], 10);
  for (let i = 1; i < codeLength; i++) {
    if (currentRow < 1 || currentRow > codes.length) break;
    const rowCode = codes[currentRow - 1];
    const digit = rowCode[i];
    trace.push({
      step: i,
      description: `Go to row ${currentRow} = ${rowCode}, take digit ${i} = ${digit}`,
      digit,
      source: `row ${currentRow} [${i}]`,
      currentRow: parseInt(digit, 10)
    });
    currentRow = parseInt(digit, 10);
  }

  return trace;
}

// -----------------------------------
// Generate MCQ options.
// -----------------------------------

function generateOptions(correctAnswer, codes, codeLength) {
  const noneIsCorrect = Math.random() < NONE_CORRECT_PROBABILITY;

  const distractors = new Set();

  for (let i = 0; i < codes.length && distractors.size < 6; i++) {
    if (codes[i] !== correctAnswer) distractors.add(codes[i]);
  }

  let safety = 0;
  while (distractors.size < 8 && safety < 200) {
    const arr = correctAnswer.split("");
    const pos = rand(0, arr.length - 1);
    let newDigit = rand(1, 9).toString();  // Changed from rand(0, 9) to rand(1, 9)
    while (newDigit === arr[pos]) {
      newDigit = rand(1, 9).toString();  // Changed from rand(0, 9) to rand(1, 9)
    }
    arr[pos] = newDigit;
    const mutated = arr.join("");
    if (mutated !== correctAnswer) distractors.add(mutated);
    safety++;
  }

  const distractorArr = shuffle(Array.from(distractors));

  let numberOptions;

  if (noneIsCorrect) {
    numberOptions = distractorArr.slice(0, 4);
  } else {
    numberOptions = [correctAnswer, ...distractorArr.slice(0, 3)];
  }

  const optionStrings = numberOptions.map(String);
  optionStrings.push("None of the above");

  shuffle(optionStrings);

  const noneStr = "None of the above";
  const correctAnswerStr = noneIsCorrect ? noneStr : correctAnswer.toString();
  const correctLetter = String.fromCharCode(65 + optionStrings.indexOf(correctAnswerStr));

  return {
    options: optionStrings,
    correctLetter,
    correctAnswer: correctAnswerStr,
    isNoneCorrect: noneIsCorrect,
    numericCorrect: correctAnswer
  };
}

// -----------------------------------
// Rounded rect path helper
// -----------------------------------

function roundRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// -----------------------------------
// Tile metrics per code length
// -----------------------------------

function getTileMetrics(codeLength) {
  if (codeLength <= 2) {
    return { cellW: 110, cellH: 76, fontSize: 34 };
  }
  if (codeLength === 3) {
    return { cellW: 150, cellH: 76, fontSize: 34 };
  }
  if (codeLength === 4) {
    return { cellW: 180, cellH: 76, fontSize: 30 };
  }
  if (codeLength === 5) {
    return { cellW: 210, cellH: 76, fontSize: 28 };
  }
  if (codeLength === 6) {
    return { cellW: 240, cellH: 76, fontSize: 26 };
  }
  const extra = codeLength - 6;
  return { cellW: 240 + extra * 24, cellH: 76, fontSize: 22 };
}

// -----------------------------------
// Draw the code grid — no row numbers.
// -----------------------------------

function drawCodesGrid(ctx, codes, cols, startX, startY, codeLength) {
  const { cellW, cellH, fontSize: digitFontSize } = getTileMetrics(codeLength);
  const gapX = 22;
  const gapY = 22;

  const headerH = 16;
  const gutterW = 16;
  const radius = 12;

  for (let i = 0; i < codes.length; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;
    const x = startX + col * (cellW + gapX);
    const y = startY + row * (cellH + gapY);

    const code = codes[i];
    const borderColor = BORDER_COLOR_POOL[rand(0, BORDER_COLOR_POOL.length - 1)];

    // ---- Outer tile ----
    ctx.save();
    roundRectPath(ctx, x, y, cellW, cellH, radius);
    ctx.fillStyle = "#0d1117";
    ctx.fill();
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 3.5;
    ctx.stroke();
    ctx.restore();

    // ---- Top mini header bar (no row number) ----
    ctx.save();
    roundRectPath(ctx, x, y, cellW, cellH, radius);
    ctx.clip();

    ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
    ctx.fillRect(x, y, cellW, headerH);

    const dotR = 2.6;
    const dotY = y + headerH / 2;
    const dotColors = ["#ff5f56", "#ffbd2e", "#27c93f"];
    for (let d = 0; d < 3; d++) {
      ctx.beginPath();
      ctx.arc(x + 12 + d * 10, dotY, dotR, 0, Math.PI * 2);
      ctx.fillStyle = dotColors[d];
      ctx.fill();
    }

    // No #N label here anymore

    // Left gutter strip
    ctx.fillStyle = borderColor;
    ctx.globalAlpha = 0.14;
    ctx.fillRect(x, y + headerH, gutterW, cellH - headerH);
    ctx.globalAlpha = 1;

    ctx.beginPath();
    ctx.moveTo(x + gutterW + 0.5, y + headerH);
    ctx.lineTo(x + gutterW + 0.5, y + cellH);
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.restore();

    // Left gutter accent bar
    ctx.save();
    ctx.fillStyle = borderColor;
    ctx.globalAlpha = 0.65;
    ctx.fillRect(x + gutterW / 2 - 1, y + headerH + 12, 2, cellH - headerH - 24);
    ctx.restore();

    // Digits
    const codeAreaX = x + gutterW;
    const codeAreaW = cellW - gutterW;
    const digitSpacing = codeAreaW / (codeLength + 1);

    ctx.save();
    ctx.font = `bold ${digitFontSize}px "Courier New", Consolas, monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const digitY = y + headerH + (cellH - headerH) / 2;

    for (let d = 0; d < code.length; d++) {
      const dx = codeAreaX + digitSpacing * (d + 1);

      // Glow
      ctx.save();
      ctx.globalAlpha = 0.35;
      ctx.fillStyle = borderColor;
      ctx.fillText(code[d], dx + 0.6, digitY + 0.6);
      ctx.restore();

      // Main digit
      ctx.fillStyle = "#f0f6fc";
      ctx.fillText(code[d], dx, digitY);
    }
    ctx.restore();
  }
}

// -----------------------------------
// Watermark
// -----------------------------------

function drawBottomRightWatermark(ctx, width, height, text, color) {
  ctx.save();
  ctx.font = 'bold 12px Arial';
  ctx.fillStyle = color;
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';

  const barTop = height - WATERMARK_BAR_HEIGHT;
  const centerY = barTop + WATERMARK_BAR_HEIGHT / 2;

  ctx.fillText(text, width - WATERMARK_RIGHT_PADDING, centerY);
  ctx.restore();
}

// -----------------------------------
// Generate the image
// -----------------------------------

function generateImage(codes, codeLength, watermarkOptions = {}) {
  const cols = 3;
  const rows = Math.ceil(codes.length / cols);

  const { cellW, cellH } = getTileMetrics(codeLength);
  const gapX = 22;
  const gapY = 22;

  const padding = 30;
  const bottomBar = (watermarkOptions.enabled !== false) ? WATERMARK_BAR_HEIGHT : 0;

  const width = cols * cellW + (cols - 1) * gapX + padding * 2;
  const height = rows * cellH + (rows - 1) * gapY + padding * 2 + bottomBar;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#031541";
  ctx.fillRect(0, 0, width, height);

  drawCodesGrid(ctx, codes, cols, padding, padding, codeLength);

  if (watermarkOptions.enabled !== false) {
    const text = watermarkOptions.text || DEFAULT_WATERMARK_TEXT;
    const color = watermarkOptions.color || DEFAULT_WATERMARK_COLOR;
    drawBottomRightWatermark(ctx, width, height, text, color);
  }

  return canvas.toDataURL().split(",")[1];
}

// -----------------------------------
// Main Function
// -----------------------------------

export function generatePuzzle_finalCode(options = {}) {
  try {
    const {
      digits = DEFAULT_CODE_LENGTH,
      watermark = {},
      maxRetries = 30
    } = options;

    let codeLength = parseInt(digits, 10);
    if (isNaN(codeLength) || codeLength < MIN_CODE_LENGTH) {
      console.warn(`Invalid digits "${digits}" — falling back to ${DEFAULT_CODE_LENGTH}`);
      codeLength = DEFAULT_CODE_LENGTH;
    } else if (codeLength > MAX_CODE_LENGTH) {
      console.warn(`digits "${codeLength}" exceeds max ${MAX_CODE_LENGTH} — clamping`);
      codeLength = MAX_CODE_LENGTH;
    }

    let codes = null;
    let startIndex = -1;
    let correctAnswer = null;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      codes = generateCodes(GRID_ROWS, codeLength);
      if (codes.length < GRID_ROWS) continue;

      startIndex = pickRandomStartIndex(codes, codeLength);
      if (startIndex >= 0) {
        correctAnswer = solvePuzzle(codes, startIndex, codeLength);
        if (correctAnswer) break;
      }
    }

    if (!correctAnswer) {
      throw new Error("Failed to find a valid start index after retries");
    }

    const trace = computeTrace(codes, startIndex, codeLength);
    const mcq = generateOptions(correctAnswer, codes, codeLength);
    const imageData = generateImage(codes, codeLength, watermark);

    const questionText = `Find the final code from the given code.  #${startIndex + 1} code.`;

    const debugAnswer = mcq.isNoneCorrect
      ? `None of the above (actual code is ${correctAnswer})`
      : correctAnswer;

    return {
      title: "Final Code Puzzle",
      question: questionText,
      digits: codeLength,
      codes,
      startCode: codes[startIndex],
      startRowNumber: startIndex + 1,
      startCodeIndex: startIndex,
      correctAnswer,
      options: mcq.options,
      correctLetter: mcq.correctLetter,
      correctAnswerText: mcq.correctAnswer,
      image: imageData,
      hasNoneOfTheAbove: true,
      isNoneCorrect: mcq.isNoneCorrect,

      debugAnswer,
      debugNumericCount: correctAnswer,
      debugIsNoneCorrect: mcq.isNoneCorrect,
      debugCorrectLetter: mcq.correctLetter,

      detailedData: {
        digits: codeLength,
        codes,
        startCode: codes[startIndex],
        startRowNumber: startIndex + 1,
        startCodeIndex: startIndex,
        trace,
        correctAnswer,
        options: mcq.options,
        correctLetter: mcq.correctLetter,
        correctAnswerText: mcq.correctAnswer,
        isNoneCorrect: mcq.isNoneCorrect,
        movementSummary: trace.map(t =>
          `Step ${t.step}: ${t.description}`
        ).join('\n')
      }
    };

  } catch (error) {
    console.error("Error generating puzzle:", error);
    return { error: true, message: "Failed to generate puzzle" };
  }
}

// -----------------------------------
// Exports
// -----------------------------------

export {
  shuffle,
  getRandom,
  rand,
  generateCode,
  generateCodes,
  canBeStart,
  solvePuzzle,
  pickRandomStartIndex,
  computeTrace,
  generateOptions,
  roundRectPath,
  getTileMetrics,
  drawCodesGrid,
  drawBottomRightWatermark,
  generateImage,
  BORDER_COLOR_POOL,
  DEFAULT_WATERMARK_TEXT,
  DEFAULT_CODE_LENGTH,
  MIN_CODE_LENGTH,
  MAX_CODE_LENGTH,
  NONE_CORRECT_PROBABILITY,
  GRID_ROWS
};

export default {
  generatePuzzle_finalCode,
  shuffle,
  getRandom,
  rand,
  generateCode,
  generateCodes,
  canBeStart,
  solvePuzzle,
  pickRandomStartIndex,
  computeTrace,
  generateOptions,
  roundRectPath,
  getTileMetrics,
  drawCodesGrid,
  drawBottomRightWatermark,
  generateImage,
  BORDER_COLOR_POOL,
  DEFAULT_WATERMARK_TEXT,
  DEFAULT_CODE_LENGTH,
  MIN_CODE_LENGTH,
  MAX_CODE_LENGTH,
  NONE_CORRECT_PROBABILITY,
  GRID_ROWS
};