import { createCanvas } from "canvas";

// ----- WORD DATA -----
const WORDS = [
  "india", "train", "chair", "brain", "apple", "kite", "rain", "air", "cat",
  "idea", "basic", "music", "data", "logic", "magic", "animal", "signal",
  "file", "random", "plain", "house", "tree", "book", "pen", "dog", "sun",
  "moon", "star", "river", "mountain", "ocean", "beach", "forest", "garden",
  "flower", "bird", "fish", "horse", "car", "bus", "plane", "ship", "boat",
  "computer", "phone", "table", "door", "window", "light", "dark", "big",
  "small", "happy", "sad", "angry", "calm", "red", "blue", "green", "yellow",
  "banana", "grape", "lemon", "cherry", "carrot", "potato", "tomato",
  "school", "teacher", "student", "class", "lesson", "exam", "game", "play"
];

// ----- DIFFICULTY -----
function diff_lt(per) {
  let DIFF;

  if (per < 10) {
    DIFF = { "Too Easy": 4, "Easy": 6, "Medium": 8, "Tough": 10, "Too Tough": 12 }
  } else if (per < 20) {
    DIFF = { "Too Easy": 6, "Easy": 8, "Medium": 10, "Tough": 12, "Too Tough": 14 }
  } else if (per < 30) {
    DIFF = { "Too Easy": 8, "Easy": 10, "Medium": 12, "Tough": 14, "Too Tough": 16 }
  } else if (per < 40) {
    DIFF = { "Too Easy": 10, "Easy": 12, "Medium": 14, "Tough": 16, "Too Tough": 20 }
  } else if (per < 50) {
    DIFF = { "Too Easy": 12, "Easy": 14, "Medium": 16, "Tough": 25, "Too Tough": 30 }
  } else {
    DIFF = { "Too Easy": 15, "Easy": 18, "Medium": 20, "Tough": 30, "Too Tough": 35 }
  }

  return DIFF;
}

// ----- HELPERS -----
function randomLetter() {
  return "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)];
}

function hasRepeatedLetter(word) {
  const set = new Set();
  for (let w of word) {
    if (set.has(w)) return true;
    set.add(w);
  }
  return false;
}

// ★★★ missing part added ★★★
// returns letters sorted by frequency in WORDS
function frequentLetters(list) {
  const freq = {};
  for (let word of list) {
    for (let char of word) {
      if (!freq[char]) freq[char] = 0;
      freq[char]++;
    }
  }
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1]) // highest first
    .map(x => x[0]);             // return only letters
}

// ----- GENERATE DATA -----
export function generateData(difficulty, per) {
  const diff_data = diff_lt(per);
  const count = diff_data[difficulty];
  const words = [...WORDS].sort(() => Math.random() - 0.5).slice(0, count);

  const mode = Math.random() < 0.5 ? "letters" : "repeat";
  let question = "";
  let correctAnswer = 0;

  if (mode === "letters") {
    const fl = frequentLetters(WORDS);
    const vowels = ['a','e','i','o','u'];

    const weighted = [
      ...vowels, ...vowels, ...vowels, // bias vowel selection
      ...fl
    ];

    const pick = () => weighted[Math.floor(Math.random() * weighted.length)];

    let a = pick();
    let b = pick();
    while (a === b) b = pick();

    correctAnswer = words.filter(w => w.includes(a) && w.includes(b)).length;
    question = `How many words contain both '${a}' and '${b}' in the same word?`;
  }
  else {
    correctAnswer = words.filter(hasRepeatedLetter).length;
    question = "How many words contain repeated letters? Examples: apple, animal, coffee, class, letter";
  }

  const options = new Set([correctAnswer]);
  while (options.size < 4) {
    const offset = Math.floor(Math.random() * 7) - 3; 
    const value = correctAnswer + offset;
    if (value >= 0 && value !== correctAnswer) options.add(value);
  }

  const shuffled = [...options].sort(() => Math.random() - 0.5);
  return { words, question, correctAnswer, options: shuffled };
}

const WIDTH = 400;
const HEIGHT = 250;

export async function renderImageBase64(words) {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");

  // background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // font & style
  const padding = 10;
  const maxWidth = WIDTH - padding * 2;
  ctx.fillStyle = "black";
  ctx.font = "26px Arial";
  ctx.textBaseline = "middle";

  // words -> sentence string
  const text = words.join(" ");

  // --- automatic word wrap ---
  const pieces = text.split(" ");
  let lines = [];
  let line = "";

  pieces.forEach(word => {
    const test = line + word + " ";
    if (ctx.measureText(test).width > maxWidth && line !== "") {
      lines.push(line);
      line = word + " ";
    } else {
      line = test;
    }
  });
  if (line) lines.push(line);

  const lineHeight = 32;
  const totalTextHeight = lines.length * lineHeight;
  let y = (HEIGHT - totalTextHeight) / 2 + lineHeight / 2;

  for (let l of lines) {
    const txtWidth = ctx.measureText(l).width;
    ctx.fillText(l, (WIDTH - txtWidth) / 2, y);
    y += lineHeight;
  }

  return canvas.toBuffer("image/png").toString("base64");
}