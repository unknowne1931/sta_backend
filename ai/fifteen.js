//Before per < 5
// import { createCanvas } from "canvas";

// // ==========================
// // CONFIG
// // ==========================
// const WIDTH = 430;
// const HEIGHT = 270;

// const GAP_X = 19;
// const GAP_Y = 18;
// const RADIUS = 8;

// // ==========================
// // DIFFICULTY RESOLVER (per-based)
// // ==========================
// function getDifficultyMap(per) {
//     if (per < 10) {
//         return {
//             "Too Easy":  { rows: 10, COLS: 3,  visibleRatio: 0.80 },
//             "Easy":      { rows: 10, COLS: 4,  visibleRatio: 0.25 },
//             "Medium":    { rows: 10, COLS: 5,  visibleRatio: 0.10 },
//             "Tough":     { rows: 10, COLS: 6, visibleRatio: 0.05 },
//             "Too Tough": { rows: 10, COLS: 7, visibleRatio: 0.025 }
//         };
//     }

//     else if (per < 20) {
//         return {
//             "Too Easy":  { rows: 10, COLS: 5,  visibleRatio: 0.70 },
//             "Easy":      { rows: 10, COLS: 6,  visibleRatio: 0.20 },
//             "Medium":    { rows: 10, COLS: 7,  visibleRatio: 0.08 },
//             "Tough":     { rows: 10, COLS: 8, visibleRatio: 0.04 },
//             "Too Tough": { rows: 10, COLS: 9, visibleRatio: 0.02 }
//         };
//     }else if (per < 30) {
//         return {
//             "Too Easy":  { rows: 12, COLS: 6,  visibleRatio: 0.70 },
//             "Easy":      { rows: 12, COLS: 7,  visibleRatio: 0.20 },
//             "Medium":    { rows: 12, COLS: 8,  visibleRatio: 0.08 },
//             "Tough":     { rows: 14, COLS: 9, visibleRatio: 0.04 },
//             "Too Tough": { rows: 14, COLS: 9, visibleRatio: 0.02 }
//         };
//     }

//     else if (per < 50) {
//         return {
//             "Too Easy":  { rows: 14, COLS: 6,  visibleRatio: 0.60 },
//             "Easy":      { rows: 14, COLS: 8,  visibleRatio: 0.15 },
//             "Medium":    { rows: 14, COLS: 10, visibleRatio: 0.06 },
//             "Tough":     { rows: 14, COLS: 12, visibleRatio: 0.03 },
//             "Too Tough": { rows: 14, COLS: 14, visibleRatio: 0.015 }
//         };
//     }else{
//         return {
//             "Too Easy":  { rows: 14, COLS: 8,  visibleRatio: 0.50 },
//             "Easy":      { rows: 14, COLS: 10, visibleRatio: 0.12 },
//             "Medium":    { rows: 14, COLS: 12, visibleRatio: 0.05 },
//             "Tough":     { rows: 14, COLS: 14, visibleRatio: 0.02 },
//             "Too Tough": { rows: 14, COLS: 16, visibleRatio: 0.01 }
//         };
//     }

    
// }

// // ==========================
// // HELPERS
// // ==========================
// function rand(max) {
//     return Math.floor(Math.random() * max);
// }

// function clone(arr) {
//     return JSON.parse(JSON.stringify(arr));
// }

// // ==========================
// // GENERATE ANSWER DIGITS
// // ==========================
// function generateAnswerDigits(rows, COLS) {
//     const digits = [];
//     for (let i = 0; i < COLS; i++) {
//         digits.push(rand(rows));
//     }
//     return digits;
// }

// // ==========================
// // GENERATE OPTIONS
// // ==========================
// function generateOptions(correctDigits, COLS) {
//     const correctValue = correctDigits.join("");
//     const optionsSet = new Set();
//     const options = [];

//     const correctIndex = rand(7);
//     const centerIdx = Math.floor(COLS / 2);

//     for (let i = 0; i < 7; i++) {
//         if (i === correctIndex) {
//             options.push(correctValue);
//             optionsSet.add(correctValue);
//             continue;
//         }

//         let fakeValue;
//         do {
//             const fake = clone(correctDigits);
//             let newDigit;
//             do {
//                 newDigit = rand(10);
//             } while (newDigit === fake[centerIdx]);

//             fake[centerIdx] = newDigit;
//             fakeValue = fake.join("");
//         } while (optionsSet.has(fakeValue));

//         options.push(fakeValue);
//         optionsSet.add(fakeValue);
//     }

//     return { options, correctIndex };
// }

// // ==========================
// // DRAW IMAGE
// // ==========================
// function drawOMRImage(answerDigits, config) {
//     const { rows, COLS, visibleRatio } = config;

//     const canvas = createCanvas(WIDTH, HEIGHT);
//     const ctx = canvas.getContext("2d");

//     ctx.fillStyle = "#fff";
//     ctx.fillRect(0, 0, WIDTH, HEIGHT);

//     ctx.strokeStyle = "#000";
//     ctx.fillStyle = "#000";
//     ctx.font = "12px monospace";
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";

//     const gridWidth = (COLS - 1) * GAP_X;
//     const gridHeight = (rows - 1) * GAP_Y;

//     const START_X = (WIDTH - gridWidth) / 2;
//     const START_Y = (HEIGHT - gridHeight) / 2;

//     for (let col = 0; col < COLS; col++) {
//         const visibleCount = Math.max(1, Math.floor(rows * visibleRatio));
//         const visibleRows = new Set();

//         while (visibleRows.size < visibleCount) {
//             visibleRows.add(rand(rows));
//         }

//         for (let row = 0; row < rows; row++) {
//             const x = START_X + col * GAP_X;
//             const y = START_Y + row * GAP_Y;

//             ctx.beginPath();
//             ctx.arc(x, y, RADIUS, 0, Math.PI * 2);
//             ctx.stroke();

//             if (row === answerDigits[col]) {
//                 ctx.beginPath();
//                 ctx.arc(x, y, RADIUS - 2, 0, Math.PI * 2);
//                 ctx.fill();
//                 continue;
//             }

//             if (visibleRows.has(row)) {
//                 ctx.fillText(row.toString(), x, y);
//             }
//         }
//     }

//     return canvas.toBuffer("image/png");
// }

// // ==========================
// // MAIN EXPORT
// // ==========================
// export function generateOMRQuestion15(difficulty, per = 0) {
//     const DIFFICULTY_MAP = getDifficultyMap(per);
//     const config = DIFFICULTY_MAP[difficulty] || DIFFICULTY_MAP["Medium"];

//     const answerDigits = generateAnswerDigits(config.rows, config.COLS);
//     const { options, correctIndex } = generateOptions(answerDigits, config.COLS);
//     const buffer = drawOMRImage(answerDigits, config);

//     return {
//         difficulty,
//         question: "Choose correct OMR number",
//         options,
//         correctAnswer: String.fromCharCode(65 + correctIndex),
//         answerValue: options[correctIndex],
//         base64Image: buffer.toString("base64"),
//         meta: {
//             digits: answerDigits,
//             columns: config.COLS,
//             rows: config.rows,
//             per
//         }
//     };
// }






































import { createCanvas } from "canvas";

// ==========================
// CONFIG
// ==========================
const WIDTH = 430;
const HEIGHT = 270;

const GAP_X = 19;
const GAP_Y = 18;
const RADIUS = 8;

// ==========================
// DIFFICULTY RESOLVER (per-based)
// ==========================
function getDifficultyMap(per) {
    if (per < 5) {
        return {
            "Too Easy":  { rows: 10, COLS: 3,  visibleRatio: 0.80 },
            "Easy":      { rows: 10, COLS: 4,  visibleRatio: 0.25 },
            "Medium":    { rows: 10, COLS: 5,  visibleRatio: 0.10 },
            "Tough":     { rows: 10, COLS: 6, visibleRatio: 0.05 },
            "Too Tough": { rows: 10, COLS: 7, visibleRatio: 0.025 }
        };
    }

    else if (per < 10) {
        return {
            "Too Easy":  { rows: 10, COLS: 4,  visibleRatio: 0.70 },
            "Easy":      { rows: 10, COLS: 5,  visibleRatio: 0.20 },
            "Medium":    { rows: 10, COLS: 6,  visibleRatio: 0.08 },
            "Tough":     { rows: 10, COLS: 7, visibleRatio: 0.04 },
            "Too Tough": { rows: 10, COLS: 8, visibleRatio: 0.02 }
        };
    }else if (per < 15) {
        return {
            "Too Easy":  { rows: 10, COLS: 5,  visibleRatio: 0.70 },
            "Easy":      { rows: 10, COLS: 6,  visibleRatio: 0.20 },
            "Medium":    { rows: 10, COLS: 7,  visibleRatio: 0.08 },
            "Tough":     { rows: 10, COLS: 8, visibleRatio: 0.04 },
            "Too Tough": { rows: 10, COLS: 9, visibleRatio: 0.02 }
        };
    }else if (per < 20) {
        return {
            "Too Easy":  { rows: 10, COLS: 6,  visibleRatio: 0.70 },
            "Easy":      { rows: 10, COLS: 7,  visibleRatio: 0.20 },
            "Medium":    { rows: 10, COLS: 8,  visibleRatio: 0.08 },
            "Tough":     { rows: 10, COLS: 9, visibleRatio: 0.04 },
            "Too Tough": { rows: 10, COLS: 10, visibleRatio: 0.02 }
        };
    }else if (per < 25) {
        return {
            "Too Easy":  { rows: 11, COLS: 5,  visibleRatio: 0.70 },
            "Easy":      { rows: 11, COLS: 6,  visibleRatio: 0.20 },
            "Medium":    { rows: 11, COLS: 7,  visibleRatio: 0.08 },
            "Tough":     { rows: 11, COLS: 8, visibleRatio: 0.04 },
            "Too Tough": { rows: 11, COLS: 9, visibleRatio: 0.02 }
        };
    }else if (per < 30) {
        return {
            "Too Easy":  { rows: 11, COLS: 6,  visibleRatio: 0.70 },
            "Easy":      { rows: 11, COLS: 7,  visibleRatio: 0.20 },
            "Medium":    { rows: 11, COLS: 8,  visibleRatio: 0.08 },
            "Tough":     { rows: 11, COLS: 9, visibleRatio: 0.04 },
            "Too Tough": { rows: 11, COLS: 10, visibleRatio: 0.02 }
        };
    }else if (per < 35) {
        return {
            "Too Easy":  { rows: 11, COLS: 7,  visibleRatio: 0.70 },
            "Easy":      { rows: 11, COLS: 8,  visibleRatio: 0.20 },
            "Medium":    { rows: 11, COLS: 9,  visibleRatio: 0.08 },
            "Tough":     { rows: 11, COLS: 10, visibleRatio: 0.04 },
            "Too Tough": { rows: 11, COLS: 11, visibleRatio: 0.02 }
        };
    }else if (per < 40) {
        return {
            "Too Easy":  { rows: 11, COLS: 8,  visibleRatio: 0.70 },
            "Easy":      { rows: 11, COLS: 9,  visibleRatio: 0.20 },
            "Medium":    { rows: 11, COLS: 10,  visibleRatio: 0.08 },
            "Tough":     { rows: 11, COLS: 11, visibleRatio: 0.04 },
            "Too Tough": { rows: 11, COLS: 12, visibleRatio: 0.02 }
        };
    }else if (per < 45) {
        return {
            "Too Easy":  { rows: 12, COLS: 8,  visibleRatio: 0.70 },
            "Easy":      { rows: 12, COLS: 9,  visibleRatio: 0.20 },
            "Medium":    { rows: 12, COLS: 10,  visibleRatio: 0.08 },
            "Tough":     { rows: 12, COLS: 11, visibleRatio: 0.04 },
            "Too Tough": { rows: 12, COLS: 12, visibleRatio: 0.02 }
        };
    }else if (per < 50) {
        return {
            "Too Easy":  { rows: 12, COLS: 9,  visibleRatio: 0.70 },
            "Easy":      { rows: 12, COLS: 10,  visibleRatio: 0.20 },
            "Medium":    { rows: 12, COLS: 11,  visibleRatio: 0.08 },
            "Tough":     { rows: 12, COLS: 12, visibleRatio: 0.04 },
            "Too Tough": { rows: 12, COLS: 13, visibleRatio: 0.02 }
        };
    }else if (per < 55) {
        return {
            "Too Easy":  { rows: 13, COLS: 9,  visibleRatio: 0.70 },
            "Easy":      { rows: 13, COLS: 10,  visibleRatio: 0.20 },
            "Medium":    { rows: 13, COLS: 11,  visibleRatio: 0.08 },
            "Tough":     { rows: 13, COLS: 12, visibleRatio: 0.04 },
            "Too Tough": { rows: 13, COLS: 13, visibleRatio: 0.02 }
        };
    }else if (per < 60) {
        return {
            "Too Easy":  { rows: 14, COLS: 9,  visibleRatio: 0.70 },
            "Easy":      { rows: 14, COLS: 10,  visibleRatio: 0.20 },
            "Medium":    { rows: 14, COLS: 11,  visibleRatio: 0.08 },
            "Tough":     { rows: 14, COLS: 12, visibleRatio: 0.04 },
            "Too Tough": { rows: 14, COLS: 13, visibleRatio: 0.02 }
        };
    }else{
        return {
            "Too Easy":  { rows: 14, COLS: 10,  visibleRatio: 0.70 },
            "Easy":      { rows: 14, COLS: 11,  visibleRatio: 0.20 },
            "Medium":    { rows: 14, COLS: 12,  visibleRatio: 0.08 },
            "Tough":     { rows: 14, COLS: 13, visibleRatio: 0.04 },
            "Too Tough": { rows: 14, COLS: 14, visibleRatio: 0.02 }
        };
    }

    
}

// ==========================
// HELPERS
// ==========================
function rand(max) {
    return Math.floor(Math.random() * max);
}

function clone(arr) {
    return JSON.parse(JSON.stringify(arr));
}

// ==========================
// GENERATE ANSWER DIGITS
// ==========================
function generateAnswerDigits(rows, COLS) {
    const digits = [];
    for (let i = 0; i < COLS; i++) {
        digits.push(rand(rows));
    }
    return digits;
}

// ==========================
// GENERATE OPTIONS
// ==========================
function generateOptions(correctDigits, COLS) {
    const correctValue = correctDigits.join("");
    const optionsSet = new Set();
    const options = [];

    const correctIndex = rand(7);
    const centerIdx = Math.floor(COLS / 2);

    for (let i = 0; i < 7; i++) {
        if (i === correctIndex) {
            options.push(correctValue);
            optionsSet.add(correctValue);
            continue;
        }

        let fakeValue;
        do {
            const fake = clone(correctDigits);
            let newDigit;
            do {
                newDigit = rand(10);
            } while (newDigit === fake[centerIdx]);

            fake[centerIdx] = newDigit;
            fakeValue = fake.join("");
        } while (optionsSet.has(fakeValue));

        options.push(fakeValue);
        optionsSet.add(fakeValue);
    }

    return { options, correctIndex };
}

// ==========================
// DRAW IMAGE
// ==========================
function drawOMRImage(answerDigits, config) {
    const { rows, COLS, visibleRatio } = config;

    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.strokeStyle = "#000";
    ctx.fillStyle = "#000";
    ctx.font = "12px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const gridWidth = (COLS - 1) * GAP_X;
    const gridHeight = (rows - 1) * GAP_Y;

    const START_X = (WIDTH - gridWidth) / 2;
    const START_Y = (HEIGHT - gridHeight) / 2;

    for (let col = 0; col < COLS; col++) {
        const visibleCount = Math.max(1, Math.floor(rows * visibleRatio));
        const visibleRows = new Set();

        while (visibleRows.size < visibleCount) {
            visibleRows.add(rand(rows));
        }

        for (let row = 0; row < rows; row++) {
            const x = START_X + col * GAP_X;
            const y = START_Y + row * GAP_Y;

            ctx.beginPath();
            ctx.arc(x, y, RADIUS, 0, Math.PI * 2);
            ctx.stroke();

            if (row === answerDigits[col]) {
                ctx.beginPath();
                ctx.arc(x, y, RADIUS - 2, 0, Math.PI * 2);
                ctx.fill();
                continue;
            }

            if (visibleRows.has(row)) {
                ctx.fillText(row.toString(), x, y);
            }
        }
    }

    return canvas.toBuffer("image/png");
}

// ==========================
// MAIN EXPORT
// ==========================
export function generateOMRQuestion15(difficulty, per = 0) {
    const DIFFICULTY_MAP = getDifficultyMap(per);
    const config = DIFFICULTY_MAP[difficulty] || DIFFICULTY_MAP["Medium"];

    const answerDigits = generateAnswerDigits(config.rows, config.COLS);
    const { options, correctIndex } = generateOptions(answerDigits, config.COLS);
    const buffer = drawOMRImage(answerDigits, config);

    return {
        difficulty,
        question: "Choose correct OMR number",
        options,
        correctAnswer: String.fromCharCode(65 + correctIndex),
        answerValue: options[correctIndex],
        base64Image: buffer.toString("base64"),
        meta: {
            digits: answerDigits,
            columns: config.COLS,
            rows: config.rows,
            per
        }
    };
}
