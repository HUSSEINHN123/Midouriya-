const axios = require('axios');

module.exports = {
  config: {
    name: "لعبة_الأعلام",
    aliases: ['علم'],
    version: "1.0",
    author: "Samir",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "إحزر علم البلد المقترح"
    },
    longDescription: {
      en: "تخمين اسم الدولة من خلال علمها"
    },
    category: "لعبة",
    guide: {
      en: "{pn} لعبة_الأعلام"
    },
  },

  onReply: async function ({ args, event, api, Reply, commandName }) {
    const { dataGame, name, nameUser } = Reply;
    if (event.senderID !== Reply.author) return;

    switch (Reply.type) {
      case "reply": {
        const userReply = event.body.toLowerCase();

        if (userReply === name.toLowerCase()) {
          api.unsendMessage(Reply.messageID).catch(console.error);
          const msg = {
            body: `✅ ${nameUser}, لقد أجبت بشكل صحيح!\\جواب: ${name}`
          };
          return api.sendMessage(msg, event.threadID, event.messageID);
        } else {
          api.unsendMessage(Reply.messageID).catch(console.error);
          const msg = `${nameUser}, الجواب خاطئ!!\الجواب الصحيح هو: ${name}`;
          return api.sendMessage(msg, event.threadID);
        }
      }
    }
  },

  onStart: async function ({ api, event, usersData, commandName }) {
    const { threadID, messageID } = event;
    const timeout = 60;

    try {
      const response = await axios.get('https://api.zahwazein.xyz/entertainment/tebakbendera?apikey=zenzkey_92d341a7630e');
      const quizData = response.data.result;
      const { img, flag, name } = quizData;
      const namePlayerReact = await usersData.getName(event.senderID);

      const msg = {
        body: `ما اسم الدولة كما هو موضح في صورة العلم?`,
        attachment: await global.utils.getStreamFromURL(img)
      };

      api.sendMessage(msg, threadID, async (error, info) => {
        if (error) {
          console.error("حدث خطأ أثناء إرسال الرسالة:", error);
          return;
        }

        global.GoatBot.onReply.set(info.messageID, {
          type: "reply",
          commandName,
          author: event.senderID,
          messageID: info.messageID,
          dataGame: quizData,
          name,
          nameUser: namePlayerReact
        });

        setTimeout(function () {
          api.unsendMessage(info.messageID).catch(console.error);
        }, timeout * 1000);
      });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }
};