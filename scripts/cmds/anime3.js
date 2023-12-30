const axios = require('axios');

module.exports = {
  config: {
    name: "صورة_لأنمي2",
    version: "1.0",
    author: "Samir Œ",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: 'قم بوضع صورة'
    },
    longDescription: {
      en: 'قم بتحويل وصف صورتك إلى رسمة أو إلى صورة أخرى تمت توليدها بفضل الذكاء الإصطناعي'
    },
    category: "أنمي",
    guide: {
      en: '{pn} الوصف | موديل'
    }
  },

  onStart: async function({ api, event, args }) {
    const imageLink = event.messageReply?.attachments[0]?.url;
    const [prompt, model] = args.join(" ").split("|").map(str => str.trim());
    const defaultModel = '3';

    if (!imageLink || !prompt) {
      return api.sendMessage('أرحوك قم بالرد على الصورة و أكتب وصف متبوعا بهذه الصيغة: الوصف | الموديل', event.threadID, event.messageID);
    }

    const BModel = model || defaultModel;

    const API = `https://artv.odernder.repl.co/api/generateImage?imgurl=${encodeURIComponent(imageLink)}&prompt=${encodeURIComponent(prompt)}&model=${BModel}`;
    
    api.sendMessage(" ⏱️ | جاري توليد الصورة المرجو الإنتظار...✅", event.threadID, event.messageID)
      .then((info) => {
        id = info.messageID;
      });

    try {
      const imageStream = await global.utils.getStreamFromURL(API);

      return api.sendMessage({ attachment: imageStream }, event.threadID, event.messageID);
    } catch (error) {
      console.log(error);
      return api.sendMessage('فشل في إنشاء الصورة.', event.threadID, event.messageID, id);
    }
  }
};