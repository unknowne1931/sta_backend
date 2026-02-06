// import { createCanvas } from "canvas";

// // ==========================
// // CONFIG
// // ==========================
// const WIDTH = 400;
// const HEIGHT = 250;

// function def_data(per) {
//     if (per < 10) {
//         return { "Too Easy": 50, "Easy": 48, "Medium": 46, "Tough": 44, "Too Tough": 42 }
//     } else if (per < 20) {
//         return { "Too Easy": 48, "Easy": 46, "Medium": 44, "Tough": 42, "Too Tough": 40 }
//     } else if (per < 30) {
//         return { "Too Easy": 46, "Easy": 44, "Medium": 42, "Tough": 40, "Too Tough": 38 }
//     } else if (per < 40) {
//         return { "Too Easy": 44, "Easy": 42, "Medium": 40, "Tough": 38, "Too Tough": 36 }
//     } else if (per < 50) {
//         return { "Too Easy": 42, "Easy": 40, "Medium": 38, "Tough": 36, "Too Tough": 34 }
//     } else if (per < 60) {
//         return { "Too Easy": 40, "Easy": 38, "Medium": 36, "Tough": 34, "Too Tough": 32 }
//     } else if (per < 70) {
//         return { "Too Easy": 38, "Easy": 36, "Medium": 34, "Tough": 32, "Too Tough": 30 }
//     } else if (per < 80) {
//         return { "Too Easy": 36, "Easy": 34, "Medium": 32, "Tough": 28, "Too Tough": 26 }
//     } else if (per < 90) {
//         return { "Too Easy": 34, "Easy": 32, "Medium": 30, "Tough": 28, "Too Tough": 26 }
//     } else {
//         return { "Too Easy": 24, "Easy": 22, "Medium": 20, "Tough": 18, "Too Tough": 16 }
//     }
// }

// class Cell {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//         this.visited = false;
//         this.walls = { top: true, right: true, bottom: true, left: true };
//     }
// }

// // ==========================
// // HELPERS
// // ==========================
// const getIdx = (x, y, cols, rows) =>
//     (x < 0 || y < 0 || x >= cols || y >= rows) ? -1 : x + y * cols;

// function removeWalls(a, b) {
//     const dx = a.x - b.x;
//     const dy = a.y - b.y;
//     if (dx === 1) { a.walls.left = false; b.walls.right = false; }
//     else if (dx === -1) { a.walls.right = false; b.walls.left = false; }
//     if (dy === 1) { a.walls.top = false; b.walls.bottom = false; }
//     else if (dy === -1) { a.walls.bottom = false; b.walls.top = false; }
// }

// // ==========================
// // CORE LOGIC
// // ==========================
// function solve(grid, start, end, cols, rows) {
//     const queue = [{ x: start.x, y: start.y }];
//     const visited = new Set();

//     while (queue.length) {
//         const curr = queue.shift();
//         const key = `${curr.x},${curr.y}`;
//         if (visited.has(key)) continue;
//         visited.add(key);

//         if (curr.x === end.x && curr.y === end.y) return true;

//         const cell = grid[getIdx(curr.x, curr.y, cols, rows)];
//         if (!cell) continue;

//         if (!cell.walls.top) queue.push({ x: curr.x, y: curr.y - 1 });
//         if (!cell.walls.right) queue.push({ x: curr.x + 1, y: curr.y });
//         if (!cell.walls.bottom) queue.push({ x: curr.x, y: curr.y + 1 });
//         if (!cell.walls.left) queue.push({ x: curr.x - 1, y: curr.y });
//     }
//     return false;
// }

// // ==========================
// // GENERATOR
// // ==========================
// export function generateMazeQuestion(level, per) {

//     const data = def_data(per);
//     const cellSize = data[level];

//     const cols = Math.floor(WIDTH / cellSize);
//     const rows = Math.floor(HEIGHT / cellSize);

//     const grid = Array.from(
//         { length: rows * cols },
//         (_, i) => new Cell(i % cols, Math.floor(i / cols))
//     );

//     // ✅ FIX: prevent undefined access
//     if (!grid.length) {
//         return {
//             difficulty: level,
//             question: "Can blue reach to red?",
//             options: ["YES", "NO"],
//             answer: "NO",
//             image: ""
//         };
//     }

//     // 1. Maze generation (DFS)
//     const stack = [];
//     let current = grid[0];
//     current.visited = true;

//     while (true) {
//         const neighbors = [];
//         const dirs = [
//             { x: 0, y: -1 },
//             { x: 1, y: 0 },
//             { x: 0, y: 1 },
//             { x: -1, y: 0 }
//         ];

//         for (const d of dirs) {
//             const idx = getIdx(current.x + d.x, current.y + d.y, cols, rows);
//             if (idx !== -1 && !grid[idx].visited) neighbors.push(grid[idx]);
//         }

//         if (neighbors.length) {
//             const next = neighbors[Math.floor(Math.random() * neighbors.length)];
//             next.visited = true;
//             stack.push(current);
//             removeWalls(current, next);
//             current = next;
//         } else if (stack.length) {
//             current = stack.pop();
//         } else break;
//     }

//     // 2. Start & End
//     const start = { x: 0, y: Math.floor(Math.random() * rows) };
//     const end = { x: cols - 1, y: Math.floor(Math.random() * rows) };

//     // 3. Random blocking
//     if (Math.random() < 0.5) {
//         for (let i = 0; i < 4; i++) {
//             const target = grid[Math.floor(Math.random() * grid.length)];
//             if (target) target.walls.left = target.walls.right = true;
//         }
//     }

//     const isSolvable = solve(grid, start, end, cols, rows);

//     // 4. Draw
//     const canvas = createCanvas(WIDTH, HEIGHT);
//     const ctx = canvas.getContext("2d");

//     ctx.fillStyle = "#FFFFFF";
//     ctx.fillRect(0, 0, WIDTH, HEIGHT);

//     ctx.strokeStyle = "#2C3E50";
//     ctx.lineWidth = 2;

//     grid.forEach(cell => {
//         const x = cell.x * cellSize;
//         const y = cell.y * cellSize;
//         ctx.beginPath();
//         if (cell.walls.top) ctx.moveTo(x, y), ctx.lineTo(x + cellSize, y);
//         if (cell.walls.right) ctx.moveTo(x + cellSize, y), ctx.lineTo(x + cellSize, y + cellSize);
//         if (cell.walls.bottom) ctx.moveTo(x + cellSize, y + cellSize), ctx.lineTo(x, y + cellSize);
//         if (cell.walls.left) ctx.moveTo(x, y + cellSize), ctx.lineTo(x, y);
//         ctx.stroke();
//     });

//     const r = cellSize * 0.3;
//     const o = cellSize / 2;

//     ctx.fillStyle = "#3498DB";
//     ctx.beginPath();
//     ctx.arc(start.x * cellSize + o, start.y * cellSize + o, r, 0, Math.PI * 2);
//     ctx.fill();

//     ctx.fillStyle = "#E74C3C";
//     ctx.beginPath();
//     ctx.arc(end.x * cellSize + o, end.y * cellSize + o, r, 0, Math.PI * 2);
//     ctx.fill();

//     return {
//         difficulty: level,
//         question: "Can blue reach to red?",
//         options: ["YES", "NO"],
//         answer: isSolvable ? "YES" : "NO",
//         image: canvas.toDataURL("image/png").replace(/^data:image\/png;base64,/, "")
//     };
// }


































// import { createCanvas } from "canvas";

// // ==========================
// // CONFIG
// // ==========================
// const WIDTH = 400;
// const HEIGHT = 250;

// function def_data(per) {
//     if (per < 5) {
//         return { "Too Easy": 50, "Easy": 48, "Medium": 46, "Tough": 44, "Too Tough": 42 }
//     } else if (per < 10) {
//         return { "Too Easy": 48, "Easy": 46, "Medium": 44, "Tough": 42, "Too Tough": 40 }
//     } else if (per < 15) {
//         return { "Too Easy": 46, "Easy": 44, "Medium": 42, "Tough": 40, "Too Tough": 38 }
//     } else if (per < 20) {
//         return { "Too Easy": 44, "Easy": 42, "Medium": 40, "Tough": 38, "Too Tough": 36 }
//     } else if (per < 25) {
//         return { "Too Easy": 42, "Easy": 40, "Medium": 38, "Tough": 36, "Too Tough": 34 }
//     } else if (per < 30) {
//         return { "Too Easy": 40, "Easy": 38, "Medium": 36, "Tough": 34, "Too Tough": 32 }
//     } else if (per < 35) {
//         return { "Too Easy": 38, "Easy": 36, "Medium": 34, "Tough": 32, "Too Tough": 30 }
//     } else if (per < 40) {
//         return { "Too Easy": 36, "Easy": 34, "Medium": 32, "Tough": 30, "Too Tough": 28 }
//     } else if (per < 45) {
//         return { "Too Easy": 34, "Easy": 32, "Medium": 30, "Tough": 28, "Too Tough": 26 }
//     } else if (per < 50) {
//         return { "Too Easy": 32, "Easy": 30, "Medium": 28, "Tough": 26, "Too Tough": 24 }
//     } else if (per < 55) {
//         return { "Too Easy": 30, "Easy": 28, "Medium": 26, "Tough": 24, "Too Tough": 22 }
//     }else if (per < 60) {
//         return { "Too Easy": 28, "Easy": 26, "Medium": 24, "Tough": 22, "Too Tough": 20 }
//     }else if (per < 65) {
//         return { "Too Easy": 26, "Easy": 24, "Medium": 22, "Tough": 20, "Too Tough": 18 }
//     }else if (per < 70) {
//         return { "Too Easy": 24, "Easy": 22, "Medium": 20, "Tough": 18, "Too Tough": 16 }
//     }else if (per < 75) {
//         return { "Too Easy": 22, "Easy": 20, "Medium": 18, "Tough": 16, "Too Tough": 14 }
//     }else if (per < 80) {
//         return { "Too Easy": 20, "Easy": 18, "Medium": 16, "Tough": 14, "Too Tough": 12 }
//     }else if (per < 85) {
//         return { "Too Easy": 18, "Easy": 16, "Medium": 14, "Tough": 12, "Too Tough": 10 }
//     }else if (per < 90) {
//         return { "Too Easy": 16, "Easy": 14, "Medium": 12, "Tough": 10, "Too Tough": 8 }
//     }else{
//         return { "Too Easy": 14, "Easy": 12, "Medium": 10, "Tough": 8, "Too Tough": 6 }
//     }
// }

// class Cell {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//         this.visited = false;
//         this.walls = { top: true, right: true, bottom: true, left: true };
//     }
// }

// // ==========================
// // HELPERS
// // ==========================
// const getIdx = (x, y, cols, rows) =>
//     (x < 0 || y < 0 || x >= cols || y >= rows) ? -1 : x + y * cols;

// function removeWalls(a, b) {
//     const dx = a.x - b.x;
//     const dy = a.y - b.y;
//     if (dx === 1) { a.walls.left = false; b.walls.right = false; }
//     else if (dx === -1) { a.walls.right = false; b.walls.left = false; }
//     if (dy === 1) { a.walls.top = false; b.walls.bottom = false; }
//     else if (dy === -1) { a.walls.bottom = false; b.walls.top = false; }
// }

// // ==========================
// // CORE LOGIC
// // ==========================
// function solve(grid, start, end, cols, rows) {
//     const queue = [{ x: start.x, y: start.y }];
//     const visited = new Set();

//     while (queue.length) {
//         const curr = queue.shift();
//         const key = `${curr.x},${curr.y}`;
//         if (visited.has(key)) continue;
//         visited.add(key);

//         if (curr.x === end.x && curr.y === end.y) return true;

//         const cell = grid[getIdx(curr.x, curr.y, cols, rows)];
//         if (!cell) continue;

//         if (!cell.walls.top) queue.push({ x: curr.x, y: curr.y - 1 });
//         if (!cell.walls.right) queue.push({ x: curr.x + 1, y: curr.y });
//         if (!cell.walls.bottom) queue.push({ x: curr.x, y: curr.y + 1 });
//         if (!cell.walls.left) queue.push({ x: curr.x - 1, y: curr.y });
//     }
//     return false;
// }

// // ==========================
// // GENERATOR
// // ==========================
// export function generateMazeQuestion(level, per) {

//     const data = def_data(per);
//     const cellSize = data[level];

//     const cols = Math.floor(WIDTH / cellSize);
//     const rows = Math.floor(HEIGHT / cellSize);

//     const grid = Array.from(
//         { length: rows * cols },
//         (_, i) => new Cell(i % cols, Math.floor(i / cols))
//     );

//     // ✅ FIX: prevent undefined access
//     if (!grid.length) {
//         return {
//             difficulty: level,
//             question: "Can blue reach to red?",
//             options: ["YES", "NO"],
//             answer: "NO",
//             image: ""
//         };
//     }

//     // 1. Maze generation (DFS)
//     const stack = [];
//     let current = grid[0];
//     current.visited = true;

//     while (true) {
//         const neighbors = [];
//         const dirs = [
//             { x: 0, y: -1 },
//             { x: 1, y: 0 },
//             { x: 0, y: 1 },
//             { x: -1, y: 0 }
//         ];

//         for (const d of dirs) {
//             const idx = getIdx(current.x + d.x, current.y + d.y, cols, rows);
//             if (idx !== -1 && !grid[idx].visited) neighbors.push(grid[idx]);
//         }

//         if (neighbors.length) {
//             const next = neighbors[Math.floor(Math.random() * neighbors.length)];
//             next.visited = true;
//             stack.push(current);
//             removeWalls(current, next);
//             current = next;
//         } else if (stack.length) {
//             current = stack.pop();
//         } else break;
//     }

//     // 2. Start & End
//     const start = { x: 0, y: Math.floor(Math.random() * rows) };
//     const end = { x: cols - 1, y: Math.floor(Math.random() * rows) };

//     // 3. Random blocking
//     if (Math.random() < 0.5) {
//         for (let i = 0; i < 4; i++) {
//             const target = grid[Math.floor(Math.random() * grid.length)];
//             if (target) target.walls.left = target.walls.right = true;
//         }
//     }

//     const isSolvable = solve(grid, start, end, cols, rows);

//     // 4. Draw
//     const canvas = createCanvas(WIDTH, HEIGHT);
//     const ctx = canvas.getContext("2d");

//     ctx.fillStyle = "#FFFFFF";
//     ctx.fillRect(0, 0, WIDTH, HEIGHT);

//     ctx.strokeStyle = "#2C3E50";
//     ctx.lineWidth = 2;

//     grid.forEach(cell => {
//         const x = cell.x * cellSize;
//         const y = cell.y * cellSize;
//         ctx.beginPath();
//         if (cell.walls.top) ctx.moveTo(x, y), ctx.lineTo(x + cellSize, y);
//         if (cell.walls.right) ctx.moveTo(x + cellSize, y), ctx.lineTo(x + cellSize, y + cellSize);
//         if (cell.walls.bottom) ctx.moveTo(x + cellSize, y + cellSize), ctx.lineTo(x, y + cellSize);
//         if (cell.walls.left) ctx.moveTo(x, y + cellSize), ctx.lineTo(x, y);
//         ctx.stroke();
//     });

//     const r = cellSize * 0.3;
//     const o = cellSize / 2;

//     ctx.fillStyle = "#3498DB";
//     ctx.beginPath();
//     ctx.arc(start.x * cellSize + o, start.y * cellSize + o, r, 0, Math.PI * 2);
//     ctx.fill();

//     ctx.fillStyle = "#E74C3C";
//     ctx.beginPath();
//     ctx.arc(end.x * cellSize + o, end.y * cellSize + o, r, 0, Math.PI * 2);
//     ctx.fill();

//     return {
//         difficulty: level,
//         question: "Can blue reach to red?",
//         options: ["YES", "NO"],
//         answer: isSolvable ? "YES" : "NO",
//         image: canvas.toDataURL("image/png").replace(/^data:image\/png;base64,/, "")
//     };
// }
















































// import { createCanvas } from "canvas";

// // ==========================
// // CONFIG
// // ==========================
// const WIDTH = 400;
// const HEIGHT = 250;

// // ==========================
// // DATA (UNCHANGED)
// // ==========================
// function def_data(per) {
//     if (per < 5) return { "Too Easy": 18, "Easy": 16, "Medium": 14, "Tough": 12, "Too Tough": 10 };
//     else if (per < 10) return { "Too Easy": 20, "Easy": 18, "Medium": 16, "Tough": 14, "Too Tough": 12 };
//     else if (per < 15) return { "Too Easy": 22, "Easy": 20, "Medium": 18, "Tough": 16, "Too Tough": 14 };
//     else if (per < 20) return { "Too Easy": 44, "Easy": 42, "Medium": 40, "Tough": 38, "Too Tough": 36 };
//     else if (per < 25) return { "Too Easy": 42, "Easy": 40, "Medium": 38, "Tough": 36, "Too Tough": 34 };
//     else if (per < 30) return { "Too Easy": 40, "Easy": 38, "Medium": 36, "Tough": 34, "Too Tough": 32 };
//     else if (per < 35) return { "Too Easy": 38, "Easy": 36, "Medium": 34, "Tough": 32, "Too Tough": 30 };
//     else if (per < 40) return { "Too Easy": 36, "Easy": 34, "Medium": 32, "Tough": 30, "Too Tough": 28 };
//     else if (per < 45) return { "Too Easy": 34, "Easy": 32, "Medium": 30, "Tough": 28, "Too Tough": 26 };
//     else if (per < 50) return { "Too Easy": 32, "Easy": 30, "Medium": 28, "Tough": 26, "Too Tough": 24 };
//     else if (per < 55) return { "Too Easy": 30, "Easy": 28, "Medium": 26, "Tough": 24, "Too Tough": 22 };
//     else if (per < 60) return { "Too Easy": 28, "Easy": 26, "Medium": 24, "Tough": 22, "Too Tough": 20 };
//     else if (per < 65) return { "Too Easy": 26, "Easy": 24, "Medium": 22, "Tough": 20, "Too Tough": 18 };
//     else if (per < 70) return { "Too Easy": 24, "Easy": 22, "Medium": 20, "Tough": 18, "Too Tough": 16 };
//     else if (per < 75) return { "Too Easy": 22, "Easy": 20, "Medium": 18, "Tough": 16, "Too Tough": 14 };
//     else if (per < 80) return { "Too Easy": 20, "Easy": 18, "Medium": 16, "Tough": 14, "Too Tough": 12 };
//     else if (per < 85) return { "Too Easy": 18, "Easy": 16, "Medium": 14, "Tough": 12, "Too Tough": 10 };
//     else if (per < 90) return { "Too Easy": 16, "Easy": 14, "Medium": 12, "Tough": 10, "Too Tough": 8 };
//     else return { "Too Easy": 14, "Easy": 12, "Medium": 10, "Tough": 8, "Too Tough": 6 };
// }

// // ==========================
// // CELL
// // ==========================
// class Cell {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//         this.visited = false;
//         this.walls = { top: true, right: true, bottom: true, left: true };
//     }
// }

// const getIdx = (x, y, cols, rows) =>
//     (x < 0 || y < 0 || x >= cols || y >= rows) ? -1 : x + y * cols;

// function removeWalls(a, b) {
//     const dx = a.x - b.x;
//     const dy = a.y - b.y;
//     if (dx === 1) { a.walls.left = false; b.walls.right = false; }
//     else if (dx === -1) { a.walls.right = false; b.walls.left = false; }
//     if (dy === 1) { a.walls.top = false; b.walls.bottom = false; }
//     else if (dy === -1) { a.walls.bottom = false; b.walls.top = false; }
// }

// // ==========================
// // SOLVER (BFS + PATH)
// // ==========================
// function findPath(grid, start, end, cols, rows) {
//     const queue = [[start]];
//     const seen = new Set();

//     while (queue.length) {
//         const path = queue.shift();
//         const { x, y } = path[path.length - 1];
//         const key = `${x},${y}`;
//         if (seen.has(key)) continue;
//         seen.add(key);

//         if (x === end.x && y === end.y) return path;

//         const cell = grid[getIdx(x, y, cols, rows)];
//         if (!cell) continue;

//         if (!cell.walls.top) queue.push([...path, { x, y: y - 1 }]);
//         if (!cell.walls.right) queue.push([...path, { x: x + 1, y }]);
//         if (!cell.walls.bottom) queue.push([...path, { x, y: y + 1 }]);
//         if (!cell.walls.left) queue.push([...path, { x: x - 1, y }]);
//     }
//     return null;
// }

// // ==========================
// // MAIN
// // ==========================
// export function generateMazeQuestion(level, per) {

//     const cellSize = def_data(per)[level] ?? 20;
//     const cols = Math.max(2, Math.floor(WIDTH / cellSize));
//     const rows = Math.max(2, Math.floor(HEIGHT / cellSize));

//     const grid = Array.from(
//         { length: cols * rows },
//         (_, i) => new Cell(i % cols, Math.floor(i / cols))
//     );

//     // -------- MAZE GENERATION (DFS) --------
//     let current = grid[0];
//     current.visited = true;
//     const stack = [];

//     while (true) {
//         const neighbors = [];
//         for (const [dx, dy] of [[0,-1],[1,0],[0,1],[-1,0]]) {
//             const idx = getIdx(current.x + dx, current.y + dy, cols, rows);
//             if (idx !== -1 && !grid[idx].visited) neighbors.push(grid[idx]);
//         }

//         if (neighbors.length) {
//             const next = neighbors[Math.floor(Math.random() * neighbors.length)];
//             removeWalls(current, next);
//             stack.push(current);
//             next.visited = true;
//             current = next;
//         } else if (stack.length) {
//             current = stack.pop();
//         } else break;
//     }

//     const blue = { x: 0, y: Math.floor(Math.random() * rows) };
//     const red = { x: cols - 1, y: Math.floor(Math.random() * rows) };

//     // -------- SUBTLE IMPOSSIBLE --------
//     if (Math.random() < 0.35) {
//         const path = findPath(grid, blue, red, cols, rows);
//         if (path && path.length > 2) {
//             const cut = path[Math.floor(path.length / 2)];
//             const next = path[Math.floor(path.length / 2) + 1];
//             const a = grid[getIdx(cut.x, cut.y, cols, rows)];
//             const b = grid[getIdx(next.x, next.y, cols, rows)];
//             removeWalls(a, b);
//             // RE-BLOCK that wall (one-way illusion)
//             if (cut.x === next.x && cut.y - 1 === next.y) { a.walls.top = b.walls.bottom = true; }
//             if (cut.x === next.x && cut.y + 1 === next.y) { a.walls.bottom = b.walls.top = true; }
//             if (cut.x - 1 === next.x && cut.y === next.y) { a.walls.left = b.walls.right = true; }
//             if (cut.x + 1 === next.x && cut.y === next.y) { a.walls.right = b.walls.left = true; }
//         }
//     }

//     const solvable = !!findPath(grid, blue, red, cols, rows);

//     // -------- DRAW --------
//     const canvas = createCanvas(WIDTH, HEIGHT);
//     const ctx = canvas.getContext("2d");

//     ctx.fillStyle = "#fff";
//     ctx.fillRect(0, 0, WIDTH, HEIGHT);
//     ctx.strokeStyle = "#2C3E50";
//     ctx.lineWidth = 2;

//     for (const cell of grid) {
//         const x = cell.x * cellSize;
//         const y = cell.y * cellSize;
//         ctx.beginPath();
//         if (cell.walls.top) ctx.moveTo(x, y), ctx.lineTo(x + cellSize, y);
//         if (cell.walls.right) ctx.moveTo(x + cellSize, y), ctx.lineTo(x + cellSize, y + cellSize);
//         if (cell.walls.bottom) ctx.moveTo(x + cellSize, y + cellSize), ctx.lineTo(x, y + cellSize);
//         if (cell.walls.left) ctx.moveTo(x, y + cellSize), ctx.lineTo(x, y);
//         ctx.stroke();
//     }

//     const r = cellSize * 0.3;
//     const o = cellSize / 2;

//     ctx.fillStyle = "#3498DB";
//     ctx.beginPath();
//     ctx.arc(blue.x * cellSize + o, blue.y * cellSize + o, r, 0, Math.PI * 2);
//     ctx.fill();

//     ctx.fillStyle = "#E74C3C";
//     ctx.beginPath();
//     ctx.arc(red.x * cellSize + o, red.y * cellSize + o, r, 0, Math.PI * 2);
//     ctx.fill();

//         // -------- QUESTION TWISTS --------
//     const questionTypes = [
//         {
//             q: "Can Blue reach to Red?",
//             ans: solvable
//         },
//         {
//             q: "Can Red reach to Blue?",
//             ans: solvable
//         },
//         {
//             q: "Can Blue NOT reach to Red?",
//             ans: !solvable
//         },
//         {
//             q: "Is it impossible for Red to reach Blue?",
//             ans: !solvable
//         },
//         {
//             q: "Can Red reach to Blue?",
//             ans: true
//         },
//         {
//             q: "Can Blue reach to Red?",
//             ans: true
//         }
//     ];

//     const picked = questionTypes[
//         Math.floor(Math.random() * questionTypes.length)
//     ];

//     return {
//         difficulty: level,
//         question: picked.q,
//         options: ["YES", "NO"],
//         answer: picked.ans ? "YES" : "NO",
//         image: canvas.toBuffer("image/png").toString("base64")
//     };

// }




















import { createCanvas } from "canvas";

// ==========================
// CONFIG
// ==========================
const WIDTH = 400;
const HEIGHT = 250;

// ==========================
// DATA (UNCHANGED)
// ==========================
function def_data(per) {
    const ln = parseInt(per)
    return { 
        "Too Easy": 50-ln, 
        "Easy": 40-ln, 
        "Medium": 30 - ln, 
        "Tough": 20 - ln, 
        "Too Tough": 10 - ln
    }
}

// ==========================
// CELL
// ==========================
class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.visited = false;
        this.walls = { top: true, right: true, bottom: true, left: true };
    }
}

const getIdx = (x, y, cols, rows) =>
    (x < 0 || y < 0 || x >= cols || y >= rows) ? -1 : x + y * cols;

function removeWalls(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    if (dx === 1) { a.walls.left = false; b.walls.right = false; }
    else if (dx === -1) { a.walls.right = false; b.walls.left = false; }
    if (dy === 1) { a.walls.top = false; b.walls.bottom = false; }
    else if (dy === -1) { a.walls.bottom = false; b.walls.top = false; }
}

// ==========================
// SOLVER (BFS + PATH)
// ==========================
function findPath(grid, start, end, cols, rows) {
    const queue = [[start]];
    const seen = new Set();

    while (queue.length) {
        const path = queue.shift();
        const { x, y } = path[path.length - 1];
        const key = `${x},${y}`;
        if (seen.has(key)) continue;
        seen.add(key);

        if (x === end.x && y === end.y) return path;

        const cell = grid[getIdx(x, y, cols, rows)];
        if (!cell) continue;

        if (!cell.walls.top) queue.push([...path, { x, y: y - 1 }]);
        if (!cell.walls.right) queue.push([...path, { x: x + 1, y }]);
        if (!cell.walls.bottom) queue.push([...path, { x, y: y + 1 }]);
        if (!cell.walls.left) queue.push([...path, { x: x - 1, y }]);
    }
    return null;
}

// ==========================
// MAIN
// ==========================
export function generateMazeQuestion(level, per) {

    const cellSize = def_data(per)[level] ?? 20;
    const cols = Math.max(2, Math.floor(WIDTH / cellSize));
    const rows = Math.max(2, Math.floor(HEIGHT / cellSize));

    const grid = Array.from(
        { length: cols * rows },
        (_, i) => new Cell(i % cols, Math.floor(i / cols))
    );

    // -------- MAZE GENERATION (DFS) --------
    let current = grid[0];
    current.visited = true;
    const stack = [];

    while (true) {
        const neighbors = [];
        for (const [dx, dy] of [[0,-1],[1,0],[0,1],[-1,0]]) {
            const idx = getIdx(current.x + dx, current.y + dy, cols, rows);
            if (idx !== -1 && !grid[idx].visited) neighbors.push(grid[idx]);
        }

        if (neighbors.length) {
            const next = neighbors[Math.floor(Math.random() * neighbors.length)];
            removeWalls(current, next);
            stack.push(current);
            next.visited = true;
            current = next;
        } else if (stack.length) {
            current = stack.pop();
        } else break;
    }

    const blue = { x: 0, y: Math.floor(Math.random() * rows) };
    const red = { x: cols - 1, y: Math.floor(Math.random() * rows) };

    // -------- SUBTLE IMPOSSIBLE --------
    if (Math.random() < 0.35) {
        const path = findPath(grid, blue, red, cols, rows);
        if (path && path.length > 2) {
            const cut = path[Math.floor(path.length / 2)];
            const next = path[Math.floor(path.length / 2) + 1];
            const a = grid[getIdx(cut.x, cut.y, cols, rows)];
            const b = grid[getIdx(next.x, next.y, cols, rows)];
            removeWalls(a, b);
            // RE-BLOCK that wall (one-way illusion)
            if (cut.x === next.x && cut.y - 1 === next.y) { a.walls.top = b.walls.bottom = true; }
            if (cut.x === next.x && cut.y + 1 === next.y) { a.walls.bottom = b.walls.top = true; }
            if (cut.x - 1 === next.x && cut.y === next.y) { a.walls.left = b.walls.right = true; }
            if (cut.x + 1 === next.x && cut.y === next.y) { a.walls.right = b.walls.left = true; }
        }
    }

    const solvable = !!findPath(grid, blue, red, cols, rows);

    // -------- DRAW --------
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.strokeStyle = "#2C3E50";
    ctx.lineWidth = 2;

    for (const cell of grid) {
        const x = cell.x * cellSize;
        const y = cell.y * cellSize;
        ctx.beginPath();
        if (cell.walls.top) ctx.moveTo(x, y), ctx.lineTo(x + cellSize, y);
        if (cell.walls.right) ctx.moveTo(x + cellSize, y), ctx.lineTo(x + cellSize, y + cellSize);
        if (cell.walls.bottom) ctx.moveTo(x + cellSize, y + cellSize), ctx.lineTo(x, y + cellSize);
        if (cell.walls.left) ctx.moveTo(x, y + cellSize), ctx.lineTo(x, y);
        ctx.stroke();
    }

    const r = cellSize * 0.3;
    const o = cellSize / 2;

    ctx.fillStyle = "#3498DB";
    ctx.beginPath();
    ctx.arc(blue.x * cellSize + o, blue.y * cellSize + o, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#E74C3C";
    ctx.beginPath();
    ctx.arc(red.x * cellSize + o, red.y * cellSize + o, r, 0, Math.PI * 2);
    ctx.fill();

        // -------- QUESTION TWISTS --------
    const questionTypes = [
        {
            q: "Can Blue reach to Red?",
            ans: solvable
        },
        {
            q: "Can Red reach to Blue?",
            ans: solvable
        },
        {
            q: "Can Blue NOT reach to Red?",
            ans: !solvable
        },
        {
            q: "Is it impossible for Red to reach Blue?",
            ans: !solvable
        },
        {
            q: "Can Red reach to Blue?",
            ans: true
        },
        {
            q: "Can Blue reach to Red?",
            ans: true
        }
    ];

    const picked = questionTypes[
        Math.floor(Math.random() * questionTypes.length)
    ];

    return {
        difficulty: level,
        question: picked.q,
        options: ["YES", "NO"],
        answer: picked.ans ? "YES" : "NO",
        image: canvas.toBuffer("image/png").toString("base64")
    };

}
