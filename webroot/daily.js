import handleDevvitMessage, {postWebViewMessage} from './devvittowebview.js';
import AppUtils from './apputils.js';
/*
    backend of the daily words grabber
*/

//import {JishoUtil} from "../src/util/jishoUtil";

/*
    buttons
*/
const currWord = (
  document.querySelector('#currWord')
);

const skipBtn =  (
    document.querySelector('#skipBtn')
);

// indexLabel = (
//   document.querySelector('#amtLeft')
// );

const textarea = (
  document.querySelector('#textarea-daily')
);

const guess = (
  document.querySelector('#guessBtn')
);

let currIndex = 0;
let words = {
  "hi": ["sigma", "xion"],
  "what": ["hello", "hi"],
  "goon": ["e", "chauncey"]
};
let guessContent = "";
let correctlyGuessed = 0;
//wordsArray contains an array of each of the keys(japanese words) of the words Record
let wordsArray = Object.keys(words);
currWord.textContent = wordsArray[0];
update(0);

/*
    event listeners
*/

function guessed(){
  guessContent = textarea.value;

  if(words[wordsArray[currIndex]].includes(guessContent))
    ++correctlyGuessed;

  ++currIndex;

  if(currIndex >= wordsArray.length)
    {
      restartGame();
      return;
    }

  currWord.textContent = wordsArray[currIndex];
  update(currIndex);

  textarea.value = "";
  console.log(guessContent);
}

function skip(){
  ++currIndex;
  // currWord.value = words[currIndex];
  update(currIndex);
  if(currIndex >= wordsArray.length)
  {
    restartGame();
    return;
  }
  currWord.textContent = wordsArray[currIndex];
  textarea.value = "";
}

function restartGame(){
  currIndex = 0;
  correctlyGuessed = 0;
  update(0);
  currWord.textContent = wordsArray[0];
}

guess.addEventListener('click', ()=> {
    guessed();
});

textarea.addEventListener('keydown', (event) => {
  if (event.key==="Enter"){
    event.preventDefault();
    guessed();
  }
});

// textarea.addEventListener('keydown', (event) => {
//   if (event.key==="Enter"){
//     event.preventDefault();
//
//   }
// });

skipBtn.addEventListener('click', ()=> {
    //test();
    skip();
});

function update(currIndex){
  let value = document.getElementById("amtLeft");
  let correct = document.getElementById("amtCorrect");
  let result = (`${currIndex}/${wordsArray.length}`);
  let resultCorrect = (`${correctlyGuessed}/${wordsArray.length}`);

  value.textContent = result;
  correct.textContent = resultCorrect;
}

// function getWords(){
//   web
// }

/*
    jisho api
*/

/*let dailyWords = new Array(3);

class Daily { //define word
    constructor(english, word) {
        this.english = english;
        this.word = word;
    }

    getWord() {
        return this.word;
    }

    getEnglish() {
        return this.english;
    }
}*/

/*async function testRandomKanji() {
    const randomKanji = "食";

    try {
        const words = await JishoUtil.getWordsContaining(randomKanji);

        console.log('words containing kanji:');
        words.forEach(word => {
            console.log('English def: ${word.getEnglish()}');
            console.log('Japanese Word: ${word.getJapanese()}');
        });
    }
    catch (error) {
        console.log("error in testrandomkanji");
    }

}*/


    // JishoUtil Class
  /* class JishoUtil {
      // Fetch words containing a specific kanji from the Jisho API
      static async getWordsContaining(kanji) {
        const url = `https://jisho.org/api/v1/search/words?keyword=${kanji}`;

        try {
          const response = await fetch(url);
          const data = await response.json();

          // Check if data is returned
          if (data.data && data.data.length > 0) {
            return data.data;
          } else {
            console.log(`No words found containing the kanji "${kanji}"`);
            return [];
          }
        } catch (error) {
          console.error("Error fetching data from Jisho:", error);
          return [];
        }
      }
    }*/

    // Function to test fetching words for a specific kanji
    /*async function testRandomKanji() {
      const randomKanji = "食"; // You can change this to any kanji you want to test

      try {
        //const words = await JishoUtil.getWordsContaining(randomKanji);

        // Log the results to the console for testing
       // console.log(`Words containing "${randomKanji}":`);
        /*words.forEach(word => {
          console.log(`English Definition: ${word.senses.map(sense => sense.english_definitions).join(', ')}`);
          console.log(`Japanese Word: ${word.word || word.japanese[0].reading}`);
        });*/
        /*console.log(`Words containing "${kanji}":`);
        console.log('hi');
        console.log('word: {word}');*/
        /*words.forEach(word => {
          console.log(`English Definition: ${word.senses.map(sense => sense.english_definitions).join(', ')}`);
          console.log(`Japanese Word: ${word.word || word.japanese[0].reading}`);
        });*/
       /* console.log(`Words containing "${kanji}":`);
        console.log('hi');
        console.log('word: {word}');
      } catch (error) {
        console.log("Error in testRandomKanji:", error);
      }
    }*/




