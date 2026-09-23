// orderWordsPuzzle.js
// Node.js version — premium UI, base64 image output
// Canvas: 400 x 250 — glowing word cards + reserved footer
// Header text REMOVED. Puzzle logic UNCHANGED.
// Run: node orderWordsPuzzle.js

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

const COMMON_PREFIXES = ["Avi", "Kr", "Da", "Ki", "Me", "Sh", "Vi", "Ps", "Ka"];

function generateRandomWord(minLength = 4, maxLength = 7) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const len = rand(minLength, maxLength);

  if (Math.random() < 0.8) {
    const prefix = getRandom(COMMON_PREFIXES);
    const suffixLength = Math.max(1, len - prefix.length);
    let suffix = "";
    for (let i = 0; i < suffixLength; i++) {
      suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return prefix.charAt(0).toUpperCase() + prefix.slice(1) + suffix;
  } else {
    let word = "";
    for (let i = 0; i < len; i++) {
      word += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}

function generateWordFamily() {
  const prefix = getRandom(COMMON_PREFIXES);
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const count = rand(2, 3);
  const words = [];

  for (let i = 0; i < count; i++) {
    const len = rand(7, 10);
    const suffixLength = Math.max(1, len - prefix.length);

    let suffix = "";
    for (let j = 0; j < suffixLength; j++) {
      suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
    }

    words.push(prefix.charAt(0).toUpperCase() + prefix.slice(1) + suffix);
  }

  return words;
}

function generateOrderData(wordCount = 4) {
  const words = [];
  const usedWords = new Set();

  const hasFamily = Math.random() < 0.8 || wordCount > 3;

  if (hasFamily) {
    const familyWords = generateWordFamily();
    for (const word of familyWords) {
      if (words.length < wordCount && !usedWords.has(word)) {
        usedWords.add(word);
        words.push(word);
      }
    }
  }

  while (words.length < wordCount) {
    let word = generateRandomWord();
    let attempts = 0;
    while (usedWords.has(word) && attempts < 20) {
      word = generateRandomWord();
      attempts++;
    }
    usedWords.add(word);
    words.push(word);
  }

  const sortedWords = [...words].sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase())
  );
  const correctOrder = sortedWords.map((word) => words.indexOf(word) + 1).join("");

  shuffle(words);
  const finalCorrectOrder = sortedWords
    .map((word) => words.indexOf(word) + 1)
    .join("");

  return { words, sortedWords, correctOrder: finalCorrectOrder };
}

function generateOptions(correctAnswer) {
  const allPermutations = [];
  const generatePermutations = (prefix, remaining) => {
    if (remaining.length === 0) {
      allPermutations.push(prefix);
      return;
    }
    for (let i = 0; i < remaining.length; i++) {
      generatePermutations(
        prefix + remaining[i],
        remaining.slice(0, i) + remaining.slice(i + 1)
      );
    }
  };

  const numChars = correctAnswer.length;
  const numString = Array.from({ length: numChars }, (_, i) =>
    (i + 1).toString()
  ).join("");
  generatePermutations("", numString);

  function getSwapDistance(str1, str2) {
    let distance = 0;
    for (let i = 0; i < str1.length; i++) {
      if (str1[i] !== str2[i]) distance++;
    }
    return distance;
  }

  const confusingOptions = allPermutations
    .filter((opt) => opt !== correctAnswer)
    .sort((a, b) => {
      const distA = getSwapDistance(correctAnswer, a);
      const distB = getSwapDistance(correctAnswer, b);
      return distA - distB;
    });

  const isNoneOfTheAboveCorrect = Math.random() < 0.3;

  let options = [];
  let actualCorrectAnswer = "";

  if (isNoneOfTheAboveCorrect) {
    const wrongOptions = confusingOptions.slice(0, 5);
    options = [...wrongOptions, "None of the above"];
    shuffle(options);
    actualCorrectAnswer = "None of the above";
  } else {
    const wrongOptions = confusingOptions.slice(0, 5);
    options = [correctAnswer, ...wrongOptions, "None of the above"];
    shuffle(options);
    actualCorrectAnswer = correctAnswer;
  }

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
// Helper: darken/lighten a hex color
// -----------------------------------

function shadeColor(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);
  let r = (num >> 16) + Math.round((percent / 100) * 255);
  let g = ((num >> 8) & 0x00ff) + Math.round((percent / 100) * 255);
  let b = (num & 0x0000ff) + Math.round((percent / 100) * 255);
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

// -----------------------------------
// Main Function — PREMIUM UI
// Header text REMOVED
// Puzzle logic UNCHANGED
// -----------------------------------

export function generatePuzzle_orderWords(options = {}) {
  try {
    const {
      wordCount = 4,
      width = 400,
      height = 250,
      showWatermark = false,
      watermarkText = "",
    } = options;

    const finalCount = Math.max(2, Math.min(wordCount, 6));

    const { words, sortedWords, correctOrder } = generateOrderData(finalCount);
    const mcq = generateOptions(correctOrder);

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

    // Ambient glow blobs for depth
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

    // Shine sweep
    const shine = ctx.createLinearGradient(0, 4, width, 4 + headerH);
    shine.addColorStop(0, "rgba(255,255,255,0.15)");
    shine.addColorStop(0.5, "rgba(255,255,255,0.02)");
    shine.addColorStop(1, "rgba(255,255,255,0.12)");
    ctx.fillStyle = shine;
    ctx.fillRect(4, 4, width - 8, headerH);
    ctx.restore();

    // ❌ REMOVED: header text "ALPHABETICAL ORDER"

    // Decorative dots — centered on the header strip
    ctx.save();
    const dotY = 4 + headerH / 2;
    const dotColors = ["#fde047", "#4ade80", "#60a5fa"];
    const dotSpacing = 14;
    const dotsTotalWidth = dotSpacing * (dotColors.length - 1);
    const dotsStartX = (width - dotsTotalWidth) / 2;
    dotColors.forEach((c, i) => {
      // glow halo
      ctx.save();
      ctx.globalAlpha = 0.35;
      ctx.beginPath();
      ctx.arc(dotsStartX + i * dotSpacing, dotY, 6, 0, Math.PI * 2);
      ctx.fillStyle = c;
      ctx.fill();
      ctx.restore();

      // core dot
      ctx.beginPath();
      ctx.arc(dotsStartX + i * dotSpacing, dotY, 3.4, 0, Math.PI * 2);
      ctx.fillStyle = c;
      ctx.fill();
    });
    ctx.restore();

    // ============ WORD CARDS ============
    const footerH = showWatermark ? 22 : 0;
    const gridTop = headerH + 14;
    const gridBottom = height - footerH - 8;

    const availableHeight = gridBottom - gridTop;
    const lineHeight = Math.min(40, Math.floor(availableHeight / finalCount));
    const cardH = lineHeight - 6;
    const totalHeight = finalCount * lineHeight;
    const centerY = gridTop + (availableHeight - totalHeight) / 2;

    const badgeColors = [
      "#f97316",
      "#22d3ee",
      "#a78bfa",
      "#34d399",
      "#f472b6",
    ];

    words.forEach((item, index) => {
      const y = centerY + index * lineHeight + lineHeight / 2;
      const cardX = 16;
      const cardW = width - 32;
      const cardY = y - cardH / 2;

      // ---- Card background ----
      ctx.save();
      const cardGrad = ctx.createLinearGradient(
        cardX,
        cardY,
        cardX,
        cardY + cardH
      );
      cardGrad.addColorStop(0, "#182338");
      cardGrad.addColorStop(1, "#0b1220");

      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 2;

      ctx.fillStyle = cardGrad;
      roundRect(ctx, cardX, cardY, cardW, cardH, 10);
      ctx.fill();
      ctx.restore();

      // ---- Card border ----
      ctx.save();
      ctx.strokeStyle = "rgba(148, 163, 184, 0.28)";
      ctx.lineWidth = 1;
      roundRect(ctx, cardX, cardY, cardW, cardH, 10);
      ctx.stroke();
      ctx.restore();

      // ---- Numbered badge (left side) ----
      const badgeSize = Math.min(26, cardH - 8);
      const badgeX = cardX + 10;
      const badgeY = y - badgeSize / 2;
      const badgeColor = badgeColors[index % badgeColors.length];

      // Badge glow
      ctx.save();
      ctx.shadowColor = badgeColor + "aa";
      ctx.shadowBlur = 10;

      const badgeGrad = ctx.createLinearGradient(
        badgeX,
        badgeY,
        badgeX,
        badgeY + badgeSize
      );
      badgeGrad.addColorStop(0, badgeColor);
      badgeGrad.addColorStop(1, shadeColor(badgeColor, -25));

      ctx.fillStyle = badgeGrad;
      roundRect(ctx, badgeX, badgeY, badgeSize, badgeSize, 8);
      ctx.fill();
      ctx.restore();

      // Badge border
      ctx.save();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
      ctx.lineWidth = 1;
      roundRect(ctx, badgeX, badgeY, badgeSize, badgeSize, 8);
      ctx.stroke();
      ctx.restore();

      // Badge glossy top highlight
      ctx.save();
      ctx.globalAlpha = 0.32;
      ctx.fillStyle = "#ffffff";
      roundRect(
        ctx,
        badgeX + 2,
        badgeY + 1.5,
        badgeSize - 4,
        badgeSize * 0.42,
        6
      );
      ctx.fill();
      ctx.restore();

      // Badge number
      ctx.fillStyle = "#ffffff";
      ctx.font = `bold ${Math.max(11, Math.floor(badgeSize * 0.5))}px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        String(index + 1),
        badgeX + badgeSize / 2,
        badgeY + badgeSize / 2 + 0.5
      );

      // ---- Word text ----
      ctx.fillStyle = "#f1f5f9";
      ctx.font = 'bold 17px "Courier New", monospace';
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(item, badgeX + badgeSize + 14, y + 0.5);

      // ---- Small right-side chevron (decorative) ----
      ctx.save();
      ctx.strokeStyle = "rgba(148, 163, 184, 0.5)";
      ctx.lineWidth = 1.6;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      const chevX = cardX + cardW - 14;
      ctx.beginPath();
      ctx.moveTo(chevX - 4, y - 5);
      ctx.lineTo(chevX + 1, y);
      ctx.lineTo(chevX - 4, y + 5);
      ctx.stroke();
      ctx.restore();
    });

    // ============ FOOTER — reserved for watermark ============
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
      ctx.font = "bold 12px Arial";
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText(watermarkText, width - 12, footerY + footerH / 2);
      ctx.restore();
    }

    // -----------------------------------
    // Return JSON data (shape UNCHANGED + imageDataUri added)
    // -----------------------------------
    const imageBase64 = canvas.toDataURL().split(",")[1];

    return {
      title: "Alphabetical Order Puzzle",
      question: `What is the correct alphabetical order of these words?`,
      options: mcq.options,
      correctLetter: mcq.correctLetter,
      correctAnswer: mcq.correctAnswer,

      // ✅ Base64 outputs
      image: imageBase64,
      imageDataUri: `data:image/png;base64,${imageBase64}`,

      hasNoneOfTheAbove: true,
      isNoneOfTheAboveCorrect: mcq.isNoneOfTheAboveCorrect,
      totalWords: finalCount,
      shuffledWords: words,
      sortedWords: sortedWords,
      correctOrder: correctOrder,
      detailedData: {
        words: words,
        sortedWords: sortedWords,
        correctOrder: correctOrder,
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
  getRandom,
  rand,
  generateRandomWord,
  generateWordFamily,
  generateOrderData,
  generateOptions,
};

export default {
  generatePuzzle_orderWords,
  shuffle,
  getRandom,
  rand,
  generateRandomWord,
  generateWordFamily,
  generateOrderData,
  generateOptions,
};

// -----------------------------------
// CLI usage
// -----------------------------------

if (import.meta.url === `file://${process.argv[1]}`) {
  const puzzle = generatePuzzle_orderWords({
    wordCount: 4,
    width: 400,
    height: 250,
    showWatermark: true,
    watermarkText: "powered by AVI",
  });

  console.log("\n🧩 Alphabetical Order Puzzle");
  console.log("Question:", puzzle.question);
  console.log("Options:", puzzle.options);
  console.log("Correct:", puzzle.correctLetter, "-", puzzle.correctAnswer);
  console.log("Words:", puzzle.shuffledWords);
  console.log("Sorted:", puzzle.sortedWords);
  console.log("Correct order:", puzzle.correctOrder);
  console.log("\n🖼️  Base64 image length:", puzzle.image.length, "chars");
  console.log("🔗 Data URI prefix:", puzzle.imageDataUri.slice(0, 60) + "...");
}