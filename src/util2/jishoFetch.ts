import { JishoAPIJSON } from './jishoAPIJSON.js';

export default async function jishoFetch (kanji: string) {
  try {
    const jishoData = await( fetch(`https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(kanji)}`) );
    const jishoJSON: JishoAPIJSON = await jishoData.json();

    //Array of objects, word can be accessed through .japanese[0].word[0]
    const jishoObjArray = jishoJSON.data;

    //japanese word as key, string array holding english definitions as value
    const japaneseToEnglishMap: Record<string, string[]> = {};
    //go through each object and create a string array holding the english defintions of the word
    
    jishoObjArray.forEach((object) => {

      if(!(object.is_common)){
        //if word is not common, skip to next iteration
        return;
      }

      const currWord = object.japanese[0].word;

      let englishDefinitionArray: string[] = [];

      object.senses.forEach((sensesObject) => {
        //skips uncommon words
        let uncommonWord = false;

        const uncommonTags: Array<string> = [
          "Obsolete",
          "Rare",
          "Dialect",
          "Technical",
          "Obscure",
          "Historical",
          "Archaic",
          "Exotic",
          "Exotic Names",
          "Obsolete Kanji",
          "Slang",
          "Archaic",
        ];
        
        //looks through objects for tags in uncommonTags, if found skip definitions
        if(sensesObject.tags){
          sensesObject.tags.forEach((tagsArray) => {

            uncommonTags.forEach((tag) => 
            {
              if(tagsArray.includes(tag)){
                if(uncommonWord)
                  return;

                uncommonWord = true;
                return;
              }
            });

            if(uncommonWord)
              return;
          });
        }
        
        if(uncommonWord)
          return;
        
        for(let i = 0; i < sensesObject.english_definitions.length; i++)
        {
          sensesObject.english_definitions[i] = cleanWord(sensesObject.english_definitions[i]).toLowerCase();
        }
        //add on english definitions for word to array
        englishDefinitionArray = englishDefinitionArray.concat(sensesObject.english_definitions);
      })

      japaneseToEnglishMap[currWord] = englishDefinitionArray;
    });

    // console.log(japaneseToEnglishMap);

    return japaneseToEnglishMap;

  } catch (error) {
    console.error(error);
  }
}

// weird function that finds a single kanji using character ascii value things
// export async function fetchSingleKanji(): Promise<string[]> {
//   const singleKanji: string[] = [];
//   const kanjiSet = new Set<string>();
//
//   while (kanjiSet.size < 7) {
//     const randomCodePoint = Math.floor(0x4E00 + Math.random() * (0x9FFF - 0x4E00)); // Range for CJK Unified Ideographs
//     const randomKanji = String.fromCharCode(randomCodePoint);
//
//     try {
//       const response = await fetch(`https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(randomKanji)}`);
//       const data = await response.json();
//
//       if (data.length >= 5 && randomKanji.length === 1) {
//         kanjiSet.add(randomKanji);
//       }
//     } catch (error) {
//       console.error('Error fetching from Jisho API:', error);
//     }
//   }
//
//   return Array.from(kanjiSet);
// }
function cleanWord(word: string): string {
  //typescript stuff for searching for patterns in strings
  //removes all occurences of parantheses and removes trailing spaces
  return word.replace(/\(.*?\)/g, '').trim();
}

export function randomKanji () {
  const usefulKanji = [
  "日", "月", "火", "水", "木", "金", "土", "人", "先", "生",
  "学", "校", "時", "年", "本", "上", "下", "左", "右", "中",
  "大", "小", "長", "高", "安", "新", "古", "白", "黒", "赤",
  "青", "多", "少", "行", "来", "食", "飲", "見", "話", "聞",
  "買", "休", "走", "友", "何", "名", "国", "車", "電", "駅",
  "店", "社", "家", "父", "母", "兄", "弟", "姉", "妹", "子",
  "男", "女", "彼", "私", "自", "道", "天", "気", "雨", "雪",
  "風", "花", "海", "川", "山", "森", "町", "村", "都", "京",
  "旅", "駅", "船", "空", "飛", "会", "住", "使", "作", "動",
  "話", "読", "書", "聞", "言", "思", "知", "売", "買", "帰",
  "始", "終", "楽", "歌", "英", "薬", "病", "院", "通", "働"
  ];

  let randomKanjiArray: Array<string> = {};
  let selected: Array<number> = {};
  let count = 0;

  while(randomKanjiArray.size < 7)
  {
    const selection = Math.floor(Math.random() * 50);
    if(!(selected.includes(selection)))
    {
      selected[count] = selection;
      randomKanjiArray[count] = usefulKanji[selection];
      ++count;
    }
    else
    {
      continue;
    }
  }

  return randomKanjiArray;
}
