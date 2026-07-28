
//1931 09-07-2026

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

// Get random words
function getRandomWords(count) {
  const wordList = [
    "hello", "world", "today", "quick", "brown", 
    "jumps", "books", "every", 
    "favorite", "color","shells", 
    "shore", "weather", "outside","football", "friends", 
    "learning", "things", "always", "evening", 
    "music", "makes", "better", "place", "should", 
    "shine", "brightly", "night", "traveling", "biggest", "dream", 
    "brings", "people", "together", "laughter", "medicine", "knowledge", "power", 
    "wisdom", "surprises", "being", "others", "happy", "ocean", 
    "waves", "calming", "watch", "reading", "opens", "worlds", "journey", "thousand", 
    "miles", "begins", "single", "glitters", "actions", "speak", 
    "louder", "words", "beauty", "beholder", "honesty", "policy", "practice", 
    "perfect", "mightier", "sword", "fortune", "favors"
  ];
  
  const shuffledWords = shuffle(wordList);
  return shuffledWords.slice(0, count);
}

// Scramble a word by swapping letters (except first and last)
function scrambleWord(word) {
  if (word.length <= 3) {
    return word;
  }
  
  const letters = word.split('');
  
  // Determine how many positions to change (30-70% of letters)
  const maxPossible = word.length - 2;
  let changeCount = Math.max(1, Math.floor(maxPossible * (0.3 + rand(40) / 100)));
  
  // Get positions that can be changed (not first or last)
  const positions = [];
  for (let i = 1; i < word.length - 1; i++) {
    positions.push(i);
  }
  
  // Shuffle positions and pick how many to change
  const shuffledPositions = shuffle(positions);
  const positionsToChange = shuffledPositions.slice(0, changeCount);
  
  // Perform swaps
  for (let i = 0; i < positionsToChange.length; i++) {
    const pos1 = positionsToChange[i];
    let pos2;
    let attempts = 0;
    do {
      pos2 = positionsToChange[rand(positionsToChange.length)];
      attempts++;
    } while ((pos2 === pos1 || letters[pos1] === letters[pos2]) && attempts < 20);
    
    if (pos1 !== pos2 && letters[pos1] !== letters[pos2]) {
      [letters[pos1], letters[pos2]] = [letters[pos2], letters[pos1]];
    }
  }
  
  return letters.join('');
}

// Get a random color from the palette
function getRandomColor() {
  const colors = [
    '#FF6B6B', // Red
    '#08716a', // Teal
    '#f3cc0d', // Yellow
    '#0ec582', // Mint
    '#f05e24', // Orange
    '#341fd6', // Purple
    '#1e81e3', // Light Blue
    '#eb3273', // Pink
    '#08a284', // Green
    '#d79925', // Gold
    '#ed471e', // Coral
    '#0373c8', // Blue
    '#4a35e2', // Violet
    '#F368E0', // Magenta
    '#00CEC9', // Cyan
    '#FF9FF3', // Light Pink
  ];
  return colors[rand(colors.length)];
}

// Generate confusing options - ALL very close to the answer
function generateConfusingOptions(answer, totalWords) {
  const options = new Set();
  options.add(String(answer)); // Add the correct answer
  
  // Create a pool of numbers very close to the answer (within 1-2)
  const nearbyNumbers = [];
  
  // Add numbers that are 1-2 away from the answer
  for (let i = 1; i <= 2; i++) {
    const lower = answer - i;
    const upper = answer + i;
    if (lower >= 0 && lower <= totalWords) {
      nearbyNumbers.push(lower);
    }
    if (upper >= 0 && upper <= totalWords && upper !== lower) {
      nearbyNumbers.push(upper);
    }
  }
  
  // Shuffle nearby numbers
  const shuffledNearby = shuffle(nearbyNumbers);
  
  // Add nearby numbers as options (up to 3)
  for (let i = 0; i < shuffledNearby.length && options.size < 4; i++) {
    options.add(String(shuffledNearby[i]));
  }
  
  // If we still don't have 4 options, add more numbers (but still close)
  if (options.size < 4) {
    // Add slightly further numbers (3-4 away)
    const furtherNumbers = [];
    for (let i = 3; i <= 4; i++) {
      const lower = answer - i;
      const upper = answer + i;
      if (lower >= 0 && lower <= totalWords && !options.has(String(lower))) {
        furtherNumbers.push(lower);
      }
      if (upper >= 0 && upper <= totalWords && !options.has(String(upper))) {
        furtherNumbers.push(upper);
      }
    }
    
    const shuffledFurther = shuffle(furtherNumbers);
    for (let i = 0; i < shuffledFurther.length && options.size < 4; i++) {
      options.add(String(shuffledFurther[i]));
    }
  }
  
  // Last resort: add any remaining numbers (but still try to keep close)
  let counter = 0;
  while (options.size < 4) {
    if (counter !== answer && counter >= 0 && counter <= totalWords) {
      options.add(String(counter));
    }
    counter++;
    if (counter > totalWords + 5) break; // Safety break
  }
  
  // Final fallback - if still not enough, just add sequential numbers
  while (options.size < 4) {
    let fallback = answer + options.size;
    if (fallback > totalWords) {
      fallback = answer - options.size;
    }
    if (fallback >= 0 && fallback <= totalWords) {
      options.add(String(fallback));
    } else {
      // If all else fails, add 0, 1, 2, 3 as fallback
      options.add(String(options.size));
    }
  }
  
  return shuffle([...options]);
}

export function generatePuzzle_scrambledWords(
  shp, 
  scramblePercentage = 90  // Default: 90% of scramblable words will be scrambled
) {
  // shp = word count
  const wordCount = Number.isFinite(shp) && shp > 0 ? Math.min(shp, 20) : 8;
  
  // Ensure scramblePercentage is between 0 and 100
  const targetPercentage = Math.max(0, Math.min(100, scramblePercentage));
  
  // Get random words
  const words = getRandomWords(wordCount);
  
  // First, identify which words CAN be scrambled (length > 3)
  const scramblableIndices = [];
  for (let i = 0; i < words.length; i++) {
    if (words[i].length > 3) {
      scramblableIndices.push(i);
    }
  }
  
  // If no words can be scrambled, return early
  if (scramblableIndices.length === 0) {
    const finalText = words.join(' ');
    const canvas = createCanvas(400, 200);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 400, 200);
    ctx.fillStyle = "#1a2332";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("No words can be scrambled!", 200, 100);
    
    return {
      question: `How many words are scrambled?`,
      options: ['0', '1', '2', '3'],
      answer: '0',
      originalWords: words,
      scrambledText: finalText,
      totalWords: wordCount,
      scrambledCount: 0,
      scramblePercentage: targetPercentage,
      wordData: words.map(w => ({ original: w, scrambled: w, isScrambled: false })),
      lines: [finalText],
      image: canvas.toDataURL().split(",")[1]
    };
  }
  
  // Calculate target number of scrambled words based on SCRAMBLABLE words only
  const targetScrambled = Math.round((scramblableIndices.length * targetPercentage) / 100);
  
  // Shuffle scramblable indices to randomly select which ones to scramble
  const shuffledScramblable = shuffle(scramblableIndices);
  
  // Select which indices will be scrambled
  const indicesToScramble = new Set(shuffledScramblable.slice(0, targetScrambled));
  
  // Build scrambled words
  const scrambledWords = [];
  let scrambledCount = 0;
  
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    let shouldScramble = indicesToScramble.has(i);
    let scrambledWord;
    
    if (shouldScramble && word.length > 3) {
      scrambledWord = scrambleWord(word);
      // If scrambling failed (rare), keep original
      if (scrambledWord !== word) {
        scrambledCount++;
      } else {
        scrambledWord = word;
        shouldScramble = false;
      }
    } else {
      scrambledWord = word;
      shouldScramble = false;
    }
    
    scrambledWords.push({
      original: word,
      scrambled: scrambledWord,
      isScrambled: shouldScramble && scrambledWord !== word
    });
  }
  
  // Final verification - ensure we have exactly the target number
  let finalScrambledCount = scrambledWords.filter(w => w.isScrambled).length;
  
  // If we have fewer than target, scramble more
  if (finalScrambledCount < targetScrambled) {
    const unscrambledIndices = [];
    for (let i = 0; i < scrambledWords.length; i++) {
      if (!scrambledWords[i].isScrambled && scrambledWords[i].original.length > 3) {
        unscrambledIndices.push(i);
      }
    }
    
    const shuffledUnscrambled = shuffle(unscrambledIndices);
    let needed = targetScrambled - finalScrambledCount;
    
    for (let i = 0; i < shuffledUnscrambled.length && needed > 0; i++) {
      const idx = shuffledUnscrambled[i];
      const word = scrambledWords[idx].original;
      const newScrambled = scrambleWord(word);
      
      if (newScrambled !== word) {
        scrambledWords[idx].scrambled = newScrambled;
        scrambledWords[idx].isScrambled = true;
        finalScrambledCount++;
        needed--;
      }
    }
  }
  
  // Update scrambled count
  scrambledCount = finalScrambledCount;
  
  // Build the final text
  const finalText = scrambledWords.map(w => w.scrambled).join(' ');
  
  // Generate confusing options (close to answer)
  const answer = scrambledCount;
  const options = generateConfusingOptions(answer, wordCount);
  
  // Create canvas with proper text wrapping
  const padding = 40;
  const maxWidth = 700;
  const fontSize = Math.min(28, Math.max(16, Math.floor(400 / (wordCount / 5))));
  const lineHeight = fontSize * 1.8;
  
  // Measure text and wrap lines
  const tempCanvas = createCanvas(10, 10);
  const tempCtx = tempCanvas.getContext("2d");
  tempCtx.font = `${fontSize}px Arial`;
  
  // Split into lines based on width
  const words_array = finalText.split(' ');
  let lines = [];
  let currentLine = '';
  let currentWidth = 0;
  
  for (let i = 0; i < words_array.length; i++) {
    const word = words_array[i];
    const wordWidth = tempCtx.measureText(word + ' ').width;
    
    if (currentWidth + wordWidth > maxWidth && currentLine.length > 0) {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
      currentWidth = wordWidth;
    } else {
      currentLine += word + ' ';
      currentWidth += wordWidth;
    }
  }
  if (currentLine.length > 0) {
    lines.push(currentLine.trim());
  }
  
  // Calculate canvas size based on lines
  const maxLineWidth = Math.min(maxWidth, lines.reduce((max, line) => {
    const w = tempCtx.measureText(line).width;
    return Math.max(max, w);
  }, 0));
  
  const canvasWidth = Math.min(850, Math.max(400, maxLineWidth + padding * 2 + 20));
  const canvasHeight = Math.min(600, Math.max(200, lines.length * lineHeight + padding * 2 + 30));
  
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext("2d");
  
  // Gradient background
  const gradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
  gradient.addColorStop(0, '#f8f9fa');
  gradient.addColorStop(0.5, '#e9ecef');
  gradient.addColorStop(1, '#dee2e6');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  
  // Draw each word individually with random colors
  ctx.font = `${fontSize}px Arial`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  
  const startY = (canvasHeight - (lines.length * lineHeight)) / 2 + 10;
  
  // Store all words with their positions for coloring
  let wordPositions = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineWords = line.split(' ');
    const totalLineWidth = ctx.measureText(line).width;
    let x = (canvasWidth - totalLineWidth) / 2;
    const y = startY + i * lineHeight;
    
    for (let j = 0; j < lineWords.length; j++) {
      const word = lineWords[j];
      const wordWidth = ctx.measureText(word).width;
      wordPositions.push({
        word: word,
        x: x,
        y: y,
        color: getRandomColor(),
        width: wordWidth
      });
      x += wordWidth + ctx.measureText(' ').width;
    }
  }
  
  // Draw each word with its random color
  for (const pos of wordPositions) {
    ctx.fillStyle = pos.color;
    ctx.shadowColor = 'rgba(33, 32, 32, 0.1)';
    ctx.shadowBlur = 4;
    ctx.fillText(pos.word, pos.x, pos.y);
  }
  
  // Reset shadow
  ctx.shadowBlur = 0;
  
  // Add watermark "AVI"
  ctx.save();
  const watermarkSize = 20;
  ctx.font = `bold ${watermarkSize}px Arial`;
  ctx.textAlign = "right";
  ctx.textBaseline = "bottom";

  const watermarkX = canvasWidth - 20;
  const watermarkY = canvasHeight - 15;

  // Shadow effect
  ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
  ctx.shadowBlur = 8;

  // Main watermark
  ctx.fillStyle = 'rgba(36, 36, 38, 0.46)';
  ctx.fillText('Powered by AVI', watermarkX, watermarkY);

  // Outline for better visibility
  ctx.shadowBlur = 0;
  ctx.strokeStyle = 'rgba(108, 92, 231, 0.3)';
  ctx.lineWidth = 1;
  ctx.strokeText('Powered by AVI', watermarkX, watermarkY);

  ctx.restore();
  
  return {
    question: `How many words are scrambled?`,
    options: options,
    answer: String(answer),
    originalWords: words,
    scrambledText: finalText,
    totalWords: wordCount,
    scrambledCount: scrambledCount,
    scramblePercentage: targetPercentage,
    scramblableWords: scramblableIndices.length,
    wordData: scrambledWords,
    lines: lines,
    image: canvas.toDataURL().split(",")[1]
  };
}