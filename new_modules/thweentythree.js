


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