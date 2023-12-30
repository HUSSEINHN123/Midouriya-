const axios = require("axios");

module.exports = {
  config: {
    name: "حزن2",
    aliases: ["sad quote"],
    version: "1.0",
    author: "RICKCIEL X KSHITIZ",
    countDown: 5,
    role: 0,
    shortDescription: "إقتباسات حزينة",
    longDescription: {
      en: "قم بالحصول على إقتباسات حزينة 😥.",
    },
    category: "متعة",
    guide: {
      en: "{prefix}حزين",
    },
  },

  onStart: async function ({ api, event }) {
    try {
      const response = await axios.get("https://api-1.chatbotmesss.repl.co/api/sadquotes1");
      const { quote, author } = response.data;

      // ترجمة الاقتباس من الإنجليزية إلى العربية
      const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(quote)}`);
      const translatedQuote = translationResponse.data[0][0][0];

      const message = ` ${translatedQuote}`;
      return api.sendMessage(message, event.threadID);
    } catch (error) {
      console.error(error);
    }
  },
};
