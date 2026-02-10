//Befor per < 5
// import { createCanvas, loadImage } from "canvas";

// const WIDTH = 400;
// const HEIGHT = 250;

// // ------------------- WORDS -------------------
// const WORDS = [
//   "logic","brain","focus","count","memory","visual","random","sentence","training",
//   "accuracy","intelligence","perception","concentration","comprehension",
//   "deduction","inference","analysis","creativity","imagination","intuition",
//   "knowledge","understanding","observation","classification","categorization",
//   "calculation","optimization","generalization","abstraction","significance"
// ];

// // ------------------- DIFFICULTY DATA -------------------
// function diff_data(per) {
//   per = Math.max(0, Math.min(per, 100));
//   const base = { w1: [4, 5], w2: [4, 5], indexMax: 6 };
//   const step = Math.floor(per / 10);

//   return {
//     "Too Easy": {
//       w1: [base.w1[0] + step, base.w1[1] + step],
//       w2: [base.w2[0] + step, base.w2[1] + step],
//       indexMax: base.indexMax + step * 2
//     },
//     "Easy": {
//       w1: [base.w1[0] + step + 1, base.w1[1] + step + 1],
//       w2: [base.w2[0] + step + 1, base.w2[1] + step + 1],
//       indexMax: base.indexMax + step * 2 + 2
//     },
//     "Medium": {
//       w1: [base.w1[0] + step + 2, base.w1[1] + step + 2],
//       w2: [base.w2[0] + step + 2, base.w2[1] + step + 2],
//       indexMax: base.indexMax + step * 2 + 4
//     },
//     "Tough": {
//       w1: [base.w1[0] + step + 3, base.w1[1] + step + 3],
//       w2: [base.w2[0] + step + 3, base.w2[1] + step + 3],
//       indexMax: base.indexMax + step * 2 + 6
//     },
//     "Too Tough": {
//       w1: [base.w1[0] + step + 4, base.w1[1] + step + 4],
//       w2: [base.w2[0] + step + 4, base.w2[1] + step + 4],
//       indexMax: base.indexMax + step * 2 + 8
//     }
//   };
// }

// function rand(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function generateSentence(count) {
//   return Array.from({ length: count }, () => WORDS[rand(0, WORDS.length - 1)]);
// }

// function ordinal(n) {
//   if (n % 100 >= 11 && n % 100 <= 13) return `${n}th`;
//   if (n % 10 === 1) return `${n}st`;
//   if (n % 10 === 2) return `${n}nd`;
//   if (n % 10 === 3) return `${n}rd`;
//   return `${n}th`;
// }

// // ------------------- CORE GAME DATA -------------------
// export function generateData1(difficulty, per) {
//   const normalizedDifficulty =
//     typeof difficulty === "string"
//       ? difficulty.trim().toLowerCase()
//       : "";

//   const DIFF_MAP = {
//     "too easy": "Too Easy",
//     "easy": "Easy",
//     "medium": "Medium",
//     "tough": "Tough",
//     "too tough": "Too Tough"
//   };

//   // ✅ FIX: fallback to Medium
//   const diffKey = DIFF_MAP[normalizedDifficulty] || "Medium";
//   const diff = diff_data(per)[diffKey];

//   const s1 = generateSentence(rand(...diff.w1));
//   const s2 = generateSentence(rand(...diff.w2));
//   const allWords = [...s1, ...s2];
//   const fullText = s1.join(" ") + ". " + s2.join(" ") + ".";

//   let correctAnswer = 0;
//   let question = "";

//   const modePool =
//     diffKey === "Too Tough"
//       ? ["single", "before", "after", "right", "dual"]
//       : diffKey === "Tough"
//         ? ["single", "before", "after", "right"]
//         : ["single"];

//   const mode = modePool[rand(0, modePool.length - 1)];

//   let index, index2, word;

//   if (mode === "dual") {
//     index = rand(2, diff.indexMax - 2);
//     index2 = rand(2, diff.indexMax - 2);
//     while (index2 === index) index2 = rand(2, diff.indexMax - 2);

//     correctAnswer =
//       allWords[index - 1].length + allWords[index2 - 1].length;

//     question = `Count letters of word ${ordinal(index)} and ${ordinal(index2)}`;
//   } else {
//     index = rand(2, diff.indexMax - 1);

//     if (mode === "before") {
//       word = allWords[index - 2];
//       question = `Count letters of word before the ${ordinal(index)} word`;
//     } else if (mode === "after") {
//       word = allWords[index];
//       question = `Count letters of word after the ${ordinal(index)} word`;
//     } else if (mode === "right") {
//       word = allWords[index];
//       question = `Count letters of word right side of ${ordinal(index)}`;
//     } else {
//       word = allWords[index - 1];
//       question = `Count letters of the ${ordinal(index)} word`;
//     }

//     correctAnswer = word.length;
//   }

//   const opts = new Set([correctAnswer]);
//   let d = 1;
//   while (opts.size < 4) {
//     opts.add(correctAnswer + d);
//     if (correctAnswer - d > 0) opts.add(correctAnswer - d);
//     d++;
//   }

//   const options = [...opts].sort(() => Math.random() - 0.5);

//   return { text: fullText, question, correctAnswer, options };
// }


// // ------------------- IMAGE RENDER -------------------
// export async function renderImageBase641(text) {
//   const canvas = createCanvas(WIDTH, HEIGHT);
//   const ctx = canvas.getContext("2d");

//   ctx.fillStyle = "white";
//   ctx.fillRect(0, 0, WIDTH, HEIGHT);

//   const border = 3;
//   const radius = 10;

//   ctx.lineWidth = border;
//   ctx.strokeStyle = "black";

//   ctx.beginPath();
//   ctx.moveTo(radius, border);
//   ctx.lineTo(WIDTH - radius, border);
//   ctx.quadraticCurveTo(WIDTH - border, border, WIDTH - border, radius);
//   ctx.lineTo(WIDTH - border, HEIGHT - radius);
//   ctx.quadraticCurveTo(WIDTH - border, HEIGHT - border, WIDTH - radius, HEIGHT - border);
//   ctx.lineTo(radius, HEIGHT - border);
//   ctx.quadraticCurveTo(border, HEIGHT - border, border, HEIGHT - radius);
//   ctx.lineTo(border, radius);
//   ctx.quadraticCurveTo(border, border, radius, border);
//   ctx.stroke();

//   const padding = 14;
//   const maxWidth = WIDTH - padding * 2;

//   ctx.fillStyle = "black";
//   ctx.font = "16px Arial";
//   ctx.textBaseline = "middle";

//   const words = text.split(" ");
//   let line = "";
//   let y = HEIGHT / 2 - 30;
//   const lineHeight = 22;

//   for (let i = 0; i < words.length; i++) {
//     const testLine = line + words[i] + " ";
//     if (ctx.measureText(testLine).width > maxWidth && i > 0) {
//       ctx.fillText(line, (WIDTH - ctx.measureText(line).width) / 2, y);
//       line = words[i] + " ";
//       y += lineHeight;
//     } else {
//       line = testLine;
//     }
//   }

//   ctx.fillText(line, (WIDTH - ctx.measureText(line).width) / 2, y);

//   return canvas.toBuffer("image/png").toString("base64");
// }






























// import { createCanvas } from "canvas";

// const WIDTH = 400;
// const HEIGHT = 250;

// // ------------------- WORDS -------------------
// const WORDS = [
//   "logic","brain","focus","count","memory","visual","random","sentence","training",
//   "accuracy","intelligence","perception","concentration","comprehension",
//   "deduction","inference","analysis","creativity","imagination","intuition",
//   "knowledge","understanding","observation","classification","categorization",
//   "calculation","optimization","generalization","abstraction","significance"
// ];

// // ------------------- DIFFICULTY DATA -------------------
// function diff_data(per) {
//   per = Math.max(0, Math.min(per, 100));

//   const base = { w1: [4, 5], w2: [4, 5], indexMax: 6 };

//   // ✅ CHANGE IS HERE (every 5%)
//   const step = Math.floor(per / 5);

//   return {
//     "Too Easy": {
//       w1: [base.w1[0] + step, base.w1[1] + step],
//       w2: [base.w2[0] + step, base.w2[1] + step],
//       indexMax: base.indexMax + step * 2
//     },
//     "Easy": {
//       w1: [base.w1[0] + step + 1, base.w1[1] + step + 1],
//       w2: [base.w2[0] + step + 1, base.w2[1] + step + 1],
//       indexMax: base.indexMax + step * 2 + 2
//     },
//     "Medium": {
//       w1: [base.w1[0] + step + 2, base.w1[1] + step + 2],
//       w2: [base.w2[0] + step + 2, base.w2[1] + step + 2],
//       indexMax: base.indexMax + step * 2 + 4
//     },
//     "Tough": {
//       w1: [base.w1[0] + step + 3, base.w1[1] + step + 3],
//       w2: [base.w2[0] + step + 3, base.w2[1] + step + 3],
//       indexMax: base.indexMax + step * 2 + 6
//     },
//     "Too Tough": {
//       w1: [base.w1[0] + step + 4, base.w1[1] + step + 4],
//       w2: [base.w2[0] + step + 4, base.w2[1] + step + 4],
//       indexMax: base.indexMax + step * 2 + 8
//     }
//   };
// }

// // ------------------- HELPERS -------------------
// function rand(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function generateSentence(count) {
//   return Array.from({ length: count }, () => WORDS[rand(0, WORDS.length - 1)]);
// }

// function ordinal(n) {
//   if (n % 100 >= 11 && n % 100 <= 13) return `${n}th`;
//   if (n % 10 === 1) return `${n}st`;
//   if (n % 10 === 2) return `${n}nd`;
//   if (n % 10 === 3) return `${n}rd`;
//   return `${n}th`;
// }

// // ------------------- CORE GAME DATA -------------------
// export function generateData1(difficulty, per) {
//   const normalizedDifficulty =
//     typeof difficulty === "string"
//       ? difficulty.trim().toLowerCase()
//       : "";

//   const DIFF_MAP = {
//     "too easy": "Too Easy",
//     "easy": "Easy",
//     "medium": "Medium",
//     "tough": "Tough",
//     "too tough": "Too Tough"
//   };

//   const diffKey = DIFF_MAP[normalizedDifficulty] || "Medium";
//   const diff = diff_data(50)[diffKey];

//   const s1 = generateSentence(rand(...diff.w1));
//   const s2 = generateSentence(rand(...diff.w2));

//   const allWords = [...s1, ...s2];
//   const fullText = s1.join(" ") + ". " + s2.join(" ") + ".";

//   let correctAnswer = 0;
//   let question = "";

//   const modePool =
//     diffKey === "Too Easy"
//       ? ["single", "before", "after", "right", "dual"]
//       : diffKey === "Tough"
//         ? ["single", "before", "after", "right"]
//         : ["single"];

//   const mode = modePool[rand(0, modePool.length - 1)];

//   let index, index2, word;

//   if (mode === "dual") {
//     index = rand(2, diff.indexMax - 2);
//     index2 = rand(2, diff.indexMax - 2);
//     while (index2 === index) index2 = rand(2, diff.indexMax - 2);

//     correctAnswer =
//       allWords[index - 1].length + allWords[index2 - 1].length;

//     question = `Count letters of word ${ordinal(index)} and ${ordinal(index2)}`;
//   } else {
//     index = rand(2, diff.indexMax - 1);

//     if (mode === "before") {
//       word = allWords[index - 2];
//       question = `Count letters of word before the ${ordinal(index)} word`;
//     } else if (mode === "after") {
//       word = allWords[index];
//       question = `Count letters of word after the ${ordinal(index)} word`;
//     } else if (mode === "right") {
//       word = allWords[index];
//       question = `Count letters of word right side of ${ordinal(index)}`;
//     } else {
//       word = allWords[index - 1];
//       question = `Count letters of the ${ordinal(index)} word`;
//     }

//     correctAnswer = word.length;
//   }

//   const opts = new Set([correctAnswer]);
//   let d = 1;
//   while (opts.size < 4) {
//     opts.add(correctAnswer + d);
//     if (correctAnswer - d > 0) opts.add(correctAnswer - d);
//     d++;
//   }

//   const options = [...opts].sort(() => Math.random() - 0.5);

//   return { text: fullText, question, correctAnswer, options };
// }

// // ------------------- IMAGE RENDER -------------------
// export async function renderImageBase641(text) {
//   const canvas = createCanvas(WIDTH, HEIGHT);
//   const ctx = canvas.getContext("2d");

//   ctx.fillStyle = "white";
//   ctx.fillRect(0, 0, WIDTH, HEIGHT);

//   ctx.lineWidth = 3;
//   ctx.strokeStyle = "black";
//   ctx.strokeRect(5, 5, WIDTH - 10, HEIGHT - 10);

//   ctx.fillStyle = "black";
//   ctx.textAlign = "center";
//   ctx.textBaseline = "top";

//   const padding = 14;
//   const maxWidth = WIDTH - padding * 2;
//   const maxHeight = HEIGHT - padding * 2;

//   let fontSize = 16;
//   let lines = [];
//   let lineHeight;

//   // 🔁 shrink font until text fits vertically
//   while (fontSize >= 10) {
//     ctx.font = `${fontSize}px Arial`;
//     lineHeight = fontSize + 6;
//     lines = [];

//     let line = "";
//     const words = text.split(" ");

//     for (let i = 0; i < words.length; i++) {
//       const testLine = line + words[i] + " ";
//       if (ctx.measureText(testLine).width > maxWidth && line) {
//         lines.push(line.trim());
//         line = words[i] + " ";
//       } else {
//         line = testLine;
//       }
//     }
//     if (line) lines.push(line.trim());

//     if (lines.length * lineHeight <= maxHeight) break;
//     fontSize--;
//   }

//   // 🧘 vertically center block
//   let y = padding + (maxHeight - lines.length * lineHeight) / 2;

//   for (const l of lines) {
//     ctx.fillText(l, WIDTH / 2, y);
//     y += lineHeight;
//   }

//   return canvas.toBuffer("image/png").toString("base64");
// }
























// import { createCanvas } from "canvas";

// const WIDTH = 400;
// const HEIGHT = 250;

// // ------------------- WORDS -------------------
// const WORDS = [
//   "logic","brain","focus","count","memory","visual","random","sentence","training",
//   "accuracy","intelligence","perception","concentration","comprehension",
//   "deduction","inference","analysis","creativity","imagination","intuition",
//   "knowledge","understanding","observation","classification","categorization",
//   "calculation","optimization","generalization","abstraction","significance"
// ];

// // ------------------- DIFFICULTY DATA -------------------
// function diff_data(iq) {
//   per = Math.max(0, Math.min(iq, 100));

//   const base = { w1: [4, 5], w2: [4, 5], indexMax: 6 };

//   // ✅ CHANGE IS HERE (every 5%)
//   const step = Math.floor((5 + per) / per);

//   return {
//     "Too Easy": {
//       w1: [base.w1[0] + step, base.w1[1] + step],
//       w2: [base.w2[0] + step, base.w2[1] + step],
//       indexMax: base.indexMax + step * 2
//     },
//     "Easy": {
//       w1: [base.w1[0] + step + 1, base.w1[1] + step + 1],
//       w2: [base.w2[0] + step + 1, base.w2[1] + step + 1],
//       indexMax: base.indexMax + step * 2 + 2
//     },
//     "Medium": {
//       w1: [base.w1[0] + step + 2, base.w1[1] + step + 2],
//       w2: [base.w2[0] + step + 2, base.w2[1] + step + 2],
//       indexMax: base.indexMax + step * 2 + 4
//     },
//     "Tough": {
//       w1: [base.w1[0] + step + 3, base.w1[1] + step + 3],
//       w2: [base.w2[0] + step + 3, base.w2[1] + step + 3],
//       indexMax: base.indexMax + step * 2 + 6
//     },
//     "Too Tough": {
//       w1: [base.w1[0] + step + 4, base.w1[1] + step + 4],
//       w2: [base.w2[0] + step + 4, base.w2[1] + step + 4],
//       indexMax: base.indexMax + step * 2 + 8
//     }
//   };
// }

// // ------------------- HELPERS -------------------
// function rand(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function generateSentence(count) {
//   return Array.from({ length: count }, () => WORDS[rand(0, WORDS.length - 1)]);
// }

// function ordinal(n) {
//   if (n % 100 >= 11 && n % 100 <= 13) return `${n}th`;
//   if (n % 10 === 1) return `${n}st`;
//   if (n % 10 === 2) return `${n}nd`;
//   if (n % 10 === 3) return `${n}rd`;
//   return `${n}th`;
// }

// // ------------------- CORE GAME DATA -------------------
// export function generateData1(difficulty, iq) {
//   const normalizedDifficulty =
//     typeof difficulty === "string"
//       ? difficulty.trim().toLowerCase()
//       : "";

//   const DIFF_MAP = {
//     "too easy": "Too Easy",
//     "easy": "Easy",
//     "medium": "Medium",
//     "tough": "Tough",
//     "too tough": "Too Tough"
//   };

//   const diffKey = DIFF_MAP[normalizedDifficulty] || "Medium";
//   const diff = diff_data(iq)[diffKey];

//   const s1 = generateSentence(rand(...diff.w1));
//   const s2 = generateSentence(rand(...diff.w2));

//   console.log(s1)
//   console.log(s2)

//   const allWords = [...s1, ...s2];
//   const fullText = s1.join(" ") + ". " + s2.join(" ") + ".";

//   let correctAnswer = 0;
//   let question = "";

//   const modePool =
//     diffKey === "Too Easy"
//       ? ["single", "before", "after", "right", "dual"]
//       : diffKey === "Tough"
//         ? ["single", "before", "after", "right"]
//         : ["single"];

//   const mode = modePool[rand(0, modePool.length - 1)];

//   let index, index2, word;

//   if (mode === "dual") {
//     index = rand(2, diff.indexMax - 2);
//     index2 = rand(2, diff.indexMax - 2);
//     while (index2 === index) index2 = rand(2, diff.indexMax - 2);

//     correctAnswer =
//       allWords[index - 1].length + allWords[index2 - 1].length;

//     question = `Count letters of word ${ordinal(index)} and ${ordinal(index2)}`;
//   } else {
//     index = rand(2, diff.indexMax - 1);

//     if (mode === "before") {
//       word = allWords[index - 2];
//       question = `Count letters of word before the ${ordinal(index)} word`;
//     } else if (mode === "after") {
//       word = allWords[index];
//       question = `Count letters of word after the ${ordinal(index)} word`;
//     } else if (mode === "right") {
//       word = allWords[index];
//       question = `Count letters of word right side of ${ordinal(index)}`;
//     } else {
//       word = allWords[index - 1];
//       question = `Count letters of the ${ordinal(index)} word`;
//     }

//     correctAnswer = word.length;
//   }

//   const opts = new Set([correctAnswer]);
//   let d = 1;
//   while (opts.size < 4) {
//     opts.add(correctAnswer + d);
//     if (correctAnswer - d > 0) opts.add(correctAnswer - d);
//     d++;
//   }

//   const options = [...opts].sort(() => Math.random() - 0.5);

//   return { text: fullText, question, correctAnswer, options };
// }

// // ------------------- IMAGE RENDER -------------------
// export async function renderImageBase641(text) {
//   const canvas = createCanvas(WIDTH, HEIGHT);
//   const ctx = canvas.getContext("2d");

//   ctx.fillStyle = "white";
//   ctx.fillRect(0, 0, WIDTH, HEIGHT);

//   ctx.lineWidth = 3;
//   ctx.strokeStyle = "black";
//   ctx.strokeRect(5, 5, WIDTH - 10, HEIGHT - 10);

//   ctx.fillStyle = "black";
//   ctx.textAlign = "center";
//   ctx.textBaseline = "top";

//   const padding = 14;
//   const maxWidth = WIDTH - padding * 2;
//   const maxHeight = HEIGHT - padding * 2;

//   let fontSize = 16;
//   let lines = [];
//   let lineHeight;

//   // 🔁 shrink font until text fits vertically
//   while (fontSize >= 10) {
//     ctx.font = `${fontSize}px Arial`;
//     lineHeight = fontSize + 6;
//     lines = [];

//     let line = "";
//     const words = text.split(" ");

//     for (let i = 0; i < words.length; i++) {
//       const testLine = line + words[i] + " ";
//       if (ctx.measureText(testLine).width > maxWidth && line) {
//         lines.push(line.trim());
//         line = words[i] + " ";
//       } else {
//         line = testLine;
//       }
//     }
//     if (line) lines.push(line.trim());

//     if (lines.length * lineHeight <= maxHeight) break;
//     fontSize--;
//   }

//   // 🧘 vertically center block
//   let y = padding + (maxHeight - lines.length * lineHeight) / 2;

//   for (const l of lines) {
//     ctx.fillText(l, WIDTH / 2, y);
//     y += lineHeight;
//   }

//   return canvas.toBuffer("image/png").toString("base64");
// }












import { createCanvas } from "canvas";

// ==========================
// CANVAS CONFIG
// ==========================
const WIDTH = 400;
const HEIGHT = 250;

// ==========================
// WORD BANK
// ==========================
const WORDS = [
  "logic","brain","focus","count","memory","visual","random","sentence","training",
  "accuracy","intelligence","perception","concentration","comprehension",
  "deduction","inference","analysis","creativity","imagination","intuition",
  "knowledge","understanding","observation","classification","categorization",
  "calculation","optimization","generalization","abstraction","significance"
];

// ==========================
// DIFFICULTY AS NUMBERS
// ==========================

// ==========================
// IQ → SCALE (SAFE)
// ==========================
function iqScale(iq) {
  const per = Math.max(0, Math.min(iq, 100));
  return Math.floor(per / 20); // 0 → 5
}

// ==========================
// DIFFICULTY DATA
// ==========================
function diff_data(iq) {
  const scale = iqScale(iq);

  const n = parseInt(iq)

  const DIFFICULTY = {
    "Too Easy": 2 + n,
    "Easy": 5 + n,
    "Medium": 10 + n,
    "Tough": 15 + n,
    "Too Tough": 20 + n
  };


  return Object.fromEntries(
    Object.entries(DIFFICULTY).map(([level, base]) => {
      const size = base + scale;

      return [
        level,
        {
          w1: [size, size + 1],
          w2: [size, size + 1],
          indexMax: size * 2 + 2
        }
      ];
    })
  );
}

// ==========================
// HELPERS
// ==========================
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateSentence(count) {
  return Array.from({ length: count }, () =>
    WORDS[rand(0, WORDS.length - 1)]
  );
}

function ordinal(n) {
  if (n % 100 >= 11 && n % 100 <= 13) return `${n}th`;
  if (n % 10 === 1) return `${n}st`;
  if (n % 10 === 2) return `${n}nd`;
  if (n % 10 === 3) return `${n}rd`;
  return `${n}th`;
}

// ==========================
// CORE GAME LOGIC
// ==========================
export function generateData1(difficulty, iq) {
  const DIFF_MAP = {
    "too easy": "Too Easy",
    "easy": "Easy",
    "medium": "Medium",
    "tough": "Tough",
    "too tough": "Too Tough"
  };

  const diffKey =
    DIFF_MAP[String(difficulty).toLowerCase().trim()] || "Medium";

  const diff = diff_data(iq)[diffKey];

  const s1 = generateSentence(rand(...diff.w1));
  const s2 = generateSentence(rand(...diff.w2));

  const allWords = [...s1, ...s2];
  const fullText = s1.join(" ") + ". " + s2.join(" ") + ".";

  let correctAnswer = 0;
  let question = "";

  const modePool =
    diffKey === "Too Easy"
      ? ["single", "before", "after", "right", "dual"]
      : diffKey === "Tough" || diffKey === "Too Tough"
        ? ["single", "before", "after", "right"]
        : ["single"];

  const mode = modePool[rand(0, modePool.length - 1)];

  let index, index2, word;

  if (mode === "dual") {
    index = rand(2, diff.indexMax - 2);
    index2 = rand(2, diff.indexMax - 2);
    while (index2 === index) index2 = rand(2, diff.indexMax - 2);

    correctAnswer =
      allWords[index - 1].length + allWords[index2 - 1].length;

    question = `Count letters of word ${ordinal(index)} and ${ordinal(index2)}`;
  } else {
    index = rand(2, diff.indexMax - 1);

    if (mode === "before") {
      word = allWords[index - 2];
      question = `Count letters of word before the ${ordinal(index)} word`;
    } else if (mode === "after") {
      word = allWords[index];
      question = `Count letters of word after the ${ordinal(index)} word`;
    } else if (mode === "right") {
      word = allWords[index];
      question = `Count letters of word right side of ${ordinal(index)}`;
    } else {
      word = allWords[index - 1];
      question = `Count letters of the ${ordinal(index)} word`;
    }

    correctAnswer = word.length;
  }

  // options
  const opts = new Set([correctAnswer]);
  let d = 1;
  while (opts.size < 4) {
    opts.add(correctAnswer + d);
    if (correctAnswer - d > 0) opts.add(correctAnswer - d);
    d++;
  }

  const options = [...opts].sort(() => Math.random() - 0.5);

  return { text: fullText, question, correctAnswer, options };
}

// ==========================
// IMAGE RENDER
// ==========================
export async function renderImageBase641(text) {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.lineWidth = 3;
  ctx.strokeStyle = "black";
  ctx.strokeRect(5, 5, WIDTH - 10, HEIGHT - 10);

  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  const padding = 14;
  const maxWidth = WIDTH - padding * 2;
  const maxHeight = HEIGHT - padding * 2;

  let fontSize = 16;
  let lines = [];
  let lineHeight;

  while (fontSize >= 10) {
    ctx.font = `${fontSize}px Arial`;
    lineHeight = fontSize + 6;
    lines = [];

    let line = "";
    const words = text.split(" ");

    for (const w of words) {
      const test = line + w + " ";
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line.trim());
        line = w + " ";
      } else {
        line = test;
      }
    }
    if (line) lines.push(line.trim());

    if (lines.length * lineHeight <= maxHeight) break;
    fontSize--;
  }

  let y = padding + (maxHeight - lines.length * lineHeight) / 2;

  for (const l of lines) {
    ctx.fillText(l, WIDTH / 2, y);
    y += lineHeight;
  }

  return canvas.toBuffer("image/png").toString("base64");
}
