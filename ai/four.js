// app.js
import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

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

// ----- RENDER IMAGE + RETURN BASE64 -----
export async function renderImageBase64(words) {
  const html = `
   <html>
  <head>
    <style>
      body {
        font-family: Arial;
        display: flex;
        justify-content: center;
        align-items: center;
        background: white;
        height: auto;     /* full screen height so centering works */
        margin: 0;
      }

      .container {
        width: 400px;
        height: 250px;     /* <-- your requested size */
        display: flex;
        justify-content: center;
        align-items: center;
        background: white;
        border: 1px solid transparent; /* keeps size stable */
      }

      p {
        display: inline-block;
        max-width: 380px;  /* keep text inside container */
        font-size: 26px;
        color: black;
        line-height: 1.6;
        text-align: center;
        word-wrap: break-word;
        margin: 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <p>${words.join(" ")}</p>
    </div>
  </body>
</html>


  `;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  const data = await page.screenshot({ encoding: 'base64' });
  await browser.close();
  return data;
}
