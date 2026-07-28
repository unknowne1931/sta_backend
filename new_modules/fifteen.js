// // import { createCanvas } from "canvas";

// // // ---------------- HELPERS ----------------
// // function rand(max) {
// //   return Math.floor(Math.random() * max);
// // }

// // function shuffle(arr) {
// //   const copy = [...arr];
// //   for (let i = copy.length - 1; i > 0; i--) {
// //     const j = rand(i + 1);
// //     [copy[i], copy[j]] = [copy[j], copy[i]];
// //   }
// //   return copy;
// // }

// // // ---------------- EDGE BUMP DRAWING ----------------
// // // Draws a straight line or a jigsaw-style bump (tab/blank) between two points.
// // //   type =  1  -> MALE connector (tab). Bulges OUTWARD, away from the piece.
// // //   type = -1  -> FEMALE connector (blank). Bulges INWARD, into the piece.
// // //   type =  0  -> flat edge (used for the outer border of the whole puzzle).
// // // ox, oy = unit vector pointing OUTWARD from the piece for this particular edge.
// // function edgeBump(ctx, x1, y1, x2, y2, ox, oy, type, size) {
// //   if (type === 0) {
// //     ctx.lineTo(x2, y2);
// //     return;
// //   }
// //   const dx = x2 - x1;
// //   const dy = y2 - y1;
// //   const len = Math.hypot(dx, dy);
// //   const ux = dx / len;
// //   const uy = dy / len;
// //   const amt = size * type;

// //   const q1x = x1 + ux * len * 0.35, q1y = y1 + uy * len * 0.35;
// //   const q2x = x1 + ux * len * 0.5 + ox * amt, q2y = y1 + uy * len * 0.5 + oy * amt;
// //   const q3x = x1 + ux * len * 0.65, q3y = y1 + uy * len * 0.65;

// //   const c1x = q1x + ox * amt * 1.4, c1y = q1y + oy * amt * 1.4;
// //   const c2x = q3x + ox * amt * 1.4, c2y = q3y + oy * amt * 1.4;

// //   ctx.lineTo(q1x, q1y);
// //   ctx.quadraticCurveTo(c1x, c1y, q2x, q2y);
// //   ctx.quadraticCurveTo(c2x, c2y, q3x, q3y);
// //   ctx.lineTo(x2, y2);
// // }

// // // Traces one piece's outline clockwise: top -> right -> bottom -> left
// // function piecePath(ctx, x, y, w, h, edges, size) {
// //   ctx.beginPath();
// //   ctx.moveTo(x, y);
// //   edgeBump(ctx, x, y, x + w, y, 0, -1, edges.top, size);          // top    (outward = up)
// //   edgeBump(ctx, x + w, y, x + w, y + h, 1, 0, edges.right, size); // right  (outward = right)
// //   edgeBump(ctx, x + w, y + h, x, y + h, 0, 1, edges.bottom, size); // bottom (outward = down)
// //   edgeBump(ctx, x, y + h, x, y, -1, 0, edges.left, size);          // left   (outward = left)
// //   ctx.closePath();
// // }

// // // ---------------- GRID / CONNECTOR GENERATION ----------------
// // function buildPieceGrid(rows, cols) {
// //   // horizontal[r][c] decides the shared edge between piece(r-1,c).bottom and piece(r,c).top
// //   // vertical[r][c]   decides the shared edge between piece(r,c-1).right  and piece(r,c).left
// //   const horizontal = Array.from({ length: rows }, () => new Array(cols).fill(0));
// //   const vertical = Array.from({ length: rows }, () => new Array(cols).fill(0));

// //   for (let r = 1; r < rows; r++) {
// //     for (let c = 0; c < cols; c++) {
// //       horizontal[r][c] = Math.random() < 0.5 ? 1 : -1;
// //     }
// //   }
// //   for (let r = 0; r < rows; r++) {
// //     for (let c = 1; c < cols; c++) {
// //       vertical[r][c] = Math.random() < 0.5 ? 1 : -1;
// //     }
// //   }

// //   const grid = [];
// //   for (let r = 0; r < rows; r++) {
// //     const row = [];
// //     for (let c = 0; c < cols; c++) {
// //       const edges = {
// //         top: r === 0 ? 0 : -horizontal[r][c],
// //         bottom: r === rows - 1 ? 0 : horizontal[r + 1][c],
// //         left: c === 0 ? 0 : -vertical[r][c],
// //         right: c === cols - 1 ? 0 : vertical[r][c + 1]
// //       };
// //       row.push(edges);
// //     }
// //     grid.push(row);
// //   }
// //   return grid;
// // }

// // function countMaleConnectors(edges) {
// //   let n = 0;
// //   if (edges.top === 1) n++;
// //   if (edges.right === 1) n++;
// //   if (edges.bottom === 1) n++;
// //   if (edges.left === 1) n++;
// //   return n;
// // }

// // // ---------------- MAIN ----------------
// // export function generatePuzzle_maleConnectorCount(rows = 4, cols = 5) {
// //   const grid = buildPieceGrid(rows, cols);

// //   const palette = ["#ffe0e0", "#e0f0ff", "#e0ffe6", "#fff6d6", "#f0e0ff", "#ffe9d6"];

// //   let answer = 0;
// //   for (let r = 0; r < rows; r++) {
// //     for (let c = 0; c < cols; c++) {
// //       if (countMaleConnectors(grid[r][c]) >= 2) answer++;
// //     }
// //   }

// //   // ---------------- CANVAS ----------------
// //   const margin = 70;
// //   const cellW = 150;
// //   const cellH = 150;
// //   const width = cols * cellW + margin * 2;
// //   const height = rows * cellH + margin * 2 + 70;
// //   const canvas = createCanvas(width, height);
// //   const ctx = canvas.getContext("2d");

// //   ctx.fillStyle = "#f4f4f4";
// //   ctx.fillRect(0, 0, width, height);

// //   ctx.fillStyle = "#222";
// //   ctx.font = "bold 30px Arial";
// //   ctx.textAlign = "center";
// //   ctx.fillText("PUZZLE CONNECTOR CHECK", width / 2, 45);

// //   const size = Math.min(cellW, cellH) * 0.22;
// //   let colorIdx = 0;

// //   for (let r = 0; r < rows; r++) {
// //     for (let c = 0; c < cols; c++) {
// //       const x = margin + c * cellW;
// //       const y = margin + 60 + r * cellH;
// //       const edges = grid[r][c];

// //       piecePath(ctx, x, y, cellW, cellH, edges, size);

// //       ctx.fillStyle = palette[colorIdx % palette.length];
// //       colorIdx++;
// //       ctx.fill();

// //       ctx.lineWidth = 2;
// //       ctx.strokeStyle = "#333";
// //       ctx.stroke();
// //     }
// //   }

// //   ctx.fillStyle = "#555";
// //   ctx.font = "18px Arial";
// //   ctx.textAlign = "center";
// //   ctx.fillText(
// //     "A MALE connector is a rounded tab that bulges OUT of a piece. A FEMALE connector curves IN.",
// //     width / 2,
// //     height - 20
// //   );

// //   // ---------------- ANSWER OPTIONS ----------------
// //   const maxPossible = rows * cols;
// //   const optionSet = new Set([answer]);
// //   let guard = 0;
// //   while (optionSet.size < 4 && guard < 50) {
// //     guard++;
// //     const offset = rand(3) + 1;
// //     const sign = Math.random() < 0.5 ? -1 : 1;
// //     let val = answer + sign * offset;
// //     if (val < 0 || val > maxPossible) val = Math.max(0, Math.min(maxPossible, answer + offset));
// //     optionSet.add(val);
// //   }
// //   const options = shuffle(Array.from(optionSet)).map(String);

// //   return {
// //     question: "How many puzzle pieces contain 2 or more MALE connectors (outward tabs)?",
// //     options,
// //     answer: String(answer),
// //     image: canvas.toDataURL().split(",")[1]
// //   };
// // }



























// import { createCanvas } from "canvas";

// // ---------------- HELPERS ----------------
// function rand(max) {
//   return Math.floor(Math.random() * max);
// }

// function shuffle(arr) {
//   const copy = [...arr];
//   for (let i = copy.length - 1; i > 0; i--) {
//     const j = rand(i + 1);
//     [copy[i], copy[j]] = [copy[j], copy[i]];
//   }
//   return copy;
// }

// // ---------------- EDGE BUMP DRAWING ----------------
// // Draws a straight line or a jigsaw-style bump (tab/blank) between two points.
// //   type =  1  -> MALE connector (tab). Bulges OUTWARD, away from the piece.
// //   type = -1  -> FEMALE connector (blank). Bulges INWARD, into the piece.
// //   type =  0  -> flat edge (used for the outer border of the whole puzzle).
// // ox, oy = unit vector pointing OUTWARD from the piece for this particular edge.
// function edgeBump(ctx, x1, y1, x2, y2, ox, oy, type, size) {
//   if (type === 0) {
//     ctx.lineTo(x2, y2);
//     return;
//   }
//   const dx = x2 - x1;
//   const dy = y2 - y1;
//   const len = Math.hypot(dx, dy);
//   const ux = dx / len;
//   const uy = dy / len;
//   const amt = size * type;

//   const q1x = x1 + ux * len * 0.35, q1y = y1 + uy * len * 0.35;
//   const q2x = x1 + ux * len * 0.5 + ox * amt, q2y = y1 + uy * len * 0.5 + oy * amt;
//   const q3x = x1 + ux * len * 0.65, q3y = y1 + uy * len * 0.65;

//   const c1x = q1x + ox * amt * 1.4, c1y = q1y + oy * amt * 1.4;
//   const c2x = q3x + ox * amt * 1.4, c2y = q3y + oy * amt * 1.4;

//   ctx.lineTo(q1x, q1y);
//   ctx.quadraticCurveTo(c1x, c1y, q2x, q2y);
//   ctx.quadraticCurveTo(c2x, c2y, q3x, q3y);
//   ctx.lineTo(x2, y2);
// }

// // Traces one piece's outline clockwise: top -> right -> bottom -> left
// function piecePath(ctx, x, y, w, h, edges, size) {
//   ctx.beginPath();
//   ctx.moveTo(x, y);
//   edgeBump(ctx, x, y, x + w, y, 0, -1, edges.top, size);          // top    (outward = up)
//   edgeBump(ctx, x + w, y, x + w, y + h, 1, 0, edges.right, size); // right  (outward = right)
//   edgeBump(ctx, x + w, y + h, x, y + h, 0, 1, edges.bottom, size); // bottom (outward = down)
//   edgeBump(ctx, x, y + h, x, y, -1, 0, edges.left, size);          // left   (outward = left)
//   ctx.closePath();
// }

// // ---------------- GRID / CONNECTOR GENERATION ----------------
// function buildPieceGrid(rows, cols) {
//   // horizontal[r][c] decides the shared edge between piece(r-1,c).bottom and piece(r,c).top
//   // vertical[r][c]   decides the shared edge between piece(r,c-1).right  and piece(r,c).left
//   const horizontal = Array.from({ length: rows }, () => new Array(cols).fill(0));
//   const vertical = Array.from({ length: rows }, () => new Array(cols).fill(0));

//   for (let r = 1; r < rows; r++) {
//     for (let c = 0; c < cols; c++) {
//       horizontal[r][c] = Math.random() < 0.5 ? 1 : -1;
//     }
//   }
//   for (let r = 0; r < rows; r++) {
//     for (let c = 1; c < cols; c++) {
//       vertical[r][c] = Math.random() < 0.5 ? 1 : -1;
//     }
//   }

//   const grid = [];
//   for (let r = 0; r < rows; r++) {
//     const row = [];
//     for (let c = 0; c < cols; c++) {
//       const edges = {
//         top: r === 0 ? 0 : -horizontal[r][c],
//         bottom: r === rows - 1 ? 0 : horizontal[r + 1][c],
//         left: c === 0 ? 0 : -vertical[r][c],
//         right: c === cols - 1 ? 0 : vertical[r][c + 1]
//       };
//       row.push(edges);
//     }
//     grid.push(row);
//   }
//   return grid;
// }

// function countMaleConnectors(edges) {
//   let n = 0;
//   if (edges.top === 1) n++;
//   if (edges.right === 1) n++;
//   if (edges.bottom === 1) n++;
//   if (edges.left === 1) n++;
//   return n;
// }

// // ---------------- MAIN ----------------
// export function generatePuzzle_maleConnectorCount(rows = 4, cols = 5) {
//   const grid = buildPieceGrid(rows, cols);

//   const palette = ["#ffe0e0", "#e0f0ff", "#e0ffe6", "#fff6d6", "#f0e0ff", "#ffe9d6"];

//   let answer = 0;
//   for (let r = 0; r < rows; r++) {
//     for (let c = 0; c < cols; c++) {
//       if (countMaleConnectors(grid[r][c]) >= 2) answer++;
//     }
//   }

//   // ---------------- CANVAS ----------------
//   const margin = 70;
//   const cellW = 150;
//   const cellH = 150;
//   const width = cols * cellW + margin * 2;
//   const height = rows * cellH + margin * 2 + 70;
//   const canvas = createCanvas(width, height);
//   const ctx = canvas.getContext("2d");

//   ctx.fillStyle = "#f4f4f4";
//   ctx.fillRect(0, 0, width, height);

 

//   const size = Math.min(cellW, cellH) * 0.22;
//   let colorIdx = 0;

//   for (let r = 0; r < rows; r++) {
//     for (let c = 0; c < cols; c++) {
//       const x = margin + c * cellW;
//       const y = margin + 60 + r * cellH;
//       const edges = grid[r][c];

//       piecePath(ctx, x, y, cellW, cellH, edges, size);

//       ctx.fillStyle = palette[colorIdx % palette.length];
//       colorIdx++;
//       ctx.fill();

//       ctx.lineWidth = 2;
//       ctx.strokeStyle = "#333";
//       ctx.stroke();
//     }
//   }

//   // ---------------- ANSWER OPTIONS (CONFUSINGLY CLOSE) ----------------
//   const maxPossible = rows * cols;
//   const optionSet = new Set([answer]);
  
//   // Generate confusingly close options (within 1-2 of the answer)
//   let attempts = 0;
//   while (optionSet.size < 4 && attempts < 100) {
//     attempts++;
    
//     let offset;
//     if (attempts < 20) {
//       // Very close: ±1 (most confusing)
//       offset = 1;
//     } else if (attempts < 40) {
//       // Close: ±2
//       offset = 2;
//     } else {
//       // Random but still within ±3
//       offset = Math.floor(Math.random() * 3) + 1;
//     }
    
//     const sign = Math.random() < 0.5 ? -1 : 1;
//     let val = answer + (sign * offset);
    
//     // Keep within valid range [0, maxPossible]
//     val = Math.max(0, Math.min(maxPossible, val));
    
//     // Ensure it's different from answer and within 3 of it
//     if (val !== answer && Math.abs(val - answer) <= 3) {
//       optionSet.add(val);
//     }
//   }
  
//   // If we still don't have 4 options, add forced close values
//   const fallbackValues = [
//     Math.max(0, answer - 1),
//     Math.min(maxPossible, answer + 1),
//     Math.max(0, answer - 2),
//     Math.min(maxPossible, answer + 2)
//   ];
  
//   for (const val of fallbackValues) {
//     if (optionSet.size >= 4) break;
//     if (val !== answer && !optionSet.has(val)) {
//       optionSet.add(val);
//     }
//   }
  
//   // If still not enough, just add anything close
//   while (optionSet.size < 4) {
//     const offset = Math.floor(Math.random() * 3) + 1;
//     const val = Math.max(0, Math.min(maxPossible, answer + offset));
//     if (val !== answer && !optionSet.has(val)) {
//       optionSet.add(val);
//     }
//   }
  
//   const options = shuffle(Array.from(optionSet)).map(String);

//   return {
//     question: "How many puzzle pieces contain 2 or more MALE connectors (outward tabs)?",
//     options,
//     answer: String(answer),
//     image: canvas.toDataURL().split(",")[1]
//   };
// }





















import { createCanvas, loadImage } from "canvas";
import { randomBytes } from "crypto";

// ---------------- HELPERS ----------------
function rand(max) {
  return Math.floor(Math.random() * max);
}

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = rand(i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// ---------------- IMAGE GENERATION ----------------
function generateRandomImage(width, height) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  
  // Random gradient background
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  const hue1 = rand(360);
  const hue2 = (hue1 + rand(60) + 30) % 360;
  gradient.addColorStop(0, `hsl(${hue1}, 70%, 50%)`);
  gradient.addColorStop(0.5, `hsl(${(hue1 + hue2) / 2}, 80%, 60%)`);
  gradient.addColorStop(1, `hsl(${hue2}, 70%, 50%)`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Random geometric shapes
  const shapes = rand(3) + 2;
  for (let i = 0; i < shapes; i++) {
    ctx.save();
    ctx.globalAlpha = 0.3 + Math.random() * 0.4;
    const x = rand(width);
    const y = rand(height);
    const size = 20 + rand(Math.min(width, height) / 3);
    const rotation = Math.random() * Math.PI * 2;
    ctx.translate(x, y);
    ctx.rotate(rotation);
    
    const type = rand(3);
    if (type === 0) {
      // Circle
      ctx.beginPath();
      ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${rand(360)}, 80%, 70%)`;
      ctx.fill();
    } else if (type === 1) {
      // Rectangle
      ctx.fillStyle = `hsl(${rand(360)}, 80%, 70%)`;
      ctx.fillRect(-size/2, -size/3, size, size * 0.6);
    } else {
      // Triangle
      ctx.beginPath();
      ctx.moveTo(0, -size/2);
      ctx.lineTo(-size/2, size/2);
      ctx.lineTo(size/2, size/2);
      ctx.closePath();
      ctx.fillStyle = `hsl(${rand(360)}, 80%, 70%)`;
      ctx.fill();
    }
    ctx.restore();
  }
  
  // Random dots
  for (let i = 0; i < 20 + rand(30); i++) {
    ctx.save();
    ctx.globalAlpha = 0.2 + Math.random() * 0.3;
    ctx.beginPath();
    ctx.arc(rand(width), rand(height), 2 + rand(6), 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${rand(360)}, 80%, 80%)`;
    ctx.fill();
    ctx.restore();
  }
  
  // Random lines
  for (let i = 0; i < 5 + rand(10); i++) {
    ctx.save();
    ctx.globalAlpha = 0.1 + Math.random() * 0.2;
    ctx.strokeStyle = `hsl(${rand(360)}, 80%, 90%)`;
    ctx.lineWidth = 1 + Math.random() * 2;
    ctx.beginPath();
    ctx.moveTo(rand(width), rand(height));
    ctx.lineTo(rand(width), rand(height));
    ctx.stroke();
    ctx.restore();
  }
  
  return canvas;
}

// ---------------- EDGE BUMP DRAWING ----------------
// Draws a straight line or a jigsaw-style bump (tab/blank) between two points.
//   type =  1  -> MALE connector (tab). Bulges OUTWARD, away from the piece.
//   type = -1  -> FEMALE connector (blank). Bulges INWARD, into the piece.
//   type =  0  -> flat edge (used for the outer border of the whole puzzle).
// ox, oy = unit vector pointing OUTWARD from the piece for this particular edge.
function edgeBump(ctx, x1, y1, x2, y2, ox, oy, type, size) {
  if (type === 0) {
    ctx.lineTo(x2, y2);
    return;
  }
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  const amt = size * type;

  const q1x = x1 + ux * len * 0.35, q1y = y1 + uy * len * 0.35;
  const q2x = x1 + ux * len * 0.5 + ox * amt, q2y = y1 + uy * len * 0.5 + oy * amt;
  const q3x = x1 + ux * len * 0.65, q3y = y1 + uy * len * 0.65;

  const c1x = q1x + ox * amt * 1.4, c1y = q1y + oy * amt * 1.4;
  const c2x = q3x + ox * amt * 1.4, c2y = q3y + oy * amt * 1.4;

  ctx.lineTo(q1x, q1y);
  ctx.quadraticCurveTo(c1x, c1y, q2x, q2y);
  ctx.quadraticCurveTo(c2x, c2y, q3x, q3y);
  ctx.lineTo(x2, y2);
}

// Traces one piece's outline clockwise: top -> right -> bottom -> left
function piecePath(ctx, x, y, w, h, edges, size) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  edgeBump(ctx, x, y, x + w, y, 0, -1, edges.top, size);          // top    (outward = up)
  edgeBump(ctx, x + w, y, x + w, y + h, 1, 0, edges.right, size); // right  (outward = right)
  edgeBump(ctx, x + w, y + h, x, y + h, 0, 1, edges.bottom, size); // bottom (outward = down)
  edgeBump(ctx, x, y + h, x, y, -1, 0, edges.left, size);          // left   (outward = left)
  ctx.closePath();
}

// ---------------- GRID / CONNECTOR GENERATION ----------------
function buildPieceGrid(rows, cols) {
  const horizontal = Array.from({ length: rows }, () => new Array(cols).fill(0));
  const vertical = Array.from({ length: rows }, () => new Array(cols).fill(0));

  for (let r = 1; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      horizontal[r][c] = Math.random() < 0.5 ? 1 : -1;
    }
  }
  for (let r = 0; r < rows; r++) {
    for (let c = 1; c < cols; c++) {
      vertical[r][c] = Math.random() < 0.5 ? 1 : -1;
    }
  }

  const grid = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      const edges = {
        top: r === 0 ? 0 : -horizontal[r][c],
        bottom: r === rows - 1 ? 0 : horizontal[r + 1][c],
        left: c === 0 ? 0 : -vertical[r][c],
        right: c === cols - 1 ? 0 : vertical[r][c + 1]
      };
      row.push(edges);
    }
    grid.push(row);
  }
  return grid;
}

function countMaleConnectors(edges) {
  let n = 0;
  if (edges.top === 1) n++;
  if (edges.right === 1) n++;
  if (edges.bottom === 1) n++;
  if (edges.left === 1) n++;
  return n;
}

// ---------------- MAIN ----------------
export function generatePuzzle_maleConnectorCount(rows = 3, cols = 5) {
  const grid = buildPieceGrid(rows, cols);

  let answer = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (countMaleConnectors(grid[r][c]) >= 2) answer++;
    }
  }

  // ---------------- CANVAS WITH FIXED SIZE ----------------
  const canvasWidth = 400;
  const canvasHeight = 250;
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext("2d");

  // Calculate cell size based on grid dimensions
  const padding = 30;
  const topPadding = 35;
  const bottomPadding = 25;
  const availableWidth = canvasWidth - (padding * 2);
  const availableHeight = canvasHeight - topPadding - bottomPadding;
  
  const cellW = availableWidth / cols;
  const cellH = availableHeight / rows;
  
  // Calculate offset to center the puzzle
  const offsetX = padding + (availableWidth - (cellW * cols)) / 2;
  const offsetY = topPadding + (availableHeight - (cellH * rows)) / 2;

  // Background
  ctx.fillStyle = "#f4f4f4";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Generate random images for each piece
  const pieceImages = [];
  const totalPieces = rows * cols;
  for (let i = 0; i < totalPieces; i++) {
    const imgCanvas = generateRandomImage(Math.ceil(cellW), Math.ceil(cellH));
    pieceImages.push(imgCanvas);
  }

  // Draw puzzle pieces with images
  const size = Math.min(cellW, cellH) * 0.2;
  let imageIdx = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = offsetX + c * cellW;
      const y = offsetY + r * cellH;
      const edges = grid[r][c];

      // Create path
      piecePath(ctx, x, y, cellW, cellH, edges, size);
      
      // Clip to the piece shape
      ctx.save();
      ctx.clip();
      
      // Draw the random image
      const imgCanvas = pieceImages[imageIdx % pieceImages.length];
      ctx.drawImage(imgCanvas, x, y, cellW, cellH);
      
      ctx.restore();

      // Draw border
      ctx.beginPath();
      piecePath(ctx, x, y, cellW, cellH, edges, size);
      ctx.lineWidth = Math.max(1, Math.min(2, 40 / Math.max(rows, cols)));
      ctx.strokeStyle = "#333";
      ctx.stroke();
      
      imageIdx++;
    }
  }

  // ---------------- WATERMARK (GRAY, AT BOTTOM END) ----------------
  ctx.save();
  ctx.globalAlpha = 0.5;
  ctx.font = "bold 14px Arial, sans-serif";
  ctx.fillStyle = "#1c1a1a"; // Gray color
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.fillText("Powered by AVI", canvasWidth / 2, canvasHeight - 3);
  ctx.restore();

  // ---------------- ANSWER OPTIONS (CONFUSINGLY CLOSE) ----------------
  const maxPossible = rows * cols;
  const optionSet = new Set([answer]);
  
  let attempts = 0;
  while (optionSet.size < 4 && attempts < 100) {
    attempts++;
    
    let offset;
    if (attempts < 20) {
      offset = 1;
    } else if (attempts < 40) {
      offset = 2;
    } else {
      offset = Math.floor(Math.random() * 3) + 1;
    }
    
    const sign = Math.random() < 0.5 ? -1 : 1;
    let val = answer + (sign * offset);
    val = Math.max(0, Math.min(maxPossible, val));
    
    if (val !== answer && Math.abs(val - answer) <= 3) {
      optionSet.add(val);
    }
  }
  
  const fallbackValues = [
    Math.max(0, answer - 1),
    Math.min(maxPossible, answer + 1),
    Math.max(0, answer - 2),
    Math.min(maxPossible, answer + 2)
  ];
  
  for (const val of fallbackValues) {
    if (optionSet.size >= 4) break;
    if (val !== answer && !optionSet.has(val)) {
      optionSet.add(val);
    }
  }
  
  while (optionSet.size < 4) {
    const offset = Math.floor(Math.random() * 3) + 1;
    const val = Math.max(0, Math.min(maxPossible, answer + offset));
    if (val !== answer && !optionSet.has(val)) {
      optionSet.add(val);
    }
  }
  
  const options = shuffle(Array.from(optionSet)).map(String);

  return {
    question: "How many puzzle pieces contain 2 or more MALE connectors (outward tabs)?",
    options,
    answer: String(answer),
    image: canvas.toDataURL().split(",")[1]
  };
}