// // broken_circle_puzzle_base64_numbered.js
// import { createCanvas } from 'canvas';

// // -------- CONFIGURATION --------
// const LEVELS = [
//   [2, 4],
//   [3, 6],
//   [5, 8],
//   [7, 12],
//   [20, 26]
// ];

// const WIDTH = 400;
// const HEIGHT = 250;

// // -------- ADD: PER-BASED DIFFICULTY (EXACT STYLE LIKE YOUR EXAMPLE) --------
// function diff_lt(per) {
//   let DIFF;

//   if (per < 10) {
//     DIFF = { 0: [2, 4], 1: [3, 6], 2: [5, 8], 3: [7, 10], 4: [9, 12] };
//   } else if (per < 20) {
//     DIFF = { 0: [3, 6], 1: [5, 8], 2: [7, 10], 3: [9, 12], 4: [11, 14] };
//   } else if (per < 30) {
//     DIFF = { 0: [5, 8], 1: [7, 10], 2: [9, 12], 3: [11, 14], 4: [13, 16] };
//   } else if (per < 40) {
//     DIFF = { 
//         0: [7, 10], 
//         1: [9, 12], 
//         2: [11, 14], 
//         3: [13, 16], 
//         4: [15, 20] 
//     };
//   } else if (per < 50) {
//     DIFF = { 
//         0: [9, 12], 
//         1: [11, 14], 
//         2: [13, 16], 
//         3: [18, 25], 
//         4: [22, 30] 
//     };
//   } else {
//     DIFF = { 
//         0: [12, 15], 
//         1: [14, 18], 
//         2: [16, 20], 
//         3: [22, 30], 
//         4: [26, 35] 
//     };
//   }

//   return DIFF;
// }

// // -------- HELPER FUNCTIONS --------
// function polar(cx, cy, r, a) {
//   const rad = (a - 90) * Math.PI / 180;
//   return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
// }

// function makeCircle(minP, maxP) {
//   const target = Math.floor(Math.random() * (maxP - minP + 1)) + minP;
//   const cuts = [0, 360];

//   while (cuts.length < target + 1) {
//     const a = Math.random() * 360;
//     if (!cuts.some(v => Math.abs(v - a) < 8)) cuts.push(a);
//   }
//   cuts.sort((a, b) => a - b);

//   let count = 0;
//   const paths = [];

//   for (let i = 0; i < cuts.length - 1; i++) {
//     const gap = 4 + Math.random() * 5;
//     const s = cuts[i] + gap;
//     const e = cuts[i + 1] - gap;
//     if (e > s) {
//       count++;
//       paths.push({ s, e, strokeWidth: 2 + Math.random() * 2 });
//     }
//   }

//   return { pieces: count, paths };
// }

// // -------- DRAWING FUNCTION WITH NUMBERS --------
// export function drawCircles(circles) {
//   const canvas = createCanvas(WIDTH, HEIGHT);
//   const ctx = canvas.getContext('2d');

//   ctx.fillStyle = '#fff';
//   ctx.fillRect(0, 0, WIDTH, HEIGHT);
//   ctx.strokeStyle = 'black';
//   ctx.font = '16px Arial';
//   ctx.fillStyle = 'black';
//   ctx.textAlign = 'center';
//   ctx.textBaseline = 'middle';

//   const positions = [
//     { x: 70, y: 70 },
//     { x: 200, y: 70 },
//     { x: 330, y: 70 },
//     { x: 70, y: 180 },
//     { x: 200, y: 180 },
//     { x: 330, y: 180 },
//   ];

//   circles.forEach((circle, i) => {
//     ctx.save();
//     ctx.translate(positions[i].x, positions[i].y);

//     circle.paths.forEach(p => {
//       ctx.beginPath();
//       ctx.lineWidth = p.strokeWidth;
//       ctx.arc(0, 0, 38, (p.s - 90) * Math.PI / 180, (p.e - 90) * Math.PI / 180);
//       ctx.stroke();
//     });

//     ctx.fillText(String(i + 1), 0, 0);
//     ctx.restore();
//   });

//   return canvas;
// }

// // -------- GENERATE PUZZLE + OPTIONS --------
// export function generatePuzzle(difficulty, per) {
//   // 🔥 ONLY LINE THAT CHANGED
//   const let_data = diff_lt(per)

//   var lett;
//   if(difficulty === "Too Easy"){
//     lett = 0
//   }else if(difficulty === "Easy"){
//     lett = 1
//   }else if(difficulty === "Medium"){
//     lett = 2
//   }else if(difficulty === "Tough"){
//     lett = 3
//   }else{
//     lett = 4
//   }

//   const [minP, maxP] = let_data[lett];

//   console.log(let_data[lett])

//   const circles = [];
//   for (let i = 0; i < 6; i++) {
//     circles.push(makeCircle(minP, maxP));
//   }

//   const type = Math.floor(Math.random() * 3);
//   let question, correct;

//   if (type === 0) {
//     const ref = Math.floor(Math.random() * 6);
//     question = `How many circles contain less pieces than circle ${ref + 1}?`;
//     correct = circles.filter(c => c.pieces < circles[ref].pieces).length;
//   } else if (type === 1) {
//     const ref = Math.floor(Math.random() * 6);
//     question = `How many circles contain more pieces than circle ${ref + 1}?`;
//     correct = circles.filter(c => c.pieces > circles[ref].pieces).length;
//   } else {
//     const max = Math.max(...circles.map(c => c.pieces));
//     const idx = circles.findIndex(c => c.pieces === max);
//     question = `Which circle has the most pieces and how many pieces does it have?`;
//     correct = `${idx + 1}-${max}`;
//   }

//   const answers = new Set([String(correct)]);
//   while (answers.size < 4) {
//     answers.add(
//       type === 2
//         ? `${Math.floor(Math.random() * 6) + 1}-${Math.floor(Math.random() * 30)}`
//         : String(Math.floor(Math.random() * 7))
//     );
//   }

//   const options = [...answers].sort(() => Math.random() - 0.5);

//   return { circles, question, correct, options };
// }














// broken_circle_puzzle_base64_numbered.js
import { createCanvas } from 'canvas';

// -------- CONFIGURATION --------
const WIDTH = 400;
const HEIGHT = 250;

// hard safety limit (circle geometry reality)
const MAX_SAFE_PIECES = 28;

// -------- PER-BASED DIFFICULTY (UNCHANGED STRUCTURE) --------
function diff_lt(per) {
    let DIFF;

    if (per < 10) {
        DIFF = { 
            0: [2, 3],
            1: [3, 4], 
            2: [4, 5], 
            3: [5, 6], 
            4: [6, 7] 
        };
    }else if (per < 20) {
        DIFF = { 
            0: [3, 4],
            1: [4, 5], 
            2: [5, 6], 
            3: [6, 7], 
            4: [7, 8] 
        };
    }else if (per < 30) {
        DIFF = { 
            0: [4, 5],
            1: [5, 6], 
            2: [6, 7], 
            3: [7, 8], 
            4: [8, 9] 
        };
    }else if (per < 40) {
        DIFF = { 
            0: [5, 6],
            1: [6, 7], 
            2: [7, 8], 
            3: [8, 9], 
            4: [9, 10] 
        };
    }else if (per < 50) {
        DIFF = { 
            0: [6, 7],
            1: [7, 8], 
            2: [8, 9], 
            3: [9, 10], 
            4: [10, 11] 
        };
    }else if (per < 60) {
        DIFF = { 
            0: [7, 8],
            1: [8, 8], 
            2: [8, 9], 
            3: [9, 10], 
            4: [10, 11] 
        };
    }else if (per < 70) {
        DIFF = { 
            0: [8, 9],
            1: [9, 10], 
            2: [10, 11], 
            3: [11, 12], 
            4: [12, 13] 
        };
    }else if (per < 80) {
        DIFF = { 
            0: [9, 10],
            1: [10, 11], 
            2: [11, 12], 
            3: [12, 13], 
            4: [13, 14] 
        };
    }else if (per < 90) {
        DIFF = { 
            0: [10, 11],
            1: [11, 12], 
            2: [12, 13], 
            3: [13, 14], 
            4: [14, 15] 
        };
    }else{
        DIFF = { 
            0: [11, 12],
            1: [12, 13], 
            2: [13, 14], 
            3: [14, 15], 
            4: [15, 16] 
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
export function generatePuzzle(difficulty, per) {
    const let_data = diff_lt(per);

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
        question = `How many circles contain less pieces than circle ${ref + 1}?`;
        correct = circles.filter(c => c.pieces < circles[ref].pieces).length;
    } else if (type === 1) {
        const ref = Math.floor(Math.random() * 6);
        question = `How many circles contain more pieces than circle ${ref + 1}?`;
        correct = circles.filter(c => c.pieces > circles[ref].pieces).length;
    } else {
        const max = Math.max(...circles.map(c => c.pieces));
        const idx = circles.findIndex(c => c.pieces === max);
        question = `Which circle has the most pieces and how many pieces does it have?`;
        correct = `${idx + 1}-${max}`;
    }

    const answers = new Set([String(correct)]);
    while (answers.size < 4) {
        answers.add(
            type === 2
                ? `${Math.floor(Math.random() * 6) + 1}-${Math.floor(Math.random() * 30)}`
                : String(Math.floor(Math.random() * 7))
        );
    }

    const options = [...answers].sort(() => Math.random() - 0.5);
    return { circles, question, correct, options };

}


