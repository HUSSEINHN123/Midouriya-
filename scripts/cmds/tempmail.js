const axios = require('axios');

module.exports.config = {
  name: "بريد_مؤقت",
aliases: ["tm"],
  version: "1.0",
  role: 0,
  countdown: 5,
  author: "kshitiz",
  usePrefix: true,
  description: "قم بإنشاء بريد مؤقت",
  category: "وسائط",
};

const TEMP_MAIL_URL = 'https://tempmail-api.codersensui.repl.co/api/gen';

module.exports.onStart = async ({ api, event, args }) => {
  try {
    if (args[0] === 'صندوق_الورائد') {
      if (!args[1]) {
        return api.sendMessage("❌ المرجو إدخال البريد الالكتروني من أجل رؤية محتواه في صندوق الورائد.", event.threadID);
      }
      
      const emailAddress = args[1];
      const inboxResponse = await axios.get(`https://tempmail-api.codersensui.repl.co/api/getmessage/${emailAddress}`);
      const messages = inboxResponse.data.messages;

      if (!messages || messages.length === 0) {
        return api.sendMessage(`لم يتم إيحاد أي رسالة بالنسبة ل ${emailAddress}.`, event.threadID);
      }

      let messageText = '📬 رسائل من صندوق الورائد: 📬\n\n';
      for (const message of messages) {
        messageText += `📩 المرسل: ${message.sender}\n`;
        messageText += `👀 الموضوع: ${message.subject || '👉 لا يوحد أي موضوع'}\n`;
        messageText += `📩 الرسالة: ${message.message.replace(/<style([\s\S]*?)<\/style>|<script([\s\S]*?)<\/script>|<\/div>|<div>|<[^>]*>/gi, '')}\n\n`;
      }

      api.sendMessage(messageText, event.threadID);
    } else {
      const tempMailResponse = await axios.get(TEMP_MAIL_URL);
      const tempMailData = tempMailResponse.data;

      if (!tempMailData.email) {
        return api.sendMessage("❌ فشل في إنشاء بريد إلكتروني مؤقت.", event.threadID);
      }

      api.sendMessage(`📩 إليك بريدك الإلكتروني المؤقت الذي تم إنشاؤه: ${tempMailData.email}`, event.threadID);
    }
  } catch (error) {
    console.error('Error:', error);
    api.sendMessage("لم يتم العثور على رسائل في البريد الإلكتروني الحالي).", event.threadID);
  }
};