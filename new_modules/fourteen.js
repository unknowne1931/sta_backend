import { createCanvas } from "canvas";

// ---------------- CONSTANTS ----------------
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const WORDS = [
  "APPLE", "HOUSE", "TRAIN", "SMILE", "RIVER",
  "TIGER", "PHONE", "LIGHT", "MUSIC", "BREAD",
  "GARDEN", "BUTTON", "WINDOW", "MARKET",
  "POCKET", "FLOWER", "BANANA", "SCHOOL",
  "ORANGE", "FAMILY", "CLOUD", "SUMMER",
  "WINTER", "PYTHON", "JAVASCRIPT", "COMPUTER",
  "MONITOR", "KEYBOARD", "ELEPHANT", "CHOCOLATE"
];

function rand(max) {
  return Math.floor(Math.random() * max);
}

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = rand(i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickWords(count = 6) {
  const chosen = [];
  while (chosen.length < count) {
    const w = WORDS[rand(WORDS.length)];
    if (!chosen.includes(w)) chosen.push(w);
  }
  return chosen;
}

// Build a random Black/White clue for every letter of the alphabet
function buildClue() {
  const clue = {};
  for (const ch of ALPHABET) {
    clue[ch] = Math.random() < 0.5 ? "B" : "W";
  }
  return clue;
}

// ---------------- MAIN ----------------
export function generatePuzzle_alphabetColourCount(sen = 2) {
  const clue = buildClue();

  // Build the sentence
  const sentence = pickWords(sen).join(" ");

  // Decide which letter-positions will NOT match the clue
  const letterPositions = [];
  for (let i = 0; i < sentence.length; i++) {
    if (sentence[i] !== " ") letterPositions.push(i);
  }
  const mistakes = 3 + rand(5); // 3-7 mismatches
  const wrongIndexes = [];
  while (wrongIndexes.length < mistakes && wrongIndexes.length < letterPositions.length) {
    const idx = letterPositions[rand(letterPositions.length)];
    if (!wrongIndexes.includes(idx)) wrongIndexes.push(idx);
  }

  // Work out actual drawn colour for each letter + counts
  const actualColor = {}; // index -> "B" / "W"
  let matchedCount = 0;
  for (const i of letterPositions) {
    const ch = sentence[i];
    let colour = clue[ch];
    if (wrongIndexes.includes(i)) {
      colour = colour === "B" ? "W" : "B";
    } else {
      matchedCount++;
    }
    actualColor[i] = colour;
  }

  const answer = matchedCount;

  // Build 4 multiple-choice options (1 correct + 3 distractors)
  const optionSet = new Set([answer]);
  while (optionSet.size < 4) {
    const offset = rand(5) + 1; // 1-5
    const sign = Math.random() < 0.5 ? -1 : 1;
    let val = answer + sign * offset;
    if (val < 0) val = answer + offset;
    optionSet.add(val);
  }
  const options = shuffle(Array.from(optionSet)).map(String);

  // ---------------- CANVAS ----------------
  const width = 1200;
  const height = 560;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#f4f4f4";
  ctx.fillRect(0, 0, width, height);

  // Title
  ctx.fillStyle = "#222";
  ctx.font = "bold 34px Arial";
  ctx.textAlign = "center";
  ctx.fillText("ALPHABET COLOUR PUZZLE", width / 2, 45);

  // ctx.font = "20px Arial";
  // ctx.fillStyle = "#666";
  // ctx.fillText(
  //   "How many letters match the clue colours?",
  //   width / 2,
  //   78
  // );

  // ---------------- LEGEND ----------------
  const legendStartX = 60;
  const legendY = 130;
  const legendGap = 38;
  ctx.font = "bold 26px Arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  for (let i = 0; i < ALPHABET.length; i++) {
    const ch = ALPHABET[i];
    const col = i % 13;
    const row = Math.floor(i / 13);
    const x = legendStartX + col * legendGap;
    const y = legendY + row * 50;

    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#999";
    ctx.strokeText(ch, x, y);

    ctx.fillStyle = clue[ch] === "B" ? "#000" : "#fff";
    ctx.fillText(ch, x, y);
  }

  // Divider
  ctx.strokeStyle = "#bbbbbb";
  ctx.beginPath();
  ctx.moveTo(40, 250);
  ctx.lineTo(width - 40, 250);
  ctx.stroke();

  // ---------------- SENTENCE ----------------
  const startX = 60;
  const startY = 340;
  const gap = 42;
  const lineHeight = 70;
  const maxPerLine = 24;

  ctx.font = "bold 38px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  let col = 0;
  let line = 0;
  for (let i = 0; i < sentence.length; i++) {
    const ch = sentence[i];
    if (ch === " ") {
      col++;
      if (col >= maxPerLine) {
        col = 0;
        line++;
      }
      continue;
    }
    const x = startX + col * gap;
    const y = startY + line * lineHeight;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#999";
    ctx.strokeText(ch, x, y);

    ctx.fillStyle = actualColor[i] === "B" ? "#000" : "#fff";
    ctx.fillText(ch, x, y);

    col++;
    if (col >= maxPerLine) {
      col = 0;
      line++;
    }
  }

  // Footer hint
  ctx.fillStyle = "#555";
  ctx.font = "20px Arial";
  ctx.textAlign = "center";
  // ctx.fillText(
  //   "Compare each letter's colour to the legend above and count the matches.",
  //   width / 2,
  //   height - 30
  // );

  return {
    question: "How many letters match the clue colours?",
    options,
    answer: String(answer),
    image: canvas.toDataURL().split(",")[1]
  };
}