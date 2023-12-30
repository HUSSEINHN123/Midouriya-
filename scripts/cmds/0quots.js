const axios = require('axios');

module.exports = {
  config: {
    name: "إقتباس2",
    aliases: ["aniquote"],
    author: "kshitiz",  
    version: "2.0",
    cooldowns: 5,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: "الحصول على اقتباسات أنيمي مع اسم الأنيمي والشخصيته."
    },
    category: "أنمي",
    guide: {
      en: "{p}{n} إقتباس"
    }
  },
  onStart: async function ({ api, event }) {
    try {
      const response = await axios.get('https://animechan.xyz/api/random');

      const { anime, character, quote } = response.data;

      // Translate anime, character, and quote to Arabic
      const translatedAnime = await translateToArabic(anime);
      const translatedCharacter = await translateToArabic(character);
      const translatedQuote = await translateToArabic(quote);

      const message = `الأنمي  ⛩️: ${translatedAnime}\nالشخصية  😎: ${translatedCharacter}\nالإقتباس  ✨: ${translatedQuote}`;

      api.sendMessage({ body: message }, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      api.sendMessage(" ❌ |حدث خطأ أثناء جلب اقتباس الأنمي.", event.threadID);
    }
  }
};

async function translateToArabic(text) {
  const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(text)}`);
  return translationResponse.data[0][0][0];
}
