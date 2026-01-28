// import { createCanvas } from "canvas";

// // ===========================
// // CONFIG
// // ===========================
// const WIDTH = 420;
// const HEIGHT = 270;

// // ===========================
// // DIFFICULTY FUNCTION
// // ===========================
// function diff_level(per) {
//     let DIFFICULTIES;

//     if(per < 10){
//         DIFFICULTIES = {
//             "Too Easy": { count: 10, range: [1, 5] },
//             "Easy": { count: 15, range: [0, 9] },
//             "Medium": { count: 20, range: [0, 12] },
//             "Tough": { count: 25, range: [0, 15] },
//             "Too Tough": { count: 30, range: [0, 20] }
//         };
//     }else if(per < 20){
//         DIFFICULTIES = {
//             "Too Easy": { count: 20, range: [5, 10] },
//             "Easy": { count: 25, range: [0, 15] },
//             "Medium": { count: 30, range: [0, 12] },
//             "Tough": { count: 35, range: [0, 15] },
//             "Too Tough": { count: 40, range: [0, 20] }
//         };
//     }else if(per < 30){
//         DIFFICULTIES = {
//             "Too Easy": { count: 25, range: [5, 10] },
//             "Easy": { count: 30, range: [0, 15] },
//             "Medium": { count: 35, range: [0, 12] },
//             "Tough": { count: 40, range: [0, 15] },
//             "Too Tough": { count: 45, range: [0, 20] }
//         };
//     }else if(per < 40){
//         DIFFICULTIES = {
//             "Too Easy": { count: 30, range: [5, 10] },
//             "Easy": { count: 35, range: [0, 15] },
//             "Medium": { count: 40, range: [0, 12] },
//             "Tough": { count: 45, range: [0, 15] },
//             "Too Tough": { count: 50, range: [0, 20] }
//         };
//     }else if(per < 50){
//         DIFFICULTIES = {
//             "Too Easy": { count: 35, range: [5, 10] },
//             "Easy": { count: 40, range: [0, 15] },
//             "Medium": { count: 45, range: [0, 12] },
//             "Tough": { count: 50, range: [0, 15] },
//             "Too Tough": { count: 55, range: [0, 20] }
//         };
//     }else if(per < 60){
//         DIFFICULTIES = {
//             "Too Easy": { count: 40, range: [5, 10] },
//             "Easy": { count: 45, range: [0, 15] },
//             "Medium": { count: 50, range: [0, 12] },
//             "Tough": { count: 55, range: [0, 15] },
//             "Too Tough": { count: 60, range: [0, 20] }
//         };
//     }else if(per < 70){
//         DIFFICULTIES = {
//             "Too Easy": { count: 45, range: [5, 10] },
//             "Easy": { count: 50, range: [0, 15] },
//             "Medium": { count: 55, range: [0, 12] },
//             "Tough": { count: 60, range: [0, 15] },
//             "Too Tough": { count: 65, range: [0, 20] }
//         };
//     }else if(per < 80){
//         DIFFICULTIES = {
//             "Too Easy": { count: 50, range: [5, 10] },
//             "Easy": { count: 55, range: [0, 15] },
//             "Medium": { count: 60, range: [0, 12] },
//             "Tough": { count: 65, range: [0, 15] },
//             "Too Tough": { count: 70, range: [0, 20] }
//         };
//     }else if(per < 90){
//         DIFFICULTIES = {
//             "Too Easy": { count: 55, range: [5, 10] },
//             "Easy": { count: 60, range: [0, 15] },
//             "Medium": { count: 65, range: [0, 12] },
//             "Tough": { count: 70, range: [0, 15] },
//             "Too Tough": { count: 75, range: [0, 20] }
//         };
//     }else{
//         DIFFICULTIES = {
//             "Too Easy": { count: 60, range: [5, 10] },
//             "Easy": { count: 65, range: [0, 15] },
//             "Medium": { count: 70, range: [0, 12] },
//             "Tough": { count: 75, range: [0, 15] },
//             "Too Tough": { count: 80, range: [0, 20] }
//         };
//     }

//     // if (per < 10) {
//     //     DIFFICULTIES = {
//     //         "Too Easy": { count: 10, range: [1, 5] },
//     //         "Easy": { count: 15, range: [0, 9] },
//     //         "Medium": { count: 20, range: [0, 12] },
//     //         "Tough": { count: 25, range: [0, 15] },
//     //         "Too Tough": { count: 30, range: [0, 20] }
//     //     };
//     // } else if (per < 20) {
//     //     DIFFICULTIES = {
//     //         "Too Easy": { count: 15, range: [0, 6] },
//     //         "Easy": { count: 20, range: [0, 10] },
//     //         "Medium": { count: 25, range: [0, 13] },
//     //         "Tough": { count: 30, range: [0, 16] },
//     //         "Too Tough": { count: 35, range: [0, 22] }
//     //     };
//     // } else if (per < 30) {
//     //     DIFFICULTIES = {
//     //         "Too Easy": { count: 20, range: [0, 7] },
//     //         "Easy": { count: 25, range: [0, 11] },
//     //         "Medium": { count: 30, range: [0, 14] },
//     //         "Tough": { count: 35, range: [0, 17] },
//     //         "Too Tough": { count: 40, range: [0, 24] }
//     //     };
//     // } else if (per < 40) {
//     //     DIFFICULTIES = {
//     //         "Too Easy": { count: 25, range: [0, 8] },
//     //         "Easy": { count: 30, range: [0, 12] },
//     //         "Medium": { count: 35, range: [0, 15] },
//     //         "Tough": { count: 40, range: [0, 18] },
//     //         "Too Tough": { count: 45, range: [0, 26] }
//     //     };
//     // } else {
//     //     DIFFICULTIES = {
//     //         "Too Easy": { count: 30, range: [0, 9] },
//     //         "Easy": { count: 35, range: [0, 13] },
//     //         "Medium": { count: 40, range: [0, 16] },
//     //         "Tough": { count: 45, range: [0, 20] },
//     //         "Too Tough": { count: 50, range: [0, 30] }
//     //     };
//     // }

//     return DIFFICULTIES;
// }

// const QUESTION_TYPES = ["less", "greater", "between"];

// // ===========================
// // HELPERS
// // ===========================
// const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

// function generateNumbers(count, min, max) {
//     const colors = ["#e63946","#457b9d","#2a9d8f","#e9c46a","#f4a261","#264653","#ff006e","#8338ec","#3a86ff","#d00000"];
//     const numbers = [];
//     const padding = 18;

//     for (let i = 0; i < count; i++) {
//         const num = rand(min, max);
//         const color = colors[rand(0, colors.length - 1)];
//         let x, y, tries = 0;

//         do {
//             x = rand(5, WIDTH - padding);
//             y = rand(20, HEIGHT - padding);
//             tries++;
//         } while (numbers.some(n => Math.abs(n.x - x) < padding && Math.abs(n.y - y) < padding) && tries < 100);

//         numbers.push({ num, color, x, y });
//     }
//     return numbers;
// }

// function calculateAnswer(type, numbers, a, b) {
//     if (type === "less") return numbers.filter(n => n.num < a).length;
//     if (type === "greater") return numbers.filter(n => n.num > a).length;
//     if (type === "between") return numbers.filter(n => n.num > a && n.num < b).length;
// }

// function createQuestionText(type, a, b) {
//     if (type === "less") return `How many numbers lesser than ${a} exist?`;
//     if (type === "greater") return `How many numbers greater than ${a} exist?`;
//     return `How many numbers are in between ${a} and ${b}?`;
// }

// function generateOptions(correct) {
//     const opts = new Set([correct]);
//     while (opts.size < 4) {
//         let guess = correct + rand(-6, 6);
//         if (guess === correct) continue;
//         if (guess < 0) guess = Math.abs(guess) + 1;
//         opts.add(guess);
//     }
//     return [...opts].sort(() => Math.random() - 0.5);
// }

// // ===========================
// // CANVAS RENDERER
// // ===========================
// function renderToBase64(numbers) {
//     const canvas = createCanvas(WIDTH, HEIGHT);
//     const ctx = canvas.getContext("2d");

//     ctx.fillStyle = "#ffffff";
//     ctx.fillRect(0, 0, WIDTH, HEIGHT);

//     ctx.font = "bold 16px Arial";

//     for (const n of numbers) {
//         ctx.fillStyle = n.color;
//         ctx.fillText(String(n.num), n.x, n.y);
//     }

//     return canvas.toBuffer("image/png").toString("base64");
// }

// // ===========================
// // MAIN EXPORT
// // ===========================
// export async function createAdvancedNumberMCQ(level, per) {

//     const DIFFICULTIES = diff_level(per);
//     const diff = DIFFICULTIES[level] || DIFFICULTIES["Medium"];


//     const qType = QUESTION_TYPES[rand(0, QUESTION_TYPES.length - 1)];

//     const a = rand(diff.range[0] + 1, diff.range[1] - 2);
//     const b = rand(a + 1, diff.range[1]);

//     const numbers = generateNumbers(diff.count, diff.range[0], diff.range[1]);
//     const correct = calculateAnswer(qType, numbers, a, b);
//     const options = generateOptions(correct);
//     const question = createQuestionText(qType, a, b);

//     const base64img = renderToBase64(numbers);

//     return {
//         difficulty: level,
//         questionType: qType,
//         question,
//         options,
//         correct,
//         image: base64img
//     };
// }


























import { createCanvas } from "canvas";

// ===========================
// CONFIG
// ===========================
const WIDTH = 420;
const HEIGHT = 270;

// ===========================
// DIFFICULTY FUNCTION
// ===========================
function diff_level(per) {
    let DIFFICULTIES;

    if(per < 5){
        DIFFICULTIES = {
            "Too Easy": { count: 31, range: [10, 15] },
            "Easy": { count: 35, range: [12, 16] },
            "Medium": { count: 40, range: [13, 14] },
            "Tough": { count: 45, range: [14, 18] },
            "Too Tough": { count: 50, range: [19, 23] }
        };
    }
    else if(per < 10){
        DIFFICULTIES = {
            "Too Easy": { count: 4, range: [5, 10] },
            "Easy": { count: 7, range: [0, 15] },
            "Medium": { count: 10, range: [0, 12] },
            "Tough": { count: 13, range: [0, 15] },
            "Too Tough": { count: 16, range: [0, 20] }
        };
    }else if(per < 15){
        DIFFICULTIES = {
            "Too Easy": { count: 7, range: [5, 10] },
            "Easy": { count: 10, range: [0, 15] },
            "Medium": { count: 13, range: [0, 12] },
            "Tough": { count: 16, range: [0, 15] },
            "Too Tough": { count: 19, range: [0, 20] }
        };
    }else if(per < 20){
        DIFFICULTIES = {
            "Too Easy": { count: 10, range: [5, 10] },
            "Easy": { count: 13, range: [0, 15] },
            "Medium": { count: 16, range: [0, 12] },
            "Tough": { count: 19, range: [0, 15] },
            "Too Tough": { count: 22, range: [0, 20] }
        };
    }else if(per < 25){
        DIFFICULTIES = {
            "Too Easy": { count: 13, range: [5, 10] },
            "Easy": { count: 16, range: [0, 15] },
            "Medium": { count: 19, range: [0, 12] },
            "Tough": { count: 22, range: [0, 15] },
            "Too Tough": { count: 25, range: [0, 20] }
        };
    }else if(per < 30){
        DIFFICULTIES = {
            "Too Easy": { count: 16, range: [5, 10] },
            "Easy": { count: 19, range: [0, 15] },
            "Medium": { count: 22, range: [0, 12] },
            "Tough": { count: 25, range: [0, 15] },
            "Too Tough": { count: 28, range: [0, 20] }
        };
    }else if(per < 35){
        DIFFICULTIES = {
            "Too Easy": { count: 19, range: [5, 10] },
            "Easy": { count: 22, range: [0, 15] },
            "Medium": { count: 25, range: [0, 12] },
            "Tough": { count: 28, range: [0, 15] },
            "Too Tough": { count: 31, range: [0, 20] }
        };
    }else if(per < 40){
        DIFFICULTIES = {
            "Too Easy": { count: 22, range: [5, 10] },
            "Easy": { count: 25, range: [0, 15] },
            "Medium": { count: 28, range: [0, 12] },
            "Tough": { count: 31, range: [0, 15] },
            "Too Tough": { count: 34, range: [0, 20] }
        };
    }else if(per < 45){
        DIFFICULTIES = {
            "Too Easy": { count: 25, range: [5, 10] },
            "Easy": { count: 28, range: [0, 15] },
            "Medium": { count: 31, range: [0, 12] },
            "Tough": { count: 34, range: [0, 15] },
            "Too Tough": { count: 37, range: [0, 20] }
        };
    }else if(per < 50){
        DIFFICULTIES = {
            "Too Easy": { count: 28, range: [5, 10] },
            "Easy": { count: 31, range: [0, 15] },
            "Medium": { count: 34, range: [0, 12] },
            "Tough": { count: 37, range: [0, 15] },
            "Too Tough": { count: 40, range: [0, 20] }
        };
    }else if(per < 55){
        DIFFICULTIES = {
            "Too Easy": { count: 31, range: [5, 10] },
            "Easy": { count: 34, range: [0, 15] },
            "Medium": { count: 37, range: [0, 12] },
            "Tough": { count: 40, range: [0, 15] },
            "Too Tough": { count: 43, range: [0, 20] }
        };
    }else if(per < 60){
        DIFFICULTIES = {
            "Too Easy": { count: 34, range: [5, 10] },
            "Easy": { count: 37, range: [0, 15] },
            "Medium": { count: 40, range: [0, 12] },
            "Tough": { count: 43, range: [0, 15] },
            "Too Tough": { count: 46, range: [0, 20] }
        };
    }else{
        DIFFICULTIES = {
            "Too Easy": { count: 40, range: [5, 10] },
            "Easy": { count: 45, range: [0, 15] },
            "Medium": { count: 50, range: [0, 12] },
            "Tough": { count: 55, range: [0, 15] },
            "Too Tough": { count: 60, range: [0, 20] }
        };
    }


    return DIFFICULTIES;
}

const QUESTION_TYPES = ["less", "greater", "between"];

// ===========================
// HELPERS
// ===========================
const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

function generateNumbers(count, min, max) {
    const colors = ["#e63946","#457b9d","#2a9d8f","#e9c46a","#f4a261","#264653","#ff006e","#8338ec","#3a86ff","#d00000"];
    const numbers = [];
    const padding = 18;

    for (let i = 0; i < count; i++) {
        const num = rand(min, max);
        const color = colors[rand(0, colors.length - 1)];
        let x, y, tries = 0;

        do {
            x = rand(5, WIDTH - padding);
            y = rand(20, HEIGHT - padding);
            tries++;
        } while (numbers.some(n => Math.abs(n.x - x) < padding && Math.abs(n.y - y) < padding) && tries < 100);

        numbers.push({ num, color, x, y });
    }
    return numbers;
}

function calculateAnswer(type, numbers, a, b) {
    if (type === "less") return numbers.filter(n => n.num < a).length;
    if (type === "greater") return numbers.filter(n => n.num > a).length;
    if (type === "between") return numbers.filter(n => n.num > a && n.num < b).length;
}

function createQuestionText(type, a, b) {
    if (type === "less") return `How many numbers lesser than ${a} exist?`;
    if (type === "greater") return `How many numbers greater than ${a} exist?`;
    return `How many numbers are in between ${a} and ${b}?`;
}

function generateOptions(correct) {
    const opts = new Set([correct]);
    while (opts.size < 4) {
        let guess = correct + rand(-6, 6);
        if (guess === correct) continue;
        if (guess < 0) guess = Math.abs(guess) + 1;
        opts.add(guess);
    }
    return [...opts].sort(() => Math.random() - 0.5);
}

// ===========================
// CANVAS RENDERER
// ===========================
function renderToBase64(numbers) {
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.font = "bold 16px Arial";

    for (const n of numbers) {
        ctx.fillStyle = n.color;
        ctx.fillText(String(n.num), n.x, n.y);
    }

    return canvas.toBuffer("image/png").toString("base64");
}

// ===========================
// MAIN EXPORT
// ===========================
export async function createAdvancedNumberMCQ(level, per) {

    const DIFFICULTIES = diff_level(per);
    const diff = DIFFICULTIES[level] || DIFFICULTIES["Medium"];


    const qType = QUESTION_TYPES[rand(0, QUESTION_TYPES.length - 1)];

    const a = rand(diff.range[0] + 1, diff.range[1] - 2);
    const b = rand(a + 1, diff.range[1]);

    const numbers = generateNumbers(diff.count, diff.range[0], diff.range[1]);
    const correct = calculateAnswer(qType, numbers, a, b);
    const options = generateOptions(correct);
    const question = createQuestionText(qType, a, b);

    const base64img = renderToBase64(numbers);

    return {
        difficulty: level,
        questionType: qType,
        question,
        options,
        correct,
        image: base64img
    };
}
