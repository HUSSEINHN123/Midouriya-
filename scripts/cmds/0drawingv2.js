const fs = require("fs");
const axios = require("axios");

module.exports = {
  config: {
    name: "أرسم2",
    aliases: [],
    author: "kshitiz & arjhil",
    version: "2.0",
    cooldowns: 5,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: "قم بإنشاء لوحات فنية عن طريق الذكاء الإصطناعي"
    },
    category: "الذكاء الإصطناعي",
    guide: {
      en: "[كلمات الوصف | النموذج]"
    }
  },
  onStart: async function ({ api, event, args }) {
    try {
      let text = args.join(" ");

      // Translate text from Arabic to English
      const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=ar&tl=en&dt=t&q=${encodeURIComponent(text)}`);
      const translation = translationResponse.data[0][0][0];

      const prompt = translation.substr(0, translation.indexOf(' | '));
      const model = translation.split(" | ").pop();

      if (!prompt || !model) {
        return api.sendMessage(' ⚠️ | أرجوك قم بإدخال كلمات الوصف.', event.threadID);
      }

      const encodedPrompt = encodeURIComponent(prompt);

      const loadingMessage = ' ⏱️ | جاري معالجة الرسمة المرجو الإنتظار...';
      api.sendMessage(loadingMessage, event.threadID, event.messageID);

      const providedURL = `https://arjhil-prodia-api.arjhilbard.repl.co/sdxl/generate?prompt=${encodedPrompt}&model=${model}`;

      const response = await axios.get(providedURL, { responseType: 'stream' });

      api.sendMessage({
        attachment: response.data,
      }, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      api.sendMessage(' ❌ |حدث خطأ أثناء معالجة أمر .', event.threadID);
    }
  }
};
