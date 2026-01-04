import { createCanvas } from "canvas";

// ==========================
// CONFIG
// ==========================
const WIDTH = 400;
const HEIGHT = 250;

// ==========================
// DIFFICULTY BY PERFORMANCE
// ==========================
function def_tough(per = 80) {
    if (per < 10) {
        return { 
            "Too Easy": 10,
            "Easy": 15, 
            "Medium": 20, 
            "Tough": 25, 
            "Too Tough": 30 
        };
    } else if (per < 20) {
        return { 
            "Too Easy": 15, 
            "Easy": 20, 
            "Medium": 25, 
            "Tough": 30, 
            "Too Tough": 35 
        };
    } else if(per < 30) {
        return { 
            "Too Easy": 20, 
            "Easy": 25, 
            "Medium": 30, 
            "Tough": 35, 
            "Too Tough": 40 
        };
    }else if(per < 40) {
        return { 
            "Too Easy": 25, 
            "Easy": 30, 
            "Medium": 35, 
            "Tough": 40, 
            "Too Tough": 45 
        };
    }else if(per < 50) {
        return { 
            "Too Easy": 30, 
            "Easy": 35, 
            "Medium": 40, 
            "Tough": 45, 
            "Too Tough": 50 
        };
    }else{
        return { 
            "Too Easy": 35, 
            "Easy": 40, 
            "Medium": 45, 
            "Tough": 50, 
            "Too Tough": 55 
        };
    }

}

// ==========================
// CHAR POOLS
// ==========================
const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const POOL = ALPHABETS + NUMBERS;

// ==========================
// HELPERS
// ==========================
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChar() {
    return POOL[rand(0, POOL.length - 1)];
}

function generateString(len) {
    let s = "";
    for (let i = 0; i < len; i++) s += randomChar();
    return s;
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = rand(0, i);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// ==========================
// COUNT LOGIC
// ==========================
function countAlphabets(str) {
    return [...str].filter(c => /[a-zA-Z]/.test(c)).length;
}

function countAlphabetsExcept(str, exceptChar) {
    return [...str].filter(
        c => /[a-zA-Z]/.test(c) && c.toLowerCase() !== exceptChar.toLowerCase()
    ).length;
}

function countNumbers(str) {
    return [...str].filter(c => /[0-9]/.test(c)).length;
}

function countLessThan(str, n) {
    return [...str].filter(c => /[0-9]/.test(c) && Number(c) < n).length;
}

function countGreaterThan(str, n) {
    return [...str].filter(c => /[0-9]/.test(c) && Number(c) > n).length;
}

// alphabet-order ignore (ignore a..ch)
function countAlphabetsAfterCharOrder(str, ch) {
    const limit = ch.toLowerCase();
    return [...str].filter(
        c => /[a-zA-Z]/.test(c) && c.toLowerCase() > limit
    ).length;
}

// ==========================
// QUESTION ENGINE
// ==========================
function generateQuestion(str) {
    const type = rand(1, 6);

    if (type === 1) return { q: "How many alphabets are there?", a: countAlphabets(str) };
    if (type === 2) return { q: "How many numbers are there?", a: countNumbers(str) };

    if (type === 3) {
        const n = rand(1, 3);
        return { q: `How many numbers are lesser than ${n}?`, a: countLessThan(str, n) };
    }

    if (type === 4) {
        const n = rand(5, 7);
        return { q: `How many numbers are greater than ${n}?`, a: countGreaterThan(str, n) };
    }

    if (type === 5) {
        const except = ALPHABETS[rand(0, ALPHABETS.length - 1)];
        return {
            q: `How many alphabets are there except '${except}'?`,
            a: countAlphabetsExcept(str, except)
        };
    }

    const ch = ALPHABETS[rand(0, 25)];
    return {
        q: `Count only alphabets that come after '${ch}' in the alphabet. Ignore all letters from 'a' to '${ch}'. How many alphabets are there?`,
        a: countAlphabetsAfterCharOrder(str, ch)
    };
}

// ==========================
// OPTIONS
// ==========================
function generateOptions(correct) {
    const min = Math.max(0, correct - 3);
    const max = correct + 3;

    const pool = [];
    for (let i = min; i <= max; i++) pool.push(i);

    if (!pool.includes(correct)) pool.push(correct);

    shuffle(pool);
    return pool.slice(0, Math.min(rand(5, 6), pool.length));
}

// ==========================
// TEXT WRAP DRAWER (NEW + IMPORTANT)
// ==========================
function drawWrappedCenteredText(ctx, text, x, y, maxWidth, lineHeight) {
    const lines = [];
    let current = "";

    for (const char of text) {
        const test = current + char;
        if (ctx.measureText(test).width > maxWidth && current) {
            lines.push(current);
            current = char;
        } else {
            current = test;
        }
    }
    if (current) lines.push(current);

    const totalHeight = lines.length * lineHeight;
    let startY = y - totalHeight / 2 + lineHeight / 2;

    for (const line of lines) {
        ctx.fillText(line, x, startY);
        startY += lineHeight;
    }
}

// ==========================
// IMAGE GENERATOR
// ==========================
export function createStringCountImage(level, per) {
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#f4f4f4";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    const lv = def_tough(per);
    const len = lv[level];
    const str = generateString(len);
    const { q, a } = generateQuestion(str);
    const options = generateOptions(a);

    // ==========================
    // SECRET CODE (SAFE + CENTERED)
    // ==========================
    ctx.fillStyle = "#000";
    ctx.font = "bold 26px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    drawWrappedCenteredText(
        ctx,
        str,
        WIDTH / 2,
        HEIGHT / 2,
        WIDTH - 40,   // padding
        32            // line height
    );

    const base64 = canvas
        .toDataURL("image/png")
        .replace(/^data:image\/png;base64,/, "");

    return {
        meta: { width: WIDTH, height: HEIGHT, level },
        data: {
            string: str,
            question: q,
            options,
            correct: a
        },
        imageBase64: base64
    };
}
