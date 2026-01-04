// emoji_missing_mcq.js
import { createCanvas } from "canvas";

// ==========================
// CONFIG
// ==========================
const WIDTH = 400;
const HEIGHT = 250;

// ==========================
// DIFFICULTY SELECTOR
// ==========================
function sel_dif(per) {

  if (per < 10) {
    return {
      "Too Easy": ["😣", "😙", "😗"],
      "Easy": ["😣", "😙", "😗", "😑"],
      "Medium": ["😣", "😙", "😗", "😑", "😒"],
      "Tough": ["😣", "😙", "😗", "😑", "😒", "😋"],
      "Too Tough": ["😣", "😙", "😗", "😑", "😒", "😋", "😁"]
    };
  }

  else if (per < 20) {
    return {
      "Too Easy": ["😣", "😙", "😗", "😑"],
      "Easy": ["😣", "😙", "😗", "😑", "😒"],
      "Medium": ["😣", "😙", "😗", "😑", "😒", "😋"],
      "Tough": ["😣", "😙", "😗", "😑", "😒", "😋", "😁"],
      "Too Tough": ["😣", "😙", "😗", "😑", "😒", "😋", "😁", "😊"]
    };
  }

  else if (per < 30) {
    return {
      "Too Easy": ["😣", "😙", "😗", "😑", "😒"],
      "Easy": ["😣", "😙", "😗", "😑", "😒", "😋"],
      "Medium": ["😣", "😙", "😗", "😑", "😒", "😋", "😁"],
      "Tough": ["😣", "😙", "😗", "😑", "😒", "😋", "😁", "😊"],
      "Too Tough": ["😣", "😙", "😗", "😑", "😒", "😋", "😁", "😊", "😍"]
    };
  }

  else if (per < 40) {
    return {
      "Too Easy": ["😣", "😙", "😗", "😑", "😒", "😋"],
      "Easy": ["😣", "😙", "😗", "😑", "😒", "😋", "😁"],
      "Medium": ["😣", "😙", "😗", "😑", "😒", "😋", "😁", "😊"],
      "Tough": ["😣", "😙", "😗", "😑", "😒", "😋", "😁", "😊", "😍"],
      "Too Tough": ["😣", "😙", "😗", "😑", "😒", "😋", "😁", "😊", "😍", "😐"]
    };
  }

  // per >= 40
  return {
    "Too Easy": ["😣", "😙", "😗", "😑", "😒", "😋", "😁"],
    "Easy": ["😣", "😙", "😗", "😑", "😒", "😋", "😁", "😊"],
    "Medium": ["😣", "😙", "😗", "😑", "😒", "😋", "😁", "😊", "😍"],
    "Tough": ["😣", "😙", "😗", "😑", "😒", "😋", "😁", "😊", "😍", "😐"],
    "Too Tough": [
      "😣","😙","😗","😑","😒",
      "😋","😁","😊","😍","😐",
      "🙄","😬","😵","🤯","😡",
      "😱","🥴","😤","😖","😫"
    ] // exactly 20
  };
}

// ==========================
// MAIN FUNCTION
// ==========================
export function generateEmojiPuzzle(level = "Too Tough", per = 80) {

  const difficultyMap = sel_dif(per);
  const EMOJIS = difficultyMap[level];

  const size = 30;

  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");

  // background
  ctx.fillStyle = "#f2f2f2";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // divider
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(WIDTH / 2, 20);
  ctx.lineTo(WIDTH / 2, HEIGHT - 20);
  ctx.stroke();

  // titles
  ctx.fillStyle = "#000";
  ctx.font = "bold 16px Arial";
  ctx.fillText("Group A", 70, 30);
  ctx.fillText("Group B", WIDTH / 2 + 70, 30);

  // shuffle base emojis
  const baseEmojis = shuffle([...EMOJIS]);

  let groupA = [...baseEmojis];
  let groupB = [...baseEmojis];

  // remove one emoji
  const missingIndex = Math.floor(Math.random() * baseEmojis.length);
  const missingEmoji = baseEmojis[missingIndex];
  const missingGroup = Math.random() < 0.5 ? "A" : "B";

  if (missingGroup === "A") groupA.splice(missingIndex, 1);
  else groupB.splice(missingIndex, 1);

  ctx.font = `${size}px Arial`;

  const boxHeight = HEIGHT - 100;

  // random scatter draw
  drawGroup(ctx, groupA, 20, 60, WIDTH / 2 - 40, boxHeight, size);
  drawGroup(ctx, groupB, WIDTH / 2 + 20, 60, WIDTH / 2 - 40, boxHeight, size);

  const options = shuffle([...EMOJIS]);

  const base64Image = canvas
    .toDataURL("image/png")
    .replace(/^data:image\/png;base64,/, "");

  return {
    image: base64Image,
    question: `Find the missing emoji in Group ${missingGroup}.`,
    difficulty: level,
    options,
    correct: missingEmoji
  };
}

// ==========================
// RANDOM SCATTER DRAW
// ==========================
function drawGroup(ctx, emojis, boxX, boxY, boxW, boxH, size) {
  const positions = [];
  const minDist = size + 6;
  const maxAttempts = 2000;

  emojis.forEach((emoji) => {
    let placed = false;
    let attempts = 0;

    while (!placed && attempts < maxAttempts) {
      const x = boxX + Math.random() * (boxW - size);
      const y = boxY + Math.random() * (boxH - size);

      const ok = positions.every(p =>
        Math.hypot(p.x - x, p.y - y) >= minDist
      );

      if (ok) {
        positions.push({ x, y });
        ctx.fillText(emoji, x, y);
        placed = true;
      }
      attempts++;
    }
  });
}

// ==========================
// SHUFFLE
// ==========================
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
