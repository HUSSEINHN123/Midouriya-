const axios = require("axios");
const request = require("request");
const fs = require("fs");

module.exports = {
  config: {
    name: "شوتي2",
    aliases: [],
    version: "1.0",
    author: "kshitiz",
    countDown: 20,
    role: 0,
    shortDescription: "شوتي",
    longDescription: "أنت تحتاح إلى شوتي",
    category: "متعة",
    guide: "{pn} شوتي",
  },
  onStart: async function ({ api, event, message }) {
    try {
      
      message.reply(" ⏱️ | جاري تحميل الفيديو يرجى الإنتظار 👩‍🦰...");

      const response = await axios.post("https://api--v1-shoti.vercel.app/api/v1/get", {
        apikey: "$shoti-1hea201h70g1ms5cgh8",
      });

      const file = fs.createWriteStream(__dirname + "/cache/shoti.mp4");

      const rqs = request(encodeURI(response.data.data.url));
      rqs.pipe(file);

      file.on("finish", async () => {
        
        await api.sendMessage(
          {
            body: `@${response.data.data.user.username}`,
            attachment: fs.createReadStream(__dirname + "/cache/shoti.mp4"),
          },
          event.threadID,
          event.messageID
        );
      });

      file.on("error", (err) => {
        api.sendMessage(`خطأ في شوتي: ${err}`, event.threadID, event.messageID);
      });
    } catch (error) {
      api.sendMessage("حدث خطأ أثناء إنشاء الفيديو:" + error, event.threadID, event.messageID);
    }
  },
};