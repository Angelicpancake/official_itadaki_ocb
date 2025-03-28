import './createPost.js';
import { Devvit, RedisClient, useState, useWebView, useAsync, useForm } from '@devvit/public-api';
import type { DevvitMessage, WebViewMessage } from './message.js';
import { JishoUtil } from './util/jishoUtil.js'; // Import the JishoUtil class for fetching words
import RedisUtil from './util/redisUtil.js';
import { Word } from './util/word.js';
import jishoFetch, {randomKanji} from './util2/jishoFetch.js';
import kanjiList from './util2/kanjiList.js';
import createDailyPost from './createDailyPost.js';

Devvit.configure({
  redditAPI: true,
  redis: true,
  http: true,
  scheduler: true,
});


/*
  new kanji schedule job that updates the kanji of the week
*/
async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve,ms));
}

Devvit.addSchedulerJob({
	name: 'getWeeklyKanji',
	onRun: async (event, context) => {
    //string of relevant kanji replace later with random kanji selector
    let importantKanji:string = kanjiList;
    let amountOfKanji:number = 0;
    let weeklyLength:number = 0;
    let weeklyChars: Array<string> = [];

    while(amountOfKanji < 7) {
      try {
        let randomCharacter: string = importantKanji[Math.floor(Math.random() * importantKanji.length)];

        //break iteration if already has one of the kanji in the weeklyChars array
        if(weeklyChars.includes(randomCharacter))
          continue;
        
        //push the kanji to the array if its a new kanji
        weeklyChars.push(randomCharacter);

        /* await context.redis.del(`todaysWords${amountOfKanji}`); */

        await delay(500);

        const words: Record<string, string[]> = await jishoFetch(randomCharacter);

        if(words == null || words == undefined || Object.keys(words).length < 5)
        {
          weeklyChars.pop();
          continue;
        }

        const kanjiArray: Array<string> = Object.keys(words);

        // await context.redis.set('weeklyKanji', JSON.stringify(words));

        const dailyWords: string = JSON.stringify(words);

        // await context.redis.set(`todaysWords${amountOfKanji}`, dailyWords);

        const keysArrayLength: number = Object.keys(words).length;

        const dailyMaxScore = JSON.stringify(Math.floor(Math.pow(keysArrayLength, (5/* Math.pow(correctlyGuessed / wordsArray.length, 3) + 4 */))));

        await Promise.all([
          context.redis.set(`dailyKanji${amountOfKanji}`, randomCharacter),
          context.redis.set(`todaysWords${amountOfKanji}`, dailyWords),
          context.redis.set(`day${amountOfKanji}MaxScore`, dailyMaxScore),
        ]);

        // await context.redis.set(`day${amountOfKanji}MaxScore`, dailyMaxScore); 

        console.log(`stored words for day ${amountOfKanji} in Redis`, dailyWords);

        console.log(`day${amountOfKanji}MaxScore: `, await context.redis.get(`day${amountOfKanji}MaxScore`));

        if(dailyWords)
          ++amountOfKanji;
          weeklyLength += keysArrayLength;
      }
      catch (error){
          console.log(`error in storing redis weekly words`, error);
      }
    }
    
    try {
      const weeklyMaxScore = JSON.stringify(Math.floor(Math.pow(weeklyLength, (4))));
      await context.redis.set('weeklyMaxScore', weeklyMaxScore);
      console.log('weeklyMaxScore: ', await context.redis.get('weeklyMaxScore'));
    } catch (error) {
      console.error('error when storing weeklyMaxScore', error);
    }
    
    function nextMonday(date: Date){
      const dayOfWeek = date.getUTCDay();
      const daysUntilMonday = (dayOfWeek === 0 ? 1 : 7 - (dayOfWeek - 1));
      date.setUTCDate(date.getUTCDate() + daysUntilMonday);
    }
    		// sunday at midnight (monday morning)
		let scheduledDate: Date = new Date();
    nextMonday(scheduledDate);
		scheduledDate.setUTCHours(0, 0, 0, 0);

		// Schedule this task again for sunday
		await context.scheduler.runJob({
			name: 'getWeeklyKanji',
			runAt: scheduledDate,
		});
	}
});

Devvit.addSchedulerJob({
  name: "resetDailyHighScores",
  onRun: async (event, context) => {
    const topCommentUser = await context.redis.get("topCommentUser");
    const [topCommentUserScore] = await Promise.all([
      context.redis.zScore("leaderboard", topCommentUser),
      context.redis.del("dailyHighScores"),
      context.redis.del("topComment"),
      context.redis.del("topCommentUser"),
    ]);

    await context.redis.zAdd("leaderboard", {member: topCommentUser, score: topCommentUserScore + 200000});
    
    let scheduledDate: Date = new Date();
    scheduledDate.setUTCDate(scheduledDate.getUTCDate() + 1);
    scheduledDate.setUTCHours(0, 0, 0, 0);
    await context.scheduler.runJob({
      name: 'resetDailyHighScores',
      runAt: scheduledDate,
    });
  }
});


Devvit.addSchedulerJob({
  name: "readTopCommentWithKanji",
  onRun: async(event, context) => {
  	try {
    	// Fetch comments using the postId
    	const currentDay = new Date().getUTCDay();
    	const [comments, currentKanji] = await Promise.all([
      	context.reddit.getComments({postId: event.data.postId, depth: 1}),
      	context.redis.get(`dailyKanji${currentDay}`),
    	]);

    	if (!comments || comments.length == 0) {
      	console.log("No comments found.");
      	return null;
    	}

    	// console.log(currentKanji);

    	// console.log(comments);

    	/* const currentKanji = (JSON.parse(await context.redis.get("weeklyKanji")))[currentDay]; */
    	const commentsArray = await comments.all();
   	 
    	// Sort comments by score in descending order to get the top one
    	const filteredComments = commentsArray.filter(comment => comment.body.includes(currentKanji));

    	// console.log(filteredComments);
   	 
    	if(filteredComments === null || filteredComments.length === 0)
    	{
      	return null;
    	}

    	// console.log("First comment body:", filteredComments[0].body);

    	const commentsSortedByUpvotes = filteredComments.sort((a, b) => b.score - a.score);

    	const topCommentUnclean = commentsSortedByUpvotes[0];
    	const topComment = topCommentUnclean.body.replace(/^#\s+/, '');
    	const topCommentUser = topCommentUnclean.authorName;

    	console.log('Top Comment Unclean:', topCommentUnclean.body);
    	console.log('Top Comment:', topComment);
    	console.log('Top Comment Author:', topCommentUser);
    	await context.redis.mSet({
      	"topComment": `"${topComment}"`,
      	"topCommentUser": `User: ${topCommentUser}`,
    	});

  	} catch (error) {
    	console.error('Error fetching comments:', error);
  	}

	//check top comments every 5 minutes
	let scheduledDate: Date = new Date();
	const currentMinutes: number = scheduledDate.getUTCMinutes();
	scheduledDate.setUTCMinutes(currentMinutes + 5);
	await context.scheduler.runJob({
  	name: "readTopCommentWithKanji",
  	runAt: scheduledDate,
  	data: {postId:
  	event.data?.postId || context.postId},
	});
  }
});


/*
  Select new Kanji schedule
*/
Devvit.addMenuItem({
  label: "Get New Weekly Kanji/Initial Startup",
  location: "subreddit",
  forUserType: "moderator",
  onPress: async (event, context) => {
    const location = event.location;
    const targetId = event.targetId;

    await context.scheduler.runJob({
      name: 'getWeeklyKanji',
      runAt: new Date(),
    });

    await context.scheduler.runJob({
      name: 'resetDailyHighScores',
      runAt: new Date(),
    });

    await context.scheduler.runJob({
      name: "readTopCommentWithKanji",
      runAt: new Date(),
      data: {postId: context.postId},
    });

    context.ui.showToast({text: "Refreshed Weekly Kanji!"});
  },
});

Devvit.addMenuItem({
  label: "Reset Leaderboard",
  location: "subreddit",
  forUserType: "moderator",
  onPress: async (event, context) => {
    const location = event.location;
    const targetId = event.targetId;

    await context.redis.del("leaderboard");

    context.ui.showToast({text: "Reset Leaderboard!"});
  },
})



Devvit.addCustomPostType({
  name: 'sushisushi',
  height: 'tall',
  render: (context) => {

    const [newPage, change] = useState('home.html'); // Use state for page switches

    // const [leaderboard, setLeaderboard] =  useState<Array<{member: string; score: number}>>([]);

    // const [day, setDay] = useState(new Date().getUTCDay());

    //form
    /*const myForm = useForm(
      {
        fields: [
          {
            type: 'string',
            name: 'food',
            label: 'What is your favorite food?',
          },
        ],
      },
      (context) => {
        // onSubmit handler
        context.ui.showToast({text: "submitted"});
      }
    );*/
  const guessForm = useForm(
  {
    title: 'Enter a Sentence',
    description: "Must contain the daily kanji, you'll earn 5 point.",
    acceptLabel: 'Submit',
    fields: [
      {
        type: 'string',
        name: 'guess',
        label: 'Sentence',
        required: true,
      },
    ],
  },
  async (values) => {
    const postId = context.postId; // The current post's ID
    console.log('Form submitted with values:', values.guess);
    
    const commentText = values.guess as string;
    
    // Submit the comment using Reddit API
    const comment = await (await context.reddit.getPostById(postId)).addComment({
      text: commentText
    });
    
    context.ui.showToast('Comment posted successfully!');
    // Add your form submission logic here
  }
);
    
    const [username] = useState(async () => {
      return await context.reddit.getCurrentUsername();
    });

    const [isRefreshing, setIsRefreshing] = useState(false);

    const [leaderboardData, setLeaderboardData] = useState(async () => {
      try {
        setIsRefreshing(true);
        const [highScore, currRank, currLeaderboardLength, currLeaderboard] = await Promise.all([
          context.redis.zScore("leaderboard", username),
          context.redis.zRank("leaderboard", username),
          context.redis.zCard("leaderboard"),
          context.redis.zRange("leaderboard", 0, 9, { 
            by: 'rank',
            reverse: true,
            withscores: true, 
          })
        ]);
      
        return {
          highScore,
          currRank,
          currLeaderboardLength,
          currLeaderboard,
        };
      } catch(error){
        console.error("error when fetching leaderboard", error);
      } finally {
        delay(5000);
        setIsRefreshing(false);
      }
    });

    const refreshLeaderboardData = async() => {
      try {
        const [highScore, currRank, currLeaderboardLength, currLeaderboard] = await Promise.all([
          context.redis.zScore("leaderboard", username),
          context.redis.zRank("leaderboard", username),
          context.redis.zCard("leaderboard"),
          context.redis.zRange("leaderboard", 0, 9, { 
            by: 'rank',
            reverse: true,
            withscores: true, 
          })
        ]);
        
        setLeaderboardData({
          highScore,
          currRank,
          currLeaderboardLength,
          currLeaderboard,
        });
      } catch (error) {
        console.error("error when refreshing leaderboard", error);
      }
    };

    const webView = useWebView<WebViewMessage, DevvitMessage>({
      url: newPage, // URL of your web view content

      // Handle messages sent from the web view
      async onMessage(message, webView) {
        switch(message.type){
          //show form
          case 'showForm':
              await context.ui.showForm(guessForm);
            break;

          case 'getComments':
            await context.scheduler.runJob({
              name: "readTopCommentWithKanji",
              runAt: new Date(),
              data: {postId: context.postId},
            });
            break
        
          case 'fetchWords':

            // await context.redis.hSet('todaysHighScores', {
            //   username: '0',
            // });
            //
            // console.log(await context.redis.hGet('todaysHighScores', username));
            const day = new Date().getUTCDay();
           
            // context.scheduler.runJob({
            //   name: 'getDailyWords',
            //   runAt: new Date(),
            // });
            function delay(ms: number) {
              return new Promise(resolve => setTimeout(resolve,ms));
            }

            let rawData:string = null;
            let maxScoreDaily:number = 0;
            while(!rawData || rawData === ""){
              delay(500);
              console.log("waiting for data...");
              rawData = await context.redis.get(`todaysWords${day}`);
              maxScoreDaily = JSON.parse(await context.redis.get(`day${day}MaxScore`));
              // console.log(rawData);
              // console.log(maxScoreDaily);
            }

            let dataWeekly: Record<string,string[]> = null;
            let countMerged = 0;

            while(countMerged < 7)
            {
              try {
                // delay(500);
                const rawDataWeeklyDay = await context.redis.get(`todaysWords${countMerged}`);

                // console.log(rawDataWeeklyDay);

                const parsedDataWeeklyDay: Record<string,string[]> = JSON.parse(rawDataWeeklyDay);

                // console.log(parsedDataWeeklyDay);

                dataWeekly = {...dataWeekly,...parsedDataWeeklyDay};

                

                countMerged++;
              } catch(error) {
                console.error("failed to fetch rapid words", error);
              }
            }

            let maxScoreWeekly: number = 0;
            try {
              maxScoreWeekly = JSON.parse(await context.redis.get("weeklyMaxScore"));
              console.log(maxScoreWeekly);
            } catch(error) {
              console.error("failed to fetch weeklyMaxScore", error);
            }
            
            // console.log(rawData);
            const parsedData: Record<string, string[]> = JSON.parse(rawData);

            // console.log(parsedData);
            webView.postMessage({
              type: "dailyText",
              data: {text: `Today's Kanji: ${Object.keys(parsedData)[0]} - "${parsedData[Object.keys(parsedData)[0]][0]}"`},
            })

            let [topComment, topCommentUser] = await context.redis.mGet(["topComment", "topCommentUser"]);

            if(topComment === null || topComment === undefined)
            {
              topComment = "No Top Comment With Kanji Currently!";
              topCommentUser = "";
            }

            webView.postMessage({
              type: "topComment",
              data: {text: `${topComment} <br>Most Upvoted Comment`},
            });

            webView.postMessage({
              type: "updateWords",
              data: {
                words: parsedData,
                weeklyWords: dataWeekly,
                maxDaily: maxScoreDaily,
                maxWeekly: maxScoreWeekly,
              }
            });
            break;

          // case 'fetchWords2':
          //   
          //   context.scheduler.runJob({
          //     name: 'getWeeklyKanji',
          //     runAt: new Date(),
          //   });
          //
          //   for(let i = 0; i < 7; i++){
          //     const kanji = await context.redis.get(`kanjiday${i}`);
          //     console.log(kanji);
          //   }
          //
          //   break;

          case 'fetchLeaderboard':
            if (isRefreshing){
              console.log("Please wait before refreshing again");
              break;
            }
            await refreshLeaderboardData();
            const {highScore, currRank, currLeaderboardLength, currLeaderboard} = leaderboardData;
            let updatedLeaderboard = null;

            try {

              const leaderboardWithScores = await Promise.all(
                currLeaderboard.map(async (player) => ({
                  username: player.member,
                  score: player.score,
                }))
              )

              if (currRank < currLeaderboardLength - 10)
              {
                const newEntry = {
                  username: username,
                  score: highScore,
                }
                updatedLeaderboard = [...leaderboardWithScores,newEntry,];
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
              console.error("failed to update leaderboard", error);
            }
            break;
            
          //going to make this case happen when player completes a game
          case 'addBoardEntry':
            let playerArray = [];
           for(let i = 0; i < message.data.length; i++)
            {
              try {
                const currentUser:string = message.data[i].member;
                let newScore:number = message.data[i].score;
                // console.log("newScore", newScore);
                let oldScore: number = null;
                if(message.data[i].gameType == "rapid")
                {
                  oldScore = await context.redis.zScore("weeklyHighScores", currentUser);

                  console.log(oldScore);

                  if(oldScore == undefined || oldScore == null)
                    oldScore = 0;

                  // console.log("oldScore: ", oldScore);

                  if(newScore > oldScore){
                    await context.redis.zAdd("weeklyHighScores", {member: currentUser, score: newScore});
                    console.log("score updated", newScore);
                  }
                    
                  else{
                    // console.log("score not updated", newScore);
                    newScore = oldScore;
                  }
                  
                }
                else if (message.data[i].gameType == "daily")
                {
                  oldScore = await context.redis.zScore(`dailyHighScores`, currentUser);
                  console.log(oldScore);
                  if(oldScore == undefined || oldScore == null)
                    oldScore = 0;

                  // console.log("oldScore: ", oldScore);

                  if(newScore > oldScore){
                    await context.redis.zAdd("dailyHighScores", {member: currentUser, score: newScore});
                    console.log("score updated", newScore);
                  }
                  else
                    // console.log("score not updated", newScore);
                    newScore = oldScore;
                }  

                let oldLeaderboardScore: number = await context.redis.zScore("leaderboard", currentUser);
                if(oldLeaderboardScore == undefined || oldLeaderboardScore == null)
                  oldLeaderboardScore = 0;
                // console.log(oldLeaderboardScore);
                const finalScore = (oldLeaderboardScore - oldScore) + newScore;
                // console.log(finalScore);
                await context.redis.zAdd("leaderboard", {member: currentUser, score: finalScore});
                console.log("member added to leaderboard!", {score: finalScore, member: currentUser});

              } catch (error) {
                console.error("error when adding entry", error);
              }
            }
            break;

          case 'removeBoardEntry':
            await context.redis.del("leaderboard");
            break;
            

          case 'initialDataRequested':
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
      <blocks>
      <zstack width="100%" height="100%">
      <image 
        url="cute3.png" 
        imageWidth={1500} 
        imageHeight={1024} 
        width="100%" 
        height="100%" 
        resizeMode="cover" 
      />
      
      
      
      {/* Your other content goes here, on top of the background */}
      
      <vstack height="100%" width="100%" alignment="center" gap="small" backgroundColor="rgba(0, 0, 0, 0.14)">
        
      
        <hstack height="20%" width="100%" alignment="top center" />
      
     
        <hstack height="25%" width="100%" alignment="top center">
        
          <image
            url="home3.png"
            description="itadaki"
            imageHeight={30}
            imageWidth={256}
            height="100px"  
            width="500px"
          />

        </hstack>

        <hstack height="10%" width="50%" alignment="top center">
          <button
           appearance='secondary' size="small"
           onPress={() => /*context.ui.showForm(guessForm)*/webView.mount()}>
              Play Game
            </button>
        </hstack>
        </vstack>
    </zstack>
      
        </blocks>
    
    );
  },
});

export default Devvit;
