Itadaki

Type the correct translation or meaning of a randomly generated word to earn points and climb the leaderboard. Compete on the leaderboard and share quiz results with others.

Inspiration

I've been studying Japanese for four years, and during that time, I've enjoyed using apps like Duolingo and Quizlet to expand my vocabulary. However, I felt that these platforms lacked a more intuitive approach to learning. After speaking with my classmates and teachers, I realized that the ideal app would focus on gradually building kanji vocabulary through words combined with an engaging experience with friends. 
Reddit holds strong communities of users with similar interests. With subreddits such as r/LearnJapanese and r/Japanese holding around ~1 million users and r/Languagelearning with ~3million users. We were inspired to create an app that makes language learning intuitive and fun starting on reddit. 

How It Works

Our app takes 7 randomly generated kanji from a list of only the most useful characters and creates a set of words correlated with the kanji. 

⌛Daily Mode: 
Through our 7 randomly generated kanji we have cultivated an experience of kanji of the day. A user can go through the words and guess the english translation for points or skip if they’re having trouble. What makes our system unique is that we use the hashmap data structure to store all possible English translations given from the Jisho API.
```const words = await jishoFetch(kanji); // { kanji: ["English meaning1", "English meaning2"] }
 await context.redis.set(`todaysWords${amountOfKanji}`, JSON.stringify(words));```

🗣️Bonus: 
We encourage multiplayer interaction by having players comment sentences using the daily word or kanji and give constructive feedback on each other’s responses. This creates an engaging, community-driven learning experience where everyone helps each other improve.

⏩Rapid Mode:
We believe active recall is a powerful tool for learning, so in Rapid Mode, users can review all the words of the week in a randomized order. By recalling and answering these words, users can reinforce their learning while earning additional points for the leaderboard. We encourage users to share their accuracy and results on the subreddit, fostering a shared commitment to learning and improvement.
🏆Leaderboard:
Our scoring system is designed to encourage mastery of the words. Each day, players can earn a maximum score by correctly answering all words, while a formula adjusts their score proportionally if they miss some. The weekly mode follows a similar structure, ensuring consistent motivation. This system incentivizes players to learn all the words to maximize their leaderboard ranking, fostering a competitive yet educational experience. Lasty, our leaderboard refreshes the score every week and shows the user’s score at the bottom.
```score = Math.floor(Math.pow(correctlyGuessed, (Math.pow(correctlyGuessed / wordsArray.length, 3) + 3)));```

Backend

📗 Jisho Dictionary:
Jisho is a comprehensive Japanese-English dictionary with an open API that provides modern Japanese words along with multiple English definitions. It also allows users to search for words containing a specific kanji. 
```const jishoData = await( fetch(`https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(kanji)}`) ); const jishoJSON: JishoAPIJSON = await jishoData.json();```

⭐️ Weekly Words:
Each week, we generate 7 kanji with corresponding vocabulary, which are stored in Redis for easy access. The process involves fetching words from the Jisho API, deleting existing words in Redis, and saving the new set in JSON format.

```let amountOfKanji = 0;
while (amountOfKanji < 7) {
    const kanji = weeklyChars[amountOfKanji];
    try {
        await context.redis.del(`todaysWords${amountOfKanji}`);
        await delay(500);
        const dailyWords = JSON.stringify(await jishoFetch(kanji));
        await context.redis.set(`todaysWords${amountOfKanji}`, dailyWords);
        if (dailyWords) ++amountOfKanji;
    } catch (error) {
        console.log(`Error in storing Redis weekly words`, error);
    }
}```

Challenges We Ran Into

Redis:

Challenges with redis hashes:

While implementing our backend for storing words, we wanted to store the words in a redis hash. However, when using hashes in redis, we would keep getting errors when storing data. We tried various debugging techniques to no avail. After an hour of tinkering, we realized that we had to take a different approach. We ditched redis hashes altogether and decided to utilize JSON stringify/parse and simple redis read/write. Now we store stringified hashmaps corresponding to the words each day inside redis keys, allowing for the functionality we intended. When retrieving words for a day, we parse the data in the current day's redis key. This approach worked extremely well and showed us the versatility of JSON files.

Page Switching:

We encountered challenges when trying to implement multiple pages within WebView using separate HTML files. Since window.location.href is not compatible with Devvit, we attempted to pass data to Redis via the page link and update the state, but this approach was unsuccessful. Ultimately, we shifted to a single-page application (SPA) format. Instead of mounting new pages, we now use JavaScript to dynamically show and hide content, creating a seamless navigation experience within a single view.

Accomplishments that we’re Proud of

📚 Dynamic Language System: 

We're proud to have built a functional language-learning app in just a month—one that not only works but also enhances our own language-learning journey.

🔥Redis Storage:

We’re proud to leverage Redis for scheduling new weekly kanji and storing the hashmap of words within Redis sets.

🎓Growth: 

Our biggest accomplishment has been the learning curve throughout the entire process of creating this app. We applied the coding knowledge we gained from our computer science classes to build a real-world application that contributes to language learning. Additionally, we’re proud of crafting a clean UI with smooth animations and intuitive buttons on the front end along with our backend that fetches the words. 


What’s Next for Itadaki

Kanji Polls: Polls on the community to vote on the next kanji they want to learn

Sentence Polls: Takes the most upvoted bonus sentences and ask’s users which is the best. Offer’s more points to the winner.

Timed Rush Mode: Random kanji words with limited time guessing.
Kanji-Dex Mode: Rewind time and pick a kanji of your choice and learn the words.
Timed Rush Kanji-Dex: Choose multiple kanji and race against the clock in a fast-paced challenge to guess as many words as possible!




















