const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "أنمي2",
    version: "1.0",
    author: "SiAM",
    countDown: 5,
    role: 0,
    shortDescription: "قم بالحصول على مقاطع أنمي ",
    longDescription: "البوت سيرسل لك مقاطع أنمي فخمة",
    category: "أنمي",
    guide: "لاستخدام هذا الأمر، اكتب ببساطة {pn}"
  },

  onStart: async function ({ api, args, message }) {
    try {
      const response = await axios.get("https://caochungdat.me/docs/other/videoanime");
      const videoUrl = response.data.url;
      const buffer = await axios.get(videoUrl, { responseType: "arraybuffer" });
      const time = Date.now();
      fs.writeFileSync(`${time}_anime.mp4`, buffer.data);
      message.reply({
        body: ` ✨ | مقاطع أنمي فخمة  🎉`,
        attachment: fs.createReadStream(`${time}_anime.mp4`)
      }, () => fs.unlinkSync(`${time}_anime.mp4`));
    } catch (error) {
      console.error(error);
      message.reply(` ❌ |عذرًا، واجهة برمجة التطبيقات لا تستجيب. حاول مرة أخرى لاحقًا...`);
    }
  }
};