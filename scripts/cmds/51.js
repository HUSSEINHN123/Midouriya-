const axios = require('axios');

module.exports = {
 config: {
 name: "إيمجور",
 aliases: ["Imgur"],
 version: "1.0",
 author: "Shinpei",
 countDown: 5,
 role: 0,
 shortDescription: {
 en: "قم برفع صورة و تحويلها"
 },
 longDescription: {
 en: "قم برفع صورة وتحويلها إلى إيمغور"
 },
 category: "خدمات",
 guide: {
 en: ""
 }
 },

 onStart: async function ({ api, event }) {
 const linkanh = event.messageReply?.attachments[0]?.url;
 if (!linkanh) {
 return api.sendMessage('المرجو الرد على الصورة.', event.threadID, event.messageID);
 }

 try {
 const res = await axios.get(`https://api.reikomods.repl.co/others/imgur?link=${encodeURIComponent(linkanh)}`);
 const juswa = res.data.uploaded.image;
 return api.sendMessage(juswa, event.threadID, event.messageID);
 } catch (error) {
 console.log(error);
 return api.sendMessage('فشل تحويل الصورة إلى إيمجور.', event.threadID, event.messageID);
 }
 }
};