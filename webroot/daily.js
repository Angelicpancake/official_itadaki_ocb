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

/*
    event listeners
*/
this.skipBtn.addEventListener('click', ()=> {
    test();
    console.log('clicked');
});

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
    class JishoUtil {
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
    }

    // Function to test fetching words for a specific kanji
    async function testRandomKanji() {
      const randomKanji = "食"; // You can change this to any kanji you want to test

      try {
        const words = await JishoUtil.getWordsContaining(randomKanji);

        // Log the results to the console for testing
        console.log(`Words containing "${randomKanji}":`);
        words.forEach(word => {
          console.log(`English Definition: ${word.senses.map(sense => sense.english_definitions).join(', ')}`);
          console.log(`Japanese Word: ${word.word || word.japanese[0].reading}`);
        });
      } catch (error) {
        console.log("Error in testRandomKanji:", error);
      }
    }


function test() {
    /*dailyWords[0] = new Daily("Food", "食べ物");
    console.log(dailyWords[0].getWord());*/
    testRandomKanji();
    console.log('hi');
    //testRandomKanji();
}

