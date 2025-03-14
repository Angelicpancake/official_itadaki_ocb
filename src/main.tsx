import './createPost.js';

import { Devvit, useState, useWebView } from '@devvit/public-api';
import type { DevvitMessage, WebViewMessage } from './message.js';

Devvit.configure({
  redditAPI: true,
  redis: true,
});

// Add a custom post type to Devvit
Devvit.addCustomPostType({
  name: 'Itadaki-Web-View',
  height: 'tall',
  render: (context) => {
    const [switchPage, setSwitchPage] = useState('page.html'); // Use state for page switches

    const webView = useWebView<WebViewMessage, DevvitMessage>({
      url: switchPage, // URL of your web view content

      // Handle messages sent from the web view
      async onMessage(message, webView) {
        // Handle messages if needed
      },
      onUnmount() {
        context.ui.showToast('Web view closed!');
      },
    });

    // Function to handle page switching
    const handlePageSwitch = (newPage: string) => {
      setSwitchPage(newPage); // Update the state
      console.log(`Switched to ${newPage}`);
      webView.mount(); // Re-mount the webView after the state update
    };

    // Render the custom post type
    return (
      <vstack height="100%" width="100%" alignment="center" gap="small" backgroundColor="#212846">
        <hstack height="5%" width="100%" alignment="top center" />

        <hstack height="25%" width="100%" alignment="top center">
          <image
            url="itadaki.png"
            description="itadaki"
            imageHeight={30}
            imageWidth={256}
            height="80px"
            width="350px"
          />
        </hstack>

        <hstack height="42%" width="100%" alignment="top center" gap="none">
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
            url="howto.png"
            description="how to"
            imageHeight={30}
            imageWidth={380}
            height="50px"
            width="400px"
          />
        </hstack>

        <vstack height="100%" width="100%" gap="medium" alignment="center middle">
          <image
            url="logo.png"
            description="logo"
            imageHeight={256}
            imageWidth={256}
            height="48px"
            width="48px"
          />
        </vstack>
      </vstack>
    );
  },
});

export default Devvit;