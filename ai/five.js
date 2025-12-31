// word_length_game.js
import puppeteer from "puppeteer";

// ------------------- WORDS -------------------
const WORDS = [
  "logic","brain","focus","count","memory","visual","random","sentence","training",
  "accuracy","intelligence","perception","concentration","comprehension",
  "deduction","inference","analysis","creativity","imagination","intuition",
  "knowledge","understanding","observation","classification","categorization",
  "calculation","optimization","generalization","abstraction","significance"
];

// ------------------- DIFFICULTY DATA -------------------
function diff_data(per) {
  per = Math.max(0, Math.min(per, 100));
  const base = { w1: [4, 5], w2: [4, 5], indexMax: 6 };
  const step = Math.floor(per / 10);

  return {
    "Too Easy": { w1: [base.w1[0]+step, base.w1[1]+step], w2: [base.w2[0]+step, base.w2[1]+step], indexMax: base.indexMax + step*2 },
    "Easy":     { w1: [base.w1[0]+step+1, base.w1[1]+step+1], w2: [base.w2[0]+step+1, base.w2[1]+step+1], indexMax: base.indexMax + step*2 + 2 },
    "Medium":   { w1: [base.w1[0]+step+2, base.w1[1]+step+2], w2: [base.w2[0]+step+2, base.w2[1]+step+2], indexMax: base.indexMax + step*2 + 4 },
    "Tough":    { w1: [base.w1[0]+step+3, base.w1[1]+step+3], w2: [base.w2[0]+step+3, base.w2[1]+step+3], indexMax: base.indexMax + step*2 + 6 },
    "Too Tough":{ w1: [base.w1[0]+step+4, base.w1[1]+step+4], w2: [base.w2[0]+step+4, base.w2[1]+step+4], indexMax: base.indexMax + step*2 + 8 }
  };
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateSentence(count) {
  return Array.from({ length: count }, () => WORDS[rand(0, WORDS.length - 1)]);
}

function ordinal(n) {
  if (n % 100 >= 11 && n % 100 <= 13) return `${n}th`;
  if (n % 10 === 1) return `${n}st`;
  if (n % 10 === 2) return `${n}nd`;
  if (n % 10 === 3) return `${n}rd`;
  return `${n}th`;
}

// ------------------- CORE GAME DATA -------------------
export function generateData1(difficulty, per) {
  const diff = diff_data(per)[difficulty];
  if (!diff) throw new Error("invalid difficulty");

  const s1 = generateSentence(rand(...diff.w1));
  const s2 = generateSentence(rand(...diff.w2));
  const allWords = [...s1, ...s2];
  const fullText = s1.join(" ") + ". " + s2.join(" ") + ".";

  let correctAnswer = 0;
  let question = "";

  const modePool =
    difficulty === "Too Tough"
      ? ["single", "before", "after", "right", "dual"]
      : difficulty === "Tough"
        ? ["single", "before", "after", "right"]
        : ["single"];

  const mode = modePool[rand(0, modePool.length - 1)];

  let index, index2, word;

  if (mode === "dual") {
    index = rand(2, diff.indexMax - 2);
    index2 = rand(2, diff.indexMax - 2);
    while (index2 === index) index2 = rand(2, diff.indexMax - 2);

    correctAnswer = allWords[index - 1].length + allWords[index2 - 1].length;
    question = `Count letters of word ${ordinal(index)} and ${ordinal(index2)}`;
  } else {
    index = rand(2, diff.indexMax - 1);

    if (mode === "before") {
      word = allWords[index - 2];
      question = `Count letters of word before the ${ordinal(index)} word`;
    } else if (mode === "after") {
      word = allWords[index];
      question = `Count letters of word after the ${ordinal(index)} word`;
    } else if (mode === "right") {
      word = allWords[index];
      question = `Count letters of word right side of ${ordinal(index)}`;
    } else {
      word = allWords[index - 1];
      question = `Count letters of the ${ordinal(index)} word`;
    }

    correctAnswer = word.length;
  }

  // ----- OPTIONS -----
  const opts = new Set([correctAnswer]);
  let d = 1;
  while (opts.size < 4) {
    opts.add(correctAnswer + d);
    if (correctAnswer - d > 0) opts.add(correctAnswer - d);
    d++;
  }

  const options = [...opts].sort(() => Math.random() - 0.5);

  return { text: fullText, question, correctAnswer, options };
}

// ------------------- IMAGE RENDER -------------------
// export async function renderImageBase641(text) {
//   const html = `
//   <html>
//   <head>
//     <style>
//       body {
//         font-family: Arial;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         margin: 0;
//         background: white;
//         height: 100vh;
//       }

//       .container {
//         width: 400px;
//         height: 250px;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         border: 3px solid black;
//         border-radius: 10px;
//         padding: 12px;
//         box-sizing: border-box;
//       }

//       p {
//         text-align: center;
//         margin: 0;
//         line-height: 1.4;
//         word-wrap: break-word;
//         overflow-wrap: break-word;

//         /* Dynamically fit text */
//         font-size: clamp(14px, 4vw, 22px);
//         max-height: 100%;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//       }
//     </style>
//   </head>
//   <body>
//     <div class="container">
//       <p>${text}</p>
//     </div>
//   </body>
// </html>

//   `;

//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.setContent(html);
//   const img = await page.screenshot({ encoding: "base64" });
//   await browser.close();
//   return img;
// }


export async function renderImageBase641(text) {
  const html = `
  <html>
  <head>
    <style>
      body {
        font-family: Arial;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0;
        background: white;
        height: 100vh;
      }

      .container {
        width: 400px;
        height: 250px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 3px solid black;
        border-radius: 10px;
        padding: 12px;
        box-sizing: border-box;
      }

      p {
        margin: 0;
        line-height: 1.4;
        text-align: center;
        word-wrap: break-word;
        overflow-wrap: break-word;
        font-size: 16px;
      }
    </style>
  </head>
  <body>
    <div class="container" id="container">
      <p>${text}</p>
    </div>
  </body>
</html>
  `;

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  // Capture only the container element
  const container = await page.$('#container');
  const img = await container.screenshot({ encoding: 'base64' });

  await browser.close();
  return img;
}

