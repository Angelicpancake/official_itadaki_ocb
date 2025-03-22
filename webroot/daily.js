/*
    backend of the daily words grabber
*/

/*
    buttons
*/
this.skipBtn =  /** @type {HTMLButtonElement} */ (
    document.querySelector('#skipBtn')
);

/*
    event listeners
*/
this.skipBtn.addEventListener('click', ()=> {
    test();
});

let dailyWords = new Array(3);

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
}

function test() {
    dailyWords[0] = new Daily("Food", "食べ物");
    console.log(dailyWords[0].getWord());
}

