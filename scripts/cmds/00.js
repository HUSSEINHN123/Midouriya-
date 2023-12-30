module.exports = {
  config: {
    name: "ايدي",
    version: "1.0",
    author: "حسين يعقوبي",
    countDown: 60,
    role: 0,
    shortDescription: "قم بالحصول على معلومات المستخدمين مع تحديد تصنيفهم",
    longDescription: "احصل على معلومات المستخدم مع صورة البروفايل من خلال عمل منشن@",
    category: "معلومات",
  },

  onStart: async function ({ event, message, usersData, api, args, getLang }) {
    let avt;
    const uid1 = event.senderID;
    const uid2 = Object.keys(event.mentions)[0];
    let uid;

    if (args[0]) {
      // Check if the argument is a numeric UID
      if (/^\d+$/.test(args[0])) {
        uid = args[0];
      } else {
        // Check if the argument is a profile link
        const match = args[0].match(/profile\.php\?id=(\d+)/);
        if (match) {
          uid = match[1];
        }
      }
    }

    if (!uid) {
      // If no UID was extracted from the argument, use the default logic
      uid = event.type === "message_reply" ? event.messageReply.senderID : uid2 || uid1;
    }

    api.getUserInfo(uid, async (err, userInfo) => {
      if (err) {
        return message.reply("Failed to retrieve user information.");
      }

      const avatarUrl = await usersData.getAvatarUrl(uid);

      // Gender mapping
      let genderText;
      switch (userInfo[uid].gender) {
        case 1:
          genderText = "فتاة 👩‍🦰";
          break;
        case 2:
          genderText = "ولد 👱";
          break;
        default:
          genderText = "شاذ 🏳️‍🌈";
      }

      // Relationship status mapping
      let relationshipStatusText;
      switch (userInfo[uid].relationshipStatus) {
        case 1:
          relationshipStatusText = "أعزب/ة 🕺💃";
          break;
        case 2:
          relationshipStatusText = "في علاقة 👩‍❤️‍👨";
          break;
        case 3:
          relationshipStatusText = "متزوج/ة 👰🤵";
          break;
        default:
          relationshipStatusText = "غير محدد 🤷";
      }

      // Total messages count
      const totalMessages = userInfo[uid].vanity ? userInfo[uid].vanity.messageCount : 0;

      // Rank function
      function getRank(exp) {
        if (exp >= 100000) return 'خارق🥇';
        if (exp >= 20000) return '🥈عظيم';
        if (exp >= 10000) return '👑أسطوري';
        if (exp >= 8000) return 'نشط🔥 قوي';
        if (exp >= 4000) return '🌠نشط';
        if (exp >= 2000) return 'متفاعل🏅 قوي';
        if (exp >= 1000) return '🎖متفاعل جيد';
        if (exp >= 800) return '🌟متفاعل';
        if (exp >= 500) return '✨لا بأس';
        if (exp >= 300) return '👾مبتدأ';
        if (exp >= 100) return '🗿صنم';
        return 'ميت⚰';
      }

      // Construct and send the user's information with avatar
      const userInformation = `❏ إسمك 👤: 『${userInfo[uid].name}』\n❏ رابط الروفايل 💫: [رابط البروفايل](${userInfo[uid].profileUrl})\n❏ جنسك ♐: 『${genderText}』\n❏ حالتك الاجتماعية 👫: 『${relationshipStatusText}』\n❏ نوع المستخدم ☄️: 『${userInfo[uid].type}』\n❏ هل هو صديق 😏: 『${userInfo[uid].isFriend ? "نعم [✅]" : "لا [❌]"}』\n❏ هل عيد ميلادك اليوم 🎊: 『${userInfo[uid].isBirthday ? "نعم [✅]" : "لا [❌]"}』\n❏ تصنيفك 🧿: 『${getRank(userInfo[uid].exp)}』\n❏ إجمالي عدد رسائلك في المجموعة 📬: 『${totalMessages}』\nرسائلك ✉️️: 『${userInfo[uid].exp}』`;

      message.reply({
        body: userInformation,
        attachment: await global.utils.getStreamFromURL(avatarUrl)
      });
    });
  }
};
