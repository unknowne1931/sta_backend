// plusCounter.js
import { createCanvas } from "canvas";
import axios from "axios";
import FormData from "form-data";


// ======================= PERFORMANCE DIFFICULTY ==========================
export function getPlusLevels(per) {
    let LEVELS;

    if (per < 10) {
        LEVELS = {
            "Too Easy" :  { h: 3, v: 3, gap: 62 },
            "Easy" :     { h: 5, v: 5, gap: 55 },
            "Medium" :   { h: 6, v: 6, gap: 48 },
            "Tough" :    { h: 9, v: 9, gap: 40 },
            "Too Tough" : { h: 12, v: 12, gap: 32 }
        };
    } else if (per < 20) {
        LEVELS = {
            "Too Easy":  { h: 4, v: 4, gap: 60 },
            "Easy":     { h: 6, v: 6, gap: 50 },
            "Medium":   { h: 7, v: 7, gap: 40 },
            "Tough":    { h: 10, v: 10, gap: 32 },
            "Too Tough": { h: 14, v: 14, gap: 26 }
        };
    } else if (per < 40) {
        LEVELS = {
            "Too Easy":  { h: 5, v: 5, gap: 58 },
            "Easy":     { h: 7, v: 7, gap: 46 },
            "Medium":   { h: 8, v: 8, gap: 36 },
            "Tough":    { h: 11, v: 11, gap: 28 },
            "Too Tough": { h: 16, v: 16, gap: 22 }
        };
    } else if (per < 60) {
        LEVELS = {
            "Too Easy":  { h: 6, v: 6, gap: 54 },
            "Easy":     { h: 8, v: 8, gap: 42 },
            "Medium":   { h: 9, v: 9, gap: 30 },
            "Tough":    { h: 13, v: 13, gap: 24 },
            "Too Tough": { h: 18, v: 18, gap: 20 }
        };
    } else {
        // very high performance = max difficulty
        LEVELS = {
            "Too Easy":  { h: 7, v: 7, gap: 48 },
            "Easy":     { h: 9, v: 9, gap: 36 },
            "Medium":   { h: 10, v: 10, gap: 28 },
            "Tough":    { h: 15, v: 15, gap: 22 },
            "Too Tough": { h: 22, v: 22, gap: 18 }
        };
    }

    return LEVELS;
}


// ========================== HELPERS =====================================
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isTruePlus(hLine, vLine) {
    const ix = vLine.x;
    const iy = hLine.y;
    if (ix < hLine.x1 || ix > hLine.x2 || iy < vLine.y1 || iy > vLine.y2) return false;

    const hasLeft  = ix > hLine.x1;
    const hasRight = ix < hLine.x2;
    const hasUp    = iy > vLine.y1;
    const hasDown  = iy < vLine.y2;

    return hasLeft && hasRight && hasUp && hasDown;
}


// ======================== CORE GENERATOR =================================
export function generatePlusData(level = "Medium", LEVELS, width = 620, height = 360) {
    const { h, v, gap } = LEVELS[level] || LEVELS.medium;

    const horizontals = [];
    const verticals = [];
    const usedY = [];
    const usedX = [];

    for (let i = 0; i < h; i++) {
        let y, tries = 0;
        while (tries++ < 100) {
            y = rand(20, height - 20);
            if (!usedY.some(v => Math.abs(v - y) < gap)) break;
        }
        usedY.push(y);
        horizontals.push({
            y,
            x1: rand(0, width * 0.35),
            x2: rand(width * 0.65, width)
        });
    }

    for (let i = 0; i < v; i++) {
        let x, tries = 0;
        while (tries++ < 100) {
            x = rand(20, width - 20);
            if (!usedX.some(v => Math.abs(v - x) < gap)) break;
        }
        usedX.push(x);
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

export function generatePlusQuestion(per, level = "Medium") {
    const LEVELS = getPlusLevels(per);
    const data = generatePlusData(level, LEVELS);
    const options = generatePlusOptions(data.correct);
    return { ...data, options };
}


// =========================== IMAGE & UPLOAD ================================
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

// export async function uploadPlusImage(buffer) {
//     const form = new FormData();
//     form.append("screenshot", buffer, "plus.png");

//     const res = await axios.post(
//         "https://backend.stawro.com/stawro/upload.php",
//         form,
//         { headers: form.getHeaders() }
//     );

//     return res.data?.path
//         ? `https://backend.stawro.com/stawro/${res.data.path}`
//         : null;
// }


/* 🧾 just print image data (no upload) */
export async function showPlusImageData(buffer) {

    // OR print base64 if you want to inspect / send to frontend
    const base64 = buffer.toString("base64");
    // console.log("data:image/png;base64," + base64);

    return base64; // optional return
}


// ========================== FULL FLOW =====================================
export async function generatePlusQuestionImage(per, level = "Medium") {
    const question = generatePlusQuestion(per, level);
    // const buffer = renderPlusImage(question);
    // const imageUrl = await uploadPlusImage(buffer);

    const buf = renderPlusImage(question);
    const imageUrl = await showPlusImageData(buf);
    


    return { question, imageUrl };
}
