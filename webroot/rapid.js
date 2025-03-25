/*
    backend of the daily words grabber
*/

//import {JishoUtil} from "../src/util/jishoUtil";

/*
    buttons
*/
skipBtnRapid =  (
    document.querySelector('#skipBtnRapid')
);

indexLabelRapid = (
  document.querySelector('#amtLeftRapid')
);

textareaRapid = (
  document.querySelector('#textarea-rapid')
);

guessBtnRapid = (
  document.querySelector('#guessBtnRapid')
);

var currIndexRapid = 1;
var guessContentRapid = "";

/*
    event listeners
*/

function guessedRapid(){
    guessContentRapid = textareaRapid.value;
    console.log(guessContentRapid);
    textareaRapid.value = "";
}
this.guessBtnRapid.addEventListener('click', ()=> {
    guessedRapid();
    
});

textareaRapid.addEventListener('keydown', (event) => {
  if (event.key==="Enter"){
    event.preventDefault();
    guessedRapid();
  }
});


this.skipBtnRapid.addEventListener('click', ()=> {
    //test();
    if (currIndexRapid < 35)
      currIndexRapid++;
    
    console.log(currIndexRapid);
    updateRapid(currIndexRapid);
});

function updateRapid(currIndexRapid){
    let valueRapid = document.getElementById("amtLeftRapid");
    let resultRapid = (currIndexRapid + "/35");

    valueRapid.textContent = resultRapid;
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

