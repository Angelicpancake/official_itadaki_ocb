/*
    backend of the daily words grabber
*/

//import {JishoUtil} from "../src/util/jishoUtil";

/*
    buttons
*/
skipBtn =  (
    document.querySelector('#skipBtn')
);

indexLabel = (
  document.querySelector('#amtLeft')
);

textarea = (
  document.querySelector('#textarea-daily')
);

guess = (
  document.querySelector('#guessBtn')
);

var currIndex = 1;
var guessContent = "";

/*
    event listeners
*/

function guessed(){
    guessContent = textarea.value;
    console.log(guessContent);
    textarea.value = "";
    /* NEED TO : 
    check if guess is correct
    if not, add to guesses.incorrect and do stuff
    if so, add to guesses.correct and do stuff
    after all guesses done, go to end screen
    AND call end() function 
    */
}
this.guessBtn.addEventListener('click', ()=> {
    guessed();
});

textarea.addEventListener('keydown', (event) => {
  if (event.key==="Enter"){
    event.preventDefault();
    guessed();
  }
});

this.skipBtn.addEventListener('click', ()=> {
    //test();
    if (currIndex < 5)
      currIndex++;
    
    console.log(currIndex);
    update(currIndex);
});

function update(currIndex){
    let value = document.getElementById("amtLeft");
    let result = (currIndex + "/5");

    value.textContent = result;
}

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




