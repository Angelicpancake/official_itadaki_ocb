import { JishoAPIJSON } from "./jishoAPIJSON.js";

export class JishoUtil {
	public static async getWordsContaining(search: string) {
		// non ASCII characters must be encoded
		var jishoData: JishoAPIJSON = await (await fetch(`https://jisho.org/api/v1/search/words?keyword=*${encodeURIComponent(search)}*`)).json();
		console.log(jishoData.data[0].japanese[0].word);
	}
}
