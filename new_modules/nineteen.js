// import { createCanvas } from "canvas";

// function rand(max) {
//   return Math.floor(Math.random() * max);
// }

// function shuffle(arr) {
//   const copy = [...arr];
//   for (let i = copy.length - 1; i > 0; i--) {
//     const j = rand(i + 1);
//     [copy[i], copy[j]] = [copy[j], copy[i]];
//   }
//   return copy;
// }

// // ---------------- COLOR GENERATION ----------------
// function getRandomColor() {
//   const colors = [
//     { name: "Red", hex: "#FF4444" },
//     { name: "Blue", hex: "#4488FF" },
//     { name: "Green", hex: "#44BB44" },
//     { name: "Yellow", hex: "#FFCC00" },
//     { name: "Purple", hex: "#AA44FF" },
//     { name: "Orange", hex: "#FF8800" },
//     { name: "Pink", hex: "#FF66AA" },
//     { name: "Teal", hex: "#00CCCC" },
//     { name: "Cyan", hex: "#00DDFF" },
//     { name: "Magenta", hex: "#FF44FF" },
//     { name: "Lime", hex: "#88FF44" },
//     { name: "Coral", hex: "#FF6B6B" }
//   ];
//   return colors[rand(colors.length)];
// }

// function getDifferentColor(excludeColors) {
//   let color;
//   let attempts = 0;
//   do {
//     color = getRandomColor();
//     attempts++;
//   } while (excludeColors.some(c => c.hex === color.hex) && attempts < 30);
//   return color;
// }

// // ---------------- GENERATE RANDOM COLOR MAP ----------------
// function generateRandomColorMap() {
//   const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
//   const colorMap = {};
//   const usedColors = [];
  
//   const numGroups = 3 + rand(3);
  
//   const shuffledLetters = shuffle(alphabet);
//   const groupSize = Math.floor(26 / numGroups);
//   const groups = [];
  
//   let start = 0;
//   for (let i = 0; i < numGroups; i++) {
//     const end = i === numGroups - 1 ? 26 : start + groupSize;
//     const groupLetters = shuffledLetters.slice(start, end);
//     groups.push(groupLetters);
//     start = end;
//   }
  
//   for (const group of groups) {
//     let color;
//     let attempts = 0;
//     do {
//       color = getRandomColor();
//       attempts++;
//     } while (usedColors.some(c => c.hex === color.hex) && attempts < 30);
//     usedColors.push(color);
    
//     for (const letter of group) {
//       colorMap[letter] = color;
//     }
//   }
  
//   return colorMap;
// }

// // ---------------- GET RANDOM WORDS ----------------
// function getRandomWords(count) {
//   const wordList = [
//     "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
//   ];
  
//   const shuffled = shuffle(wordList);
//   return shuffled.slice(0, count);
// }

// // ---------------- MAIN EXPORT ----------------
// export function generatePuzzle_colorMatch(shp = 1) {
//   const wordCount = shp
  
//   const colorMap = generateRandomColorMap();
  
//   const colorGroups = [];
//   const groupMap = {};
  
//   for (const [letter, color] of Object.entries(colorMap)) {
//     if (!groupMap[color.hex]) {
//       groupMap[color.hex] = {
//         name: color.name,
//         hex: color.hex,
//         letters: []
//       };
//     }
//     groupMap[color.hex].letters.push(letter);
//   }
  
//   for (const key of Object.keys(groupMap)) {
//     groupMap[key].letters.sort();
//     colorGroups.push(groupMap[key]);
//   }
  
//   colorGroups.sort((a, b) => a.letters[0].localeCompare(b.letters[0]));
  
//   const words = getRandomWords(wordCount);
//   const fullText = words.join(' ');
  
//   const coloredLetters = [];
//   for (const char of fullText) {
//     if (char === ' ') {
//       coloredLetters.push({ letter: ' ', color: null, isMismatch: false });
//     } else {
//       const lowerChar = char.toLowerCase();
//       const color = colorMap[lowerChar] || { name: "Unknown", hex: "#999999" };
//       coloredLetters.push({
//         letter: char,
//         color: color,
//         isMismatch: false
//       });
//     }
//   }
  
//   const mismatchCount = Math.max(1, Math.floor(coloredLetters.filter(c => c.letter !== ' ').length * (0.2 + rand(20) / 100)));
//   const letterPositions = [];
  
//   for (let i = 0; i < coloredLetters.length; i++) {
//     if (coloredLetters[i].letter !== ' ') {
//       letterPositions.push(i);
//     }
//   }
  
//   const shuffledPositions = shuffle(letterPositions);
//   const selectedPositions = shuffledPositions.slice(0, mismatchCount);
  
//   for (const pos of selectedPositions) {
//     const originalColor = coloredLetters[pos].color;
//     const excludeColors = [originalColor];
//     const newColor = getDifferentColor(excludeColors);
//     coloredLetters[pos].color = newColor;
//     coloredLetters[pos].isMismatch = true;
//   }
  
//   const actualMismatchCount = coloredLetters.filter(c => c.isMismatch).length;
  
//   const answer = actualMismatchCount;
//   const optionSet = new Set([String(answer)]);
  
//   const possibleWrong = [];
//   for (let i = 0; i <= wordCount * 3; i++) {
//     if (i !== answer) {
//       possibleWrong.push(String(i));
//     }
//   }
  
//   while (optionSet.size < 4 && possibleWrong.length > 0) {
//     const idx = rand(possibleWrong.length);
//     const val = possibleWrong.splice(idx, 1)[0];
//     if (!optionSet.has(val)) {
//       optionSet.add(val);
//     }
//   }
  
//   let counter = 0;
//   while (optionSet.size < 4) {
//     if (!optionSet.has(String(counter))) {
//       optionSet.add(String(counter));
//     }
//     counter++;
//   }
  
//   const options = shuffle([...optionSet]);
  
//   // ---------------- CANVAS ----------------
//   const padding = 40;
//   const maxWidth = 800;
//   const fontSize = Math.min(40, Math.max(24, Math.floor(500 / (fullText.length / 15))));
//   const letterSpacing = fontSize * 0.4;
//   const lineHeight = fontSize * 1.8;
  
//   const tempCanvas = createCanvas(10, 10);
//   const tempCtx = tempCanvas.getContext("2d");
//   tempCtx.font = `bold ${fontSize}px Arial`;
  
//   let lines = [];
//   let currentLine = [];
//   let currentWidth = 0;
  
//   for (let i = 0; i < coloredLetters.length; i++) {
//     const char = coloredLetters[i];
//     if (char.letter === ' ') {
//       const spaceWidth = tempCtx.measureText(' ').width;
//       if (currentWidth + spaceWidth > maxWidth && currentLine.length > 0) {
//         lines.push(currentLine);
//         currentLine = [];
//         currentWidth = 0;
//       }
//       currentLine.push(char);
//       currentWidth += spaceWidth;
//       continue;
//     }
    
//     const charWidth = tempCtx.measureText(char.letter).width + letterSpacing;
//     if (currentWidth + charWidth > maxWidth && currentLine.length > 0) {
//       lines.push(currentLine);
//       currentLine = [char];
//       currentWidth = charWidth;
//     } else {
//       currentLine.push(char);
//       currentWidth += charWidth;
//     }
//   }
//   if (currentLine.length > 0) {
//     lines.push(currentLine);
//   }
  
//   const maxLineWidth = lines.reduce((max, line) => {
//     let width = 0;
//     for (const item of line) {
//       if (item.letter === ' ') {
//         width += tempCtx.measureText(' ').width;
//       } else {
//         width += tempCtx.measureText(item.letter).width + letterSpacing;
//       }
//     }
//     return Math.max(max, width);
//   }, 0);
  
//   // Calculate legend height
//   const legendPerRow = Math.min(colorGroups.length, 6);
//   const legendRows = Math.ceil(colorGroups.length / legendPerRow);
//   const legendItemWidth = 100;
//   const legendHeight = legendRows * 38 + 20;
  
//   const canvasWidth = Math.min(900, Math.max(400, maxLineWidth + padding * 2 + 30));
//   const canvasHeight = Math.min(800, Math.max(350, lines.length * lineHeight + padding * 2 + legendHeight + 30));
  
//   const canvas = createCanvas(canvasWidth, canvasHeight);
//   const ctx = canvas.getContext("2d");
  
//   // White background
//   ctx.fillStyle = "#ffffff";
//   ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  
//   // ---------------- COLOR LEGEND (Top) ----------------
//   const legendY = 15;
//   const legendStartX = (canvasWidth - Math.min(colorGroups.length * legendItemWidth, canvasWidth - 40)) / 2;
//   const itemsPerRow = Math.min(colorGroups.length, 6);
//   const itemWidth = Math.min(legendItemWidth, (canvasWidth - 40) / itemsPerRow);
  
//   for (let i = 0; i < colorGroups.length; i++) {
//     const group = colorGroups[i];
//     const row = Math.floor(i / itemsPerRow);
//     const col = i % itemsPerRow;
//     const x = legendStartX + col * itemWidth;
//     const y = legendY + row * 38;
//     const lettersStr = group.letters.join('');
    
//     // Color circle
//     ctx.beginPath();
//     ctx.arc(x + 12, y + 10, 10, 0, Math.PI * 2);
//     ctx.fillStyle = group.hex;
//     ctx.fill();
//     ctx.lineWidth = 1.5;
//     ctx.strokeStyle = "#333";
//     ctx.stroke();
    
//     // Letters
//     ctx.fillStyle = "#1a2332";
//     ctx.font = "bold 12px Arial";
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";
//     ctx.fillText(lettersStr, x + 34, y + 10);
    
//     // Color name
//     ctx.fillStyle = "#6c757d";
//     ctx.font = "8px Arial";
//     ctx.textBaseline = "top";
//     ctx.fillText(group.name, x + 30, y + 22);
//   }
  
//   // ---------------- DRAW COLORED TEXT ----------------
//   const startY = legendY + legendHeight + 15;
  
//   for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
//     const line = lines[lineIdx];
//     let xPos = (canvasWidth - maxLineWidth) / 2;
//     const yPos = startY + lineIdx * lineHeight;
    
//     for (const data of line) {
//       if (data.letter === ' ') {
//         xPos += tempCtx.measureText(' ').width;
//         continue;
//       }
      
//       const char = data.letter;
      
//       ctx.fillStyle = data.color.hex;
//       ctx.font = `bold ${fontSize}px Arial`;
//       ctx.textAlign = "left";
//       ctx.textBaseline = "top";
      
//       ctx.fillText(char, xPos, yPos);
      
//       xPos += tempCtx.measureText(char).width + letterSpacing;
//     }
//   }
  
//   // ---------------- RETURN ----------------
//   return {
//     question: "How many letters are colored with the WRONG color?",
//     options: options,
//     answer: String(answer),
//     text: fullText,
//     words: words,
//     colorGroups: colorGroups,
//     colorMap: colorMap,
//     mismatchCount: actualMismatchCount,
//     coloredLetters: coloredLetters,
//     image: canvas.toDataURL().split(",")[1]
//   };
// }






























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
    { name: "Lime", hex: "#88FF44" },
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
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
  ];
  
  const shuffled = shuffle(wordList);
  return shuffled.slice(0, count);
}

// ---------------- GENERATE CONFUSING OPTIONS ----------------
function generateConfusingOptions(answer, maxPossible) {
  const options = new Set();
  
  // Always include the correct answer
  options.add(String(answer));
  
  // Create a pool of numbers very close to the answer
  // Range: answer-2 to answer+2 (but within 0 to maxPossible)
  const minRange = Math.max(0, answer - 2);
  const maxRange = Math.min(maxPossible, answer + 2);
  
  const nearbyNumbers = [];
  for (let i = minRange; i <= maxRange; i++) {
    if (i !== answer) {
      nearbyNumbers.push(i);
    }
  }
  
  // Shuffle nearby numbers
  const shuffledNearby = shuffle(nearbyNumbers);
  
  // Add up to 3 nearby numbers
  for (let i = 0; i < shuffledNearby.length && options.size < 4; i++) {
    options.add(String(shuffledNearby[i]));
  }
  
  // If we still need more options, add slightly farther numbers
  if (options.size < 4) {
    const fartherRange = 3;
    const fartherNumbers = [];
    for (let i = answer - fartherRange; i <= answer + fartherRange; i++) {
      if (i >= 0 && i <= maxPossible && !options.has(String(i)) && i !== answer) {
        fartherNumbers.push(i);
      }
    }
    const shuffledFarther = shuffle(fartherNumbers);
    for (let i = 0; i < shuffledFarther.length && options.size < 4; i++) {
      options.add(String(shuffledFarther[i]));
    }
  }
  
  // Final fallback - add any random numbers
  let counter = 0;
  while (options.size < 4) {
    if (!options.has(String(counter)) && counter <= maxPossible) {
      options.add(String(counter));
    }
    counter++;
  }
  
  return shuffle([...options]);
}

// ---------------- MAIN EXPORT ----------------
export function generatePuzzle_colorMatch(shp = 8) {
  const wordCount = shp
  
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
  const fullText = words.join(' ');
  
  const coloredLetters = [];
  for (const char of fullText) {
    if (char === ' ') {
      coloredLetters.push({ letter: ' ', color: null, isMismatch: false });
    } else {
      const lowerChar = char.toLowerCase();
      const color = colorMap[lowerChar] || { name: "Unknown", hex: "#999999" };
      coloredLetters.push({
        letter: char,
        color: color,
        isMismatch: false
      });
    }
  }
  
  const mismatchCount = Math.max(1, Math.floor(coloredLetters.filter(c => c.letter !== ' ').length * (0.2 + rand(20) / 100)));
  const letterPositions = [];
  
  for (let i = 0; i < coloredLetters.length; i++) {
    if (coloredLetters[i].letter !== ' ') {
      letterPositions.push(i);
    }
  }
  
  const shuffledPositions = shuffle(letterPositions);
  const selectedPositions = shuffledPositions.slice(0, mismatchCount);
  
  for (const pos of selectedPositions) {
    const originalColor = coloredLetters[pos].color;
    const excludeColors = [originalColor];
    const newColor = getDifferentColor(excludeColors);
    coloredLetters[pos].color = newColor;
    coloredLetters[pos].isMismatch = true;
  }
  
  const actualMismatchCount = coloredLetters.filter(c => c.isMismatch).length;
  
  const answer = actualMismatchCount;
  
  // Calculate maximum possible mismatches (total letters)
  const maxPossible = coloredLetters.filter(c => c.letter !== ' ').length;
  
  // Generate confusing options (very close to answer)
  const options = generateConfusingOptions(answer, maxPossible);
  
  // ---------------- CANVAS ----------------
  const padding = 40;
  const maxWidth = 800;
  const fontSize = Math.min(40, Math.max(24, Math.floor(500 / (fullText.length / 15))));
  const letterSpacing = fontSize * 0.4;
  const lineHeight = fontSize * 1.8;
  
  const tempCanvas = createCanvas(10, 10);
  const tempCtx = tempCanvas.getContext("2d");
  tempCtx.font = `bold ${fontSize}px Arial`;
  
  let lines = [];
  let currentLine = [];
  let currentWidth = 0;
  
  for (let i = 0; i < coloredLetters.length; i++) {
    const char = coloredLetters[i];
    if (char.letter === ' ') {
      const spaceWidth = tempCtx.measureText(' ').width;
      if (currentWidth + spaceWidth > maxWidth && currentLine.length > 0) {
        lines.push(currentLine);
        currentLine = [];
        currentWidth = 0;
      }
      currentLine.push(char);
      currentWidth += spaceWidth;
      continue;
    }
    
    const charWidth = tempCtx.measureText(char.letter).width + letterSpacing;
    if (currentWidth + charWidth > maxWidth && currentLine.length > 0) {
      lines.push(currentLine);
      currentLine = [char];
      currentWidth = charWidth;
    } else {
      currentLine.push(char);
      currentWidth += charWidth;
    }
  }
  if (currentLine.length > 0) {
    lines.push(currentLine);
  }
  
  const maxLineWidth = lines.reduce((max, line) => {
    let width = 0;
    for (const item of line) {
      if (item.letter === ' ') {
        width += tempCtx.measureText(' ').width;
      } else {
        width += tempCtx.measureText(item.letter).width + letterSpacing;
      }
    }
    return Math.max(max, width);
  }, 0);
  
  // Calculate legend height
  const legendPerRow = Math.min(colorGroups.length, 6);
  const legendRows = Math.ceil(colorGroups.length / legendPerRow);
  const legendItemWidth = 100;
  const legendHeight = legendRows * 38 + 20;
  
  const canvasWidth = 400;
  const canvasHeight = 250;
  
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext("2d");
  
  // ---------------- BACKGROUND ----------------
  // Gradient background for better appearance
  const gradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
  gradient.addColorStop(0, '#f8f9fa');
  gradient.addColorStop(0.5, '#e9ecef');
  gradient.addColorStop(1, '#dee2e6');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  
  // Subtle pattern (light dots)
  ctx.fillStyle = 'rgba(200, 200, 200, 0.3)';
  for (let i = 0; i < 50; i++) {
    ctx.beginPath();
    ctx.arc(rand(canvasWidth), rand(canvasHeight), 1.5, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // ---------------- COLOR LEGEND (Top) ----------------
  const legendY = 15;
  const legendStartX = (canvasWidth - Math.min(colorGroups.length * legendItemWidth, canvasWidth - 40)) / 2;
  const itemsPerRow = Math.min(colorGroups.length, 6);
  const itemWidth = Math.min(legendItemWidth, (canvasWidth - 40) / itemsPerRow);
  
  for (let i = 0; i < colorGroups.length; i++) {
    const group = colorGroups[i];
    const row = Math.floor(i / itemsPerRow);
    const col = i % itemsPerRow;
    const x = legendStartX + col * itemWidth;
    const y = legendY + row * 38;
    const lettersStr = group.letters.join('');
    
    // Colored box
    const boxSize = 18;
    const boxX = x + 3;
    const boxY = y + 1;
    
    // Draw filled box with color
    ctx.fillStyle = group.hex;
    ctx.fillRect(boxX, boxY, boxSize, boxSize);
    
    // Box border
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#333";
    ctx.strokeRect(boxX, boxY, boxSize, boxSize);
    
    // Letters
    ctx.fillStyle = "#1a2332";
    ctx.font = "bold 12px Arial";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(lettersStr, boxX + boxSize + 8, boxY + boxSize / 2);
    
    // Color name
    ctx.fillStyle = "#6c757d";
    ctx.font = "8px Arial";
    ctx.textBaseline = "top";
    ctx.fillText(group.name, boxX + boxSize + 8, boxY + boxSize + 2);
  }
  
  // ---------------- DRAW COLORED TEXT ----------------
  const startY = legendY + legendHeight + 15;
  
  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx];
    let xPos = (canvasWidth - maxLineWidth) / 2;
    const yPos = startY + lineIdx * lineHeight;
    
    for (const data of line) {
      if (data.letter === ' ') {
        xPos += tempCtx.measureText(' ').width;
        continue;
      }
      
      const char = data.letter;
      
      ctx.fillStyle = data.color.hex;
      ctx.font = `bold ${fontSize}px Arial`;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      
      ctx.fillText(char, xPos, yPos);
      
      xPos += tempCtx.measureText(char).width + letterSpacing;
    }
  }
  
  // ---------------- ADD WATERMARK ----------------
  ctx.save();
  
  // Calculate watermark size (responsive)
  const watermarkSize = 14;
  
  // Watermark position (bottom-right corner)
  const watermarkX = canvasWidth - 15;
  const watermarkY = canvasHeight - 12;
  
  // Shadow for better visibility
  ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
  ctx.shadowBlur = 6;
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 1;
  
  // Main watermark text
  ctx.font = `bold ${watermarkSize}px Arial`;
  ctx.textAlign = "right";
  ctx.textBaseline = "bottom";
  
  // Semi-transparent watermark
  ctx.fillStyle = 'rgba(25, 24, 25, 0.44)';
  ctx.fillText('Powered by AVI', watermarkX, watermarkY);
  
  // Outline for better visibility
  ctx.shadowBlur = 0;
  ctx.strokeStyle = 'rgba(32, 32, 33, 0.66)';
  ctx.lineWidth = 1.5;
  ctx.strokeText('AVI', watermarkX, watermarkY);
  

  
  ctx.restore();
  
  // ---------------- NO BORDER INSIDE IMAGE ----------------
  // Border removed as requested
  
  // ---------------- RETURN ----------------
  return {
    question: "How many letters are colored with the WRONG color?",
    options: options,
    answer: String(answer),
    text: fullText,
    words: words,
    colorGroups: colorGroups,
    colorMap: colorMap,
    mismatchCount: actualMismatchCount,
    coloredLetters: coloredLetters,
    image: canvas.toDataURL().split(",")[1]
  };
}