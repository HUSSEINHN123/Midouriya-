const axios = require('axios');

module.exports = {
  config: {
    name: "تخيل",
    version: "1.1",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: 'وصف إلى صورة'
    },
    longDescription: {
      en: "وصف إلى صورة"
    },
    category: "الذكاء الإصطناعي",
    guide: {
      en: 'اكتب {pn} نماذج للحصول على النماذج المتاحة'
    } // too lazy to add them here
  },

  onStart: async function ({ message, args, api, event }) {
    if (args[0] === "نماذج") {
      axios.get("https://prodia.jsus-sus.repl.co/models").then((res) => message.reply(res.data))
      return;
    }

    const text = args.join(" ");
    if (!text) {
      return message.reply(" ⚠️ |الرجاء تقديم نص الوصف");
    }

    // إضافة جزء الترجمة
    const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=ar&tl=en&dt=t&q=${encodeURIComponent(text)}`);
    const translation = translationResponse.data[0][0][0];

    let prompt, model;
    if (translation.includes("|")) {
      const [promptText, modelText] = translation.split("|").map((str) => str.trim());
      prompt = promptText;
      model = modelText;
    } else {
      prompt = translation;
      model = "31";  
    }

    try {
      let Send = await api.sendMessage(` ⏱️ | جاري معالجة الوصق اللذي قدمته يرجى الإنتظار... `, event.threadID);
      const API = await axios.get(`https://prodia.jsus-sus.repl.co/generate?txt=${prompt}&model=${model}&user=${event.senderID}`);
      const imageStream = await global.utils.getStreamFromURL(API.data.image_link);
      return message.reply({
        attachment: imageStream
      });
    } catch (error) {
      console.log(error);
      message.reply("فشل.");
      await api.unsendMessage(Send);
    }
  }
};
