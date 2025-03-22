export class Word {
	private english: string;
	private japanese: string;

	public constructor(english: string, japanese: string) {
		this.english = english;
		this.japanese = japanese;
	}

	public getEnglish(): string {
		return this.english;
	}

	public getJapanese(): string {
		return this.japanese;
	}
}
