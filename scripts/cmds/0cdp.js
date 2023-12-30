const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "تطقيم",
    aliases: ["زوجين"],
    version: "1.0",
    author: "Morgan FreeMan",
    countDown: 60,
    role: 0,
    shortDescription: {
      en: "صور للزوجين",
    },
    longDescription: {
      en: "تطقيم من أجل ولد وبنت",
    },
    category: "متعة",
    guide: {
      en: "{pn}",
    },
  },
  onStart: async function ({ api, event, args }) {
    try {
      const response = await axios.get("https://copel--jcbshc.repl.co/");
      const urls = response.data;

      const url1 = urls.url1;
      const url2 = urls.url2;

      let imgs1 = (
        await axios.get(url1, { responseType: "arraybuffer" })
      ).data;
      fs.writeFileSync(
        __dirname + "/tmp/img1.png",
        Buffer.from(imgs1, "utf-8")
      );

      let imgs2 = (
        await axios.get(url2, { responseType: "arraybuffer" })
      ).data;
      fs.writeFileSync(
        __dirname + "/tmp/img2.png",
        Buffer.from(imgs2, "utf-8")
      );

      const msg = "⚜️|هاهو ذا التطقيم الخاص بك|⚜️";
      const allImages = [
        fs.createReadStream(__dirname + "/tmp/img1.png"),
        fs.createReadStream(__dirname + "/tmp/img2.png"),
      ];

      return api.sendMessage(
        {
          body: msg,
          attachment: allImages,
        },
        event.threadID,
        event.messageID
      );
    } catch (error) {
      console.error(error);
    }
  },
};
