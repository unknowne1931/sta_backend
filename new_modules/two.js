// // import { createCanvas } from "canvas";

// // // ----------------------------------------------
// // // constants
// // // ----------------------------------------------
// // const WIDTH = 400;
// // const HEIGHT = 250;

// // const SHAPES = ["circle", "star", "triangle"];

// // const COLORS = [
// //   "#e74c3c", "#3498db", "#2ecc71",
// //   "#f1c40f", "#9b59b6", "#e67e22",
// //   "#1abc9c", "#34495e"
// // ];

// // const rand = (a, b) =>
// //   Math.floor(Math.random() * (b - a + 1)) + a;

// // const randomColor = () => COLORS[rand(0, COLORS.length - 1)];

// // // ----------------------------------------------
// // // difficulty (FIXED BOXES, RANDOM BROKEN)
// // // ----------------------------------------------
// // export function getDifficultiesByPer_two(per) {
// //   return {
// //     boxes: per,           // 👈 TOTAL boxes FIXED
// //     size: [30, 30],
// //     broken: [20, 30]      // 👈 BROKEN count RANDOM
// //   };
// // }

// // // ----------------------------------------------
// // // overlap check
// // // ----------------------------------------------
// // function overlap(a, b) {
// //   return !(
// //     a.x + a.w < b.x ||
// //     a.x > b.x + b.w ||
// //     a.y + a.h < b.y ||
// //     a.y > b.y + b.h
// //   );
// // }

// // // ----------------------------------------------
// // // generate options
// // // ----------------------------------------------
// // export function generateOptions_two(correct) {
// //   const set = new Set([correct]);
// //   let i = 1;

// //   while (set.size < 4) {
// //     set.add(correct + i);
// //     if (correct - i >= 0) set.add(correct - i);
// //     i++;
// //   }

// //   return [...set].sort(() => Math.random() - 0.5);
// // }

// // // ----------------------------------------------
// // // generate boxes + broken count
// // // ----------------------------------------------
// // export function generateBoxesData_two(difficulty) {
// //   const boxes = [];
// //   let tries = 0;

// //   while (boxes.length < difficulty.boxes && tries < 5000) {
// //     const size = rand(...difficulty.size);
// //     const x = rand(4, WIDTH - size - 4);
// //     const y = rand(4, HEIGHT - size - 4);

// //     const test = { x, y, w: size, h: size };

// //     if (!boxes.some(b => overlap(test, b))) {
// //       boxes.push({
// //         ...test,
// //         shape: SHAPES[rand(0, SHAPES.length - 1)],
// //         color: randomColor(),
// //         complete: true
// //       });
// //     }
// //     tries++;
// //   }

// //   // 🎯 RANDOM BROKEN COUNT
// //   const brokenCount = rand(...difficulty.broken);

// //   const shuffled = [...boxes].sort(() => Math.random() - 0.5);
// //   shuffled.slice(0, brokenCount).forEach(b => {
// //     b.complete = false;
// //   });

// //   return {
// //     boxes,
// //     brokenCount
// //   };
// // }

// // // ----------------------------------------------
// // // drawing helpers
// // // ----------------------------------------------
// // function drawStar(ctx, x, y, size) {
// //   const spikes = 5;
// //   const outer = size / 2;
// //   const inner = outer / 2.5;
// //   let rot = Math.PI / 2 * 3;
// //   const step = Math.PI / spikes;

// //   ctx.beginPath();
// //   ctx.moveTo(x, y - outer);

// //   for (let i = 0; i < spikes; i++) {
// //     ctx.lineTo(x + Math.cos(rot) * outer, y + Math.sin(rot) * outer);
// //     rot += step;
// //     ctx.lineTo(x + Math.cos(rot) * inner, y + Math.sin(rot) * inner);
// //     rot += step;
// //   }

// //   ctx.closePath();
// //   ctx.stroke();
// // }

// // function drawBoxBorderWithGap(ctx, x, y, size, broken) {
// //   const gapEdge = broken ? rand(0, 3) : -1;
// //   const gapSize = broken ? Math.floor(size * 0.1) : 0;
// //   const gapPos = broken ? rand(5, size - gapSize - 5) : 0;

// //   ctx.lineWidth = 2;

// //   // top
// //   ctx.beginPath();
// //   if (gapEdge === 0) {
// //     ctx.moveTo(x, y);
// //     ctx.lineTo(x + gapPos, y);
// //     ctx.moveTo(x + gapPos + gapSize, y);
// //     ctx.lineTo(x + size, y);
// //   } else ctx.strokeRect(x, y, size, 0);
// //   ctx.stroke();

// //   // right
// //   ctx.beginPath();
// //   if (gapEdge === 1) {
// //     ctx.moveTo(x + size, y);
// //     ctx.lineTo(x + size, y + gapPos);
// //     ctx.moveTo(x + size, y + gapPos + gapSize);
// //     ctx.lineTo(x + size, y + size);
// //   } else ctx.strokeRect(x + size, y, 0, size);
// //   ctx.stroke();

// //   // bottom
// //   ctx.beginPath();
// //   if (gapEdge === 2) {
// //     ctx.moveTo(x, y + size);
// //     ctx.lineTo(x + gapPos, y + size);
// //     ctx.moveTo(x + gapPos + gapSize, y + size);
// //     ctx.lineTo(x + size, y + size);
// //   } else ctx.strokeRect(x, y + size, size, 0);
// //   ctx.stroke();

// //   // left
// //   ctx.beginPath();
// //   if (gapEdge === 3) {
// //     ctx.moveTo(x, y);
// //     ctx.lineTo(x, y + gapPos);
// //     ctx.moveTo(x, y + gapPos + gapSize);
// //     ctx.lineTo(x, y + size);
// //   } else ctx.strokeRect(x, y, 0, size);
// //   ctx.stroke();
// // }

// // // ----------------------------------------------
// // // draw image
// // // ----------------------------------------------
// // export function drawImage_two(boxes) {
// //   const canvas = createCanvas(WIDTH, HEIGHT);
// //   const ctx = canvas.getContext("2d");

// //   ctx.fillStyle = "#ffffff";
// //   ctx.fillRect(0, 0, WIDTH, HEIGHT);

// //   boxes.forEach(b => {
// //     ctx.strokeStyle = b.complete ? b.color : "#555";

// //     drawBoxBorderWithGap(ctx, b.x, b.y, b.w, !b.complete);

// //     if (b.shape === "circle") {
// //       ctx.beginPath();
// //       ctx.arc(b.x + b.w / 2, b.y + b.h / 2, b.w * 0.25, 0, Math.PI * 2);
// //       ctx.stroke();
// //     }

// //     if (b.shape === "triangle") {
// //       ctx.beginPath();
// //       ctx.moveTo(b.x + b.w / 2, b.y + b.h * 0.25);
// //       ctx.lineTo(b.x + b.w * 0.75, b.y + b.h * 0.75);
// //       ctx.lineTo(b.x + b.w * 0.25, b.y + b.h * 0.75);
// //       ctx.closePath();
// //       ctx.stroke();
// //     }

// //     if (b.shape === "star") {
// //       drawStar(ctx, b.x + b.w / 2, b.y + b.h / 2, b.w * 0.7);
// //     }
// //   });

// //   return canvas.toBuffer("image/png");
// // }

// // // ----------------------------------------------
// // // image → base64
// // // ----------------------------------------------
// // export async function uploadImage_two(buffer) {
// //   return {
// //     image: buffer.toString("base64")
// //   };
// // }











// import { createCanvas } from "canvas";

// // ----------------------------------------------
// // constants
// // ----------------------------------------------
// const WIDTH = 400;
// const HEIGHT = 250;

// const SHAPES = ["circle", "star", "triangle"];

// const COLORS = [
//   "#e74c3c", "#3498db", "#2ecc71",
//   "#f1c40f", "#9b59b6", "#e67e22",
//   "#1abc9c", "#34495e"
// ];

// const rand = (a, b) =>
//   Math.floor(Math.random() * (b - a + 1)) + a;

// const randomColor = () => COLORS[rand(0, COLORS.length - 1)];

// // ----------------------------------------------
// // difficulty
// // ----------------------------------------------
// export function getDifficultiesByPer_two(per) {
//   // broken must be a FRACTION or capped to total boxes
//   return {
//     boxes: per,           // total boxes
//     size: [30, 30],
//     brokenRatio: [0.2, 0.5] // 20%–50% of boxes are broken
//   };
// }

// // ----------------------------------------------
// // overlap check
// // ----------------------------------------------
// function overlap(a, b) {
//   return !(
//     a.x + a.w < b.x ||
//     a.x > b.x + b.w ||
//     a.y + a.h < b.y ||
//     a.y > b.y + b.h
//   );
// }

// // ----------------------------------------------
// // generate options
// // ----------------------------------------------
// export function generateOptions_two(correct) {
//   const set = new Set([correct]);
//   let i = 1;

//   while (set.size < 4) {
//     set.add(correct + i);
//     if (correct - i >= 0) set.add(correct - i);
//     i++;
//   }

//   return [...set].sort(() => Math.random() - 0.5);
// }

// // ----------------------------------------------
// // generate boxes + broken count
// // ----------------------------------------------
// export function generateBoxesData_two(difficulty) {
//   const boxes = [];
//   let tries = 0;

//   while (boxes.length < difficulty.boxes && tries < 5000) {
//     const size = rand(...difficulty.size);
//     const x = rand(4, WIDTH - size - 4);
//     const y = rand(4, HEIGHT - size - 4);

//     const test = { x, y, w: size, h: size };

//     if (!boxes.some(b => overlap(test, b))) {
//       boxes.push({
//         ...test,
//         shape: SHAPES[rand(0, SHAPES.length - 1)],
//         color: randomColor(),
//         complete: true
//       });
//     }
//     tries++;
//   }

//   // ✅ broken count based on RATIO of actual boxes
//   const [minR, maxR] = difficulty.brokenRatio;
//   const minBroken = Math.max(1, Math.floor(boxes.length * minR));
//   const maxBroken = Math.max(minBroken, Math.floor(boxes.length * maxR));
//   const brokenCount = rand(minBroken, Math.min(maxBroken, boxes.length));

//   const shuffled = [...boxes].sort(() => Math.random() - 0.5);
//   shuffled.slice(0, brokenCount).forEach(b => {
//     b.complete = false;
//   });

//   return { boxes, brokenCount };
// }

// // ----------------------------------------------
// // drawing helpers
// // ----------------------------------------------
// function drawStar(ctx, cx, cy, size) {
//   const spikes = 5;
//   const outer = size / 2;
//   const inner = outer / 2.5;
//   let rot = -Math.PI / 2;
//   const step = Math.PI / spikes;

//   ctx.beginPath();
//   ctx.moveTo(cx + Math.cos(rot) * outer, cy + Math.sin(rot) * outer);
//   for (let i = 0; i < spikes; i++) {
//     rot += step;
//     ctx.lineTo(cx + Math.cos(rot) * inner, cy + Math.sin(rot) * inner);
//     rot += step;
//     ctx.lineTo(cx + Math.cos(rot) * outer, cy + Math.sin(rot) * outer);
//   }
//   ctx.closePath();
//   ctx.stroke();
// }

// // Draw a box border. If `broken`, leave a gap on ONE edge.
// function drawBoxBorderWithGap(ctx, x, y, size, broken) {
//   ctx.lineWidth = 2;

//   if (!broken) {
//     ctx.beginPath();
//     ctx.rect(x, y, size, size);
//     ctx.stroke();
//     return;
//   }

//   // Choose which edge has the gap
//   const gapEdge = rand(0, 3);
//   const gapSize = Math.max(4, Math.floor(size * 0.2));
//   const gapPos = rand(2, size - gapSize - 2);

//   // helper: draw a line segment
//   const seg = (x1, y1, x2, y2) => {
//     ctx.moveTo(x1, y1);
//     ctx.lineTo(x2, y2);
//   };

//   ctx.beginPath();

//   // TOP edge (y)
//   if (gapEdge === 0) {
//     seg(x, y, x + gapPos, y);
//     seg(x + gapPos + gapSize, y, x + size, y);
//   } else {
//     seg(x, y, x + size, y);
//   }

//   // RIGHT edge (x + size)
//   if (gapEdge === 1) {
//     seg(x + size, y, x + size, y + gapPos);
//     seg(x + size, y + gapPos + gapSize, x + size, y + size);
//   } else {
//     seg(x + size, y, x + size, y + size);
//   }

//   // BOTTOM edge (y + size)
//   if (gapEdge === 2) {
//     seg(x, y + size, x + gapPos, y + size);
//     seg(x + gapPos + gapSize, y + size, x + size, y + size);
//   } else {
//     seg(x, y + size, x + size, y + size);
//   }

//   // LEFT edge (x)
//   if (gapEdge === 3) {
//     seg(x, y, x, y + gapPos);
//     seg(x, y + gapPos + gapSize, x, y + size);
//   } else {
//     seg(x, y, x, y + size);
//   }

//   ctx.stroke();
// }

// // ----------------------------------------------
// // draw image
// // ----------------------------------------------
// export function drawImage_two(boxes) {
//   const canvas = createCanvas(WIDTH, HEIGHT);
//   const ctx = canvas.getContext("2d");

//   ctx.fillStyle = "#ffffff";
//   ctx.fillRect(0, 0, WIDTH, HEIGHT);

//   boxes.forEach(b => {
//     // Complete boxes → colored border; broken boxes → dark gray border with gap
//     ctx.strokeStyle = b.complete ? b.color : "#555";

//     drawBoxBorderWithGap(ctx, b.x, b.y, b.w, !b.complete);

//     // Draw the inner shape
//     ctx.strokeStyle = b.color;

//     if (b.shape === "circle") {
//       ctx.beginPath();
//       ctx.arc(b.x + b.w / 2, b.y + b.h / 2, b.w * 0.25, 0, Math.PI * 2);
//       ctx.stroke();
//     }

//     if (b.shape === "triangle") {
//       ctx.beginPath();
//       ctx.moveTo(b.x + b.w / 2, b.y + b.h * 0.25);
//       ctx.lineTo(b.x + b.w * 0.75, b.y + b.h * 0.75);
//       ctx.lineTo(b.x + b.w * 0.25, b.y + b.h * 0.75);
//       ctx.closePath();
//       ctx.stroke();
//     }

//     if (b.shape === "star") {
//       drawStar(ctx, b.x + b.w / 2, b.y + b.h / 2, b.w * 0.7);
//     }
//   });

//   return canvas.toBuffer("image/png");
// }

// // ----------------------------------------------
// // image → base64
// // ----------------------------------------------
// export async function uploadImage_two(buffer) {
//   return {
//     image: buffer.toString("base64")
//   };
// }















import { createCanvas } from "canvas";

// ----------------------------------------------
// constants
// ----------------------------------------------
const WIDTH = 400;
const HEIGHT = 250;

const SHAPES = ["circle", "star", "triangle"];

const COLORS = [
  "#e74c3c", "#3498db", "#2ecc71",
  "#f1c40f", "#9b59b6", "#e67e22",
  "#1abc9c", "#34495e"
];

const rand = (a, b) =>
  Math.floor(Math.random() * (b - a + 1)) + a;

const randomColor = () => COLORS[rand(0, COLORS.length - 1)];

// ----------------------------------------------
// difficulty
// ----------------------------------------------
export function getDifficultiesByPer_two(per) {
  return {
    boxes: per,
    size: [30, 30],
    brokenRatio: [0.2, 0.5]
  };
}

// ----------------------------------------------
// overlap check
// ----------------------------------------------
function overlap(a, b) {
  return !(
    a.x + a.w < b.x ||
    a.x > b.x + b.w ||
    a.y + a.h < b.y ||
    a.y > b.y + b.h
  );
}

// ----------------------------------------------
// generate options
// ----------------------------------------------
export function generateOptions_two(correct) {
  const set = new Set([correct]);
  let i = 1;

  while (set.size < 4) {
    set.add(correct + i);
    if (correct - i >= 0) set.add(correct - i);
    i++;
  }

  return [...set].sort(() => Math.random() - 0.5);
}

// ----------------------------------------------
// generate boxes + broken count
// ----------------------------------------------
export function generateBoxesData_two(difficulty) {
  const boxes = [];
  let tries = 0;

  while (boxes.length < difficulty.boxes && tries < 5000) {
    const size = rand(...difficulty.size);
    const x = rand(4, WIDTH - size - 4);
    const y = rand(4, HEIGHT - size - 4);

    const test = { x, y, w: size, h: size };

    if (!boxes.some(b => overlap(test, b))) {
      boxes.push({
        ...test,
        shape: SHAPES[rand(0, SHAPES.length - 1)],
        color: randomColor(),
        complete: true
      });
    }
    tries++;
  }

  const [minR, maxR] = difficulty.brokenRatio;
  const minBroken = Math.max(1, Math.floor(boxes.length * minR));
  const maxBroken = Math.max(minBroken, Math.floor(boxes.length * maxR));
  const brokenCount = rand(minBroken, Math.min(maxBroken, boxes.length));

  const shuffled = [...boxes].sort(() => Math.random() - 0.5);
  shuffled.slice(0, brokenCount).forEach(b => {
    b.complete = false;
  });

  return { boxes, brokenCount };
}

// ----------------------------------------------
// drawing helpers
// ----------------------------------------------
function drawStar(ctx, cx, cy, size) {
  const spikes = 5;
  const outer = size / 2;
  const inner = outer / 2.5;
  let rot = -Math.PI / 2;
  const step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx + Math.cos(rot) * outer, cy + Math.sin(rot) * outer);
  for (let i = 0; i < spikes; i++) {
    rot += step;
    ctx.lineTo(cx + Math.cos(rot) * inner, cy + Math.sin(rot) * inner);
    rot += step;
    ctx.lineTo(cx + Math.cos(rot) * outer, cy + Math.sin(rot) * outer);
  }
  ctx.closePath();
  ctx.stroke();
}

// Draw a box border. If `broken`, leave a FIXED 2px gap on ONE edge.
function drawBoxBorderWithGap(ctx, x, y, size, broken) {
  ctx.lineWidth = 2;

  if (!broken) {
    ctx.beginPath();
    ctx.rect(x, y, size, size);
    ctx.stroke();
    return;
  }

  // ✅ FIXED 2px gap
  const GAP_SIZE = 2;

  // Choose which edge has the gap
  const gapEdge = rand(0, 3);

  // gap position must fit within the edge and leave room for the 2px gap
  const gapPos = rand(2, size - GAP_SIZE - 2);

  const seg = (x1, y1, x2, y2) => {
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
  };

  ctx.beginPath();

  // TOP edge
  if (gapEdge === 0) {
    seg(x, y, x + gapPos, y);
    seg(x + gapPos + GAP_SIZE, y, x + size, y);
  } else {
    seg(x, y, x + size, y);
  }

  // RIGHT edge
  if (gapEdge === 1) {
    seg(x + size, y, x + size, y + gapPos);
    seg(x + size, y + gapPos + GAP_SIZE, x + size, y + size);
  } else {
    seg(x + size, y, x + size, y + size);
  }

  // BOTTOM edge
  if (gapEdge === 2) {
    seg(x, y + size, x + gapPos, y + size);
    seg(x + gapPos + GAP_SIZE, y + size, x + size, y + size);
  } else {
    seg(x, y + size, x + size, y + size);
  }

  // LEFT edge
  if (gapEdge === 3) {
    seg(x, y, x, y + gapPos);
    seg(x, y + gapPos + GAP_SIZE, x, y + size);
  } else {
    seg(x, y, x, y + size);
  }

  ctx.stroke();
}

// ----------------------------------------------
// draw image
// ----------------------------------------------
export function drawImage_two(boxes) {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  boxes.forEach(b => {
    ctx.strokeStyle = b.complete ? b.color : "#555";

    drawBoxBorderWithGap(ctx, b.x, b.y, b.w, !b.complete);

    // Draw inner shape
    ctx.strokeStyle = b.color;

    if (b.shape === "circle") {
      ctx.beginPath();
      ctx.arc(b.x + b.w / 2, b.y + b.h / 2, b.w * 0.25, 0, Math.PI * 2);
      ctx.stroke();
    }

    if (b.shape === "triangle") {
      ctx.beginPath();
      ctx.moveTo(b.x + b.w / 2, b.y + b.h * 0.25);
      ctx.lineTo(b.x + b.w * 0.75, b.y + b.h * 0.75);
      ctx.lineTo(b.x + b.w * 0.25, b.y + b.h * 0.75);
      ctx.closePath();
      ctx.stroke();
    }

    if (b.shape === "star") {
      drawStar(ctx, b.x + b.w / 2, b.y + b.h / 2, b.w * 0.7);
    }
  });

  return canvas.toBuffer("image/png");
}

// ----------------------------------------------
// image → base64
// ----------------------------------------------
export async function uploadImage_two(buffer) {
  return {
    image: buffer.toString("base64")
  };
}