const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "تيك",
    version: "2.0",
    author: "kshitiz",
    countDown: 20,
    role: 0,
    shortDescription: "البحث عن الفيديوهات في التيك توك",
    longDescription: {
      en: "البحث عن فيديو بالإعتماد على كلمة البحث."
    },
    category: "وسائط",
    guide: {
      en: "{pn} <نص البحث>"
    }
  },

  onStart: async function ({ api, event, args, message }) {
    const searchQuery = args.join(" ");

    if (!searchQuery) {
      api.sendMessage("كيفية الإستخدام: {pn} <نص البحث>", event.threadID);
      return;
    }

    let searchMessageID;

    api.sendMessage(" ⏱️ | جاري البحث عن الفيديو يرجى الإنتظار...", event.threadID, (err, messageInfo) => {
      searchMessageID = messageInfo.messageID;
    });

    try {
      const apiUrl = `https://hiroshi.hiroshiapi.repl.co/tiktok/searchvideo?keywords=${encodeURIComponent(searchQuery)}`;

      const response = await axios.get(apiUrl);
      const videos = response.data.data.videos;

      if (!videos || videos.length === 0) {
        api.sendMessage(" ⚠️ |لم يتم إيجاد أي فيديو للكلمة البحث .", event.threadID);
      } else {
        const videoData = videos[0];
        const videoUrl = videoData.play;
        const message = `تم النشر من طرف: ${videoData.author.unique_id}`;
        const filePath = path.join(__dirname, `/cache/tiktok_video.mp4`);
        const writer = fs.createWriteStream(filePath);

        const videoResponse = await axios({ method: 'get', url: videoUrl, responseType: 'stream' });
        videoResponse.data.pipe(writer);

        writer.on('finish', async () => {
          // Reply with the video as an attachment
          await api.sendMessage({
            body: message,
            attachment: fs.createReadStream(filePath)
          }, event.threadID, event.messageID); // Send as a reply to the triggering message

          fs.unlinkSync(filePath);

          if (searchMessageID) {
            api.unsendMessage(searchMessageID);
          }
        });
      }
    } catch (error) {
      console.error('Error:', error);
      api.sendMessage(" ❌ |حدث خطأ أثناء معالجة الطلب.", event.threadID);
      if (searchMessageID) {
        api.unsendMessage(searchMessageID);
      }
    }
  }
};