const axios = require('axios');
const fs = require('fs-extra');

module.exports = {
  config: {
    name: "تحويل_إلى_أنمي",
    aliases: [],
    version: "1.0",
    author: "kshitiz",
    countDown: 2,
    role: 0,
    shortDescription: "تحويل صورة إلى أنمي",
    longDescription: "تحويل الصورة إلى نمط أنيمي",
    category: "أنمي",
    guide: "{pn} {رد على الصورة}"
  },

  onStart: async function ({ api, event, args }) {
    const { threadID, messageID } = event;

   
    const imageUrl = event.messageReply && event.messageReply.attachments[0].url ? event.messageReply.attachments[0].url : args.join(" ");

    try {

      const response = await axios.get(`https://animeify.shinoyama.repl.co/convert-to-anime?imageUrl=${encodeURIComponent(imageUrl)}`);
      const image = response.data.urls[1];

      
      const imgResponse = await axios.get(`https://www.drawever.com${image}`, { responseType: "arraybuffer" });
      const img = Buffer.from(imgResponse.data, 'binary');

     
      const pathie = __dirname + `/cache/animefy.jpg`;
      fs.writeFileSync(pathie, img);

     
      api.sendMessage({
        body: "هاهي ذي صورتك على شكل أنمي:",
        attachment: fs.createReadStream(pathie)
      }, threadID, () => fs.unlinkSync(pathie), messageID);

    } catch (e) {
      api.sendMessage(`حدث خطأ:\n\n${e}`, threadID, messageID);
    }
  }
};