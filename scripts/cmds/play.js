module.exports = {
  config: {
    name: "تشغيل",
    version: "1.0",
    role: 0,
    author: "KSHITIZ",
    cooldowns: 5,
    shortdescription: "قم بتشغيل الموسيقى مع الكلمات",//إستخدم إسم الأغنية الرئيسي 
    longdescription: "قم بتشغل أغانيك المفضلة مع الكلمات عن طريق كتابة إسم الأغنية الرئيسية",
    category: "وسائط",
    usages: "{pn} تشغيل (إسم الأغنية)",
    dependencies: {
      "fs-extra": "",
      "request": "",
      "axios": "",
      "ytdl-core": "",
      "yt-search": ""
    }
  },

  onStart: async ({ api, event }) => {
    const axios = require("axios");
    const fs = require("fs-extra");
    const ytdl = require("ytdl-core");
    const request = require("request");
    const yts = require("yt-search");

    const input = event.body;
    const text = input.substring(12);
    const data = input.split(" ");

    if (data.length < 2) {
      return api.sendMessage("أرجوك قم بإدخال إسم الأغنية", event.threadID);
    }

    data.shift();
    const song = data.join(" ");

    try {
      api.sendMessage(`🕵️‍♂️ | جاري البحث عن الكلمات و الأغنية "${song}".\n⏳ | أرجوك إنتظر...🤍`, event.threadID);

      const res = await axios.get(`https://api.popcat.xyz/lyrics?song=${encodeURIComponent(song)}`);
      const lyrics = res.data.lyrics || "Not found!";
      const title = res.data.title || "Not found!";
      const artist = res.data.artist || "Not found!";

      const searchResults = await yts(song);
      if (!searchResults.videos.length) {
        return api.sendMessage("خطأ: طلب غير صالح.", event.threadID, event.messageID);
      }

      const video = searchResults.videos[0];
      const videoUrl = video.url;

      const stream = ytdl(videoUrl, { filter: "audioonly" });

      const fileName = `${event.senderID}.mp3`;
      const filePath = __dirname + `/cache/${fileName}`;

      stream.pipe(fs.createWriteStream(filePath));

      stream.on('response', () => {
        console.info('[DOWNLOADER]', 'جاري التحمل الآن!');
      });

      stream.on('info', (info) => {
        console.info('[DOWNLOADER]', `جاري التحميل ${info.videoDetails.title} بواسطة ${info.videoDetails.author.name}`);
      });

      stream.on('end', () => {
        console.info('[DOWNLOADER] تم تحميل الأغنية بنجاح ✅');

        if (fs.statSync(filePath).size > 26214400) {
          fs.unlinkSync(filePath);
          return api.sendMessage('[ERR] لا يمكن إرسال الملف لأنه أكبر من 25ميغابايت.', event.threadID);
        }

        const message = {
          body: `❏العنوان: ${title}\n❏الفنان: ${artist}\n\n❏الكلمات: ${lyrics}`,
          attachment: fs.createReadStream(filePath)
        };

        api.sendMessage(message, event.threadID, () => {
          fs.unlinkSync(filePath);
        });
      });
    } catch (error) {
      console.error('[ERROR]', error);
      api.sendMessage('أعد المحاولة لاحقا > خطأ.', event.threadID);
    }
  }
};