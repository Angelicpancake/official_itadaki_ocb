import handleDevvitMessage, {postWebViewMessage} from './devvittowebview.js';
import AppUtils from './apputils.js';

AppUtils.initialStartup();
/* debugging delete later
 */
const testAddOneEntryBtn = /**@type {HTMLButtonElement} */(
    document.querySelector('#testing')
);

const testRemoveAllEntryBtn = /**@type {HTMLButtonElement} */(
    document.querySelector('#testingRemove')
);

// const fetchWords = (
//     document.querySelector('#debugFetchJishoWords')
// );

/* function to update end screen when necessary */
export function end(total, correct, score, gameType) {
    console.log("end");
    let result = document.getElementById("results")
    result.textContent = `${correct}/${total}`;
    let color = "rgb(" + ((total - correct) / total * 255) + ", " + (correct / total * 255) + ", 0)";
    result.style.setProperty('--results-color', color);

    postWebViewMessage({type: "addBoardEntry", data: [
      {score: score, member: AppUtils.currentUsername, gameType: gameType}
    ]});
}

/*
    Buttons@ home
*/

const dailyHomeBtn =  /** @type {HTMLButtonElement} */ (
    document.getElementById('dailyHomeBtn')
);

const rapidHomeBtn =  /** @type {HTMLButtonElement} */ (
    document.querySelector('#rapidHomeBtn')
);

const leaderboardHomeBtn =  /** @type {HTMLButtonElement} */ (
    document.querySelector('#leaderboardHomeBtn')
);

const howtoHomeBtn =  /** @type {HTMLButtonElement} */ (
    document.querySelector('#howtoHomeBtn')
);

/*
    buttons @pages
*/

/*
     * dailybuttons
 */
const dailyBtn =  /** @type {HTMLButtonElement} */ (
    document.querySelector('#dailyBtn')
);

/*
   *  leaderboard buttons
 */
const leaderboardBtn =  /** @type {HTMLButtonElement} */ (
    document.querySelector('#leaderboardBtn')
);

const refreshLeaderboardBtn = /**@type {HTMLButtonElement} */(
    document.querySelector('#leaderboardRefresh_highlight')
);


/*
   * rapid buttons
 */

const rapidBtn =  /** @type {HTMLButtonElement} */ (
    document.querySelector('#rapidBtn')
);

/*
 *    how to buttons
 */
const howtoBtn =  /** @type {HTMLButtonElement} */ (
    document.querySelector('#how-tobtn') 
);
/*
 * end buttons
*/ 
const endBtn = /** @type {HTMLButtonElement} */ (
    document.querySelector('#endBtn_highlight')
);



/*
 * debug event listeners (REMOVE LATER)
 */

// fetchWords.addEventListener('click', () => {
//   postWebViewMessage({type: "fetchWords2"});
// })
//
testRemoveAllEntryBtn.addEventListener('click', () => {
  console.log("entries removed");
  postWebViewMessage({type: "removeBoardEntry"});
});

testAddOneEntryBtn.addEventListener('click', () => {
  console.log("entry added");

  postWebViewMessage({type: "addBoardEntry", data: [
  { score: 0, member: AppUtils.currentUsername, gameType: "daily" },
  { score: 1, member: "username1", gameType: "daily" },
  { score: 2, member: "username2", gameType: "daily" },
  { score: 3, member: "username3", gameType: "daily" },
  { score: 4, member: "username4", gameType: "daily" },
  { score: 5, member: "username5", gameType: "daily" },
  { score: 6, member: "username6", gameType: "daily" },
  { score: 7, member: "username7", gameType: "daily" },
  { score: 8, member: "username8", gameType: "daily" },
  { score: 9, member: "username9", gameType: "daily" },
  { score: 10, member: "username10", gameType: "daily" },
  { score: 80, member: "username80", gameType: "daily" },
  { score: 90, member: "username90", gameType: "daily" },
  { score: 100, member: "username100", gameType: "daily" },
]});
});

/*
    event listeners
*/

refreshLeaderboardBtn.addEventListener('click', () => {
  console.log("leaderboard refreshed");
  postWebViewMessage({type: "fetchLeaderboard"});
});

dailyHomeBtn.addEventListener('click', ()=> {
    console.log('dailyHome');
    // postWebViewMessage({type: "fetchWords"});
   // postWebViewMessage({type: "fetchWords"});
    switchPage('daily')

});

rapidHomeBtn.addEventListener('click', ()=> {
    console.log('rapidHome');
    switchPage('rapid')
});

leaderboardHomeBtn.addEventListener('click', ()=> {
    console.log('leaderboardHome');
    postWebViewMessage({type: "fetchLeaderboard"});
    switchPage('leaderboard')
});

howtoHomeBtn.addEventListener('click', ()=> {
    console.log('howtoHome');
    switchPage('howto')
});

dailyBtn.addEventListener('click', ()=> {
    console.log('dailyBtn');
    switchPage('home')
});
rapidBtn.addEventListener('click', ()=> {
    console.log('rapidBtn');
    switchPage('home')
});
leaderboardBtn.addEventListener('click', ()=> {
    console.log('leaderboardBtn');
    switchPage('home')
});
howtoBtn.addEventListener('click', ()=> {
    console.log('howtoBtn');
    switchPage('home');
});
endBtn.addEventListener('click', ()=> {
    console.log('endBtn');
    switchPage('home')
});

export function reset()
{

    let hiddenElements = document.querySelectorAll('.page');
    hiddenElements.forEach(function (element){
        element.classList.add('hidden');
    });
}

export default function switchPage(page)
{
    reset();

    let elements = document.getElementsByClassName(page);
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove("hidden"); // Toggles the hidden class
    }
}
