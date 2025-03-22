/*class App {
  constructor() {
    
    this.username = null;

    this.leaderboard = document.getElementById("leaderboard");

    document.getElementById("boardButton").addEventListener("click", () => {
      postWebViewMessage({ type: "fetchLeaderboard" });
    });

    //navigation
    document.getElementById("homeButton").addEventListener("click", () => {
      location.href = 'home.html';
    })

    document.getElementById("addEntryButton").addEventListener("click", () => {
      postWebViewMessage({type: "addBoardEntry", data: {member: "x", score: 25}});//this.username, score: 10}});
    })

    addEventListener("message", this.#onMessage);

    addEventListener("load", () => {
      postWebViewMessage({ type: "initialDataRequested" });
    });
  }

  #onMessage = (ev) => {
    if (ev.data.type !== "devvit-message") return;

    const { message } = ev.data.data;

    switch (message.type) {
      case "updateLeaderboard":

        console.log(message.data);
        console.log("updateLeaderboard message recieved");

        leaderboard.replaceChildren();

        for(let i = message.data.length - 1; i >= 0; i--)
        {
          let boardEntry = document.createElement('li');
          let entryName = message.data[i].username;
          let entryScore = message.data[i].score;
          boardEntry.textContent = ` ${entryName}: ${entryScore}`;
          leaderboard.append(boardEntry);
        }

        break;

      case "initialDataRecieved":
        console.log("initial data recieved");
        this.username = message.data.username;
        break;

      default:
        console.error("invalid devvit message");
    }
  };
}

function postWebViewMessage(msg) {
  parent.postMessage(msg, "*");
}

new App();*/
