module.exports = {
  config: {
    name: "مكافحة_الخروج",
    version: "1.0",
    author: "Xemon—",
    countDown: 5,
    role: 2,
    shortDescription: "تمكين أو تعطيل مكافحة_الخروج",
    longDescription: "",
    category: "المجموعة",
    guide: "{pn} {{[تشغيل | إيقاف]}}",
    envConfig: {
      deltaNext: 5
    }
  },
  onStart: async function({ message, event, threadsData, args }) {
    let antiout = await threadsData.get(event.threadID, "settings.antiout");
    if (antiout === undefined) {
      await threadsData.set(event.threadID, true, "settings.antiout");
      antiout = true;
    }
    if (!["تشغيل", "إيقاف"].includes(args[0])) {
      return message.reply("أرجوك إستخدم تشغيل أو إيقاف كحجة");
    }
    await threadsData.set(event.threadID, args[0] === "on", "settings.antiout");
    return message.reply(`مكافحة الخروج من المجموعة أصبحت${args[0] === "تشغيل" ? " مفعلة ولن يستطيع أحد الخروح من المجموعة ✅" : " غير مفعلة ويستطيع الاعضاء الخروج من المجموعة ❌"}.`);
  },
  onEvent: async function({ api, event, threadsData }) {
    const antiout = await threadsData.get(event.threadID, "settings.antiout");
    if (antiout && event.logMessageData && event.logMessageData.leftParticipantFbId) {
      // A user has left the chat, get their user ID
      const userId = event.logMessageData.leftParticipantFbId;

      // Check if the user is still in the chat
      const threadInfo = await api.getThreadInfo(event.threadID);
      const userIndex = threadInfo.participantIDs.indexOf(userId);
      if (userIndex === -1) {
        // The user is not in the chat, add them back
        const addUser = await api.addUserToGroup(userId, event.threadID);
        if (addUser) {
          console.log(` ✅ | المستخدم ${userId} قد تمت إعادة إضافته إلى المجموعة.`);
        } else {
          console.log(` ⚠️ |فشل في إعادة إضافة المستخدم ${userId} إلى المجموعة.`);
        }
      }
    }
  }
};