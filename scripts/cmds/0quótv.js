const axios = require('axios');
const fs = require('fs');
const path = require('path');

const SAD_QUOTES_API = 'https://api-1.chatbotmesss.repl.co/api/sadquotes1';

const onStart = async ({ api, event }) => {
  try {
    const response = await axios.get(SAD_QUOTES_API);
    const { quote, author } = response.data;

    // ترجمة الرسالة إلى العربية
    const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(quote)}`);
    const translatedQuote = translationResponse.data[0][0][0];

    const imageUrl = 'https://i.imgur.com/tedZnPV.gif';
    const imageFileName = 'img.png';
    const cacheFolderPath = path.join(__dirname, 'cache');
    const imagePath = path.join(cacheFolderPath, imageFileName);

    if (!fs.existsSync(cacheFolderPath)) {
      fs.mkdirSync(cacheFolderPath);
    }

    try {
      const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      fs.writeFileSync(imagePath, Buffer.from(imageResponse.data));
    } catch (error) {
      console.error('Error downloading the image:', error);
      api.sendMessage(" ❌ |حدث خطأ أثناء جلب علامات الاقتباس أو إرسال الصورة.", event.threadID, event.messageID);
      return;
    }

    const message = {
      body: translatedQuote + ' - ' + author,
      attachment: fs.createReadStream(imagePath),
    };

    try {
      await api.sendMessage(message, event.threadID);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    fs.unlinkSync(imagePath);
  } catch (error) {
    console.error('Error fetching quotes or sending the image:', error);
    api.sendMessage("Error fetching quotes or sending the image.", event.threadID, event.messageID);
  }
};

module.exports = {
  config: {
    name: "حزن",
    version: "1.1",
    author: "Samir Œ",
    countDown: 5,
    role: 0,
    shortDescription: "صورة أشخص حزينين مع رسالة",
    longDescription: "حزين مع رسالة حزينة ",
    category: "متعة",
    guide: {
      en: "  {pn}حزين"
    }
  },
  onStart: onStart
};

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Promise Rejection:', error);
});
