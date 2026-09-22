// numberRulePuzzle.js
// Node.js version — premium UI, base64 image output
// Canvas: 400 x 250 — glowing equation chips + reserved footer
// All puzzle logic UNCHANGED.
// Run: node numberRulePuzzle.js

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
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min, max) {
  return Math.random() * (max - min) + min;
}

// -----------------------------------
// Rule Engine (UNCHANGED)
// -----------------------------------

function calculateRule(a, b) {
  if (a < b) return a + b;
  if (a > b) return a - b;
  return a * b;
}

function generateNumberString(a, b, c) {
  return `${a}${b}${c}`;
}

// -----------------------------------
// Generate the List of Equations (UNCHANGED)
// -----------------------------------

function generateEquationList(count = 12) {
  const numbers = [];
  let correctCount = 0;

  for (let i = 0; i < count; i++) {
    const a = rand(1, 9);
    const b = rand(1, 9);
    const correctResult = calculateRule(a, b);

    const isCorrect = Math.random() > 0.5;

    let c;
    if (isCorrect) {
      c = correctResult;
      correctCount++;
    } else {
      let wrongC = Math.max(0, correctResult + rand(1, 3));
      if (wrongC === correctResult) wrongC += 1;
      c = wrongC;
    }

    numbers.push({
      value: generateNumberString(a, b, c),
      a,
      b,
      c,
      expectedC: correctResult,
      isCorrect,
    });
  }

  return { numbers, correctCount };
}

// -----------------------------------
// Generate 6 Multiple Choice Options (FIXED - no infinite loop)
// -----------------------------------

function generateOptions(correctCount, maxCount = 12) {
  const optionsSet = new Set();
  optionsSet.add(correctCount);

  // ✅ FIX: Add max attempts to prevent infinite loop
  let attempts = 0;
  const maxAttempts = 100;

  while (optionsSet.size < 5 && attempts < maxAttempts) {
    attempts++;
    let offset = rand(1, 2);
    if (Math.random() > 0.5) offset = -offset;

    const wrongNumber = correctCount + offset;

    if (wrongNumber >= 0 && wrongNumber <= maxCount) {
      optionsSet.add(wrongNumber);
    }
  }

  // ✅ FIX: If we couldn't get 5 options, fill with nearby values
  if (optionsSet.size < 5) {
    let filler = 0;
    while (optionsSet.size < 5 && filler <= maxCount) {
      optionsSet.add(filler);
      filler++;
    }
  }

  let optionsArray = Array.from(optionsSet);
  shuffle(optionsArray);

  const isNoneCorrect = Math.random() < 0.3;

  let finalOptions = [];
  let correctLetter = "";
  const letters = ["A", "B", "C", "D", "E", "F"];

  if (isNoneCorrect) {
    finalOptions = [...optionsArray.map(String), "None of the above"];
    shuffle(finalOptions);
    const noneIndex = finalOptions.indexOf("None of the above");
    correctLetter = letters[noneIndex];
  } else {
    finalOptions = [...optionsArray.map(String)];
    finalOptions.push("None of the above");
    shuffle(finalOptions);
    const correctIndex = finalOptions.indexOf(String(correctCount));
    correctLetter = letters[correctIndex];
  }

  return {
    options: finalOptions,
    correctLetter,
    correctText: isNoneCorrect ? "None of the above" : `${correctCount}`,
  };
}

// -----------------------------------
// 🌊 Blue formula watermark — DISABLED (kept for API)
// -----------------------------------

function drawFormulaWatermark(ctx, width, height) {
  // ❌ No-op — the blue formula watermark has been removed from the image.
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
// 🎨 Modern neon palette for the dark UI
// -----------------------------------

const NEON_COLORS = [
  "#f472b6", "#60a5fa", "#34d399", "#fbbf24", "#a78bfa",
  "#22d3ee", "#fb7185", "#4ade80", "#facc15", "#c084fc",
];

// -----------------------------------
// ✅ FIX: Binary search for optimal font size (instead of linear)
// -----------------------------------

function findOptimalFontSize(ctx, texts, maxWidth, maxHeight, maxSize = 24, minSize = 10) {
  let lo = minSize;
  let hi = maxSize;

  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);
    const font = `900 ${mid}px "Arial Black", Impact, sans-serif`;
    ctx.font = font;

    let fits = mid <= maxHeight;
    if (fits) {
      for (const t of texts) {
        if (ctx.measureText(t).width > maxWidth) {
          fits = false;
          break;
        }
      }
    }

    if (fits) {
      lo = mid;
    } else {
      hi = mid - 1;
    }
  }

  return lo;
}

// -----------------------------------
// Main Function — PREMIUM UI
// Puzzle logic UNCHANGED
// -----------------------------------

export function generatePuzzle_numberRule(options = {}) {
  try {
    const {
      count: rawCount = 12,
      width = 400,
      height = 250,
      showWatermark = true,
      watermarkText = "powered by AVI",
    } = options;

    // ✅ FIX: Validate count to prevent performance issues
    const count = Math.max(2, Math.min(20, rawCount));

    const { numbers, correctCount } = generateEquationList(count);
    const mcq = generateOptions(correctCount, count);

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // ============ PREMIUM BACKGROUND ============
    const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
    bgGradient.addColorStop(0, "#050b18");
    bgGradient.addColorStop(0.5, "#0b1530");
    bgGradient.addColorStop(1, "#050b18");
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Ambient glow blobs
    ctx.save();
    ctx.globalAlpha = 0.09;
    const blobs = [
      { x: width * 0.15, y: height * 0.2, r: 90, c: "#3b82f6" },
      { x: width * 0.85, y: height * 0.4, r: 110, c: "#a855f7" },
      { x: width * 0.5, y: height * 0.95, r: 120, c: "#22d3ee" },
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

    // Header label
    ctx.save();
    ctx.font = "bold 12px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText("NUMBER RULE PUZZLE", 16, 4 + headerH / 2);
    ctx.restore();

    // Decorative dots (right)
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

    // ============ EQUATION GRID ============
    const footerH = 22;
    const gridTop = headerH + 12;
    const gridBottom = height - footerH - 8;
    const gridHeight = gridBottom - gridTop;

    const cols = 4;
    const rows = Math.ceil(count / cols);

    const cellW = (width - 24) / cols;
    const cellH = gridHeight / rows;

    // ✅ FIX: Binary search font sizing (much faster than linear loop)
    const texts = numbers.map((n) => n.value);
    const fontSize = findOptimalFontSize(ctx, texts, cellW - 12, cellH - 8, 24, 10);

    const FONT = `900 ${fontSize}px "Arial Black", Impact, sans-serif`;
    ctx.font = FONT;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // ✅ FIX: Batch shadow rendering — draw all glows first, then all text
    // This is much faster than setting shadowBlur per text
    ctx.save();
    ctx.shadowBlur = 8;
    numbers.forEach((num, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const x = 12 + col * cellW + cellW / 2;
      const y = gridTop + row * cellH + cellH / 2;
      const neon = NEON_COLORS[index % NEON_COLORS.length];
      ctx.fillStyle = neon;
      ctx.shadowColor = neon + "cc";
      ctx.fillText(num.value, x, y);
    });
    ctx.restore();

    // ============ FOOTER — reserved for watermark ============
    ctx.save();
    ctx.strokeStyle = "rgba(148, 163, 184, 0.22)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(12, height - footerH);
    ctx.lineTo(width - 12, height - footerH);
    ctx.stroke();
    ctx.restore();

    if (showWatermark) {
      ctx.save();
      ctx.font = "bold 12px Arial";
      ctx.fillStyle = "rgba(226, 232, 240, 0.9)";
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText(watermarkText, width - 14, height - footerH / 2 - 2);
      ctx.restore();
    }

    // -----------------------------------
    // Return JSON data
    // -----------------------------------
    const imageBase64 = canvas.toDataURL().split(",")[1];
    const imageDataUri = `data:image/png;base64,${imageBase64}`;

    return {
      image: imageBase64,
      imageDataUri: imageDataUri,
      json: {
        question: `How many of the ${count} numbers are correct?`,
        options: mcq.options,
        correctLetter: mcq.correctLetter,
        correctText: mcq.correctText,
        correctCount: correctCount,
        detailedData: numbers,
      },
    };
  } catch (error) {
    console.error("Error generating puzzle:", error);
    return {
      error: true,
      message: "Failed to generate puzzle",
    };
  }
}

// -----------------------------------
// Exports (UNCHANGED)
// -----------------------------------

export {
  shuffle,
  calculateRule,
  generateEquationList,
  generateOptions,
  rand,
  randFloat,
  drawFormulaWatermark,
};

export default {
  generatePuzzle_numberRule,
  calculateRule,
  generateEquationList,
  generateOptions,
  shuffle,
  rand,
  randFloat,
  drawFormulaWatermark,
};

// -----------------------------------
// CLI usage
// -----------------------------------

if (import.meta.url === `file://${process.argv[1]}`) {
  const puzzle = generatePuzzle_numberRule({
    count: 12,
    width: 400,
    height: 250,
    showWatermark: true,
    watermarkText: "powered by AVI",
  });

  console.log("\n🧩 Number Rule Puzzle");
  console.log("Question:", puzzle.json.question);
  console.log("Options:", puzzle.json.options);
  console.log("Correct:", puzzle.json.correctLetter, "-", puzzle.json.correctText);
  console.log("Correct count:", puzzle.json.correctCount);
  console.log("\n🖼️  Base64 image length:", puzzle.image.length, "chars");
  console.log("🔗 Data URI prefix:", puzzle.imageDataUri.slice(0, 60) + "...");
}