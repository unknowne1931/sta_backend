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
// Generate Random Word Data
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

function calculateGroupRatio(word, groupSize = 3) {
  const grouped = Math.floor(word.length / groupSize);
  const remaining = word.length % groupSize;
  return `${grouped}:${remaining}`;
}

function generateWordData(
  wordCount = 5,
  groupSize = 3,
  minWordLength = 4,
  maxWordLength = 9
) {
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

    const correctRatio = calculateGroupRatio(word, groupSize);
    const isCorrect = Math.random() > 0.5;
    let displayedRatio;

    if (isCorrect) {
      displayedRatio = correctRatio;
      correctCount++;
    } else {
      let wrongGrouped;
      let wrongRemaining;
      let attempts = 0;
      do {
        wrongGrouped = rand(0, Math.floor(word.length / groupSize) + 2);
        wrongRemaining = rand(0, groupSize + 2);
        displayedRatio = `${wrongGrouped}:${wrongRemaining}`;
        attempts++;
      } while (displayedRatio === correctRatio && attempts < 10);

      if (displayedRatio === correctRatio) {
        displayedRatio = `${wrongGrouped + 1}:${wrongRemaining}`;
      }
    }

    words.push({
      word,
      groupSize,
      correctRatio,
      displayedRatio,
      isCorrect,
    });
  }

  return { words, correctCount, groupSize };
}

// -----------------------------------
// Generate Options
// -----------------------------------

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

// -----------------------------------
// Collision Detection
// -----------------------------------

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
// Main Function — returns base64 image
// -----------------------------------

export function generatePuzzle_groupWords(options = {}) {
  try {
    const {
      wordCount = 5,
      groupSize = 3,
      minWordLength = 4,
      maxWordLength = 9,
      width = 400,
      height = 250,
      showWatermark = false,
      watermarkText = "",
    } = options;

    // ✅ Validate lengths so min <= max and both are sane
    const safeMinLen = Math.max(1, Math.min(minWordLength, maxWordLength));
    const safeMaxLen = Math.max(safeMinLen, Math.min(maxWordLength, 20));

    const finalCount = Math.max(1, Math.min(wordCount, 5));

    const { words, correctCount } = generateWordData(
      finalCount,
      groupSize,
      safeMinLen,
      safeMaxLen
    );
    const mcq = generateOptionsForNumber(correctCount, finalCount);

    // ---------------- CANVAS ----------------
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // ✅ Clean BLUE gradient background (no circles)
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#1e3c72");   // deep blue
    gradient.addColorStop(0.5, "#2563eb"); // bright blue
    gradient.addColorStop(1, "#1e40af");   // royal blue
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // ---------------- RANDOM SPREADING ----------------
    // ✅ Dynamic collision box based on longest possible word + ratio
    // Longest word = safeMaxLen chars. Approx width of monospace bold 16px ≈ 10px/char
    const approxWordPx = safeMaxLen * 10;
    const approxRatioPx = 60; // ": 0:0" up to ": 99:99" roughly
    const textWidth = Math.min(width - 20, approxWordPx + approxRatioPx + 20);
    const textHeight = 35;
    const placedItems = [];
    const positions = [];
    const maxAttempts = 200;

    for (let i = 0; i < words.length; i++) {
      let placed = false;
      let attempts = 0;

      while (!placed && attempts < maxAttempts) {
        attempts++;
        const maxX = Math.max(5, width - textWidth - 10);
        const maxY = Math.max(5, height - textHeight - 10);

        const randX = rand(5, maxX);
        const randY = rand(5, maxY);

        if (!checkCollision(randX, randY, textWidth, textHeight, placedItems)) {
          positions.push({ x: randX, y: randY });
          placedItems.push({
            x: randX,
            y: randY,
            width: textWidth,
            height: textHeight,
          });
          placed = true;
        }
      }

      if (!placed) {
        positions.push({ x: 10 + i * 70, y: 10 + i * 40 });
      }
    }

    // ---------------- DRAW WORDS + RATIOS ----------------
    words.forEach((item, index) => {
      const { x, y } = positions[index];

      const wordFont = 'bold 16px "Courier New", monospace';
      const ratioFont = 'bold 18px "Courier New", monospace';
      const gap = 8;
      const ratioText = `: ${item.displayedRatio}`;

      // Measure word width
      ctx.font = wordFont;
      const wordWidth = ctx.measureText(item.word).width;

      // Measure ratio width
      ctx.font = ratioFont;
      const ratioWidth = ctx.measureText(ratioText).width;

      // Total block width
      const totalWidth = wordWidth + gap + ratioWidth;

      // ✅ Clamp start so the whole block fits inside the canvas
      let startX = x;
      if (startX + totalWidth > width - 5) {
        startX = width - 5 - totalWidth;
      }
      if (startX < 5) startX = 5;

      // --- Draw word ---
      ctx.font = wordFont;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      ctx.shadowBlur = 6;
      ctx.shadowOffsetY = 2;
      ctx.fillStyle = "#ffffff";
      ctx.fillText(item.word, startX, y);

      // --- Draw ratio right after word ---
      ctx.font = ratioFont;
      ctx.fillStyle = "#FFD700";
      ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 2;
      ctx.fillText(ratioText, startX + wordWidth + gap, y);
    });

    // Reset shadow
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // Watermark
    if (showWatermark) {
      ctx.fillStyle = "rgb(6, 20, 56)";
      ctx.font = "bold 10px Arial";
      ctx.textAlign = "right";
      ctx.textBaseline = "bottom";
      ctx.fillText(watermarkText, width - 10, height - 8);
    }

    // ---------------- BASE64 OUTPUT ----------------
    const base64Image = canvas.toBuffer("image/png").toString("base64");
    const dataUri = `data:image/png;base64,${base64Image}`;

    return {
      title: "Word Grouping Ratio Puzzle",
      question: `How many words have the correct ratio when grouped by ${groupSize} letters?`,
      groupSize,
      minWordLength: safeMinLen,
      maxWordLength: safeMaxLen,
      options: mcq.options,
      correctLetter: mcq.correctLetter,
      correctAnswer: mcq.correctAnswer,
      hasNoneOfTheAbove: true,
      isNoneOfTheAboveCorrect: mcq.isNoneOfTheAboveCorrect,
      correctCount,
      totalWords: finalCount,
      detailedData: words,

      // ✅ Base64 image outputs
      image: base64Image,      // raw base64 (no prefix)
      imageDataUri: dataUri,   // ready for <img src="..."> or CSS
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
// Exports
// -----------------------------------

export {
  shuffle,
  getRandom,
  rand,
  generateRandomString,
  calculateGroupRatio,
  generateWordData,
  generateOptionsForNumber,
  checkCollision,
};

export default {
  generatePuzzle_groupWords,
  shuffle,
  getRandom,
  rand,
  generateRandomString,
  calculateGroupRatio,
  generateWordData,
  generateOptionsForNumber,
};

// -----------------------------------
// CLI usage
// -----------------------------------

if (import.meta.url === `file://${process.argv[1]}`) {
  const puzzle = generatePuzzle_groupWords({
    wordCount: 5,
    groupSize: 3,
    minWordLength: 5,   // ✅ control min letters
    maxWordLength: 7,   // ✅ control max letters
    width: 400,
    height: 250,
    showWatermark: true,
    watermarkText: "RatioPuzzle",
  });

  console.log("\n📋 Puzzle Summary:");
  console.log("Question:", puzzle.question);
  console.log("Options:", puzzle.options);
  console.log("Correct:", puzzle.correctLetter, "-", puzzle.correctAnswer);
  console.log("Correct count:", puzzle.correctCount, "/", puzzle.totalWords);
  console.log("Word length range:", puzzle.minWordLength, "-", puzzle.maxWordLength);
  console.log("\n🖼️  Base64 image (first 100 chars):");
  console.log(puzzle.image.slice(0, 100) + "...");
  console.log("\n📏 Base64 length:", puzzle.image.length, "chars");
  console.log("\n🔗 Data URI (first 80 chars):");
  console.log(puzzle.imageDataUri.slice(0, 80) + "...");
}