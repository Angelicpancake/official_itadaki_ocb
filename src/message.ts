<<<<<<< HEAD
/** Message from Devvit to the web view. */
export type DevvitMessage =
  | { type: "initialDataRecieved" data: {username: string}}
  | { type: "updateLeaderboard"; data: {leaderboard: Array<username: string, score: number>, rank: number};
=======
/* Message from Devvit to the web view. */
import { Word } from "./util/word.js";
>>>>>>> c702295bfc3cdd3f93dc71c7b5ea1dc1174e1f67

export type DevvitMessage =
  | { type: "initialDataRecieved"; data: {username: string}}
  | { type: "updateLeaderboard"; data: {leaderboard: Array<{username: string, score: number}>, rank: number}}
  | { type: 'words'; data: {words: Word[][]}}; //export words[][]
 

/* Message from the web view to Devvit. */
export type WebViewMessage =
  | {
      type: "fetchLeaderboard";
    }
  | { type: "page"; data: { newPage: string } }
  | { type: "initialDataRequested" }
  | { type: "removeBoardEntry"}
<<<<<<< HEAD
  | { type: "addBoardEntry"; data: Array<score: number, member: string>};

/**
 * Web view MessageEvent listener data type. The Devvit API wraps all messages
 * from Blocks to the web view.
 */
=======
  | { type: "addBoardEntry"; data: Array<{score: number, member: string}>}
/*Web view MessageEvent listener data type. The Devvit API wraps all messages
from Blocks to the web view.*/
>>>>>>> c702295bfc3cdd3f93dc71c7b5ea1dc1174e1f67
export type DevvitSystemMessage = {
  data: { message: DevvitMessage };
  /* Reserved type for messages sent via context.ui.webView.postMessage. */
  type?: "devvit-message" | string;
};
