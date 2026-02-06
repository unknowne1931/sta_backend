// // import { createCanvas } from "canvas";
// // import axios from "axios";
// // import FormData from "form-data";



// // const WIDTH = 400;
// // const HEIGHT = 250;

// // const SHAPES = ["circle", "star", "triangle"];

// // export function getDifficultiesByPer(per) {
// //     let DIFFICULTIES = {};

// //     if(per < 10){
// //         DIFFICULTIES = {
// //             "Too Easy" : { boxes : [6, 8], size : [40, 50], broken: [0, 0]},
// //             "Easy" : { boxes : [8, 10], size : [40, 50], broken: [0, 0]},
// //             "Medium" : { boxes : [10, 12], size : [40, 50], broken: [0, 0]},
// //             "Tough" : { boxes : [12, 14], size : [40, 50], broken: [0, 0]},
// //             "Too Tough" : { boxes : [14, 16], size : [40, 50], broken: [0, 0]},
// //         }
// //     }else if(per < 20){
// //         DIFFICULTIES = {
// //             "Too Easy" : { boxes : [9, 11], size : [40, 50], broken: [0, 0]},
// //             "Easy" : { boxes : [11, 13], size : [40, 50], broken: [0, 0]},
// //             "Medium" : { boxes : [13, 15], size : [40, 50], broken: [0, 0]},
// //             "Tough" : { boxes : [15, 17], size : [20, 30], broken: [0, 0]},
// //             "Too Tough" : { boxes : [17, 19], size : [20, 30], broken: [0, 0]},
// //         }
// //     }else if(per < 30){
// //         DIFFICULTIES = {
// //             "Too Easy" : { boxes : [12, 14], size : [40, 50], broken: [0, 0]},
// //             "Easy" : { boxes : [14, 16], size : [40, 50], broken: [2, 6]},
// //             "Medium" : { boxes : [16, 18], size : [40, 50], broken: [2, 8]},
// //             "Tough" : { boxes : [18, 20], size : [20, 30], broken: [2, 8]},
// //             "Too Tough" : { boxes : [20, 22], size : [20, 30], broken: [2, 8]},
// //         }
// //     }else if(per < 40){
// //         DIFFICULTIES = {
// //             "Too Easy" : { boxes : [16, 18], size : [20, 30], broken: [0, 0]},
// //             "Easy" : { boxes : [18, 20], size : [20, 30], broken: [5, 10]},
// //             "Medium" : { boxes : [20, 22], size : [20, 30], broken: [5, 10]},
// //             "Tough" : { boxes : [22, 24], size : [20, 30], broken: [5, 10]},
// //             "Too Tough" : { boxes : [24, 26], size : [20, 30], broken: [5, 10]},
// //         }
// //     }else if(per < 50){
// //         DIFFICULTIES = {
// //             "Too Easy" : { boxes : [19, 21], size : [20, 30], broken: [0, 0]},
// //             "Easy" : { boxes : [21, 23], size : [20, 30], broken: [8, 16]},
// //             "Medium" : { boxes : [23, 25], size : [20, 30], broken: [8, 16]},
// //             "Tough" : { boxes : [25, 27], size : [20, 30], broken: [8, 16]},
// //             "Too Tough" : { boxes : [27, 29], size : [20, 30], broken: [8, 16]},
// //         }
// //     }else if(per < 60){
// //         DIFFICULTIES = {
// //             "Too Easy" : { boxes : [22, 24], size : [20, 30], broken: [0, 0]},
// //             "Easy" : { boxes : [24, 26], size : [20, 30], broken: [10, 19]},
// //             "Medium" : { boxes : [26, 28], size : [20, 30], broken: [10, 19]},
// //             "Tough" : { boxes : [28, 30], size : [20, 30], broken: [10, 19]},
// //             "Too Tough" : { boxes : [30, 32], size : [20, 30], broken: [10, 19]},
// //         }
// //     }else if(per < 70){
// //         DIFFICULTIES = {
// //             "Too Easy" : { boxes : [25, 27], size : [20, 30], broken: [10, 18]},
// //             "Easy" : { boxes : [27, 29], size : [20, 30], broken: [10, 19]},
// //             "Medium" : { boxes : [29, 31], size : [20, 30], broken: [10, 19]},
// //             "Tough" : { boxes : [31, 33], size : [20, 30], broken: [10, 19]},
// //             "Too Tough" : { boxes : [33, 35], size : [20, 30], broken: [10, 19]},
// //         }
// //     }else if(per < 80){
// //         DIFFICULTIES = {
// //             "Too Easy" : { boxes : [28, 30], size : [10, 20], broken: [10, 18]},
// //             "Easy" : { boxes : [30, 32], size : [10, 20], broken: [10, 19]},
// //             "Medium" : { boxes : [32, 34], size : [10, 20], broken: [10, 19]},
// //             "Tough" : { boxes : [34, 36], size : [10, 20], broken: [10, 19]},
// //             "Too Tough" : { boxes : [36, 38], size : [10, 20], broken: [10, 19]},
// //         }
// //     }else if(per < 90){
// //         DIFFICULTIES = {
// //             "Too Easy" : { boxes : [31, 33], size : [10, 20], broken: [10, 18]},
// //             "Easy" : { boxes : [33, 35], size : [10, 20], broken: [10, 19]},
// //             "Medium" : { boxes : [35, 37], size : [10, 20], broken: [10, 19]},
// //             "Tough" : { boxes : [37, 39], size : [10, 20], broken: [10, 19]},
// //             "Too Tough" : { boxes : [39, 41], size : [10, 20], broken: [10, 19]},
// //         }
// //     }else {
// //         DIFFICULTIES = {
// //             "Too Easy" : { boxes : [34, 36], size : [10, 20], broken: [10, 18]},
// //             "Easy" : { boxes : [36, 38], size : [10, 20], broken: [10, 19]},
// //             "Medium" : { boxes : [38, 40], size : [10, 20], broken: [10, 19]},
// //             "Tough" : { boxes : [40, 42], size : [10, 20], broken: [10, 19]},
// //             "Too Tough" : { boxes : [42, 44], size : [10, 20], broken: [10, 19]},
// //         }
// //     }


// //     return DIFFICULTIES;
// // }


// // const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

// // // ----------------------------------------------
// // // box + drawing logic
// // // ----------------------------------------------
// // export function overlap(a, b) {
// //     return !(a.x + a.w < b.x || a.x > b.x + b.w || a.y + a.h < b.y || a.y > b.y + b.h);
// // }

// // export function drawStar(ctx, x, y, size) {
// //     const spikes = 5;
// //     const outerRadius = size / 2;
// //     const innerRadius = outerRadius / 2.5;
// //     let rot = Math.PI / 2 * 3;
// //     const step = Math.PI / spikes;

// //     ctx.beginPath();
// //     ctx.moveTo(x, y - outerRadius);

// //     for (let i = 0; i < spikes; i++) {
// //         ctx.lineTo(x + Math.cos(rot) * outerRadius, y + Math.sin(rot) * outerRadius);
// //         rot += step;
// //         ctx.lineTo(x + Math.cos(rot) * innerRadius, y + Math.sin(rot) * innerRadius);
// //         rot += step;
// //     }

// //     ctx.closePath();
// //     ctx.stroke();
// // }

// // export function drawBoxBorderWithGap(ctx, x, y, size, hasGap) {
// //     const gapEdge = hasGap ? rand(0, 3) : -1;
// //     const gapSize = hasGap ? Math.floor(size * (Math.random() * 0.05 + 0.05)) : 0;
// //     const gapPos = hasGap ? rand(5, size - gapSize - 5) : 0;

// //     ctx.strokeStyle = "#000";
// //     ctx.lineWidth = 2;

// //     ctx.beginPath();
// //     if (gapEdge === 0) {
// //         ctx.moveTo(x, y);
// //         ctx.lineTo(x + gapPos, y);
// //         ctx.moveTo(x + gapPos + gapSize, y);
// //         ctx.lineTo(x + size, y);
// //     } else ctx.strokeRect(x, y, size, 0);
// //     ctx.stroke();

// //     ctx.beginPath();
// //     if (gapEdge === 1) {
// //         ctx.moveTo(x + size, y);
// //         ctx.lineTo(x + size, y + gapPos);
// //         ctx.moveTo(x + size, y + gapPos + gapSize);
// //         ctx.lineTo(x + size, y + size);
// //     } else ctx.strokeRect(x + size, y, 0, size);
// //     ctx.stroke();

// //     ctx.beginPath();
// //     if (gapEdge === 2) {
// //         ctx.moveTo(x, y + size);
// //         ctx.lineTo(x + gapPos, y + size);
// //         ctx.moveTo(x + gapPos + gapSize, y + size);
// //         ctx.lineTo(x + size, y + size);
// //     } else ctx.strokeRect(x, y + size, size, 0);
// //     ctx.stroke();

// //     ctx.beginPath();
// //     if (gapEdge === 3) {
// //         ctx.moveTo(x, y);
// //         ctx.lineTo(x, y + gapPos);
// //         ctx.moveTo(x, y + gapPos + gapSize);
// //         ctx.lineTo(x, y + size);
// //     } else ctx.strokeRect(x, y, 0, size);
// //     ctx.stroke();
// // }

// // export function generateBoxesData(difficulty) {
// //     if (!difficulty) return [];   // ✅ FIX: prevent undefined access

// //     const boxesData = [];
// //     const total = rand(...difficulty.boxes);
// //     let brokenLeft = rand(...difficulty.broken);

// //     let tries = 0;
// //     while (boxesData.length < total && tries < 5000) {
// //         const size = rand(...difficulty.size);
// //         const x = rand(4, WIDTH - size - 4);
// //         const y = rand(4, HEIGHT - size - 4);
// //         const test = { x, y, w: size, h: size };

// //         if (!boxesData.some(b => overlap(test, b))) {
// //             const shape = SHAPES[rand(0, SHAPES.length - 1)];
// //             let complete = true;
// //             if (brokenLeft > 0) {
// //                 complete = false;
// //                 brokenLeft--;
// //             }
// //             boxesData.push({ ...test, shape, complete });
// //         }
// //         tries++;
// //     }
// //     return boxesData;
// // }

// // export function drawImage(boxesData) {
// //     const canvas = createCanvas(WIDTH, HEIGHT);
// //     const ctx = canvas.getContext("2d");

// //     ctx.fillStyle = "#fff";
// //     ctx.fillRect(0, 0, WIDTH, HEIGHT);

// //     boxesData.forEach(b => {
// //         drawBoxBorderWithGap(ctx, b.x, b.y, b.w, !b.complete);

// //         ctx.strokeStyle = "#000";
// //         if (b.shape === "circle") {
// //             ctx.beginPath();
// //             ctx.arc(b.x + b.w / 2, b.y + b.h / 2, b.w * 0.25, 0, Math.PI * 2);
// //             ctx.stroke();
// //         }
// //         if (b.shape === "triangle") {
// //             ctx.beginPath();
// //             ctx.moveTo(b.x + b.w / 2, b.y + b.h * 0.25);
// //             ctx.lineTo(b.x + b.w * 0.75, b.y + b.h * 0.75);
// //             ctx.lineTo(b.x + b.w * 0.25, b.y + b.h * 0.75);
// //             ctx.closePath();
// //             ctx.stroke();
// //         }
// //         if (b.shape === "star") drawStar(ctx, b.x + b.w / 2, b.y + b.h / 2, b.w * 0.7);
// //     });

// //     return canvas.toBuffer("image/png");
// // }


// // // convert PNG buffer → base64 instead of uploading
// // export async function uploadImage(buffer) {
// //     try {
// //         // buffer → base64 string
// //         const base64String = buffer.toString("base64");

// //         // full data URI (can be shown directly in <img src="...">)
// //         // const imageDataUri = `data:image/png;base64,${base64String}`;
// //         const imageDataUri = base64String;

// //         return {
// //             image: imageDataUri
// //         };

// //     } catch (err) {
// //         return {
// //             status: "error",
// //             message: err.message
// //         };
// //     }
// // }


// // // ----------------------------------------------
// // export function generateOptions(correct) {
// //     const set = new Set([correct]);
// //     let i = 1;
// //     while (set.size < 4) {
// //         if (correct + i >= 0) set.add(correct + i);
// //         if (correct - i >= 0) set.add(correct - i);
// //         i++;
// //     }
// //     return [...set].sort(() => Math.random() - 0.5);
// // }

// // export function pickValidShape(boxes) {
// //     const pool = boxes.filter(b => b.complete);
// //     const shapes = [...new Set(pool.map(b => b.shape))];
// //     return shapes.length === 0 ? null : shapes[rand(0, shapes.length - 1)];
// // }




















































// import { createCanvas } from "canvas";
// import axios from "axios";
// import FormData from "form-data";



// const WIDTH = 400;
// const HEIGHT = 250;

// const SHAPES = ["circle", "star", "triangle"];

// export function getDifficultiesByPer(per, nl) {
//     let DIFFICULTIES = {};

//     const n = parseInt(nl);

//     if(per < 5){
//         DIFFICULTIES = {
//             "Too Easy" : { boxes : [5 + n, 5 + n], size : [30, 30], broken: [10, 18]},
//             "Easy" : { boxes : [55 + n, 60 + n], size : [30, 30], broken: [12, 13]},
//             "Medium" : { boxes : [60, 65], size : [25, 25], broken: [13, 15]},
//             "Tough" : { boxes : [65, 70], size : [25, 25], broken: [15, 17]},
//             "Too Tough" : { boxes : [70, 75], size : [25, 25], broken: [17, 20]},
//         }
//     }else if(per < 10){
//         DIFFICULTIES = {
//             "Too Easy" : { boxes : [45, 50], size : [40, 50], broken: [10, 12]},
//             "Easy" : { boxes : [50, 55], size : [40, 50], broken: [10, 15]},
//             "Medium" : { boxes : [55, 60], size : [40, 50], broken: [0, 0]},
//             "Tough" : { boxes : [60, 65], size : [20, 30], broken: [0, 0]},
//             "Too Tough" : { boxes : [65, 70], size : [20, 30], broken: [0, 0]},
//         }
//     }else if(per < 15){
//         DIFFICULTIES = {
//             "Too Easy" : { boxes : [40, 45], size : [40, 50], broken: [0, 0]},
//             "Easy" : { boxes : [45, 50], size : [40, 50], broken: [2, 6]},
//             "Medium" : { boxes : [50, 55], size : [40, 50], broken: [2, 8]},
//             "Tough" : { boxes : [55, 60], size : [20, 30], broken: [2, 8]},
//             "Too Tough" : { boxes : [60, 65], size : [20, 30], broken: [2, 8]},
//         }
//     }else if(per < 20){
//         DIFFICULTIES = {
//             "Too Easy" : { boxes : [8, 10], size : [20, 30], broken: [0, 0]},
//             "Easy" : { boxes : [10, 12], size : [20, 30], broken: [5, 8]},
//             "Medium" : { boxes : [12, 14], size : [20, 30], broken: [5, 9]},
//             "Tough" : { boxes : [14, 16], size : [20, 30], broken: [5, 10]},
//             "Too Tough" : { boxes : [16, 18], size : [20, 30], broken: [5, 10]},
//         }
//     }else if(per < 25){
//         DIFFICULTIES = {
//             "Too Easy" : { boxes : [10, 12], size : [20, 30], broken: [0, 0]},
//             "Easy" : { boxes : [12, 14], size : [20, 30], broken: [8, 11]},
//             "Medium" : { boxes : [14, 16], size : [20, 30], broken: [8, 11]},
//             "Tough" : { boxes : [16, 18], size : [20, 30], broken: [8, 10]},
//             "Too Tough" : { boxes : [18, 20], size : [20, 30], broken: [8, 10]},
//         }
//     }else if(per < 30){
//         DIFFICULTIES = {
//             "Too Easy" : { boxes : [12, 14], size : [20, 30], broken: [0, 0]},
//             "Easy" : { boxes : [14, 16], size : [20, 30], broken: [5, 10]},
//             "Medium" : { boxes : [16, 18], size : [20, 30], broken: [4, 8]},
//             "Tough" : { boxes : [18, 20], size : [20, 30], broken: [8, 10]},
//             "Too Tough" : { boxes : [20, 22], size : [20, 30], broken: [10, 12]},
//         }
//     }else if(per < 35){
//         DIFFICULTIES = {
//             "Too Easy" : { boxes : [14, 16], size : [20, 30], broken: [1, 9]},
//             "Easy" : { boxes : [16, 18], size : [20, 30], broken: [1, 9]},
//             "Medium" : { boxes : [18, 20 ], size : [20, 30], broken: [1, 7]},
//             "Tough" : { boxes : [20, 22], size : [20, 30], broken: [1, 7]},
//             "Too Tough" : { boxes : [22, 24], size : [20, 30], broken: [1, 5]},
//         }
//     }else if(per < 40){
//         DIFFICULTIES = {
//             "Too Easy" : { boxes : [16, 18], size : [10, 20], broken: [1, 8]},
//             "Easy" : { boxes : [18, 20], size : [10, 20], broken: [1, 9]},
//             "Medium" : { boxes : [20, 22], size : [10, 20], broken: [1, 8]},
//             "Tough" : { boxes : [22, 24], size : [10, 20], broken: [1, 9]},
//             "Too Tough" : { boxes : [24, 26], size : [10, 20], broken: [1, 9]},
//         }
//     }else if(per < 45){
//         DIFFICULTIES = {
//             "Too Easy" : { boxes : [18, 20], size : [10, 20], broken: [1, 8]},
//             "Easy" : { boxes : [20, 22], size : [10, 20], broken: [1, 8]},
//             "Medium" : { boxes : [22, 24], size : [10, 20], broken: [5, 9]},
//             "Tough" : { boxes : [24, 26], size : [10, 20], broken: [6, 9]},
//             "Too Tough" : { boxes : [26, 28], size : [10, 20], broken: [6, 8]},
//         }
//     }else if(per < 50){
//         DIFFICULTIES = {
//             "Too Easy" : { boxes : [20, 22], size : [10, 20], broken: [9, 14]},
//             "Easy" : { boxes : [22, 24], size : [10, 20], broken: [6, 12]},
//             "Medium" : { boxes : [24, 26], size : [10, 20], broken: [6, 12]},
//             "Tough" : { boxes : [26, 28], size : [10, 20], broken: [1, 19]},
//             "Too Tough" : { boxes : [28, 30], size : [10, 20], broken: [1, 19]},
//         }
//     }else if(per < 55){
//         DIFFICULTIES = {
//             "Too Easy" : { boxes : [22, 24], size : [10, 20], broken: [10, 18]},
//             "Easy" : { boxes : [24, 26], size : [10, 20], broken: [10, 19]},
//             "Medium" : { boxes : [26, 28], size : [10, 20], broken: [10, 19]},
//             "Tough" : { boxes : [28, 30], size : [10, 20], broken: [10, 19]},
//             "Too Tough" : { boxes : [30, 32], size : [10, 20], broken: [10, 19]},
//         }
//     }else if(per < 60){
//         DIFFICULTIES = {
//             "Too Easy" : { boxes : [24, 26], size : [10, 20], broken: [10, 18]},
//             "Easy" : { boxes : [26, 28], size : [10, 20], broken: [10, 19]},
//             "Medium" : { boxes : [28, 30], size : [10, 20], broken: [10, 19]},
//             "Tough" : { boxes : [30, 32], size : [10, 20], broken: [10, 19]},
//             "Too Tough" : { boxes : [32, 34], size : [10, 20], broken: [10, 19]},
//         }
//     }else if(per < 65){
//         DIFFICULTIES = {
//             "Too Easy" : { boxes : [26, 28], size : [10, 20], broken: [10, 18]},
//             "Easy" : { boxes : [28, 30], size : [10, 20], broken: [10, 19]},
//             "Medium" : { boxes : [30, 32], size : [10, 20], broken: [10, 19]},
//             "Tough" : { boxes : [32, 34], size : [10, 20], broken: [10, 19]},
//             "Too Tough" : { boxes : [34, 36], size : [10, 20], broken: [10, 19]},
//         }
//     }else if(per < 70){
//         DIFFICULTIES = {
//             "Too Easy" : { boxes : [28, 30], size : [10, 20], broken: [10, 18]},
//             "Easy" : { boxes : [30, 32], size : [10, 20], broken: [10, 19]},
//             "Medium" : { boxes : [32, 34], size : [10, 20], broken: [10, 19]},
//             "Tough" : { boxes : [34, 36], size : [10, 20], broken: [10, 19]},
//             "Too Tough" : { boxes : [36, 38], size : [10, 20], broken: [10, 19]},
//         }
//     }else{
//         DIFFICULTIES = {
//             "Too Easy" : { boxes : [30, 32], size : [10, 20], broken: [10, 18]},
//             "Easy" : { boxes : [32, 34], size : [10, 20], broken: [10, 19]},
//             "Medium" : { boxes : [34, 36], size : [10, 20], broken: [10, 19]},
//             "Tough" : { boxes : [36, 38], size : [10, 20], broken: [10, 19]},
//             "Too Tough" : { boxes : [38, 40], size : [10, 20], broken: [10, 19]},
//         }
//     }


//     return DIFFICULTIES;
// }


// const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

// // ----------------------------------------------
// // box + drawing logic
// // ----------------------------------------------
// export function overlap(a, b) {
//     return !(a.x + a.w < b.x || a.x > b.x + b.w || a.y + a.h < b.y || a.y > b.y + b.h);
// }

// export function drawStar(ctx, x, y, size) {
//     const spikes = 5;
//     const outerRadius = size / 2;
//     const innerRadius = outerRadius / 2.5;
//     let rot = Math.PI / 2 * 3;
//     const step = Math.PI / spikes;

//     ctx.beginPath();
//     ctx.moveTo(x, y - outerRadius);

//     for (let i = 0; i < spikes; i++) {
//         ctx.lineTo(x + Math.cos(rot) * outerRadius, y + Math.sin(rot) * outerRadius);
//         rot += step;
//         ctx.lineTo(x + Math.cos(rot) * innerRadius, y + Math.sin(rot) * innerRadius);
//         rot += step;
//     }

//     ctx.closePath();
//     ctx.stroke();
// }

// export function drawBoxBorderWithGap(ctx, x, y, size, hasGap) {
//     const gapEdge = hasGap ? rand(0, 3) : -1;
//     const gapSize = hasGap ? Math.floor(size * (Math.random() * 0.05 + 0.05)) : 0;
//     const gapPos = hasGap ? rand(5, size - gapSize - 5) : 0;

//     ctx.strokeStyle = "#000";
//     ctx.lineWidth = 2;

//     ctx.beginPath();
//     if (gapEdge === 0) {
//         ctx.moveTo(x, y);
//         ctx.lineTo(x + gapPos, y);
//         ctx.moveTo(x + gapPos + gapSize, y);
//         ctx.lineTo(x + size, y);
//     } else ctx.strokeRect(x, y, size, 0);
//     ctx.stroke();

//     ctx.beginPath();
//     if (gapEdge === 1) {
//         ctx.moveTo(x + size, y);
//         ctx.lineTo(x + size, y + gapPos);
//         ctx.moveTo(x + size, y + gapPos + gapSize);
//         ctx.lineTo(x + size, y + size);
//     } else ctx.strokeRect(x + size, y, 0, size);
//     ctx.stroke();

//     ctx.beginPath();
//     if (gapEdge === 2) {
//         ctx.moveTo(x, y + size);
//         ctx.lineTo(x + gapPos, y + size);
//         ctx.moveTo(x + gapPos + gapSize, y + size);
//         ctx.lineTo(x + size, y + size);
//     } else ctx.strokeRect(x, y + size, size, 0);
//     ctx.stroke();

//     ctx.beginPath();
//     if (gapEdge === 3) {
//         ctx.moveTo(x, y);
//         ctx.lineTo(x, y + gapPos);
//         ctx.moveTo(x, y + gapPos + gapSize);
//         ctx.lineTo(x, y + size);
//     } else ctx.strokeRect(x, y, 0, size);
//     ctx.stroke();
// }

// export function generateBoxesData(difficulty) {
//     if (!difficulty) return [];   // ✅ FIX: prevent undefined access

//     const boxesData = [];
//     const total = rand(...difficulty.boxes);
//     let brokenLeft = rand(...difficulty.broken);

//     let tries = 0;
//     while (boxesData.length < total && tries < 5000) {
//         const size = rand(...difficulty.size);
//         const x = rand(4, WIDTH - size - 4);
//         const y = rand(4, HEIGHT - size - 4);
//         const test = { x, y, w: size, h: size };

//         if (!boxesData.some(b => overlap(test, b))) {
//             const shape = SHAPES[rand(0, SHAPES.length - 1)];
//             let complete = true;
//             if (brokenLeft > 0) {
//                 complete = false;
//                 brokenLeft--;
//             }
//             boxesData.push({ ...test, shape, complete });
//         }
//         tries++;
//     }
//     return boxesData;
// }

// export function drawImage(boxesData) {
//     const canvas = createCanvas(WIDTH, HEIGHT);
//     const ctx = canvas.getContext("2d");

//     ctx.fillStyle = "#fff";
//     ctx.fillRect(0, 0, WIDTH, HEIGHT);

//     boxesData.forEach(b => {
//         drawBoxBorderWithGap(ctx, b.x, b.y, b.w, !b.complete);

//         ctx.strokeStyle = "#000";
//         if (b.shape === "circle") {
//             ctx.beginPath();
//             ctx.arc(b.x + b.w / 2, b.y + b.h / 2, b.w * 0.25, 0, Math.PI * 2);
//             ctx.stroke();
//         }
//         if (b.shape === "triangle") {
//             ctx.beginPath();
//             ctx.moveTo(b.x + b.w / 2, b.y + b.h * 0.25);
//             ctx.lineTo(b.x + b.w * 0.75, b.y + b.h * 0.75);
//             ctx.lineTo(b.x + b.w * 0.25, b.y + b.h * 0.75);
//             ctx.closePath();
//             ctx.stroke();
//         }
//         if (b.shape === "star") drawStar(ctx, b.x + b.w / 2, b.y + b.h / 2, b.w * 0.7);
//     });

//     return canvas.toBuffer("image/png");
// }


// // convert PNG buffer → base64 instead of uploading
// export async function uploadImage(buffer) {
//     try {
//         // buffer → base64 string
//         const base64String = buffer.toString("base64");

//         // full data URI (can be shown directly in <img src="...">)
//         // const imageDataUri = `data:image/png;base64,${base64String}`;
//         const imageDataUri = base64String;

//         return {
//             image: imageDataUri
//         };

//     } catch (err) {
//         return {
//             status: "error",
//             message: err.message
//         };
//     }
// }


// // ----------------------------------------------
// export function generateOptions(correct) {
//     const set = new Set([correct]);
//     let i = 1;
//     while (set.size < 4) {
//         if (correct + i >= 0) set.add(correct + i);
//         if (correct - i >= 0) set.add(correct - i);
//         i++;
//     }
//     return [...set].sort(() => Math.random() - 0.5);
// }

// export function pickValidShape(boxes) {
//     const pool = boxes.filter(b => b.complete);
//     const shapes = [...new Set(pool.map(b => b.shape))];
//     return shapes.length === 0 ? null : shapes[rand(0, shapes.length - 1)];
// }








import { createCanvas } from "canvas";
import axios from "axios";
import FormData from "form-data";



const WIDTH = 400;
const HEIGHT = 250;

const SHAPES = ["circle", "star", "triangle"];

export function getDifficultiesByPer(nl) {
    let DIFFICULTIES = {};

    const n = parseInt(nl);

    DIFFICULTIES = {
        "Too Easy": { boxes: [10, 15 + n], size: [30, 30], broken: [3, 5] },
        "Easy": { boxes: [15, 20 + n], size: [30, 30], broken: [12, 13] },
        "Medium": { boxes: [20, 30 + n], size: [25, 25], broken: [13, 15] },
        "Tough": { boxes: [30, 40 + n], size: [25, 25], broken: [15, 17] },
        "Too Tough": { boxes: [40, 50 + n], size: [25, 25], broken: [17, 20] },
    }


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
























































// import { createCanvas } from "canvas";
// import axios from "axios";
// import FormData from "form-data";



// const WIDTH = 400;
// const HEIGHT = 250;

// const SHAPES = ["circle", "star", "triangle"];

// export function getDifficultiesByPer(per, per_2) {
//     let DIFFICULTIES = {};


//     if (per_2 == "1") {
//         if (per < 5) {
//             DIFFICULTIES = {
//                 "Too Easy": { boxes: [2, 4], size: [40, 50], broken: [0, 0] },
//                 "Easy": { boxes: [4, 6], size: [40, 50], broken: [0, 0] },
//                 "Medium": { boxes: [6, 8], size: [40, 50], broken: [0, 0] },
//                 "Tough": { boxes: [8, 10], size: [40, 50], broken: [0, 0] },
//                 "Too Tough": { boxes: [10, 12], size: [40, 50], broken: [0, 0] },
//             }
//         } else if (per < 10) {
//             DIFFICULTIES = {
//                 "Too Easy": { boxes: [4, 6], size: [40, 50], broken: [0, 0] },
//                 "Easy": { boxes: [6, 8], size: [40, 50], broken: [0, 0] },
//                 "Medium": { boxes: [8, 10], size: [40, 50], broken: [0, 0] },
//                 "Tough": { boxes: [10, 12], size: [20, 30], broken: [0, 0] },
//                 "Too Tough": { boxes: [12, 14], size: [20, 30], broken: [0, 0] },
//             }
//         } else if (per < 15) {
//             DIFFICULTIES = {
//                 "Too Easy": { boxes: [6, 8], size: [40, 50], broken: [0, 0] },
//                 "Easy": { boxes: [8, 10], size: [40, 50], broken: [2, 6] },
//                 "Medium": { boxes: [10, 12], size: [40, 50], broken: [2, 8] },
//                 "Tough": { boxes: [12, 14], size: [20, 30], broken: [2, 8] },
//                 "Too Tough": { boxes: [14, 16], size: [20, 30], broken: [2, 8] },
//             }
//         } else if (per < 20) {
//             DIFFICULTIES = {
//                 "Too Easy": { boxes: [8, 10], size: [20, 30], broken: [0, 0] },
//                 "Easy": { boxes: [10, 12], size: [20, 30], broken: [5, 8] },
//                 "Medium": { boxes: [12, 14], size: [20, 30], broken: [5, 9] },
//                 "Tough": { boxes: [14, 16], size: [20, 30], broken: [5, 10] },
//                 "Too Tough": { boxes: [16, 18], size: [20, 30], broken: [5, 10] },
//             }
//         } else if (per < 25) {
//             DIFFICULTIES = {
//                 "Too Easy": { boxes: [10, 12], size: [20, 30], broken: [0, 0] },
//                 "Easy": { boxes: [12, 14], size: [20, 30], broken: [8, 11] },
//                 "Medium": { boxes: [14, 16], size: [20, 30], broken: [8, 11] },
//                 "Tough": { boxes: [16, 18], size: [20, 30], broken: [8, 10] },
//                 "Too Tough": { boxes: [18, 20], size: [20, 30], broken: [8, 10] },
//             }
//         } else if (per < 30) {
//             DIFFICULTIES = {
//                 "Too Easy": { boxes: [12, 14], size: [20, 30], broken: [0, 0] },
//                 "Easy": { boxes: [14, 16], size: [20, 30], broken: [5, 10] },
//                 "Medium": { boxes: [16, 18], size: [20, 30], broken: [4, 8] },
//                 "Tough": { boxes: [18, 20], size: [20, 30], broken: [8, 10] },
//                 "Too Tough": { boxes: [20, 22], size: [20, 30], broken: [10, 12] },
//             }
//         } else if (per < 35) {
//             DIFFICULTIES = {
//                 "Too Easy": { boxes: [14, 16], size: [20, 30], broken: [1, 9] },
//                 "Easy": { boxes: [16, 18], size: [20, 30], broken: [1, 9] },
//                 "Medium": { boxes: [18, 20], size: [20, 30], broken: [1, 7] },
//                 "Tough": { boxes: [20, 22], size: [20, 30], broken: [1, 7] },
//                 "Too Tough": { boxes: [22, 24], size: [20, 30], broken: [1, 5] },
//             }
//         } else if (per < 40) {
//             DIFFICULTIES = {
//                 "Too Easy": { boxes: [16, 18], size: [10, 20], broken: [1, 8] },
//                 "Easy": { boxes: [18, 20], size: [10, 20], broken: [1, 9] },
//                 "Medium": { boxes: [20, 22], size: [10, 20], broken: [1, 8] },
//                 "Tough": { boxes: [22, 24], size: [10, 20], broken: [1, 9] },
//                 "Too Tough": { boxes: [24, 26], size: [10, 20], broken: [1, 9] },
//             }
//         } else if (per < 45) {
//             DIFFICULTIES = {
//                 "Too Easy": { boxes: [18, 20], size: [10, 20], broken: [1, 8] },
//                 "Easy": { boxes: [20, 22], size: [10, 20], broken: [1, 8] },
//                 "Medium": { boxes: [22, 24], size: [10, 20], broken: [5, 9] },
//                 "Tough": { boxes: [24, 26], size: [10, 20], broken: [6, 9] },
//                 "Too Tough": { boxes: [26, 28], size: [10, 20], broken: [6, 8] },
//             }
//         } else if (per < 50) {
//             DIFFICULTIES = {
//                 "Too Easy": { boxes: [20, 22], size: [10, 20], broken: [9, 14] },
//                 "Easy": { boxes: [22, 24], size: [10, 20], broken: [6, 12] },
//                 "Medium": { boxes: [24, 26], size: [10, 20], broken: [6, 12] },
//                 "Tough": { boxes: [26, 28], size: [10, 20], broken: [1, 19] },
//                 "Too Tough": { boxes: [28, 30], size: [10, 20], broken: [1, 19] },
//             }
//         } else if (per < 55) {
//             DIFFICULTIES = {
//                 "Too Easy": { boxes: [22, 24], size: [10, 20], broken: [10, 18] },
//                 "Easy": { boxes: [24, 26], size: [10, 20], broken: [10, 19] },
//                 "Medium": { boxes: [26, 28], size: [10, 20], broken: [10, 19] },
//                 "Tough": { boxes: [28, 30], size: [10, 20], broken: [10, 19] },
//                 "Too Tough": { boxes: [30, 32], size: [10, 20], broken: [10, 19] },
//             }
//         } else if (per < 60) {
//             DIFFICULTIES = {
//                 "Too Easy": { boxes: [24, 26], size: [10, 20], broken: [10, 18] },
//                 "Easy": { boxes: [26, 28], size: [10, 20], broken: [10, 19] },
//                 "Medium": { boxes: [28, 30], size: [10, 20], broken: [10, 19] },
//                 "Tough": { boxes: [30, 32], size: [10, 20], broken: [10, 19] },
//                 "Too Tough": { boxes: [32, 34], size: [10, 20], broken: [10, 19] },
//             }
//         } else if (per < 65) {
//             DIFFICULTIES = {
//                 "Too Easy": { boxes: [26, 28], size: [10, 20], broken: [10, 18] },
//                 "Easy": { boxes: [28, 30], size: [10, 20], broken: [10, 19] },
//                 "Medium": { boxes: [30, 32], size: [10, 20], broken: [10, 19] },
//                 "Tough": { boxes: [32, 34], size: [10, 20], broken: [10, 19] },
//                 "Too Tough": { boxes: [34, 36], size: [10, 20], broken: [10, 19] },
//             }
//         } else if (per < 70) {
//             DIFFICULTIES = {
//                 "Too Easy": { boxes: [28, 30], size: [10, 20], broken: [10, 18] },
//                 "Easy": { boxes: [30, 32], size: [10, 20], broken: [10, 19] },
//                 "Medium": { boxes: [32, 34], size: [10, 20], broken: [10, 19] },
//                 "Tough": { boxes: [34, 36], size: [10, 20], broken: [10, 19] },
//                 "Too Tough": { boxes: [36, 38], size: [10, 20], broken: [10, 19] },
//             }
//         } else {
//             DIFFICULTIES = {
//                 "Too Easy": { boxes: [30, 32], size: [10, 20], broken: [10, 18] },
//                 "Easy": { boxes: [32, 34], size: [10, 20], broken: [10, 19] },
//                 "Medium": { boxes: [34, 36], size: [10, 20], broken: [10, 19] },
//                 "Tough": { boxes: [36, 38], size: [10, 20], broken: [10, 19] },
//                 "Too Tough": { boxes: [38, 40], size: [10, 20], broken: [10, 19] },
//             }
//         }

//     } else {
//         if (per < 5) {
//             DIFFICULTIES = {
//                 "Too Easy": { boxes: [2, 5], size: [40, 50], broken: [0, 0] },
//                 "Easy": { boxes: [5, 8], size: [40, 50], broken: [0, 0] },
//                 "Medium": { boxes: [8, 11], size: [40, 50], broken: [0, 0] },
//                 "Tough": { boxes: [11, 14], size: [40, 50], broken: [0, 0] },
//                 "Too Tough": { boxes: [14, 17], size: [40, 50], broken: [0, 0] },
//             }
//         } else if (per < 10) {
//             DIFFICULTIES = {
//                 "Too Easy": { boxes: [5, 8], size: [40, 50], broken: [0, 0] },
//                 "Easy": { boxes: [8, 11], size: [40, 50], broken: [0, 0] },
//                 "Medium": { boxes: [11, 14], size: [40, 50], broken: [0, 0] },
//                 "Tough": { boxes: [14, 17], size: [20, 30], broken: [0, 0] },
//                 "Too Tough": { boxes: [17, 20], size: [20, 30], broken: [0, 0] },
//             }
//         } else if (per < 15) {
//             DIFFICULTIES = {
//                 "Too Easy": { boxes: [8, 11], size: [40, 50], broken: [0, 0] },
//                 "Easy": { boxes: [11, 14], size: [40, 50], broken: [2, 6] },
//                 "Medium": { boxes: [14, 17], size: [40, 50], broken: [2, 8] },
//                 "Tough": { boxes: [17, 20], size: [20, 30], broken: [2, 8] },
//                 "Too Tough": { boxes: [20, 23], size: [20, 30], broken: [2, 8] },
//             }
//         } else if (per < 20) {
//             DIFFICULTIES = {
//                 "Too Easy": { boxes: [11, 14], size: [20, 30], broken: [0, 0] },
//                 "Easy": { boxes: [14, 17], size: [20, 30], broken: [5, 8] },
//                 "Medium": { boxes: [17, 20], size: [20, 30], broken: [5, 9] },
//                 "Tough": { boxes: [20, 23], size: [20, 30], broken: [5, 10] },
//                 "Too Tough": { boxes: [23, 26], size: [20, 30], broken: [5, 10] },
//             }
//         } else if (per < 25) {
//             DIFFICULTIES = {
//                 "Too Easy": { boxes: [14, 17], size: [20, 30], broken: [0, 0] },
//                 "Easy": { boxes: [17, 20], size: [20, 30], broken: [8, 11] },
//                 "Medium": { boxes: [20, 23], size: [20, 30], broken: [8, 11] },
//                 "Tough": { boxes: [23, 26], size: [20, 30], broken: [8, 10] },
//                 "Too Tough": { boxes: [26, 29], size: [20, 30], broken: [8, 10] },
//             }
//         } else if (per < 30) {
//             DIFFICULTIES = {
//                 "Too Easy": { boxes: [17, 20], size: [20, 30], broken: [0, 0] },
//                 "Easy": { boxes: [20, 23], size: [20, 30], broken: [5, 10] },
//                 "Medium": { boxes: [23, 26], size: [20, 30], broken: [4, 8] },
//                 "Tough": { boxes: [26, 29], size: [20, 30], broken: [8, 10] },
//                 "Too Tough": { boxes: [29, 32], size: [20, 30], broken: [10, 12] },
//             }
//         } else if (per < 35) {
//             DIFFICULTIES = {
//                 "Too Easy": { boxes: [20, 23], size: [20, 30], broken: [1, 9] },
//                 "Easy": { boxes: [23, 26], size: [20, 30], broken: [1, 9] },
//                 "Medium": { boxes: [26, 29], size: [20, 30], broken: [1, 7] },
//                 "Tough": { boxes: [29, 32], size: [20, 30], broken: [1, 7] },
//                 "Too Tough": { boxes: [32, 35], size: [20, 30], broken: [1, 5] },
//             }
//         } else if (per < 40) {
//             DIFFICULTIES = {
//                 "Too Easy": { boxes: [23, 26], size: [10, 20], broken: [1, 8] },
//                 "Easy": { boxes: [26, 29], size: [10, 20], broken: [1, 9] },
//                 "Medium": { boxes: [29, 32], size: [10, 20], broken: [1, 8] },
//                 "Tough": { boxes: [32, 35], size: [10, 20], broken: [1, 9] },
//                 "Too Tough": { boxes: [35, 38], size: [10, 20], broken: [1, 9] },
//             }
//         } else if (per < 45) {
//             DIFFICULTIES = {
//                 "Too Easy": { boxes: [26, 29], size: [10, 20], broken: [1, 8] },
//                 "Easy": { boxes: [29, 32], size: [10, 20], broken: [1, 8] },
//                 "Medium": { boxes: [32, 35], size: [10, 20], broken: [5, 9] },
//                 "Tough": { boxes: [35, 38], size: [10, 20], broken: [6, 9] },
//                 "Too Tough": { boxes: [38, 41], size: [10, 20], broken: [6, 8] },
//             }
//         } else if (per < 50) {
//             DIFFICULTIES = {
//                 "Too Easy": { boxes: [29, 32], size: [10, 20], broken: [9, 14] },
//                 "Easy": { boxes: [32, 35], size: [10, 20], broken: [6, 12] },
//                 "Medium": { boxes: [35, 38], size: [10, 20], broken: [6, 12] },
//                 "Tough": { boxes: [38, 41], size: [10, 20], broken: [1, 19] },
//                 "Too Tough": { boxes: [41, 44], size: [10, 20], broken: [1, 19] },
//             }
//         } else if (per < 55) {
//             DIFFICULTIES = {
//                 "Too Easy": { boxes: [32, 35], size: [10, 20], broken: [10, 18] },
//                 "Easy": { boxes: [35, 38], size: [10, 20], broken: [10, 19] },
//                 "Medium": { boxes: [38, 41], size: [10, 20], broken: [10, 19] },
//                 "Tough": { boxes: [41, 44], size: [10, 20], broken: [10, 19] },
//                 "Too Tough": { boxes: [44, 47], size: [10, 20], broken: [10, 19] },
//             }
//         } else if (per < 60) {
//             DIFFICULTIES = {
//                 "Too Easy": { boxes: [35, 38], size: [10, 20], broken: [10, 18] },
//                 "Easy": { boxes: [38, 41], size: [10, 20], broken: [10, 19] },
//                 "Medium": { boxes: [41, 44], size: [10, 20], broken: [10, 19] },
//                 "Tough": { boxes: [44, 47], size: [10, 20], broken: [10, 19] },
//                 "Too Tough": { boxes: [47, 50], size: [10, 20], broken: [10, 19] },
//             }
//         } else if (per < 65) {
//             DIFFICULTIES = {
//                 "Too Easy": { boxes: [38, 41], size: [10, 20], broken: [10, 18] },
//                 "Easy": { boxes: [41, 44], size: [10, 20], broken: [10, 19] },
//                 "Medium": { boxes: [44, 47], size: [10, 20], broken: [10, 19] },
//                 "Tough": { boxes: [47, 50], size: [10, 20], broken: [10, 19] },
//                 "Too Tough": { boxes: [50, 53], size: [10, 20], broken: [10, 19] },
//             }
//         } else if (per < 70) {
//             DIFFICULTIES = {
//                 "Too Easy": { boxes: [41, 44], size: [10, 20], broken: [10, 18] },
//                 "Easy": { boxes: [44, 47], size: [10, 20], broken: [10, 19] },
//                 "Medium": { boxes: [47, 50], size: [10, 20], broken: [10, 19] },
//                 "Tough": { boxes: [50, 53], size: [10, 20], broken: [10, 19] },
//                 "Too Tough": { boxes: [53, 56], size: [10, 20], broken: [10, 19] },
//             }
//         } else {
//             DIFFICULTIES = {
//                 "Too Easy": { boxes: [44, 47], size: [10, 20], broken: [10, 18] },
//                 "Easy": { boxes: [47, 50], size: [10, 20], broken: [10, 19] },
//                 "Medium": { boxes: [50, 53], size: [10, 20], broken: [10, 19] },
//                 "Tough": { boxes: [53, 56], size: [10, 20], broken: [10, 19] },
//                 "Too Tough": { boxes: [56, 59], size: [10, 20], broken: [10, 19] },
//             }
//         }

//     }



//     return DIFFICULTIES;
// }


// const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

// // ----------------------------------------------
// // box + drawing logic
// // ----------------------------------------------
// export function overlap(a, b) {
//     return !(a.x + a.w < b.x || a.x > b.x + b.w || a.y + a.h < b.y || a.y > b.y + b.h);
// }

// export function drawStar(ctx, x, y, size) {
//     const spikes = 5;
//     const outerRadius = size / 2;
//     const innerRadius = outerRadius / 2.5;
//     let rot = Math.PI / 2 * 3;
//     const step = Math.PI / spikes;

//     ctx.beginPath();
//     ctx.moveTo(x, y - outerRadius);

//     for (let i = 0; i < spikes; i++) {
//         ctx.lineTo(x + Math.cos(rot) * outerRadius, y + Math.sin(rot) * outerRadius);
//         rot += step;
//         ctx.lineTo(x + Math.cos(rot) * innerRadius, y + Math.sin(rot) * innerRadius);
//         rot += step;
//     }

//     ctx.closePath();
//     ctx.stroke();
// }

// export function drawBoxBorderWithGap(ctx, x, y, size, hasGap) {
//     const gapEdge = hasGap ? rand(0, 3) : -1;
//     const gapSize = hasGap ? Math.floor(size * (Math.random() * 0.05 + 0.05)) : 0;
//     const gapPos = hasGap ? rand(5, size - gapSize - 5) : 0;

//     ctx.strokeStyle = "#000";
//     ctx.lineWidth = 2;

//     ctx.beginPath();
//     if (gapEdge === 0) {
//         ctx.moveTo(x, y);
//         ctx.lineTo(x + gapPos, y);
//         ctx.moveTo(x + gapPos + gapSize, y);
//         ctx.lineTo(x + size, y);
//     } else ctx.strokeRect(x, y, size, 0);
//     ctx.stroke();

//     ctx.beginPath();
//     if (gapEdge === 1) {
//         ctx.moveTo(x + size, y);
//         ctx.lineTo(x + size, y + gapPos);
//         ctx.moveTo(x + size, y + gapPos + gapSize);
//         ctx.lineTo(x + size, y + size);
//     } else ctx.strokeRect(x + size, y, 0, size);
//     ctx.stroke();

//     ctx.beginPath();
//     if (gapEdge === 2) {
//         ctx.moveTo(x, y + size);
//         ctx.lineTo(x + gapPos, y + size);
//         ctx.moveTo(x + gapPos + gapSize, y + size);
//         ctx.lineTo(x + size, y + size);
//     } else ctx.strokeRect(x, y + size, size, 0);
//     ctx.stroke();

//     ctx.beginPath();
//     if (gapEdge === 3) {
//         ctx.moveTo(x, y);
//         ctx.lineTo(x, y + gapPos);
//         ctx.moveTo(x, y + gapPos + gapSize);
//         ctx.lineTo(x, y + size);
//     } else ctx.strokeRect(x, y, 0, size);
//     ctx.stroke();
// }

// export function generateBoxesData(difficulty) {
//     if (!difficulty) return [];   // ✅ FIX: prevent undefined access

//     const boxesData = [];
//     const total = rand(...difficulty.boxes);
//     let brokenLeft = rand(...difficulty.broken);

//     let tries = 0;
//     while (boxesData.length < total && tries < 5000) {
//         const size = rand(...difficulty.size);
//         const x = rand(4, WIDTH - size - 4);
//         const y = rand(4, HEIGHT - size - 4);
//         const test = { x, y, w: size, h: size };

//         if (!boxesData.some(b => overlap(test, b))) {
//             const shape = SHAPES[rand(0, SHAPES.length - 1)];
//             let complete = true;
//             if (brokenLeft > 0) {
//                 complete = false;
//                 brokenLeft--;
//             }
//             boxesData.push({ ...test, shape, complete });
//         }
//         tries++;
//     }
//     return boxesData;
// }

// export function drawImage(boxesData) {
//     const canvas = createCanvas(WIDTH, HEIGHT);
//     const ctx = canvas.getContext("2d");

//     ctx.fillStyle = "#fff";
//     ctx.fillRect(0, 0, WIDTH, HEIGHT);

//     boxesData.forEach(b => {
//         drawBoxBorderWithGap(ctx, b.x, b.y, b.w, !b.complete);

//         ctx.strokeStyle = "#000";
//         if (b.shape === "circle") {
//             ctx.beginPath();
//             ctx.arc(b.x + b.w / 2, b.y + b.h / 2, b.w * 0.25, 0, Math.PI * 2);
//             ctx.stroke();
//         }
//         if (b.shape === "triangle") {
//             ctx.beginPath();
//             ctx.moveTo(b.x + b.w / 2, b.y + b.h * 0.25);
//             ctx.lineTo(b.x + b.w * 0.75, b.y + b.h * 0.75);
//             ctx.lineTo(b.x + b.w * 0.25, b.y + b.h * 0.75);
//             ctx.closePath();
//             ctx.stroke();
//         }
//         if (b.shape === "star") drawStar(ctx, b.x + b.w / 2, b.y + b.h / 2, b.w * 0.7);
//     });

//     return canvas.toBuffer("image/png");
// }


// // convert PNG buffer → base64 instead of uploading
// export async function uploadImage(buffer) {
//     try {
//         // buffer → base64 string
//         const base64String = buffer.toString("base64");

//         // full data URI (can be shown directly in <img src="...">)
//         // const imageDataUri = `data:image/png;base64,${base64String}`;
//         const imageDataUri = base64String;

//         return {
//             image: imageDataUri
//         };

//     } catch (err) {
//         return {
//             status: "error",
//             message: err.message
//         };
//     }
// }


// // ----------------------------------------------
// export function generateOptions(correct) {
//     const set = new Set([correct]);
//     let i = 1;
//     while (set.size < 4) {
//         if (correct + i >= 0) set.add(correct + i);
//         if (correct - i >= 0) set.add(correct - i);
//         i++;
//     }
//     return [...set].sort(() => Math.random() - 0.5);
// }

// export function pickValidShape(boxes) {
//     const pool = boxes.filter(b => b.complete);
//     const shapes = [...new Set(pool.map(b => b.shape))];
//     return shapes.length === 0 ? null : shapes[rand(0, shapes.length - 1)];
// }