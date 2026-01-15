
// import { createCanvas, registerFont } from "canvas";
// import fs from "fs";

// // ==========================
// // FONT (SAFE LOAD)
// // ==========================
// const FONT_PATH = "./fonts/AtkinsonHyperlegibleMono-Bold.ttf";

// if (fs.existsSync(FONT_PATH)) {
//     registerFont(FONT_PATH, {
//         family: "Atkinson Hyperlegible Mono"
//     });
// }

// // ==========================
// // CONFIG
// // ==========================
// const WIDTH = 400;
// const HEIGHT = 250;

// // ==========================
// // UTILS
// // ==========================
// function rand(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function shuffle(arr) {
//     return [...arr].sort(() => Math.random() - 0.5);
// }

// // ==========================
// // STEP 1: Generate Numbers
// // ==========================
// function generateNumbers(level, per) {
//     let config;

//     if (per < 10) {
//         config = {
//             "Too Easy": { count: 3, maxNum: 1 },
//             "Easy": { count: 4, maxNum: 2 },
//             "Medium": { count: 5, maxNum: 3 },
//             "Tough": { count: 6, maxNum: 4 },
//             "Too Tough": { count: 7, maxNum: 5 },
//         };
//     } else if (per < 20) {
//         config = {
//             "Too Easy": { count: 6, maxNum: 3 },
//             "Easy": { count: 8, maxNum: 3 },
//             "Medium": { count: 10, maxNum: 4 },
//             "Tough": { count: 12, maxNum: 5 },
//             "Too Tough": { count: 14, maxNum: 6 },
//         };
//     } else if (per < 30) {
//         config = {
//             "Too Easy": { count: 9, maxNum: 6 },
//             "Easy": { count: 11, maxNum: 5 },
//             "Medium": { count: 13, maxNum: 6 },
//             "Tough": { count: 15, maxNum: 6 },
//             "Too Tough": { count: 16, maxNum: 6 },
//         };
//     } else if (per < 40) {
//         config = {
//             "Too Easy": { count: 12, maxNum: 6 },
//             "Easy": { count: 14, maxNum: 5 },
//             "Medium": { count: 16, maxNum: 7 },
//             "Tough": { count: 18, maxNum: 8 },
//             "Too Tough": { count: 19, maxNum: 10 },
//         };
//     } else if(per < 50) {
//         config = {
//             "Too Easy": { count: 15, maxNum: 6 },
//             "Easy": { count: 17, maxNum: 7 },
//             "Medium": { count: 19, maxNum: 8 },
//             "Tough": { count: 21, maxNum: 9 },
//             "Too Tough": { count: 23, maxNum: 10 },
//         };
//     }else if(per < 60) {
//         config = {
//             "Too Easy": { count: 18, maxNum: 6 },
//             "Easy": { count: 20, maxNum: 7 },
//             "Medium": { count: 22, maxNum: 8 },
//             "Tough": { count: 24, maxNum: 9 },
//             "Too Tough": { count: 26, maxNum: 10 },
//         };
//     }else if(per < 70) {
//         config = {
//             "Too Easy": { count: 20, maxNum: 6 },
//             "Easy": { count: 22, maxNum: 7 },
//             "Medium": { count: 24, maxNum: 8 },
//             "Tough": { count: 26, maxNum: 9 },
//             "Too Tough": { count: 28, maxNum: 10 },
//         };
//     }else if(per < 80) {
//         config = {
//             "Too Easy": { count: 22, maxNum: 6 },
//             "Easy": { count: 24, maxNum: 7 },
//             "Medium": { count: 26, maxNum: 8 },
//             "Tough": { count: 28, maxNum: 9 },
//             "Too Tough": { count: 30, maxNum: 10 },
//         };
//     }else if(per < 90) {
//         config = {
//             "Too Easy": { count: 24, maxNum: 6 },
//             "Easy": { count: 26, maxNum: 7 },
//             "Medium": { count: 28, maxNum: 8 },
//             "Tough": { count: 30, maxNum: 9 },
//             "Too Tough": { count: 32, maxNum: 10 },
//         };
//     }else{
//         config = {
//             "Too Easy": { count: 26, maxNum: 6 },
//             "Easy": { count: 28, maxNum: 7 },
//             "Medium": { count: 30, maxNum: 8 },
//             "Tough": { count: 32, maxNum: 9 },
//             "Too Tough": { count: 34, maxNum: 10 },
//         };
//     }

//     const safeLevel = config[level] ?? config["Easy"];
//     const { count, maxNum } = safeLevel;

//     return Array.from({ length: count }, () => rand(1, maxNum));
// }

// // ==========================
// // STEP 2: Analyze (PAIR LOGIC)
// // ==========================
// function analyze(numbers) {
//     const freq = {};
//     numbers.forEach(n => freq[n] = (freq[n] || 0) + 1);

//     let paired = 0;
//     let unpaired = 0;

//     for (const n in freq) {
//         paired += Math.floor(freq[n] / 2);
//         if (freq[n] % 2 !== 0) unpaired++;
//     }

//     return { paired, unpaired };
// }

// // ==========================
// // STEP 3: Draw Image
// // ==========================
// function draw(numbers) {
//     const canvas = createCanvas(WIDTH, HEIGHT);
//     const ctx = canvas.getContext("2d");

//     ctx.fillStyle = "#f4f4f4";
//     ctx.fillRect(0, 0, WIDTH, HEIGHT);

//     ctx.font = "22px 'Atkinson Hyperlegible Mono', monospace";
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";

//     const COLORS = [
//         "#e53935", "#1e88e5", "#43a047", "#fdd835",
//         "#8e24aa", "#fb8c00", "#00897b", "#6d4c41"
//     ];

//     const cols = 6;
//     const rows = Math.max(1, Math.ceil(numbers.length / cols));
//     const cellW = WIDTH / cols;
//     const cellH = HEIGHT / rows;

//     numbers.forEach((num, i) => {
//         const col = i % cols;
//         const row = Math.floor(i / cols);

//         let x = col * cellW + cellW / 2;
//         let y = row * cellH + cellH / 2;

//         x += rand(-cellW / 4, cellW / 4);
//         y += rand(-cellH / 4, cellH / 4);

//         ctx.fillStyle = COLORS[rand(0, COLORS.length - 1)];
//         ctx.fillText(num, x, y);
//     });

//     return canvas.toBuffer("image/png");
// }

// // ==========================
// // STEP 4: Create Options (5–7)
// // ==========================
// function generateOptions(correct) {
//     const optionCount = rand(5, 7); // ⭐ NEW
//     const set = new Set([correct]);

//     while (set.size < optionCount) {
//         set.add(Math.max(0, correct + rand(-5, 5)));
//     }

//     return shuffle([...set]);
// }

// // ==========================
// // MAIN EXPORT
// // ==========================
// export async function generateNumberPairMCQ(level, per) {
//     const numbers = generateNumbers(level, per);
//     const result = analyze(numbers);

//     const isTooTough = level === "Too Tough";
//     const askPaired = Math.random() < 0.5;

//     let question;
//     let correctAnswer;

//     if (isTooTough) {
//         question =
//             "How many pairs can be formed? (Every 2 same numbers make 1 pair). Add 2 extra pairs to your answer.";
//         correctAnswer = result.paired + 2;
//     } else {
//         question = askPaired
//             ? "How many pairs can be formed? (Every 2 same numbers make 1 pair)"
//             : "How many unpaired numbers remain after forming all possible pairs?";

//         correctAnswer = askPaired
//             ? result.paired
//             : result.unpaired;
//     }

//     const options = generateOptions(correctAnswer);
//     const correctIndex = options.indexOf(correctAnswer);
//     const buffer = draw(numbers);

//     return {
//         question,
//         options,
//         correctAnswer,
//         correctIndex,
//         base64Image: buffer.toString("base64"),
//         meta: {
//             numbers,
//             level,
//             per,
//             optionCount: options.length
//         }
//     };
// }








import { createCanvas, registerFont } from "canvas";
import fs from "fs";

// ==========================
// FONT (SAFE LOAD)
// ==========================
const FONT_PATH = "./fonts/AtkinsonHyperlegibleMono-Bold.ttf";

if (fs.existsSync(FONT_PATH)) {
    registerFont(FONT_PATH, {
        family: "Atkinson Hyperlegible Mono"
    });
}

// ==========================
// CONFIG
// ==========================
const WIDTH = 400;
const HEIGHT = 250;

// ==========================
// UTILS
// ==========================
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
}

// ==========================
// STEP 1: Generate Numbers
// ==========================
function generateNumbers(level, per) {
    let config;

    if (per < 5) {
        config = {
            "Too Easy": { count: 3, maxNum: 1 },
            "Easy": { count: 4, maxNum: 2 },
            "Medium": { count: 5, maxNum: 3 },
            "Tough": { count: 6, maxNum: 2 },
            "Too Tough": { count: 7, maxNum: 3 },
        };
    } else if (per < 10) {
        config = {
            "Too Easy": { count: 4, maxNum: 3 },
            "Easy": { count: 5, maxNum: 3 },
            "Medium": { count: 6, maxNum: 4 },
            "Tough": { count: 7, maxNum: 5 },
            "Too Tough": { count: 8, maxNum: 6 },
        };
    } else if (per < 15) {
        config = {
            "Too Easy": { count: 5, maxNum: 6 },
            "Easy": { count: 6, maxNum: 5 },
            "Medium": { count: 7, maxNum: 6 },
            "Tough": { count: 8, maxNum: 6 },
            "Too Tough": { count: 9, maxNum: 6 },
        };
    } else if (per < 20) {
        config = {
            "Too Easy": { count: 6, maxNum: 6 },
            "Easy": { count: 7, maxNum: 5 },
            "Medium": { count: 8, maxNum: 7 },
            "Tough": { count: 9, maxNum: 8 },
            "Too Tough": { count: 10, maxNum: 10 },
        };
    } else if(per < 25) {
        config = {
            "Too Easy": { count: 7, maxNum: 6 },
            "Easy": { count: 8, maxNum: 7 },
            "Medium": { count: 9, maxNum: 8 },
            "Tough": { count: 10, maxNum: 9 },
            "Too Tough": { count: 11, maxNum: 10 },
        };
    }else if(per < 30) {
        config = {
            "Too Easy": { count: 8, maxNum: 6 },
            "Easy": { count: 9, maxNum: 7 },
            "Medium": { count: 10, maxNum: 8 },
            "Tough": { count: 11, maxNum: 9 },
            "Too Tough": { count: 12, maxNum: 10 },
        };
    }else if(per < 35) {
        config = {
            "Too Easy": { count: 9, maxNum: 6 },
            "Easy": { count: 10, maxNum: 7 },
            "Medium": { count: 11, maxNum: 8 },
            "Tough": { count: 12, maxNum: 9 },
            "Too Tough": { count: 13, maxNum: 10 },
        };
    }else if(per < 40) {
        config = {
            "Too Easy": { count: 10, maxNum: 6 },
            "Easy": { count: 11, maxNum: 7 },
            "Medium": { count: 12, maxNum: 8 },
            "Tough": { count: 13, maxNum: 9 },
            "Too Tough": { count: 14, maxNum: 10 },
        };
    }else if(per < 45) {
        config = {
            "Too Easy": { count: 11, maxNum: 6 },
            "Easy": { count: 12, maxNum: 7 },
            "Medium": { count: 13, maxNum: 8 },
            "Tough": { count: 14, maxNum: 9 },
            "Too Tough": { count: 15, maxNum: 10 },
        };
    }else if(per < 50) {
        config = {
            "Too Easy": { count: 12, maxNum: 6 },
            "Easy": { count: 13, maxNum: 7 },
            "Medium": { count: 14, maxNum: 8 },
            "Tough": { count: 15, maxNum: 9 },
            "Too Tough": { count: 16, maxNum: 10 },
        };
    }else if(per < 55) {
        config = {
            "Too Easy": { count: 13, maxNum: 6 },
            "Easy": { count: 14, maxNum: 7 },
            "Medium": { count: 15, maxNum: 8 },
            "Tough": { count: 16, maxNum: 9 },
            "Too Tough": { count: 17, maxNum: 10 },
        };
    }else if(per < 60) {
        config = {
            "Too Easy": { count: 14, maxNum: 6 },
            "Easy": { count: 15, maxNum: 7 },
            "Medium": { count: 16, maxNum: 8 },
            "Tough": { count: 17, maxNum: 9 },
            "Too Tough": { count: 18, maxNum: 10 },
        };
    }else if(per < 65) {
        config = {
            "Too Easy": { count: 15, maxNum: 6 },
            "Easy": { count: 16, maxNum: 7 },
            "Medium": { count: 17, maxNum: 8 },
            "Tough": { count: 18, maxNum: 9 },
            "Too Tough": { count: 19, maxNum: 10 },
        };
    }else if(per < 70) {
        config = {
            "Too Easy": { count: 16, maxNum: 6 },
            "Easy": { count: 17, maxNum: 7 },
            "Medium": { count: 18, maxNum: 8 },
            "Tough": { count: 19, maxNum: 9 },
            "Too Tough": { count: 20, maxNum: 10 },
        };
    }else if(per < 75) {
        config = {
            "Too Easy": { count: 17, maxNum: 6 },
            "Easy": { count: 18, maxNum: 7 },
            "Medium": { count: 19, maxNum: 8 },
            "Tough": { count: 20, maxNum: 9 },
            "Too Tough": { count: 21, maxNum: 10 },
        };
    }else if(per < 80) {
        config = {
            "Too Easy": { count: 18, maxNum: 6 },
            "Easy": { count: 19, maxNum: 7 },
            "Medium": { count: 20, maxNum: 8 },
            "Tough": { count: 21, maxNum: 9 },
            "Too Tough": { count: 22, maxNum: 10 },
        };
    }else if(per < 85) {
        config = {
            "Too Easy": { count: 19, maxNum: 6 },
            "Easy": { count: 20, maxNum: 7 },
            "Medium": { count: 21, maxNum: 8 },
            "Tough": { count: 22, maxNum: 9 },
            "Too Tough": { count: 23, maxNum: 10 },
        };
    }else if(per < 90) {
        config = {
            "Too Easy": { count: 20, maxNum: 6 },
            "Easy": { count: 21, maxNum: 7 },
            "Medium": { count: 22, maxNum: 8 },
            "Tough": { count: 23, maxNum: 9 },
            "Too Tough": { count: 24, maxNum: 10 },
        };
    }else{
        config = {
            "Too Easy": { count: 21, maxNum: 6 },
            "Easy": { count: 22, maxNum: 7 },
            "Medium": { count: 23, maxNum: 8 },
            "Tough": { count: 24, maxNum: 9 },
            "Too Tough": { count: 25, maxNum: 10 },
        };
    }

    const safeLevel = config[level] ?? config["Easy"];
    const { count, maxNum } = safeLevel;

    return Array.from({ length: count }, () => rand(1, maxNum));
}

// ==========================
// STEP 2: Analyze (PAIR LOGIC)
// ==========================
function analyze(numbers) {
    const freq = {};
    numbers.forEach(n => freq[n] = (freq[n] || 0) + 1);

    let paired = 0;
    let unpaired = 0;

    for (const n in freq) {
        paired += Math.floor(freq[n] / 2);
        if (freq[n] % 2 !== 0) unpaired++;
    }

    return { paired, unpaired };
}

// ==========================
// STEP 3: Draw Image
// ==========================
function draw(numbers) {
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#f4f4f4";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.font = "22px 'Atkinson Hyperlegible Mono', monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const COLORS = [
        "#e53935", "#1e88e5", "#43a047", "#fdd835",
        "#8e24aa", "#fb8c00", "#00897b", "#6d4c41"
    ];

    const cols = 6;
    const rows = Math.max(1, Math.ceil(numbers.length / cols));
    const cellW = WIDTH / cols;
    const cellH = HEIGHT / rows;

    numbers.forEach((num, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);

        let x = col * cellW + cellW / 2;
        let y = row * cellH + cellH / 2;

        x += rand(-cellW / 4, cellW / 4);
        y += rand(-cellH / 4, cellH / 4);

        ctx.fillStyle = COLORS[rand(0, COLORS.length - 1)];
        ctx.fillText(num, x, y);
    });

    return canvas.toBuffer("image/png");
}

// ==========================
// STEP 4: Create Options (5–7)
// ==========================
function generateOptions(correct) {
    const optionCount = rand(5, 7); // ⭐ NEW
    const set = new Set([correct]);

    while (set.size < optionCount) {
        set.add(Math.max(0, correct + rand(-5, 5)));
    }

    return shuffle([...set]);
}

// ==========================
// MAIN EXPORT
// ==========================
export async function generateNumberPairMCQ(level, per) {
    const numbers = generateNumbers(level, per);
    const result = analyze(numbers);

    const isTooTough = level === "Too Tough";
    const askPaired = Math.random() < 0.5;

    let question;
    let correctAnswer;

    if (isTooTough) {
        question =
            "How many pairs can be formed? (Every 2 same numbers make 1 pair). Add 2 extra pairs to your answer.";
        correctAnswer = result.paired + 2;
    } else {
        question = askPaired
            ? "How many pairs can be formed? (Every 2 same numbers make 1 pair)"
            : "How many unpaired numbers remain after forming all possible pairs?";

        correctAnswer = askPaired
            ? result.paired
            : result.unpaired;
    }

    const options = generateOptions(correctAnswer);
    const correctIndex = options.indexOf(correctAnswer);
    const buffer = draw(numbers);

    return {
        question,
        options,
        correctAnswer,
        correctIndex,
        base64Image: buffer.toString("base64"),
        meta: {
            numbers,
            level,
            per,
            optionCount: options.length
        }
    };
}




