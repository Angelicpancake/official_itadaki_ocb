// represents JSON retrieved from https://jisho.org's api
export interface JishoAPIJSON {
	meta: {
		status: number
	};
	data: [
		{
			slug: string,
			is_common: string,
			tags: [string],
			jlpt: [string],
			japanese: [
				{
					word: string,
					reading: string
				}
			],
			senses: [
				{
					english_definitions: [string],
					parts_of_speech: [string],
					links: {
						text: string,
						url: string
					},
					tags: [string],
					restrictions: [string],
					see_also: [string],
					antonyms: [string],
					source: [string],
					info: [string],
					sentences: [string]
				}
			],
			attribution: {
				jmdict: boolean,
				jmnedict: boolean,
				dbpedia: string
			}
		}
	];
}
