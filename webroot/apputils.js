import handleDevvitMessage, {postWebViewMessage} from './devvittowebview.js';

const AppUtils = {
  currentUsername: null,
  leaderboard: document.getElementById("leaderboard"),
  words: null,

  initialStartup() {
    addEventListener("message", (ev) => handleDevvitMessage(ev));

    addEventListener("load", () => {
      postWebViewMessage({ type: "initialDataRequested" });
      postWebViewMessage({ type: "fetchLeaderboard"});
      postWebViewMessage({ type: "fetchWords"});
    });
  },
};

export default AppUtils;

