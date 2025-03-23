import AppUtils from './apputils.js';

export default function handleDevvitMessage(ev) {
    if (ev.data.type !== "devvit-message") return;

    const { message } = ev.data.data;

    switch (message.type) {
      case "updateLeaderboard":

        console.log(message.data.leaderboard);
        console.log("updateLeaderboard message recieved");

        AppUtils.leaderboard.replaceChildren();

        for(let i = message.data.leaderboard.length - 1; i >= 0; i--)
        {
          let boardEntry = document.createElement('li');
          let entryName = message.data.leaderboard[i].username;
          let entryScore = message.data.leaderboard[i].score;
          boardEntry.textContent =  `${entryName}: ${entryScore}`;
          AppUtils.leaderboard.append(boardEntry);
        }

        if(message.data.leaderboard.length === 101){
          let boardEntry = document.createElement('li');
          let entryRank = message.data.rank;
          let entryName = message.data.leaderboard[i].username;
          let entryScore = message.data.leaderboard[i].score;
          boardEntry.textContent =  `${entryName}: ${entryScore}`;
          boardEntry.value = entryRank;
          AppUtils.leaderboard.append(boardEntry);
        }

        break;

      case "initialDataRecieved":
        console.log("initial data recieved");
        AppUtils.currentUsername = message.data.username;
        console.log(AppUtils.currentUsername);
        break;

      default:
        console.error("invalid devvit message");
    }
  }

export function postWebViewMessage(msg) {
  parent.postMessage(msg, "*");
}