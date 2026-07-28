import { createCanvas } from "canvas";

function rand(max) {
  return Math.floor(Math.random() * max);
}

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = rand(i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// ---------------- COLOR GENERATION ----------------
function getRandomColor() {
  const colors = [
    { name: "Red", hex: "#FF4444" },
    { name: "Blue", hex: "#4488FF" },
    { name: "Green", hex: "#44BB44" },
    { name: "Yellow", hex: "#FFCC00" },
    { name: "Purple", hex: "#AA44FF" },
    { name: "Orange", hex: "#FF8800" },
    { name: "Pink", hex: "#FF66AA" },
    { name: "Teal", hex: "#00CCCC" },
    { name: "Cyan", hex: "#00DDFF" },
    { name: "Magenta", hex: "#FF44FF" },
    { name: "Lime", hex: "#88FF44" },
    { name: "Coral", hex: "#FF6B6B" }
  ];
  return colors[rand(colors.length)];
}

function getDifferentColor(excludeColors) {
  let color;
  let attempts = 0;
  do {
    color = getRandomColor();
    attempts++;
  } while (excludeColors.some(c => c.hex === color.hex) && attempts < 30);
  return color;
}

// ---------------- GENERATE RANDOM COLOR MAP ----------------
function generateRandomColorMap() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const colorMap = {};
  const usedColors = [];
  
  const numGroups = 3 + rand(3);
  
  const shuffledLetters = shuffle(alphabet);
  const groupSize = Math.floor(26 / numGroups);
  const groups = [];
  
  let start = 0;
  for (let i = 0; i < numGroups; i++) {
    const end = i === numGroups - 1 ? 26 : start + groupSize;
    const groupLetters = shuffledLetters.slice(start, end);
    groups.push(groupLetters);
    start = end;
  }
  
  for (const group of groups) {
    let color;
    let attempts = 0;
    do {
      color = getRandomColor();
      attempts++;
    } while (usedColors.some(c => c.hex === color.hex) && attempts < 30);
    usedColors.push(color);
    
    for (const letter of group) {
      colorMap[letter] = color;
    }
  }
  
  return colorMap;
}

// ---------------- GET RANDOM WORDS ----------------
function getRandomWords(count) {
  const wordList = [
    "apple", "banana", "cherry", "dance", "eagle", "flower", "garden", "happy",
    "image", "jacket", "knight", "light", "magic", "night", "ocean", "pencil",
    "queen", "river", "silver", "tiger", "unity", "value", "water", "youth",
    "zebra", "brain", "cloud", "dream", "earth", "faith", "grace", "heart",
    "joyful", "kind", "lovely", "might", "noble", "peace", "radiant", "sunny",
    "truth", "wisdom", "beauty", "courage", "freedom", "honor", "justice", "mercy",
    "patience", "strength", "valor", "wonder", "yellow", "bottle", "candle",
    "dinner", "energy", "family", "garden", "kitchen", "letter", "magnet",
    "nation", "orange", "school", "silver", "spider", "summer", "ticket",
    "travel", "window", "winter", "spring", "autumn", "beautiful"
  ];
  
  const shuffled = shuffle(wordList);
  return shuffled.slice(0, count);
}

// ---------------- MAIN EXPORT ----------------
export function generatePuzzle_colorMatch2(shp) {
  const wordCount = Number.isFinite(shp) && shp > 0 ? Math.min(shp, 10) : 5;
  
  const colorMap = generateRandomColorMap();
  
  const colorGroups = [];
  const groupMap = {};
  
  for (const [letter, color] of Object.entries(colorMap)) {
    if (!groupMap[color.hex]) {
      groupMap[color.hex] = {
        name: color.name,
        hex: color.hex,
        letters: []
      };
    }
    groupMap[color.hex].letters.push(letter);
  }
  
  for (const key of Object.keys(groupMap)) {
    groupMap[key].letters.sort();
    colorGroups.push(groupMap[key]);
  }
  
  colorGroups.sort((a, b) => a.letters[0].localeCompare(b.letters[0]));
  
  const words = getRandomWords(wordCount);
  
  const coloredWords = [];
  let mismatchCount = 0;
  
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const firstLetter = word[0].toLowerCase();
    const correctColor = colorMap[firstLetter];
    
    const isMismatch = rand(100) < 30;
    let wordColor;
    
    if (isMismatch) {
      const excludeColors = [correctColor];
      wordColor = getDifferentColor(excludeColors);
      mismatchCount++;
    } else {
      wordColor = correctColor;
    }
    
    coloredWords.push({
      word: word,
      color: wordColor,
      correctColor: correctColor,
      isMismatch: isMismatch
    });
  }
  
  const answer = mismatchCount;
  const optionSet = new Set([String(answer)]);
  
  const possibleWrong = [];
  for (let i = 0; i <= wordCount; i++) {
    if (i !== answer) {
      possibleWrong.push(String(i));
    }
  }
  
  while (optionSet.size < 4 && possibleWrong.length > 0) {
    const idx = rand(possibleWrong.length);
    const val = possibleWrong.splice(idx, 1)[0];
    if (!optionSet.has(val)) {
      optionSet.add(val);
    }
  }
  
  let counter = 0;
  while (optionSet.size < 4) {
    if (!optionSet.has(String(counter))) {
      optionSet.add(String(counter));
    }
    counter++;
  }
  
  const options = shuffle([...optionSet]);
  
  // ---------------- CANVAS ----------------
  const padding = 50;
  const maxWidth = 800;
  const fontSize = Math.min(42, Math.max(28, Math.floor(500 / (wordCount / 4))));
  const wordSpacing = fontSize * 1.5;
  const lineHeight = fontSize * 2.2;
  
  const tempCanvas = createCanvas(10, 10);
  const tempCtx = tempCanvas.getContext("2d");
  tempCtx.font = `bold ${fontSize}px Arial`;
  
  let lines = [];
  let currentLine = [];
  let currentWidth = 0;
  
  for (let i = 0; i < coloredWords.length; i++) {
    const wordData = coloredWords[i];
    const wordWidth = tempCtx.measureText(wordData.word).width + wordSpacing;
    
    if (currentWidth + wordWidth > maxWidth && currentLine.length > 0) {
      lines.push(currentLine);
      currentLine = [wordData];
      currentWidth = wordWidth;
    } else {
      currentLine.push(wordData);
      currentWidth += wordWidth;
    }
  }
  if (currentLine.length > 0) {
    lines.push(currentLine);
  }
  
  const maxLineWidth = lines.reduce((max, line) => {
    let width = 0;
    for (const wordData of line) {
      width += tempCtx.measureText(wordData.word).width + wordSpacing;
    }
    return Math.max(max, width);
  }, 0);
  
  // Calculate legend height
  const legendPerRow = Math.min(colorGroups.length, 6);
  const legendRows = Math.ceil(colorGroups.length / legendPerRow);
  const legendItemWidth = 110;
  const legendHeight = legendRows * 40 + 30;
  
  const canvasWidth = Math.min(900, Math.max(400, maxLineWidth + padding * 2 + 30));
  const canvasHeight = Math.min(700, Math.max(350, lines.length * lineHeight + padding * 2 + legendHeight + 40));
  
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext("2d");
  
  // White background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  
  // ---------------- COLOR LEGEND (Top) ----------------
  const legendY = 20;
  const legendStartX = (canvasWidth - Math.min(colorGroups.length * legendItemWidth, canvasWidth - 40)) / 2;
  const itemsPerRow = Math.min(colorGroups.length, 6);
  const itemWidth = Math.min(legendItemWidth, (canvasWidth - 40) / itemsPerRow);
  
  for (let i = 0; i < colorGroups.length; i++) {
    const group = colorGroups[i];
    const row = Math.floor(i / itemsPerRow);
    const col = i % itemsPerRow;
    const x = legendStartX + col * itemWidth;
    const y = legendY + row * 40;
    const lettersStr = group.letters.join('');
    
    // Color circle
    ctx.beginPath();
    ctx.arc(x + 14, y + 12, 12, 0, Math.PI * 2);
    ctx.fillStyle = group.hex;
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#333";
    ctx.stroke();
    
    // Letters
    ctx.fillStyle = "#1a2332";
    ctx.font = "bold 13px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(lettersStr, x + 42, y + 12);
    
    // Color name
    ctx.fillStyle = "#6c757d";
    ctx.font = "9px Arial";
    ctx.textBaseline = "top";
    ctx.fillText(group.name, x + 38, y + 26);
  }
  
  // ---------------- DRAW COLORED WORDS ----------------
  const startY = legendY + legendHeight + 20;
  
  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx];
    let xPos = (canvasWidth - maxLineWidth) / 2;
    const yPos = startY + lineIdx * lineHeight;
    
    for (const wordData of line) {
      const word = wordData.word;
      
      ctx.fillStyle = wordData.color.hex;
      ctx.font = `bold ${fontSize}px Arial`;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      
      ctx.fillText(word, xPos, yPos);
      
      xPos += tempCtx.measureText(word).width + wordSpacing;
    }
  }
  
  // ---------------- RETURN ----------------
  return {
    question: "How many words are colored with the WRONG color?",
    options: options,
    answer: String(answer),
    words: words,
    colorGroups: colorGroups,
    colorMap: colorMap,
    mismatchCount: mismatchCount,
    coloredWords: coloredWords,
    image: canvas.toDataURL().split(",")[1]
  };
}