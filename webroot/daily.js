import handleDevvitMessage, {postWebViewMessage} from './devvittowebview.js';
import AppUtils from './apputils.js';
import switchPage, {reset, end} from './home.js';
import randomize from './rapid.js';
/*
  window.parent.postMessage(
    {
      type: 'showForm',
    },
    '*'
  );
*/


/*
    backend of the daily words grabber
*/

//import {JishoUtil} from "../src/util/jishoUtil";

/*
    buttons
*/

const endBtn = (
  document.querySelector('#endBtn')
);
const endScoreText = (
  document.querySelector('#score')
);

const currWord = (
  document.querySelector('#currWord')
);

const skipBtn =  (
    document.querySelector('#skipBtn')
);

const definitions = (
  document.querySelector('#definitions')
);

const textarea = (
  document.querySelector('#textarea-daily')
);

const guess = (
  document.querySelector('#guessBtn')
);

const bonusBtn = (
  document.querySelector('#sentence')
);


let currIndex = 0;
let guessContent = "";
let words = null;
let wordsArray = null;
let correctlyGuessed = 0;
let guesses = 0;
let score = 0;
//wordsArray contains an array of each of the keys(japanese words) of the words Record

export async function waitForWordsDaily() {
    // Wait until AppUtils.words is initialized
    while (!AppUtils.words) {
        await new Promise(resolve => setTimeout(resolve, 500));  // Wait 500ms and retry
    }

    // Once AppUtils.words is initialized, run the following code
    words = AppUtils.words;
    wordsArray = Object.keys(words);

    randomize(wordsArray);

    currWord.textContent = wordsArray[0];
    update(0);
    // console.log('web view' + wordsArray);
}


// Call the waitForWords function to initiate the process
export default words;
//

/*
    event listeners
*/

let guessed = function (){
  console.log('guessed daily');
  guessContent = (textarea.value).toLowerCase();
  guesses++;

  if(words[wordsArray[currIndex]].includes(guessContent))
  {
    ++correctlyGuessed;
    ++currIndex;
  }

  if(currIndex >= wordsArray.length)
    {
      update(currIndex);
      endGame();
      return;
    }

  currWord.textContent = wordsArray[currIndex];
  
  update(currIndex);
  console.log(guessContent);
}

let skip = function (){
  ++currIndex;
  // currWord.value = words[currIndex];
  update(currIndex);
  if(currIndex >= wordsArray.length)
  {
    endGame();
    return;
  }
  currWord.textContent = wordsArray[currIndex];
}


let endGame = function (){
  switchPage('end');
  let defs = "";

  wordsArray.forEach((japaneseWord) => {
    defs += (`${japaneseWord} => ${words[japaneseWord][0]}, ${words[japaneseWord][1]} \r\n`);
  });

  definitions.textContent = defs;
  //score formula = (number correctly guessed) ^ ((accuracy^3) + 4);
  score = Math.floor(Math.pow(correctlyGuessed, (Math.pow(correctlyGuessed / wordsArray.length, 3) + 4))); 

  endScoreText.textContent = `Score: ${score}`;
  endScoreText.textContent = "";
  endScoreText.textContent = `Score: ${score}/${AppUtils.maxDaily}`;
  console.log(`Score: ${score}/${AppUtils.maxDaily}`);
 /* let tt = document.getElementById('#congrats');
  tt.textContent += `Score: ${score}/${AppUtils.maxDaily}`;*/

  end(wordsArray.length, correctlyGuessed, score, "daily");
  currIndex = 0;
  correctlyGuessed = 0;
  guesses = 0;
  score = 0;
  update(currIndex);
  randomize(wordsArray);
  currWord.textContent = wordsArray[currIndex];

  return;
}


textarea.addEventListener('keydown', (event) => {
  if (event.key==="Enter"){
    event.preventDefault();
    guessed();
  }
});

bonusBtn.addEventListener('click', ()=> {
  window.parent.postMessage(
     {
       type: 'showForm',
     },
     '*'
   ); 
 });




skipBtn.addEventListener('click', ()=> {
    //test();
    skip();
 
    console.log('skip');
});

let update = function (currIndex){
  let value = document.getElementById("amtLeft");
  let correct = document.getElementById("amtCorrect");
  let result = (`${currIndex}/${wordsArray.length}`);
  let resultCorrect = (`${correctlyGuessed}/${wordsArray.length}`);

  value.textContent = result;
  correct.textContent = resultCorrect;
  correct.style.color =  "#C9534F";
  textarea.value = "";

  currWord.classList.remove('animation');
  void currWord.offsetWidth; // This triggers reflow to reset the animation
  currWord.classList.add('animation');


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




