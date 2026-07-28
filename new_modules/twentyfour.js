import { createCanvas } from "canvas";

// -----------------------------------
// Helpers
// -----------------------------------

function shuffle(arr) {
  // Fisher-Yates shuffle for better randomness
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
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
// Word List for Puzzles
// -----------------------------------

const wordList = [
  "kick", "book", "look", "take", "make", "cake", "bake", "lake",
  "game", "name", "same", "time", "life", "love", "move", "home",
  "hope", "rope", "type", "copy", "city", "baby", "lady", "party",
  "happy", "funny", "sunny", "rainy", "windy", "cloud", "storm",
  "apple", "table", "chair", "house", "mouse", "clock", "block",
  "plant", "plane", "train", "brain", "brush", "crush", "drink",
  "think", "thank", "thing", "young", "mouse", "house", "horse",
  "heart", "earth", "water", "fire", "stone", "light", "sound",
  "Avi"
];

// -----------------------------------
// Get Random Word
// -----------------------------------

function getRandomWord() {
  return getRandom(wordList);
}

// -----------------------------------
// Get Random Word or Letters
// -----------------------------------

function getRandomWordOrLetters(input) {
  // If input is a number, generate that many random letters
  if (typeof input === 'number') {
    return generateRandomLetters(input);
  }
  // If input is a string, use it as the word
  if (typeof input === 'string' && input.length > 0) {
    return input;
  }
  // Default: get a random word from the list
  return getRandomWord();
}

// -----------------------------------
// Generate Alphabetical Arrangement Pattern
// -----------------------------------

function generateAlphabeticalPuzzle(word) {
  const lettersWithPositions = [];
  for (let i = 0; i < word.length; i++) {
    lettersWithPositions.push({
      letter: word[i],
      originalPosition: i + 1
    });
  }
  
  const sorted = [...lettersWithPositions].sort((a, b) => {
    if (a.letter < b.letter) return -1;
    if (a.letter > b.letter) return 1;
    return 0;
  });
  
  const answer = sorted.map(item => item.originalPosition).join('');
  const sortedWord = sorted.map(item => item.letter).join('');
  
  return {
    answer: answer,
    sortedWord: sortedWord,
    originalWord: word,
    letterPositions: lettersWithPositions,
    sortedPositions: sorted.map(item => item.originalPosition)
  };
}

// -----------------------------------
// Generate Options - RELIABLE VERSION
// -----------------------------------

function generateOptions(correctAnswer) {
  const correctNum = parseInt(correctAnswer);
  const answerLength = correctAnswer.length;
  
  // 30% chance that "None of the above" is the correct answer
  const isNoneOfTheAboveCorrect = Math.random() < 0.3;
  
  // Generate wrong options
  const wrongOptions = new Set();
  
  // Strategy 1: Numbers close to the correct answer
  const nearbyNumbers = [];
  const range = 5;
  for (let i = correctNum - range; i <= correctNum + range; i++) {
    if (i !== correctNum && i >= 0 && i <= 9999) {
      const str = i.toString().padStart(answerLength, '0');
      if (str.length === answerLength) {
        nearbyNumbers.push(str);
      }
    }
  }
  
  shuffle(nearbyNumbers);
  for (const num of nearbyNumbers) {
    if (wrongOptions.size < 5) {
      wrongOptions.add(num);
    }
  }
  
  // Strategy 2: Numbers slightly further away
  if (wrongOptions.size < 5) {
    const furtherNumbers = [];
    for (let i = correctNum - 15; i <= correctNum + 15; i++) {
      if (i !== correctNum && i >= 0 && i <= 9999) {
        const str = i.toString().padStart(answerLength, '0');
        if (str.length === answerLength && !wrongOptions.has(str)) {
          furtherNumbers.push(str);
        }
      }
    }
    shuffle(furtherNumbers);
    for (const num of furtherNumbers) {
      if (wrongOptions.size < 5) {
        wrongOptions.add(num);
      }
    }
  }
  
  // Strategy 3: Permutations of the digits
  if (wrongOptions.size < 5) {
    const digits = correctAnswer.split('');
    for (let i = 0; i < 30; i++) {
      shuffle(digits);
      const perm = digits.join('');
      if (perm !== correctAnswer && 
          !wrongOptions.has(perm) && 
          perm.length === answerLength) {
        wrongOptions.add(perm);
        if (wrongOptions.size >= 5) break;
      }
    }
  }
  
  // Strategy 4: Fallback numbers
  if (wrongOptions.size < 5) {
    const fallbacks = ["1111", "2222", "3333", "4444", "5555", "6666", "7777", "8888", "9999", "0000"];
    for (const fallback of fallbacks) {
      if (fallback !== correctAnswer && 
          !wrongOptions.has(fallback) && 
          fallback.length === answerLength) {
        wrongOptions.add(fallback);
        if (wrongOptions.size >= 5) break;
      }
    }
  }
  
  // Convert Set to Array and shuffle
  let wrongOptionsArray = Array.from(wrongOptions);
  shuffle(wrongOptionsArray);
  
  // Take exactly 4 wrong options (or less if not available)
  let selectedWrong = wrongOptionsArray.slice(0, 4);
  
  // If "None of the above" is correct, we need to include the real answer as a wrong option
  if (isNoneOfTheAboveCorrect) {
    // Remove the real answer from wrong options if it's there
    selectedWrong = selectedWrong.filter(opt => opt !== correctAnswer);
    // Add the real answer as a wrong option
    if (!selectedWrong.includes(correctAnswer) && selectedWrong.length < 4) {
      selectedWrong.push(correctAnswer);
    }
    // Ensure we have exactly 4 wrong options
    while (selectedWrong.length < 4) {
      const fallback = "9999".padStart(answerLength, '0').slice(0, answerLength);
      if (!selectedWrong.includes(fallback) && fallback !== correctAnswer) {
        selectedWrong.push(fallback);
      } else {
        // Try another fallback
        const altFallback = "8888".padStart(answerLength, '0').slice(0, answerLength);
        if (!selectedWrong.includes(altFallback) && altFallback !== correctAnswer) {
          selectedWrong.push(altFallback);
        } else {
          break;
        }
      }
    }
  }
  
  // Ensure we have exactly 4 wrong options (or as many as possible)
  while (selectedWrong.length < 4) {
    const fallback = Math.floor(Math.random() * 9000 + 1000).toString().padStart(answerLength, '0');
    if (!selectedWrong.includes(fallback) && 
        fallback !== correctAnswer && 
        fallback.length === answerLength) {
      selectedWrong.push(fallback);
    } else {
      break; // Prevent infinite loop
    }
  }
  
  // Determine the correct answer
  const actualCorrectAnswer = isNoneOfTheAboveCorrect ? "None of the above" : correctAnswer;
  
  // Build options array with ALL options (correct + wrong)
  let options = [];
  
  // Add the correct answer
  options.push(actualCorrectAnswer);
  
  // Add wrong options (but don't include "None of the above" yet)
  for (const wrong of selectedWrong) {
    if (wrong !== actualCorrectAnswer && wrong !== "None of the above") {
      options.push(wrong);
    }
  }
  
  // Ensure we have at least 4 options before adding "None of the above"
  while (options.length < 4) {
    const fallback = Math.floor(Math.random() * 9000 + 1000).toString().padStart(answerLength, '0');
    if (!options.includes(fallback) && fallback !== correctAnswer && fallback !== "None of the above") {
      options.push(fallback);
    }
  }
  
  // SHUFFLE all options (including the correct answer)
  // This makes the correct answer appear ANYWHERE (positions 0-3)
  options = shuffle(options);
  
  // CRITICAL: "None of the above" is ALWAYS added at the end
  // Remove it if it exists
  const noneIndex = options.indexOf("None of the above");
  if (noneIndex !== -1) {
    options.splice(noneIndex, 1);
  }
  options.push("None of the above");
  
  // Ensure exactly 5 options
  while (options.length < 5) {
    const fallback = Math.floor(Math.random() * 9000 + 1000).toString().padStart(answerLength, '0');
    if (!options.includes(fallback) && fallback !== correctAnswer && fallback !== "None of the above") {
      // Insert before "None of the above"
      options.splice(options.length - 1, 0, fallback);
    }
  }
  
  // If we have more than 5 options, trim
  if (options.length > 5) {
    // Keep: correct answer, "None of the above" (at the end), and 3 random others
    const correctIdx = options.indexOf(actualCorrectAnswer);
    const noneIdx = options.indexOf("None of the above");
    
    let correct = options[correctIdx];
    let none = options[noneIdx];
    
    // Get all other options (excluding correct and "None of the above")
    const others = options.filter((opt, idx) => idx !== correctIdx && idx !== noneIdx && opt !== "None of the above");
    shuffle(others);
    const selectedOthers = others.slice(0, 3);
    
    // Build final array: [3 random options + correct answer shuffled, then "None of the above" at the end]
    let finalOptions = [correct, ...selectedOthers];
    // Shuffle all except the last position (which will be "None of the above")
    const shuffledWithoutNone = shuffle(finalOptions);
    // Add "None of the above" at the end
    options = [...shuffledWithoutNone, none];
  }
  
  // FINAL CHECK: Ensure "None of the above" is ALWAYS at the end
  const lastOption = options[options.length - 1];
  if (lastOption !== "None of the above") {
    // Remove "None of the above" from wherever it is
    const noneIdx = options.indexOf("None of the above");
    if (noneIdx !== -1) {
      options.splice(noneIdx, 1);
      options.push("None of the above");
    } else {
      // If it's not there, add it
      options.push("None of the above");
    }
  }
  
  // Ensure correct answer is NOT "None of the above" unless it should be
  // But if "None of the above" IS the correct answer, make sure it's tracked
  if (isNoneOfTheAboveCorrect) {
    // The correct answer is "None of the above" - but it's at the end
    // We need to keep track of this
    return {
      options: options,
      correctAnswer: "None of the above",
      isNoneOfTheAboveCorrect: true
    };
  } else {
    // The correct answer is a number - make sure it's in the options
    if (!options.includes(correctAnswer)) {
      // Replace the first option (or any option except "None of the above") with the correct answer
      const noneIdx = options.indexOf("None of the above");
      if (noneIdx > 0) {
        options[0] = correctAnswer;
      } else {
        options[options.length - 2] = correctAnswer;
      }
    }
    return {
      options: options,
      correctAnswer: correctAnswer,
      isNoneOfTheAboveCorrect: false
    };
  }
}

// -----------------------------------
// Main Function - Generate Alphabetical Arrangement Puzzle
// -----------------------------------

export function generatePuzzle_alphabetical(options = {}) {
  const {
    word = null,
    letters = null,  // New parameter for letter count
    width = 400,
    height = 250,
    showWatermark = true,
    watermarkText = "Powered by AVI"
  } = options;
  
  // Determine the target word/letters
  let targetWord;
  if (letters && typeof letters === 'number' && letters > 0) {
    // Generate random letters if 'letters' parameter is provided
    targetWord = generateRandomLetters(letters);
  } else if (word) {
    // Use the provided word
    targetWord = word;
  } else {
    // Default: get a random word from the list
    targetWord = getRandomWord();
  }
  
  const puzzleData = generateAlphabeticalPuzzle(targetWord);
  
  // Create question based on what we're showing
  let question;
  if (letters && typeof letters === 'number' && letters > 0) {
    question = `What is the alphabetical arrangement of these random letters: "${targetWord}"?`;
  } else {
    question = `What is the alphabetical arrangement of "${targetWord}"?`;
  }
  
  // ---------------- CANVAS ----------------
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  
  // Clean white background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);
  
  // Simple border
  ctx.strokeStyle = '#e0e0e0';
  ctx.lineWidth = 1;
  ctx.strokeRect(0, 0, width, height);
  
  // Display the word/letters - PLAIN TEXT, NO DECORATIONS
  const centerY = height / 2;
  const fontSize = Math.min(48, Math.max(32, 300 / targetWord.length));
  const spacing = fontSize * 0.6;
  const totalWidth = targetWord.length * (fontSize + spacing) - spacing;
  const startX = (width - totalWidth) / 2;
  
  // Color palette for letters
  const colorPalette = [
    '#2C3E50', '#E74C3C', '#2980B9', '#27AE60', '#8E44AD', '#F39C12',
    '#1ABC9C', '#D35400', '#3498DB', '#2ECC71', '#9B59B6', '#E67E22'
  ];
  
  // Draw each letter as plain text
  for (let i = 0; i < targetWord.length; i++) {
    const x = startX + i * (fontSize + spacing);
    const y = centerY;
    const letter = targetWord[i];
    const color = getRandom(colorPalette);
    
    ctx.save();
    
    ctx.fillStyle = color;
    ctx.font = `bold ${fontSize}px Arial, Helvetica, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(letter.toUpperCase(), x + fontSize/2, y);
    
    ctx.restore();
  }
  
  // ---------------- WATERMARK ----------------

  if (showWatermark) {
    ctx.save();
    ctx.globalAlpha = 1.0;
    ctx.textAlign = "right";
    ctx.textBaseline = "bottom";
    ctx.font = "11px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText(watermarkText, width - 10, height - 8);
    
    ctx.restore();
  }
  
  // Generate options
  const result = generateOptions(puzzleData.answer);
  
  // -----------------------------------
  // Return
  // -----------------------------------
  
  return {
    title: "Alphabetical Arrangement Puzzle",
    question: question,
    options: result.options,
    answer: result.correctAnswer,
    word: targetWord,
    sortedWord: puzzleData.sortedWord,
    wordLength: targetWord.length,
    sortedPositions: puzzleData.sortedPositions,
    image: canvas.toDataURL().split(",")[1],
    hasNoneOfTheAbove: true,
    isNoneOfTheAboveCorrect: result.isNoneOfTheAboveCorrect,
    isRandomLetters: (letters && typeof letters === 'number' && letters > 0) || false
  };
}

// -----------------------------------
// Export all functions
// -----------------------------------

export {
  shuffle,
  getRandom,
  rand,
  generateRandomLetters,
  getRandomWord,
  getRandomWordOrLetters,
  generateAlphabeticalPuzzle,
  generateOptions
};

// -----------------------------------
// Default export
// -----------------------------------

export default {
  generatePuzzle_alphabetical,
  shuffle,
  getRandom,
  rand,
  generateRandomLetters,
  getRandomWord,
  getRandomWordOrLetters,
  generateAlphabeticalPuzzle,
  generateOptions
};