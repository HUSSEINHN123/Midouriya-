const axios = require("axios");

module.exports = {
  config: {
    name: "نسخ",
    version: "1.1",
    author: "MILAN",
    countDown: 10,
    role: 0,
    shortDescription: {
      vi: "Chuyển đổi lời nói thành văn bản.",
      en: "يحول الكلام إلى نص."
    },
    longDescription: {
      vi: "Lệnh `transcribe` cho phép bạn trích xuất văn bản từ video hoặc âm thanh. Chỉ cần trả lời âm thanh hoặc video và lệnh sẽ sử dụng API để trích xuất văn bản từ âm thanh hoặc video. Văn bản trích xuất sẽ được gửi lại dưới dạng trả lời tin nhắn của bạn.",
      en: " 'النسخ'يتيح لك الأمر استخراج النصوص من مقاطع الفيديو أو التسجيلات الصوتية. ما عليك سوى الرد على مقطع صوتي أو فيديو، وسيستخدم الأمر واجهة برمجة التطبيقات (API) لاستخراج النص من الصوت أو الفيديو. النص المستخرج سيكون s."
    },
    category: "خدمات",
    guide: {
      vi: "{pn} trả lời âm thanh/video",
      en: "{pn} الرد على الصوت/الفيديو"
    }
  },

  onStart: async function({ event, api, message }) {
    try {
      if (!event.messageReply.attachments || event.messageReply.attachments.length === 0) {
        return message.reply('الرجاء الرد بالصوت أو الفيديو.');
      }

      const link = event.messageReply.attachments[0].url;
      const response = await axios.get(`https://milanbhandari.imageapi.repl.co/transcribe?url=${encodeURIComponent(link)}`);
      const text = response.data.transcript;

      if (text) {
        message.reply({
          body: text
        });
      } else {
        message.reply("فشل في نسخ الصوت أو الفيديو.");
      }
    } catch (error) {
      console.error(error);
      message.reply("حدث خطأ أثناء معالجة الطلب.");
    }
  }
};