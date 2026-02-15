//Before per < 5
// import { createCanvas } from "canvas";

// // ----- WORD DATA -----
// const WORDS = [
//   "india", "train", "chair", "brain", "apple", "kite", "rain", "air", "cat",
//   "idea", "basic", "music", "data", "logic", "magic", "animal", "signal",
//   "file", "random", "plain", "house", "tree", "book", "pen", "dog", "sun",
//   "moon", "star", "river", "mountain", "ocean", "beach", "forest", "garden",
//   "flower", "bird", "fish", "horse", "car", "bus", "plane", "ship", "boat",
//   "computer", "phone", "table", "door", "window", "light", "dark", "big",
//   "small", "happy", "sad", "angry", "calm", "red", "blue", "green", "yellow",
//   "banana", "grape", "lemon", "cherry", "carrot", "potato", "tomato",
//   "school", "teacher", "student", "class", "lesson", "exam", "game", "play"
// ];

// // ----- DIFFICULTY -----
// function diff_lt(per) {
//   let DIFF;

//   if (per < 10) {
//     DIFF = { 
//       "Too Easy": 4, 
//       "Easy": 5, 
//       "Medium": 6, 
//       "Tough": 7, 
//       "Too Tough": 8 
//     }
//   }else if (per < 20) {
//     DIFF = { 
//       "Too Easy": 5, 
//       "Easy": 7, 
//       "Medium": 9, 
//       "Tough": 11, 
//       "Too Tough": 13 
//     }
//   }else if (per < 30) {
//     DIFF = { 
//       "Too Easy": 7, 
//       "Easy": 9, 
//       "Medium": 11, 
//       "Tough": 13, 
//       "Too Tough": 15 
//     }
//   }else if (per < 40) {
//     DIFF = { 
//       "Too Easy": 9, 
//       "Easy": 11, 
//       "Medium": 13, 
//       "Tough": 15, 
//       "Too Tough": 17 
//     }
//   }else if (per < 50) {
//     DIFF = { 
//       "Too Easy": 11, 
//       "Easy": 13, 
//       "Medium": 15, 
//       "Tough": 17, 
//       "Too Tough": 19 
//     }
//   }else if (per < 60) {
//     DIFF = { 
//       "Too Easy": 13, 
//       "Easy": 15, 
//       "Medium": 17, 
//       "Tough": 19, 
//       "Too Tough": 21 
//     }
//   }else if (per < 70) {
//     DIFF = { 
//       "Too Easy": 15, 
//       "Easy": 17, 
//       "Medium": 19, 
//       "Tough": 21, 
//       "Too Tough": 23 
//     }
//   }else if (per < 80) {
//     DIFF = { 
//       "Too Easy": 19, 
//       "Easy": 21, 
//       "Medium": 23, 
//       "Tough": 25, 
//       "Too Tough": 27 
//     }
//   }else if (per < 90) {
//     DIFF = { 
//       "Too Easy": 21, 
//       "Easy": 23, 
//       "Medium": 25, 
//       "Tough": 27, 
//       "Too Tough": 29 
//     }
//   }else{
//     DIFF = { 
//       "Too Easy": 23, 
//       "Easy": 25, 
//       "Medium": 27, 
//       "Tough": 29, 
//       "Too Tough": 31 
//     }
//   }

//   return DIFF;
// }

// // ----- HELPERS -----
// function randomLetter() {
//   return "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)];
// }

// function hasRepeatedLetter(word) {
//   const set = new Set();
//   for (let w of word) {
//     if (set.has(w)) return true;
//     set.add(w);
//   }
//   return false;
// }

// // ★★★ missing part added ★★★
// // returns letters sorted by frequency in WORDS
// function frequentLetters(list) {
//   const freq = {};
//   for (let word of list) {
//     for (let char of word) {
//       if (!freq[char]) freq[char] = 0;
//       freq[char]++;
//     }
//   }
//   return Object.entries(freq)
//     .sort((a, b) => b[1] - a[1]) // highest first
//     .map(x => x[0]);             // return only letters
// }

// // ----- GENERATE DATA -----
// export function generateData(difficulty, per) {
//   const diff_data = diff_lt(per);
//   const count = diff_data[difficulty];
//   const words = [...WORDS].sort(() => Math.random() - 0.5).slice(0, count);

//   // now 3 modes
//   const modes = ["letters", "repeat", "single"];
//   const mode = modes[Math.floor(Math.random() * modes.length)];

//   let question = "";
//   let correctAnswer = 0;

//   if (mode === "letters") {
//     const fl = frequentLetters(WORDS);
//     const vowels = ['a','e','i','o','u'];

//     const weighted = [
//       ...vowels, ...vowels, ...vowels,
//       ...fl
//     ];

//     const pick = () => weighted[Math.floor(Math.random() * weighted.length)];

//     let a = pick();
//     let b = pick();
//     while (a === b) b = pick();

//     correctAnswer = words.filter(w => w.includes(a) && w.includes(b)).length;
//     question = `How many words contain both '${a}' and '${b}' in the same word?`;
//   }

//   else if (mode === "single") {
//     const fl = frequentLetters(WORDS);
//     const vowels = ['a','e','i','o','u'];

//     const weighted = [
//       ...vowels, ...vowels,
//       ...fl
//     ];

//     const letter = weighted[Math.floor(Math.random() * weighted.length)];

//     correctAnswer = words.filter(w => w.includes(letter)).length;
//     question = `How many words contain the letter '${letter}'?`;
//   }

//   else {
//     correctAnswer = words.filter(hasRepeatedLetter).length;
//     question = "How many words contain repeated letters? Examples: apple";
//   }

//   const options = new Set([correctAnswer]);
//   while (options.size < 4) {
//     const offset = Math.floor(Math.random() * 7) - 3;
//     const value = correctAnswer + offset;
//     if (value >= 0 && value !== correctAnswer) options.add(value);
//   }

//   const shuffled = [...options].sort(() => Math.random() - 0.5);
//   return { words, question, correctAnswer, options: shuffled };
// }


// const WIDTH = 400;
// const HEIGHT = 250;

// export async function renderImageBase64(words) {
//   const canvas = createCanvas(WIDTH, HEIGHT);
//   const ctx = canvas.getContext("2d");

//   // background
//   ctx.fillStyle = "white";
//   ctx.fillRect(0, 0, WIDTH, HEIGHT);

//   // font & style
//   const padding = 10;
//   const maxWidth = WIDTH - padding * 2;
//   ctx.fillStyle = "black";
//   ctx.font = "26px Arial";
//   ctx.textBaseline = "middle";

//   // words -> sentence string
//   const text = words.join(" ");

//   // --- automatic word wrap ---
//   const pieces = text.split(" ");
//   let lines = [];
//   let line = "";

//   pieces.forEach(word => {
//     const test = line + word + " ";
//     if (ctx.measureText(test).width > maxWidth && line !== "") {
//       lines.push(line);
//       line = word + " ";
//     } else {
//       line = test;
//     }
//   });
//   if (line) lines.push(line);

//   const lineHeight = 32;
//   const totalTextHeight = lines.length * lineHeight;
//   let y = (HEIGHT - totalTextHeight) / 2 + lineHeight / 2;

//   for (let l of lines) {
//     const txtWidth = ctx.measureText(l).width;
//     ctx.fillText(l, (WIDTH - txtWidth) / 2, y);
//     y += lineHeight;
//   }

//   return canvas.toBuffer("image/png").toString("base64");
// }












































// import { createCanvas } from "canvas";

// // ----- WORD DATA -----
// const WORDS = [
//   "india", "train", "chair", "brain", "apple", "kite", "rain", "air", "cat",
//   "idea", "basic", "music", "data", "logic", "magic", "animal", "signal",
//   "file", "random", "plain", "house", "tree", "book", "pen", "dog", "sun",
//   "moon", "star", "river", "mountain", "ocean", "beach", "forest", "garden",
//   "flower", "bird", "fish", "horse", "car", "bus", "plane", "ship", "boat",
//   "computer", "phone", "table", "door", "window", "light", "dark", "big",
//   "small", "happy", "sad", "angry", "calm", "red", "blue", "green", "yellow",
//   "banana", "grape", "lemon", "cherry", "carrot", "potato", "tomato",
//   "school", "teacher", "student", "class", "lesson", "exam", "game", "play"
// ];

// // ----- DIFFICULTY -----
// function diff_lt(per) {
//   let DIFF;

//   if (per < 5) {
//     DIFF = { 
//       "Too Easy": 18, 
//       "Easy": 20, 
//       "Medium": 25, 
//       "Tough": 28, 
//       "Too Tough": 32 
//     }
//   }else if (per < 10) {
//     DIFF = { 
//       "Too Easy": 16, 
//       "Easy": 18, 
//       "Medium": 23, 
//       "Tough": 26, 
//       "Too Tough": 30 
//     }
//   }else if (per < 15) {
//     DIFF = { 
//       "Too Easy": 14, 
//       "Easy": 16, 
//       "Medium": 21, 
//       "Tough": 24, 
//       "Too Tough": 28 
//     }
//   }else if (per < 20) {
//     DIFF = { 
//       "Too Easy": 7, 
//       "Easy": 8, 
//       "Medium": 9, 
//       "Tough": 10, 
//       "Too Tough": 11 
//     }
//   }else if (per < 25) {
//     DIFF = { 
//       "Too Easy": 8, 
//       "Easy": 9, 
//       "Medium": 10, 
//       "Tough": 11, 
//       "Too Tough": 12 
//     }
//   }else if (per < 30) {
//     DIFF = { 
//       "Too Easy": 9, 
//       "Easy": 10, 
//       "Medium": 11, 
//       "Tough": 12, 
//       "Too Tough": 13 
//     }
//   }else if (per < 35) {
//     DIFF = { 
//       "Too Easy": 10, 
//       "Easy": 11, 
//       "Medium": 12, 
//       "Tough": 13, 
//       "Too Tough": 14 
//     }
//   }else if (per < 40) {
//     DIFF = { 
//       "Too Easy": 11, 
//       "Easy": 12, 
//       "Medium": 13, 
//       "Tough": 14, 
//       "Too Tough": 15 
//     }
//   }else if (per < 45) {
//     DIFF = { 
//       "Too Easy": 12, 
//       "Easy": 13, 
//       "Medium": 14, 
//       "Tough": 15, 
//       "Too Tough": 16 
//     }
//   }else if (per < 50) {
//     DIFF = { 
//       "Too Easy": 13, 
//       "Easy": 14, 
//       "Medium": 15, 
//       "Tough": 16, 
//       "Too Tough": 17 
//     }
//   }else if (per < 55) {
//     DIFF = { 
//       "Too Easy": 14, 
//       "Easy": 15, 
//       "Medium": 16, 
//       "Tough": 17, 
//       "Too Tough": 18 
//     }
//   }else if (per < 60) {
//     DIFF = { 
//       "Too Easy": 15, 
//       "Easy": 16, 
//       "Medium": 17, 
//       "Tough": 18, 
//       "Too Tough": 19 
//     }
//   }else if (per < 65) {
//     DIFF = { 
//       "Too Easy": 16, 
//       "Easy": 17, 
//       "Medium": 18, 
//       "Tough": 19, 
//       "Too Tough": 20 
//     }
//   }else if (per < 70) {
//     DIFF = { 
//       "Too Easy": 17, 
//       "Easy": 18, 
//       "Medium": 19, 
//       "Tough": 20, 
//       "Too Tough": 25 
//     }
//   }else if (per < 75) {
//     DIFF = { 
//       "Too Easy": 18, 
//       "Easy": 19, 
//       "Medium": 20, 
//       "Tough": 21, 
//       "Too Tough": 22 
//     }
//   }  else if (per < 80) {
//     DIFF = { 
//       "Too Easy": 19, 
//       "Easy": 20, 
//       "Medium": 21, 
//       "Tough": 22, 
//       "Too Tough": 23 
//     }
//   }  else if (per < 85) {
//     DIFF = { 
//       "Too Easy": 20, 
//       "Easy": 21, 
//       "Medium": 22, 
//       "Tough": 23, 
//       "Too Tough": 24 
//     }
//   }else if (per < 90) {
//     DIFF = { 
//       "Too Easy": 21, 
//       "Easy": 22, 
//       "Medium": 23, 
//       "Tough": 24, 
//       "Too Tough": 25 
//     }
//   }else{
//     DIFF = { 
//       "Too Easy": 22, 
//       "Easy": 23, 
//       "Medium": 24, 
//       "Tough": 25, 
//       "Too Tough": 26 
//     }
//   }  


//   return DIFF;
// }

// // ----- HELPERS -----
// function randomLetter() {
//   return "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)];
// }

// function hasRepeatedLetter(word) {
//   const set = new Set();
//   for (let w of word) {
//     if (set.has(w)) return true;
//     set.add(w);
//   }
//   return false;
// }

// // ★★★ missing part added ★★★
// // returns letters sorted by frequency in WORDS
// function frequentLetters(list) {
//   const freq = {};
//   for (let word of list) {
//     for (let char of word) {
//       if (!freq[char]) freq[char] = 0;
//       freq[char]++;
//     }
//   }
//   return Object.entries(freq)
//     .sort((a, b) => b[1] - a[1]) // highest first
//     .map(x => x[0]);             // return only letters
// }

// // ----- GENERATE DATA -----
// export function generateData(difficulty, per) {
//   const diff_data = diff_lt(per);
//   const count = diff_data[difficulty];
//   const words = [...WORDS].sort(() => Math.random() - 0.5).slice(0, count);

//   // now 3 modes
//   const modes = ["letters", "repeat", "single"];
//   const mode = modes[Math.floor(Math.random() * modes.length)];

//   let question = "";
//   let correctAnswer = 0;

//   if (mode === "letters") {
//     const fl = frequentLetters(WORDS);
//     const vowels = ['a','e','i','o','u'];

//     const weighted = [
//       ...vowels, ...vowels, ...vowels,
//       ...fl
//     ];

//     const pick = () => weighted[Math.floor(Math.random() * weighted.length)];

//     let a = pick();
//     let b = pick();
//     while (a === b) b = pick();

//     correctAnswer = words.filter(w => w.includes(a) && w.includes(b)).length;
//     question = `How many words contain both '${a}' and '${b}' in the same word?`;
//   }

//   else if (mode === "single") {
//     const fl = frequentLetters(WORDS);
//     const vowels = ['a','e','i','o','u'];

//     const weighted = [
//       ...vowels, ...vowels,
//       ...fl
//     ];

//     const letter = weighted[Math.floor(Math.random() * weighted.length)];

//     correctAnswer = words.filter(w => w.includes(letter)).length;
//     question = `How many words contain the letter '${letter}'?`;
//   }

//   else {
//     correctAnswer = words.filter(hasRepeatedLetter).length;
//     question = "How many words contain repeated letters? Examples: apple";
//   }

//   const options = new Set([correctAnswer]);
//   while (options.size < 4) {
//     const offset = Math.floor(Math.random() * 7) - 3;
//     const value = correctAnswer + offset;
//     if (value >= 0 && value !== correctAnswer) options.add(value);
//   }

//   const shuffled = [...options].sort(() => Math.random() - 0.5);
//   return { words, question, correctAnswer, options: shuffled };
// }


// const WIDTH = 400;
// const HEIGHT = 250;

// export async function renderImageBase64(words) {
//   const canvas = createCanvas(WIDTH, HEIGHT);
//   const ctx = canvas.getContext("2d");

//   // background
//   ctx.fillStyle = "white";
//   ctx.fillRect(0, 0, WIDTH, HEIGHT);

//   // font & style
//   const padding = 10;
//   const maxWidth = WIDTH - padding * 2;
//   ctx.fillStyle = "black";
//   ctx.font = "26px Arial";
//   ctx.textBaseline = "middle";

//   // words -> sentence string
//   const text = words.join(" ");

//   // --- automatic word wrap ---
//   const pieces = text.split(" ");
//   let lines = [];
//   let line = "";

//   pieces.forEach(word => {
//     const test = line + word + " ";
//     if (ctx.measureText(test).width > maxWidth && line !== "") {
//       lines.push(line);
//       line = word + " ";
//     } else {
//       line = test;
//     }
//   });
//   if (line) lines.push(line);

//   const lineHeight = 32;
//   const totalTextHeight = lines.length * lineHeight;
//   let y = (HEIGHT - totalTextHeight) / 2 + lineHeight / 2;

//   for (let l of lines) {
//     const txtWidth = ctx.measureText(l).width;
//     ctx.fillText(l, (WIDTH - txtWidth) / 2, y);
//     y += lineHeight;
//   }

//   return canvas.toBuffer("image/png").toString("base64");
// }

















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
function diff_lt(iq) {
  const n = parseInt(iq);
  let DIFF;

  if(n === 105){
    DIFF = {
      "Too Easy": 5 + n,
      "Easy": 10 + n,
      "Medium": 15 + n,
      "Tough": 20 + n,
      "Too Tough": 25 + n
    }
  }else{
    DIFF = {
      "Too Easy": 5 + n,
      "Easy": 10 + n,
      "Medium": 15 + n,
      "Tough": 20 + n,
      "Too Tough": 25 + n
    }
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
export function generateData(difficulty, iq) {
  const diff_data = diff_lt(iq);
  const count = diff_data[difficulty];
  const words = [...WORDS].sort(() => Math.random() - 0.5).slice(0, count);

  // now 3 modes
  const modes = ["letters", "repeat", "single"];
  const mode = modes[Math.floor(Math.random() * modes.length)];

  let question = "";
  let correctAnswer = 0;

  if (mode === "letters") {
    const fl = frequentLetters(WORDS);
    const vowels = ['a','e','i','o','u'];

    const weighted = [
      ...vowels, ...vowels, ...vowels,
      ...fl
    ];

    const pick = () => weighted[Math.floor(Math.random() * weighted.length)];

    let a = pick();
    let b = pick();
    while (a === b) b = pick();

    correctAnswer = words.filter(w => w.includes(a) && w.includes(b)).length;
    question = `How many words contain both '${a}' and '${b}' in the same word?`;
  }

  else if (mode === "single") {
    const fl = frequentLetters(WORDS);
    const vowels = ['a','e','i','o','u'];

    const weighted = [
      ...vowels, ...vowels,
      ...fl
    ];

    const letter = weighted[Math.floor(Math.random() * weighted.length)];

    correctAnswer = words.filter(w => w.includes(letter)).length;
    question = `How many words contain the letter '${letter}'?`;
  }

  else {
    correctAnswer = words.filter(hasRepeatedLetter).length;
    question = "How many words contain repeated letters? Examples: apple";
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



