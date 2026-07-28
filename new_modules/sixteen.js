

// import { createCanvas } from "canvas";

// function rand(max) {
//   return Math.floor(Math.random() * max);
// }

// function shuffle(arr) {
//   const a = [...arr];
//   for (let i = a.length - 1; i > 0; i--) {
//     const j = rand(i + 1);
//     [a[i], a[j]] = [a[j], a[i]];
//   }
//   return a;
// }

// // Generate a random sentence
// function getRandomSentence() {
//   const sentences = [
//   "The quick brown fox jumps over the lazy dog",
//   // "A journey of a thousand miles begins with one step",
//   // "To be or not to be that is the question",
//   // "All that glitters is not always pure gold today",
//   // "The early bird catches the worm every single morning",
//   // "Actions always speak much louder than empty words spoken",
//   // "Beauty is truly in the eye of every beholder",
//   // "Practice makes perfect through daily effort and steady",
//   // "The pen is mightier than the sword in history always",
//   // "When in Rome do as the Romans always wisely do",
//   // "You cannot judge a book by its cover alone ever",
//   // "Fortune always favors the bold during difficult life",
//   // "Where there is a will there is always a way",
//   // "The proof of the pudding is in the eating itself",
//   // "A picture is worth a thousand meaningful words every single time",
//   // "Better late than never when making important life decisions wisely",
//   // "Every cloud has a silver lining after every difficult storm",
//   // "Great minds often think alike when solving difficult",
//   // "It takes two to tango in every successful partnership together",
//   // "Keep your friends close but your enemies even closer always",
//   // "Life is what happens while you make other meaningful future plans",
//   // "The only thing we have to fear is fear itself",
//   // "To infinity and beyond with courage hope and endless",
//   // "May the force be with you on every brave adventure always",
//   // "Houston we have a problem that requires immediate careful",
//   // "Elementary my dear Watson every mystery has a logical solution",
//   // "I think therefore I am capable of learning every single day",
//   // "The unexamined life is not worth living according to wise"
// ];
  
//   return sentences[rand(sentences.length)];
// }

// // Generate random transformation for a letter
// function getLetterTransform() {
//   const transformations = [
//     { type: 'rotate', min: 5, max: 15 },
//     { type: 'rotate', min: 20, max: 35 },
//     { type: 'rotate', min: -15, max: -5 },
//     { type: 'rotate', min: -35, max: -20 },
//     { type: 'moveUp', pixels: 2 },
//     { type: 'moveUp', pixels: 4 },
//     { type: 'moveDown', pixels: 2 },
//     { type: 'moveDown', pixels: 4 },
//     { type: 'rotateAndMove', rotate: 10, moveY: -3 },
//     { type: 'rotateAndMove', rotate: -10, moveY: 3 },
//     { type: 'rotateAndMove', rotate: 8, moveY: 2 },
//     { type: 'rotateAndMove', rotate: -8, moveY: -2 },
//     { type: 'upsideDown', degrees: 180 },
//   ];
//   return transformations[rand(transformations.length)];
// }

// // Draw a single letter with optional transformation
// function drawLetter(ctx, letter, x, y, transform) {
//   ctx.save();
  
//   if (transform) {
//     let rotAngle = 0;
//     let moveX = 0;
//     let moveY = 0;
    
//     switch(transform.type) {
//       case 'rotate':
//         rotAngle = (transform.min + rand(transform.max - transform.min + 1)) * Math.PI / 180;
//         break;
//       case 'moveUp':
//         moveY = -transform.pixels;
//         break;
//       case 'moveDown':
//         moveY = transform.pixels;
//         break;
//       case 'rotateAndMove':
//         rotAngle = transform.rotate * Math.PI / 180;
//         moveY = transform.moveY || 0;
//         break;
//       case 'upsideDown':
//         rotAngle = Math.PI;
//         break;
//     }
    
//     ctx.translate(x + moveX, y + moveY);
    
//     if (rotAngle !== 0) {
//       ctx.translate(7, 7);
//       ctx.rotate(rotAngle);
//       ctx.translate(-7, -7);
//     }
//   } else {
//     ctx.translate(x, y);
//   }
  
//   ctx.fillStyle = "#000000";
//   ctx.font = "14px Arial";
//   ctx.textAlign = "left";
//   ctx.textBaseline = "top";
//   ctx.fillText(letter, 0, 0);
  
//   ctx.restore();
// }

// export function generatePuzzle_misalignedLetters(shp) {
//   // Get a random sentence
//   let sentence = getRandomSentence();
  
//   // Limit words if shp is provided
//   let maxWords = 40;
//   if (Number.isFinite(shp) && shp > 0) {
//     maxWords = Math.min(shp, 40);
//   }
  
//   const words = sentence.split(' ');
//   if (words.length > maxWords) {
//     sentence = words.slice(0, maxWords).join(' ');
//   }
  
//   // Get all letters without spaces
//   const lettersOnly = sentence.replace(/\s/g, '');
//   const allLetters = lettersOnly.split('');
//   const totalLetters = allLetters.length;
  
//   // Determine how many letters to misalign (10-20% of total, min 1)
//   const misalignCount = Math.max(1, Math.floor(totalLetters * (0.10 + rand(10) / 100)));
  
//   // Pick which letter positions to misalign
//   const positions = Array.from({length: totalLetters}, (_, i) => i);
//   const shuffledPositions = shuffle(positions);
//   const misalignedPositions = shuffledPositions.slice(0, misalignCount);
  
//   // Create letter data with transformations
//   const letterData = [];
//   let misalignedCount = 0;
  
//   for (let i = 0; i < totalLetters; i++) {
//     let transform = null;
//     let isMisaligned = false;
    
//     if (misalignedPositions.includes(i)) {
//       transform = getLetterTransform();
//       isMisaligned = true;
//       misalignedCount++;
//     }
    
//     letterData.push({
//       letter: allLetters[i],
//       transform: transform,
//       isMisaligned: isMisaligned
//     });
//   }
  
//   // Generate multiple choice options
//   const answer = misalignedCount;
//   const optionSet = new Set([answer]);
  
//   const possibleWrong = [];
//   for (let i = 1; i <= Math.min(totalLetters, 10); i++) {
//     if (i !== answer) {
//       possibleWrong.push(i);
//     }
//   }
  
//   while (optionSet.size < 4 && possibleWrong.length > 0) {
//     const idx = rand(possibleWrong.length);
//     const val = possibleWrong.splice(idx, 1)[0];
//     if (!optionSet.has(val)) {
//       optionSet.add(val);
//     }
//   }
  
//   let counter = 1;
//   while (optionSet.size < 4) {
//     if (!optionSet.has(counter)) {
//       optionSet.add(counter);
//     }
//     counter++;
//   }
  
//   const options = shuffle([...optionSet]).map(String);
  
//   // Calculate canvas size based on sentence
//   const fontSize = 14;
//   const lineHeight = 20;
//   const charWidth = 8.5;
//   const letterSpacing = 0.3;
//   const wordSpacing = 3.5;
  
//   // Calculate text metrics
//   let maxLineWidth = 0;
//   let totalHeight = lineHeight;
//   let currentLine = '';
//   const lines = [];
  
//   const maxWidth = 650;
//   const padding = 40;
  
//   // Split into lines
//   for (let i = 0; i < sentence.length; i++) {
//     const char = sentence[i];
//     const testLine = currentLine + char;
//     const testWidth = testLine.length * (charWidth + letterSpacing);
    
//     if (testWidth > maxWidth && currentLine.length > 0) {
//       lines.push(currentLine);
//       maxLineWidth = Math.max(maxLineWidth, currentLine.length * (charWidth + letterSpacing));
//       currentLine = char;
//       totalHeight += lineHeight;
//     } else {
//       currentLine += char;
//     }
//   }
//   if (currentLine.length > 0) {
//     lines.push(currentLine);
//     maxLineWidth = Math.max(maxLineWidth, currentLine.length * (charWidth + letterSpacing));
//   }
  
//   const canvasWidth = Math.min(800, Math.max(padding * 2 + maxLineWidth, 400));
//   const canvasHeight = Math.min(600, Math.max(200, totalHeight + padding * 2));
  
//   const canvas = createCanvas(canvasWidth, canvasHeight);
//   const ctx = canvas.getContext("2d");
  
//   // White background
//   ctx.fillStyle = "#ffffff";
//   ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  
//   // Draw sentence with transformations
//   let xPos = padding;
//   let yPos = padding;
//   let letterIndex = 0;
  
//   for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
//     const line = lines[lineIdx];
//     xPos = padding;
    
//     for (let i = 0; i < line.length; i++) {
//       const char = line[i];
      
//       if (char === ' ') {
//         xPos += charWidth + wordSpacing;
//         continue;
//       }
      
//       if (letterIndex < letterData.length) {
//         const data = letterData[letterIndex];
//         drawLetter(ctx, data.letter, xPos, yPos, data.transform);
//         letterIndex++;
//       }
      
//       xPos += charWidth + letterSpacing;
//     }
    
//     yPos += lineHeight;
//   }
  
//   return {
//     question: "How many letters are misaligned?",
//     options: options,
//     answer: String(answer),
//     sentence: sentence,
//     misalignedCount: misalignedCount,
//     totalLetters: totalLetters,
//     image: canvas.toDataURL().split(",")[1]
//   };
// }



































//1931 08-07-2026

import { createCanvas } from "canvas";

function rand(max) {
  return Math.floor(Math.random() * max);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = rand(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Generate rich random color with more variations
function getRandomColor() {

  const colorTypes = [
    // Vibrant colors
    () => `hsl(${rand(360)}, ${80 + rand(20)}%, ${50 + rand(30)}%)`,
    // Pastel colors
    () => `hsl(${rand(360)}, ${60 + rand(30)}%, ${70 + rand(25)}%)`,
    // Neon colors
    () => `hsl(${rand(360)}, ${90 + rand(10)}%, ${50 + rand(20)}%)`,
    // Deep rich colors
    () => `hsl(${rand(360)}, ${70 + rand(20)}%, ${30 + rand(20)}%)`,
    // Muted colors
    () => `hsl(${rand(360)}, ${40 + rand(30)}%, ${50 + rand(30)}%)`,
    // Bright warm colors
    () => `hsl(${rand(60)}, ${85 + rand(15)}%, ${55 + rand(25)}%)`,
    // Cool vibrant colors
    () => `hsl(${rand(120) + 180}, ${80 + rand(20)}%, ${50 + rand(30)}%)`,
    // Tropical colors
    () => `hsl(${rand(80) + 10}, ${75 + rand(25)}%, ${45 + rand(35)}%)`,
    // Earth tones
    () => `hsl(${rand(60) + 15}, ${50 + rand(30)}%, ${35 + rand(30)}%)`,
    // Candy colors
    () => `hsl(${rand(360)}, ${85 + rand(15)}%, ${60 + rand(30)}%)`,
    // Jewel tones
    () => `hsl(${rand(360)}, ${75 + rand(25)}%, ${35 + rand(25)}%)`,
  ];
  
  return colorTypes[rand(colorTypes.length)]();
}

// Generate extended color palette (10+ colors)
function getExtendedColorPalette() {
  const palettes = [
    // Rainbow palette
    () => {
      const colors = [];
      for (let i = 0; i < 12; i++) {
        const hue = (i * 30 + rand(5)) % 360;
        colors.push(`hsl(${hue}, ${85 + rand(15)}%, ${50 + rand(30)}%)`);
      }
      return colors;
    },
    // Sunset palette
    () => {
      return [
        `hsl(${0 + rand(10)}, 95%, 55%)`,    // Red
        `hsl(${20 + rand(10)}, 90%, 60%)`,   // Orange
        `hsl(${40 + rand(10)}, 85%, 65%)`,   // Yellow-orange
        `hsl(${60 + rand(10)}, 80%, 70%)`,   // Yellow
        `hsl(${280 + rand(10)}, 85%, 55%)`,  // Purple
        `hsl(${300 + rand(10)}, 80%, 60%)`,  // Magenta
        `hsl(${320 + rand(10)}, 85%, 55%)`,  // Pink
        `hsl(${340 + rand(10)}, 90%, 50%)`,  // Rose
        `hsl(${10 + rand(10)}, 85%, 50%)`,   // Crimson
        `hsl(${30 + rand(10)}, 80%, 55%)`,   // Amber
      ];
    },
    // Ocean palette
    () => {
      return [
        `hsl(${180 + rand(10)}, 85%, 45%)`,  // Cyan
        `hsl(${190 + rand(10)}, 80%, 50%)`,  // Light blue
        `hsl(${200 + rand(10)}, 85%, 40%)`,  // Blue
        `hsl(${210 + rand(10)}, 80%, 45%)`,  // Navy
        `hsl(${170 + rand(10)}, 75%, 50%)`,  // Teal
        `hsl(${160 + rand(10)}, 80%, 45%)`,  // Sea green
        `hsl(${220 + rand(10)}, 85%, 35%)`,  // Deep blue
        `hsl(${185 + rand(10)}, 70%, 55%)`,  // Light cyan
        `hsl(${195 + rand(10)}, 75%, 50%)`,  // Sky blue
        `hsl(${175 + rand(10)}, 80%, 40%)`,  // Deep teal
      ];
    },
    // Forest palette
    () => {
      return [
        `hsl(${120 + rand(10)}, 85%, 35%)`,  // Green
        `hsl(${130 + rand(10)}, 80%, 40%)`,  // Light green
        `hsl(${110 + rand(10)}, 75%, 30%)`,  // Dark green
        `hsl(${140 + rand(10)}, 85%, 45%)`,  // Emerald
        `hsl(${100 + rand(10)}, 80%, 35%)`,  // Olive
        `hsl(${160 + rand(10)}, 75%, 40%)`,  // Mint
        `hsl(${80 + rand(10)}, 70%, 35%)`,   // Yellow-green
        `hsl(${45 + rand(10)}, 80%, 40%)`,   // Gold-green
        `hsl(${150 + rand(10)}, 85%, 30%)`,  // Dark emerald
        `hsl(${170 + rand(10)}, 75%, 35%)`,  // Deep mint
      ];
    },
    // Candy palette
    () => {
      return [
        `hsl(${340 + rand(10)}, 95%, 65%)`,  // Cotton candy pink
        `hsl(${280 + rand(10)}, 85%, 60%)`,  // Lavender
        `hsl(${200 + rand(10)}, 90%, 65%)`,  // Sky blue
        `hsl(${160 + rand(10)}, 85%, 55%)`,  // Mint
        `hsl(${50 + rand(10)}, 95%, 65%)`,   // Lemon
        `hsl(${30 + rand(10)}, 90%, 60%)`,   // Peach
        `hsl(${0 + rand(10)}, 85%, 60%)`,    // Strawberry
        `hsl(${220 + rand(10)}, 80%, 70%)`,  // Periwinkle
        `hsl(${120 + rand(10)}, 85%, 55%)`,  // Lime
        `hsl(${320 + rand(10)}, 90%, 60%)`,  // Orchid
      ];
    },
    // Galactic palette
    () => {
      return [
        `hsl(${260 + rand(10)}, 90%, 35%)`,  // Deep purple
        `hsl(${280 + rand(10)}, 85%, 45%)`,  // Violet
        `hsl(${240 + rand(10)}, 95%, 30%)`,  // Deep blue
        `hsl(${300 + rand(10)}, 80%, 40%)`,  // Magenta
        `hsl(${220 + rand(10)}, 85%, 50%)`,  // Royal blue
        `hsl(${270 + rand(10)}, 90%, 40%)`,  // Amethyst
        `hsl(${290 + rand(10)}, 85%, 55%)`,  // Light purple
        `hsl(${250 + rand(10)}, 80%, 45%)`,  // Indigo
        `hsl(${310 + rand(10)}, 90%, 35%)`,  // Deep magenta
        `hsl(${230 + rand(10)}, 85%, 55%)`,  // Cornflower
      ];
    },
    // Autumn palette
    () => {
      return [
        `hsl(${10 + rand(10)}, 90%, 45%)`,   // Rust
        `hsl(${25 + rand(10)}, 85%, 50%)`,   // Burnt orange
        `hsl(${40 + rand(10)}, 80%, 45%)`,   // Gold
        `hsl(${50 + rand(10)}, 75%, 40%)`,   // Amber
        `hsl(${350 + rand(10)}, 85%, 40%)`,  // Mahogany
        `hsl(${15 + rand(10)}, 80%, 35%)`,   // Terracotta
        `hsl(${30 + rand(10)}, 90%, 55%)`,   // Pumpkin
        `hsl(${45 + rand(10)}, 85%, 50%)`,   // Mustard
        `hsl(${5 + rand(10)}, 95%, 45%)`,    // Crimson
        `hsl(${20 + rand(10)}, 75%, 55%)`,   // Peach
      ];
    }
  ];
  
  return palettes[rand(palettes.length)]();
}

// Generate border color (black or gray)
function getBorderColor() {
  const colors = [
    '#000000', // Black
    '#333333', // Dark gray
    '#555555', // Medium gray
    '#777777', // Light gray
    '#222222', // Very dark gray
    '#444444', // Dark-medium gray
    '#666666', // Medium-light gray
  ];
  return colors[rand(colors.length)];
}

// Generate a random sentence
function getRandomSentence() {
  const sentences = [
    // "hello world i am fan of AVI i avengers you untill last star ends"
    "Happy minds build great dreams with honest daily effort now"
  ];
  
  return sentences[rand(sentences.length)];
}

// Generate random transformation for a letter
function getLetterTransform() {


//Medium
  const transformations = [
    //20 to 30
    { type: 'rotate', min: 20, max: 30 },
    { type: 'rotate', min: -20, max: -25 },

    { type: 'moveUp', pixels: 3 },
    { type: 'moveUp', pixels: 4 },
    { type: 'moveDown', pixels: 3 },
    { type: 'moveDown', pixels: 4 },
    { type: 'rotateAndMove', rotate: 10, moveY: -4 },
    { type: 'rotateAndMove', rotate: -10, moveY: 4 },
    { type: 'rotateAndMove', rotate: 12, moveY: 5 },
    { type: 'rotateAndMove', rotate: -12, moveY: -5 },
    { type: 'upsideDown', degrees: 180 },


  ];
  return transformations[rand(transformations.length)];
}



// //Easy
//   const transformations = [
//     { type: 'rotate', min: 30, max: 40 },
//     { type: 'rotate', min: -30, max: -35 },

//     { type: 'moveUp', pixels: 8 },
//     { type: 'moveUp', pixels: 10 },
//     { type: 'moveDown', pixels: 10 },
//     { type: 'moveDown', pixels: 8 },
//     { type: 'rotateAndMove', rotate: 10, moveY: -8 },
//     { type: 'rotateAndMove', rotate: -10, moveY: 8 },
//     { type: 'rotateAndMove', rotate: 12, moveY: 10 },
//     { type: 'rotateAndMove', rotate: -12, moveY: -10 },
//     { type: 'upsideDown', degrees: 180 },


//   ];
//   return transformations[rand(transformations.length)];
// }



// Draw a single letter with optional transformation, random color, and border
function drawLetter(ctx, letter, x, y, transform, letterIndex, colorPalette) {
  ctx.save();
  
  if (transform) {
    let rotAngle = 0;
    let moveX = 0;
    let moveY = 0;
    
    switch(transform.type) {
      case 'rotate':
        rotAngle = (transform.min + rand(transform.max - transform.min + 1)) * Math.PI / 180;
        break;
      case 'moveUp':
        moveY = -transform.pixels;
        break;
      case 'moveDown':
        moveY = transform.pixels;
        break;
      case 'rotateAndMove':
        rotAngle = transform.rotate * Math.PI / 180;
        moveY = transform.moveY || 0;
        break;
      case 'upsideDown':
        rotAngle = Math.PI;
        break;
    }
    
    ctx.translate(x + moveX, y + moveY);
    
    if (rotAngle !== 0) {
      ctx.translate(7, 7);
      ctx.rotate(rotAngle);
      ctx.translate(-7, -7);
    }
  } else {
    ctx.translate(x, y);
  }
  
  // Apply color from the palette (cycling through multiple colors)
  const colorIndex = letterIndex % colorPalette.length;
  const fillColor = colorPalette[colorIndex];
  const borderColor = getBorderColor();
  
  ctx.font = "25px Arial";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  
  // Draw border (outline) with black or gray
  const borderWidth = 2;
  ctx.lineWidth = borderWidth;
  ctx.strokeStyle = borderColor;
  ctx.shadowColor = "rgba(0, 0, 0, 0)"; // Disable shadow for border
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  
  // Draw the letter outline
  ctx.strokeText(letter, 0, 0);
  
  // Draw the filled letter on top with color
  ctx.shadowColor = "rgba(0, 0, 0, 0.15)";
  ctx.shadowBlur = 3;
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 2;
  ctx.fillStyle = fillColor;
  ctx.fillText(letter, 0, 0);
  
  // Add small glow effect for some letters
  if (letterIndex % 3 === 0) {
    ctx.shadowColor = "rgba(255, 255, 255, 0.3)";
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.fillText(letter, 0, 0);
  }
  
  ctx.restore();
}

// Function to add AVI watermark
function addWatermark(ctx, canvasWidth, canvasHeight) {
  ctx.save();
  
  // Multiple watermark positions and styles for better visibility
  
  // 1. Main watermark - Bottom right corner (semi-transparent)
  const watermarkText = "Powered by AVI";
  const fontSize = Math.min(canvasWidth, canvasHeight) * 0.08;
  ctx.font = `bold ${fontSize}px Arial`;
  ctx.textAlign = "right";
  ctx.textBaseline = "bottom";
  
  // Shadow for better visibility
  ctx.shadowColor = "rgba(19, 18, 18, 1)";
  ctx.shadowBlur = 5;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  
  // Main watermark with gradient
  const gradient = ctx.createLinearGradient(
    canvasWidth - 100, canvasHeight - 50,
    canvasWidth - 20, canvasHeight - 20
  );
  gradient.addColorStop(0, "rgba(24, 23, 23, 0.54)");
  // gradient.addColorStop(0.5, "rgba(150, 150, 150, 0.30)");
  // gradient.addColorStop(1, "rgba(200, 200, 200, 0.25)");
  
  ctx.fillStyle = gradient;
  ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
  ctx.shadowBlur = 8;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  
  // Position in bottom right with padding
  const padding = 20;
  ctx.fillText(watermarkText, canvasWidth - padding, canvasHeight - padding);
  

  
  // 3. Small watermark - Top left corner

  

  
  
  // Reset global alpha
  ctx.globalAlpha = 1.0;
  ctx.restore();
}

export function generatePuzzle_misalignedLetters(shp) {
  // Get a random sentence
  let sentence = getRandomSentence();
  
  // Limit words if shp is provided
  let maxWords = 40;
  if (Number.isFinite(shp) && shp > 0) {
    maxWords = Math.min(shp, 40);
  }
  
  const words = sentence.split(' ');
  if (words.length > maxWords) {
    sentence = words.slice(0, maxWords).join(' ');
  }
  
  // Get all letters without spaces
  const lettersOnly = sentence.replace(/\s/g, '');
  const allLetters = lettersOnly.split('');
  const totalLetters = allLetters.length;
  
  // Determine how many letters to misalign (10-20% of total, min 1)
  const misalignCount = Math.max(1, Math.floor(totalLetters * (0.15 + rand(10) / 100)));
  
  // Pick which letter positions to misalign
  const positions = Array.from({length: totalLetters}, (_, i) => i);
  const shuffledPositions = shuffle(positions);
  const misalignedPositions = shuffledPositions.slice(0, misalignCount);
  
  // Create letter data with transformations
  const letterData = [];
  let misalignedCount = 0;
  
  for (let i = 0; i < totalLetters; i++) {
    let transform = null;
    let isMisaligned = false;
    
    if (misalignedPositions.includes(i)) {
      transform = getLetterTransform();
      isMisaligned = true;
      misalignedCount++;
    }
    
    letterData.push({
      letter: allLetters[i],
      transform: transform,
      isMisaligned: isMisaligned
    });
  }
  
  // Generate multiple choice options - CLOSER TO ANSWER
  const answer = misalignedCount;
  const optionSet = new Set([answer]);
  
  // Generate wrong options that are closer to the answer
  const possibleWrong = [];
  
  // Get possible wrong values within a reasonable range
  const minValue = Math.max(1, answer - 5);
  const maxValue = Math.min(totalLetters, answer + 5);
  
  for (let i = minValue; i <= maxValue; i++) {
    if (i !== answer && i > 0) {
      possibleWrong.push(i);
    }
  }
  
  // If we don't have enough options nearby, expand the range
  if (possibleWrong.length < 3) {
    // Expand the range further
    const expandedMin = Math.max(1, answer - 10);
    const expandedMax = Math.min(totalLetters, answer + 10);
    for (let i = expandedMin; i <= expandedMax; i++) {
      if (i !== answer && i > 0 && !possibleWrong.includes(i)) {
        possibleWrong.push(i);
      }
    }
  }
  
  // Shuffle and pick the closest options (prefer options closer to answer)
  const shuffledWrong = shuffle(possibleWrong);
  
  // Sort wrong options by distance from answer (closest first)
  shuffledWrong.sort((a, b) => Math.abs(a - answer) - Math.abs(b - answer));
  
  // Take the 3 closest wrong options
  let selectedWrong = shuffledWrong.slice(0, 3);
  
  // If we don't have 3, add more from further away
  if (selectedWrong.length < 3) {
    const remaining = shuffle(possibleWrong.filter(val => !selectedWrong.includes(val)));
    while (selectedWrong.length < 3 && remaining.length > 0) {
      selectedWrong.push(remaining.pop());
    }
  }
  
  // Add wrong options to the set
  for (const val of selectedWrong) {
    if (!optionSet.has(val)) {
      optionSet.add(val);
    }
  }
  
  // If still don't have 4 options, add some random numbers
  let counter = 1;
  while (optionSet.size < 4) {
    if (!optionSet.has(counter) && counter !== answer) {
      optionSet.add(counter);
    }
    counter++;
  }
  
  const options = shuffle([...optionSet]).map(String);
  
  // Calculate canvas size based on sentence
  const fontSize = 20;
  const lineHeight = 30;
  const charWidth = 12;
  const letterSpacing = 5;
  const wordSpacing = 10;
  
  // Calculate text metrics
  let maxLineWidth = 0;
  let totalHeight = lineHeight;
  let currentLine = '';
  const lines = [];
  
  const maxWidth = 650;
  const padding = 40;
  
  // Split into lines by words to avoid breaking words
  const wordsArray = sentence.split(' ');
  currentLine = '';
  
  for (let i = 0; i < wordsArray.length; i++) {
    const word = wordsArray[i];
    const testLine = currentLine + (currentLine ? ' ' : '') + word;
    // Calculate width based on characters
    let testWidth = 0;
    for (let j = 0; j < testLine.length; j++) {
      if (testLine[j] === ' ') {
        testWidth += wordSpacing;
      } else {
        testWidth += charWidth + letterSpacing;
      }
    }
    
    if (testWidth > maxWidth && currentLine.length > 0) {
      lines.push(currentLine);
      maxLineWidth = Math.max(maxLineWidth, currentLine.length * (charWidth + letterSpacing));
      currentLine = word;
      totalHeight += lineHeight;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine.length > 0) {
    lines.push(currentLine);
    maxLineWidth = Math.max(maxLineWidth, currentLine.length * (charWidth + letterSpacing));
  }
  
  const canvasWidth = Math.min(800, Math.max(padding * 2 + maxLineWidth, 400));
  const canvasHeight = Math.min(600, Math.max(200, totalHeight + padding * 2));
  
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext("2d");
  
  // Create dynamic gradient background with multiple colors
  const gradient = ctx.createRadialGradient(
    canvasWidth * 0.3, canvasHeight * 0.3, 50,
    canvasWidth * 0.7, canvasHeight * 0.7, canvasWidth * 0.8
  );
  const bgHue1 = rand(360);
  const bgHue2 = (bgHue1 + rand(60) + 30) % 360;
  gradient.addColorStop(0, `hsl(${bgHue1}, 30%, 97%)`);
  gradient.addColorStop(0.5, `hsl(${(bgHue1 + bgHue2) / 2}, 25%, 95%)`);
  gradient.addColorStop(1, `hsl(${bgHue2}, 30%, 92%)`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  
  // Add decorative elements with various colors
  const decorColors = [
    `hsla(${rand(360)}, 70%, 70%, 0.15)`,
    `hsla(${rand(360)}, 60%, 60%, 0.12)`,
    `hsla(${rand(360)}, 80%, 80%, 0.10)`,
  ];
  
  for (let i = 0; i < 30; i++) {
    ctx.fillStyle = decorColors[rand(decorColors.length)];
    const shape = rand(3);
    const x = rand(canvasWidth);
    const y = rand(canvasHeight);
    const size = rand(3, 8);
    
    if (shape === 0) {
      // Circle
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    } else if (shape === 1) {
      // Square
      ctx.fillRect(x - size/2, y - size/2, size, size);
    } else {
      // Triangle
      ctx.beginPath();
      ctx.moveTo(x, y - size);
      ctx.lineTo(x - size, y + size);
      ctx.lineTo(x + size, y + size);
      ctx.closePath();
      ctx.fill();
    }
  }
  
  // Generate extended color palette (10+ colors)
  const colorPalette = getExtendedColorPalette();
  
  // Draw sentence with transformations and random colors with borders
  let yPos = padding;
  let letterIndex = 0;
  
  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx];
    let xPos = padding;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === ' ') {
        xPos += wordSpacing;
        continue;
      }
      
      if (letterIndex < letterData.length) {
        const data = letterData[letterIndex];
        drawLetter(ctx, data.letter, xPos, yPos, data.transform, letterIndex, colorPalette);
        letterIndex++;
      }
      
      xPos += charWidth + letterSpacing;
    }
    
    yPos += lineHeight;
  }

  
  // Add AVI watermark
  addWatermark(ctx, canvasWidth, canvasHeight);
  
  return {
    question: "How many letters are misaligned?",
    options: options,
    answer: String(answer),
    sentence: sentence,
    misalignedCount: misalignedCount,
    totalLetters: totalLetters,
    image: canvas.toDataURL().split(",")[1]
  };
}




