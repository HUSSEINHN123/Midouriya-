const axios = require('axios');
const fs = require('fs-extra');

module.exports = {
  config: {
    name: "أرسم",
    aliases: ["صورة"],
    category: "الذكاء الإصطناعي",
    role: 0,
    shortDescription: {
      en: "سيتم رسم كل ما تقوله على شكل لوحة فنية بإستخدام الذكاء الإصطناعي",
      vi: "احصل على صورة بناءً على الوصف"
    },
    longDescription: {
      en: "احصل على صورة بناءً على الوصف",
      vi: "احصل على صورة بناءً على الوصف"
    },
    guide: {
      en: "{p}أرسم <الوصف>",
      vi: "{p}imaginate <الوصف>"
    },
  },

  onStart: async function ({ api, event, args }) {
    const description = args.join(" ");

    if (!description) {
      return api.sendMessage("😡 | الرجاء تقديم وصف للحصول على الصورة.", event.threadID);
    }

    const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=ar&tl=en&dt=t&q=${encodeURIComponent(description)}`);
    const translation = translationResponse.data[0][0][0];

    api.setMessageReaction("⏱️", event.messageID, () => {}, true);

    api.sendMessage({
      body: " ⏱️ | جارٍ الأنشاء، الرجاء الانتظار."
    }, event.threadID, async (err, info) => {
      const puti = "2";
      const baseURL = `https://sdxl.otinxsandeep.repl.co/sdxl?prompt=${translation}&model=${puti}`;

      api.sendMessage({
        attachment: await global.utils.getStreamFromURL(baseURL)
      }, event.threadID, () => api.unsendMessage(info.messageID));
    });
  },

  onChat: async function ({ event, api }) {
    // Process user messages here based on your command's needs.
  },

  onReply: async function ({ event, api }) {
    // Process user replies to sent messages here.
  }
};
