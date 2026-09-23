// commonLetters.js
// Node.js version — premium smart UI, base64 image output
// Canvas: 400 x 250 — NO chip borders + strict fit-to-image layout
// ✅ Words can NEVER overlap. Font auto-scales down to fit.
// All puzzle logic UNCHANGED.
// Run: node commonLetters.js

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

function rand(min, max) {
  if (min > max) [min, max] = [max, min];
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min, max) {
  return Math.random() * (max - min) + min;
}

// -----------------------------------
// Configuration (UNCHANGED)
// -----------------------------------

const IMG_WIDTH = 400;
const IMG_HEIGHT = 250;

const MAX_FONT_SIZE = 28;
const MIN_FONT_SIZE = 8;

const WORD_FONT_FAMILY = "sans-serif";

const MIN_WORDS = 2;
const MAX_WORDS = 10;
const DEFAULT_WORDS = 2;

const MIN_WORD_LENGTH = 3;
const MAX_WORD_LENGTH = 8;

const PADDING_X = 12;
const PADDING_TOP = 12;
const PADDING_BOTTOM = 12;

const WORD_GAP = 4;

const DEFAULT_WATERMARK_TEXT = "powered by AVI";
const DEFAULT_WATERMARK_COLOR = "rgba(226, 232, 240, 0.9)";

const NONE_CORRECT_PROBABILITY = 0.2;
const MCQ_OPTION_COUNT = 4;

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

// -----------------------------------
// 🎨 Color palettes
// -----------------------------------

const LETTER_COLORS = [
  "#1d3557", "#023e8a", "#0077b6", "#0096c7", "#00b4d8",
  "#4361ee", "#3a86ff", "#1e3a8a", "#0c4a6e", "#164e63",
  "#1e6091", "#14213d", "#264653", "#22223b",
  "#2a9d8f", "#06a77d", "#118ab2", "#0081a7",
  "#06d6a0", "#2b9348", "#38b000",
  "#e63946", "#d62828", "#c1121f", "#e85d04", "#dc2f02", "#ff6b35",
  "#7209b7", "#5a189a", "#9d4edd", "#8338ec", "#b5179e", "#f72585",
  "#6d4c41", "#5c4033", "#333333", "#2c3e50",
];

// Modern neon palette for the dark background
const NEON_LETTERS = [
  "#f472b6", "#60a5fa", "#34d399", "#fbbf24", "#a78bfa",
  "#22d3ee", "#fb7185", "#4ade80", "#facc15", "#c084fc",
  "#38bdf8", "#f97316", "#e879f9", "#2dd4bf", "#fde047",
];

const BACKGROUND_COLORS = [
  "#ffffff", "#fdfefe", "#fbfdff", "#fafbfc", "#f9fafb",
  "#fefae0", "#f1faee", "#fff5f5", "#f0f4ff", "#fdf6e3",
];

// -----------------------------------
// 🔵 Blue-only palette (kept for API compatibility)
// -----------------------------------

const WATERMARK_BLUE_COLORS = [
  "#03045e", "#023e8a", "#0077b6", "#0096c7", "#00b4d8",
  "#48cae4", "#4361ee", "#3a0ca3", "#1d3557", "#4cc9f0",
];

const WATERMARK_WORDS = [
  "avi", "Markeev", "puzzle", "letter", "common", "word", "alpha",
  "beta", "gamma", "logic", "brain", "smart", "focus", "match",
  "share", "unique", "count", "solve", "think", "quick",
];

// -----------------------------------
// 📚 Word pool (UNCHANGED)
// -----------------------------------

const WORD_POOL = [
  "darshan", "avi", "apple", "banana", "cherry", "dragon", "eagle",
  "falcon", "guitar", "hunter", "igloo", "jungle", "kitten", "lemon",
  "mango", "nebula", "ocean", "puzzle", "queen", "rabbit", "sunset",
  "tiger", "umbrella", "violet", "winter", "xenon", "yellow", "zebra",
  "rocket", "planet", "silver", "orange", "purple", "garden", "forest",
  "candle", "mirror", "bottle", "button", "pillow", "soccer",
  "tunnel", "valley", "waffle", "coffee", "letter", "summer", "happy",
  "balloon", "success", "pizza", "dinner", "bubble", "matter", "bitter",
  "dollar", "follow", "hollow", "middle", "bridge", "castle", "danger",
  "escape", "flavor", "gravel", "hidden", "island", "jacket", "kernel",
  "ladder", "magnet", "nature", "object", "pencil", "quartz", "ribbon",
  "silent", "temple", "united", "velvet", "wander", "yogurt", "zigzag",
];

const CLEAN_WORDS = WORD_POOL.filter((w) => {
  const s = new Set(w.split(""));
  return s.size === w.length;
});

// -----------------------------------
// Puzzle logic (UNCHANGED)
// -----------------------------------

function computeCommonLetterCount(words) {
  if (!words || words.length === 0) return 0;
  let common = new Set(words[0].split(""));
  for (let i = 1; i < words.length; i++) {
    const wordSet = new Set(words[i].split(""));
    const next = new Set();
    for (const ch of common) {
      if (wordSet.has(ch)) next.add(ch);
    }
    common = next;
    if (common.size === 0) break;
  }
  return common.size;
}

function computeCommonLetters(words) {
  if (!words || words.length === 0) return [];
  let common = new Set(words[0].split(""));
  for (let i = 1; i < words.length; i++) {
    const wordSet = new Set(words[i].split(""));
    const next = new Set();
    for (const ch of common) {
      if (wordSet.has(ch)) next.add(ch);
    }
    common = next;
  }
  return [...common].sort();
}

function generateWordSet(wordCount) {
  const n = Math.max(MIN_WORDS, Math.min(MAX_WORDS, wordCount));
  return shuffle([...CLEAN_WORDS]).slice(0, n);
}

function generateInterestingWordSet(wordCount) {
  const n = Math.max(MIN_WORDS, Math.min(MAX_WORDS, wordCount));
  const maxCommon = n <= 4 ? 4 : n <= 6 ? 5 : 6;

  for (let attempt = 0; attempt < 300; attempt++) {
    const words = shuffle([...CLEAN_WORDS]).slice(0, n);
    const common = computeCommonLetterCount(words);
    if (common >= 1 && common <= maxCommon) return words;
  }

  return shuffle([...CLEAN_WORDS]).slice(0, n);
}

function generateNumberOptions(correctAnswer) {
  const noneIsCorrect = Math.random() < NONE_CORRECT_PROBABILITY;

  const candidates = new Set();
  for (let offset = -2; offset <= 2; offset++) {
    const v = correctAnswer + offset;
    if (v >= 0 && v <= 10) candidates.add(v);
  }

  let candidatesArr = [...candidates].sort((a, b) => a - b);
  let selectedNumbers = [];

  if (noneIsCorrect) {
    selectedNumbers = candidatesArr
      .filter((v) => v !== correctAnswer)
      .slice(0, MCQ_OPTION_COUNT);
    let extra = 3;
    while (selectedNumbers.length < MCQ_OPTION_COUNT && extra < 15) {
      if (!selectedNumbers.includes(extra)) selectedNumbers.push(extra);
      extra++;
    }
  } else {
    selectedNumbers = [correctAnswer];
    const others = candidatesArr.filter((v) => v !== correctAnswer);
    shuffle(others);
    for (const v of others) {
      if (selectedNumbers.length >= MCQ_OPTION_COUNT) break;
      selectedNumbers.push(v);
    }
    let extra = 3;
    while (selectedNumbers.length < MCQ_OPTION_COUNT && extra < 15) {
      if (!selectedNumbers.includes(extra)) selectedNumbers.push(extra);
      extra++;
    }
  }

  selectedNumbers = [...new Set(selectedNumbers)].sort((a, b) => a - b);

  const optionStrings = selectedNumbers.map(String);
  optionStrings.push("None of the above");
  shuffle(optionStrings);

  const NONE_STR = "None of the above";
  const correctStr = noneIsCorrect ? NONE_STR : String(correctAnswer);
  const correctLetter = String.fromCharCode(
    65 + optionStrings.indexOf(correctStr)
  );

  return {
    options: optionStrings,
    correctLetter,
    correctAnswer: correctStr,
    isNoneCorrect: noneIsCorrect,
    numericCorrect: correctAnswer,
  };
}

function verifyPuzzle({
  words,
  correctAnswer,
  commonLetters,
  options,
  correctLetter,
  correctAnswerText,
  isNoneCorrect,
  question,
}) {
  const errors = [];

  if (!Array.isArray(words) || words.length < MIN_WORDS) {
    errors.push(`not enough words: ${words?.length}`);
  }

  for (const w of words || []) {
    if (typeof w !== "string" || !/^[a-z]+$/.test(w)) {
      errors.push(`invalid word: ${w}`);
    }
  }

  const recomputed = computeCommonLetterCount(words);
  if (recomputed !== correctAnswer) {
    errors.push(
      `correctAnswer mismatch: expected ${recomputed}, got ${correctAnswer}`
    );
  }

  const recomputedLetters = computeCommonLetters(words);
  if (recomputedLetters.join("") !== commonLetters.join("")) {
    errors.push(`commonLetters mismatch`);
  }

  if (!question.toLowerCase().includes("how many")) {
    errors.push(`question missing "how many"`);
  }

  const NONE_STR = "None of the above";
  if (!Array.isArray(options)) {
    errors.push(`options not an array`);
  } else {
    if (new Set(options).size !== options.length)
      errors.push(`duplicate options`);
    if (!options.includes(NONE_STR)) errors.push(`"None of the above" missing`);
  }

  if (typeof correctLetter !== "string" || correctLetter.length !== 1) {
    errors.push(`correctLetter invalid`);
  } else {
    const idx = correctLetter.charCodeAt(0) - 65;
    if (idx < 0 || idx >= (options?.length || 0)) {
      errors.push(`correctLetter out of range`);
    } else {
      const expected = isNoneCorrect ? NONE_STR : String(correctAnswer);
      if (options[idx] !== expected) errors.push(`correctLetter points wrong`);
    }
  }

  const expectedText = isNoneCorrect ? NONE_STR : String(correctAnswer);
  if (correctAnswerText !== expectedText) {
    errors.push(`correctAnswerText mismatch`);
  }

  if (isNoneCorrect) {
    const numeric = options.filter((o) => o !== NONE_STR);
    if (numeric.includes(String(correctAnswer))) {
      errors.push(`isNoneCorrect=true but correct answer present`);
    }
  } else {
    if (!options.includes(String(correctAnswer))) {
      errors.push(`correct answer not in options`);
    }
  }

  return { ok: errors.length === 0, errors };
}

// -----------------------------------
// 🎯 Layout helpers
// -----------------------------------

function measureWord(ctx, word, fontSize) {
  ctx.font = `bold ${fontSize}px ${WORD_FONT_FAMILY}`;
  let width = 0;
  for (const ch of word) width += ctx.measureText(ch).width;
  return { width, height: fontSize };
}

function boxesOverlap(a, b, gap) {
  const ax0 = a.x - a.width / 2 - gap;
  const ax1 = a.x + a.width / 2 + gap;
  const ay0 = a.y - a.height / 2 - gap;
  const ay1 = a.y + a.height / 2 + gap;

  const bx0 = b.x - b.width / 2;
  const bx1 = b.x + b.width / 2;
  const by0 = b.y - b.height / 2;
  const by1 = b.y + b.height / 2;

  return !(ax1 <= bx0 || ax0 >= bx1 || ay1 <= by0 || ay0 >= by1);
}

// -----------------------------------
// ✅ 100% collision-proof grid layout
//    Each word gets its own cell. Font auto-scales down to fit.
//    No borders, no chip, just clean text.
// -----------------------------------

function chooseGridDims(n) {
  if (n <= 2) return { cols: 2, rows: 1 };
  if (n <= 3) return { cols: 3, rows: 1 };
  if (n <= 4) return { cols: 2, rows: 2 };
  if (n <= 6) return { cols: 3, rows: 2 };
  if (n <= 8) return { cols: 4, rows: 2 };
  if (n <= 9) return { cols: 3, rows: 3 };
  return { cols: 4, rows: 3 }; // 10 words
}

function computeGridLayout(ctx, words) {
  const n = words.length;
  const { cols, rows } = chooseGridDims(n);

  // ✅ Safe drawing area (with margins for header + footer)
  const safeLeft = PADDING_X + 8;
  const safeRight = IMG_WIDTH - PADDING_X - 8;
  const safeTop = PADDING_TOP + 12;
  const safeBottom = IMG_HEIGHT - PADDING_BOTTOM - 14;

  const safeWidth = safeRight - safeLeft;
  const safeHeight = safeBottom - safeTop;

  const cellW = safeWidth / cols;
  const cellH = safeHeight / rows;

  // ✅ Safety padding inside each cell (so words never touch cell borders)
  const cellPadX = 8;
  const cellPadY = 6;

  const maxTextW = cellW - cellPadX * 2;
  const maxTextH = cellH - cellPadY * 2;

  // ✅ Auto-scale font: find the largest size where EVERY word fits in its cell
  let fontSize = MAX_FONT_SIZE;
  while (fontSize > MIN_FONT_SIZE) {
    let fits = true;
    for (const w of words) {
      const m = measureWord(ctx, w, fontSize);
      if (m.width > maxTextW || m.height > maxTextH) {
        fits = false;
        break;
      }
    }
    if (fits) break;
    fontSize -= 1;
  }

  // Build positions
  const positions = [];
  for (let i = 0; i < n; i++) {
    const w = words[i];
    const m = measureWord(ctx, w, fontSize);

    const col = i % cols;
    const row = Math.floor(i / cols);

    const cx = safeLeft + col * cellW + cellW / 2;
    const cy = safeTop + row * cellH + cellH / 2;

    positions.push({
      x: cx,
      y: cy,
      width: m.width,
      height: m.height,
    });
  }

  return { fontSize, positions };
}

// -----------------------------------
// 🎨 Helper: rounded rectangle (still used for header + footer)
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
// 🌊 Ambient watermark — DISABLED
// -----------------------------------

function drawBlueWatermark(ctx) {
  // no-op
}

// -----------------------------------
// 🎨 Draw words — NO border, NO chip. Just clean glowing letters.
// -----------------------------------

function drawWords(ctx, words) {
  const { fontSize, positions } = computeGridLayout(ctx, words);

  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let wi = 0; wi < words.length; wi++) {
    const word = words[wi];
    const pos = positions[wi];

    // Measure letters at the final font size
    ctx.font = `bold ${fontSize}px ${WORD_FONT_FAMILY}`;
    const charWidths = [];
    let totalWidth = 0;
    for (const ch of word) {
      const cw = ctx.measureText(ch).width;
      charWidths.push(cw);
      totalWidth += cw;
    }

    // ✅ Center the whole word inside its cell (no border, no chip)
    let cursorX = pos.x - totalWidth / 2;

    for (let ci = 0; ci < word.length; ci++) {
      const ch = word[ci];
      const color = NEON_LETTERS[(wi * 3 + ci) % NEON_LETTERS.length];

      ctx.save();
      ctx.font = `bold ${fontSize}px ${WORD_FONT_FAMILY}`;
      ctx.fillStyle = color;
      ctx.shadowColor = color + "aa";
      ctx.shadowBlur = 5;
      ctx.fillText(ch, cursorX + charWidths[ci] / 2, pos.y + 0.5);
      ctx.restore();

      cursorX += charWidths[ci];
    }
  }

  ctx.restore();
}

function drawBottomRightWatermark(ctx, width, height, text, color) {
  ctx.save();
  ctx.font = `bold 12px Arial`;
  ctx.fillStyle = color;
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  ctx.fillText(text, width - 14, height - 11);
  ctx.restore();
}

// -----------------------------------
// Generate image — PREMIUM SMART UI
// -----------------------------------

function generateImage(words, watermarkOptions = {}) {
  const canvas = createCanvas(IMG_WIDTH, IMG_HEIGHT);
  const ctx = canvas.getContext("2d");

  // ============ PREMIUM BACKGROUND ============
  const bgGradient = ctx.createLinearGradient(0, 0, 0, IMG_HEIGHT);
  bgGradient.addColorStop(0, "#050b18");
  bgGradient.addColorStop(0.5, "#0b1530");
  bgGradient.addColorStop(1, "#050b18");
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, IMG_WIDTH, IMG_HEIGHT);

  // Ambient glow blobs
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

  // ============ HEADER STRIP ============
  const headerH = 26;
  const headerGradient = ctx.createLinearGradient(0, 0, IMG_WIDTH, 0);
  headerGradient.addColorStop(0, "#1d4ed8");
  headerGradient.addColorStop(0.5, "#7c3aed");
  headerGradient.addColorStop(1, "#1d4ed8");

  ctx.save();
  roundRect(ctx, 4, 4, IMG_WIDTH - 8, headerH, 12);
  ctx.clip();
  ctx.fillStyle = headerGradient;
  ctx.fillRect(4, 4, IMG_WIDTH - 8, headerH);

  const shine = ctx.createLinearGradient(0, 4, IMG_WIDTH, 4 + headerH);
  shine.addColorStop(0, "rgba(255,255,255,0.15)");
  shine.addColorStop(0.5, "rgba(255,255,255,0.02)");
  shine.addColorStop(1, "rgba(255,255,255,0.12)");
  ctx.fillStyle = shine;
  ctx.fillRect(4, 4, IMG_WIDTH - 8, headerH);
  ctx.restore();

  // Header label
  ctx.save();
  ctx.font = "bold 12px Arial";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText("Words", 16, 4 + headerH / 2);
  ctx.restore();

  // Decorative dots (right)
  ctx.save();
  const dotY = 4 + headerH / 2;
  const dotColors = ["#fde047", "#4ade80", "#60a5fa"];
  dotColors.forEach((c, i) => {
    ctx.beginPath();
    ctx.arc(IMG_WIDTH - 20 - i * 12, dotY, 3.2, 0, Math.PI * 2);
    ctx.fillStyle = c;
    ctx.fill();
  });
  ctx.restore();

  // ---- Draw words — clean, no borders, auto-fit ----
  drawWords(ctx, words);

  // ============ FOOTER — reserved for watermark ============
  const footerH = 22;
  ctx.save();
  ctx.strokeStyle = "rgba(148, 163, 184, 0.22)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(12, IMG_HEIGHT - footerH);
  ctx.lineTo(IMG_WIDTH - 12, IMG_HEIGHT - footerH);
  ctx.stroke();
  ctx.restore();

  if (watermarkOptions.enabled !== false) {
    const text = watermarkOptions.text || DEFAULT_WATERMARK_TEXT;
    const color = watermarkOptions.color || DEFAULT_WATERMARK_COLOR;
    drawBottomRightWatermark(ctx, IMG_WIDTH, IMG_HEIGHT, text, color);
  }

  return canvas.toDataURL().split(",")[1];
}

// -----------------------------------
// Main Function (UNCHANGED logic)
// -----------------------------------

export function generatePuzzle_commonLetters(options = {}) {
  try {
    const {
      words: customWords = null,
      wordCount = DEFAULT_WORDS,
      watermark = {},
      maxRetries = 30,
    } = options;

    let lastErrors = [];
    let finalPuzzle = null;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      let words;

      if (Array.isArray(customWords) && customWords.length >= MIN_WORDS) {
        words = customWords
          .map((w) => String(w).toLowerCase().replace(/[^a-z]/g, ""))
          .filter((w) => w.length >= 1);

        if (words.length < MIN_WORDS) {
          lastErrors = ["Not enough custom words"];
          continue;
        }
      } else {
        const n = parseInt(wordCount, 10);
        words = generateInterestingWordSet(isNaN(n) ? DEFAULT_WORDS : n);
      }

      if (words.length < MIN_WORDS) {
        lastErrors = ["Not enough words — retrying"];
        continue;
      }

      const commonLetters = computeCommonLetters(words);
      const correctAnswer = commonLetters.length;

      const mcq = generateNumberOptions(correctAnswer);

      const questionText = "How many letters exist in all words?";

      const verification = verifyPuzzle({
        words,
        correctAnswer,
        commonLetters,
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

      const imageData = generateImage(words, watermark);

      const debugAnswer = mcq.isNoneCorrect
        ? `None of the above (actual: ${correctAnswer} → [${commonLetters.join(", ")}])`
        : String(correctAnswer);

      const imageBase64 = imageData;
      const imageDataUri = `data:image/png;base64,${imageBase64}`;

      finalPuzzle = {
        title: "Common Letters Puzzle",
        question: questionText,
        words,
        wordCount: words.length,
        commonLetters,
        correctAnswer,
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
        debugCommonLetters: commonLetters,
        debugIsNoneCorrect: mcq.isNoneCorrect,
        debugCorrectLetter: mcq.correctLetter,

        detailedData: {
          words,
          commonLetters,
          correctAnswer,
          options: mcq.options,
          correctLetter: mcq.correctLetter,
          correctAnswerText: mcq.correctAnswer,
          isNoneCorrect: mcq.isNoneCorrect,
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
  rand,
  randFloat,
  computeCommonLetterCount,
  computeCommonLetters,
  generateWordSet,
  generateInterestingWordSet,
  generateNumberOptions,
  verifyPuzzle,
  measureWord,
  boxesOverlap,
  chooseGridDims,
  computeGridLayout,
  drawBlueWatermark,
  drawWords,
  drawBottomRightWatermark,
  generateImage,
  IMG_WIDTH,
  IMG_HEIGHT,
  MAX_FONT_SIZE,
  MIN_FONT_SIZE,
  MIN_WORDS,
  MAX_WORDS,
  DEFAULT_WORDS,
  NONE_CORRECT_PROBABILITY,
  MCQ_OPTION_COUNT,
  LETTER_COLORS,
  BACKGROUND_COLORS,
  WATERMARK_BLUE_COLORS,
  WATERMARK_WORDS,
  ALPHABET,
  WORD_POOL,
  CLEAN_WORDS,
};

export default {
  generatePuzzle_commonLetters,
  shuffle,
  rand,
  randFloat,
  computeCommonLetterCount,
  computeCommonLetters,
  generateWordSet,
  generateInterestingWordSet,
  generateNumberOptions,
  verifyPuzzle,
  measureWord,
  boxesOverlap,
  chooseGridDims,
  computeGridLayout,
  drawBlueWatermark,
  drawWords,
  drawBottomRightWatermark,
  generateImage,
  IMG_WIDTH,
  IMG_HEIGHT,
  MAX_FONT_SIZE,
  MIN_FONT_SIZE,
  MIN_WORDS,
  MAX_WORDS,
  DEFAULT_WORDS,
  NONE_CORRECT_PROBABILITY,
  MCQ_OPTION_COUNT,
  LETTER_COLORS,
  BACKGROUND_COLORS,
  WATERMARK_BLUE_COLORS,
  WATERMARK_WORDS,
  ALPHABET,
  WORD_POOL,
  CLEAN_WORDS,
};

// -----------------------------------
// CLI usage
// -----------------------------------

if (import.meta.url === `file://${process.argv[1]}`) {
  const puzzle = generatePuzzle_commonLetters({
    wordCount: 8,
    watermark: { enabled: true, text: "powered by AVI" },
  });

  console.log("\n🧩 Common Letters Puzzle");
  console.log("Question:", puzzle.question);
  console.log("Words:", puzzle.words.join(", "));
  console.log("Common letters:", puzzle.commonLetters.join(", "));
  console.log("Correct count:", puzzle.correctAnswer);
  console.log("Options:", puzzle.options);
  console.log("Correct:", puzzle.correctLetter, "-", puzzle.correctAnswer);
  console.log("\n🖼️  Base64 image length:", puzzle.image.length, "chars");
  console.log("🔗 Data URI prefix:", puzzle.imageDataUri.slice(0, 60) + "...");
}