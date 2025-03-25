import { Word } from "./util/word.js";

/*message from devvit to webview*/
export type DevvitMessage =
  | { type: "initialDataRecieved", data: {username: string, words: Word[][]}}
  | { type: "updateLeaderboard", data: {leaderboard: Array<{username: string, score: number}>, rank: number}}
  | { type: "updateWords", data: {words: Record<string, string[]>}};
 

/* Message from the web view to Devvit. */
export type WebViewMessage =
  | { type: "fetchLeaderboard",}
  | { type: "fetchWords", data: {kanji: string}}
  | { type: "page", data: { newPage: string } }
  | { type: "initialDataRequested" }
  | { type: "removeBoardEntry"}
  | { type: "addBoardEntry", data: Array<{score: number, member: string}>}
/*Web view MessageEvent listener data type. The Devvit API wraps all messages
from Blocks to the web view.*/
export type DevvitSystemMessage = {
  data: { message: DevvitMessage };
  /* Reserved type for messages sent via context.ui.webView.postMessage. */
  type?: "devvit-message" | string;
};
