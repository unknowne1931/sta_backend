import { createCanvas } from "canvas";

// ---------------- config ----------------

const chars = "abcdefghijklmnopqrstuvwxyz";

function randomChar() {
  return chars[Math.floor(Math.random() * chars.length)];
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ---------------- contains check ----------------

function containsSeries(option, clue) {
  const clueStr = clue.join("");

  for (let i = 0; i <= option.length - clue.length; i++) {
    const slice = option.slice(i, i + clue.length).join("");

    if (slice === clueStr) return true;
  }

  return false;
}

// ---------------- drawing ----------------

function drawFromBalls(chars) {
  const canvas = createCanvas(500, 250);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, 500, 250);

  ctx.fillStyle = "#000";
  ctx.font = "20px Arial";

  const text = chars.join("");

  const maxCharsPerLine = 45;

  for (let i = 0; i < text.length; i += maxCharsPerLine) {
    const line = text.slice(i, i + maxCharsPerLine);

    ctx.fillText(
      line,
      15,
      40 + (i / maxCharsPerLine) * 35
    );
  }

  return {
    base64: canvas.toDataURL(),
    balls: chars,
  };
}

// ---------------- clue ----------------

function createClue() {
  const clueLength = 5; // fixed or change to 8–15 if you want harder

  const clueBalls = [];

  for (let i = 0; i < clueLength; i++) {
    clueBalls.push(randomChar());
  }

  return {
    clueBalls,
    ...drawFromBalls(clueBalls),
  };
}

// ---------------- correct option ----------------

function createOptionWithSeries(clueBalls) {
  const total = Math.floor(Math.random() * 130) + 140; // 40–60 chars

  const option = [];

  for (let i = 0; i < total; i++) {
    option.push(randomChar());
  }

  const start = Math.floor(
    Math.random() * (total - clueBalls.length + 1)
  );

  for (let i = 0; i < clueBalls.length; i++) {
    option[start + i] = clueBalls[i];
  }

  return option;
}

// ---------------- confusing option ----------------

function createConfusingOption(clueBalls) {
  const total = Math.floor(Math.random() * 130) + 140;

  const option = [];

  for (let i = 0; i < total; i++) {
    option.push(randomChar());
  }

  const fake = [...clueBalls];

  const mode = Math.floor(Math.random() * 3);

  if (mode === 0) {
    const idx = Math.floor(Math.random() * fake.length);

    let newChar;
    do {
      newChar = randomChar();
    } while (newChar === fake[idx]);

    fake[idx] = newChar;
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
    Math.random() * (total - fake.length + 1)
  );

  for (let i = 0; i < fake.length; i++) {
    option[start + i] = fake[i];
  }

  return option;
}

// ---------------- safe option ----------------

function createSafeOption(clueBalls) {
  let option;

  do {
    const total = Math.floor(Math.random() * 130) + 140;

    option = [];

    for (let i = 0; i < total; i++) {
      option.push(randomChar());
    }
  } while (containsSeries(option, clueBalls));

  return option;
}

// ---------------- main generator ----------------

export default function generateGame_text() {
  const { clueBalls, base64: clueImage } = createClue();

  const totalImages = Math.floor(Math.random() * 4) + 6;
  const matchCount = Math.floor(Math.random() * 3) + 2;

  const images = [];

  // correct
  for (let i = 0; i < matchCount; i++) {
    const option = createOptionWithSeries(clueBalls);

    images.push({
      match: true,
      ...drawFromBalls(option),
    });
  }

  // wrong (confusing)
  while (images.length < totalImages) {
    const useConfusing = Math.random() < 0.85;

    const option = useConfusing
      ? createConfusingOption(clueBalls)
      : createSafeOption(clueBalls);

    images.push({
      match: false,
      ...drawFromBalls(option),
    });
  }

  const shuffled = shuffle(images);

  const answer = [];

  shuffled.forEach((img, i) => {
    if (img.match) answer.push(i);
  });

  return {
    question: "Find matching character sequence in options.",

    clue: clueImage,

    images: shuffled.map((i) => i.base64),

    answer,
  };
}