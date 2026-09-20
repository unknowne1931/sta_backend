// // colorMatchPuzzle.js
// // Node.js version — premium UI, dark-mode neon, base64 image output
// // Canvas: 400 x 250
// // All puzzle logic UNCHANGED.
// // Run: node colorMatchPuzzle.js

// // const { createCanvas } = require("canvas");
// import { createCanvas } from "canvas";

// const COLORS = [
//   { name: "RED", code: "#FF0000" },
//   { name: "GREEN", code: "#037103" },
//   { name: "BLUE", code: "#0000FF" },
//   { name: "YELLOW", code: "#dee600" },
//   { name: "ORANGE", code: "#ff8c00" },
//   { name: "PURPLE", code: "#800080" }
// ];

// function getRandom(arr) {
//   return arr[Math.floor(Math.random() * arr.length)];
// }

// // -----------------------------------
// // Rounded rect helper
// // -----------------------------------
// function roundRect(ctx, x, y, w, h, r) {
//   if (w < 2 * r) r = w / 2;
//   if (h < 2 * r) r = h / 2;
//   ctx.beginPath();
//   ctx.moveTo(x + r, y);
//   ctx.arcTo(x + w, y, x + w, y + h, r);
//   ctx.arcTo(x + w, y + h, x, y + h, r);
//   ctx.arcTo(x, y + h, x, y, r);
//   ctx.arcTo(x, y, x + w, y, r);
//   ctx.closePath();
// }

// // -----------------------------------
// // Main puzzle generator (logic UNCHANGED)
// // -----------------------------------
// export function generatePuzzle_color(totalWords = 10) {
//   const width = 400;
//   const height = 250;

//   const canvas = createCanvas(width, height);
//   const ctx = canvas.getContext("2d");

//   // ============================================================
//   // 🎨 PREMIUM BACKGROUND
//   // ============================================================
//   const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
//   bgGradient.addColorStop(0, "#050b18");
//   bgGradient.addColorStop(0.5, "#0b1530");
//   bgGradient.addColorStop(1, "#050b18");
//   ctx.fillStyle = bgGradient;
//   ctx.fillRect(0, 0, width, height);

//   // Ambient glow blobs
//   ctx.save();
//   ctx.globalAlpha = 0.10;
//   const blobs = [
//     { x: width * 0.15, y: height * 0.2, r: 90, c: "#3b82f6" },
//     { x: width * 0.85, y: height * 0.4, r: 110, c: "#a855f7" },
//     { x: width * 0.5, y: height * 0.95, r: 120, c: "#22d3ee" },
//   ];
//   for (const b of blobs) {
//     const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
//     g.addColorStop(0, b.c);
//     g.addColorStop(1, "transparent");
//     ctx.fillStyle = g;
//     ctx.beginPath();
//     ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
//     ctx.fill();
//   }
//   ctx.restore();

//   // Top gradient accent bar
//   const topBar = ctx.createLinearGradient(0, 0, width, 0);
//   topBar.addColorStop(0, "#1d4ed8");
//   topBar.addColorStop(0.5, "#7c3aed");
//   topBar.addColorStop(1, "#1d4ed8");
//   ctx.fillStyle = topBar;
//   roundRect(ctx, 8, 6, width - 16, 4, 2);
//   ctx.fill();

//   // ============================================================
//   // 🧩 PUZZLE LOGIC (UNCHANGED)
//   // ============================================================
//   let matchCount = 0;

//   const cols = Math.ceil(Math.sqrt(totalWords));
//   const rows = Math.ceil(totalWords / cols);

//   const xGap = width / cols;
//   const yGap = height / rows;

//   ctx.textAlign = "center";
//   ctx.textBaseline = "middle";
//   ctx.font = "bold 16px Arial";

//   // Store word entries first so we can draw them
//   const entries = [];

//   for (let i = 0; i < totalWords; i++) {
//     const word = getRandom(COLORS);
//     let color;

//     if (Math.random() > 0.5) {
//       color = word.code;
//       matchCount++;
//     } else {
//       let other;
//       do {
//         other = getRandom(COLORS);
//       } while (other.name === word.name);
//       color = other.code;
//     }

//     const col = i % cols;
//     const row = Math.floor(i / cols);

//     const x = col * xGap + xGap / 2;
//     const y = row * yGap + yGap / 2;

//     entries.push({ word, color, x, y });
//   }

//   // ============================================================
//   // ✨ DRAW EACH WORD — text only, no box
//   // ============================================================
//   const fontSize = 17;

//   for (const e of entries) {
//     ctx.save();
//     ctx.font = `bold ${fontSize}px Arial`;
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";
//     ctx.fillStyle = e.color;
//     ctx.shadowColor = e.color + "aa";
//     ctx.shadowBlur = 5;
//     ctx.fillText(e.word.name, e.x, e.y + 0.5);
//     ctx.restore();
//   }

//   // ============================================================
//   // 🖋 WATERMARK (premium style)
//   // ============================================================
//   ctx.save();
//   ctx.strokeStyle = "rgba(148, 163, 184, 0.22)";
//   ctx.lineWidth = 1;
//   ctx.beginPath();
//   ctx.moveTo(12, height - 22);
//   ctx.lineTo(width - 12, height - 22);
//   ctx.stroke();

//   ctx.textAlign = "right";
//   ctx.textBaseline = "middle";
//   ctx.font = "bold 12px Arial";
//   ctx.fillStyle = "rgba(226, 232, 240, 0.9)";
//   ctx.fillText("powered by AVI", width - 14, height - 11);
//   ctx.restore();

//   // ============================================================
//   // 🎯 OPTIONS (UNCHANGED)
//   // ============================================================
//   let options = new Set();
//   options.add(matchCount);

//   while (options.size < 4) {
//     let fake = matchCount + Math.floor(Math.random() * 7) - 3;
//     if (fake >= 0 && fake <= totalWords) {
//       options.add(fake);
//     }
//   }

//   options = Array.from(options).sort(() => Math.random() - 0.5);

//   const base64 = canvas.toDataURL().split(",")[1];

//   return {
//     totalWords,
//     question: `How many colour names match their text colour out of ${totalWords}?`,
//     options,
//     answer: matchCount,
//     image: base64
//   };
// }

// // -----------------------------------
// // CLI usage
// // -----------------------------------
// if (import.meta.url === `file://${process.argv[1]}`) {
//   const puzzle = generatePuzzle_color(10);
//   console.log("\n🎨 Color Match Puzzle");
//   console.log("Question:", puzzle.question);
//   console.log("Options:", puzzle.options);
//   console.log("Answer:", puzzle.answer);
//   console.log("🖼️  Base64 image length:", puzzle.image.length, "chars");
// }












// colorMatchPuzzle.js
// Node.js version — premium UI, dark-mode neon, base64 image output
// Canvas: 400 x 250
// All puzzle logic UNCHANGED.
// Run: node colorMatchPuzzle.js

// const { createCanvas } = require("canvas");
import { createCanvas } from "canvas";

const COLORS = [
  { name: "RED", code: "#FF0000" },
  { name: "GREEN", code: "#037103" },
  { name: "BLUE", code: "#0000FF" },
  { name: "YELLOW", code: "#dee600" },
  { name: "ORANGE", code: "#ff8c00" },
  { name: "PURPLE", code: "#800080" }
];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// -----------------------------------
// Rounded rect helper
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

// ✅ NEW: Premium font stack
const FONT_STACK =
  '"Inter", "Poppins", "Montserrat", "Helvetica Neue", Arial, sans-serif';

// ✅ NEW: Draw text with manual letter-spacing for a premium look
function drawSpacedText(ctx, text, cx, cy, spacing) {
  const chars = [...text];
  const widths = chars.map((c) => ctx.measureText(c).width);
  const totalW =
    widths.reduce((a, b) => a + b, 0) + spacing * (chars.length - 1);

  let x = cx - totalW / 2;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";

  for (let i = 0; i < chars.length; i++) {
    ctx.fillText(chars[i], x, cy);
    x += widths[i] + spacing;
  }
}

// -----------------------------------
// Main puzzle generator (logic UNCHANGED)
// -----------------------------------
export function generatePuzzle_color(totalWords = 10) {
  const width = 400;
  const height = 250;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // ============================================================
  // 🎨 PREMIUM BACKGROUND
  // ============================================================
  const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
  bgGradient.addColorStop(0, "#050b18");
  bgGradient.addColorStop(0.5, "#0b1530");
  bgGradient.addColorStop(1, "#050b18");
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, width, height);

  // Ambient glow blobs
  ctx.save();
  ctx.globalAlpha = 0.10;
  const blobs = [
    { x: width * 0.15, y: height * 0.2, r: 90, c: "#3b82f6" },
    { x: width * 0.85, y: height * 0.4, r: 110, c: "#a855f7" },
    { x: width * 0.5, y: height * 0.95, r: 120, c: "#22d3ee" },
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

  // Top gradient accent bar
  const topBar = ctx.createLinearGradient(0, 0, width, 0);
  topBar.addColorStop(0, "#1d4ed8");
  topBar.addColorStop(0.5, "#7c3aed");
  topBar.addColorStop(1, "#1d4ed8");
  ctx.fillStyle = topBar;
  roundRect(ctx, 8, 6, width - 16, 4, 2);
  ctx.fill();

  // ============================================================
  // 🧩 PUZZLE LOGIC (UNCHANGED)
  // ============================================================
  let matchCount = 0;

  const cols = Math.ceil(Math.sqrt(totalWords));
  const rows = Math.ceil(totalWords / cols);

  const xGap = width / cols;
  const yGap = height / rows;

  // Store word entries first
  const entries = [];

  for (let i = 0; i < totalWords; i++) {
    const word = getRandom(COLORS);
    let color;

    if (Math.random() > 0.5) {
      color = word.code;
      matchCount++;
    } else {
      let other;
      do {
        other = getRandom(COLORS);
      } while (other.name === word.name);
      color = other.code;
    }

    const col = i % cols;
    const row = Math.floor(i / cols);

    const x = col * xGap + xGap / 2;
    const y = row * yGap + yGap / 2;

    entries.push({ word, color, x, y });
  }

  // ============================================================
  // ✨ DRAW EACH WORD — premium font, letter-spacing, soft glow
  // ============================================================
  const fontSize = 14;
  const letterSpacing = 1.6;

  for (const e of entries) {
    // ---- Soft outer glow (drawn twice at low alpha for a smooth halo) ----
    ctx.save();
    ctx.font = `800 ${fontSize}px ${FONT_STACK}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Wide soft glow
    ctx.globalAlpha = 0.35;
    ctx.shadowColor = e.color;
    ctx.shadowBlur = 16;
    ctx.fillStyle = e.color;
    drawSpacedText(ctx, e.word.name, e.x, e.y + 0.5, letterSpacing);

    // Tight inner glow for pop
    ctx.globalAlpha = 0.9;
    ctx.shadowColor = e.color;
    ctx.shadowBlur = 6;
    drawSpacedText(ctx, e.word.name, e.x, e.y + 0.5, letterSpacing);

    ctx.restore();

    // ---- Main crisp text ----
    ctx.save();
    ctx.font = `800 ${fontSize}px ${FONT_STACK}`;
    ctx.fillStyle = e.color;
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    drawSpacedText(ctx, e.word.name, e.x, e.y + 0.5, letterSpacing);
    ctx.restore();
  }

  // ============================================================
  // 🖋 WATERMARK (premium style)
  // ============================================================
  ctx.save();
  ctx.strokeStyle = "rgba(148, 163, 184, 0.22)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(12, height - 22);
  ctx.lineTo(width - 12, height - 22);
  ctx.stroke();

  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  ctx.font = `700 12px ${FONT_STACK}`;
  ctx.fillStyle = "rgba(226, 232, 240, 0.9)";
  ctx.fillText("powered by AVI", width - 14, height - 11);
  ctx.restore();

  // ============================================================
  // 🎯 OPTIONS (UNCHANGED)
  // ============================================================
  let options = new Set();
  options.add(matchCount);

  while (options.size < 4) {
    let fake = matchCount + Math.floor(Math.random() * 7) - 3;
    if (fake >= 0 && fake <= totalWords) {
      options.add(fake);
    }
  }

  options = Array.from(options).sort(() => Math.random() - 0.5);

  const base64 = canvas.toDataURL().split(",")[1];

  return {
    totalWords,
    question: `How many colour names match their text colour out of ${totalWords}?`,
    options,
    answer: matchCount,
    image: base64
  };
}

// -----------------------------------
// CLI usage
// -----------------------------------
if (import.meta.url === `file://${process.argv[1]}`) {
  const puzzle = generatePuzzle_color(10);
  console.log("\n🎨 Color Match Puzzle");
  console.log("Question:", puzzle.question);
  console.log("Options:", puzzle.options);
  console.log("Answer:", puzzle.answer);
  console.log("🖼️  Base64 image length:", puzzle.image.length, "chars");
}