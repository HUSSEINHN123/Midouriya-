const axios = require('axios');
const request = require('request');
const fs = require("fs");

module.exports = {
  config: {
    name: "شوتي",
    aliases: ["shoti3"],
    version: "1.0",
    author: "kshitiz",
    countDown: 20,
    role: 0,
    shortDescription: "فيديوهات لفتيات التيك توك من الفيتنام",
    longDescription: "أنت تحتاج إلى شوتي يا أخي",
    category: "متعة",
    guide: "{pn} شوتي",
  },
  onStart: async function ({ api, event }) {
    axios.get('https://jhunapi.mrbaylon4.repl.co/tiktok/?apikey=Marjhunapi').then(res => {
      let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
      let callback = function () {
        api.sendMessage({
          body: `فيديو فتيات التيك توك الخاص بك تم تحميله إستمتع سينباي !`,
          attachment: fs.createReadStream(__dirname + `/cache/codm.${ext}`)
        }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/codm.${ext}`), event.messageID);
      };

      request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/codm.${ext}`)).on("close", callback);
    }).catch(err => {
      api.sendMessage("[ شوتي ]\nهناك عطب في خلفية برمجة التطبيقات:  قم بإعادة المحاولة لاحقا", event.threadID, event.messageID);
      api.setMessageReaction("❌", event.messageID, (err) => {}, true);
    });
  }
};