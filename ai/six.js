// import puppeteer from "puppeteer";
// import fetch from "node-fetch";
// import fs from "fs";

// // ================================
// // CONFIG
// // ================================
// const WIDTH = 400;
// const HEIGHT = 250;
// const letters = 'abcdefghijklmnopqrstuvwxyz';

// const LEVEL_MAP = {
//     tooEasy: 6,
//     easy: 8,
//     medium: 10,
//     tough: 14,
//     tooTough: 18
// };

// // ================================
// // LOGIC FUNCTIONS (no DOM)
// // ================================
// function randomLetters(n) {
//     let t = ''; while (n--) t += letters[Math.floor(Math.random() * letters.length)];
//     return t;
// }

// function countTarget(text, target) {
//     return (text.match(new RegExp(target, 'g')) || []).length;
// }

// function makeText(target, baseRepeats, level) {
//     const confusionFactor = { tooEasy: 0.5, easy: 0.55, medium: 0.65, tough: 0.75, tooTough: 0.9 };
//     const decoyFactor = confusionFactor[level];
//     const insertExtra = { tooEasy: 1, easy: 1, medium: 2, tough: 2, tooTough: 3 }[level];

//     let out = '';
//     for (let i = 0; i < baseRepeats; i++) {
//         out += randomLetters(Math.floor(Math.random() * 5) + 2);

//         let inserts = Math.random() < 0.7 ? insertExtra : Math.floor(Math.random() * 3) + 1;
//         for (let j = 0; j < inserts; j++) {
//             out += Math.random() < decoyFactor ? target : randomLetters(2);
//         }
//     }
//     return out;
// }

// // Try generate that fits box width/height using estimated font size
// function generateUntilFits(target, level) {
//     let baseRepeats = LEVEL_MAP[level];
//     let attempt = 0;

//     while (attempt < 40 && baseRepeats > 2) {
//         let txt = makeText(target, baseRepeats, level);
//         // crude length approximation to simulate fitting
//         if (txt.length < 700) return txt;
//         baseRepeats--;
//         attempt++;
//     }
//     return makeText(target, 5, level);
// }

// function generateOptions(correct) {
//     const options = new Set([correct]);
//     while (options.size < 4) {
//         const guess = correct + Math.floor(Math.random() * 7) - 3;
//         options.add(Math.max(0, guess));
//     }
//     return [...options];
// }

// // ================================
// // MAIN - NODE GENERATION
// // ================================
// export async function createChallenge(level = "medium") {
//     const l1 = letters[Math.floor(Math.random() * letters.length)];
//     const l2 = letters[Math.floor(Math.random() * letters.length)];
//     const target = l1 + l2;

//     const txt = generateUntilFits(target, level);
//     console.log(txt)
//     const correct = countTarget(txt, target);
//     const options = generateOptions(correct);

//     const question = `How many exact "${target}" exist in the box?`;

//     // BUILD HTML (for rendering only)
//     const html = `
// <!DOCTYPE html>
// <html>
// <body style="font-family:Arial; display:flex; flex-direction:column; justify-content:center; align-items:center; background:#eee; width:auto; height:auto; margin:auto;">
//     <div style="width:${WIDTH}px; height:${HEIGHT}px; border:4px solid black; display:flex; justify-content:center; align-items:center; text-align:center; padding:10px; background:white; font-size:18px; word-break:break-word;">
//         <p style="margin : 10px">${txt}</p>
//     </div>
// </body>
// </html>
// `;

//     // RENDER IMAGE USING PUPPETEER
//     const browser = await puppeteer.launch({ headless: "new" });
//     const page = await browser.newPage();
//     await page.setViewport({ width: 400, height: 250 });
//     await page.setContent(html, { waitUntil: "networkidle0" });

//     const imgBuffer = await page.screenshot({ type: "png" });
//     const base64img = imgBuffer.toString("base64");
//     await browser.close();

//     return { txt, question, options, correct, base64img };
// }

// // ================================
// // UPLOAD
// // ================================
// export async function uploadBase64(base64img) {
//     const blob = Buffer.from(base64img, "base64");
//     const img = base64img.toString("base64")
//     return img
// }


// import puppeteer from "puppeteer";

// // ================================
// // CONFIG
// // ================================
// const WIDTH = 400;
// const HEIGHT = 250;
// const letters = 'abcdefghijklmnopqrstuvwxyz';

// const LEVEL_MAP = {
//     tooEasy: 6,
//     easy: 8,
//     medium: 10,
//     tough: 14,
//     tooTough: 18
// };

// // ================================
// // LOGIC FUNCTIONS (no DOM)
// // ================================
// function randomLetters(n) {
//     let t = ''; while (n--) t += letters[Math.floor(Math.random() * letters.length)];
//     return t;
// }

// function countTarget(text, target) {
//     return (text.match(new RegExp(target, 'g')) || []).length;
// }

// // ⬇️ new helper for twist question
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

// function makeText(target, baseRepeats, level) {
//     const confusionFactor = { tooEasy: 0.5, easy: 0.55, medium: 0.65, tough: 0.75, tooTough: 0.9 };
//     const decoyFactor = confusionFactor[level];
//     const insertExtra = { tooEasy: 1, easy: 1, medium: 2, tough: 2, tooTough: 3 }[level];

//     let out = '';
//     for (let i = 0; i < baseRepeats; i++) {
//         out += randomLetters(Math.floor(Math.random() * 5) + 2);

//         let inserts = Math.random() < 0.7 ? insertExtra : Math.floor(Math.random() * 3) + 1;
//         for (let j = 0; j < inserts; j++) {
//             out += Math.random() < decoyFactor ? target : randomLetters(2);
//         }
//     }
//     return out;
// }

// function generateUntilFits(target, level, per) {
//     let baseRepeats = LEVEL_MAP[level];
//     let attempt = 0;

//     while (attempt < 40 && baseRepeats > 2) {
//         let txt = makeText(target, baseRepeats, level);
//         if (txt.length < 700) return txt;
//         baseRepeats--;
//         attempt++;
//     }
//     return makeText(target, 5, level);
// }

// function generateOptions(correct) {
//     const options = new Set([correct]);
//     while (options.size < 4) {
//         const guess = correct + Math.floor(Math.random() * 7) - 3;
//         options.add(Math.max(0, guess));
//     }
//     return [...options];
// }

// // ================================
// // MAIN - NODE GENERATION
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

//     const questionMain = `How many exact "${target}" exist in the box?`;
//     const questionTwist = `How many times '${l2}' exists right side of '${l1}'?`;  // added

//     const browser = await puppeteer.launch({ headless: "new" });
//     const page = await browser.newPage();
//     await page.setViewport({ width: 400, height: 250 });

//     const html = `
//     <!DOCTYPE html>
//     <html>
//     <body style="font-family:Arial; display:flex; flex-direction:column; justify-content:center; align-items:center; background:#eee; width:auto; height:auto; margin:auto;">
//         <div style="width:${WIDTH}px; height:${HEIGHT}px; border:4px solid black; display:flex; justify-content:center; align-items:center; text-align:center; padding:10px; background:white; font-size:18px; word-break:break-word;">
//             <p style="margin : 10px">${txt}</p>
//         </div>
//     </body>
//     </html>
//     `;

//     await page.setContent(html, { waitUntil: "networkidle0" });
//     const imgBuffer = await page.screenshot({ type: "png" });
//     const base64img = imgBuffer.toString("base64");
//     await browser.close();


//     let qst;

//     if(level == "Tough" || level == "Too Tough" || per > 20){
//         qst = questionTwist
//     }else{
//         qst = questionMain
//     }

//     return {
//         txt,
//         qst,      // return added question
//         options,
//         trickyOptions,      // return options for twist
//         correct,
//         trickyCorrect,      // return correct answer for twist
//         base64img
//     };
// }

// // ================================
// // UPLOAD
// // ================================
// export async function uploadBase64(base64img) {
//     const img = base64img.toString("base64");
//     return img;
// }




// // autoDifficulty.js
// import puppeteer from "puppeteer";

// // ================================
// // CONFIG
// // ================================
// const WIDTH = 400;
// const HEIGHT = 250;
// const letters = 'abcdefghijklmnopqrstuvwxyz';

// // difficulty grows 1 → 50
// function getDifficulty(per) {
//     let d = Math.min(50, Math.max(1, Math.floor(per / 2) + 1)); 
//     return d;
// }

// // confusing density based on difficulty
// function confuseFactor(d) {
//     return Math.min(0.95, 0.45 + d * 0.01);
// }

// // repeats based on difficulty and text length control
// function baseRepeatCalc(d) {
//     return Math.max(4, Math.floor(d * 0.35));
// }

// // extra inserts scaling
// function insertExtras(d) {
//     return Math.max(1, Math.floor(d / 10));
// }

// // ================================
// // LOGIC FUNCTIONS (no DOM)
// // ================================
// function randomLetters(n) {
//     let txt = '';
//     while (n--) txt += letters[Math.floor(Math.random() * letters.length)];
//     return txt;
// }

// function countTarget(text, target) {
//     return (text.match(new RegExp(target, 'g')) || []).length;
// }

// // twist: count how many times second letter appears on the right of first
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

// function makeText(target, repeats, d) {
//     const density = confuseFactor(d);
//     const extra = insertExtras(d);

//     let out = '';
//     for (let i = 0; i < repeats; i++) {
//         out += randomLetters(Math.floor(Math.random() * 5) + 2);
//         let inserts = Math.random() < 0.75 ? extra : Math.floor(Math.random() * extra) + 1;

//         for (let j = 0; j < inserts; j++) {
//             out += Math.random() < density ? target : randomLetters(2);
//         }
//     }
//     return out;
// }

// function generateUntilFits(target, per) {
//     let d = getDifficulty(per);
//     let repeats = baseRepeatCalc(d);

//     let tries = 0;
//     while (tries < 40 && repeats > 2) {
//         const txt = makeText(target, repeats, d);
//         if (txt.length < 700) return txt;
//         repeats--;
//         tries++;
//     }
//     return makeText(target, 6, d);
// }

// function generateOptions(correct) {
//     const options = new Set([correct]);
//     while (options.size < 4) {
//         const guess = correct + Math.floor(Math.random() * 7) - 3;
//         options.add(Math.max(0, guess));
//     }
//     return [...options];
// }

// // ================================
// // MAIN - NODE GENERATION
// // ================================
// export async function createChallenge(per) {
//     const difficulty = getDifficulty(per);
//     const l1 = letters[Math.floor(Math.random() * letters.length)];
//     const l2 = letters[Math.floor(Math.random() * letters.length)];
//     const target = l1 + l2;

//     const txt = generateUntilFits(target, per);

//     const correct = countTarget(txt, target);
//     const trickyCorrect = countRightSide(txt, l1, l2);

//     const options = generateOptions(correct);
//     const trickyOptions = generateOptions(trickyCorrect);

//     const questionMain = `How many exact "${target}" exist in the box?`;
//     const questionTwist = `How many times '${l2}' exists right side of '${l1}'?`;

//     // twist mode after medium difficulty
//     const qst = (difficulty >= 18 ? questionTwist : questionMain);

//     const browser = await puppeteer.launch({ headless: "new" });
//     const page = await browser.newPage();
//     await page.setViewport({ width: 400, height: 250 });

//     const html = `
//     <!DOCTYPE html>
//     <html>
//     <body style="font-family:Arial; display:flex; justify-content:center; align-items:center; background:#eee; width:auto; height:auto; margin:auto;">
//         <div style="width:${WIDTH}px; height:${HEIGHT}px; border:4px solid black; text-align:center; padding:10px; background:white; font-size:18px; word-break:break-word;">
//             <p>${txt}</p>
//         </div>
//     </body>
//     </html>
//     `;

//     await page.setContent(html, { waitUntil: "networkidle0" });
//     const imgBuffer = await page.screenshot({ type: "png" });
//     const base64img = imgBuffer.toString("base64");
//     await browser.close();

//     return {
//         per,
//         difficulty,
//         target,
//         qst,
//         txt,
//         options,
//         trickyOptions,
//         correct,
//         trickyCorrect,
//         base64img
//     };
// }

// // ================================
// // BASE64 RETURN
// // ================================
// export async function uploadBase64(base64img) {
//     return base64img.toString("base64");
// }































































// import puppeteer from "puppeteer";

// // ================================
// // CONFIG
// // ================================
// const WIDTH = 400;
// const HEIGHT = 250;
// const letters = 'abcdefghijklmnopqrstuvwxyz';

// // const LEVEL_MAP = {
// //     tooEasy: 6,
// //     easy: 8,
// //     medium: 10,
// //     tough: 14,
// //     tooTough: 18
// // };

// function getLevelMap(per) {
//     let LEVEL_MAP = {};

//     if (per < 10) {
//         LEVEL_MAP = {
//             "Too Easy": 6,
//             "Easy": 8,
//             "Medium": 10,
//             "Tough": 14,
//             "Too Tough": 18,
//         };
//     } else if (per < 20) {
//         LEVEL_MAP = {
//             "Too Easy": 10,
//             "Easy": 14,
//             "Medium": 18,
//             "Tough": 20,
//             "Too Tough": 30,
//         };
//     } else if (per < 30) {
//         LEVEL_MAP = {
//             "Too Easy": 14,
//             "Easy": 18,
//             "Medium": 22,
//             "Tough": 35,
//             "Too Tough": 40,
//         };
//     } else if (per < 40) {
//         LEVEL_MAP = {
//             "Too Easy": 18,
//             "Easy": 22,
//             "Medium": 26,
//             "Tough": 45,
//             "Too Tough": 50,
//         };
//     } else if (per < 50) {
//         LEVEL_MAP = {
//             "Too Easy": 22,
//             "Easy": 28,
//             "Medium": 34,
//             "Tough": 55,
//             "Too Tough": 60,
//         };
//     } else {
//         LEVEL_MAP = {
//             "Too Easy": 28,
//             "Easy": 34,
//             "Medium": 40,
//             "Tough": 65,
//             "Too Tough": 70,
//         };
//     }

//     return LEVEL_MAP;
// }




// // ================================
// // LOGIC FUNCTIONS (no DOM)
// // ================================
// function randomLetters(n) {
//     let t = ''; while (n--) t += letters[Math.floor(Math.random() * letters.length)];
//     return t;
// }

// function countTarget(text, target) {
//     return (text.match(new RegExp(target, 'g')) || []).length;
// }

// // ⬇️ new helper for twist question
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

// function makeText(target, baseRepeats, level) {
//     const confusionFactor = { tooEasy: 0.5, easy: 0.55, medium: 0.65, tough: 0.75, tooTough: 0.9 };
//     const decoyFactor = confusionFactor[level];
//     const insertExtra = { tooEasy: 1, easy: 1, medium: 2, tough: 2, tooTough: 3 }[level];

//     let out = '';
//     for (let i = 0; i < baseRepeats; i++) {
//         out += randomLetters(Math.floor(Math.random() * 5) + 2);

//         let inserts = Math.random() < 0.7 ? insertExtra : Math.floor(Math.random() * 3) + 1;
//         for (let j = 0; j < inserts; j++) {
//             out += Math.random() < decoyFactor ? target : randomLetters(2);
//         }
//     }
//     return out;
// }

// function generateUntilFits(target, level, per) {
//     const dif = getLevelMap(per)
//     let baseRepeats = dif[level];
//     let attempt = 0;

//     while (attempt < 40 && baseRepeats > 2) {
//         let txt = makeText(target, baseRepeats, level);
//         if (txt.length < 700) return txt;
//         baseRepeats--;
//         attempt++;
//     }
//     return makeText(target, 5, level);
// }

// function generateOptions(correct) {
//     const options = new Set([correct]);
//     while (options.size < 4) {
//         const guess = correct + Math.floor(Math.random() * 7) - 3;
//         options.add(Math.max(0, guess));
//     }
//     return [...options];
// }

// // ================================
// // MAIN - NODE GENERATION
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

//     const questionMain = `How many exact "${target}" exist in the box?`;
//     const questionTwist = `How many times '${l2}' exists right side of '${l1}'?`;  // added

//     const browser = await puppeteer.launch({ headless: "new" });
//     const page = await browser.newPage();
//     await page.setViewport({ width: 400, height: 250 });

//     const html = `
//     <!DOCTYPE html>
//     <html>
//     <body style="font-family:Arial; display:flex; flex-direction:column; justify-content:center; align-items:center; background:#eee; width:auto; height:auto; margin:auto;">
//         <div style="width:${WIDTH}px; height:${HEIGHT}px; border:4px solid black; display:flex; justify-content:center; align-items:center; text-align:center; padding:10px; background:white; font-size:18px; word-break:break-word;">
//             <p style="margin : 10px">${txt}</p>
//         </div>
//     </body>
//     </html>
//     `;

//     await page.setContent(html, { waitUntil: "networkidle0" });
//     const imgBuffer = await page.screenshot({ type: "png" });
//     const base64img = imgBuffer.toString("base64");
//     await browser.close();

//     console.log(questionMain)
//     console.log(questionTwist)

//     let qst;

//     if(level == "Tough" || level == "Too Tough" || per > 20 ){
//         qst = questionTwist
//     }else{
//         qst = questionMain
//     }

//     console.log(correct)

//     return {
//         txt,
//         qst,
//         options,
//         trickyOptions,      // return options for twist
//         correct,
//         trickyCorrect,      // return correct answer for twist
//         base64img
//     };
// }

// // ================================
// // UPLOAD
// // ================================
// export async function uploadBase64(base64img) {
//     const img = base64img.toString("base64");
//     return img;
// }









import { createCanvas, loadImage } from "canvas";

// ================================
// CONFIG
// ================================
const WIDTH = 400;
const HEIGHT = 250;
const letters = 'abcdefghijklmnopqrstuvwxyz';

function getLevelMap(per) {
    if (per < 10) return { "Too Easy": 6, "Easy": 8, "Medium": 10, "Tough": 14, "Too Tough": 18 };
    if (per < 20) return { "Too Easy": 10, "Easy": 14, "Medium": 18, "Tough": 20, "Too Tough": 30 };
    if (per < 30) return { "Too Easy": 14, "Easy": 18, "Medium": 22, "Tough": 35, "Too Tough": 40 };
    if (per < 40) return { "Too Easy": 18, "Easy": 22, "Medium": 26, "Tough": 45, "Too Tough": 50 };
    if (per < 50) return { "Too Easy": 22, "Easy": 28, "Medium": 34, "Tough": 55, "Too Tough": 60 };
    return { "Too Easy": 28, "Easy": 34, "Medium": 40, "Tough": 65, "Too Tough": 70 };
}

function randomLetters(n) {
    let t = ''; while (n--) t += letters[Math.floor(Math.random() * letters.length)];
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

function makeText(target, baseRepeats, level) {
    let guaranteedAppearances = Math.max(2, Math.floor(baseRepeats / 3));
    let out = "";

    for (let i = 0; i < guaranteedAppearances; i++) {
        out += randomLetters(Math.floor(Math.random() * 3) + 1) + target;
    }

    let fillerCount = baseRepeats * 2;
    for (let i = 0; i < fillerCount; i++) {
        out += Math.random() < 0.25 ? target : randomLetters(Math.floor(Math.random() * 4) + 1);
    }
    return out;
}

function generateUntilFits(target, level, per) {
    const dif = getLevelMap(per);
    let baseRepeats = dif[level];
    for (let attempt = 0; attempt < 40 && baseRepeats > 2; attempt++) {
        let txt = makeText(target, baseRepeats, level);
        if (txt.length < 700) return txt;
        baseRepeats--;
    }
    return makeText(target, 5, level);
}

function generateOptions(correct) {
    const options = new Set([correct]);
    while (options.size < 4) {
        const guess = correct + Math.floor(Math.random() * 7) - 3;
        options.add(Math.max(0, guess));
    }
    return [...options];
}

// ================================
// MAIN with CANVAS
// ================================
export async function createChallenge(level, per) {
    const l1 = letters[Math.floor(Math.random() * letters.length)];
    const l2 = letters[Math.floor(Math.random() * letters.length)];
    const target = l1 + l2;

    const txt = generateUntilFits(target, level, per);

    const correct = countTarget(txt, target);
    const trickyCorrect = countRightSide(txt, l1, l2);

    const options = generateOptions(correct);
    const trickyOptions = generateOptions(trickyCorrect);

    const questionMain  = `How many exact "${target}" exist in the box?`;
    const questionTwist = `How many times '${l2}' exists right side of '${l1}'?`;
    const qst = ((["Too Tough","Tough"].includes(level) && per > 20) ? questionTwist : questionMain);

    // ---- CANVAS RENDER -----
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#eee";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = "black";
    ctx.font = "16px Arial";

    const words = txt.match(/.{1,50}/g) || [txt];
    let y = 20;
    for (let line of words) {
        if (y > HEIGHT - 5) break;
        ctx.fillText(line, 10, y);
        y += 18;
    }

    const base64img = canvas.toBuffer("image/png").toString("base64");

    return {
        txt,
        qst,
        options,
        trickyOptions,
        correct,
        trickyCorrect,
        base64img,
    };
}

export async function uploadBase64(base64img) {
    return base64img.toString("base64");
}

























// import puppeteer from "puppeteer";

// // ================================
// // CONFIG
// // ================================
// const WIDTH = 400;
// const HEIGHT = 250;
// const letters = 'abcdefghijklmnopqrstuvwxyz';

// // ================================
// // DIFFICULTY BASED ON PERCENTAGE
// // ================================
// function getLevelMap(per) {
//     if (per < 10) {
//         return { tooEasy: 6, easy: 8, medium: 10, tough: 14, tooTough: 18 };
//     } else if (per < 20) {
//         return { tooEasy: 10, easy: 14, medium: 18, tough: 20, tooTough: 30 };
//     } else if (per < 30) {
//         return { tooEasy: 14, easy: 18, medium: 22, tough: 35, tooTough: 40 };
//     } else if (per < 40) {
//         return { tooEasy: 18, easy: 22, medium: 26, tough: 45, tooTough: 50 };
//     } else if (per < 50) {
//         return { tooEasy: 22, easy: 28, medium: 34, tough: 55, tooTough: 60 };
//     }
//     return { tooEasy: 28, easy: 34, medium: 40, tough: 65, tooTough: 70 };
// }

// // ================================
// // LOGIC FUNCTIONS
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

// // guaranteed target injection
// function forceInsertTargets(target, required) {
//     let txt = "";
//     for (let i = 0; i < required; i++) {
//         txt += target + randomLetters(Math.floor(Math.random() * 3) + 1);
//     }
//     return txt;
// }

// function makeText(target, baseRepeats, level, requiredTargets = 1) {
//     const confusionFactor = { tooEasy: 0.5, easy: 0.55, medium: 0.65, tough: 0.75, tooTough: 0.9 };
//     const decoyFactor = confusionFactor[level];
//     const insertExtra = { tooEasy: 1, easy: 1, medium: 2, tough: 2, tooTough: 3 }[level];

//     let out = "";
//     out += forceInsertTargets(target, requiredTargets);

//     for (let i = 0; i < baseRepeats; i++) {
//         out += randomLetters(Math.floor(Math.random() * 5) + 2);

//         let inserts = Math.random() < 0.7 ? insertExtra : Math.floor(Math.random() * 3) + 1;
//         for (let j = 0; j < inserts; j++) {
//             out += Math.random() < decoyFactor ? target : randomLetters(2);
//         }
//     }
//     return out;
// }

// function generateUntilFits(target, level, per) {
//     const dif = getLevelMap(per);
//     let baseRepeats = dif[level];
//     let attempt = 0;

//     while (attempt < 40 && baseRepeats > 2) {
//         let required = Math.max(1, Math.ceil(per / 8));
//         let txt = makeText(target, baseRepeats, level, required);
//         if (txt.length < 700) return txt;
//         baseRepeats--;
//         attempt++;
//     }

//     let fallbackRequired = Math.max(1, Math.ceil(per / 8));
//     return makeText(target, 5, level, fallbackRequired);
// }

// function generateOptions(correct) {
//     const options = new Set([correct]);
//     while (options.size < 4) {
//         const guess = correct + Math.floor(Math.random() * 7) - 3;
//         options.add(Math.max(0, guess));
//     }
//     return [...options];
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

//     const questionMain = `How many exact "${target}" exist in the box?`;
//     const questionTwist = `How many times '${l2}' exists right side of '${l1}'?`;

//     let qst = (level === "tough" || level === "tooTough" || per > 20)
//               ? questionTwist
//               : questionMain;

//     const browser = await puppeteer.launch({ headless: "new" });
//     const page = await browser.newPage();
//     await page.setViewport({ width: WIDTH, height: HEIGHT });

//     const html = `
//     <!DOCTYPE html>
//     <html>
//     <body style="font-family:Arial; display:flex; flex-direction:column; justify-content:center; align-items:center; background:#eee; width:auto; height:auto; margin:auto;">
//         <div style="width:${WIDTH}px; height:${HEIGHT}px; border:4px solid black; display:flex; justify-content:center; align-items:center; text-align:center; padding:10px; background:white; font-size:18px; word-break:break-word;">
//             <p style="margin : 10px">${txt}</p>
//         </div>
//     </body>
//     </html>
//     `;

//     await page.setContent(html, { waitUntil: "networkidle0" });
//     const imgBuffer = await page.screenshot({ type: "png" });
//     const base64img = imgBuffer.toString("base64");
//     await browser.close();

//     return {
//         txt, qst, correct, trickyCorrect,
//         options, trickyOptions, base64img
//     };
// }

// // ================================
// // BASE64 RETURN
// // ================================
// export async function uploadBase64(base64img) {
//     return base64img.toString("base64");
// }
































