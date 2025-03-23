import AppUtils from './apputils.js';

export default function handleDevvitMessage(ev) {
    if (ev.data.type !== "devvit-message") return;

    const { message } = ev.data.data;

    switch (message.type) {
      case "updateLeaderboard":

        console.log(message.data.leaderboard);
        console.log("updateLeaderboard message recieved");

        AppUtils.leaderboard.replaceChildren();

<<<<<<< HEAD
        for(let i = message.data.leaderboard.length - 1; i >= 0 && i >= message.data.leaderboard.length - 100; i--)
=======
        for(let i = message.data.leaderboard.length - 1; i >= 0; i--)
>>>>>>> c702295bfc3cdd3f93dc71c7b5ea1dc1174e1f67
        {
          let boardEntry = document.createElement('li');
          let entryName = message.data.leaderboard[i].username;
          let entryScore = message.data.leaderboard[i].score;
<<<<<<< HEAD
          boardEntry.textContent = `${entryName}: ${entryScore}`;
=======
          boardEntry.textContent =  `${entryName}: ${entryScore}`;
>>>>>>> c702295bfc3cdd3f93dc71c7b5ea1dc1174e1f67
          AppUtils.leaderboard.append(boardEntry);
        }

        if(message.data.leaderboard.length === 101){
          let boardEntry = document.createElement('li');
          let entryRank = message.data.rank;
<<<<<<< HEAD
          console.log(`entryRank: $(entryRank)`);
          let entryName = message.data.leaderboard[0].username;
          let entryScore = message.data.leaderboard[0].score;
          boardEntry.textContent = `${entryName}: ${entryScore}`;
=======
          let entryName = message.data.leaderboard[i].username;
          let entryScore = message.data.leaderboard[i].score;
          boardEntry.textContent =  `${entryName}: ${entryScore}`;
>>>>>>> c702295bfc3cdd3f93dc71c7b5ea1dc1174e1f67
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
<<<<<<< HEAD
}
=======
}
>>>>>>> c702295bfc3cdd3f93dc71c7b5ea1dc1174e1f67
