// import { createCanvas } from "canvas";

// // -----------------------------------
// // Helpers
// // -----------------------------------

// function shuffle(arr) {
//   return arr.sort(() => Math.random() - 0.5);
// }

// function getRandom(arr) {
//   return arr[Math.floor(Math.random() * arr.length)];
// }

// function rand(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// // -----------------------------------
// // Generate Random Letters
// // -----------------------------------

// function generateRandomLetters(count) {
//   const letters = 'abcdefghijklmnopqrstuvwxyz';
//   let result = '';
//   for (let i = 0; i < count; i++) {
//     result += letters[Math.floor(Math.random() * letters.length)];
//   }
//   return result;
// }

// // -----------------------------------
// // Generate Alphabet Substitution Cipher
// // -----------------------------------

// function generateCipher() {
//   const alphabet = 'abcdefghijklmnopqrstuvwxyz';
//   const letters = alphabet.split('');
//   const shuffled = shuffle([...letters]);
  
//   const cipher = {};
//   for (let i = 0; i < 26; i++) {
//     cipher[letters[i]] = shuffled[i];
//   }
  
//   return cipher;
// }

// // -----------------------------------
// // Encode a word using the cipher
// // -----------------------------------

// function encodeWord(word, cipher) {
//   let encoded = '';
//   for (let i = 0; i < word.length; i++) {
//     const letter = word[i];
//     encoded += cipher[letter] || letter;
//   }
//   return encoded;
// }

// // -----------------------------------
// // Generate Puzzle
// // -----------------------------------

// function generatePuzzle(letterLength = 3) {
//   const cipher = generateCipher();
//   const originalWord = generateRandomLetters(letterLength);
//   const encodedWord = encodeWord(originalWord, cipher);
//   const options = generateOptions(originalWord, cipher);
  
//   // Determine if "None of the above" should be the correct answer (30% chance)
//   const noneOfAboveIsCorrect = Math.random() < 0.3;
  
//   // If none of the above is correct, we need to make sure the correct word is NOT in the options
//   let finalOptions;
//   let correctAnswer;
  
//   if (noneOfAboveIsCorrect) {
//     // Generate options without the correct word
//     const optionsWithoutCorrect = options.filter(opt => opt !== originalWord);
//     // Take first 5 options (or all if less than 5)
//     finalOptions = optionsWithoutCorrect.slice(0, 5);
//     // Add "None of the above" at the end
//     finalOptions.push("None of the above");
//     correctAnswer = "None of the above";
//   } else {
//     // Normal case - correct word is in options
//     finalOptions = options;
//     // Make sure "None of the above" is at the end
//     finalOptions = finalOptions.filter(opt => opt !== "None of the above");
//     // Shuffle the remaining options
//     finalOptions = shuffle(finalOptions);
//     // Add "None of the above" at the end
//     finalOptions.push("None of the above");
//     correctAnswer = originalWord;
//   }
  
//   return {
//     cipher: cipher,
//     originalWord: originalWord,
//     encodedWord: encodedWord,
//     options: finalOptions,
//     correctAnswer: correctAnswer,
//     noneOfAboveIsCorrect: noneOfAboveIsCorrect
//   };
// }

// // -----------------------------------
// // Generate Options
// // -----------------------------------

// function generateOptions(correctWord, cipher) {
//   const options = new Set();
//   options.add(correctWord);
  
//   const wrongOptions = [];
//   const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  
//   for (let attempt = 0; attempt < 50; attempt++) {
//     let wrongWord = '';
//     for (let i = 0; i < correctWord.length; i++) {
//       if (Math.random() < 0.7) {
//         wrongWord += correctWord[i];
//       } else {
//         let newLetter;
//         do {
//           newLetter = getRandom(alphabet.split(''));
//         } while (newLetter === correctWord[i]);
//         wrongWord += newLetter;
//       }
//     }
    
//     if (wrongWord !== correctWord && wrongWord.length === correctWord.length) {
//       wrongOptions.push(wrongWord);
//       if (wrongOptions.length >= 6) break;
//     }
//   }
  
//   while (wrongOptions.length < 6) {
//     let wrongWord = '';
//     for (let i = 0; i < correctWord.length; i++) {
//       wrongWord += getRandom(alphabet.split(''));
//     }
//     if (wrongWord !== correctWord && wrongWord.length === correctWord.length) {
//       wrongOptions.push(wrongWord);
//     }
//   }
  
//   for (const wrong of wrongOptions.slice(0, 6)) {
//     options.add(wrong);
//   }
  
//   while (options.size < 6) {
//     let wrongWord = '';
//     for (let i = 0; i < correctWord.length; i++) {
//       wrongWord += getRandom(alphabet.split(''));
//     }
//     if (wrongWord !== correctWord && wrongWord.length === correctWord.length) {
//       options.add(wrongWord);
//     }
//   }
  
//   return shuffle([...options]);
// }

// // -----------------------------------
// // Helper function to draw rounded rectangle
// // -----------------------------------

// function roundRect(ctx, x, y, w, h, r) {
//   if (r > w/2) r = w/2;
//   if (r > h/2) r = h/2;
//   ctx.beginPath();
//   ctx.moveTo(x + r, y);
//   ctx.lineTo(x + w - r, y);
//   ctx.quadraticCurveTo(x + w, y, x + w, y + r);
//   ctx.lineTo(x + w, y + h - r);
//   ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
//   ctx.lineTo(x + r, y + h);
//   ctx.quadraticCurveTo(x, y + h, x, y + h - r);
//   ctx.lineTo(x, y + r);
//   ctx.quadraticCurveTo(x, y, x + r, y);
//   ctx.closePath();
// }

// // -----------------------------------
// // Main Function - Generate Cipher Text to Plain Text Puzzle
// // -----------------------------------

// export function generatePuzzle_cipher_text(options = {}) {
//   const {
//     width = 400,
//     height = 280,
//     showWatermark = true,
//     watermarkText = "Powered by AVI",
//     letterLength = 3
//   } = options;
  
//   const puzzleData = generatePuzzle(letterLength);
  
//   const question = `Decode "${puzzleData.encodedWord.toUpperCase()}" using cipher key`;
  
//   const canvas = createCanvas(width, height);
//   const ctx = canvas.getContext("2d");
  
//   // Background
//   const bgGradient = ctx.createLinearGradient(0, 0, width, height);
//   bgGradient.addColorStop(0, '#1a1a2e');
//   bgGradient.addColorStop(0.5, '#16213e');
//   bgGradient.addColorStop(1, '#0f3460');
//   ctx.fillStyle = bgGradient;
//   ctx.fillRect(0, 0, width, height);
  
//   // Title
//   ctx.save();
//   ctx.fillStyle = '#e0e0e0';
//   ctx.font = 'bold 13px Arial';
//   ctx.textAlign = 'center';
//   ctx.textBaseline = 'top';
//   ctx.fillText('🔐 Cipher Decoder', width / 2, 6);
//   ctx.restore();
  
//   // ---- Cipher Key Display - SHUFFLED ORDER ----
//   const cipherStartY = 26;
//   const keyPadding = 8;
//   const keyWidth = width - (keyPadding * 2);
  
//   // Background box for cipher key
//   ctx.save();
//   ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
//   ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
//   ctx.shadowBlur = 8;
//   ctx.shadowOffsetX = 0;
//   ctx.shadowOffsetY = 3;
//   ctx.beginPath();
//   roundRect(ctx, keyPadding, cipherStartY, keyWidth, 72, 6);
//   ctx.fill();
//   ctx.restore();
  

  
//   // Get shuffled letters for display
//   const alphabet = 'abcdefghijklmnopqrstuvwxyz';
//   const letters = alphabet.split('');
//   const shuffledLetters = shuffle([...letters]);
  
//   // Split into two rows (13 each)
//   const firstRowLetters = shuffledLetters.slice(0, 13);
//   const secondRowLetters = shuffledLetters.slice(13, 26);
  
//   const letterSpacing = Math.min(30, (keyWidth - 20) / 13);
//   const keyStartX = (width - (13 * letterSpacing)) / 2 + letterSpacing / 2;
//   const firstRowY = cipherStartY + 20;
//   const secondRowY = cipherStartY + 44;
  
//   // Draw first row (shuffled)
//   for (let i = 0; i < firstRowLetters.length; i++) {
//     const letter = firstRowLetters[i];
//     const encoded = puzzleData.cipher[letter];
//     const x = keyStartX + i * letterSpacing;
    
//     // Plain text letter
//     ctx.save();
//     ctx.fillStyle = '#4fc3f7';
//     ctx.font = 'bold 14px Arial';
//     ctx.textAlign = 'center';
//     ctx.textBaseline = 'middle';
//     ctx.fillText(letter.toUpperCase(), x - 7, firstRowY);
//     ctx.restore();
    
//     // Arrow
//     ctx.save();
//     ctx.fillStyle = '#fefefe';
//     ctx.font = '10px Arial';
//     ctx.textAlign = 'center';
//     ctx.textBaseline = 'middle';
//     ctx.fillText(':', x, firstRowY);
//     ctx.restore();
    
//     // Cipher text letter
//     ctx.save();
//     ctx.fillStyle = '#ff6b6b';
//     ctx.font = 'bold 14px Arial';
//     ctx.textAlign = 'center';
//     ctx.textBaseline = 'middle';
//     ctx.fillText(encoded.toUpperCase(), x + 7, firstRowY);
//     ctx.restore();
//   }
  
//   // Draw second row (shuffled)
//   for (let i = 0; i < secondRowLetters.length; i++) {
//     const letter = secondRowLetters[i];
//     const encoded = puzzleData.cipher[letter];
//     const x = keyStartX + i * letterSpacing;
    
//     // Plain text letter
//     ctx.save();
//     ctx.fillStyle = '#4fc3f7';
//     ctx.font = 'bold 14px Arial';
//     ctx.textAlign = 'center';
//     ctx.textBaseline = 'middle';
//     ctx.fillText(letter.toUpperCase(), x - 7, secondRowY);
//     ctx.restore();
    
//     // Arrow
//     ctx.save();
//     ctx.fillStyle = '#ffffff';
//     ctx.font = '10px Arial';
//     ctx.textAlign = 'center';
//     ctx.textBaseline = 'middle';
//     ctx.fillText(':', x, secondRowY);
//     ctx.restore();
    
//     // Cipher text letter
//     ctx.save();
//     ctx.fillStyle = '#ff6b6b';
//     ctx.font = 'bold 14px Arial';
//     ctx.textAlign = 'center';
//     ctx.textBaseline = 'middle';
//     ctx.fillText(encoded.toUpperCase(), x + 7, secondRowY);
//     ctx.restore();
//   }
  
//   // Separator line
//   const separatorY = cipherStartY + 84;
//   ctx.save();
//   ctx.strokeStyle = 'rgba(79, 195, 247, 0.15)';
//   ctx.lineWidth = 0.5;
//   ctx.setLineDash([3, 3]);
//   ctx.beginPath();
//   ctx.moveTo(15, separatorY);
//   ctx.lineTo(width - 15, separatorY);
//   ctx.stroke();
//   ctx.setLineDash([]);
//   ctx.restore();
  
//   // ---- Cipher Text Display ----
//   const cipherY = separatorY + 10;
//   const letterSize = 28;
//   const cipherSpacing = letterSize * 1.3;
//   const cipherTotalWidth = puzzleData.encodedWord.length * cipherSpacing;
//   const cipherStartX = (width - cipherTotalWidth) / 2 + cipherSpacing / 2;

  
  
//   // Cipher text label
//   ctx.save();
//   ctx.fillStyle = '#8899aa';
//   ctx.font = '7px Arial';
//   ctx.textAlign = 'center';
//   ctx.textBaseline = 'bottom';
//   ctx.fillText('🔒 Encrypted', width / 2, cipherY - 2);
//   ctx.restore();
  
//   // Display cipher text
//   for (let i = 0; i < puzzleData.encodedWord.length; i++) {
//     const x = cipherStartX + i * cipherSpacing;
//     const y = cipherY + 17;
//     const letter = puzzleData.encodedWord[i];
    
//     ctx.save();
//     ctx.shadowColor = 'rgba(255, 107, 107, 0.3)';
//     ctx.shadowBlur = 8;
//     ctx.shadowOffsetX = 0;
//     ctx.shadowOffsetY = 0;
    
//     const gradient = ctx.createRadialGradient(
//       x - letterSize * 0.3, y - letterSize * 0.3, 0,
//       x, y, letterSize * 0.7
//     );
//     gradient.addColorStop(0, '#2a2a4a');
//     gradient.addColorStop(0.7, '#ff6b6b');
//     gradient.addColorStop(1, '#c0392b');
    
//     ctx.fillStyle = gradient;
//     ctx.beginPath();
//     roundRect(ctx, x - letterSize/2, y - letterSize/2, letterSize, letterSize, 6);
//     ctx.fill();
    
//     ctx.shadowBlur = 0;
//     ctx.strokeStyle = '#ff6b6b';
//     ctx.lineWidth = 1.5;
//     ctx.beginPath();
//     roundRect(ctx, x - letterSize/2, y - letterSize/2, letterSize, letterSize, 6);
//     ctx.stroke();
    
//     ctx.fillStyle = '#ffffff';
//     ctx.font = `bold ${letterSize * 0.6}px Arial`;
//     ctx.textAlign = 'center';
//     ctx.textBaseline = 'middle';
//     ctx.fillText(letter.toUpperCase(), x, y);
//     ctx.restore();
//   }
  
//   // Decode arrow
//   const decodeArrowY = cipherY + letterSize + 14;
  
//   ctx.save();
//   ctx.fillStyle = '#8899aa';
//   ctx.font = '8px Arial';
//   ctx.textAlign = 'center';
//   ctx.textBaseline = 'middle';
//   ctx.fillText('Decode', width / 2, decodeArrowY);
//   ctx.restore();
  
//   // ---- Plain Text Display ----
//   const plainY = decodeArrowY + 14;
  
//   // Display plain text boxes with question marks
//   const plainStartX = (width - cipherTotalWidth) / 2 + cipherSpacing / 2;
  
//   for (let i = 0; i < puzzleData.encodedWord.length; i++) {
//     const x = plainStartX + i * cipherSpacing;
//     const y = plainY + 7;
    
//     ctx.save();
//     ctx.shadowColor = 'rgba(79, 195, 247, 0.2)';
//     ctx.shadowBlur = 8;
//     ctx.shadowOffsetX = 0;
//     ctx.shadowOffsetY = 0;
    
//     const gradient = ctx.createRadialGradient(
//       x - letterSize * 0.3, y - letterSize * 0.3, 0,
//       x, y, letterSize * 0.7
//     );
//     gradient.addColorStop(0, '#1a2a4a');
//     gradient.addColorStop(0.7, '#4fc3f7');
//     gradient.addColorStop(1, '#0288d1');
    
//     ctx.fillStyle = gradient;
//     ctx.beginPath();
//     roundRect(ctx, x - letterSize/2, y - letterSize/2, letterSize, letterSize, 6);
//     ctx.fill();
    
//     ctx.shadowBlur = 0;
//     ctx.strokeStyle = '#4fc3f7';
//     ctx.lineWidth = 1.5;
//     ctx.setLineDash([3, 3]);
//     ctx.beginPath();
//     roundRect(ctx, x - letterSize/2, y - letterSize/2, letterSize, letterSize, 6);
//     ctx.stroke();
//     ctx.setLineDash([]);
    
//     ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
//     ctx.font = `bold ${letterSize * 0.5}px Arial`;
//     ctx.textAlign = 'center';
//     ctx.textBaseline = 'middle';
//     ctx.fillText('?', x, y);
//     ctx.restore();
//   }
  
//   // ---- Watermark ----
//   if (showWatermark) {
//     ctx.save();
//     ctx.globalAlpha = 0.6;
//     ctx.textAlign = "right";
//     ctx.textBaseline = "bottom";
    
//     ctx.font = "bold 14px Arial";
//     ctx.fillStyle = "#fefefe";
//     ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
//     ctx.shadowBlur = 3;
//     ctx.fillText(watermarkText, width - 8, height - 5);
    
//     ctx.restore();
//   }
  
//   // -----------------------------------
//   // Return
//   // -----------------------------------
  
//   return {
//     title: "Cipher Text to Plain Text",
//     question: question,
//     options: puzzleData.options,
//     answer: puzzleData.correctAnswer,  // This will be either the word or "None of the above"
//     originalWord: puzzleData.originalWord,
//     encodedWord: puzzleData.encodedWord,
//     cipher: puzzleData.cipher,
//     wordLength: puzzleData.originalWord.length,
//     noneOfAboveIsCorrect: puzzleData.noneOfAboveIsCorrect,
//     image: canvas.toDataURL().split(",")[1]
//   };
// }

// // -----------------------------------
// // Example API Endpoint Usage
// // -----------------------------------

// /*
// // For Express.js API endpoint:

// app.get("/cipher-decoder", async(req, res) => {
//   const data = generatePuzzle_cipher_text({
//     width: 400,
//     height: 280,
//     letterLength: 4 // This will generate 4 random letters like "ksgh"
//   });
  
//   if(data){
//     res.json({
//       title: data.title,
//       question: data.question,
//       options: data.options,
//       answer: data.answer,
//       originalWord: data.originalWord,
//       encodedWord: data.encodedWord,
//       cipher: data.cipher,
//       wordLength: data.wordLength,
//       noneOfAboveIsCorrect: data.noneOfAboveIsCorrect,
//       image: data.image
//     });
//   } else {
//     res.status(200).json({ Message: "No Data Created" });
//   }
// });
// */





































import { createCanvas } from "canvas";

// -----------------------------------
// Helpers
// -----------------------------------

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// -----------------------------------
// Generate Random Letters
// -----------------------------------

function generateRandomLetters(count) {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < count; i++) {
    result += letters[Math.floor(Math.random() * letters.length)];
  }
  return result;
}

// -----------------------------------
// Generate Alphabet Substitution Cipher
// -----------------------------------

function generateCipher() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const letters = alphabet.split('');
  const shuffled = shuffle([...letters]);
  
  const cipher = {};
  for (let i = 0; i < 26; i++) {
    cipher[letters[i]] = shuffled[i];
  }
  
  return cipher;
}

// -----------------------------------
// Encode a word using the cipher
// -----------------------------------

function encodeWord(word, cipher) {
  let encoded = '';
  for (let i = 0; i < word.length; i++) {
    const letter = word[i];
    encoded += cipher[letter] || letter;
  }
  return encoded;
}

// -----------------------------------
// Generate Puzzle
// -----------------------------------

function generatePuzzle(letterLength = 3) {
  const cipher = generateCipher();
  const originalWord = generateRandomLetters(letterLength);
  const encodedWord = encodeWord(originalWord, cipher);
  const options = generateOptions(originalWord, cipher);
  
  // Determine if "None of the above" should be the correct answer (30% chance)
  const noneOfAboveIsCorrect = Math.random() < 0.3;
  
  // If none of the above is correct, we need to make sure the correct word is NOT in the options
  let finalOptions;
  let correctAnswer;
  
  if (noneOfAboveIsCorrect) {
    // Generate options without the correct word
    const optionsWithoutCorrect = options.filter(opt => opt !== originalWord);
    // Take first 5 options (or all if less than 5)
    finalOptions = optionsWithoutCorrect.slice(0, 5);
    // Add "None of the above" at the end
    finalOptions.push("None of the above");
    correctAnswer = "None of the above";
  } else {
    // Normal case - correct word is in options
    finalOptions = options;
    // Make sure "None of the above" is at the end
    finalOptions = finalOptions.filter(opt => opt !== "None of the above");
    // Shuffle the remaining options
    finalOptions = shuffle(finalOptions);
    // Add "None of the above" at the end
    finalOptions.push("None of the above");
    correctAnswer = originalWord;
  }
  
  return {
    cipher: cipher,
    originalWord: originalWord,
    encodedWord: encodedWord,
    options: finalOptions,
    correctAnswer: correctAnswer,
    noneOfAboveIsCorrect: noneOfAboveIsCorrect
  };
}

// -----------------------------------
// Generate Options
// -----------------------------------

function generateOptions(correctWord, cipher) {
  const options = new Set();
  options.add(correctWord);
  
  const wrongOptions = [];
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  
  for (let attempt = 0; attempt < 50; attempt++) {
    let wrongWord = '';
    for (let i = 0; i < correctWord.length; i++) {
      if (Math.random() < 0.7) {
        wrongWord += correctWord[i];
      } else {
        let newLetter;
        do {
          newLetter = getRandom(alphabet.split(''));
        } while (newLetter === correctWord[i]);
        wrongWord += newLetter;
      }
    }
    
    if (wrongWord !== correctWord && wrongWord.length === correctWord.length) {
      wrongOptions.push(wrongWord);
      if (wrongOptions.length >= 6) break;
    }
  }
  
  while (wrongOptions.length < 6) {
    let wrongWord = '';
    for (let i = 0; i < correctWord.length; i++) {
      wrongWord += getRandom(alphabet.split(''));
    }
    if (wrongWord !== correctWord && wrongWord.length === correctWord.length) {
      wrongOptions.push(wrongWord);
    }
  }
  
  for (const wrong of wrongOptions.slice(0, 6)) {
    options.add(wrong);
  }
  
  while (options.size < 6) {
    let wrongWord = '';
    for (let i = 0; i < correctWord.length; i++) {
      wrongWord += getRandom(alphabet.split(''));
    }
    if (wrongWord !== correctWord && wrongWord.length === correctWord.length) {
      options.add(wrongWord);
    }
  }
  
  return shuffle([...options]);
}

// -----------------------------------
// Helper function to draw rounded rectangle
// -----------------------------------

function roundRect(ctx, x, y, w, h, r) {
  if (r > w/2) r = w/2;
  if (r > h/2) r = h/2;
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

// -----------------------------------
// Main Function - Generate Cipher Text to Plain Text Puzzle
// -----------------------------------

export function generatePuzzle_cipher_text(options = {}) {
  const {
    width = 400,
    height = 280,
    showWatermark = true,
    watermarkText = "Powered by AVI",
    letterLength = 3
  } = options;
  
  const puzzleData = generatePuzzle(letterLength);
  
  const question = `Decode "${puzzleData.encodedWord.toUpperCase()}" using cipher key`;
  
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  
  // Background
  const bgGradient = ctx.createLinearGradient(0, 0, width, height);
  bgGradient.addColorStop(0, '#1a1a2e');
  bgGradient.addColorStop(0.5, '#16213e');
  bgGradient.addColorStop(1, '#0f3460');
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, width, height);
  
  // Title
  ctx.save();
  ctx.fillStyle = '#e0e0e0';
  ctx.font = 'bold 13px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('🔐 Cipher Decoder', width / 2, 6);
  ctx.restore();
  
  // ---- Cipher Key Display - SHUFFLED ORDER ----
  const cipherStartY = 26;
  const keyPadding = 8;
  const keyWidth = width - (keyPadding * 2);
  
  // Background box for cipher key
  ctx.save();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
  ctx.shadowBlur = 8;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 3;
  ctx.beginPath();
  roundRect(ctx, keyPadding, cipherStartY, keyWidth, 72, 6);
  ctx.fill();
  ctx.restore();
  

  
  // Get shuffled letters for display
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const letters = alphabet.split('');
  const shuffledLetters = shuffle([...letters]);
  
  // Split into two rows (13 each)
  const firstRowLetters = shuffledLetters.slice(0, 13);
  const secondRowLetters = shuffledLetters.slice(13, 26);
  
  const letterSpacing = Math.min(30, (keyWidth - 20) / 13);
  const keyStartX = (width - (13 * letterSpacing)) / 2 + letterSpacing / 2;
  const firstRowY = cipherStartY + 20;
  const secondRowY = cipherStartY + 44;
  
  // Draw first row (shuffled)
  for (let i = 0; i < firstRowLetters.length; i++) {
    const letter = firstRowLetters[i];
    const encoded = puzzleData.cipher[letter];
    const x = keyStartX + i * letterSpacing;
    
    // Plain text letter
    ctx.save();
    ctx.fillStyle = '#4fc3f7';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(letter.toUpperCase(), x - 7, firstRowY);
    ctx.restore();
    
    // Arrow
    ctx.save();
    ctx.fillStyle = '#fefefe';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(':', x, firstRowY);
    ctx.restore();
    
    // Cipher text letter
    ctx.save();
    ctx.fillStyle = '#ff6b6b';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(encoded.toUpperCase(), x + 7, firstRowY);
    ctx.restore();
  }
  
  // Draw second row (shuffled)
  for (let i = 0; i < secondRowLetters.length; i++) {
    const letter = secondRowLetters[i];
    const encoded = puzzleData.cipher[letter];
    const x = keyStartX + i * letterSpacing;
    
    // Plain text letter
    ctx.save();
    ctx.fillStyle = '#4fc3f7';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(letter.toUpperCase(), x - 7, secondRowY);
    ctx.restore();
    
    // Arrow
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(':', x, secondRowY);
    ctx.restore();
    
    // Cipher text letter
    ctx.save();
    ctx.fillStyle = '#ff6b6b';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(encoded.toUpperCase(), x + 7, secondRowY);
    ctx.restore();
  }
  
  // Separator line
  const separatorY = cipherStartY + 84;
  ctx.save();
  ctx.strokeStyle = 'rgba(79, 195, 247, 0.15)';
  ctx.lineWidth = 0.5;
  ctx.setLineDash([3, 3]);
  ctx.beginPath();
  ctx.moveTo(15, separatorY);
  ctx.lineTo(width - 15, separatorY);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();
  
  // ---- Cipher Text Display ----
  const cipherY = separatorY + 10;
  const letterSize = 28;
  const cipherSpacing = letterSize * 1.3;
  const cipherTotalWidth = puzzleData.encodedWord.length * cipherSpacing;
  const cipherStartX = (width - cipherTotalWidth) / 2 + cipherSpacing / 2;

  
  
  // Cipher text label
  ctx.save();
  ctx.fillStyle = '#8899aa';
  ctx.font = '7px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.fillText('🔒 Encrypted', width / 2, cipherY - 2);
  ctx.restore();
  
  // Display cipher text
  for (let i = 0; i < puzzleData.encodedWord.length; i++) {
    const x = cipherStartX + i * cipherSpacing;
    const y = cipherY + 17;
    const letter = puzzleData.encodedWord[i];
    
    ctx.save();
    ctx.shadowColor = 'rgba(255, 107, 107, 0.3)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
    const gradient = ctx.createRadialGradient(
      x - letterSize * 0.3, y - letterSize * 0.3, 0,
      x, y, letterSize * 0.7
    );
    gradient.addColorStop(0, '#2a2a4a');
    gradient.addColorStop(0.7, '#ff6b6b');
    gradient.addColorStop(1, '#c0392b');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    roundRect(ctx, x - letterSize/2, y - letterSize/2, letterSize, letterSize, 6);
    ctx.fill();
    
    ctx.shadowBlur = 0;
    ctx.strokeStyle = '#ff6b6b';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    roundRect(ctx, x - letterSize/2, y - letterSize/2, letterSize, letterSize, 6);
    ctx.stroke();
    
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${letterSize * 0.6}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(letter.toUpperCase(), x, y);
    ctx.restore();
  }
  
  // Decode arrow
  const decodeArrowY = cipherY + letterSize + 14;
  
  ctx.save();
  ctx.fillStyle = '#8899aa';
  ctx.font = '8px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Decode', width / 2, decodeArrowY);
  ctx.restore();
  
  // ---- Plain Text Display ----
  const plainY = decodeArrowY + 14;
  
  // Display plain text boxes with question marks
  const plainStartX = (width - cipherTotalWidth) / 2 + cipherSpacing / 2;
  
  for (let i = 0; i < puzzleData.encodedWord.length; i++) {
    const x = plainStartX + i * cipherSpacing;
    const y = plainY + 7;
    
    ctx.save();
    ctx.shadowColor = 'rgba(79, 195, 247, 0.2)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
    const gradient = ctx.createRadialGradient(
      x - letterSize * 0.3, y - letterSize * 0.3, 0,
      x, y, letterSize * 0.7
    );
    gradient.addColorStop(0, '#1a2a4a');
    gradient.addColorStop(0.7, '#4fc3f7');
    gradient.addColorStop(1, '#0288d1');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    roundRect(ctx, x - letterSize/2, y - letterSize/2, letterSize, letterSize, 6);
    ctx.fill();
    
    ctx.shadowBlur = 0;
    ctx.strokeStyle = '#4fc3f7';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    roundRect(ctx, x - letterSize/2, y - letterSize/2, letterSize, letterSize, 6);
    ctx.stroke();
    ctx.setLineDash([]);
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = `bold ${letterSize * 0.5}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('?', x, y);
    ctx.restore();
  }
  
  // ---- Watermark ----
  if (showWatermark) {
    ctx.save();
    ctx.globalAlpha = 0.6;
    ctx.textAlign = "right";
    ctx.textBaseline = "bottom";
    
    ctx.font = "bold 14px Arial";
    ctx.fillStyle = "#fefefe";
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 3;
    ctx.fillText(watermarkText, width - 8, height - 5);
    
    ctx.restore();
  }
  
  // -----------------------------------
  // Return
  // -----------------------------------
  
  return {
    title: "Cipher Text to Plain Text",
    question: question,
    options: puzzleData.options,
    answer: puzzleData.correctAnswer,  // This will be either the word or "None of the above"
    originalWord: puzzleData.originalWord,
    encodedWord: puzzleData.encodedWord,
    cipher: puzzleData.cipher,
    wordLength: puzzleData.originalWord.length,
    noneOfAboveIsCorrect: puzzleData.noneOfAboveIsCorrect,
    image: canvas.toDataURL().split(",")[1]
  };
}

// -----------------------------------
// Example API Endpoint Usage
// -----------------------------------

/*
// For Express.js API endpoint:

app.get("/cipher-decoder", async(req, res) => {
  const data = generatePuzzle_cipher_text({
    width: 400,
    height: 280,
    letterLength: 4 // This will generate 4 random letters like "ksgh"
  });
  
  if(data){
    res.json({
      title: data.title,
      question: data.question,
      options: data.options,
      answer: data.answer,
      originalWord: data.originalWord,
      encodedWord: data.encodedWord,
      cipher: data.cipher,
      wordLength: data.wordLength,
      noneOfAboveIsCorrect: data.noneOfAboveIsCorrect,
      image: data.image
    });
  } else {
    res.status(200).json({ Message: "No Data Created" });
  }
});
*/