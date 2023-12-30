const axios = require("axios");
const fs = require("fs");
const os = require("os");
const path = require("path");

const sentVideos = new Map();

const groupNames = {
  mxm: "1544123312616479",
  prettysouls: "579133843242227", 
  youngkid: "1386387971848529",
  managementmeme: "1218970378693117",
  relatable: "456847926569537",
  literally: "942254986938304",
  sigma: "742398074285793",
  lev: "254180353715899",
  usbhaius: "351478143529525",
  uss: "1249388862279187",
  corny:"522569259482390",
};

module.exports = {
  config: {
    name: "مقطع",
    aliases: ["fbgroup"],
    version: "1.0",
    role: 0,
    author: "𝗞𝘀𝗵𝗶𝘁𝗶𝘇",
    shortDescription: "يرسل فيديو عشوائي من مجموعة الفيسبوك",
    longDescription: "يرسل فيديوهات عشوائية من مجموعة الفيسبوك",
    category: "وسائط",
    dependencies: {
      axios: "",
    },
  },
  onStart: async function ({ api, event, args }) {
    try {
      const triggerMessageID = event.messageID;
      const loadingMessage = await api.sendMessage(
        " ⏱️ | جاري معالجة الطلب يرجى الإنتظار.....",
        event.threadID
      );

      const groupName = args[0] ? args[0].toLowerCase() : null;

      if (!groupName || !groupNames[groupName]) {
        const availableGroups = Object.keys(groupNames).join(", ");
        return api.sendMessage(` ⚠️ |إسم المجموعة ذاك غير موجود. المجموعات المتاحة: ${availableGroups}`, event.threadID, event.messageID);
      }

      const groupId = groupNames[groupName];
      const accessToken = "EAAD6V7sHVCeVL4E8QNT7Wt9dLJ8ZC1v35N4hVZ7ekJw2tfO2BwSL9thL1XYs8aaYLi7iD0LWHWCvffpUUN09eaT3SQoygLPuV2VAVALcPZLI7SZOPf6J9pvnjGXyqUfBrXtkQGZoqk2l0dHQ6VDKI5u6DPNUI3MmMHw0E89E0eUiz7zgVvaV2kQvJ51kHd8sneiXBWLPo8lzlKpg3JUeNhUzJ7E0Vp4eZf8E1xRmldJ33tyIg4r3a3jLwUOBNXI6tikbk";
      const apiVersion = "v18.0";

      const groupUrl = `https://graph.facebook.com/${apiVersion}/${groupId}/feed?access_token=${accessToken}&fields=attachments{url,type},source`;
      const response = await axios.get(groupUrl);
      const posts = response.data.data || [];
      const videos = posts
        .filter((post) => post.source && typeof post.source === "string")
        .map((post) => post.source);

      if (videos.length === 0) {
        await api.sendMessage(
          ` ❓ |لم يتم العثور على روابط فيديو بالنسبة للمجموعة ${groupName}.`,
          event.threadID,
          loadingMessage.messageID
        );
      } else {
        const unsentVideos = videos.filter(video => !isVideoSent(groupName, video));

        if (unsentVideos.length === 0) {
          await api.sendMessage(
            ` ⚠️ | كل الفيديوهات من المجموعة ${groupName} قد تم إرسالها.`,
            event.threadID,
            loadingMessage.messageID
          );
        } else {
          const randomVideo =
            unsentVideos[Math.floor(Math.random() * unsentVideos.length)] + "&dl=1";

          const tempDir = path.join(os.tmpdir(), "fb_videos");
          if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
          }

          const randomFileName = `video_${Date.now()}.mp4`;

          const filePath = path.join(tempDir, randomFileName);

          const videoResponse = await axios({
            method: "GET",
            url: randomVideo,
            responseType: "stream",
          });

          videoResponse.data.pipe(fs.createWriteStream(filePath));

          videoResponse.data.on("end", async () => {
            if (fs.existsSync(filePath)) {
              await api.sendMessage(
                {
                  body: ` ✅ | فيديو من مجموعة ${groupName}:`,
                  attachment: fs.createReadStream(filePath),
                },
                event.threadID,
                triggerMessageID
              );

              markVideoAsSent(groupName, randomVideo);

              api.unsendMessage(loadingMessage.messageID);
            } else {
              console.error("File does not exist:", filePath);

              await api.sendMessage(
                " ❌ |حدث خطأ أثناء جلب الفيديو. الرجاء معاودة المحاولة في وقت لاحق.",
                event.threadID
              );
            }
          });

          videoResponse.data.on("error", async (err) => {
            console.error("Error during video download:", err);
            await api.sendMessage(
              " ❌ |حدث خطأ أثناء جلب الفيديو. الرجاء معاودة المحاولة في وقت لاحق.",
              event.threadID
            );

            api.unsendMessage(loadingMessage.messageID);
          });
        }
      }
    } catch (error) {
      console.error("Error retrieving videos:", error);
      await api.sendMessage(" ❌ |حدث خطأ أثناء استرداد مقاطع الفيديو.", event.threadID);
    }
  },
};

function isVideoSent(groupName, videoLink) {
  return sentVideos.has(groupName) && sentVideos.get(groupName).has(videoLink);
}

function markVideoAsSent(groupName, videoLink) {
  if (!sentVideos.has(groupName)) {
    sentVideos.set(groupName, new Set());
  }
  sentVideos.get(groupName).add(videoLink);
}