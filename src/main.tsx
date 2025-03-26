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

// Add a custom post type to Devvit
// Devvit.addSchedulerJob({
//   name: 'refreshWeeklyKanji',
//   OnRun: async() => {
//     //reset weeklyWords
//     for(let i = 0; i < 7; i++)
//     {
//       try{
//         await context.redis.hDel("weeklyKanji", `day${i}`);
//       }
//       catch(error){
//         console.error("error when deleting words in refreshWeeklyKanji", error);
//       }
//     }
//
//     const randomKanjiSelected: Array<string> = randomKanji();
//
//     //put random kanji into weeklywords 
//     for(let i = 0; i < 7; i++)
//     {
//       try {
//         await context.redis.hSet("weeklyKanji", `day${i}`, randomKanjiSelected[i]);
//       }
//       catch (error){
//         console.error("error when setting kanji in refreshWeeklyKanji", error);
//       }
//     }
//   },
// })


// selects the words for the day from weeklyWords, implement later
// Devvit.addSchedulerJob({
//   name: 'selectDailyWords',
//   onRun: async() => {
//     await context.redis.
//   },
// })

Devvit.addCustomPostType({
  name: 'sushisushi',
  height: 'tall',
  render: (context) => {
    // testJishoAPI("物");
    // redisWords=[];
    //
    //   redisWords[0]= [
    //     new Word(['Hi', 'hello'], "こにちは")
    //   ];
      
      //console.log(redisWords[0][0].getEnglish()); // Output: [ 'hi', 'hello' ]
      //console.log(redisWords[0][0].getJapanese()); // Output: "こんにちは"  
    //fetchKanjiWords("食", context.redis); // You can change this to any kanji you want to test
    
    // useEffect(() => {
    //   jishoFetch('物');
    // }, []);
    const [newPage, change] = useState('home.html'); // Use state for page switches

    const [leaderboard, setLeaderboard] =  useState<Array<{member: string; score: number}>>([]);

    const [username, setUsername] = useState(async () => {
      return await context.reddit.getCurrentUsername();
    });

    /*useEffect(() => {
      const fetchUsername = async () => {
        try{
        const currUsername = await context.reddit.getCurrentUsername;
        setUsername(currUsername);
        }
      catch (error){
        console.error("Failed to fetch userrname", error);
        }
      };

      fetchUsername();
    },[]);*/



    const webView = useWebView<WebViewMessage, DevvitMessage>({
      url: newPage, // URL of your web view content

      // Handle messages sent from the web view
      async onMessage(message, webView) {
        switch(message.type){
          case 'fetchWords':
            console.log(randomKanji());
            //test how the random 
            // webview.postMessage({
            // type: "updateWords",
            // data: jishoFetch(message.data.kanji),
            // }); 
            break;
          // case 'page':
          //   webView.postMessage({
          //     type: ''
          // })
          // case 'boardPageLoaded':
          // going to make this case happen on load later
          case 'fetchLeaderboard':
            const highScore = await context.redis.zScore("leaderboard", username);
            const currRank = await context.redis.zRank("leaderboard", username, {WITHSCORE: true});
            const currLeaderboardLength = await context.redis.zCard("leaderboard");
            const currLeaderboard = await context.redis.zRange("leaderboard", currLeaderboardLength - 100, currLeaderboardLength - 1, {BY: 'SCORE', WITHSCORES: true});

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
                setLeaderboard([newEntry,...leaderboardWithScores]);
              }
              else
              {
                setLeaderboard(leaderboardWithScores);
              }  
                            
              webView.postMessage({
                type: 'updateLeaderboard',
                data: {leaderboard: leaderboard, rank: currLeaderboardLength - currRank},
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
            await context.redis.zRemByRangeByScore("leaderboard", 0, 200);
            break;
            

          case 'initialDataRequested':
            webView.postMessage({
              type: 'initialDataRecieved',
              data: {username: username, words: redisWords}, 
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
