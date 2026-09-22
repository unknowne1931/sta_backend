import { createCanvas } from "canvas";

// -----------------------------------
// Configuration
// -----------------------------------

const IMG_WIDTH = 500;
const IMG_HEIGHT = 280;

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
// Generate Random Alphabets (all 26 in random order)
// -----------------------------------

function generateRandomAlphabets() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  return shuffle(letters);
}

// -----------------------------------
// Generate Random Letters (from full alphabet — fallback only)
// -----------------------------------

function generateRandomLetters(count) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  const used = new Set();

  while (result.length < count) {
    const letter = alphabet[rand(0, 25)];
    if (!used.has(letter)) {
      used.add(letter);
      result += letter;
    }
  }
  return result;
}

function generateRandomLettersString(count) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < count; i++) {
    result += alphabet[rand(0, 25)];
  }
  return result;
}

// -----------------------------------
// ✅ NEW: Pick target letters FROM a given pool (the drawn series)
//    Returns a string of unique uppercase letters, or "" if pool too small.
// -----------------------------------

function pickLettersFromPool(pool, count) {
  if (!Array.isArray(pool) || pool.length === 0) return "";
  const n = Math.max(1, Math.min(pool.length, parseInt(count, 10) || 1));
  const picked = shuffle([...pool]).slice(0, n);
  return picked.join("");
}

// -----------------------------------
// Arrange Letters Based on Alphabet Series
// -----------------------------------

function arrangeLettersBySeries(series, letters) {
  const letterPositions = [];
  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    const position = series.indexOf(letter);
    if (position !== -1) {
      letterPositions.push({
        letter: letter,
        position: position,
      });
    }
  }

  const sorted = [...letterPositions].sort((a, b) => a.position - b.position);
  const arrangedLetters = sorted.map((item) => item.letter).join("");
  const positions = sorted.map((item) => item.position + 1).join("");

  return {
    arrangedLetters: arrangedLetters,
    positions: positions,
    sortedPositions: sorted.map((item) => item.position + 1),
  };
}

// -----------------------------------
// Generate Options — RELIABLE VERSION (UNCHANGED)
// -----------------------------------

function generateOptions(correctAnswer) {
  const answerLength = correctAnswer.length;

  const isNoneOfTheAboveCorrect = Math.random() < 0.3;

  const wrongOptions = new Set();
  const letters = correctAnswer.split("");

  for (let i = 0; i < 20; i++) {
    const shuffled = shuffle([...letters]);
    const perm = shuffled.join("");
    if (perm !== correctAnswer && !wrongOptions.has(perm)) {
      wrongOptions.add(perm);
      if (wrongOptions.size >= 4) break;
    }
  }

  if (wrongOptions.size < 4) {
    while (wrongOptions.size < 4) {
      let randomStr = generateRandomLettersString(answerLength);
      if (randomStr !== correctAnswer && !wrongOptions.has(randomStr)) {
        wrongOptions.add(randomStr);
      }
    }
  }

  let wrongOptionsArray = Array.from(wrongOptions);
  shuffle(wrongOptionsArray);

  let selectedWrong = wrongOptionsArray.slice(0, 4);

  while (selectedWrong.length < 4) {
    const randomStr = generateRandomLettersString(answerLength);
    if (randomStr !== correctAnswer && !selectedWrong.includes(randomStr)) {
      selectedWrong.push(randomStr);
    }
  }

  const actualCorrectAnswer = isNoneOfTheAboveCorrect
    ? "None of the above"
    : correctAnswer;

  let options = [];
  options.push(actualCorrectAnswer);

  for (const wrong of selectedWrong) {
    if (wrong !== actualCorrectAnswer && wrong !== "None of the above") {
      options.push(wrong);
    }
  }

  while (options.length < 4) {
    const randomStr = generateRandomLettersString(answerLength);
    if (
      !options.includes(randomStr) &&
      randomStr !== correctAnswer &&
      randomStr !== "None of the above"
    ) {
      options.push(randomStr);
    }
  }

  options = shuffle(options);

  const noneIndex = options.indexOf("None of the above");
  if (noneIndex !== -1) {
    options.splice(noneIndex, 1);
  }
  options.push("None of the above");

  while (options.length < 5) {
    const randomStr = generateRandomLettersString(answerLength);
    if (
      !options.includes(randomStr) &&
      randomStr !== correctAnswer &&
      randomStr !== "None of the above"
    ) {
      options.splice(options.length - 1, 0, randomStr);
    }
  }

  if (options.length > 5) {
    const correctIdx = options.indexOf(actualCorrectAnswer);
    const noneIdx = options.indexOf("None of the above");

    let correct = options[correctIdx];
    let none = options[noneIdx];

    const others = options.filter(
      (opt, idx) =>
        idx !== correctIdx && idx !== noneIdx && opt !== "None of the above"
    );
    shuffle(others);
    const selectedOthers = others.slice(0, 3);

    let finalOptions = [correct, ...selectedOthers];
    const shuffledWithoutNone = shuffle(finalOptions);
    options = [...shuffledWithoutNone, none];
  }

  const lastOption = options[options.length - 1];
  if (lastOption !== "None of the above") {
    const noneIdx = options.indexOf("None of the above");
    if (noneIdx !== -1) {
      options.splice(noneIdx, 1);
      options.push("None of the above");
    } else {
      options.push("None of the above");
    }
  }

  if (isNoneOfTheAboveCorrect) {
    return {
      options: options,
      correctAnswer: "None of the above",
      isNoneOfTheAboveCorrect: true,
    };
  } else {
    if (!options.includes(correctAnswer)) {
      const noneIdx = options.indexOf("None of the above");
      if (noneIdx > 0) {
        options[0] = correctAnswer;
      } else {
        options[options.length - 2] = correctAnswer;
      }
    }
    return {
      options: options,
      correctAnswer: correctAnswer,
      isNoneOfTheAboveCorrect: false,
    };
  }
}

// -----------------------------------
// Helper: darken a hex color
// -----------------------------------

function darkenColor(hex, factor) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  r = Math.floor(r * factor);
  g = Math.floor(g * factor);
  b = Math.floor(b * factor);

  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

// -----------------------------------
// Main Function — Fixed 400×250 canvas
// ✅ Target letters are picked FROM the drawn alphabet series.
// -----------------------------------

export function generatePuzzle_alphabetical1(options = {}) {
  const {
    letters = 2,
    customLetters = null,
    series = null,
    showWatermark = true,
    watermarkText = "Powered by AVI",

    // ✅ NEW — how many letters from the alphabet series to display (1..26)
    alphabetCount = 26,
  } = options;

  // ✅ Fixed canvas size
  const width = IMG_WIDTH;
  const height = IMG_HEIGHT;

  // Generate the alphabet series
  let alphabets;
  let randomSeries;

  if (series && series.length === 26) {
    alphabets = series.toUpperCase().split("");
    randomSeries = series.toUpperCase();
  } else {
    alphabets = generateRandomAlphabets();
    randomSeries = alphabets.join("");
  }

  // ✅ Clamp alphabetCount (1..26) and slice the series
  let displayCount = parseInt(alphabetCount, 10);
  if (isNaN(displayCount)) displayCount = 26;
  if (displayCount < 1) displayCount = 1;
  if (displayCount > 26) displayCount = 26;

  const alphabetsToDraw = alphabets.slice(0, displayCount);
  randomSeries = alphabetsToDraw.join("");

  // -----------------------------------
  // ✅ Select the target letters FROM the drawn series (unless custom)
  // -----------------------------------
  let targetLetters = "";

  if (customLetters && typeof customLetters === "string" && customLetters.length > 0) {
    // Custom letters — use as-is (caller's responsibility to pick valid ones)
    targetLetters = customLetters.toUpperCase();
  } else {
    // ✅ Pick target letters FROM the drawn alphabet series
    //    Clamp requested count to the pool size so we don't exceed it.
    let requested = parseInt(letters, 10);
    if (isNaN(requested) || requested <= 0) requested = 2;

    const poolSize = alphabetsToDraw.length;
    const safeRequested = Math.max(1, Math.min(requested, poolSize));

    targetLetters = pickLettersFromPool(alphabetsToDraw, safeRequested);

    // Fallback (should never happen since we clamp above)
    if (targetLetters.length === 0) {
      targetLetters = generateRandomLetters(safeRequested);
    }
  }

  // Arrange the letters based on the FULL series (so position math stays correct)
  const arrangement = arrangeLettersBySeries(alphabets, targetLetters);

  // Canvas setup
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#f8f9fa");
  gradient.addColorStop(1, "#e9ecef");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Border
  ctx.strokeStyle = "#dee2e6";
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, width, height);

  // Color palette
  const colorPalette = [
    "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD",
    "#FF8C94", "#85CCE8", "#F7DC6F", "#82CCDD", "#F1948A", "#82E0AA",
    "#85C1E9", "#F8C471", "#82E0AA", "#F1948A", "#85CCE8", "#D7BDE2",
    "#FAD7A0", "#A3E4D7", "#AED6F1", "#F5B7B1", "#A9DFBF", "#F9E79F",
  ];

  // -----------------------------------
  // Layout configuration
  // -----------------------------------
  const padding = 12;
  const letterSize = 22;
  const letterSpacing = 2;
  const lettersPerRow = 13;
  const seriesRowGap = 4;

  // -----------------------------------
  // Draw the alphabet series
  // -----------------------------------
  const seriesStartY = padding + 8;

  for (let i = 0; i < alphabetsToDraw.length; i++) {
    const row = Math.floor(i / lettersPerRow);
    const col = i % lettersPerRow;

    const itemsInThisRow = Math.min(
      lettersPerRow,
      alphabetsToDraw.length - row * lettersPerRow
    );
    const rowWidth =
      itemsInThisRow * (letterSize + letterSpacing) - letterSpacing;
    const rowStartX = (width - rowWidth) / 2;

    const x = rowStartX + col * (letterSize + letterSpacing);
    const y = seriesStartY + row * (letterSize + seriesRowGap);

    const letter = alphabetsToDraw[i];
    const color = colorPalette[i % colorPalette.length];

    // Card shadow
    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.06)";
    ctx.shadowBlur = 3;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;

    const letterGradient = ctx.createRadialGradient(
      x + 4,
      y + 4,
      1,
      x + letterSize / 2,
      y + letterSize / 2,
      12
    );
    letterGradient.addColorStop(0, color);
    letterGradient.addColorStop(1, darkenColor(color, 0.8));

    ctx.fillStyle = letterGradient;
    ctx.beginPath();
    ctx.roundRect(x, y, letterSize, letterSize, 4);
    ctx.fill();
    ctx.restore();

    // Card border
    ctx.save();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x, y, letterSize, letterSize, 4);
    ctx.stroke();
    ctx.restore();

    // Letter
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 13px Arial, Helvetica, sans-serif";
    ctx.fillStyle = "#FFFFFF";
    ctx.shadowColor = "rgba(0, 0, 0, 0.1)";
    ctx.shadowBlur = 1;
    ctx.fillText(letter, x + letterSize / 2, y + letterSize / 2 + 0.5);
    ctx.restore();
  }

  const seriesRows = Math.ceil(alphabetsToDraw.length / lettersPerRow);
  const seriesEndY = seriesStartY + seriesRows * (letterSize + seriesRowGap);

  // -----------------------------------
  // Draw the target letters (centered, below the series)
  // -----------------------------------
  const targetLettersArray = targetLetters.split("");
  const cardCount = targetLettersArray.length;

  // Adaptive card size based on count
  let cardWidth = 48;
  let cardHeight = 42;
  let cardSpacing = 14;

  const maxTotalWidth = width - padding * 2;
  let totalCardWidth = cardCount * (cardWidth + cardSpacing) - cardSpacing;

  while (totalCardWidth > maxTotalWidth && cardWidth > 24) {
    cardWidth -= 2;
    cardHeight -= 2;
    cardSpacing -= 1;
    totalCardWidth = cardCount * (cardWidth + cardSpacing) - cardSpacing;
  }

  const cardStartX = (width - totalCardWidth) / 2;

  // Vertically center the target cards in the remaining space
  const remainingTop = seriesEndY + 8;
  const remainingBottom = height - padding - 14;
  const targetY =
    remainingTop + (remainingBottom - remainingTop - cardHeight) / 2;

  for (let i = 0; i < targetLettersArray.length; i++) {
    const x = cardStartX + i * (cardWidth + cardSpacing);
    const y = targetY;
    const letter = targetLettersArray[i];
    const color = colorPalette[i % colorPalette.length];

    // Card shadow
    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.12)";
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;

    const cardGradient = ctx.createRadialGradient(
      x - 4,
      y - 4,
      1,
      x + cardWidth / 2,
      y + cardHeight / 2,
      30
    );
    cardGradient.addColorStop(0, color);
    cardGradient.addColorStop(1, darkenColor(color, 0.8));

    ctx.fillStyle = cardGradient;
    ctx.beginPath();
    ctx.roundRect(x, y, cardWidth, cardHeight, 8);
    ctx.fill();
    ctx.restore();

    // Card border
    ctx.save();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(x, y, cardWidth, cardHeight, 8);
    ctx.stroke();
    ctx.restore();

    // Big letter
    const letterFontSize = Math.floor(cardHeight * 0.62);
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `bold ${letterFontSize}px Arial, Helvetica, sans-serif`;
    ctx.fillStyle = "#FFFFFF";
    ctx.shadowColor = "rgba(0, 0, 0, 0.12)";
    ctx.shadowBlur = 1;
    ctx.fillText(letter, x + cardWidth / 2, y + cardHeight / 2 + 1);
    ctx.restore();
  }

  // -----------------------------------
  // Watermark
  // -----------------------------------
  if (showWatermark) {
    ctx.save();
    ctx.globalAlpha = 1.0;
    ctx.textAlign = "right";
    ctx.textBaseline = "bottom";
    ctx.font = "bold 12px Arial";
    ctx.fillStyle = "#031032";
    ctx.fillText(watermarkText, width - 10, height - 8);
    ctx.restore();
  }

  // Generate options
  const result = generateOptions(arrangement.arrangedLetters);

  // -----------------------------------
  // Return
  // -----------------------------------

  return {
    title: "Arrange Letters Based on Alphabet Series",
    question: "Arrange these letters based on the alphabet series:",
    letters: targetLetters,
    series: randomSeries,
    alphabetCount: displayCount,
    alphabetSeriesDrawn: alphabetsToDraw,
    arrangedLetters: arrangement.arrangedLetters,
    positions: arrangement.positions,
    sortedPositions: arrangement.sortedPositions,
    options: result.options,
    answer: result.correctAnswer,
    image: canvas.toDataURL().split(",")[1],
    hasNoneOfTheAbove: true,
    isNoneOfTheAboveCorrect: result.isNoneOfTheAboveCorrect,
    totalLetters: targetLetters.length,
  };
}

// -----------------------------------
// Exports
// -----------------------------------

export {
  shuffle,
  getRandom,
  rand,
  generateRandomAlphabets,
  generateRandomLetters,
  generateRandomLettersString,
  pickLettersFromPool,
  arrangeLettersBySeries,
  generateOptions,
  darkenColor,
  IMG_WIDTH,
  IMG_HEIGHT,
};

export default {
  generatePuzzle_alphabetical1,
  shuffle,
  getRandom,
  rand,
  generateRandomAlphabets,
  generateRandomLetters,
  generateRandomLettersString,
  pickLettersFromPool,
  arrangeLettersBySeries,
  generateOptions,
  darkenColor,
  IMG_WIDTH,
  IMG_HEIGHT,
};

// -----------------------------------
// CLI usage
// -----------------------------------

if (import.meta.url === `file://${process.argv[1]}`) {
  const puzzle = generatePuzzle_alphabetical1({
    letters: 3,           // 3 target letters to arrange
    alphabetCount: 8,     // only 8 letters shown in the series
    showWatermark: true,
  });

  console.log("\n🧩 Alphabetical Puzzle");
  console.log("Question:", puzzle.question);
  console.log("Series drawn:", puzzle.series);
  console.log("Alphabet count drawn:", puzzle.alphabetCount);
  console.log("Target letters:", puzzle.letters, "(picked FROM the drawn series)");
  console.log("Arranged letters:", puzzle.arrangedLetters);
  console.log("Positions:", puzzle.positions);
  console.log("Options:", puzzle.options);
  console.log("Answer:", puzzle.answer);
  console.log("Is None correct:", puzzle.isNoneOfTheAboveCorrect);
  console.log("\n🖼️  Base64 image length:", puzzle.image.length, "chars");
}