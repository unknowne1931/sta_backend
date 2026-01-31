// // import { createCanvas } from "canvas";
// // import axios from "axios";
// // import FormData from "form-data";


// // // const LEVELS1 = {
// // //     "Too Easy": 3,
// // //     "Easy": 5,
// // //     "Medium": 8,
// // //     "Tough": 12,
// // //     "Too Tough": 12
// // // };

// // export const DIRECTIONS = [
// //     { name: "East", angle: 0 },
// //     { name: "South East", angle: 45 },
// //     { name: "South", angle: 90 },
// //     { name: "South West", angle: 135 },
// //     { name: "West", angle: 180 },
// //     { name: "North West", angle: 225 },
// //     { name: "North", angle: 270 },
// //     { name: "North East", angle: 315 }
// // ];

// // // ----------------------------------
// // // GENERATE RANDOM ARROWS
// // // ----------------------------------

// // export function generateArrows(per, level) {
// //     let LEVELS = {}; // must be let, not const

// //     if (per < 10) {
// //         LEVELS = {
// //             "Too Easy": 3,
// //             "Easy": 5,
// //             "Medium": 8,
// //             "Tough": 12,
// //             "Too Tough": 12
// //         };
// //     } else if (per < 20) {
// //         LEVELS = {
// //             "Too Easy": 5,
// //             "Easy": 10,
// //             "Medium": 15,
// //             "Tough": 20,
// //             "Too Tough": 25
// //         };
// //     } else if (per < 30) {
// //         LEVELS = {
// //             "Too Easy": 10,
// //             "Easy": 15,
// //             "Medium": 20,
// //             "Tough": 25,
// //             "Too Tough": 30
// //         };
// //     } else if (per < 40) {
// //         LEVELS = {
// //             "Too Easy": 15,
// //             "Easy": 20,
// //             "Medium": 25,
// //             "Tough": 30,
// //             "Too Tough": 35
// //         };
// //     } else if (per < 50) {
// //         LEVELS = {
// //             "Too Easy": 20,
// //             "Easy": 25,
// //             "Medium": 30,
// //             "Tough": 35,
// //             "Too Tough": 40
// //         };
// //     } else if (per < 60) {
// //         LEVELS = {
// //             "Too Easy": 25,
// //             "Easy": 30,
// //             "Medium": 35,
// //             "Tough": 40,
// //             "Too Tough": 45
// //         };
// //     } else if (per < 70) {
// //         LEVELS = {
// //             "Too Easy": 30,
// //             "Easy": 35,
// //             "Medium": 40,
// //             "Tough": 45,
// //             "Too Tough": 50
// //         };
// //     } else if (per < 80) {
// //         LEVELS = {
// //             "Too Easy": 35,
// //             "Easy": 40,
// //             "Medium": 45,
// //             "Tough": 50,
// //             "Too Tough": 55
// //         };
// //     } else if (per < 90) {
// //         LEVELS = {
// //             "Too Easy": 40,
// //             "Easy": 45,
// //             "Medium": 50,
// //             "Tough": 55,
// //             "Too Tough": 60
// //         };
// //     } else{
// //         LEVELS = {
// //             "Too Easy": 45,
// //             "Easy": 50,
// //             "Medium": 55,
// //             "Tough": 60,
// //             "Too Tough": 65
// //         };
// //     } 

// //     const count = LEVELS[level] || 5;
// //     const arrows = [];

// //     for (let i = 0; i < count; i++) {
// //         const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
// //         arrows.push(dir.angle);
// //     }

// //     return arrows;
// // }

// // // ----------------------------------
// // // DRAW ARROWS TO CANVAS
// // // ----------------------------------
// // export function drawArrowsImage(angles) {
// //     const width = 400;
// //     const height = 250;
// //     const canvas = createCanvas(width, height);
// //     const ctx = canvas.getContext("2d");

// //     ctx.fillStyle = "#fff";
// //     ctx.fillRect(0, 0, width, height);

// //     angles.forEach(angle => {
// //         const x = Math.random() * (width - 40) + 20;
// //         const y = Math.random() * (height - 40) + 20;

// //         ctx.save();
// //         ctx.translate(x, y);
// //         ctx.rotate((angle * Math.PI) / 180);

// //         ctx.strokeStyle = "#333";
// //         ctx.lineWidth = 4;
// //         ctx.beginPath();
// //         ctx.moveTo(-10, 0);
// //         ctx.lineTo(20, 0);
// //         ctx.lineTo(10, -7);
// //         ctx.moveTo(20, 0);
// //         ctx.lineTo(10, 7);
// //         ctx.stroke();

// //         ctx.restore();
// //     });

// //     return canvas.toBuffer("image/png");
// // }

// // // ----------------------------------
// // // GENERATE MCQ OPTIONS
// // // ----------------------------------
// // export function generateMCQOptions(correct, totalArrows) {
// //     const options = new Set();
// //     options.add(correct);

// //     let i = 1;
// //     while (options.size < 4) {
// //         const low = correct - i;
// //         const high = correct + i;

// //         if (low >= 0) options.add(low);
// //         if (options.size < 4 && high <= totalArrows) options.add(high);

// //         i++;
// //         if (i > 20) break;
// //     }

// //     return [...options].sort(() => Math.random() - 0.5);
// // }

// // // ----------------------------------
// // // UPLOAD IMAGE Manual like ss
// // // ----------------------------------
// // // export async function uploadImage1(buffer) {
// // //     const form = new FormData();
// // //     form.append("screenshot", buffer, "arrows.png");

// // //     const res = await axios.post(
// // //         "https://backend.stawro.com/stawro/upload.php",
// // //         form,
// // //         { headers: form.getHeaders() }
// // //     );

// // //     return res.data.status
// // //         ? `https://backend.stawro.com/stawro/${res.data.path}`
// // //         : null;
// // // }

// // export async function uploadImage1(buffer) {

// //     const image = buffer.toString("base64")


// //     return image

// // }























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

    if (per < 5) {
        LEVELS = {
            "Too Easy": 25,
            "Easy": 30,
            "Medium": 35,
            "Tough": 40,
            "Too Tough": 45
        };
    } else if (per < 10) {
        LEVELS = {
            "Too Easy": 20,
            "Easy": 25,
            "Medium": 30,
            "Tough": 35,
            "Too Tough": 40
        };
    }else if (per < 15) {
        LEVELS = {
            "Too Easy": 15,
            "Easy": 20,
            "Medium": 25,
            "Tough": 30,
            "Too Tough": 35
        };
    }else if (per < 20) {
        LEVELS = {
            "Too Easy": 8,
            "Easy": 10,
            "Medium": 12,
            "Tough": 14,
            "Too Tough": 16
        };
    }else if (per < 25) {
        LEVELS = {
            "Too Easy": 10,
            "Easy": 12,
            "Medium": 14,
            "Tough": 16,
            "Too Tough": 18
        };
    }else if (per < 30) {
        LEVELS = {
            "Too Easy": 12,
            "Easy": 14,
            "Medium": 16,
            "Tough": 18,
            "Too Tough": 20
        };
    }else if (per < 35) {
        LEVELS = {
            "Too Easy": 14,
            "Easy": 16,
            "Medium": 18,
            "Tough": 20,
            "Too Tough": 22
        };
    }else if (per < 40) {
        LEVELS = {
            "Too Easy": 16,
            "Easy": 18,
            "Medium": 20,
            "Tough": 22,
            "Too Tough": 24
        };
    }else if (per < 45) {
        LEVELS = {
            "Too Easy": 18,
            "Easy": 20,
            "Medium": 22,
            "Tough": 24,
            "Too Tough": 26
        };
    }else if (per < 50) {
        LEVELS = {
            "Too Easy": 20,
            "Easy": 22,
            "Medium": 24,
            "Tough": 26,
            "Too Tough": 28
        };
    }else if (per < 55) {
        LEVELS = {
            "Too Easy": 22,
            "Easy": 24,
            "Medium": 26,
            "Tough": 28,
            "Too Tough": 30
        };
    }else if (per < 60) {
        LEVELS = {
            "Too Easy": 24,
            "Easy": 26,
            "Medium": 28,
            "Tough": 30,
            "Too Tough": 32
        };
    }else if (per < 65) {
        LEVELS = {
            "Too Easy": 26,
            "Easy": 28,
            "Medium": 30,
            "Tough": 32,
            "Too Tough": 34
        };
    }else if (per < 70) {
        LEVELS = {
            "Too Easy": 28,
            "Easy": 30,
            "Medium": 32,
            "Tough": 34,
            "Too Tough": 36
        };
    }else if (per < 75) {
        LEVELS = {
            "Too Easy": 30,
            "Easy": 32,
            "Medium": 34,
            "Tough": 36,
            "Too Tough": 38
        };
    }else if (per < 80) {
        LEVELS = {
            "Too Easy": 32,
            "Easy": 34,
            "Medium": 36,
            "Tough": 38,
            "Too Tough": 40
        };
    }else if (per < 85) {
        LEVELS = {
            "Too Easy": 34,
            "Easy": 36,
            "Medium": 38,
            "Tough": 40,
            "Too Tough": 42
        };
    }else if (per < 90) {
        LEVELS = {
            "Too Easy": 36,
            "Easy": 38,
            "Medium": 40,
            "Tough": 42,
            "Too Tough": 44
        };
    }else if (per < 95) {
        LEVELS = {
            "Too Easy": 38,
            "Easy": 40,
            "Medium": 42,
            "Tough": 44,
            "Too Tough": 46
        };
    }else{
        LEVELS = {
            "Too Easy": 40,
            "Easy": 45,
            "Medium": 50,
            "Tough": 55,
            "Too Tough": 60
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

export async function uploadImage1(buffer) {

    const image = buffer.toString("base64")


    return image

}











































// import { createCanvas } from "canvas";
// import axios from "axios";
// import FormData from "form-data";


// // const LEVELS1 = {
// //     "Too Easy": 3,
// //     "Easy": 5,
// //     "Medium": 8,
// //     "Tough": 12,
// //     "Too Tough": 12
// // };

// export const DIRECTIONS = [
//     { name: "East", angle: 0 },
//     { name: "South East", angle: 45 },
//     { name: "South", angle: 90 },
//     { name: "South West", angle: 135 },
//     { name: "West", angle: 180 },
//     { name: "North West", angle: 225 },
//     { name: "North", angle: 270 },
//     { name: "North East", angle: 315 }
// ];

// // ----------------------------------
// // GENERATE RANDOM ARROWS
// // ----------------------------------

// export function generateArrows(per, level) {
//     let LEVELS = {}; // must be let, not const

//     if (per < 10) {
//         LEVELS = {
//             "Too Easy": 3,
//             "Easy": 5,
//             "Medium": 8,
//             "Tough": 12,
//             "Too Tough": 12
//         };
//     } else if (per < 20) {
//         LEVELS = {
//             "Too Easy": 5,
//             "Easy": 10,
//             "Medium": 15,
//             "Tough": 20,
//             "Too Tough": 25
//         };
//     } else if (per < 30) {
//         LEVELS = {
//             "Too Easy": 10,
//             "Easy": 15,
//             "Medium": 20,
//             "Tough": 25,
//             "Too Tough": 30
//         };
//     } else if (per < 40) {
//         LEVELS = {
//             "Too Easy": 15,
//             "Easy": 20,
//             "Medium": 25,
//             "Tough": 30,
//             "Too Tough": 35
//         };
//     } else if (per < 50) {
//         LEVELS = {
//             "Too Easy": 20,
//             "Easy": 25,
//             "Medium": 30,
//             "Tough": 35,
//             "Too Tough": 40
//         };
//     } else if (per < 60) {
//         LEVELS = {
//             "Too Easy": 25,
//             "Easy": 30,
//             "Medium": 35,
//             "Tough": 40,
//             "Too Tough": 45
//         };
//     } else if (per < 70) {
//         LEVELS = {
//             "Too Easy": 30,
//             "Easy": 35,
//             "Medium": 40,
//             "Tough": 45,
//             "Too Tough": 50
//         };
//     } else if (per < 80) {
//         LEVELS = {
//             "Too Easy": 35,
//             "Easy": 40,
//             "Medium": 45,
//             "Tough": 50,
//             "Too Tough": 55
//         };
//     } else if (per < 90) {
//         LEVELS = {
//             "Too Easy": 40,
//             "Easy": 45,
//             "Medium": 50,
//             "Tough": 55,
//             "Too Tough": 60
//         };
//     } else{
//         LEVELS = {
//             "Too Easy": 45,
//             "Easy": 50,
//             "Medium": 55,
//             "Tough": 60,
//             "Too Tough": 65
//         };
//     } 

//     const count = LEVELS[level] || 5;
//     const arrows = [];

//     for (let i = 0; i < count; i++) {
//         const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
//         arrows.push(dir.angle);
//     }

//     return arrows;
// }

// // ----------------------------------
// // DRAW ARROWS TO CANVAS
// // ----------------------------------
// export function drawArrowsImage(angles) {
//     const width = 400;
//     const height = 250;
//     const canvas = createCanvas(width, height);
//     const ctx = canvas.getContext("2d");

//     ctx.fillStyle = "#fff";
//     ctx.fillRect(0, 0, width, height);

//     angles.forEach(angle => {
//         const x = Math.random() * (width - 40) + 20;
//         const y = Math.random() * (height - 40) + 20;

//         ctx.save();
//         ctx.translate(x, y);
//         ctx.rotate((angle * Math.PI) / 180);

//         ctx.strokeStyle = "#333";
//         ctx.lineWidth = 4;
//         ctx.beginPath();
//         ctx.moveTo(-10, 0);
//         ctx.lineTo(20, 0);
//         ctx.lineTo(10, -7);
//         ctx.moveTo(20, 0);
//         ctx.lineTo(10, 7);
//         ctx.stroke();

//         ctx.restore();
//     });

//     return canvas.toBuffer("image/png");
// }

// // ----------------------------------
// // GENERATE MCQ OPTIONS
// // ----------------------------------
// export function generateMCQOptions(correct, totalArrows) {
//     const options = new Set();
//     options.add(correct);

//     let i = 1;
//     while (options.size < 4) {
//         const low = correct - i;
//         const high = correct + i;

//         if (low >= 0) options.add(low);
//         if (options.size < 4 && high <= totalArrows) options.add(high);

//         i++;
//         if (i > 20) break;
//     }

//     return [...options].sort(() => Math.random() - 0.5);
// }

// // ----------------------------------
// // UPLOAD IMAGE Manual like ss
// // ----------------------------------
// // export async function uploadImage1(buffer) {
// //     const form = new FormData();
// //     form.append("screenshot", buffer, "arrows.png");

// //     const res = await axios.post(
// //         "https://backend.stawro.com/stawro/upload.php",
// //         form,
// //         { headers: form.getHeaders() }
// //     );

// //     return res.data.status
// //         ? `https://backend.stawro.com/stawro/${res.data.path}`
// //         : null;
// // }

// export async function uploadImage1(buffer) {

//     const image = buffer.toString("base64")


//     return image

// }























// import { createCanvas } from "canvas";
// import axios from "axios";
// import FormData from "form-data";


// // const LEVELS1 = {
// //     "Too Easy": 3,
// //     "Easy": 5,
// //     "Medium": 8,
// //     "Tough": 12,
// //     "Too Tough": 12
// // };

// export const DIRECTIONS = [
//     { name: "East", angle: 0 },
//     { name: "South East", angle: 45 },
//     { name: "South", angle: 90 },
//     { name: "South West", angle: 135 },
//     { name: "West", angle: 180 },
//     { name: "North West", angle: 225 },
//     { name: "North", angle: 270 },
//     { name: "North East", angle: 315 }
// ];

// // ----------------------------------
// // GENERATE RANDOM ARROWS
// // ----------------------------------

// export function generateArrows(per, level, per_2) {
//     let LEVELS = {}; // must be let, not const

//     if (per_2 === "1") {
//         if (per < 5) {
//             LEVELS = {
//                 "Too Easy": 2,
//                 "Easy": 4,
//                 "Medium": 6,
//                 "Tough": 8,
//                 "Too Tough": 10
//             };
//         } else if (per < 10) {
//             LEVELS = {
//                 "Too Easy": 4,
//                 "Easy": 6,
//                 "Medium": 8,
//                 "Tough": 10,
//                 "Too Tough": 12
//             };
//         } else if (per < 15) {
//             LEVELS = {
//                 "Too Easy": 6,
//                 "Easy": 8,
//                 "Medium": 10,
//                 "Tough": 12,
//                 "Too Tough": 14
//             };
//         } else if (per < 20) {
//             LEVELS = {
//                 "Too Easy": 8,
//                 "Easy": 10,
//                 "Medium": 12,
//                 "Tough": 14,
//                 "Too Tough": 16
//             };
//         } else if (per < 25) {
//             LEVELS = {
//                 "Too Easy": 10,
//                 "Easy": 12,
//                 "Medium": 14,
//                 "Tough": 16,
//                 "Too Tough": 18
//             };
//         } else if (per < 30) {
//             LEVELS = {
//                 "Too Easy": 12,
//                 "Easy": 14,
//                 "Medium": 16,
//                 "Tough": 18,
//                 "Too Tough": 20
//             };
//         } else if (per < 35) {
//             LEVELS = {
//                 "Too Easy": 14,
//                 "Easy": 16,
//                 "Medium": 18,
//                 "Tough": 20,
//                 "Too Tough": 22
//             };
//         } else if (per < 40) {
//             LEVELS = {
//                 "Too Easy": 16,
//                 "Easy": 18,
//                 "Medium": 20,
//                 "Tough": 22,
//                 "Too Tough": 24
//             };
//         } else if (per < 45) {
//             LEVELS = {
//                 "Too Easy": 18,
//                 "Easy": 20,
//                 "Medium": 22,
//                 "Tough": 24,
//                 "Too Tough": 26
//             };
//         } else if (per < 50) {
//             LEVELS = {
//                 "Too Easy": 20,
//                 "Easy": 22,
//                 "Medium": 24,
//                 "Tough": 26,
//                 "Too Tough": 28
//             };
//         } else if (per < 55) {
//             LEVELS = {
//                 "Too Easy": 22,
//                 "Easy": 24,
//                 "Medium": 26,
//                 "Tough": 28,
//                 "Too Tough": 30
//             };
//         } else if (per < 60) {
//             LEVELS = {
//                 "Too Easy": 24,
//                 "Easy": 26,
//                 "Medium": 28,
//                 "Tough": 30,
//                 "Too Tough": 32
//             };
//         } else if (per < 65) {
//             LEVELS = {
//                 "Too Easy": 26,
//                 "Easy": 28,
//                 "Medium": 30,
//                 "Tough": 32,
//                 "Too Tough": 34
//             };
//         } else if (per < 70) {
//             LEVELS = {
//                 "Too Easy": 28,
//                 "Easy": 30,
//                 "Medium": 32,
//                 "Tough": 34,
//                 "Too Tough": 36
//             };
//         } else if (per < 75) {
//             LEVELS = {
//                 "Too Easy": 30,
//                 "Easy": 32,
//                 "Medium": 34,
//                 "Tough": 36,
//                 "Too Tough": 38
//             };
//         } else if (per < 80) {
//             LEVELS = {
//                 "Too Easy": 32,
//                 "Easy": 34,
//                 "Medium": 36,
//                 "Tough": 38,
//                 "Too Tough": 40
//             };
//         } else if (per < 85) {
//             LEVELS = {
//                 "Too Easy": 34,
//                 "Easy": 36,
//                 "Medium": 38,
//                 "Tough": 40,
//                 "Too Tough": 42
//             };
//         } else if (per < 90) {
//             LEVELS = {
//                 "Too Easy": 36,
//                 "Easy": 38,
//                 "Medium": 40,
//                 "Tough": 42,
//                 "Too Tough": 44
//             };
//         } else if (per < 95) {
//             LEVELS = {
//                 "Too Easy": 38,
//                 "Easy": 40,
//                 "Medium": 42,
//                 "Tough": 44,
//                 "Too Tough": 46
//             };
//         } else {
//             LEVELS = {
//                 "Too Easy": 40,
//                 "Easy": 45,
//                 "Medium": 50,
//                 "Tough": 55,
//                 "Too Tough": 60
//             };
//         }
//     } else {
//         if (per < 5) {
//             LEVELS = {
//                 "Too Easy": 2,
//                 "Easy": 4,
//                 "Medium": 6,
//                 "Tough": 8,
//                 "Too Tough": 10
//             };
//         } else if (per < 10) {
//             LEVELS = {
//                 "Too Easy": 4,
//                 "Easy": 6,
//                 "Medium": 8,
//                 "Tough": 10,
//                 "Too Tough": 12
//             };
//         } else if (per < 15) {
//             LEVELS = {
//                 "Too Easy": 6,
//                 "Easy": 8,
//                 "Medium": 10,
//                 "Tough": 12,
//                 "Too Tough": 14
//             };
//         } else if (per < 20) {
//             LEVELS = {
//                 "Too Easy": 8,
//                 "Easy": 10,
//                 "Medium": 12,
//                 "Tough": 14,
//                 "Too Tough": 16
//             };
//         } else if (per < 25) {
//             LEVELS = {
//                 "Too Easy": 10,
//                 "Easy": 12,
//                 "Medium": 14,
//                 "Tough": 16,
//                 "Too Tough": 18
//             };
//         } else if (per < 30) {
//             LEVELS = {
//                 "Too Easy": 12,
//                 "Easy": 14,
//                 "Medium": 16,
//                 "Tough": 18,
//                 "Too Tough": 20
//             };
//         } else if (per < 35) {
//             LEVELS = {
//                 "Too Easy": 14,
//                 "Easy": 16,
//                 "Medium": 18,
//                 "Tough": 20,
//                 "Too Tough": 22
//             };
//         } else if (per < 40) {
//             LEVELS = {
//                 "Too Easy": 16,
//                 "Easy": 18,
//                 "Medium": 20,
//                 "Tough": 22,
//                 "Too Tough": 24
//             };
//         } else if (per < 45) {
//             LEVELS = {
//                 "Too Easy": 18,
//                 "Easy": 20,
//                 "Medium": 22,
//                 "Tough": 24,
//                 "Too Tough": 26
//             };
//         } else if (per < 50) {
//             LEVELS = {
//                 "Too Easy": 20,
//                 "Easy": 22,
//                 "Medium": 24,
//                 "Tough": 26,
//                 "Too Tough": 28
//             };
//         } else if (per < 55) {
//             LEVELS = {
//                 "Too Easy": 22,
//                 "Easy": 24,
//                 "Medium": 26,
//                 "Tough": 28,
//                 "Too Tough": 30
//             };
//         } else if (per < 60) {
//             LEVELS = {
//                 "Too Easy": 24,
//                 "Easy": 26,
//                 "Medium": 28,
//                 "Tough": 30,
//                 "Too Tough": 32
//             };
//         } else if (per < 65) {
//             LEVELS = {
//                 "Too Easy": 26,
//                 "Easy": 28,
//                 "Medium": 30,
//                 "Tough": 32,
//                 "Too Tough": 34
//             };
//         } else if (per < 70) {
//             LEVELS = {
//                 "Too Easy": 28,
//                 "Easy": 30,
//                 "Medium": 32,
//                 "Tough": 34,
//                 "Too Tough": 36
//             };
//         } else if (per < 75) {
//             LEVELS = {
//                 "Too Easy": 30,
//                 "Easy": 32,
//                 "Medium": 34,
//                 "Tough": 36,
//                 "Too Tough": 38
//             };
//         } else if (per < 80) {
//             LEVELS = {
//                 "Too Easy": 32,
//                 "Easy": 34,
//                 "Medium": 36,
//                 "Tough": 38,
//                 "Too Tough": 40
//             };
//         } else if (per < 85) {
//             LEVELS = {
//                 "Too Easy": 34,
//                 "Easy": 36,
//                 "Medium": 38,
//                 "Tough": 40,
//                 "Too Tough": 42
//             };
//         } else if (per < 90) {
//             LEVELS = {
//                 "Too Easy": 36,
//                 "Easy": 38,
//                 "Medium": 40,
//                 "Tough": 42,
//                 "Too Tough": 44
//             };
//         } else if (per < 95) {
//             LEVELS = {
//                 "Too Easy": 38,
//                 "Easy": 40,
//                 "Medium": 42,
//                 "Tough": 44,
//                 "Too Tough": 46
//             };
//         } else {
//             LEVELS = {
//                 "Too Easy": 40,
//                 "Easy": 45,
//                 "Medium": 50,
//                 "Tough": 55,
//                 "Too Tough": 60
//             };
//         }
//     }

//     const count = LEVELS[level] || 5;
//     const arrows = [];

//     for (let i = 0; i < count; i++) {
//         const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
//         arrows.push(dir.angle);
//     }

//     return arrows;
// }

// // ----------------------------------
// // DRAW ARROWS TO CANVAS
// // ----------------------------------
// export function drawArrowsImage(angles) {
//     const width = 400;
//     const height = 250;
//     const canvas = createCanvas(width, height);
//     const ctx = canvas.getContext("2d");

//     ctx.fillStyle = "#fff";
//     ctx.fillRect(0, 0, width, height);

//     angles.forEach(angle => {
//         const x = Math.random() * (width - 40) + 20;
//         const y = Math.random() * (height - 40) + 20;

//         ctx.save();
//         ctx.translate(x, y);
//         ctx.rotate((angle * Math.PI) / 180);

//         ctx.strokeStyle = "#333";
//         ctx.lineWidth = 4;
//         ctx.beginPath();
//         ctx.moveTo(-10, 0);
//         ctx.lineTo(20, 0);
//         ctx.lineTo(10, -7);
//         ctx.moveTo(20, 0);
//         ctx.lineTo(10, 7);
//         ctx.stroke();

//         ctx.restore();
//     });

//     return canvas.toBuffer("image/png");
// }

// // ----------------------------------
// // GENERATE MCQ OPTIONS
// // ----------------------------------
// export function generateMCQOptions(correct, totalArrows) {
//     const options = new Set();
//     options.add(correct);

//     let i = 1;
//     while (options.size < 4) {
//         const low = correct - i;
//         const high = correct + i;

//         if (low >= 0) options.add(low);
//         if (options.size < 4 && high <= totalArrows) options.add(high);

//         i++;
//         if (i > 20) break;
//     }

//     return [...options].sort(() => Math.random() - 0.5);
// }

// export async function uploadImage1(buffer) {

//     const image = buffer.toString("base64")


//     return image

// }


