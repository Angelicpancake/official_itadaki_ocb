import handleDevvitMessage, {postWebViewMessage} from './devvittowebview.js';

const AppUtils = {
  currentUsername: null,
  leaderboard: document.getElementById("leaderboard"),

  initialStartup() {
    /*this.leaderboard = document.getElementById("leaderboard");*/

    // document.getElementById("boardButton").addEventListener("click", () => {
    //   postWebViewMessage({ type: "fetchLeaderboard" });
    // });
    //
    // document.getElementById("addEntryButton").addEventListener("click", () => {
    //   postWebViewMessage({type: "addBoardEntry", data: {member: "x", score: 25}});//this.username, score: 10}});
    // })

    addEventListener("message", (ev) => handleDevvitMessage(ev));

    addEventListener("load", () => {
      postWebViewMessage({ type: "initialDataRequested" });
      postWebViewMessage({ type: "fetchLeaderboard"});
    });
  },
};

export default AppUtils;
