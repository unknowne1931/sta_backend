import { createCanvas } from "canvas";

// ---------------- MORSE TABLE ----------------

const MORSE = {
  A: ".-",    B: "-...",  C: "-.-.", D: "-..",  E: ".",
  F: "..-.",  G: "--.",   H: "....", I: "..",   J: ".---",
  K: "-.-",   L: ".-..",  M: "--",   N: "-.",   O: "---",
  P: ".--.",  Q: "--.-",  R: ".-.",  S: "...",  T: "-",
  U: "..-",   V: "...-",  W: ".--",  X: "-..-", Y: "-.--",
  Z: "--.."
};

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// ---------------- UTILS ----------------

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

// Generate random letters like AHDK / QMTR / ZXCPL
function randomLetters(len = 4) {
  let word = "";
  for (let i = 0; i < len; i++) {
    word += LETTERS[rand(26)];
  }
  return word;
}

// Convert to Morse
function toMorse(word) {
  return word
    .split("")
    .map(ch => MORSE[ch])
    .join("   ");
}

// Change ONLY ONE letter (very confusing wrong options)
function mutateAt(word, index) {
  const arr = word.split("");

  let ch;
  do {
    ch = LETTERS[rand(26)];
  } while (ch === arr[index]);

  arr[index] = ch;

  return arr.join("");
}

// ---------------- MAIN ----------------

export function generatePuzzle_morseCode(length = 4) {

  // -------- Answer --------
  const answer = randomLetters(length);

  // -------- Confusing wrong options --------
  const wrong = [];

  // mutate each position once (very close options)
  for (let i = 0; i < length && wrong.length < 3; i++) {
    const w = mutateAt(answer, i);
    if (w !== answer && !wrong.includes(w)) {
      wrong.push(w);
    }
  }

  // fill if needed
  while (wrong.length < 3) {
    const w = mutateAt(answer, rand(length));
    if (w !== answer && !wrong.includes(w)) {
      wrong.push(w);
    }
  }

  const options = shuffle([answer, ...wrong]);

  // ---------------- CANVAS ----------------

  const width = 900;
  const height = 700;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, width, height);

  // Title
  ctx.fillStyle = "#222";
  ctx.font = "bold 34px Arial";
  ctx.textAlign = "center";
  ctx.fillText("MORSE CODE", width / 2, 45);

  // Subtitle
  ctx.fillStyle = "#666";
  ctx.font = "20px Arial";
  ctx.fillText(
    `Decode the ${length}-letter Morse code`,
    width / 2,
    75
  );

  // Morse display
  ctx.fillStyle = "#0055cc";
  ctx.font = "bold 34px Courier New";
  ctx.fillText(toMorse(answer), width / 2, 120);

  // Divider
  ctx.strokeStyle = "#999";
  ctx.beginPath();
  ctx.moveTo(30, 145);
  ctx.lineTo(width - 30, 145);
  ctx.stroke();

  // ---------------- MORSE CHART ----------------

  ctx.textAlign = "left";
  ctx.font = "bold 20px Courier New";

  const letters = Object.keys(MORSE);

  const startX = 40;
  const startY = 185;

  const rowHeight = 34;
  const colWidth = 270;

  letters.forEach((letter, i) => {
    const col = Math.floor(i / 9);
    const row = i % 9;

    const x = startX + col * colWidth;
    const y = startY + row * rowHeight;

    ctx.fillStyle = "#111";
    ctx.fillText(`${letter}   ${MORSE[letter]}`, x, y);
  });

  // Footer
  ctx.fillStyle = "#555";
  ctx.font = "18px Arial";
  ctx.textAlign = "center";

  ctx.fillText(
    "Use the Morse chart to decode the word",
    width / 2,
    640
  );

  ctx.fillText(
    "Choose the correct option below",
    width / 2,
    665
  );

  return {
    question: "Find the correct word from the Morse code.",
    options,
    answer,
    image: canvas.toDataURL().split(",")[1]
  };
}