import { RedisClient } from "@devvit/public-api";

export type WordMap = {[key: string]: string};

export class RedisUtil {
	private static words: WordMap[] | null;

	public static getWordsOutOfContext(): WordMap[] | null {
		return this.words;
	}

	public static async getWords(redis: RedisClient): Promise<{}> {
		if (this.words == null) {
			this.words = [];
			for (var i: number = 0; i < 7; i++) {
				// Days of the week are represent as numbers from 0-6, Sunday-Saturday
				this.words[i] = await redis.hGetAll(`dailyWords${i}`);
			}
		}
		return this.words;
	}

	public static setWords(redis: RedisClient, values: WordMap): void {
		redis.hSet(`dailyWords${new Date().getUTCDay()}`, values)
	}
}
