//Before per < 5
// import { createCanvas } from "canvas";

// // ==========================
// // CONFIG
// // ==========================
// const WIDTH = 400;
// const HEIGHT = 250;

// const COLORS = [
//     { name: "RED", value: "#ff0000" },
//     { name: "BLUE", value: "#0071bc" },
//     { name: "GREEN", value: "#00a444" },
//     { name: "YELLOW", value: "#ffcc00" },
//     { name: "PURPLE", value: "#6f0499" },
//     { name: "ORANGE", value: "#ff7700" }
// ];

// // ==========================
// // MAIN EXPORT
// // ==========================
// export function generateColorMatchQuestion({ level = "Medium", per = 0 } = {}) {

//     let COUNT_MAP;

//     if (per < 10) {
//         COUNT_MAP = { 
//             "Too Easy": 10, 
//             "Easy": 15, 
//             "Medium": 20, 
//             "Tough": 25, 
//             "Too Tough": 30 
//         };
//     }else if (per < 20) {
//         COUNT_MAP = { 
//             "Too Easy": 15, 
//             "Easy": 20, 
//             "Medium": 25, 
//             "Tough": 30, 
//             "Too Tough": 35 
//         };
//     }else if (per < 30) {
//         COUNT_MAP = { 
//             "Too Easy": 20, 
//             "Easy": 25, 
//             "Medium": 30, 
//             "Tough": 35, 
//             "Too Tough": 40 
//         };
//     }else if (per < 40) {
//         COUNT_MAP = { 
//             "Too Easy": 25, 
//             "Easy": 30, 
//             "Medium": 35, 
//             "Tough": 40, 
//             "Too Tough": 45 
//         };
//     }else if (per < 50) {
//         COUNT_MAP = { 
//             "Too Easy": 30, 
//             "Easy": 35, 
//             "Medium": 40, 
//             "Tough": 45, 
//             "Too Tough": 50 
//         };
//     }else if (per < 50) {
//         COUNT_MAP = { 
//             "Too Easy": 35, 
//             "Easy": 40, 
//             "Medium": 45, 
//             "Tough": 50, 
//             "Too Tough": 55 
//         };
//     }else if (per < 60) {
//         COUNT_MAP = { 
//             "Too Easy": 40, 
//             "Easy": 45, 
//             "Medium": 50, 
//             "Tough": 55, 
//             "Too Tough": 60 
//         };
//     }else if (per < 70) {
//         COUNT_MAP = { 
//             "Too Easy": 45, 
//             "Easy": 50, 
//             "Medium": 55, 
//             "Tough": 60, 
//             "Too Tough": 65 
//         };
//     }else if (per < 80) {
//         COUNT_MAP = { 
//             "Too Easy": 50, 
//             "Easy": 55, 
//             "Medium": 60, 
//             "Tough": 65, 
//             "Too Tough": 70 
//         };
//     }else if (per < 90) {
//         COUNT_MAP = { 
//             "Too Easy": 55, 
//             "Easy": 60, 
//             "Medium": 65, 
//             "Tough": 70, 
//             "Too Tough": 75 
//         };
//     }else{
//         COUNT_MAP = { 
//             "Too Easy": 60, 
//             "Easy": 65, 
//             "Medium": 70, 
//             "Tough": 75, 
//             "Too Tough": 80 
//         };
//     }

//     const totalWords = COUNT_MAP[level] || 12;

//     // --------------------
//     // Generate items
//     // --------------------
//     const items = [];
//     let correctCount = 0;

//     for (let i = 0; i < totalWords; i++) {
//         let word = COLORS[Math.floor(Math.random() * COLORS.length)];
//         let color = COLORS[Math.floor(Math.random() * COLORS.length)];

//         if (Math.random() < 0.35) {
//             color = word;
//         }

//         if (word.name === color.name) correctCount++;

//         items.push({
//             text: word.name,
//             colorValue: color.value
//         });
//     }

//     // --------------------
//     // QUESTION TYPE (MATCH or NOT MATCH)
//     // --------------------
//     const isMismatchQuestion = Math.random() < 0.5;

//     const questionText = isMismatchQuestion
//         ? "How many color names doesnt match their colors?"
//         : "How many color names match their actual color?";

//     const finalAnswer = isMismatchQuestion
//         ? totalWords - correctCount
//         : correctCount;

//     // --------------------
//     // Draw canvas
//     // --------------------
//     const canvas = createCanvas(WIDTH, HEIGHT);
//     const ctx = canvas.getContext("2d");

//     ctx.fillStyle = "#ffffff";
//     ctx.fillRect(0, 0, WIDTH, HEIGHT);

//     ctx.font = "bold 18px Arial";
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";

//     const cols = 4;
//     const rows = Math.ceil(totalWords / cols);
//     const spacingX = WIDTH / cols;
//     const spacingY = HEIGHT / rows;

//     items.forEach((item, i) => {
//         const x = (i % cols) * spacingX + spacingX / 2;
//         const y = Math.floor(i / cols) * spacingY + spacingY / 2;

//         ctx.fillStyle = item.colorValue;
//         ctx.fillText(item.text, x, y);
//     });

//     // --------------------
//     // MCQ OPTIONS
//     // --------------------
//     const optionsSet = new Set([finalAnswer]);

//     while (optionsSet.size < 4) {
//         const delta = Math.floor(Math.random() * 5) - 2;
//         optionsSet.add(Math.max(0, finalAnswer + delta));
//     }

//     const options = [...optionsSet].sort(() => Math.random() - 0.5);

//     // --------------------
//     // RETURN
//     // --------------------
//     return {
//         difficulty: level,
//         question: questionText,
//         options: options.map(String),
//         answer: String(finalAnswer),
//         image: canvas
//             .toDataURL("image/png")
//             .replace(/^data:image\/png;base64,/, "")
//     };
// }



































import { createCanvas } from "canvas";

// ==========================
// CONFIG
// ==========================
const WIDTH = 400;
const HEIGHT = 250;

const COLORS = [
    { name: "RED", value: "#ff0000" },
    { name: "BLUE", value: "#0071bc" },
    { name: "GREEN", value: "#00a444" },
    { name: "YELLOW", value: "#ffcc00" },
    { name: "PURPLE", value: "#6f0499" },
    { name: "ORANGE", value: "#ff7700" }
];

// ==========================
// MAIN EXPORT
// ==========================
export function generateColorMatchQuestion({ level = "Medium", per = 0 } = {}) {

    let COUNT_MAP;

    if (per < 5) {
        COUNT_MAP = { 
            "Too Easy": 5, 
            "Easy": 6, 
            "Medium": 7, 
            "Tough": 8, 
            "Too Tough": 9 
        };
    }else if (per < 10) {
        COUNT_MAP = { 
            "Too Easy": 7, 
            "Easy": 8, 
            "Medium": 9, 
            "Tough": 10, 
            "Too Tough": 11 
        };
    }else if (per < 15) {
        COUNT_MAP = { 
            "Too Easy": 7, 
            "Easy": 8, 
            "Medium": 9, 
            "Tough": 10, 
            "Too Tough": 11 
        };
    }else if (per < 20) {
        COUNT_MAP = { 
            "Too Easy": 8, 
            "Easy": 12, 
            "Medium": 13, 
            "Tough": 14, 
            "Too Tough": 15 
        };
    }else if (per < 25) {
        COUNT_MAP = { 
            "Too Easy": 9, 
            "Easy": 10, 
            "Medium": 11, 
            "Tough": 12, 
            "Too Tough": 13 
        };
    }else if (per < 30) {
        COUNT_MAP = { 
            "Too Easy": 10, 
            "Easy": 11, 
            "Medium": 12, 
            "Tough": 13, 
            "Too Tough": 14 
        };
    }else if (per < 35) {
        COUNT_MAP = { 
            "Too Easy": 11, 
            "Easy": 12, 
            "Medium": 13, 
            "Tough": 14, 
            "Too Tough": 15 
        };
    }else if (per < 40) {
        COUNT_MAP = { 
            "Too Easy": 12, 
            "Easy": 13, 
            "Medium": 14, 
            "Tough": 15, 
            "Too Tough": 16 
        };
    }else if (per < 45) {
        COUNT_MAP = { 
            "Too Easy": 13, 
            "Easy": 14, 
            "Medium": 15, 
            "Tough": 16, 
            "Too Tough": 17 
        };
    }else if (per < 50) {
        COUNT_MAP = { 
            "Too Easy": 14, 
            "Easy": 15, 
            "Medium": 16, 
            "Tough": 17, 
            "Too Tough": 18 
        };
    }else if (per < 55) {
        COUNT_MAP = { 
            "Too Easy": 15, 
            "Easy": 16, 
            "Medium": 17, 
            "Tough": 18, 
            "Too Tough": 19 
        };
    }else if (per < 60) {
        COUNT_MAP = { 
            "Too Easy": 16, 
            "Easy": 17, 
            "Medium": 18, 
            "Tough": 19, 
            "Too Tough": 20 
        };
    }else{
        COUNT_MAP = { 
            "Too Easy": 17, 
            "Easy": 18, 
            "Medium": 19, 
            "Tough": 20, 
            "Too Tough": 21 
        };
    }

    const totalWords = COUNT_MAP[level] || 12;

    // --------------------
    // Generate items
    // --------------------
    const items = [];
    let correctCount = 0;

    for (let i = 0; i < totalWords; i++) {
        let word = COLORS[Math.floor(Math.random() * COLORS.length)];
        let color = COLORS[Math.floor(Math.random() * COLORS.length)];

        if (Math.random() < 0.35) {
            color = word;
        }

        if (word.name === color.name) correctCount++;

        items.push({
            text: word.name,
            colorValue: color.value
        });
    }

    // --------------------
    // QUESTION TYPE (MATCH or NOT MATCH)
    // --------------------
    const isMismatchQuestion = Math.random() < 0.5;

    const questionText = isMismatchQuestion
        ? "How many color names doesnt match their colors?"
        : "How many color names match their actual color?";

    const finalAnswer = isMismatchQuestion
        ? totalWords - correctCount
        : correctCount;

    // --------------------
    // Draw canvas
    // --------------------
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.font = "bold 18px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const cols = 4;
    const rows = Math.ceil(totalWords / cols);
    const spacingX = WIDTH / cols;
    const spacingY = HEIGHT / rows;

    items.forEach((item, i) => {
        const x = (i % cols) * spacingX + spacingX / 2;
        const y = Math.floor(i / cols) * spacingY + spacingY / 2;

        ctx.fillStyle = item.colorValue;
        ctx.fillText(item.text, x, y);
    });

    // --------------------
    // MCQ OPTIONS
    // --------------------
    const optionsSet = new Set([finalAnswer]);

    while (optionsSet.size < 4) {
        const delta = Math.floor(Math.random() * 5) - 2;
        optionsSet.add(Math.max(0, finalAnswer + delta));
    }

    const options = [...optionsSet].sort(() => Math.random() - 0.5);

    // --------------------
    // RETURN
    // --------------------
    return {
        difficulty: level,
        question: questionText,
        options: options.map(String),
        answer: String(finalAnswer),
        image: canvas
            .toDataURL("image/png")
            .replace(/^data:image\/png;base64,/, "")
    };
}
