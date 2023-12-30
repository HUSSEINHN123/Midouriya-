const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "بانتريس", 
    aliases: ["pin"], 
    version: "1.0.2", 
    author: "KSHITIZ", 
    role: 0,
    countDown: 5,
    shortDescription: {
      en: "قم بالبحث عن الصور لإستخدام بانتريسt"
    }, 
    longDescription: {
      en: ""
    }, 
    category: "بحث", 
    guide: {
      en: "{prefix}بانتريس <كلمة البحث> -<عدد الصور>"
    }
  }, 

  onStart: async function({ api, event, args }) {
    try {
      const keySearch = args.join(" ");
      if (!keySearch.includes("-")) {
        return api.sendMessage(` ⚠️ |الرجاء إدخال إسم المراد البحث عنه وعدد الصور المراد ظهورها بهذا التنسيق: ${config.guide.en}\nمثال ©بانتريس لوفي - 10`, event.threadID, event.messageID);
      }

      // Translate the search query from Arabic to English
      const translatedSearch = await translateToEnglish(keySearch);
      
      const keySearchs = translatedSearch.substr(0, translatedSearch.indexOf('-')).trim();
      const numberSearch = parseInt(translatedSearch.split("-").pop().trim()) || 6;

      const res = await axios.get(`https://api-dien.kira1011.repl.co/pinterest?search=${encodeURIComponent(keySearchs)}`);
      const data = res.data.data;
      const imgData = [];

      for (let i = 0; i < Math.min(numberSearch, data.length); i++) {
        const imgResponse = await axios.get(data[i], { responseType: 'arraybuffer' });
        const imgPath = path.join(__dirname, 'cache', `${i + 1}.jpg`);
        await fs.outputFile(imgPath, imgResponse.data);
        imgData.push(fs.createReadStream(imgPath));
      }

      await api.sendMessage({
        attachment: imgData,
        body: ` 🔖  إليك أفضل ${imgData.length} صورة نتيجة ل "${keySearchs}":`
      }, event.threadID, event.messageID);

      await fs.remove(path.join(__dirname, 'cache'));
    } catch (error) {
      console.error(error);
      return api.sendMessage(` ⚠️ |أرجوك قم بإدخالها مثل هذا التنسيق ©بانتريس إسم الشيء المراد البحث عنها - عدد الصور اللتي نريد ان تظهر يعتمد الأمر على عدد الصور اللتي تريد أن تظهر ،  مثال : بانتريس - لوفي - 10`, event.threadID, event.messageID);
    }
  }
};

async function translateToEnglish(txt) {
  try {
    const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=ar&tl=en&dt=t&q=${encodeURIComponent(txt)}`);
    const translatedText = translationResponse.data[0][0][0];
    return translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    return txt; // Return the original text in case of an error
  }
}
