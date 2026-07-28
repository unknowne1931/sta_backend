const { createCanvas } = require("canvas");

// colors for balls
const colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "cyan"];

// random color
function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

// create one image with 10 balls
function drawImage() {
  const canvas = createCanvas(300, 300);
  const ctx = canvas.getContext("2d");
  // background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, 300, 300);

  const balls = [];

  for (let i = 0; i < 10; i++) {
    const color = randomColor();
    balls.push(color);

    // position grid 2x5
    const x = (i % 5) * 55 + 30;
    const y = Math.floor(i / 5) * 120 + 80;

    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }

  return {
    base64: canvas.toDataURL(),
    balls
  };
}

// check if two images are same
function isSame(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

// generate 5 images
function generateGame() {
  const images = [];

  const clue = drawImage(); // base image

  images.push({ id: 1, ...clue });

  let duplicates = Math.random() > 0.5 ? 2 : 3;

  for (let i = 2; i <= 5; i++) {
    if (duplicates > 0) {
      images.push({ id: i, ...clue });
      duplicates--;
    } else {
      images.push({ id: i, ...drawImage() });
    }
  }

  // shuffle
  images.sort(() => Math.random() - 0.5);

  const answer = images.filter(img => isSame(img.balls, clue.balls)).length;

  return {
    question: "How many images are same as given clue image?",
    clue: clue.base64,
    images: images.map(i => i.base64),
    answer
  };
}

// run
const game = generateGame();

console.log(game.question);
console.log("ANSWER:", game.answer);

// base64 outputs
console.log(game.images);