import handleDevvitMessage, {postWebViewMessage} from './devvittowebview.js';

const AppUtils = {
  currentUsername: null,
  leaderboard: document.getElementById("leaderboard"),

  initialStartup() {
<<<<<<< HEAD
    /*this.leaderboard = document.getElementById("leaderboard");*/
=======
    /this.leaderboard = document.getElementById("leaderboard");/
>>>>>>> c702295bfc3cdd3f93dc71c7b5ea1dc1174e1f67

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

<<<<<<< HEAD
export default AppUtils;
=======
export default AppUtils;
>>>>>>> c702295bfc3cdd3f93dc71c7b5ea1dc1174e1f67
