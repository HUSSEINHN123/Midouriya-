const a = require('axios');
const tinyurl = require('tinyurl');

module.exports = {
  config: {
    name: "رفع",
    aliases: ["4k", "upscale"],
    version: "1.0",
    author: "JARiF",
    countDown: 15,
    role: 0,
    longDescription: "قم برفع الجودة للصورة معينة.",
    category: "صور",
    guide: {
      en: "{pn} قم بالرد على صورة"
    }
  },

  onStart: async function ({ message, args, event, api }) {
    let imageUrl;

    if (event.type === "message_reply") {
      const replyAttachment = event.messageReply.attachments[0];

      if (["photo", "sticker"].includes(replyAttachment?.type)) {
        imageUrl = replyAttachment.url;
      } else {
        return api.sendMessage(
          { body: "❌ | يجب أن تقوم بالرد على صورة و ليس أي شيء آخر" },
          event.threadID
        );
      }
    } else if (args[0]?.match(/(https?:\/\/.*\.(?:png|jpg|jpeg))/g)) {
      imageUrl = args[0];
    } else {
      return api.sendMessage({ body: "⚠️ | قم بالرد على صورة." }, event.threadID);
    }

    try {
      const url = await tinyurl.shorten(imageUrl);
      const k = await a.get(`https://www.api.vyturex.com/upscale?imageUrl=${url}`);

      message.reply("⏱️ | جاري المعالجة يرجى الإنتظار...");

      const resultUrl = k.data.resultUrl;

      message.reply({ body: "✅ | تم رفع الجودة بنجاح.", attachment: await global.utils.getStreamFromURL(resultUrl) });
    } catch (error) {
      message.reply("❌ | خطأ: " + error.message);
    }
  }
};
