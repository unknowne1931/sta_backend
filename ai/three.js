

// // plusCounter.js
// import { createCanvas } from "canvas";

// // ======================= PERFORMANCE DIFFICULTY ==========================
// export function getPlusLevels(per) {
//     if (per < 10) {
//         return {
//             "Too Easy":  { h: 3,  v: 3,  gap: 62 },
//             "Easy":      { h: 5,  v: 5,  gap: 55 },
//             "Medium":    { h: 6,  v: 6,  gap: 48 },
//             "Tough":     { h: 9,  v: 9,  gap: 40 },
//             "Too Tough": { h: 12, v: 12, gap: 32 }
//         };
//     } else if (per < 20) {
//         return {
//             "Too Easy":  { h: 4,  v: 4,  gap: 60 },
//             "Easy":      { h: 6,  v: 6,  gap: 50 },
//             "Medium":    { h: 7,  v: 7,  gap: 40 },
//             "Tough":     { h: 10, v: 10, gap: 32 },
//             "Too Tough": { h: 14, v: 14, gap: 26 }
//         };
//     } else if (per < 40) {
//         return {
//             "Too Easy":  { h: 5,  v: 5,  gap: 58 },
//             "Easy":      { h: 7,  v: 7,  gap: 46 },
//             "Medium":    { h: 8,  v: 8,  gap: 36 },
//             "Tough":     { h: 11, v: 11, gap: 28 },
//             "Too Tough": { h: 16, v: 16, gap: 22 }
//         };
//     } else if (per < 60) {
//         return {
//             "Too Easy":  { h: 6,  v: 6,  gap: 54 },
//             "Easy":      { h: 8,  v: 8,  gap: 42 },
//             "Medium":    { h: 9,  v: 9,  gap: 30 },
//             "Tough":     { h: 13, v: 13, gap: 24 },
//             "Too Tough": { h: 18, v: 18, gap: 20 }
//         };
//     } else {
//         return {
//             "Too Easy":  { h: 7,  v: 7,  gap: 48 },
//             "Easy":      { h: 9,  v: 9,  gap: 36 },
//             "Medium":    { h: 10, v: 10, gap: 28 },
//             "Tough":     { h: 15, v: 15, gap: 22 },
//             "Too Tough": { h: 22, v: 22, gap: 18 }
//         };
//     }
// }

// // ========================== HELPERS =====================================
// function rand(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// // Safe placement with attempt limit + graceful fallback
// function placeWithGap(min, max, used, gap, maxTries = 200) {
//     for (let i = 0; i < maxTries; i++) {
//         const value = rand(min, max);
//         if (!used.some(v => Math.abs(v - value) < gap)) {
//             used.push(value);
//             return value;
//         }
//     }
//     // fallback if no perfect spot exists
//     const value = rand(min, max);
//     used.push(value);
//     return value;
// }

// // Count only true crosses (no T-shapes, no touching)
// function isTruePlus(hLine, vLine) {
//     const ix = vLine.x;
//     const iy = hLine.y;

//     return (
//         ix > hLine.x1 &&
//         ix < hLine.x2 &&
//         iy > vLine.y1 &&
//         iy < vLine.y2
//     );
// }

// // ======================== CORE GENERATOR =================================
// export function generatePlusData(level, LEVELS, width = 620, height = 360) {
//     const cfg = LEVELS[level] || LEVELS["Medium"];
//     const { h, v, gap } = cfg;

//     const horizontals = [];
//     const verticals = [];
//     const usedY = [];
//     const usedX = [];

//     for (let i = 0; i < h; i++) {
//         const y = placeWithGap(20, height - 20, usedY, gap);
//         horizontals.push({
//             y,
//             x1: rand(0, width * 0.35),
//             x2: rand(width * 0.65, width)
//         });
//     }

//     for (let i = 0; i < v; i++) {
//         const x = placeWithGap(20, width - 20, usedX, gap);
//         verticals.push({
//             x,
//             y1: rand(0, height * 0.35),
//             y2: rand(height * 0.65, height)
//         });
//     }

//     const plusPoints = [];
//     let correct = 0;

//     horizontals.forEach(hLine => {
//         verticals.forEach(vLine => {
//             if (isTruePlus(hLine, vLine)) {
//                 correct++;
//                 plusPoints.push({ x: vLine.x, y: hLine.y });
//             }
//         });
//     });

//     return { horizontals, verticals, plusPoints, correct };
// }

// // =========================== OPTIONS =====================================
// export function generatePlusOptions(correct) {
//     const set = new Set([correct]);
//     let i = 1;
//     while (set.size < 4) {
//         if (correct - i >= 0) set.add(correct - i);
//         set.add(correct + i);
//         i++;
//     }
//     return [...set].sort(() => Math.random() - 0.5);
// }

// // =========================== QUESTION FLOW ===============================
// export function generatePlusQuestion(per, level = "Medium") {
//     const LEVELS = getPlusLevels(per);
//     const data = generatePlusData(level, LEVELS);
//     const options = generatePlusOptions(data.correct);
//     return { ...data, options };
// }

// // =========================== IMAGE ======================================
// export function renderPlusImage(data, width = 620, height = 360) {
//     const canvas = createCanvas(width, height);
//     const ctx = canvas.getContext("2d");

//     ctx.fillStyle = "#fff";
//     ctx.fillRect(0, 0, width, height);

//     ctx.strokeStyle = "#000";
//     ctx.lineWidth = 2;

//     data.horizontals.forEach(l => {
//         ctx.beginPath();
//         ctx.moveTo(l.x1, l.y);
//         ctx.lineTo(l.x2, l.y);
//         ctx.stroke();
//     });

//     data.verticals.forEach(l => {
//         ctx.beginPath();
//         ctx.moveTo(l.x, l.y1);
//         ctx.lineTo(l.x, l.y2);
//         ctx.stroke();
//     });

//     return canvas.toBuffer("image/png");
// }

// // =========================== FINAL API ===================================
// export async function generatePlusQuestionImage(per, level = "Medium") {
//     const question = generatePlusQuestion(per, level);
//     const buffer = renderPlusImage(question);
//     const imageUrl = buffer.toString("base64");
//     return { question, imageUrl };
// }



































// plusCounter.js
import { createCanvas } from "canvas";

// ======================= PERFORMANCE DIFFICULTY ==========================
export function getPlusLevels(per) {
    if (per < 5) {
        return {
            "Too Easy":  { h: 1,  v: 3,  gap: 46 },
            "Easy":      { h: 1,  v: 4,  gap: 44 },
            "Medium":    { h: 1,  v: 5,  gap: 42 },
            "Tough":     { h: 1,  v: 6,  gap: 40 },
            "Too Tough": { h: 1, v: 7, gap: 38 }
        };
    }else if (per < 10) {
        return {
            "Too Easy":  { h: 2,  v: 4,  gap: 44 },
            "Easy":      { h: 2,  v: 5,  gap: 42 },
            "Medium":    { h: 2,  v: 6,  gap: 40 },
            "Tough":     { h: 2,  v: 7,  gap: 38 },
            "Too Tough": { h: 2, v: 8, gap: 36}
        };
    }else if (per < 15) {
        return {
            "Too Easy":  { h: 3,  v: 5,  gap: 42 },
            "Easy":      { h: 3,  v: 6,  gap: 40 },
            "Medium":    { h: 3,  v: 7,  gap: 38 },
            "Tough":     { h: 3,  v: 8,  gap: 36 },
            "Too Tough": { h: 3, v: 9, gap: 34 }
        };
    }else if (per < 20) {
        return {
            "Too Easy":  { h: 4,  v: 6,  gap: 40 },
            "Easy":      { h: 4,  v: 7,  gap: 38 },
            "Medium":    { h: 4,  v: 8,  gap: 36 },
            "Tough":     { h: 4,  v: 9,  gap: 34 },
            "Too Tough": { h: 4, v: 10, gap: 32 }
        };
    }else if (per < 25) {
        return {
            "Too Easy":  { h: 5,  v: 7,  gap: 40 },
            "Easy":      { h: 5,  v: 8,  gap: 38 },
            "Medium":    { h: 5,  v: 9,  gap: 34 },
            "Tough":     { h: 5,  v: 10,  gap: 32 },
            "Too Tough": { h: 5, v: 11, gap: 30 }
        };
    }else if (per < 30) {
        return {
            "Too Easy":  { h: 6,  v: 8,  gap: 36 },
            "Easy":      { h: 6,  v: 9,  gap: 34 },
            "Medium":    { h: 6,  v: 10,  gap: 32 },
            "Tough":     { h: 6,  v: 11,  gap: 30 },
            "Too Tough": { h: 6, v: 12, gap: 28 }
        };
    }else if (per < 35) {
        return {
            "Too Easy":  { h: 7,  v: 9,  gap: 34 },
            "Easy":      { h: 7,  v: 10,  gap: 32 },
            "Medium":    { h: 7,  v: 11,  gap: 30 },
            "Tough":     { h: 7,  v: 12,  gap: 28 },
            "Too Tough": { h: 7, v: 13, gap: 26}
        };
    }else if (per < 40) {
        return {
            "Too Easy":  { h: 8,  v: 10,  gap: 32 },
            "Easy":      { h: 8,  v: 11,  gap: 30 },
            "Medium":    { h: 8,  v: 12,  gap: 28 },
            "Tough":     { h: 8,  v: 13,  gap: 26 },
            "Too Tough": { h: 8, v: 14, gap: 24 }
        };
    }else if (per < 45) {
        return {
            "Too Easy":  { h: 9,  v: 11,  gap: 30 },
            "Easy":      { h: 9,  v: 12,  gap: 28 },
            "Medium":    { h: 9,  v: 13,  gap: 26 },
            "Tough":     { h: 9,  v: 14,  gap: 24 },
            "Too Tough": { h: 9, v: 15, gap: 22 }
        };
    }else if (per < 50) {
        return {
            "Too Easy":  { h: 10,  v: 12,  gap: 28 },
            "Easy":      { h: 10,  v: 13,  gap: 26 },
            "Medium":    { h: 10,  v: 14,  gap: 24 },
            "Tough":     { h: 10,  v: 15,  gap: 22 },
            "Too Tough": { h: 10, v: 16, gap: 20 }
        };
    }else if (per < 55) {
        return {
            "Too Easy":  { h: 11,  v: 13,  gap: 20 },
            "Easy":      { h: 11,  v: 14,  gap: 28 },
            "Medium":    { h: 11,  v: 15,  gap: 26 },
            "Tough":     { h: 11,  v: 16,  gap: 24 },
            "Too Tough": { h: 11, v: 17, gap: 22 }
        };
    }else if (per < 60) {
        return {
            "Too Easy":  { h: 12,  v: 14,  gap: 28 },
            "Easy":      { h: 12,  v: 15,  gap: 26 },
            "Medium":    { h: 12,  v: 16,  gap: 24 },
            "Tough":     { h: 12,  v: 17,  gap: 22 },
            "Too Tough": { h: 12, v: 18, gap: 20 }
        };
    }else{
        return {
            "Too Easy":  { h: 13,  v: 15,  gap: 26 },
            "Easy":      { h: 13,  v: 16,  gap: 24 },
            "Medium":    { h: 13,  v: 17,  gap: 22 },
            "Tough":     { h: 13,  v: 18,  gap: 20 },
            "Too Tough": { h: 13, v: 19, gap: 18 }
        };
    }
}

// ========================== HELPERS =====================================
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Safe placement with attempt limit + graceful fallback
function placeWithGap(min, max, used, gap, maxTries = 200) {
    for (let i = 0; i < maxTries; i++) {
        const value = rand(min, max);
        if (!used.some(v => Math.abs(v - value) < gap)) {
            used.push(value);
            return value;
        }
    }
    // fallback if no perfect spot exists
    const value = rand(min, max);
    used.push(value);
    return value;
}

// Count only true crosses (no T-shapes, no touching)
function isTruePlus(hLine, vLine) {
    const ix = vLine.x;
    const iy = hLine.y;

    return (
        ix > hLine.x1 &&
        ix < hLine.x2 &&
        iy > vLine.y1 &&
        iy < vLine.y2
    );
}

// ======================== CORE GENERATOR =================================
export function generatePlusData(level, LEVELS, width = 620, height = 360) {
    const cfg = LEVELS[level] || LEVELS["Medium"];
    const { h, v, gap } = cfg;

    const horizontals = [];
    const verticals = [];
    const usedY = [];
    const usedX = [];

    for (let i = 0; i < h; i++) {
        const y = placeWithGap(20, height - 20, usedY, gap);
        horizontals.push({
            y,
            x1: rand(0, width * 0.35),
            x2: rand(width * 0.65, width)
        });
    }

    for (let i = 0; i < v; i++) {
        const x = placeWithGap(20, width - 20, usedX, gap);
        verticals.push({
            x,
            y1: rand(0, height * 0.35),
            y2: rand(height * 0.65, height)
        });
    }

    const plusPoints = [];
    let correct = 0;

    horizontals.forEach(hLine => {
        verticals.forEach(vLine => {
            if (isTruePlus(hLine, vLine)) {
                correct++;
                plusPoints.push({ x: vLine.x, y: hLine.y });
            }
        });
    });

    return { horizontals, verticals, plusPoints, correct };
}

// =========================== OPTIONS =====================================
export function generatePlusOptions(correct) {
    const set = new Set([correct]);
    let i = 1;
    while (set.size < 4) {
        if (correct - i >= 0) set.add(correct - i);
        set.add(correct + i);
        i++;
    }
    return [...set].sort(() => Math.random() - 0.5);
}

// =========================== QUESTION FLOW ===============================
export function generatePlusQuestion(per, level = "Medium") {
    const LEVELS = getPlusLevels(per);
    const data = generatePlusData(level, LEVELS);
    const options = generatePlusOptions(data.correct);
    return { ...data, options };
}

// =========================== IMAGE ======================================
export function renderPlusImage(data, width = 620, height = 360) {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;

    data.horizontals.forEach(l => {
        ctx.beginPath();
        ctx.moveTo(l.x1, l.y);
        ctx.lineTo(l.x2, l.y);
        ctx.stroke();
    });

    data.verticals.forEach(l => {
        ctx.beginPath();
        ctx.moveTo(l.x, l.y1);
        ctx.lineTo(l.x, l.y2);
        ctx.stroke();
    });

    return canvas.toBuffer("image/png");
}

// =========================== FINAL API ===================================
export async function generatePlusQuestionImage(per, level = "Medium") {
    const question = generatePlusQuestion(per, level);
    const buffer = renderPlusImage(question);
    const imageUrl = buffer.toString("base64");
    return { question, imageUrl };
}
