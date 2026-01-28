


// import { createCanvas, registerFont } from "canvas";
// import fs from "fs";

// // ==========================
// // FONT
// // ==========================
// const FONT_PATH = "./fonts/AtkinsonHyperlegibleMono-Bold.ttf";

// if (fs.existsSync(FONT_PATH)) {
//     registerFont(FONT_PATH, { family: "Atkinson Hyperlegible Mono" });
// }


// const WIDTH = 400;
// const HEIGHT = 250;

// const MIN_FONT_SIZE = 8;
// const LINE_GAP = 1;
// const PADDING = 2;

// // ==========================
// // UTILS
// // ==========================

// function duff_lelv(per){
//     let diff = {}

//     if(per < 10){
//         diff = {
//             "Too Easy" : 10,
//             "Easy" : 15,
//             "Medium" : 20,
//             "Tough" : 25,
//             "Too Tough" : 30 
//         }
//     }else if(per < 20){
//         diff = {
//             "Too Easy" : 20,
//             "Easy" : 25,
//             "Medium" : 30,
//             "Tough" : 35,
//             "Too Tough" : 40 
//         }
//     }else if(per < 30){
//         diff = {
//             "Too Easy" : 25,
//             "Easy" : 30,
//             "Medium" : 35,
//             "Tough" : 40,
//             "Too Tough" : 45 
//         }
//     }else if(per < 40){
//         diff = {
//             "Too Easy" : 30,
//             "Easy" : 35,
//             "Medium" : 40,
//             "Tough" : 45,
//             "Too Tough" : 50 
//         }
//     }else if(per < 50){
//         diff = {
//             "Too Easy" : 35,
//             "Easy" : 40,
//             "Medium" : 45,
//             "Tough" : 50,
//             "Too Tough" : 55 
//         }
//     }else if(per < 60){
//         diff = {
//             "Too Easy" : 40,
//             "Easy" : 45,
//             "Medium" : 50,
//             "Tough" : 55,
//             "Too Tough" : 60 
//         }
//     }else if(per < 70){
//         diff = {
//             "Too Easy" : 45,
//             "Easy" : 50,
//             "Medium" : 55,
//             "Tough" : 60,
//             "Too Tough" : 65 
//         }
//     }else if(per < 80){
//         diff = {
//             "Too Easy" : 50,
//             "Easy" : 55,
//             "Medium" : 60,
//             "Tough" : 65,
//             "Too Tough" : 70 
//         }
//     }else if(per < 90){
//         diff = {
//             "Too Easy" : 55,
//             "Easy" : 60,
//             "Medium" : 65,
//             "Tough" : 70,
//             "Too Tough" : 75 
//         }
//     }else{
//         diff = {
//             "Too Easy" : 60,
//             "Easy" : 65,
//             "Medium" : 70,
//             "Tough" : 75,
//             "Too Tough" : 80 
//         }
//     }

//     return diff
// }



// const rand = (min, max) =>
//     Math.floor(Math.random() * (max - min + 1)) + min;

// const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

// // ==========================
// // TRAIN DATA
// // ==========================
// function generateUniqueTrainList(count) {
//     const used = new Set();
//     const list = [];

//     while (list.length < count) {
//         const no = `MH${rand(10000, 99999)}`;
//         if (used.has(no)) continue;

//         const time = `${rand(1,12)}:${rand(0,59)
//             .toString()
//             .padStart(2,"0")} ${Math.random() > 0.5 ? "AM" : "PM"}`;

//         used.add(no);
//         list.push({ no, time });
//     }
//     return list;
// }

// // ==========================
// // CREATE NEAR-FAKE TRAIN
// // ==========================
// function createFakeTrain(existingSet) {
//     while (true) {
//         const fake = `MH${rand(10000, 99999)}`;
//         if (!existingSet.has(fake)) return fake;
//     }
// }

// // ==========================
// // AUTO LAYOUT
// // ==========================
// function calculateLayout(count, reservedTop, reservedBottom) {
//     let fontSize = 9;

//     while (fontSize >= MIN_FONT_SIZE) {
//         const lineHeight = fontSize + LINE_GAP;
//         const usableHeight =
//             HEIGHT - PADDING * 2 - reservedTop - reservedBottom;
//         const usableWidth = WIDTH - PADDING * 2;

//         const rows = Math.floor(usableHeight / lineHeight);
//         const cols = Math.ceil(count / rows);
//         const colWidth = Math.floor(usableWidth / cols);

//         if (rows > 0 && rows * cols >= count && colWidth >= 90) {
//             return { fontSize, rows, cols, colWidth, lineHeight };
//         }
//         fontSize--;
//     }

//     throw new Error("Too many trains to fit");
// }

// // ==========================
// // QUESTION GENERATOR (2 TYPES)
// // ==========================
// function createQuestion(trains) {
//     const trainSet = new Set(trains.map(t => t.no));
//     const mode = Math.random() < 0.5 ? "TIME" : "EXIST";

//     // ------------------
//     // MODE A: TIME
//     // ------------------
//     if (mode === "TIME") {
//         const t = trains[rand(0, trains.length - 1)];
//         const correct = t.time;

//         const fakeTimes = new Set();
//         while (fakeTimes.size < 5) {
//             const tm = `${rand(1,12)}:${rand(0,59)
//                 .toString()
//                 .padStart(2,"0")} ${Math.random() > 0.5 ? "AM" : "PM"}`;
//             if (tm !== correct) fakeTimes.add(tm);
//         }

//         return {
//             type: "TIME",
//             question: `Find the timing for train number ${t.no}`,
//             options: shuffle([correct, ...fakeTimes]),
//             answer: correct
//         };
//     }

//     // ------------------
//     // MODE B: EXISTENCE
//     // ------------------
//     const exists = Math.random() < 0.5;
//     const trainNo = exists
//         ? trains[rand(0, trains.length - 1)].no
//         : createFakeTrain(trainSet);

//     return {
//         type: "EXIST",
//         question: `Does train number ${trainNo} exist in the list?`,
//         options: ["YES", "NO"],
//         answer: exists ? "YES" : "NO"
//     };
// }

// // ==========================
// // DRAW IMAGE
// // ==========================
// function draw(trains, qData) {
//     const QUESTION_SPACE = 12;
//     const OPTION_SPACE = 12;

//     const layout = calculateLayout(
//         trains.length,
//         QUESTION_SPACE,
//         OPTION_SPACE
//     );

//     const canvas = createCanvas(WIDTH, HEIGHT);
//     const ctx = canvas.getContext("2d");

//     ctx.fillStyle = "#fff";
//     ctx.fillRect(0, 0, WIDTH, HEIGHT);

//     ctx.font = `${layout.fontSize}px 'Atkinson Hyperlegible Mono', monospace`;
//     ctx.fillStyle = "#111";
//     ctx.textBaseline = "top";

//     let index = 0;
//     const listStartY = PADDING + QUESTION_SPACE;

//     for (let col = 0; col < layout.cols; col++) {
//         for (let row = 0; row < layout.rows; row++) {
//             if (index >= trains.length) break;

//             const t = trains[index++];
//             ctx.fillText(
//                 `${t.no} : ${t.time}`,
//                 PADDING + col * layout.colWidth,
//                 listStartY + row * layout.lineHeight
//             );
//         }
//     }


//     return canvas.toBuffer("image/png");
// }

// // ==========================
// // MAIN EXPORT
// // ==========================
// export async function generateTrainQuestionImage(level, per
// ) {

//     const data = duff_lelv(per)
//     const numm = data[level]
//     const trains = generateUniqueTrainList(numm);
//     const qData = createQuestion(trains);
//     const buffer = draw(trains, qData);

//     return {
//         base64Image: buffer.toString("base64"),
//         questionType: qData.type,
//         question: qData.question,
//         options: qData.options,
//         answer: qData.answer,
//         difficulty: "very-high-visual-scan"
//     };
// }



























// import { createCanvas, registerFont } from "canvas";
// import fs from "fs";

// // ==========================
// // FONT
// // ==========================
// const FONT_PATH = "./fonts/AtkinsonHyperlegibleMono-Bold.ttf";

// if (fs.existsSync(FONT_PATH)) {
//     registerFont(FONT_PATH, { family: "Atkinson Hyperlegible Mono" });
// }


// const WIDTH = 400;
// const HEIGHT = 250;

// const MIN_FONT_SIZE = 8;
// const LINE_GAP = 1;
// const PADDING = 2;

// // ==========================
// // UTILS
// // ==========================

// function duff_lelv(per){
//     let diff = {}

//     if(per < 5){
//         diff = {
//             "Too Easy" : 5,
//             "Easy" : 10,
//             "Medium" : 15,
//             "Tough" : 20,
//             "Too Tough" : 25 
//         }
//     }else if(per < 10){
//         diff = {
//             "Too Easy" : 10,
//             "Easy" : 15,
//             "Medium" : 20,
//             "Tough" : 25,
//             "Too Tough" : 30 
//         }
//     }else if(per < 15){
//         diff = {
//             "Too Easy" : 15,
//             "Easy" : 20,
//             "Medium" : 25,
//             "Tough" : 30,
//             "Too Tough" : 35 
//         }
//     }else if(per < 20){
//         diff = {
//             "Too Easy" : 20,
//             "Easy" : 25,
//             "Medium" : 30,
//             "Tough" : 35,
//             "Too Tough" : 40 
//         }
//     }else if(per < 25){
//         diff = {
//             "Too Easy" : 25,
//             "Easy" : 30,
//             "Medium" : 35,
//             "Tough" : 40,
//             "Too Tough" : 45 
//         }
//     }else if(per < 30){
//         diff = {
//             "Too Easy" : 30,
//             "Easy" : 35,
//             "Medium" : 40,
//             "Tough" : 45,
//             "Too Tough" : 50 
//         }
//     }else if(per < 35){
//         diff = {
//             "Too Easy" : 35,
//             "Easy" : 40,
//             "Medium" : 45,
//             "Tough" : 50,
//             "Too Tough" : 55 
//         }
//     }else if(per < 40){
//         diff = {
//             "Too Easy" : 40,
//             "Easy" : 45,
//             "Medium" : 50,
//             "Tough" : 55,
//             "Too Tough" : 60 
//         }
//     }else if(per < 45){
//         diff = {
//             "Too Easy" : 45,
//             "Easy" : 50,
//             "Medium" : 55,
//             "Tough" : 60,
//             "Too Tough" : 65 
//         }
//     }else if(per < 50){
//         diff = {
//             "Too Easy" : 50,
//             "Easy" : 55,
//             "Medium" : 60,
//             "Tough" : 65,
//             "Too Tough" : 70 
//         }
//     }else{
//         diff = {
//             "Too Easy" : 55,
//             "Easy" : 60,
//             "Medium" : 65,
//             "Tough" : 70,
//             "Too Tough" : 75 
//         }
//     }

//     return diff
// }



// const rand = (min, max) =>
//     Math.floor(Math.random() * (max - min + 1)) + min;

// const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

// // ==========================
// // TRAIN DATA
// // ==========================
// function generateUniqueTrainList(count) {
//     const used = new Set();
//     const list = [];

//     while (list.length < count) {
//         const no = `MH${rand(10000, 99999)}`;
//         if (used.has(no)) continue;

//         const time = `${rand(1,12)}:${rand(0,59)
//             .toString()
//             .padStart(2,"0")} ${Math.random() > 0.5 ? "AM" : "PM"}`;

//         used.add(no);
//         list.push({ no, time });
//     }
//     return list;
// }

// // ==========================
// // CREATE NEAR-FAKE TRAIN
// // ==========================
// function createFakeTrain(existingSet) {
//     while (true) {
//         const fake = `MH${rand(10000, 99999)}`;
//         if (!existingSet.has(fake)) return fake;
//     }
// }

// // ==========================
// // AUTO LAYOUT
// // ==========================
// function calculateLayout(count, reservedTop, reservedBottom) {
//     let fontSize = 9;

//     while (fontSize >= MIN_FONT_SIZE) {
//         const lineHeight = fontSize + LINE_GAP;
//         const usableHeight =
//             HEIGHT - PADDING * 2 - reservedTop - reservedBottom;
//         const usableWidth = WIDTH - PADDING * 2;

//         const rows = Math.floor(usableHeight / lineHeight);
//         const cols = Math.ceil(count / rows);
//         const colWidth = Math.floor(usableWidth / cols);

//         if (rows > 0 && rows * cols >= count && colWidth >= 90) {
//             return { fontSize, rows, cols, colWidth, lineHeight };
//         }
//         fontSize--;
//     }

//     throw new Error("Too many trains to fit");
// }

// // ==========================
// // QUESTION GENERATOR (2 TYPES)
// // ==========================
// function createQuestion(trains) {
//     const trainSet = new Set(trains.map(t => t.no));
//     const mode = Math.random() < 0.5 ? "TIME" : "EXIST";

//     // ------------------
//     // MODE A: TIME
//     // ------------------
//     if (mode === "TIME") {
//         const t = trains[rand(0, trains.length - 1)];
//         const correct = t.time;

//         const fakeTimes = new Set();
//         while (fakeTimes.size < 5) {
//             const tm = `${rand(1,12)}:${rand(0,59)
//                 .toString()
//                 .padStart(2,"0")} ${Math.random() > 0.5 ? "AM" : "PM"}`;
//             if (tm !== correct) fakeTimes.add(tm);
//         }

//         return {
//             type: "TIME",
//             question: `Find the timing for train number ${t.no}`,
//             options: shuffle([correct, ...fakeTimes]),
//             answer: correct
//         };
//     }

//     // ------------------
//     // MODE B: EXISTENCE
//     // ------------------
//     const exists = Math.random() < 0.5;
//     const trainNo = exists
//         ? trains[rand(0, trains.length - 1)].no
//         : createFakeTrain(trainSet);

//     return {
//         type: "EXIST",
//         question: `Does train number ${trainNo} exist in the list?`,
//         options: ["YES", "NO"],
//         answer: exists ? "YES" : "NO"
//     };
// }

// // ==========================
// // DRAW IMAGE
// // ==========================
// function draw(trains, qData) {
//     const QUESTION_SPACE = 12;
//     const OPTION_SPACE = 12;

//     const layout = calculateLayout(
//         trains.length,
//         QUESTION_SPACE,
//         OPTION_SPACE
//     );

//     const canvas = createCanvas(WIDTH, HEIGHT);
//     const ctx = canvas.getContext("2d");

//     ctx.fillStyle = "#fff";
//     ctx.fillRect(0, 0, WIDTH, HEIGHT);

//     ctx.font = `${layout.fontSize}px 'Atkinson Hyperlegible Mono', monospace`;
//     ctx.fillStyle = "#111";
//     ctx.textBaseline = "top";

//     let index = 0;
//     const listStartY = PADDING + QUESTION_SPACE;

//     for (let col = 0; col < layout.cols; col++) {
//         for (let row = 0; row < layout.rows; row++) {
//             if (index >= trains.length) break;

//             const t = trains[index++];
//             ctx.fillText(
//                 `${t.no} : ${t.time}`,
//                 PADDING + col * layout.colWidth,
//                 listStartY + row * layout.lineHeight
//             );
//         }
//     }


//     return canvas.toBuffer("image/png");
// }

// // ==========================
// // MAIN EXPORT
// // ==========================
// export async function generateTrainQuestionImage(level, per
// ) {

//     const data = duff_lelv(per)
//     const numm = data[level]
//     const trains = generateUniqueTrainList(numm);
//     const qData = createQuestion(trains);
//     const buffer = draw(trains, qData);

//     return {
//         base64Image: buffer.toString("base64"),
//         questionType: qData.type,
//         question: qData.question,
//         options: qData.options,
//         answer: qData.answer,
//         difficulty: "very-high-visual-scan"
//     };
// }



















import { createCanvas, registerFont } from "canvas";
import fs from "fs";

// ==========================
// FONT
// ==========================



const WIDTH = 400;
const HEIGHT = 250;

const MIN_FONT_SIZE = 8;
const LINE_GAP = 1;
const PADDING = 2;

// ==========================
// UTILS
// ==========================

function duff_lelv(per) {
    let diff = {}

    if (per < 5) {
        diff = {
            "Too Easy": 56,
            "Easy": 60,
            "Medium": 65,
            "Tough": 70,
            "Too Tough": 80
        }
    } else if (per < 10) {
        diff = {
            "Too Easy": 10,
            "Easy": 15,
            "Medium": 20,
            "Tough": 25,
            "Too Tough": 30
        }
    } else if (per < 15) {
        diff = {
            "Too Easy": 15,
            "Easy": 20,
            "Medium": 25,
            "Tough": 30,
            "Too Tough": 35
        }
    } else if (per < 20) {
        diff = {
            "Too Easy": 20,
            "Easy": 25,
            "Medium": 30,
            "Tough": 35,
            "Too Tough": 40
        }
    } else if (per < 25) {
        diff = {
            "Too Easy": 25,
            "Easy": 30,
            "Medium": 35,
            "Tough": 40,
            "Too Tough": 45
        }
    } else if (per < 30) {
        diff = {
            "Too Easy": 30,
            "Easy": 35,
            "Medium": 40,
            "Tough": 45,
            "Too Tough": 50
        }
    } else if (per < 35) {
        diff = {
            "Too Easy": 35,
            "Easy": 40,
            "Medium": 45,
            "Tough": 50,
            "Too Tough": 55
        }
    } else if (per < 40) {
        diff = {
            "Too Easy": 40,
            "Easy": 45,
            "Medium": 50,
            "Tough": 55,
            "Too Tough": 60
        }
    } else if (per < 45) {
        diff = {
            "Too Easy": 45,
            "Easy": 50,
            "Medium": 55,
            "Tough": 60,
            "Too Tough": 65
        }
    } else if (per < 50) {
        diff = {
            "Too Easy": 50,
            "Easy": 55,
            "Medium": 60,
            "Tough": 65,
            "Too Tough": 70
        }
    } else {
        diff = {
            "Too Easy": 55,
            "Easy": 60,
            "Medium": 65,
            "Tough": 70,
            "Too Tough": 75
        }
    }

    return diff
}



const rand = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

// ==========================
// TRAIN DATA
// ==========================
function generateUniqueTrainList(count) {
    const used = new Set();
    const list = [];

    while (list.length < count) {
        const no = `MH${rand(10000, 99999)}`;
        if (used.has(no)) continue;

        const time = `${rand(1, 12)}:${rand(0, 59)
            .toString()
            .padStart(2, "0")} ${Math.random() > 0.5 ? "AM" : "PM"}`;

        used.add(no);
        list.push({ no, time });
    }
    return list;
}

// ==========================
// CREATE NEAR-FAKE TRAIN
// ==========================
function createFakeTrain(existingSet) {
    while (true) {
        const fake = `MH${rand(10000, 99999)}`;
        if (!existingSet.has(fake)) return fake;
    }
}

// ==========================
// AUTO LAYOUT
// ==========================
function calculateLayout(count, reservedTop, reservedBottom) {
    let fontSize = 9;

    while (fontSize >= MIN_FONT_SIZE) {
        const lineHeight = fontSize + LINE_GAP;
        const usableHeight =
            HEIGHT - PADDING * 2 - reservedTop - reservedBottom;
        const usableWidth = WIDTH - PADDING * 2;

        const rows = Math.floor(usableHeight / lineHeight);
        const cols = Math.ceil(count / rows);
        const colWidth = Math.floor(usableWidth / cols);

        if (rows > 0 && rows * cols >= count && colWidth >= 90) {
            return { fontSize, rows, cols, colWidth, lineHeight };
        }
        fontSize--;
    }

    throw new Error("Too many trains to fit");
}


function createNearTime(correct, step = 1) {
    const [time, meridian] = correct.split(" ");
    let [h, m] = time.split(":").map(Number);

    m += step;

    if (m < 0) m += 60;
    if (m >= 60) m -= 60;

    return `${h}:${m.toString().padStart(2, "0")} ${meridian}`;
}

// ==========================
// QUESTION GENERATOR (2 TYPES)
// ==========================
function createQuestion(trains) {
    const trainSet = new Set(trains.map(t => t.no));
    const mode = Math.random() < 0.5 ? "TIME" : "EXIST";

    // ==================
    // MODE A: TIME
    // ==================
    if (mode === "TIME") {
        const t = trains[rand(0, trains.length - 1)];
        const correct = t.time;

        const fakeTimes = new Set();

        // generate very similar options
        let step = 1;
        while (fakeTimes.size < 5) {
            const near = createNearTime(
                correct,
                Math.random() < 0.5 ? step : -step
            );

            if (near !== correct) {
                fakeTimes.add(near);
                step++;
            }
        }

        return {
            type: "TIME",
            question: `Find the timing for train number ${t.no}`,
            options: shuffle([correct, ...fakeTimes]),
            answer: correct,
            confused: true
        };
    }


    // ==================
    // MODE B: EXIST
    // ==================
    const exists = Math.random() < 0.5;
    const trainNo = exists
        ? trains[rand(0, trains.length - 1)].no
        : createFakeTrain(trainSet);

    return {
        type: "EXIST",
        question: `Does train number ${trainNo} exist in the list?`,
        options: ["YES", "NO"],
        answer: exists ? "YES" : "NO"
    };
}

// ==========================
// DRAW IMAGE
// ==========================
function draw(trains, qData) {
    const QUESTION_SPACE = 12;
    const OPTION_SPACE = 12;

    const layout = calculateLayout(
        trains.length,
        QUESTION_SPACE,
        OPTION_SPACE
    );

    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.font = "22px monospace";
    ctx.fillStyle = "#111";
    ctx.textBaseline = "top";

    let index = 0;
    const listStartY = PADDING + QUESTION_SPACE;

    for (let col = 0; col < layout.cols; col++) {
        for (let row = 0; row < layout.rows; row++) {
            if (index >= trains.length) break;

            const t = trains[index++];
            ctx.fillText(
                `${t.no} : ${t.time}`,
                PADDING + col * layout.colWidth,
                listStartY + row * layout.lineHeight
            );
        }
    }


    return canvas.toBuffer("image/png");
}

// ==========================
// MAIN EXPORT
// ==========================
export async function generateTrainQuestionImage(level, per
) {

    const data = duff_lelv(per)
    const numm = data[level]
    const trains = generateUniqueTrainList(numm);
    const qData = createQuestion(trains);
    const buffer = draw(trains, qData);

    return {
        base64Image: buffer.toString("base64"),
        questionType: qData.type,
        question: qData.question,
        options: qData.options,
        answer: qData.answer,
        difficulty: "very-high-visual-scan"
    };
}
