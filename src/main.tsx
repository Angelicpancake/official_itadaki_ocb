import './createPost.js';

import { Devvit, useState, useWebView } from '@devvit/public-api';
//import { useEffect } from 'react';
import type { DevvitMessage, WebViewMessage } from './message.js';

console.log('Devvit is running!');

Devvit.configure({
  redditAPI: true,
  redis: true,
});

// Devvit.addSchedulerJob({
//   name: 'refreshRedisBoard',
//   onRun: async (event, context) => {
//      const leaderboard = 
//   },
// });

// Add a custom post type to Devvit
Devvit.addCustomPostType({
  name: 'Itadaki-Web-View',
  height: 'tall',
  render: (context) => {

    const [newPage, change] = useState('home.html'); // Use state for page switches

    const [leaderboard, setLeaderboard] =  useState<Array<{member: string; score: number}>>([]);

    const [username] = useState(async () => {
      return (await context.reddit.getCurrentUsername());
    })

    const webView = useWebView<WebViewMessage, DevvitMessage>({
      url: newPage, // URL of your web view content

      // Handle messages sent from the web view
      async onMessage(message, webView) {
        switch(message.type){
          // case 'page':
          //   webView.postMessage({
          //     type: ''
          // })
          // case 'boardPageLoaded':
          // going to make this case happen on load later
          case 'fetchLeaderboard':
            const currLeaderboard = await context.redis.zRange("leaderboard", 0, 99, {BY: 'SCORE', REV: true, WITHSCORES: true,});
            
            try {

              const leaderboardWithScores = await Promise.all(
                currLeaderboard.map(async (player) => ({
                  username: player.member,
                  score: player.score,
                }))
              )
              
              console.log("output from fetchLeaderboard:");
              console.log(leaderboard);
              setLeaderboard(leaderboardWithScores);

              webView.postMessage({
                type: 'updateLeaderboard',
                data: leaderboardWithScores,
              })

            } catch(error){
              console.log(error);
            }
            break;
            
            // setLeaderboard(currLeaderboard);
            // const leaderboardData = leaderboard.map(entry => ({
            //   username: entry.value,
            //   score: entry.score,
            // }));
            

          //going to make this case happen when player completes a game
          case 'addBoardEntry':
            console.log(message.data);
            console.log("entry added");
            await context.redis.zAdd("leaderboard", message.data);
            break;

          case 'initialDataRequested':
            const userData = await context.redis.get('$(username)');
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
