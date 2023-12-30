module.exports = {
  config: {
    name: "مجموعة_المطورين",
    version: "1.0",
    author: "Loid Butter",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "قم بأضافة مستخدم إلى المجموعة",
    },
    longDescription: {
      en: "يضيف هذا الأمر المستخدم إلى مجموعة مجمتمع_ربم_البوت التي يريدها المستخدم فقط.",
    },
    category: "المجموعة",
    guide: {
      en: "══════════ஜ۩۞۩ஜ══════════════\n\nلاستخدام هذا الأمر، اكتب ببساطة © مجموعة_المطورين من أجل الإنضمام إلى مجموعة الدعم.\n\n═════════ஜ۩۞۩ஜ════════════",
    },
  },

  // onStart is a function that will be executed when the command is executed
  onStart: async function ({ api, args, message, event }) {
    const supportGroupId = "24330545116559384"; // ID of the support group

    const threadID = event.threadID;
    const userID = event.senderID;

    // Check if the user is already in the support group
    const threadInfo = await api.getThreadInfo(supportGroupId);
    const participantIDs = threadInfo.participantIDs;
    if (participantIDs.includes(userID)) {
      // User is already in the support group
      api.sendMessage(
        "╔══════════ஜ۩۞۩ஜ═════════╗\n\nأنت بالفعل في مجموعة مجمتمع_ريم_البوت. إذا لم تجده، يرجى التحقق من طلبات الرسائل أو صندوق الرسائل غير المرغوب فيها.\n\n╚══════════ஜ۩۞۩ஜ═════════╝",
        threadID
      );
    } else {
      // Add user to the support group
      api.addUserToGroup(userID, supportGroupId, (err) => {
        if (err) {
          console.error("╔═════════ஜ۩۞۩ஜ══════╗\n\nفشلت إضافة مستخدم إلى مجموعة  مجتمع_ريم_البوت :\n\n╚═════════ஜ۩۞۩ஜ═════════╝", err);
          api.sendMessage("╔════════ஜ۩۞۩ஜ═══════╗\n\nلا أستطيع إضافتك لأن هويتك غير مسموح بها لطلب الرسائل أو أن حسابك خاص. الرجاء إضافتي ثم حاول مرة أخرى...\n\n╚═════════ஜ۩۞۩ஜ═══════╝", threadID);
        } else {
          api.sendMessage(
            "╔═══════ஜ۩۞۩ஜ════════╗\n\nلقد تمت إضافتك إلى مجموعة مجتمع_ريم_البوت. إذا لم تجد الصندوق في صندوق الوارد الخاص بك، فيرجى التحقق من طلبات الرسائل أو صندوق البريد العشوائي.\n\n╚════════ஜ۩۞۩ஜ════════╝",
            threadID
          );
        }
      });
    }
  },
};
    