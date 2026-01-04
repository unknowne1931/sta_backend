import { createCanvas } from "canvas";

// ==========================
// CONFIG
// ==========================
const WIDTH = 400;
const HEIGHT = 250;

function def_data(per) {
    if (per < 10) {
        return { "Too Easy": 50, "Easy": 48, "Medium": 46, "Tough": 44, "Too Tough": 42 }
    } else if (per < 20) {
        return { "Too Easy": 48, "Easy": 46, "Medium": 44, "Tough": 42, "Too Tough": 40 }
    } else if (per < 30) {
        return { "Too Easy": 46, "Easy": 44, "Medium": 42, "Tough": 40, "Too Tough": 38 }
    } else if (per < 40) {
        return { "Too Easy": 44, "Easy": 42, "Medium": 40, "Tough": 38, "Too Tough": 36 }
    } else if (per < 50) {
        return { "Too Easy": 42, "Easy": 40, "Medium": 38, "Tough": 36, "Too Tough": 34 }
    } else if (per < 60) {
        return { "Too Easy": 40, "Easy": 38, "Medium": 36, "Tough": 34, "Too Tough": 32 }
    } else if (per < 70) {
        return { "Too Easy": 38, "Easy": 36, "Medium": 34, "Tough": 32, "Too Tough": 30 }
    } else if (per < 80) {
        return { "Too Easy": 36, "Easy": 34, "Medium": 32, "Tough": 28, "Too Tough": 26 }
    } else if (per < 90) {
        return { "Too Easy": 34, "Easy": 32, "Medium": 30, "Tough": 28, "Too Tough": 26 }
    } else {
        return { "Too Easy": 24, "Easy": 22, "Medium": 20, "Tough": 18, "Too Tough": 16 }
    }
}

class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.visited = false;
        this.walls = { top: true, right: true, bottom: true, left: true };
    }
}

// ==========================
// HELPERS
// ==========================
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
// CORE LOGIC
// ==========================
function solve(grid, start, end, cols, rows) {
    const queue = [{ x: start.x, y: start.y }];
    const visited = new Set();

    while (queue.length) {
        const curr = queue.shift();
        const key = `${curr.x},${curr.y}`;
        if (visited.has(key)) continue;
        visited.add(key);

        if (curr.x === end.x && curr.y === end.y) return true;

        const cell = grid[getIdx(curr.x, curr.y, cols, rows)];
        if (!cell) continue;

        if (!cell.walls.top) queue.push({ x: curr.x, y: curr.y - 1 });
        if (!cell.walls.right) queue.push({ x: curr.x + 1, y: curr.y });
        if (!cell.walls.bottom) queue.push({ x: curr.x, y: curr.y + 1 });
        if (!cell.walls.left) queue.push({ x: curr.x - 1, y: curr.y });
    }
    return false;
}

// ==========================
// GENERATOR
// ==========================
export function generateMazeQuestion({ level = "Medium", per = 50 } = {}) {

    const data = def_data(per);
    const cellSize = data[level];

    const cols = Math.floor(WIDTH / cellSize);
    const rows = Math.floor(HEIGHT / cellSize);

    const grid = Array.from(
        { length: rows * cols },
        (_, i) => new Cell(i % cols, Math.floor(i / cols))
    );

    // ✅ FIX: prevent undefined access
    if (!grid.length) {
        return {
            difficulty: level,
            question: "Can blue reach to red?",
            options: ["YES", "NO"],
            answer: "NO",
            image: ""
        };
    }

    // 1. Maze generation (DFS)
    const stack = [];
    let current = grid[0];
    current.visited = true;

    while (true) {
        const neighbors = [];
        const dirs = [
            { x: 0, y: -1 },
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: -1, y: 0 }
        ];

        for (const d of dirs) {
            const idx = getIdx(current.x + d.x, current.y + d.y, cols, rows);
            if (idx !== -1 && !grid[idx].visited) neighbors.push(grid[idx]);
        }

        if (neighbors.length) {
            const next = neighbors[Math.floor(Math.random() * neighbors.length)];
            next.visited = true;
            stack.push(current);
            removeWalls(current, next);
            current = next;
        } else if (stack.length) {
            current = stack.pop();
        } else break;
    }

    // 2. Start & End
    const start = { x: 0, y: Math.floor(Math.random() * rows) };
    const end = { x: cols - 1, y: Math.floor(Math.random() * rows) };

    // 3. Random blocking
    if (Math.random() < 0.5) {
        for (let i = 0; i < 4; i++) {
            const target = grid[Math.floor(Math.random() * grid.length)];
            if (target) target.walls.left = target.walls.right = true;
        }
    }

    const isSolvable = solve(grid, start, end, cols, rows);

    // 4. Draw
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.strokeStyle = "#2C3E50";
    ctx.lineWidth = 2;

    grid.forEach(cell => {
        const x = cell.x * cellSize;
        const y = cell.y * cellSize;
        ctx.beginPath();
        if (cell.walls.top) ctx.moveTo(x, y), ctx.lineTo(x + cellSize, y);
        if (cell.walls.right) ctx.moveTo(x + cellSize, y), ctx.lineTo(x + cellSize, y + cellSize);
        if (cell.walls.bottom) ctx.moveTo(x + cellSize, y + cellSize), ctx.lineTo(x, y + cellSize);
        if (cell.walls.left) ctx.moveTo(x, y + cellSize), ctx.lineTo(x, y);
        ctx.stroke();
    });

    const r = cellSize * 0.3;
    const o = cellSize / 2;

    ctx.fillStyle = "#3498DB";
    ctx.beginPath();
    ctx.arc(start.x * cellSize + o, start.y * cellSize + o, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#E74C3C";
    ctx.beginPath();
    ctx.arc(end.x * cellSize + o, end.y * cellSize + o, r, 0, Math.PI * 2);
    ctx.fill();

    return {
        difficulty: level,
        question: "Can blue reach to red?",
        options: ["YES", "NO"],
        answer: isSolvable ? "YES" : "NO",
        image: canvas.toDataURL("image/png").replace(/^data:image\/png;base64,/, "")
    };
}
