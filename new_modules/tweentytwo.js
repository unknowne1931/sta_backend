

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
// // // // // // // Generate Random Paragraph with Configurable Word Count
// // // // // // // -----------------------------------

// // // // // // function generateRandomParagraph(minWords = 14, maxWords = 25) {
// // // // // //   const wordBank = [
// // // // // //     "apple", "bird", "cloud", "dragon", "eagle", "forest", "garden", "harbor", "island", "jungle",
// // // // // //     "knight", "lion", "mountain", "night", "ocean", "penguin", "queen", "river", "storm", "tiger",
// // // // // //     "umbrella", "valley", "whale", "xenon", "yacht", "zebra", "crystal", "diamond", "ember", "flame",
// // // // // //     "glacier", "horizon", "ivory", "jade", "kiwi", "lavender", "moon", "nebula", "opal", "pearl",
// // // // // //     "quartz", "rainbow", "sapphire", "twilight", "uranium", "vortex", "willow", "xylem", "yew", "zenith",
// // // // // //     "blossom", "cascade", "drift", "echo", "frost", "glimmer", "haze", "illusion", "jubilee", "kaleidoscope",
// // // // // //     "labyrinth", "mirage", "nostalgia", "oasis", "paradox", "quasar", "reverie", "serenity", "tempest",
// // // // // //     "utopia", "vivid", "whisper", "xenial", "yearning", "zephyr",
// // // // // //     "astronaut", "breeze", "cosmos", "dream", "eclipse", "feather", "galaxy", "harmony",
// // // // // //     "illuminate", "journey", "kindle", "lunar", "mystic", "nova", "orbit", "pulse", "radiant",
// // // // // //     "solstice", "tranquil", "unique", "velocity", "wander", "xenolith", "yonder", "zen"
// // // // // //   ];
  
// // // // // //   // Ensure valid range
// // // // // //   const min = Math.max(1, minWords);
// // // // // //   const max = Math.max(min, maxWords);
  
// // // // // //   // Shuffle and pick words
// // // // // //   const shuffled = shuffle([...wordBank]);
// // // // // //   const wordCount = rand(min, max);
// // // // // //   const selected = [];
  
// // // // // //   for (let i = 0; i < wordCount; i++) {
// // // // // //     const idx = i % shuffled.length;
// // // // // //     selected.push(shuffled[idx]);
// // // // // //   }
  
// // // // // //   // Shuffle again to mix order
// // // // // //   shuffle(selected);
  
// // // // // //   // Build paragraph
// // // // // //   let paragraph = '';
// // // // // //   for (let i = 0; i < selected.length; i++) {
// // // // // //     let word = selected[i];
// // // // // //     // Random uppercase first letter (30% chance)
// // // // // //     if (Math.random() < 0.3) {
// // // // // //       word = word.charAt(0).toUpperCase() + word.slice(1);
// // // // // //     }
// // // // // //     paragraph += word;
    
// // // // // //     // Add punctuation
// // // // // //     if (i < selected.length - 1) {
// // // // // //       const randVal = Math.random();
// // // // // //       if (randVal < 0.15) paragraph += ', ';
// // // // // //       else if (randVal < 0.25) paragraph += '. ';
// // // // // //       else if (randVal < 0.3) paragraph += '; ';
// // // // // //       else paragraph += ' ';
// // // // // //     }
// // // // // //   }
  
// // // // // //   // End with punctuation
// // // // // //   if (!paragraph.endsWith('.') && !paragraph.endsWith('!') && !paragraph.endsWith('?')) {
// // // // // //     paragraph += '.';
// // // // // //   }
  
// // // // // //   // Ensure at least some letters
// // // // // //   if (paragraph.length < 20) {
// // // // // //     paragraph = "A quick brown fox jumps over the lazy dog, but sometimes the world is quiet. " +
// // // // // //                "Zephyrs blow through the valley, carrying whispers of ancient tales.";
// // // // // //   }
  
// // // // // //   return paragraph;
// // // // // // }

// // // // // // // -----------------------------------
// // // // // // // Generate Random 5 Consonants (Non-Vowels)
// // // // // // // -----------------------------------

// // // // // // function generateRandomConsonants() {
// // // // // //   const consonants = 'BCDFGHJKLMNPQRSTVWXYZ'.split('');
// // // // // //   const shuffled = shuffle([...consonants]);
// // // // // //   return shuffled.slice(0, 5);
// // // // // // }

// // // // // // // -----------------------------------
// // // // // // // Count Specific Letters in Paragraph
// // // // // // // -----------------------------------

// // // // // // function countSpecificLetters(text, letters) {
// // // // // //   const letterSet = new Set(letters.map(l => l.toLowerCase()));
// // // // // //   let count = 0;
// // // // // //   for (let i = 0; i < text.length; i++) {
// // // // // //     const char = text[i].toLowerCase();
// // // // // //     if (letterSet.has(char)) {
// // // // // //       count++;
// // // // // //     }
// // // // // //   }
// // // // // //   return count;
// // // // // // }

// // // // // // // -----------------------------------
// // // // // // // Generate Similar Options
// // // // // // // -----------------------------------

// // // // // // function generateSimilarOptions(correctAnswer) {
// // // // // //   const correctNum = parseInt(correctAnswer);
// // // // // //   const options = new Set();
// // // // // //   options.add(correctAnswer);
  
// // // // // //   // Generate options that are close to the correct answer
// // // // // //   const possibleDiffs = [-3, -2, -1, 1, 2, 3, -4, 4];
// // // // // //   const shuffledDiffs = shuffle([...possibleDiffs]);
  
// // // // // //   for (const diff of shuffledDiffs) {
// // // // // //     if (options.size >= 4) break;
    
// // // // // //     const candidate = correctNum + diff;
// // // // // //     if (candidate >= 0 && candidate <= 100) {
// // // // // //       const candidateStr = candidate.toString();
// // // // // //       if (!options.has(candidateStr)) {
// // // // // //         options.add(candidateStr);
// // // // // //       }
// // // // // //     }
// // // // // //   }
  
// // // // // //   // If we still don't have 4 options, add some random ones
// // // // // //   const fallbackOptions = [];
// // // // // //   for (let i = 0; i <= 100; i++) {
// // // // // //     if (!options.has(i.toString())) {
// // // // // //       fallbackOptions.push(i.toString());
// // // // // //     }
// // // // // //   }
  
// // // // // //   while (options.size < 4 && fallbackOptions.length > 0) {
// // // // // //     const randomFallback = getRandom(fallbackOptions);
// // // // // //     options.add(randomFallback);
// // // // // //     const index = fallbackOptions.indexOf(randomFallback);
// // // // // //     if (index > -1) {
// // // // // //       fallbackOptions.splice(index, 1);
// // // // // //     }
// // // // // //   }
  
// // // // // //   return shuffle([...options]);
// // // // // // }

// // // // // // // -----------------------------------
// // // // // // // Main Function with Parameters
// // // // // // // -----------------------------------

// // // // // // export function generatePuzzle_consonant_count(options = {}) {
// // // // // //   // Default values
// // // // // //   const {
// // // // // //     minWords = 14,
// // // // // //     maxWords = 25,
// // // // // //     width = 400,
// // // // // //     height = 250,
// // // // // //     showWatermark = true,
// // // // // //     watermarkText = "Powered by AVI",
// // // // // //     wordColors = true,
// // // // // //     instructionText = "How many times do these letters appear in the paragraph?"
// // // // // //   } = options;
  
// // // // // //   // Generate random 5 consonants
// // // // // //   const targetLetters = generateRandomConsonants();
// // // // // //   const targetLettersDisplay = targetLetters.join(', ');
  
// // // // // //   // Generate random paragraph with specified word count
// // // // // //   const paragraph = generateRandomParagraph(minWords, maxWords);
  
// // // // // //   // Count occurrences of target letters
// // // // // //   const letterCount = countSpecificLetters(paragraph, targetLetters);
// // // // // //   const answer = letterCount.toString();
  
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
  
// // // // // //   // Decorative top border
// // // // // //   // const borderColors = ['#FF6B6B', '#FF9F43', '#FECA57', '#48DBFB', '#A29BFE', '#FD79A8'];
// // // // // //   // const borderGradient = ctx.createLinearGradient(0, 0, width, 0);
// // // // // //   // borderColors.forEach((color, i) => {
// // // // // //   //   const stop = i / borderColors.length;
// // // // // //   //   borderGradient.addColorStop(stop, color);
// // // // // //   // });
// // // // // //   // ctx.fillStyle = borderGradient;
// // // // // //   // ctx.fillRect(0, 0, width, 4);
  
// // // // // //   // Draw target letters prominently at top
// // // // // //   // ctx.save();
// // // // // //   // ctx.fillStyle = '#1a4053';
// // // // // //   // ctx.font = 'bold 28px Arial';
// // // // // //   // ctx.textAlign = 'center';
// // // // // //   // ctx.textBaseline = 'top';
// // // // // //   // ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
// // // // // //   // ctx.shadowBlur = 8;
// // // // // //   // ctx.fillText(`🔍 Find these letters: ${targetLettersDisplay}`, width / 2, 20);
// // // // // //   // ctx.shadowBlur = 0;
// // // // // //   // ctx.restore();
  
// // // // // //   // Draw paragraph in a box
// // // // // //   const boxX = 30;
// // // // // //   const boxY = 75;
// // // // // //   const boxWidth = width - 60;
// // // // // //   const boxHeight = height - 140;
  
// // // // // //   // // Box background
// // // // // //   // ctx.fillStyle = '#ffffff';
// // // // // //   // ctx.shadowColor = 'rgba(0, 0, 0, 0.06)';
// // // // // //   // ctx.shadowBlur = 12;
// // // // // //   // ctx.shadowOffsetX = 0;
// // // // // //   // ctx.shadowOffsetY = 3;
// // // // // //   // ctx.beginPath();
// // // // // //   // ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 12);
// // // // // //   // ctx.fill();
// // // // // //   // ctx.shadowBlur = 0;
  

// // // // // //   // Paragraph text with random colors for each word (optional)
// // // // // //   const words = paragraph.split(' ');
// // // // // //   let currentX = boxX + 20;
// // // // // //   let currentY = boxY + 20;
  
// // // // // //   // Color palette for words
// // // // // //   const colorPalette = [
// // // // // //     '#2C3E50', '#E74C3C', '#2980B9', '#27AE60', '#8E44AD', '#F39C12',
// // // // // //     '#1ABC9C', '#D35400', '#3498DB', '#2ECC71', '#9B59B6', '#E67E22',
// // // // // //     '#16A085', '#C0392B', '#2471A3', '#229954', '#7D3C98', '#D4AC0D',
// // // // // //     '#138D75', '#B9770E', '#1A5276', '#1E8449', '#6C3483', '#A04000'
// // // // // //   ];
  
// // // // // //   // Draw each word
// // // // // //   for (let i = 0; i < words.length; i++) {
// // // // // //     const word = words[i];
    
// // // // // //     // Choose color based on wordColors flag
// // // // // //     const color = wordColors ? getRandom(colorPalette) : '#2C3E50';
    
// // // // // //     // Measure the word
// // // // // //     ctx.font = '16px Arial';
// // // // // //     const metrics = ctx.measureText(word + ' ');
// // // // // //     const wordWidth = metrics.width;
    
// // // // // //     // Check if we need to wrap
// // // // // //     if (currentX + wordWidth > boxX + boxWidth - 20) {
// // // // // //       currentY += 26;
// // // // // //       currentX = boxX + 20;
      
// // // // // //       // If we're out of space, break
// // // // // //       if (currentY + 26 > boxY + boxHeight - 20) break;
// // // // // //     }
    
// // // // // //     // Draw the word
// // // // // //     ctx.fillStyle = color;
// // // // // //     ctx.font = '16px Arial';
// // // // // //     ctx.textAlign = 'left';
// // // // // //     ctx.textBaseline = 'top';
// // // // // //     ctx.fillText(word, currentX, currentY);
    
// // // // // //     // Add space after word (except last)
// // // // // //     if (i < words.length - 1) {
// // // // // //       currentX += wordWidth;
// // // // // //     }
// // // // // //   }
  
// // // // // //   // ---------------- WATERMARK (optional) ----------------
// // // // // //   if (showWatermark) {
// // // // // //     ctx.save();
// // // // // //     ctx.globalAlpha = 0.6;
// // // // // //     ctx.textAlign = "right";
// // // // // //     ctx.textBaseline = "bottom";
    
// // // // // //     ctx.font = "bold 14px Arial";
// // // // // //     ctx.fillStyle = "#2C3E50";
// // // // // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
// // // // // //     ctx.shadowBlur = 2;
// // // // // //     ctx.fillText(watermarkText, width - 15, height - 8);
    
// // // // // //     ctx.restore();
// // // // // //   }
  
// // // // // //   // // Add instruction at bottom
// // // // // //   // ctx.fillStyle = '#7f8c8d';
// // // // // //   // ctx.font = '13px Arial';
// // // // // //   // ctx.textAlign = 'center';
// // // // // //   // ctx.textBaseline = 'bottom';
// // // // // //   // ctx.globalAlpha = 0.6;
// // // // // //   // ctx.fillText(`Count how many times these letters (${targetLettersDisplay}) appear in the paragraph`, width / 2, height - 10);
// // // // // //   // ctx.globalAlpha = 1.0;
  
// // // // // //   // Generate options that are similar to the correct answer
// // // // // //   const generatedOptions = generateSimilarOptions(answer);
  
// // // // // //   // -----------------------------------
// // // // // //   // Return
// // // // // //   // -----------------------------------
  
// // // // // //   return {
// // // // // //     question: `How many times do the letters ${targetLettersDisplay} appear in the paragraph?`,
// // // // // //     options: generatedOptions,
// // // // // //     answer: answer,
// // // // // //     targetLetters: targetLetters,
// // // // // //     targetLettersDisplay: targetLettersDisplay,
// // // // // //     wordCount: words.length,
// // // // // //     letterCount: letterCount,
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
// // // // // // Generate Random Paragraph with Configurable Word Count
// // // // // // -----------------------------------

// // // // // function generateRandomParagraph(minWords = 14, maxWords = 25) {
// // // // //   const wordBank = [
// // // // //     "apple", "bird", "cloud", "dragon", "eagle", "forest", "garden", "harbor", "island", "jungle",
// // // // //     "knight", "lion", "mountain", "night", "ocean", "penguin", "queen", "river", "storm", "tiger",
// // // // //     "umbrella", "valley", "whale", "xenon", "yacht", "zebra", "crystal", "diamond", "ember", "flame",
// // // // //     "glacier", "horizon", "ivory", "jade", "kiwi", "lavender", "moon", "nebula", "opal", "pearl",
// // // // //     "quartz", "rainbow", "sapphire", "twilight", "uranium", "vortex", "willow", "xylem", "yew", "zenith",
// // // // //     "blossom", "cascade", "drift", "echo", "frost", "glimmer", "haze", "illusion", "jubilee", "kaleidoscope",
// // // // //     "labyrinth", "mirage", "nostalgia", "oasis", "paradox", "quasar", "reverie", "serenity", "tempest",
// // // // //     "utopia", "vivid", "whisper", "xenial", "yearning", "zephyr",
// // // // //     "astronaut", "breeze", "cosmos", "dream", "eclipse", "feather", "galaxy", "harmony",
// // // // //     "illuminate", "journey", "kindle", "lunar", "mystic", "nova", "orbit", "pulse", "radiant",
// // // // //     "solstice", "tranquil", "unique", "velocity", "wander", "xenolith", "yonder", "zen"
// // // // //   ];
  
// // // // //   // Ensure valid range
// // // // //   const min = Math.max(1, minWords);
// // // // //   const max = Math.max(min, maxWords);
  
// // // // //   // Shuffle and pick words
// // // // //   const shuffled = shuffle([...wordBank]);
// // // // //   const wordCount = rand(min, max);
// // // // //   const selected = [];
  
// // // // //   for (let i = 0; i < wordCount; i++) {
// // // // //     const idx = i % shuffled.length;
// // // // //     selected.push(shuffled[idx]);
// // // // //   }
  
// // // // //   // Shuffle again to mix order
// // // // //   shuffle(selected);
  
// // // // //   // Build paragraph
// // // // //   let paragraph = '';
// // // // //   for (let i = 0; i < selected.length; i++) {
// // // // //     let word = selected[i];
// // // // //     // Random uppercase first letter (30% chance)
// // // // //     if (Math.random() < 0.3) {
// // // // //       word = word.charAt(0).toUpperCase() + word.slice(1);
// // // // //     }
// // // // //     paragraph += word;
    
// // // // //     // Add punctuation
// // // // //     if (i < selected.length - 1) {
// // // // //       const randVal = Math.random();
// // // // //       if (randVal < 0.15) paragraph += ', ';
// // // // //       else if (randVal < 0.25) paragraph += '. ';
// // // // //       else if (randVal < 0.3) paragraph += '; ';
// // // // //       else paragraph += ' ';
// // // // //     }
// // // // //   }
  
// // // // //   // End with punctuation
// // // // //   if (!paragraph.endsWith('.') && !paragraph.endsWith('!') && !paragraph.endsWith('?')) {
// // // // //     paragraph += '.';
// // // // //   }
  
// // // // //   // Ensure at least some letters
// // // // //   if (paragraph.length < 20) {
// // // // //     paragraph = "A quick brown fox jumps over the lazy dog, but sometimes the world is quiet. " +
// // // // //                "Zephyrs blow through the valley, carrying whispers of ancient tales.";
// // // // //   }
  
// // // // //   return paragraph;
// // // // // }

// // // // // // -----------------------------------
// // // // // // Generate Random 5 Consonants (Non-Vowels)
// // // // // // -----------------------------------

// // // // // function generateRandomConsonants() {
// // // // //   const consonants = 'BCDFGHJKLMNPQRSTVWXYZ'.split('');
// // // // //   const shuffled = shuffle([...consonants]);
// // // // //   return shuffled.slice(0, 5);
// // // // // }

// // // // // // -----------------------------------
// // // // // // Count Specific Letters in Paragraph
// // // // // // -----------------------------------

// // // // // function countSpecificLetters(text, letters) {
// // // // //   const letterSet = new Set(letters.map(l => l.toLowerCase()));
// // // // //   let count = 0;
// // // // //   for (let i = 0; i < text.length; i++) {
// // // // //     const char = text[i].toLowerCase();
// // // // //     if (letterSet.has(char)) {
// // // // //       count++;
// // // // //     }
// // // // //   }
// // // // //   return count;
// // // // // }

// // // // // // -----------------------------------
// // // // // // Generate Similar Options - IMPROVED VERSION
// // // // // // -----------------------------------

// // // // // function generateSimilarOptions(correctAnswer) {
// // // // //   const correctNum = parseInt(correctAnswer);
// // // // //   const options = new Set();
// // // // //   options.add(correctAnswer);
  
// // // // //   // Create a more diverse spread of options
// // // // //   const possibleDiffs = [];
  
// // // // //   // Generate a wider range of differences with varying probabilities
// // // // //   // Small differences (closer) - fewer of these
// // // // //   const closeDiffs = [-2, -1, 1, 2];
// // // // //   // Medium differences
// // // // //   const mediumDiffs = [-5, -4, 4, 5, -6, 6];
// // // // //   // Larger differences
// // // // //   const largeDiffs = [-10, -8, 8, 10, -12, 12, -15, 15, -18, 18, -20, 20];
  
// // // // //   // Shuffle and mix diffs with different weights
// // // // //   const allDiffs = [
// // // // //     ...shuffle(closeDiffs).slice(0, 1), // Only 1 close diff
// // // // //     ...shuffle(mediumDiffs).slice(0, 2), // 2 medium diffs
// // // // //     ...shuffle(largeDiffs).slice(0, 3) // 3 large diffs
// // // // //   ];
  
// // // // //   // Shuffle again for randomness
// // // // //   const shuffledDiffs = shuffle(allDiffs);
  
// // // // //   for (const diff of shuffledDiffs) {
// // // // //     if (options.size >= 4) break;
    
// // // // //     const candidate = correctNum + diff;
// // // // //     // Keep candidates within a reasonable range
// // // // //     if (candidate >= 0 && candidate <= 100) {
// // // // //       const candidateStr = candidate.toString();
// // // // //       if (!options.has(candidateStr)) {
// // // // //         options.add(candidateStr);
// // // // //       }
// // // // //     }
// // // // //   }
  
// // // // //   // If we don't have 4 options, add more spread out options
// // // // //   if (options.size < 4) {
// // // // //     const fallbackOptions = [];
// // // // //     // Generate options that are further away
// // // // //     const fallbackDiffs = [-25, -22, 22, 25, -28, 28, -30, 30];
// // // // //     for (const diff of shuffle(fallbackDiffs)) {
// // // // //       if (options.size >= 4) break;
// // // // //       const candidate = correctNum + diff;
// // // // //       if (candidate >= 0 && candidate <= 100) {
// // // // //         const candidateStr = candidate.toString();
// // // // //         if (!options.has(candidateStr)) {
// // // // //           options.add(candidateStr);
// // // // //         }
// // // // //       }
// // // // //     }
// // // // //   }
  
// // // // //   // Last resort: add random numbers from the full range
// // // // //   while (options.size < 4) {
// // // // //     const randomNum = rand(0, 100);
// // // // //     const candidateStr = randomNum.toString();
// // // // //     if (!options.has(candidateStr)) {
// // // // //       options.add(candidateStr);
// // // // //     }
// // // // //   }
  
// // // // //   return shuffle([...options]);
// // // // // }

// // // // // // -----------------------------------
// // // // // // Main Function with Parameters
// // // // // // -----------------------------------

// // // // // export function generatePuzzle_consonant_count(options = {}) {
// // // // //   // Default values
// // // // //   const {
// // // // //     minWords = 14,
// // // // //     maxWords = 25,
// // // // //     width = 400,
// // // // //     height = 250,
// // // // //     showWatermark = true,
// // // // //     watermarkText = "Powered by AVI",
// // // // //     wordColors = true,
// // // // //     instructionText = "How many times do these letters appear in the paragraph?"
// // // // //   } = options;
  
// // // // //   // Generate random 5 consonants
// // // // //   const targetLetters = generateRandomConsonants();
// // // // //   const targetLettersDisplay = targetLetters.join(', ');
  
// // // // //   // Generate random paragraph with specified word count
// // // // //   const paragraph = generateRandomParagraph(minWords, maxWords);
  
// // // // //   // Count occurrences of target letters
// // // // //   const letterCount = countSpecificLetters(paragraph, targetLetters);
// // // // //   const answer = letterCount.toString();
  
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
  
// // // // //   // Draw target letters prominently at top
// // // // //   ctx.save();
// // // // //   ctx.fillStyle = '#1a4053';
// // // // //   ctx.font = 'bold 28px Arial';
// // // // //   ctx.textAlign = 'center';
// // // // //   ctx.textBaseline = 'top';
// // // // //   ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
// // // // //   ctx.shadowBlur = 8;
// // // // //   ctx.fillText(`🔍 Find these letters: ${targetLettersDisplay}`, width / 2, 20);
// // // // //   ctx.shadowBlur = 0;
// // // // //   ctx.restore();
  
// // // // //   // Draw paragraph in a box
// // // // //   const boxX = 30;
// // // // //   const boxY = 75;
// // // // //   const boxWidth = width - 60;
// // // // //   const boxHeight = height - 140;
  
// // // // //   // Box background
// // // // //   ctx.fillStyle = '#ffffff';
// // // // //   ctx.shadowColor = 'rgba(0, 0, 0, 0.06)';
// // // // //   ctx.shadowBlur = 12;
// // // // //   ctx.shadowOffsetX = 0;
// // // // //   ctx.shadowOffsetY = 3;
// // // // //   ctx.beginPath();
// // // // //   ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 12);
// // // // //   ctx.fill();
// // // // //   ctx.shadowBlur = 0;
  
// // // // //   // Paragraph text with random colors for each word (optional)
// // // // //   const words = paragraph.split(' ');
// // // // //   let currentX = boxX + 20;
// // // // //   let currentY = boxY + 20;
  
// // // // //   // Color palette for words
// // // // //   const colorPalette = [
// // // // //     '#2C3E50', '#E74C3C', '#2980B9', '#27AE60', '#8E44AD', '#F39C12',
// // // // //     '#1ABC9C', '#D35400', '#3498DB', '#2ECC71', '#9B59B6', '#E67E22',
// // // // //     '#16A085', '#C0392B', '#2471A3', '#229954', '#7D3C98', '#D4AC0D',
// // // // //     '#138D75', '#B9770E', '#1A5276', '#1E8449', '#6C3483', '#A04000'
// // // // //   ];
  
// // // // //   // Draw each word
// // // // //   for (let i = 0; i < words.length; i++) {
// // // // //     const word = words[i];
    
// // // // //     // Choose color based on wordColors flag
// // // // //     const color = wordColors ? getRandom(colorPalette) : '#2C3E50';
    
// // // // //     // Measure the word
// // // // //     ctx.font = '16px Arial';
// // // // //     const metrics = ctx.measureText(word + ' ');
// // // // //     const wordWidth = metrics.width;
    
// // // // //     // Check if we need to wrap
// // // // //     if (currentX + wordWidth > boxX + boxWidth - 20) {
// // // // //       currentY += 26;
// // // // //       currentX = boxX + 20;
      
// // // // //       // If we're out of space, break
// // // // //       if (currentY + 26 > boxY + boxHeight - 20) break;
// // // // //     }
    
// // // // //     // Draw the word
// // // // //     ctx.fillStyle = color;
// // // // //     ctx.font = '16px Arial';
// // // // //     ctx.textAlign = 'left';
// // // // //     ctx.textBaseline = 'top';
// // // // //     ctx.fillText(word, currentX, currentY);
    
// // // // //     // Add space after word (except last)
// // // // //     if (i < words.length - 1) {
// // // // //       currentX += wordWidth;
// // // // //     }
// // // // //   }
  
// // // // //   // ---------------- WATERMARK (optional) ----------------
// // // // //   if (showWatermark) {
// // // // //     ctx.save();
// // // // //     ctx.globalAlpha = 0.6;
// // // // //     ctx.textAlign = "right";
// // // // //     ctx.textBaseline = "bottom";
    
// // // // //     ctx.font = "bold 14px Arial";
// // // // //     ctx.fillStyle = "#2C3E50";
// // // // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
// // // // //     ctx.shadowBlur = 2;
// // // // //     ctx.fillText(watermarkText, width - 15, height - 8);
    
// // // // //     ctx.restore();
// // // // //   }
  
// // // // //   // Add instruction at bottom
// // // // //   ctx.fillStyle = '#7f8c8d';
// // // // //   ctx.font = '13px Arial';
// // // // //   ctx.textAlign = 'center';
// // // // //   ctx.textBaseline = 'bottom';
// // // // //   ctx.globalAlpha = 0.6;
// // // // //   ctx.fillText(`Count how many times these letters (${targetLettersDisplay}) appear in the paragraph`, width / 2, height - 10);
// // // // //   ctx.globalAlpha = 1.0;
  
// // // // //   // Generate options that are spread out from the correct answer
// // // // //   const generatedOptions = generateSimilarOptions(answer);
  
// // // // //   // -----------------------------------
// // // // //   // Return
// // // // //   // -----------------------------------
  
// // // // //   return {
// // // // //     question: `How many times do the letters ${targetLettersDisplay} appear in the paragraph?`,
// // // // //     options: generatedOptions,
// // // // //     answer: answer,
// // // // //     targetLetters: targetLetters,
// // // // //     targetLettersDisplay: targetLettersDisplay,
// // // // //     wordCount: words.length,
// // // // //     letterCount: letterCount,
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
// // // // // Generate Random Paragraph with Configurable Word Count
// // // // // -----------------------------------

// // // // function generateRandomParagraph(minWords = 14, maxWords = 25) {
// // // //   const wordBank = [
// // // //     "apple", "bird", "cloud", "dragon", "eagle", "forest", "garden", "harbor", "island", "jungle",
// // // //     "knight", "lion", "mountain", "night", "ocean", "penguin", "queen", "river", "storm", "tiger",
// // // //     "umbrella", "valley", "whale", "xenon", "yacht", "zebra", "crystal", "diamond", "ember", "flame",
// // // //     "glacier", "horizon", "ivory", "jade", "kiwi", "lavender", "moon", "nebula", "opal", "pearl",
// // // //     "quartz", "rainbow", "sapphire", "twilight", "uranium", "vortex", "willow", "xylem", "yew", "zenith",
// // // //     "blossom", "cascade", "drift", "echo", "frost", "glimmer", "haze", "illusion", "jubilee", "kaleidoscope",
// // // //     "labyrinth", "mirage", "nostalgia", "oasis", "paradox", "quasar", "reverie", "serenity", "tempest",
// // // //     "utopia", "vivid", "whisper", "xenial", "yearning", "zephyr",
// // // //     "astronaut", "breeze", "cosmos", "dream", "eclipse", "feather", "galaxy", "harmony",
// // // //     "illuminate", "journey", "kindle", "lunar", "mystic", "nova", "orbit", "pulse", "radiant",
// // // //     "solstice", "tranquil", "unique", "velocity", "wander", "xenolith", "yonder", "zen"
// // // //   ];
  
// // // //   // Ensure valid range
// // // //   const min = Math.max(1, minWords);
// // // //   const max = Math.max(min, maxWords);
  
// // // //   // Shuffle and pick words
// // // //   const shuffled = shuffle([...wordBank]);
// // // //   const wordCount = rand(min, max);
// // // //   const selected = [];
  
// // // //   for (let i = 0; i < wordCount; i++) {
// // // //     const idx = i % shuffled.length;
// // // //     selected.push(shuffled[idx]);
// // // //   }
  
// // // //   // Shuffle again to mix order
// // // //   shuffle(selected);
  
// // // //   // Build paragraph
// // // //   let paragraph = '';
// // // //   for (let i = 0; i < selected.length; i++) {
// // // //     let word = selected[i];
// // // //     // Random uppercase first letter (30% chance)
// // // //     if (Math.random() < 0.3) {
// // // //       word = word.charAt(0).toUpperCase() + word.slice(1);
// // // //     }
// // // //     paragraph += word;
    
// // // //     // Add punctuation
// // // //     if (i < selected.length - 1) {
// // // //       const randVal = Math.random();
// // // //       if (randVal < 0.15) paragraph += ', ';
// // // //       else if (randVal < 0.25) paragraph += '. ';
// // // //       else if (randVal < 0.3) paragraph += '; ';
// // // //       else paragraph += ' ';
// // // //     }
// // // //   }
  
// // // //   // End with punctuation
// // // //   if (!paragraph.endsWith('.') && !paragraph.endsWith('!') && !paragraph.endsWith('?')) {
// // // //     paragraph += '.';
// // // //   }
  
// // // //   // Ensure at least some letters
// // // //   if (paragraph.length < 20) {
// // // //     paragraph = "A quick brown fox jumps over the lazy dog, but sometimes the world is quiet. " +
// // // //                "Zephyrs blow through the valley, carrying whispers of ancient tales.";
// // // //   }
  
// // // //   return paragraph;
// // // // }

// // // // // -----------------------------------
// // // // // Generate Random 5 Consonants (Non-Vowels)
// // // // // -----------------------------------

// // // // function generateRandomConsonants() {
// // // //   const consonants = 'BCDFGHJKLMNPQRSTVWXYZ'.split('');
// // // //   const shuffled = shuffle([...consonants]);
// // // //   return shuffled.slice(0, 5);
// // // // }

// // // // // -----------------------------------
// // // // // Count Specific Letters in Paragraph
// // // // // -----------------------------------

// // // // function countSpecificLetters(text, letters) {
// // // //   const letterSet = new Set(letters.map(l => l.toLowerCase()));
// // // //   let count = 0;
// // // //   for (let i = 0; i < text.length; i++) {
// // // //     const char = text[i].toLowerCase();
// // // //     if (letterSet.has(char)) {
// // // //       count++;
// // // //     }
// // // //   }
// // // //   return count;
// // // // }

// // // // // -----------------------------------
// // // // // Generate Options - IMPROVED VERSION with "None of the above"
// // // // // -----------------------------------

// // // // function generateOptions(correctAnswer) {
// // // //   const correctNum = parseInt(correctAnswer);
// // // //   const options = new Set();
  
// // // //   // Special handling for small numbers (0-5)
// // // //   if (correctNum <= 5) {
// // // //     // Generate consecutive options starting from 0
// // // //     const startNum = 0;
// // // //     const endNum = Math.min(5, correctNum + 3);
    
// // // //     for (let i = startNum; i <= endNum; i++) {
// // // //       options.add(i.toString());
// // // //     }
    
// // // //     // If we have less than 4 options, add more
// // // //     if (options.size < 4) {
// // // //       const additionalOptions = [6, 7, 8, 9, 10];
// // // //       for (const num of additionalOptions) {
// // // //         if (options.size >= 4) break;
// // // //         if (!options.has(num.toString())) {
// // // //           options.add(num.toString());
// // // //         }
// // // //       }
// // // //     }
    
// // // //     // Always add "None of the above" as the last option
// // // //     const optionsArray = shuffle([...options]);
// // // //     optionsArray.push("None of the above");
// // // //     return optionsArray;
// // // //   }
  
// // // //   // For larger numbers, use the spread approach
// // // //   // Create a more diverse spread of options
// // // //   const possibleDiffs = [];
  
// // // //   // Generate a wider range of differences with varying probabilities
// // // //   const closeDiffs = [-2, -1, 1, 2];
// // // //   const mediumDiffs = [-5, -4, 4, 5, -6, 6];
// // // //   const largeDiffs = [-10, -8, 8, 10, -12, 12, -15, 15, -18, 18, -20, 20];
  
// // // //   // Shuffle and mix diffs with different weights
// // // //   const allDiffs = [
// // // //     ...shuffle(closeDiffs).slice(0, 1),
// // // //     ...shuffle(mediumDiffs).slice(0, 2),
// // // //     ...shuffle(largeDiffs).slice(0, 3)
// // // //   ];
  
// // // //   const shuffledDiffs = shuffle(allDiffs);
  
// // // //   // Add the correct answer first
// // // //   options.add(correctAnswer);
  
// // // //   for (const diff of shuffledDiffs) {
// // // //     if (options.size >= 4) break;
    
// // // //     const candidate = correctNum + diff;
// // // //     if (candidate >= 0 && candidate <= 100) {
// // // //       const candidateStr = candidate.toString();
// // // //       if (!options.has(candidateStr)) {
// // // //         options.add(candidateStr);
// // // //       }
// // // //     }
// // // //   }
  
// // // //   // If we don't have 4 options, add more spread out options
// // // //   if (options.size < 4) {
// // // //     const fallbackDiffs = [-25, -22, 22, 25, -28, 28, -30, 30];
// // // //     for (const diff of shuffle(fallbackDiffs)) {
// // // //       if (options.size >= 4) break;
// // // //       const candidate = correctNum + diff;
// // // //       if (candidate >= 0 && candidate <= 100) {
// // // //         const candidateStr = candidate.toString();
// // // //         if (!options.has(candidateStr)) {
// // // //           options.add(candidateStr);
// // // //         }
// // // //       }
// // // //     }
// // // //   }
  
// // // //   // Last resort: add random numbers from the full range
// // // //   while (options.size < 4) {
// // // //     const randomNum = rand(0, 100);
// // // //     const candidateStr = randomNum.toString();
// // // //     if (!options.has(candidateStr)) {
// // // //       options.add(candidateStr);
// // // //     }
// // // //   }
  
// // // //   // Convert to array and shuffle, then add "None of the above" at the end
// // // //   const optionsArray = shuffle([...options]);
// // // //   optionsArray.push("None of the above");
  
// // // //   return optionsArray;
// // // // }

// // // // // -----------------------------------
// // // // // Main Function with Parameters
// // // // // -----------------------------------

// // // // export function generatePuzzle_consonant_count(options = {}) {
// // // //   // Default values
// // // //   const {
// // // //     minWords = 14,
// // // //     maxWords = 25,
// // // //     width = 400,
// // // //     height = 250,
// // // //     showWatermark = true,
// // // //     watermarkText = "Powered by AVI",
// // // //     wordColors = true,
// // // //     instructionText = "How many times do these letters appear in the paragraph?"
// // // //   } = options;
  
// // // //   // Generate random 5 consonants
// // // //   const targetLetters = generateRandomConsonants();
// // // //   const targetLettersDisplay = targetLetters.join(', ');
  
// // // //   // Generate random paragraph with specified word count
// // // //   const paragraph = generateRandomParagraph(minWords, maxWords);
  
// // // //   // Count occurrences of target letters
// // // //   const letterCount = countSpecificLetters(paragraph, targetLetters);
// // // //   const answer = letterCount.toString();
  
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
  
// // // //   // Draw target letters prominently at top
// // // //   ctx.save();
// // // //   ctx.fillStyle = '#1a4053';
// // // //   ctx.font = 'bold 28px Arial';
// // // //   ctx.textAlign = 'center';
// // // //   ctx.textBaseline = 'top';
// // // //   ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
// // // //   ctx.shadowBlur = 8;
// // // //   ctx.fillText(`🔍 Find these letters: ${targetLettersDisplay}`, width / 2, 20);
// // // //   ctx.shadowBlur = 0;
// // // //   ctx.restore();
  
// // // //   // Draw paragraph in a box
// // // //   const boxX = 30;
// // // //   const boxY = 75;
// // // //   const boxWidth = width - 60;
// // // //   const boxHeight = height - 140;
  
// // // //   // Box background
// // // //   ctx.fillStyle = '#ffffff';
// // // //   ctx.shadowColor = 'rgba(0, 0, 0, 0.06)';
// // // //   ctx.shadowBlur = 12;
// // // //   ctx.shadowOffsetX = 0;
// // // //   ctx.shadowOffsetY = 3;
// // // //   ctx.beginPath();
// // // //   ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 12);
// // // //   ctx.fill();
// // // //   ctx.shadowBlur = 0;
  
// // // //   // Paragraph text with random colors for each word (optional)
// // // //   const words = paragraph.split(' ');
// // // //   let currentX = boxX + 20;
// // // //   let currentY = boxY + 20;
  
// // // //   // Color palette for words
// // // //   const colorPalette = [
// // // //     '#2C3E50', '#E74C3C', '#2980B9', '#27AE60', '#8E44AD', '#F39C12',
// // // //     '#1ABC9C', '#D35400', '#3498DB', '#2ECC71', '#9B59B6', '#E67E22',
// // // //     '#16A085', '#C0392B', '#2471A3', '#229954', '#7D3C98', '#D4AC0D',
// // // //     '#138D75', '#B9770E', '#1A5276', '#1E8449', '#6C3483', '#A04000'
// // // //   ];
  
// // // //   // Draw each word
// // // //   for (let i = 0; i < words.length; i++) {
// // // //     const word = words[i];
    
// // // //     // Choose color based on wordColors flag
// // // //     const color = wordColors ? getRandom(colorPalette) : '#2C3E50';
    
// // // //     // Measure the word
// // // //     ctx.font = '16px Arial';
// // // //     const metrics = ctx.measureText(word + ' ');
// // // //     const wordWidth = metrics.width;
    
// // // //     // Check if we need to wrap
// // // //     if (currentX + wordWidth > boxX + boxWidth - 20) {
// // // //       currentY += 26;
// // // //       currentX = boxX + 20;
      
// // // //       // If we're out of space, break
// // // //       if (currentY + 26 > boxY + boxHeight - 20) break;
// // // //     }
    
// // // //     // Draw the word
// // // //     ctx.fillStyle = color;
// // // //     ctx.font = '16px Arial';
// // // //     ctx.textAlign = 'left';
// // // //     ctx.textBaseline = 'top';
// // // //     ctx.fillText(word, currentX, currentY);
    
// // // //     // Add space after word (except last)
// // // //     if (i < words.length - 1) {
// // // //       currentX += wordWidth;
// // // //     }
// // // //   }
  
// // // //   // ---------------- WATERMARK (optional) ----------------
// // // //   if (showWatermark) {
// // // //     ctx.save();
// // // //     ctx.globalAlpha = 0.6;
// // // //     ctx.textAlign = "right";
// // // //     ctx.textBaseline = "bottom";
    
// // // //     ctx.font = "bold 14px Arial";
// // // //     ctx.fillStyle = "#2C3E50";
// // // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
// // // //     ctx.shadowBlur = 2;
// // // //     ctx.fillText(watermarkText, width - 15, height - 8);
    
// // // //     ctx.restore();
// // // //   }
  
// // // //   // Add instruction at bottom
// // // //   ctx.fillStyle = '#7f8c8d';
// // // //   ctx.font = '13px Arial';
// // // //   ctx.textAlign = 'center';
// // // //   ctx.textBaseline = 'bottom';
// // // //   ctx.globalAlpha = 0.6;
// // // //   ctx.fillText(`Count how many times these letters (${targetLettersDisplay}) appear in the paragraph`, width / 2, height - 10);
// // // //   ctx.globalAlpha = 1.0;
  
// // // //   // Generate options with "None of the above" at the end
// // // //   const generatedOptions = generateOptions(answer);
  
// // // //   // -----------------------------------
// // // //   // Return
// // // //   // -----------------------------------
  
// // // //   return {
// // // //     question: `How many times do the letters ${targetLettersDisplay} appear in the paragraph?`,
// // // //     options: generatedOptions,
// // // //     answer: answer,
// // // //     targetLetters: targetLetters,
// // // //     targetLettersDisplay: targetLettersDisplay,
// // // //     wordCount: words.length,
// // // //     letterCount: letterCount,
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
// // // // Generate Random Paragraph with Configurable Word Count
// // // // -----------------------------------

// // // function generateRandomParagraph(minWords = 14, maxWords = 25) {
// // //   const wordBank = [
// // //     "apple", "bird", "cloud", "dragon", "eagle", "forest", "garden", "harbor", "island", "jungle",
// // //     "knight", "lion", "mountain", "night", "ocean", "penguin", "queen", "river", "storm", "tiger",
// // //     "umbrella", "valley", "whale", "xenon", "yacht", "zebra", "crystal", "diamond", "ember", "flame",
// // //     "glacier", "horizon", "ivory", "jade", "kiwi", "lavender", "moon", "nebula", "opal", "pearl",
// // //     "quartz", "rainbow", "sapphire", "twilight", "uranium", "vortex", "willow", "xylem", "yew", "zenith",
// // //     "blossom", "cascade", "drift", "echo", "frost", "glimmer", "haze", "illusion", "jubilee", "kaleidoscope",
// // //     "labyrinth", "mirage", "nostalgia", "oasis", "paradox", "quasar", "reverie", "serenity", "tempest",
// // //     "utopia", "vivid", "whisper", "xenial", "yearning", "zephyr",
// // //     "astronaut", "breeze", "cosmos", "dream", "eclipse", "feather", "galaxy", "harmony",
// // //     "illuminate", "journey", "kindle", "lunar", "mystic", "nova", "orbit", "pulse", "radiant",
// // //     "solstice", "tranquil", "unique", "velocity", "wander", "xenolith", "yonder", "zen"
// // //   ];
  
// // //   // Ensure valid range
// // //   const min = Math.max(1, minWords);
// // //   const max = Math.max(min, maxWords);
  
// // //   // Shuffle and pick words
// // //   const shuffled = shuffle([...wordBank]);
// // //   const wordCount = rand(min, max);
// // //   const selected = [];
  
// // //   for (let i = 0; i < wordCount; i++) {
// // //     const idx = i % shuffled.length;
// // //     selected.push(shuffled[idx]);
// // //   }
  
// // //   // Shuffle again to mix order
// // //   shuffle(selected);
  
// // //   // Build paragraph
// // //   let paragraph = '';
// // //   for (let i = 0; i < selected.length; i++) {
// // //     let word = selected[i];
// // //     // Random uppercase first letter (30% chance)
// // //     if (Math.random() < 0.3) {
// // //       word = word.charAt(0).toUpperCase() + word.slice(1);
// // //     }
// // //     paragraph += word;
    
// // //     // Add punctuation
// // //     if (i < selected.length - 1) {
// // //       const randVal = Math.random();
// // //       if (randVal < 0.15) paragraph += ', ';
// // //       else if (randVal < 0.25) paragraph += '. ';
// // //       else if (randVal < 0.3) paragraph += '; ';
// // //       else paragraph += ' ';
// // //     }
// // //   }
  
// // //   // End with punctuation
// // //   if (!paragraph.endsWith('.') && !paragraph.endsWith('!') && !paragraph.endsWith('?')) {
// // //     paragraph += '.';
// // //   }
  
// // //   // Ensure at least some letters
// // //   if (paragraph.length < 20) {
// // //     paragraph = "A quick brown fox jumps over the lazy dog, but sometimes the world is quiet. " +
// // //                "Zephyrs blow through the valley, carrying whispers of ancient tales.";
// // //   }
  
// // //   return paragraph;
// // // }

// // // // -----------------------------------
// // // // Generate Random 5 Consonants (Non-Vowels)
// // // // -----------------------------------

// // // function generateRandomConsonants() {
// // //   const consonants = 'BCDFGHJKLMNPQRSTVWXYZ'.split('');
// // //   const shuffled = shuffle([...consonants]);
// // //   return shuffled.slice(0, 5);
// // // }

// // // // -----------------------------------
// // // // Count Specific Letters in Paragraph
// // // // -----------------------------------

// // // function countSpecificLetters(text, letters) {
// // //   const letterSet = new Set(letters.map(l => l.toLowerCase()));
// // //   let count = 0;
// // //   for (let i = 0; i < text.length; i++) {
// // //     const char = text[i].toLowerCase();
// // //     if (letterSet.has(char)) {
// // //       count++;
// // //     }
// // //   }
// // //   return count;
// // // }

// // // // -----------------------------------
// // // // Generate Options - ALWAYS includes "None of the above" at the end
// // // // -----------------------------------

// // // function generateOptions(correctAnswer) {
// // //   const correctNum = parseInt(correctAnswer);
// // //   const options = new Set();
  
// // //   // Special handling for small numbers (0-10)
// // //   if (correctNum <= 10) {
// // //     // Generate consecutive options starting from 0
// // //     const startNum = Math.max(0, correctNum - 3);
// // //     const endNum = Math.min(10, correctNum + 3);
    
// // //     for (let i = startNum; i <= endNum; i++) {
// // //       options.add(i.toString());
// // //     }
    
// // //     // Ensure we have at least 4 options
// // //     while (options.size < 4) {
// // //       const randomNum = rand(0, 10);
// // //       if (!options.has(randomNum.toString())) {
// // //         options.add(randomNum.toString());
// // //       }
// // //     }
    
// // //     // Convert to array, shuffle, then add "None of the above" at the end
// // //     const optionsArray = shuffle([...options]);
// // //     optionsArray.push("None of the above");
// // //     return optionsArray;
// // //   }
  
// // //   // For larger numbers, use the spread approach
// // //   // Create a more diverse spread of options
// // //   const possibleDiffs = [];
  
// // //   // Generate a wider range of differences with varying probabilities
// // //   const closeDiffs = [-2, -1, 1, 2];
// // //   const mediumDiffs = [-5, -4, 4, 5, -6, 6];
// // //   const largeDiffs = [-10, -8, 8, 10, -12, 12, -15, 15, -18, 18, -20, 20];
  
// // //   // Shuffle and mix diffs with different weights
// // //   const allDiffs = [
// // //     ...shuffle(closeDiffs).slice(0, 1),
// // //     ...shuffle(mediumDiffs).slice(0, 2),
// // //     ...shuffle(largeDiffs).slice(0, 3)
// // //   ];
  
// // //   const shuffledDiffs = shuffle(allDiffs);
  
// // //   // Add the correct answer first
// // //   options.add(correctAnswer);
  
// // //   for (const diff of shuffledDiffs) {
// // //     if (options.size >= 4) break;
    
// // //     const candidate = correctNum + diff;
// // //     if (candidate >= 0 && candidate <= 100) {
// // //       const candidateStr = candidate.toString();
// // //       if (!options.has(candidateStr)) {
// // //         options.add(candidateStr);
// // //       }
// // //     }
// // //   }
  
// // //   // If we don't have 4 options, add more spread out options
// // //   if (options.size < 4) {
// // //     const fallbackDiffs = [-25, -22, 22, 25, -28, 28, -30, 30];
// // //     for (const diff of shuffle(fallbackDiffs)) {
// // //       if (options.size >= 4) break;
// // //       const candidate = correctNum + diff;
// // //       if (candidate >= 0 && candidate <= 100) {
// // //         const candidateStr = candidate.toString();
// // //         if (!options.has(candidateStr)) {
// // //           options.add(candidateStr);
// // //         }
// // //       }
// // //     }
// // //   }
  
// // //   // Last resort: add random numbers from the full range
// // //   while (options.size < 4) {
// // //     const randomNum = rand(0, 100);
// // //     const candidateStr = randomNum.toString();
// // //     if (!options.has(candidateStr)) {
// // //       options.add(candidateStr);
// // //     }
// // //   }
  
// // //   // Convert to array and shuffle, then add "None of the above" at the end
// // //   const optionsArray = shuffle([...options]);
// // //   optionsArray.push("None of the above");
  
// // //   return optionsArray;
// // // }

// // // // -----------------------------------
// // // // Main Function with Parameters
// // // // -----------------------------------

// // // export function generatePuzzle_consonant_count(options = {}) {
// // //   // Default values
// // //   const {
// // //     minWords = 14,
// // //     maxWords = 25,
// // //     width = 400,
// // //     height = 250,
// // //     showWatermark = true,
// // //     watermarkText = "Powered by AVI",
// // //     wordColors = true,
// // //     instructionText = "How many times do these letters appear in the paragraph?"
// // //   } = options;
  
// // //   // Generate random 5 consonants
// // //   const targetLetters = generateRandomConsonants();
// // //   const targetLettersDisplay = targetLetters.join(', ');
  
// // //   // Generate random paragraph with specified word count
// // //   const paragraph = generateRandomParagraph(minWords, maxWords);
  
// // //   // Count occurrences of target letters
// // //   const letterCount = countSpecificLetters(paragraph, targetLetters);
// // //   const answer = letterCount.toString();
  
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
  
// // //   // Draw target letters prominently at top
// // //   ctx.save();
// // //   ctx.fillStyle = '#1a4053';
// // //   ctx.font = 'bold 28px Arial';
// // //   ctx.textAlign = 'center';
// // //   ctx.textBaseline = 'top';
// // //   ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
// // //   ctx.shadowBlur = 8;
// // //   ctx.fillText(`🔍 Find these letters: ${targetLettersDisplay}`, width / 2, 20);
// // //   ctx.shadowBlur = 0;
// // //   ctx.restore();
  
// // //   // Draw paragraph in a box
// // //   const boxX = 30;
// // //   const boxY = 75;
// // //   const boxWidth = width - 60;
// // //   const boxHeight = height - 140;
  
// // //   // Box background
// // //   ctx.fillStyle = '#ffffff';
// // //   ctx.shadowColor = 'rgba(0, 0, 0, 0.06)';
// // //   ctx.shadowBlur = 12;
// // //   ctx.shadowOffsetX = 0;
// // //   ctx.shadowOffsetY = 3;
// // //   ctx.beginPath();
// // //   ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 12);
// // //   ctx.fill();
// // //   ctx.shadowBlur = 0;
  
// // //   // Paragraph text with random colors for each word (optional)
// // //   const words = paragraph.split(' ');
// // //   let currentX = boxX + 20;
// // //   let currentY = boxY + 20;
  
// // //   // Color palette for words
// // //   const colorPalette = [
// // //     '#2C3E50', '#E74C3C', '#2980B9', '#27AE60', '#8E44AD', '#F39C12',
// // //     '#1ABC9C', '#D35400', '#3498DB', '#2ECC71', '#9B59B6', '#E67E22',
// // //     '#16A085', '#C0392B', '#2471A3', '#229954', '#7D3C98', '#D4AC0D',
// // //     '#138D75', '#B9770E', '#1A5276', '#1E8449', '#6C3483', '#A04000'
// // //   ];
  
// // //   // Draw each word
// // //   for (let i = 0; i < words.length; i++) {
// // //     const word = words[i];
    
// // //     // Choose color based on wordColors flag
// // //     const color = wordColors ? getRandom(colorPalette) : '#2C3E50';
    
// // //     // Measure the word
// // //     ctx.font = '16px Arial';
// // //     const metrics = ctx.measureText(word + ' ');
// // //     const wordWidth = metrics.width;
    
// // //     // Check if we need to wrap
// // //     if (currentX + wordWidth > boxX + boxWidth - 20) {
// // //       currentY += 26;
// // //       currentX = boxX + 20;
      
// // //       // If we're out of space, break
// // //       if (currentY + 26 > boxY + boxHeight - 20) break;
// // //     }
    
// // //     // Draw the word
// // //     ctx.fillStyle = color;
// // //     ctx.font = '16px Arial';
// // //     ctx.textAlign = 'left';
// // //     ctx.textBaseline = 'top';
// // //     ctx.fillText(word, currentX, currentY);
    
// // //     // Add space after word (except last)
// // //     if (i < words.length - 1) {
// // //       currentX += wordWidth;
// // //     }
// // //   }
  
// // //   // ---------------- WATERMARK (optional) ----------------
// // //   if (showWatermark) {
// // //     ctx.save();
// // //     ctx.globalAlpha = 0.6;
// // //     ctx.textAlign = "right";
// // //     ctx.textBaseline = "bottom";
    
// // //     ctx.font = "bold 14px Arial";
// // //     ctx.fillStyle = "#2C3E50";
// // //     ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
// // //     ctx.shadowBlur = 2;
// // //     ctx.fillText(watermarkText, width - 15, height - 8);
    
// // //     ctx.restore();
// // //   }
  
// // //   // Add instruction at bottom
// // //   ctx.fillStyle = '#7f8c8d';
// // //   ctx.font = '13px Arial';
// // //   ctx.textAlign = 'center';
// // //   ctx.textBaseline = 'bottom';
// // //   ctx.globalAlpha = 0.6;
// // //   ctx.fillText(`Count how many times these letters (${targetLettersDisplay}) appear in the paragraph`, width / 2, height - 10);
// // //   ctx.globalAlpha = 1.0;
  
// // //   // Generate options with "None of the above" always at the end
// // //   const generatedOptions = generateOptions(answer);
  
// // //   // -----------------------------------
// // //   // Return
// // //   // -----------------------------------
  
// // //   return {
// // //     question: `How many times do the letters ${targetLettersDisplay} appear in the paragraph?`,
// // //     options: generatedOptions,
// // //     answer: answer,
// // //     targetLetters: targetLetters,
// // //     targetLettersDisplay: targetLettersDisplay,
// // //     wordCount: words.length,
// // //     letterCount: letterCount,
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
// // // Generate Random Paragraph with Configurable Word Count
// // // -----------------------------------

// // function generateRandomParagraph(minWords = 14, maxWords = 25) {
// //   const wordBank = [
// //     "apple", "bird", "cloud", "dragon", "eagle", "forest", "garden", "harbor", "island", "jungle",
// //     "knight", "lion", "mountain", "night", "ocean", "penguin", "queen", "river", "storm", "tiger",
// //     "umbrella", "valley", "whale", "xenon", "yacht", "zebra", "crystal", "diamond", "ember", "flame",
// //     "glacier", "horizon", "ivory", "jade", "kiwi", "lavender", "moon", "nebula", "opal", "pearl",
// //     "quartz", "rainbow", "sapphire", "twilight", "uranium", "vortex", "willow", "xylem", "yew", "zenith",
// //     "blossom", "cascade", "drift", "echo", "frost", "glimmer", "haze", "illusion", "jubilee", "kaleidoscope",
// //     "labyrinth", "mirage", "nostalgia", "oasis", "paradox", "quasar", "reverie", "serenity", "tempest",
// //     "utopia", "vivid", "whisper", "xenial", "yearning", "zephyr",
// //     "astronaut", "breeze", "cosmos", "dream", "eclipse", "feather", "galaxy", "harmony",
// //     "illuminate", "journey", "kindle", "lunar", "mystic", "nova", "orbit", "pulse", "radiant",
// //     "solstice", "tranquil", "unique", "velocity", "wander", "xenolith", "yonder", "zen"
// //   ];
  
// //   // Ensure valid range
// //   const min = Math.max(1, minWords);
// //   const max = Math.max(min, maxWords);
  
// //   // Shuffle and pick words
// //   const shuffled = shuffle([...wordBank]);
// //   const wordCount = rand(min, max);
// //   const selected = [];
  
// //   for (let i = 0; i < wordCount; i++) {
// //     const idx = i % shuffled.length;
// //     selected.push(shuffled[idx]);
// //   }
  
// //   // Shuffle again to mix order
// //   shuffle(selected);
  
// //   // Build paragraph
// //   let paragraph = '';
// //   for (let i = 0; i < selected.length; i++) {
// //     let word = selected[i];
// //     // Random uppercase first letter (30% chance)
// //     if (Math.random() < 0.3) {
// //       word = word.charAt(0).toUpperCase() + word.slice(1);
// //     }
// //     paragraph += word;
    
// //     // Add punctuation
// //     if (i < selected.length - 1) {
// //       const randVal = Math.random();
// //       if (randVal < 0.15) paragraph += ', ';
// //       else if (randVal < 0.25) paragraph += '. ';
// //       else if (randVal < 0.3) paragraph += '; ';
// //       else paragraph += ' ';
// //     }
// //   }
  
// //   // End with punctuation
// //   if (!paragraph.endsWith('.') && !paragraph.endsWith('!') && !paragraph.endsWith('?')) {
// //     paragraph += '.';
// //   }
  
// //   // Ensure at least some letters
// //   if (paragraph.length < 20) {
// //     paragraph = "A quick brown fox jumps over the lazy dog, but sometimes the world is quiet. " +
// //                "Zephyrs blow through the valley, carrying whispers of ancient tales.";
// //   }
  
// //   return paragraph;
// // }

// // // -----------------------------------
// // // Generate Random 5 Consonants (Non-Vowels)
// // // -----------------------------------

// // function generateRandomConsonants() {
// //   const consonants = 'BCDFGHJKLMNPQRSTVWXYZ'.split('');
// //   const shuffled = shuffle([...consonants]);
// //   return shuffled.slice(0, 5);
// // }

// // // -----------------------------------
// // // Count Specific Letters in Paragraph
// // // -----------------------------------

// // function countSpecificLetters(text, letters) {
// //   const letterSet = new Set(letters.map(l => l.toLowerCase()));
// //   let count = 0;
// //   for (let i = 0; i < text.length; i++) {
// //     const char = text[i].toLowerCase();
// //     if (letterSet.has(char)) {
// //       count++;
// //     }
// //   }
// //   return count;
// // }

// // // -----------------------------------
// // // Generate Options - ALWAYS includes "None of the above" at the end
// // // -----------------------------------

// // function generateOptions(correctAnswer) {
// //   const correctNum = parseInt(correctAnswer);
// //   const options = new Set();
  
// //   // Special handling for small numbers (0-10)
// //   if (correctNum <= 10) {
// //     // Generate consecutive options starting from 0
// //     const startNum = Math.max(0, correctNum - 3);
// //     const endNum = Math.min(10, correctNum + 3);
    
// //     for (let i = startNum; i <= endNum; i++) {
// //       options.add(i.toString());
// //     }
    
// //     // Ensure we have at least 4 options
// //     while (options.size < 4) {
// //       const randomNum = rand(0, 10);
// //       if (!options.has(randomNum.toString())) {
// //         options.add(randomNum.toString());
// //       }
// //     }
    
// //     // Convert to array, shuffle, then add "None of the above" at the end
// //     const optionsArray = shuffle([...options]);
// //     optionsArray.push("None of the above");
// //     return optionsArray;
// //   }
  
// //   // For larger numbers, use the spread approach
// //   // Create a more diverse spread of options
// //   const possibleDiffs = [];
  
// //   // Generate a wider range of differences with varying probabilities
// //   const closeDiffs = [-2, -1, 1, 2];
// //   const mediumDiffs = [-5, -4, 4, 5, -6, 6];
// //   const largeDiffs = [-10, -8, 8, 10, -12, 12, -15, 15, -18, 18, -20, 20];
  
// //   // Shuffle and mix diffs with different weights
// //   const allDiffs = [
// //     ...shuffle(closeDiffs).slice(0, 1),
// //     ...shuffle(mediumDiffs).slice(0, 2),
// //     ...shuffle(largeDiffs).slice(0, 3)
// //   ];
  
// //   const shuffledDiffs = shuffle(allDiffs);
  
// //   // Add the correct answer first
// //   options.add(correctAnswer);
  
// //   for (const diff of shuffledDiffs) {
// //     if (options.size >= 4) break;
    
// //     const candidate = correctNum + diff;
// //     if (candidate >= 0 && candidate <= 100) {
// //       const candidateStr = candidate.toString();
// //       if (!options.has(candidateStr)) {
// //         options.add(candidateStr);
// //       }
// //     }
// //   }
  
// //   // If we don't have 4 options, add more spread out options
// //   if (options.size < 4) {
// //     const fallbackDiffs = [-25, -22, 22, 25, -28, 28, -30, 30];
// //     for (const diff of shuffle(fallbackDiffs)) {
// //       if (options.size >= 4) break;
// //       const candidate = correctNum + diff;
// //       if (candidate >= 0 && candidate <= 100) {
// //         const candidateStr = candidate.toString();
// //         if (!options.has(candidateStr)) {
// //           options.add(candidateStr);
// //         }
// //       }
// //     }
// //   }
  
// //   // Last resort: add random numbers from the full range
// //   while (options.size < 4) {
// //     const randomNum = rand(0, 100);
// //     const candidateStr = randomNum.toString();
// //     if (!options.has(candidateStr)) {
// //       options.add(candidateStr);
// //     }
// //   }
  
// //   // Convert to array and shuffle, then add "None of the above" at the end
// //   const optionsArray = shuffle([...options]);
// //   optionsArray.push("None of the above");
  
// //   return optionsArray;
// // }

// // // -----------------------------------
// // // Main Function with Parameters
// // // -----------------------------------

// // export function generatePuzzle_consonant_count(options = {}) {
// //   // Default values
// //   const {
// //     minWords = 14,
// //     maxWords = 25,
// //     width = 400,
// //     height = 250,
// //     showWatermark = true,
// //     watermarkText = "Powered by AVI",
// //     wordColors = true,
// //     instructionText = "How many times do these letters appear in the paragraph?"
// //   } = options;
  
// //   // Generate random 5 consonants
// //   const targetLetters = generateRandomConsonants();
// //   const targetLettersDisplay = targetLetters.join(', ');
  
// //   // Generate random paragraph with specified word count
// //   const paragraph = generateRandomParagraph(minWords, maxWords);
  
// //   // Count occurrences of target letters
// //   const letterCount = countSpecificLetters(paragraph, targetLetters);
// //   const answer = letterCount.toString();
  
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
  
// //   // Draw target letters prominently at top
// //   ctx.save();
// //   ctx.fillStyle = '#1a4053';
// //   ctx.font = 'bold 28px Arial';
// //   ctx.textAlign = 'center';
// //   ctx.textBaseline = 'top';
// //   ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
// //   ctx.shadowBlur = 8;
// //   ctx.fillText(`🔍 Find these letters: ${targetLettersDisplay}`, width / 2, 20);
// //   ctx.shadowBlur = 0;
// //   ctx.restore();
  
// //   // Draw paragraph in a box
// //   const boxX = 30;
// //   const boxY = 75;
// //   const boxWidth = width - 60;
// //   const boxHeight = height - 140;
  
// //   // Box background
// //   ctx.fillStyle = '#ffffff';
// //   ctx.shadowColor = 'rgba(0, 0, 0, 0.06)';
// //   ctx.shadowBlur = 12;
// //   ctx.shadowOffsetX = 0;
// //   ctx.shadowOffsetY = 3;
// //   ctx.beginPath();
// //   ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 12);
// //   ctx.fill();
// //   ctx.shadowBlur = 0;
  
// //   // Paragraph text with random colors for each word (optional)
// //   const words = paragraph.split(' ');
// //   let currentX = boxX + 20;
// //   let currentY = boxY + 20;
  
// //   // Color palette for words
// //   const colorPalette = [
// //     '#2C3E50', '#E74C3C', '#2980B9', '#27AE60', '#8E44AD', '#F39C12',
// //     '#1ABC9C', '#D35400', '#3498DB', '#2ECC71', '#9B59B6', '#E67E22',
// //     '#16A085', '#C0392B', '#2471A3', '#229954', '#7D3C98', '#D4AC0D',
// //     '#138D75', '#B9770E', '#1A5276', '#1E8449', '#6C3483', '#A04000'
// //   ];
  
// //   // Draw each word
// //   for (let i = 0; i < words.length; i++) {
// //     const word = words[i];
    
// //     // Choose color based on wordColors flag
// //     const color = wordColors ? getRandom(colorPalette) : '#2C3E50';
    
// //     // Measure the word
// //     ctx.font = '16px Arial';
// //     const metrics = ctx.measureText(word + ' ');
// //     const wordWidth = metrics.width;
    
// //     // Check if we need to wrap
// //     if (currentX + wordWidth > boxX + boxWidth - 20) {
// //       currentY += 26;
// //       currentX = boxX + 20;
      
// //       // If we're out of space, break
// //       if (currentY + 26 > boxY + boxHeight - 20) break;
// //     }
    
// //     // Draw the word
// //     ctx.fillStyle = color;
// //     ctx.font = '16px Arial';
// //     ctx.textAlign = 'left';
// //     ctx.textBaseline = 'top';
// //     ctx.fillText(word, currentX, currentY);
    
// //     // Add space after word (except last)
// //     if (i < words.length - 1) {
// //       currentX += wordWidth;
// //     }
// //   }
  
// //   // ---------------- WATERMARK (optional) ----------------
// //   if (showWatermark) {
// //     ctx.save();
// //     ctx.globalAlpha = 0.6;
// //     ctx.textAlign = "right";
// //     ctx.textBaseline = "bottom";
    
// //     ctx.font = "bold 14px Arial";
// //     ctx.fillStyle = "#2C3E50";
// //     ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
// //     ctx.shadowBlur = 2;
// //     ctx.fillText(watermarkText, width - 15, height - 8);
    
// //     ctx.restore();
// //   }
  
// //   // Add instruction at bottom
// //   ctx.fillStyle = '#7f8c8d';
// //   ctx.font = '13px Arial';
// //   ctx.textAlign = 'center';
// //   ctx.textBaseline = 'bottom';
// //   ctx.globalAlpha = 0.6;
// //   ctx.fillText(`Count how many times these letters (${targetLettersDisplay}) appear in the paragraph`, width / 2, height - 10);
// //   ctx.globalAlpha = 1.0;
  
// //   // Generate options with "None of the above" always at the end
// //   const generatedOptions = generateOptions(answer);
  
// //   // -----------------------------------
// //   // Return
// //   // -----------------------------------
  
// //   return {
// //     question: `How many times do the letters ${targetLettersDisplay} appear in the paragraph?`,
// //     options: generatedOptions,
// //     answer: answer,
// //     targetLetters: targetLetters,
// //     targetLettersDisplay: targetLettersDisplay,
// //     wordCount: words.length,
// //     letterCount: letterCount,
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
// // Generate Random Paragraph with Configurable Word Count
// // -----------------------------------

// function generateRandomParagraph(minWords = 14, maxWords = 25) {
//   const wordBank = [
//     "apple", "bird", "cloud", "dragon", "eagle", "forest", "garden", "harbor", "island", "jungle",
//     "knight", "lion", "mountain", "night", "ocean", "penguin", "queen", "river", "storm", "tiger",
//     "umbrella", "valley", "whale", "xenon", "yacht", "zebra", "crystal", "diamond", "ember", "flame",
//     "glacier", "horizon", "ivory", "jade", "kiwi", "lavender", "moon", "nebula", "opal", "pearl",
//     "quartz", "rainbow", "sapphire", "twilight", "uranium", "vortex", "willow", "xylem", "yew", "zenith",
//     "blossom", "cascade", "drift", "frost", "glimmer", "haze", "illusion", "jubilee", "kaleidoscope",
//     "labyrinth", "mirage", "nostalgia", "oasis", "paradox", "quasar", "reverie", "serenity", "tempest",
//     "utopia", "vivid", "whisper", "xenial", "yearning", "zephyr",
//     "astronaut", "breeze", "cosmos", "dream", "eclipse", "feather", "galaxy", "harmony",
//     "illuminate", "journey", "kindle", "lunar", "mystic", "nova", "orbit", "pulse", "radiant",
//     "solstice", "tranquil", "unique", "velocity", "wander", "xenolith", "yonder", "zen"
//   ];
  
//   // Ensure valid range
//   const min = Math.max(1, minWords);
//   const max = Math.max(min, maxWords);
  
//   // Shuffle and pick words
//   const shuffled = shuffle([...wordBank]);
//   const wordCount = rand(min, max);
//   const selected = [];
  
//   for (let i = 0; i < wordCount; i++) {
//     const idx = i % shuffled.length;
//     selected.push(shuffled[idx]);
//   }
  
//   // Shuffle again to mix order
//   shuffle(selected);
  
//   // Build paragraph
//   let paragraph = '';
//   for (let i = 0; i < selected.length; i++) {
//     let word = selected[i];
//     // Random uppercase first letter (30% chance)
//     if (Math.random() < 0.3) {
//       word = word.charAt(0).toUpperCase() + word.slice(1);
//     }
//     paragraph += word;
    
//     // Add punctuation
//     if (i < selected.length - 1) {
//       const randVal = Math.random();
//       if (randVal < 0.15) paragraph += ', ';
//       else if (randVal < 0.25) paragraph += '. ';
//       else if (randVal < 0.3) paragraph += '; ';
//       else paragraph += ' ';
//     }
//   }
  
//   // End with punctuation
//   if (!paragraph.endsWith('.') && !paragraph.endsWith('!') && !paragraph.endsWith('?')) {
//     paragraph += '.';
//   }
  
//   // Ensure at least some letters
//   if (paragraph.length < 20) {
//     paragraph = "A quick brown fox jumps over the lazy dog, but sometimes the world is quiet. " +
//                "Zephyrs blow through the valley, carrying whispers of ancient tales.";
//   }
  
//   return paragraph;
// }

// // -----------------------------------
// // Generate Random 5 Consonants (Non-Vowels)
// // -----------------------------------

// function generateRandomConsonants() {
//   const consonants = 'BCDFGHJKLMNPQRSTVWXYZ'.split('');
//   const shuffled = shuffle([...consonants]);
//   return shuffled.slice(0, 5);
// }

// // -----------------------------------
// // Count Specific Letters in Paragraph
// // -----------------------------------

// function countSpecificLetters(text, letters) {
//   const letterSet = new Set(letters.map(l => l.toLowerCase()));
//   let count = 0;
//   for (let i = 0; i < text.length; i++) {
//     const char = text[i].toLowerCase();
//     if (letterSet.has(char)) {
//       count++;
//     }
//   }
//   return count;
// }

// // -----------------------------------
// // Generate Options - ALWAYS includes "None of the above" at the end
// // -----------------------------------

// function generateOptions(correctAnswer) {
//   const correctNum = parseInt(correctAnswer);
//   const options = new Set();
  
//   // Special handling for small numbers (0-10)
//   if (correctNum <= 10) {
//     // Generate consecutive options starting from 0
//     const startNum = Math.max(0, correctNum - 3);
//     const endNum = Math.min(10, correctNum + 3);
    
//     for (let i = startNum; i <= endNum; i++) {
//       options.add(i.toString());
//     }
    
//     // Ensure we have at least 4 options
//     while (options.size < 4) {
//       const randomNum = rand(0, 10);
//       if (!options.has(randomNum.toString())) {
//         options.add(randomNum.toString());
//       }
//     }
    
//     // Convert to array, shuffle, then add "None of the above" at the end
//     const optionsArray = shuffle([...options]);
//     optionsArray.push("None of the above");
//     return optionsArray;
//   }
  
//   // For larger numbers, use the spread approach
//   // Create a more diverse spread of options
//   const possibleDiffs = [];
  
//   // Generate a wider range of differences with varying probabilities
//   const closeDiffs = [-2, -1, 1, 2];
//   const mediumDiffs = [-5, -4, 4, 5, -6, 6];
//   const largeDiffs = [-10, -8, 8, 10, -12, 12, -15, 15, -18, 18, -20, 20];
  
//   // Shuffle and mix diffs with different weights
//   const allDiffs = [
//     ...shuffle(closeDiffs).slice(0, 1),
//     ...shuffle(mediumDiffs).slice(0, 2),
//     ...shuffle(largeDiffs).slice(0, 3)
//   ];
  
//   const shuffledDiffs = shuffle(allDiffs);
  
//   // Add the correct answer first
//   options.add(correctAnswer);
  
//   for (const diff of shuffledDiffs) {
//     if (options.size >= 4) break;
    
//     const candidate = correctNum + diff;
//     if (candidate >= 0 && candidate <= 100) {
//       const candidateStr = candidate.toString();
//       if (!options.has(candidateStr)) {
//         options.add(candidateStr);
//       }
//     }
//   }
  
//   // If we don't have 4 options, add more spread out options
//   if (options.size < 4) {
//     const fallbackDiffs = [-25, -22, 22, 25, -28, 28, -30, 30];
//     for (const diff of shuffle(fallbackDiffs)) {
//       if (options.size >= 4) break;
//       const candidate = correctNum + diff;
//       if (candidate >= 0 && candidate <= 100) {
//         const candidateStr = candidate.toString();
//         if (!options.has(candidateStr)) {
//           options.add(candidateStr);
//         }
//       }
//     }
//   }
  
//   // Last resort: add random numbers from the full range
//   while (options.size < 4) {
//     const randomNum = rand(0, 100);
//     const candidateStr = randomNum.toString();
//     if (!options.has(candidateStr)) {
//       options.add(candidateStr);
//     }
//   }
  
//   // Convert to array and shuffle, then add "None of the above" at the end
//   const optionsArray = shuffle([...options]);
//   optionsArray.push("None of the above");
  
//   return optionsArray;
// }

// // -----------------------------------
// // Main Function with Parameters
// // -----------------------------------

// export function generatePuzzle_consonant_count(options = {}) {
//   // Default values
//   const {
//     minWords = 14,
//     maxWords = 25,
//     width = 400,
//     height = 250,
//     showWatermark = true,
//     watermarkText = "Powered by AVI",
//     wordColors = true,
//     instructionText = "How many times do these letters appear in the paragraph?"
//   } = options;
  
//   // Generate random 5 consonants
//   const targetLetters = generateRandomConsonants();
//   const targetLettersDisplay = targetLetters.join(', ');
  
//   // Generate random paragraph with specified word count
//   const paragraph = generateRandomParagraph(minWords, maxWords);
  
//   // Count occurrences of target letters
//   const letterCount = countSpecificLetters(paragraph, targetLetters);
//   const answer = letterCount.toString();
  
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
  
//   // Draw target letters prominently at top
//   // ctx.save();
//   // ctx.fillStyle = '#1a4053';
//   // ctx.font = 'bold 28px Arial';
//   // ctx.textAlign = 'center';
//   // ctx.textBaseline = 'top';
//   // ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
//   // ctx.shadowBlur = 8;
//   // ctx.fillText(`🔍 Find these letters: ${targetLettersDisplay}`, width / 2, 20);
//   // ctx.shadowBlur = 0;
//   // ctx.restore();
  
//   // Draw paragraph in a box
//   const boxX = 30;
//   const boxY = 75;
//   const boxWidth = width - 60;
//   const boxHeight = height - 140;
  
//   // Box background
//   // ctx.fillStyle = '#ffffff';
//   // ctx.shadowColor = 'rgba(0, 0, 0, 0.06)';
//   // ctx.shadowBlur = 12;
//   // ctx.shadowOffsetX = 0;
//   // ctx.shadowOffsetY = 3;
//   // ctx.beginPath();
//   // ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 12);
//   // ctx.fill();
//   // ctx.shadowBlur = 0;
  
//   // Paragraph text with random colors for each word (optional)
//   const words = paragraph.split(' ');
//   let currentX = boxX + 20;
//   let currentY = boxY + 20;
  
//   // Color palette for words
//   const colorPalette = [
//     '#2C3E50', '#E74C3C', '#2980B9', '#27AE60', '#8E44AD', '#F39C12',
//     '#1ABC9C', '#D35400', '#3498DB', '#2ECC71', '#9B59B6', '#E67E22',
//     '#16A085', '#C0392B', '#2471A3', '#229954', '#7D3C98', '#D4AC0D',
//     '#138D75', '#B9770E', '#1A5276', '#1E8449', '#6C3483', '#A04000'
//   ];
  
//   // Draw each word
//   for (let i = 0; i < words.length; i++) {
//     const word = words[i];
    
//     // Choose color based on wordColors flag
//     const color = wordColors ? getRandom(colorPalette) : '#2C3E50';
    
//     // Measure the word
//     ctx.font = '16px Arial';
//     const metrics = ctx.measureText(word + ' ');
//     const wordWidth = metrics.width;
    
//     // Check if we need to wrap
//     if (currentX + wordWidth > boxX + boxWidth - 20) {
//       currentY += 26;
//       currentX = boxX + 20;
      
//       // If we're out of space, break
//       if (currentY + 26 > boxY + boxHeight - 20) break;
//     }
    
//     // Draw the word
//     ctx.fillStyle = color;
//     ctx.font = '16px Arial';
//     ctx.textAlign = 'left';
//     ctx.textBaseline = 'top';
//     ctx.fillText(word, currentX, currentY);
    
//     // Add space after word (except last)
//     if (i < words.length - 1) {
//       currentX += wordWidth;
//     }
//   }
  
//   // ---------------- WATERMARK (optional) ----------------
//   if (showWatermark) {
//     ctx.save();
//     ctx.globalAlpha = 0.6;
//     ctx.textAlign = "right";
//     ctx.textBaseline = "bottom";
    
//     ctx.font = "bold 14px Arial";
//     ctx.fillStyle = "#2C3E50";
//     ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
//     ctx.shadowBlur = 2;
//     ctx.fillText(watermarkText, width - 15, height - 8);
    
//     ctx.restore();
//   }
  
//   // Add instruction at bottom
//   // ctx.fillStyle = '#7f8c8d';
//   // ctx.font = '13px Arial';
//   // ctx.textAlign = 'center';
//   // ctx.textBaseline = 'bottom';
//   // ctx.globalAlpha = 0.6;
//   // ctx.fillText(`Count how many times these letters (${targetLettersDisplay}) appear in the paragraph`, width / 2, height - 10);
//   // ctx.globalAlpha = 1.0;
  
//   // Generate options with "None of the above" always at the end
//   const generatedOptions = generateOptions(answer);
  
//   // -----------------------------------
//   // Return
//   // -----------------------------------
  
//   return {
//     question: `How many times do the letters ${targetLettersDisplay} appear in the paragraph?`,
//     options: generatedOptions,
//     answer: answer,
//     targetLetters: targetLetters,
//     targetLettersDisplay: targetLettersDisplay,
//     wordCount: words.length,
//     letterCount: letterCount,
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
// Generate Random Paragraph with Configurable Word Count
// -----------------------------------

function generateRandomParagraph(minWords = 14, maxWords = 25) {
  const wordBank = [
    "apple", "bird", "cloud", "dragon", "eagle", "forest", "garden", "harbor", "island", "jungle",
    "knight", "lion", "mountain", "night", "ocean", "penguin", "queen", "river", "storm", "tiger",
    "umbrella", "valley", "whale", "xenon", "yacht", "zebra", "crystal", "diamond", "ember", "flame",
    "glacier", "horizon", "ivory", "jade", "kiwi", "lavender", "moon", "nebula", "opal", "pearl",
    "quartz", "rainbow", "sapphire", "twilight", "uranium", "vortex", "willow", "xylem", "yew", "zenith",
    "blossom", "cascade", "drift", "frost", "glimmer", "haze", "illusion", "jubilee", "kaleidoscope",
    "labyrinth", "mirage", "nostalgia", "oasis", "paradox", "quasar", "reverie", "serenity", "tempest",
    "utopia", "vivid", "whisper", "xenial", "yearning", "zephyr",
    "astronaut", "breeze", "cosmos", "dream", "eclipse", "feather", "galaxy", "harmony",
    "illuminate", "journey", "kindle", "lunar", "mystic", "nova", "orbit", "pulse", "radiant",
    "solstice", "tranquil", "unique", "velocity", "wander", "xenolith", "yonder", "zen"
  ];
  
  // Ensure valid range
  const min = Math.max(1, minWords);
  const max = Math.max(min, maxWords);
  
  // Shuffle and pick words
  const shuffled = shuffle([...wordBank]);
  const wordCount = rand(min, max);
  const selected = [];
  
  for (let i = 0; i < wordCount; i++) {
    const idx = i % shuffled.length;
    selected.push(shuffled[idx]);
  }
  
  // Shuffle again to mix order
  shuffle(selected);
  
  // Build paragraph
  let paragraph = '';
  for (let i = 0; i < selected.length; i++) {
    let word = selected[i];
    // Random uppercase first letter (30% chance)
    if (Math.random() < 0.3) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    }
    paragraph += word;
    
    // Add punctuation
    if (i < selected.length - 1) {
      const randVal = Math.random();
      if (randVal < 0.15) paragraph += ', ';
      else if (randVal < 0.25) paragraph += '. ';
      else if (randVal < 0.3) paragraph += '; ';
      else paragraph += ' ';
    }
  }
  
  // End with punctuation
  if (!paragraph.endsWith('.') && !paragraph.endsWith('!') && !paragraph.endsWith('?')) {
    paragraph += '.';
  }
  
  // Ensure at least some letters
  if (paragraph.length < 20) {
    paragraph = "A quick brown fox jumps over the lazy dog, but sometimes the world is quiet. " +
               "Zephyrs blow through the valley, carrying whispers of ancient tales.";
  }
  
  return paragraph;
}

// -----------------------------------
// Generate Random 5 Consonants (Non-Vowels)
// -----------------------------------

function generateRandomConsonants() {
  const consonants = 'BCDFGHJKLMNPQRSTVWXYZ'.split('');
  const shuffled = shuffle([...consonants]);
  return shuffled.slice(0, 5);
}

// -----------------------------------
// Count Specific Letters in Paragraph
// -----------------------------------

function countSpecificLetters(text, letters) {
  const letterSet = new Set(letters.map(l => l.toLowerCase()));
  let count = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text[i].toLowerCase();
    if (letterSet.has(char)) {
      count++;
    }
  }
  return count;
}

// -----------------------------------
// Generate Options - ALWAYS includes "None of the above" at the end
// -----------------------------------

function generateOptions(correctAnswer) {
  const correctNum = parseInt(correctAnswer);
  const options = new Set();
  
  // Special handling for small numbers (0-10)
  if (correctNum <= 10) {
    // Generate consecutive options starting from 0
    const startNum = Math.max(0, correctNum - 3);
    const endNum = Math.min(10, correctNum + 3);
    
    for (let i = startNum; i <= endNum; i++) {
      options.add(i.toString());
    }
    
    // Ensure we have at least 4 options
    while (options.size < 4) {
      const randomNum = rand(0, 10);
      if (!options.has(randomNum.toString())) {
        options.add(randomNum.toString());
      }
    }
    
    // Convert to array, shuffle, then add "None of the above" at the end
    const optionsArray = shuffle([...options]);
    optionsArray.push("None of the above");
    return optionsArray;
  }
  
  // For larger numbers, use the spread approach
  // Create a more diverse spread of options
  const possibleDiffs = [];
  
  // Generate a wider range of differences with varying probabilities
  const closeDiffs = [-2, -1, 1, 2];
  const mediumDiffs = [-5, -4, 4, 5, -6, 6];
  const largeDiffs = [-10, -8, 8, 10, -12, 12, -15, 15, -18, 18, -20, 20];
  
  // Shuffle and mix diffs with different weights
  const allDiffs = [
    ...shuffle(closeDiffs).slice(0, 1),
    ...shuffle(mediumDiffs).slice(0, 2),
    ...shuffle(largeDiffs).slice(0, 3)
  ];
  
  const shuffledDiffs = shuffle(allDiffs);
  
  // Add the correct answer first
  options.add(correctAnswer);
  
  for (const diff of shuffledDiffs) {
    if (options.size >= 4) break;
    
    const candidate = correctNum + diff;
    if (candidate >= 0 && candidate <= 100) {
      const candidateStr = candidate.toString();
      if (!options.has(candidateStr)) {
        options.add(candidateStr);
      }
    }
  }
  
  // If we don't have 4 options, add more spread out options
  if (options.size < 4) {
    const fallbackDiffs = [-25, -22, 22, 25, -28, 28, -30, 30];
    for (const diff of shuffle(fallbackDiffs)) {
      if (options.size >= 4) break;
      const candidate = correctNum + diff;
      if (candidate >= 0 && candidate <= 100) {
        const candidateStr = candidate.toString();
        if (!options.has(candidateStr)) {
          options.add(candidateStr);
        }
      }
    }
  }
  
  // Last resort: add random numbers from the full range
  while (options.size < 4) {
    const randomNum = rand(0, 100);
    const candidateStr = randomNum.toString();
    if (!options.has(candidateStr)) {
      options.add(candidateStr);
    }
  }
  
  // Convert to array and shuffle, then add "None of the above" at the end
  const optionsArray = shuffle([...options]);
  optionsArray.push("None of the above");
  
  return optionsArray;
}

// -----------------------------------
// Main Function with Parameters
// -----------------------------------

export function generatePuzzle_consonant_count(options = {}) {
  // Default values
  const {
    minWords = 14,
    maxWords = 25,
    width = 400,
    height = 250,
    showWatermark = true,
    watermarkText = "Powered by AVI",
    wordColors = true,
    instructionText = "How many times do these letters appear in the paragraph?"
  } = options;
  
  // Generate random 5 consonants
  const targetLetters = generateRandomConsonants();
  const targetLettersDisplay = targetLetters.join(', ');
  
  // Generate random paragraph with specified word count
  const paragraph = generateRandomParagraph(minWords, maxWords);
  
  // Count occurrences of target letters
  const letterCount = countSpecificLetters(paragraph, targetLetters);
  const answer = letterCount.toString();
  
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
  
  // Draw target letters prominently at top
  // ctx.save();
  // ctx.fillStyle = '#1a4053';
  // ctx.font = 'bold 28px Arial';
  // ctx.textAlign = 'center';
  // ctx.textBaseline = 'top';
  // ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
  // ctx.shadowBlur = 8;
  // ctx.fillText(`🔍 Find these letters: ${targetLettersDisplay}`, width / 2, 20);
  // ctx.shadowBlur = 0;
  // ctx.restore();
  
  // Draw paragraph in a box
  const boxX = 30;
  const boxY = 75;
  const boxWidth = width - 60;
  const boxHeight = height - 140;
  
  // Box background
  // ctx.fillStyle = '#ffffff';
  // ctx.shadowColor = 'rgba(0, 0, 0, 0.06)';
  // ctx.shadowBlur = 12;
  // ctx.shadowOffsetX = 0;
  // ctx.shadowOffsetY = 3;
  // ctx.beginPath();
  // ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 12);
  // ctx.fill();
  // ctx.shadowBlur = 0;
  
  // Paragraph text with random colors for each word (optional)
  const words = paragraph.split(' ');
  let currentX = boxX + 20;
  let currentY = boxY + 20;
  
  // Color palette for words
  const colorPalette = [
    '#2C3E50', '#E74C3C', '#2980B9', '#27AE60', '#8E44AD', '#F39C12',
    '#1ABC9C', '#D35400', '#3498DB', '#2ECC71', '#9B59B6', '#E67E22',
    '#16A085', '#C0392B', '#2471A3', '#229954', '#7D3C98', '#D4AC0D',
    '#138D75', '#B9770E', '#1A5276', '#1E8449', '#6C3483', '#A04000'
  ];
  
  // Draw each word
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    
    // Choose color based on wordColors flag
    const color = wordColors ? getRandom(colorPalette) : '#2C3E50';
    
    // Measure the word
    ctx.font = '16px Arial';
    const metrics = ctx.measureText(word + ' ');
    const wordWidth = metrics.width;
    
    // Check if we need to wrap
    if (currentX + wordWidth > boxX + boxWidth - 20) {
      currentY += 26;
      currentX = boxX + 20;
      
      // If we're out of space, break
      if (currentY + 26 > boxY + boxHeight - 20) break;
    }
    
    // Draw the word
    ctx.fillStyle = color;
    ctx.font = '16px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(word, currentX, currentY);
    
    // Add space after word (except last)
    if (i < words.length - 1) {
      currentX += wordWidth;
    }
  }
  
  // ---------------- WATERMARK (optional) ----------------
  if (showWatermark) {
    ctx.save();
    ctx.globalAlpha = 0.6;
    ctx.textAlign = "right";
    ctx.textBaseline = "bottom";
    
    ctx.font = "bold 14px Arial";
    ctx.fillStyle = "#2C3E50";
    ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
    ctx.shadowBlur = 2;
    ctx.fillText(watermarkText, width - 15, height - 8);
    
    ctx.restore();
  }
  
  // Add instruction at bottom
  // ctx.fillStyle = '#7f8c8d';
  // ctx.font = '13px Arial';
  // ctx.textAlign = 'center';
  // ctx.textBaseline = 'bottom';
  // ctx.globalAlpha = 0.6;
  // ctx.fillText(`Count how many times these letters (${targetLettersDisplay}) appear in the paragraph`, width / 2, height - 10);
  // ctx.globalAlpha = 1.0;
  
  // Generate options with "None of the above" always at the end
  const generatedOptions = generateOptions(answer);
  
  // -----------------------------------
  // Return
  // -----------------------------------
  
  return {
    question: `How many times do the letters ${targetLettersDisplay} appear in the paragraph?`,
    options: generatedOptions,
    answer: answer,
    targetLetters: targetLetters,
    targetLettersDisplay: targetLettersDisplay,
    wordCount: words.length,
    letterCount: letterCount,
    image: canvas.toDataURL().split(",")[1]
  };
}