const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "شعار2",
    version: "2.0",
    author: "kshitiz",
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: {
      en: ""
    },
    category: "خطوط",
    guide: {
      en: "{pn} شعار2 آيدي|نص|نص"
    }
  },

  onStart: async function ({ api, event, args, message }) {
    const { threadID, messageID, senderID, body } = event;
    const content = args.join(" ").split("|").map(item => item.trim());
    let text1 = encodeURI(content[2]);
    let text = encodeURI(content[1]);
    let num = parseInt(content[0]);

   
    if (!text || !text1 || !num || isNaN(num)) {
      return api.sendMessage("[!] مدخل غير صالح. يرجى تقديم معرف صالح والنص.", event.threadID, event.messageID);
    }

    if (num > 882) {
      return api.sendMessage("[!] الحد الأقصى للمعرف هو 882 فقط.", event.threadID, event.messageID);
    }

    api.sendMessage(" ⏱️ | جارى المعالجة .. انتظر من فضلك..", event.threadID, event.messageID);

  
    var callback = () => {
      api.sendMessage({ body: "", attachment: fs.createReadStream(__dirname + "/cache/avt1.png") }, event.threadID, () => {
        
        fs.unlinkSync(__dirname + "/cache/avt1.png");
      }, event.messageID);
    };

   
    return axios
      .get(`https://sakibin.sinha-apiv2.repl.co/taoanhdep/avatarwibu?id=${num}&chu_nen=${text1}&chu_ky=${text}`, {
        responseType: "stream"
      })
      .then(response => {
      
        response.data.pipe(fs.createWriteStream(__dirname + '/cache/avt1.png'))
          .on('close', () => callback());
      })
      .catch(error => {
        console.error("Error fetching image:", error);
        api.sendMessage("[!] حدث خطأ أثناء معالجة الطلب.", event.threadID, event.messageID);
      });
  }
};