// emoji_missing_mcq.js
import { createCanvas } from "canvas";

// ==========================
// CONFIG
// ==========================
const WIDTH = 400;
const HEIGHT = 250;

const EMOJIS = ["😊", "😍", "😁", "😋", "😒", "😑", "😣", "😙", "😗"];

// ==========================
// MAIN FUNCTION
// ==========================
export function generateEmojiPuzzle() {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");

  // background
  ctx.fillStyle = "#f2f2f2";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // partition line
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(WIDTH / 2, 20);
  ctx.lineTo(WIDTH / 2, HEIGHT - 20);
  ctx.stroke();

  // titles
  ctx.fillStyle = "#000";
  ctx.font = "bold 18px Arial";
  ctx.fillText("Group A", 80, 30);
  ctx.fillText("Group B", WIDTH / 2 + 80, 30);

  // pick emojis
  const baseEmojis = shuffle([...EMOJIS]).slice(0, 4);

  let groupA = [...baseEmojis];
  let groupB = [...baseEmojis];

  const missingIndex = Math.floor(Math.random() * baseEmojis.length);
  const missingEmoji = baseEmojis[missingIndex];
  const missingGroup = Math.random() < 0.5 ? "A" : "B";

  if (missingGroup === "A") {
    groupA.splice(missingIndex, 1);
  } else {
    groupB.splice(missingIndex, 1);
  }

  // draw emojis
  ctx.font = "32px Arial";
  drawEmojiRow(ctx, groupA, 60, 90);
  drawEmojiRow(ctx, groupB, WIDTH / 2 + 60, 90);

  // options = ALL emojis (confusion mode)
  const options = shuffle([...EMOJIS]);

  const base64Image = canvas
    .toDataURL("image/png")
    .replace(/^data:image\/png;base64,/, "");

  return {
    image: base64Image,
    question: `Find the missing emoji in Group ${missingGroup}.`,
    missingFrom: missingGroup,
    options,
    correct: missingEmoji
  };
}

// ==========================
// HELPERS
// ==========================
function drawEmojiRow(ctx, emojis, startX, startY) {
  emojis.forEach((emoji, i) => {
    ctx.fillText(emoji, startX + i * 40, startY);
  });
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
