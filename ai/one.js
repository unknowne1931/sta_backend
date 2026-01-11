import { createCanvas } from "canvas";
import axios from "axios";
import FormData from "form-data";



const WIDTH = 400;
const HEIGHT = 250;

const SHAPES = ["circle", "star", "triangle"];

export function getDifficultiesByPer(per) {
    let DIFFICULTIES = {};

    if(per < 10){
        DIFFICULTIES = {
            "Too Easy" : { boxes : [6, 8], size : [40, 50], broken: [0, 0]},
            "Easy" : { boxes : [8, 10], size : [40, 50], broken: [0, 0]},
            "Medium" : { boxes : [10, 12], size : [40, 50], broken: [0, 0]},
            "Tough" : { boxes : [12, 14], size : [40, 50], broken: [0, 0]},
            "Too Tough" : { boxes : [14, 16], size : [40, 50], broken: [0, 0]},
        }
    }else if(per < 20){
        DIFFICULTIES = {
            "Too Easy" : { boxes : [9, 11], size : [40, 50], broken: [0, 0]},
            "Easy" : { boxes : [11, 13], size : [40, 50], broken: [0, 0]},
            "Medium" : { boxes : [13, 15], size : [40, 50], broken: [0, 0]},
            "Tough" : { boxes : [15, 17], size : [20, 30], broken: [0, 0]},
            "Too Tough" : { boxes : [17, 19], size : [20, 30], broken: [0, 0]},
        }
    }else if(per < 30){
        DIFFICULTIES = {
            "Too Easy" : { boxes : [12, 14], size : [40, 50], broken: [0, 0]},
            "Easy" : { boxes : [14, 16], size : [40, 50], broken: [2, 6]},
            "Medium" : { boxes : [16, 18], size : [40, 50], broken: [2, 8]},
            "Tough" : { boxes : [18, 20], size : [20, 30], broken: [2, 8]},
            "Too Tough" : { boxes : [20, 22], size : [20, 30], broken: [2, 8]},
        }
    }else if(per < 40){
        DIFFICULTIES = {
            "Too Easy" : { boxes : [16, 18], size : [20, 30], broken: [0, 0]},
            "Easy" : { boxes : [18, 20], size : [20, 30], broken: [5, 10]},
            "Medium" : { boxes : [20, 22], size : [20, 30], broken: [5, 10]},
            "Tough" : { boxes : [22, 24], size : [20, 30], broken: [5, 10]},
            "Too Tough" : { boxes : [24, 26], size : [20, 30], broken: [5, 10]},
        }
    }else if(per < 50){
        DIFFICULTIES = {
            "Too Easy" : { boxes : [19, 21], size : [20, 30], broken: [0, 0]},
            "Easy" : { boxes : [21, 23], size : [20, 30], broken: [8, 16]},
            "Medium" : { boxes : [23, 25], size : [20, 30], broken: [8, 16]},
            "Tough" : { boxes : [25, 27], size : [20, 30], broken: [8, 16]},
            "Too Tough" : { boxes : [27, 29], size : [20, 30], broken: [8, 16]},
        }
    }else if(per < 60){
        DIFFICULTIES = {
            "Too Easy" : { boxes : [22, 24], size : [20, 30], broken: [0, 0]},
            "Easy" : { boxes : [24, 26], size : [20, 30], broken: [10, 19]},
            "Medium" : { boxes : [26, 28], size : [20, 30], broken: [10, 19]},
            "Tough" : { boxes : [28, 30], size : [20, 30], broken: [10, 19]},
            "Too Tough" : { boxes : [30, 32], size : [20, 30], broken: [10, 19]},
        }
    }else if(per < 70){
        DIFFICULTIES = {
            "Too Easy" : { boxes : [25, 27], size : [20, 30], broken: [10, 18]},
            "Easy" : { boxes : [27, 29], size : [20, 30], broken: [10, 19]},
            "Medium" : { boxes : [29, 31], size : [20, 30], broken: [10, 19]},
            "Tough" : { boxes : [31, 33], size : [20, 30], broken: [10, 19]},
            "Too Tough" : { boxes : [33, 35], size : [20, 30], broken: [10, 19]},
        }
    }else if(per < 80){
        DIFFICULTIES = {
            "Too Easy" : { boxes : [28, 30], size : [10, 20], broken: [10, 18]},
            "Easy" : { boxes : [30, 32], size : [10, 20], broken: [10, 19]},
            "Medium" : { boxes : [32, 34], size : [10, 20], broken: [10, 19]},
            "Tough" : { boxes : [34, 36], size : [10, 20], broken: [10, 19]},
            "Too Tough" : { boxes : [36, 38], size : [10, 20], broken: [10, 19]},
        }
    }else if(per < 90){
        DIFFICULTIES = {
            "Too Easy" : { boxes : [31, 33], size : [10, 20], broken: [10, 18]},
            "Easy" : { boxes : [33, 35], size : [10, 20], broken: [10, 19]},
            "Medium" : { boxes : [35, 37], size : [10, 20], broken: [10, 19]},
            "Tough" : { boxes : [37, 39], size : [10, 20], broken: [10, 19]},
            "Too Tough" : { boxes : [39, 41], size : [10, 20], broken: [10, 19]},
        }
    }else {
        DIFFICULTIES = {
            "Too Easy" : { boxes : [34, 36], size : [10, 20], broken: [10, 18]},
            "Easy" : { boxes : [36, 38], size : [10, 20], broken: [10, 19]},
            "Medium" : { boxes : [38, 40], size : [10, 20], broken: [10, 19]},
            "Tough" : { boxes : [40, 42], size : [10, 20], broken: [10, 19]},
            "Too Tough" : { boxes : [42, 44], size : [10, 20], broken: [10, 19]},
        }
    }

    // if (per < 10) {
    //     DIFFICULTIES = {
    //         "Too Easy":  { boxes: [6, 8],  size: [40, 50], broken: [0, 0] },
    //         "Easy":      { boxes: [8, 10], size: [35, 45], broken: [0, 0] },
    //         "Medium":    { boxes: [10, 14], size: [30, 42], broken: [0, 0] },
    //         "Tough":     { boxes: [12, 16], size: [28, 38], broken: [0, 0] },
    //         "Too Tough": { boxes: [16, 20], size: [25, 35], broken: [2, 3] },
    //     };
    // } else if (per < 20) {
    //     DIFFICULTIES = {
    //         "Too Easy":  { boxes: [7, 9],   size: [38, 48], broken: [0, 0] },
    //         "Easy":      { boxes: [9, 11],  size: [34, 44], broken: [0, 0] },
    //         "Medium":    { boxes: [14, 17], size: [30, 40], broken: [0, 1] },
    //         "Tough":     { boxes: [16, 19], size: [27, 36], broken: [0, 1] },
    //         "Too Tough": { boxes: [20, 24], size: [22, 32], broken: [3, 4] },
    //     };
    // } else if (per < 40) {
    //     DIFFICULTIES = {
    //         "Too Easy":  { boxes: [8, 10],  size: [37, 47], broken: [0, 0] },
    //         "Easy":      { boxes: [11, 13], size: [34, 44], broken: [0, 0] },
    //         "Medium":    { boxes: [17, 20], size: [28, 38], broken: [0, 0] },
    //         "Tough":     { boxes: [19, 22], size: [25, 35], broken: [2, 3] },
    //         "Too Tough": { boxes: [24, 28], size: [22, 30], broken: [3, 5] },
    //     };
    // } else if (per < 60) {
    //     DIFFICULTIES = {
    //         "Too Easy":  { boxes: [10, 12],  size: [30, 40], broken: [0, 0] },
    //         "Easy":      { boxes: [13, 15], size: [33, 43], broken: [0, 1] },
    //         "Medium":    { boxes: [20, 22], size: [28, 38], broken: [1, 3] },
    //         "Tough":     { boxes: [22, 24], size: [25, 35], broken: [2, 4] },
    //         "Too Tough": { boxes: [28, 34], size: [20, 32], broken: [7, 8] },
    //     };
    // } else {
    //     // High performance: max challenge
    //     DIFFICULTIES = {
    //         "Too Easy":  { boxes: [12, 14],  size: [20, 20], broken: [0, 1] },
    //         "Easy":      { boxes: [15, 20], size: [25, 30], broken: [1, 2] },
    //         "Medium":    { boxes: [15, 20], size: [28, 36], broken: [2, 3] },
    //         "Tough":     { boxes: [18, 23], size: [24, 34], broken: [3, 5] },
    //         "Too Tough": { boxes: [30, 40], size: [20, 30], broken: [9, 10] },
    //     };
    // }

    return DIFFICULTIES;
}


const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

// ----------------------------------------------
// box + drawing logic
// ----------------------------------------------
export function overlap(a, b) {
    return !(a.x + a.w < b.x || a.x > b.x + b.w || a.y + a.h < b.y || a.y > b.y + b.h);
}

export function drawStar(ctx, x, y, size) {
    const spikes = 5;
    const outerRadius = size / 2;
    const innerRadius = outerRadius / 2.5;
    let rot = Math.PI / 2 * 3;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(x, y - outerRadius);

    for (let i = 0; i < spikes; i++) {
        ctx.lineTo(x + Math.cos(rot) * outerRadius, y + Math.sin(rot) * outerRadius);
        rot += step;
        ctx.lineTo(x + Math.cos(rot) * innerRadius, y + Math.sin(rot) * innerRadius);
        rot += step;
    }

    ctx.closePath();
    ctx.stroke();
}

export function drawBoxBorderWithGap(ctx, x, y, size, hasGap) {
    const gapEdge = hasGap ? rand(0, 3) : -1;
    const gapSize = hasGap ? Math.floor(size * (Math.random() * 0.05 + 0.05)) : 0;
    const gapPos = hasGap ? rand(5, size - gapSize - 5) : 0;

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;

    ctx.beginPath();
    if (gapEdge === 0) {
        ctx.moveTo(x, y);
        ctx.lineTo(x + gapPos, y);
        ctx.moveTo(x + gapPos + gapSize, y);
        ctx.lineTo(x + size, y);
    } else ctx.strokeRect(x, y, size, 0);
    ctx.stroke();

    ctx.beginPath();
    if (gapEdge === 1) {
        ctx.moveTo(x + size, y);
        ctx.lineTo(x + size, y + gapPos);
        ctx.moveTo(x + size, y + gapPos + gapSize);
        ctx.lineTo(x + size, y + size);
    } else ctx.strokeRect(x + size, y, 0, size);
    ctx.stroke();

    ctx.beginPath();
    if (gapEdge === 2) {
        ctx.moveTo(x, y + size);
        ctx.lineTo(x + gapPos, y + size);
        ctx.moveTo(x + gapPos + gapSize, y + size);
        ctx.lineTo(x + size, y + size);
    } else ctx.strokeRect(x, y + size, size, 0);
    ctx.stroke();

    ctx.beginPath();
    if (gapEdge === 3) {
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + gapPos);
        ctx.moveTo(x, y + gapPos + gapSize);
        ctx.lineTo(x, y + size);
    } else ctx.strokeRect(x, y, 0, size);
    ctx.stroke();
}

export function generateBoxesData(difficulty) {
    if (!difficulty) return [];   // ✅ FIX: prevent undefined access

    const boxesData = [];
    const total = rand(...difficulty.boxes);
    let brokenLeft = rand(...difficulty.broken);

    let tries = 0;
    while (boxesData.length < total && tries < 5000) {
        const size = rand(...difficulty.size);
        const x = rand(4, WIDTH - size - 4);
        const y = rand(4, HEIGHT - size - 4);
        const test = { x, y, w: size, h: size };

        if (!boxesData.some(b => overlap(test, b))) {
            const shape = SHAPES[rand(0, SHAPES.length - 1)];
            let complete = true;
            if (brokenLeft > 0) {
                complete = false;
                brokenLeft--;
            }
            boxesData.push({ ...test, shape, complete });
        }
        tries++;
    }
    return boxesData;
}

export function drawImage(boxesData) {
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    boxesData.forEach(b => {
        drawBoxBorderWithGap(ctx, b.x, b.y, b.w, !b.complete);

        ctx.strokeStyle = "#000";
        if (b.shape === "circle") {
            ctx.beginPath();
            ctx.arc(b.x + b.w / 2, b.y + b.h / 2, b.w * 0.25, 0, Math.PI * 2);
            ctx.stroke();
        }
        if (b.shape === "triangle") {
            ctx.beginPath();
            ctx.moveTo(b.x + b.w / 2, b.y + b.h * 0.25);
            ctx.lineTo(b.x + b.w * 0.75, b.y + b.h * 0.75);
            ctx.lineTo(b.x + b.w * 0.25, b.y + b.h * 0.75);
            ctx.closePath();
            ctx.stroke();
        }
        if (b.shape === "star") drawStar(ctx, b.x + b.w / 2, b.y + b.h / 2, b.w * 0.7);
    });

    return canvas.toBuffer("image/png");
}

// ----------------------------------------------
//manual ss upload
// export async function uploadImage(buffer) {
//     const form = new FormData();
//     form.append("screenshot", buffer, "screenshot.png");

//     const res = await axios.post(
//         "https://backend.stawro.com/stawro/upload.php",
//         form,
//         { headers: form.getHeaders() }
//     );

//     return res.data;
// }



// convert PNG buffer → base64 instead of uploading
export async function uploadImage(buffer) {
    try {
        // buffer → base64 string
        const base64String = buffer.toString("base64");

        // full data URI (can be shown directly in <img src="...">)
        // const imageDataUri = `data:image/png;base64,${base64String}`;
        const imageDataUri = base64String;

        return {
            image: imageDataUri
        };

    } catch (err) {
        return {
            status: "error",
            message: err.message
        };
    }
}



// export function getBase64Image(buffer) {
//     // convert PNG buffer → base64 string
//     const base64 = buffer.toString("base64");

//     // browser-ready <img src="...">
//     const imageData = `data:image/png;base64,${base64}`;

//     return {
//         base64,     // plain base64 string
//         imageData   // usable directly in <img src="...">
//     };
// }


// ----------------------------------------------
export function generateOptions(correct) {
    const set = new Set([correct]);
    let i = 1;
    while (set.size < 4) {
        if (correct + i >= 0) set.add(correct + i);
        if (correct - i >= 0) set.add(correct - i);
        i++;
    }
    return [...set].sort(() => Math.random() - 0.5);
}

export function pickValidShape(boxes) {
    const pool = boxes.filter(b => b.complete);
    const shapes = [...new Set(pool.map(b => b.shape))];
    return shapes.length === 0 ? null : shapes[rand(0, shapes.length - 1)];
}