import handleDevvitMessage, {postWebViewMessage} from './devvittowebview.js';


const AppUtils = {
  currentUsername: null,
  leaderboard: document.getElementById("leaderboard"),
  wordOfTheDay: document.getElementById("wordOfDay"),
  topCommentText: document.querySelector(".sentence"),
  words: null,
  weekly: null,
  maxDaily: null,
  maxWeekly: null,

  initialStartup() {
    addEventListener("message", (ev) => handleDevvitMessage(ev));

    addEventListener("load", () => {
      postWebViewMessage({ type: "initialDataRequested" });
      postWebViewMessage({ type: "fetchLeaderboard"});
      postWebViewMessage({ type: "fetchWords"});
      //postWebViewMessage({ type : "fetchWords2"});
    });
  },
};

export default AppUtils;

