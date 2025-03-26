import { Devvit } from '@devvit/public-api';

Devvit.addSchedulerJob({
  name: 'PostDailyPost',
  onRun: async (event, context) => {
    const { reddit } = context;
    const subreddit = await reddit.getCurrentSubreddit();

    await reddit.submitPost({
      title: 'Itadaki Daily',
      subredditName: subreddit.name,
      // The preview appears while the post loads
      preview: (
        <vstack height="100%" width="100%" alignment="middle center">
          <text size="large">Loading ...</text>
        </vstack>
      ),
    });

    // Reschedule this task for tomorrow
    let tomorrow: Date = new Date();
    tomorrow.setUTCDate(tomorrow.getDate() + 1);
    tomorrow.setUTCHours(0, 0, 0, 0)

    context.scheduler.runJob({
      name: 'PostDailyPosts',
      runAt: tomorrow
    });
  }
});

// TODO: Migrate these two posts to be automatic every day
Devvit.addMenuItem({
  label: 'Initialize Daily Post Scheduling',
  forUserType: 'moderator',
  location: 'subreddit',
  onPress: async (event, context) => {
    context.scheduler.runJob({
      name: 'PostDailyPosts',
      cron: '5 * * * *'
    });

    console.log('Initialized Daily Post Scheduling')
  },
});
