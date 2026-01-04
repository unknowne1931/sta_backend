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

    if(per < 10){
        COUNT_MAP = {
            "Too Easy": 10,
            "Easy": 15,
            "Medium": 20,
            "Tough": 25,
            "Too Tough": 30
        }
    }else if(per < 20){
        COUNT_MAP = {
            "Too Easy": 15,
            "Easy": 20,
            "Medium": 25,
            "Tough": 30,
            "Too Tough": 35
        }
    }else if(per < 30){
        COUNT_MAP = {
            "Too Easy": 20,
            "Easy": 25,
            "Medium": 30,
            "Tough": 35,
            "Too Tough": 40
        }
    }else if(per < 40){
        COUNT_MAP = {
            "Too Easy": 25,
            "Easy": 30,
            "Medium": 35,
            "Tough": 40,
            "Too Tough": 45
        }
    }else if(per < 50){
        COUNT_MAP = {
            "Too Easy": 30,
            "Easy": 35,
            "Medium": 40,
            "Tough": 45,
            "Too Tough": 50
        }
    }else{
        COUNT_MAP = {
            "Too Easy": 35,
            "Easy": 40,
            "Medium": 45,
            "Tough": 50,
            "Too Tough": 55
        }
    }

    

    const totalWords = COUNT_MAP[level] || 12;

    // --------------------
    // Decide question type
    // --------------------
    const modeRoll = Math.random();
    let mode = "MATCH"; // default

    if (modeRoll < 0.33) mode = "MATCH";
    else if (modeRoll < 0.66) mode = "SAME";
    else mode = "CROSS";

    let targetWord = null;
    let targetColor = null;

    if (mode === "SAME") {
        targetWord = COLORS[Math.floor(Math.random() * COLORS.length)];
        targetColor = targetWord;
    }

    if (mode === "CROSS") {
        targetWord = COLORS[Math.floor(Math.random() * COLORS.length)];
        do {
            targetColor = COLORS[Math.floor(Math.random() * COLORS.length)];
        } while (targetColor.name === targetWord.name);
    }

    const items = [];
    let correctCount = 0;

    // --------------------
    // Generate items (controlled)
    // --------------------
    for (let i = 0; i < totalWords; i++) {
        let word = COLORS[Math.floor(Math.random() * COLORS.length)];
        let color = COLORS[Math.floor(Math.random() * COLORS.length)];

        // Force difficulty structure
        if (Math.random() < 0.35) {
            color = word;
        }

        // Guarantee presence for SAME / CROSS modes
        if ((mode === "SAME" || mode === "CROSS") && i < 2) {
            word = targetWord;
            color = targetColor;
        }

        const isCorrect =
            (mode === "MATCH" && word.name === color.name) ||
            (mode === "SAME" &&
                word.name === targetWord.name &&
                color.name === targetColor.name) ||
            (mode === "CROSS" &&
                word.name === targetWord.name &&
                color.name === targetColor.name);

        if (isCorrect) correctCount++;

        items.push({
            text: word.name,
            colorValue: color.value
        });
    }

    // --------------------
    // Question text
    // --------------------
    let questionText = "";

    if (mode === "MATCH") {
        questionText = "How many color names match their actual color?";
    } else if (mode === "SAME") {
        questionText = `How many times does the word "${targetWord.name}" appear in ${targetWord.name} color?`;
    } else {
        questionText = `How many times does the word "${targetWord.name}" appear in ${targetColor.name} color?`;
    }

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
    const optionsSet = new Set([correctCount]);

    while (optionsSet.size < 4) {
        const delta = Math.floor(Math.random() * 5) - 2;
        optionsSet.add(Math.max(0, correctCount + delta));
    }

    const options = [...optionsSet].sort(() => Math.random() - 0.5);

    // --------------------
    // RETURN
    // --------------------
    return {
        difficulty: level,
        question: questionText,
        options: options.map(String),
        answer: String(correctCount),
        image: canvas.toDataURL("image/png").replace(/^data:image\/png;base64,/, "")
    };
}
