import AppUtils from './apputils.js';

export default function handleDevvitMessage(ev) {
    if (ev.data.type !== "devvit-message") return;

    const { message } = ev.data.data;

    switch (message.type) {
      case "updateLeaderboard":

        AppUtils.leaderboard.replaceChildren();

        for(let i = message.data.leaderboard.length - 1; i >= 0 && i >= message.data.leaderboard.length - 100; i--)
       {
          let boardEntry = document.createElement('li');
          let entryName = message.data.leaderboard[i].username;
          let entryScore = message.data.leaderboard[i].score;
          boardEntry.textContent = `${entryName}: ${entryScore}`;
          AppUtils.leaderboard.append(boardEntry);
        }

        if(message.data.leaderboard.length === 101){
          let boardEntry = document.createElement('li');
          let entryRank = message.data.rank;
          let entryName = message.data.leaderboard[0].username;
          let entryScore = message.data.leaderboard[0].score;
          boardEntry.textContent = `${entryName}: ${entryScore}`;
          boardEntry.value = entryRank;
          AppUtils.leaderboard.append(boardEntry);
        }

        break;

      case "initialDataRecieved":
        AppUtils.currentUsername = message.data.username;
        break;

      default:
        console.error("invalid devvit message");
    }
  }

export function postWebViewMessage(msg) {
  parent.postMessage(msg, "*");
}
