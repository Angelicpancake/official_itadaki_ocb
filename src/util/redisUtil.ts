import { RedisClient } from "@devvit/public-api";
import { Word } from "./word.js";

/*
	HashMap of Japanese words with keys retrieved using the japanese word

	Store words for week and rotate words when the day resets based on UTCtime clock
*/

/*
	redis internal representation of storage

	ex:
		Key: dailyWords1
		Fields: 
		hello => こんにちは
		hi => こんにちは

	retrieve by hGet
*/
export class RedisUtil {
	private static words: Word[][] | null; //creates a 2d array of Word or sets to null

	//return type Word[][] or null and returns the words array
	public static getWordsOutOfContext(): Word[][] | null {
		return this.words;
	}

	/*
		async method getWords with parameter RedisClient
		return Word[][] as a promise => use await for it

		if instance variable words is null => generate the week's words
		** => create a way that when the week is over the keys expire and is null again

		hGetAll => fetch all values from hash stored in Redis
		dailyWords${i} is the key
		key examples: dailyWords0, dailyWords1 representing words from the days of the week

		Record is a ts type: (keys, values)
		
		ex:
		"apple": "りんご",
		"banana": "バナナ",
		"cherry": "さくらんぼ"
		keys and values

		compactedWordMap: 
		a string that leads to other similar english translations 
		hello => hi, hola

		EX：
		こにちは：["hello", "hi"]

		const words = compactedWordMap["こにちは"]
		output: ["Hello”、”Hi”]

		compactedJapanese:
		the keys from compactedWordMap
	*/
	public static async getWords(redis: RedisClient): Promise<Word[][]> {
		if (this.words == null) {
			this.words = [];
			for (var i: number = 0; i < 7; i++) {
				// Days of the week are represent as numbers from 0-6, Sunday-Saturday
				const dailyWords: Record<string, string> = await redis.hGetAll(`dailyWords${i}`);

				const compactedWordMap: {[key: string]: string[]} = {};
				for (const englishWord in dailyWords) {
					if (compactedWordMap[dailyWords[englishWord]] == null) {
						compactedWordMap[dailyWords[englishWord]] = [englishWord];
					} else {
						compactedWordMap[dailyWords[englishWord]].push(englishWord);
					}
				}
				
				for (const compactedJapanese in compactedWordMap) {
					this.words[i].push(new Word(compactedWordMap[compactedJapanese], compactedJapanese))
				}
			}
		}
		return this.words;
	}

	/*
		setWords(redis, words[])
		redis word: feed a string key and get a string value
		perhaps "hello" => "こにちは"

		englishDefinition is the array of english def from
		method getEnglish

		new Date().getUTCDay() => day of the week 0-6

		'dailyWords${~}' => dailyWords0 ..etc
	*/
	public static setWords(redis: RedisClient, words: Word[]): void {
		var redisWords: {[key: string]: string} = {};

		words.forEach((word: Word) => {
			for (const englishDefinition in word.getEnglish()) {
				redisWords[englishDefinition] = word.getJapanese();
			}
		});

		redis.hSet(`dailyWords${new Date().getUTCDay()}`, redisWords);
	}
}