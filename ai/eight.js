//Befor per < 5
// import { createCanvas } from 'canvas';

// // -------- CONFIGURATION --------
// const WIDTH = 400;
// const HEIGHT = 250;

// // hard safety limit (circle geometry reality)
// const MAX_SAFE_PIECES = 28;

// // -------- PER-BASED DIFFICULTY (UNCHANGED STRUCTURE) --------
// function diff_lt(per) {
//     let DIFF;

//     if (per < 10) {
//         DIFF = { 
//             0: [2, 3],
//             1: [3, 4], 
//             2: [4, 5], 
//             3: [5, 6], 
//             4: [6, 7] 
//         };
//     }else if (per < 20) {
//         DIFF = { 
//             0: [3, 4],
//             1: [4, 5], 
//             2: [5, 6], 
//             3: [6, 7], 
//             4: [7, 8] 
//         };
//     }else if (per < 30) {
//         DIFF = { 
//             0: [4, 5],
//             1: [5, 6], 
//             2: [6, 7], 
//             3: [7, 8], 
//             4: [8, 9] 
//         };
//     }else if (per < 40) {
//         DIFF = { 
//             0: [5, 6],
//             1: [6, 7], 
//             2: [7, 8], 
//             3: [8, 9], 
//             4: [9, 10] 
//         };
//     }else if (per < 50) {
//         DIFF = { 
//             0: [6, 7],
//             1: [7, 8], 
//             2: [8, 9], 
//             3: [9, 10], 
//             4: [10, 11] 
//         };
//     }else if (per < 60) {
//         DIFF = { 
//             0: [7, 8],
//             1: [8, 8], 
//             2: [8, 9], 
//             3: [9, 10], 
//             4: [10, 11] 
//         };
//     }else if (per < 70) {
//         DIFF = { 
//             0: [8, 9],
//             1: [9, 10], 
//             2: [10, 11], 
//             3: [11, 12], 
//             4: [12, 13] 
//         };
//     }else if (per < 80) {
//         DIFF = { 
//             0: [9, 10],
//             1: [10, 11], 
//             2: [11, 12], 
//             3: [12, 13], 
//             4: [13, 14] 
//         };
//     }else if (per < 90) {
//         DIFF = { 
//             0: [10, 11],
//             1: [11, 12], 
//             2: [12, 13], 
//             3: [13, 14], 
//             4: [14, 15] 
//         };
//     }else{
//         DIFF = { 
//             0: [11, 12],
//             1: [12, 13], 
//             2: [13, 14], 
//             3: [14, 15], 
//             4: [15, 16] 
//         };
//     }

//     return DIFF;
// }

// // -------- HELPER FUNCTIONS --------
// function polar(cx, cy, r, a) {
//     const rad = (a - 90) * Math.PI / 180;
//     return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
// }

// function makeCircle(minP, maxP) {
//     const target = Math.floor(Math.random() * (maxP - minP + 1)) + minP;
//     const cuts = [0, 360];

//     while (cuts.length < target + 1) {
//         const a = Math.random() * 360;
//         if (!cuts.some(v => Math.abs(v - a) < 8)) cuts.push(a);
//     }
//     cuts.sort((a, b) => a - b);

//     let count = 0;
//     const paths = [];

//     for (let i = 0; i < cuts.length - 1; i++) {
//         const gap = 4 + Math.random() * 5;
//         const s = cuts[i] + gap;
//         const e = cuts[i + 1] - gap;
//         if (e > s) {
//             count++;
//             paths.push({ s, e, strokeWidth: 2 + Math.random() * 2 });
//         }
//     }

//     return { pieces: count, paths };
// }

// // -------- DRAWING FUNCTION WITH NUMBERS --------
// export function drawCircles(circles) {
//     const canvas = createCanvas(WIDTH, HEIGHT);
//     const ctx = canvas.getContext('2d');

//     ctx.fillStyle = '#fff';
//     ctx.fillRect(0, 0, WIDTH, HEIGHT);
//     ctx.strokeStyle = 'black';
//     ctx.font = '16px Arial';
//     ctx.fillStyle = 'black';
//     ctx.textAlign = 'center';
//     ctx.textBaseline = 'middle';

//     const positions = [
//         { x: 70, y: 70 },
//         { x: 200, y: 70 },
//         { x: 330, y: 70 },
//         { x: 70, y: 180 },
//         { x: 200, y: 180 },
//         { x: 330, y: 180 },
//     ];

//     circles.forEach((circle, i) => {
//         ctx.save();
//         ctx.translate(positions[i].x, positions[i].y);

//         circle.paths.forEach(p => {
//             // draw arc (piece)
//             ctx.beginPath();
//             ctx.lineWidth = p.strokeWidth;
//             ctx.arc(
//                 0,
//                 0,
//                 38,
//                 (p.s - 90) * Math.PI / 180,
//                 (p.e - 90) * Math.PI / 180
//             );
//             ctx.stroke();

//             // 🔴 draw piece marker (center of arc)
//             const midAngle = (p.s + p.e) / 2;
//             const rad = (midAngle - 90) * Math.PI / 180;
//             const dotX = Math.cos(rad) * 30;
//             const dotY = Math.sin(rad) * 30;

//             ctx.beginPath();
//             ctx.arc(dotX, dotY, 2.2, 0, Math.PI * 2);
//             ctx.fill();
//         });


//         ctx.fillText(String(i + 1), 0, 0);
//         ctx.restore();
//     });



//     return canvas;
// }

// // -------- GENERATE PUZZLE + OPTIONS --------
// export function generatePuzzle(difficulty, per) {
//     const let_data = diff_lt(per);

//     let lett;
//     if (difficulty === "Too Easy") lett = 0;
//     else if (difficulty === "Easy") lett = 1;
//     else if (difficulty === "Medium") lett = 2;
//     else if (difficulty === "Tough") lett = 3;
//     else lett = 4; // Too Tough

//     let [minP, maxP] = let_data[lett];

//     // 🔒 SAFETY FIX — prevents Too Tough from hanging
//     maxP = Math.min(maxP, MAX_SAFE_PIECES);

//     const circles = [];
//     for (let i = 0; i < 6; i++) {
//         circles.push(makeCircle(minP, maxP));
//     }

//     const type = Math.floor(Math.random() * 3);
//     let question, correct;

//     if (type === 0) {
//         const ref = Math.floor(Math.random() * 6);
//         question = `How many circles contain less pieces than circle ${ref + 1}?`;
//         correct = circles.filter(c => c.pieces < circles[ref].pieces).length;
//     } else if (type === 1) {
//         const ref = Math.floor(Math.random() * 6);
//         question = `How many circles contain more pieces than circle ${ref + 1}?`;
//         correct = circles.filter(c => c.pieces > circles[ref].pieces).length;
//     } else {
//         const max = Math.max(...circles.map(c => c.pieces));
//         const idx = circles.findIndex(c => c.pieces === max);
//         question = `Which circle has the most pieces and how many pieces does it have?`;
//         correct = `${idx + 1}-${max}`;
//     }

//     const answers = new Set([String(correct)]);
//     while (answers.size < 4) {
//         answers.add(
//             type === 2
//                 ? `${Math.floor(Math.random() * 6) + 1}-${Math.floor(Math.random() * 30)}`
//                 : String(Math.floor(Math.random() * 7))
//         );
//     }

//     const options = [...answers].sort(() => Math.random() - 0.5);
//     return { circles, question, correct, options };

// }


















































// import { createCanvas } from 'canvas';

// // -------- CONFIGURATION --------
// const WIDTH = 400;
// const HEIGHT = 250;

// // hard safety limit (circle geometry reality)
// const MAX_SAFE_PIECES = 28;

// // -------- PER-BASED DIFFICULTY (UNCHANGED STRUCTURE) --------
// function diff_lt(per) {
//     let DIFF;

//     if (per < 5) {
//         DIFF = { 
//             0: [2, 3],
//             1: [3, 4], 
//             2: [4, 5], 
//             3: [5, 6], 
//             4: [6, 7] 
//         };
//     }else if (per < 10) {
//         DIFF = { 
//             0: [3, 4],
//             1: [4, 5], 
//             2: [5, 6], 
//             3: [6, 7], 
//             4: [7, 8] 
//         };
//     }else if (per < 15) {
//         DIFF = { 
//             0: [4, 5],
//             1: [5, 6], 
//             2: [6, 7], 
//             3: [7, 8], 
//             4: [8, 9] 
//         };
//     }else if (per < 20) {
//         DIFF = { 
//             0: [5, 6],
//             1: [6, 7], 
//             2: [7, 8], 
//             3: [8, 9], 
//             4: [9, 10] 
//         };
//     }else if (per < 25) {
//         DIFF = { 
//             0: [6, 7],
//             1: [7, 8], 
//             2: [8, 9], 
//             3: [9, 10], 
//             4: [10, 11] 
//         };
//     }else if (per < 30) {
//         DIFF = { 
//             0: [7, 8],
//             1: [8, 8], 
//             2: [8, 9], 
//             3: [9, 10], 
//             4: [10, 11] 
//         };
//     }else if (per < 35) {
//         DIFF = { 
//             0: [8, 9],
//             1: [9, 10], 
//             2: [10, 11], 
//             3: [11, 12], 
//             4: [12, 13] 
//         };
//     }else if (per < 40) {
//         DIFF = { 
//             0: [9, 10],
//             1: [10, 11], 
//             2: [11, 12], 
//             3: [12, 13], 
//             4: [13, 14] 
//         };
//     }else if (per < 45) {
//         DIFF = { 
//             0: [10, 11],
//             1: [11, 12], 
//             2: [12, 13], 
//             3: [13, 14], 
//             4: [14, 15] 
//         };
//     }else if(per < 50){
//         DIFF = { 
//             0: [11, 12],
//             1: [12, 13], 
//             2: [13, 14], 
//             3: [14, 15], 
//             4: [15, 16] 
//         };
//     }else if(per < 55){
//         DIFF = { 
//             0: [12, 13],
//             1: [13, 14], 
//             2: [14, 15], 
//             3: [15, 16], 
//             4: [16, 17] 
//         };
//     }else if(per < 60){
//         DIFF = { 
//             0: [13, 14],
//             1: [14, 15], 
//             2: [15, 16], 
//             3: [16, 17], 
//             4: [17, 18] 
//         };
//     }else if(per < 65){
//         DIFF = { 
//             0: [14, 15],
//             1: [15, 16], 
//             2: [16, 17], 
//             3: [17, 18], 
//             4: [18, 19] 
//         };
//     }else if(per < 70){
//         DIFF = { 
//             0: [15, 16],
//             1: [16, 17], 
//             2: [17, 18], 
//             3: [18, 19], 
//             4: [19, 20] 
//         };
//     }else if(per < 75){
//         DIFF = { 
//             0: [16, 17],
//             1: [17, 18], 
//             2: [18, 19], 
//             3: [19, 20], 
//             4: [20, 21] 
//         };
//     }else if(per < 80){
//         DIFF = { 
//             0: [17, 18],
//             1: [18, 19], 
//             2: [19, 20], 
//             3: [20, 21], 
//             4: [21, 22] 
//         };
//     }else if(per < 85){
//         DIFF = { 
//             0: [18, 19],
//             1: [19, 20], 
//             2: [20, 21], 
//             3: [21, 22], 
//             4: [22, 23] 
//         };
//     }else if(per < 90){
//         DIFF = { 
//             0: [19, 20],
//             1: [20, 21], 
//             2: [21, 22], 
//             3: [22, 23], 
//             4: [23, 24] 
//         };
//     }else if(per < 95){
//         DIFF = { 
//             0: [20, 21],
//             1: [21, 22], 
//             2: [22, 23], 
//             3: [23, 24], 
//             4: [24, 25] 
//         };
//     }else{
//         DIFF = { 
//             0: [21, 22],
//             1: [22, 23], 
//             2: [23, 24], 
//             3: [24, 25], 
//             4: [25, 26] 
//         };
//     }

//     return DIFF;
// }

// // -------- HELPER FUNCTIONS --------
// function polar(cx, cy, r, a) {
//     const rad = (a - 90) * Math.PI / 180;
//     return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
// }

// function makeCircle(minP, maxP) {
//     const target = Math.floor(Math.random() * (maxP - minP + 1)) + minP;
//     const cuts = [0, 360];

//     while (cuts.length < target + 1) {
//         const a = Math.random() * 360;
//         if (!cuts.some(v => Math.abs(v - a) < 8)) cuts.push(a);
//     }
//     cuts.sort((a, b) => a - b);

//     let count = 0;
//     const paths = [];

//     for (let i = 0; i < cuts.length - 1; i++) {
//         const gap = 4 + Math.random() * 5;
//         const s = cuts[i] + gap;
//         const e = cuts[i + 1] - gap;
//         if (e > s) {
//             count++;
//             paths.push({ s, e, strokeWidth: 2 + Math.random() * 2 });
//         }
//     }

//     return { pieces: count, paths };
// }

// // -------- DRAWING FUNCTION WITH NUMBERS --------
// export function drawCircles(circles) {
//     const canvas = createCanvas(WIDTH, HEIGHT);
//     const ctx = canvas.getContext('2d');

//     ctx.fillStyle = '#fff';
//     ctx.fillRect(0, 0, WIDTH, HEIGHT);
//     ctx.strokeStyle = 'black';
//     ctx.font = '16px Arial';
//     ctx.fillStyle = 'black';
//     ctx.textAlign = 'center';
//     ctx.textBaseline = 'middle';

//     const positions = [
//         { x: 70, y: 70 },
//         { x: 200, y: 70 },
//         { x: 330, y: 70 },
//         { x: 70, y: 180 },
//         { x: 200, y: 180 },
//         { x: 330, y: 180 },
//     ];

//     circles.forEach((circle, i) => {
//         ctx.save();
//         ctx.translate(positions[i].x, positions[i].y);

//         circle.paths.forEach(p => {
//             // draw arc (piece)
//             ctx.beginPath();
//             ctx.lineWidth = p.strokeWidth;
//             ctx.arc(
//                 0,
//                 0,
//                 38,
//                 (p.s - 90) * Math.PI / 180,
//                 (p.e - 90) * Math.PI / 180
//             );
//             ctx.stroke();

//             // 🔴 draw piece marker (center of arc)
//             const midAngle = (p.s + p.e) / 2;
//             const rad = (midAngle - 90) * Math.PI / 180;
//             const dotX = Math.cos(rad) * 30;
//             const dotY = Math.sin(rad) * 30;

//             ctx.beginPath();
//             ctx.arc(dotX, dotY, 2.2, 0, Math.PI * 2);
//             ctx.fill();
//         });


//         ctx.fillText(String(i + 1), 0, 0);
//         ctx.restore();
//     });



//     return canvas;
// }

// // -------- GENERATE PUZZLE + OPTIONS --------
// export function generatePuzzle(difficulty, per) {
//     const let_data = diff_lt(per);

//     let lett;
//     if (difficulty === "Too Easy") lett = 0;
//     else if (difficulty === "Easy") lett = 1;
//     else if (difficulty === "Medium") lett = 2;
//     else if (difficulty === "Tough") lett = 3;
//     else lett = 4; // Too Tough

//     let [minP, maxP] = let_data[lett];

//     // 🔒 SAFETY FIX — prevents Too Tough from hanging
//     maxP = Math.min(maxP, MAX_SAFE_PIECES);

//     const circles = [];
//     for (let i = 0; i < 6; i++) {
//         circles.push(makeCircle(minP, maxP));
//     }

//     const type = Math.floor(Math.random() * 3);
//     let question, correct;

//     if (type === 0) {
//         const ref = Math.floor(Math.random() * 6);
//         question = `How many circles contain less pieces than circle ${ref + 1}?`;
//         correct = circles.filter(c => c.pieces < circles[ref].pieces).length;
//     } else if (type === 1) {
//         const ref = Math.floor(Math.random() * 6);
//         question = `How many circles contain more pieces than circle ${ref + 1}?`;
//         correct = circles.filter(c => c.pieces > circles[ref].pieces).length;
//     } else {
//         const max = Math.max(...circles.map(c => c.pieces));
//         const idx = circles.findIndex(c => c.pieces === max);
//         question = `Which circle has the most pieces and how many pieces does it have?`;
//         correct = `${idx + 1}-${max}`;
//     }

//     const answers = new Set([String(correct)]);
//     while (answers.size < 4) {
//         answers.add(
//             type === 2
//                 ? `${Math.floor(Math.random() * 6) + 1}-${Math.floor(Math.random() * 30)}`
//                 : String(Math.floor(Math.random() * 7))
//         );
//     }

//     const options = [...answers].sort(() => Math.random() - 0.5);
//     return { circles, question, correct, options };

// }



















import { createCanvas } from 'canvas';

// -------- CONFIGURATION --------
const WIDTH = 400;
const HEIGHT = 250;

// hard safety limit (circle geometry reality)
const MAX_SAFE_PIECES = 28;

// -------- PER-BASED DIFFICULTY (UNCHANGED STRUCTURE) --------
function diff_lt(nl) {
    let DIFF;

    const n = parseInt(nl);
    if(n === 105){
        DIFF = {
            0: [1, 1 + n],
            1: [2, 2 + n],
            2: [3, 3 + n],
            3: [4, 4 + n],
            4: [5, 5 + n]
        };
    }else{
        DIFF = {
            0: [1, 1 + n],
            1: [2, 2 + n],
            2: [3, 3 + n],
            3: [4, 4 + n],
            4: [5, 5 + n]
        };
    }
    

    return DIFF;
}

// -------- HELPER FUNCTIONS --------
function polar(cx, cy, r, a) {
    const rad = (a - 90) * Math.PI / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function makeCircle(minP, maxP) {
    const target = Math.floor(Math.random() * (maxP - minP + 1)) + minP;
    const cuts = [0, 360];

    while (cuts.length < target + 1) {
        const a = Math.random() * 360;
        if (!cuts.some(v => Math.abs(v - a) < 8)) cuts.push(a);
    }
    cuts.sort((a, b) => a - b);

    let count = 0;
    const paths = [];

    for (let i = 0; i < cuts.length - 1; i++) {
        const gap = 4 + Math.random() * 5;
        const s = cuts[i] + gap;
        const e = cuts[i + 1] - gap;
        if (e > s) {
            count++;
            paths.push({ s, e, strokeWidth: 2 + Math.random() * 2 });
        }
    }

    return { pieces: count, paths };
}

// -------- DRAWING FUNCTION WITH NUMBERS --------
export function drawCircles(circles) {
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.strokeStyle = 'black';
    ctx.font = '16px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const positions = [
        { x: 70, y: 70 },
        { x: 200, y: 70 },
        { x: 330, y: 70 },
        { x: 70, y: 180 },
        { x: 200, y: 180 },
        { x: 330, y: 180 },
    ];

    circles.forEach((circle, i) => {
        ctx.save();
        ctx.translate(positions[i].x, positions[i].y);

        circle.paths.forEach(p => {
            // draw arc (piece)
            ctx.beginPath();
            ctx.lineWidth = p.strokeWidth;
            ctx.arc(
                0,
                0,
                38,
                (p.s - 90) * Math.PI / 180,
                (p.e - 90) * Math.PI / 180
            );
            ctx.stroke();

            // 🔴 draw piece marker (center of arc)
            const midAngle = (p.s + p.e) / 2;
            const rad = (midAngle - 90) * Math.PI / 180;
            const dotX = Math.cos(rad) * 30;
            const dotY = Math.sin(rad) * 30;

            ctx.beginPath();
            ctx.arc(dotX, dotY, 2.2, 0, Math.PI * 2);
            ctx.fill();
        });


        ctx.fillText(String(i + 1), 0, 0);
        ctx.restore();
    });



    return canvas;

}

// -------- GENERATE PUZZLE + OPTIONS --------
export function generatePuzzle(difficulty, nl) {
    const let_data = diff_lt(nl);

    let lett;
    if (difficulty === "Too Easy") lett = 0;
    else if (difficulty === "Easy") lett = 1;
    else if (difficulty === "Medium") lett = 2;
    else if (difficulty === "Tough") lett = 3;
    else lett = 4; // Too Tough

    let [minP, maxP] = let_data[lett];

    // 🔒 SAFETY FIX — prevents Too Tough from hanging
    maxP = Math.min(maxP, MAX_SAFE_PIECES);

    const circles = [];
    for (let i = 0; i < 6; i++) {
        circles.push(makeCircle(minP, maxP));
    }

    const type = Math.floor(Math.random() * 3);
    let question, correct;

    if (type === 0) {
        const ref = Math.floor(Math.random() * 6);
        question = `How many circles contain less pieces than circle ${ref + 1}?, [Make count pieces or Dots]`;
        correct = circles.filter(c => c.pieces < circles[ref].pieces).length;
    } else if (type === 1) {
        const ref = Math.floor(Math.random() * 6);
        question = `How many circles contain more pieces than circle ${ref + 1}?[Make count pieces or Dots]`;
        correct = circles.filter(c => c.pieces > circles[ref].pieces).length;
    } else {
        const max = Math.max(...circles.map(c => c.pieces));
        const idx = circles.findIndex(c => c.pieces === max);
        question = `Which circle has the most pieces and how many pieces does it have?[Make count pieces or Dots]`;
        correct = `${idx + 1}-${max}`;
    }

    // -------- NEAR-ANSWER OPTIONS (MAX 6) --------
    const answers = new Set();
    answers.add(String(correct));

    if (type === 2) {
        // format: "circleIndex-pieceCount"
        const [idx, val] = correct.split("-").map(Number);

        const near = [
            `${idx}-${val - 2}`,
            `${idx}-${val - 1}`,
            `${idx}-${val + 1}`,
            `${idx}-${val + 2}`,
            `${idx + 1}-${val}`
        ];

        for (const v of near) {
            if (
                answers.size < 6 &&
                !v.includes("0") &&   // avoids invalid circle index
                !v.includes("7")     // max circle is 6
            ) {
                answers.add(v);
            }
        }

    } else {
        // numeric answers
        const c = Number(correct);
        const near = [c - 2, c - 1, c + 1, c + 2, c + 3];

        for (const n of near) {
            if (answers.size < 6 && n >= 0) {
                answers.add(String(n));
            }
        }
    }

    const options = [...answers].sort(() => Math.random() - 0.5);


    return { circles, question, correct, options };

}


