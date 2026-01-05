// // import { createCanvas, loadImage } from "canvas";

// // // ================================
// // // CONFIG
// // // ================================
// // const WIDTH = 400;
// // const HEIGHT = 250;
// // const letters = 'abcdefghijklmnopqrstuvwxyz';

// // function getLevelMap(per) {
// //     if (per < 10) return { "Too Easy": 6, "Easy": 8, "Medium": 10, "Tough": 14, "Too Tough": 18 };
// //     if (per < 20) return { "Too Easy": 8, "Easy": 10, "Medium": 12, "Tough": 16, "Too Tough": 20 };
// //     if (per < 30) return { "Too Easy": 10, "Easy": 12, "Medium": 14, "Tough": 18, "Too Tough": 22 };
// //     if (per < 40) return { "Too Easy": 12, "Easy": 14, "Medium": 16, "Tough": 20, "Too Tough": 24 };
// //     if (per < 50) return { "Too Easy": 14, "Easy": 16, "Medium": 18, "Tough": 22, "Too Tough": 26 };
// //     return { "Too Easy": 15, "Easy": 34, "Medium": 18, "Tough": 19, "Too Tough": 28 };
// // }

// // function randomLetters(n) {
// //     let t = ''; while (n--) t += letters[Math.floor(Math.random() * letters.length)];
// //     return t;
// // }

// // function countTarget(text, target) {
// //     return (text.match(new RegExp(target, 'g')) || []).length;
// // }

// // function countRightSide(text, l1, l2) {
// //     let count = 0;
// //     for (let i = 0; i < text.length - 1; i++) {
// //         if (text[i] === l1) {
// //             for (let j = i + 1; j < text.length; j++) {
// //                 if (text[j] === l2) count++;
// //             }
// //         }
// //     }
// //     return count;
// // }

// // function makeText(target, baseRepeats, level) {
// //     let guaranteedAppearances = Math.max(2, Math.floor(baseRepeats / 3));
// //     let out = "";

// //     for (let i = 0; i < guaranteedAppearances; i++) {
// //         out += randomLetters(Math.floor(Math.random() * 3) + 1) + target;
// //     }

// //     let fillerCount = baseRepeats * 2;
// //     for (let i = 0; i < fillerCount; i++) {
// //         out += Math.random() < 0.25 ? target : randomLetters(Math.floor(Math.random() * 4) + 1);
// //     }
// //     return out;
// // }

// // function generateUntilFits(target, level, per) {
// //     const dif = getLevelMap(per);
// //     let baseRepeats = dif[level];
// //     for (let attempt = 0; attempt < 40 && baseRepeats > 2; attempt++) {
// //         let txt = makeText(target, baseRepeats, level);
// //         if (txt.length < 700) return txt;
// //         baseRepeats--;
// //     }
// //     return makeText(target, 5, level);
// // }

// // function generateOptions(correct) {
// //     const options = new Set([correct]);
// //     while (options.size < 4) {
// //         const guess = correct + Math.floor(Math.random() * 7) - 3;
// //         options.add(Math.max(0, guess));
// //     }
// //     return [...options];
// // }

// // // ================================
// // // MAIN with CANVAS
// // // ================================
// // export async function createChallenge(level, per) {
// //     const l1 = letters[Math.floor(Math.random() * letters.length)];
// //     const l2 = letters[Math.floor(Math.random() * letters.length)];
// //     const target = l1 + l2;

// //     const txt = generateUntilFits(target, level, per);

// //     const correct = countTarget(txt, target);
// //     const trickyCorrect = countRightSide(txt, l1, l2);

// //     const options = generateOptions(correct);
// //     const trickyOptions = generateOptions(trickyCorrect);

// //     const questionMain  = `How many exact "${target}" exist in the box?`;
// //     const questionTwist = `How many times '${l2}' exists right side of '${l1}'?`;
// //     const qst = ((["Too Tough","Tough"].includes(level) && per > 20) ? questionTwist : questionMain);

// //     // ---- CANVAS RENDER -----
// //     const canvas = createCanvas(WIDTH, HEIGHT);
// //     const ctx = canvas.getContext("2d");

// //     ctx.fillStyle = "#eee";
// //     ctx.fillRect(0, 0, WIDTH, HEIGHT);

// //     ctx.fillStyle = "white";
// //     ctx.fillRect(0, 0, WIDTH, HEIGHT);

// //     ctx.fillStyle = "black";
// //     ctx.font = "16px Arial";

// //     const words = txt.match(/.{1,50}/g) || [txt];
// //     let y = 20;
// //     for (let line of words) {
// //         if (y > HEIGHT - 5) break;
// //         ctx.fillText(line, 10, y);
// //         y += 18;
// //     }

// //     const base64img = canvas.toBuffer("image/png").toString("base64");

// //     return {
// //         txt,
// //         qst,
// //         options,
// //         trickyOptions,
// //         correct,
// //         trickyCorrect,
// //         base64img,
// //     };
// // }

// // export async function uploadBase64(base64img) {
// //     return base64img.toString("base64");
// // }



















// import { createCanvas } from "canvas";

// // ================================
// // CONFIG
// // ================================
// const WIDTH = 400;
// const HEIGHT = 250;
// const letters = 'abcdefghijklmnopqrstuvwxyz';

// // ================================
// // DIFFICULTY MAP
// // ================================
// function getLevelMap(per) {
//     if (per < 10) return { "Too Easy": 6, "Easy": 8, "Medium": 10, "Tough": 14, "Too Tough": 18 };
//     if (per < 20) return { "Too Easy": 8, "Easy": 10, "Medium": 12, "Tough": 16, "Too Tough": 20 };
//     if (per < 30) return { "Too Easy": 10, "Easy": 12, "Medium": 14, "Tough": 18, "Too Tough": 22 };
//     if (per < 40) return { "Too Easy": 12, "Easy": 14, "Medium": 16, "Tough": 20, "Too Tough": 24 };
//     if (per < 50) return { "Too Easy": 14, "Easy": 16, "Medium": 18, "Tough": 22, "Too Tough": 26 };
//     return { "Too Easy": 15, "Easy": 34, "Medium": 18, "Tough": 19, "Too Tough": 28 };
// }

// // ================================
// // HELPERS
// // ================================
// function randomLetters(n) {
//     let t = '';
//     while (n--) t += letters[Math.floor(Math.random() * letters.length)];
//     return t;
// }

// function countTarget(text, target) {
//     return (text.match(new RegExp(target, 'g')) || []).length;
// }

// function countRightSide(text, l1, l2) {
//     let count = 0;
//     for (let i = 0; i < text.length - 1; i++) {
//         if (text[i] === l1) {
//             for (let j = i + 1; j < text.length; j++) {
//                 if (text[j] === l2) count++;
//             }
//         }
//     }
//     return count;
// }

// // ================================
// // TEXT GENERATION
// // ================================
// function makeText(target, baseRepeats) {
//     let guaranteed = Math.max(2, Math.floor(baseRepeats / 3));
//     let out = "";

//     for (let i = 0; i < guaranteed; i++) {
//         out += randomLetters(Math.floor(Math.random() * 3) + 1) + target;
//     }

//     let filler = baseRepeats * 2;
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

// function generateOptions(correct) {
//     const set = new Set([correct]);
//     while (set.size < 4) {
//         const g = correct + Math.floor(Math.random() * 7) - 3;
//         set.add(Math.max(0, g));
//     }
//     return [...set];
// }

// // ================================
// // CANVAS TEXT WRAP (PIXEL-BASED)
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

//     const correct = countTarget(txt, target);
//     const trickyCorrect = countRightSide(txt, l1, l2);

//     const options = generateOptions(correct);
//     const trickyOptions = generateOptions(trickyCorrect);

//     const qMain  = `How many exact "${target}" exist in the box?`;
//     const qTwist = `How many times '${l2}' exists right side of '${l1}'?`;
//     const qst = (["Too Tough", "Tough"].includes(level) && per > 20)
//         ? qTwist
//         : qMain;

//     // -------- CANVAS ----------
//     const canvas = createCanvas(WIDTH, HEIGHT);
//     const ctx = canvas.getContext("2d");

//     ctx.fillStyle = "#fff";
//     ctx.fillRect(0, 0, WIDTH, HEIGHT);

//     ctx.fillStyle = "#000";
//     ctx.font = "16px Arial";

//     const padding = 12;
//     const maxWidth = WIDTH - padding * 2;
//     const lineHeight = 18;

//     const lines = wrapText(ctx, txt, maxWidth);

//     let y = 22;
//     for (const line of lines) {
//         if (y > HEIGHT - 6) break;

//         const w = ctx.measureText(line).width;
//         const x = (WIDTH - w) / 2; // 🎯 PERFECT CENTER

//         ctx.fillText(line, x, y);
//         y += lineHeight;
//     }

//     const base64img = canvas.toBuffer("image/png").toString("base64");

//     return {
//         txt,
//         qst,
//         options,
//         trickyOptions,
//         correct,
//         trickyCorrect,
//         base64img
//     };
// }

// export async function uploadBase64(base64img) {
//     return base64img.toString("base64");
// }































import { createCanvas } from "canvas";

// ================================
// CONFIG
// ================================
const WIDTH = 400;
const HEIGHT = 250;
const letters = 'abcdefghijklmnopqrstuvwxyz';

// ================================
// DIFFICULTY MAP
// ================================
function getLevelMap(per) {
    if (per < 10) return { "Too Easy": 6, "Easy": 8, "Medium": 10, "Tough": 14, "Too Tough": 18 };
    if (per < 20) return { "Too Easy": 8, "Easy": 10, "Medium": 12, "Tough": 16, "Too Tough": 20 };
    if (per < 30) return { "Too Easy": 10, "Easy": 12, "Medium": 14, "Tough": 18, "Too Tough": 22 };
    if (per < 40) return { "Too Easy": 12, "Easy": 14, "Medium": 16, "Tough": 20, "Too Tough": 24 };
    if (per < 50) return { "Too Easy": 14, "Easy": 16, "Medium": 18, "Tough": 22, "Too Tough": 26 };
    return { "Too Easy": 15, "Easy": 34, "Medium": 18, "Tough": 19, "Too Tough": 28 };
}

// ================================
// HELPERS
// ================================
function randomLetters(n) {
    let t = '';
    while (n--) t += letters[Math.floor(Math.random() * letters.length)];
    return t;
}

function countTarget(text, target) {
    return (text.match(new RegExp(target, 'g')) || []).length;
}

function countRightSide(text, l1, l2) {
    let count = 0;
    for (let i = 0; i < text.length - 1; i++) {
        if (text[i] === l1) {
            for (let j = i + 1; j < text.length; j++) {
                if (text[j] === l2) count++;
            }
        }
    }
    return count;
}

// ================================
// TEXT GENERATION
// ================================
function makeText(target, baseRepeats) {
    let guaranteed = Math.max(2, Math.floor(baseRepeats / 3));
    let out = "";

    for (let i = 0; i < guaranteed; i++) {
        out += randomLetters(Math.floor(Math.random() * 3) + 1) + target;
    }

    let filler = baseRepeats * 2;
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
        const g = correct + Math.floor(Math.random() * 7) - 3;
        set.add(Math.max(0, g));
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
    const twistCorrect = countRightSide(txt, l1, l2);

    const qMain  = `How many exact "${target}" exist in the box?`;
    const qTwist = `How many times '${l2}' exists right side of '${l1}'?`;

    const isTwist = (["Too Tough", "Tough"].includes(level) && per > 20);

    const qst = isTwist ? qTwist : qMain;
    const correct = isTwist ? twistCorrect : normalCorrect;
    const options = generateOptions(correct);

    // -------- CANVAS ----------
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = "#000";
    ctx.font = "16px Arial";

    const padding = 12;
    const maxWidth = WIDTH - padding * 2;
    const lineHeight = 18;

    const lines = wrapText(ctx, txt, maxWidth);

    let y = 22;
    for (const line of lines) {
        if (y > HEIGHT - 6) break;
        const w = ctx.measureText(line).width;
        const x = (WIDTH - w) / 2;
        ctx.fillText(line, x, y);
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

export async function uploadBase64(base64img) {
    return base64img.toString("base64");
}
