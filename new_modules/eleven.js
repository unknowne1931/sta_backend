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

export function generatePuzzle_color(totalWords = 15) {
  const width = 400;
  const height = 250;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // ⚪ Plain background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  let matchCount = 0;

  // Grid setup
  const cols = Math.ceil(Math.sqrt(totalWords));
  const rows = Math.ceil(totalWords / cols);

  const xGap = width / cols;
  const yGap = height / rows;

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // 🔥 Only words (no styling except font)
  ctx.font = "bold 16px Arial";

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

    ctx.fillStyle = color;
    ctx.fillText(word.name, x, y);
  }

  // Options
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