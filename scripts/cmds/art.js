const axios = require("axios");

module.exports = {
 config: {
 name: "فن",
 role: 0,
 author: "OtinXSandip",
 countDown: 5,
 longDescription: "صور أنمي",
 category: "الذكاء الإصطناعي",
 guide: {
 en: "${pn} قم بالرد على الصور و إختار واحد من الموديل 1 - 52"
 }
 },
 onStart: async function ({ message, api, args, event }) {
 const text = args.join(' ');
 
 if (!event.messageReply || !event.messageReply.attachments || !event.messageReply.attachments[0]) {
 return message.reply("Image URL is missing.");
 }

 const imgurl = encodeURIComponent(event.messageReply.attachments[0].url);

 const [prompt, model] = text.split('|').map((text) => text.trim());
 const puti = model || "37";
 
 api.setMessageReaction("⏰", event.messageID, () => {}, true);
 const lado = `https://sandyapi.otinxsandeep.repl.co/art?imgurl=${imgurl}&prompt=${encodeURIComponent(prompt)}&model=${puti}`;

 message.reply(" ⏱️ | جاري معالجة الصورة يرجى الإنتظار......", async (err, info) => {
 const attachment = await global.utils.getStreamFromURL(lado);
 message.reply({
 attachment: attachment
 });
 let ui = info.messageID; 
 message.unsend(ui);
 api.setMessageReaction("✅", event.messageID, () => {}, true);
 });
 }
};