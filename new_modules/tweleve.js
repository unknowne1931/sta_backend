import { createCanvas } from "canvas";

// -----------------------------------
// Helpers
// -----------------------------------

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// -----------------------------------
// Arrow Drawer
// -----------------------------------

function drawArrow(ctx, from, to) {
  const headlen = 10;

  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const angle = Math.atan2(dy, dx);

  // line
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();

  // arrow head
  ctx.beginPath();
  ctx.moveTo(to.x, to.y);
  ctx.lineTo(
    to.x - headlen * Math.cos(angle - Math.PI / 6),
    to.y - headlen * Math.sin(angle - Math.PI / 6)
  );
  ctx.lineTo(
    to.x - headlen * Math.cos(angle + Math.PI / 6),
    to.y - headlen * Math.sin(angle + Math.PI / 6)
  );
  ctx.lineTo(to.x, to.y);
  ctx.fillStyle = "#000";
  ctx.fill();
}

// -----------------------------------
// Main Function
// -----------------------------------

export function generatePuzzle_unlock_pattern(patternLength) {

  const width = 400;
  const height = 250;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#f2f2f2";
  ctx.fillRect(0, 0, width, height);

  // -----------------------------------
  // Points Grid (1–9)
  // -----------------------------------

  const points = [
    { id: 1, x: 100, y: 50 },
    { id: 2, x: 200, y: 50 },
    { id: 3, x: 300, y: 50 },

    { id: 4, x: 100, y: 100 },
    { id: 5, x: 200, y: 100 },
    { id: 6, x: 300, y: 100 },

    { id: 7, x: 100, y: 150 },
    { id: 8, x: 200, y: 150 },
    { id: 9, x: 300, y: 150 }
  ];

  // -----------------------------------
  // Pattern
  // -----------------------------------

  const pattern = shuffle([...points]).slice(0, patternLength);

  const startPoint = pattern[0];

  // -----------------------------------
  // Draw arrows FIRST (so dots stay on top)
  // -----------------------------------

  ctx.strokeStyle = "#000";
  ctx.lineWidth = 3;
  ctx.fillStyle = "#000";

  for (let i = 0; i < pattern.length - 1; i++) {
    drawArrow(ctx, pattern[i], pattern[i + 1]);
  }

  // -----------------------------------
  // Draw dots + numbers
  // -----------------------------------

  points.forEach(point => {

    const index = pattern.findIndex(p => p.id === point.id);

    // circle
    ctx.beginPath();
    ctx.arc(point.x, point.y, 18, 0, Math.PI * 2);

    if (index === 0) {
      ctx.fillStyle = "#494741"; // start dot
    } else {
      ctx.fillStyle = "#000000";
    }

    ctx.fill();

    // number on selected path
    if (index !== -1) {
      ctx.fillStyle = "#fff";
      ctx.font = "bold 14px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillText(
        (index + 1).toString(),
        point.x,
        point.y
      );
    }

  });

  // -----------------------------------
  // Answer
  // -----------------------------------

  const answer = pattern.map(p => p.id).join(",");

  // -----------------------------------
  // Options
  // -----------------------------------

  let options = new Set();
  options.add(answer);

  while (options.size < 4) {

    let fake = [...pattern.map(p => p.id)];

    if (Math.random() < 0.5) {

      let a = Math.floor(Math.random() * fake.length);
      let b = Math.floor(Math.random() * fake.length);

      [fake[a], fake[b]] = [fake[b], fake[a]];

    } else {

      let idx = Math.floor(Math.random() * fake.length);
      let nums = [1,2,3,4,5,6,7,8,9];

      let newNum = getRandom(nums);
      while (fake.includes(newNum)) {
        newNum = getRandom(nums);
      }

      fake[idx] = newNum;
    }

    options.add(fake.join(","));
  }

  options = shuffle([...options]);

  // -----------------------------------
  // Return
  // -----------------------------------

  return {
    question: "Follow pattern order and extract numbers",
    options,
    answer,
    image: canvas.toDataURL().split(",")[1]
  };
}