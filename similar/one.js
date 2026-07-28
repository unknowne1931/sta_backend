// import { createCanvas } from "canvas";

// const colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "cyan"];

// function randomColor() {
//   return colors[Math.floor(Math.random() * colors.length)];
// }

// function drawImage() {
//   const canvas = createCanvas(300, 300);
//   const ctx = canvas.getContext("2d");

//   ctx.fillStyle = "#ffffff";
//   ctx.fillRect(0, 0, 300, 300);

//   const balls = [];

//   for (let i = 0; i < 10; i++) {
//     const color = randomColor();
//     balls.push(color);

//     const x = (i % 5) * 55 + 30;
//     const y = Math.floor(i / 5) * 120 + 80;

//     ctx.beginPath();
//     ctx.arc(x, y, 20, 0, Math.PI * 2);
//     ctx.fillStyle = color;
//     ctx.fill();
//   }

//   return {
//     base64: canvas.toDataURL(),
//     balls
//   };
// }

// function isSame(a, b) {
//   return JSON.stringify(a) === JSON.stringify(b);
// }

// export default function generateGame() {
//   const images = [];

//   const clue = drawImage();

//   let duplicates = Math.random() > 0.5 ? 2 : 3;

//   // build images with index first
//   for (let i = 0; i < 5; i++) {
//     let img;

//     if (i === 0) {
//       img = clue;
//     } else if (duplicates > 0) {
//       img = clue;
//       duplicates--;
//     } else {
//       img = drawImage();
//     }

//     images.push({
//       id: i,
//       ...img
//     });
//   }

//   // shuffle
//   images.sort(() => Math.random() - 0.5);

//   // find matching indexes
//   const answer = images
//     .filter(img => isSame(img.balls, clue.balls))
//     .map(img => img.id);

//   return {
//     question: "Which images are same as clue image?",
//     clue: clue.base64,
//     images: images.map(i => i.base64),
//     answer
//   };
// }







// import { createCanvas } from "canvas";

// const colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "cyan"];

// function randomColor() {
//   return colors[Math.floor(Math.random() * colors.length)];
// }

// function isSame(a, b) {
//   return JSON.stringify(a) === JSON.stringify(b);
// }

// function drawFromBalls(balls) {
//   const canvas = createCanvas(400, 250);
//   const ctx = canvas.getContext("2d");

//   ctx.fillStyle = "#ffffff";
//   ctx.fillRect(0, 0, 400, 250);

//   balls.forEach((color, i) => {
//     const x = (i % 5) * 70 + 60;   // spread across width
//     const y = Math.floor(i / 5) * 100 + 70; // two rows

//     ctx.beginPath();
//     ctx.arc(x, y, 25, 0, Math.PI * 2);
//     ctx.fillStyle = color;
//     ctx.fill();
//   });

//   return {
//     base64: canvas.toDataURL(),
//     balls
//   };
// }

// function createRandomBalls() {
//   const balls = [];

//   for (let i = 0; i < 10; i++) {
//     balls.push(randomColor());
//   }

//   return balls;
// }

// function createUniqueImage(clueBalls) {
//   let balls;

//   do {
//     balls = createRandomBalls();
//   } while (isSame(balls, clueBalls));

//   return drawFromBalls(balls);
// }

// export default function generateGame() {
//   const totalImages = Math.floor(Math.random() * 4) + 5; // 5-8 images
//   const duplicateCount = Math.floor(Math.random() * 3) + 2; // 2-4 matches

//   const clueBalls = createRandomBalls();
//   const clue = drawFromBalls(clueBalls);

//   const images = [];

//   // Add clue clones
//   for (let i = 0; i < duplicateCount; i++) {
//     images.push({
//       match: true,
//       base64: clue.base64,
//       balls: [...clueBalls]
//     });
//   }

//   // Add guaranteed different images
//   while (images.length < totalImages) {
//     const img = createUniqueImage(clueBalls);

//     images.push({
//       match: false,
//       ...img
//     });
//   }

//   // Shuffle
//   images.sort(() => Math.random() - 0.5);

//   // Positions that match clue AFTER shuffle
//   const answer = [];

//   images.forEach((img, index) => {
//     if (img.match) {
//       answer.push(index);
//     }
//   });

//   return {
//     question: "Which images are same as clue image?",
//     clue: clue.base64,
//     images: images.map(img => img.base64),
//     answer
//   };
// }






















// import { createCanvas } from "canvas";

// const colors = [
//   "red",
//   "blue",
//   "green",
//   "yellow",
//   "purple",
//   "orange",
//   "pink",
//   "cyan",
// ];

// function randomColor() {
//   return colors[Math.floor(Math.random() * colors.length)];
// }

// function shuffle(arr) {
//   return [...arr].sort(() => Math.random() - 0.5);
// }

// function drawFromBalls(balls) {
//   const canvas = createCanvas(400, 250);
//   const ctx = canvas.getContext("2d");

//   ctx.fillStyle = "#ffffff";
//   ctx.fillRect(0, 0, 400, 250);

//   balls.forEach((color, i) => {
//     const x = (i % 5) * 70 + 60;
//     const y = Math.floor(i / 5) * 100 + 70;

//     ctx.beginPath();
//     ctx.arc(x, y, 25, 0, Math.PI * 2);
//     ctx.fillStyle = color;
//     ctx.fill();
//   });

//   return {
//     base64: canvas.toDataURL(),
//     balls,
//   };
// }

// function containsSeries(optionBalls, clueBalls) {
//   const clue = clueBalls.join(",");

//   for (let i = 0; i <= optionBalls.length - clueBalls.length; i++) {
//     const slice = optionBalls.slice(i, i + clueBalls.length).join(",");

//     if (slice === clue) {
//       return true;
//     }
//   }

//   return false;
// }

// function createOptionWithSeries(clueBalls) {
//   const balls = [];

//   // Create 10 random balls
//   for (let i = 0; i < 10; i++) {
//     balls.push(randomColor());
//   }

//   // Insert clue sequence at random position
//   const start = Math.floor(
//     Math.random() * (10 - clueBalls.length + 1)
//   );

//   for (let i = 0; i < clueBalls.length; i++) {
//     balls[start + i] = clueBalls[i];
//   }

//   return balls;
// }

// function createOptionWithoutSeries(clueBalls) {
//   let balls;

//   do {
//     balls = [];

//     for (let i = 0; i < 10; i++) {
//       balls.push(randomColor());
//     }
//   } while (containsSeries(balls, clueBalls));

//   return balls;
// }

// export default function generateGame() {
//   // Clue series length: 3-5 colors
//   const clueLength = Math.floor(Math.random() * 3) + 3;

//   const clueBalls = [];

//   for (let i = 0; i < clueLength; i++) {
//     clueBalls.push(randomColor());
//   }

//   const clue = drawFromBalls(clueBalls);

//   // Total options: 5-8
//   const totalImages = Math.floor(Math.random() * 4) + 5;

//   // Matching options: 2-4
//   const matchCount = Math.floor(Math.random() * 3) + 2;

//   const images = [];

//   // Create matching options
//   for (let i = 0; i < matchCount; i++) {
//     const balls = createOptionWithSeries(clueBalls);

//     images.push({
//       match: true,
//       ...drawFromBalls(balls),
//     });
//   }

//   // Create non-matching options
//   while (images.length < totalImages) {
//     const balls = createOptionWithoutSeries(clueBalls);

//     images.push({
//       match: false,
//       ...drawFromBalls(balls),
//     });
//   }

//   // Shuffle options
//   const shuffled = shuffle(images);

//   // Build answer array
//   const answer = [];

//   shuffled.forEach((img, index) => {
//     if (img.match) {
//       answer.push(index);
//     }
//   });

//   return {
//     question:
//       "Does the given color series exist in the generated options? Select all matching options.",

//     clue: clue.base64,

//     images: shuffled.map((img) => img.base64),

//     answer,
//   };
// }


































// import { createCanvas } from "canvas";

// const colors = [
//   "red",
//   "blue",
//   "green",
//   "yellow",
//   "purple",
//   "orange",
//   "pink",
//   "cyan",
// ];

// function randomColor() {
//   return colors[Math.floor(Math.random() * colors.length)];
// }

// function shuffle(arr) {
//   return [...arr].sort(() => Math.random() - 0.5);
// }

// function drawFromBalls(balls) {
//   const canvas = createCanvas(400, 250);
//   const ctx = canvas.getContext("2d");

//   ctx.fillStyle = "#ffffff";
//   ctx.fillRect(0, 0, 400, 250);

//   const cols = 5;

//   balls.forEach((color, i) => {
//     const x = (i % cols) * 70 + 60;
//     const y = Math.floor(i / cols) * 55 + 40;

//     ctx.beginPath();
//     ctx.arc(x, y, 18, 0, Math.PI * 2);
//     ctx.fillStyle = color;
//     ctx.fill();
//   });

//   return {
//     base64: canvas.toDataURL(),
//     balls,
//   };
// }

// function containsSeries(optionBalls, clueBalls) {
//   const clue = clueBalls.join(",");

//   for (let i = 0; i <= optionBalls.length - clueBalls.length; i++) {
//     const slice = optionBalls.slice(i, i + clueBalls.length).join(",");

//     if (slice === clue) {
//       return true;
//     }
//   }

//   return false;
// }

// function createOptionWithSeries(clueBalls) {
//   const totalBalls = Math.floor(Math.random() * 6) + 15; // 15-20 balls

//   const balls = [];

//   for (let i = 0; i < totalBalls; i++) {
//     balls.push(randomColor());
//   }

//   const start = Math.floor(
//     Math.random() * (totalBalls - clueBalls.length + 1)
//   );

//   for (let i = 0; i < clueBalls.length; i++) {
//     balls[start + i] = clueBalls[i];
//   }

//   return balls;
// }

// function createOptionWithoutSeries(clueBalls) {
//   let balls;

//   do {
//     const totalBalls = Math.floor(Math.random() * 6) + 15; // 15-20 balls

//     balls = [];

//     for (let i = 0; i < totalBalls; i++) {
//       balls.push(randomColor());
//     }
//   } while (containsSeries(balls, clueBalls));

//   return balls;
// }

// export default function generateGame() {
//   // Fixed clue length: 5 balls
//   const clueLength = 5;

//   const clueBalls = [];

//   for (let i = 0; i < clueLength; i++) {
//     clueBalls.push(randomColor());
//   }

//   const clue = drawFromBalls(clueBalls);

//   // Total options: 5-8
//   const totalImages = Math.floor(Math.random() * 4) + 5;

//   // Matching options: 2-4
//   const matchCount = Math.floor(Math.random() * 3) + 2;

//   const images = [];

//   // Matching images
//   for (let i = 0; i < matchCount; i++) {
//     const balls = createOptionWithSeries(clueBalls);

//     images.push({
//       match: true,
//       ...drawFromBalls(balls),
//     });
//   }

//   // Non-matching images
//   while (images.length < totalImages) {
//     const balls = createOptionWithoutSeries(clueBalls);

//     images.push({
//       match: false,
//       ...drawFromBalls(balls),
//     });
//   }

//   // Shuffle options
//   const shuffled = shuffle(images);

//   // Build answer array
//   const answer = [];

//   shuffled.forEach((img, index) => {
//     if (img.match) {
//       answer.push(index);
//     }
//   });

//   return {
//     question:
//       "Does the given color series exist in the generated options? Select all matching options.",

//     clue: clue.base64,

//     images: shuffled.map((img) => img.base64),

//     answer,
//   };
// }







































// import { createCanvas } from "canvas";

// const colors = [
//   "red",
//   "blue",
//   "green",
//   "yellow",
//   "purple",
//   "orange",
//   "pink",
//   "cyan",
//   "brown",
//   "lime",
//   "magenta",
//   "gold",
//   "navy",
//   "teal",
//   "maroon",
//   "olive",
// ];

// // -------------------- utils --------------------

// function randomColor() {
//   return colors[Math.floor(Math.random() * colors.length)];
// }

// function shuffle(arr) {
//   return [...arr].sort(() => Math.random() - 0.5);
// }

// function containsSeries(optionBalls, clueBalls) {
//   const clue = clueBalls.join(",");

//   for (let i = 0; i <= optionBalls.length - clueBalls.length; i++) {
//     const slice = optionBalls.slice(i, i + clueBalls.length).join(",");
//     if (slice === clue) return true;
//   }

//   return false;
// }

// // -------------------- drawing --------------------

// function drawFromBalls(balls) {
//   const canvas = createCanvas(400, 250);
//   const ctx = canvas.getContext("2d");

//   ctx.fillStyle = "#ffffff";
//   ctx.fillRect(0, 0, 400, 250);

//   const cols = 5;

//   balls.forEach((color, i) => {
//     const x = (i % cols) * 70 + 60;
//     const y = Math.floor(i / cols) * 55 + 40;

//     ctx.beginPath();
//     ctx.arc(x, y, 18, 0, Math.PI * 2);
//     ctx.fillStyle = color;
//     ctx.fill();
//   });

//   return {
//     base64: canvas.toDataURL(),
//     balls,
//   };
// }

// // -------------------- clue --------------------

// function createClue() {
//   const clueBalls = [];
//   for (let i = 0; i < 5; i++) {
//     clueBalls.push(randomColor());
//   }

//   return {
//     clueBalls,
//     ...drawFromBalls(clueBalls),
//   };
// }

// // -------------------- correct option --------------------

// function createOptionWithSeries(clueBalls) {
//   const totalBalls = Math.floor(Math.random() * 6) + 15; // 15–20

//   const balls = [];

//   for (let i = 0; i < totalBalls; i++) {
//     balls.push(randomColor());
//   }

//   const start = Math.floor(
//     Math.random() * (totalBalls - clueBalls.length + 1)
//   );

//   for (let i = 0; i < clueBalls.length; i++) {
//     balls[start + i] = clueBalls[i];
//   }

//   return balls;
// }

// // -------------------- confusing decoy --------------------

// function createConfusingOption(clueBalls) {
//   const totalBalls = Math.floor(Math.random() * 6) + 15;

//   const balls = [];

//   for (let i = 0; i < totalBalls; i++) {
//     balls.push(randomColor());
//   }

//   const fake = [...clueBalls];

//   const mode = Math.floor(Math.random() * 3);

//   if (mode === 0) {
//     // change one color
//     const idx = Math.floor(Math.random() * fake.length);

//     let newColor;
//     do {
//       newColor = randomColor();
//     } while (newColor === fake[idx]);

//     fake[idx] = newColor;
//   } else if (mode === 1) {
//     // swap two colors
//     const a = Math.floor(Math.random() * fake.length);
//     let b;
//     do {
//       b = Math.floor(Math.random() * fake.length);
//     } while (a === b);

//     [fake[a], fake[b]] = [fake[b], fake[a]];
//   } else {
//     // reverse pattern
//     fake.reverse();
//   }

//   const start = Math.floor(
//     Math.random() * (totalBalls - fake.length + 1)
//   );

//   for (let i = 0; i < fake.length; i++) {
//     balls[start + i] = fake[i];
//   }

//   return balls;
// }

// // -------------------- random safe option --------------------

// function createSafeOption(clueBalls) {
//   let balls;

//   do {
//     const totalBalls = Math.floor(Math.random() * 6) + 15;

//     balls = [];

//     for (let i = 0; i < totalBalls; i++) {
//       balls.push(randomColor());
//     }
//   } while (containsSeries(balls, clueBalls));

//   return balls;
// }

// // -------------------- main generator --------------------

// export default function generateGame() {
//   const { clueBalls, base64: clueImage } = createClue();

//   const totalImages = Math.floor(Math.random() * 4) + 5; // 5–8 options
//   const matchCount = Math.floor(Math.random() * 3) + 2;  // 2–4 correct

//   const images = [];

//   // correct answers
//   for (let i = 0; i < matchCount; i++) {
//     const balls = createOptionWithSeries(clueBalls);

//     images.push({
//       match: true,
//       ...drawFromBalls(balls),
//     });
//   }

//   // wrong answers (confusing + safe mix)
//   while (images.length < totalImages) {
//     const useConfusing = Math.random() < 0.8;

//     const balls = useConfusing
//       ? createConfusingOption(clueBalls)
//       : createSafeOption(clueBalls);

//     images.push({
//       match: false,
//       ...drawFromBalls(balls),
//     });
//   }

//   const shuffled = shuffle(images);

//   const answer = [];

//   shuffled.forEach((img, i) => {
//     if (img.match) answer.push(i);
//   });

//   return {
//     question:
//       "Find all options that contain the exact 5-color sequence shown in the clue.",

//     clue: clueImage,

//     images: shuffled.map((i) => i.base64),

//     answer,
//   };
// }







import { createCanvas } from "canvas";

const colors = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "orange",
  "pink",
  "cyan",
  "brown",
  "lime",
  "magenta",
  "gold",
  "navy",
  "teal",
  "maroon",
  "olive",
];

// ---------------- utils ----------------

function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function containsSeries(optionBalls, clueBalls) {
  const clue = clueBalls.join(",");

  for (let i = 0; i <= optionBalls.length - clueBalls.length; i++) {
    const slice = optionBalls.slice(i, i + clueBalls.length).join(",");
    if (slice === clue) return true;
  }

  return false;

}

// ---------------- drawing ----------------

function drawFromBalls(balls) {
  const canvas = createCanvas(500, 250);
  const ctx = canvas.getContext("2d");

  // background must match canvas size
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, 500, 250);

  const cols = 14;

  balls.forEach((color, i) => {
    const x = (i % cols) * 35 + 25;
    const y = Math.floor(i / cols) * 35 + 30;

    ctx.beginPath();
    ctx.arc(x, y, 12, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  });

  return {
    base64: canvas.toDataURL(),
    balls,
  };
}

// ---------------- clue (30–40 balls) ----------------

function createClue() {
  const clueLength = Math.floor(Math.random() * 3) + 4; // 30–40

  const clueBalls = [];

  for (let i = 0; i < clueLength; i++) {
    clueBalls.push(randomColor());
  }

  return {
    clueBalls,
    ...drawFromBalls(clueBalls),
  };
}

// ---------------- correct option ----------------

function createOptionWithSeries(clueBalls) {
  const totalBalls = Math.floor(Math.random() * 21) + 40; // 40–60

  const balls = [];

  for (let i = 0; i < totalBalls; i++) {
    balls.push(randomColor());
  }

  const start = Math.floor(
    Math.random() * (totalBalls - clueBalls.length + 1)
  );

  for (let i = 0; i < clueBalls.length; i++) {
    balls[start + i] = clueBalls[i];
  }

  return balls;
}

// ---------------- confusing decoy ----------------

function createConfusingOption(clueBalls) {
  const totalBalls = Math.floor(Math.random() * 21) + 40; // 40–60

  const balls = [];

  for (let i = 0; i < totalBalls; i++) {
    balls.push(randomColor());
  }

  const fake = [...clueBalls];

  const mode = Math.floor(Math.random() * 3);

  if (mode === 0) {
    const idx = Math.floor(Math.random() * fake.length);

    let newColor;
    do {
      newColor = randomColor();
    } while (newColor === fake[idx]);

    fake[idx] = newColor;
  } else if (mode === 1) {
    const a = Math.floor(Math.random() * fake.length);
    let b;
    do {
      b = Math.floor(Math.random() * fake.length);
    } while (a === b);

    [fake[a], fake[b]] = [fake[b], fake[a]];
  } else {
    fake.reverse();
  }

  const start = Math.floor(
    Math.random() * (totalBalls - fake.length + 1)
  );

  for (let i = 0; i < fake.length; i++) {
    balls[start + i] = fake[i];
  }

  return balls;
}

// ---------------- safe option ----------------

function createSafeOption(clueBalls) {
  let balls;

  do {
    const totalBalls = Math.floor(Math.random() * 21) + 40;

    balls = [];

    for (let i = 0; i < totalBalls; i++) {
      balls.push(randomColor());
    }
  } while (containsSeries(balls, clueBalls));

  return balls;
}

// ---------------- main generator ----------------

export default function generateGame() {
  const { clueBalls, base64: clueImage } = createClue();

  const totalImages = Math.floor(Math.random() * 4) + 6; // 6–9 options
  const matchCount = Math.floor(Math.random() * 3) + 2;  // 2–4 correct

  const images = [];

  // correct
  for (let i = 0; i < matchCount; i++) {
    const balls = createOptionWithSeries(clueBalls);

    images.push({
      match: true,
      ...drawFromBalls(balls),
    });
  }

  // wrong (confusing heavy)
  while (images.length < totalImages) {
    const useConfusing = Math.random() < 0.85;

    const balls = useConfusing
      ? createConfusingOption(clueBalls)
      : createSafeOption(clueBalls);

    images.push({
      match: false,
      ...drawFromBalls(balls),
    });
  }

  const shuffled = shuffle(images);

  const answer = [];

  shuffled.forEach((img, i) => {
    if (img.match) answer.push(i);
  });

  return {
    question: "Select options with the same color sequence.",

    clue: clueImage,

    images: shuffled.map((i) => i.base64),

    answer,
  };
}