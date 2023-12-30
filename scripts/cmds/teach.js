const axios = require("axios");
 
module.exports = {
  config: {
    name: "علمني",
    aliases: ["علم ميدوريا"],
    version: "1.0",
    author: "Loid Butter",// Big Credits Kay Lods KENLIEPLAYS
    countDown: 5,
    role: 0,
    shortDescription: {
      ar: "قم بتعليم ميدوريا"
    },
    longDescription: {
      ar: "قم بتعليم ميدوريا"
    },
    category: "دردشة",
    guide:{
      ar: "{p}علمني سؤالك | جوابي "
    }
  },
  onStart: async function ({ api, event, args }) {
    const { messageID, threadID, senderID, body } = event;
    const tid = threadID,
          mid = messageID;
    const content = args.join(" ").split("|").map(item => item.trim());
    const ask = encodeURIComponent(content[0]);
    const ans = encodeURIComponent(content[1]);
    if (!args[0]) return api.sendMessage("إستخدم .علمني سؤالك | إجابة ميدوريا", tid, mid);
    const res = await axios.get(`https://simsimi.fun/api/v2/?mode=teach&lang=en&message=${ask}&answer=${ans}`);
    const responseMessage = res.data.success;
    api.sendMessage(responseMessage, tid, mid);
  }
};