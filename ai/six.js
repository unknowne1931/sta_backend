

// import { createCanvas } from "canvas";

// // ================================
// // CONFIG
// // ================================
// const WIDTH = 400;
// const HEIGHT = 250;
// const letters = "abcdefghijklmnopqrstuvwxyz";

// // ================================
// // DIFFICULTY MAP
// // ================================
// function getLevelMap(per) {
//     if (per < 10) return { "Too Easy": 1,  "Easy": 10, "Medium": 15, "Tough": 20, "Too Tough": 25 };
//     if (per < 20) return { "Too Easy": 10, "Easy": 15, "Medium": 20, "Tough": 25, "Too Tough": 30 };
//     if (per < 30) return { "Too Easy": 15, "Easy": 20, "Medium": 25, "Tough": 30, "Too Tough": 35 };
//     if (per < 40) return { "Too Easy": 40, "Easy": 45, "Medium": 50, "Tough": 55, "Too Tough": 60 };
//     return              { "Too Easy": 45, "Easy": 50, "Medium": 55, "Tough": 60, "Too Tough": 65 };
// }

// // ================================
// // HELPERS
// // ================================
// function randomLetters(n) {
//     let out = "";
//     while (n--) {
//         out += letters[Math.floor(Math.random() * letters.length)];
//     }
//     return out;
// }

// function countTarget(text, target) {
//     return (text.match(new RegExp(target, "g")) || []).length;
// }

// /**
//  * FIXED LOGIC:
//  * Counts only IMMEDIATE right-side matches (l1 followed by l2)
//  * Example: "ld"
//  */
// function countRightSide(text, l1, l2) {
//     let count = 0;
//     for (let i = 0; i < text.length - 1; i++) {
//         if (text[i] === l1 && text[i + 1] === l2) {
//             count++;
//         }
//     }
//     return count;
// }

// // ================================
// // TEXT GENERATION
// // ================================
// function makeText(target, baseRepeats) {
//     let out = "";

//     // guaranteed appearances
//     const guaranteed = Math.max(2, Math.floor(baseRepeats / 3));
//     for (let i = 0; i < guaranteed; i++) {
//         out += randomLetters(Math.floor(Math.random() * 3) + 1);
//         out += target;
//     }

//     // filler
//     const filler = baseRepeats * 2;
//     for (let i = 0; i < filler; i++) {
//         out += Math.random() < 0.25
//             ? target
//             : randomLetters(Math.floor(Math.random() * 4) + 1);
//     }

//     return out;
// }

// function generateUntilFits(target, level, per) {
//     const dif = getLevelMap(per);
//     let baseRepeats = dif[level];

//     for (let i = 0; i < 40 && baseRepeats > 2; i++) {
//         const txt = makeText(target, baseRepeats);
//         if (txt.length < 700) return txt;
//         baseRepeats--;
//     }

//     return makeText(target, 5);
// }

// // ================================
// // OPTIONS
// // ================================
// function generateOptions(correct) {
//     const set = new Set([correct]);

//     while (set.size < 4) {
//         const delta = Math.floor(Math.random() * 7) - 3;
//         set.add(Math.max(0, correct + delta));
//     }

//     return [...set].sort(() => Math.random() - 0.5);
// }

// // ================================
// // CANVAS TEXT WRAP
// // ================================
// function wrapText(ctx, text, maxWidth) {
//     const lines = [];
//     let current = "";

//     for (const ch of text) {
//         const test = current + ch;
//         if (ctx.measureText(test).width > maxWidth) {
//             lines.push(current);
//             current = ch;
//         } else {
//             current = test;
//         }
//     }
//     if (current) lines.push(current);
//     return lines;
// }

// // ================================
// // MAIN
// // ================================
// export async function createChallenge(level, per) {
//     const l1 = letters[Math.floor(Math.random() * letters.length)];
//     const l2 = letters[Math.floor(Math.random() * letters.length)];
//     const target = l1 + l2;

//     const txt = generateUntilFits(target, level, per);

//     const normalCorrect = countTarget(txt, target);
//     const twistCorrect  = countRightSide(txt, l1, l2);

//     const qMain  = `How many exact "${target}" exist in the box?`;
//     const qTwist = `How many times '${l2}' exists right side of '${l1}'?`;

//     const isTwist = (["Tough", "Too Tough"].includes(level) && per > 20);

//     // safety clamp
//     const correctRaw = isTwist ? twistCorrect : normalCorrect;
//     const correct = Math.min(correctRaw, 99);

//     const options = generateOptions(correct);
//     const qst = isTwist ? qTwist : qMain;

//     // -------- CANVAS ----------
//     const canvas = createCanvas(WIDTH, HEIGHT);
//     const ctx = canvas.getContext("2d");

//     ctx.fillStyle = "#fff";
//     ctx.fillRect(0, 0, WIDTH, HEIGHT);

//     ctx.fillStyle = "#000";
//     ctx.font = "16px Arial";
//     ctx.textAlign = "center";

//     const padding = 12;
//     const maxWidth = WIDTH - padding * 2;
//     const lineHeight = 18;

//     const lines = wrapText(ctx, txt, maxWidth);
//     let y = (HEIGHT - lines.length * lineHeight) / 2;

//     for (const line of lines) {
//         if (y > HEIGHT - 6) break;
//         ctx.fillText(line, WIDTH / 2, y);
//         y += lineHeight;
//     }

//     const base64img = canvas.toBuffer("image/png").toString("base64");

//     return {
//         txt,
//         qst,
//         options,
//         correct,
//         base64img
//     };
// }

// // ================================
// // UPLOAD (PASSTHROUGH)
// // ================================
// export async function uploadBase64(base64img) {
//     return base64img;
// }













































import { createCanvas } from "canvas";

// ================================
// CONFIG
// ================================
const WIDTH = 400;
const HEIGHT = 250;
const letters = "abcdefghijklmnopqrstuvwxyz";

// ================================
// DIFFICULTY MAP
// ================================
function getLevelMap(per) {
    if (per < 5) return { "Too Easy": 16,  "Easy": 18, "Medium": 20, "Tough": 22, "Too Tough": 24 };
    else if (per < 10) return { "Too Easy": 14, "Easy": 16, "Medium": 18, "Tough": 20, "Too Tough": 22 };
    else if (per < 15) return { "Too Easy": 12, "Easy": 14, "Medium": 16, "Tough": 18, "Too Tough": 20 };
    else if (per < 20) return { "Too Easy": 8, "Easy": 11, "Medium": 14, "Tough": 17, "Too Tough":20 };
    else if (per < 25) return { "Too Easy": 11, "Easy": 14, "Medium": 17, "Tough": 20, "Too Tough": 22 };
    else if (per < 30) return { "Too Easy": 14, "Easy": 17, "Medium": 20, "Tough": 23, "Too Tough": 26 };
    else if (per < 35) return { "Too Easy": 17, "Easy": 20, "Medium": 23, "Tough": 26, "Too Tough": 29 };
    else if (per < 40) return { "Too Easy": 20, "Easy": 23, "Medium": 26, "Tough": 29, "Too Tough": 32 };
    else if (per < 45) return { "Too Easy": 23, "Easy": 26, "Medium": 29, "Tough": 32, "Too Tough": 35 };
    else if (per < 50) return { "Too Easy": 26, "Easy": 29, "Medium": 32, "Tough": 35, "Too Tough": 38 };
    else if (per < 55) return { "Too Easy": 15, "Easy": 17, "Medium": 19, "Tough": 20, "Too Tough": 22 };
    else return { "Too Easy": 40, "Easy": 45, "Medium": 50, "Tough": 55, "Too Tough": 60 };
}

// ================================
// HELPERS
// ================================
function randomLetters(n) {
    let out = "";
    while (n--) {
        out += letters[Math.floor(Math.random() * letters.length)];
    }
    return out;
}

function countTarget(text, target) {
    return (text.match(new RegExp(target, "g")) || []).length;
}

/**
 * FIXED LOGIC:
 * Counts only IMMEDIATE right-side matches (l1 followed by l2)
 * Example: "ld"
 */
function countRightSide(text, l1, l2) {
    let count = 0;
    for (let i = 0; i < text.length - 1; i++) {
        if (text[i] === l1 && text[i + 1] === l2) {
            count++;
        }
    }
    return count;
}

// ================================
// TEXT GENERATION
// ================================
function makeText(target, baseRepeats) {
    let out = "";

    // guaranteed appearances
    const guaranteed = Math.max(2, Math.floor(baseRepeats / 3));
    for (let i = 0; i < guaranteed; i++) {
        out += randomLetters(Math.floor(Math.random() * 3) + 1);
        out += target;
    }

    // filler
    const filler = baseRepeats * 2;
    for (let i = 0; i < filler; i++) {
        out += Math.random() < 0.25
            ? target
            : randomLetters(Math.floor(Math.random() * 4) + 1);
    }

    return out;
}

function generateUntilFits(target, level, per) {
    const dif = getLevelMap(per);
    let baseRepeats = dif[level];

    for (let i = 0; i < 40 && baseRepeats > 2; i++) {
        const txt = makeText(target, baseRepeats);
        if (txt.length < 700) return txt;
        baseRepeats--;
    }

    return makeText(target, 5);
}

// ================================
// OPTIONS
// ================================
function generateOptions(correct) {
    const set = new Set([correct]);

    while (set.size < 4) {
        const delta = Math.floor(Math.random() * 7) - 3;
        set.add(Math.max(0, correct + delta));
    }

    return [...set].sort(() => Math.random() - 0.5);
}

// ================================
// CANVAS TEXT WRAP
// ================================
function wrapText(ctx, text, maxWidth) {
    const lines = [];
    let current = "";

    for (const ch of text) {
        const test = current + ch;
        if (ctx.measureText(test).width > maxWidth) {
            lines.push(current);
            current = ch;
        } else {
            current = test;
        }
    }
    if (current) lines.push(current);
    return lines;
}

// ================================
// MAIN
// ================================
export async function createChallenge(level, per) {
    const l1 = letters[Math.floor(Math.random() * letters.length)];
    const l2 = letters[Math.floor(Math.random() * letters.length)];
    const target = l1 + l2;

    const txt = generateUntilFits(target, level, per);

    const normalCorrect = countTarget(txt, target);
    const twistCorrect  = countRightSide(txt, l1, l2);

    const qMain  = `How many exact "${target}" exist in the box?`;
    const qTwist = `How many times '${l2}' exists right side of '${l1}'?`;

    const isTwist = (["Tough", "Too Tough"].includes(level) && per > 20);

    // safety clamp
    const correctRaw = isTwist ? twistCorrect : normalCorrect;
    const correct = Math.min(correctRaw, 99);

    const options = generateOptions(correct);
    const qst = isTwist ? qTwist : qMain;

    // -------- CANVAS ----------
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = "#000";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";

    const padding = 12;
    const maxWidth = WIDTH - padding * 2;
    const lineHeight = 18;

    const lines = wrapText(ctx, txt, maxWidth);
    let y = (HEIGHT - lines.length * lineHeight) / 2;

    for (const line of lines) {
        if (y > HEIGHT - 6) break;
        ctx.fillText(line, WIDTH / 2, y);
        y += lineHeight;
    }

    const base64img = canvas.toBuffer("image/png").toString("base64");

    return {
        txt,
        qst,
        options,
        correct,
        base64img
    };
}

// ================================
// UPLOAD (PASSTHROUGH)
// ================================
export async function uploadBase64(base64img) {
    return base64img;
}
