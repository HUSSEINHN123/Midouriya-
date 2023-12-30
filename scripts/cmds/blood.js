const axios = require("axios");

module.exports = {
config: {
		name: "دم",
    version: "1.0",
		author: "Samir",
		countDown: 5,
		role: 0,
		shortDescription: "اكتب نصًا دمويًا من خلال textpro.me",
		longDescription: "كتابة النص الدموي من خلال textpro.me",
		category: "أخرى",
		guide: {
      en: "{p}{n} الإدخال",
    }
	},

 onStart: async function ({ api, event, args, message }) {
 try { 
 const samir = args.join(' ');
 const response = await axios.get(`https://tanjiro-api.onrender.com/textpro?text=${samir}&&link=https://textpro.me/blood-text-on-the-frosted-glass-941.html&api_key=tanjiro`);

 const message = {attachment:await global.utils.getStreamFromURL(response.data.result)};
 return api.sendMessage(message, event.threadID);
 } catch (error) {
 console.error(error);
 message.reply("حدث خطأ أثناء جلب الرد");
 }
 }
};