// import { createCanvas } from "canvas";

// // ==========================
// // CONFIG
// // ==========================
// const WIDTH = 400;
// const HEIGHT = 250;

// // ==========================
// // DIFFICULTY BY PERFORMANCE
// // ==========================
// function def_tough(per = 80) {
//     if (per < 10) {
//         return { 
//             "Too Easy": 10,
//             "Easy": 15, 
//             "Medium": 20, 
//             "Tough": 25, 
//             "Too Tough": 30 
//         };
//     } else if (per < 20) {
//         return { 
//             "Too Easy": 15, 
//             "Easy": 20, 
//             "Medium": 25, 
//             "Tough": 30, 
//             "Too Tough": 35 
//         };
//     } else if(per < 30) {
//         return { 
//             "Too Easy": 20, 
//             "Easy": 25, 
//             "Medium": 30, 
//             "Tough": 35, 
//             "Too Tough": 40 
//         };
//     }else if(per < 40) {
//         return { 
//             "Too Easy": 25, 
//             "Easy": 30, 
//             "Medium": 35, 
//             "Tough": 40, 
//             "Too Tough": 45 
//         };
//     }else if(per < 50) {
//         return { 
//             "Too Easy": 30, 
//             "Easy": 35, 
//             "Medium": 40, 
//             "Tough": 45, 
//             "Too Tough": 50 
//         };
//     }else if(per < 60) {
//         return { 
//             "Too Easy": 35, 
//             "Easy": 40, 
//             "Medium": 45, 
//             "Tough": 50, 
//             "Too Tough": 55 
//         };
//     }else if(per < 70) {
//         return { 
//             "Too Easy": 40, 
//             "Easy": 45, 
//             "Medium": 50, 
//             "Tough": 55, 
//             "Too Tough": 60 
//         };
//     }else if(per < 80) {
//         return { 
//             "Too Easy": 45, 
//             "Easy": 50, 
//             "Medium": 55, 
//             "Tough": 60, 
//             "Too Tough": 65 
//         };
//     }else if(per < 90) {
//         return { 
//             "Too Easy": 50, 
//             "Easy": 55, 
//             "Medium": 60, 
//             "Tough": 65, 
//             "Too Tough": 70 
//         };
//     }else{
//         return { 
//             "Too Easy": 55, 
//             "Easy": 60, 
//             "Medium": 65, 
//             "Tough": 70, 
//             "Too Tough": 75 
//         };
//     }

// }

// // ==========================
// // CHAR POOLS
// // ==========================
// const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
// const NUMBERS = "0123456789";
// const POOL = ALPHABETS + NUMBERS;

// // ==========================
// // HELPERS
// // ==========================
// function rand(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function randomChar() {
//     return POOL[rand(0, POOL.length - 1)];
// }

// function generateString(len) {
//     let s = "";
//     for (let i = 0; i < len; i++) s += randomChar();
//     return s;
// }

// function shuffle(arr) {
//     for (let i = arr.length - 1; i > 0; i--) {
//         const j = rand(0, i);
//         [arr[i], arr[j]] = [arr[j], arr[i]];
//     }
//     return arr;
// }

// // ==========================
// // COUNT LOGIC
// // ==========================
// function countAlphabets(str) {
//     return [...str].filter(c => /[a-zA-Z]/.test(c)).length;
// }

// function countAlphabetsExcept(str, exceptChar) {
//     return [...str].filter(
//         c => /[a-zA-Z]/.test(c) && c.toLowerCase() !== exceptChar.toLowerCase()
//     ).length;
// }

// function countNumbers(str) {
//     return [...str].filter(c => /[0-9]/.test(c)).length;
// }

// function countLessThan(str, n) {
//     return [...str].filter(c => /[0-9]/.test(c) && Number(c) < n).length;
// }

// function countGreaterThan(str, n) {
//     return [...str].filter(c => /[0-9]/.test(c) && Number(c) > n).length;
// }

// // alphabet-order ignore (ignore a..ch)
// function countAlphabetsAfterCharOrder(str, ch) {
//     const limit = ch.toLowerCase();
//     return [...str].filter(
//         c => /[a-zA-Z]/.test(c) && c.toLowerCase() > limit
//     ).length;
// }

// // ==========================
// // QUESTION ENGINE
// // ==========================
// function generateQuestion(str) {
//     const type = rand(1, 6);

//     if (type === 1) return { q: "How many alphabets are there?", a: countAlphabets(str) };
//     if (type === 2) return { q: "How many numbers are there?", a: countNumbers(str) };

//     if (type === 3) {
//         const n = rand(1, 3);
//         return { q: `How many numbers are lesser than ${n}?`, a: countLessThan(str, n) };
//     }

//     if (type === 4) {
//         const n = rand(5, 7);
//         return { q: `How many numbers are greater than ${n}?`, a: countGreaterThan(str, n) };
//     }

//     if (type === 5) {
//         const except = ALPHABETS[rand(0, ALPHABETS.length - 1)];
//         return {
//             q: `How many alphabets are there except '${except}'?`,
//             a: countAlphabetsExcept(str, except)
//         };
//     }

//     const ch = ALPHABETS[rand(0, 25)];
//     return {
//         q: `Count only alphabets that come after '${ch}' in the alphabet. Ignore all letters from 'a' to '${ch}'. How many alphabets are there?`,
//         a: countAlphabetsAfterCharOrder(str, ch)
//     };
// }

// // ==========================
// // OPTIONS
// // ==========================
// function generateOptions(correct) {
//     const min = Math.max(0, correct - 3);
//     const max = correct + 3;

//     const pool = [];
//     for (let i = min; i <= max; i++) pool.push(i);

//     if (!pool.includes(correct)) pool.push(correct);

//     shuffle(pool);
//     return pool.slice(0, Math.min(rand(5, 6), pool.length));
// }

// // ==========================
// // TEXT WRAP DRAWER (NEW + IMPORTANT)
// // ==========================
// function drawWrappedCenteredText(ctx, text, x, y, maxWidth, lineHeight) {
//     const lines = [];
//     let current = "";

//     for (const char of text) {
//         const test = current + char;
//         if (ctx.measureText(test).width > maxWidth && current) {
//             lines.push(current);
//             current = char;
//         } else {
//             current = test;
//         }
//     }
//     if (current) lines.push(current);

//     const totalHeight = lines.length * lineHeight;
//     let startY = y - totalHeight / 2 + lineHeight / 2;

//     for (const line of lines) {
//         ctx.fillText(line, x, startY);
//         startY += lineHeight;
//     }
// }

// // ==========================
// // IMAGE GENERATOR
// // ==========================
// export function createStringCountImage(level, per) {
//     const canvas = createCanvas(WIDTH, HEIGHT);
//     const ctx = canvas.getContext("2d");

//     ctx.fillStyle = "#f4f4f4";
//     ctx.fillRect(0, 0, WIDTH, HEIGHT);

//     const lv = def_tough(per);
//     const len = lv[level];
//     const str = generateString(len);
//     const { q, a } = generateQuestion(str);
//     const options = generateOptions(a);

//     // ==========================
//     // SECRET CODE (SAFE + CENTERED)
//     // ==========================
//     ctx.fillStyle = "#000";
//     ctx.font = "bold 26px monospace";
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";

//     drawWrappedCenteredText(
//         ctx,
//         str,
//         WIDTH / 2,
//         HEIGHT / 2,
//         WIDTH - 40,   // padding
//         32            // line height
//     );

//     const base64 = canvas
//         .toDataURL("image/png")
//         .replace(/^data:image\/png;base64,/, "");

//     return {
//         meta: { width: WIDTH, height: HEIGHT, level },
//         data: {
//             string: str,
//             question: q,
//             options,
//             correct: a
//         },
//         imageBase64: base64
//     };
// }









































// // emoji_missing_mcq.js
// import { createCanvas } from "canvas";

// // ==========================
// // CONFIG
// // ==========================
// const WIDTH = 400;
// const HEIGHT = 250;

// // ==========================
// // DIFFICULTY BY PERFORMANCE
// // ==========================
// function def_tough(per = 80) {
//     if (per < 5) {
//         return { "Too Easy": 5, "Easy": 10, "Medium": 15, "Tough": 20, "Too Tough": 25 };
//     } else if (per < 10) {
//         return { "Too Easy": 10, "Easy": 15, "Medium": 20, "Tough": 25, "Too Tough": 30 };
//     } else if (per < 15) {
//         return { "Too Easy": 15, "Easy": 20, "Medium": 25, "Tough": 30, "Too Tough": 35 };
//     } else if (per < 20) {
//         return { "Too Easy": 20, "Easy": 25, "Medium": 30, "Tough": 35, "Too Tough": 40 };
//     } else if (per < 25) {
//         return { "Too Easy": 25, "Easy": 30, "Medium": 35, "Tough": 40, "Too Tough": 45 };
//     } else if (per < 30) {
//         return { "Too Easy": 30, "Easy": 35, "Medium": 40, "Tough": 45, "Too Tough": 50 };
//     } else if (per < 35) {
//         return { "Too Easy": 35, "Easy": 40, "Medium": 45, "Tough": 50, "Too Tough": 55 };
//     } else if (per < 40) {
//         return { "Too Easy": 40, "Easy": 45, "Medium": 50, "Tough": 55, "Too Tough": 60 };
//     } else if (per < 45) {
//         return { "Too Easy": 45, "Easy": 50, "Medium": 55, "Tough": 60, "Too Tough": 65 };
//     } else if (per < 50) {
//         return { "Too Easy": 50, "Easy": 55, "Medium": 60, "Tough": 65, "Too Tough": 70 };
//     }else if (per < 55) {
//         return { "Too Easy": 55, "Easy": 60, "Medium": 65, "Tough": 70, "Too Tough": 75 };
//     }else if (per < 60) {
//         return { "Too Easy": 60, "Easy": 65, "Medium": 70, "Tough": 75, "Too Tough": 80 };
//     }else if (per < 65) {
//         return { "Too Easy": 65, "Easy": 70, "Medium": 75, "Tough": 80, "Too Tough": 85 };
//     }else{
//         return { "Too Easy": 80, "Easy": 85, "Medium": 90, "Tough": 95, "Too Tough": 100 };
//     }
// }

// // ==========================
// // CHAR POOLS
// // ==========================
// const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
// const NUMBERS = "0123456789";
// const POOL = ALPHABETS + NUMBERS;

// // ==========================
// // HELPERS
// // ==========================
// function rand(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function randomChar() {
//     return POOL[rand(0, POOL.length - 1)];
// }

// function generateString(len) {
//     let s = "";
//     for (let i = 0; i < len; i++) s += randomChar();
//     return s;
// }

// function shuffle(arr) {
//     for (let i = arr.length - 1; i > 0; i--) {
//         const j = rand(0, i);
//         [arr[i], arr[j]] = [arr[j], arr[i]];
//     }
//     return arr;
// }

// // ==========================
// // NUMBER COUNT LOGIC
// // ==========================
// function countLessThan(str, n) {
//     return [...str].filter(c => /[0-9]/.test(c) && Number(c) < n).length;
// }

// function countGreaterThan(str, n) {
//     return [...str].filter(c => /[0-9]/.test(c) && Number(c) > n).length;
// }

// // ==========================
// // QUESTION ENGINE (ONLY < and >)
// // ==========================
// function generateQuestion(str) {
//     const type = rand(1, 2);

//     if (type === 1) {
//         const n = rand(1, 4);
//         return {
//             q: `How many numbers are lesser than ${n}?`,
//             a: countLessThan(str, n)
//         };
//     }

//     const n = rand(5, 8);
//     return {
//         q: `How many numbers are greater than ${n}?`,
//         a: countGreaterThan(str, n)
//     };
// }

// // ==========================
// // OPTIONS
// // ==========================
// function generateOptions(correct) {
//     const min = Math.max(0, correct - 3);
//     const max = correct + 3;

//     const pool = [];
//     for (let i = min; i <= max; i++) pool.push(i);

//     if (!pool.includes(correct)) pool.push(correct);

//     shuffle(pool);
//     return pool.slice(0, Math.min(rand(5, 6), pool.length));
// }

// // ==========================
// // TEXT WRAP DRAWER
// // ==========================
// function drawWrappedCenteredText(ctx, text, x, y, maxWidth, lineHeight) {
//     const lines = [];
//     let current = "";

//     for (const char of text) {
//         const test = current + char;
//         if (ctx.measureText(test).width > maxWidth && current) {
//             lines.push(current);
//             current = char;
//         } else {
//             current = test;
//         }
//     }
//     if (current) lines.push(current);

//     const totalHeight = lines.length * lineHeight;
//     let startY = y - totalHeight / 2 + lineHeight / 2;

//     for (const line of lines) {
//         ctx.fillText(line, x, startY);
//         startY += lineHeight;
//     }
// }

// // ==========================
// // IMAGE GENERATOR
// // ==========================
// export function createStringCountImage(level, per) {
//     const canvas = createCanvas(WIDTH, HEIGHT);
//     const ctx = canvas.getContext("2d");

//     ctx.fillStyle = "#f4f4f4";
//     ctx.fillRect(0, 0, WIDTH, HEIGHT);

//     const lv = def_tough(per);
//     const len = lv[level];
//     const str = generateString(len);
//     const { q, a } = generateQuestion(str);
//     const options = generateOptions(a);

//     ctx.fillStyle = "#000";
//     ctx.font = "bold 26px monospace";
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";

//     drawWrappedCenteredText(
//         ctx,
//         str,
//         WIDTH / 2,
//         HEIGHT / 2,
//         WIDTH - 40,
//         32
//     );

//     const base64 = canvas
//         .toDataURL("image/png")
//         .replace(/^data:image\/png;base64,/, "");

//     return {
//         meta: { width: WIDTH, height: HEIGHT, level },
//         data: {
//             string: str,
//             question: q,
//             options,
//             correct: a
//         },
//         imageBase64: base64
//     };
// }














// emoji_missing_mcq.js
import { createCanvas } from "canvas";

// ==========================
// CONFIG
// ==========================
const WIDTH = 400;
const HEIGHT = 250;

// ==========================
// DIFFICULTY BY PERFORMANCE
// ==========================
function def_tough(per) {
    if (per < 5) {
        return { "Too Easy": 2, "Easy": 3, "Medium": 4, "Tough": 5, "Too Tough": 6 };
    } else if (per < 10) {
        return { "Too Easy": 3, "Easy": 4, "Medium": 5, "Tough": 6, "Too Tough": 7 };
    } else if (per < 15) {
        return { "Too Easy": 4, "Easy": 5, "Medium": 6, "Tough": 7, "Too Tough": 8 };
    } else if (per < 20) {
        return { "Too Easy": 4, "Easy": 6, "Medium": 7, "Tough": 8, "Too Tough": 9 };
    } else if (per < 25) {
        return { "Too Easy": 5, "Easy": 7, "Medium": 8, "Tough": 9, "Too Tough": 10 };
    } else if (per < 30) {
        return { "Too Easy": 6, "Easy": 8, "Medium": 9, "Tough": 10, "Too Tough": 11 };
    } else if (per < 35) {
        return { "Too Easy": 7, "Easy": 9, "Medium": 10, "Tough": 11, "Too Tough": 12 };
    } else if (per < 40) {
        return { "Too Easy": 8, "Easy": 10, "Medium": 11, "Tough": 12, "Too Tough": 13 };
    } else if (per < 45) {
        return { "Too Easy": 9, "Easy": 11, "Medium": 12, "Tough": 13, "Too Tough": 14 };
    } else if (per < 50) {
        return { "Too Easy": 10, "Easy": 12, "Medium": 13, "Tough": 14, "Too Tough": 15 };
    } else if (per < 55) {
        return { "Too Easy": 11, "Easy": 13, "Medium": 14, "Tough": 15, "Too Tough": 16 };
    } else if (per < 60) {
        return { "Too Easy": 12, "Easy": 14, "Medium": 15, "Tough": 16, "Too Tough": 17 };
    } else if (per < 65) {
        return { "Too Easy": 13, "Easy": 15, "Medium": 16, "Tough": 17, "Too Tough": 18 };
    } else {
        return { "Too Easy": 14, "Easy": 16, "Medium": 17, "Tough": 18, "Too Tough": 19 };
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
// NUMBER COUNT (SINGLE LOGIC)
// ==========================
function countNumbers(str) {
    return [...str].filter(c => /[0-9]/.test(c)).length;
}

function countAlphabets(str) {
    return [...str].filter(c => /[a-zA-Z]/.test(c)).length;
}


// ==========================
// QUESTION ENGINE (CLEAN)
// ==========================
function generateQuestion(str) {
    const askNumbers = Math.random() < 0.5;

    if (askNumbers) {
        return {
            q: "How many numbers exist in the string?",
            a: countNumbers(str)
        };
    }

    return {
        q: "How many alphabets exist in the string?",
        a: countAlphabets(str)
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

    shuffle(pool);
    return pool.slice(0, Math.min(rand(5, 6), pool.length));
}

// ==========================
// TEXT WRAP DRAWER
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

    ctx.fillStyle = "#000";
    ctx.font = "bold 26px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    drawWrappedCenteredText(
        ctx,
        str,
        WIDTH / 2,
        HEIGHT / 2,
        WIDTH - 40,
        32
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
