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
  options.add(String(answer));
  
  const minRange = Math.max(0, answer - 2);
  const maxRange = Math.min(maxPossible, answer + 2);
  
  const nearbyNumbers = [];
  for (let i = minRange; i <= maxRange; i++) {
    if (i !== answer) {
      nearbyNumbers.push(i);
    }
  }
  
  const shuffledNearby = shuffle(nearbyNumbers);
  
  for (let i = 0; i < shuffledNearby.length && options.size < 3; i++) {
    options.add(String(shuffledNearby[i]));
  }
  
  if (options.size < 3) {
    const fartherRange = 3;
    const fartherNumbers = [];
    for (let i = answer - fartherRange; i <= answer + fartherRange; i++) {
      if (i >= 0 && i <= maxPossible && !options.has(String(i)) && i !== answer) {
        fartherNumbers.push(i);
      }
    }
    const shuffledFarther = shuffle(fartherNumbers);
    for (let i = 0; i < shuffledFarther.length && options.size < 3; i++) {
      options.add(String(shuffledFarther[i]));
    }
  }
  
  let counter = 0;
  while (options.size < 3) {
    if (!options.has(String(counter)) && counter <= maxPossible) {
      options.add(String(counter));
    }
    counter++;
  }
  
  // Shuffle numerical options and put "None of the above" strictly at the end
  const numericOptions = shuffle([...options]);
  return [...numericOptions, "None of the above"];
}

// ---------------- ROUNDED RECT HELPER ----------------
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// ---------------- MAIN EXPORT ----------------
export function generatePuzzle_colorMatch(shp = 8) {
  const wordCount = shp;
  
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
  const maxPossible = coloredLetters.filter(c => c.letter !== ' ').length;
  const options = generateConfusingOptions(answer, maxPossible);
  
  // ================================================================
  // 🎨 PREMIUM CANVAS UI — 5px max padding, no overflow
  // ================================================================
  
  const fontSize = Math.min(36, Math.max(20, Math.floor(480 / (fullText.length / 12))));
  const letterSpacing = fontSize * 0.42;
  const lineHeight = fontSize * 1.9;
  
  const tempCanvas = createCanvas(10, 10);
  const tempCtx = tempCanvas.getContext("2d");
  tempCtx.font = `bold ${fontSize}px 'Segoe UI', Arial, sans-serif`;
  
  // ---- Text wrapping ----
  const maxTextWidth = 580;
  
  let lines = [];
  let currentLine = [];
  let currentWidth = 0;
  
  for (let i = 0; i < coloredLetters.length; i++) {
    const char = coloredLetters[i];
    if (char.letter === ' ') {
      const spaceWidth = tempCtx.measureText(' ').width + letterSpacing * 0.5;
      if (currentWidth + spaceWidth > maxTextWidth && currentLine.length > 0) {
        lines.push(currentLine);
        currentLine = [];
        currentWidth = 0;
      }
      currentLine.push(char);
      currentWidth += spaceWidth;
      continue;
    }
    
    const charWidth = tempCtx.measureText(char.letter).width + letterSpacing;
    if (currentWidth + charWidth > maxTextWidth && currentLine.length > 0) {
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
  
  // ---- Layout metrics (5px padding/margin only) ----
  const GAP = 5;
  const INNER_PAD = 5;
  const cardRadius = 14;
  const chipRadius = 8;
  const swatchRadius = 4;
  
  const legendItemW = 118;
  const legendItemH = 34;
  const legendGap = GAP;
  
  const contentWidth = maxTextWidth + 16;
  const maxLegendWidth = contentWidth;
  
  let itemsPerRow = Math.max(1, Math.floor((maxLegendWidth + legendGap) / (legendItemW + legendGap)));
  itemsPerRow = Math.min(itemsPerRow, colorGroups.length, 5);
  
  const legendRows = Math.ceil(colorGroups.length / itemsPerRow);
  const legendHeight = legendRows * legendItemH + (legendRows - 1) * legendGap;
  
  const textBlockHeight = lines.length * lineHeight;
  
  const cardWidth = contentWidth + INNER_PAD * 2 + GAP * 2;
  const cardHeight =
    GAP * 2 +
    24 +
    GAP +
    legendHeight +
    GAP +
    textBlockHeight + 16 +
    GAP;
  
  const outerPad = GAP;
  const canvasWidth = cardWidth + outerPad * 2;
  const canvasHeight = cardHeight + outerPad * 2;
  
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  
  // ---- Background ----
  const bg = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
  bg.addColorStop(0,   "#0f1729");
  bg.addColorStop(0.5, "#1a2a45");
  bg.addColorStop(1,   "#0b1320");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  
  // ---- Ambient glow blobs ----
  const blob1 = ctx.createRadialGradient(
    canvasWidth * 0.15, canvasHeight * 0.12, 0,
    canvasWidth * 0.15, canvasHeight * 0.12, canvasWidth * 0.6
  );
  blob1.addColorStop(0, "rgba(96,165,250,0.28)");
  blob1.addColorStop(1, "rgba(96,165,250,0)");
  ctx.fillStyle = blob1;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  
  const blob2 = ctx.createRadialGradient(
    canvasWidth * 0.88, canvasHeight * 0.9, 0,
    canvasWidth * 0.88, canvasHeight * 0.9, canvasWidth * 0.6
  );
  blob2.addColorStop(0, "rgba(167,139,250,0.24)");
  blob2.addColorStop(1, "rgba(167,139,250,0)");
  ctx.fillStyle = blob2;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  
  // ================================================================
  // GLASS CARD
  // ================================================================
  const cardX = outerPad;
  const cardY = outerPad;
  
  ctx.save();
  ctx.shadowColor = "rgba(0, 0, 0, 0.55)";
  ctx.shadowBlur = 30;
  ctx.shadowOffsetY = 12;
  roundRect(ctx, cardX, cardY, cardWidth, cardHeight, cardRadius);
  const cardG = ctx.createLinearGradient(cardX, cardY, cardX, cardY + cardHeight);
  cardG.addColorStop(0, "rgba(255, 255, 255, 0.10)");
  cardG.addColorStop(1, "rgba(255, 255, 255, 0.035)");
  ctx.fillStyle = cardG;
  ctx.fill();
  ctx.restore();
  
  ctx.save();
  roundRect(ctx, cardX, cardY, cardWidth, cardHeight, cardRadius);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.20)";
  ctx.lineWidth = 1.2;
  ctx.stroke();
  ctx.restore();
  
  // ================================================================
  // TITLE STRIP
  // ================================================================
  const titleY = cardY + GAP;
  const titleH = 24;
  const titleX = cardX + INNER_PAD + GAP;
  
  ctx.font = "600 16px 'Segoe UI Emoji', 'Segoe UI', Arial, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#fbbf24";
  ctx.fillText("🎨", titleX, titleY + titleH / 2);
  
  ctx.font = "700 15px 'Segoe UI', Arial, sans-serif";
  ctx.fillStyle = "#f1f5f9";
  ctx.shadowColor = "rgba(96,165,250,0.5)";
  ctx.shadowBlur = 10;
  ctx.fillText("Color Match", titleX + 24, titleY + titleH / 2);
  ctx.shadowBlur = 0;
  
  const pillText = `${wordCount}`;
  ctx.font = "700 11px 'Segoe UI', Arial, sans-serif";
  const pillTextW = ctx.measureText(pillText).width;
  const pillW = pillTextW + 16;
  const pillH = 20;
  const pillX = cardX + cardWidth - pillW - INNER_PAD - GAP;
  const pillY = titleY + (titleH - pillH) / 2;
  
  roundRect(ctx, pillX, pillY, pillW, pillH, pillH / 2);
  const pillGrad = ctx.createLinearGradient(pillX, pillY, pillX + pillW, pillY + pillH);
  pillGrad.addColorStop(0, "rgba(96,165,250,0.35)");
  pillGrad.addColorStop(1, "rgba(167,139,250,0.35)");
  ctx.fillStyle = pillGrad;
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.25)";
  ctx.lineWidth = 1;
  ctx.stroke();
  
  ctx.fillStyle = "#e2e8f0";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(pillText, pillX + pillW / 2, pillY + pillH / 2 + 0.5);
  
  // ================================================================
  // LEGEND
  // ================================================================
  const legendStartY = titleY + titleH + GAP;
  const legendAreaW = cardWidth - INNER_PAD * 2;
  const legendStartX = cardX + INNER_PAD;
  
  for (let i = 0; i < colorGroups.length; i++) {
    const group = colorGroups[i];
    const row = Math.floor(i / itemsPerRow);
    const col = i % itemsPerRow;
    
    const itemsInRow = Math.min(itemsPerRow, colorGroups.length - row * itemsPerRow);
    const rowTotalW = itemsInRow * legendItemW + (itemsInRow - 1) * legendGap;
    const rowStartX = legendStartX + (legendAreaW - rowTotalW) / 2;
    
    const x = rowStartX + col * (legendItemW + legendGap);
    const y = legendStartY + row * (legendItemH + legendGap);
    
    roundRect(ctx, x, y, legendItemW, legendItemH, chipRadius);
    ctx.fillStyle = "rgba(10, 20, 40, 0.6)";
    ctx.fill();
    ctx.strokeStyle = "rgba(148, 163, 184, 0.22)";
    ctx.lineWidth = 1;
    ctx.stroke();
    
    const swatchSize = 18;
    const swatchX = x + INNER_PAD;
    const swatchY = y + (legendItemH - swatchSize) / 2;
    
    ctx.save();
    ctx.shadowColor = group.hex;
    ctx.shadowBlur = 8;
    roundRect(ctx, swatchX, swatchY, swatchSize, swatchSize, swatchRadius);
    ctx.fillStyle = group.hex;
    ctx.fill();
    ctx.restore();
    
    roundRect(ctx, swatchX, swatchY, swatchSize, swatchSize, swatchRadius);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
    ctx.lineWidth = 1;
    ctx.stroke();
    
    let lettersStr = group.letters.join('');
    ctx.font = "700 12px 'SF Mono', Monaco, 'Segoe UI', Arial, sans-serif";
    
    const textX = swatchX + swatchSize + 6;
    const maxTextW = x + legendItemW - textX - INNER_PAD;
    
    while (lettersStr.length > 1 && ctx.measureText(lettersStr + '…').width > maxTextW) {
      lettersStr = lettersStr.slice(0, -1);
    }
    if (ctx.measureText(lettersStr).width > maxTextW && lettersStr.length > 1) {
      lettersStr = lettersStr.slice(0, -1) + '…';
    }
    
    ctx.fillStyle = "#f1f5f9";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(lettersStr, textX, swatchY + swatchSize / 2 + 0.5);
  }
  
  // ================================================================
  // CONTENT BOX
  // ================================================================
  const contentX = cardX + INNER_PAD;
  const contentY = legendStartY + legendHeight + GAP;
  const contentW = cardWidth - INNER_PAD * 2;
  const contentH = textBlockHeight + 10;
  
  ctx.save();
  ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
  ctx.shadowBlur = 14;
  ctx.shadowOffsetY = 4;
  roundRect(ctx, contentX, contentY, contentW, contentH, chipRadius);
  const contentG = ctx.createLinearGradient(contentX, contentY, contentX, contentY + contentH);
  contentG.addColorStop(0, "rgba(10, 18, 35, 0.72)");
  contentG.addColorStop(1, "rgba(6, 12, 24, 0.72)");
  ctx.fillStyle = contentG;
  ctx.fill();
  ctx.restore();
  
  ctx.save();
  roundRect(ctx, contentX, contentY, contentW, contentH, chipRadius);
  ctx.strokeStyle = "rgba(148, 163, 184, 0.25)";
  ctx.lineWidth = 1.2;
  ctx.stroke();
  ctx.restore();
  
  // ================================================================
  // DRAW COLORED LETTERS
  // ================================================================
  const textStartY = contentY + (contentH - textBlockHeight) / 2 + fontSize * 0.05;
  
  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx];
    
    let lineWidth = 0;
    for (const item of line) {
      if (item.letter === ' ') {
        lineWidth += tempCtx.measureText(' ').width + letterSpacing * 0.5;
      } else {
        lineWidth += tempCtx.measureText(item.letter).width + letterSpacing;
      }
    }
    
    let xPos = contentX + (contentW - lineWidth) / 2;
    const yPos = textStartY + lineIdx * lineHeight;
    
    for (const data of line) {
      if (data.letter === ' ') {
        xPos += tempCtx.measureText(' ').width + letterSpacing * 0.5;
        continue;
      }
      
      const char = data.letter;
      
      ctx.font = `800 ${fontSize}px 'Segoe UI', Arial, sans-serif`;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      
      ctx.lineWidth = 3;
      ctx.strokeStyle = "rgba(6, 12, 24, 0.85)";
      ctx.lineJoin = "round";
      ctx.strokeText(char, xPos, yPos);
      
      ctx.save();
      ctx.shadowColor = data.color.hex;
      ctx.shadowBlur = 12;
      ctx.fillStyle = data.color.hex;
      ctx.fillText(char, xPos, yPos);
      ctx.restore();
      
      xPos += tempCtx.measureText(char).width + letterSpacing;
    }
  }
  
  // ================================================================
  // WATERMARK — RIGHT BOTTOM
  // ================================================================
  ctx.save();
  ctx.font = "700 11px 'Segoe UI', Arial, sans-serif";
  ctx.textAlign = "right";
  ctx.textBaseline = "bottom";
  
  const wmX = canvasWidth - GAP - 2;
  const wmY = canvasHeight - GAP - 2;
  
  ctx.shadowColor = "rgba(96,165,250,0.55)";
  ctx.shadowBlur = 10;
  ctx.fillStyle = "rgba(226, 232, 240, 0.78)";
  ctx.fillText("Powered by AVI", wmX, wmY);
  
  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(241, 245, 249, 0.92)";
  ctx.fillText("Powered by AVI", wmX, wmY);
  ctx.restore();
  
  // ================================================================
  // RETURN
  // ================================================================
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