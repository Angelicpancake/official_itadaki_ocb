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

const fetchWords = (
    document.querySelector('#debugFetchJishoWords')
);

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
 * debug event listeners (REMOVE LATER)
 */

fetchWords.addEventListener('click', () => {
  postWebViewMessage({type: "fetchWords"});
})

testRemoveAllEntryBtn.addEventListener('click', () => {
  console.log("entries removed");
  postWebViewMessage({type: "removeBoardEntry"});
});

testAddOneEntryBtn.addEventListener('click', () => {
  console.log("entry added");

  postWebViewMessage({type: "addBoardEntry", data: [
    {score: 0, member: AppUtils.currentUsername},

{score: 0, member: "username0"}, {score: 1, member: "username1"}, {score: 2, member: "username2"}, {score: 3, member: "username3"}, {score: 4, member: "username4"}, {score: 5, member: "username5"}, {score: 6, member: "username6"}, {score: 7, member: "username7"}, {score: 8, member: "username8"}, {score: 9, member: "username9"}, {score: 10, member: "username10"}, {score: 11, member: "username11"}, {score: 12, member: "username12"}, {score: 13, member: "username13"}, {score: 14, member: "username14"}, {score: 15, member: "username15"}, {score: 16, member: "username16"}, {score: 17, member: "username17"}, {score: 18, member: "username18"}, {score: 19, member: "username19"}, {score: 20, member: "username20"}, {score: 21, member: "username21"}, {score: 22, member: "username22"}, {score: 23, member: "username23"}, {score: 24, member: "username24"}, {score: 25, member: "username25"}, {score: 26, member: "username26"}, {score: 27, member: "username27"}, {score: 28, member: "username28"}, {score: 29, member: "username29"}, {score: 30, member: "username30"}, {score: 31, member: "username31"}, {score: 32, member: "username32"}, {score: 33, member: "username33"}, {score: 34, member: "username34"}, {score: 35, member: "username35"}, {score: 36, member: "username36"}, {score: 37, member: "username37"}, {score: 38, member: "username38"}, {score: 39, member: "username39"}, {score: 40, member: "username40"}, {score: 41, member: "username41"}, {score: 42, member: "username42"}, {score: 43, member: "username43"}, {score: 44, member: "username44"}, {score: 45, member: "username45"}, {score: 46, member: "username46"}, {score: 47, member: "username47"}, {score: 48, member: "username48"}, {score: 49, member: "username49"}, {score: 50, member: "username50"}, {score: 51, member: "username51"}, {score: 52, member: "username52"}, {score: 53, member: "username53"}, {score: 54, member: "username54"}, {score: 55, member: "username55"}, {score: 56, member: "username56"}, {score: 57, member: "username57"}, {score: 58, member: "username58"}, {score: 59, member: "username59"}, {score: 60, member: "username60"}, {score: 61, member: "username61"}, {score: 62, member: "username62"}, {score: 63, member: "username63"}, {score: 64, member: "username64"}, {score: 65, member: "username65"}, {score: 66, member: "username66"}, {score: 67, member: "username67"}, {score: 68, member: "username68"}, {score: 69, member: "username69"}, {score: 70, member: "username70"}, {score: 71, member: "username71"}, {score: 72, member: "username72"}, {score: 73, member: "username73"}, {score: 74, member: "username74"}, {score: 75, member: "username75"}, {score: 76, member: "username76"}, {score: 77, member: "username77"}, {score: 78, member: "username78"}, {score: 79, member: "username79"}, {score: 80, member: "username80"}, {score: 81, member: "username81"}, {score: 82, member: "username82"}, {score: 83, member: "username83"}, {score: 84, member: "username84"}, {score: 85, member: "username85"}, {score: 86, member: "username86"}, {score: 87, member: "username87"}, {score: 88, member: "username88"}, {score: 89, member: "username89"}, {score: 90, member: "username90"}, {score: 91, member: "username91"}, {score: 92, member: "username92"}, {score: 93, member: "username93"}, {score: 94, member: "username94"}, {score: 95, member: "username95"}, {score: 96, member: "username96"}, {score: 97, member: "username97"}, {score: 98, member: "username98"}, {score: 99, member: "username99"}, {score: 100, member: "username100"}, {score: 101, member: "username101"}, {score: 102, member: "username102"}, {score: 103, member: "username103"}, {score: 104, member: "username104"}, {score: 105, member: "username105"}, {score: 106, member: "username106"}, {score: 107, member: "username107"}, {score: 108, member: "username108"}, {score: 109, member: "username109"}, {score: 110, member: "username110"}, {score: 111, member: "username111"}, {score: 112, member: "username112"}, {score: 113, member: "username113"}, {score: 114, member: "username114"}, {score: 115, member: "username115"}, {score: 116, member: "username116"}, {score: 117, member: "username117"}, {score: 118, member: "username118"}, {score: 119, member: "username119"}, {score: 120, member: "username120"}, {score: 121, member: "username121"}, {score: 122, member: "username122"}, {score: 123, member: "username123"}, {score: 124, member: "username124"}, {score: 125, member: "username125"}, {score: 126, member: "username126"}, {score: 127, member: "username127"}, {score: 128, member: "username128"}, {score: 129, member: "username129"}, {score: 130, member: "username130"}, {score: 131, member: "username131"}, {score: 132, member: "username132"}, {score: 133, member: "username133"}, {score: 134, member: "username134"}, {score: 135, member: "username135"}, {score: 136, member: "username136"}, {score: 137, member: "username137"}, {score: 138, member: "username138"}, {score: 139, member: "username139"}, {score: 140, member: "username140"}, {score: 141, member: "username141"}, {score: 142, member: "username142"}, {score: 143, member: "username143"}, {score: 144, member: "username144"}, {score: 145, member: "username145"}, {score: 146, member: "username146"}, {score: 147, member: "username147"}, {score: 148, member: "username148"}, {score: 149, member: "username149"}
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
    postWebViewMessage({type: "fetchWords"});
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
