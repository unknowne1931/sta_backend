import { createCanvas } from "canvas";
import axios from "axios";
import FormData from "form-data";


// const LEVELS1 = {
//     "Too Easy": 3,
//     "Easy": 5,
//     "Medium": 8,
//     "Tough": 12,
//     "Too Tough": 12
// };

export const DIRECTIONS = [
    { name: "East", angle: 0 },
    { name: "South East", angle: 45 },
    { name: "South", angle: 90 },
    { name: "South West", angle: 135 },
    { name: "West", angle: 180 },
    { name: "North West", angle: 225 },
    { name: "North", angle: 270 },
    { name: "North East", angle: 315 }
];

// ----------------------------------
// GENERATE RANDOM ARROWS
// ----------------------------------

export function generateArrows(per, level) {
    let LEVELS = {}; // must be let, not const

    if (per < 10) {
        LEVELS = {
            "Too Easy": 3,
            "Easy": 5,
            "Medium": 8,
            "Tough": 12,
            "Too Tough": 12
        };
    } else if (per < 20) {
        LEVELS = {
            "Too Easy": 5,
            "Easy": 8,
            "Medium": 10,
            "Tough": 16,
            "Too Tough": 20
        };
    } else if (per < 40) {
        LEVELS = {
            "Too Easy": 7,
            "Easy": 11,
            "Medium": 14,
            "Tough": 20,
            "Too Tough": 22
        };
    } else if (per < 60) {
        LEVELS = {
            "Too Easy": 9,
            "Easy": 14,
            "Medium": 20,
            "Tough": 24,
            "Too Tough": 30
        };
    } else {
        LEVELS = {
            "Too Easy": 10,
            "Easy": 15,
            "Medium": 25,
            "Tough": 30,
            "Too Tough": 35
        };
    }

    const count = LEVELS[level] || 5;
    const arrows = [];

    for (let i = 0; i < count; i++) {
        const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
        arrows.push(dir.angle);
    }

    return arrows;
}

// ----------------------------------
// DRAW ARROWS TO CANVAS
// ----------------------------------
export function drawArrowsImage(angles) {
    const width = 400;
    const height = 250;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, width, height);

    angles.forEach(angle => {
        const x = Math.random() * (width - 40) + 20;
        const y = Math.random() * (height - 40) + 20;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate((angle * Math.PI) / 180);

        ctx.strokeStyle = "#333";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(-10, 0);
        ctx.lineTo(20, 0);
        ctx.lineTo(10, -7);
        ctx.moveTo(20, 0);
        ctx.lineTo(10, 7);
        ctx.stroke();

        ctx.restore();
    });

    return canvas.toBuffer("image/png");
}

// ----------------------------------
// GENERATE MCQ OPTIONS
// ----------------------------------
export function generateMCQOptions(correct, totalArrows) {
    const options = new Set();
    options.add(correct);

    let i = 1;
    while (options.size < 4) {
        const low = correct - i;
        const high = correct + i;

        if (low >= 0) options.add(low);
        if (options.size < 4 && high <= totalArrows) options.add(high);

        i++;
        if (i > 20) break;
    }

    return [...options].sort(() => Math.random() - 0.5);
}

// ----------------------------------
// UPLOAD IMAGE Manual like ss
// ----------------------------------
// export async function uploadImage1(buffer) {
//     const form = new FormData();
//     form.append("screenshot", buffer, "arrows.png");

//     const res = await axios.post(
//         "https://backend.stawro.com/stawro/upload.php",
//         form,
//         { headers: form.getHeaders() }
//     );

//     return res.data.status
//         ? `https://backend.stawro.com/stawro/${res.data.path}`
//         : null;
// }

export async function uploadImage1(buffer) {

    const image = buffer.toString("base64")


    return image

}


