const fs = require("fs")
const jimp = require("jimp")
module.exports = {
  config: {
    name: "زواج2",
    aliases: ["ترابط"],
    version: "1.0",
    author: "Samuel",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "ابحث عن زوج عشوائي في مجموعتك."
    },
    longDescription: {
      en: "استخدم هذا الأمر لمطابقة شخصين بشكل عشوائي في مجموعتك."
    },
    category: "حب",
    guide: {
      en: "لاستخدام هذا الأمر، ما عليك سوى كتابة ©زواج2 أو ©ترابط في الدردشة. سيقوم البوت باختيار شخصين عشوائيًا في المجموعة ويعرض أسمائهم."
    }
  },
  onStart: async function ({ api, event, args }) {
    // Get a list of group members
    const groupMembers = await api.getThreadInfo(event.threadID, true);
    // Filter out the bot's ID and any inactive members
    const activeMembers = groupMembers.participantIDs.filter((id) => id !== api.getCurrentUserID() && groupMembers.nicknames[id] !== null);
    // Choose two random members from the active members list
    const pair = [];
    for (let i = 0; i < 2; i++) {
      const randomIndex = Math.floor(Math.random() * activeMembers.length);
      pair.push(activeMembers.splice(randomIndex, 1)[0]);
    }
    // Get the nicknames of the selected members
    const nicknames = pair.map((id) => groupMembers.nicknames[id]);
    // Display the pair in the chat
    const name1 = nicknames[0];
    const name2 = nicknames[1];
    const attachment = await global.utils.getStreamFromURL("avatar");
    api.sendMessage({ body: ` الزوجين للوم هما ${name1} و ${name2}`, attachment }, event.threadID);
  }
};