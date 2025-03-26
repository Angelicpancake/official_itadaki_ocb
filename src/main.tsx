import './createPost.js';
import { Devvit, RedisClient, useState, useWebView } from '@devvit/public-api';
//import { useEffect } from 'react';
import type { DevvitMessage, WebViewMessage } from './message.js';
import { JishoUtil } from './util/jishoUtil.js'; // Import the JishoUtil class for fetching words
import RedisUtil from './util/redisUtil.js';
import { Word } from './util/word.js';
import jishoFetch, {randomKanji} from './util2/jishoFetch.js';

let redisWords: Word[][]; //[][]
// Test fetching words for the kanji '食' (or any kanji you want)

Devvit.configure({
  redditAPI: true,
  redis: true,
  http: true,
  scheduler: true,
});

Devvit.addCustomPostType({
  name: 'sushisushi',
  height: 'tall',
  render: (context) => {

    const [newPage, change] = useState('home.html'); // Use state for page switches

    // const [leaderboard, setLeaderboard] =  useState<Array<{member: string; score: number}>>([]);

    const [day, setDay] = useState(new Date().getUTCDay());

    const [username, setUsername] = useState(async () => {
      return await context.reddit.getCurrentUsername();
    });

    const webView = useWebView<WebViewMessage, DevvitMessage>({
      url: newPage, // URL of your web view content

      // Handle messages sent from the web view
      async onMessage(message, webView) {
        switch(message.type){
          case 'fetchWords':
            //get the words for the current day, dayWords is an array
            // const dayWords = await context.redis.hGet("dailyWords", `day${day}`);
            const dayWords: Record<string, string[]> = await jishoFetch("水");/* {
              "hi": ["sigma", "tax"],
              "what": ["hello", "hi"],
              "goon": ["chair", "chauncey"],
            }; */
            webView.postMessage({
              type: "updateWords",
              data: {
                words: dayWords,
              }
            });
            break;
          case 'fetchLeaderboard':
            const highScore = await context.redis.zScore("leaderboard", username);
            const currRank = await context.redis.zRank("leaderboard", username, {WITHSCORE: true});
            const currLeaderboardLength = await context.redis.zCard("leaderboard");
            const currLeaderboard = await context.redis.zRange("leaderboard", currLeaderboardLength - 100, currLeaderboardLength - 1, {BY: 'SCORE', WITHSCORES: true});
            let updatedLeaderboard = null;

            try {

              const leaderboardWithScores = await Promise.all(
                currLeaderboard.map(async (player) => ({
                  username: player.member,
                  score: player.score,
                }))
              )

              if (currRank < currLeaderboardLength - 99)
              {
                const newEntry = {
                  username: username,
                  score: highScore,
                }
                updatedLeaderboard = [newEntry,...leaderboardWithScores];
              }
              else
              {
                updatedLeaderboard = leaderboardWithScores;
              }  

              webView.postMessage({
                type: 'updateLeaderboard',
                data: {leaderboard: updatedLeaderboard, rank: currLeaderboardLength - currRank},
              })

            } catch(error){
              console.log(error);
            }
            break;
            
          //going to make this case happen when player completes a game
          case 'addBoardEntry':
            for(let i = 0; i < message.data.length; i++)
            {
              await context.redis.zAdd("leaderboard", message.data[i]);
            }
            break;

          case 'removeBoardEntry':
            const currLeaderboardLength2: number = await context.redis.zCard("leaderboard");
            await context.redis.del("leaderboard");
            break;
            

          case 'initialDataRequested':
            console.log(Object.keys(context.redis));
            webView.postMessage({
              type: 'initialDataRecieved',
              data: {username: username}, 
            })
            break;

          default:
            throw new Error('Unknown Message Type');
            break;
        }
        
      },
      onUnmount() {
        context.ui.showToast('Web view closed!');
      },
    });
    //
    // function switchPage(newPage: string) {
    //   change(newPage); // Update the state
    //   webView.mount(); // Mount the web view to load the new page
    // }

    // Function to handle page switching
      /*const handlePageSwitch = (newPage: string) => {
      setSwitchPage(newPage); // Update the state
      console.log(newPage);
      //webView.mount();
      //console.log('after' + newPage);

      //printing works correctly but not the webview its delayed
      
    };*/

    /*useEffect(()=>{
      webView.mount();
      console.log('after ' + switchPage);
    }, [switchPage]);*/

    // Render the custom post type
    return (
      <vstack height="100%" width="100%" alignment="center" gap="small" backgroundColor="#333445">
        <hstack height="25%" width="100%" alignment="top center" />

        <hstack height="30%" width="100%" alignment="top center">
          <image
            url="home.png"
            description="itadaki"
            imageHeight={30}
            imageWidth={256}
            height="100px"
            width="500px"
          />

        </hstack>

        <hstack height="20%" width="100%" alignment="top center">
          <button
           appearance='bordered'
           onPress={() => webView.mount()}>
              Play Game
            </button>
        </hstack>
    

       {/* <hstack height="42%" width="100%" alignment="top center" gap="none">
          <image
            onPress={() => handlePageSwitch('rapid.html')} // Use the handler to switch pages
            url="rapid.png"
            description="rapid"
            imageHeight={30}
            imageWidth={380}
            height="170px"
            width="280px"
          />
          <image
            onPress={() => handlePageSwitch('daily.html')} // Use the handler to switch pages
            url="daily.png"
            description="daily"
            imageHeight={30}
            imageWidth={380}
            height="170px"
            width="280px"
          />
        </hstack>

        <hstack height="12%" width="100%" alignment="top center" gap="none">
          <image
            onPress={() => handlePageSwitch('leaderboard.html')} // Use the handler to switch pages
            url="leaderboard.png"
            description="leaderboard"
            imageHeight={30}
            imageWidth={380}
            height="50px"
            width="400px"
          />
        </hstack>

        <hstack height="12%" width="100%" alignment="top center" gap="none">
          <image
            onPress={() => handlePageSwitch('howTo.html')} // Use the handler to switch pages
            url="howto.png"
            description="how to"
            imageHeight={30}
            imageWidth={380}
            height="50px"
            width="400px"
          />
        </hstack>*/}
      </vstack>
    );
  },
});

export default Devvit;
