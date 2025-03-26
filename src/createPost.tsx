import { Devvit } from '@devvit/public-api';

// TODO: Migrate these two posts to be automatic every day
Devvit.addMenuItem({
  label: "appleapple",
  forUserType: 'moderator',
  location: 'subreddit',
  onPress: async (_event, context) => {
    const { reddit, ui } = context;
    const subreddit = await reddit.getCurrentSubreddit();
    const post = await reddit.submitPost({
      title: 'Itadaki Daily',
      subredditName: subreddit.name,
      // The preview appears while the post loads
      preview: (
        <vstack height="100%" width="100%" alignment="middle center">
          <text size="large">Loading ...</text>
        </vstack>
      ),
    });
    ui.showToast({ text: 'Created post!' });
    ui.navigateTo(post);
  },
});

// Adds a new menu item to the subreddit allowing to create a new post
Devvit.addMenuItem({
  label: "Create Tomorrow's Words Post",
  forUserType: 'moderator',
  location: 'subreddit',
  onPress: async (_event, context) => {
    const { reddit, ui } = context;
    const subreddit = await reddit.getCurrentSubreddit();
    const post = await reddit.submitPost({
      title: 'Itadaki Word Voting',
      subredditName: subreddit.name,
      // The preview appears while the post loads
      preview: (
        <vstack height="100%" width="100%" alignment="middle center">
          <text size="large">Loading ...</text>
        </vstack>
      ),
    });
    ui.showToast({ text: 'Created post!' });
    ui.navigateTo(post);
  },
});

// Schedule word generation
Devvit.addMenuItem({
  label: 'Run Word Generation',
  location: 'subreddit',
  onPress: async (event, context) => {
    await context.scheduler.runJob({
      name: 'storeDailyKanji',
      runAt: new Date() // Right now
    });
    context.ui.showToast('Picking a new kanji for today and scheduling the next selection for tomorrow morning (midnight UTC)');
  },
});
