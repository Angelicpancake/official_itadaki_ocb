import AppUtils from './apputils.js';
import {waitForWordsWeekly} from './rapid.js';
import {waitForWordsDaily} from './daily.js';

export default function handleDevvitMessage(ev) {
    if (ev.data.type !== "devvit-message") return;

    const { message } = ev.data.data;

    switch (message.type) {
      case "dailyText":
        AppUtils.wordOfTheDay.textContent = message.data.text;
        break;
      case "updateWords":
        // console.log(message.data.words);
        AppUtils.words = message.data.words;
        AppUtils.weekly = message.data.weeklyWords;
        AppUtils.maxDaily = message.data.maxDaily;
        AppUtils.maxWeekly = message.data.maxWeekly
        waitForWordsWeekly();
        waitForWordsDaily();
        // console.log(AppUtils.weekly, "hi this is apputils.weekly");
        // console.log(AppUtils.words);
        break;

      case "updateLeaderboard":

        AppUtils.leaderboard.replaceChildren();

        for(let i = 0/*  message.data.leaderboard.length - 1 */; /* i >= 0 &&  */i < 10; i++)
        {
          let boardEntry = document.createElement('li');
          let entryName = message.data.leaderboard[i].username;
          let entryScore = message.data.leaderboard[i].score;
          
          if(i === 0/* message.data.leaderboard.length - 1 */){
           boardEntry.textContent = `🥇${i + 1}. ${entryName}: ${entryScore}`;
           boardEntry.style.fontSize = "22px";
           boardEntry.style.marginBottom= "5px";
           boardEntry.style.color = "#FF9E42";
          }
          else if(i === 1/* message.data.leaderboard.length - 2 */){
            boardEntry.textContent = `🥈${i + 1}. ${entryName}: ${entryScore}`;
            boardEntry.style.fontSize = "22px";
            boardEntry.style.marginBottom = "5px";
            boardEntry.style.color = "#FF9E42";
          }
          else if(i === 2){
            boardEntry.textContent = `🥉${i + 1}. ${entryName}: ${entryScore}`;
            boardEntry.style.fontSize = "22px";
            boardEntry.style.marginBottom = "5px";
            boardEntry.style.color = "#FF9E42";
          }
          else{
            boardEntry.textContent = `🍜 ${i + 1}. ${entryName}: ${entryScore}`;
            boardEntry.style.fontSize = "20px";
            boardEntry.style.marginBottom = "3px";
          }
          AppUtils.leaderboard.append(boardEntry);
        }

        if(message.data.leaderboard.length > 10){
          let boardEntry = document.createElement('li');
          let entryRank = message.data.rank;
          let entryName = message.data.leaderboard[10].username;
          let entryScore = message.data.leaderboard[10].score;
          boardEntry.textContent = `🐦‍🔥 ${entryRank}. ${entryName}: ${entryScore}`;
          boardEntry.value = entryRank;
          boardEntry.style.color = "#C9534F";
          boardEntry.style.fontSize = "22px";
          AppUtils.leaderboard.append(boardEntry);
        }

        break;

      case "initialDataRecieved":
        console.log("initial data recieved");
        AppUtils.currentUsername = message.data.username;
        break;

      default:
        console.error("invalid devvit message");
    }
  }

export function postWebViewMessage(msg) {
  parent.postMessage(msg, "*");
}
