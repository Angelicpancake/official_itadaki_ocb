import handleDevvitMessage, {postWebViewMessage} from './devvittowebview.js';
import AppUtils from './apputils.js';

AppUtils.initialStartup();
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
    document.querySelector('#refreshLeaderboardBtn')
);

const testAddOneEntryBtn = /**@type {HTMLButtonElement} */(
    document.querySelector('#testing')
);

const testRemoveAllEntryBtn = /**@type {HTMLButtonElement} */(
    document.querySelector('#testingRemove')
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
    document.querySelector('#howtoBtn')
);

/*
    event listeners
*/
testRemoveAllEntryBtn.addEventListener('click', () => {
  console.log("entries removed");
  postWebViewMessage({type: "removeBoardEntry"});
});

testAddOneEntryBtn.addEventListener('click', () => {
  console.log("entry added");

  console.log(leaderboardEntries);

  postWebViewMessage({type: "addBoardEntry", data: [
    {score: 0, member: AppUtils.currentUsername},
    ]});
});

refreshLeaderboardBtn.addEventListener('click', () => {
  console.log("leaderboard refreshed");
  postWebViewMessage({type: "fetchLeaderboard"});
});

dailyHomeBtn.addEventListener('click', ()=> {
    console.log('dailyHome');
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
    console.log('dailyBtn');
    switchPage('home')
});
leaderboardBtn.addEventListener('click', ()=> {
    console.log('dailyBtn');
    switchPage('home')
});
howtoBtn.addEventListener('click', ()=> {
    console.log('dailyBtn');
    switchPage('home')
});

function reset()
{

    let hiddenElements = document.querySelectorAll('.page');
    hiddenElements.forEach(function (element){
        element.classList.add('hidden');
    });
}

function switchPage(page)
{
    reset();

    let elements = document.getElementsByClassName(page);
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove("hidden"); // Toggles the hidden class
    }
}
