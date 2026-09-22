// vowelConsonantPuzzle.js
// Node.js version — premium UI, base64 image output
// Canvas: 400 x 250 — collision-proof auto grid + reserved footer
// Puzzle logic UNCHANGED. Fix: no chip can ever overlap another.
// Run: node vowelConsonantPuzzle.js

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
// Puzzle logic (UNCHANGED)
// -----------------------------------

function generateRandomString(minLength = 4, maxLength = 9) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const len = rand(minLength, maxLength);
  let word = "";
  for (let i = 0; i < len; i++) {
    word += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return word;
}

function calculateVowelConsonantRatio(word) {
  const vowels = "aeiou";
  let vowelCount = 0;
  let consonantCount = 0;

  for (let char of word) {
    if (vowels.includes(char)) {
      vowelCount++;
    } else {
      consonantCount++;
    }
  }

  return `${vowelCount}:${consonantCount}`;
}

// ✅ Now accepts minWordLength / maxWordLength
function generateWordData(wordCount = 5, minWordLength = 4, maxWordLength = 9) {
  const words = [];
  const usedWords = new Set();
  let correctCount = 0;

  for (let i = 0; i < wordCount; i++) {
    let word = generateRandomString(minWordLength, maxWordLength);
    let attempts = 0;
    while (usedWords.has(word) && attempts < 20) {
      word = generateRandomString(minWordLength, maxWordLength);
      attempts++;
    }
    usedWords.add(word);

    const correctRatio = calculateVowelConsonantRatio(word);

    const isCorrect = Math.random() > 0.5;
    let displayedRatio;

    if (isCorrect) {
      displayedRatio = correctRatio;
      correctCount++;
    } else {
      let wrongVowelCount = rand(0, word.length);
      let wrongConsonantCount = word.length - wrongVowelCount;

      displayedRatio = `${wrongVowelCount}:${wrongConsonantCount}`;

      let attempts = 0;
      while (displayedRatio === correctRatio && attempts < 10) {
        wrongVowelCount = rand(0, word.length);
        wrongConsonantCount = word.length - wrongVowelCount;
        displayedRatio = `${wrongVowelCount}:${wrongConsonantCount}`;
        attempts++;
      }

      if (displayedRatio === correctRatio) {
        wrongVowelCount = Math.min(word.length, wrongVowelCount + 1);
        wrongConsonantCount = word.length - wrongVowelCount;
        displayedRatio = `${wrongVowelCount}:${wrongConsonantCount}`;
      }
    }

    words.push({
      word: word,
      correctRatio: correctRatio,
      displayedRatio: displayedRatio,
      isCorrect: isCorrect,
    });
  }

  return { words, correctCount };
}

function generateOptionsForNumber(correctCount, maxValue = 5) {
  const isNoneOfTheAboveCorrect = Math.random() < 0.3;

  let pool = [];
  for (let i = 0; i <= maxValue; i++) {
    if (i !== correctCount) pool.push(i);
  }

  shuffle(pool);
  const selectedWrong = pool.slice(0, 5);

  const actualCorrectAnswer = isNoneOfTheAboveCorrect
    ? "None of the above"
    : correctCount.toString();

  let options = [actualCorrectAnswer, ...selectedWrong.map(String)];
  shuffle(options);

  const noneIdx = options.indexOf("None of the above");
  if (noneIdx !== -1) options.splice(noneIdx, 1);
  options.push("None of the above");

  const letters = ["A", "B", "C", "D", "E", "F"];
  const correctIndex = options.indexOf(actualCorrectAnswer);
  const correctLetter = letters[correctIndex];

  return {
    options,
    correctLetter,
    correctAnswer: actualCorrectAnswer,
    isNoneOfTheAboveCorrect,
  };
}

function checkCollision(x, y, width, height, placedItems) {
  return placedItems.some((item) => {
    return (
      x < item.x + item.width &&
      x + width > item.x &&
      y < item.y + item.height &&
      y + height > item.y
    );
  });
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
// 📐 Smart grid layout — collision-proof
// -----------------------------------

function layoutChips(ctx, words, chipH, chipPadLeft, chipPadRight, chipGapX, maxRowWidth) {
  const chipWidths = words.map((item) => {
    ctx.font = 'bold 16px "Courier New", monospace';
    const wordW = ctx.measureText(item.word).width;
    ctx.font = 'bold 18px "Courier New", monospace';
    const ratioW = ctx.measureText(` ${item.displayedRatio}`).width;
    return Math.ceil(chipPadLeft + wordW + ratioW + chipPadRight);
  });

  const rows = [];
  let current = [];
  let currentW = 0;

  for (let i = 0; i < chipWidths.length; i++) {
    const w = chipWidths[i];
    const extra = current.length === 0 ? w : w + chipGapX;
    if (currentW + extra > maxRowWidth && current.length > 0) {
      rows.push(current);
      current = [i];
      currentW = w;
    } else {
      current.push(i);
      currentW += extra;
    }
  }
  if (current.length) rows.push(current);

  return { rows, chipWidths };
}

// -----------------------------------
// Main Function — PREMIUM UI
// -----------------------------------

export function generatePuzzle_vowelConsonant(options = {}) {
  try {
    const {
      wordCount = 5,
      minWordLength = 4,   // ✅ NEW
      maxWordLength = 9,   // ✅ NEW
      width = 400,
      height = 250,
      showWatermark = false,
      watermarkText = "",
    } = options;

    // ✅ Validate lengths so min <= max
    const safeMinLen = Math.max(1, Math.min(minWordLength, maxWordLength));
    const safeMaxLen = Math.max(safeMinLen, Math.min(maxWordLength, 20));

    const finalCount = Math.max(1, Math.min(wordCount, 5));

    const { words, correctCount } = generateWordData(
      finalCount,
      safeMinLen,
      safeMaxLen
    );
    const mcq = generateOptionsForNumber(correctCount, finalCount);

    // ---------------- CANVAS ----------------
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // ============ PREMIUM BACKGROUND ============
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#0b1220");
    gradient.addColorStop(0.5, "#111c33");
    gradient.addColorStop(1, "#0b1220");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Ambient glow blobs
    ctx.save();
    ctx.globalAlpha = 0.08;
    const blobs = [
      { x: width * 0.15, y: height * 0.2, r: 80, c: "#3b82f6" },
      { x: width * 0.85, y: height * 0.4, r: 100, c: "#a855f7" },
      { x: width * 0.5, y: height * 0.95, r: 110, c: "#22d3ee" },
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

    // ============ HEADER STRIP (no text) ============
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

    // Decorative dots — centered
    ctx.save();
    const dotY = 4 + headerH / 2;
    const dotColors = ["#fde047", "#4ade80", "#60a5fa"];
    const dotSpacing = 14;
    const dotsTotalWidth = dotSpacing * (dotColors.length - 1);
    const dotsStartX = (width - dotsTotalWidth) / 2;
    dotColors.forEach((c, i) => {
      ctx.beginPath();
      ctx.arc(dotsStartX + i * dotSpacing, dotY, 3.4, 0, Math.PI * 2);
      ctx.fillStyle = c;
      ctx.fill();
      ctx.save();
      ctx.globalAlpha = 0.35;
      ctx.beginPath();
      ctx.arc(dotsStartX + i * dotSpacing, dotY, 6, 0, Math.PI * 2);
      ctx.fillStyle = c;
      ctx.fill();
      ctx.restore();
    });
    ctx.restore();

    // ============ WORD CHIPS — COLLISION-PROOF GRID ============
    const footerH = showWatermark ? 22 : 0;

    const safeTop = headerH + 12;
    const safeBottom = height - footerH - 8;
    const safeLeft = 8;
    const safeRight = width - 8;
    const safeWidth = safeRight - safeLeft;
    const safeHeight = safeBottom - safeTop;

    const chipH = 32;
    const chipPadLeft = 14;
    const chipPadRight = 16;
    const dotGap = 8;
    const chipGapX = 10;
    const rowGap = 10;

    const { rows, chipWidths } = layoutChips(
      ctx,
      words,
      chipH,
      chipPadLeft,
      chipPadRight,
      chipGapX,
      safeWidth
    );

    const totalStackH = rows.length * chipH + (rows.length - 1) * rowGap;
    const startY = safeTop + (safeHeight - totalStackH) / 2;

    rows.forEach((rowIndices, rowIdx) => {
      const rowTotalW =
        rowIndices.reduce((sum, i) => sum + chipWidths[i], 0) +
        chipGapX * (rowIndices.length - 1);

      let cursorX = safeLeft + (safeWidth - rowTotalW) / 2;
      const y = startY + rowIdx * (chipH + rowGap);
      const chipY = y;

      rowIndices.forEach((wordIdx) => {
        const item = words[wordIdx];
        const chipW = chipWidths[wordIdx];
        const chipX = cursorX;

        // Chip background
        ctx.save();
        const chipGrad = ctx.createLinearGradient(chipX, chipY, chipX, chipY + chipH);
        chipGrad.addColorStop(0, "#182338");
        chipGrad.addColorStop(1, "#0b1220");

        ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 2;

        ctx.fillStyle = chipGrad;
        roundRect(ctx, chipX, chipY, chipW, chipH, 8);
        ctx.fill();
        ctx.restore();

        // Chip border
        ctx.save();
        ctx.strokeStyle = "rgba(253, 224, 71, 0.35)";
        ctx.lineWidth = 1;
        roundRect(ctx, chipX, chipY, chipW, chipH, 8);
        ctx.stroke();
        ctx.restore();

        // Left accent dot
        const dotCx = chipX + chipPadLeft;
        const dotCy = chipY + chipH / 2;

        ctx.save();
        ctx.fillStyle = "#60a5fa";
        ctx.shadowColor = "#60a5fa";
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(dotCx, dotCy, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Word text
        const textStartX = dotCx + dotGap;
        const textY = chipY + chipH / 2 + 0.5;

        ctx.font = 'bold 16px "Courier New", monospace';
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#e2e8f0";
        ctx.fillText(item.word, textStartX, textY);

        // Ratio text
        const wordW = ctx.measureText(item.word).width;
        ctx.font = 'bold 18px "Courier New", monospace';
        ctx.fillStyle = "#fde047";
        ctx.fillText(` ${item.displayedRatio}`, textStartX + wordW, textY);

        cursorX += chipW + chipGapX;
      });
    });

    // ============ FOOTER ============
    if (showWatermark) {
      const footerY = height - footerH;

      ctx.save();
      ctx.strokeStyle = "rgba(148, 163, 184, 0.18)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(10, footerY);
      ctx.lineTo(width - 10, footerY);
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.fillStyle = "rgba(226, 232, 240, 0.85)";
      ctx.font = "italic 11px Arial";
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText(watermarkText, width - 12, footerY + footerH / 2);
      ctx.restore();
    }

    // -----------------------------------
    // Return JSON data
    // -----------------------------------
    const imageBase64 = canvas.toDataURL().split(",")[1];

    return {
      title: "Vowel & Consonant Ratio Puzzle",
      question: `How many words have the correct Vowel:Consonant ratio?`,
      options: mcq.options,
      correctLetter: mcq.correctLetter,
      correctAnswer: mcq.correctAnswer,

      image: imageBase64,
      imageDataUri: `data:image/png;base64,${imageBase64}`,

      hasNoneOfTheAbove: true,
      isNoneOfTheAboveCorrect: mcq.isNoneOfTheAboveCorrect,
      correctCount: correctCount,
      totalWords: finalCount,
      minWordLength: safeMinLen,   // ✅ echoed back
      maxWordLength: safeMaxLen,   // ✅ echoed back
      detailedData: words,
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
  getRandom,
  rand,
  generateRandomString,
  calculateVowelConsonantRatio,
  generateWordData,
  generateOptionsForNumber,
  checkCollision,
};

export default {
  generatePuzzle_vowelConsonant,
  shuffle,
  getRandom,
  rand,
  generateRandomString,
  calculateVowelConsonantRatio,
  generateWordData,
  generateOptionsForNumber,
};

// -----------------------------------
// CLI usage
// -----------------------------------

if (import.meta.url === `file://${process.argv[1]}`) {
  const puzzle = generatePuzzle_vowelConsonant({
    wordCount: 5,
    minWordLength: 5,   // ✅ control min letters
    maxWordLength: 7,   // ✅ control max letters
    width: 400,
    height: 250,
    showWatermark: true,
    watermarkText: "powered by AVI",
  });

  console.log("\n🧩 Vowel & Consonant Ratio Puzzle");
  console.log("Question:", puzzle.question);
  console.log("Options:", puzzle.options);
  console.log("Correct:", puzzle.correctLetter, "-", puzzle.correctAnswer);
  console.log("Correct count:", puzzle.correctCount, "/", puzzle.totalWords);
  console.log("Word length range:", puzzle.minWordLength, "-", puzzle.maxWordLength);
  console.log("\n🖼️  Base64 image length:", puzzle.image.length, "chars");
  console.log("🔗 Data URI prefix:", puzzle.imageDataUri.slice(0, 60) + "...");
}