import { RedisClient } from "@devvit/public-api";
import { Word } from "./word.js";

export class RedisUtil {
	private static words: Word[][] | null;

	public static getWordsOutOfContext(): Word[][] | null {
		return this.words;
	}

	public static async getWords(redis: RedisClient): Promise<{}> {
		if (this.words == null) {
			this.words = [];
			for (var i: number = 0; i < 7; i++) {
				// Days of the week are represent as numbers from 0-6, Sunday-Saturday
				const dailyWords: Record<string, string> = await redis.hGetAll(`dailyWords${i}`);
				for (const japaneseWord in dailyWords) {
					this.words[i].push(new Word(japaneseWord, dailyWords[japaneseWord]))
				}
			}
		}
		return this.words;
	}

	public static setWords(redis: RedisClient, words: Word[]): void {
		var redisWords: {[key: string]: string} = {};
		words.forEach((word: Word) => redisWords[word.getJapanese()] = word.getEnglish());

		redis.hSet(`dailyWords${new Date().getUTCDay()}`, {});
	}
}
