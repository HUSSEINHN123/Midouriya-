const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "صور",
    author: "حسين يعقوبي",
    aliases: ["image"],
    category: "وسائط",
    shortDescription: {
      en: "احصل على صورة بناءً على إسم صورة البحث",
      vi: "Fetch an image based on the description",
    },
  },
  onStart: async function ({ api, event, args }) {
    const keySearch = args.join(" ");

    // تفاعل مع الرسالة قبل إرسال الصور
    api.setMessageReaction("✅", event.messageID, (err) => {}, true);

    try {
      // استرداد الصور من API
      const pinterestResponse = await axios.get(`https://api-all-1.arjhilbard.repl.co/pinterest?search=${encodeURIComponent(keySearch)}`);
      const data = pinterestResponse.data.data;

      // تحضير الصور وإرسالها
      const imgData = [];
      for (let i = 0; i < 9; i++) {
        const path = __dirname + `/cache/jj${i + 1}.jpg`;
        const imageResponse = await axios.get(data[i], { responseType: 'arraybuffer' });
        fs.writeFileSync(path, Buffer.from(imageResponse.data, 'binary'));
        imgData.push(fs.createReadStream(path));
      }

      // إرسال الصور
      api.sendMessage({
        attachment: imgData,
        body: '[💫] | هذه عمليات البحث ذات الصلة'
      }, event.threadID, (err, info) => {
        if (err) console.error(err);
        // حذف الصور المؤقتة
        for (let i = 0; i < 9; i++) {
          fs.unlinkSync(__dirname + `/cache/jj${i + 1}.jpg`);
        }
      });
    } catch (error) {
      console.error("Error fetching images:", error.message);
      api.sendMessage("حدث خطأ أثناء جلب الصور. يرجى المحاولة مرة أخرى.", event.threadID);
    }
  },
};
