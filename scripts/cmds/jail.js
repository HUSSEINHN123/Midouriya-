const axios = require("axios");

module.exports = {
  config: {
    name: "كلمات",
    version: "1.0",
    author: "MILAN",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "Nhận lời bài hát",
      en: "الحصول على كلمات الأغنية"
    },
    longDescription: {
      vi: "Nhận lời bài hát với Hình ảnh của họ",
      en: "الحصول على كلمات الأغنية مع صورهم"
    },
    category: "وسائط",
    guide: {
      en: "{pn} <song name>"
    }
  },
  
  onStart: async function ({ api, event, args, message }) {
    try {
      const lyrics = args.join(' ');
      if (!lyrics) {
        return api.sendMessage("يرجى تقديم اسم الأغنية!", event.threadID, event.messageID);
      }
      const { data } = await axios.get(`https://milanbhandari.imageapi.repl.co/lyrics`, {
        params: {
          query: lyrics 
        }
      });
      const messageData = {
        body: `❏العنوان: ${data.title || ''}\n\n❏الفنان: ${data.artist || ''}\n\n❏الكلمات:\n\n ${data.lyrics || ''}`,
        attachment: await global.utils.getStreamFromURL(data.image)
      };
      return api.sendMessage(messageData, event.threadID);
    } catch (error) {
      console.error(error);
      return api.sendMessage("حدث خطأ أثناء جلب كلمات الأغاني!", event.threadID, event.messageID);
    }
  }
};