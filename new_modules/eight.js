// // // // // // // // // // // // // // // // // import { createCanvas } from "canvas";

// // // // // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // // // // Helpers
// // // // // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // // // // function shuffle(arr) {
// // // // // // // // // // // // // // // // //   return arr.sort(() => Math.random() - 0.5);
// // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // function getRandom(arr) {
// // // // // // // // // // // // // // // // //   return arr[Math.floor(Math.random() * arr.length)];
// // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // function rand(min, max) {
// // // // // // // // // // // // // // // // //   return Math.floor(Math.random() * (max - min + 1)) + min;
// // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // // // // Generate Random Letters
// // // // // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // // // // function generateRandomLetters(count) {
// // // // // // // // // // // // // // // // //   const letters = 'abcdefghijklmnopqrstuvwxyz';
// // // // // // // // // // // // // // // // //   let result = '';
// // // // // // // // // // // // // // // // //   for (let i = 0; i < count; i++) {
// // // // // // // // // // // // // // // // //     result += letters[Math.floor(Math.random() * letters.length)];
// // // // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // // //   return result;
// // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // // // // Check if a word contains the target spelling
// // // // // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // // // // function containsSpelling(word, target) {
// // // // // // // // // // // // // // // // //   // Check if the word contains all letters of target in order
// // // // // // // // // // // // // // // // //   let targetIndex = 0;
// // // // // // // // // // // // // // // // //   for (let i = 0; i < word.length; i++) {
// // // // // // // // // // // // // // // // //     if (word[i] === target[targetIndex]) {
// // // // // // // // // // // // // // // // //       targetIndex++;
// // // // // // // // // // // // // // // // //       if (targetIndex === target.length) {
// // // // // // // // // // // // // // // // //         return true;
// // // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // // //   return false;
// // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // // // // Generate Words with Hidden Spellings
// // // // // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // // // // function generateWordsWithSpelling(targetWord, totalWords = 20, minExtraLetters = 2, maxExtraLetters = 6) {
// // // // // // // // // // // // // // // // //   const words = [];
// // // // // // // // // // // // // // // // //   const targetLetters = targetWord.split('');
  
// // // // // // // // // // // // // // // // //   // Determine how many words should contain the spelling (40-60%)
// // // // // // // // // // // // // // // // //   const containCount = Math.floor(totalWords * (rand(40, 60) / 100));
// // // // // // // // // // // // // // // // //   const notContainCount = totalWords - containCount;
  
// // // // // // // // // // // // // // // // //   // Generate words that contain the spelling
// // // // // // // // // // // // // // // // //   for (let i = 0; i < containCount; i++) {
// // // // // // // // // // // // // // // // //     // Create a word with the target spelling embedded
// // // // // // // // // // // // // // // // //     let word = '';
// // // // // // // // // // // // // // // // //     const extraCount = rand(minExtraLetters, maxExtraLetters);
// // // // // // // // // // // // // // // // //     const extraLetters = generateRandomLetters(extraCount);
    
// // // // // // // // // // // // // // // // //     // Insert extra letters randomly around the target word
// // // // // // // // // // // // // // // // //     let targetCopy = targetLetters.slice();
// // // // // // // // // // // // // // // // //     let extraCopy = extraLetters.split('');
    
// // // // // // // // // // // // // // // // //     // Shuffle extra letters and target letters together
// // // // // // // // // // // // // // // // //     const combined = [];
// // // // // // // // // // // // // // // // //     const targetPositions = [];
// // // // // // // // // // // // // // // // //     const extraPositions = [];
    
// // // // // // // // // // // // // // // // //     // Determine positions for target letters
// // // // // // // // // // // // // // // // //     const totalLength = targetCopy.length + extraCopy.length;
// // // // // // // // // // // // // // // // //     const targetIndices = [];
// // // // // // // // // // // // // // // // //     while (targetIndices.length < targetCopy.length) {
// // // // // // // // // // // // // // // // //       const idx = rand(0, totalLength - 1);
// // // // // // // // // // // // // // // // //       if (!targetIndices.includes(idx)) {
// // // // // // // // // // // // // // // // //         targetIndices.push(idx);
// // // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // //     targetIndices.sort((a, b) => a - b);
    
// // // // // // // // // // // // // // // // //     // Fill the combined array
// // // // // // // // // // // // // // // // //     let targetIdx = 0;
// // // // // // // // // // // // // // // // //     let extraIdx = 0;
// // // // // // // // // // // // // // // // //     for (let pos = 0; pos < totalLength; pos++) {
// // // // // // // // // // // // // // // // //       if (targetIndices.includes(pos) && targetIdx < targetCopy.length) {
// // // // // // // // // // // // // // // // //         combined.push(targetCopy[targetIdx]);
// // // // // // // // // // // // // // // // //         targetIdx++;
// // // // // // // // // // // // // // // // //       } else if (extraIdx < extraCopy.length) {
// // // // // // // // // // // // // // // // //         combined.push(extraCopy[extraIdx]);
// // // // // // // // // // // // // // // // //         extraIdx++;
// // // // // // // // // // // // // // // // //       } else {
// // // // // // // // // // // // // // // // //         // Fallback - add random letter
// // // // // // // // // // // // // // // // //         combined.push(getRandom('abcdefghijklmnopqrstuvwxyz'.split('')));
// // // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // // //     }
    
// // // // // // // // // // // // // // // // //     // Shuffle combined to ensure it doesn't look like the original word
// // // // // // // // // // // // // // // // //     // But we need to make sure the target letters appear in order
// // // // // // // // // // // // // // // // //     // Let's reconstruct by shuffling and then ensuring target letters are in order
// // // // // // // // // // // // // // // // //     let finalWord = combined.join('');
    
// // // // // // // // // // // // // // // // //     // Verify the target word is contained
// // // // // // // // // // // // // // // // //     if (!containsSpelling(finalWord, targetWord)) {
// // // // // // // // // // // // // // // // //       // If not contained, add the target word at the end
// // // // // // // // // // // // // // // // //       finalWord = finalWord + targetWord;
// // // // // // // // // // // // // // // // //     }
    
// // // // // // // // // // // // // // // // //     words.push(finalWord);
// // // // // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // // // // //   // Generate words that do NOT contain the spelling
// // // // // // // // // // // // // // // // //   for (let i = 0; i < notContainCount; i++) {
// // // // // // // // // // // // // // // // //     let word = '';
// // // // // // // // // // // // // // // // //     let attempts = 0;
// // // // // // // // // // // // // // // // //     do {
// // // // // // // // // // // // // // // // //       const length = rand(5, 12);
// // // // // // // // // // // // // // // // //       word = generateRandomLetters(length);
// // // // // // // // // // // // // // // // //       attempts++;
// // // // // // // // // // // // // // // // //       // If we can't find a word without the spelling, just use random letters
// // // // // // // // // // // // // // // // //       if (attempts > 50) break;
// // // // // // // // // // // // // // // // //     } while (containsSpelling(word, targetWord));
// // // // // // // // // // // // // // // // //     words.push(word);
// // // // // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // // // // //   // Shuffle all words
// // // // // // // // // // // // // // // // //   return shuffle(words);
// // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // // // // Generate Similar Options
// // // // // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // // // // function generateSimilarOptions(correctAnswer) {
// // // // // // // // // // // // // // // // //   const correctNum = parseInt(correctAnswer);
// // // // // // // // // // // // // // // // //   const options = new Set();
// // // // // // // // // // // // // // // // //   options.add(correctAnswer);
  
// // // // // // // // // // // // // // // // //   const possibleDiffs = [-3, -2, -1, 1, 2, 3, -4, 4];
// // // // // // // // // // // // // // // // //   const shuffledDiffs = shuffle([...possibleDiffs]);
  
// // // // // // // // // // // // // // // // //   for (const diff of shuffledDiffs) {
// // // // // // // // // // // // // // // // //     if (options.size >= 4) break;
// // // // // // // // // // // // // // // // //     const candidate = correctNum + diff;
// // // // // // // // // // // // // // // // //     if (candidate >= 0 && candidate <= 50) {
// // // // // // // // // // // // // // // // //       const candidateStr = candidate.toString();
// // // // // // // // // // // // // // // // //       if (!options.has(candidateStr)) {
// // // // // // // // // // // // // // // // //         options.add(candidateStr);
// // // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // // // // //   const fallbackOptions = [];
// // // // // // // // // // // // // // // // //   for (let i = 0; i <= 50; i++) {
// // // // // // // // // // // // // // // // //     if (!options.has(i.toString())) {
// // // // // // // // // // // // // // // // //       fallbackOptions.push(i.toString());
// // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // // // // //   while (options.size < 4 && fallbackOptions.length > 0) {
// // // // // // // // // // // // // // // // //     const randomFallback = getRandom(fallbackOptions);
// // // // // // // // // // // // // // // // //     options.add(randomFallback);
// // // // // // // // // // // // // // // // //     const index = fallbackOptions.indexOf(randomFallback);
// // // // // // // // // // // // // // // // //     if (index > -1) {
// // // // // // // // // // // // // // // // //       fallbackOptions.splice(index, 1);
// // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // // // // //   return shuffle([...options]);
// // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // // // // Main Function
// // // // // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // // // // export function generatePuzzle_word_search(options = {}) {
// // // // // // // // // // // // // // // // //   const {
// // // // // // // // // // // // // // // // //     targetWord = "apple",
// // // // // // // // // // // // // // // // //     totalWords = 24,
// // // // // // // // // // // // // // // // //     minExtraLetters = 2,
// // // // // // // // // // // // // // // // //     maxExtraLetters = 6,
// // // // // // // // // // // // // // // // //     width = 700,
// // // // // // // // // // // // // // // // //     height = 500,
// // // // // // // // // // // // // // // // //     showWatermark = true,
// // // // // // // // // // // // // // // // //     watermarkText = "✦ Word Search ✦",
// // // // // // // // // // // // // // // // //     wordColors = true
// // // // // // // // // // // // // // // // //   } = options;
  
// // // // // // // // // // // // // // // // //   // Generate words with hidden spellings
// // // // // // // // // // // // // // // // //   const words = generateWordsWithSpelling(targetWord, totalWords, minExtraLetters, maxExtraLetters);
  
// // // // // // // // // // // // // // // // //   // Count how many words contain the spelling
// // // // // // // // // // // // // // // // //   const containCount = words.filter(word => containsSpelling(word, targetWord)).length;
// // // // // // // // // // // // // // // // //   const answer = containCount.toString();
  
// // // // // // // // // // // // // // // // //   // ---------------- CANVAS ----------------
// // // // // // // // // // // // // // // // //   const canvas = createCanvas(width, height);
// // // // // // // // // // // // // // // // //   const ctx = canvas.getContext("2d");
  
// // // // // // // // // // // // // // // // //   // Background gradient
// // // // // // // // // // // // // // // // //   const bgGradient = ctx.createLinearGradient(0, 0, width, height);
// // // // // // // // // // // // // // // // //   bgGradient.addColorStop(0, '#f8f9fa');
// // // // // // // // // // // // // // // // //   bgGradient.addColorStop(0.5, '#e9ecef');
// // // // // // // // // // // // // // // // //   bgGradient.addColorStop(1, '#f8f9fa');
// // // // // // // // // // // // // // // // //   ctx.fillStyle = bgGradient;
// // // // // // // // // // // // // // // // //   ctx.fillRect(0, 0, width, height);
  
// // // // // // // // // // // // // // // // //   // Decorative top border
// // // // // // // // // // // // // // // // //   const borderColors = ['#FF6B6B', '#FF9F43', '#FECA57', '#48DBFB', '#A29BFE', '#FD79A8'];
// // // // // // // // // // // // // // // // //   const borderGradient = ctx.createLinearGradient(0, 0, width, 0);
// // // // // // // // // // // // // // // // //   borderColors.forEach((color, i) => {
// // // // // // // // // // // // // // // // //     const stop = i / borderColors.length;
// // // // // // // // // // // // // // // // //     borderGradient.addColorStop(stop, color);
// // // // // // // // // // // // // // // // //   });
// // // // // // // // // // // // // // // // //   ctx.fillStyle = borderGradient;
// // // // // // // // // // // // // // // // //   ctx.fillRect(0, 0, width, 4);
  
// // // // // // // // // // // // // // // // //   // Title
// // // // // // // // // // // // // // // // //   ctx.save();
// // // // // // // // // // // // // // // // //   ctx.fillStyle = '#1a4053';
// // // // // // // // // // // // // // // // //   ctx.font = 'bold 24px Arial';
// // // // // // // // // // // // // // // // //   ctx.textAlign = 'center';
// // // // // // // // // // // // // // // // //   ctx.textBaseline = 'top';
// // // // // // // // // // // // // // // // //   ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
// // // // // // // // // // // // // // // // //   ctx.shadowBlur = 8;
// // // // // // // // // // // // // // // // //   ctx.fillText(`🔍 Find the word "${targetWord}" hidden in these scrambled words`, width / 2, 15);
// // // // // // // // // // // // // // // // //   ctx.shadowBlur = 0;
// // // // // // // // // // // // // // // // //   ctx.restore();
  
// // // // // // // // // // // // // // // // //   // Draw words in a grid
// // // // // // // // // // // // // // // // //   const wordsPerRow = 4;
// // // // // // // // // // // // // // // // //   const boxSize = 100;
// // // // // // // // // // // // // // // // //   const padding = 10;
// // // // // // // // // // // // // // // // //   const startX = (width - (wordsPerRow * (boxSize + padding) - padding)) / 2;
// // // // // // // // // // // // // // // // //   const startY = 60;
// // // // // // // // // // // // // // // // //   const boxHeight = 60;
  
// // // // // // // // // // // // // // // // //   // Color palette for words
// // // // // // // // // // // // // // // // //   const colorPalette = [
// // // // // // // // // // // // // // // // //     '#2C3E50', '#E74C3C', '#2980B9', '#27AE60', '#8E44AD', '#F39C12',
// // // // // // // // // // // // // // // // //     '#1ABC9C', '#D35400', '#3498DB', '#2ECC71', '#9B59B6', '#E67E22',
// // // // // // // // // // // // // // // // //     '#16A085', '#C0392B', '#2471A3', '#229954', '#7D3C98', '#D4AC0D',
// // // // // // // // // // // // // // // // //     '#138D75', '#B9770E', '#1A5276', '#1E8449', '#6C3483', '#A04000'
// // // // // // // // // // // // // // // // //   ];
  
// // // // // // // // // // // // // // // // //   // Draw each word in a box
// // // // // // // // // // // // // // // // //   for (let i = 0; i < words.length; i++) {
// // // // // // // // // // // // // // // // //     const row = Math.floor(i / wordsPerRow);
// // // // // // // // // // // // // // // // //     const col = i % wordsPerRow;
// // // // // // // // // // // // // // // // //     const x = startX + col * (boxSize + padding);
// // // // // // // // // // // // // // // // //     const y = startY + row * (boxHeight + padding);
    
// // // // // // // // // // // // // // // // //     // Box background
// // // // // // // // // // // // // // // // //     const color = wordColors ? getRandom(colorPalette) : '#ffffff';
// // // // // // // // // // // // // // // // //     ctx.fillStyle = color;
// // // // // // // // // // // // // // // // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.06)';
// // // // // // // // // // // // // // // // //     ctx.shadowBlur = 8;
// // // // // // // // // // // // // // // // //     ctx.shadowOffsetX = 0;
// // // // // // // // // // // // // // // // //     ctx.shadowOffsetY = 2;
// // // // // // // // // // // // // // // // //     ctx.beginPath();
// // // // // // // // // // // // // // // // //     ctx.roundRect(x, y, boxSize, boxHeight, 8);
// // // // // // // // // // // // // // // // //     ctx.fill();
// // // // // // // // // // // // // // // // //     ctx.shadowBlur = 0;
    
// // // // // // // // // // // // // // // // //     // Box border (subtle)
// // // // // // // // // // // // // // // // //     ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
// // // // // // // // // // // // // // // // //     ctx.lineWidth = 1;
// // // // // // // // // // // // // // // // //     ctx.beginPath();
// // // // // // // // // // // // // // // // //     ctx.roundRect(x, y, boxSize, boxHeight, 8);
// // // // // // // // // // // // // // // // //     ctx.stroke();
    
// // // // // // // // // // // // // // // // //     // Word text
// // // // // // // // // // // // // // // // //     const word = words[i];
// // // // // // // // // // // // // // // // //     ctx.fillStyle = '#1a1a1a';
// // // // // // // // // // // // // // // // //     ctx.font = 'bold 14px Arial';
// // // // // // // // // // // // // // // // //     ctx.textAlign = 'center';
// // // // // // // // // // // // // // // // //     ctx.textBaseline = 'middle';
    
// // // // // // // // // // // // // // // // //     // Truncate if too long
// // // // // // // // // // // // // // // // //     let displayWord = word;
// // // // // // // // // // // // // // // // //     if (word.length > 12) {
// // // // // // // // // // // // // // // // //       displayWord = word.substring(0, 10) + '...';
// // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // //     ctx.fillText(displayWord, x + boxSize / 2, y + boxHeight / 2);
    
// // // // // // // // // // // // // // // // //     // If word contains the target, add a small indicator (but don't reveal!)
// // // // // // // // // // // // // // // // //     // We'll let the user figure it out
// // // // // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // // // // //   // ---------------- WATERMARK ----------------
// // // // // // // // // // // // // // // // //   if (showWatermark) {
// // // // // // // // // // // // // // // // //     ctx.save();
// // // // // // // // // // // // // // // // //     ctx.globalAlpha = 0.12;
// // // // // // // // // // // // // // // // //     ctx.textAlign = "right";
// // // // // // // // // // // // // // // // //     ctx.textBaseline = "bottom";
    
// // // // // // // // // // // // // // // // //     ctx.font = "bold 13px Arial";
// // // // // // // // // // // // // // // // //     ctx.fillStyle = "#2C3E50";
// // // // // // // // // // // // // // // // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
// // // // // // // // // // // // // // // // //     ctx.shadowBlur = 2;
// // // // // // // // // // // // // // // // //     ctx.fillText(watermarkText, width - 15, height - 8);
    
// // // // // // // // // // // // // // // // //     ctx.restore();
// // // // // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // // // // //   // Add instruction at bottom
// // // // // // // // // // // // // // // // //   ctx.fillStyle = '#7f8c8d';
// // // // // // // // // // // // // // // // //   ctx.font = '14px Arial';
// // // // // // // // // // // // // // // // //   ctx.textAlign = 'center';
// // // // // // // // // // // // // // // // //   ctx.textBaseline = 'bottom';
// // // // // // // // // // // // // // // // //   ctx.globalAlpha = 0.6;
// // // // // // // // // // // // // // // // //   ctx.fillText(`How many of these scrambled words contain the word "${targetWord}"?`, width / 2, height - 10);
// // // // // // // // // // // // // // // // //   ctx.globalAlpha = 1.0;
  
// // // // // // // // // // // // // // // // //   // Generate options
// // // // // // // // // // // // // // // // //   const generatedOptions = generateSimilarOptions(answer);
  
// // // // // // // // // // // // // // // // //   // -----------------------------------
// // // // // // // // // // // // // // // // //   // Return
// // // // // // // // // // // // // // // // //   // -----------------------------------
  
// // // // // // // // // // // // // // // // //   return {
// // // // // // // // // // // // // // // // //     question: `How many of these scrambled words contain the word "${targetWord}"?`,
// // // // // // // // // // // // // // // // //     options: generatedOptions,
// // // // // // // // // // // // // // // // //     answer: answer,
// // // // // // // // // // // // // // // // //     targetWord: targetWord,
// // // // // // // // // // // // // // // // //     totalWords: words.length,
// // // // // // // // // // // // // // // // //     containCount: containCount,
// // // // // // // // // // // // // // // // //     words: words,
// // // // // // // // // // // // // // // // //     image: canvas.toDataURL().split(",")[1]
// // // // // // // // // // // // // // // // //   };
// // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // // // // Polyfill for roundRect if needed
// // // // // // // // // // // // // // // // // // -----------------------------------



















// // // // // // // // // // // // // // // // import { createCanvas } from "canvas";

// // // // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // // // Helpers
// // // // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // // // function shuffle(arr) {
// // // // // // // // // // // // // // // //   return arr.sort(() => Math.random() - 0.5);
// // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // function getRandom(arr) {
// // // // // // // // // // // // // // // //   return arr[Math.floor(Math.random() * arr.length)];
// // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // function rand(min, max) {
// // // // // // // // // // // // // // // //   return Math.floor(Math.random() * (max - min + 1)) + min;
// // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // // // Generate Random Letters
// // // // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // // // function generateRandomLetters(count) {
// // // // // // // // // // // // // // // //   const letters = 'abcdefghijklmnopqrstuvwxyz';
// // // // // // // // // // // // // // // //   let result = '';
// // // // // // // // // // // // // // // //   for (let i = 0; i < count; i++) {
// // // // // // // // // // // // // // // //     result += letters[Math.floor(Math.random() * letters.length)];
// // // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // //   return result;
// // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // // // Check if a word contains the target spelling
// // // // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // // // function containsSpelling(word, target) {
// // // // // // // // // // // // // // // //   let targetIndex = 0;
// // // // // // // // // // // // // // // //   for (let i = 0; i < word.length; i++) {
// // // // // // // // // // // // // // // //     if (word[i] === target[targetIndex]) {
// // // // // // // // // // // // // // // //       targetIndex++;
// // // // // // // // // // // // // // // //       if (targetIndex === target.length) {
// // // // // // // // // // // // // // // //         return true;
// // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // //   return false;
// // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // // // Generate Words with Hidden Spellings
// // // // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // // // function generateWordsWithSpelling(targetWord, totalWords = 20, minExtraLetters = 2, maxExtraLetters = 6) {
// // // // // // // // // // // // // // // //   const words = [];
// // // // // // // // // // // // // // // //   const targetLetters = targetWord.split('');
  
// // // // // // // // // // // // // // // //   // Determine how many words should contain the spelling (40-60%)
// // // // // // // // // // // // // // // //   const containCount = Math.floor(totalWords * (rand(40, 60) / 100));
// // // // // // // // // // // // // // // //   const notContainCount = totalWords - containCount;
  
// // // // // // // // // // // // // // // //   // Generate words that contain the spelling
// // // // // // // // // // // // // // // //   for (let i = 0; i < containCount; i++) {
// // // // // // // // // // // // // // // //     let word = '';
// // // // // // // // // // // // // // // //     const extraCount = rand(minExtraLetters, maxExtraLetters);
// // // // // // // // // // // // // // // //     const extraLetters = generateRandomLetters(extraCount);
    
// // // // // // // // // // // // // // // //     let targetCopy = targetLetters.slice();
// // // // // // // // // // // // // // // //     let extraCopy = extraLetters.split('');
    
// // // // // // // // // // // // // // // //     const combined = [];
// // // // // // // // // // // // // // // //     const totalLength = targetCopy.length + extraCopy.length;
// // // // // // // // // // // // // // // //     const targetIndices = [];
// // // // // // // // // // // // // // // //     while (targetIndices.length < targetCopy.length) {
// // // // // // // // // // // // // // // //       const idx = rand(0, totalLength - 1);
// // // // // // // // // // // // // // // //       if (!targetIndices.includes(idx)) {
// // // // // // // // // // // // // // // //         targetIndices.push(idx);
// // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // //     targetIndices.sort((a, b) => a - b);
    
// // // // // // // // // // // // // // // //     let targetIdx = 0;
// // // // // // // // // // // // // // // //     let extraIdx = 0;
// // // // // // // // // // // // // // // //     for (let pos = 0; pos < totalLength; pos++) {
// // // // // // // // // // // // // // // //       if (targetIndices.includes(pos) && targetIdx < targetCopy.length) {
// // // // // // // // // // // // // // // //         combined.push(targetCopy[targetIdx]);
// // // // // // // // // // // // // // // //         targetIdx++;
// // // // // // // // // // // // // // // //       } else if (extraIdx < extraCopy.length) {
// // // // // // // // // // // // // // // //         combined.push(extraCopy[extraIdx]);
// // // // // // // // // // // // // // // //         extraIdx++;
// // // // // // // // // // // // // // // //       } else {
// // // // // // // // // // // // // // // //         combined.push(getRandom('abcdefghijklmnopqrstuvwxyz'.split('')));
// // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // //     }
    
// // // // // // // // // // // // // // // //     let finalWord = combined.join('');
    
// // // // // // // // // // // // // // // //     if (!containsSpelling(finalWord, targetWord)) {
// // // // // // // // // // // // // // // //       finalWord = finalWord + targetWord;
// // // // // // // // // // // // // // // //     }
    
// // // // // // // // // // // // // // // //     words.push(finalWord);
// // // // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // // // //   // Generate words that do NOT contain the spelling
// // // // // // // // // // // // // // // //   for (let i = 0; i < notContainCount; i++) {
// // // // // // // // // // // // // // // //     let word = '';
// // // // // // // // // // // // // // // //     let attempts = 0;
// // // // // // // // // // // // // // // //     do {
// // // // // // // // // // // // // // // //       const length = rand(5, 12);
// // // // // // // // // // // // // // // //       word = generateRandomLetters(length);
// // // // // // // // // // // // // // // //       attempts++;
// // // // // // // // // // // // // // // //       if (attempts > 50) break;
// // // // // // // // // // // // // // // //     } while (containsSpelling(word, targetWord));
// // // // // // // // // // // // // // // //     words.push(word);
// // // // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // // // //   return shuffle(words);
// // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // // // Generate Similar Options
// // // // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // // // function generateSimilarOptions(correctAnswer) {
// // // // // // // // // // // // // // // //   const correctNum = parseInt(correctAnswer);
// // // // // // // // // // // // // // // //   const options = new Set();
// // // // // // // // // // // // // // // //   options.add(correctAnswer);
  
// // // // // // // // // // // // // // // //   const possibleDiffs = [-3, -2, -1, 1, 2, 3, -4, 4];
// // // // // // // // // // // // // // // //   const shuffledDiffs = shuffle([...possibleDiffs]);
  
// // // // // // // // // // // // // // // //   for (const diff of shuffledDiffs) {
// // // // // // // // // // // // // // // //     if (options.size >= 4) break;
// // // // // // // // // // // // // // // //     const candidate = correctNum + diff;
// // // // // // // // // // // // // // // //     if (candidate >= 0 && candidate <= 50) {
// // // // // // // // // // // // // // // //       const candidateStr = candidate.toString();
// // // // // // // // // // // // // // // //       if (!options.has(candidateStr)) {
// // // // // // // // // // // // // // // //         options.add(candidateStr);
// // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // // // //   const fallbackOptions = [];
// // // // // // // // // // // // // // // //   for (let i = 0; i <= 50; i++) {
// // // // // // // // // // // // // // // //     if (!options.has(i.toString())) {
// // // // // // // // // // // // // // // //       fallbackOptions.push(i.toString());
// // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // // // //   while (options.size < 4 && fallbackOptions.length > 0) {
// // // // // // // // // // // // // // // //     const randomFallback = getRandom(fallbackOptions);
// // // // // // // // // // // // // // // //     options.add(randomFallback);
// // // // // // // // // // // // // // // //     const index = fallbackOptions.indexOf(randomFallback);
// // // // // // // // // // // // // // // //     if (index > -1) {
// // // // // // // // // // // // // // // //       fallbackOptions.splice(index, 1);
// // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // // // //   return shuffle([...options]);
// // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // // // Main Function
// // // // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // // // export function generatePuzzle_word_search(options = {}) {
// // // // // // // // // // // // // // // //   const {
// // // // // // // // // // // // // // // //     targetWord = "apple",
// // // // // // // // // // // // // // // //     totalWords = 30,
// // // // // // // // // // // // // // // //     minExtraLetters = 2,
// // // // // // // // // // // // // // // //     maxExtraLetters = 6,
// // // // // // // // // // // // // // // //     width = 700,
// // // // // // // // // // // // // // // //     height = 500,
// // // // // // // // // // // // // // // //     showWatermark = true,
// // // // // // // // // // // // // // // //     watermarkText = "✦ Word Search ✦",
// // // // // // // // // // // // // // // //     wordColors = true
// // // // // // // // // // // // // // // //   } = options;
  
// // // // // // // // // // // // // // // //   // Generate words with hidden spellings
// // // // // // // // // // // // // // // //   const words = generateWordsWithSpelling(targetWord, totalWords, minExtraLetters, maxExtraLetters);
  
// // // // // // // // // // // // // // // //   // Count how many words contain the spelling
// // // // // // // // // // // // // // // //   const containCount = words.filter(word => containsSpelling(word, targetWord)).length;
// // // // // // // // // // // // // // // //   const answer = containCount.toString();
  
// // // // // // // // // // // // // // // //   // ---------------- CANVAS ----------------
// // // // // // // // // // // // // // // //   const canvas = createCanvas(width, height);
// // // // // // // // // // // // // // // //   const ctx = canvas.getContext("2d");
  
// // // // // // // // // // // // // // // //   // Background gradient
// // // // // // // // // // // // // // // //   const bgGradient = ctx.createLinearGradient(0, 0, width, height);
// // // // // // // // // // // // // // // //   bgGradient.addColorStop(0, '#f8f9fa');
// // // // // // // // // // // // // // // //   bgGradient.addColorStop(0.5, '#e9ecef');
// // // // // // // // // // // // // // // //   bgGradient.addColorStop(1, '#f8f9fa');
// // // // // // // // // // // // // // // //   ctx.fillStyle = bgGradient;
// // // // // // // // // // // // // // // //   ctx.fillRect(0, 0, width, height);
  
// // // // // // // // // // // // // // // //   // Decorative top border
// // // // // // // // // // // // // // // //   const borderColors = ['#FF6B6B', '#FF9F43', '#FECA57', '#48DBFB', '#A29BFE', '#FD79A8'];
// // // // // // // // // // // // // // // //   const borderGradient = ctx.createLinearGradient(0, 0, width, 0);
// // // // // // // // // // // // // // // //   borderColors.forEach((color, i) => {
// // // // // // // // // // // // // // // //     const stop = i / borderColors.length;
// // // // // // // // // // // // // // // //     borderGradient.addColorStop(stop, color);
// // // // // // // // // // // // // // // //   });
// // // // // // // // // // // // // // // //   ctx.fillStyle = borderGradient;
// // // // // // // // // // // // // // // //   ctx.fillRect(0, 0, width, 4);
  
// // // // // // // // // // // // // // // //   // Title
// // // // // // // // // // // // // // // //   ctx.save();
// // // // // // // // // // // // // // // //   ctx.fillStyle = '#1a4053';
// // // // // // // // // // // // // // // //   ctx.font = 'bold 22px Arial';
// // // // // // // // // // // // // // // //   ctx.textAlign = 'center';
// // // // // // // // // // // // // // // //   ctx.textBaseline = 'top';
// // // // // // // // // // // // // // // //   ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
// // // // // // // // // // // // // // // //   ctx.shadowBlur = 8;
// // // // // // // // // // // // // // // //   ctx.fillText(`🔍 Find "${targetWord}" hidden in these scrambled words`, width / 2, 15);
// // // // // // // // // // // // // // // //   ctx.shadowBlur = 0;
// // // // // // // // // // // // // // // //   ctx.restore();
  
// // // // // // // // // // // // // // // //   // Color palette for words
// // // // // // // // // // // // // // // //   const colorPalette = [
// // // // // // // // // // // // // // // //     '#2C3E50', '#E74C3C', '#2980B9', '#27AE60', '#8E44AD', '#F39C12',
// // // // // // // // // // // // // // // //     '#1ABC9C', '#D35400', '#3498DB', '#2ECC71', '#9B59B6', '#E67E22',
// // // // // // // // // // // // // // // //     '#16A085', '#C0392B', '#2471A3', '#229954', '#7D3C98', '#D4AC0D',
// // // // // // // // // // // // // // // //     '#138D75', '#B9770E', '#1A5276', '#1E8449', '#6C3483', '#A04000'
// // // // // // // // // // // // // // // //   ];
  
// // // // // // // // // // // // // // // //   // Spread words across the canvas with random positions
// // // // // // // // // // // // // // // //   const startY = 65;
// // // // // // // // // // // // // // // //   const fontSize = 18;
// // // // // // // // // // // // // // // //   const lineHeight = 32;
// // // // // // // // // // // // // // // //   const margin = 30;
  
// // // // // // // // // // // // // // // //   // Shuffle words and distribute them in a visually scattered way
// // // // // // // // // // // // // // // //   const shuffledWords = shuffle([...words]);
  
// // // // // // // // // // // // // // // //   // Create random positions for each word
// // // // // // // // // // // // // // // //   const wordPositions = [];
// // // // // // // // // // // // // // // //   const usedPositions = [];
  
// // // // // // // // // // // // // // // //   for (let i = 0; i < shuffledWords.length; i++) {
// // // // // // // // // // // // // // // //     const word = shuffledWords[i];
// // // // // // // // // // // // // // // //     ctx.font = `bold ${fontSize}px Arial`;
// // // // // // // // // // // // // // // //     const metrics = ctx.measureText(word);
// // // // // // // // // // // // // // // //     const wordWidth = metrics.width;
    
// // // // // // // // // // // // // // // //     let x, y, attempts = 0;
// // // // // // // // // // // // // // // //     let overlap = true;
    
// // // // // // // // // // // // // // // //     while (overlap && attempts < 50) {
// // // // // // // // // // // // // // // //       x = margin + Math.random() * (width - margin * 2 - wordWidth);
// // // // // // // // // // // // // // // //       y = startY + Math.random() * (height - startY - margin - 30);
      
// // // // // // // // // // // // // // // //       overlap = false;
// // // // // // // // // // // // // // // //       // Check if this position overlaps with existing words
// // // // // // // // // // // // // // // //       for (const pos of usedPositions) {
// // // // // // // // // // // // // // // //         const distance = Math.sqrt(
// // // // // // // // // // // // // // // //           Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2)
// // // // // // // // // // // // // // // //         );
// // // // // // // // // // // // // // // //         if (distance < 80) {
// // // // // // // // // // // // // // // //           overlap = true;
// // // // // // // // // // // // // // // //           break;
// // // // // // // // // // // // // // // //         }
// // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // //       attempts++;
// // // // // // // // // // // // // // // //     }
    
// // // // // // // // // // // // // // // //     usedPositions.push({ x, y, width: wordWidth });
// // // // // // // // // // // // // // // //     wordPositions.push({ word, x, y });
// // // // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // // // //   // Draw each word at its random position
// // // // // // // // // // // // // // // //   for (const { word, x, y } of wordPositions) {
// // // // // // // // // // // // // // // //     const color = wordColors ? getRandom(colorPalette) : '#2C3E50';
    
// // // // // // // // // // // // // // // //     ctx.save();
// // // // // // // // // // // // // // // //     ctx.fillStyle = color;
// // // // // // // // // // // // // // // //     ctx.font = `bold ${fontSize}px Arial`;
// // // // // // // // // // // // // // // //     ctx.textAlign = 'left';
// // // // // // // // // // // // // // // //     ctx.textBaseline = 'top';
    
// // // // // // // // // // // // // // // //     // Add subtle shadow for readability
// // // // // // // // // // // // // // // //     ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
// // // // // // // // // // // // // // // //     ctx.shadowBlur = 4;
// // // // // // // // // // // // // // // //     ctx.fillText(word, x - 1, y - 1);
    
// // // // // // // // // // // // // // // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.05)';
// // // // // // // // // // // // // // // //     ctx.shadowBlur = 2;
// // // // // // // // // // // // // // // //     ctx.fillText(word, x, y);
    
// // // // // // // // // // // // // // // //     ctx.restore();
// // // // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // // // //   // ---------------- WATERMARK ----------------
// // // // // // // // // // // // // // // //   if (showWatermark) {
// // // // // // // // // // // // // // // //     ctx.save();
// // // // // // // // // // // // // // // //     ctx.globalAlpha = 0.12;
// // // // // // // // // // // // // // // //     ctx.textAlign = "right";
// // // // // // // // // // // // // // // //     ctx.textBaseline = "bottom";
    
// // // // // // // // // // // // // // // //     ctx.font = "bold 13px Arial";
// // // // // // // // // // // // // // // //     ctx.fillStyle = "#2C3E50";
// // // // // // // // // // // // // // // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
// // // // // // // // // // // // // // // //     ctx.shadowBlur = 2;
// // // // // // // // // // // // // // // //     ctx.fillText(watermarkText, width - 15, height - 8);
    
// // // // // // // // // // // // // // // //     ctx.restore();
// // // // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // // // //   // Add instruction at bottom
// // // // // // // // // // // // // // // //   ctx.fillStyle = '#7f8c8d';
// // // // // // // // // // // // // // // //   ctx.font = '14px Arial';
// // // // // // // // // // // // // // // //   ctx.textAlign = 'center';
// // // // // // // // // // // // // // // //   ctx.textBaseline = 'bottom';
// // // // // // // // // // // // // // // //   ctx.globalAlpha = 0.6;
// // // // // // // // // // // // // // // //   ctx.fillText(`How many scrambled words contain the word "${targetWord}"?`, width / 2, height - 10);
// // // // // // // // // // // // // // // //   ctx.globalAlpha = 1.0;
  
// // // // // // // // // // // // // // // //   // Generate options
// // // // // // // // // // // // // // // //   const generatedOptions = generateSimilarOptions(answer);
  
// // // // // // // // // // // // // // // //   // -----------------------------------
// // // // // // // // // // // // // // // //   // Return
// // // // // // // // // // // // // // // //   // -----------------------------------
  
// // // // // // // // // // // // // // // //   return {
// // // // // // // // // // // // // // // //     question: `How many scrambled words contain the word "${targetWord}"?`,
// // // // // // // // // // // // // // // //     options: generatedOptions,
// // // // // // // // // // // // // // // //     answer: answer,
// // // // // // // // // // // // // // // //     targetWord: targetWord,
// // // // // // // // // // // // // // // //     totalWords: words.length,
// // // // // // // // // // // // // // // //     containCount: containCount,
// // // // // // // // // // // // // // // //     words: words,
// // // // // // // // // // // // // // // //     image: canvas.toDataURL().split(",")[1]
// // // // // // // // // // // // // // // //   };
// // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // // // Polyfill for roundRect if needed
// // // // // // // // // // // // // // // // // -----------------------------------


















// // // // // // // // // // // // // // // import { createCanvas } from "canvas";

// // // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // // Helpers
// // // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // // function shuffle(arr) {
// // // // // // // // // // // // // // //   return arr.sort(() => Math.random() - 0.5);
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // function getRandom(arr) {
// // // // // // // // // // // // // // //   return arr[Math.floor(Math.random() * arr.length)];
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // function rand(min, max) {
// // // // // // // // // // // // // // //   return Math.floor(Math.random() * (max - min + 1)) + min;
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // // Generate Random Letters
// // // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // // function generateRandomLetters(count) {
// // // // // // // // // // // // // // //   const letters = 'abcdefghijklmnopqrstuvwxyz';
// // // // // // // // // // // // // // //   let result = '';
// // // // // // // // // // // // // // //   for (let i = 0; i < count; i++) {
// // // // // // // // // // // // // // //     result += letters[Math.floor(Math.random() * letters.length)];
// // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // //   return result;
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // // Check if a word contains the target spelling
// // // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // // function containsSpelling(word, target) {
// // // // // // // // // // // // // // //   let targetIndex = 0;
// // // // // // // // // // // // // // //   for (let i = 0; i < word.length; i++) {
// // // // // // // // // // // // // // //     if (word[i] === target[targetIndex]) {
// // // // // // // // // // // // // // //       targetIndex++;
// // // // // // // // // // // // // // //       if (targetIndex === target.length) {
// // // // // // // // // // // // // // //         return true;
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // //   return false;
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // // Generate Words with Hidden Spellings
// // // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // // function generateWordsWithSpelling(targetWord, totalWords = 30, minExtraLetters = 2, maxExtraLetters = 6) {
// // // // // // // // // // // // // // //   const words = [];
// // // // // // // // // // // // // // //   const targetLetters = targetWord.split('');
  
// // // // // // // // // // // // // // //   // Determine how many words should contain the spelling (40-60%)
// // // // // // // // // // // // // // //   const containCount = Math.floor(totalWords * (rand(40, 60) / 100));
// // // // // // // // // // // // // // //   const notContainCount = totalWords - containCount;
  
// // // // // // // // // // // // // // //   // Generate words that contain the spelling
// // // // // // // // // // // // // // //   for (let i = 0; i < containCount; i++) {
// // // // // // // // // // // // // // //     let word = '';
// // // // // // // // // // // // // // //     const extraCount = rand(minExtraLetters, maxExtraLetters);
// // // // // // // // // // // // // // //     const extraLetters = generateRandomLetters(extraCount);
    
// // // // // // // // // // // // // // //     let targetCopy = targetLetters.slice();
// // // // // // // // // // // // // // //     let extraCopy = extraLetters.split('');
    
// // // // // // // // // // // // // // //     const combined = [];
// // // // // // // // // // // // // // //     const totalLength = targetCopy.length + extraCopy.length;
// // // // // // // // // // // // // // //     const targetIndices = [];
// // // // // // // // // // // // // // //     while (targetIndices.length < targetCopy.length) {
// // // // // // // // // // // // // // //       const idx = rand(0, totalLength - 1);
// // // // // // // // // // // // // // //       if (!targetIndices.includes(idx)) {
// // // // // // // // // // // // // // //         targetIndices.push(idx);
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //     targetIndices.sort((a, b) => a - b);
    
// // // // // // // // // // // // // // //     let targetIdx = 0;
// // // // // // // // // // // // // // //     let extraIdx = 0;
// // // // // // // // // // // // // // //     for (let pos = 0; pos < totalLength; pos++) {
// // // // // // // // // // // // // // //       if (targetIndices.includes(pos) && targetIdx < targetCopy.length) {
// // // // // // // // // // // // // // //         combined.push(targetCopy[targetIdx]);
// // // // // // // // // // // // // // //         targetIdx++;
// // // // // // // // // // // // // // //       } else if (extraIdx < extraCopy.length) {
// // // // // // // // // // // // // // //         combined.push(extraCopy[extraIdx]);
// // // // // // // // // // // // // // //         extraIdx++;
// // // // // // // // // // // // // // //       } else {
// // // // // // // // // // // // // // //         combined.push(getRandom('abcdefghijklmnopqrstuvwxyz'.split('')));
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     }
    
// // // // // // // // // // // // // // //     let finalWord = combined.join('');
    
// // // // // // // // // // // // // // //     if (!containsSpelling(finalWord, targetWord)) {
// // // // // // // // // // // // // // //       finalWord = finalWord + targetWord;
// // // // // // // // // // // // // // //     }
    
// // // // // // // // // // // // // // //     words.push(finalWord);
// // // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // // //   // Generate words that do NOT contain the spelling
// // // // // // // // // // // // // // //   for (let i = 0; i < notContainCount; i++) {
// // // // // // // // // // // // // // //     let word = '';
// // // // // // // // // // // // // // //     let attempts = 0;
// // // // // // // // // // // // // // //     do {
// // // // // // // // // // // // // // //       const length = rand(5, 12);
// // // // // // // // // // // // // // //       word = generateRandomLetters(length);
// // // // // // // // // // // // // // //       attempts++;
// // // // // // // // // // // // // // //       if (attempts > 50) break;
// // // // // // // // // // // // // // //     } while (containsSpelling(word, targetWord));
// // // // // // // // // // // // // // //     words.push(word);
// // // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // // //   return shuffle(words);
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // // Generate Similar Options
// // // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // // function generateSimilarOptions(correctAnswer) {
// // // // // // // // // // // // // // //   const correctNum = parseInt(correctAnswer);
// // // // // // // // // // // // // // //   const options = new Set();
// // // // // // // // // // // // // // //   options.add(correctAnswer);
  
// // // // // // // // // // // // // // //   const possibleDiffs = [-3, -2, -1, 1, 2, 3, -4, 4];
// // // // // // // // // // // // // // //   const shuffledDiffs = shuffle([...possibleDiffs]);
  
// // // // // // // // // // // // // // //   for (const diff of shuffledDiffs) {
// // // // // // // // // // // // // // //     if (options.size >= 4) break;
// // // // // // // // // // // // // // //     const candidate = correctNum + diff;
// // // // // // // // // // // // // // //     if (candidate >= 0 && candidate <= 50) {
// // // // // // // // // // // // // // //       const candidateStr = candidate.toString();
// // // // // // // // // // // // // // //       if (!options.has(candidateStr)) {
// // // // // // // // // // // // // // //         options.add(candidateStr);
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // // //   const fallbackOptions = [];
// // // // // // // // // // // // // // //   for (let i = 0; i <= 50; i++) {
// // // // // // // // // // // // // // //     if (!options.has(i.toString())) {
// // // // // // // // // // // // // // //       fallbackOptions.push(i.toString());
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // // //   while (options.size < 4 && fallbackOptions.length > 0) {
// // // // // // // // // // // // // // //     const randomFallback = getRandom(fallbackOptions);
// // // // // // // // // // // // // // //     options.add(randomFallback);
// // // // // // // // // // // // // // //     const index = fallbackOptions.indexOf(randomFallback);
// // // // // // // // // // // // // // //     if (index > -1) {
// // // // // // // // // // // // // // //       fallbackOptions.splice(index, 1);
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // // //   return shuffle([...options]);
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // // Main Function
// // // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // // export function generatePuzzle_word_search(options = {}) {
// // // // // // // // // // // // // // //   const {
// // // // // // // // // // // // // // //     targetWord = "apple",
// // // // // // // // // // // // // // //     totalWords = 30,
// // // // // // // // // // // // // // //     minExtraLetters = 2,
// // // // // // // // // // // // // // //     maxExtraLetters = 6,
// // // // // // // // // // // // // // //     width = 700,
// // // // // // // // // // // // // // //     height = 500,
// // // // // // // // // // // // // // //     showWatermark = true,
// // // // // // // // // // // // // // //     watermarkText = "Powered by AVI",
// // // // // // // // // // // // // // //     wordColors = true
// // // // // // // // // // // // // // //   } = options;
  
// // // // // // // // // // // // // // //   // Generate words with hidden spellings
// // // // // // // // // // // // // // //   const words = generateWordsWithSpelling(targetWord, totalWords, minExtraLetters, maxExtraLetters);
  
// // // // // // // // // // // // // // //   // Count how many words contain the spelling
// // // // // // // // // // // // // // //   const containCount = words.filter(word => containsSpelling(word, targetWord)).length;
// // // // // // // // // // // // // // //   const answer = containCount.toString();
  
// // // // // // // // // // // // // // //   // ---------------- CANVAS ----------------
// // // // // // // // // // // // // // //   const canvas = createCanvas(width, height);
// // // // // // // // // // // // // // //   const ctx = canvas.getContext("2d");
  
// // // // // // // // // // // // // // //   // Background gradient
// // // // // // // // // // // // // // //   const bgGradient = ctx.createLinearGradient(0, 0, width, height);
// // // // // // // // // // // // // // //   bgGradient.addColorStop(0, '#f8f9fa');
// // // // // // // // // // // // // // //   bgGradient.addColorStop(0.5, '#e9ecef');
// // // // // // // // // // // // // // //   bgGradient.addColorStop(1, '#f8f9fa');
// // // // // // // // // // // // // // //   ctx.fillStyle = bgGradient;
// // // // // // // // // // // // // // //   ctx.fillRect(0, 0, width, height);
  
// // // // // // // // // // // // // // //   // Decorative top border
// // // // // // // // // // // // // // //   const borderColors = ['#FF6B6B', '#FF9F43', '#FECA57', '#48DBFB', '#A29BFE', '#FD79A8'];
// // // // // // // // // // // // // // //   const borderGradient = ctx.createLinearGradient(0, 0, width, 0);
// // // // // // // // // // // // // // //   borderColors.forEach((color, i) => {
// // // // // // // // // // // // // // //     const stop = i / borderColors.length;
// // // // // // // // // // // // // // //     borderGradient.addColorStop(stop, color);
// // // // // // // // // // // // // // //   });
// // // // // // // // // // // // // // //   ctx.fillStyle = borderGradient;
// // // // // // // // // // // // // // //   ctx.fillRect(0, 0, width, 4);
  
// // // // // // // // // // // // // // //   // Title
// // // // // // // // // // // // // // // //   ctx.save();
// // // // // // // // // // // // // // // //   ctx.fillStyle = '#1a4053';
// // // // // // // // // // // // // // // //   ctx.font = 'bold 22px Arial';
// // // // // // // // // // // // // // // //   ctx.textAlign = 'center';
// // // // // // // // // // // // // // // //   ctx.textBaseline = 'top';
// // // // // // // // // // // // // // // //   ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
// // // // // // // // // // // // // // // //   ctx.shadowBlur = 8;
// // // // // // // // // // // // // // // //   ctx.fillText(`🔍 Find "${targetWord}" hidden in these scrambled words`, width / 2, 15);
// // // // // // // // // // // // // // // //   ctx.shadowBlur = 0;
// // // // // // // // // // // // // // // //   ctx.restore();
  
// // // // // // // // // // // // // // //   // Color palette for words
// // // // // // // // // // // // // // //   const colorPalette = [
// // // // // // // // // // // // // // //     '#2C3E50', '#E74C3C', '#2980B9', '#27AE60', '#8E44AD', '#F39C12',
// // // // // // // // // // // // // // //     '#1ABC9C', '#D35400', '#3498DB', '#2ECC71', '#9B59B6', '#E67E22',
// // // // // // // // // // // // // // //     '#16A085', '#C0392B', '#2471A3', '#229954', '#7D3C98', '#D4AC0D',
// // // // // // // // // // // // // // //     '#138D75', '#B9770E', '#1A5276', '#1E8449', '#6C3483', '#A04000'
// // // // // // // // // // // // // // //   ];
  
// // // // // // // // // // // // // // //   // Spread words randomly across the image
// // // // // // // // // // // // // // //   const startY = 60;
// // // // // // // // // // // // // // //   const fontSize = 18;
// // // // // // // // // // // // // // //   const margin = 25;
  
// // // // // // // // // // // // // // //   // Create random positions for each word
// // // // // // // // // // // // // // //   const wordPositions = [];
// // // // // // // // // // // // // // //   const usedPositions = [];
  
// // // // // // // // // // // // // // //   for (let i = 0; i < words.length; i++) {
// // // // // // // // // // // // // // //     const word = words[i];
// // // // // // // // // // // // // // //     ctx.font = `bold ${fontSize}px Arial`;
// // // // // // // // // // // // // // //     const metrics = ctx.measureText(word);
// // // // // // // // // // // // // // //     const wordWidth = metrics.width;
    
// // // // // // // // // // // // // // //     let x, y, attempts = 0;
// // // // // // // // // // // // // // //     let overlap = true;
    
// // // // // // // // // // // // // // //     while (overlap && attempts < 100) {
// // // // // // // // // // // // // // //       x = margin + Math.random() * (width - margin * 2 - wordWidth);
// // // // // // // // // // // // // // //       y = startY + Math.random() * (height - startY - margin - 20);
      
// // // // // // // // // // // // // // //       overlap = false;
// // // // // // // // // // // // // // //       // Check if this position overlaps with existing words
// // // // // // // // // // // // // // //       for (const pos of usedPositions) {
// // // // // // // // // // // // // // //         const distance = Math.sqrt(
// // // // // // // // // // // // // // //           Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2)
// // // // // // // // // // // // // // //         );
// // // // // // // // // // // // // // //         if (distance < 70) {
// // // // // // // // // // // // // // //           overlap = true;
// // // // // // // // // // // // // // //           break;
// // // // // // // // // // // // // // //         }
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //       attempts++;
// // // // // // // // // // // // // // //     }
    
// // // // // // // // // // // // // // //     usedPositions.push({ x, y, width: wordWidth });
// // // // // // // // // // // // // // //     wordPositions.push({ word, x, y });
// // // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // // //   // Draw each word at its random position
// // // // // // // // // // // // // // //   for (const { word, x, y } of wordPositions) {
// // // // // // // // // // // // // // //     const color = wordColors ? getRandom(colorPalette) : '#2C3E50';
    
// // // // // // // // // // // // // // //     ctx.save();
    
// // // // // // // // // // // // // // //     // Add white outline/shadow for readability
// // // // // // // // // // // // // // //     ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
// // // // // // // // // // // // // // //     ctx.shadowBlur = 6;
// // // // // // // // // // // // // // //     ctx.fillStyle = color;
// // // // // // // // // // // // // // //     ctx.font = `bold ${fontSize}px Arial`;
// // // // // // // // // // // // // // //     ctx.textAlign = 'left';
// // // // // // // // // // // // // // //     ctx.textBaseline = 'top';
// // // // // // // // // // // // // // //     ctx.fillText(word, x, y);
    
// // // // // // // // // // // // // // //     // Draw the actual text
// // // // // // // // // // // // // // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.05)';
// // // // // // // // // // // // // // //     ctx.shadowBlur = 2;
// // // // // // // // // // // // // // //     ctx.fillText(word, x, y);
    
// // // // // // // // // // // // // // //     ctx.restore();
// // // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // // //   // ---------------- WATERMARK ----------------
// // // // // // // // // // // // // // //   if (showWatermark) {
// // // // // // // // // // // // // // //     ctx.save();
// // // // // // // // // // // // // // //     ctx.globalAlpha = 0.6;
// // // // // // // // // // // // // // //     ctx.textAlign = "right";
// // // // // // // // // // // // // // //     ctx.textBaseline = "bottom";
    
// // // // // // // // // // // // // // //     ctx.font = "bold 16px Arial";
// // // // // // // // // // // // // // //     ctx.fillStyle = "#2C3E50";
// // // // // // // // // // // // // // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
// // // // // // // // // // // // // // //     ctx.shadowBlur = 2;
// // // // // // // // // // // // // // //     ctx.fillText(watermarkText, width - 15, height - 8);
    
// // // // // // // // // // // // // // //     ctx.restore();
// // // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // // //   // Add instruction at bottom
// // // // // // // // // // // // // // // //   ctx.fillStyle = '#7f8c8d';
// // // // // // // // // // // // // // // //   ctx.font = '14px Arial';
// // // // // // // // // // // // // // // //   ctx.textAlign = 'center';
// // // // // // // // // // // // // // // //   ctx.textBaseline = 'bottom';
// // // // // // // // // // // // // // // //   ctx.globalAlpha = 0.6;
// // // // // // // // // // // // // // // //   ctx.fillText(`How many scrambled words contain the word "${targetWord}"?`, width / 2, height - 10);
// // // // // // // // // // // // // // // //   ctx.globalAlpha = 1.0;
  
// // // // // // // // // // // // // // //   // Generate options
// // // // // // // // // // // // // // //   const generatedOptions = generateSimilarOptions(answer);
  
// // // // // // // // // // // // // // //   // -----------------------------------
// // // // // // // // // // // // // // //   // Return
// // // // // // // // // // // // // // //   // -----------------------------------
  
// // // // // // // // // // // // // // //   return {
// // // // // // // // // // // // // // //     question: `How many scrambled words contain the word "${targetWord}"?`,
// // // // // // // // // // // // // // //     options: generatedOptions,
// // // // // // // // // // // // // // //     answer: answer,
// // // // // // // // // // // // // // //     targetWord: targetWord,
// // // // // // // // // // // // // // //     totalWords: words.length,
// // // // // // // // // // // // // // //     containCount: containCount,
// // // // // // // // // // // // // // //     words: words,
// // // // // // // // // // // // // // //     image: canvas.toDataURL().split(",")[1]
// // // // // // // // // // // // // // //   };
// // // // // // // // // // // // // // // }















// // // // // // // // // // // // // // // import { createCanvas } from "canvas";

// // // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // // Helpers
// // // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // // function shuffle(arr) {
// // // // // // // // // // // // // // //   return arr.sort(() => Math.random() - 0.5);
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // function getRandom(arr) {
// // // // // // // // // // // // // // //   return arr[Math.floor(Math.random() * arr.length)];
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // function rand(min, max) {
// // // // // // // // // // // // // // //   return Math.floor(Math.random() * (max - min + 1)) + min;
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // // Generate Random Letters
// // // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // // function generateRandomLetters(count) {
// // // // // // // // // // // // // // //   const letters = 'abcdefghijklmnopqrstuvwxyz';
// // // // // // // // // // // // // // //   let result = '';
// // // // // // // // // // // // // // //   for (let i = 0; i < count; i++) {
// // // // // // // // // // // // // // //     result += letters[Math.floor(Math.random() * letters.length)];
// // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // //   return result;
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // // Check if a word contains the target spelling
// // // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // // function containsSpelling(word, target) {
// // // // // // // // // // // // // // //   let targetIndex = 0;
// // // // // // // // // // // // // // //   for (let i = 0; i < word.length; i++) {
// // // // // // // // // // // // // // //     if (word[i] === target[targetIndex]) {
// // // // // // // // // // // // // // //       targetIndex++;
// // // // // // // // // // // // // // //       if (targetIndex === target.length) {
// // // // // // // // // // // // // // //         return true;
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // //   return false;
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // // Generate Words with Hidden Spellings
// // // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // // function generateWordsWithSpelling(targetWord, totalWords = 30, minExtraLetters = 2, maxExtraLetters = 6) {
// // // // // // // // // // // // // // //   const words = [];
// // // // // // // // // // // // // // //   const targetLetters = targetWord.split('');
  
// // // // // // // // // // // // // // //   // Determine how many words should contain the spelling (40-60%)
// // // // // // // // // // // // // // //   const containCount = Math.floor(totalWords * (rand(40, 60) / 100));
// // // // // // // // // // // // // // //   const notContainCount = totalWords - containCount;
  
// // // // // // // // // // // // // // //   // Generate words that contain the spelling
// // // // // // // // // // // // // // //   for (let i = 0; i < containCount; i++) {
// // // // // // // // // // // // // // //     let word = '';
// // // // // // // // // // // // // // //     const extraCount = rand(minExtraLetters, maxExtraLetters);
// // // // // // // // // // // // // // //     const extraLetters = generateRandomLetters(extraCount);
    
// // // // // // // // // // // // // // //     let targetCopy = targetLetters.slice();
// // // // // // // // // // // // // // //     let extraCopy = extraLetters.split('');
    
// // // // // // // // // // // // // // //     const combined = [];
// // // // // // // // // // // // // // //     const totalLength = targetCopy.length + extraCopy.length;
// // // // // // // // // // // // // // //     const targetIndices = [];
// // // // // // // // // // // // // // //     while (targetIndices.length < targetCopy.length) {
// // // // // // // // // // // // // // //       const idx = rand(0, totalLength - 1);
// // // // // // // // // // // // // // //       if (!targetIndices.includes(idx)) {
// // // // // // // // // // // // // // //         targetIndices.push(idx);
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //     targetIndices.sort((a, b) => a - b);
    
// // // // // // // // // // // // // // //     let targetIdx = 0;
// // // // // // // // // // // // // // //     let extraIdx = 0;
// // // // // // // // // // // // // // //     for (let pos = 0; pos < totalLength; pos++) {
// // // // // // // // // // // // // // //       if (targetIndices.includes(pos) && targetIdx < targetCopy.length) {
// // // // // // // // // // // // // // //         combined.push(targetCopy[targetIdx]);
// // // // // // // // // // // // // // //         targetIdx++;
// // // // // // // // // // // // // // //       } else if (extraIdx < extraCopy.length) {
// // // // // // // // // // // // // // //         combined.push(extraCopy[extraIdx]);
// // // // // // // // // // // // // // //         extraIdx++;
// // // // // // // // // // // // // // //       } else {
// // // // // // // // // // // // // // //         combined.push(getRandom('abcdefghijklmnopqrstuvwxyz'.split('')));
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     }
    
// // // // // // // // // // // // // // //     let finalWord = combined.join('');
    
// // // // // // // // // // // // // // //     if (!containsSpelling(finalWord, targetWord)) {
// // // // // // // // // // // // // // //       finalWord = finalWord + targetWord;
// // // // // // // // // // // // // // //     }
    
// // // // // // // // // // // // // // //     words.push(finalWord);
// // // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // // //   // Generate words that do NOT contain the spelling
// // // // // // // // // // // // // // //   for (let i = 0; i < notContainCount; i++) {
// // // // // // // // // // // // // // //     let word = '';
// // // // // // // // // // // // // // //     let attempts = 0;
// // // // // // // // // // // // // // //     do {
// // // // // // // // // // // // // // //       const length = rand(5, 12);
// // // // // // // // // // // // // // //       word = generateRandomLetters(length);
// // // // // // // // // // // // // // //       attempts++;
// // // // // // // // // // // // // // //       if (attempts > 50) break;
// // // // // // // // // // // // // // //     } while (containsSpelling(word, targetWord));
// // // // // // // // // // // // // // //     words.push(word);
// // // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // // //   return shuffle(words);
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // // Generate Similar Options
// // // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // // function generateSimilarOptions(correctAnswer) {
// // // // // // // // // // // // // // //   const correctNum = parseInt(correctAnswer);
// // // // // // // // // // // // // // //   const options = new Set();
// // // // // // // // // // // // // // //   options.add(correctAnswer);
  
// // // // // // // // // // // // // // //   const possibleDiffs = [-3, -2, -1, 1, 2, 3, -4, 4];
// // // // // // // // // // // // // // //   const shuffledDiffs = shuffle([...possibleDiffs]);
  
// // // // // // // // // // // // // // //   for (const diff of shuffledDiffs) {
// // // // // // // // // // // // // // //     if (options.size >= 4) break;
// // // // // // // // // // // // // // //     const candidate = correctNum + diff;
// // // // // // // // // // // // // // //     if (candidate >= 0 && candidate <= 50) {
// // // // // // // // // // // // // // //       const candidateStr = candidate.toString();
// // // // // // // // // // // // // // //       if (!options.has(candidateStr)) {
// // // // // // // // // // // // // // //         options.add(candidateStr);
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // // //   const fallbackOptions = [];
// // // // // // // // // // // // // // //   for (let i = 0; i <= 50; i++) {
// // // // // // // // // // // // // // //     if (!options.has(i.toString())) {
// // // // // // // // // // // // // // //       fallbackOptions.push(i.toString());
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // // //   while (options.size < 4 && fallbackOptions.length > 0) {
// // // // // // // // // // // // // // //     const randomFallback = getRandom(fallbackOptions);
// // // // // // // // // // // // // // //     options.add(randomFallback);
// // // // // // // // // // // // // // //     const index = fallbackOptions.indexOf(randomFallback);
// // // // // // // // // // // // // // //     if (index > -1) {
// // // // // // // // // // // // // // //       fallbackOptions.splice(index, 1);
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // // //   return shuffle([...options]);
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // // Get Random Target Word
// // // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // // function getRandomTargetWord() {
// // // // // // // // // // // // // // //   const wordList = [
// // // // // // // // // // // // // // //     "apple", "banana", "cherry", "dragon", "eagle", "forest", "garden", "harbor", 
// // // // // // // // // // // // // // //     "island", "jungle", "knight", "lion", "mountain", "night", "ocean", "penguin", 
// // // // // // // // // // // // // // //     "queen", "river", "storm", "tiger", "umbrella", "valley", "whale", "xenon", 
// // // // // // // // // // // // // // //     "yacht", "zebra", "crystal", "diamond", "ember", "flame", "glacier", "horizon", 
// // // // // // // // // // // // // // //     "ivory", "jade", "kiwi", "lavender", "moon", "nebula", "opal", "pearl", 
// // // // // // // // // // // // // // //     "quartz", "rainbow", "sapphire", "twilight", "uranium", "vortex", "willow", 
// // // // // // // // // // // // // // //     "xylem", "yew", "zenith", "blossom", "cascade", "drift", "echo", "frost", 
// // // // // // // // // // // // // // //     "glimmer", "haze", "illusion", "jubilee", "kaleidoscope", "labyrinth", "mirage", 
// // // // // // // // // // // // // // //     "nostalgia", "oasis", "paradox", "quasar", "reverie", "serenity", "tempest", 
// // // // // // // // // // // // // // //     "utopia", "vivid", "whisper", "xenial", "yearning", "zephyr", "astronaut", 
// // // // // // // // // // // // // // //     "breeze", "cosmos", "dream", "eclipse", "feather", "galaxy", "harmony", 
// // // // // // // // // // // // // // //     "illuminate", "journey", "kindle", "lunar", "mystic", "nova", "orbit", "pulse", 
// // // // // // // // // // // // // // //     "radiant", "solstice", "tranquil", "unique", "velocity", "wander", "yonder"
// // // // // // // // // // // // // // //   ];
  
// // // // // // // // // // // // // // //   return getRandom(wordList);
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // // Main Function
// // // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // // export function generatePuzzle_word_search(options = {}) {
// // // // // // // // // // // // // // //   // Get random target word if not provided
// // // // // // // // // // // // // // //   const targetWord = options.targetWord || getRandomTargetWord();
  
// // // // // // // // // // // // // // //   const {
// // // // // // // // // // // // // // //     totalWords = 10,
// // // // // // // // // // // // // // //     minExtraLetters = 2,
// // // // // // // // // // // // // // //     maxExtraLetters = 6,
// // // // // // // // // // // // // // //     width = 400,
// // // // // // // // // // // // // // //     height = 250,
// // // // // // // // // // // // // // //     showWatermark = true,
// // // // // // // // // // // // // // //     watermarkText = "Powered by AVI",
// // // // // // // // // // // // // // //     wordColors = true
// // // // // // // // // // // // // // //   } = options;
  
// // // // // // // // // // // // // // //   // Generate words with hidden spellings
// // // // // // // // // // // // // // //   const words = generateWordsWithSpelling(targetWord, totalWords, minExtraLetters, maxExtraLetters);
  
// // // // // // // // // // // // // // //   // Count how many words contain the spelling
// // // // // // // // // // // // // // //   const containCount = words.filter(word => containsSpelling(word, targetWord)).length;
// // // // // // // // // // // // // // //   const answer = containCount.toString();
  
// // // // // // // // // // // // // // //   // ---------------- CANVAS ----------------
// // // // // // // // // // // // // // //   const canvas = createCanvas(width, height);
// // // // // // // // // // // // // // //   const ctx = canvas.getContext("2d");
  
// // // // // // // // // // // // // // //   // Background gradient
// // // // // // // // // // // // // // //   const bgGradient = ctx.createLinearGradient(0, 0, width, height);
// // // // // // // // // // // // // // //   bgGradient.addColorStop(0, '#f8f9fa');
// // // // // // // // // // // // // // //   bgGradient.addColorStop(0.5, '#e9ecef');
// // // // // // // // // // // // // // //   bgGradient.addColorStop(1, '#f8f9fa');
// // // // // // // // // // // // // // //   ctx.fillStyle = bgGradient;
// // // // // // // // // // // // // // //   ctx.fillRect(0, 0, width, height);
  
// // // // // // // // // // // // // // //   // Decorative top border
// // // // // // // // // // // // // // //   const borderColors = ['#FF6B6B', '#FF9F43', '#FECA57', '#48DBFB', '#A29BFE', '#FD79A8'];
// // // // // // // // // // // // // // //   const borderGradient = ctx.createLinearGradient(0, 0, width, 0);
// // // // // // // // // // // // // // //   borderColors.forEach((color, i) => {
// // // // // // // // // // // // // // //     const stop = i / borderColors.length;
// // // // // // // // // // // // // // //     borderGradient.addColorStop(stop, color);
// // // // // // // // // // // // // // //   });
// // // // // // // // // // // // // // //   ctx.fillStyle = borderGradient;
// // // // // // // // // // // // // // //   ctx.fillRect(0, 0, width, 4);
  
// // // // // // // // // // // // // // // //   // Title
// // // // // // // // // // // // // // // //   ctx.save();
// // // // // // // // // // // // // // // //   ctx.fillStyle = '#1a4053';
// // // // // // // // // // // // // // // //   ctx.font = 'bold 22px Arial';
// // // // // // // // // // // // // // // //   ctx.textAlign = 'center';
// // // // // // // // // // // // // // // //   ctx.textBaseline = 'top';
// // // // // // // // // // // // // // // //   ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
// // // // // // // // // // // // // // // //   ctx.shadowBlur = 8;
// // // // // // // // // // // // // // // //   ctx.fillText(`🔍 Find "${targetWord}" hidden in these scrambled words`, width / 2, 15);
// // // // // // // // // // // // // // // //   ctx.shadowBlur = 0;
// // // // // // // // // // // // // // // //   ctx.restore();
  
// // // // // // // // // // // // // // //   // Color palette for words
// // // // // // // // // // // // // // //   const colorPalette = [
// // // // // // // // // // // // // // //     '#2C3E50', '#E74C3C', '#2980B9', '#27AE60', '#8E44AD', '#F39C12',
// // // // // // // // // // // // // // //     '#1ABC9C', '#D35400', '#3498DB', '#2ECC71', '#9B59B6', '#E67E22',
// // // // // // // // // // // // // // //     '#16A085', '#C0392B', '#2471A3', '#229954', '#7D3C98', '#D4AC0D',
// // // // // // // // // // // // // // //     '#138D75', '#B9770E', '#1A5276', '#1E8449', '#6C3483', '#A04000'
// // // // // // // // // // // // // // //   ];
  
// // // // // // // // // // // // // // //   // Spread words randomly across the image
// // // // // // // // // // // // // // //   const startY = 60;
// // // // // // // // // // // // // // //   const fontSize = 12;
// // // // // // // // // // // // // // //   const margin = 15;
  
// // // // // // // // // // // // // // //   // Create random positions for each word
// // // // // // // // // // // // // // //   const wordPositions = [];
// // // // // // // // // // // // // // //   const usedPositions = [];
  
// // // // // // // // // // // // // // //   for (let i = 0; i < words.length; i++) {
// // // // // // // // // // // // // // //     const word = words[i];
// // // // // // // // // // // // // // //     ctx.font = `bold ${fontSize}px Arial`;
// // // // // // // // // // // // // // //     const metrics = ctx.measureText(word);
// // // // // // // // // // // // // // //     const wordWidth = metrics.width;
    
// // // // // // // // // // // // // // //     let x, y, attempts = 0;
// // // // // // // // // // // // // // //     let overlap = true;
    
// // // // // // // // // // // // // // //     while (overlap && attempts < 100) {
// // // // // // // // // // // // // // //       x = margin + Math.random() * (width - margin * 2 - wordWidth);
// // // // // // // // // // // // // // //       y = startY + Math.random() * (height - startY - margin - 20);
      
// // // // // // // // // // // // // // //       overlap = false;
// // // // // // // // // // // // // // //       // Check if this position overlaps with existing words
// // // // // // // // // // // // // // //       for (const pos of usedPositions) {
// // // // // // // // // // // // // // //         const distance = Math.sqrt(
// // // // // // // // // // // // // // //           Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2)
// // // // // // // // // // // // // // //         );
// // // // // // // // // // // // // // //         if (distance < 70) {
// // // // // // // // // // // // // // //           overlap = true;
// // // // // // // // // // // // // // //           break;
// // // // // // // // // // // // // // //         }
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //       attempts++;
// // // // // // // // // // // // // // //     }
    
// // // // // // // // // // // // // // //     usedPositions.push({ x, y, width: wordWidth });
// // // // // // // // // // // // // // //     wordPositions.push({ word, x, y });
// // // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // // //   // Draw each word at its random position
// // // // // // // // // // // // // // //   for (const { word, x, y } of wordPositions) {
// // // // // // // // // // // // // // //     const color = wordColors ? getRandom(colorPalette) : '#2C3E50';
    
// // // // // // // // // // // // // // //     ctx.save();
    
// // // // // // // // // // // // // // //     // Add white outline/shadow for readability
// // // // // // // // // // // // // // //     ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
// // // // // // // // // // // // // // //     ctx.shadowBlur = 6;
// // // // // // // // // // // // // // //     ctx.fillStyle = color;
// // // // // // // // // // // // // // //     ctx.font = `bold ${fontSize}px Arial`;
// // // // // // // // // // // // // // //     ctx.textAlign = 'left';
// // // // // // // // // // // // // // //     ctx.textBaseline = 'top';
// // // // // // // // // // // // // // //     ctx.fillText(word, x, y);
    
// // // // // // // // // // // // // // //     // Draw the actual text
// // // // // // // // // // // // // // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.05)';
// // // // // // // // // // // // // // //     ctx.shadowBlur = 2;
// // // // // // // // // // // // // // //     ctx.fillText(word, x, y);
    
// // // // // // // // // // // // // // //     ctx.restore();
// // // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // // //   // ---------------- WATERMARK ----------------
// // // // // // // // // // // // // // //   if (showWatermark) {
// // // // // // // // // // // // // // //     ctx.save();
// // // // // // // // // // // // // // //     ctx.globalAlpha = 0.6;
// // // // // // // // // // // // // // //     ctx.textAlign = "right";
// // // // // // // // // // // // // // //     ctx.textBaseline = "bottom";
    
// // // // // // // // // // // // // // //     ctx.font = "bold 16px Arial";
// // // // // // // // // // // // // // //     ctx.fillStyle = "#2C3E50";
// // // // // // // // // // // // // // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
// // // // // // // // // // // // // // //     ctx.shadowBlur = 2;
// // // // // // // // // // // // // // //     ctx.fillText(watermarkText, width - 15, height - 8);
    
// // // // // // // // // // // // // // //     ctx.restore();
// // // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // // // //   // Add instruction at bottom
// // // // // // // // // // // // // // // //   ctx.fillStyle = '#7f8c8d';
// // // // // // // // // // // // // // // //   ctx.font = '14px Arial';
// // // // // // // // // // // // // // // //   ctx.textAlign = 'center';
// // // // // // // // // // // // // // // //   ctx.textBaseline = 'bottom';
// // // // // // // // // // // // // // // //   ctx.globalAlpha = 0.6;
// // // // // // // // // // // // // // // //   ctx.fillText(`How many scrambled words contain the word "${targetWord}"?`, width / 2, height - 10);
// // // // // // // // // // // // // // // //   ctx.globalAlpha = 1.0;
  
// // // // // // // // // // // // // // //   // Generate options
// // // // // // // // // // // // // // //   const generatedOptions = generateSimilarOptions(answer);
  
// // // // // // // // // // // // // // //   // -----------------------------------
// // // // // // // // // // // // // // //   // Return
// // // // // // // // // // // // // // //   // -----------------------------------
  
// // // // // // // // // // // // // // //   return {
// // // // // // // // // // // // // // //     question: `How many scrambled words contain the word "${targetWord}"?`,
// // // // // // // // // // // // // // //     options: generatedOptions,
// // // // // // // // // // // // // // //     answer: answer,
// // // // // // // // // // // // // // //     targetWord: targetWord,
// // // // // // // // // // // // // // //     totalWords: words.length,
// // // // // // // // // // // // // // //     containCount: containCount,
// // // // // // // // // // // // // // //     words: words,
// // // // // // // // // // // // // // //     image: canvas.toDataURL().split(",")[1]
// // // // // // // // // // // // // // //   };
// // // // // // // // // // // // // // // }







// // // // // // // // // // // // // // // import { createCanvas } from "canvas";

// // // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // // Helpers
// // // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // // function shuffle(arr) {
// // // // // // // // // // // // // // //   return arr.sort(() => Math.random() - 0.5);
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // function getRandom(arr) {
// // // // // // // // // // // // // // //   return arr[Math.floor(Math.random() * arr.length)];
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // function rand(min, max) {
// // // // // // // // // // // // // // //   return Math.floor(Math.random() * (max - min + 1)) + min;
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // // Generate Random Letters
// // // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // // function generateRandomLetters(count) {
// // // // // // // // // // // // // // //   const letters = 'abcdefghijklmnopqrstuvwxyz';
// // // // // // // // // // // // // // //   let result = '';
// // // // // // // // // // // // // // //   for (let i = 0; i < count; i++) {
// // // // // // // // // // // // // // //     result += letters[Math.floor(Math.random() * letters.length)];
// // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // //   return result;
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // // Check if a word contains the target spelling
// // // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // // function containsSpelling(word, target) {
// // // // // // // // // // // // // // //   let targetIndex = 0;
// // // // // // // // // // // // // // //   for (let i = 0; i < word.length; i++) {
// // // // // // // // // // // // // // //     if (word[i] === target[targetIndex]) {
// // // // // // // // // // // // // // //       targetIndex++;
// // // // // // // // // // // // // // //       if (targetIndex === target.length) {
// // // // // // // // // // // // // // //         return true;
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // //   return false;
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // // Generate Words with Hidden Spellings
// // // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // // function generateWordsWithSpelling(targetWord, totalWords = 30, minExtraLetters = 2, maxExtraLetters = 6) {
// // // // // // // // // // // // // // //   const words = [];
// // // // // // // // // // // // // // //   const targetLetters = targetWord.split('');
  
// // // // // // // // // // // // // // //   // Determine how many words should contain the spelling (40-60%)
// // // // // // // // // // // // // // //   const containCount = Math.floor(totalWords * (rand(40, 60) / 100));
// // // // // // // // // // // // // // //   const notContainCount = totalWords - containCount;
  
// // // // // // // // // // // // // // //   // Generate words that contain the spelling
// // // // // // // // // // // // // // //   for (let i = 0; i < containCount; i++) {
// // // // // // // // // // // // // // //     let word = '';
// // // // // // // // // // // // // // //     const extraCount = rand(minExtraLetters, maxExtraLetters);
// // // // // // // // // // // // // // //     const extraLetters = generateRandomLetters(extraCount);
    
// // // // // // // // // // // // // // //     let targetCopy = targetLetters.slice();
// // // // // // // // // // // // // // //     let extraCopy = extraLetters.split('');
    
// // // // // // // // // // // // // // //     const combined = [];
// // // // // // // // // // // // // // //     const totalLength = targetCopy.length + extraCopy.length;
// // // // // // // // // // // // // // //     const targetIndices = [];
// // // // // // // // // // // // // // //     while (targetIndices.length < targetCopy.length) {
// // // // // // // // // // // // // // //       const idx = rand(0, totalLength - 1);
// // // // // // // // // // // // // // //       if (!targetIndices.includes(idx)) {
// // // // // // // // // // // // // // //         targetIndices.push(idx);
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //     targetIndices.sort((a, b) => a - b);
    
// // // // // // // // // // // // // // //     let targetIdx = 0;
// // // // // // // // // // // // // // //     let extraIdx = 0;
// // // // // // // // // // // // // // //     for (let pos = 0; pos < totalLength; pos++) {
// // // // // // // // // // // // // // //       if (targetIndices.includes(pos) && targetIdx < targetCopy.length) {
// // // // // // // // // // // // // // //         combined.push(targetCopy[targetIdx]);
// // // // // // // // // // // // // // //         targetIdx++;
// // // // // // // // // // // // // // //       } else if (extraIdx < extraCopy.length) {
// // // // // // // // // // // // // // //         combined.push(extraCopy[extraIdx]);
// // // // // // // // // // // // // // //         extraIdx++;
// // // // // // // // // // // // // // //       } else {
// // // // // // // // // // // // // // //         combined.push(getRandom('abcdefghijklmnopqrstuvwxyz'.split('')));
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     }
    
// // // // // // // // // // // // // // //     let finalWord = combined.join('');
    
// // // // // // // // // // // // // // //     if (!containsSpelling(finalWord, targetWord)) {
// // // // // // // // // // // // // // //       finalWord = finalWord + targetWord;
// // // // // // // // // // // // // // //     }
    
// // // // // // // // // // // // // // //     words.push(finalWord);
// // // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // // //   // Generate words that do NOT contain the spelling
// // // // // // // // // // // // // // //   for (let i = 0; i < notContainCount; i++) {
// // // // // // // // // // // // // // //     let word = '';
// // // // // // // // // // // // // // //     let attempts = 0;
// // // // // // // // // // // // // // //     do {
// // // // // // // // // // // // // // //       const length = rand(5, 12);
// // // // // // // // // // // // // // //       word = generateRandomLetters(length);
// // // // // // // // // // // // // // //       attempts++;
// // // // // // // // // // // // // // //       if (attempts > 50) break;
// // // // // // // // // // // // // // //     } while (containsSpelling(word, targetWord));
// // // // // // // // // // // // // // //     words.push(word);
// // // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // // //   return shuffle(words);
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // // Generate Similar Options
// // // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // // function generateSimilarOptions(correctAnswer) {
// // // // // // // // // // // // // // //   const correctNum = parseInt(correctAnswer);
// // // // // // // // // // // // // // //   const options = new Set();
// // // // // // // // // // // // // // //   options.add(correctAnswer);
  
// // // // // // // // // // // // // // //   const possibleDiffs = [-3, -2, -1, 1, 2, 3, -4, 4];
// // // // // // // // // // // // // // //   const shuffledDiffs = shuffle([...possibleDiffs]);
  
// // // // // // // // // // // // // // //   for (const diff of shuffledDiffs) {
// // // // // // // // // // // // // // //     if (options.size >= 4) break;
// // // // // // // // // // // // // // //     const candidate = correctNum + diff;
// // // // // // // // // // // // // // //     if (candidate >= 0 && candidate <= 50) {
// // // // // // // // // // // // // // //       const candidateStr = candidate.toString();
// // // // // // // // // // // // // // //       if (!options.has(candidateStr)) {
// // // // // // // // // // // // // // //         options.add(candidateStr);
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // // //   const fallbackOptions = [];
// // // // // // // // // // // // // // //   for (let i = 0; i <= 50; i++) {
// // // // // // // // // // // // // // //     if (!options.has(i.toString())) {
// // // // // // // // // // // // // // //       fallbackOptions.push(i.toString());
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // // //   while (options.size < 4 && fallbackOptions.length > 0) {
// // // // // // // // // // // // // // //     const randomFallback = getRandom(fallbackOptions);
// // // // // // // // // // // // // // //     options.add(randomFallback);
// // // // // // // // // // // // // // //     const index = fallbackOptions.indexOf(randomFallback);
// // // // // // // // // // // // // // //     if (index > -1) {
// // // // // // // // // // // // // // //       fallbackOptions.splice(index, 1);
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // // //   return shuffle([...options]);
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // // Get Random Target Word
// // // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // // function getRandomTargetWord() {
// // // // // // // // // // // // // // //   const wordList = [
// // // // // // // // // // // // // // //     "apple", "banana", "cherry", "dragon", "eagle", "forest", "garden", "harbor", 
// // // // // // // // // // // // // // //     "island", "jungle", "knight", "lion", "mountain", "night", "ocean", "penguin", 
// // // // // // // // // // // // // // //     "queen", "river", "storm", "tiger", "umbrella", "valley", "whale", "xenon", 
// // // // // // // // // // // // // // //     "yacht", "zebra", "crystal", "diamond", "ember", "flame", "glacier", "horizon", 
// // // // // // // // // // // // // // //     "ivory", "jade", "kiwi", "lavender", "moon", "nebula", "opal", "pearl", 
// // // // // // // // // // // // // // //     "quartz", "rainbow", "sapphire", "twilight", "uranium", "vortex", "willow", 
// // // // // // // // // // // // // // //     "xylem", "yew", "zenith", "blossom", "cascade", "drift", "echo", "frost", 
// // // // // // // // // // // // // // //     "glimmer", "haze", "illusion", "jubilee", "kaleidoscope", "labyrinth", "mirage", 
// // // // // // // // // // // // // // //     "nostalgia", "oasis", "paradox", "quasar", "reverie", "serenity", "tempest", 
// // // // // // // // // // // // // // //     "utopia", "vivid", "whisper", "xenial", "yearning", "zephyr", "astronaut", 
// // // // // // // // // // // // // // //     "breeze", "cosmos", "dream", "eclipse", "feather", "galaxy", "harmony", 
// // // // // // // // // // // // // // //     "illuminate", "journey", "kindle", "lunar", "mystic", "nova", "orbit", "pulse", 
// // // // // // // // // // // // // // //     "radiant", "solstice", "tranquil", "unique", "velocity", "wander", "yonder"
// // // // // // // // // // // // // // //   ];
  
// // // // // // // // // // // // // // //   return getRandom(wordList);
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // // Main Function
// // // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // // export function generatePuzzle_word_search(options = {}) {
// // // // // // // // // // // // // // //   // Get random target word if not provided
// // // // // // // // // // // // // // //   const targetWord = options.targetWord || getRandomTargetWord();
  
// // // // // // // // // // // // // // //   const {
// // // // // // // // // // // // // // //     totalWords = 10,
// // // // // // // // // // // // // // //     minExtraLetters = 2,
// // // // // // // // // // // // // // //     maxExtraLetters = 6,
// // // // // // // // // // // // // // //     width = 400,
// // // // // // // // // // // // // // //     height = 250,
// // // // // // // // // // // // // // //     showWatermark = true,
// // // // // // // // // // // // // // //     watermarkText = "Powered by AVI",
// // // // // // // // // // // // // // //     wordColors = true
// // // // // // // // // // // // // // //   } = options;
  
// // // // // // // // // // // // // // //   // Generate words with hidden spellings
// // // // // // // // // // // // // // //   const words = generateWordsWithSpelling(targetWord, totalWords, minExtraLetters, maxExtraLetters);
  
// // // // // // // // // // // // // // //   // Count how many words contain the spelling
// // // // // // // // // // // // // // //   const containCount = words.filter(word => containsSpelling(word, targetWord)).length;
// // // // // // // // // // // // // // //   const answer = containCount.toString();
  
// // // // // // // // // // // // // // //   // ---------------- CANVAS ----------------
// // // // // // // // // // // // // // //   const canvas = createCanvas(width, height);
// // // // // // // // // // // // // // //   const ctx = canvas.getContext("2d");
  
// // // // // // // // // // // // // // //   // Background gradient
// // // // // // // // // // // // // // //   const bgGradient = ctx.createLinearGradient(0, 0, width, height);
// // // // // // // // // // // // // // //   bgGradient.addColorStop(0, '#f8f9fa');
// // // // // // // // // // // // // // //   bgGradient.addColorStop(0.5, '#e9ecef');
// // // // // // // // // // // // // // //   bgGradient.addColorStop(1, '#f8f9fa');
// // // // // // // // // // // // // // //   ctx.fillStyle = bgGradient;
// // // // // // // // // // // // // // //   ctx.fillRect(0, 0, width, height);
  
// // // // // // // // // // // // // // //   // Decorative top border
// // // // // // // // // // // // // // //   const borderColors = ['#FF6B6B', '#FF9F43', '#FECA57', '#48DBFB', '#A29BFE', '#FD79A8'];
// // // // // // // // // // // // // // //   const borderGradient = ctx.createLinearGradient(0, 0, width, 0);
// // // // // // // // // // // // // // //   borderColors.forEach((color, i) => {
// // // // // // // // // // // // // // //     const stop = i / borderColors.length;
// // // // // // // // // // // // // // //     borderGradient.addColorStop(stop, color);
// // // // // // // // // // // // // // //   });
// // // // // // // // // // // // // // // //   ctx.fillStyle = borderGradient;
// // // // // // // // // // // // // // // //   ctx.fillRect(0, 0, width, 4);
  
// // // // // // // // // // // // // // //   // Title
// // // // // // // // // // // // // // // //   ctx.save();
// // // // // // // // // // // // // // // //   ctx.fillStyle = '#1a4053';
// // // // // // // // // // // // // // // //   ctx.font = 'bold 22px Arial';
// // // // // // // // // // // // // // // //   ctx.textAlign = 'center';
// // // // // // // // // // // // // // // //   ctx.textBaseline = 'top';
// // // // // // // // // // // // // // // //   ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
// // // // // // // // // // // // // // // //   ctx.shadowBlur = 8;
// // // // // // // // // // // // // // // //   ctx.fillText(`🔍 Find "${targetWord}" hidden in these scrambled words`, width / 2, 15);
// // // // // // // // // // // // // // // //   ctx.shadowBlur = 0;
// // // // // // // // // // // // // // // //   ctx.restore();
  
// // // // // // // // // // // // // // //   // Color palette for words
// // // // // // // // // // // // // // //   const colorPalette = [
// // // // // // // // // // // // // // //     '#2C3E50', '#E74C3C', '#2980B9', '#27AE60', '#8E44AD', '#F39C12',
// // // // // // // // // // // // // // //     '#1ABC9C', '#D35400', '#3498DB', '#2ECC71', '#9B59B6', '#E67E22',
// // // // // // // // // // // // // // //     '#16A085', '#C0392B', '#2471A3', '#229954', '#7D3C98', '#D4AC0D',
// // // // // // // // // // // // // // //     '#138D75', '#B9770E', '#1A5276', '#1E8449', '#6C3483', '#A04000'
// // // // // // // // // // // // // // //   ];
  
// // // // // // // // // // // // // // //   // Spread words randomly across the image - FIXED OVERLAPPING
// // // // // // // // // // // // // // //   const startY = 60;
// // // // // // // // // // // // // // //   const fontSize = 14;
// // // // // // // // // // // // // // //   const margin = 15;
// // // // // // // // // // // // // // //   const minDistance = 45; // Increased minimum distance between words
  
// // // // // // // // // // // // // // //   // Create random positions for each word
// // // // // // // // // // // // // // //   const wordPositions = [];
// // // // // // // // // // // // // // //   const usedPositions = [];
  
// // // // // // // // // // // // // // //   for (let i = 0; i < words.length; i++) {
// // // // // // // // // // // // // // //     const word = words[i];
// // // // // // // // // // // // // // //     ctx.font = `bold ${fontSize}px Arial`;
// // // // // // // // // // // // // // //     const metrics = ctx.measureText(word);
// // // // // // // // // // // // // // //     const wordWidth = metrics.width;
    
// // // // // // // // // // // // // // //     let x, y, attempts = 0;
// // // // // // // // // // // // // // //     let overlap = true;
// // // // // // // // // // // // // // //     const maxAttempts = 200; // Increased attempts for better placement
    
// // // // // // // // // // // // // // //     while (overlap && attempts < maxAttempts) {
// // // // // // // // // // // // // // //       x = margin + Math.random() * (width - margin * 2 - wordWidth);
// // // // // // // // // // // // // // //       y = startY + Math.random() * (height - startY - margin - 20);
      
// // // // // // // // // // // // // // //       overlap = false;
// // // // // // // // // // // // // // //       // Check if this position overlaps with existing words
// // // // // // // // // // // // // // //       for (const pos of usedPositions) {
// // // // // // // // // // // // // // //         const distance = Math.sqrt(
// // // // // // // // // // // // // // //           Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2)
// // // // // // // // // // // // // // //         );
// // // // // // // // // // // // // // //         // Check if words are too close to each other
// // // // // // // // // // // // // // //         if (distance < minDistance) {
// // // // // // // // // // // // // // //           overlap = true;
// // // // // // // // // // // // // // //           break;
// // // // // // // // // // // // // // //         }
// // // // // // // // // // // // // // //         // Check if words are overlapping horizontally
// // // // // // // // // // // // // // //         const horizontalOverlap = (x < pos.x + pos.width + 5) && (x + wordWidth + 5 > pos.x);
// // // // // // // // // // // // // // //         const verticalOverlap = Math.abs(y - pos.y) < 20;
// // // // // // // // // // // // // // //         if (horizontalOverlap && verticalOverlap) {
// // // // // // // // // // // // // // //           overlap = true;
// // // // // // // // // // // // // // //           break;
// // // // // // // // // // // // // // //         }
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //       attempts++;
// // // // // // // // // // // // // // //     }
    
// // // // // // // // // // // // // // //     usedPositions.push({ x, y, width: wordWidth });
// // // // // // // // // // // // // // //     wordPositions.push({ word, x, y });
// // // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // // //   // Draw each word at its random position
// // // // // // // // // // // // // // //   for (const { word, x, y } of wordPositions) {
// // // // // // // // // // // // // // //     const color = wordColors ? getRandom(colorPalette) : '#2C3E50';
    
// // // // // // // // // // // // // // //     ctx.save();
    
// // // // // // // // // // // // // // //     // Add white outline/shadow for readability
// // // // // // // // // // // // // // //     ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
// // // // // // // // // // // // // // //     ctx.shadowBlur = 6;
// // // // // // // // // // // // // // //     ctx.fillStyle = color;
// // // // // // // // // // // // // // //     ctx.font = `bold ${fontSize}px Arial`;
// // // // // // // // // // // // // // //     ctx.textAlign = 'left';
// // // // // // // // // // // // // // //     ctx.textBaseline = 'top';
// // // // // // // // // // // // // // //     ctx.fillText(word, x, y);
    
// // // // // // // // // // // // // // //     // Draw the actual text
// // // // // // // // // // // // // // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.05)';
// // // // // // // // // // // // // // //     ctx.shadowBlur = 2;
// // // // // // // // // // // // // // //     ctx.fillText(word, x, y);
    
// // // // // // // // // // // // // // //     ctx.restore();
// // // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // // //   // ---------------- WATERMARK ----------------
// // // // // // // // // // // // // // //   if (showWatermark) {
// // // // // // // // // // // // // // //     ctx.save();
// // // // // // // // // // // // // // //     ctx.globalAlpha = 0.6;
// // // // // // // // // // // // // // //     ctx.textAlign = "right";
// // // // // // // // // // // // // // //     ctx.textBaseline = "bottom";
    
// // // // // // // // // // // // // // //     ctx.font = "bold 14px Arial";
// // // // // // // // // // // // // // //     ctx.fillStyle = "#2C3E50";
// // // // // // // // // // // // // // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
// // // // // // // // // // // // // // //     ctx.shadowBlur = 2;
// // // // // // // // // // // // // // //     ctx.fillText(watermarkText, width - 15, height - 8);
    
// // // // // // // // // // // // // // //     ctx.restore();
// // // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // // //   // Add instruction at bottom
// // // // // // // // // // // // // // // //   ctx.fillStyle = '#7f8c8d';
// // // // // // // // // // // // // // // //   ctx.font = '14px Arial';
// // // // // // // // // // // // // // // //   ctx.textAlign = 'center';
// // // // // // // // // // // // // // // //   ctx.textBaseline = 'bottom';
// // // // // // // // // // // // // // // //   ctx.globalAlpha = 0.6;
// // // // // // // // // // // // // // // //   ctx.fillText(`How many scrambled words contain the word "${targetWord}"?`, width / 2, height - 10);
// // // // // // // // // // // // // // // //   ctx.globalAlpha = 1.0;
  
// // // // // // // // // // // // // // //   // Generate options
// // // // // // // // // // // // // // //   const generatedOptions = generateSimilarOptions(answer);
  
// // // // // // // // // // // // // // //   // -----------------------------------
// // // // // // // // // // // // // // //   // Return
// // // // // // // // // // // // // // //   // -----------------------------------
  
// // // // // // // // // // // // // // //   return {
// // // // // // // // // // // // // // //     question: `How many scrambled words contain the word "${targetWord}"?`,
// // // // // // // // // // // // // // //     options: generatedOptions,
// // // // // // // // // // // // // // //     answer: answer,
// // // // // // // // // // // // // // //     targetWord: targetWord,
// // // // // // // // // // // // // // //     totalWords: words.length,
// // // // // // // // // // // // // // //     containCount: containCount,
// // // // // // // // // // // // // // //     words: words,
// // // // // // // // // // // // // // //     image: canvas.toDataURL().split(",")[1]
// // // // // // // // // // // // // // //   };
// // // // // // // // // // // // // // // }












// // // // // // // // // // // // // // import { createCanvas } from "canvas";

// // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // Helpers
// // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // function shuffle(arr) {
// // // // // // // // // // // // // //   return arr.sort(() => Math.random() - 0.5);
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // function getRandom(arr) {
// // // // // // // // // // // // // //   return arr[Math.floor(Math.random() * arr.length)];
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // function rand(min, max) {
// // // // // // // // // // // // // //   return Math.floor(Math.random() * (max - min + 1)) + min;
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // Generate Random Letters
// // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // function generateRandomLetters(count) {
// // // // // // // // // // // // // //   const letters = 'abcdefghijklmnopqrstuvwxyz';
// // // // // // // // // // // // // //   let result = '';
// // // // // // // // // // // // // //   for (let i = 0; i < count; i++) {
// // // // // // // // // // // // // //     result += letters[Math.floor(Math.random() * letters.length)];
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // //   return result;
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // Check if a word contains the target spelling
// // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // function containsSpelling(word, target) {
// // // // // // // // // // // // // //   let targetIndex = 0;
// // // // // // // // // // // // // //   for (let i = 0; i < word.length; i++) {
// // // // // // // // // // // // // //     if (word[i] === target[targetIndex]) {
// // // // // // // // // // // // // //       targetIndex++;
// // // // // // // // // // // // // //       if (targetIndex === target.length) {
// // // // // // // // // // // // // //         return true;
// // // // // // // // // // // // // //       }
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // //   return false;
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // Generate a word similar to target by removing one letter
// // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // function generateSimilarWord(targetWord) {
// // // // // // // // // // // // // //   const letters = targetWord.split('');
// // // // // // // // // // // // // //   const removeIndex = rand(0, letters.length - 1);
// // // // // // // // // // // // // //   const newLetters = letters.filter((_, i) => i !== removeIndex);
  
// // // // // // // // // // // // // //   // Shuffle the remaining letters to make it look scrambled
// // // // // // // // // // // // // //   const shuffled = shuffle(newLetters);
  
// // // // // // // // // // // // // //   // Add 1-3 random extra letters to make it more confusing
// // // // // // // // // // // // // //   const extraCount = rand(1, 3);
// // // // // // // // // // // // // //   const extraLetters = generateRandomLetters(extraCount).split('');
  
// // // // // // // // // // // // // //   const combined = shuffle([...shuffled, ...extraLetters]);
  
// // // // // // // // // // // // // //   return combined.join('');
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // Generate Words with Hidden Spellings
// // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // function generateWordsWithSpelling(targetWord, totalWords = 30, minExtraLetters = 2, maxExtraLetters = 6) {
// // // // // // // // // // // // // //   const words = [];
// // // // // // // // // // // // // //   const targetLetters = targetWord.split('');
  
// // // // // // // // // // // // // //   // Determine how many words should contain the spelling (40-60%)
// // // // // // // // // // // // // //   const containCount = Math.floor(totalWords * (rand(40, 60) / 100));
// // // // // // // // // // // // // //   const notContainCount = totalWords - containCount;
  
// // // // // // // // // // // // // //   // Generate words that contain the spelling
// // // // // // // // // // // // // //   for (let i = 0; i < containCount; i++) {
// // // // // // // // // // // // // //     let word = '';
// // // // // // // // // // // // // //     const extraCount = rand(minExtraLetters, maxExtraLetters);
// // // // // // // // // // // // // //     const extraLetters = generateRandomLetters(extraCount);
    
// // // // // // // // // // // // // //     let targetCopy = targetLetters.slice();
// // // // // // // // // // // // // //     let extraCopy = extraLetters.split('');
    
// // // // // // // // // // // // // //     const combined = [];
// // // // // // // // // // // // // //     const totalLength = targetCopy.length + extraCopy.length;
// // // // // // // // // // // // // //     const targetIndices = [];
// // // // // // // // // // // // // //     while (targetIndices.length < targetCopy.length) {
// // // // // // // // // // // // // //       const idx = rand(0, totalLength - 1);
// // // // // // // // // // // // // //       if (!targetIndices.includes(idx)) {
// // // // // // // // // // // // // //         targetIndices.push(idx);
// // // // // // // // // // // // // //       }
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //     targetIndices.sort((a, b) => a - b);
    
// // // // // // // // // // // // // //     let targetIdx = 0;
// // // // // // // // // // // // // //     let extraIdx = 0;
// // // // // // // // // // // // // //     for (let pos = 0; pos < totalLength; pos++) {
// // // // // // // // // // // // // //       if (targetIndices.includes(pos) && targetIdx < targetCopy.length) {
// // // // // // // // // // // // // //         combined.push(targetCopy[targetIdx]);
// // // // // // // // // // // // // //         targetIdx++;
// // // // // // // // // // // // // //       } else if (extraIdx < extraCopy.length) {
// // // // // // // // // // // // // //         combined.push(extraCopy[extraIdx]);
// // // // // // // // // // // // // //         extraIdx++;
// // // // // // // // // // // // // //       } else {
// // // // // // // // // // // // // //         combined.push(getRandom('abcdefghijklmnopqrstuvwxyz'.split('')));
// // // // // // // // // // // // // //       }
// // // // // // // // // // // // // //     }
    
// // // // // // // // // // // // // //     let finalWord = combined.join('');
    
// // // // // // // // // // // // // //     if (!containsSpelling(finalWord, targetWord)) {
// // // // // // // // // // // // // //       finalWord = finalWord + targetWord;
// // // // // // // // // // // // // //     }
    
// // // // // // // // // // // // // //     words.push(finalWord);
// // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // //   // Generate words that do NOT contain the spelling - make them similar to target
// // // // // // // // // // // // // //   for (let i = 0; i < notContainCount; i++) {
// // // // // // // // // // // // // //     let word = '';
// // // // // // // // // // // // // //     let attempts = 0;
// // // // // // // // // // // // // //     do {
// // // // // // // // // // // // // //       // Generate a word similar to the target (missing one letter)
// // // // // // // // // // // // // //       word = generateSimilarWord(targetWord);
// // // // // // // // // // // // // //       attempts++;
// // // // // // // // // // // // // //       if (attempts > 50) break;
// // // // // // // // // // // // // //     } while (containsSpelling(word, targetWord) || word.length < 3);
// // // // // // // // // // // // // //     words.push(word);
// // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // //   return shuffle(words);
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // Generate Similar Options
// // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // function generateSimilarOptions(correctAnswer) {
// // // // // // // // // // // // // //   const correctNum = parseInt(correctAnswer);
// // // // // // // // // // // // // //   const options = new Set();
// // // // // // // // // // // // // //   options.add(correctAnswer);
  
// // // // // // // // // // // // // //   const possibleDiffs = [-3, -2, -1, 1, 2, 3, -4, 4];
// // // // // // // // // // // // // //   const shuffledDiffs = shuffle([...possibleDiffs]);
  
// // // // // // // // // // // // // //   for (const diff of shuffledDiffs) {
// // // // // // // // // // // // // //     if (options.size >= 4) break;
// // // // // // // // // // // // // //     const candidate = correctNum + diff;
// // // // // // // // // // // // // //     if (candidate >= 0 && candidate <= 50) {
// // // // // // // // // // // // // //       const candidateStr = candidate.toString();
// // // // // // // // // // // // // //       if (!options.has(candidateStr)) {
// // // // // // // // // // // // // //         options.add(candidateStr);
// // // // // // // // // // // // // //       }
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // //   const fallbackOptions = [];
// // // // // // // // // // // // // //   for (let i = 0; i <= 50; i++) {
// // // // // // // // // // // // // //     if (!options.has(i.toString())) {
// // // // // // // // // // // // // //       fallbackOptions.push(i.toString());
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // //   while (options.size < 4 && fallbackOptions.length > 0) {
// // // // // // // // // // // // // //     const randomFallback = getRandom(fallbackOptions);
// // // // // // // // // // // // // //     options.add(randomFallback);
// // // // // // // // // // // // // //     const index = fallbackOptions.indexOf(randomFallback);
// // // // // // // // // // // // // //     if (index > -1) {
// // // // // // // // // // // // // //       fallbackOptions.splice(index, 1);
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // //   return shuffle([...options]);
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // Get Random Target Word
// // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // function getRandomTargetWord() {
// // // // // // // // // // // // // //   const wordList = [
// // // // // // // // // // // // // //     "apple", "banana", "cherry", "dragon", "eagle", "forest", "garden", "harbor", 
// // // // // // // // // // // // // //     "island", "jungle", "knight", "lion", "mountain", "night", "ocean", "penguin", 
// // // // // // // // // // // // // //     "queen", "river", "storm", "tiger", "umbrella", "valley", "whale", "xenon", 
// // // // // // // // // // // // // //     "yacht", "zebra", "crystal", "diamond", "ember", "flame", "glacier", "horizon", 
// // // // // // // // // // // // // //     "ivory", "jade", "kiwi", "lavender", "moon", "nebula", "opal", "pearl", 
// // // // // // // // // // // // // //     "quartz", "rainbow", "sapphire", "twilight", "uranium", "vortex", "willow", 
// // // // // // // // // // // // // //     "xylem", "yew", "zenith", "blossom", "cascade", "drift", "echo", "frost", 
// // // // // // // // // // // // // //     "glimmer", "haze", "illusion", "jubilee", "kaleidoscope", "labyrinth", "mirage", 
// // // // // // // // // // // // // //     "nostalgia", "oasis", "paradox", "quasar", "reverie", "serenity", "tempest", 
// // // // // // // // // // // // // //     "utopia", "vivid", "whisper", "xenial", "yearning", "zephyr", "astronaut", 
// // // // // // // // // // // // // //     "breeze", "cosmos", "dream", "eclipse", "feather", "galaxy", "harmony", 
// // // // // // // // // // // // // //     "illuminate", "journey", "kindle", "lunar", "mystic", "nova", "orbit", "pulse", 
// // // // // // // // // // // // // //     "radiant", "solstice", "tranquil", "unique", "velocity", "wander", "yonder"
// // // // // // // // // // // // // //   ];
  
// // // // // // // // // // // // // //   return getRandom(wordList);
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // Main Function
// // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // export function generatePuzzle_word_search(options = {}) {
// // // // // // // // // // // // // //   // Get random target word if not provided
// // // // // // // // // // // // // //   const targetWord = options.targetWord || getRandomTargetWord();
  
// // // // // // // // // // // // // //   const {
// // // // // // // // // // // // // //     totalWords = 30,
// // // // // // // // // // // // // //     minExtraLetters = 2,
// // // // // // // // // // // // // //     maxExtraLetters = 6,
// // // // // // // // // // // // // //     width = 700,
// // // // // // // // // // // // // //     height = 500,
// // // // // // // // // // // // // //     showWatermark = true,
// // // // // // // // // // // // // //     watermarkText = "Powered by AVI",
// // // // // // // // // // // // // //     wordColors = true
// // // // // // // // // // // // // //   } = options;
  
// // // // // // // // // // // // // //   // Generate words with hidden spellings
// // // // // // // // // // // // // //   const words = generateWordsWithSpelling(targetWord, totalWords, minExtraLetters, maxExtraLetters);
  
// // // // // // // // // // // // // //   // Count how many words contain the spelling
// // // // // // // // // // // // // //   const containCount = words.filter(word => containsSpelling(word, targetWord)).length;
// // // // // // // // // // // // // //   const answer = containCount.toString();
  
// // // // // // // // // // // // // //   // ---------------- CANVAS ----------------
// // // // // // // // // // // // // //   const canvas = createCanvas(width, height);
// // // // // // // // // // // // // //   const ctx = canvas.getContext("2d");
  
// // // // // // // // // // // // // //   // Background gradient
// // // // // // // // // // // // // //   const bgGradient = ctx.createLinearGradient(0, 0, width, height);
// // // // // // // // // // // // // //   bgGradient.addColorStop(0, '#f8f9fa');
// // // // // // // // // // // // // //   bgGradient.addColorStop(0.5, '#e9ecef');
// // // // // // // // // // // // // //   bgGradient.addColorStop(1, '#f8f9fa');
// // // // // // // // // // // // // //   ctx.fillStyle = bgGradient;
// // // // // // // // // // // // // //   ctx.fillRect(0, 0, width, height);
  
// // // // // // // // // // // // // //   // Decorative top border
// // // // // // // // // // // // // //   const borderColors = ['#FF6B6B', '#FF9F43', '#FECA57', '#48DBFB', '#A29BFE', '#FD79A8'];
// // // // // // // // // // // // // //   const borderGradient = ctx.createLinearGradient(0, 0, width, 0);
// // // // // // // // // // // // // //   borderColors.forEach((color, i) => {
// // // // // // // // // // // // // //     const stop = i / borderColors.length;
// // // // // // // // // // // // // //     borderGradient.addColorStop(stop, color);
// // // // // // // // // // // // // //   });
// // // // // // // // // // // // // //   ctx.fillStyle = borderGradient;
// // // // // // // // // // // // // //   ctx.fillRect(0, 0, width, 4);
  
// // // // // // // // // // // // // //   // Title
// // // // // // // // // // // // // //   ctx.save();
// // // // // // // // // // // // // //   ctx.fillStyle = '#1a4053';
// // // // // // // // // // // // // //   ctx.font = 'bold 22px Arial';
// // // // // // // // // // // // // //   ctx.textAlign = 'center';
// // // // // // // // // // // // // //   ctx.textBaseline = 'top';
// // // // // // // // // // // // // //   ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
// // // // // // // // // // // // // //   ctx.shadowBlur = 8;
// // // // // // // // // // // // // //   ctx.fillText(`🔍 Find the real "${targetWord}" hidden in these scrambled words`, width / 2, 15);
// // // // // // // // // // // // // //   ctx.shadowBlur = 0;
// // // // // // // // // // // // // //   ctx.restore();
  
// // // // // // // // // // // // // //   // Color palette for words
// // // // // // // // // // // // // //   const colorPalette = [
// // // // // // // // // // // // // //     '#2C3E50', '#E74C3C', '#2980B9', '#27AE60', '#8E44AD', '#F39C12',
// // // // // // // // // // // // // //     '#1ABC9C', '#D35400', '#3498DB', '#2ECC71', '#9B59B6', '#E67E22',
// // // // // // // // // // // // // //     '#16A085', '#C0392B', '#2471A3', '#229954', '#7D3C98', '#D4AC0D',
// // // // // // // // // // // // // //     '#138D75', '#B9770E', '#1A5276', '#1E8449', '#6C3483', '#A04000'
// // // // // // // // // // // // // //   ];
  
// // // // // // // // // // // // // //   // Spread words randomly across the image
// // // // // // // // // // // // // //   const startY = 60;
// // // // // // // // // // // // // //   const fontSize = 18;
// // // // // // // // // // // // // //   const margin = 25;
// // // // // // // // // // // // // //   const minDistance = 50;
  
// // // // // // // // // // // // // //   // Create random positions for each word
// // // // // // // // // // // // // //   const wordPositions = [];
// // // // // // // // // // // // // //   const usedPositions = [];
  
// // // // // // // // // // // // // //   for (let i = 0; i < words.length; i++) {
// // // // // // // // // // // // // //     const word = words[i];
// // // // // // // // // // // // // //     ctx.font = `bold ${fontSize}px Arial`;
// // // // // // // // // // // // // //     const metrics = ctx.measureText(word);
// // // // // // // // // // // // // //     const wordWidth = metrics.width;
    
// // // // // // // // // // // // // //     let x, y, attempts = 0;
// // // // // // // // // // // // // //     let overlap = true;
// // // // // // // // // // // // // //     const maxAttempts = 200;
    
// // // // // // // // // // // // // //     while (overlap && attempts < maxAttempts) {
// // // // // // // // // // // // // //       x = margin + Math.random() * (width - margin * 2 - wordWidth);
// // // // // // // // // // // // // //       y = startY + Math.random() * (height - startY - margin - 20);
      
// // // // // // // // // // // // // //       overlap = false;
// // // // // // // // // // // // // //       for (const pos of usedPositions) {
// // // // // // // // // // // // // //         const distance = Math.sqrt(
// // // // // // // // // // // // // //           Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2)
// // // // // // // // // // // // // //         );
// // // // // // // // // // // // // //         if (distance < minDistance) {
// // // // // // // // // // // // // //           overlap = true;
// // // // // // // // // // // // // //           break;
// // // // // // // // // // // // // //         }
// // // // // // // // // // // // // //         const horizontalOverlap = (x < pos.x + pos.width + 5) && (x + wordWidth + 5 > pos.x);
// // // // // // // // // // // // // //         const verticalOverlap = Math.abs(y - pos.y) < 20;
// // // // // // // // // // // // // //         if (horizontalOverlap && verticalOverlap) {
// // // // // // // // // // // // // //           overlap = true;
// // // // // // // // // // // // // //           break;
// // // // // // // // // // // // // //         }
// // // // // // // // // // // // // //       }
// // // // // // // // // // // // // //       attempts++;
// // // // // // // // // // // // // //     }
    
// // // // // // // // // // // // // //     usedPositions.push({ x, y, width: wordWidth });
// // // // // // // // // // // // // //     wordPositions.push({ word, x, y });
// // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // //   // Draw each word at its random position
// // // // // // // // // // // // // //   for (const { word, x, y } of wordPositions) {
// // // // // // // // // // // // // //     const color = wordColors ? getRandom(colorPalette) : '#2C3E50';
    
// // // // // // // // // // // // // //     ctx.save();
    
// // // // // // // // // // // // // //     // Add white outline/shadow for readability
// // // // // // // // // // // // // //     ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
// // // // // // // // // // // // // //     ctx.shadowBlur = 6;
// // // // // // // // // // // // // //     ctx.fillStyle = color;
// // // // // // // // // // // // // //     ctx.font = `bold ${fontSize}px Arial`;
// // // // // // // // // // // // // //     ctx.textAlign = 'left';
// // // // // // // // // // // // // //     ctx.textBaseline = 'top';
// // // // // // // // // // // // // //     ctx.fillText(word, x, y);
    
// // // // // // // // // // // // // //     // Draw the actual text
// // // // // // // // // // // // // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.05)';
// // // // // // // // // // // // // //     ctx.shadowBlur = 2;
// // // // // // // // // // // // // //     ctx.fillText(word, x, y);
    
// // // // // // // // // // // // // //     ctx.restore();
// // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // //   // ---------------- WATERMARK ----------------
// // // // // // // // // // // // // //   if (showWatermark) {
// // // // // // // // // // // // // //     ctx.save();
// // // // // // // // // // // // // //     ctx.globalAlpha = 0.12;
// // // // // // // // // // // // // //     ctx.textAlign = "right";
// // // // // // // // // // // // // //     ctx.textBaseline = "bottom";
    
// // // // // // // // // // // // // //     ctx.font = "bold 13px Arial";
// // // // // // // // // // // // // //     ctx.fillStyle = "#2C3E50";
// // // // // // // // // // // // // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
// // // // // // // // // // // // // //     ctx.shadowBlur = 2;
// // // // // // // // // // // // // //     ctx.fillText(watermarkText, width - 15, height - 8);
    
// // // // // // // // // // // // // //     ctx.restore();
// // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // //   // Add instruction at bottom
// // // // // // // // // // // // // //   ctx.fillStyle = '#7f8c8d';
// // // // // // // // // // // // // //   ctx.font = '14px Arial';
// // // // // // // // // // // // // //   ctx.textAlign = 'center';
// // // // // // // // // // // // // //   ctx.textBaseline = 'bottom';
// // // // // // // // // // // // // //   ctx.globalAlpha = 0.6;
// // // // // // // // // // // // // //   ctx.fillText(`How many scrambled words contain the complete word "${targetWord}"?`, width / 2, height - 10);
// // // // // // // // // // // // // //   ctx.globalAlpha = 1.0;
  
// // // // // // // // // // // // // //   // Generate options
// // // // // // // // // // // // // //   const generatedOptions = generateSimilarOptions(answer);
  
// // // // // // // // // // // // // //   // -----------------------------------
// // // // // // // // // // // // // //   // Return
// // // // // // // // // // // // // //   // -----------------------------------
  
// // // // // // // // // // // // // //   return {
// // // // // // // // // // // // // //     question: `How many scrambled words contain the complete word "${targetWord}"?`,
// // // // // // // // // // // // // //     options: generatedOptions,
// // // // // // // // // // // // // //     answer: answer,
// // // // // // // // // // // // // //     targetWord: targetWord,
// // // // // // // // // // // // // //     totalWords: words.length,
// // // // // // // // // // // // // //     containCount: containCount,
// // // // // // // // // // // // // //     words: words,
// // // // // // // // // // // // // //     image: canvas.toDataURL().split(",")[1]
// // // // // // // // // // // // // //   };
// // // // // // // // // // // // // // }
















// // // // // // // // // // // // // // import { createCanvas } from "canvas";

// // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // Helpers
// // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // function shuffle(arr) {
// // // // // // // // // // // // // //   return arr.sort(() => Math.random() - 0.5);
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // function getRandom(arr) {
// // // // // // // // // // // // // //   return arr[Math.floor(Math.random() * arr.length)];
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // function rand(min, max) {
// // // // // // // // // // // // // //   return Math.floor(Math.random() * (max - min + 1)) + min;
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // Generate Random Letters
// // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // function generateRandomLetters(count) {
// // // // // // // // // // // // // //   const letters = 'abcdefghijklmnopqrstuvwxyz';
// // // // // // // // // // // // // //   let result = '';
// // // // // // // // // // // // // //   for (let i = 0; i < count; i++) {
// // // // // // // // // // // // // //     result += letters[Math.floor(Math.random() * letters.length)];
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // //   return result;
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // Check if a word contains the target spelling
// // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // function containsSpelling(word, target) {
// // // // // // // // // // // // // //   let targetIndex = 0;
// // // // // // // // // // // // // //   for (let i = 0; i < word.length; i++) {
// // // // // // // // // // // // // //     if (word[i] === target[targetIndex]) {
// // // // // // // // // // // // // //       targetIndex++;
// // // // // // // // // // // // // //       if (targetIndex === target.length) {
// // // // // // // // // // // // // //         return true;
// // // // // // // // // // // // // //       }
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // //   return false;
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // Generate a word similar to target by removing one letter
// // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // function generateSimilarWord(targetWord) {
// // // // // // // // // // // // // //   const letters = targetWord.split('');
// // // // // // // // // // // // // //   const removeIndex = rand(0, letters.length - 1);
// // // // // // // // // // // // // //   const newLetters = letters.filter((_, i) => i !== removeIndex);
  
// // // // // // // // // // // // // //   // Shuffle the remaining letters to make it look scrambled
// // // // // // // // // // // // // //   const shuffled = shuffle(newLetters);
  
// // // // // // // // // // // // // //   // Add 1-3 random extra letters to make it more confusing
// // // // // // // // // // // // // //   const extraCount = rand(1, 3);
// // // // // // // // // // // // // //   const extraLetters = generateRandomLetters(extraCount).split('');
  
// // // // // // // // // // // // // //   const combined = shuffle([...shuffled, ...extraLetters]);
  
// // // // // // // // // // // // // //   return combined.join('');
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // Generate Words - ALL missing 1 letter from clue
// // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // function generateWordsWithSpelling(targetWord, totalWords = 30) {
// // // // // // // // // // // // // //   const words = [];
  
// // // // // // // // // // // // // //   // Generate ALL words by removing 1 letter from target and scrambling
// // // // // // // // // // // // // //   for (let i = 0; i < totalWords; i++) {
// // // // // // // // // // // // // //     let word = '';
// // // // // // // // // // // // // //     let attempts = 0;
// // // // // // // // // // // // // //     do {
// // // // // // // // // // // // // //       word = generateSimilarWord(targetWord);
// // // // // // // // // // // // // //       attempts++;
// // // // // // // // // // // // // //       if (attempts > 50) break;
// // // // // // // // // // // // // //     } while (word.length < 3 || word === targetWord);
// // // // // // // // // // // // // //     words.push(word);
// // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // //   return shuffle(words);
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // Generate Similar Options
// // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // function generateSimilarOptions(correctAnswer) {
// // // // // // // // // // // // // //   const correctNum = parseInt(correctAnswer);
// // // // // // // // // // // // // //   const options = new Set();
// // // // // // // // // // // // // //   options.add(correctAnswer);
  
// // // // // // // // // // // // // //   const possibleDiffs = [-3, -2, -1, 1, 2, 3, -4, 4];
// // // // // // // // // // // // // //   const shuffledDiffs = shuffle([...possibleDiffs]);
  
// // // // // // // // // // // // // //   for (const diff of shuffledDiffs) {
// // // // // // // // // // // // // //     if (options.size >= 4) break;
// // // // // // // // // // // // // //     const candidate = correctNum + diff;
// // // // // // // // // // // // // //     if (candidate >= 0 && candidate <= 50) {
// // // // // // // // // // // // // //       const candidateStr = candidate.toString();
// // // // // // // // // // // // // //       if (!options.has(candidateStr)) {
// // // // // // // // // // // // // //         options.add(candidateStr);
// // // // // // // // // // // // // //       }
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // //   const fallbackOptions = [];
// // // // // // // // // // // // // //   for (let i = 0; i <= 50; i++) {
// // // // // // // // // // // // // //     if (!options.has(i.toString())) {
// // // // // // // // // // // // // //       fallbackOptions.push(i.toString());
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // //   while (options.size < 4 && fallbackOptions.length > 0) {
// // // // // // // // // // // // // //     const randomFallback = getRandom(fallbackOptions);
// // // // // // // // // // // // // //     options.add(randomFallback);
// // // // // // // // // // // // // //     const index = fallbackOptions.indexOf(randomFallback);
// // // // // // // // // // // // // //     if (index > -1) {
// // // // // // // // // // // // // //       fallbackOptions.splice(index, 1);
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // //   return shuffle([...options]);
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // Get Random Target Word
// // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // function getRandomTargetWord() {
// // // // // // // // // // // // // //   const wordList = [
// // // // // // // // // // // // // //     "apple", "banana", "cherry", "dragon", "eagle", "forest", "garden", "harbor", 
// // // // // // // // // // // // // //     "island", "jungle", "knight", "lion", "mountain", "night", "ocean", "penguin", 
// // // // // // // // // // // // // //     "queen", "river", "storm", "tiger", "umbrella", "valley", "whale", "xenon", 
// // // // // // // // // // // // // //     "yacht", "zebra", "crystal", "diamond", "ember", "flame", "glacier", "horizon", 
// // // // // // // // // // // // // //     "ivory", "jade", "kiwi", "lavender", "moon", "nebula", "opal", "pearl", 
// // // // // // // // // // // // // //     "quartz", "rainbow", "sapphire", "twilight", "uranium", "vortex", "willow", 
// // // // // // // // // // // // // //     "xylem", "yew", "zenith", "blossom", "cascade", "drift", "echo", "frost", 
// // // // // // // // // // // // // //     "glimmer", "haze", "illusion", "jubilee", "kaleidoscope", "labyrinth", "mirage", 
// // // // // // // // // // // // // //     "nostalgia", "oasis", "paradox", "quasar", "reverie", "serenity", "tempest", 
// // // // // // // // // // // // // //     "utopia", "vivid", "whisper", "xenial", "yearning", "zephyr", "astronaut", 
// // // // // // // // // // // // // //     "breeze", "cosmos", "dream", "eclipse", "feather", "galaxy", "harmony", 
// // // // // // // // // // // // // //     "illuminate", "journey", "kindle", "lunar", "mystic", "nova", "orbit", "pulse", 
// // // // // // // // // // // // // //     "radiant", "solstice", "tranquil", "unique", "velocity", "wander", "yonder"
// // // // // // // // // // // // // //   ];
  
// // // // // // // // // // // // // //   return getRandom(wordList);
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // // Main Function
// // // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // // export function generatePuzzle_word_search(options = {}) {
// // // // // // // // // // // // // //   // Get random target word if not provided
// // // // // // // // // // // // // //   const targetWord = options.targetWord || getRandomTargetWord();
  
// // // // // // // // // // // // // //   const {
// // // // // // // // // // // // // //     totalWords = 10,
// // // // // // // // // // // // // //     width = 400,
// // // // // // // // // // // // // //     height = 250,
// // // // // // // // // // // // // //     showWatermark = true,
// // // // // // // // // // // // // //     watermarkText = "Powered by AVI",
// // // // // // // // // // // // // //     wordColors = true
// // // // // // // // // // // // // //   } = options;
  
// // // // // // // // // // // // // //   // Generate ALL words missing 1 letter from clue
// // // // // // // // // // // // // //   const words = generateWordsWithSpelling(targetWord, totalWords);
  
// // // // // // // // // // // // // //   // Answer is always 0 since NO word contains the complete spelling
// // // // // // // // // // // // // //   const answer = "0";
  
// // // // // // // // // // // // // //   // ---------------- CANVAS ----------------
// // // // // // // // // // // // // //   const canvas = createCanvas(width, height);
// // // // // // // // // // // // // //   const ctx = canvas.getContext("2d");
  
// // // // // // // // // // // // // //   // Background gradient
// // // // // // // // // // // // // //   const bgGradient = ctx.createLinearGradient(0, 0, width, height);
// // // // // // // // // // // // // //   bgGradient.addColorStop(0, '#f8f9fa');
// // // // // // // // // // // // // //   bgGradient.addColorStop(0.5, '#e9ecef');
// // // // // // // // // // // // // //   bgGradient.addColorStop(1, '#f8f9fa');
// // // // // // // // // // // // // //   ctx.fillStyle = bgGradient;
// // // // // // // // // // // // // //   ctx.fillRect(0, 0, width, height);
  
// // // // // // // // // // // // // //   // Decorative top border
// // // // // // // // // // // // // //   const borderColors = ['#FF6B6B', '#FF9F43', '#FECA57', '#48DBFB', '#A29BFE', '#FD79A8'];
// // // // // // // // // // // // // //   const borderGradient = ctx.createLinearGradient(0, 0, width, 0);
// // // // // // // // // // // // // //   borderColors.forEach((color, i) => {
// // // // // // // // // // // // // //     const stop = i / borderColors.length;
// // // // // // // // // // // // // //     borderGradient.addColorStop(stop, color);
// // // // // // // // // // // // // //   });
// // // // // // // // // // // // // //   ctx.fillStyle = borderGradient;
// // // // // // // // // // // // // //   ctx.fillRect(0, 0, width, 4);
  
// // // // // // // // // // // // // //   // Title with timer concept
// // // // // // // // // // // // // //   // ctx.save();
// // // // // // // // // // // // // //   // ctx.fillStyle = '#1a4053';
// // // // // // // // // // // // // //   // ctx.font = 'bold 22px Arial';
// // // // // // // // // // // // // //   // ctx.textAlign = 'center';
// // // // // // // // // // // // // //   // ctx.textBaseline = 'top';
// // // // // // // // // // // // // //   // ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
// // // // // // // // // // // // // //   // ctx.shadowBlur = 8;
// // // // // // // // // // // // // //   // ctx.fillText(`⏰ Find "${targetWord}" - All words are MISSING 1 letter!`, width / 2, 15);
// // // // // // // // // // // // // //   // ctx.shadowBlur = 0;
// // // // // // // // // // // // // //   // ctx.restore();
  
// // // // // // // // // // // // // //   // Color palette for words
// // // // // // // // // // // // // //   const colorPalette = [
// // // // // // // // // // // // // //     '#2C3E50', '#E74C3C', '#2980B9', '#27AE60', '#8E44AD', '#F39C12',
// // // // // // // // // // // // // //     '#1ABC9C', '#D35400', '#3498DB', '#2ECC71', '#9B59B6', '#E67E22',
// // // // // // // // // // // // // //     '#16A085', '#C0392B', '#2471A3', '#229954', '#7D3C98', '#D4AC0D',
// // // // // // // // // // // // // //     '#138D75', '#B9770E', '#1A5276', '#1E8449', '#6C3483', '#A04000'
// // // // // // // // // // // // // //   ];
  
// // // // // // // // // // // // // //   // Spread words randomly across the image
// // // // // // // // // // // // // //   const startY = 60;
// // // // // // // // // // // // // //   const fontSize = 18;
// // // // // // // // // // // // // //   const margin = 25;
// // // // // // // // // // // // // //   const minDistance = 50;
  
// // // // // // // // // // // // // //   // Create random positions for each word
// // // // // // // // // // // // // //   const wordPositions = [];
// // // // // // // // // // // // // //   const usedPositions = [];
  
// // // // // // // // // // // // // //   for (let i = 0; i < words.length; i++) {
// // // // // // // // // // // // // //     const word = words[i];
// // // // // // // // // // // // // //     ctx.font = `bold ${fontSize}px Arial`;
// // // // // // // // // // // // // //     const metrics = ctx.measureText(word);
// // // // // // // // // // // // // //     const wordWidth = metrics.width;
    
// // // // // // // // // // // // // //     let x, y, attempts = 0;
// // // // // // // // // // // // // //     let overlap = true;
// // // // // // // // // // // // // //     const maxAttempts = 200;
    
// // // // // // // // // // // // // //     while (overlap && attempts < maxAttempts) {
// // // // // // // // // // // // // //       x = margin + Math.random() * (width - margin * 2 - wordWidth);
// // // // // // // // // // // // // //       y = startY + Math.random() * (height - startY - margin - 20);
      
// // // // // // // // // // // // // //       overlap = false;
// // // // // // // // // // // // // //       for (const pos of usedPositions) {
// // // // // // // // // // // // // //         const distance = Math.sqrt(
// // // // // // // // // // // // // //           Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2)
// // // // // // // // // // // // // //         );
// // // // // // // // // // // // // //         if (distance < minDistance) {
// // // // // // // // // // // // // //           overlap = true;
// // // // // // // // // // // // // //           break;
// // // // // // // // // // // // // //         }
// // // // // // // // // // // // // //         const horizontalOverlap = (x < pos.x + pos.width + 5) && (x + wordWidth + 5 > pos.x);
// // // // // // // // // // // // // //         const verticalOverlap = Math.abs(y - pos.y) < 20;
// // // // // // // // // // // // // //         if (horizontalOverlap && verticalOverlap) {
// // // // // // // // // // // // // //           overlap = true;
// // // // // // // // // // // // // //           break;
// // // // // // // // // // // // // //         }
// // // // // // // // // // // // // //       }
// // // // // // // // // // // // // //       attempts++;
// // // // // // // // // // // // // //     }
    
// // // // // // // // // // // // // //     usedPositions.push({ x, y, width: wordWidth });
// // // // // // // // // // // // // //     wordPositions.push({ word, x, y });
// // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // //   // Draw each word at its random position
// // // // // // // // // // // // // //   for (const { word, x, y } of wordPositions) {
// // // // // // // // // // // // // //     const color = wordColors ? getRandom(colorPalette) : '#2C3E50';
    
// // // // // // // // // // // // // //     ctx.save();
    
// // // // // // // // // // // // // //     // Add white outline/shadow for readability
// // // // // // // // // // // // // //     ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
// // // // // // // // // // // // // //     ctx.shadowBlur = 6;
// // // // // // // // // // // // // //     ctx.fillStyle = color;
// // // // // // // // // // // // // //     ctx.font = `bold ${fontSize}px Arial`;
// // // // // // // // // // // // // //     ctx.textAlign = 'left';
// // // // // // // // // // // // // //     ctx.textBaseline = 'top';
// // // // // // // // // // // // // //     ctx.fillText(word, x, y);
    
// // // // // // // // // // // // // //     // Draw the actual text
// // // // // // // // // // // // // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.05)';
// // // // // // // // // // // // // //     ctx.shadowBlur = 2;
// // // // // // // // // // // // // //     ctx.fillText(word, x, y);
    
// // // // // // // // // // // // // //     ctx.restore();
// // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // //   // ---------------- WATERMARK ----------------
// // // // // // // // // // // // // //   if (showWatermark) {
// // // // // // // // // // // // // //     ctx.save();
// // // // // // // // // // // // // //     ctx.globalAlpha = 0.6;
// // // // // // // // // // // // // //     ctx.textAlign = "right";
// // // // // // // // // // // // // //     ctx.textBaseline = "bottom";
    
// // // // // // // // // // // // // //     ctx.font = "bold 14px Arial";
// // // // // // // // // // // // // //     ctx.fillStyle = "#2C3E50";
// // // // // // // // // // // // // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
// // // // // // // // // // // // // //     ctx.shadowBlur = 2;
// // // // // // // // // // // // // //     ctx.fillText(watermarkText, width - 15, height - 8);
    
// // // // // // // // // // // // // //     ctx.restore();
// // // // // // // // // // // // // //   }
  
// // // // // // // // // // // // // //   // Add instruction at bottom with timer warning
// // // // // // // // // // // // // //   // ctx.fillStyle = '#e74c3c';
// // // // // // // // // // // // // //   // ctx.font = 'bold 16px Arial';
// // // // // // // // // // // // // //   // ctx.textAlign = 'center';
// // // // // // // // // // // // // //   // ctx.textBaseline = 'bottom';
// // // // // // // // // // // // // //   // ctx.globalAlpha = 0.8;
// // // // // // // // // // // // // //   // ctx.fillText(`⚠️ NONE of these words contain the complete "${targetWord}"! Time is running out! ⏰`, width / 2, height - 10);
// // // // // // // // // // // // // //   // ctx.globalAlpha = 1.0;
  
// // // // // // // // // // // // // //   // Generate options (all will be wrong except 0)
// // // // // // // // // // // // // //   const generatedOptions = generateSimilarOptions(answer);
  
// // // // // // // // // // // // // //   // -----------------------------------
// // // // // // // // // // // // // //   // Return
// // // // // // // // // // // // // //   // -----------------------------------
  
// // // // // // // // // // // // // //   return {
// // // // // // // // // // // // // //     question: `How many scrambled words contain the complete word "${targetWord}"? (Hint: All words are missing 1 letter!)`,
// // // // // // // // // // // // // //     options: generatedOptions,
// // // // // // // // // // // // // //     answer: answer,
// // // // // // // // // // // // // //     targetWord: targetWord,
// // // // // // // // // // // // // //     totalWords: words.length,
// // // // // // // // // // // // // //     containCount: 0,
// // // // // // // // // // // // // //     words: words,
// // // // // // // // // // // // // //     image: canvas.toDataURL().split(",")[1]
// // // // // // // // // // // // // //   };
// // // // // // // // // // // // // // }
































// // // // // // // // // // // // // import { createCanvas } from "canvas";

// // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // Helpers
// // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // function shuffle(arr) {
// // // // // // // // // // // // //   return arr.sort(() => Math.random() - 0.5);
// // // // // // // // // // // // // }

// // // // // // // // // // // // // function getRandom(arr) {
// // // // // // // // // // // // //   return arr[Math.floor(Math.random() * arr.length)];
// // // // // // // // // // // // // }

// // // // // // // // // // // // // function rand(min, max) {
// // // // // // // // // // // // //   return Math.floor(Math.random() * (max - min + 1)) + min;
// // // // // // // // // // // // // }

// // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // Generate Random Letters
// // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // function generateRandomLetters(count) {
// // // // // // // // // // // // //   const letters = 'abcdefghijklmnopqrstuvwxyz';
// // // // // // // // // // // // //   let result = '';
// // // // // // // // // // // // //   for (let i = 0; i < count; i++) {
// // // // // // // // // // // // //     result += letters[Math.floor(Math.random() * letters.length)];
// // // // // // // // // // // // //   }
// // // // // // // // // // // // //   return result;
// // // // // // // // // // // // // }

// // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // Check if a word contains the target spelling
// // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // function containsSpelling(word, target) {
// // // // // // // // // // // // //   let targetIndex = 0;
// // // // // // // // // // // // //   for (let i = 0; i < word.length; i++) {
// // // // // // // // // // // // //     if (word[i] === target[targetIndex]) {
// // // // // // // // // // // // //       targetIndex++;
// // // // // // // // // // // // //       if (targetIndex === target.length) {
// // // // // // // // // // // // //         return true;
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   }
// // // // // // // // // // // // //   return false;
// // // // // // // // // // // // // }

// // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // Generate a completely RANDOM nonsense word
// // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // function generateRandomWord(minLength = 5, maxLength = 10) {
// // // // // // // // // // // // //   const length = rand(minLength, maxLength);
// // // // // // // // // // // // //   return generateRandomLetters(length);
// // // // // // // // // // // // // }

// // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // Generate a word with target letters hidden inside
// // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // function generateWordWithHiddenTarget(targetWord, extraLettersCount = 4) {
// // // // // // // // // // // // //   const targetLetters = targetWord.split('');
// // // // // // // // // // // // //   const shuffledTarget = shuffle([...targetLetters]);
  
// // // // // // // // // // // // //   // Add random extra letters
// // // // // // // // // // // // //   const extraLetters = generateRandomLetters(extraLettersCount).split('');
  
// // // // // // // // // // // // //   // Combine and shuffle
// // // // // // // // // // // // //   const combined = shuffle([...shuffledTarget, ...extraLetters]);
  
// // // // // // // // // // // // //   return combined.join('');
// // // // // // // // // // // // // }

// // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // Generate Words - Mix of random nonsense and hidden target letters
// // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // function generateWordsWithSpelling(targetWord, totalWords = 30) {
// // // // // // // // // // // // //   const words = [];
  
// // // // // // // // // // // // //   // Generate words for each position
// // // // // // // // // // // // //   for (let i = 0; i < totalWords; i++) {
// // // // // // // // // // // // //     let word = '';
    
// // // // // // // // // // // // //     // 70% chance of completely random word, 30% chance of having target letters hidden
// // // // // // // // // // // // //     if (Math.random() < 0.7) {
// // // // // // // // // // // // //       // Completely random nonsense word
// // // // // // // // // // // // //       word = generateRandomWord(rand(4, 12));
// // // // // // // // // // // // //     } else {
// // // // // // // // // // // // //       // Word with target letters hidden but not in correct order
// // // // // // // // // // // // //       word = generateWordWithHiddenTarget(targetWord, rand(3, 6));
// // // // // // // // // // // // //     }
    
// // // // // // // // // // // // //     // Ensure it's not the exact target word
// // // // // // // // // // // // //     while (word === targetWord || word.length < 3) {
// // // // // // // // // // // // //       word = generateRandomWord(rand(4, 12));
// // // // // // // // // // // // //     }
    
// // // // // // // // // // // // //     words.push(word);
// // // // // // // // // // // // //   }
  
// // // // // // // // // // // // //   return shuffle(words);
// // // // // // // // // // // // // }

// // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // Generate Similar Options
// // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // function generateSimilarOptions(correctAnswer) {
// // // // // // // // // // // // //   const correctNum = parseInt(correctAnswer);
// // // // // // // // // // // // //   const options = new Set();
// // // // // // // // // // // // //   options.add(correctAnswer);
  
// // // // // // // // // // // // //   const possibleDiffs = [-3, -2, -1, 1, 2, 3, -4, 4];
// // // // // // // // // // // // //   const shuffledDiffs = shuffle([...possibleDiffs]);
  
// // // // // // // // // // // // //   for (const diff of shuffledDiffs) {
// // // // // // // // // // // // //     if (options.size >= 4) break;
// // // // // // // // // // // // //     const candidate = correctNum + diff;
// // // // // // // // // // // // //     if (candidate >= 0 && candidate <= 50) {
// // // // // // // // // // // // //       const candidateStr = candidate.toString();
// // // // // // // // // // // // //       if (!options.has(candidateStr)) {
// // // // // // // // // // // // //         options.add(candidateStr);
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   }
  
// // // // // // // // // // // // //   const fallbackOptions = [];
// // // // // // // // // // // // //   for (let i = 0; i <= 50; i++) {
// // // // // // // // // // // // //     if (!options.has(i.toString())) {
// // // // // // // // // // // // //       fallbackOptions.push(i.toString());
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   }
  
// // // // // // // // // // // // //   while (options.size < 4 && fallbackOptions.length > 0) {
// // // // // // // // // // // // //     const randomFallback = getRandom(fallbackOptions);
// // // // // // // // // // // // //     options.add(randomFallback);
// // // // // // // // // // // // //     const index = fallbackOptions.indexOf(randomFallback);
// // // // // // // // // // // // //     if (index > -1) {
// // // // // // // // // // // // //       fallbackOptions.splice(index, 1);
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   }
  
// // // // // // // // // // // // //   return shuffle([...options]);
// // // // // // // // // // // // // }

// // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // Get Random Target Word
// // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // function getRandomTargetWord() {
// // // // // // // // // // // // //   const wordList = [
// // // // // // // // // // // // //     "kakk"
// // // // // // // // // // // // //   ];
  
// // // // // // // // // // // // //   return getRandom(wordList);
// // // // // // // // // // // // // }

// // // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // // Main Function
// // // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // // export function generatePuzzle_word_search(options = {}) {
// // // // // // // // // // // // //   // Get random target word if not provided
// // // // // // // // // // // // //   const targetWord = options.targetWord || getRandomTargetWord();
  
// // // // // // // // // // // // //   const {
// // // // // // // // // // // // //     totalWords = 10,
// // // // // // // // // // // // //     width = 400,
// // // // // // // // // // // // //     height = 250,
// // // // // // // // // // // // //     showWatermark = true,
// // // // // // // // // // // // //     watermarkText = "Powered by AVI",
// // // // // // // // // // // // //     wordColors = true
// // // // // // // // // // // // //   } = options;
  
// // // // // // // // // // // // //   // Generate words - mix of random nonsense and hidden target letters
// // // // // // // // // // // // //   const words = generateWordsWithSpelling(targetWord, totalWords);
  
// // // // // // // // // // // // //   // Count how many words contain the complete spelling (should be 0)
// // // // // // // // // // // // //   let containCount = 0;
// // // // // // // // // // // // //   for (const word of words) {
// // // // // // // // // // // // //     if (containsSpelling(word, targetWord)) {
// // // // // // // // // // // // //       containCount++;
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   }
  
// // // // // // // // // // // // //   // Answer is 0 since no word contains the complete spelling in order
// // // // // // // // // // // // //   const answer = containCount.toString();
  
// // // // // // // // // // // // //   // ---------------- CANVAS ----------------
// // // // // // // // // // // // //   const canvas = createCanvas(width, height);
// // // // // // // // // // // // //   const ctx = canvas.getContext("2d");
  
// // // // // // // // // // // // //   // Background gradient
// // // // // // // // // // // // //   const bgGradient = ctx.createLinearGradient(0, 0, width, height);
// // // // // // // // // // // // //   bgGradient.addColorStop(0, '#f8f9fa');
// // // // // // // // // // // // //   bgGradient.addColorStop(0.5, '#e9ecef');
// // // // // // // // // // // // //   bgGradient.addColorStop(1, '#f8f9fa');
// // // // // // // // // // // // //   ctx.fillStyle = bgGradient;
// // // // // // // // // // // // //   ctx.fillRect(0, 0, width, height);
  
// // // // // // // // // // // // //   // Decorative top border
// // // // // // // // // // // // //   const borderColors = ['#FF6B6B', '#FF9F43', '#FECA57', '#48DBFB', '#A29BFE', '#FD79A8'];
// // // // // // // // // // // // //   const borderGradient = ctx.createLinearGradient(0, 0, width, 0);
// // // // // // // // // // // // //   borderColors.forEach((color, i) => {
// // // // // // // // // // // // //     const stop = i / borderColors.length;
// // // // // // // // // // // // //     borderGradient.addColorStop(stop, color);
// // // // // // // // // // // // //   });
// // // // // // // // // // // // //   ctx.fillStyle = borderGradient;
// // // // // // // // // // // // //   ctx.fillRect(0, 0, width, 4);
  
// // // // // // // // // // // // //   // Color palette for words
// // // // // // // // // // // // //   const colorPalette = [
// // // // // // // // // // // // //     '#2C3E50', '#E74C3C', '#2980B9', '#27AE60', '#8E44AD', '#F39C12',
// // // // // // // // // // // // //     '#1ABC9C', '#D35400', '#3498DB', '#2ECC71', '#9B59B6', '#E67E22',
// // // // // // // // // // // // //     '#16A085', '#C0392B', '#2471A3', '#229954', '#7D3C98', '#D4AC0D',
// // // // // // // // // // // // //     '#138D75', '#B9770E', '#1A5276', '#1E8449', '#6C3483', '#A04000'
// // // // // // // // // // // // //   ];
  
// // // // // // // // // // // // //   // Spread words randomly across the image
// // // // // // // // // // // // //   const startY = 60;
// // // // // // // // // // // // //   const fontSize = 18;
// // // // // // // // // // // // //   const margin = 25;
// // // // // // // // // // // // //   const minDistance = 50;
  
// // // // // // // // // // // // //   // Create random positions for each word
// // // // // // // // // // // // //   const wordPositions = [];
// // // // // // // // // // // // //   const usedPositions = [];
  
// // // // // // // // // // // // //   for (let i = 0; i < words.length; i++) {
// // // // // // // // // // // // //     const word = words[i];
// // // // // // // // // // // // //     ctx.font = `bold ${fontSize}px Arial`;
// // // // // // // // // // // // //     const metrics = ctx.measureText(word);
// // // // // // // // // // // // //     const wordWidth = metrics.width;
    
// // // // // // // // // // // // //     let x, y, attempts = 0;
// // // // // // // // // // // // //     let overlap = true;
// // // // // // // // // // // // //     const maxAttempts = 200;
    
// // // // // // // // // // // // //     while (overlap && attempts < maxAttempts) {
// // // // // // // // // // // // //       x = margin + Math.random() * (width - margin * 2 - wordWidth);
// // // // // // // // // // // // //       y = startY + Math.random() * (height - startY - margin - 20);
      
// // // // // // // // // // // // //       overlap = false;
// // // // // // // // // // // // //       for (const pos of usedPositions) {
// // // // // // // // // // // // //         const distance = Math.sqrt(
// // // // // // // // // // // // //           Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2)
// // // // // // // // // // // // //         );
// // // // // // // // // // // // //         if (distance < minDistance) {
// // // // // // // // // // // // //           overlap = true;
// // // // // // // // // // // // //           break;
// // // // // // // // // // // // //         }
// // // // // // // // // // // // //         const horizontalOverlap = (x < pos.x + pos.width + 5) && (x + wordWidth + 5 > pos.x);
// // // // // // // // // // // // //         const verticalOverlap = Math.abs(y - pos.y) < 20;
// // // // // // // // // // // // //         if (horizontalOverlap && verticalOverlap) {
// // // // // // // // // // // // //           overlap = true;
// // // // // // // // // // // // //           break;
// // // // // // // // // // // // //         }
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //       attempts++;
// // // // // // // // // // // // //     }
    
// // // // // // // // // // // // //     usedPositions.push({ x, y, width: wordWidth });
// // // // // // // // // // // // //     wordPositions.push({ word, x, y });
// // // // // // // // // // // // //   }
  
// // // // // // // // // // // // //   // Draw each word at its random position
// // // // // // // // // // // // //   for (const { word, x, y } of wordPositions) {
// // // // // // // // // // // // //     const color = wordColors ? getRandom(colorPalette) : '#2C3E50';
    
// // // // // // // // // // // // //     ctx.save();
    
// // // // // // // // // // // // //     // Add white outline/shadow for readability
// // // // // // // // // // // // //     ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
// // // // // // // // // // // // //     ctx.shadowBlur = 6;
// // // // // // // // // // // // //     ctx.fillStyle = color;
// // // // // // // // // // // // //     ctx.font = `bold ${fontSize}px Arial`;
// // // // // // // // // // // // //     ctx.textAlign = 'left';
// // // // // // // // // // // // //     ctx.textBaseline = 'top';
// // // // // // // // // // // // //     ctx.fillText(word, x, y);
    
// // // // // // // // // // // // //     // Draw the actual text
// // // // // // // // // // // // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.05)';
// // // // // // // // // // // // //     ctx.shadowBlur = 2;
// // // // // // // // // // // // //     ctx.fillText(word, x, y);
    
// // // // // // // // // // // // //     ctx.restore();
// // // // // // // // // // // // //   }
  
// // // // // // // // // // // // //   // ---------------- WATERMARK ----------------
// // // // // // // // // // // // //   if (showWatermark) {
// // // // // // // // // // // // //     ctx.save();
// // // // // // // // // // // // //     ctx.globalAlpha = 0.6;
// // // // // // // // // // // // //     ctx.textAlign = "right";
// // // // // // // // // // // // //     ctx.textBaseline = "bottom";
    
// // // // // // // // // // // // //     ctx.font = "bold 14px Arial";
// // // // // // // // // // // // //     ctx.fillStyle = "#2C3E50";
// // // // // // // // // // // // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
// // // // // // // // // // // // //     ctx.shadowBlur = 2;
// // // // // // // // // // // // //     ctx.fillText(watermarkText, width - 15, height - 8);
    
// // // // // // // // // // // // //     ctx.restore();
// // // // // // // // // // // // //   }
  
// // // // // // // // // // // // //   // Generate options (all will be wrong except the correct count)
// // // // // // // // // // // // //   const generatedOptions = generateSimilarOptions(answer);
  
// // // // // // // // // // // // //   // -----------------------------------
// // // // // // // // // // // // //   // Return
// // // // // // // // // // // // //   // -----------------------------------
  
// // // // // // // // // // // // //   return {
// // // // // // // // // // // // //     question: `How many scrambled words contain the complete word "${targetWord}" in order?`,
// // // // // // // // // // // // //     options: generatedOptions,
// // // // // // // // // // // // //     answer: answer,
// // // // // // // // // // // // //     targetWord: targetWord,
// // // // // // // // // // // // //     totalWords: words.length,
// // // // // // // // // // // // //     containCount: containCount,
// // // // // // // // // // // // //     words: words,
// // // // // // // // // // // // //     image: canvas.toDataURL().split(",")[1]
// // // // // // // // // // // // //   };
// // // // // // // // // // // // // }




















// // // // // // // // // // // // import { createCanvas } from "canvas";

// // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // Helpers
// // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // function shuffle(arr) {
// // // // // // // // // // // //   return arr.sort(() => Math.random() - 0.5);
// // // // // // // // // // // // }

// // // // // // // // // // // // function getRandom(arr) {
// // // // // // // // // // // //   return arr[Math.floor(Math.random() * arr.length)];
// // // // // // // // // // // // }

// // // // // // // // // // // // function rand(min, max) {
// // // // // // // // // // // //   return Math.floor(Math.random() * (max - min + 1)) + min;
// // // // // // // // // // // // }

// // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // Generate Random Letters
// // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // function generateRandomLetters(count) {
// // // // // // // // // // // //   const letters = 'abcdefghijklmnopqrstuvwxyz';
// // // // // // // // // // // //   let result = '';
// // // // // // // // // // // //   for (let i = 0; i < count; i++) {
// // // // // // // // // // // //     result += letters[Math.floor(Math.random() * letters.length)];
// // // // // // // // // // // //   }
// // // // // // // // // // // //   return result;
// // // // // // // // // // // // }

// // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // Check if a word contains the target spelling in order
// // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // function containsSpellingInOrder(word, target) {
// // // // // // // // // // // //   let targetIndex = 0;
// // // // // // // // // // // //   for (let i = 0; i < word.length; i++) {
// // // // // // // // // // // //     if (word[i] === target[targetIndex]) {
// // // // // // // // // // // //       targetIndex++;
// // // // // // // // // // // //       if (targetIndex === target.length) {
// // // // // // // // // // // //         return true;
// // // // // // // // // // // //       }
// // // // // // // // // // // //     }
// // // // // // // // // // // //   }
// // // // // // // // // // // //   return false;
// // // // // // // // // // // // }

// // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // Check if a word contains ALL letters of target (any order)
// // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // function containsAllLetters(word, target) {
// // // // // // // // // // // //   const targetLetters = target.split('');
// // // // // // // // // // // //   const wordLetters = word.split('');
  
// // // // // // // // // // // //   for (const letter of targetLetters) {
// // // // // // // // // // // //     const index = wordLetters.indexOf(letter);
// // // // // // // // // // // //     if (index === -1) {
// // // // // // // // // // // //       return false;
// // // // // // // // // // // //     }
// // // // // // // // // // // //     wordLetters.splice(index, 1);
// // // // // // // // // // // //   }
// // // // // // // // // // // //   return true;
// // // // // // // // // // // // }

// // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // Generate a word with ALL target letters (scrambled) + extra letters
// // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // function generateWordWithAllTargetLetters(targetWord, extraLettersCount = 3) {
// // // // // // // // // // // //   const targetLetters = targetWord.split('');
// // // // // // // // // // // //   const shuffledTarget = shuffle([...targetLetters]);
  
// // // // // // // // // // // //   // Add random extra letters
// // // // // // // // // // // //   const extraLetters = generateRandomLetters(extraLettersCount).split('');
  
// // // // // // // // // // // //   // Combine and shuffle
// // // // // // // // // // // //   const combined = shuffle([...shuffledTarget, ...extraLetters]);
  
// // // // // // // // // // // //   return combined.join('');
// // // // // // // // // // // // }

// // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // Generate a word with MOST target letters (missing 1-2) + extra letters
// // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // function generateWordWithMostTargetLetters(targetWord, missingCount = 1) {
// // // // // // // // // // // //   const targetLetters = targetWord.split('');
  
// // // // // // // // // // // //   // Remove 1-2 letters from target
// // // // // // // // // // // //   const shuffledTarget = shuffle([...targetLetters]);
// // // // // // // // // // // //   const keepCount = shuffledTarget.length - missingCount;
// // // // // // // // // // // //   const keptLetters = shuffledTarget.slice(0, keepCount);
  
// // // // // // // // // // // //   // Add random extra letters
// // // // // // // // // // // //   const extraCount = rand(2, 5);
// // // // // // // // // // // //   const extraLetters = generateRandomLetters(extraCount).split('');
  
// // // // // // // // // // // //   // Combine and shuffle
// // // // // // // // // // // //   const combined = shuffle([...keptLetters, ...extraLetters]);
  
// // // // // // // // // // // //   return combined.join('');
// // // // // // // // // // // // }

// // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // Generate Words - 99% have ALL target letters scrambled
// // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // function generateWordsWithSpelling(targetWord, totalWords = 30) {
// // // // // // // // // // // //   const words = [];
  
// // // // // // // // // // // //   // 99% of words will contain ALL target letters (scrambled)
// // // // // // // // // // // //   const scrambledCount = Math.floor(totalWords * 0.99);
// // // // // // // // // // // //   const missingLettersCount = totalWords - scrambledCount;
  
// // // // // // // // // // // //   // Generate scrambled words with ALL target letters
// // // // // // // // // // // //   for (let i = 0; i < scrambledCount; i++) {
// // // // // // // // // // // //     let word = '';
// // // // // // // // // // // //     let attempts = 0;
// // // // // // // // // // // //     do {
// // // // // // // // // // // //       // Add 2-6 extra random letters to make it confusing
// // // // // // // // // // // //       const extraCount = rand(2, 6);
// // // // // // // // // // // //       word = generateWordWithAllTargetLetters(targetWord, extraCount);
// // // // // // // // // // // //       attempts++;
// // // // // // // // // // // //       if (attempts > 50) break;
// // // // // // // // // // // //     } while (word === targetWord || word.length < 4);
// // // // // // // // // // // //     words.push(word);
// // // // // // // // // // // //   }
  
// // // // // // // // // // // //   // Generate a few words that are missing 1-2 target letters (to trick the player)
// // // // // // // // // // // //   for (let i = 0; i < missingLettersCount; i++) {
// // // // // // // // // // // //     let word = '';
// // // // // // // // // // // //     let attempts = 0;
// // // // // // // // // // // //     do {
// // // // // // // // // // // //       const missingCount = rand(1, 2);
// // // // // // // // // // // //       word = generateWordWithMostTargetLetters(targetWord, missingCount);
// // // // // // // // // // // //       attempts++;
// // // // // // // // // // // //       if (attempts > 50) break;
// // // // // // // // // // // //     } while (word === targetWord || word.length < 4);
// // // // // // // // // // // //     words.push(word);
// // // // // // // // // // // //   }
  
// // // // // // // // // // // //   return shuffle(words);
// // // // // // // // // // // // }

// // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // Generate Similar Options
// // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // function generateSimilarOptions(correctAnswer) {
// // // // // // // // // // // //   const correctNum = parseInt(correctAnswer);
// // // // // // // // // // // //   const options = new Set();
// // // // // // // // // // // //   options.add(correctAnswer);
  
// // // // // // // // // // // //   const possibleDiffs = [-3, -2, -1, 1, 2, 3, -4, 4];
// // // // // // // // // // // //   const shuffledDiffs = shuffle([...possibleDiffs]);
  
// // // // // // // // // // // //   for (const diff of shuffledDiffs) {
// // // // // // // // // // // //     if (options.size >= 4) break;
// // // // // // // // // // // //     const candidate = correctNum + diff;
// // // // // // // // // // // //     if (candidate >= 0 && candidate <= 50) {
// // // // // // // // // // // //       const candidateStr = candidate.toString();
// // // // // // // // // // // //       if (!options.has(candidateStr)) {
// // // // // // // // // // // //         options.add(candidateStr);
// // // // // // // // // // // //       }
// // // // // // // // // // // //     }
// // // // // // // // // // // //   }
  
// // // // // // // // // // // //   const fallbackOptions = [];
// // // // // // // // // // // //   for (let i = 0; i <= 50; i++) {
// // // // // // // // // // // //     if (!options.has(i.toString())) {
// // // // // // // // // // // //       fallbackOptions.push(i.toString());
// // // // // // // // // // // //     }
// // // // // // // // // // // //   }
  
// // // // // // // // // // // //   while (options.size < 4 && fallbackOptions.length > 0) {
// // // // // // // // // // // //     const randomFallback = getRandom(fallbackOptions);
// // // // // // // // // // // //     options.add(randomFallback);
// // // // // // // // // // // //     const index = fallbackOptions.indexOf(randomFallback);
// // // // // // // // // // // //     if (index > -1) {
// // // // // // // // // // // //       fallbackOptions.splice(index, 1);
// // // // // // // // // // // //     }
// // // // // // // // // // // //   }
  
// // // // // // // // // // // //   return shuffle([...options]);
// // // // // // // // // // // // }

// // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // Get Random Target Word
// // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // function getRandomTargetWord() {
// // // // // // // // // // // //   const wordList = [
// // // // // // // // // // // //     "apple", "banana", "cherry", "dragon", "eagle", "forest", "garden", "harbor", 
// // // // // // // // // // // //     "island", "jungle", "knight", "lion", "mountain", "night", "ocean", "penguin", 
// // // // // // // // // // // //     "queen", "river", "storm", "tiger", "umbrella", "valley", "whale", "xenon", 
// // // // // // // // // // // //     "yacht", "zebra", "crystal", "diamond", "ember", "flame", "glacier", "horizon", 
// // // // // // // // // // // //     "ivory", "jade", "kiwi", "lavender", "moon", "nebula", "opal", "pearl", 
// // // // // // // // // // // //     "quartz", "rainbow", "sapphire", "twilight", "uranium", "vortex", "willow", 
// // // // // // // // // // // //     "xylem", "yew", "zenith", "blossom", "cascade", "drift", "echo", "frost", 
// // // // // // // // // // // //     "glimmer", "haze", "illusion", "jubilee", "kaleidoscope", "labyrinth", "mirage", 
// // // // // // // // // // // //     "nostalgia", "oasis", "paradox", "quasar", "reverie", "serenity", "tempest", 
// // // // // // // // // // // //     "utopia", "vivid", "whisper", "xenial", "yearning", "zephyr", "astronaut", 
// // // // // // // // // // // //     "breeze", "cosmos", "dream", "eclipse", "feather", "galaxy", "harmony", 
// // // // // // // // // // // //     "illuminate", "journey", "kindle", "lunar", "mystic", "nova", "orbit", "pulse", 
// // // // // // // // // // // //     "radiant", "solstice", "tranquil", "unique", "velocity", "wander", "yonder"
// // // // // // // // // // // //   ];
  
// // // // // // // // // // // //   return getRandom(wordList);
// // // // // // // // // // // // }

// // // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // // Main Function
// // // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // // export function generatePuzzle_word_search(options = {}) {
// // // // // // // // // // // //   // Get random target word if not provided
// // // // // // // // // // // //   const targetWord = options.targetWord || getRandomTargetWord();
  
// // // // // // // // // // // //   const {
// // // // // // // // // // // //     totalWords = 5,
// // // // // // // // // // // //     width = 400,
// // // // // // // // // // // //     height = 250,
// // // // // // // // // // // //     showWatermark = true,
// // // // // // // // // // // //     watermarkText = "Powered by AVI",
// // // // // // // // // // // //     wordColors = true
// // // // // // // // // // // //   } = options;
  
// // // // // // // // // // // //   // Generate words - 99% have ALL target letters scrambled
// // // // // // // // // // // //   const words = generateWordsWithSpelling(targetWord, totalWords);
  
// // // // // // // // // // // //   // Count how many words contain the complete spelling in order
// // // // // // // // // // // //   let containCount = 0;
// // // // // // // // // // // //   let containAllCount = 0;
  
// // // // // // // // // // // //   for (const word of words) {
// // // // // // // // // // // //     if (containsSpellingInOrder(word, targetWord)) {
// // // // // // // // // // // //       containCount++;
// // // // // // // // // // // //     }
// // // // // // // // // // // //     if (containsAllLetters(word, targetWord)) {
// // // // // // // // // // // //       containAllCount++;
// // // // // // // // // // // //     }
// // // // // // // // // // // //   }
  
// // // // // // // // // // // //   // Answer is the number of words that contain the spelling in order
// // // // // // // // // // // //   const answer = containCount.toString();
  
// // // // // // // // // // // //   // ---------------- CANVAS ----------------
// // // // // // // // // // // //   const canvas = createCanvas(width, height);
// // // // // // // // // // // //   const ctx = canvas.getContext("2d");
  
// // // // // // // // // // // //   // Background gradient
// // // // // // // // // // // //   const bgGradient = ctx.createLinearGradient(0, 0, width, height);
// // // // // // // // // // // //   bgGradient.addColorStop(0, '#f8f9fa');
// // // // // // // // // // // //   bgGradient.addColorStop(0.5, '#e9ecef');
// // // // // // // // // // // //   bgGradient.addColorStop(1, '#f8f9fa');
// // // // // // // // // // // //   ctx.fillStyle = bgGradient;
// // // // // // // // // // // //   ctx.fillRect(0, 0, width, height);
  
// // // // // // // // // // // //   // Decorative top border
// // // // // // // // // // // //   // const borderColors = ['#FF6B6B', '#FF9F43', '#FECA57', '#48DBFB', '#A29BFE', '#FD79A8'];
// // // // // // // // // // // //   // const borderGradient = ctx.createLinearGradient(0, 0, width, 0);
// // // // // // // // // // // //   // borderColors.forEach((color, i) => {
// // // // // // // // // // // //   //   const stop = i / borderColors.length;
// // // // // // // // // // // //   //   borderGradient.addColorStop(stop, color);
// // // // // // // // // // // //   // });
// // // // // // // // // // // //   // ctx.fillStyle = borderGradient;
// // // // // // // // // // // //   // ctx.fillRect(0, 0, width, 4);
  
// // // // // // // // // // // //   // Title with hint
// // // // // // // // // // // //   // ctx.save();
// // // // // // // // // // // //   // ctx.fillStyle = '#1a4053';
// // // // // // // // // // // //   // ctx.font = 'bold 16px Arial';
// // // // // // // // // // // //   // ctx.textAlign = 'center';
// // // // // // // // // // // //   // ctx.textBaseline = 'top';
// // // // // // // // // // // //   // ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
// // // // // // // // // // // //   // ctx.shadowBlur = 8;
// // // // // // // // // // // //   // ctx.fillText(`🔍 Find the words containing "${targetWord}" in order!`, width / 2, 8);
// // // // // // // // // // // //   // ctx.shadowBlur = 0;
// // // // // // // // // // // //   // ctx.restore();
  
// // // // // // // // // // // //   // Color palette for words
// // // // // // // // // // // //   const colorPalette = [
// // // // // // // // // // // //     '#2C3E50', '#E74C3C', '#2980B9', '#27AE60', '#8E44AD', '#F39C12',
// // // // // // // // // // // //     '#1ABC9C', '#D35400', '#3498DB', '#2ECC71', '#9B59B6', '#E67E22',
// // // // // // // // // // // //     '#16A085', '#C0392B', '#2471A3', '#229954', '#7D3C98', '#D4AC0D',
// // // // // // // // // // // //     '#138D75', '#B9770E', '#1A5276', '#1E8449', '#6C3483', '#A04000'
// // // // // // // // // // // //   ];
  
// // // // // // // // // // // //   // Spread words randomly across the image
// // // // // // // // // // // //   const startY = 50;
// // // // // // // // // // // //   const fontSize = 16;
// // // // // // // // // // // //   const margin = 20;
// // // // // // // // // // // //   const minDistance = 45;
  
// // // // // // // // // // // //   // Create random positions for each word
// // // // // // // // // // // //   const wordPositions = [];
// // // // // // // // // // // //   const usedPositions = [];
  
// // // // // // // // // // // //   for (let i = 0; i < words.length; i++) {
// // // // // // // // // // // //     const word = words[i];
// // // // // // // // // // // //     ctx.font = `bold ${fontSize}px Arial`;
// // // // // // // // // // // //     const metrics = ctx.measureText(word);
// // // // // // // // // // // //     const wordWidth = metrics.width;
    
// // // // // // // // // // // //     let x, y, attempts = 0;
// // // // // // // // // // // //     let overlap = true;
// // // // // // // // // // // //     const maxAttempts = 200;
    
// // // // // // // // // // // //     while (overlap && attempts < maxAttempts) {
// // // // // // // // // // // //       x = margin + Math.random() * (width - margin * 2 - wordWidth);
// // // // // // // // // // // //       y = startY + Math.random() * (height - startY - margin - 25);
      
// // // // // // // // // // // //       overlap = false;
// // // // // // // // // // // //       for (const pos of usedPositions) {
// // // // // // // // // // // //         const distance = Math.sqrt(
// // // // // // // // // // // //           Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2)
// // // // // // // // // // // //         );
// // // // // // // // // // // //         if (distance < minDistance) {
// // // // // // // // // // // //           overlap = true;
// // // // // // // // // // // //           break;
// // // // // // // // // // // //         }
// // // // // // // // // // // //         const horizontalOverlap = (x < pos.x + pos.width + 5) && (x + wordWidth + 5 > pos.x);
// // // // // // // // // // // //         const verticalOverlap = Math.abs(y - pos.y) < 20;
// // // // // // // // // // // //         if (horizontalOverlap && verticalOverlap) {
// // // // // // // // // // // //           overlap = true;
// // // // // // // // // // // //           break;
// // // // // // // // // // // //         }
// // // // // // // // // // // //       }
// // // // // // // // // // // //       attempts++;
// // // // // // // // // // // //     }
    
// // // // // // // // // // // //     usedPositions.push({ x, y, width: wordWidth });
// // // // // // // // // // // //     wordPositions.push({ word, x, y });
// // // // // // // // // // // //   }
  
// // // // // // // // // // // //   // Draw each word at its random position
// // // // // // // // // // // //   for (const { word, x, y } of wordPositions) {
// // // // // // // // // // // //     const color = wordColors ? getRandom(colorPalette) : '#2C3E50';
    
// // // // // // // // // // // //     ctx.save();
    
// // // // // // // // // // // //     // Add white outline/shadow for readability
// // // // // // // // // // // //     ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
// // // // // // // // // // // //     ctx.shadowBlur = 6;
// // // // // // // // // // // //     ctx.fillStyle = color;
// // // // // // // // // // // //     ctx.font = `bold ${fontSize}px Arial`;
// // // // // // // // // // // //     ctx.textAlign = 'left';
// // // // // // // // // // // //     ctx.textBaseline = 'top';
// // // // // // // // // // // //     ctx.fillText(word, x, y);
    
// // // // // // // // // // // //     // Draw the actual text
// // // // // // // // // // // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.05)';
// // // // // // // // // // // //     ctx.shadowBlur = 2;
// // // // // // // // // // // //     ctx.fillText(word, x, y);
    
// // // // // // // // // // // //     ctx.restore();
// // // // // // // // // // // //   }
  
// // // // // // // // // // // //   // ---------------- WATERMARK ----------------
// // // // // // // // // // // //   if (showWatermark) {
// // // // // // // // // // // //     ctx.save();
// // // // // // // // // // // //     ctx.globalAlpha = 0.6;
// // // // // // // // // // // //     ctx.textAlign = "right";
// // // // // // // // // // // //     ctx.textBaseline = "bottom";
    
// // // // // // // // // // // //     ctx.font = "bold 14px Arial";
// // // // // // // // // // // //     ctx.fillStyle = "#2C3E50";
// // // // // // // // // // // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
// // // // // // // // // // // //     ctx.shadowBlur = 2;
// // // // // // // // // // // //     ctx.fillText(watermarkText, width - 15, height - 8);
    
// // // // // // // // // // // //     ctx.restore();
// // // // // // // // // // // //   }
  
// // // // // // // // // // // //   // // Add instruction at bottom
// // // // // // // // // // // //   // ctx.fillStyle = '#e74c3c';
// // // // // // // // // // // //   // ctx.font = 'bold 13px Arial';
// // // // // // // // // // // //   // ctx.textAlign = 'center';
// // // // // // // // // // // //   // ctx.textBaseline = 'bottom';
// // // // // // // // // // // //   // ctx.globalAlpha = 0.7;
// // // // // // // // // // // //   // ctx.fillText(`💡 All words contain the letters of "${targetWord}" - find which have them IN ORDER!`, width / 2, height - 10);
// // // // // // // // // // // //   // ctx.globalAlpha = 1.0;
  
// // // // // // // // // // // //   // Generate options
// // // // // // // // // // // //   const generatedOptions = generateSimilarOptions(answer);
  
// // // // // // // // // // // //   // -----------------------------------
// // // // // // // // // // // //   // Return
// // // // // // // // // // // //   // -----------------------------------
  
// // // // // // // // // // // //   return {
// // // // // // // // // // // //     question: `How many scrambled words contain the complete word "${targetWord}" in the correct order?`,
// // // // // // // // // // // //     options: generatedOptions,
// // // // // // // // // // // //     answer: answer,
// // // // // // // // // // // //     targetWord: targetWord,
// // // // // // // // // // // //     totalWords: words.length,
// // // // // // // // // // // //     containCount: containCount,
// // // // // // // // // // // //     containAllCount: containAllCount,
// // // // // // // // // // // //     words: words,
// // // // // // // // // // // //     image: canvas.toDataURL().split(",")[1]
// // // // // // // // // // // //   };
// // // // // // // // // // // // }










// // // // // // // // // // // import { createCanvas } from "canvas";

// // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // Helpers
// // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // function shuffle(arr) {
// // // // // // // // // // //   return arr.sort(() => Math.random() - 0.5);
// // // // // // // // // // // }

// // // // // // // // // // // function getRandom(arr) {
// // // // // // // // // // //   return arr[Math.floor(Math.random() * arr.length)];
// // // // // // // // // // // }

// // // // // // // // // // // function rand(min, max) {
// // // // // // // // // // //   return Math.floor(Math.random() * (max - min + 1)) + min;
// // // // // // // // // // // }

// // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // Generate Random Letters
// // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // function generateRandomLetters(count) {
// // // // // // // // // // //   const letters = 'abcdefghijklmnopqrstuvwxyz';
// // // // // // // // // // //   let result = '';
// // // // // // // // // // //   for (let i = 0; i < count; i++) {
// // // // // // // // // // //     result += letters[Math.floor(Math.random() * letters.length)];
// // // // // // // // // // //   }
// // // // // // // // // // //   return result;
// // // // // // // // // // // }

// // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // Check if a word contains the target spelling in order
// // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // function containsSpellingInOrder(word, target) {
// // // // // // // // // // //   let targetIndex = 0;
// // // // // // // // // // //   for (let i = 0; i < word.length; i++) {
// // // // // // // // // // //     if (word[i] === target[targetIndex]) {
// // // // // // // // // // //       targetIndex++;
// // // // // // // // // // //       if (targetIndex === target.length) {
// // // // // // // // // // //         return true;
// // // // // // // // // // //       }
// // // // // // // // // // //     }
// // // // // // // // // // //   }
// // // // // // // // // // //   return false;
// // // // // // // // // // // }

// // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // Check if a word contains ALL letters of target (any order)
// // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // function containsAllLetters(word, target) {
// // // // // // // // // // //   const targetLetters = target.split('');
// // // // // // // // // // //   const wordLetters = word.split('');
  
// // // // // // // // // // //   for (const letter of targetLetters) {
// // // // // // // // // // //     const index = wordLetters.indexOf(letter);
// // // // // // // // // // //     if (index === -1) {
// // // // // // // // // // //       return false;
// // // // // // // // // // //     }
// // // // // // // // // // //     wordLetters.splice(index, 1);
// // // // // // // // // // //   }
// // // // // // // // // // //   return true;
// // // // // // // // // // // }

// // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // Generate a word with ALL target letters (scrambled) + extra letters
// // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // function generateWordWithAllTargetLetters(targetWord, extraLettersCount = 3) {
// // // // // // // // // // //   const targetLetters = targetWord.split('');
// // // // // // // // // // //   const shuffledTarget = shuffle([...targetLetters]);
  
// // // // // // // // // // //   // Add random extra letters
// // // // // // // // // // //   const extraLetters = generateRandomLetters(extraLettersCount).split('');
  
// // // // // // // // // // //   // Combine and shuffle
// // // // // // // // // // //   const combined = shuffle([...shuffledTarget, ...extraLetters]);
  
// // // // // // // // // // //   return combined.join('');
// // // // // // // // // // // }

// // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // Generate a word with MOST target letters (missing 1-2) + extra letters
// // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // function generateWordWithMostTargetLetters(targetWord, missingCount = 1) {
// // // // // // // // // // //   const targetLetters = targetWord.split('');
  
// // // // // // // // // // //   // Remove 1-2 letters from target
// // // // // // // // // // //   const shuffledTarget = shuffle([...targetLetters]);
// // // // // // // // // // //   const keepCount = shuffledTarget.length - missingCount;
// // // // // // // // // // //   const keptLetters = shuffledTarget.slice(0, keepCount);
  
// // // // // // // // // // //   // Add random extra letters
// // // // // // // // // // //   const extraCount = rand(2, 5);
// // // // // // // // // // //   const extraLetters = generateRandomLetters(extraCount).split('');
  
// // // // // // // // // // //   // Combine and shuffle
// // // // // // // // // // //   const combined = shuffle([...keptLetters, ...extraLetters]);
  
// // // // // // // // // // //   return combined.join('');
// // // // // // // // // // // }

// // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // Generate Words - 99% have ALL target letters scrambled
// // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // function generateWordsWithSpelling(targetWord, totalWords = 10) {
// // // // // // // // // // //   const words = [];
  
// // // // // // // // // // //   // 99% of words will contain ALL target letters (scrambled)
// // // // // // // // // // //   const scrambledCount = Math.floor(totalWords * 0.99);
// // // // // // // // // // //   const missingLettersCount = totalWords - scrambledCount;
  
// // // // // // // // // // //   // Generate scrambled words with ALL target letters
// // // // // // // // // // //   for (let i = 0; i < scrambledCount; i++) {
// // // // // // // // // // //     let word = '';
// // // // // // // // // // //     let attempts = 0;
// // // // // // // // // // //     do {
// // // // // // // // // // //       // Add 2-6 extra random letters to make it confusing
// // // // // // // // // // //       const extraCount = rand(2, 6);
// // // // // // // // // // //       word = generateWordWithAllTargetLetters(targetWord, extraCount);
// // // // // // // // // // //       attempts++;
// // // // // // // // // // //       if (attempts > 50) break;
// // // // // // // // // // //     } while (word === targetWord || word.length < 4);
// // // // // // // // // // //     words.push(word);
// // // // // // // // // // //   }
  
// // // // // // // // // // //   // Generate a few words that are missing 1-2 target letters (to trick the player)
// // // // // // // // // // //   for (let i = 0; i < missingLettersCount; i++) {
// // // // // // // // // // //     let word = '';
// // // // // // // // // // //     let attempts = 0;
// // // // // // // // // // //     do {
// // // // // // // // // // //       const missingCount = rand(1, 2);
// // // // // // // // // // //       word = generateWordWithMostTargetLetters(targetWord, missingCount);
// // // // // // // // // // //       attempts++;
// // // // // // // // // // //       if (attempts > 50) break;
// // // // // // // // // // //     } while (word === targetWord || word.length < 4);
// // // // // // // // // // //     words.push(word);
// // // // // // // // // // //   }
  
// // // // // // // // // // //   return shuffle(words);
// // // // // // // // // // // }

// // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // Generate Similar Options
// // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // function generateSimilarOptions(correctAnswer) {
// // // // // // // // // // //   const correctNum = parseInt(correctAnswer);
// // // // // // // // // // //   const options = new Set();
// // // // // // // // // // //   options.add(correctAnswer);
  
// // // // // // // // // // //   const possibleDiffs = [-3, -2, -1, 1, 2, 3, -4, 4];
// // // // // // // // // // //   const shuffledDiffs = shuffle([...possibleDiffs]);
  
// // // // // // // // // // //   for (const diff of shuffledDiffs) {
// // // // // // // // // // //     if (options.size >= 4) break;
// // // // // // // // // // //     const candidate = correctNum + diff;
// // // // // // // // // // //     if (candidate >= 0 && candidate <= 50) {
// // // // // // // // // // //       const candidateStr = candidate.toString();
// // // // // // // // // // //       if (!options.has(candidateStr)) {
// // // // // // // // // // //         options.add(candidateStr);
// // // // // // // // // // //       }
// // // // // // // // // // //     }
// // // // // // // // // // //   }
  
// // // // // // // // // // //   const fallbackOptions = [];
// // // // // // // // // // //   for (let i = 0; i <= 50; i++) {
// // // // // // // // // // //     if (!options.has(i.toString())) {
// // // // // // // // // // //       fallbackOptions.push(i.toString());
// // // // // // // // // // //     }
// // // // // // // // // // //   }
  
// // // // // // // // // // //   while (options.size < 4 && fallbackOptions.length > 0) {
// // // // // // // // // // //     const randomFallback = getRandom(fallbackOptions);
// // // // // // // // // // //     options.add(randomFallback);
// // // // // // // // // // //     const index = fallbackOptions.indexOf(randomFallback);
// // // // // // // // // // //     if (index > -1) {
// // // // // // // // // // //       fallbackOptions.splice(index, 1);
// // // // // // // // // // //     }
// // // // // // // // // // //   }
  
// // // // // // // // // // //   return shuffle([...options]);
// // // // // // // // // // // }

// // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // Get Random Target Word
// // // // // // // // // // // // -----------------------------------

// // // // // // // // // // // function getRandomTargetWord() {

// // // // // // // // // // //   const wordList = [
// // // // // // // // // // //     "hdks", "busnd", "hsnl", "kksy", "sravi", "avi", "hsncs", "jsnsr", "jyec", "asef", "svbg", "ncue", "mhdt"
// // // // // // // // // // //   ]
  
// // // // // // // // // // //   return getRandom(wordList);
  
// // // // // // // // // // // }

// // // // // // // // // // // // -----------------------------------
// // // // // // // // // // // // Main Function - FIXED with proper totalWords handling
// // // // // // // // // // // // -----------------------------------


// // // // // // // // // // // export function generatePuzzle_word_search(options = {}) {
// // // // // // // // // // //   // Get random target word if not provided
// // // // // // // // // // //   const targetWord = options.targetWord || getRandomTargetWord();
  
// // // // // // // // // // //   // Destructure with defaults - totalWords now has proper default
// // // // // // // // // // //   const {
// // // // // // // // // // //     totalWords = 10,        // ✅ DEFAULT VALUE ADDED
// // // // // // // // // // //     width = 400,
// // // // // // // // // // //     height = 250,
// // // // // // // // // // //     showWatermark = true,
// // // // // // // // // // //     watermarkText = "Powered by AVI",
// // // // // // // // // // //     wordColors = true
// // // // // // // // // // //   } = options;
  
// // // // // // // // // // //   // ✅ LOG THE RECEIVED PARAMETERS
// // // // // // // // // // //   // console.log('📊 Generating puzzle with:');
// // // // // // // // // // //   // console.log(`  targetWord: "${targetWord}"`);
// // // // // // // // // // //   // console.log(`  totalWords: ${totalWords}`);
// // // // // // // // // // //   // console.log(`  width: ${width}`);
// // // // // // // // // // //   // console.log(`  height: ${height}`);
  
// // // // // // // // // // //   // ✅ PASS totalWords to the generation function
// // // // // // // // // // //   const words = generateWordsWithSpelling(targetWord, totalWords);
  
// // // // // // // // // // //   // Count how many words contain the complete spelling in order
// // // // // // // // // // //   let containCount = 0;
// // // // // // // // // // //   let containAllCount = 0;
  
// // // // // // // // // // //   for (const word of words) {
// // // // // // // // // // //     if (containsSpellingInOrder(word, targetWord)) {
// // // // // // // // // // //       containCount++;
// // // // // // // // // // //     }
// // // // // // // // // // //     if (containsAllLetters(word, targetWord)) {
// // // // // // // // // // //       containAllCount++;
// // // // // // // // // // //     }
// // // // // // // // // // //   }
  
// // // // // // // // // // //   // Answer is the number of words that contain the spelling in order
// // // // // // // // // // //   const answer = containCount.toString();
  
// // // // // // // // // // //   // ---------------- CANVAS ----------------
// // // // // // // // // // //   const canvas = createCanvas(width, height);
// // // // // // // // // // //   const ctx = canvas.getContext("2d");
  
// // // // // // // // // // //   // Background gradient
// // // // // // // // // // //   const bgGradient = ctx.createLinearGradient(0, 0, width, height);
// // // // // // // // // // //   bgGradient.addColorStop(0, '#f8f9fa');
// // // // // // // // // // //   bgGradient.addColorStop(0.5, '#e9ecef');
// // // // // // // // // // //   bgGradient.addColorStop(1, '#f8f9fa');
// // // // // // // // // // //   ctx.fillStyle = bgGradient;
// // // // // // // // // // //   ctx.fillRect(0, 0, width, height);
  
// // // // // // // // // // //   // Decorative top border
// // // // // // // // // // //   // const borderColors = ['#FF6B6B', '#FF9F43', '#FECA57', '#48DBFB', '#A29BFE', '#FD79A8'];
// // // // // // // // // // //   // const borderGradient = ctx.createLinearGradient(0, 0, width, 0);
// // // // // // // // // // //   // borderColors.forEach((color, i) => {
// // // // // // // // // // //   //   const stop = i / borderColors.length;
// // // // // // // // // // //   //   borderGradient.addColorStop(stop, color);
// // // // // // // // // // //   // });
// // // // // // // // // // //   // ctx.fillStyle = borderGradient;
// // // // // // // // // // //   // ctx.fillRect(0, 0, width, 4);
// // // // // // // // // // //   // Title with hint
// // // // // // // // // // //   // ctx.save();
// // // // // // // // // // //   // ctx.fillStyle = '#1a4053';
// // // // // // // // // // //   // ctx.font = 'bold 16px Arial';
// // // // // // // // // // //   // ctx.textAlign = 'center';
// // // // // // // // // // //   // ctx.textBaseline = 'top';
// // // // // // // // // // //   // ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
// // // // // // // // // // //   // ctx.shadowBlur = 8;
// // // // // // // // // // //   // ctx.fillText(`🔍 Find the words containing "${targetWord}" in order!`, width / 2, 8);
// // // // // // // // // // //   // ctx.shadowBlur = 0;
// // // // // // // // // // //   // ctx.restore();
  
// // // // // // // // // // //   // Color palette for words
// // // // // // // // // // //   const colorPalette = [
// // // // // // // // // // //     '#2C3E50', '#E74C3C', '#2980B9', '#27AE60', '#8E44AD', '#F39C12',
// // // // // // // // // // //     '#1ABC9C', '#D35400', '#3498DB', '#2ECC71', '#9B59B6', '#E67E22',
// // // // // // // // // // //     '#16A085', '#C0392B', '#2471A3', '#229954', '#7D3C98', '#D4AC0D',
// // // // // // // // // // //     '#138D75', '#B9770E', '#1A5276', '#1E8449', '#6C3483', '#A04000'
// // // // // // // // // // //   ];
  
// // // // // // // // // // //   // Spread words randomly across the image
// // // // // // // // // // //   const startY = 50;
// // // // // // // // // // //   const fontSize = Math.min(16, Math.max(12, 300 / totalWords)); // Dynamic font size
// // // // // // // // // // //   const margin = 20;
// // // // // // // // // // //   const minDistance = Math.max(35, 50 - totalWords); // Dynamic spacing
  
// // // // // // // // // // //   // Create random positions for each word
// // // // // // // // // // //   const wordPositions = [];
// // // // // // // // // // //   const usedPositions = [];
  
// // // // // // // // // // //   for (let i = 0; i < words.length; i++) {
// // // // // // // // // // //     const word = words[i];
// // // // // // // // // // //     ctx.font = `bold ${fontSize}px Arial`;
// // // // // // // // // // //     const metrics = ctx.measureText(word);
// // // // // // // // // // //     const wordWidth = metrics.width;
    
// // // // // // // // // // //     let x, y, attempts = 0;
// // // // // // // // // // //     let overlap = true;
// // // // // // // // // // //     const maxAttempts = 200;
    
// // // // // // // // // // //     while (overlap && attempts < maxAttempts) {
// // // // // // // // // // //       x = margin + Math.random() * (width - margin * 2 - wordWidth);
// // // // // // // // // // //       y = startY + Math.random() * (height - startY - margin - 25);
      
// // // // // // // // // // //       overlap = false;
// // // // // // // // // // //       for (const pos of usedPositions) {
// // // // // // // // // // //         const distance = Math.sqrt(
// // // // // // // // // // //           Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2)
// // // // // // // // // // //         );
// // // // // // // // // // //         if (distance < minDistance) {
// // // // // // // // // // //           overlap = true;
// // // // // // // // // // //           break;
// // // // // // // // // // //         }
// // // // // // // // // // //         const horizontalOverlap = (x < pos.x + pos.width + 5) && (x + wordWidth + 5 > pos.x);
// // // // // // // // // // //         const verticalOverlap = Math.abs(y - pos.y) < 20;
// // // // // // // // // // //         if (horizontalOverlap && verticalOverlap) {
// // // // // // // // // // //           overlap = true;
// // // // // // // // // // //           break;
// // // // // // // // // // //         }
// // // // // // // // // // //       }
// // // // // // // // // // //       attempts++;
// // // // // // // // // // //     }
    
// // // // // // // // // // //     usedPositions.push({ x, y, width: wordWidth });
// // // // // // // // // // //     wordPositions.push({ word, x, y });
// // // // // // // // // // //   }
  
// // // // // // // // // // //   // Draw each word at its random position
// // // // // // // // // // //   for (const { word, x, y } of wordPositions) {
// // // // // // // // // // //     const color = wordColors ? getRandom(colorPalette) : '#2C3E50';
    
// // // // // // // // // // //     ctx.save();
    
// // // // // // // // // // //     // Add white outline/shadow for readability
// // // // // // // // // // //     ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
// // // // // // // // // // //     ctx.shadowBlur = 6;
// // // // // // // // // // //     ctx.fillStyle = color;
// // // // // // // // // // //     ctx.font = `bold ${fontSize}px Arial`;
// // // // // // // // // // //     ctx.textAlign = 'left';
// // // // // // // // // // //     ctx.textBaseline = 'top';
// // // // // // // // // // //     ctx.fillText(word, x, y);
    
// // // // // // // // // // //     // Draw the actual text
// // // // // // // // // // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.05)';
// // // // // // // // // // //     ctx.shadowBlur = 2;
// // // // // // // // // // //     ctx.fillText(word, x, y);
    
// // // // // // // // // // //     ctx.restore();
// // // // // // // // // // //   }


  
// // // // // // // // // // //   // ---------------- WATERMARK ----------------
// // // // // // // // // // //   if (showWatermark) {
// // // // // // // // // // //     ctx.save();
// // // // // // // // // // //     ctx.globalAlpha = 0.6;
// // // // // // // // // // //     ctx.textAlign = "right";
// // // // // // // // // // //     ctx.textBaseline = "bottom";
    
// // // // // // // // // // //     ctx.font = "bold 14px Arial";
// // // // // // // // // // //     ctx.fillStyle = "#232425";
// // // // // // // // // // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
// // // // // // // // // // //     ctx.shadowBlur = 2;
// // // // // // // // // // //     ctx.fillText(watermarkText, width - 15, height - 8);
    
// // // // // // // // // // //     ctx.restore();
// // // // // // // // // // //   }
  
// // // // // // // // // // //   // Add instruction at bottom
// // // // // // // // // // //   // ctx.fillStyle = '#e74c3c';
// // // // // // // // // // //   // ctx.font = 'bold 13px Arial';
// // // // // // // // // // //   // ctx.textAlign = 'center';
// // // // // // // // // // //   // ctx.textBaseline = 'bottom';
// // // // // // // // // // //   // ctx.globalAlpha = 0.7;
// // // // // // // // // // //   // ctx.fillText(`💡 ${totalWords} words total - All contain the letters of "${targetWord}" - find which have them IN ORDER!`, width / 2, height - 10);
// // // // // // // // // // //   // ctx.globalAlpha = 1.0;
  
// // // // // // // // // // //   // Generate options
// // // // // // // // // // //   const generatedOptions = generateSimilarOptions(answer);
  
// // // // // // // // // // //   // -----------------------------------
// // // // // // // // // // //   // Return
// // // // // // // // // // //   // -----------------------------------
  
// // // // // // // // // // //   return {
// // // // // // // // // // //     question : `Count how many words below contain the letter sequence '${targetWord}'`,
// // // // // // // // // // //     options: generatedOptions,
// // // // // // // // // // //     answer: answer,
// // // // // // // // // // //     targetWord: targetWord,
// // // // // // // // // // //     totalWords: totalWords,  // ✅ Return the actual totalWords used
// // // // // // // // // // //     containCount: containCount,
// // // // // // // // // // //     containAllCount: containAllCount,
// // // // // // // // // // //     words: words,
// // // // // // // // // // //     image: canvas.toDataURL().split(",")[1]
// // // // // // // // // // //   };
// // // // // // // // // // // }


















// // // // // // // // // // import { createCanvas } from "canvas";

// // // // // // // // // // // -----------------------------------
// // // // // // // // // // // Helpers
// // // // // // // // // // // -----------------------------------

// // // // // // // // // // function shuffle(arr) {
// // // // // // // // // //   return arr.sort(() => Math.random() - 0.5);
// // // // // // // // // // }

// // // // // // // // // // function getRandom(arr) {
// // // // // // // // // //   return arr[Math.floor(Math.random() * arr.length)];
// // // // // // // // // // }

// // // // // // // // // // function rand(min, max) {
// // // // // // // // // //   return Math.floor(Math.random() * (max - min + 1)) + min;
// // // // // // // // // // }

// // // // // // // // // // // -----------------------------------
// // // // // // // // // // // Generate Random Letters
// // // // // // // // // // // -----------------------------------

// // // // // // // // // // function generateRandomLetters(count) {
// // // // // // // // // //   const letters = 'abcdefghijklmnopqrstuvwxyz';
// // // // // // // // // //   let result = '';
// // // // // // // // // //   for (let i = 0; i < count; i++) {
// // // // // // // // // //     result += letters[Math.floor(Math.random() * letters.length)];
// // // // // // // // // //   }
// // // // // // // // // //   return result;
// // // // // // // // // // }

// // // // // // // // // // // -----------------------------------
// // // // // // // // // // // Check if a word contains the target spelling in order
// // // // // // // // // // // -----------------------------------

// // // // // // // // // // function containsSpellingInOrder(word, target) {
// // // // // // // // // //   let targetIndex = 0;
// // // // // // // // // //   for (let i = 0; i < word.length; i++) {
// // // // // // // // // //     if (word[i] === target[targetIndex]) {
// // // // // // // // // //       targetIndex++;
// // // // // // // // // //       if (targetIndex === target.length) {
// // // // // // // // // //         return true;
// // // // // // // // // //       }
// // // // // // // // // //     }
// // // // // // // // // //   }
// // // // // // // // // //   return false;
// // // // // // // // // // }

// // // // // // // // // // // -----------------------------------
// // // // // // // // // // // Check if a word contains ALL letters of target (any order)
// // // // // // // // // // // -----------------------------------

// // // // // // // // // // function containsAllLetters(word, target) {
// // // // // // // // // //   const targetLetters = target.split('');
// // // // // // // // // //   const wordLetters = word.split('');
  
// // // // // // // // // //   for (const letter of targetLetters) {
// // // // // // // // // //     const index = wordLetters.indexOf(letter);
// // // // // // // // // //     if (index === -1) {
// // // // // // // // // //       return false;
// // // // // // // // // //     }
// // // // // // // // // //     wordLetters.splice(index, 1);
// // // // // // // // // //   }
// // // // // // // // // //   return true;
// // // // // // // // // // }

// // // // // // // // // // // -----------------------------------
// // // // // // // // // // // Generate a word that CONTAINS the target spelling in order
// // // // // // // // // // // -----------------------------------

// // // // // // // // // // function generateWordWithSpellingInOrder(targetWord, extraLettersCount = 3) {
// // // // // // // // // //   // Split the target word into individual letters
// // // // // // // // // //   const targetLetters = targetWord.split('');
  
// // // // // // // // // //   // Create a word that has the target letters in order, with extra letters inserted
// // // // // // // // // //   let word = '';
  
// // // // // // // // // //   // Insert random letters between the target letters
// // // // // // // // // //   for (let i = 0; i < targetLetters.length; i++) {
// // // // // // // // // //     // Add random extra letters before this target letter
// // // // // // // // // //     const beforeCount = rand(0, 2);
// // // // // // // // // //     for (let j = 0; j < beforeCount; j++) {
// // // // // // // // // //       word += generateRandomLetters(1);
// // // // // // // // // //     }
// // // // // // // // // //     // Add the target letter
// // // // // // // // // //     word += targetLetters[i];
// // // // // // // // // //   }
  
// // // // // // // // // //   // Add some random letters at the end
// // // // // // // // // //   const endCount = rand(0, 3);
// // // // // // // // // //   word += generateRandomLetters(endCount);
  
// // // // // // // // // //   // Add some random letters at the beginning
// // // // // // // // // //   const startCount = rand(0, 2);
// // // // // // // // // //   word = generateRandomLetters(startCount) + word;
  
// // // // // // // // // //   return word;
// // // // // // // // // // }

// // // // // // // // // // // -----------------------------------
// // // // // // // // // // // Generate a word with ALL target letters (scrambled) + extra letters
// // // // // // // // // // // -----------------------------------

// // // // // // // // // // function generateWordWithAllTargetLetters(targetWord, extraLettersCount = 3) {
// // // // // // // // // //   const targetLetters = targetWord.split('');
// // // // // // // // // //   const shuffledTarget = shuffle([...targetLetters]);
  
// // // // // // // // // //   // Add random extra letters
// // // // // // // // // //   const extraLetters = generateRandomLetters(extraLettersCount).split('');
  
// // // // // // // // // //   // Combine and shuffle
// // // // // // // // // //   const combined = shuffle([...shuffledTarget, ...extraLetters]);
  
// // // // // // // // // //   return combined.join('');
// // // // // // // // // // }

// // // // // // // // // // // -----------------------------------
// // // // // // // // // // // Generate Words - MUST contain the spelling in order
// // // // // // // // // // // -----------------------------------

// // // // // // // // // // function generateWordsWithSpelling(targetWord, totalWords = 10) {
// // // // // // // // // //   const words = [];
  
// // // // // // // // // //   // ALL words must contain the target spelling in order
// // // // // // // // // //   for (let i = 0; i < totalWords; i++) {
// // // // // // // // // //     let word = '';
// // // // // // // // // //     let attempts = 0;
// // // // // // // // // //     do {
// // // // // // // // // //       // Generate a word that contains the target spelling in order
// // // // // // // // // //       // Add 2-6 extra random letters to make it confusing
// // // // // // // // // //       const extraCount = rand(2, 6);
// // // // // // // // // //       word = generateWordWithSpellingInOrder(targetWord, extraCount);
// // // // // // // // // //       attempts++;
// // // // // // // // // //       if (attempts > 50) break;
// // // // // // // // // //     } while (word === targetWord || word.length < 4);
// // // // // // // // // //     words.push(word);
// // // // // // // // // //   }
  
// // // // // // // // // //   return shuffle(words);
// // // // // // // // // // }

// // // // // // // // // // // -----------------------------------
// // // // // // // // // // // Generate Similar Options
// // // // // // // // // // // -----------------------------------

// // // // // // // // // // function generateSimilarOptions(correctAnswer) {
// // // // // // // // // //   const correctNum = parseInt(correctAnswer);
// // // // // // // // // //   const options = new Set();
// // // // // // // // // //   options.add(correctAnswer);
  
// // // // // // // // // //   const possibleDiffs = [-3, -2, -1, 1, 2, 3, -4, 4];
// // // // // // // // // //   const shuffledDiffs = shuffle([...possibleDiffs]);
  
// // // // // // // // // //   for (const diff of shuffledDiffs) {
// // // // // // // // // //     if (options.size >= 4) break;
// // // // // // // // // //     const candidate = correctNum + diff;
// // // // // // // // // //     if (candidate >= 0 && candidate <= 50) {
// // // // // // // // // //       const candidateStr = candidate.toString();
// // // // // // // // // //       if (!options.has(candidateStr)) {
// // // // // // // // // //         options.add(candidateStr);
// // // // // // // // // //       }
// // // // // // // // // //     }
// // // // // // // // // //   }
  
// // // // // // // // // //   const fallbackOptions = [];
// // // // // // // // // //   for (let i = 0; i <= 50; i++) {
// // // // // // // // // //     if (!options.has(i.toString())) {
// // // // // // // // // //       fallbackOptions.push(i.toString());
// // // // // // // // // //     }
// // // // // // // // // //   }
  
// // // // // // // // // //   while (options.size < 4 && fallbackOptions.length > 0) {
// // // // // // // // // //     const randomFallback = getRandom(fallbackOptions);
// // // // // // // // // //     options.add(randomFallback);
// // // // // // // // // //     const index = fallbackOptions.indexOf(randomFallback);
// // // // // // // // // //     if (index > -1) {
// // // // // // // // // //       fallbackOptions.splice(index, 1);
// // // // // // // // // //     }
// // // // // // // // // //   }
  
// // // // // // // // // //   return shuffle([...options]);
// // // // // // // // // // }

// // // // // // // // // // // -----------------------------------
// // // // // // // // // // // Get Random Target Word (EXCLUDING "trlnshk")
// // // // // // // // // // // -----------------------------------

// // // // // // // // // // function getRandomTargetWord() {
// // // // // // // // // //   const wordList = [
// // // // // // // // // //     "hdks", "busnd", "hsnl", "kksy", "sravi", "avi", "hsncs", "jsnsr", "jyec", "asef", "svbg", "ncue", "mhdt"
// // // // // // // // // //   ];
  
// // // // // // // // // //   // Filter out "trlnshk" if it's in the list
// // // // // // // // // //   const filteredList = wordList.filter(word => word !== "trlnshk");
  
// // // // // // // // // //   return getRandom(filteredList);
// // // // // // // // // // }

// // // // // // // // // // // -----------------------------------
// // // // // // // // // // // Main Function - FIXED with proper totalWords handling
// // // // // // // // // // // -----------------------------------

// // // // // // // // // // export function generatePuzzle_word_search(options = {}) {
// // // // // // // // // //   // Get random target word if not provided
// // // // // // // // // //   const targetWord = options.targetWord || getRandomTargetWord();
  
// // // // // // // // // //   // Destructure with defaults - totalWords now has proper default
// // // // // // // // // //   const {
// // // // // // // // // //     totalWords = 10,        // ✅ DEFAULT VALUE ADDED
// // // // // // // // // //     width = 400,
// // // // // // // // // //     height = 250,
// // // // // // // // // //     showWatermark = true,
// // // // // // // // // //     watermarkText = "Powered by AVI",
// // // // // // // // // //     wordColors = true
// // // // // // // // // //   } = options;
  
// // // // // // // // // //   // ✅ LOG THE RECEIVED PARAMETERS
// // // // // // // // // //   // console.log('📊 Generating puzzle with:');
// // // // // // // // // //   // console.log(`  targetWord: "${targetWord}"`);
// // // // // // // // // //   // console.log(`  totalWords: ${totalWords}`);
// // // // // // // // // //   // console.log(`  width: ${width}`);
// // // // // // // // // //   // console.log(`  height: ${height}`);
  
// // // // // // // // // //   // ✅ PASS totalWords to the generation function
// // // // // // // // // //   const words = generateWordsWithSpelling(targetWord, totalWords);
  
// // // // // // // // // //   // Count how many words contain the complete spelling in order
// // // // // // // // // //   let containCount = 0;
// // // // // // // // // //   let containAllCount = 0;
  
// // // // // // // // // //   for (const word of words) {
// // // // // // // // // //     if (containsSpellingInOrder(word, targetWord)) {
// // // // // // // // // //       containCount++;
// // // // // // // // // //     }
// // // // // // // // // //     if (containsAllLetters(word, targetWord)) {
// // // // // // // // // //       containAllCount++;
// // // // // // // // // //     }
// // // // // // // // // //   }
  
// // // // // // // // // //   // Answer is the number of words that contain the spelling in order
// // // // // // // // // //   const answer = containCount.toString();
  
// // // // // // // // // //   // ---------------- CANVAS ----------------
// // // // // // // // // //   const canvas = createCanvas(width, height);
// // // // // // // // // //   const ctx = canvas.getContext("2d");
  
// // // // // // // // // //   // Background gradient
// // // // // // // // // //   const bgGradient = ctx.createLinearGradient(0, 0, width, height);
// // // // // // // // // //   bgGradient.addColorStop(0, '#f8f9fa');
// // // // // // // // // //   bgGradient.addColorStop(0.5, '#e9ecef');
// // // // // // // // // //   bgGradient.addColorStop(1, '#f8f9fa');
// // // // // // // // // //   ctx.fillStyle = bgGradient;
// // // // // // // // // //   ctx.fillRect(0, 0, width, height);
  
// // // // // // // // // //   // Color palette for words
// // // // // // // // // //   const colorPalette = [
// // // // // // // // // //     '#2C3E50', '#E74C3C', '#2980B9', '#27AE60', '#8E44AD', '#F39C12',
// // // // // // // // // //     '#1ABC9C', '#D35400', '#3498DB', '#2ECC71', '#9B59B6', '#E67E22',
// // // // // // // // // //     '#16A085', '#C0392B', '#2471A3', '#229954', '#7D3C98', '#D4AC0D',
// // // // // // // // // //     '#138D75', '#B9770E', '#1A5276', '#1E8449', '#6C3483', '#A04000'
// // // // // // // // // //   ];
  
// // // // // // // // // //   // Spread words randomly across the image
// // // // // // // // // //   const startY = 40;
// // // // // // // // // //   const fontSize = Math.min(16, Math.max(12, 300 / totalWords));
// // // // // // // // // //   const margin = 15;
// // // // // // // // // //   const minDistance = Math.max(30, 50 - totalWords);
  
// // // // // // // // // //   // Create random positions for each word
// // // // // // // // // //   const wordPositions = [];
// // // // // // // // // //   const usedPositions = [];
  
// // // // // // // // // //   for (let i = 0; i < words.length; i++) {
// // // // // // // // // //     const word = words[i];
// // // // // // // // // //     ctx.font = `bold ${fontSize}px Arial`;
// // // // // // // // // //     const metrics = ctx.measureText(word);
// // // // // // // // // //     const wordWidth = metrics.width;
    
// // // // // // // // // //     let x, y, attempts = 0;
// // // // // // // // // //     let overlap = true;
// // // // // // // // // //     const maxAttempts = 200;
    
// // // // // // // // // //     while (overlap && attempts < maxAttempts) {
// // // // // // // // // //       x = margin + Math.random() * (width - margin * 2 - wordWidth);
// // // // // // // // // //       y = startY + Math.random() * (height - startY - margin - 25);
      
// // // // // // // // // //       overlap = false;
// // // // // // // // // //       for (const pos of usedPositions) {
// // // // // // // // // //         const distance = Math.sqrt(
// // // // // // // // // //           Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2)
// // // // // // // // // //         );
// // // // // // // // // //         if (distance < minDistance) {
// // // // // // // // // //           overlap = true;
// // // // // // // // // //           break;
// // // // // // // // // //         }
// // // // // // // // // //         const horizontalOverlap = (x < pos.x + pos.width + 5) && (x + wordWidth + 5 > pos.x);
// // // // // // // // // //         const verticalOverlap = Math.abs(y - pos.y) < 20;
// // // // // // // // // //         if (horizontalOverlap && verticalOverlap) {
// // // // // // // // // //           overlap = true;
// // // // // // // // // //           break;
// // // // // // // // // //         }
// // // // // // // // // //       }
// // // // // // // // // //       attempts++;
// // // // // // // // // //     }
    
// // // // // // // // // //     usedPositions.push({ x, y, width: wordWidth });
// // // // // // // // // //     wordPositions.push({ word, x, y });
// // // // // // // // // //   }
  
// // // // // // // // // //   // Draw each word at its random position
// // // // // // // // // //   for (const { word, x, y } of wordPositions) {
// // // // // // // // // //     const color = wordColors ? getRandom(colorPalette) : '#2C3E50';
    
// // // // // // // // // //     ctx.save();
    
// // // // // // // // // //     // Add white outline/shadow for readability
// // // // // // // // // //     ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
// // // // // // // // // //     ctx.shadowBlur = 6;
// // // // // // // // // //     ctx.fillStyle = color;
// // // // // // // // // //     ctx.font = `bold ${fontSize}px Arial`;
// // // // // // // // // //     ctx.textAlign = 'left';
// // // // // // // // // //     ctx.textBaseline = 'top';
// // // // // // // // // //     ctx.fillText(word, x, y);
    
// // // // // // // // // //     // Draw the actual text
// // // // // // // // // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.05)';
// // // // // // // // // //     ctx.shadowBlur = 2;
// // // // // // // // // //     ctx.fillText(word, x, y);
    
// // // // // // // // // //     ctx.restore();
// // // // // // // // // //   }
  
// // // // // // // // // //   // ---------------- WATERMARK ----------------
// // // // // // // // // //   if (showWatermark) {
// // // // // // // // // //     ctx.save();
// // // // // // // // // //     ctx.globalAlpha = 0.6;
// // // // // // // // // //     ctx.textAlign = "right";
// // // // // // // // // //     ctx.textBaseline = "bottom";
    
// // // // // // // // // //     ctx.font = "bold 14px Arial";
// // // // // // // // // //     ctx.fillStyle = "#232425";
// // // // // // // // // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
// // // // // // // // // //     ctx.shadowBlur = 2;
// // // // // // // // // //     ctx.fillText(watermarkText, width - 15, height - 8);
    
// // // // // // // // // //     ctx.restore();
// // // // // // // // // //   }
  
// // // // // // // // // //   // Generate options
// // // // // // // // // //   const generatedOptions = generateSimilarOptions(answer);
  
// // // // // // // // // //   // -----------------------------------
// // // // // // // // // //   // Return
// // // // // // // // // //   // -----------------------------------
  
// // // // // // // // // //   return {
// // // // // // // // // //     question: `Count how many words below contain the letter sequence '${targetWord}' in order`,
// // // // // // // // // //     options: generatedOptions,
// // // // // // // // // //     answer: answer,
// // // // // // // // // //     targetWord: targetWord,
// // // // // // // // // //     totalWords: totalWords,
// // // // // // // // // //     containCount: containCount,
// // // // // // // // // //     containAllCount: containAllCount,
// // // // // // // // // //     words: words,
// // // // // // // // // //     image: canvas.toDataURL().split(",")[1]
// // // // // // // // // //   };
// // // // // // // // // // }

















// // // // // // // // // import { createCanvas } from "canvas";

// // // // // // // // // // -----------------------------------
// // // // // // // // // // Helpers
// // // // // // // // // // -----------------------------------

// // // // // // // // // function shuffle(arr) {
// // // // // // // // //   return arr.sort(() => Math.random() - 0.5);
// // // // // // // // // }

// // // // // // // // // function getRandom(arr) {
// // // // // // // // //   return arr[Math.floor(Math.random() * arr.length)];
// // // // // // // // // }

// // // // // // // // // function rand(min, max) {
// // // // // // // // //   return Math.floor(Math.random() * (max - min + 1)) + min;
// // // // // // // // // }

// // // // // // // // // // -----------------------------------
// // // // // // // // // // Generate Random Letters
// // // // // // // // // // -----------------------------------

// // // // // // // // // function generateRandomLetters(count) {
// // // // // // // // //   const letters = 'abcdefghijklmnopqrstuvwxyz';
// // // // // // // // //   let result = '';
// // // // // // // // //   for (let i = 0; i < count; i++) {
// // // // // // // // //     result += letters[Math.floor(Math.random() * letters.length)];
// // // // // // // // //   }
// // // // // // // // //   return result;
// // // // // // // // // }

// // // // // // // // // // -----------------------------------
// // // // // // // // // // Check if a word contains the target spelling in order
// // // // // // // // // // -----------------------------------

// // // // // // // // // function containsSpellingInOrder(word, target) {
// // // // // // // // //   let targetIndex = 0;
// // // // // // // // //   for (let i = 0; i < word.length; i++) {
// // // // // // // // //     if (word[i] === target[targetIndex]) {
// // // // // // // // //       targetIndex++;
// // // // // // // // //       if (targetIndex === target.length) {
// // // // // // // // //         return true;
// // // // // // // // //       }
// // // // // // // // //     }
// // // // // // // // //   }
// // // // // // // // //   return false;
// // // // // // // // // }

// // // // // // // // // // -----------------------------------
// // // // // // // // // // Check if a word contains ALL letters of target (any order)
// // // // // // // // // // -----------------------------------

// // // // // // // // // function containsAllLetters(word, target) {
// // // // // // // // //   const targetLetters = target.split('');
// // // // // // // // //   const wordLetters = word.split('');
  
// // // // // // // // //   for (const letter of targetLetters) {
// // // // // // // // //     const index = wordLetters.indexOf(letter);
// // // // // // // // //     if (index === -1) {
// // // // // // // // //       return false;
// // // // // // // // //     }
// // // // // // // // //     wordLetters.splice(index, 1);
// // // // // // // // //   }
// // // // // // // // //   return true;
// // // // // // // // // }

// // // // // // // // // // -----------------------------------
// // // // // // // // // // Generate a word that CONTAINS the target spelling in order
// // // // // // // // // // Example: if target is "hsnl", it might generate "whsnlda"
// // // // // // // // // // -----------------------------------

// // // // // // // // // function generateWordWithSpellingInOrder(targetWord, extraLettersCount = 3) {
// // // // // // // // //   const targetLetters = targetWord.split('');
// // // // // // // // //   let word = '';
  
// // // // // // // // //   // Add random letters before each target letter
// // // // // // // // //   for (let i = 0; i < targetLetters.length; i++) {
// // // // // // // // //     // Add 0-2 random letters before this target letter
// // // // // // // // //     const beforeCount = rand(0, 2);
// // // // // // // // //     word += generateRandomLetters(beforeCount);
// // // // // // // // //     // Add the target letter
// // // // // // // // //     word += targetLetters[i];
// // // // // // // // //   }
  
// // // // // // // // //   // Add random letters at the beginning and end
// // // // // // // // //   const startCount = rand(1, 3);
// // // // // // // // //   const endCount = rand(1, 3);
// // // // // // // // //   word = generateRandomLetters(startCount) + word + generateRandomLetters(endCount);
  
// // // // // // // // //   return word;
// // // // // // // // // }

// // // // // // // // // // -----------------------------------
// // // // // // // // // // Generate Words - ALL contain spelling in order
// // // // // // // // // // -----------------------------------

// // // // // // // // // function generateWordsWithSpelling(targetWord, totalWords = 5) {
// // // // // // // // //   const words = [];
  
// // // // // // // // //   // ALL words must contain the target spelling in order
// // // // // // // // //   for (let i = 0; i < totalWords; i++) {
// // // // // // // // //     let word = '';
// // // // // // // // //     let attempts = 0;
// // // // // // // // //     do {
// // // // // // // // //       const extraCount = rand(2, 5);
// // // // // // // // //       word = generateWordWithSpellingInOrder(targetWord, extraCount);
// // // // // // // // //       attempts++;
// // // // // // // // //       if (attempts > 50) break;
// // // // // // // // //     } while (word === targetWord || word.length < 5);
// // // // // // // // //     words.push(word);
// // // // // // // // //   }
  
// // // // // // // // //   return shuffle(words);
// // // // // // // // // }

// // // // // // // // // // -----------------------------------
// // // // // // // // // // Generate Similar Options
// // // // // // // // // // -----------------------------------

// // // // // // // // // function generateSimilarOptions(correctAnswer) {
// // // // // // // // //   const correctNum = parseInt(correctAnswer);
// // // // // // // // //   const options = new Set();
// // // // // // // // //   options.add(correctAnswer);
  
// // // // // // // // //   const possibleDiffs = [-2, -1, 1, 2, -3, 3];
// // // // // // // // //   const shuffledDiffs = shuffle([...possibleDiffs]);
  
// // // // // // // // //   for (const diff of shuffledDiffs) {
// // // // // // // // //     if (options.size >= 5) break;
// // // // // // // // //     const candidate = correctNum + diff;
// // // // // // // // //     if (candidate >= 0 && candidate <= 10) {
// // // // // // // // //       const candidateStr = candidate.toString();
// // // // // // // // //       if (!options.has(candidateStr)) {
// // // // // // // // //         options.add(candidateStr);
// // // // // // // // //       }
// // // // // // // // //     }
// // // // // // // // //   }
  
// // // // // // // // //   const fallbackOptions = [];
// // // // // // // // //   for (let i = 0; i <= 10; i++) {
// // // // // // // // //     if (!options.has(i.toString())) {
// // // // // // // // //       fallbackOptions.push(i.toString());
// // // // // // // // //     }
// // // // // // // // //   }
  
// // // // // // // // //   while (options.size < 5 && fallbackOptions.length > 0) {
// // // // // // // // //     const randomFallback = getRandom(fallbackOptions);
// // // // // // // // //     options.add(randomFallback);
// // // // // // // // //     const index = fallbackOptions.indexOf(randomFallback);
// // // // // // // // //     if (index > -1) {
// // // // // // // // //       fallbackOptions.splice(index, 1);
// // // // // // // // //     }
// // // // // // // // //   }
  
// // // // // // // // //   return shuffle([...options]);
// // // // // // // // // }

// // // // // // // // // // -----------------------------------
// // // // // // // // // // Get Random Target Word (EXCLUDING "trlnshk")
// // // // // // // // // // -----------------------------------

// // // // // // // // // function getRandomTargetWord() {
// // // // // // // // //   const wordList = [
// // // // // // // // //     "hdks", "busnd", "hsnl", "kksy", "sravi", "avi", "hsncs", "jsnsr", "jyec", "asef", "svbg", "ncue", "mhdt"
// // // // // // // // //   ];
  
// // // // // // // // //   // Filter out "trlnshk" if it's in the list
// // // // // // // // //   const filteredList = wordList.filter(word => word !== "trlnshk");
  
// // // // // // // // //   return getRandom(filteredList);
// // // // // // // // // }

// // // // // // // // // // -----------------------------------
// // // // // // // // // // Main Function
// // // // // // // // // // -----------------------------------

// // // // // // // // // export function generatePuzzle_word_search(options = {}) {
// // // // // // // // //   // Get random target word if not provided
// // // // // // // // //   const targetWord = options.targetWord || getRandomTargetWord();
  
// // // // // // // // //   // Destructure with defaults - default is now 5 words
// // // // // // // // //   const {
// // // // // // // // //     totalWords = 5,         // ✅ DEFAULT IS NOW 5
// // // // // // // // //     width = 400,
// // // // // // // // //     height = 250,
// // // // // // // // //     showWatermark = true,
// // // // // // // // //     watermarkText = "Powered by AVI",
// // // // // // // // //     wordColors = true
// // // // // // // // //   } = options;
  
// // // // // // // // //   // Generate 5 words that ALL contain the spelling in order
// // // // // // // // //   const words = generateWordsWithSpelling(targetWord, totalWords);
  
// // // // // // // // //   // Count how many words contain the complete spelling in order (should be 5)
// // // // // // // // //   let containCount = 0;
// // // // // // // // //   let containAllCount = 0;
  
// // // // // // // // //   for (const word of words) {
// // // // // // // // //     if (containsSpellingInOrder(word, targetWord)) {
// // // // // // // // //       containCount++;
// // // // // // // // //     }
// // // // // // // // //     if (containsAllLetters(word, targetWord)) {
// // // // // // // // //       containAllCount++;
// // // // // // // // //     }
// // // // // // // // //   }
  
// // // // // // // // //   // Answer is the number of words that contain the spelling in order
// // // // // // // // //   const answer = containCount.toString();
  
// // // // // // // // //   // ---------------- CANVAS ----------------
// // // // // // // // //   const canvas = createCanvas(width, height);
// // // // // // // // //   const ctx = canvas.getContext("2d");
  
// // // // // // // // //   // Background gradient
// // // // // // // // //   const bgGradient = ctx.createLinearGradient(0, 0, width, height);
// // // // // // // // //   bgGradient.addColorStop(0, '#f8f9fa');
// // // // // // // // //   bgGradient.addColorStop(0.5, '#e9ecef');
// // // // // // // // //   bgGradient.addColorStop(1, '#f8f9fa');
// // // // // // // // //   ctx.fillStyle = bgGradient;
// // // // // // // // //   ctx.fillRect(0, 0, width, height);
  
// // // // // // // // //   // Color palette for words
// // // // // // // // //   const colorPalette = [
// // // // // // // // //     '#2C3E50', '#E74C3C', '#2980B9', '#27AE60', '#8E44AD', '#F39C12',
// // // // // // // // //     '#1ABC9C', '#D35400', '#3498DB', '#2ECC71', '#9B59B6', '#E67E22',
// // // // // // // // //     '#16A085', '#C0392B', '#2471A3', '#229954', '#7D3C98', '#D4AC0D'
// // // // // // // // //   ];
  
// // // // // // // // //   // Spread words randomly across the image
// // // // // // // // //   const startY = 35;
// // // // // // // // //   const fontSize = Math.min(18, Math.max(14, 350 / totalWords));
// // // // // // // // //   const margin = 15;
// // // // // // // // //   const minDistance = Math.max(30, 55 - totalWords);
  
// // // // // // // // //   // Create random positions for each word
// // // // // // // // //   const wordPositions = [];
// // // // // // // // //   const usedPositions = [];
  
// // // // // // // // //   for (let i = 0; i < words.length; i++) {
// // // // // // // // //     const word = words[i];
// // // // // // // // //     ctx.font = `bold ${fontSize}px Arial`;
// // // // // // // // //     const metrics = ctx.measureText(word);
// // // // // // // // //     const wordWidth = metrics.width;
    
// // // // // // // // //     let x, y, attempts = 0;
// // // // // // // // //     let overlap = true;
// // // // // // // // //     const maxAttempts = 200;
    
// // // // // // // // //     while (overlap && attempts < maxAttempts) {
// // // // // // // // //       x = margin + Math.random() * (width - margin * 2 - wordWidth);
// // // // // // // // //       y = startY + Math.random() * (height - startY - margin - 25);
      
// // // // // // // // //       overlap = false;
// // // // // // // // //       for (const pos of usedPositions) {
// // // // // // // // //         const distance = Math.sqrt(
// // // // // // // // //           Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2)
// // // // // // // // //         );
// // // // // // // // //         if (distance < minDistance) {
// // // // // // // // //           overlap = true;
// // // // // // // // //           break;
// // // // // // // // //         }
// // // // // // // // //         const horizontalOverlap = (x < pos.x + pos.width + 5) && (x + wordWidth + 5 > pos.x);
// // // // // // // // //         const verticalOverlap = Math.abs(y - pos.y) < 20;
// // // // // // // // //         if (horizontalOverlap && verticalOverlap) {
// // // // // // // // //           overlap = true;
// // // // // // // // //           break;
// // // // // // // // //         }
// // // // // // // // //       }
// // // // // // // // //       attempts++;
// // // // // // // // //     }
    
// // // // // // // // //     usedPositions.push({ x, y, width: wordWidth });
// // // // // // // // //     wordPositions.push({ word, x, y });
// // // // // // // // //   }
  
// // // // // // // // //   // Draw each word at its random position
// // // // // // // // //   for (const { word, x, y } of wordPositions) {
// // // // // // // // //     const color = wordColors ? getRandom(colorPalette) : '#2C3E50';
    
// // // // // // // // //     ctx.save();
    
// // // // // // // // //     // Add white outline/shadow for readability
// // // // // // // // //     ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
// // // // // // // // //     ctx.shadowBlur = 6;
// // // // // // // // //     ctx.fillStyle = color;
// // // // // // // // //     ctx.font = `bold ${fontSize}px Arial`;
// // // // // // // // //     ctx.textAlign = 'left';
// // // // // // // // //     ctx.textBaseline = 'top';
// // // // // // // // //     ctx.fillText(word, x, y);
    
// // // // // // // // //     // Draw the actual text
// // // // // // // // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.05)';
// // // // // // // // //     ctx.shadowBlur = 2;
// // // // // // // // //     ctx.fillText(word, x, y);
    
// // // // // // // // //     ctx.restore();
// // // // // // // // //   }
  
// // // // // // // // //   // ---------------- WATERMARK ----------------
// // // // // // // // //   if (showWatermark) {
// // // // // // // // //     ctx.save();
// // // // // // // // //     ctx.globalAlpha = 0.6;
// // // // // // // // //     ctx.textAlign = "right";
// // // // // // // // //     ctx.textBaseline = "bottom";
    
// // // // // // // // //     ctx.font = "bold 14px Arial";
// // // // // // // // //     ctx.fillStyle = "#232425";
// // // // // // // // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
// // // // // // // // //     ctx.shadowBlur = 2;
// // // // // // // // //     ctx.fillText(watermarkText, width - 15, height - 8);
    
// // // // // // // // //     ctx.restore();
// // // // // // // // //   }
  
// // // // // // // // //   // Generate options (5 options)
// // // // // // // // //   const generatedOptions = generateSimilarOptions(answer);
  
// // // // // // // // //   // -----------------------------------
// // // // // // // // //   // Return
// // // // // // // // //   // -----------------------------------
  
// // // // // // // // //   return {
// // // // // // // // //     question: `Count how many words below contain the letter sequence '${targetWord}' in order`,
// // // // // // // // //     options: generatedOptions,
// // // // // // // // //     answer: answer,
// // // // // // // // //     targetWord: targetWord,
// // // // // // // // //     totalWords: totalWords,
// // // // // // // // //     containCount: containCount,
// // // // // // // // //     containAllCount: containAllCount,
// // // // // // // // //     words: words,
// // // // // // // // //     image: canvas.toDataURL().split(",")[1]
// // // // // // // // //   };
// // // // // // // // // }

















// // // // // // // // import { createCanvas } from "canvas";

// // // // // // // // // -----------------------------------
// // // // // // // // // Helpers
// // // // // // // // // -----------------------------------

// // // // // // // // function shuffle(arr) {
// // // // // // // //   return arr.sort(() => Math.random() - 0.5);
// // // // // // // // }

// // // // // // // // function getRandom(arr) {
// // // // // // // //   return arr[Math.floor(Math.random() * arr.length)];
// // // // // // // // }

// // // // // // // // function rand(min, max) {
// // // // // // // //   return Math.floor(Math.random() * (max - min + 1)) + min;
// // // // // // // // }

// // // // // // // // // -----------------------------------
// // // // // // // // // Generate Random Letters
// // // // // // // // // -----------------------------------

// // // // // // // // function generateRandomLetters(count) {
// // // // // // // //   const letters = 'abcdefghijklmnopqrstuvwxyz';
// // // // // // // //   let result = '';
// // // // // // // //   for (let i = 0; i < count; i++) {
// // // // // // // //     result += letters[Math.floor(Math.random() * letters.length)];
// // // // // // // //   }
// // // // // // // //   return result;
// // // // // // // // }

// // // // // // // // // -----------------------------------
// // // // // // // // // Check if a word contains the target spelling in order
// // // // // // // // // -----------------------------------

// // // // // // // // function containsSpellingInOrder(word, target) {
// // // // // // // //   let targetIndex = 0;
// // // // // // // //   for (let i = 0; i < word.length; i++) {
// // // // // // // //     if (word[i] === target[targetIndex]) {
// // // // // // // //       targetIndex++;
// // // // // // // //       if (targetIndex === target.length) {
// // // // // // // //         return true;
// // // // // // // //       }
// // // // // // // //     }
// // // // // // // //   }
// // // // // // // //   return false;
// // // // // // // // }

// // // // // // // // // -----------------------------------
// // // // // // // // // Generate a word that CONTAINS the target spelling in order
// // // // // // // // // Example: if target is "hsnl", it might generate "whsnlda"
// // // // // // // // // -----------------------------------

// // // // // // // // function generateWordWithSpellingInOrder(targetWord) {
// // // // // // // //   const targetLetters = targetWord.split('');
// // // // // // // //   let word = '';
  
// // // // // // // //   // Add random letters before each target letter
// // // // // // // //   for (let i = 0; i < targetLetters.length; i++) {
// // // // // // // //     // Add 0-2 random letters before this target letter
// // // // // // // //     const beforeCount = rand(0, 2);
// // // // // // // //     word += generateRandomLetters(beforeCount);
// // // // // // // //     // Add the target letter
// // // // // // // //     word += targetLetters[i];
// // // // // // // //   }
  
// // // // // // // //   // Add random letters at the beginning and end
// // // // // // // //   const startCount = rand(1, 3);
// // // // // // // //   const endCount = rand(1, 3);
// // // // // // // //   word = generateRandomLetters(startCount) + word + generateRandomLetters(endCount);
  
// // // // // // // //   return word;
// // // // // // // // }

// // // // // // // // // -----------------------------------
// // // // // // // // // Generate Words - ALL contain spelling in order
// // // // // // // // // -----------------------------------

// // // // // // // // function generateWordsWithSpelling(targetWord, totalWords = 5) {
// // // // // // // //   const words = [];
  
// // // // // // // //   // ALL words MUST contain the target spelling in order
// // // // // // // //   for (let i = 0; i < totalWords; i++) {
// // // // // // // //     let word = '';
// // // // // // // //     let attempts = 0;
// // // // // // // //     do {
// // // // // // // //       word = generateWordWithSpellingInOrder(targetWord);
// // // // // // // //       attempts++;
// // // // // // // //       if (attempts > 50) break;
// // // // // // // //     } while (word === targetWord || word.length < 5);
// // // // // // // //     words.push(word);
// // // // // // // //   }
  
// // // // // // // //   return shuffle(words);
// // // // // // // // }

// // // // // // // // // -----------------------------------
// // // // // // // // // Generate Options - ALWAYS has correct answer
// // // // // // // // // -----------------------------------

// // // // // // // // function generateOptions() {
// // // // // // // //   // The answer is ALWAYS 5 (since all 5 words contain the spelling)
// // // // // // // //   const correctAnswer = "5";
// // // // // // // //   const options = new Set();
// // // // // // // //   options.add(correctAnswer);
  
// // // // // // // //   // Add wrong options (4, 6, 7)
// // // // // // // //   const wrongOptions = ["4", "6", "7", "3", "8", "2"];
// // // // // // // //   const shuffledWrong = shuffle(wrongOptions);
  
// // // // // // // //   let index = 0;
// // // // // // // //   while (options.size < 5 && index < shuffledWrong.length) {
// // // // // // // //     options.add(shuffledWrong[index]);
// // // // // // // //     index++;
// // // // // // // //   }
  
// // // // // // // //   return shuffle([...options]);
// // // // // // // // }

// // // // // // // // // -----------------------------------
// // // // // // // // // Get Random Target Word (EXCLUDING "trlnshk")
// // // // // // // // // -----------------------------------

// // // // // // // // function getRandomTargetWord() {
// // // // // // // //   const wordList = [
// // // // // // // //     "hdks", "busnd", "hsnl", "kksy", "sravi", "avi", "hsncs", "jsnsr", "jyec", "asef", "svbg", "ncue", "mhdt"
// // // // // // // //   ];
  
// // // // // // // //   // Filter out "trlnshk" if it's in the list
// // // // // // // //   const filteredList = wordList.filter(word => word !== "trlnshk");
  
// // // // // // // //   return getRandom(filteredList);
// // // // // // // // }

// // // // // // // // // -----------------------------------
// // // // // // // // // Main Function
// // // // // // // // // -----------------------------------

// // // // // // // // export function generatePuzzle_word_search(options = {}) {
// // // // // // // //   // Get random target word if not provided
// // // // // // // //   const targetWord = options.targetWord || getRandomTargetWord();
  
// // // // // // // //   // Destructure with defaults - ALWAYS 5 words
// // // // // // // //   const {
// // // // // // // //     totalWords = 5,         // FIXED to 5
// // // // // // // //     width = 400,
// // // // // // // //     height = 250,
// // // // // // // //     showWatermark = true,
// // // // // // // //     watermarkText = "Powered by AVI",
// // // // // // // //     wordColors = true
// // // // // // // //   } = options;
  
// // // // // // // //   // Generate 5 words that ALL contain the spelling in order
// // // // // // // //   const words = generateWordsWithSpelling(targetWord, totalWords);
  
// // // // // // // //   // Count how many words contain the spelling (will ALWAYS be 5)
// // // // // // // //   let containCount = 0;
  
// // // // // // // //   for (const word of words) {
// // // // // // // //     if (containsSpellingInOrder(word, targetWord)) {
// // // // // // // //       containCount++;
// // // // // // // //     }
// // // // // // // //   }
  
// // // // // // // //   // ANSWER IS ALWAYS 5 (since ALL words contain the spelling)
// // // // // // // //   const answer = "5";
  
// // // // // // // //   // ---------------- CANVAS ----------------
// // // // // // // //   const canvas = createCanvas(width, height);
// // // // // // // //   const ctx = canvas.getContext("2d");
  
// // // // // // // //   // Background gradient
// // // // // // // //   const bgGradient = ctx.createLinearGradient(0, 0, width, height);
// // // // // // // //   bgGradient.addColorStop(0, '#f8f9fa');
// // // // // // // //   bgGradient.addColorStop(0.5, '#e9ecef');
// // // // // // // //   bgGradient.addColorStop(1, '#f8f9fa');
// // // // // // // //   ctx.fillStyle = bgGradient;
// // // // // // // //   ctx.fillRect(0, 0, width, height);
  
// // // // // // // //   // Color palette for words
// // // // // // // //   const colorPalette = [
// // // // // // // //     '#2C3E50', '#E74C3C', '#2980B9', '#27AE60', '#8E44AD', '#F39C12',
// // // // // // // //     '#1ABC9C', '#D35400', '#3498DB', '#2ECC71', '#9B59B6', '#E67E22',
// // // // // // // //     '#16A085', '#C0392B', '#2471A3', '#229954', '#7D3C98', '#D4AC0D'
// // // // // // // //   ];
  
// // // // // // // //   // Spread words randomly across the image
// // // // // // // //   const startY = 35;
// // // // // // // //   const fontSize = Math.min(18, Math.max(14, 350 / totalWords));
// // // // // // // //   const margin = 15;
// // // // // // // //   const minDistance = Math.max(30, 55 - totalWords);
  
// // // // // // // //   // Create random positions for each word
// // // // // // // //   const wordPositions = [];
// // // // // // // //   const usedPositions = [];
  
// // // // // // // //   for (let i = 0; i < words.length; i++) {
// // // // // // // //     const word = words[i];
// // // // // // // //     ctx.font = `bold ${fontSize}px Arial`;
// // // // // // // //     const metrics = ctx.measureText(word);
// // // // // // // //     const wordWidth = metrics.width;
    
// // // // // // // //     let x, y, attempts = 0;
// // // // // // // //     let overlap = true;
// // // // // // // //     const maxAttempts = 200;
    
// // // // // // // //     while (overlap && attempts < maxAttempts) {
// // // // // // // //       x = margin + Math.random() * (width - margin * 2 - wordWidth);
// // // // // // // //       y = startY + Math.random() * (height - startY - margin - 25);
      
// // // // // // // //       overlap = false;
// // // // // // // //       for (const pos of usedPositions) {
// // // // // // // //         const distance = Math.sqrt(
// // // // // // // //           Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2)
// // // // // // // //         );
// // // // // // // //         if (distance < minDistance) {
// // // // // // // //           overlap = true;
// // // // // // // //           break;
// // // // // // // //         }
// // // // // // // //         const horizontalOverlap = (x < pos.x + pos.width + 5) && (x + wordWidth + 5 > pos.x);
// // // // // // // //         const verticalOverlap = Math.abs(y - pos.y) < 20;
// // // // // // // //         if (horizontalOverlap && verticalOverlap) {
// // // // // // // //           overlap = true;
// // // // // // // //           break;
// // // // // // // //         }
// // // // // // // //       }
// // // // // // // //       attempts++;
// // // // // // // //     }
    
// // // // // // // //     usedPositions.push({ x, y, width: wordWidth });
// // // // // // // //     wordPositions.push({ word, x, y });
// // // // // // // //   }
  
// // // // // // // //   // Draw each word at its random position
// // // // // // // //   for (const { word, x, y } of wordPositions) {
// // // // // // // //     const color = wordColors ? getRandom(colorPalette) : '#2C3E50';
    
// // // // // // // //     ctx.save();
    
// // // // // // // //     // Add white outline/shadow for readability
// // // // // // // //     ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
// // // // // // // //     ctx.shadowBlur = 6;
// // // // // // // //     ctx.fillStyle = color;
// // // // // // // //     ctx.font = `bold ${fontSize}px Arial`;
// // // // // // // //     ctx.textAlign = 'left';
// // // // // // // //     ctx.textBaseline = 'top';
// // // // // // // //     ctx.fillText(word, x, y);
    
// // // // // // // //     // Draw the actual text
// // // // // // // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.05)';
// // // // // // // //     ctx.shadowBlur = 2;
// // // // // // // //     ctx.fillText(word, x, y);
    
// // // // // // // //     ctx.restore();
// // // // // // // //   }
  
// // // // // // // //   // ---------------- WATERMARK ----------------
// // // // // // // //   if (showWatermark) {
// // // // // // // //     ctx.save();
// // // // // // // //     ctx.globalAlpha = 0.6;
// // // // // // // //     ctx.textAlign = "right";
// // // // // // // //     ctx.textBaseline = "bottom";
    
// // // // // // // //     ctx.font = "bold 14px Arial";
// // // // // // // //     ctx.fillStyle = "#232425";
// // // // // // // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
// // // // // // // //     ctx.shadowBlur = 2;
// // // // // // // //     ctx.fillText(watermarkText, width - 15, height - 8);
    
// // // // // // // //     ctx.restore();
// // // // // // // //   }
  
// // // // // // // //   // Generate options - ALWAYS includes "5" as correct answer
// // // // // // // //   const generatedOptions = generateOptions();
  
// // // // // // // //   // -----------------------------------
// // // // // // // //   // Return
// // // // // // // //   // -----------------------------------
  
// // // // // // // //   return {
// // // // // // // //     question: `Count how many words below contain the letter sequence '${targetWord}' in order`,
// // // // // // // //     options: generatedOptions,
// // // // // // // //     answer: answer,  // ALWAYS "5"
// // // // // // // //     targetWord: targetWord,
// // // // // // // //     totalWords: totalWords,
// // // // // // // //     containCount: containCount,  // ALWAYS 5
// // // // // // // //     words: words,
// // // // // // // //     image: canvas.toDataURL().split(",")[1]
// // // // // // // //   };
// // // // // // // // }

















// // // // // // // import { createCanvas } from "canvas";

// // // // // // // // -----------------------------------
// // // // // // // // Helpers
// // // // // // // // -----------------------------------

// // // // // // // function shuffle(arr) {
// // // // // // //   return arr.sort(() => Math.random() - 0.5);
// // // // // // // }

// // // // // // // function getRandom(arr) {
// // // // // // //   return arr[Math.floor(Math.random() * arr.length)];
// // // // // // // }

// // // // // // // function rand(min, max) {
// // // // // // //   return Math.floor(Math.random() * (max - min + 1)) + min;
// // // // // // // }

// // // // // // // // -----------------------------------
// // // // // // // // Generate Random Letters
// // // // // // // // -----------------------------------

// // // // // // // function generateRandomLetters(count) {
// // // // // // //   const letters = 'abcdefghijklmnopqrstuvwxyz';
// // // // // // //   let result = '';
// // // // // // //   for (let i = 0; i < count; i++) {
// // // // // // //     result += letters[Math.floor(Math.random() * letters.length)];
// // // // // // //   }
// // // // // // //   return result;
// // // // // // // }

// // // // // // // // -----------------------------------
// // // // // // // // Check if a word contains the target spelling in order
// // // // // // // // -----------------------------------

// // // // // // // function containsSpellingInOrder(word, target) {
// // // // // // //   let targetIndex = 0;
// // // // // // //   for (let i = 0; i < word.length; i++) {
// // // // // // //     if (word[i] === target[targetIndex]) {
// // // // // // //       targetIndex++;
// // // // // // //       if (targetIndex === target.length) {
// // // // // // //         return true;
// // // // // // //       }
// // // // // // //     }
// // // // // // //   }
// // // // // // //   return false;
// // // // // // // }

// // // // // // // // -----------------------------------
// // // // // // // // Generate a word that CONTAINS the target spelling in order
// // // // // // // // Example: if target is "hsnl", it might generate "whsnlda"
// // // // // // // // -----------------------------------

// // // // // // // function generateWordWithSpellingInOrder(targetWord) {
// // // // // // //   const targetLetters = targetWord.split('');
// // // // // // //   let word = '';
  
// // // // // // //   // Add random letters before each target letter
// // // // // // //   for (let i = 0; i < targetLetters.length; i++) {
// // // // // // //     const beforeCount = rand(0, 2);
// // // // // // //     word += generateRandomLetters(beforeCount);
// // // // // // //     word += targetLetters[i];
// // // // // // //   }
  
// // // // // // //   // Add random letters at the beginning and end
// // // // // // //   const startCount = rand(1, 3);
// // // // // // //   const endCount = rand(1, 3);
// // // // // // //   word = generateRandomLetters(startCount) + word + generateRandomLetters(endCount);
  
// // // // // // //   return word;
// // // // // // // }

// // // // // // // // -----------------------------------
// // // // // // // // Generate a word that does NOT contain the spelling in order
// // // // // // // // but may contain some letters
// // // // // // // // -----------------------------------

// // // // // // // function generateWordWithoutSpelling(targetWord) {
// // // // // // //   const targetLetters = targetWord.split('');
// // // // // // //   let word = '';
  
// // // // // // //   // Get random letters, but make sure it doesn't have the full spelling in order
// // // // // // //   let attempts = 0;
// // // // // // //   do {
// // // // // // //     word = generateRandomLetters(rand(5, 10));
// // // // // // //     attempts++;
// // // // // // //   } while (containsSpellingInOrder(word, targetWord) && attempts < 50);
  
// // // // // // //   // If it still contains the spelling, break it up
// // // // // // //   if (containsSpellingInOrder(word, targetWord)) {
// // // // // // //     // Scramble the word to break the order
// // // // // // //     word = shuffle(word.split('')).join('');
// // // // // // //   }
  
// // // // // // //   return word;
// // // // // // // }

// // // // // // // // -----------------------------------
// // // // // // // // Generate Words - Some contain spelling, some don't
// // // // // // // // -----------------------------------

// // // // // // // function generateWordsWithSpelling(targetWord, totalWords = 5) {
// // // // // // //   const words = [];
  
// // // // // // //   // Randomly decide how many words will contain the spelling (0 to totalWords)
// // // // // // //   const containCount = rand(0, totalWords);
  
// // // // // // //   // Generate words that contain the spelling
// // // // // // //   for (let i = 0; i < containCount; i++) {
// // // // // // //     let word = '';
// // // // // // //     let attempts = 0;
// // // // // // //     do {
// // // // // // //       word = generateWordWithSpellingInOrder(targetWord);
// // // // // // //       attempts++;
// // // // // // //       if (attempts > 50) break;
// // // // // // //     } while (word === targetWord || word.length < 5);
// // // // // // //     words.push(word);
// // // // // // //   }
  
// // // // // // //   // Generate words that do NOT contain the spelling
// // // // // // //   for (let i = containCount; i < totalWords; i++) {
// // // // // // //     let word = '';
// // // // // // //     let attempts = 0;
// // // // // // //     do {
// // // // // // //       word = generateWordWithoutSpelling(targetWord);
// // // // // // //       attempts++;
// // // // // // //       if (attempts > 50) break;
// // // // // // //     } while (containsSpellingInOrder(word, targetWord) || word.length < 5);
// // // // // // //     words.push(word);
// // // // // // //   }
  
// // // // // // //   return shuffle(words);
// // // // // // // }

// // // // // // // // -----------------------------------
// // // // // // // // Generate Options
// // // // // // // // -----------------------------------

// // // // // // // function generateOptions(correctAnswer) {
// // // // // // //   const correctNum = parseInt(correctAnswer);
// // // // // // //   const options = new Set();
// // // // // // //   options.add(correctAnswer);
  
// // // // // // //   // Add wrong options
// // // // // // //   const possibleWrong = [];
// // // // // // //   for (let i = 0; i <= 5; i++) {
// // // // // // //     if (i !== correctNum) {
// // // // // // //       possibleWrong.push(i.toString());
// // // // // // //     }
// // // // // // //   }
  
// // // // // // //   const shuffledWrong = shuffle(possibleWrong);
// // // // // // //   for (let i = 0; i < 4 && i < shuffledWrong.length; i++) {
// // // // // // //     options.add(shuffledWrong[i]);
// // // // // // //   }
  
// // // // // // //   // If we somehow don't have 5 options, add fallbacks
// // // // // // //   const fallbacks = ["0", "1", "2", "3", "4", "5"];
// // // // // // //   while (options.size < 5) {
// // // // // // //     const fallback = getRandom(fallbacks);
// // // // // // //     if (!options.has(fallback)) {
// // // // // // //       options.add(fallback);
// // // // // // //     }
// // // // // // //   }
  
// // // // // // //   return shuffle([...options]);
// // // // // // // }

// // // // // // // // -----------------------------------
// // // // // // // // Get Random Target Word (EXCLUDING "trlnshk")
// // // // // // // // -----------------------------------

// // // // // // // function getRandomTargetWord() {
// // // // // // //   const wordList = [
// // // // // // //     "hdks", "busnd", "hsnl", "kksy", "sravi", "avi", "hsncs", "jsnsr", "jyec", "asef", "svbg", "ncue", "mhdt"
// // // // // // //   ];
  
// // // // // // //   // Filter out "trlnshk" if it's in the list
// // // // // // //   const filteredList = wordList.filter(word => word !== "trlnshk");
  
// // // // // // //   return getRandom(filteredList);
// // // // // // // }

// // // // // // // // -----------------------------------
// // // // // // // // Main Function
// // // // // // // // -----------------------------------

// // // // // // // export function generatePuzzle_word_search(options = {}) {
// // // // // // //   // Get random target word if not provided
// // // // // // //   const targetWord = options.targetWord || getRandomTargetWord();
  
// // // // // // //   // Destructure with defaults
// // // // // // //   const {
// // // // // // //     totalWords = 5,
// // // // // // //     width = 400,
// // // // // // //     height = 250,
// // // // // // //     showWatermark = true,
// // // // // // //     watermarkText = "Powered by AVI",
// // // // // // //     wordColors = true
// // // // // // //   } = options;
  
// // // // // // //   // Generate words - some contain spelling, some don't
// // // // // // //   const words = generateWordsWithSpelling(targetWord, totalWords);
  
// // // // // // //   // Count how many words contain the spelling
// // // // // // //   let containCount = 0;
  
// // // // // // //   for (const word of words) {
// // // // // // //     if (containsSpellingInOrder(word, targetWord)) {
// // // // // // //       containCount++;
// // // // // // //     }
// // // // // // //   }
  
// // // // // // //   // Answer is the actual count
// // // // // // //   const answer = containCount.toString();
  
// // // // // // //   // ---------------- CANVAS ----------------
// // // // // // //   const canvas = createCanvas(width, height);
// // // // // // //   const ctx = canvas.getContext("2d");
  
// // // // // // //   // Background gradient
// // // // // // //   const bgGradient = ctx.createLinearGradient(0, 0, width, height);
// // // // // // //   bgGradient.addColorStop(0, '#f8f9fa');
// // // // // // //   bgGradient.addColorStop(0.5, '#e9ecef');
// // // // // // //   bgGradient.addColorStop(1, '#f8f9fa');
// // // // // // //   ctx.fillStyle = bgGradient;
// // // // // // //   ctx.fillRect(0, 0, width, height);
  
// // // // // // //   // Color palette for words
// // // // // // //   const colorPalette = [
// // // // // // //     '#2C3E50', '#E74C3C', '#2980B9', '#27AE60', '#8E44AD', '#F39C12',
// // // // // // //     '#1ABC9C', '#D35400', '#3498DB', '#2ECC71', '#9B59B6', '#E67E22',
// // // // // // //     '#16A085', '#C0392B', '#2471A3', '#229954', '#7D3C98', '#D4AC0D'
// // // // // // //   ];
  
// // // // // // //   // Spread words randomly across the image
// // // // // // //   const startY = 35;
// // // // // // //   const fontSize = Math.min(18, Math.max(14, 350 / totalWords));
// // // // // // //   const margin = 15;
// // // // // // //   const minDistance = Math.max(30, 55 - totalWords);
  
// // // // // // //   // Create random positions for each word
// // // // // // //   const wordPositions = [];
// // // // // // //   const usedPositions = [];
  
// // // // // // //   for (let i = 0; i < words.length; i++) {
// // // // // // //     const word = words[i];
// // // // // // //     ctx.font = `bold ${fontSize}px Arial`;
// // // // // // //     const metrics = ctx.measureText(word);
// // // // // // //     const wordWidth = metrics.width;
    
// // // // // // //     let x, y, attempts = 0;
// // // // // // //     let overlap = true;
// // // // // // //     const maxAttempts = 200;
    
// // // // // // //     while (overlap && attempts < maxAttempts) {
// // // // // // //       x = margin + Math.random() * (width - margin * 2 - wordWidth);
// // // // // // //       y = startY + Math.random() * (height - startY - margin - 25);
      
// // // // // // //       overlap = false;
// // // // // // //       for (const pos of usedPositions) {
// // // // // // //         const distance = Math.sqrt(
// // // // // // //           Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2)
// // // // // // //         );
// // // // // // //         if (distance < minDistance) {
// // // // // // //           overlap = true;
// // // // // // //           break;
// // // // // // //         }
// // // // // // //         const horizontalOverlap = (x < pos.x + pos.width + 5) && (x + wordWidth + 5 > pos.x);
// // // // // // //         const verticalOverlap = Math.abs(y - pos.y) < 20;
// // // // // // //         if (horizontalOverlap && verticalOverlap) {
// // // // // // //           overlap = true;
// // // // // // //           break;
// // // // // // //         }
// // // // // // //       }
// // // // // // //       attempts++;
// // // // // // //     }
    
// // // // // // //     usedPositions.push({ x, y, width: wordWidth });
// // // // // // //     wordPositions.push({ word, x, y });
// // // // // // //   }
  
// // // // // // //   // Draw each word at its random position
// // // // // // //   for (const { word, x, y } of wordPositions) {
// // // // // // //     const color = wordColors ? getRandom(colorPalette) : '#2C3E50';
    
// // // // // // //     ctx.save();
    
// // // // // // //     // Add white outline/shadow for readability
// // // // // // //     ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
// // // // // // //     ctx.shadowBlur = 6;
// // // // // // //     ctx.fillStyle = color;
// // // // // // //     ctx.font = `bold ${fontSize}px Arial`;
// // // // // // //     ctx.textAlign = 'left';
// // // // // // //     ctx.textBaseline = 'top';
// // // // // // //     ctx.fillText(word, x, y);
    
// // // // // // //     // Draw the actual text
// // // // // // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.05)';
// // // // // // //     ctx.shadowBlur = 2;
// // // // // // //     ctx.fillText(word, x, y);
    
// // // // // // //     ctx.restore();
// // // // // // //   }
  
// // // // // // //   // ---------------- WATERMARK ----------------
// // // // // // //   if (showWatermark) {
// // // // // // //     ctx.save();
// // // // // // //     ctx.globalAlpha = 0.6;
// // // // // // //     ctx.textAlign = "right";
// // // // // // //     ctx.textBaseline = "bottom";
    
// // // // // // //     ctx.font = "bold 14px Arial";
// // // // // // //     ctx.fillStyle = "#232425";
// // // // // // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
// // // // // // //     ctx.shadowBlur = 2;
// // // // // // //     ctx.fillText(watermarkText, width - 15, height - 8);
    
// // // // // // //     ctx.restore();
// // // // // // //   }
  
// // // // // // //   // Generate options
// // // // // // //   const generatedOptions = generateOptions(answer);
  
// // // // // // //   // -----------------------------------
// // // // // // //   // Return
// // // // // // //   // -----------------------------------
  
// // // // // // //   return {
// // // // // // //     question: `Count how many words below contain the letter sequence '${targetWord}' in order`,
// // // // // // //     options: generatedOptions,
// // // // // // //     answer: answer,
// // // // // // //     targetWord: targetWord,
// // // // // // //     totalWords: totalWords,
// // // // // // //     containCount: containCount,
// // // // // // //     words: words,
// // // // // // //     image: canvas.toDataURL().split(",")[1]
// // // // // // //   };
// // // // // // // }
















// // // // // // import { createCanvas } from "canvas";

// // // // // // // -----------------------------------
// // // // // // // Helpers
// // // // // // // -----------------------------------

// // // // // // function shuffle(arr) {
// // // // // //   return arr.sort(() => Math.random() - 0.5);
// // // // // // }

// // // // // // function getRandom(arr) {
// // // // // //   return arr[Math.floor(Math.random() * arr.length)];
// // // // // // }

// // // // // // function rand(min, max) {
// // // // // //   return Math.floor(Math.random() * (max - min + 1)) + min;
// // // // // // }

// // // // // // // -----------------------------------
// // // // // // // Generate Random Letters
// // // // // // // -----------------------------------

// // // // // // function generateRandomLetters(count) {
// // // // // //   const letters = 'abcdefghijklmnopqrstuvwxyz';
// // // // // //   let result = '';
// // // // // //   for (let i = 0; i < count; i++) {
// // // // // //     result += letters[Math.floor(Math.random() * letters.length)];
// // // // // //   }
// // // // // //   return result;
// // // // // // }

// // // // // // // -----------------------------------
// // // // // // // Check if a word contains the target spelling in order
// // // // // // // -----------------------------------

// // // // // // function containsSpellingInOrder(word, target) {
// // // // // //   let targetIndex = 0;
// // // // // //   for (let i = 0; i < word.length; i++) {
// // // // // //     if (word[i] === target[targetIndex]) {
// // // // // //       targetIndex++;
// // // // // //       if (targetIndex === target.length) {
// // // // // //         return true;
// // // // // //       }
// // // // // //     }
// // // // // //   }
// // // // // //   return false;
// // // // // // }

// // // // // // // -----------------------------------
// // // // // // // Check if a word contains ALL letters of target (any order)
// // // // // // // -----------------------------------

// // // // // // function containsAllLetters(word, target) {
// // // // // //   const targetLetters = target.split('');
// // // // // //   const wordLetters = word.split('');
  
// // // // // //   for (const letter of targetLetters) {
// // // // // //     const index = wordLetters.indexOf(letter);
// // // // // //     if (index === -1) {
// // // // // //       return false;
// // // // // //     }
// // // // // //     wordLetters.splice(index, 1);
// // // // // //   }
// // // // // //   return true;
// // // // // // }

// // // // // // // -----------------------------------
// // // // // // // Generate a word that CONTAINS the target spelling IN ORDER
// // // // // // // AND contains all the target letters
// // // // // // // -----------------------------------

// // // // // // function generateWordWithSpellingInOrder(targetWord) {
// // // // // //   const targetLetters = targetWord.split('');
// // // // // //   let word = '';
  
// // // // // //   // Build word with target letters in order
// // // // // //   for (let i = 0; i < targetLetters.length; i++) {
// // // // // //     const beforeCount = rand(0, 2);
// // // // // //     word += generateRandomLetters(beforeCount);
// // // // // //     word += targetLetters[i];
// // // // // //   }
  
// // // // // //   // Add random letters at beginning and end
// // // // // //   const startCount = rand(1, 3);
// // // // // //   const endCount = rand(1, 3);
// // // // // //   word = generateRandomLetters(startCount) + word + generateRandomLetters(endCount);
  
// // // // // //   return word;
// // // // // // }

// // // // // // // -----------------------------------
// // // // // // // Generate a word that contains ALL target letters BUT NOT in order
// // // // // // // (scrambled) - this is the tricky one!
// // // // // // // -----------------------------------

// // // // // // function generateWordWithAllLettersScrambled(targetWord) {
// // // // // //   const targetLetters = targetWord.split('');
  
// // // // // //   // Shuffle the target letters so they're NOT in order
// // // // // //   let scrambled;
// // // // // //   let attempts = 0;
// // // // // //   do {
// // // // // //     scrambled = shuffle([...targetLetters]);
// // // // // //     attempts++;
// // // // // //   } while (scrambled.join('') === targetWord && attempts < 20);
  
// // // // // //   // Add extra random letters
// // // // // //   const extraCount = rand(2, 5);
// // // // // //   const extraLetters = generateRandomLetters(extraCount).split('');
  
// // // // // //   // Combine and shuffle
// // // // // //   let combined = shuffle([...scrambled, ...extraLetters]);
  
// // // // // //   // Make sure it doesn't accidentally contain the spelling in order
// // // // // //   let word = combined.join('');
// // // // // //   attempts = 0;
// // // // // //   while (containsSpellingInOrder(word, targetWord) && attempts < 30) {
// // // // // //     // Reshuffle to break the order
// // // // // //     combined = shuffle(combined);
// // // // // //     word = combined.join('');
// // // // // //     attempts++;
// // // // // //   }
  
// // // // // //   return word;
// // // // // // }

// // // // // // // -----------------------------------
// // // // // // // Generate Words - ALL contain all target letters
// // // // // // // Some in order, some scrambled
// // // // // // // -----------------------------------

// // // // // // function generateWordsWithSpelling(targetWord, totalWords = 5) {
// // // // // //   const words = [];
  
// // // // // //   // Randomly decide how many words will contain the spelling IN ORDER (0 to totalWords)
// // // // // //   const inOrderCount = rand(0, totalWords);
  
// // // // // //   // Generate words that contain the spelling IN ORDER
// // // // // //   for (let i = 0; i < inOrderCount; i++) {
// // // // // //     let word = '';
// // // // // //     let attempts = 0;
// // // // // //     do {
// // // // // //       word = generateWordWithSpellingInOrder(targetWord);
// // // // // //       attempts++;
// // // // // //       if (attempts > 50) break;
// // // // // //     } while (word.length < 5 || !containsAllLetters(word, targetWord));
// // // // // //     words.push(word);
// // // // // //   }
  
// // // // // //   // Generate words that have ALL target letters but SCRAMBLED (not in order)
// // // // // //   for (let i = inOrderCount; i < totalWords; i++) {
// // // // // //     let word = '';
// // // // // //     let attempts = 0;
// // // // // //     do {
// // // // // //       word = generateWordWithAllLettersScrambled(targetWord);
// // // // // //       attempts++;
// // // // // //       if (attempts > 50) break;
// // // // // //     } while (word.length < 5 || !containsAllLetters(word, targetWord) || containsSpellingInOrder(word, targetWord));
// // // // // //     words.push(word);
// // // // // //   }
  
// // // // // //   return shuffle(words);
// // // // // // }

// // // // // // // -----------------------------------
// // // // // // // Generate Options
// // // // // // // -----------------------------------

// // // // // // function generateOptions(correctAnswer) {
// // // // // //   const correctNum = parseInt(correctAnswer);
// // // // // //   const options = new Set();
// // // // // //   options.add(correctAnswer);
  
// // // // // //   // Add wrong options
// // // // // //   const possibleWrong = [];
// // // // // //   for (let i = 0; i <= 5; i++) {
// // // // // //     if (i !== correctNum) {
// // // // // //       possibleWrong.push(i.toString());
// // // // // //     }
// // // // // //   }
  
// // // // // //   const shuffledWrong = shuffle(possibleWrong);
// // // // // //   for (let i = 0; i < 4 && i < shuffledWrong.length; i++) {
// // // // // //     options.add(shuffledWrong[i]);
// // // // // //   }
  
// // // // // //   // If we somehow don't have 5 options, add fallbacks
// // // // // //   const fallbacks = ["0", "1", "2", "3", "4", "5"];
// // // // // //   while (options.size < 5) {
// // // // // //     const fallback = getRandom(fallbacks);
// // // // // //     if (!options.has(fallback)) {
// // // // // //       options.add(fallback);
// // // // // //     }
// // // // // //   }
  
// // // // // //   return shuffle([...options]);
// // // // // // }

// // // // // // // -----------------------------------
// // // // // // // Get Random Target Word (EXCLUDING "trlnshk")
// // // // // // // -----------------------------------

// // // // // // function getRandomTargetWord() {
// // // // // //   const wordList = [
// // // // // //     "hdks", "busnd", "hsnl", "kksy", "sravi", "avi", "hsncs", "jsnsr", "jyec", "asef", "svbg", "ncue", "mhdt"
// // // // // //   ];
  
// // // // // //   // Filter out "trlnshk" if it's in the list
// // // // // //   const filteredList = wordList.filter(word => word !== "trlnshk");
  
// // // // // //   return getRandom(filteredList);
// // // // // // }

// // // // // // // -----------------------------------
// // // // // // // Main Function
// // // // // // // -----------------------------------

// // // // // // export function generatePuzzle_word_search(options = {}) {
// // // // // //   // Get random target word if not provided
// // // // // //   const targetWord = options.targetWord || getRandomTargetWord();
  
// // // // // //   // Destructure with defaults
// // // // // //   const {
// // // // // //     totalWords = 5,
// // // // // //     width = 400,
// // // // // //     height = 250,
// // // // // //     showWatermark = true,
// // // // // //     watermarkText = "Powered by AVI",
// // // // // //     wordColors = true
// // // // // //   } = options;
  
// // // // // //   // Generate words - ALL contain all target letters
// // // // // //   // Some in order, some scrambled
// // // // // //   const words = generateWordsWithSpelling(targetWord, totalWords);
  
// // // // // //   // Count how many words contain the spelling IN ORDER
// // // // // //   let inOrderCount = 0;
// // // // // //   let allLettersCount = 0;
  
// // // // // //   for (const word of words) {
// // // // // //     if (containsAllLetters(word, targetWord)) {
// // // // // //       allLettersCount++;
// // // // // //     }
// // // // // //     if (containsSpellingInOrder(word, targetWord)) {
// // // // // //       inOrderCount++;
// // // // // //     }
// // // // // //   }
  
// // // // // //   // Answer is the number of words with spelling IN ORDER
// // // // // //   const answer = inOrderCount.toString();
  
// // // // // //   // ---------------- CANVAS ----------------
// // // // // //   const canvas = createCanvas(width, height);
// // // // // //   const ctx = canvas.getContext("2d");
  
// // // // // //   // Background gradient
// // // // // //   const bgGradient = ctx.createLinearGradient(0, 0, width, height);
// // // // // //   bgGradient.addColorStop(0, '#f8f9fa');
// // // // // //   bgGradient.addColorStop(0.5, '#e9ecef');
// // // // // //   bgGradient.addColorStop(1, '#f8f9fa');
// // // // // //   ctx.fillStyle = bgGradient;
// // // // // //   ctx.fillRect(0, 0, width, height);
  
// // // // // //   // Color palette for words
// // // // // //   const colorPalette = [
// // // // // //     '#2C3E50', '#E74C3C', '#2980B9', '#27AE60', '#8E44AD', '#F39C12',
// // // // // //     '#1ABC9C', '#D35400', '#3498DB', '#2ECC71', '#9B59B6', '#E67E22',
// // // // // //     '#16A085', '#C0392B', '#2471A3', '#229954', '#7D3C98', '#D4AC0D'
// // // // // //   ];
  
// // // // // //   // Spread words randomly across the image
// // // // // //   const startY = 35;
// // // // // //   const fontSize = Math.min(18, Math.max(14, 350 / totalWords));
// // // // // //   const margin = 15;
// // // // // //   const minDistance = Math.max(30, 55 - totalWords);
  
// // // // // //   // Create random positions for each word
// // // // // //   const wordPositions = [];
// // // // // //   const usedPositions = [];
  
// // // // // //   for (let i = 0; i < words.length; i++) {
// // // // // //     const word = words[i];
// // // // // //     ctx.font = `bold ${fontSize}px Arial`;
// // // // // //     const metrics = ctx.measureText(word);
// // // // // //     const wordWidth = metrics.width;
    
// // // // // //     let x, y, attempts = 0;
// // // // // //     let overlap = true;
// // // // // //     const maxAttempts = 200;
    
// // // // // //     while (overlap && attempts < maxAttempts) {
// // // // // //       x = margin + Math.random() * (width - margin * 2 - wordWidth);
// // // // // //       y = startY + Math.random() * (height - startY - margin - 25);
      
// // // // // //       overlap = false;
// // // // // //       for (const pos of usedPositions) {
// // // // // //         const distance = Math.sqrt(
// // // // // //           Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2)
// // // // // //         );
// // // // // //         if (distance < minDistance) {
// // // // // //           overlap = true;
// // // // // //           break;
// // // // // //         }
// // // // // //         const horizontalOverlap = (x < pos.x + pos.width + 5) && (x + wordWidth + 5 > pos.x);
// // // // // //         const verticalOverlap = Math.abs(y - pos.y) < 20;
// // // // // //         if (horizontalOverlap && verticalOverlap) {
// // // // // //           overlap = true;
// // // // // //           break;
// // // // // //         }
// // // // // //       }
// // // // // //       attempts++;
// // // // // //     }
    
// // // // // //     usedPositions.push({ x, y, width: wordWidth });
// // // // // //     wordPositions.push({ word, x, y });
// // // // // //   }
  
// // // // // //   // Draw each word at its random position
// // // // // //   for (const { word, x, y } of wordPositions) {
// // // // // //     const color = wordColors ? getRandom(colorPalette) : '#2C3E50';
    
// // // // // //     ctx.save();
    
// // // // // //     // Add white outline/shadow for readability
// // // // // //     ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
// // // // // //     ctx.shadowBlur = 6;
// // // // // //     ctx.fillStyle = color;
// // // // // //     ctx.font = `bold ${fontSize}px Arial`;
// // // // // //     ctx.textAlign = 'left';
// // // // // //     ctx.textBaseline = 'top';
// // // // // //     ctx.fillText(word, x, y);
    
// // // // // //     // Draw the actual text
// // // // // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.05)';
// // // // // //     ctx.shadowBlur = 2;
// // // // // //     ctx.fillText(word, x, y);
    
// // // // // //     ctx.restore();
// // // // // //   }
  
// // // // // //   // ---------------- WATERMARK ----------------
// // // // // //   if (showWatermark) {
// // // // // //     ctx.save();
// // // // // //     ctx.globalAlpha = 0.6;
// // // // // //     ctx.textAlign = "right";
// // // // // //     ctx.textBaseline = "bottom";
    
// // // // // //     ctx.font = "bold 14px Arial";
// // // // // //     ctx.fillStyle = "#232425";
// // // // // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
// // // // // //     ctx.shadowBlur = 2;
// // // // // //     ctx.fillText(watermarkText, width - 15, height - 8);
    
// // // // // //     ctx.restore();
// // // // // //   }
  
// // // // // //   // Generate options
// // // // // //   const generatedOptions = generateOptions(answer);
  
// // // // // //   // -----------------------------------
// // // // // //   // Return
// // // // // //   // -----------------------------------
  
// // // // // //   return {
// // // // // //     question: `Count how many words below contain the letter sequence '${targetWord}' IN ORDER (the letters must appear exactly as shown)`,
// // // // // //     options: generatedOptions,
// // // // // //     answer: answer,
// // // // // //     targetWord: targetWord,
// // // // // //     totalWords: totalWords,
// // // // // //     inOrderCount: inOrderCount,
// // // // // //     allLettersCount: allLettersCount,
// // // // // //     words: words,
// // // // // //     image: canvas.toDataURL().split(",")[1]
// // // // // //   };
// // // // // // }

















// // // // // import { createCanvas } from "canvas";

// // // // // // -----------------------------------
// // // // // // Helpers
// // // // // // -----------------------------------

// // // // // function shuffle(arr) {
// // // // //   return arr.sort(() => Math.random() - 0.5);
// // // // // }

// // // // // function getRandom(arr) {
// // // // //   return arr[Math.floor(Math.random() * arr.length)];
// // // // // }

// // // // // function rand(min, max) {
// // // // //   return Math.floor(Math.random() * (max - min + 1)) + min;
// // // // // }

// // // // // // -----------------------------------
// // // // // // Generate Random Letters
// // // // // // -----------------------------------

// // // // // function generateRandomLetters(count) {
// // // // //   const letters = 'abcdefghijklmnopqrstuvwxyz';
// // // // //   let result = '';
// // // // //   for (let i = 0; i < count; i++) {
// // // // //     result += letters[Math.floor(Math.random() * letters.length)];
// // // // //   }
// // // // //   return result;
// // // // // }

// // // // // // -----------------------------------
// // // // // // Check how many times the target spelling appears in order in a word
// // // // // // -----------------------------------

// // // // // function countSpellingInOrder(word, target) {
// // // // //   let count = 0;
// // // // //   let targetIndex = 0;
  
// // // // //   for (let i = 0; i < word.length; i++) {
// // // // //     if (word[i] === target[targetIndex]) {
// // // // //       targetIndex++;
// // // // //       if (targetIndex === target.length) {
// // // // //         count++;
// // // // //         targetIndex = 0; // Reset to find next occurrence
// // // // //       }
// // // // //     }
// // // // //   }
// // // // //   return count;
// // // // // }

// // // // // // -----------------------------------
// // // // // // Generate a word that contains the target spelling multiple times
// // // // // // Example: if target is "phnd", it might generate "pshephnnda" (contains "phnd" once)
// // // // // // Or "phnphndd" (contains "phnd" twice)
// // // // // // -----------------------------------

// // // // // function generateWordWithMultipleSpellings(targetWord, occurrences) {
// // // // //   const targetLetters = targetWord.split('');
// // // // //   let word = '';
  
// // // // //   // Build the word with multiple occurrences of the spelling
// // // // //   for (let o = 0; o < occurrences; o++) {
// // // // //     // Add random letters before this occurrence
// // // // //     const beforeCount = rand(1, 3);
// // // // //     word += generateRandomLetters(beforeCount);
    
// // // // //     // Add the target spelling in order
// // // // //     for (let i = 0; i < targetLetters.length; i++) {
// // // // //       // Sometimes add extra letters between target letters
// // // // //       if (i > 0 && Math.random() < 0.3) {
// // // // //         word += generateRandomLetters(rand(0, 1));
// // // // //       }
// // // // //       word += targetLetters[i];
// // // // //     }
// // // // //   }
  
// // // // //   // Add random letters at the end
// // // // //   const endCount = rand(1, 3);
// // // // //   word += generateRandomLetters(endCount);
  
// // // // //   // Add some random letters at the beginning
// // // // //   const startCount = rand(1, 2);
// // // // //   word = generateRandomLetters(startCount) + word;
  
// // // // //   return word;
// // // // // }

// // // // // // -----------------------------------
// // // // // // Generate a word that DOES NOT contain the target spelling in order
// // // // // // but may contain some similar letters
// // // // // // -----------------------------------

// // // // // function generateWordWithoutSpelling(targetWord) {
// // // // //   const targetLetters = targetWord.split('');
// // // // //   let word = '';
// // // // //   let attempts = 0;
  
// // // // //   do {
// // // // //     // Create a random word with some target letters scattered
// // // // //     const wordLength = rand(6, 12);
// // // // //     let tempWord = '';
    
// // // // //     // Include some but not all target letters
// // // // //     const includeCount = rand(0, targetLetters.length - 1);
// // // // //     const shuffledTarget = shuffle([...targetLetters]);
// // // // //     const selectedLetters = shuffledTarget.slice(0, includeCount);
    
// // // // //     // Build the word
// // // // //     let allLetters = [...selectedLetters];
// // // // //     // Add random letters
// // // // //     const extraCount = rand(3, 8);
// // // // //     allLetters = [...allLetters, ...generateRandomLetters(extraCount).split('')];
    
// // // // //     // Shuffle all letters
// // // // //     tempWord = shuffle(allLetters).join('');
    
// // // // //     // Check if it accidentally contains the spelling
// // // // //     if (!countSpellingInOrder(tempWord, targetWord) && tempWord.length >= 5) {
// // // // //       word = tempWord;
// // // // //       break;
// // // // //     }
// // // // //     attempts++;
// // // // //   } while (attempts < 50);
  
// // // // //   // If we couldn't generate a word without the spelling, try a different approach
// // // // //   if (!word) {
// // // // //     word = generateRandomLetters(rand(7, 10));
// // // // //     // Make sure it doesn't contain the spelling
// // // // //     while (countSpellingInOrder(word, targetWord) > 0) {
// // // // //       word = shuffle(word.split('')).join('');
// // // // //     }
// // // // //   }
  
// // // // //   return word;
// // // // // }

// // // // // // -----------------------------------
// // // // // // Generate Words - Mix of words with different occurrence counts
// // // // // // -----------------------------------

// // // // // function generateWordsWithSpelling(targetWord, totalWords = 5) {
// // // // //   const words = [];
// // // // //   const occurrences = [];
  
// // // // //   // Randomly decide how many words will have the spelling (0 to totalWords)
// // // // //   const wordsWithSpelling = rand(1, Math.min(totalWords, 3)); // At least 1 word has it
  
// // // // //   // For words that have the spelling, decide how many times it appears (1-3 times)
// // // // //   for (let i = 0; i < wordsWithSpelling; i++) {
// // // // //     const occCount = rand(1, 3); // 1 to 3 occurrences
// // // // //     occurrences.push(occCount);
// // // // //   }
  
// // // // //   // Fill remaining words with no spelling
// // // // //   const wordsWithoutSpelling = totalWords - wordsWithSpelling;
// // // // //   for (let i = 0; i < wordsWithoutSpelling; i++) {
// // // // //     occurrences.push(0);
// // // // //   }
  
// // // // //   // Shuffle the occurrences
// // // // //   shuffle(occurrences);
  
// // // // //   // Generate words based on occurrences
// // // // //   for (let i = 0; i < totalWords; i++) {
// // // // //     let word = '';
// // // // //     let attempts = 0;
// // // // //     const occCount = occurrences[i];
    
// // // // //     if (occCount > 0) {
// // // // //       // Generate word with multiple occurrences
// // // // //       do {
// // // // //         word = generateWordWithMultipleSpellings(targetWord, occCount);
// // // // //         attempts++;
// // // // //         if (attempts > 50) break;
// // // // //       } while (word.length < 5 || countSpellingInOrder(word, targetWord) !== occCount);
// // // // //     } else {
// // // // //       // Generate word without the spelling
// // // // //       do {
// // // // //         word = generateWordWithoutSpelling(targetWord);
// // // // //         attempts++;
// // // // //         if (attempts > 50) break;
// // // // //       } while (word.length < 5 || countSpellingInOrder(word, targetWord) > 0);
// // // // //     }
// // // // //     words.push(word);
// // // // //   }
  
// // // // //   return { words, occurrences };
// // // // // }

// // // // // // -----------------------------------
// // // // // // Generate Options
// // // // // // -----------------------------------

// // // // // function generateOptions(correctAnswer) {
// // // // //   const correctNum = parseInt(correctAnswer);
// // // // //   const options = new Set();
// // // // //   options.add(correctAnswer);
  
// // // // //   // Add wrong options
// // // // //   const possibleWrong = [];
// // // // //   for (let i = 0; i <= 10; i++) {
// // // // //     if (i !== correctNum) {
// // // // //       possibleWrong.push(i.toString());
// // // // //     }
// // // // //   }
  
// // // // //   const shuffledWrong = shuffle(possibleWrong);
// // // // //   for (let i = 0; i < 4 && i < shuffledWrong.length; i++) {
// // // // //     options.add(shuffledWrong[i]);
// // // // //   }
  
// // // // //   // If we somehow don't have 5 options, add fallbacks
// // // // //   const fallbacks = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
// // // // //   while (options.size < 5) {
// // // // //     const fallback = getRandom(fallbacks);
// // // // //     if (!options.has(fallback)) {
// // // // //       options.add(fallback);
// // // // //     }
// // // // //   }
  
// // // // //   return shuffle([...options]);
// // // // // }

// // // // // // -----------------------------------
// // // // // // Get Random Target Word (EXCLUDING "trlnshk")
// // // // // // -----------------------------------

// // // // // function getRandomTargetWord() {
// // // // //   const wordList = [
// // // // //     "hdks", "busnd", "hsnl", "kksy", "sravi", "avi", "hsncs", "jsnsr", "jyec", "asef", "svbg", "ncue", "mhdt"
// // // // //   ];
  
// // // // //   // Filter out "trlnshk" if it's in the list
// // // // //   const filteredList = wordList.filter(word => word !== "trlnshk");
  
// // // // //   return getRandom(filteredList);
// // // // // }

// // // // // // -----------------------------------
// // // // // // Main Function
// // // // // // -----------------------------------

// // // // // export function generatePuzzle_word_search(options = {}) {
// // // // //   // Get random target word if not provided
// // // // //   const targetWord = options.targetWord || getRandomTargetWord();
  
// // // // //   // Destructure with defaults
// // // // //   const {
// // // // //     totalWords = 5,
// // // // //     width = 400,
// // // // //     height = 250,
// // // // //     showWatermark = true,
// // // // //     watermarkText = "Powered by AVI",
// // // // //     wordColors = true
// // // // //   } = options;
  
// // // // //   // Generate words - some have multiple occurrences of the spelling
// // // // //   const { words, occurrences } = generateWordsWithSpelling(targetWord, totalWords);
  
// // // // //   // Calculate total occurrences across all words
// // // // //   let totalOccurrences = 0;
// // // // //   for (const word of words) {
// // // // //     totalOccurrences += countSpellingInOrder(word, targetWord);
// // // // //   }
  
// // // // //   // Answer is the total number of times the spelling appears across all words
// // // // //   const answer = totalOccurrences.toString();
  
// // // // //   // ---------------- CANVAS ----------------
// // // // //   const canvas = createCanvas(width, height);
// // // // //   const ctx = canvas.getContext("2d");
  
// // // // //   // Background gradient
// // // // //   const bgGradient = ctx.createLinearGradient(0, 0, width, height);
// // // // //   bgGradient.addColorStop(0, '#f8f9fa');
// // // // //   bgGradient.addColorStop(0.5, '#e9ecef');
// // // // //   bgGradient.addColorStop(1, '#f8f9fa');
// // // // //   ctx.fillStyle = bgGradient;
// // // // //   ctx.fillRect(0, 0, width, height);
  
// // // // //   // Color palette for words
// // // // //   const colorPalette = [
// // // // //     '#2C3E50', '#E74C3C', '#2980B9', '#27AE60', '#8E44AD', '#F39C12',
// // // // //     '#1ABC9C', '#D35400', '#3498DB', '#2ECC71', '#9B59B6', '#E67E22',
// // // // //     '#16A085', '#C0392B', '#2471A3', '#229954', '#7D3C98', '#D4AC0D'
// // // // //   ];
  
// // // // //   // Spread words randomly across the image
// // // // //   const startY = 35;
// // // // //   const fontSize = Math.min(18, Math.max(14, 350 / totalWords));
// // // // //   const margin = 15;
// // // // //   const minDistance = Math.max(30, 55 - totalWords);
  
// // // // //   // Create random positions for each word
// // // // //   const wordPositions = [];
// // // // //   const usedPositions = [];
  
// // // // //   for (let i = 0; i < words.length; i++) {
// // // // //     const word = words[i];
// // // // //     ctx.font = `bold ${fontSize}px Arial`;
// // // // //     const metrics = ctx.measureText(word);
// // // // //     const wordWidth = metrics.width;
    
// // // // //     let x, y, attempts = 0;
// // // // //     let overlap = true;
// // // // //     const maxAttempts = 200;
    
// // // // //     while (overlap && attempts < maxAttempts) {
// // // // //       x = margin + Math.random() * (width - margin * 2 - wordWidth);
// // // // //       y = startY + Math.random() * (height - startY - margin - 25);
      
// // // // //       overlap = false;
// // // // //       for (const pos of usedPositions) {
// // // // //         const distance = Math.sqrt(
// // // // //           Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2)
// // // // //         );
// // // // //         if (distance < minDistance) {
// // // // //           overlap = true;
// // // // //           break;
// // // // //         }
// // // // //         const horizontalOverlap = (x < pos.x + pos.width + 5) && (x + wordWidth + 5 > pos.x);
// // // // //         const verticalOverlap = Math.abs(y - pos.y) < 20;
// // // // //         if (horizontalOverlap && verticalOverlap) {
// // // // //           overlap = true;
// // // // //           break;
// // // // //         }
// // // // //       }
// // // // //       attempts++;
// // // // //     }
    
// // // // //     usedPositions.push({ x, y, width: wordWidth });
// // // // //     wordPositions.push({ word, x, y });
// // // // //   }
  
// // // // //   // Draw each word at its random position
// // // // //   for (const { word, x, y } of wordPositions) {
// // // // //     const color = wordColors ? getRandom(colorPalette) : '#2C3E50';
    
// // // // //     ctx.save();
    
// // // // //     // Add white outline/shadow for readability
// // // // //     ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
// // // // //     ctx.shadowBlur = 6;
// // // // //     ctx.fillStyle = color;
// // // // //     ctx.font = `bold ${fontSize}px Arial`;
// // // // //     ctx.textAlign = 'left';
// // // // //     ctx.textBaseline = 'top';
// // // // //     ctx.fillText(word, x, y);
    
// // // // //     // Draw the actual text
// // // // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.05)';
// // // // //     ctx.shadowBlur = 2;
// // // // //     ctx.fillText(word, x, y);
    
// // // // //     ctx.restore();
// // // // //   }
  
// // // // //   // ---------------- WATERMARK ----------------
// // // // //   if (showWatermark) {
// // // // //     ctx.save();
// // // // //     ctx.globalAlpha = 0.6;
// // // // //     ctx.textAlign = "right";
// // // // //     ctx.textBaseline = "bottom";
    
// // // // //     ctx.font = "bold 14px Arial";
// // // // //     ctx.fillStyle = "#232425";
// // // // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
// // // // //     ctx.shadowBlur = 2;
// // // // //     ctx.fillText(watermarkText, width - 15, height - 8);
    
// // // // //     ctx.restore();
// // // // //   }
  
// // // // //   // Generate options
// // // // //   const generatedOptions = generateOptions(answer);
  
// // // // //   // -----------------------------------
// // // // //   // Return
// // // // //   // -----------------------------------
  
// // // // //   return {
// // // // //     question: `How many times does the letter sequence '${targetWord}' appear in the given words? (Look carefully - it can appear multiple times in a single word!)`,
// // // // //     options: generatedOptions,
// // // // //     answer: answer,
// // // // //     targetWord: targetWord,
// // // // //     totalWords: totalWords,
// // // // //     occurrences: occurrences,
// // // // //     words: words,
// // // // //     totalOccurrences: totalOccurrences,
// // // // //     image: canvas.toDataURL().split(",")[1]
// // // // //   };
// // // // // }



















// // // // import { createCanvas } from "canvas";

// // // // // -----------------------------------
// // // // // Helpers
// // // // // -----------------------------------

// // // // function shuffle(arr) {
// // // //   return arr.sort(() => Math.random() - 0.5);
// // // // }

// // // // function getRandom(arr) {
// // // //   return arr[Math.floor(Math.random() * arr.length)];
// // // // }

// // // // function rand(min, max) {
// // // //   return Math.floor(Math.random() * (max - min + 1)) + min;
// // // // }

// // // // // -----------------------------------
// // // // // Generate Random Letters
// // // // // -----------------------------------

// // // // function generateRandomLetters(count) {
// // // //   const letters = 'abcdefghijklmnopqrstuvwxyz';
// // // //   let result = '';
// // // //   for (let i = 0; i < count; i++) {
// // // //     result += letters[Math.floor(Math.random() * letters.length)];
// // // //   }
// // // //   return result;
// // // // }

// // // // // -----------------------------------
// // // // // Check how many times the target spelling appears in order in a word
// // // // // -----------------------------------

// // // // function countSpellingInOrder(word, target) {
// // // //   let count = 0;
// // // //   let targetIndex = 0;
  
// // // //   for (let i = 0; i < word.length; i++) {
// // // //     if (word[i] === target[targetIndex]) {
// // // //       targetIndex++;
// // // //       if (targetIndex === target.length) {
// // // //         count++;
// // // //         targetIndex = 0; // Reset to find next occurrence
// // // //       }
// // // //     }
// // // //   }
// // // //   return count;
// // // // }

// // // // // -----------------------------------
// // // // // Generate a word that contains the target spelling multiple times
// // // // // Example: if target is "avi", it might generate "anadgdjaviavvgaskiaavia" 
// // // // // (contains "avi" multiple times)
// // // // // -----------------------------------

// // // // function generateWordWithMultipleSpellings(targetWord, occurrences) {
// // // //   const targetLetters = targetWord.split('');
// // // //   let word = '';
  
// // // //   // Build the word with multiple occurrences of the spelling
// // // //   for (let o = 0; o < occurrences; o++) {
// // // //     // Add random letters before this occurrence
// // // //     const beforeCount = rand(1, 4);
// // // //     word += generateRandomLetters(beforeCount);
    
// // // //     // Add the target spelling in order
// // // //     for (let i = 0; i < targetLetters.length; i++) {
// // // //       // Sometimes add extra letters between target letters
// // // //       if (i > 0 && Math.random() < 0.2) {
// // // //         word += generateRandomLetters(rand(0, 1));
// // // //       }
// // // //       word += targetLetters[i];
// // // //     }
// // // //   }
  
// // // //   // Add random letters at the end
// // // //   const endCount = rand(1, 4);
// // // //   word += generateRandomLetters(endCount);
  
// // // //   // Add some random letters at the beginning
// // // //   const startCount = rand(1, 3);
// // // //   word = generateRandomLetters(startCount) + word;
  
// // // //   return word;
// // // // }

// // // // // -----------------------------------
// // // // // Generate a word that DOES NOT contain the target spelling in order
// // // // // but may contain some similar letters
// // // // // -----------------------------------

// // // // function generateWordWithoutSpelling(targetWord) {
// // // //   const targetLetters = targetWord.split('');
// // // //   let word = '';
// // // //   let attempts = 0;
  
// // // //   do {
// // // //     // Create a random word with some target letters scattered
// // // //     const wordLength = rand(6, 12);
// // // //     let tempWord = '';
    
// // // //     // Include some but not all target letters
// // // //     const includeCount = rand(0, targetLetters.length - 1);
// // // //     const shuffledTarget = shuffle([...targetLetters]);
// // // //     const selectedLetters = shuffledTarget.slice(0, includeCount);
    
// // // //     // Build the word
// // // //     let allLetters = [...selectedLetters];
// // // //     // Add random letters
// // // //     const extraCount = rand(3, 8);
// // // //     allLetters = [...allLetters, ...generateRandomLetters(extraCount).split('')];
    
// // // //     // Shuffle all letters
// // // //     tempWord = shuffle(allLetters).join('');
    
// // // //     // Check if it accidentally contains the spelling
// // // //     if (!countSpellingInOrder(tempWord, targetWord) && tempWord.length >= 5) {
// // // //       word = tempWord;
// // // //       break;
// // // //     }
// // // //     attempts++;
// // // //   } while (attempts < 50);
  
// // // //   // If we couldn't generate a word without the spelling, try a different approach
// // // //   if (!word) {
// // // //     word = generateRandomLetters(rand(7, 10));
// // // //     // Make sure it doesn't contain the spelling
// // // //     while (countSpellingInOrder(word, targetWord) > 0) {
// // // //       word = shuffle(word.split('')).join('');
// // // //     }
// // // //   }
  
// // // //   return word;
// // // // }

// // // // // -----------------------------------
// // // // // Generate Words - Mix of words with different occurrence counts
// // // // // -----------------------------------

// // // // function generateWordsWithSpelling(targetWord, totalWords = 5) {
// // // //   const words = [];
// // // //   const occurrences = [];
  
// // // //   // Randomly decide how many words will have the spelling (0 to totalWords)
// // // //   const wordsWithSpelling = rand(1, Math.min(totalWords, 3)); // At least 1 word has it
  
// // // //   // For words that have the spelling, decide how many times it appears (1-3 times)
// // // //   for (let i = 0; i < wordsWithSpelling; i++) {
// // // //     const occCount = rand(1, 3); // 1 to 3 occurrences
// // // //     occurrences.push(occCount);
// // // //   }
  
// // // //   // Fill remaining words with no spelling
// // // //   const wordsWithoutSpelling = totalWords - wordsWithSpelling;
// // // //   for (let i = 0; i < wordsWithoutSpelling; i++) {
// // // //     occurrences.push(0);
// // // //   }
  
// // // //   // Shuffle the occurrences
// // // //   shuffle(occurrences);
  
// // // //   // Generate words based on occurrences
// // // //   for (let i = 0; i < totalWords; i++) {
// // // //     let word = '';
// // // //     let attempts = 0;
// // // //     const occCount = occurrences[i];
    
// // // //     if (occCount > 0) {
// // // //       // Generate word with multiple occurrences
// // // //       do {
// // // //         word = generateWordWithMultipleSpellings(targetWord, occCount);
// // // //         attempts++;
// // // //         if (attempts > 50) break;
// // // //       } while (word.length < 5 || countSpellingInOrder(word, targetWord) !== occCount);
// // // //     } else {
// // // //       // Generate word without the spelling
// // // //       do {
// // // //         word = generateWordWithoutSpelling(targetWord);
// // // //         attempts++;
// // // //         if (attempts > 50) break;
// // // //       } while (word.length < 5 || countSpellingInOrder(word, targetWord) > 0);
// // // //     }
// // // //     words.push(word);
// // // //   }
  
// // // //   return { words, occurrences };
// // // // }

// // // // // -----------------------------------
// // // // // Generate Options
// // // // // -----------------------------------

// // // // function generateOptions(correctAnswer) {
// // // //   const correctNum = parseInt(correctAnswer);
// // // //   const options = new Set();
// // // //   options.add(correctAnswer);
  
// // // //   // Add wrong options
// // // //   const possibleWrong = [];
// // // //   for (let i = 0; i <= 10; i++) {
// // // //     if (i !== correctNum) {
// // // //       possibleWrong.push(i.toString());
// // // //     }
// // // //   }
  
// // // //   const shuffledWrong = shuffle(possibleWrong);
// // // //   for (let i = 0; i < 4 && i < shuffledWrong.length; i++) {
// // // //     options.add(shuffledWrong[i]);
// // // //   }
  
// // // //   // If we somehow don't have 5 options, add fallbacks
// // // //   const fallbacks = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
// // // //   while (options.size < 5) {
// // // //     const fallback = getRandom(fallbacks);
// // // //     if (!options.has(fallback)) {
// // // //       options.add(fallback);
// // // //     }
// // // //   }
  
// // // //   return shuffle([...options]);
// // // // }

// // // // // -----------------------------------
// // // // // Get Random Target Word 
// // // // // -----------------------------------

// // // // function getRandomTargetWord() {
// // // //   // You can add more target words here
// // // //   const wordList = [
// // // //     "avi", "the", "cat", "dog", "fun", "run", "sky", "fly"
// // // //   ];
  
// // // //   return getRandom(wordList);
// // // // }

// // // // // -----------------------------------
// // // // // Main Function
// // // // // -----------------------------------

// // // // export function generatePuzzle_word_search(options = {}) {
// // // //   // Get random target word if not provided
// // // //   const targetWord = options.targetWord || getRandomTargetWord();
  
// // // //   // Destructure with defaults
// // // //   const {
// // // //     totalWords = 5,
// // // //     width = 400,
// // // //     height = 250,
// // // //     showWatermark = true,
// // // //     watermarkText = "Powered by AVI",
// // // //     wordColors = true
// // // //   } = options;
  
// // // //   // Generate words - some have multiple occurrences of the spelling
// // // //   const { words, occurrences } = generateWordsWithSpelling(targetWord, totalWords);
  
// // // //   // Calculate total occurrences across all words
// // // //   let totalOccurrences = 0;
// // // //   for (const word of words) {
// // // //     totalOccurrences += countSpellingInOrder(word, targetWord);
// // // //   }
  
// // // //   // Answer is the total number of times the spelling appears across all words
// // // //   const answer = totalOccurrences.toString();
  
// // // //   // ---------------- CANVAS ----------------
// // // //   const canvas = createCanvas(width, height);
// // // //   const ctx = canvas.getContext("2d");
  
// // // //   // Background gradient
// // // //   const bgGradient = ctx.createLinearGradient(0, 0, width, height);
// // // //   bgGradient.addColorStop(0, '#f8f9fa');
// // // //   bgGradient.addColorStop(0.5, '#e9ecef');
// // // //   bgGradient.addColorStop(1, '#f8f9fa');
// // // //   ctx.fillStyle = bgGradient;
// // // //   ctx.fillRect(0, 0, width, height);
  
// // // //   // Color palette for words
// // // //   const colorPalette = [
// // // //     '#2C3E50', '#E74C3C', '#2980B9', '#27AE60', '#8E44AD', '#F39C12',
// // // //     '#1ABC9C', '#D35400', '#3498DB', '#2ECC71', '#9B59B6', '#E67E22',
// // // //     '#16A085', '#C0392B', '#2471A3', '#229954', '#7D3C98', '#D4AC0D'
// // // //   ];
  
// // // //   // Spread words randomly across the image
// // // //   const startY = 35;
// // // //   const fontSize = Math.min(18, Math.max(14, 350 / totalWords));
// // // //   const margin = 15;
// // // //   const minDistance = Math.max(30, 55 - totalWords);
  
// // // //   // Create random positions for each word
// // // //   const wordPositions = [];
// // // //   const usedPositions = [];
  
// // // //   for (let i = 0; i < words.length; i++) {
// // // //     const word = words[i];
// // // //     ctx.font = `bold ${fontSize}px Arial`;
// // // //     const metrics = ctx.measureText(word);
// // // //     const wordWidth = metrics.width;
    
// // // //     let x, y, attempts = 0;
// // // //     let overlap = true;
// // // //     const maxAttempts = 200;
    
// // // //     while (overlap && attempts < maxAttempts) {
// // // //       x = margin + Math.random() * (width - margin * 2 - wordWidth);
// // // //       y = startY + Math.random() * (height - startY - margin - 25);
      
// // // //       overlap = false;
// // // //       for (const pos of usedPositions) {
// // // //         const distance = Math.sqrt(
// // // //           Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2)
// // // //         );
// // // //         if (distance < minDistance) {
// // // //           overlap = true;
// // // //           break;
// // // //         }
// // // //         const horizontalOverlap = (x < pos.x + pos.width + 5) && (x + wordWidth + 5 > pos.x);
// // // //         const verticalOverlap = Math.abs(y - pos.y) < 20;
// // // //         if (horizontalOverlap && verticalOverlap) {
// // // //           overlap = true;
// // // //           break;
// // // //         }
// // // //       }
// // // //       attempts++;
// // // //     }
    
// // // //     usedPositions.push({ x, y, width: wordWidth });
// // // //     wordPositions.push({ word, x, y });
// // // //   }
  
// // // //   // Draw each word at its random position
// // // //   for (const { word, x, y } of wordPositions) {
// // // //     const color = wordColors ? getRandom(colorPalette) : '#2C3E50';
    
// // // //     ctx.save();
    
// // // //     // Add white outline/shadow for readability
// // // //     ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
// // // //     ctx.shadowBlur = 6;
// // // //     ctx.fillStyle = color;
// // // //     ctx.font = `bold ${fontSize}px Arial`;
// // // //     ctx.textAlign = 'left';
// // // //     ctx.textBaseline = 'top';
// // // //     ctx.fillText(word, x, y);
    
// // // //     // Draw the actual text
// // // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.05)';
// // // //     ctx.shadowBlur = 2;
// // // //     ctx.fillText(word, x, y);
    
// // // //     ctx.restore();
// // // //   }
  
// // // //   // ---------------- WATERMARK ----------------
// // // //   if (showWatermark) {
// // // //     ctx.save();
// // // //     ctx.globalAlpha = 0.6;
// // // //     ctx.textAlign = "right";
// // // //     ctx.textBaseline = "bottom";
    
// // // //     ctx.font = "bold 14px Arial";
// // // //     ctx.fillStyle = "#232425";
// // // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
// // // //     ctx.shadowBlur = 2;
// // // //     ctx.fillText(watermarkText, width - 15, height - 8);
    
// // // //     ctx.restore();
// // // //   }
  
// // // //   // Generate options
// // // //   const generatedOptions = generateOptions(answer);
  
// // // //   // -----------------------------------
// // // //   // Return
// // // //   // -----------------------------------
  
// // // //   return {
// // // //     question: `How many times does the letter sequence '${targetWord}' appear in the given words? (Look carefully - it can appear multiple times in a single word!)`,
// // // //     options: generatedOptions,
// // // //     answer: answer,
// // // //     targetWord: targetWord,
// // // //     totalWords: totalWords,
// // // //     occurrences: occurrences,
// // // //     words: words,
// // // //     totalOccurrences: totalOccurrences,
// // // //     image: canvas.toDataURL().split(",")[1]
// // // //   };
// // // // }

















// // // import { createCanvas } from "canvas";

// // // // -----------------------------------
// // // // Helpers
// // // // -----------------------------------

// // // function shuffle(arr) {
// // //   return arr.sort(() => Math.random() - 0.5);
// // // }

// // // function getRandom(arr) {
// // //   return arr[Math.floor(Math.random() * arr.length)];
// // // }

// // // function rand(min, max) {
// // //   return Math.floor(Math.random() * (max - min + 1)) + min;
// // // }

// // // // -----------------------------------
// // // // Generate Random Letters
// // // // -----------------------------------

// // // function generateRandomLetters(count) {
// // //   const letters = 'abcdefghijklmnopqrstuvwxyz';
// // //   let result = '';
// // //   for (let i = 0; i < count; i++) {
// // //     result += letters[Math.floor(Math.random() * letters.length)];
// // //   }
// // //   return result;
// // // }

// // // // -----------------------------------
// // // // Check how many times the target spelling appears in order in a word
// // // // -----------------------------------

// // // function countSpellingInOrder(word, target) {
// // //   let count = 0;
// // //   let targetIndex = 0;
  
// // //   for (let i = 0; i < word.length; i++) {
// // //     if (word[i] === target[targetIndex]) {
// // //       targetIndex++;
// // //       if (targetIndex === target.length) {
// // //         count++;
// // //         targetIndex = 0; // Reset to find next occurrence
// // //       }
// // //     }
// // //   }
// // //   return count;
// // // }

// // // // -----------------------------------
// // // // Generate a word that contains the target spelling multiple times
// // // // Example: if target is "avi", it might generate "anadgdjaviavvgaskiaavia" 
// // // // (contains "avi" multiple times)
// // // // -----------------------------------

// // // function generateWordWithMultipleSpellings(targetWord, occurrences) {
// // //   const targetLetters = targetWord.split('');
// // //   let word = '';
  
// // //   // Build the word with multiple occurrences of the spelling
// // //   for (let o = 0; o < occurrences; o++) {
// // //     // Add random letters before this occurrence
// // //     const beforeCount = rand(1, 4);
// // //     word += generateRandomLetters(beforeCount);
    
// // //     // Add the target spelling in order
// // //     for (let i = 0; i < targetLetters.length; i++) {
// // //       // Sometimes add extra letters between target letters
// // //       if (i > 0 && Math.random() < 0.2) {
// // //         word += generateRandomLetters(rand(0, 1));
// // //       }
// // //       word += targetLetters[i];
// // //     }
// // //   }
  
// // //   // Add random letters at the end
// // //   const endCount = rand(1, 4);
// // //   word += generateRandomLetters(endCount);
  
// // //   // Add some random letters at the beginning
// // //   const startCount = rand(1, 3);
// // //   word = generateRandomLetters(startCount) + word;
  
// // //   return word;
// // // }

// // // // -----------------------------------
// // // // Generate a word that DOES NOT contain the target spelling in order
// // // // but may contain some similar letters
// // // // -----------------------------------

// // // function generateWordWithoutSpelling(targetWord) {
// // //   const targetLetters = targetWord.split('');
// // //   let word = '';
// // //   let attempts = 0;
  
// // //   do {
// // //     // Create a random word with some target letters scattered
// // //     const wordLength = rand(6, 12);
// // //     let tempWord = '';
    
// // //     // Include some but not all target letters
// // //     const includeCount = rand(0, targetLetters.length - 1);
// // //     const shuffledTarget = shuffle([...targetLetters]);
// // //     const selectedLetters = shuffledTarget.slice(0, includeCount);
    
// // //     // Build the word
// // //     let allLetters = [...selectedLetters];
// // //     // Add random letters
// // //     const extraCount = rand(3, 8);
// // //     allLetters = [...allLetters, ...generateRandomLetters(extraCount).split('')];
    
// // //     // Shuffle all letters
// // //     tempWord = shuffle(allLetters).join('');
    
// // //     // Check if it accidentally contains the spelling
// // //     if (!countSpellingInOrder(tempWord, targetWord) && tempWord.length >= 5) {
// // //       word = tempWord;
// // //       break;
// // //     }
// // //     attempts++;
// // //   } while (attempts < 50);
  
// // //   // If we couldn't generate a word without the spelling, try a different approach
// // //   if (!word) {
// // //     word = generateRandomLetters(rand(7, 10));
// // //     // Make sure it doesn't contain the spelling
// // //     while (countSpellingInOrder(word, targetWord) > 0) {
// // //       word = shuffle(word.split('')).join('');
// // //     }
// // //   }
  
// // //   return word;
// // // }

// // // // -----------------------------------
// // // // Generate Words - Mix of words with different occurrence counts
// // // // -----------------------------------

// // // function generateWordsWithSpelling(targetWord, totalWords = 5) {
// // //   const words = [];
// // //   const occurrences = [];
  
// // //   // Randomly decide how many words will have the spelling (0 to totalWords)
// // //   const wordsWithSpelling = rand(1, Math.min(totalWords, 3)); // At least 1 word has it
  
// // //   // For words that have the spelling, decide how many times it appears (1-3 times)
// // //   for (let i = 0; i < wordsWithSpelling; i++) {
// // //     const occCount = rand(1, 3); // 1 to 3 occurrences
// // //     occurrences.push(occCount);
// // //   }
  
// // //   // Fill remaining words with no spelling
// // //   const wordsWithoutSpelling = totalWords - wordsWithSpelling;
// // //   for (let i = 0; i < wordsWithoutSpelling; i++) {
// // //     occurrences.push(0);
// // //   }
  
// // //   // Shuffle the occurrences
// // //   shuffle(occurrences);
  
// // //   // Generate words based on occurrences
// // //   for (let i = 0; i < totalWords; i++) {
// // //     let word = '';
// // //     let attempts = 0;
// // //     const occCount = occurrences[i];
    
// // //     if (occCount > 0) {
// // //       // Generate word with multiple occurrences
// // //       do {
// // //         word = generateWordWithMultipleSpellings(targetWord, occCount);
// // //         attempts++;
// // //         if (attempts > 50) break;
// // //       } while (word.length < 5 || countSpellingInOrder(word, targetWord) !== occCount);
// // //     } else {
// // //       // Generate word without the spelling
// // //       do {
// // //         word = generateWordWithoutSpelling(targetWord);
// // //         attempts++;
// // //         if (attempts > 50) break;
// // //       } while (word.length < 5 || countSpellingInOrder(word, targetWord) > 0);
// // //     }
// // //     words.push(word);
// // //   }
  
// // //   return { words, occurrences };
// // // }

// // // // -----------------------------------
// // // // Generate Options - Now with closer wrong answers
// // // // -----------------------------------

// // // function generateOptions(correctAnswer) {
// // //   const correctNum = parseInt(correctAnswer);
// // //   const options = new Set();
// // //   options.add(correctAnswer);
  
// // //   // Generate wrong options that are close to the correct answer
// // //   const wrongOptions = [];
  
// // //   // Try to generate numbers within +/- 3 of the correct answer
// // //   const range = 3;
// // //   for (let i = correctNum - range; i <= correctNum + range; i++) {
// // //     if (i !== correctNum && i >= 0 && i <= 10) {
// // //       wrongOptions.push(i.toString());
// // //     }
// // //   }
  
// // //   // If we don't have enough wrong options, add more from a wider range
// // //   if (wrongOptions.length < 4) {
// // //     const widerRange = 5;
// // //     for (let i = correctNum - widerRange; i <= correctNum + widerRange; i++) {
// // //       if (i !== correctNum && i >= 0 && i <= 10 && !wrongOptions.includes(i.toString())) {
// // //         wrongOptions.push(i.toString());
// // //       }
// // //     }
// // //   }
  
// // //   // If we still don't have enough, add from the full range
// // //   if (wrongOptions.length < 4) {
// // //     for (let i = 0; i <= 10; i++) {
// // //       if (i !== correctNum && !wrongOptions.includes(i.toString())) {
// // //         wrongOptions.push(i.toString());
// // //       }
// // //     }
// // //   }
  
// // //   // Shuffle and pick 4 wrong options
// // //   shuffle(wrongOptions);
// // //   const selectedWrong = wrongOptions.slice(0, 4);
  
// // //   // Add all wrong options to the set
// // //   for (const wrong of selectedWrong) {
// // //     options.add(wrong);
// // //   }
  
// // //   // If we somehow don't have 5 options, add fallbacks
// // //   const fallbacks = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
// // //   while (options.size < 5) {
// // //     const fallback = getRandom(fallbacks);
// // //     if (!options.has(fallback)) {
// // //       options.add(fallback);
// // //     }
// // //   }
  
// // //   return shuffle([...options]);
// // // }

// // // // -----------------------------------
// // // // Get Random Target Word 
// // // // -----------------------------------

// // // function getRandomTargetWord() {
// // //   // You can add more target words here
// // //   const wordList = [
// // //     "avi", "the", "cat", "dog", "fun", "run", "sky", "fly"
// // //   ];
  
// // //   return getRandom(wordList);
// // // }

// // // // -----------------------------------
// // // // Main Function
// // // // -----------------------------------

// // // export function generatePuzzle_word_search(options = {}) {
// // //   // Get random target word if not provided
// // //   const targetWord = options.targetWord || getRandomTargetWord();
  
// // //   // Destructure with defaults
// // //   const {
// // //     totalWords = 5,
// // //     width = 400,
// // //     height = 250,
// // //     showWatermark = true,
// // //     watermarkText = "Powered by AVI",
// // //     wordColors = true
// // //   } = options;
  
// // //   // Generate words - some have multiple occurrences of the spelling
// // //   const { words, occurrences } = generateWordsWithSpelling(targetWord, totalWords);
  
// // //   // Calculate total occurrences across all words
// // //   let totalOccurrences = 0;
// // //   for (const word of words) {
// // //     totalOccurrences += countSpellingInOrder(word, targetWord);
// // //   }
  
// // //   // Answer is the total number of times the spelling appears across all words
// // //   const answer = totalOccurrences.toString();
  
// // //   // ---------------- CANVAS ----------------
// // //   const canvas = createCanvas(width, height);
// // //   const ctx = canvas.getContext("2d");
  
// // //   // Background gradient
// // //   const bgGradient = ctx.createLinearGradient(0, 0, width, height);
// // //   bgGradient.addColorStop(0, '#f8f9fa');
// // //   bgGradient.addColorStop(0.5, '#e9ecef');
// // //   bgGradient.addColorStop(1, '#f8f9fa');
// // //   ctx.fillStyle = bgGradient;
// // //   ctx.fillRect(0, 0, width, height);
  
// // //   // Color palette for words
// // //   const colorPalette = [
// // //     '#2C3E50', '#E74C3C', '#2980B9', '#27AE60', '#8E44AD', '#F39C12',
// // //     '#1ABC9C', '#D35400', '#3498DB', '#2ECC71', '#9B59B6', '#E67E22',
// // //     '#16A085', '#C0392B', '#2471A3', '#229954', '#7D3C98', '#D4AC0D'
// // //   ];
  
// // //   // Spread words randomly across the image
// // //   const startY = 35;
// // //   const fontSize = Math.min(18, Math.max(14, 350 / totalWords));
// // //   const margin = 15;
// // //   const minDistance = Math.max(30, 55 - totalWords);
  
// // //   // Create random positions for each word
// // //   const wordPositions = [];
// // //   const usedPositions = [];
  
// // //   for (let i = 0; i < words.length; i++) {
// // //     const word = words[i];
// // //     ctx.font = `bold ${fontSize}px Arial`;
// // //     const metrics = ctx.measureText(word);
// // //     const wordWidth = metrics.width;
    
// // //     let x, y, attempts = 0;
// // //     let overlap = true;
// // //     const maxAttempts = 200;
    
// // //     while (overlap && attempts < maxAttempts) {
// // //       x = margin + Math.random() * (width - margin * 2 - wordWidth);
// // //       y = startY + Math.random() * (height - startY - margin - 25);
      
// // //       overlap = false;
// // //       for (const pos of usedPositions) {
// // //         const distance = Math.sqrt(
// // //           Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2)
// // //         );
// // //         if (distance < minDistance) {
// // //           overlap = true;
// // //           break;
// // //         }
// // //         const horizontalOverlap = (x < pos.x + pos.width + 5) && (x + wordWidth + 5 > pos.x);
// // //         const verticalOverlap = Math.abs(y - pos.y) < 20;
// // //         if (horizontalOverlap && verticalOverlap) {
// // //           overlap = true;
// // //           break;
// // //         }
// // //       }
// // //       attempts++;
// // //     }
    
// // //     usedPositions.push({ x, y, width: wordWidth });
// // //     wordPositions.push({ word, x, y });
// // //   }
  
// // //   // Draw each word at its random position
// // //   for (const { word, x, y } of wordPositions) {
// // //     const color = wordColors ? getRandom(colorPalette) : '#2C3E50';
    
// // //     ctx.save();
    
// // //     // Add white outline/shadow for readability
// // //     ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
// // //     ctx.shadowBlur = 6;
// // //     ctx.fillStyle = color;
// // //     ctx.font = `bold ${fontSize}px Arial`;
// // //     ctx.textAlign = 'left';
// // //     ctx.textBaseline = 'top';
// // //     ctx.fillText(word, x, y);
    
// // //     // Draw the actual text
// // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.05)';
// // //     ctx.shadowBlur = 2;
// // //     ctx.fillText(word, x, y);
    
// // //     ctx.restore();
// // //   }
  
// // //   // ---------------- WATERMARK ----------------
// // //   if (showWatermark) {
// // //     ctx.save();
// // //     ctx.globalAlpha = 0.6;
// // //     ctx.textAlign = "right";
// // //     ctx.textBaseline = "bottom";
    
// // //     ctx.font = "bold 14px Arial";
// // //     ctx.fillStyle = "#232425";
// // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
// // //     ctx.shadowBlur = 2;
// // //     ctx.fillText(watermarkText, width - 15, height - 8);
    
// // //     ctx.restore();
// // //   }
  
// // //   // Generate options
// // //   const generatedOptions = generateOptions(answer);
  
// // //   // -----------------------------------
// // //   // Return
// // //   // -----------------------------------
  
// // //   return {
// // //     question: `How many times does the letter sequence '${targetWord}' appear in the given words? (Look carefully - it can appear multiple times in a single word!)`,
// // //     options: generatedOptions,
// // //     answer: answer,
// // //     targetWord: targetWord,
// // //     totalWords: totalWords,
// // //     occurrences: occurrences,
// // //     words: words,
// // //     totalOccurrences: totalOccurrences,
// // //     image: canvas.toDataURL().split(",")[1]
// // //   };
// // // }



























// // import { createCanvas } from "canvas";

// // // -----------------------------------
// // // Helpers
// // // -----------------------------------

// // function shuffle(arr) {
// //   return arr.sort(() => Math.random() - 0.5);
// // }

// // function getRandom(arr) {
// //   return arr[Math.floor(Math.random() * arr.length)];
// // }

// // function rand(min, max) {
// //   return Math.floor(Math.random() * (max - min + 1)) + min;
// // }

// // // -----------------------------------
// // // Generate Random Letters
// // // -----------------------------------

// // function generateRandomLetters(count) {
// //   const letters = 'abcdefghijklmnopqrstuvwxyz';
// //   let result = '';
// //   for (let i = 0; i < count; i++) {
// //     result += letters[Math.floor(Math.random() * letters.length)];
// //   }
// //   return result;
// // }

// // // -----------------------------------
// // // Check how many times the target spelling appears in order in a word
// // // -----------------------------------

// // function countSpellingInOrder(word, target) {
// //   let count = 0;
// //   let targetIndex = 0;
  
// //   for (let i = 0; i < word.length; i++) {
// //     if (word[i] === target[targetIndex]) {
// //       targetIndex++;
// //       if (targetIndex === target.length) {
// //         count++;
// //         targetIndex = 0; // Reset to find next occurrence
// //       }
// //     }
// //   }
// //   return count;
// // }

// // // -----------------------------------
// // // Generate a word that contains the target spelling multiple times
// // // with increased random letter length
// // // Example: if target is "avi", it might generate "anadgdjaviavvgaskiaavia" 
// // // (contains "avi" multiple times with longer random letters)
// // // -----------------------------------

// // function generateWordWithMultipleSpellings(targetWord, occurrences) {
// //   const targetLetters = targetWord.split('');
// //   let word = '';
  
// //   // Build the word with multiple occurrences of the spelling
// //   for (let o = 0; o < occurrences; o++) {
// //     // Add MORE random letters before this occurrence (increased from 1-4 to 3-8)
// //     const beforeCount = rand(3, 8);
// //     word += generateRandomLetters(beforeCount);
    
// //     // Add the target spelling in order
// //     for (let i = 0; i < targetLetters.length; i++) {
// //       // Sometimes add extra letters between target letters (increased chance)
// //       if (i > 0 && Math.random() < 0.4) {
// //         word += generateRandomLetters(rand(1, 3)); // Increased from 0-1 to 1-3
// //       }
// //       word += targetLetters[i];
// //     }
// //   }
  
// //   // Add MORE random letters at the end (increased from 1-4 to 3-8)
// //   const endCount = rand(3, 8);
// //   word += generateRandomLetters(endCount);
  
// //   // Add MORE random letters at the beginning (increased from 1-3 to 3-6)
// //   const startCount = rand(3, 6);
// //   word = generateRandomLetters(startCount) + word;
  
// //   return word;
// // }

// // // -----------------------------------
// // // Generate a word that DOES NOT contain the target spelling in order
// // // but may contain some similar letters
// // // -----------------------------------

// // function generateWordWithoutSpelling(targetWord) {
// //   const targetLetters = targetWord.split('');
// //   let word = '';
// //   let attempts = 0;
  
// //   do {
// //     // Create a random word with some target letters scattered
// //     const wordLength = rand(10, 18); // Increased from 6-12 to 10-18
// //     let tempWord = '';
    
// //     // Include some but not all target letters
// //     const includeCount = rand(0, targetLetters.length - 1);
// //     const shuffledTarget = shuffle([...targetLetters]);
// //     const selectedLetters = shuffledTarget.slice(0, includeCount);
    
// //     // Build the word
// //     let allLetters = [...selectedLetters];
// //     // Add MORE random letters (increased from 3-8 to 6-12)
// //     const extraCount = rand(6, 12);
// //     allLetters = [...allLetters, ...generateRandomLetters(extraCount).split('')];
    
// //     // Shuffle all letters
// //     tempWord = shuffle(allLetters).join('');
    
// //     // Check if it accidentally contains the spelling
// //     if (!countSpellingInOrder(tempWord, targetWord) && tempWord.length >= 8) { // Increased from 5 to 8
// //       word = tempWord;
// //       break;
// //     }
// //     attempts++;
// //   } while (attempts < 50);
  
// //   // If we couldn't generate a word without the spelling, try a different approach
// //   if (!word) {
// //     word = generateRandomLetters(rand(10, 16)); // Increased from 7-10 to 10-16
// //     // Make sure it doesn't contain the spelling
// //     while (countSpellingInOrder(word, targetWord) > 0) {
// //       word = shuffle(word.split('')).join('');
// //     }
// //   }
  
// //   return word;
// // }

// // // -----------------------------------
// // // Generate Words - Mix of words with different occurrence counts
// // // -----------------------------------

// // function generateWordsWithSpelling(targetWord, totalWords = 5) {
// //   const words = [];
// //   const occurrences = [];
  
// //   // Randomly decide how many words will have the spelling (0 to totalWords)
// //   const wordsWithSpelling = rand(1, Math.min(totalWords, 3)); // At least 1 word has it
  
// //   // For words that have the spelling, decide how many times it appears (1-3 times)
// //   for (let i = 0; i < wordsWithSpelling; i++) {
// //     const occCount = rand(1, 3); // 1 to 3 occurrences
// //     occurrences.push(occCount);
// //   }
  
// //   // Fill remaining words with no spelling
// //   const wordsWithoutSpelling = totalWords - wordsWithSpelling;
// //   for (let i = 0; i < wordsWithoutSpelling; i++) {
// //     occurrences.push(0);
// //   }
  
// //   // Shuffle the occurrences
// //   shuffle(occurrences);
  
// //   // Generate words based on occurrences
// //   for (let i = 0; i < totalWords; i++) {
// //     let word = '';
// //     let attempts = 0;
// //     const occCount = occurrences[i];
    
// //     if (occCount > 0) {
// //       // Generate word with multiple occurrences
// //       do {
// //         word = generateWordWithMultipleSpellings(targetWord, occCount);
// //         attempts++;
// //         if (attempts > 50) break;
// //       } while (word.length < 8 || countSpellingInOrder(word, targetWord) !== occCount); // Increased from 5 to 8
// //     } else {
// //       // Generate word without the spelling
// //       do {
// //         word = generateWordWithoutSpelling(targetWord);
// //         attempts++;
// //         if (attempts > 50) break;
// //       } while (word.length < 8 || countSpellingInOrder(word, targetWord) > 0); // Increased from 5 to 8
// //     }
// //     words.push(word);
// //   }
  
// //   return { words, occurrences };
// // }

// // // -----------------------------------
// // // Generate Options - Now with closer wrong answers
// // // -----------------------------------

// // function generateOptions(correctAnswer) {
// //   const correctNum = parseInt(correctAnswer);
// //   const options = new Set();
// //   options.add(correctAnswer);
  
// //   // Generate wrong options that are close to the correct answer
// //   const wrongOptions = [];
  
// //   // Try to generate numbers within +/- 3 of the correct answer
// //   const range = 3;
// //   for (let i = correctNum - range; i <= correctNum + range; i++) {
// //     if (i !== correctNum && i >= 0 && i <= 10) {
// //       wrongOptions.push(i.toString());
// //     }
// //   }
  
// //   // If we don't have enough wrong options, add more from a wider range
// //   if (wrongOptions.length < 4) {
// //     const widerRange = 5;
// //     for (let i = correctNum - widerRange; i <= correctNum + widerRange; i++) {
// //       if (i !== correctNum && i >= 0 && i <= 10 && !wrongOptions.includes(i.toString())) {
// //         wrongOptions.push(i.toString());
// //       }
// //     }
// //   }
  
// //   // If we still don't have enough, add from the full range
// //   if (wrongOptions.length < 4) {
// //     for (let i = 0; i <= 10; i++) {
// //       if (i !== correctNum && !wrongOptions.includes(i.toString())) {
// //         wrongOptions.push(i.toString());
// //       }
// //     }
// //   }
  
// //   // Shuffle and pick 4 wrong options
// //   shuffle(wrongOptions);
// //   const selectedWrong = wrongOptions.slice(0, 4);
  
// //   // Add all wrong options to the set
// //   for (const wrong of selectedWrong) {
// //     options.add(wrong);
// //   }
  
// //   // If we somehow don't have 5 options, add fallbacks
// //   const fallbacks = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
// //   while (options.size < 5) {
// //     const fallback = getRandom(fallbacks);
// //     if (!options.has(fallback)) {
// //       options.add(fallback);
// //     }
// //   }
  
// //   return shuffle([...options]);
// // }

// // // -----------------------------------
// // // Get Random Target Word 
// // // -----------------------------------

// // function getRandomTargetWord() {
// //   // You can add more target words here
// //   const wordList = [
// //     "avi", "the", "cat", "dog", "fun", "run", "sky", "fly"
// //   ];
  
// //   return getRandom(wordList);
// // }

// // // -----------------------------------
// // // Main Function
// // // -----------------------------------

// // export function generatePuzzle_word_search(options = {}) {
// //   // Get random target word if not provided
// //   const targetWord = options.targetWord || getRandomTargetWord();
  
// //   // Destructure with defaults
// //   const {
// //     totalWords = 5,
// //     width = 400,
// //     height = 250,
// //     showWatermark = true,
// //     watermarkText = "Powered by AVI",
// //     wordColors = true
// //   } = options;
  
// //   // Generate words - some have multiple occurrences of the spelling
// //   const { words, occurrences } = generateWordsWithSpelling(targetWord, totalWords);
  
// //   // Calculate total occurrences across all words
// //   let totalOccurrences = 0;
// //   for (const word of words) {
// //     totalOccurrences += countSpellingInOrder(word, targetWord);
// //   }
  
// //   // Answer is the total number of times the spelling appears across all words
// //   const answer = totalOccurrences.toString();
  
// //   // ---------------- CANVAS ----------------
// //   const canvas = createCanvas(width, height);
// //   const ctx = canvas.getContext("2d");
  
// //   // Background gradient
// //   const bgGradient = ctx.createLinearGradient(0, 0, width, height);
// //   bgGradient.addColorStop(0, '#f8f9fa');
// //   bgGradient.addColorStop(0.5, '#e9ecef');
// //   bgGradient.addColorStop(1, '#f8f9fa');
// //   ctx.fillStyle = bgGradient;
// //   ctx.fillRect(0, 0, width, height);
  
// //   // Color palette for words
// //   const colorPalette = [
// //     '#2C3E50', '#E74C3C', '#2980B9', '#27AE60', '#8E44AD', '#F39C12',
// //     '#1ABC9C', '#D35400', '#3498DB', '#2ECC71', '#9B59B6', '#E67E22',
// //     '#16A085', '#C0392B', '#2471A3', '#229954', '#7D3C98', '#D4AC0D'
// //   ];
  
// //   // Spread words randomly across the image
// //   const startY = 35;
// //   // Adjust font size for longer words
// //   const fontSize = Math.min(16, Math.max(12, 320 / totalWords));
// //   const margin = 15;
// //   const minDistance = Math.max(35, 60 - totalWords);
  
// //   // Create random positions for each word
// //   const wordPositions = [];
// //   const usedPositions = [];
  
// //   for (let i = 0; i < words.length; i++) {
// //     const word = words[i];
// //     ctx.font = `bold ${fontSize}px Arial`;
// //     const metrics = ctx.measureText(word);
// //     const wordWidth = metrics.width;
    
// //     let x, y, attempts = 0;
// //     let overlap = true;
// //     const maxAttempts = 200;
    
// //     while (overlap && attempts < maxAttempts) {
// //       x = margin + Math.random() * (width - margin * 2 - wordWidth);
// //       y = startY + Math.random() * (height - startY - margin - 25);
      
// //       overlap = false;
// //       for (const pos of usedPositions) {
// //         const distance = Math.sqrt(
// //           Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2)
// //         );
// //         if (distance < minDistance) {
// //           overlap = true;
// //           break;
// //         }
// //         const horizontalOverlap = (x < pos.x + pos.width + 5) && (x + wordWidth + 5 > pos.x);
// //         const verticalOverlap = Math.abs(y - pos.y) < 20;
// //         if (horizontalOverlap && verticalOverlap) {
// //           overlap = true;
// //           break;
// //         }
// //       }
// //       attempts++;
// //     }
    
// //     usedPositions.push({ x, y, width: wordWidth });
// //     wordPositions.push({ word, x, y });
// //   }
  
// //   // Draw each word at its random position
// //   for (const { word, x, y } of wordPositions) {
// //     const color = wordColors ? getRandom(colorPalette) : '#2C3E50';
    
// //     ctx.save();
    
// //     // Add white outline/shadow for readability
// //     ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
// //     ctx.shadowBlur = 6;
// //     ctx.fillStyle = color;
// //     ctx.font = `bold ${fontSize}px Arial`;
// //     ctx.textAlign = 'left';
// //     ctx.textBaseline = 'top';
// //     ctx.fillText(word, x, y);
    
// //     // Draw the actual text
// //     ctx.shadowColor = 'rgba(0, 0, 0, 0.05)';
// //     ctx.shadowBlur = 2;
// //     ctx.fillText(word, x, y);
    
// //     ctx.restore();
// //   }
  
// //   // ---------------- WATERMARK ----------------
// //   if (showWatermark) {
// //     ctx.save();
// //     ctx.globalAlpha = 0.6;
// //     ctx.textAlign = "right";
// //     ctx.textBaseline = "bottom";
    
// //     ctx.font = "bold 14px Arial";
// //     ctx.fillStyle = "#232425";
// //     ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
// //     ctx.shadowBlur = 2;
// //     ctx.fillText(watermarkText, width - 15, height - 8);
    
// //     ctx.restore();
// //   }
  
// //   // Generate options
// //   const generatedOptions = generateOptions(answer);
  
// //   // -----------------------------------
// //   // Return
// //   // -----------------------------------
  
// //   return {
// //     question: `How many times does the letter sequence '${targetWord}' appear in the given words? (Look carefully - it can appear multiple times in a single word!)`,
// //     options: generatedOptions,
// //     answer: answer,
// //     targetWord: targetWord,
// //     totalWords: totalWords,
// //     occurrences: occurrences,
// //     words: words,
// //     totalOccurrences: totalOccurrences,
// //     image: canvas.toDataURL().split(",")[1]
// //   };
// // }
















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
// // Check how many times the target spelling appears in order in a word
// // -----------------------------------

// function countSpellingInOrder(word, target) {
//   let count = 0;
//   let targetIndex = 0;
  
//   for (let i = 0; i < word.length; i++) {
//     if (word[i] === target[targetIndex]) {
//       targetIndex++;
//       if (targetIndex === target.length) {
//         count++;
//         targetIndex = 0; // Reset to find next occurrence
//       }
//     }
//   }
//   return count;
// }

// // -----------------------------------
// // Generate a word that contains the target spelling multiple times
// // with length between 7-10 letters
// // Example: if target is "avi", it might generate "anadgdjaviavvgaskiaavia" 
// // (contains "avi" multiple times)
// // -----------------------------------

// function generateWordWithMultipleSpellings(targetWord, occurrences) {
//   const targetLetters = targetWord.split('');
//   const targetLength = targetLetters.length;
//   let word = '';
  
//   // Calculate how many filler letters we need to reach 7-10 total length
//   const totalTargetLetters = targetLength * occurrences; // e.g., "avi" * 2 = 6 letters
//   const minLength = 7;
//   const maxLength = 10;
  
//   // Determine random target length between 7-10
//   const targetTotalLength = rand(minLength, maxLength);
//   const fillerNeeded = targetTotalLength - totalTargetLetters;
  
//   // Distribute filler letters before, between, and after
//   let fillerBefore = Math.floor(fillerNeeded / 3);
//   let fillerBetween = Math.floor(fillerNeeded / 3);
//   let fillerAfter = fillerNeeded - fillerBefore - fillerBetween;
  
//   // Adjust to ensure we have enough for each position
//   if (fillerBefore < 0) fillerBefore = 0;
//   if (fillerBetween < 0) fillerBetween = 0;
//   if (fillerAfter < 0) fillerAfter = 0;
  
//   // Add random letters at the beginning
//   word += generateRandomLetters(rand(1, Math.min(3, fillerBefore + 1)));
  
//   // Build the word with multiple occurrences of the spelling
//   for (let o = 0; o < occurrences; o++) {
//     // Add some random letters before this occurrence
//     const beforeCount = o === 0 ? rand(1, 2) : rand(0, 1);
//     if (beforeCount > 0 && fillerBefore > 0) {
//       word += generateRandomLetters(beforeCount);
//       fillerBefore -= beforeCount;
//     }
    
//     // Add the target spelling in order
//     for (let i = 0; i < targetLetters.length; i++) {
//       // Sometimes add extra letters between target letters
//       if (i > 0 && Math.random() < 0.3 && fillerBetween > 0) {
//         const betweenCount = rand(0, 1);
//         if (betweenCount > 0) {
//           word += generateRandomLetters(betweenCount);
//           fillerBetween -= betweenCount;
//         }
//       }
//       word += targetLetters[i];
//     }
//   }
  
//   // Add random letters at the end
//   const endCount = rand(1, Math.min(3, fillerAfter + 1));
//   if (endCount > 0) {
//     word += generateRandomLetters(endCount);
//   }
  
//   // Ensure word length is between 7-10
//   while (word.length < minLength) {
//     word += generateRandomLetters(1);
//   }
  
//   while (word.length > maxLength) {
//     // Remove characters, but keep the target spellings intact
//     // Simple approach: trim from the end
//     word = word.substring(0, maxLength);
//   }
  
//   return word;
// }

// // -----------------------------------
// // Generate a word that DOES NOT contain the target spelling in order
// // with length between 7-10 letters
// // -----------------------------------

// function generateWordWithoutSpelling(targetWord) {
//   const targetLetters = targetWord.split('');
//   let word = '';
//   let attempts = 0;
  
//   do {
//     // Create a word with length between 7-10
//     const wordLength = rand(7, 10);
//     let tempWord = '';
    
//     // Include some but not all target letters
//     const includeCount = rand(0, targetLetters.length - 1);
//     const shuffledTarget = shuffle([...targetLetters]);
//     const selectedLetters = shuffledTarget.slice(0, includeCount);
    
//     // Build the word
//     let allLetters = [...selectedLetters];
//     // Add random letters
//     const extraCount = wordLength - selectedLetters.length;
//     allLetters = [...allLetters, ...generateRandomLetters(extraCount).split('')];
    
//     // Shuffle all letters
//     tempWord = shuffle(allLetters).join('');
    
//     // Check length and if it doesn't contain the spelling
//     if (tempWord.length >= 7 && tempWord.length <= 10 && 
//         !countSpellingInOrder(tempWord, targetWord)) {
//       word = tempWord;
//       break;
//     }
//     attempts++;
//   } while (attempts < 100);
  
//   // If we couldn't generate a word, create a simple one
//   if (!word) {
//     word = generateRandomLetters(rand(7, 10));
//     // Make sure it doesn't contain the spelling
//     let checkCount = 0;
//     while (countSpellingInOrder(word, targetWord) > 0 && checkCount < 50) {
//       word = shuffle(word.split('')).join('');
//       checkCount++;
//     }
//   }
  
//   return word;
// }

// // -----------------------------------
// // Generate Words - Mix of words with different occurrence counts
// // -----------------------------------

// function generateWordsWithSpelling(targetWord, totalWords = 5) {
//   const words = [];
//   const occurrences = [];
  
//   // Randomly decide how many words will have the spelling (0 to totalWords)
//   const wordsWithSpelling = rand(1, Math.min(totalWords, 3)); // At least 1 word has it
  
//   // For words that have the spelling, decide how many times it appears (1-2 times)
//   // Limiting to 1-2 to keep words at 7-10 letters
//   for (let i = 0; i < wordsWithSpelling; i++) {
//     const occCount = rand(1, 2); // 1 to 2 occurrences
//     occurrences.push(occCount);
//   }
  
//   // Fill remaining words with no spelling
//   const wordsWithoutSpelling = totalWords - wordsWithSpelling;
//   for (let i = 0; i < wordsWithoutSpelling; i++) {
//     occurrences.push(0);
//   }
  
//   // Shuffle the occurrences
//   shuffle(occurrences);
  
//   // Generate words based on occurrences
//   for (let i = 0; i < totalWords; i++) {
//     let word = '';
//     let attempts = 0;
//     const occCount = occurrences[i];
    
//     if (occCount > 0) {
//       // Generate word with multiple occurrences
//       do {
//         word = generateWordWithMultipleSpellings(targetWord, occCount);
//         attempts++;
//         if (attempts > 100) break;
//       } while (word.length < 7 || word.length > 10 || 
//                countSpellingInOrder(word, targetWord) !== occCount);
//     } else {
//       // Generate word without the spelling
//       do {
//         word = generateWordWithoutSpelling(targetWord);
//         attempts++;
//         if (attempts > 100) break;
//       } while (word.length < 7 || word.length > 10 || 
//                countSpellingInOrder(word, targetWord) > 0);
//     }
//     words.push(word);
//   }
  
//   return { words, occurrences };
// }

// // -----------------------------------
// // Generate Options - Now with closer wrong answers
// // -----------------------------------

// function generateOptions(correctAnswer) {
//   const correctNum = parseInt(correctAnswer);
//   const options = new Set();
//   options.add(correctAnswer);
  
//   // Generate wrong options that are close to the correct answer
//   const wrongOptions = [];
  
//   // Try to generate numbers within +/- 3 of the correct answer
//   const range = 3;
//   for (let i = correctNum - range; i <= correctNum + range; i++) {
//     if (i !== correctNum && i >= 0 && i <= 10) {
//       wrongOptions.push(i.toString());
//     }
//   }
  
//   // If we don't have enough wrong options, add more from a wider range
//   if (wrongOptions.length < 4) {
//     const widerRange = 5;
//     for (let i = correctNum - widerRange; i <= correctNum + widerRange; i++) {
//       if (i !== correctNum && i >= 0 && i <= 10 && !wrongOptions.includes(i.toString())) {
//         wrongOptions.push(i.toString());
//       }
//     }
//   }
  
//   // If we still don't have enough, add from the full range
//   if (wrongOptions.length < 4) {
//     for (let i = 0; i <= 10; i++) {
//       if (i !== correctNum && !wrongOptions.includes(i.toString())) {
//         wrongOptions.push(i.toString());
//       }
//     }
//   }
  
//   // Shuffle and pick 4 wrong options
//   shuffle(wrongOptions);
//   const selectedWrong = wrongOptions.slice(0, 4);
  
//   // Add all wrong options to the set
//   for (const wrong of selectedWrong) {
//     options.add(wrong);
//   }
  
//   // If we somehow don't have 5 options, add fallbacks
//   const fallbacks = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
//   while (options.size < 5) {
//     const fallback = getRandom(fallbacks);
//     if (!options.has(fallback)) {
//       options.add(fallback);
//     }
//   }
  
//   return shuffle([...options]);
// }

// // -----------------------------------
// // Get Random Target Word 
// // -----------------------------------

// function getRandomTargetWord() {
//   // You can add more target words here
//   const wordList = [
//     "avi", "the", "cat", "dog", "fun", "run", "sky", "fly"
//   ];
  
//   return getRandom(wordList);
// }

// // -----------------------------------
// // Main Function
// // -----------------------------------

// export function generatePuzzle_word_search(options = {}) {
//   // Get random target word if not provided
//   const targetWord = options.targetWord || getRandomTargetWord();
  
//   // Destructure with defaults
//   const {
//     totalWords = 5,
//     width = 400,
//     height = 250,
//     showWatermark = true,
//     watermarkText = "Powered by AVI",
//     wordColors = true
//   } = options;
  
//   // Generate words - some have multiple occurrences of the spelling
//   const { words, occurrences } = generateWordsWithSpelling(targetWord, totalWords);
  
//   // Calculate total occurrences across all words
//   let totalOccurrences = 0;
//   for (const word of words) {
//     totalOccurrences += countSpellingInOrder(word, targetWord);
//   }
  
//   // Answer is the total number of times the spelling appears across all words
//   const answer = totalOccurrences.toString();
  
//   // ---------------- CANVAS ----------------
//   const canvas = createCanvas(width, height);
//   const ctx = canvas.getContext("2d");
  
//   // Background gradient
//   const bgGradient = ctx.createLinearGradient(0, 0, width, height);
//   bgGradient.addColorStop(0, '#f8f9fa');
//   bgGradient.addColorStop(0.5, '#e9ecef');
//   bgGradient.addColorStop(1, '#f8f9fa');
//   ctx.fillStyle = bgGradient;
//   ctx.fillRect(0, 0, width, height);
  
//   // Color palette for words
//   const colorPalette = [
//     '#2C3E50', '#E74C3C', '#2980B9', '#27AE60', '#8E44AD', '#F39C12',
//     '#1ABC9C', '#D35400', '#3498DB', '#2ECC71', '#9B59B6', '#E67E22',
//     '#16A085', '#C0392B', '#2471A3', '#229954', '#7D3C98', '#D4AC0D'
//   ];
  
//   // Spread words randomly across the image
//   const startY = 35;
//   const fontSize = Math.min(20, Math.max(16, 380 / totalWords));
//   const margin = 15;
//   const minDistance = Math.max(30, 50 - totalWords);
  
//   // Create random positions for each word
//   const wordPositions = [];
//   const usedPositions = [];
  
//   for (let i = 0; i < words.length; i++) {
//     const word = words[i];
//     ctx.font = `bold ${fontSize}px Arial`;
//     const metrics = ctx.measureText(word);
//     const wordWidth = metrics.width;
    
//     let x, y, attempts = 0;
//     let overlap = true;
//     const maxAttempts = 200;
    
//     while (overlap && attempts < maxAttempts) {
//       x = margin + Math.random() * (width - margin * 2 - wordWidth);
//       y = startY + Math.random() * (height - startY - margin - 25);
      
//       overlap = false;
//       for (const pos of usedPositions) {
//         const distance = Math.sqrt(
//           Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2)
//         );
//         if (distance < minDistance) {
//           overlap = true;
//           break;
//         }
//         const horizontalOverlap = (x < pos.x + pos.width + 5) && (x + wordWidth + 5 > pos.x);
//         const verticalOverlap = Math.abs(y - pos.y) < 20;
//         if (horizontalOverlap && verticalOverlap) {
//           overlap = true;
//           break;
//         }
//       }
//       attempts++;
//     }
    
//     usedPositions.push({ x, y, width: wordWidth });
//     wordPositions.push({ word, x, y });
//   }
  
//   // Draw each word at its random position
//   for (const { word, x, y } of wordPositions) {
//     const color = wordColors ? getRandom(colorPalette) : '#2C3E50';
    
//     ctx.save();
    
//     // Add white outline/shadow for readability
//     ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
//     ctx.shadowBlur = 6;
//     ctx.fillStyle = color;
//     ctx.font = `bold ${fontSize}px Arial`;
//     ctx.textAlign = 'left';
//     ctx.textBaseline = 'top';
//     ctx.fillText(word, x, y);
    
//     // Draw the actual text
//     ctx.shadowColor = 'rgba(0, 0, 0, 0.05)';
//     ctx.shadowBlur = 2;
//     ctx.fillText(word, x, y);
    
//     ctx.restore();
//   }
  
//   // ---------------- WATERMARK ----------------
//   if (showWatermark) {
//     ctx.save();
//     ctx.globalAlpha = 0.6;
//     ctx.textAlign = "right";
//     ctx.textBaseline = "bottom";
    
//     ctx.font = "bold 14px Arial";
//     ctx.fillStyle = "#232425";
//     ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
//     ctx.shadowBlur = 2;
//     ctx.fillText(watermarkText, width - 15, height - 8);
    
//     ctx.restore();
//   }
  
//   // Generate options
//   const generatedOptions = generateOptions(answer);
  
//   // -----------------------------------
//   // Return
//   // -----------------------------------
  
//   return {
//     question: `How many times does the letter sequence '${targetWord}' appear in the given words? (Look carefully - it can appear multiple times in a single word!)`,
//     options: generatedOptions,
//     answer: answer,
//     targetWord: targetWord,
//     totalWords: totalWords,
//     occurrences: occurrences,
//     words: words,
//     totalOccurrences: totalOccurrences,
//     image: canvas.toDataURL().split(",")[1]
//   };
// }






























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
// Check how many times the target spelling appears in order in a word
// -----------------------------------

function countSpellingInOrder(word, target) {
  let count = 0;
  let targetIndex = 0;
  
  for (let i = 0; i < word.length; i++) {
    if (word[i] === target[targetIndex]) {
      targetIndex++;
      if (targetIndex === target.length) {
        count++;
        targetIndex = 0; // Reset to find next occurrence
      }
    }
  }
  return count;
}

// -----------------------------------
// Generate a word that contains the target spelling multiple times
// with length between 7-10 letters
// -----------------------------------

function generateWordWithMultipleSpellings(targetWord, occurrences) {
  const targetLetters = targetWord.split('');
  const targetLength = targetLetters.length;
  let word = '';
  
  // Calculate how many filler letters we need to reach 7-10 total length
  const totalTargetLetters = targetLength * occurrences;
  const minLength = 7;
  const maxLength = 10;
  
  // Determine random target length between 7-10
  const targetTotalLength = rand(minLength, maxLength);
  const fillerNeeded = targetTotalLength - totalTargetLetters;
  
  // Distribute filler letters before, between, and after
  let fillerBefore = Math.floor(fillerNeeded / 3);
  let fillerBetween = Math.floor(fillerNeeded / 3);
  let fillerAfter = fillerNeeded - fillerBefore - fillerBetween;
  
  // Adjust to ensure we have enough for each position
  if (fillerBefore < 0) fillerBefore = 0;
  if (fillerBetween < 0) fillerBetween = 0;
  if (fillerAfter < 0) fillerAfter = 0;
  
  // Add random letters at the beginning
  word += generateRandomLetters(rand(1, Math.min(3, fillerBefore + 1)));
  
  // Build the word with multiple occurrences of the spelling
  for (let o = 0; o < occurrences; o++) {
    // Add some random letters before this occurrence
    const beforeCount = o === 0 ? rand(1, 2) : rand(0, 1);
    if (beforeCount > 0 && fillerBefore > 0) {
      word += generateRandomLetters(beforeCount);
      fillerBefore -= beforeCount;
    }
    
    // Add the target spelling in order
    for (let i = 0; i < targetLetters.length; i++) {
      // Sometimes add extra letters between target letters
      if (i > 0 && Math.random() < 0.3 && fillerBetween > 0) {
        const betweenCount = rand(0, 1);
        if (betweenCount > 0) {
          word += generateRandomLetters(betweenCount);
          fillerBetween -= betweenCount;
        }
      }
      word += targetLetters[i];
    }
  }
  
  // Add random letters at the end
  const endCount = rand(1, Math.min(3, fillerAfter + 1));
  if (endCount > 0) {
    word += generateRandomLetters(endCount);
  }
  
  // Ensure word length is between 7-10
  while (word.length < minLength) {
    word += generateRandomLetters(1);
  }
  
  while (word.length > maxLength) {
    word = word.substring(0, maxLength);
  }
  
  return word;
}

// -----------------------------------
// Generate a word that DOES NOT contain the target spelling in order
// with length between 7-10 letters
// -----------------------------------

function generateWordWithoutSpelling(targetWord) {
  const targetLetters = targetWord.split('');
  let word = '';
  let attempts = 0;
  
  do {
    // Create a word with length between 7-10
    const wordLength = rand(7, 10);
    let tempWord = '';
    
    // Include some but not all target letters
    const includeCount = rand(0, targetLetters.length - 1);
    const shuffledTarget = shuffle([...targetLetters]);
    const selectedLetters = shuffledTarget.slice(0, includeCount);
    
    // Build the word
    let allLetters = [...selectedLetters];
    // Add random letters
    const extraCount = wordLength - selectedLetters.length;
    allLetters = [...allLetters, ...generateRandomLetters(extraCount).split('')];
    
    // Shuffle all letters
    tempWord = shuffle(allLetters).join('');
    
    // Check length and if it doesn't contain the spelling
    if (tempWord.length >= 7 && tempWord.length <= 10 && 
        !countSpellingInOrder(tempWord, targetWord)) {
      word = tempWord;
      break;
    }
    attempts++;
  } while (attempts < 100);
  
  // If we couldn't generate a word, create a simple one
  if (!word) {
    word = generateRandomLetters(rand(7, 10));
    // Make sure it doesn't contain the spelling
    let checkCount = 0;
    while (countSpellingInOrder(word, targetWord) > 0 && checkCount < 50) {
      word = shuffle(word.split('')).join('');
      checkCount++;
    }
  }
  
  return word;
}

// -----------------------------------
// Generate Words - Mix of words with different occurrence counts
// -----------------------------------

function generateWordsWithSpelling(targetWord, totalWords = 5) {
  const words = [];
  const occurrences = [];
  
  // Randomly decide how many words will have the spelling (0 to totalWords)
  const wordsWithSpelling = rand(1, Math.min(totalWords, 3)); // At least 1 word has it
  
  // For words that have the spelling, decide how many times it appears (1-2 times)
  for (let i = 0; i < wordsWithSpelling; i++) {
    const occCount = rand(1, 2); // 1 to 2 occurrences
    occurrences.push(occCount);
  }
  
  // Fill remaining words with no spelling
  const wordsWithoutSpelling = totalWords - wordsWithSpelling;
  for (let i = 0; i < wordsWithoutSpelling; i++) {
    occurrences.push(0);
  }
  
  // Shuffle the occurrences
  shuffle(occurrences);
  
  // Generate words based on occurrences
  for (let i = 0; i < totalWords; i++) {
    let word = '';
    let attempts = 0;
    const occCount = occurrences[i];
    
    if (occCount > 0) {
      // Generate word with multiple occurrences
      do {
        word = generateWordWithMultipleSpellings(targetWord, occCount);
        attempts++;
        if (attempts > 100) break;
      } while (word.length < 7 || word.length > 10 || 
               countSpellingInOrder(word, targetWord) !== occCount);
    } else {
      // Generate word without the spelling
      do {
        word = generateWordWithoutSpelling(targetWord);
        attempts++;
        if (attempts > 100) break;
      } while (word.length < 7 || word.length > 10 || 
               countSpellingInOrder(word, targetWord) > 0);
    }
    words.push(word);
  }
  
  return { words, occurrences };
}

// -----------------------------------
// Generate Options - VERY CLOSE to correct answer
// -----------------------------------

function generateOptions(correctAnswer) {
  const correctNum = parseInt(correctAnswer);
  const options = new Set();
  options.add(correctAnswer);
  
  // Generate wrong options that are VERY CLOSE to the correct answer
  const wrongOptions = [];
  
  // First try: numbers within +/- 1 of the correct answer
  const nearbyNumbers = [];
  for (let i = correctNum - 1; i <= correctNum + 1; i++) {
    if (i !== correctNum && i >= 0 && i <= 10) {
      nearbyNumbers.push(i.toString());
    }
  }
  
  // Shuffle and add up to 3 nearby numbers
  shuffle(nearbyNumbers);
  for (let i = 0; i < Math.min(3, nearbyNumbers.length); i++) {
    wrongOptions.push(nearbyNumbers[i]);
  }
  
  // If we need more options, try +/- 2
  if (wrongOptions.length < 4) {
    const slightlyFurther = [];
    for (let i = correctNum - 2; i <= correctNum + 2; i++) {
      if (i !== correctNum && i >= 0 && i <= 10 && 
          !wrongOptions.includes(i.toString()) && 
          !nearbyNumbers.includes(i.toString())) {
        slightlyFurther.push(i.toString());
      }
    }
    shuffle(slightlyFurther);
    for (let i = 0; i < Math.min(2, slightlyFurther.length); i++) {
      wrongOptions.push(slightlyFurther[i]);
    }
  }
  
  // If we still need more options, try +/- 3
  if (wrongOptions.length < 4) {
    const evenFurther = [];
    for (let i = correctNum - 3; i <= correctNum + 3; i++) {
      if (i !== correctNum && i >= 0 && i <= 10 && 
          !wrongOptions.includes(i.toString())) {
        evenFurther.push(i.toString());
      }
    }
    shuffle(evenFurther);
    for (let i = 0; i < Math.min(2, evenFurther.length); i++) {
      wrongOptions.push(evenFurther[i]);
    }
  }
  
  // If we STILL don't have enough, add from full range
  if (wrongOptions.length < 4) {
    for (let i = 0; i <= 10; i++) {
      if (i !== correctNum && !wrongOptions.includes(i.toString())) {
        wrongOptions.push(i.toString());
        if (wrongOptions.length >= 4) break;
      }
    }
  }
  
  // Pick exactly 4 wrong options
  const selectedWrong = wrongOptions.slice(0, 4);
  
  // Add all wrong options to the set
  for (const wrong of selectedWrong) {
    options.add(wrong);
  }
  
  // If we somehow don't have 5 options, add fallbacks
  const fallbacks = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  while (options.size < 5) {
    const fallback = getRandom(fallbacks);
    if (!options.has(fallback)) {
      options.add(fallback);
    }
  }
  
  return shuffle([...options]);
}

// -----------------------------------
// Get Random Target Word 
// -----------------------------------

function getRandomTargetWord() {
  const wordList = [
    "avi", "the", "cat", "dog", "fun", "run", "sky", "fly"
  ];
  
  return getRandom(wordList);
}

// -----------------------------------
// Main Function
// -----------------------------------

export function generatePuzzle_word_search(options = {}) {
  // Get random target word if not provided
  const targetWord = options.targetWord || getRandomTargetWord();
  
  // Destructure with defaults
  const {
    totalWords = 5,
    width = 400,
    height = 250,
    showWatermark = true,
    watermarkText = "Powered by AVI",
    wordColors = true
  } = options;
  
  // Generate words - some have multiple occurrences of the spelling
  const { words, occurrences } = generateWordsWithSpelling(targetWord, totalWords);
  
  // Calculate total occurrences across all words
  let totalOccurrences = 0;
  for (const word of words) {
    totalOccurrences += countSpellingInOrder(word, targetWord);
  }
  
  // Answer is the total number of times the spelling appears across all words
  const answer = totalOccurrences.toString();
  
  // ---------------- CANVAS ----------------
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  
  // Background gradient
  const bgGradient = ctx.createLinearGradient(0, 0, width, height);
  bgGradient.addColorStop(0, '#f8f9fa');
  bgGradient.addColorStop(0.5, '#e9ecef');
  bgGradient.addColorStop(1, '#f8f9fa');
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, width, height);
  
  // Color palette for words
  const colorPalette = [
    '#2C3E50', '#E74C3C', '#2980B9', '#27AE60', '#8E44AD', '#F39C12',
    '#1ABC9C', '#D35400', '#3498DB', '#2ECC71', '#9B59B6', '#E67E22',
    '#16A085', '#C0392B', '#2471A3', '#229954', '#7D3C98', '#D4AC0D'
  ];
  
  // Spread words randomly across the image
  const startY = 35;
  const fontSize = Math.min(20, Math.max(16, 380 / totalWords));
  const margin = 15;
  const minDistance = Math.max(30, 50 - totalWords);
  
  // Create random positions for each word
  const wordPositions = [];
  const usedPositions = [];
  
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    ctx.font = `bold ${fontSize}px Arial`;
    const metrics = ctx.measureText(word);
    const wordWidth = metrics.width;
    
    let x, y, attempts = 0;
    let overlap = true;
    const maxAttempts = 200;
    
    while (overlap && attempts < maxAttempts) {
      x = margin + Math.random() * (width - margin * 2 - wordWidth);
      y = startY + Math.random() * (height - startY - margin - 25);
      
      overlap = false;
      for (const pos of usedPositions) {
        const distance = Math.sqrt(
          Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2)
        );
        if (distance < minDistance) {
          overlap = true;
          break;
        }
        const horizontalOverlap = (x < pos.x + pos.width + 5) && (x + wordWidth + 5 > pos.x);
        const verticalOverlap = Math.abs(y - pos.y) < 20;
        if (horizontalOverlap && verticalOverlap) {
          overlap = true;
          break;
        }
      }
      attempts++;
    }
    
    usedPositions.push({ x, y, width: wordWidth });
    wordPositions.push({ word, x, y });
  }
  
  // Draw each word at its random position
  for (const { word, x, y } of wordPositions) {
    const color = wordColors ? getRandom(colorPalette) : '#2C3E50';
    
    ctx.save();
    
    // Add white outline/shadow for readability
    ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
    ctx.shadowBlur = 6;
    ctx.fillStyle = color;
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(word, x, y);
    
    // Draw the actual text
    ctx.shadowColor = 'rgba(0, 0, 0, 0.05)';
    ctx.shadowBlur = 2;
    ctx.fillText(word, x, y);
    
    ctx.restore();
  }
  
  // ---------------- WATERMARK ----------------
  if (showWatermark) {
    ctx.save();
    ctx.globalAlpha = 0.6;
    ctx.textAlign = "right";
    ctx.textBaseline = "bottom";
    
    ctx.font = "bold 14px Arial";
    ctx.fillStyle = "#232425";
    ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
    ctx.shadowBlur = 2;
    ctx.fillText(watermarkText, width - 15, height - 8);
    
    ctx.restore();
  }
  
  // Generate options
  const generatedOptions = generateOptions(answer);
  
  // -----------------------------------
  // Return
  // -----------------------------------
  
  return {
    question: `How many times does the letter sequence '${targetWord}' appear in the given words?`,
    options: generatedOptions,
    answer: answer,
    targetWord: targetWord,
    totalWords: totalWords,
    occurrences: occurrences,
    words: words,
    totalOccurrences: totalOccurrences,
    image: canvas.toDataURL().split(",")[1]
  };
}