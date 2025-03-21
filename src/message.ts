/** Message from Devvit to the web view. */
export type DevvitMessage =
  | { type: "initialDataRecieved" data: {username: string}}
  | { type: "fetchLeaderboard" };

/** Message from the web view to Devvit. */
export type WebViewMessage =
  | {
      type: "updateLeaderboard";
      data: Array<username: string, score: number>;
    }
  | { type: "page"; data: { newPage: string } }
  | { type: "initialDataRequested" };

/**
 * Web view MessageEvent listener data type. The Devvit API wraps all messages
 * from Blocks to the web view.
 */
export type DevvitSystemMessage = {
  data: { message: DevvitMessage };
  /** Reserved type for messages sent via `context.ui.webView.postMessage`. */
  type?: "devvit-message" | string;
};
