const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs")


module.exports = {
 config: {
 name: "قبر",
 aliases: ["تابوت"],
 version: "1.0",
 author: "Upen Basnet",
 countDown: 5,
 role: 0,
 shortDescription: "قم بالترحم على أحد الاعضاء",
 longDescription: "",
 category: "متعة",
 guide: "{pn} قبر"
 },



 onStart: async function ({ message, event, args }) {
 const mention = Object.keys(event.mentions);
 if (mention.length == 0) return message.reply(" ⚠️ | المرجو عمل @منشن لشخص ما");
 else if (mention.length == 1) {
 const one = event.senderID, two = mention[0];
 bal(one, two).then(ptth => { message.reply({ body: "كان شخصا جيد 😥\nالله يرحمو 🙂", attachment: fs.createReadStream(ptth) }) })
 } else {
 const one = mention[1], two = mention[0];
 bal(one, two).then(ptth => { message.reply({ body: "كان شخصا جيد 😥\nالله يرحمو 🙂", attachment: fs.createReadStream(ptth) }) })
 }
 }


};

async function bal(one, two) {

 let avone = await jimp.read(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)
 avone.circle()
 let avtwo = await jimp.read(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)
 avtwo.circle()
 let pth = "rip.png"
 let img = await jimp.read("https://i.imgur.com/A4quyh3.jpg")

 img.resize(1080, 1350).composite(avone.resize(360, 360), 8828282, 2828).composite(avtwo.resize(450, 450), 300, 660);

 await img.writeAsync(pth)
 return pth
   }