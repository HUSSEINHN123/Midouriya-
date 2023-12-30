let messageCounts = {};
const spamThreshold = 10;
const spamInterval = 60000;
 
module.exports = {
  config: {
    name: "طارد_المزعجين",
    aliases: [],
    version: "1.0",
    author: "Jonell Magallanes & BLUE & kshitiz",
    countDown: 5,
    role: 0,
    shortDescription: "يقوم بطرد المزعجين عند إكتشاف سبام",
    longDescription: "يقوم بطرد المزعجين تلقائيا عند إكتساف سبام",
    category: "المالك",
    guide: "{pn}",
  },
 
  onStart: async function ({ api, event, args }) {
    api.sendMessage("هذا الأمر يقوم بطرد المزعجين عند إكتشاف شخص يرسل رسائل كثيرة و بشكل عشوائي", event.threadID, event.messageID);
  },
 
  onChat: function ({ api, event }) {
    const { threadID, messageID, senderID } = event;
 
    if (!messageCounts[threadID]) {
      messageCounts[threadID] = {};
    }
 
    if (!messageCounts[threadID][senderID]) {
      messageCounts[threadID][senderID] = {
        count: 1,
        timer: setTimeout(() => {
          delete messageCounts[threadID][senderID];
        }, spamInterval),
      };
    } else {
      messageCounts[threadID][senderID].count++;
      if (messageCounts[threadID][senderID].count > spamThreshold) {
        api.sendMessage("🛡️ | تم تحديد سبام (يعني إرسال رسائل كثيرة ) إذا قمت بمعاودة الكرة سوف يتم طردك من المجموعة", threadID, messageID);
        api.removeUserFromGroup(senderID, threadID);
      }
    }
  },
};