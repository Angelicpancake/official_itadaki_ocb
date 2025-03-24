import { JishoAPIJSON } from "./jishoAPIJSON.js";
import { Word } from "./word.js";

/*
	creates a variable of type word
	gets x amount of words containing the kanji
	pushes to word array containing the english def and japanese word
*/
export class JishoUtil {
	public static async getWordsContaining(search: string): Promise<Word[]> {
		// non ASCII characters must be encoded
		let jishoData: JishoAPIJSON = await (await fetch(`https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(search)}`)).json();

		const words: Word[] = [];
		for (let i = 0; i < Math.min(jishoData.data.length, 10); i++) { //testing capped at 10
			words.push(new Word(jishoData.data[i].senses[0].english_definitions, jishoData.data[i].japanese[0].word));
		}

		console.log("hi"/*jishoData.data[0].japanese[0].word*/);
		
		return words;

		
	}
}